<template>
  <div :class="[css.wrapperClass]">
    <a @click="loadPage('prev')"
       :class="[css.linkClass, {[css.disabledClass] : isOnFirstPage}]">
      <i :class="icons.prev"></i>
    </a>
    <select :class="['vuetable-pagination-dropdown', dropdownClass]" @change="selectPage($event)">
      <option v-for="n in totalPage" :class="[css.pageClass]" :value="n" :selected="isCurrentPage(n)">
        {{pageText}} {{n}}
      </option>
    </select>
    <a @click="loadPage('next')"
       :class="[css.linkClass, {[css.disabledClass] : isOnLastPage}]">
      <i :class="icons.next"></i>
    </a>
  </div>
</template>

<script>
import PaginationMixin from './VuetablePaginationMixin.vue'

export default {
  mixins: [PaginationMixin],
  props: {
    dropdownClass: {
      type: String,
      default () {
        return 'ui search dropdown'
      }
    },
    pageText: {
      type: String,
      default () {
        return 'Page'
      }
    }
  },
  methods: {
    loadPage (page) {
      this.$emit('vuetable-pagination:change-page', page)
    },
    selectPage (event) {
      this.$emit('vuetable-pagination:change-page', event.target.selectedIndex+1)
    },
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
