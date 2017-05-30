# Pagination

Vuetable comes ready with two pagination components and a pagination information component which you can extend to easily build your own.
- [VuetablePagination](VuetablePagination)
- [VuetablePaginationDropdown](VuetablePaginationDropDown)
- [VuetablePaginationInfo](VuetablePaginationInfo)

You can see the usage from the [lesson 7](https://github.com/ratiw/vuetable-2-tutorial/blob/master/doc/lesson-07.md) of the tutorial.

## VuetablePagination

This is a sliding pagination port from [Laravel](https://laravel.com).

By default, it will render 5 sliding pages and navigation buttons for first page, previous page, next page, and last page. The number of sliding pages will also be even number with the current displayed page being in the center. 

The number of sliding pages can be configured via `on-each-side` prop and will be calculated using this formula.
```
number of sliding pages = onEachSide * 2 +1
```

## VuetablePaginationDropdown

It was designed to take up less space as all the pages will be put inside a dropdown for the user to select and jump to the selected page.

Vuetable provides a `VautablePaginationMixin` and `VuetablePaginationInfoMixin` to help creating custom pagination component an easy task. Please see the source code as it is very straight forward, but you will need some knowledge about Vue.js.
