<template>
  <div :class="[css.wrapperClass]">
    <a @click="loadPage('prev')"
       :class="[css.linkClass, {[css.disabledClass] : isOnFirstPage}]">
      <i :class="css.icons.prev"></i>
    </a>
    <select :class="['vuetable-pagination-dropdown', css.dropdownClass]" @change="loadPage($event.target.selectedIndex+1)">
      <option v-for="n in totalPage" :class="[css.pageClass]" :value="n" :selected="isCurrentPage(n)">
        {{pageText}} {{n}}
      </option>
    </select>
    <a @click="loadPage('next')"
       :class="[css.linkClass, {[css.disabledClass] : isOnLastPage}]">
      <i :class="css.icons.next"></i>
    </a>
  </div>
</template>

<script>
import PaginationMixin from './VuetablePaginationMixin.vue'

export default {
  mixins: [PaginationMixin],
  props: {
    pageText: {
      type: String,
      default () {
        return 'Page'
      }
    }
  },
  methods: {
    registerEvents () {
      let self = this

      this.$on('vuetable:pagination-data', (tablePagination) => {
        self.setPaginationData(tablePagination)
      })
    }
  },
  created () {
    this.registerEvents()
  }
}
</script>
