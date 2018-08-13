<template>
  <div v-show="tablePagination && lastPage > firstPage" :class="$_css.wrapperClass">
    <a @click="loadPage(firstPage)"
      :class="['btn-nav', $_css.linkClass, isOnFirstPage ? $_css.disabledClass : '']">
        <i v-if="$_css.icons.first != ''" :class="[$_css.icons.first]"></i>
        <span v-else>&laquo;</span>
    </a>
    <a @click="loadPage('prev')"
      :class="['btn-nav', $_css.linkClass, isOnFirstPage ? $_css.disabledClass : '']">
        <i v-if="$_css.icons.next != ''" :class="[$_css.icons.prev]"></i>
        <span v-else>&nbsp;&lsaquo;</span>
    </a>
    <template v-if="notEnoughPages">
      <template v-for="(n, i) in totalPage">
        <a @click="loadPage(i+firstPage)" :key="i"
          :class="[$_css.pageClass, isCurrentPage(i+firstPage) ? $_css.activeClass : '']"
          v-html="n">
        </a>
      </template>
    </template>
    <template v-else>
      <template v-for="(n, i) in windowSize">
        <a @click="loadPage(windowStart+i+firstPage-1)" :key="i"
          :class="[$_css.pageClass, isCurrentPage(windowStart+i+firstPage-1) ? $_css.activeClass : '']"
          v-html="windowStart+n-1">
        </a>
      </template>
    </template>
    <a @click="loadPage('next')"
      :class="['btn-nav', $_css.linkClass, isOnLastPage ? $_css.disabledClass : '']">
      <i v-if="$_css.icons.next != ''" :class="[$_css.icons.next]"></i>
      <span v-else>&rsaquo;&nbsp;</span>
    </a>
    <a @click="loadPage(lastPage)"
      :class="['btn-nav', $_css.linkClass, isOnLastPage ? $_css.disabledClass : '']">
      <i v-if="$_css.icons.last != ''" :class="[$_css.icons.last]"></i>
      <span v-else>&raquo;</span>
    </a>
  </div>
</template>

<script>
import PaginationMixin from './VuetablePaginationMixin.vue'

export default {
  mixins: [PaginationMixin],
}
</script>
<style>
  .vuetable-pagination {
    background: #f9fafb !important;
  }
</style>
