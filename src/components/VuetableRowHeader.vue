<template>
  <tr>
    <template v-for="(field, fieldIndex) in tableFields">
      <template v-if="field.visible">
        <template v-if="isSpecialField(field.name)">
          <th :class="headerClass('vuetable-th-component-'+stripPrefix(field.name), field)"
            :key="fieldIndex"
            :style="{width: field.width}"
            @click="onColumnClicked(field, $event)"
          >
            <component :is="field.name"
              :row-field="field"
              :is-header="true"
              :title="renderTitle(field)"
              :is-selected="checkCheckboxesState(field.name)"
              @vuetable-column="onColumnHeaderEvent"
            ></component>
          </th>
        </template>
        <template v-else-if="typeof $scopedSlots[field.name] !== 'undefined'">
          <th :class="headerClass('vuetable-th-slot-'+field.name, field)"
              :key="fieldIndex"
              :style="{width: field.width}"
              @click="onColumnClicked(field, $event)"
              v-html="renderTitle(field)"
          ></th>
        </template>
        <template v-else>
          <th @click="onColumnClicked(field, $event)"
            :key="fieldIndex"
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
</template>
<script>
import VuetableColumnCheckbox from './VuetableColumnCheckbox'
import VuetableColumnHandle from './VuetableColumnHandle'
import VuetableColumnSequence from './VuetableColumnSequence'

export default {
  components: {
    'vuetable-column-checkbox': VuetableColumnCheckbox, 
    'vuetable-column-handle'  : VuetableColumnHandle,
    'vuetable-column-sequence': VuetableColumnSequence,
  },

  computed: {
    tableFields () {
      return this.$parent.tableFields
    },

    sortOrder() {
      return this.$parent.sortOrder
    },

    showSortIcons() {
      return this.$parent.showSortIcons
    },

    scrollVisible() {
      return this.$parent.scrollVisible
    },

    scrollBarWidth() {
      return this.$parent.scrollBarWidth
    },

    css() {
      return this.$parent.css
    },

    fieldPrefix() {
      return this.$parent.fieldPrefix
    },
  },

  methods: {
    isSpecialField (fieldName) {
      return fieldName.slice(0, this.fieldPrefix.length) === this.fieldPrefix
    },

    stripPrefix (name) {
      return name.slice(0, this.fieldPrefix.length)
    },

    headerClass (base, field) {
      return [
        base,
        field.titleClass || '',
        this.sortClass(field),
        {'sortable': this.isSortable(field)}
      ]
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

    isSortable (field) {
      return !(typeof field.sortField === 'undefined') && field.sortField
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

    renderTitle (field) {
      let title = this.getTitle(field)

      if (title.length > 0 && this.isInCurrentSortGroup(field) || this.hasSortableIcon(field)) {
        let style = `opacity:${this.sortIconOpacity(field)};position:relative;float:right`
        let iconTag = this.showSortIcons ? this.renderIconTag(['sort-icon', this.sortIcon(field)], `style="${style}"`) : ''
        return title + ' ' + iconTag
      }

      return title
    },

    getTitle (field) {
      if (typeof(field.title) === 'function') return field.title()

      return typeof(field.title) === 'undefined'
        ? field.name.replace('.', ' ')
        : field.title
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

    renderIconTag (classes, options = '') {
      return typeof(this.css.renderIcon) === 'undefined'
        ? `<i class="${classes.join(' ')}" ${options}></i>`
        : this.css.renderIcon(classes, options)
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

    onColumnHeaderEvent (type, payload) {
      console.log('vuetable-row: ', type, payload)
      if (type === 'checkbox-toggled') {
        // this.$emit('vuetable-row', 'toggle-row', payload.isChecked, payload.field, payload.dataItem)
        this.$emit('vuetable-row', 'toggle-row', payload)
      } else if (type === 'checkbox-toggled-all') {
        // this.$emit('vuetable-row', 'toggle-all-row', payload.isChecked, payload.field)
        this.$emit('vuetable-row', 'toggle-all-row', payload)
      }
    },

    onColumnClicked (field, event) {
      this.$emit('vuetable-row', 'order-by', {field, event})
    }
  }
}
</script>

<style>
  .vuetable-gutter-col {
    padding: 0 !important;
    border-left: none  !important;
    border-right: none  !important;
  }
</style>
