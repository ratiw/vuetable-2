import Vuetable from './components/Vuetable.vue'
import VuetablePagination from './components/VuetablePagination.vue'
import VuetablePaginationDropDown from './components/VuetablePaginationDropdown.vue'
import VuetablePaginationInfo from './components/VuetablePaginationInfo.vue'
import VuetablePaginationMixin from './components/VuetablePaginationMixin.vue'
import VuetablePaginationInfoMixin from './components/VuetablePaginationInfoMixin.vue'
import Promise from 'promise-polyfill'

const rootVariable = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global) || this
if (!rootVariable.Promise) {
  rootVariable.Promise = Promise
}

function install(Vue){
  Vue.component("vuetable", Vuetable);
  Vue.component("vuetable-pagination", VuetablePagination);
  Vue.component("vuetable-pagination-dropdown", VuetablePaginationDropDown);
  Vue.component("vuetable-pagination-info", VuetablePaginationInfo);
}
export {
  Vuetable,
  VuetablePagination,
  VuetablePaginationDropDown,
  VuetablePaginationInfo,
  VuetablePaginationMixin,
  VuetablePaginationInfoMixin,
  install
};

export default Vuetable;
