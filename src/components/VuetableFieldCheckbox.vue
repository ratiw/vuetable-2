<template>
  <input v-if="isHeader" type="checkbox"
    @change="toggleAllCheckbox(rowField, $event)"
    :checked="isAllItemsInCurrentPageSelected()"
  >
  <input v-else type="checkbox"
    @change="toggleCheckbox(rowData, $event)"
    :checked="isSelected(rowData)"
  >
</template>
<script>
import VuetableFieldCheckboxMixin from './VuetableFieldCheckboxMixin.vue'

export default {
  name: 'vuetable-field-checkbox',

  mixins: [VuetableFieldCheckboxMixin],
}
</script>
