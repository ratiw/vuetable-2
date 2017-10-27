<template>
  <span v-if="isHeader" v-html="title"></span>
  <span v-else>{{renderSequence()}}</span>
</template>

<script>
import VuetableColumnMixin from './VuetableColumnMixin.vue'

export default {
  name: 'vuetable-column-sequence',
  mixins: [VuetableColumnMixin],
  methods: {
    renderSequence() {
      return this.$parent.tablePagination
        ? this.$parent.tablePagination.from + this.rowIndex
        : this.rowIndex
    }
  }
}
</script>
