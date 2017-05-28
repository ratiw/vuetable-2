## Vuetable - Computed Properties

- [countVisibleFields](#-countvisiblefields)
- [lessThanMinRows](#-lessthanminrows)
- [blankRows](#-blankrows)
- [useDetailRow](#-usedetailrow)

### # countVisibleFields
- return: _Number_
- description

  Return the number o visible fields in the table by checking the field's `visible` option.

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
  
