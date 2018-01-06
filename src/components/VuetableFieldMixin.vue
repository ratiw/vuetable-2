<script>
export default {
  props: {
    rowData: {
      type: Object,
      default: null
    },
    rowIndex: {
      type: Number
    },
    rowField: {
      type: Object
    },
    isHeader: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    // css: {
    //   type: Object,
    //   default: () => {}
    // },
    vuetable: {
      type: Object,
      default: () => null
    }
  }
}
</script>
