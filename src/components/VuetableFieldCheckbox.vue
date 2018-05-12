<template>
  <th v-if="isHeader"
    class="vuetable-th-component-checkbox"
  >
    <input type="checkbox"
      @change="toggleAllCheckbox($event)"
      :checked="isAllItemsInCurrentPageSelected()"
    >
  </th>
  <td v-else
    class="vuetable-td-component-checkbox"
  >
    <input type="checkbox"
      @change="toggleCheckbox(rowData, $event)"
      :checked="isSelected(rowData)"
    >
  </td>
</template>
<script>
import VuetableFieldCheckboxMixin from './VuetableFieldCheckboxMixin.vue'

export default {
  name: 'vuetable-field-checkbox',

  mixins: [VuetableFieldCheckboxMixin],
}
</script>
