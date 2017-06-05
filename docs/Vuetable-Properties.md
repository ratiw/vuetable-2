## Vuetable - Properties

- [append-params](#-append-params)
- [api-mode](#-api-mode)
- [api-url](#-api-url)
- [css](#-css)
- [data](#-data)
- data-manager
- [data-path](#-data-path)
- data-total
- [detail-row-component](#-detail-row-component)
- [detail-row-transition](#-detail-row-transition)
- [fields](#-fields)
- [http-options](#-http-options)
- [http-method](#-http-method)
- [load-on-start](#-load-on-start)
- [min-rows](#-min-rows)
- [multi-sort](#-multi-sort)
- [multi-sort-key](#-multi-sort-key)
- [no-data-template](#-no-data-template)
- [pagination-path](#-pagination-path)
- [per-page](#-per-page)
- [query-params](#-query-params)
- [reactive-api-url](#-reactive-api-url)
- [render-icon](#-render-icon)
- [row-class](#-row-class)
- [sort-order](#-sort-order)
- [track-by](#-track-by)

### # api-mode
- type: _Boolean_
- default: `true`
- description

  By default, Vuetable will load the data from and send the request to the API endpoint specified in `api-url`. If you prefer to 
  supply your own data instead of automatically requesting the data from server, you have to set `api-mode` to `false`. Then, pass 
  the data via `data` prop.

  Please note that disabling `api-mode` (by setting it to `false`) will also **disable** pagination, sorting, and filtering functions.

  > __Note__  
  > Setting `api-mode` to `false` is not recommended. It will not scale well when you have to handle a large dataset
  > yourself instead of letting database manager handles it for you. 

### # api-url 
- works in `api-mode` only
- type: _String_
- default: `''` _(empty string)_
- description

  The URL of the api endpoint that Vuetable will interact with. If the API supports sorting, filtering, pagination of the data, 
  Vuetable can automatically append appropriate information to the server via query string.
  
### # reactive-api-url
- works in `api-mode` only
- type: _Boolean_
- default: `true`
- description

  Tells Vuetable whether it should watch for the change in `api-url` prop and refresh the data automatically.

### # fields
- type: _Array_
- default: _none_
- required: _true_
- description

  Array of field definition that Vuetable will be used to map to the data structure in order to render the table for presentation.

### # data
- type: _Array_ | _Object_
- default: `null`
- description

  The data that Vuetable will be used to render the table when `api-mode` is set to `false`.

  __New in v1.7__  
  You can utilize the pagination functionality of Vuetable if the `data` you supplied is an object that has data structure as described in [Data Format](https://github.com/ratiw/vuetable-2/wiki/Data-Format-(JSON)).

  > __Note__  
  > The prop only works when `api-mode` is `false`.

### # data-manager (v1.7)
- type: _Function_
- default: `null`
- description

  [TODO]

  > __Note__  
  > The prop only works when `api-mode` is `false`.

### # data-path
- works in `api-mode` only
- type: _String_
- default: `data`
- description
  
  The path inside the data structure that actually contains the data. If the data is at the root of the structure, set 
  this prop to empty string, e.g. `data-path=""`.
  
### # data-total (v1.7)
- type: _Number_
- default:
- description

  [TODO]

  > __Note__  
  > The prop only works when `api-mode` is `false`.

### # pagination-path 
- works in `api-mode` only
- type: _String_
- default: `links.pagination`
- description

  The pagination path inside the data structure that contains the pagination information. If the your data from the server
  does not have pagination information, you should set the prop to empty string, e.g. `pagination-path=""`, to suppress
  Vuetable warning.
  
### # load-on-start
- works in `api-mode` only
- type: _Boolean_
- default: `true`
- required: _true_
- description

  Whether Vuetable should immediately load the data from the server. 

### # append-params
- works in `api-mode` only
- type: _Object_
- default: `{}` _(empty object)_
- description

  Additional parameters that Vuetable should append to the query string when requesting data from the server. 
  
  See also: [Appending Other Parameters to the Query String](#)

### # query-params
- works in `api-mode` only
- type: _Object_
- default: 
  ```
  {
    sort: 'sort',
    page: 'page',
    perPage: 'per_page'
  }
  ```
- description

  The text to be used as keys in query string that will be sent to the server. If your API endpoint uses different keys, you can 
  specified them via this prop.
  
  See also: [Sorting, Paging, and Page Sizing of Data](#)

### # http-options
- works in `api-mode` only
- type: _Object_
- default: `{}` _(empty object)_
- description

  Allow passing additional options to the server during AJAX call. Internally, Vuetable uses [`axios`](https://github.com/mzabriskie/axios)
  to handle AJAX request.

### # http-method
- works in `api-mode` only
- type: _String_
- default: `get`
- description

  Only support `get` or `post` method. Please note that it must be the __lowercase__ string.

### # track-by
- type: _String_
- default: `id`
- description

  The key that uses to unqiuely identified each row in the data array to help track the state of detail row and checkbox 
  features of Vuetable. This is necessary for the detail row and checkbox features to function correctly.
  
  For detail row feature, whenever the user click to expand the detail row, Vuetable will insert the `id` of that row into
  its internal array (`visibleDetailRows`). And when that detail row is hidden, the `id` of that detail row is removed from
  the array.
  
  For checkbox feature, when the user select (checked) a row, Vuetable will insert the `id` of the row into its internal 
  array (`selectedTo`). And when that row is unselected (unchecked), the `id` of that row is removed from the array.
  
  See also: [`visibleDetailRows`](#), and [`selectedTo`](#)

### # sort-order
- works in `api-mode` only
- type: _Array_
- default: `[]` _(empty array)_
- description

  The default sort order that Vuetable should use when requesting the data from server.

### # multi-sort
- works in `api-mode` only
- type: _Boolean_
- default: `false`
- description

  Enable multiple sort columns interaction.

### # multi-sort-key
- works in `api-mode` only
- type: _String_
- default: `alt`
- possible values: `alt`, `ctrl`, `shift`, `meta`
- description

  The key to trigger sort colum adding/subtracting when multi-sort is enabled.

### # per-page
- works in `api-mode` only
- type: _Number_
- default: `10`
- description

  The number of data to be requested per page.

### # css
- type: _Object_
- default: 
  ```
  {
    tableClass: 'ui blue selectable celled stackable attached table',
    loadingClass: 'loading',
    ascendingIcon: 'blue chevron up icon',
    descendingIcon: 'blue chevron down icon',
    detailRowClass: 'vuetable-detail-row',
    sortHandleIcon: 'grey sidebar icon'
  }
  ```
- description

  This is where you should override the CSS classes that Vuetable uses to render HTML table that should help you style the table
  to your needs.

  See also: [CSS Styling](#)

### # render-icon
- type: _Function_
- default: `null`
- description

  By default, Vuetable uses `<i>` tag to render icon according to Semantic UI CSS. But you can override this by providing your own icon rendering callback function via this `render-icon` property.

  The following icon rendering in Vuetable will use this provided callback instead of the default one if provided.
  - sort icon on the table header `<th>`
  - handle icon of the table column `<td>`

  The callback will receive two parameters.
  1) the array of CSS `classes`
  2) the optional string `options` expected to be appended to the tag

  See example below:
  ```vue
  <vuetable
    //...
    :render-icon='renderBootstrapIcon'
  ></vuetable>
  ```
  ```javascript
  //...
  methods: {
    renderBootstrapIcon (classes, options) {
      return `<span class="${classes.join(' ')}" ${options}></span>`
    }
  }
  ```

### # min-rows
- type: _Number_
- default: `0`
- description

  The minimum number of rows that should be displayed when rendering the table.
  
  If the number of row available is less than the number specified in `min-rows` prop, Vuetable will render empty table rows to 
  satisfy that minimum rows.

  > __Note__  
  > The prop only works when `api-mode` is `false`.

### # row-class
- type: _String_, _Function_
- default: `''` _(empty string)_
- description

  The CSS class name that will be applied to each table row. 
  
  If `row-class` prop refers to a method, Vuetable will automatically call the given method on each row, passing the row data and row index to it. Vuetable will then use the returned string from the given method as CSS class for that row.
  
  Here is the example on using a method to return the row class for styling.
  ```vue
  <template>
    <vuetable>
      :row-class="onRowClass"
    ></vuetable>
  </template>
  <script>
    //..
    methods: {
      onRowClass (dataItem, index) {
        return (dataItem.isOverdue) ? 'color-red' : 'color-white'
      }
    }
  </script>
  ```

### # detail-row-component
- type: _String_
- default: `''` _(empty string)_
- description

  A component name to be used as the content of detail row to be displayed underneath the current row.

### # detail-row-transition
- type: _String_
- default: `''` _(empty string)_
- description

  The CSS class to apply to detail row during transition.

### # no-data-template
- type: _String_
- default: `''` _(empty string)_
- description

  Template when there are no records in the table. Inserted into table cell `td`
