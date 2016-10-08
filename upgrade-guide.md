# Upgrade Guide
- Pagination and Pagination Info

    Pagination and pagination info are still in the package but no longer part of `vuetable`. That means you will have to explicitly include them in your template and wire them up to `vuetable` using availble events.

    This is very easy though. Basically, you just need to listen to `vuetable:pagination-data` event to get the pagination information, then call `setPaginationData()` on both `Pagination` and `PaginationInfo` components.
    Please see the provided example.

    The reason behind this is that uncoupling the pagination and pagination info components from `vuetable` makes it more flexible and light weight. If you do not need pagination component, you don't have to use it. Or if you want to use your own pagination component or put it somewhere else, you can easily do that.

- Vuetable Events

    Due to the change in Vue 2.0 the deprecates `$broadcast` and `$dispatch` the events and encourages the use of centralized event hub, you can no longer send an event to `vuetable` to perform the task (e.g. `vuetable:reload`, `vuetable:refresh`) as before.

    In earlier version of `vuetable`, it usually uses and provides those events for communications between its internal components (e.g. Vuetable, VuetablePagination, etc). In this case, moving all those events to `vuex` seems over-kill and inappropriate since `vuex` is intended to be use as an centralized state management for an application.

    Although, those events were removed in this version, but almost all the functionality are still there in the methods inside `vuetable`. You can easily call it by referencing `vuetable` component in your code using [`ref`](http://vuejs.org/api/#ref) attribute.

    For the list of availble and removed events, please see the [What's Change] section.

- `__actions` field

    The `__actions` special field was deprecated and can easily be replaced by the `__component` special field, which is more useful and shouldn't have any limitation since you can now use the full power of Vue.js.

    Please see the provided example for the replacing action component.

- `append-params`

    The type of `append-params` has been changed from `Array` to `Object` type.

- CSS styling

    All the related CSS classes has been moved into `css` prop, which is an `Object` type. This should make the template shorter and cleaner to look.

