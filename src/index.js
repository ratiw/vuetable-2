import Vuetable from './components/Vuetable.vue'

import VuetableFieldMixin from './components/VuetableFieldMixin.vue'
import VuetableFieldCheckboxMixin from './components/VuetableFieldCheckboxMixin.vue'
import VuetablePaginationMixin from './components/VuetablePaginationMixin.vue'
import VuetablePaginationInfoMixin from './components/VuetablePaginationInfoMixin.vue'

import VuetablePagination from './components/VuetablePagination.vue'
import VuetablePaginationDropDown from './components/VuetablePaginationDropdown.vue'
import VuetablePaginationInfo from './components/VuetablePaginationInfo.vue'
import VuetableFieldCheckbox from './components/VuetableFieldCheckbox.vue'
import VuetableFieldHandle from './components/VuetableFieldHandle.vue'
import VuetableFieldSequence from './components/VuetableFieldSequence.vue'
import VuetableRowHeader from './components/VuetableRowHeader.vue'
import VuetableColGutter from './components/VuetableColGutter.vue'
import Promise from 'promise-polyfill'

const rootVariable = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global) || this
if (!rootVariable.Promise) {
  rootVariable.Promise = Promise
}

function install(Vue) {
  Vue.component("vuetable", Vuetable);
  Vue.component("vuetable-col-gutter", VuetableColGutter)
  Vue.component("vuetable-field-checkbox", VuetableFieldCheckbox)
  Vue.component("vuetable-field-handle", VuetableFieldHandle)
  Vue.component("vuetable-field-sequence", VuetableFieldSequence)
  Vue.component("vuetable-pagination", VuetablePagination);
  Vue.component("vuetable-pagination-dropdown", VuetablePaginationDropDown);
  Vue.component("vuetable-pagination-info", VuetablePaginationInfo);
  Vue.component("vuetable-row-header", VuetableRowHeader)
}
export {
  Vuetable,
  // Mixins
  VuetableFieldMixin,
  VuetableFieldCheckboxMixin,
  VuetablePaginationInfoMixin,
  VuetablePaginationMixin,
  // UI components
  VuetableColGutter,
  VuetableFieldCheckbox,
  VuetableFieldHandle,
  VuetableFieldSequence,
  VuetablePagination,
  VuetablePaginationDropDown,
  VuetablePaginationInfo,
  VuetableRowHeader,

  install
};

export default Vuetable;
