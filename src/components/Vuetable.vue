<template>
  <table :class="['vuetable', css.tableClass]">
    <thead>
      <tr>
        <template v-for="field in fields">
          <template v-if="field.visible">
            <template v-if="isSpecialField(field.name)">
              <th v-if="extractName(field.name) == '__checkbox'"
                :class="['vuetable-th-checkbox-'+trackBy, field.titleClass]">
                <input type="checkbox" @change="toggleAllCheckboxes(field.name, $event)"
                  :checked="checkCheckboxesState(field.name)">
              </th>
              <th v-if="extractName(field.name) == '__component'"
                  @click="orderBy(field, $event)"
                  :class="['vuetable-th-component-'+trackBy, field.titleClass, {'sortable': isSortable(field)}]">
                  {{ field.title || '' }}
                  <i v-if="isInCurrentSortGroup(field) && field.title"
                     :class="sortIcon(field)"
                     :style="{opacity: sortIconOpacity(field)}"></i>
              </th>
              <th v-if="extractName(field.name) == '__slot'"
                  @click="orderBy(field, $event)"
                  :class="['vuetable-th-slot-'+extractArgs(field.name), field.titleClass, {'sortable': isSortable(field)}]">
                  {{ field.title || '' }}
                  <i v-if="isInCurrentSortGroup(field) && field.title"
                     :class="sortIcon(field)"
                     :style="{opacity: sortIconOpacity(field)}"></i>
              </th>
              <th v-if="extractName(field.name) == '__sequence'"
                  :class="['vuetable-th-sequence', field.titleClass || '']" v-html="field.title || ''">
              </th>
              <th v-if="notIn(extractName(field.name), ['__sequence', '__checkbox', '__component', '__slot'])"
                  :class="['vuetable-th-'+field.name, field.titleClass || '']" v-html="field.title || ''">
              </th>
            </template>
            <template v-else>
              <th @click="orderBy(field, $event)"
                :id="'_' + field.name"
                :class="['vuetable-th-'+field.name, field.titleClass,  {'sortable': isSortable(field)}]">
                {{  getTitle(field) }}&nbsp;
                <i v-if="isInCurrentSortGroup(field)" :class="sortIcon(field)" :style="{opacity: sortIconOpacity(field)}"></i>
              </th>
            </template>
          </template>
        </template>
      </tr>
    </thead>
    <tbody v-cloak>
      <template v-for="(item, index) in tableData">
        <tr @dblclick="onRowDoubleClicked(item, $event)" @click="onRowClicked(item, $event)" :render="onRowChanged(item)" :class="onRowClass(item, index)">
          <template v-for="field in fields">
            <template v-if="field.visible">
              <template v-if="isSpecialField(field.name)">
                <td v-if="extractName(field.name) == '__sequence'" :class="['vuetable-sequence', field.dataClass]"
                  v-html="tablePagination.from + index">
                </td>
                <td v-if="extractName(field.name) == '__handle'" :class="['vuetable-handle', field.dataClass]">
                  <i :class="['sort-handle', css.sortHandleIcon]"></i>
                </td>
                <td v-if="extractName(field.name) == '__checkbox'" :class="['vuetable-checkboxes', field.dataClass]">
                  <input type="checkbox"
                    @change="toggleCheckbox(item, field.name, $event)"
                    :checked="rowSelected(item, field.name)">
                </td>
                <td v-if="extractName(field.name) === '__component'" :class="['vuetable-component', field.dataClass]">
                    <component :is="extractArgs(field.name)" :row-data="item" :row-index="index"></component>
                </td>
                <td v-if="extractName(field.name) === '__slot'" :class="['vuetable-slot', field.dataClass]">
                  <slot :name="extractArgs(field.name)" :row-data="item" :row-index="index"></slot>
                </td>
              </template>
              <template v-else>
                <td v-if="hasCallback(field)" :class="field.dataClass"
                  @click="onCellClicked(item, field, $event)"
                  @dblclick="onCellDoubleClicked(item, field, $event)"
                  v-html="callCallback(field, item)"
                >
                </td>
                <td v-else :class="field.dataClass"
                  @click="onCellClicked(item, field, $event)"
                  @dblclick="onCellDoubleClicked(item, field, $event)"
                  v-html="getObjectValue(item, field.name, '')"
                >
                </td>
              </template>
            </template>
          </template>
        </tr>
        <template v-if="useDetailRow">
          <transition :name="detailRowTransition">
            <tr v-if="isVisibleDetailRow(item[trackBy])"
              @click="onDetailRowClick(item, $event)"
              :class="[css.detailRowClass]"
            >
              <td :colspan="countVisibleFields">
                <component :is="detailRowComponent" :row-data="item" :row-index="index"></component>
              </td>
            </tr>
          </transition>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    loadOnStart: {
      type: Boolean,
      default: true
    },
    apiUrl: {
        type: String,
        default: ''
    },
    dataPath: {
        type: String,
        default: 'data'
    },
    paginationPath: {
        type: [String],
        default: 'links.pagination'
    },
    queryParams: {
      type: Object,
      default: function() {
        return {
          sort: 'sort',
          page: 'page',
          perPage: 'per_page'
        }
      }
    },
    appendParams: {
      type: Object,
      default: function() {
        return {}
      }
    },
    httpOptions: {
      type: Object,
      default: function() {
        return {}
      }
    },
    perPage: {
        type: Number,
        default: function() {
            return 10
        }
    },
    sortOrder: {
      type: Array,
      default: function() {
        return []
      }
    },
    multiSort: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    /*
     * physical key that will trigger multi-sort option
     * possible values: 'alt', 'ctrl', 'meta', 'shift'
     * 'ctrl' might not work as expected on Mac
     */
    multiSortKey: {
      type: String,
      default: 'alt'
    },
    rowClassCallback: {
      type: [String, Function],
      default: ''
    },
    detailRowComponent: {
      type: String,
      default: ''
    },
    detailRowTransition: {
      type: String,
      default: ''
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    css: {
      type: Object,
      default: function() {
        return {
          tableClass: 'ui blue selectable celled stackable attached table',
          loadingClass: 'loading',
          ascendingIcon: 'blue chevron up icon',
          descendingIcon: 'blue chevron down icon',
          detailRowClass: 'vuetable-detail-row',
          sortHandleIcon: 'grey sidebar icon',
        }
      }
    },
    silent: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      eventPrefix: 'vuetable:',
      tableData: null,
      tablePagination: null,
      currentPage: 1,
      selectedTo: [],
      visibleDetailRows: [],
    }
  },
  created: function() {
    this.normalizeFields()
    if (this.loadOnStart) {
      this.loadData()
    }
  },
  computed: {
    useDetailRow: function() {
      if (this.tableData && this.tableData[0] && typeof this.tableData[0][this.trackBy] === 'undefined') {
        this.warn('You need to define "detail-row-id" in order for detail-row feature to work!')
        return false
      }

      return this.detailRowComponent !== ''
    },
    countVisibleFields: function() {
      return this.fields.filter(function(field) {
        return field.visible
      }).length
    }
  },
  methods: {
    normalizeFields: function() {
      if (typeof(this.fields) === 'undefined') {
        this.warn('You need to provide "fields" prop.')
        return
      }

      let self = this
      let obj
      this.fields.forEach(function(field, i) {
        if (typeof (field) === 'string') {
          obj = {
            name: field,
            title: self.setTitle(field),
            titleClass: '',
            dataClass: '',
            callback: null,
            visible: true,
          }
        } else {
          obj = {
            name: field.name,
            title: (field.title === undefined) ? self.setTitle(field.name) : field.title,
            sortField: field.sortField,
            titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
            dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
            callback: (field.callback === undefined) ? '' : field.callback,
            visible: (field.visible === undefined) ? true : field.visible,
          }
        }
        Vue.set(self.fields, i, obj)
      })
    },
    setTitle: function(str) {
      if (this.isSpecialField(str)) {
        return ''
      }

      return this.titleCase(str)
    },
    getTitle: function(field) {
      if (typeof field.title === 'undefined') {
        return field.name.replace('.', ' ')
      }

      return field.title
    },
    isSpecialField: function(fieldName) {
      return fieldName.slice(0, 2) === '__'
    },
    titleCase: function(str) {
      return str.replace(/\w+/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    camelCase: function(str, delimiter = '_') {
      let self = this
      return str.split(delimiter).map(function(item) {
        return self.titleCase(item)
      }).join('')
    },
    notIn: function(str, arr) {
      return arr.indexOf(str) === -1
    },
    loadData: function(success = this.loadSuccess, failed = this.loadFailed) {
      this.fireEvent('loading')

      this.httpOptions['params'] = this.getAllQueryParams()

      Vue.http.get(this.apiUrl, this.httpOptions).then(
        success,
        failed
      )
    },
    loadSuccess: function(response) {
      this.fireEvent('load-success', response)

      let body = this.transform(response.body)

      this.tableData = this.getObjectValue(body, this.dataPath, null)
      this.tablePagination = this.getObjectValue(body, this.paginationPath, null)

      if (this.tablePagination === null) {
        this.warn('vuetable: pagination-path "' + this.paginationPath + '" not found. '
          + 'It looks like the data returned from the sever does not have pagination information '
          + 'or you may have set it incorrectly.'
        )
      }

      this.$nextTick(function() {
        this.fireEvent('pagination-data', this.tablePagination)
        this.fireEvent('loaded')
      })
    },
    loadFailed: function(response) {
      this.fireEvent('load-error', response)
      this.fireEvent('loaded')
    },
    transform: function(data) {
      let func = 'transform'

      if (this.parentFunctionExists(func)) {
          return this.$parent[func].call(this.$parent, data)
      }

      return data
    },
    parentFunctionExists: function(func) {
      return (func !== '' && typeof this.$parent[func] === 'function')
    },
    fireEvent: function(eventName, args) {
      this.$emit(this.eventPrefix + eventName, args)
    },
    warn: function(msg) {
      if (!this.silent) {
        console.warn(msg)
      }
    },
    getAllQueryParams: function() {
      let params = {}
      params[this.queryParams.sort] = this.getSortParam()
      params[this.queryParams.page] = this.currentPage
      params[this.queryParams.perPage] = this.perPage

      for (let x in this.appendParams) {
        params[x] = this.appendParams[x]
      }

      return params
    },
    getSortParam: function() {
      if (!this.sortOrder || this.sortOrder.field == '') {
        return ''
      }

      if (typeof this.$parent['getSortParam'] == 'function') {
        return this.$parent['getSortParam'].call(this.$parent, this.sortOrder)
      }

      return this.getDefaultSortParam()
    },
    getDefaultSortParam: function() {
      let result = '';

      for (let i = 0; i < this.sortOrder.length; i++) {
        let fieldName = (typeof this.sortOrder[i].sortField === 'undefined')
          ? this.sortOrder[i].field
          : this.sortOrder[i].sortField;

        result += fieldName + '|' + this.sortOrder[i].direction + ((i+1) < this.sortOrder.length ? ',' : '');
      }

      return result;
    },
    extractName: function(string) {
      return string.split(':')[0].trim()
    },
    extractArgs: function(string) {
      return string.split(':')[1]
    },
    isSortable: function(field) {
      return !(typeof field.sortField === 'undefined')
    },
    isInCurrentSortGroup: function(field) {
      return this.currentSortOrderPosition(field) !== false;
    },
    currentSortOrderPosition: function(field) {
      if ( ! this.isSortable(field)) {
        return false
      }

      for (let i = 0; i < this.sortOrder.length; i++) {
        if (this.fieldIsInSortOrderPosition(field, i)) {
          return i;
        }
      }

      return false;
    },
    fieldIsInSortOrderPosition(field, i) {
      return this.sortOrder[i].field === field.name && this.sortOrder[i].sortField === field.sortField
    },
    orderBy: function(field, event) {
      if ( ! this.isSortable(field)) return

      let key = this.multiSortKey.toLowerCase() + 'Key'

      if (this.multiSort && event[key]) { //adding column to multisort
        this.multiColumnSort(field)
      } else {
        //no multisort, or resetting sort
        this.singleColumnSort(field)
      }

      this.currentPage = 1    // reset page index
      this.loadData()
    },
    multiColumnSort: function(field) {
      let i = this.currentSortOrderPosition(field);

      if(i === false) { //this field is not in the sort array yet
        this.sortOrder.push({
          field: field.name,
          sortField: field.sortField,
          direction: 'asc'
        });
      } else { //this field is in the sort array, now we change its state
        if(this.sortOrder[i].direction === 'asc') {
          // switch direction
          this.sortOrder[i].direction = 'desc'
        } else {
          //remove sort condition
          this.sortOrder.splice(i, 1);
        }
      }
    },
    singleColumnSort: function(field) {
      if (this.sortOrder.length === 0) {
        this.clearSortOrder()
      }

      this.sortOrder.splice(1); //removes additional columns

      if (this.fieldIsInSortOrderPosition(field, 0)) {
        // change sort direction
        this.sortOrder[0].direction = this.sortOrder[0].direction === 'asc' ? 'desc' : 'asc'
      } else {
        // reset sort direction
        this.sortOrder[0].direction = 'asc'
      }
      this.sortOrder[0].field = field.name
      this.sortOrder[0].sortField = field.sortField
    },
    clearSortOrder: function() {
      this.sortOrder.push({
        field: '',
        sortField: '',
        direction: 'asc'
      });
    },
    sortIcon: function(field) {
      let cls = {}
      let i = this.currentSortOrderPosition(field);

      if (i !== false) {
        if (this.sortOrder[i].direction == 'asc') {
          cls[this.css.ascendingIcon] = true
        } else {
          cls[this.css.descendingIcon] = true
        }
      }

      return cls;
    },
    sortIconOpacity: function(field) {
      /*
       * fields with stronger precedence have darker color
       *
       * if there are few fields, we go down by 0.3
       * ex. 2 fields are selected: 1.0, 0.7
       *
       * if there are more we go down evenly on the given spectrum
       * ex. 6 fields are selected: 1.0, 0.86, 0.72, 0.58, 0.44, 0.3
       */
      let max = 1.0,
          min = 0.3,
          step = 0.3

      let count = this.sortOrder.length;
      let current = this.currentSortOrderPosition(field)


      if(max - count * step < min) {
        step = (max - min) / (count-1)
      }

      let opacity = max - current * step

      return opacity
    },
    hasCallback: function(item) {
      return item.callback ? true : false
    },
    callCallback: function(field, item) {
      if ( ! this.hasCallback(field)) return

      if(typeof(field.callback) == 'function') {
       return field.callback(this.getObjectValue(item, field.name))
      }

      let args = field.callback.split('|')
      let func = args.shift()

      if (typeof this.$parent[func] === 'function') {
        let value = this.getObjectValue(item, field.name)

        return (args.length > 0)
          ? this.$parent[func].apply(this.$parent, [value].concat(args))
          : this.$parent[func].call(this.$parent, value)
      }

      return null
    },
    getObjectValue: function(object, path, defaultValue) {
      defaultValue = (typeof defaultValue === 'undefined') ? null : defaultValue

      let obj = object
      if (path.trim() != '') {
        let keys = path.split('.')
        keys.forEach(function(key) {
          if (obj !== null && typeof obj[key] !== 'undefined' && obj[key] !== null) {
            obj = obj[key]
          } else {
            obj = defaultValue
            return
          }
        })
      }
      return obj
    },
    toggleCheckbox: function(dataItem, fieldName, event) {
      let isChecked = event.target.checked
      let idColumn = this.trackBy

      if (dataItem[idColumn] === undefined) {
        this.warn('__checkbox field: The "'+this.trackBy+'" field does not exist! Make sure the field you specify in "track-by" prop does exist.')
        return
      }

      let key = dataItem[idColumn]
      if (isChecked) {
        this.selectId(key)
      } else {
        this.unselectId(key)
      }
      this.$emit('vuetable:checkbox-toggled', isChecked, dataItem)
    },
    selectId: function(key) {
      if ( ! this.isSelectedRow(key)) {
        this.selectedTo.push(key)
      }
    },
    unselectId: function(key) {
      this.selectedTo = this.selectedTo.filter(function(item) {
        return item !== key
      })
    },
    isSelectedRow: function(key) {
      return this.selectedTo.indexOf(key) >= 0
    },
    rowSelected: function(dataItem, fieldName){
      let idColumn = this.trackBy
      let key = dataItem[idColumn]

      return this.isSelectedRow(key)
    },
    checkCheckboxesState: function(fieldName) {
      if (! this.tableData) return

      let self = this
      let idColumn = this.trackBy
      let selector = 'th.vuetable-th-checkbox-' + idColumn + ' input[type=checkbox]'
      let els = document.querySelectorAll(selector)

      // count how many checkbox row in the current page has been checked
      let selected = this.tableData.filter(function(item) {
        return self.selectedTo.indexOf(item[idColumn]) >= 0
      })

      // count == 0, clear the checkbox
      if (selected.length <= 0) {
        els.forEach(function(el) {
          el.indeterminate = false
        })
        return false
      }
      // count > 0 and count < perPage, set checkbox state to 'indeterminate'
      else if (selected.length < this.perPage) {
        els.forEach(function(el) {
          el.indeterminate = true
        })
        return true
      }
      // count == perPage, set checkbox state to 'checked'
      else {
        els.forEach(function(el) {
          el.indeterminate = false
        })
        return true
      }
    },
    toggleAllCheckboxes: function(fieldName, event) {
      let self = this
      let isChecked = event.target.checked
      let idColumn = this.trackBy

      if (isChecked) {
        this.tableData.forEach(function(dataItem) {
          self.selectId(dataItem[idColumn])
        })
      } else {
        this.tableData.forEach(function(dataItem) {
          self.unselectId(dataItem[idColumn])
        })
      }
      this.$emit('vuetable:checkbox-toggled-all', isChecked)
    },
    gotoPreviousPage: function() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.loadData()
      }
    },
    gotoNextPage: function() {
      if (this.currentPage < this.tablePagination.last_page) {
        this.currentPage++
        this.loadData()
      }
    },
    gotoPage: function(page) {
      if (page != this.currentPage && (page > 0 && page <= this.tablePagination.last_page)) {
        this.currentPage = page
        this.loadData()
      }
    },
    isVisibleDetailRow: function(rowId) {
      return this.visibleDetailRows.indexOf( rowId ) >= 0
    },
    showDetailRow: function(rowId) {
      if (!this.isVisibleDetailRow(rowId)) {
        this.visibleDetailRows.push(rowId)
      }
    },
    hideDetailRow: function(rowId) {
      if (this.isVisibleDetailRow(rowId)) {
        this.visibleDetailRows.splice(
          this.visibleDetailRows.indexOf(rowId),
          1
        )
      }
    },
    toggleDetailRow: function(rowId) {
      if (this.isVisibleDetailRow(rowId)) {
        this.hideDetailRow(rowId)
      } else {
        this.showDetailRow(rowId)
      }
    },
    onRowClass: function(dataItem, index) {
      if(typeof(this.rowClassCallback) === 'function') {
        return this.rowClassCallback(dataItem, index)
      }

      let func = this.rowClassCallback.trim()

      if (func !== '' && typeof this.$parent[func] === 'function') {
          return this.$parent[func].call(this.$parent, dataItem, index)
      }
      return ''
    },
    onRowChanged: function(dataItem) {
      this.fireEvent('row-changed', dataItem)
      return true
    },
    onRowClicked: function(dataItem, event) {
      this.$emit(this.eventPrefix + 'row-clicked', dataItem, event)
      return true
    },
    onRowDoubleClicked: function(dataItem, event) {
      this.$emit(this.eventPrefix + 'row-dblclicked', dataItem, event)
    },
    onDetailRowClick: function(dataItem, event) {
      this.$emit(this.eventPrefix + 'detail-row-clicked', dataItem, event)
    },
    onCellClicked: function(dataItem, field, event) {
      this.$emit(this.eventPrefix + 'cell-clicked', dataItem, field, event)
    },
    onCellDoubleClicked: function(dataItem, field, event) {
      this.$emit(this.eventPrefix + 'cell-dblclicked', dataItem, field, event)
    },
    /*
     * API for externals
     */
    changePage: function(page) {
      if (page === 'prev') {
        this.gotoPreviousPage()
      } else if (page === 'next') {
        this.gotoNextPage()
      } else {
        this.gotoPage(page)
      }
    },
    reload: function() {
      this.loadData()
    },
    refresh: function() {
      this.currentPage = 1
      this.loadData()
    },
  }, // end: methods
  watch: {
    'multiSort': function(newVal, oldVal) {
      if (newVal === false && this.sortOrder.length > 1) {
        this.sortOrder.splice(1);
        this.loadData();
      }
    }
  },
}
</script>

<style>
  [v-cloak] {
    display: none;
  }
  .vuetable th.sortable:hover {
    color: #2185d0;
    cursor: pointer;
  }
  .vuetable-actions {
    width: 15%;
    padding: 12px 0px;
    text-align: center;
  }
  .vuetable-pagination {
    background: #f9fafb !important;
  }
  .vuetable-pagination-info {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
