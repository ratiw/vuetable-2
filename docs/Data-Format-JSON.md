# Data Format (JSON)

In order for Vuetable to do its task, it needs to work with a certain JSON data structure. Here is the default data format that Vuetable expects:

```json
{
  "links": {
    "pagination": {
      "total": 50,
      "per_page": 15,
      "current_page": 1,
      "last_page": 4,
      "next_page_url": "...",
      "prev_page_url": "...",
      "from": 1,
      "to": 15,
    }
  },
  "data": [
    {
      "id": 1,
      "name": "xxxxxxxxx",
      "nickname": "xxxxxxx",
      "email": "xxx@xxx.xxx",
      "birthdate": "xxxx-xx-xx",
      "gender": "X",
      "group_id": 1,
    },
      .
      .
      .
    {
      "id": 50,
      "name": "xxxxxxxxx",
      "nickname": "xxxxxxx",
      "email": "xxx@xxx.xxx",
      "birthdate": "xxxx-xx-xx",
      "gender": "X",
      "group_id": 3,
    }
  ]
}
```

Mostly, it looks for two pieces of information; the array of data, the pagination information.

It uses two keys (`data-path` and `pagination-path`) to look into those data to extract the information it is needed.

- `data-path` points to the array of data
- `pagination-path` points to the pagination information

In the example above, the `data-path` is `data` and the `pagination-path` is `links.pagination`, which are the default value that Vuetable uses if none is provided.

If you're familiar with [Laravel](https://laravel.com), you would know that Laravel automatically convert the query data to JSON format when Eloquent objects are returned from application's routes or controllers. And if you use `paginate()` function, the result would look something like this.

```json
{
  "total": 50,
  "per_page": 15,
  "current_page": 1,
  "last_page": 4,
  "next_page_url": "...",
  "prev_page_url": "...",
  "from": 1,
  "to": 15,
  "data": [
    {
      "id": 1,
      "name": "xxxxxxxxx",
      "nickname": "xxxxxxx",
      "email": "xxx@xxx.xxx",
      "birthdate": "xxxx-xx-xx",
      "gender": "X",
      "group_id": 1,
    },
      .
      .
      .
    {
      "id": 50,
      "name": "xxxxxxxxx",
      "nickname": "xxxxxxx",
      "email": "xxx@xxx.xxx",
      "birthdate": "xxxx-xx-xx",
      "gender": "X",
      "group_id": 3,
    }
  ]
}
```

In this case, you just specify values for `data-path` and `pagination-path` like so
```html
  <div id="app">
    <vuetable
      api-url="/api/users"
      :fields="columns"
      data-path="data"
      pagination-path=""
    ></vuetable>
  </div>
```

This tells Vuetable that the data is in the path named `data` inside the JSON structure returned from the server, and the pagination information is in the root of the JSON structure.
