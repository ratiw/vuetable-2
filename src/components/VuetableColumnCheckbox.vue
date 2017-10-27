<template>
  <input v-if="isHeader" type="checkbox"
    @change="toggleAllCheckbox(rowField, $event)"
    :checked="isSelected"
  >
  <input v-else type="checkbox"
    @change="toggleCheckbox(rowData, $event)"
    :checked="isSelected"
  >
</template>
<script>
import VuetableColumnMixin from './VuetableColumnMixin.vue'

export default {
  name: 'vuetable-column-checkbox',
  mixins: [VuetableColumnMixin],
  methods: {
    toggleCheckbox(dataItem, event) {
      let isChecked = event.target.checked

      this.$emit('vuetable-column', 'checkbox-toggled', {
        isChecked, field: this.rowField, dataItem,
      })
    },
    toggleAllCheckbox(field, event) {
      let isChecked = event.target.checked

      this.$emit('vuetable-column', 'checkbox-toggled-all', {
        isChecked, field
      })
    }
  }
}
</script>
