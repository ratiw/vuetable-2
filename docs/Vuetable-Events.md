## Vuetable - Events

- [vuetable:initialized](#-vuetableinitialized)
- [vuetable:pagination-data](#-vuetablepagination-data)
- [vuetable:loading](#-vuetableloading)
- [vuetable:load-success](#-vuetableload-success)
- [vuetable:load-error](#-vuetableload-error)
- [vuetable:loaded](#-vuetableloaded)
- [vuetable:row-changed](#-vuetablerow-changed)
- [vuetable:row-clicked](#-vuetablerow-clicked)
- [vuetable:row-dblclicked](#-vuetablerow-dblclicked)
- [vuetable:cell-clicked](#-vuetablecell-clicked)
- [vuetable:cell-dblclicked](#-vuetablecell-dblclicked)
- [vuetable:cell-rightclicked](#-vuetablecell-rightclicked)
- [vuetable:detail-row-clicked](#-vuetabledetail-row-clicked)
- [vuetable:checkbox-toggled](#-vuetablecheckbox-toggled)
- [vuetable:checkbox-toggled-all](#-vuetablecheckbox-toggled-all)
- [vuetable:data-reset](#-vuetabledata-reset)

### # vuetable:initialized
- payload:
  - tableFields: _Array_ -- the normalized fields definition
- description

  This event will be fired after the fields definition have been normalized during the `created` lifecycle hook.

### # vuetable:pagination-data
- payload:
  - tablePagination: _Object_ -- pagination information
- description

  This event will be fired when the data has sucessfully been retrieved from the server and there is pagination information available.

### # vuetable:loading
- payload: _none_
- description

  This event will be fired before Vuetable starts to request the data from the server. This is useful for triggering the display of loading image.

### # vuetable:load-success
- payload:
  - response: _Object_ -- the response returned from the server
- description

  This event will be fired when the data was successfully loaded from the server.

### # vuetable:load-error
- payload:
  - response: _Object_ -- the response returned from the server
- description

  This event will be fired when up the data cannot be retrieved from the server or the server responses with an error.

### # vuetable:loaded
- payload: _none_
- description

  This event will be fired after Vuetable got response back from the server. This event does not indicate whether the request was successful or failed. It just indicates that the request is finished and it got the response back.

  This is useful for ending/hiding the loading image.

### # vuetable:row-changed
- payload:
  - dataItem: _Object_ -- the current data item
- description

  This event will be fired when Vuetable loops through the data during table row rendering. This will be useful if you want to do some processing with the data, e.g. summing up the values.

  > __Important!__
  >  Please note that you MUST NOT change the pass-in data item or try to update any instance data during this event, or it will cause "indefinite update loop". The only way to work inside this event is to use the variable define outside of Vue.js instance


### # vuetable:row-clicked
- payload:
  - dataItem: _Object_ -- the current data item
  - event: _Event_ -- the MouseObject event
- description

  This event will be fired when the user clicked on any column in the row. You can use the pass-in event object to target the DOM element that you want to manipulate. The pass-in data item argument is the actual data that Vuetable received from the server and it is reactived. Which means if you changed its value, the data displayed in the table will also be changed.

  > Changing the pass-in data in this event will not cause "indefinite update loop" However, the change only affects the current displaying data. It does not change anything on the server side.

### # vuetable:row-dblclicked
- payload:
  - dataItem: _Object_ -- the current data item
  - event: _Event_ -- the MouseObject event
- description

  This event will be fired when the user "double-clicked" on any column in the row. You can use the pass-in event object to target the DOM element that you want to manipulate. The pass-in data item argument is the actual data that Vuetable received from the server and it is reactived. Which means if you changed its value, the data displayed in the table will also be changed.

  > Changing the pass-in data in this event will not cause "indefinite update loop" However, the change only affects the current displaying data. It does not change anything on the server side.

### # vuetable:cell-clicked
- payload:
  - dataItem: _Object_ -- the current data item
  - field: _Object_ -- the field object that causes this event
  - event: _Event_ -- the MouseObject event
- description

  This event will be fired when a cell in the tabel body has been clicked.



### # vuetable:cell-dblclicked
- payload:
  - dataItem: _Object_ -- the current data item
  - field: _Object_ -- the field object that causes this event
  - event: _Event_ -- the MouseObject event
- description

  This event will be fired when a cell in the table body has been double-clicked.

### # vuetable:cell-rightclicked
- payload:
  - dataItem: _Object_ -- the current data item
  - field: _Object_ -- the field object that causes this event
  - event: _Event_ -- the MouseObject event
- description

  This event will be fired when a cell in the table body has been right-clicked.

### # vuetable:detail-row-clicked
- payload:
  - dataItem: _Object_ -- the current data item
  - event: _Event_ -- the MouseObject event
- description

  This event will be fired when an area of detail row has been clicked.

### # vuetable:checkbox-toggled
- payload:
  - isChecked: _Boolean_ -- the state of the checkbox
  - dataItem: _Object_ -- the current data item
- description

  This event will be fired whenever the checkbox has been toggled.

### # vuetable:checkbox-toggled-all
- payload:
  - isChecked: _Boolean_ -- the state of the checkbox
- description

  This event will be fired when the select-all checkbox has been toggled.

### # vuetable:data-reset
- payload: _none_
- description

  This event will be fired as a result from calling `resetData` method to clear in `tableData` and `tablePagination`.
