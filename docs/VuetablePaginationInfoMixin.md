## VuetablePaginationInfoMixin

### Properties

#### # css
- type: _Object_
- default: 
  ```
  {
    infoClass: 'left floated left aligned six wide column'
  }
  ```
- description:

  The `css` property holds most of the CSS classes that VuetablePaginationInfo uses in its template.
  
#### # info-template
- type: _String_
- default: `Displaying {from} to {to} of {total} items`
- description:

  The template string to be used to display the pagination information.

  Available placeholders
  - {from} the starting record number displayed
  - {to} the ending record number displayed
  - {total} the total number of records available
  
#### # no-data-template
- type: _Object_
- default: `No relevant data`
- description:

  The template string to be showned when there is no data to display.

### Data

#### # tablePagination
- type: _Object_
- default: `null`

  The pagination information received from Vuetable.

### Computed

#### # paginationInfo
- params: _none_
- return: _String_

  The actual pagination information to be displayed after replacing all the placeholders with corresponding values.

### Methods

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

_None_
