module.exports = {
  VueTable: require("./components/Vuetable.vue"),
  VueTablePagination: require("./components/VuetablePagination.vue"),
  VueTablePaginationDropDown: require("./components/VuetablePaginationDropdown.vue"),
  VueTablePaginationInfo: require("./components/VuetablePaginationInfo.vue"),

  install(Vue) {
    Vue.component("VueTable", module.exports.VueTable);
    Vue.component("VueTablePagination", module.exports.VueTablePagination);
    Vue.component("VueTablePaginationDropDown", module.exports.VueTablePaginationDropDown);
    Vue.component("VueTablePaginationInfo", module.exports.VueTablePaginationInfo);
  }
};
