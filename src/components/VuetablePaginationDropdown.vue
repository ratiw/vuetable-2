<template>
  <div :class="[$_css.wrapperClass]">
    <a @click="loadPage('prev')"
       :class="[$_css.linkClass, {[$_css.disabledClass] : isOnFirstPage}]">
      <i :class="$_css.icons.prev"></i>
    </a>
    <select :class="['vuetable-pagination-dropdown', $_css.dropdownClass]" @change="loadPage($event.target.selectedIndex+firstPage)">
      <option v-for="(n, i) in totalPage" :key="n" :class="[$_css.pageClass]" :value="i+firstPage" :selected="isCurrentPage(i+firstPage)">
        {{pageText}} {{n}}
      </option>
    </select>
    <a @click="loadPage('next')"
       :class="[$_css.linkClass, {[$_css.disabledClass] : isOnLastPage}]">
      <i :class="$_css.icons.next"></i>
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
      this.$on('vuetable:pagination-data', (tablePagination) => {
        this.setPaginationData(tablePagination)
      })
    }
  },
  created () {
    this.registerEvents()
  }
}
</script>
