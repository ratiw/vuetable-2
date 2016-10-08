<template>
  <div :class="[css.wrapperClass]">
    <a @click="loadPage('prev')"
       :class="[css.linkClass, isOnFirstPage ? css.disabledClass : '']">
      <i :class="icons.prev"></i>
    </a>
    <select :class="[{'vuetable-pagination-dropdown': true}, dropdownClass]" @change="selectPage($event)">
      <option v-for="n in totalPage" :class="[css.pageClass]" :value="n" :selected="isCurrentPage(n)">
        {{pageText}} {{n}}
      </option>
    </select>
    <a @click="loadPage('next')"
       :class="[css.linkClass, isOnLastPage ? css.disabledClass : '']">
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
      // update dropdown value
      // if (page == 'prev' && !this.isOnFirstPage) {
      //   this.setDropdownToPage(this.tablePagination.current_page-1)
      // } else if (page == 'next' && !this.isOnLastPage) {
      //   this.setDropdownToPage(this.tablePagination.current_page+1)
      // }

      this.$emit('vuetable-pagination:change-page', page)
    },
    // setDropdownToPage (page) {
    //   this.$nextTick( () => {
    //     let el = document.getElementById('vuetable-pagination-dropdown')
    //     if (el) {
    //       el.value = page
    //     }
    //   })
    // },
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
