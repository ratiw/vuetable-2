<script>
import VuetableFieldMixin from './VuetableFieldMixin.vue'

export default {
  mixins: [VuetableFieldMixin],

  methods: {
    toggleCheckbox(dataItem, event) {
      this.vuetable.onCheckboxToggled(event.target.checked, this.rowField.name, dataItem)
    },

    toggleAllCheckbox(field, event) {
      this.vuetable.onCheckboxToggledAll(event.target.checked)
    },

    isSelected(rowData) {
      return this.vuetable.isSelectedRow(rowData[this.vuetable.trackBy])
    },

    isAllItemsInCurrentPageSelected() {
      if (! this.vuetable.tableData) return 
      
      let idColumn = this.vuetable.trackBy
      let selected = this.vuetable.tableData.filter( (item) => this.vuetable.isSelectedRow(item[idColumn]) )

      // count == 0, clear the checkbox
      if (selected.length <= 0) {
        this.$el.indeterminate = false
        return false
      }
      // count > 0 and count < perPage, set checkbox state to 'indeterminate'
      else if (selected.length < this.vuetable.perPage) {
        this.$el.indeterminate = true
        return true
      }
      // count == perPage, set checkbox state to 'checked'
      else {
        this.$el.indeterminate = false
        return true
      }            
    }
  }
}
</script>
