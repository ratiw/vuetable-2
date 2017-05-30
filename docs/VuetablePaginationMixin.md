## VuetablePaginationMixin

This mixin provides sliding style pagination functionality where the current page (when not at the first or last position) is always in the middle of pagination list.

### Properties

#### # css
- type: _Object_
- default: 
  ```javascript
  {
    wrapperClass: 'ui right floated pagination menu',
    activeClass: 'active large',
    disabledClass: 'disabled',
    pageClass: 'item',
    linkClass: 'icon item',
    paginationClass: 'ui bottom attached segment grid',
    paginationInfoClass: 'left floated left aligned six wide column',
    dropdownClass: 'ui search dropdown',
    icons: {
      first: 'angle double left icon',
      prev: 'left chevron icon',
      next: 'right chevron icon',
      last: 'angle double right icon',
    }
  }
  ```
- description

  The `css` property holds most of the CSS classes that VuetablePagination uses in its template.

#### # on-each-side
- type: _Number_
- default: `2`
- description

  The value of this property specifies the slide size on each side of the center.

### Computed

#### # totalPage
- return: _Number_
- description

  The total number of available pages. This value is taken from the `last_page` field of pagination information.

#### # isOnFirstPage
- return: _Boolean_
- description

  Returns `true` if the current page number is the first page; otherwise, returns `false`.

#### # isOnLastPage
- return: _Boolean_
- description

  Returns `true` if the current page number is the last page; otherwise, returns `false`.

#### # notEnoughPages
- return: _Boolean_
- description

  Determine if the total number of pages is enough to be displayed without sliding.

#### # windowSize
- return: _Number_
- description

  The size of the sliding window calculating from `on-each-side` * 2 + 1.

#### # windowStart
- return: _Number_
- description

  Return the first page number to be shown on the leftmost.

### Data
#### # tablePagination
- type: _Object_
- default: `null`

  The pagination information received from Vuetable.

### Methods

#### # isCurrentPage
- params:
  - page: _Number_
- description

  Determine if the given page number is the current page.
  
#### # setPaginationData
- params:
  - tablePagination: _Object_ -- pagination information
- description

  Setting the `tablePagination` data to be used when rendering pagination component.

#### # resetData
- params: _none_
- description

  This method will set `tablePagination` to null.

### Events

#### # vuetable-pagination:change-page
- type: _emit_
- payload:
  - page: _Number_, _String_
- description:
  
  This event was fired when the user clicks on any pagination item requesting data for that given page number.
