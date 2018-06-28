<template>
    <ul v-if="tablePagination && tablePagination.last_page > 1" :class="css.wrapperClass">
        <li v-if="!isOnFirstPage" :class="[{'btn-nav': true}, css.linkClass, isOnFirstPage ? css.disabledClass : '']">
        <a @click="loadPage(1)"
           >
            <span>&laquo;</span>
        </a>
        </li>
        <li v-if="!isOnFirstPage" :class="[{'btn-nav': true}, css.linkClass, isOnFirstPage ? css.disabledClass : '']">
            <a @click="loadPage('prev')">
            <span >&nbsp;&lsaquo;</span>
        </a>
        </li>
        <template v-if="notEnoughPages">
            <template v-for="n in totalPage">
                <li :class="[css.pageClass, isCurrentPage(n) ? css.activeClass : '']"><a @click="loadPage(n)"
                   v-html="n">
                </a>
                </li>
            </template>
        </template>
        <template v-else>
            <template v-for="n in windowSize">
                <li :class="[css.pageClass, isCurrentPage(windowStart+n-1) ? css.activeClass : '']">
                    <a @click="loadPage(windowStart+n-1)"
                    v-html="windowStart+n-1">
                </a>
                </li>
            </template>
        </template>
        <li v-if="!isOnLastPage" :class="[{'btn-nav': true}, css.linkClass, isOnLastPage ? css.disabledClass : '']">
            <a @click="loadPage('next')">
                <span>&rsaquo;&nbsp;</span>
            </a>
        </li>
        <li v-if="!isOnLastPage" :class="[{'btn-nav': true}, css.linkClass, isOnLastPage ? css.disabledClass : '']">
            <a @click="loadPage(totalPage)">
                <span>&raquo;</span>
            </a>
        </li>
    </ul>
</template>

<script type="text/babel">
    export default {
        props: {
            css: {
                type: Object,
                default () {
                    return {
                        wrapperClass: 'pagination',
                        activeClass: 'active',
                        disabledClass: 'disabled',
                        pageClass: 'item',
                        linkClass: 'icon item',
                        paginationClass: 'ui bottom attached segment grid',
                        paginationInfoClass: 'left floated left aligned six wide column',
                    }
                }
            },
            icons: {
                type: Object,
                default () {
                    return {
                        first: 'angle double left icon',
                        prev: 'left chevron icon',
                        next: 'right chevron icon',
                        last: 'angle double right icon',
                    }
                }
            },
            onEachSide: {
                type: Number,
                default () {
                    return 2
                }
            },
            paginationInfoTemplate: {
                type: String,
                default() {
                    return "Displaying {from} to {to} of {total} items"
                }
            },
            paginationInfoNoDataTemplate: {
                type: String,
                default() {
                    return 'No relevant data'
                }
            },
        },
        data: function() {
            return {
                tablePagination: null
            }
        },
        computed: {
            totalPage () {
                return this.tablePagination === null
                        ? 0
                        : this.tablePagination.last_page
            },
            isOnFirstPage () {
                return this.tablePagination === null
                        ? false
                        : this.tablePagination.current_page === 1
            },
            isOnLastPage () {
                return this.tablePagination === null
                        ? false
                        : this.tablePagination.current_page === this.tablePagination.last_page
            },
            notEnoughPages () {
                return this.totalPage < (this.onEachSide * 2) + 4
            },
            windowSize () {
                return this.onEachSide * 2 +1;
            },
            windowStart () {
                if (!this.tablePagination || this.tablePagination.current_page <= this.onEachSide) {
                    return 1
                } else if (this.tablePagination.current_page >= (this.totalPage - this.onEachSide)) {
                    return this.totalPage - this.onEachSide*2
                }

                return this.tablePagination.current_page - this.onEachSide
            },
        },
        methods: {
            loadPage (page) {
                this.$emit('vuetable-pagination:change-page', page)
            },
            isCurrentPage (page) {
                return page === this.tablePagination.current_page
            },
            setPaginationData (tablePagination) {
                this.tablePagination = tablePagination
            },
            registerEvents () {
                let self = this

                this.$on('vuetable-pagination:set-options', (options) => {
                    for (var n in options) {
                    Vue.set(self, n, options[n])
                }
            })
            }
        },
        created () {
            this.registerEvents()
        }
    }
</script>
