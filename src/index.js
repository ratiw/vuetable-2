import Vuetable from './components/Vuetable.vue'
import VueTablePagination from './components/VuetablePagination.vue'
import VueTablePaginationDropDown from './components/VuetablePaginationDropdown.vue'
import VueTablePaginationInfo from './components/VuetablePaginationInfo.vue'

function install(Vue){
  Vue.component("vuetable", Vuetable);
  Vue.component("vuetable-pagination", VueTablePaginationInfo);
  Vue.component("vuetable-pagination-dropdown", VueTablePaginationDropDown);
  Vue.component("vuetable-pagination-info", VueTablePaginationInfo);
}
export {
  Vuetable,
  VueTablePagination,
  VueTablePaginationDropDown,
  VueTablePaginationInfo,
  install
};

export default Vuetable;
