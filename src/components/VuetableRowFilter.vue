<template>
  <tr class="vuetable-row-filter">
    <template v-for="(field, fieldIndex) in tableFields">
      <template v-if="isFilterable(field)">
        <th :key="fieldIndex"
          :style="{width: field.width}"
        >
          <div class="ui fluid input">
            <input type="text" v-model="field.filter" placeholder="search..."
              @keyup.enter="setFilter(field)"
              @blur="setFilter(field)"
            >
          </div>
        </th>
      </template>
      <template v-else>
        <th :key="fieldIndex"></th>
      </template>
    </template>
    <th v-if="scrollVisible" :style="{width: scrollBarWidth}" class="vuetable-gutter-col"></th>
  </tr>
</template>

<script>
export default {
  computed: {
    tableFields() {
      return this.$parent.tableFields
    },
    scrollVisible() {
      return this.$parent.scrollVisible
    },
    scrollBarWidth() {
      return this.$parent.scrollBarWidth
    },
  },
  mounted() {
    this.tableFields.filter( (field) => {
      return this.isFilterable(field)
    })
    .map( (field) => {
      console.log('mounted', field.name)
      field.filter = ''
    })
  },
  methods: {
    isFilterable(field) {
      return field.visible && field.filterable
    },
    setFilter(field) {
      this.$emit('vuetable-row', 'filter', field)
    }
  }
}
</script>

<style>
table.vuetable tr.vuetable-row-filter th {
  padding: 0px;
}
table.vuetable tr.vuetable-row-filter input {
  border: 0px;
  border-radius: 0px;
}
</style>
