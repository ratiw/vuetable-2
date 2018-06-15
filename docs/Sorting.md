# Sorting

> __Note__  
> This works in ApiMode only!

If your API endpoint supports sorting, Vuetable can also automatically interact with it when you specify which column in the data is sortable.

To specify that a particular column is sortable, you add `sortField` option to the field definition of that column.

```javascript
{
  name: 'email',
  sortField: 'email'  
}
```

The sortable column will be rendered with `.sortable` CSS class in the `<th>` and it will respond to the click to toggle between 
- setting the column as sort order if it was not the current sort order.
- toggle between ascending and descending if it is the current sort order.

What it does is Vuetable will send a new request to the server endpoint with `sort` parameter specifying which `sortOrder.field` and which `sortOrder.direction` it expects from the server. 

Here is the sample sort parameter in the query string.
```json
  http://api.example.com/users?sort=email|asc
```
where, `sort=email|asc` is the `sort` parameter constructed from the default sort order field `email` and the defualt sort direction `asc`. They are concatenated by a pipe character (`|`).

If your API endpoint uses different construct, you can override this behavior by supplying your own function to construct the sort parameter. See below for more info.

### Initial Sorting Order

To provide initial sorting order, use `sort-order` prop to specify the default sorting column.

```html
<vuetable
  //...
  :sort-order="sortOrder"
></vuetable>
```
```javascript
new Vue({
  //...
  data: {
    //...
    sortOrder: [
      {
        field: 'email',
        direction: 'asc'
      }
    ]
  }
})
```

### Multi-column Sorting

Multi-column sorting can be enabled by setting `multi-sort` prop value to `true`. 

Once enabled, the user can use Alt+Click (Option+Click on mac) to work with multi-column sorting feature. If you would like to use other key than the `alt`, use `multi-sort-key` prop to specify one of the following value
- `alt` -- Alt / Option
- `ctrl` -- Ctrl / Control
- `meta` -- Window / Command
- `shift` -- Shift

### Overriding the Sort Query String

You can override how the sort parameter in the  query string is constructed by defining a method named 'getSortParam()' in your main vue instance. 

When Vuetable needs to make a request to the server, it will first check if this method is existed in its parent. If so, it will call this method, passing `sortOrder` prop to it, and will use whatever returned from the method to build the `sort` query string to be sent to the server.

```javascript
// If
//      sortOrder = [
//          { field: "gender", direction: "desc"},
//          { field: "name", direction: "asc"},
//      ]
// This will return
//      '-gender,name'
//
getSortParam: function(sortOrder) {
  return sortOrder.map(function(sort) {
    return (sort.direction === 'desc' ? '-' : '') + sort.field
  }).join(',')
}
```
