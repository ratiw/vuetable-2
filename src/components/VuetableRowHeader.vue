<template>
  <tr>
    <template v-for="(field, fieldIndex) in vuetable.tableFields">
      <template v-if="field.visible">
        <template v-if="vuetable.isFieldComponent(field.name)">
          <component :is="field.name"
            :row-field="field"
            :is-header="true"
            :title="renderTitle(field)"
            :vuetable="vuetable"
            :key="fieldIndex"
            :class="headerClass('vuetable-component', field)"
            :style="{width: field.width}"
            @click="onColumnHeaderClicked($event)"
          ></component>
        </template>
        <template v-else-if="vuetable.isFieldSlot(field.name)">
          <th :class="headerClass('vuetable-th-slot-'+field.name, field)"
              :key="fieldIndex"
              :style="{width: field.width}"
              @click="onColumnHeaderClicked(field, $event)"
          >
            <slot :name="field.name"
              :row-field="field"
              :is-header="true"
              :title="renderTitle(field)"
              :vuetable="vuetable"
            ></slot>
          </th>
        </template>
        <template v-else>
          <th @click="onColumnHeaderClicked(field, $event)"
            :key="fieldIndex"
            :id="'_' + field.name"
            :class="headerClass('vuetable-th-'+field.name, field)"
            :style="{width: field.width}"
            v-html="renderTitle(field)"
          ></th>
        </template>
      </template>
    </template>
    <th v-if="vuetable.scrollVisible" :style="{width: vuetable.scrollBarWidth}" class="vuetable-gutter-col"></th>
  </tr>
</template>
<script>
import VuetableFieldCheckbox from './VuetableFieldCheckbox'
import VuetableFieldHandle from './VuetableFieldHandle'
import VuetableFieldSequence from './VuetableFieldSequence'

export default {
  components: {
    'vuetable-field-checkbox': VuetableFieldCheckbox, 
    'vuetable-field-handle'  : VuetableFieldHandle,
    'vuetable-field-sequence': VuetableFieldSequence,
  },

  computed: {
    sortOrder() {
      return this.$parent.sortOrder
    },

    css() {
      return this.$parent.css
    },

    vuetable() {
      return this.$parent
    }
  },

  methods: {
    stripPrefix (name) {
      return name.replace(this.vuetable.fieldPrefix, '')
    },

    headerClass (base, field) {
      return [
        base,
        field.titleClass || '',
        this.sortClass(field),
        {'sortable': this.vuetable.isSortable(field)}
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

    isInCurrentSortGroup (field) {
      return this.currentSortOrderPosition(field) !== false;
    },

    hasSortableIcon (field) {
      return this.vuetable.isSortable(field) && this.css.sortableIcon != ''
    },

    currentSortOrderPosition (field) {
      if ( ! this.vuetable.isSortable(field)) {
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
        let iconTag = this.vuetable.showSortIcons ? this.renderIconTag(['sort-icon', this.sortIcon(field)], `style="${style}"`) : ''
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

    onColumnHeaderClicked (field, event) {
      this.vuetable.orderBy(field, event)
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
