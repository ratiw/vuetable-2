<template>
<div v-if="isFixedHeader">
  <div class="vuetable-head-wrapper">
    <table :class="['vuetable', css.tableClass, css.tableHeaderClass]">
    <thead>
      <tr>
        <template v-for="field in tableFields">
          <template v-if="field.visible">
            <template v-if="isSpecialField(field.name)">
              <th :class="headerClass('vuetable-th-component-'+field.name.slice(2), field)"
                :style="{width: field.width}"
                @click="orderBy(field, $event)"
              >
                <component :is="field.name"
                  :row-field="field"
                  :is-header="true"
                  :title="renderTitle(field)"
                  :is-selected="checkCheckboxesState(field.name)"
                  @vuetable-column="onColumnEvent"
                ></component>
              </th>
            </template>
            <template v-else-if="typeof $scopedSlots[field.name] !== 'undefined'">
              <th :class="headerClass('vuetable-th-slot-'+field.name, field)"
                  :style="{width: field.width}"
                  @click="orderBy(field, $event)"
                  v-html="renderTitle(field)"
              ></th>
            </template>
            <template v-else>
              <th @click="orderBy(field, $event)"
                :id="'_' + field.name"
                :class="headerClass('vuetable-th-'+field.name, field)"
                :style="{width: field.width}"
                v-html="renderTitle(field)"
              ></th>
            </template>
          </template>
        </template>
        <th v-if="scrollVisible" :style="{width: scrollBarWidth}" class="vuetable-gutter-col"></th>
      </tr>
    </thead>
    </table>
  </div>
  <div class="vuetable-body-wrapper" :style="{height: tableHeight}">
    <table :class="['vuetable', css.tableClass, css.tableBodyClass]">
      <colgroup>
          <template v-for="field in tableFields">
            <template v-if="field.visible">
              <template>
                <col
                  :id="'_col_' + field.name"
                  :style="{width: field.width}"
                  :class="['vuetable-th-'+field.name, field.titleClass]"
                ></col>
              </template>
            </template>
          </template>
      </colgroup>
    <tbody v-cloak class="vuetable-body">
      <template v-for="(item, index) in tableData">
        <tr :item-index="index"
          :class="onRowClass(item, index)"
          :render="onRowChanged(item)"
          @click="onRowClicked(item, $event)"
          @dblclick="onRowDoubleClicked(item, $event)"
          @mouseover="onMouseOver(item, $event)">
          <template v-for="field in tableFields">
            <template v-if="field.visible">
              <template v-if="isSpecialField(field.name)">
                <td :class="bodyClass('vuetable-component', field)"
                  :style="{width: field.width}"
                >
                  <component :is="field.name"
                    :row-data="item" :row-index="index" :row-field="field.sortField"
                    :is-selected="isSelectedRow(item[trackBy])"
                    :css="css"
                    @vuetable-column="onColumnEvent"
                  ></component>
                </td>
              </template>
              <template v-else-if="typeof $scopedSlots[field.name] !== 'undefined'">
                <td :class="bodyClass('vuetable-slot', field)"
                  :style="{width: field.width}"
                >
                  <slot :name="field.name"
                    :row-data="item" :row-index="index" :row-field="field.sortField"
                  ></slot>
                </td>
              </template>
              <template v-else>
                <td :class="bodyClass('', field)"
                  :style="{width: field.width}"
                  v-html="renderNormalField(field, item)"
                  @click="onCellClicked(item, field, $event)"
                  @dblclick="onCellDoubleClicked(item, field, $event)"
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
      <template v-if="displayEmptyDataRow">
        <tr>
          <td :colspan="countVisibleFields" class="vuetable-empty-result">{{noDataTemplate}}</td>
        </tr>
      </template>
      <template v-if="lessThanMinRows">
        <tr v-for="i in blankRows" class="blank-row">
          <template v-for="field in tableFields">
            <td v-if="field.visible">&nbsp;</td>
          </template>
        </tr>
      </template>
    </tbody>
    </table>
  </div>
