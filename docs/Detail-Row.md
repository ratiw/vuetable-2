# Detail Row

Detail row is the additional row hidden underneath each data row in the table. When you want to only display relevant data for each row, but also would like to display additional information when needed, Detail Row would be a great help.

In order to use Detail row, you will need to create a component and register it using `Vue.component` helper. Then, you can use `detail-row-component` property to specify the name of your detail row component.

Your detail row component should define the following two properties:
- `row-data` -- the current row data will be passed to
- `row-index` -- the current row index will be passed to

Example:
```javascript
//..
props: {
  rowData: {
    type: Object,
    required: true
  },
  rowIndex: {
    type: Number
  },
}
```

## How Vuetable track the state of each Detail Row

Each detail row can be shown or hidden independently. So Vuetable needs a way to track the state of each detail row to update the UI accordingly.

In order to do this, it is required that each data row must be uniquely identifiable. If your data contains an `id` column (which can uniquely identify each row), then you don't have to do anything else. Because, by default, Vuetable uses the `id` as the default one. See [Row Identifier](Row Identifier) for more detail.

But if your data use (or has) different column name that can uniquely identify each row, you can specify that in the `track-by` property.

For example, your data uses `uuid` instead of `id` column, you can tell Vuetable to use it.
```html
<vuetable ref="vuetable"
  //...
  detail-row-component="my-detail-row"
  track-by="uuid"
></vuetable>
```

There are a number of methods that you can use to manipulate the detail row. Each of them requires a [row identifier](Row-Identifier) as an only parameter.
- isVisibleDetailRow
- showDetailRow
- hideDetailRow
- toggleDetailRow

To call those methods, you can use `ref` tag, like so,
```javascript
this.$refs.vuetable.toggleDetailRow(rowId)
```
