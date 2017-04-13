# What's Changed
- `vuetable-pagination` is no longer part of `vuetable` by default.
    + better customization
    + cleaner implementation
    + easy to setup
        * listen to `vuetable:pagination-data` event on `vuetable-table>` component to wire the pagination data to `vuetable-pagination` component.
        * listen to `vuetable-pagination:change-page` event on designated `vuetable-pagination` component to wire the page changing request to `vuetable-table`
- Due to deprecations of $broadcast and $dispatch in Vue 2.0, all of the listening events where you used to be able to sent vuetable to perform task, e.g. `refresh()` are no longer existed. Please check documentation. You are now required to use `ref` to directly refer to the `vuetable` components to directly use its API for certain functionality.
    + Available events
        * vuetable:loading
        * vuetable:loaded
        * vuetable:load-success
        * vuetable:load-error
        * vuetable:pagination-data
        * vuetable:row-changed
        * vuetable:row-clicked
        * vuetable:detail-row-clicked
        * vuetable:cell-clicked
        * vuetable:cell-dblclicked
        * vuetable:checkbox-toggled
    + No longer available
        * vuetable:reload -- directly call `reload()` method instead
        * vuetable:refresh -- directly call `refresh()` method instead
        * vuetable:goto-page -- directly call `changePage()` method instead
        * vuetable-pagination:change-page -- no real use now
        * vuetable:action -- no longer use as `__actions` is removed.
- `__actions` special field was removed in favor of `__component`. See example.
- `appendParams` prop type changes from Array to Object to reflect the change in updating vue-resource to version 1.0 (Breaking Change)
- vuetable should now work with IE, thanks to template compilation to virtual DOM.
- Removed properties
    + `wrapper-class`
    + `table-wrapper`
    + `show-pagination`
    + `pagination-component`
    + `pagination-component-class`
    + `pagination-class`
    + `selected-to`
    + `http-data` -- vue-resource API change, use `http-options` instead
- Moved properties
    + The following are properties related to CSS, which are now moved inside `css` prop.
        * `tableClass`
        * `loadingClass`
        * `ascendingIcon`
        * `descendingIcon`
        * `detailRowClass`
    + The following pagination info related properties are now moved into its own component `PaginationInfo`.
        * `pagination-info-class`
        * `pagination-info-template`
        * `pagination-info-no-data-template`
- `vuetable:load-success` event is now fired right after the requested data has been successfully retrieved. This is logically how it should be. Previously, it was fired after the `tableData` and `tablePagination` have been set.

# New Features
- Data transformation via `transform` method.



