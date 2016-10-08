<template>
  <div :class="[{'vuetable-pagination-info': true}, paginationInfoClass]"
    v-html="paginationInfo">
  </div>
</template>

<script>
import PaginationInfoMixin from './VuetablePaginationInfoMixin.vue'

export default {
  name: 'pagination-info',
  mixins: [PaginationInfoMixin],
  computed: {
    paginationInfo () {
      if (this.tablePagination == null || this.tablePagination.total == 0) {
        return this.paginationInfoNoDataTemplate
      }

      return this.paginationInfoTemplate
        .replace('{from}', this.tablePagination.from || 0)
        .replace('{to}', this.tablePagination.to || 0)
        .replace('{total}', this.tablePagination.total || 0)
    },
  },
  data: function() {
    return {
      tablePagination: null
    }
  },
  methods: {
    setPaginationData (tablePagination) {
      this.tablePagination = tablePagination
    },
  },
}
</script>
