<template>
  <div :class="['vuetable-pagination-info', css.infoClass]"
    v-html="paginationInfo">
  </div>
</template>

<script>
import PaginationInfoMixin from './VuetablePaginationInfoMixin.vue'

export default {
  mixins: [PaginationInfoMixin],
  computed: {
    paginationInfo () {
      if (this.tablePagination == null || this.tablePagination.total == 0) {
        return this.noDataTemplate
      }

      return this.infoTemplate
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