</div>
<div v-else>
  <table :class="['vuetable', css.tableClass]">
    <thead>
      <tr>
        <template v-for="field in tableFields">
          <template v-if="field.visible">
            <template v-if="isSpecialField(field.name)">
              <th :class="headerClass('vuetable-th-component-'+field.name.slice(2), field)"
                :style="{width: field.width}"
                @click="orderBy(field, $event)"
              >
                <component :is="field.name"
                  :row-field="field"
                  :is-header="true"
                  :title="renderTitle(field)"
                  :is-selected="checkCheckboxesState(field.name)"
                  @vuetable-column="onColumnEvent"
                ></component>
              </th>
            </template>
            <template v-else-if="typeof $scopedSlots[field.name] !== 'undefined'">
              <th :class="headerClass('vuetable-th-slot-'+field.name, field)"
                  :style="{width: field.width}"
                  @click="orderBy(field, $event)"
                  v-html="renderTitle(field)"
              ></th>
            </template>
            <template v-else>
              <th @click="orderBy(field, $event)"
                :id="'_' + field.name"
                :class="headerClass('vuetable-th-'+field.name, field)"
                  :style="{width: field.width}"
                v-html="renderTitle(field)"
              ></th>
            </template>
          </template>
        </template>
      </tr>
    </thead>
    <tbody v-cloak class="vuetable-body">
      <template v-for="(item, index) in tableData">
        <tr :item-index="index"
          :class="onRowClass(item, index)"
          :render="onRowChanged(item)"
          @click="onRowClicked(item, $event)"
          @dblclick="onRowDoubleClicked(item, $event)"
          @mouseover="onMouseOver(item, $event)">
          <template v-for="field in tableFields">
            <template v-if="field.visible">
              <template v-if="isSpecialField(field.name)">
                <td :class="bodyClass('vuetable-component', field)"
                  :style="{width: field.width}"
                >
                  <component :is="field.name"
                    :row-data="item" :row-index="index" :row-field="field.sortField"
                    :is-selected="isSelectedRow(item[trackBy])"
                    :css="css"
                    @vuetable-column="onColumnEvent"
                  ></component>
                </td>
              </template>
              <template v-else-if="typeof $scopedSlots[field.name] !== 'undefined'">
                <td :class="bodyClass('vuetable-slot', field)"
                  :style="{width: field.width}"
                >
                  <slot :name="field.name"
                    :row-data="item" :row-index="index" :row-field="field.sortField"
                  ></slot>
                </td>
              </template>
              <template v-else>
                <td :class="bodyClass('', field)"
                  :style="{width: field.width}"
                  @click="onCellClicked(item, field, $event)"
                  @dblclick="onCellDoubleClicked(item, field, $event)"
                  v-html="renderNormalField(field, item)"
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
      <template v-if="displayEmptyDataRow">
        <tr>
          <td :colspan="countVisibleFields" class="vuetable-empty-result">{{noDataTemplate}}</td>
        </tr>
      </template>
      <template v-if="lessThanMinRows">
        <tr v-for="i in blankRows" class="blank-row">
          <template v-for="field in tableFields">
            <td v-if="field.visible">&nbsp;</td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</div>
</template>

<script>
import axios from 'axios'
import VuetableColumnCheckbox from './VuetableColumnCheckbox'
import VuetableColumnHandle from './VuetableColumnHandle'
import VuetableColumnSequence from './VuetableColumnSequence'

