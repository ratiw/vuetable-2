<template>
  <th v-if="isHeader" 
    class="vuetable-th-component-handle"
    v-html="title"
  ></th>
  <td v-else 
    class="vuetable-td-component-handle"
    v-html="renderIconTag(['handle-icon', css.handleIcon])"
  ></td>
</template>

<script>
import VuetableFieldMixin from './VuetableFieldMixin.vue'

export default {
  name: 'vuetable-field-handle',

  mixins: [VuetableFieldMixin],

  computed: {
    css() {
      return this.vuetable.$_css
    }
  },

  methods: {
    renderIconTag(classes, options = '') {
      return typeof(this.css.renderIcon) === 'undefined'
        ? `<i class="${classes.join(' ')}" ${options}></i>`
        : this.css.renderIcon(classes, options)
    }
  }
}
</script>
