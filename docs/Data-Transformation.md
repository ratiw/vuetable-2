# Data Transformation

If the data you're working with is not in the default format that Vuetable uses, you can setup a `transform()` method, which accept response `data` as the argument, to transform it to the format that vuetable can work with.

To setup the data transformation function, just create a `transform` method in the parent instance of Vuetable like so,

```javascript
new Vue({
  el: '#app',
  data: {
    //...
  },
  methods: {
    transform: function(data) {
      var transformed = {}

      transformed.pagination = {
        total: data.total,
        per_page: data.per_page,
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        from: data.from,
        to: data.to
      }

      transformed.mydata = []

      for (var i=0; i < data.length; i++) {
        transformed.data.push({
          id: data[i].id,
          fullname: data[i].name,
          email: data[i].email
        })
      }
    }
  }    
})
```

```html
<vuetable
  api-url="..."
  :fields="fields"
  data-path="mydata"
  pagination-path="pagination"
></vuetable>
```
