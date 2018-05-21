<script>
import VuetableFieldMixin from './VuetableFieldMixin.vue'

export default {
  mixins: [VuetableFieldMixin],

  methods: {
    toggleCheckbox(dataItem, event) {
      this.vuetable.onCheckboxToggled(event.target.checked, this.rowField.name, dataItem)
    },

    toggleAllCheckbox(event) {
      this.vuetable.onCheckboxToggledAll(event.target.checked)
    },

    isSelected(rowData) {
      return this.vuetable.isSelectedRow(rowData[this.vuetable.trackBy])
    },

    isAllItemsInCurrentPageSelected() {
      if (! this.vuetable.tableData) return 

      let idColumn = this.vuetable.trackBy
      let checkbox = this.$el.querySelector('input[type=checkbox]')
      let selected = this.vuetable.tableData.filter( (item) => this.vuetable.isSelectedRow(item[idColumn]) )

      // count == 0, clear the checkbox
      if (selected.length <= 0) {
        checkbox.indeterminate = false
        return false
      }
      // count > 0 and count < perPage, set checkbox state to 'indeterminate'
      else if (selected.length < this.vuetable.perPage) {
        checkbox.indeterminate = true
        return true
      }
      // count == perPage, set checkbox state to 'checked'
      else {
        checkbox.indeterminate = false
        return true
      }            
    }
  }
}
</script>
