<template>
  <span v-if="isHeader" v-html="title"></span>
  <span v-else v-html="renderIconTag(['handle-icon', css.handleIcon])"></span>
</template>

<script>
import VuetableColumnMixin from './VuetableColumnMixin.vue'

export default {
  name: 'vuetable-column-handle',
  mixins: [VuetableColumnMixin],
  methods: {
    renderIconTag(classes, options = '') {
      return typeof(this.css.renderIcon) === 'undefined'
        ? `<i class="${classes.join(' ')}" ${options}></i>`
        : this.css.renderIcon(classes, options)
    }
  }
}
</script>
