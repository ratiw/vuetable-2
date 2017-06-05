## Vuetable - Computed Properties

- [blankRows](#-blankrows)
- [countTableData](#-counttabledata)
- [countVisibleFields](#-countvisiblefields)
- [displayEmptyDataRow](#-displayemptydatarow)
- [isApiMode](#-isapimode)
- [isDataMode](#-isdatamode)
- [lessThanMinRows](#-lessthanminrows)
- [useDetailRow](#-usedetailrow)

### # countTableData
- return: _Number_
- description

  Return the number of rows for the current data or zero (0) if the `tableData` is `null`.

### # countVisibleFields
- return: _Number_
- description

  Return the number of visible fields in the table by checking the field's `visible` option.

### # displayEmptyDataRow
- return: _Boolean_
- description

  Determine if Vuetable should display empty data row message.

### # lessThanMinRows
- return: _Boolean_
- description

  Determine if the number of data rows available is less than the number specified in `min-rows` prop.

### # blankRows
- return: _Number_
- description

  Return the number of blank rows that Vuetable needs to render. If the number of row data is greater than
  or equal to `min-rows`, it returns 0.

### # useDetailRow
- return: _Boolean_
- description
  
  Determine if detail row should be rendered by inspecting the availability of the data and various properties.
  
### # isApiMode
- return: _Boolean_
- description

  Determine if Vuetable is currently in API mode.

### # isDataMode
- return: _Boolean_
- description

  Determine if Vuetable is currently in Data mode.
  