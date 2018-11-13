<script>
  export default {
    data() {
      return {
        isLoadingData: false,
        rowElemHeight: 0,
      }
    },
    props: {
      infiniteScroll: {
        type: Boolean,
        default: false,
      },
      numRowsToBottom: {
        type: Number,
        default: 10,
      },
    },
    methods: {
      handleInfiniteScroll(e) {
        const { clientHeight, scrollTop, scrollHeight } = e.target
        if (this.isLoadingData) return
        if (clientHeight + scrollTop > scrollHeight - (this.numRowsToBottom * this.rowElemHeight)) {
          this.isLoadingData = true
          this.gotoNextPage()
        }
      },
      dataReceived() {
        this.isLoadingData = false
      },
    },
    mounted() {
      if (!this.isFixedHeader) return
      const tBody = this.$el.getElementsByClassName('vuetable-body-wrapper')[0]
      const rowElem = this.$el.querySelectorAll('tbody.vuetable-body tr')[0]
      if (!tBody || !rowElem) return
      this.rowElemHeight = rowElem.clientHeight
      tBody.addEventListener('scroll', this.handleInfiniteScroll)
      this.$on('vuetable:loaded', this.dataReceived)
    },
    destroyed() {
      const tBody = this.$el.getElementsByClassName('vuetable-body-wrapper')[0]
      if (tBody != null) {
        tBody.removeEventListener('scroll', this.handleInfiniteScroll)
        this.$off('vuetable:loaded', this.dataReceived)
      }
    },
  }
</script>
