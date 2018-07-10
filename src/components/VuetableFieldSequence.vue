<template>
  <th v-if="isHeader"
    class="vuetable-th-component-sequence"
    v-html="title"
  ></th>
  <td v-else
    class="vuetable-td-component-sequence"
    v-html="renderSequence()"
  ></td>
</template>

<script>
import VuetableFieldMixin from './VuetableFieldMixin.vue'

export default {
  name: 'vuetable-field-sequence',
  
  mixins: [VuetableFieldMixin],

  methods: {
    renderSequence() {
      return this.vuetable.tablePagination
        ? this.vuetable.tablePagination.from + this.rowIndex
        : 1 + this.rowIndex
    }
  }
}
</script>
