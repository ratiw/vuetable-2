<template>
  <span v-if="isHeader" v-html="title"></span>
  <span v-else>{{renderSequence()}}</span>
</template>

<script>
import VuetableFieldMixin from './VuetableFieldMixin.vue'

export default {
  name: 'vuetable-field-sequence',
  mixins: [VuetableFieldMixin],
  methods: {
    renderSequence() {
      return this.$parent.tablePagination
        ? this.$parent.tablePagination.from + this.rowIndex
        : this.rowIndex
    }
  }
}
</script>
