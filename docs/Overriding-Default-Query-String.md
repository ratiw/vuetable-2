# Overriding Default Query String

By default, Vuetable uses the following key in the query string that will be sent to the server.
- `sort` -- its value will contain the requested sort order
- `page` -- its value will contain the requested page number
- `per_page` -- its value will contain the requested records per page

If you're making your own API backend, you can just use this default. 

But if you're using someone's else API or you already have your own existing API that do not correspond to this. You can just tell Vuetable how what key it should be using instead by supplying it via `query-params` property.

Here is the default value of `query-params` property.
```javascript
{
  sort: 'sort',
  page: 'page',
  perPage: 'per_page'
}
```

Suppose your API uses `sort_order`, `page_no`, and `page_size`, you can easily tell Vuetable to use them like so,
```html
<vuetable
  //...
  :query-params="{ sort: 'sort_order', page: 'page_no', perPage: 'page_size' }"
></vuetable>
```
