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
      let fieldName
      if (typeof field.name === "function") {
        let component = field.name

        // if the component was defined with `Vue.extend`, use the name property
        if (typeof component.options === "object" && component.options.name) {
          fieldName = component.options.name
        }
        // if no name was specified in the options or if the component is
        // an es6 classstyle component, use the name of the function instead
        else {
          fieldName = component.name
        }
      } else if (typeof field.name === "object" && field.name !== null) {
        fieldName = field.name.name // use the name property
      } else {
        fieldName = field.name
      }
      fieldName = fieldName.replace(this.fieldPrefix, "")

      return ['vuetable-col-'+fieldName, field.titleClass]
    },
  }
}
</script>