export default {
  components: {
    '__checkbox': VuetableColumnCheckbox,
    '__handle'  : VuetableColumnHandle,
    '__sequence': VuetableColumnSequence,
  },
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
    httpMethod: {
        type: String,
        default: 'get',
        validator: (value) => {
          return ['get', 'post'].indexOf(value) > -1
        }
    },
    reactiveApiUrl: {
        type: Boolean,
        default: true
    },
    apiMode: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object],
      default () {
        return null
      }
    },
    dataTotal: {
      type: Number,
      default: 0
    },
    dataManager: {
      type: Function,
      default () {
        return null
      }
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
      default () {
        return {
          sort: 'sort',
          page: 'page',
          perPage: 'per_page'
        }
      }
    },
    appendParams: {
      type: Object,
      default () {
        return {}
      }
    },
    httpOptions: {
      type: Object,
      default () {
        return {}
      }
    },
    httpFetch: {
      type: Function,
      default: null
    },
    perPage: {
        type: Number,
        default () {
            return 10
        }
    },
    initialPage: {
      type: Number,
      default () {
        return 1
      }
    },
    sortOrder: {
      type: Array,
      default () {
        return []
      }
    },
    multiSort: {
      type: Boolean,
      default () {
        return false
      }
    },
    tableHeight: {
      type: String,
      default: null
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
    /* deprecated */
    rowClassCallback: {
      type: [String, Function],
      default: ''
    },
    rowClass: {
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
      default () {
        return {
          tableClass: 'ui blue selectable celled stackable attached table',
          loadingClass: 'loading',
          ascendingIcon: 'blue chevron up icon',
          descendingIcon: 'blue chevron down icon',
          ascendingClass: 'sorted-asc',
          descendingClass: 'sorted-desc',
          sortableIcon: '',
          detailRowClass: 'vuetable-detail-row',
          handleIcon: 'grey sidebar icon',
          tableBodyClass: 'vuetable-semantic-no-top vuetable-fixed-layout',
          tableHeaderClass: 'vuetable-fixed-layout'
        }
      }
    },
    minRows: {
      type: Number,
      default: 0
    },
    silent: {
      type: Boolean,
      default: false
    },
    noDataTemplate: {
      type: String,
      default() {
        return 'No Data Available'
      }
    },
    showSortIcons: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      eventPrefix: 'vuetable:',
      tableFields: [],
      tableData: null,
      tablePagination: null,
      currentPage: this.initialPage,
      selectedTo: [],
      visibleDetailRows: [],
      lastScrollPosition: 0,
      scrollBarWidth: '17px', //chrome default
      scrollVisible: false,
    }
  },
  created() {
    this.normalizeFields()
    this.normalizeSortOrder()
  },
  mounted () {
    if (this.isFixedHeader) {
      this.scrollBarWidth = this.getScrollBarWidth() + 'px';
      console.log('scrollbar width: ', this.scrollBarWidth)
    }
    this.$nextTick(function() {
      this.fireEvent('initialized', this.tableFields)
    })

    if (this.loadOnStart) {
      this.loadData()
    }
    if (this.isFixedHeader) {
      console.log('Fixed Header enabled')
      let elem = this.$el.getElementsByClassName('vuetable-body-wrapper')[0];
      if (elem != null) {
        elem.addEventListener('scroll', this.handleScroll);
      }
    }
  },
  destroyed () {
    let elem = this.$el.getElementsByClassName('vuetable-body-wrapper')[0];
    if (elem != null) {
      elem.removeEventListener('scroll', this.handleScroll);
    }
  },
  computed: {
    useDetailRow () {
      if (this.tableData && this.tableData[0] && this.detailRowComponent !== '' && typeof this.tableData[0][this.trackBy] === 'undefined') {
        this.warn('You need to define unique row identifier in order for detail-row feature to work. Use `track-by` prop to define one!')
        return false
      }

      return this.detailRowComponent !== ''
    },
    countVisibleFields () {
      return this.tableFields.filter(function(field) {
        return field.visible
      }).length
    },
    countTableData () {
      if (this.tableData === null) {
        return 0
      }
      return this.tableData.length
    },
    displayEmptyDataRow () {
      return this.countTableData === 0 && this.noDataTemplate.length > 0
    },
    lessThanMinRows () {
      if (this.tableData === null || this.tableData.length === 0) {
        return true
      }
      return this.tableData.length < this.minRows
    },
    blankRows () {
      if (this.tableData === null || this.tableData.length === 0) {
        return this.minRows
      }
      if (this.tableData.length >= this.minRows) {
        return 0
      }

      return this.minRows - this.tableData.length
    },
    isApiMode () {
      return this.apiMode
    },
    isDataMode () {
      return ! this.apiMode
    },
    isFixedHeader () {
      return this.tableHeight != null
    }
  },
  methods: {
    getScrollBarWidth () {
      const outer = document.createElement('div');
      const inner = document.createElement('div');

      outer.style.visibility = 'hidden';
      outer.style.width = '100px';

      inner.style.width = '100%';

      outer.appendChild(inner);
      document.body.appendChild(outer);

      const widthWithoutScrollbar = outer.offsetWidth;
      outer.style.overflow = 'scroll';
      const widthWithScrollbar = inner.offsetWidth;
      document.body.removeChild(outer);

      return (widthWithoutScrollbar - widthWithScrollbar);
    },
    handleScroll (e) { //make sure that the header and the body are aligned when scrolling horizontally on a table that is wider than the viewport
      let horizontal = e.currentTarget.scrollLeft;
      if (horizontal != this.lastScrollPosition) { //don't modify header scroll if we are scrolling vertically
        let header = this.$el.getElementsByClassName('vuetable-head-wrapper')[0]
        if (header != null) {
          header.scrollLeft = horizontal;
        }
        this.lastScrollPosition = horizontal;
      }
    },
    headerClass (base, field) {
      return [
        base,
        field.titleClass || '',
        this.sortClass(field),
        {'sortable': this.isSortable(field)}
      ]
    },
    bodyClass (base, field) {
      return [ base, field.dataClass ]
    },
    normalizeFields () {
      if (typeof(this.fields) === 'undefined') {
        this.warn('You need to provide "fields" prop.')
        return
      }

      this.tableFields = []
      let obj
      this.fields.forEach( (field, i) => {
        if (typeof (field) === 'string') {
          obj = {
            name: field,
            title: this.setTitle(field),
            titleClass: '',
            dataClass: '',
            callback: null,
            visible: true,
          }
        } else {
          obj = {
            name: field.name,
            width: field.width,
            title: (field.title === undefined) ? this.setTitle(field.name) : field.title,
            sortField: field.sortField,
            titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
            dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
            callback: (field.callback === undefined) ? '' : field.callback,
            visible: (field.visible === undefined) ? true : field.visible,
          }
        }
        this.tableFields.push(obj)
      })
    },
    setData (data) {
      // this.apiMode = false
      if (Array.isArray(data)) {
        this.tableData = data
        return
      }

      this.fireEvent('loading')

      this.tableData = this.getObjectValue(data, this.dataPath, null)
      this.tablePagination = this.getObjectValue(data, this.paginationPath, null)

      this.$nextTick( () => {
        this.fireEvent('pagination-data', this.tablePagination)
        this.fireEvent('loaded')
      })
    },
    setTitle (str) {
      if (this.isSpecialField(str)) {
        return ''
      }

      return this.titleCase(str)
    },
    getTitle (field) {
      if (typeof(field.title) === 'function') return field.title()

      return typeof(field.title) === 'undefined'
        ? field.name.replace('.', ' ')
        : field.title
    },
    renderTitle (field) {
      let title = this.getTitle(field)

      if (title.length > 0 && this.isInCurrentSortGroup(field) || this.hasSortableIcon(field)) {
        let style = `opacity:${this.sortIconOpacity(field)};position:relative;float:right`
        let iconTag = this.showSortIcons ? this.renderIconTag(['sort-icon', this.sortIcon(field)], `style="${style}"`) : ''
        return title + ' ' + iconTag
      }

      return title
    },
    renderNormalField (field, item) {
      return this.hasCallback(field)
        ? this.callCallback(field, item)
        : this.getObjectValue(item, field.name, '')
    },
    isSpecialField (fieldName) {
      return fieldName.slice(0, 2) === '__'
    },
    titleCase (str) {
      return str.replace(/\w+/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    camelCase (str, delimiter = '_') {
      return str.split(delimiter).map( (item) => self.titleCase(item) ).join('')
    },
    loadData (success = this.loadSuccess, failed = this.loadFailed) {
      if (this.isDataMode) {
        this.callDataManager()
        return
      }

      this.fireEvent('loading')

      this.httpOptions['params'] = this.getAllQueryParams()

      this.fetch(this.apiUrl, this.httpOptions).then(
          success,
          failed
      ).catch(() => failed())
    },
    fetch (apiUrl, httpOptions) {
      return this.httpFetch
          ? this.httpFetch(apiUrl, httpOptions)
          : axios[this.httpMethod](apiUrl, httpOptions)
    },
    loadSuccess (response) {
      this.fireEvent('load-success', response)

      let body = this.transform(response.data)

      this.tableData = this.getObjectValue(body, this.dataPath, null)
      this.tablePagination = this.getObjectValue(body, this.paginationPath, null)

      if (this.tablePagination === null) {
        this.warn('vuetable: pagination-path "' + this.paginationPath + '" not found. '
          + 'It looks like the data returned from the sever does not have pagination information '
          + "or you may have set it incorrectly.\n"
          + 'You can explicitly suppress this warning by setting pagination-path="".'
        )
      }

      this.$nextTick( () => {
        this.fixHeader()
        this.fireEvent('pagination-data', this.tablePagination)
        this.fireEvent('loaded')
      })
    },
    fixHeader() {
      if (!this.isFixedHeader) {
        return;
      }

      let elem = this.$el.getElementsByClassName('vuetable-body-wrapper')[0]
      if (elem != null) {
        if (elem.scrollHeight > elem.clientHeight) {
          this.scrollVisible = true;
        }
        else {
          this.scrollVisible = false;
        }
      }
    },
    loadFailed (response) {
      console.error('load-error', response)
      this.fireEvent('load-error', response)
      this.fireEvent('loaded')
    },
    transform (data) {
      let func = 'transform'

      if (this.parentFunctionExists(func)) {
          return this.$parent[func].call(this.$parent, data)
      }

      return data
    },
    parentFunctionExists (func) {
      return (func !== '' && typeof this.$parent[func] === 'function')
    },
    callParentFunction (func, args, defaultValue = null) {
      if (this.parentFunctionExists(func)) {
        return this.$parent[func].call(this.$parent, args)
      }

      return defaultValue
    },
    fireEvent (eventName, args) {
      this.$emit(this.eventPrefix + eventName, args)
    },
    warn (msg) {
      if (!this.silent) {
        console.warn(msg)
      }
    },
    getAllQueryParams () {
      let params = {}
      params[this.queryParams.sort] = this.getSortParam()
      params[this.queryParams.page] = this.currentPage
      params[this.queryParams.perPage] = this.perPage

      for (let x in this.appendParams) {
        params[x] = this.appendParams[x]
      }

      return params
    },
    getSortParam () {
      if (!this.sortOrder || this.sortOrder.field == '') {
        return ''
      }

      if (typeof this.$parent['getSortParam'] == 'function') {
        return this.$parent['getSortParam'].call(this.$parent, this.sortOrder)
      }

      return this.getDefaultSortParam()
    },
    getDefaultSortParam () {
      let result = '';

      for (let i = 0; i < this.sortOrder.length; i++) {
        let fieldName = (typeof this.sortOrder[i].sortField === 'undefined')
          ? this.sortOrder[i].field
          : this.sortOrder[i].sortField;

        result += fieldName + '|' + this.sortOrder[i].direction + ((i+1) < this.sortOrder.length ? ',' : '');
      }

      return result;
    },
    isSortable (field) {
      return !(typeof field.sortField === 'undefined')
    },
    isInCurrentSortGroup (field) {
      return this.currentSortOrderPosition(field) !== false;
    },
    hasSortableIcon (field) {
      return this.isSortable(field) && this.css.sortableIcon != ''
    },
    currentSortOrderPosition (field) {
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
    fieldIsInSortOrderPosition (field, i) {
      return this.sortOrder[i].field === field.name && this.sortOrder[i].sortField === field.sortField
    },
    orderBy (field, event) {
      if ( ! this.isSortable(field) ) return

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
    multiColumnSort (field) {
      let i = this.currentSortOrderPosition(field);

      if (i === false) { //this field is not in the sort array yet
        this.sortOrder.push({
          field: field.name,
          sortField: field.sortField,
          direction: 'asc'
        });
      } else { //this field is in the sort array, now we change its state
        if (this.sortOrder[i].direction === 'asc') {
          // switch direction
          this.sortOrder[i].direction = 'desc'
        } else {
          //remove sort condition
          this.sortOrder.splice(i, 1);
        }
      }
    },
    singleColumnSort (field) {
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
    clearSortOrder () {
      this.sortOrder.push({
        field: '',
        sortField: '',
        direction: 'asc'
      });
    },
    sortClass (field) {
      let cls = ''
      let i = this.currentSortOrderPosition(field)

      if (i !== false) {
        cls = (this.sortOrder[i].direction == 'asc') ? this.css.ascendingClass : this.css.descendingClass
      }

      return cls;
    },
    sortIcon (field) {
      let cls = this.css.sortableIcon
      let i = this.currentSortOrderPosition(field)

      if (i !== false) {
        cls = (this.sortOrder[i].direction == 'asc') ? this.css.ascendingIcon : this.css.descendingIcon
      }

      return cls;
    },
    sortIconOpacity (field) {
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
    hasCallback (item) {
      return item.callback ? true : false
    },
    callCallback (field, item) {
      if ( ! this.hasCallback(field)) return

      if (typeof(field.callback) === 'function') {
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
    getObjectValue (object, path, defaultValue) {
      defaultValue = (typeof defaultValue === 'undefined') ? null : defaultValue

      let obj = object
      if (path.trim() != '') {
        let keys = path.split('.')
        keys.forEach( (key) => {
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
    selectId (key) {
      if ( ! this.isSelectedRow(key)) {
        this.selectedTo.push(key)
      }
    },
    unselectId (key) {
      this.selectedTo = this.selectedTo.filter(function(item) {
        return item !== key
      })
    },
    isSelectedRow (key) {
      return this.selectedTo.indexOf(key) >= 0
    },
    checkCheckboxesState (fieldName) {
      if (! this.tableData) return

      let idColumn = this.trackBy
      let selector = 'th.vuetable-th-component-checkbox input[type=checkbox]'
      let els = document.querySelectorAll(selector)

      // fixed:document.querySelectorAll return the typeof nodeList not array
      if (els.forEach === undefined)
        els.forEach = function(cb){
          [].forEach.call(els, cb);
        }

      // count how many checkbox row in the current page has been checked
      let selected = this.tableData.filter( (item) => this.isSelectedRow(item[idColumn]) )

      // count == 0, clear the checkbox
      if (selected.length <= 0) {
        els.forEach( (el) => el.indeterminate = false )
        return false
      }
      // count > 0 and count < perPage, set checkbox state to 'indeterminate'
      else if (selected.length < this.perPage) {
        els.forEach( (el) => el.indeterminate = true )
        return true
      }
      // count == perPage, set checkbox state to 'checked'
      else {
        els.forEach( (el) => el.indeterminate = false )
        return true
      }
    },
    gotoPreviousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
        this.loadData()
      }
    },
    gotoNextPage () {
      if (this.currentPage < this.tablePagination.last_page) {
        this.currentPage++
        this.loadData()
      }
    },
    gotoPage (page) {
      if (page != this.currentPage && (page > 0 && page <= this.tablePagination.last_page)) {
        this.currentPage = page
        this.loadData()
      }
    },
    isVisibleDetailRow (rowId) {
      return this.visibleDetailRows.indexOf( rowId ) >= 0
    },
    showDetailRow (rowId) {
      if (!this.isVisibleDetailRow(rowId)) {
        this.visibleDetailRows.push(rowId)
      }
    },
    hideDetailRow (rowId) {
      if (this.isVisibleDetailRow(rowId)) {
        this.visibleDetailRows.splice(
          this.visibleDetailRows.indexOf(rowId),
          1
        )
      }
    },
    toggleDetailRow (rowId) {
      if (this.isVisibleDetailRow(rowId)) {
        this.hideDetailRow(rowId)
      } else {
        this.showDetailRow(rowId)
      }
    },
    showField (index) {
      if (index < 0 || index > this.tableFields.length) return

      this.tableFields[index].visible = true
    },
    hideField (index) {
      if (index < 0 || index > this.tableFields.length) return

      this.tableFields[index].visible = false
    },
    toggleField (index) {
      if (index < 0 || index > this.tableFields.length) return

      this.tableFields[index].visible = ! this.tableFields[index].visible
    },
    renderIconTag (classes, options = '') {
      return typeof(this.css.renderIcon) === 'undefined'
        ? `<i class="${classes.join(' ')}" ${options}></i>`
        : this.css.renderIcon(classes, options)
    },
    makePagination (total = null, perPage = null, currentPage = null) {
      let pagination = {}
      total = total === null ? this.dataTotal : total
      perPage = perPage === null ? this.perPage : perPage
      currentPage = currentPage === null ? this.currentPage : currentPage

      return {
        'total': total,
        'per_page': perPage,
        'current_page': currentPage,
        'last_page': Math.ceil(total / perPage) || 0,
        'next_page_url': '',
        'prev_page_url': '',
        'from': (currentPage -1) * perPage +1,
        'to': Math.min(currentPage * perPage, total)
      }
    },
    normalizeSortOrder () {
      this.sortOrder.forEach( (item) => {
        item.sortField = item.sortField || item.field
      })
    },
    callDataManager () {
      if (this.dataManager === null && this.data === null) return

      if (Array.isArray(this.data)) {
        this.setData(this.data)
      } else {
        this.normalizeSortOrder()
        this.setData(this.dataManager(this.sortOrder, this.makePagination()))
      }
    },
    onRowClass (dataItem, index) {
      if (this.rowClassCallback !== '') {
        this.warn('"row-class-callback" prop is deprecated, please use "row-class" prop instead.')
        return
      }

      if (typeof(this.rowClass) === 'function') {
        return this.rowClass(dataItem, index)
      }

      return this.rowClass
    },
    onRowChanged (dataItem) {
      this.fireEvent('row-changed', dataItem)
      return true
    },
    onRowClicked (dataItem, event) {
      this.$emit(this.eventPrefix + 'row-clicked', dataItem, event)
      return true
    },
    onRowDoubleClicked (dataItem, event) {
      this.$emit(this.eventPrefix + 'row-dblclicked', dataItem, event)
    },
    onDetailRowClick (dataItem, event) {
      this.$emit(this.eventPrefix + 'detail-row-clicked', dataItem, event)
    },
    onCellClicked (dataItem, field, event) {
      this.$emit(this.eventPrefix + 'cell-clicked', dataItem, field, event)
    },
    onCellDoubleClicked (dataItem, field, event) {
      this.$emit(this.eventPrefix + 'cell-dblclicked', dataItem, field, event)
    },
    onMouseOver (dataItem, event) {
      this.$emit(this.eventPrefix + 'row-mouseover', dataItem, event)
    },
    onColumnEvent (type, payload) {
      console.log('vuetable-column: ', type, payload)
      if (type === 'checkbox-toggled') {
        this.onCheckboxToggled(payload.isChecked, payload.field, payload.dataItem)
      } else if (type === 'checkbox-toggled-all') {
        this.onCheckboxToggledAll(payload.isChecked, payload.field)
      }
    },
    onCheckboxToggled (isChecked, fieldName, dataItem) {
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
      this.$emit('vuetable:checkbox-toggled', isChecked, fieldName)
    },
    onCheckboxToggledAll (isChecked, fieldName) {
      let idColumn = this.trackBy

      if (isChecked) {
        this.tableData.forEach( (dataItem) => {
          this.selectId(dataItem[idColumn])
        })
      } else {
        this.tableData.forEach( (dataItem) => {
          this.unselectId(dataItem[idColumn])
        })
      }
      this.$emit('vuetable:checkbox-toggled-all', isChecked)
    },
    /*
     * API for externals
     */
    changePage (page) {
      if (page === 'prev') {
        this.gotoPreviousPage()
      } else if (page === 'next') {
        this.gotoNextPage()
      } else {
        this.gotoPage(page)
      }
    },
    reload () {
      this.loadData()
    },
    refresh () {
      this.currentPage = 1
      this.loadData()
    },
    resetData () {
      this.tableData = null
      this.tablePagination = null
      this.fireEvent('data-reset')
    },
  }, // end: methods
  watch: {
    'multiSort' (newVal, oldVal) {
      if (newVal === false && this.sortOrder.length > 1) {
        this.sortOrder.splice(1);
        this.loadData();
      }
    },
    'apiUrl' (newVal, oldVal) {
      if (this.reactiveApiUrl && newVal !== oldVal)
        this.refresh()
    }
  },
}
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
  .vuetable th.sortable:hover {
    color: #2185d0;
    cursor: pointer;
  }
  .vuetable-body-wrapper {
    position:relative;
    overflow-y:auto;
  }
  .vuetable-head-wrapper {
    overflow-x: hidden;
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
  .vuetable-empty-result {
    text-align: center;
  }
  .vuetable-clip-text {
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
  .vuetable-semantic-no-top {
    border-top:none !important;
    margin-top:0 !important;
  }
  .vuetable-fixed-layout {
    table-layout: fixed;
  }
  .vuetable-gutter-col {
    padding: 0 !important;
    border-left: none  !important;
    border-right: none  !important;
  }
</style>
