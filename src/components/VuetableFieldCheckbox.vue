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
import VuetableFieldMixin from './VuetableFieldMixin.vue'

export default {
  name: 'vuetable-field-checkbox',
  mixins: [VuetableFieldMixin],
  methods: {
    toggleCheckbox(dataItem, event) {
      let isChecked = event.target.checked

      this.$emit('vuetable-field', 'checkbox-toggled', {
        isChecked, field: this.rowField, dataItem,
      })
    },
    toggleAllCheckbox(field, event) {
      let isChecked = event.target.checked

      this.$emit('vuetable-field', 'checkbox-toggled-all', {
        isChecked, field
      })
    }
  }
}
</script>
