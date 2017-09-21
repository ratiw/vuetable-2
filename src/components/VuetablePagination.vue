<template>
  <div v-show="tablePagination && tablePagination.last_page > 1" :class="css.wrapperClass">
    <a @click="loadPage(1)"
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
      <template v-for="n in totalPage">
        <a @click="loadPage(n)"
          :class="[css.pageClass, isCurrentPage(n) ? css.activeClass : '']"
          v-html="n">
        </a>
      </template>
    </template>
    <template v-else>
      <template v-for="n in windowSize">
        <a @click="loadPage(windowStart+n-1)"
          :class="[css.pageClass, isCurrentPage(windowStart+n-1) ? css.activeClass : '']"
          v-html="windowStart+n-1">
        </a>
      </template>
    </template>
    <a @click="loadPage('next')"
      :class="['btn-nav', css.linkClass, isOnLastPage ? css.disabledClass : '']">
      <i v-if="css.icons.next != ''" :class="[css.icons.next]"></i>
      <span v-else>&rsaquo;&nbsp;</span>
    </a>
    <a @click="loadPage(totalPage)"
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
