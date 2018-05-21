<template>
  <div v-show="tablePagination && tablePagination.last_page > 1" :class="$_css.wrapperClass">
    <a @click="loadPage(1)"
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
      <template v-for="(n, idx) in totalPage">
        <a @click="loadPage(n)" :key="idx"
          :class="[$_css.pageClass, isCurrentPage(n) ? $_css.activeClass : '']"
          v-html="n">
        </a>
      </template>
    </template>
    <template v-else>
      <template v-for="(n, idx) in windowSize">
        <a @click="loadPage(windowStart+n-1)" :key="idx"
          :class="[$_css.pageClass, isCurrentPage(windowStart+n-1) ? $_css.activeClass : '']"
          v-html="windowStart+n-1">
        </a>
      </template>
    </template>
    <a @click="loadPage('next')"
      :class="['btn-nav', $_css.linkClass, isOnLastPage ? $_css.disabledClass : '']">
      <i v-if="$_css.icons.next != ''" :class="[$_css.icons.next]"></i>
      <span v-else>&rsaquo;&nbsp;</span>
    </a>
    <a @click="loadPage(totalPage)"
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
