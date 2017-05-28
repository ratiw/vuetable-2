## VuetablePaginationDropdown

`VuetablePaginationDropdown` uses `VuetablePaginationMixin`, so all properties, computed properties, methods, and events in `VuetablePaginationMixin` are also available in this class.

### Uses
- [VuetablePaginationMixin](VuetablePaginationMixin)

### Properties
#### # page-text
- type: _String_
- default: `Page`
- description

  The text to be displayed in the select page dropdown.

### Methods
No additional methods

### Events

#### # vuetable-pagination:change-page
- See [VuetablePaginationMixin](VuetablePaginationMixin#-vuetable-paginationchange-page)
  
#### # vuetable-pagination:pagination-data
- type: _listen_
- params:
  - tablePagination: _Object_ -- pagination information
- description:

  This event will have pagination information in its payload that will be used for rendering of pagination component.
  