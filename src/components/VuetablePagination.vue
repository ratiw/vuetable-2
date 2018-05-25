<template>
  <div v-show="tablePagination && tablePagination.last_page > firstPage" :class="css.wrapperClass">
    <a @click="loadPage(firstPage)"
      :class="['btn-nav', css.linkClass, isOnFirstPage ? css.disabledClass : '']">
        <i v-if="css.icons.first != ''" :class="[css.icons.first]"></i>
        <span v-else>&laquo;</span>
    </a>
    <a @click="loadPage('prev')"
      :class="['btn-nav', css.linkClass, isOnFirstPage ? css.disabledClass : '']">
        <i v-if="css.icons.next != ''" :class="[css.icons.prev]"></i>
        <span v-else>&nbsp;&lsaquo;</span>
    </a>
    <template v-if="notEnoughPages">
      <template v-for="(n, i) in totalPage">
        <a @click="loadPage(i+firstPage)"
          :class="[css.pageClass, isCurrentPage(i+firstPage) ? css.activeClass : '']"
          v-html="n">
        </a>
      </template>
    </template>
    <template v-else>
      <template v-for="(n, i) in windowSize">
        <a @click="loadPage(windowStart+i+firstPage-1)"
          :class="[css.pageClass, isCurrentPage(windowStart+i+firstPage-1) ? css.activeClass : '']"
          v-html="windowStart+n-1">
        </a>
      </template>
    </template>
    <a @click="loadPage('next')"
      :class="['btn-nav', css.linkClass, isOnLastPage ? css.disabledClass : '']">
      <i v-if="css.icons.next != ''" :class="[css.icons.next]"></i>
      <span v-else>&rsaquo;&nbsp;</span>
    </a>
    <a @click="loadPage(lastPage)"
      :class="['btn-nav', css.linkClass, isOnLastPage ? css.disabledClass : '']">
      <i v-if="css.icons.last != ''" :class="[css.icons.last]"></i>
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
