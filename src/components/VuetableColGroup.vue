<template>
  <colgroup>
    <template v-for="(field, fieldIndex) in vuetable.tableFields">
      <template v-if="field.visible">
      <col :key="fieldIndex"
          :style="{width: field.width}"
          :class="columnClass(field, fieldIndex)"
      >
      </template>
    </template>
    <col v-if="isHeader && vuetable.scrollVisible" 
      :style="{width: vuetable.scrollBarWidth}" 
      class="vuetable-col-gutter"
    >
  </colgroup>
</template>

<script>
export default {
  name: 'vuetable-col-group',

  props: {
    isHeader: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    vuetable() {
      return this.$parent
    }
  },

  methods: {
    columnClass (field, fieldIndex) {
      let fieldName = typeof(field.name) === "object" && field.name !== null
        ? field.name.name
        : field.name
      fieldName = fieldName.replace(this.fieldPrefix, "")

      return ['vuetable-col-'+fieldName, field.titleClass]
    },
  }
}
</script>
