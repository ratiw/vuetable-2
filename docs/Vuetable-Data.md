## Vuetable - Data

- [eventPrefix](#-eventprefix)
- [tableFields](#-tablefields)
- [tableData](#-tabledata)
- [tablePagination](#-tablepagination)
- [currentPage](#-currentpage)
- [selectedTo](#-selectedto)
- [visibleDetailRows](#-visibledetailrows)

### # eventPrefix
- type: _String_
- default: `vuetable:`
- description

  The event prefix that Vuetable is going to use when emitting the event.

### # tableFields
- type: _Array_
- default: `[]` _(empty array)_
- description

  The normalized version of fields definition. This is done during the `created` hook.

### # tableData
- type: _Array_
- default: `null`
- description

  In `api-mode`, this stores the data that returned from the server after the sucessful AJAX request. Otherwise,
  it stores the data assigned to via `data` prop or `setData` method. Vuetable always use `tableData` for table
  rendering.

### # tablePagination
- type: _Object_
- default: `null`
- description

  If the data returned from the server contains pagination information specified in the `pagination-path`, this is where it gets stored.

### # currentPage
- type: _Number_
- default: `1`
- description

  Vuetable use this to keep track of the current page being diplayed.

### # selectedTo
- type: _Array_
- default: `[]` _(empty array)_
- description

  When `__checkbox` field option is used and the user selected/unselected any checkbox, its row indentifier is either stored in or remove from here. The row identifier can be specified using `track-by` option.

### # visibleDetailRows
- type: _Array_
- default: `[]` _(empty array)_
- description

  This stores the row identifier of any row where its detail row is visible.

