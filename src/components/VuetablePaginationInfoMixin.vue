<script>
export default {
  props: {
    paginationInfoClass: {
      type: String,
      default() {
        return 'left floated left aligned six wide column'
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
}
</script>
