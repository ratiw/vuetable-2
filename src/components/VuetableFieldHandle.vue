<template>
  <span v-if="isHeader" v-html="title"></span>
  <span v-else v-html="renderIconTag(['handle-icon', css.handleIcon])"></span>
</template>

<script>
import VuetableFieldMixin from './VuetableFieldMixin.vue'

export default {
  name: 'vuetable-field-handle',

  mixins: [VuetableFieldMixin],

  computed: {
    css() {
      return this.vuetable.css
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
