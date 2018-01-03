import Vuetable from './components/Vuetable.vue'
import VuetablePagination from './components/VuetablePagination.vue'
import VuetablePaginationDropDown from './components/VuetablePaginationDropdown.vue'
import VuetablePaginationInfo from './components/VuetablePaginationInfo.vue'
import VuetablePaginationMixin from './components/VuetablePaginationMixin.vue'
import VuetablePaginationInfoMixin from './components/VuetablePaginationInfoMixin.vue'
import VuetableColumnCheckbox from './components/VuetableColumnCheckbox.vue'
import VuetableColumnHandle from './components/VuetableColumnHandle.vue'
import VuetableColumnSequence from './components/VuetableColumnSequence.vue'
import VuetableRowHeader from './components/VuetableRowHeader.vue'
import Promise from 'promise-polyfill'

if (!window.Promise) {
	window.Promise = Promise
}

function install(Vue){
  Vue.component("vuetable", Vuetable);
  Vue.component("vuetable-pagination", VuetablePagination);
  Vue.component("vuetable-pagination-dropdown", VuetablePaginationDropDown);
  Vue.component("vuetable-pagination-info", VuetablePaginationInfo);
  Vue.component("vuetable-column-checkbox", VuetableColumnCheckbox)
  Vue.component("vuetable-column-handle", VuetableColumnHandle)
  Vue.component("vuetable-column-sequence", VuetableColumnSequence)
  Vue.component("vuetable-row-header", VuetableRowHeader)
}
export {
  Vuetable,
  VuetablePagination,
  VuetablePaginationDropDown,
  VuetablePaginationInfo,
  VuetablePaginationMixin,
  VuetablePaginationInfoMixin,
  VuetableColumnCheckbox,
  VuetableColumnHandle,
  VuetableColumnSequence,
  VuetableRowHeader,
  install
};

export default Vuetable;
