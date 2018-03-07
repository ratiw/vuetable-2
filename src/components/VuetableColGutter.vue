<template>
  <th
    :style="{width: vuetable.scrollBarWidth}" 
    class="vuetable-th-gutter"
  ></th>
</template>

<script>
export default {
  name: 'vuetable-th-gutter',

  computed: {
    vuetable() {
      return this.$parent
    }
  }
  
}
</script>

<style>
  .vuetable-th-gutter {
    padding: 0 !important;
    border-left: none  !important;
    border-right: none  !important;
  }
</style>
