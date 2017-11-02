Fields can be defined as simpl array of string, array of object, or the mix.

- Fields defined as simple array

  ```javascript
  let columns = ['name', 'email', 'birthdate', 'gender']
  ```

- Fields defined as array of object
  ```javascript
  let columns = [
    {
      name: 'name',
      sortField: 'name'
    },
    {
      name: 'email',
      title: 'Email Address'
    },
    {
      name: 'birthdate',
      sortField: 'birthdate',
      titleClass: 'center aligned',
      dataClass: 'center aligned',
      callback: 'formatDate|D/MM/Y'
    },
    {
      name: 'gender',
      sortField: 'gender',
      titleClass: 'center aligned',
      dataClass: 'center aligned',
      callback: 'gender'
    },
  ]
  ```

- Fields defined as array of the mix
  ```javascript
  let columns = [
    'name',
    'email',
    {
      name: 'birthdate',
      sortField: 'birthdate',
      titleClass: 'center aligned',
      dataClass: 'center aligned',
      callback: 'formatDate|D/MM/Y'
    },
    {
      name: 'gender',
      sortField: 'gender',
      titleClass: 'center aligned',
      dataClass: 'center aligned',
      callback: 'gender'
    },
    //...
  ]
  ```

  The difference is that if you defined a field as simple array of string. Vuetable will only display it as-is
  without any sorting or formatting options. Vuetable will convert the simple field definition
  to field object with only `name` property.

  ```javascript
  let columns = ['name']
  // will be converted to this
  // let columns = [ { name: 'name' } ]
  ```

## Field options

Available options
- [name](#-name)
- [sortField](#-sortField)
- [title](#-title)
- [titleClass](#-titleClass)
- [dataClass](#-dataClass)
- [callback](#-callback)
- [visible](#-visible)
- [width](#-width)

### # name
- type: _String_

Name of the data field to be display.

### # sortField
- type: _String_

Usually, it will be the same as `name` option. But you can specify different value if
you use different field name when querying data on the serve side, e.g. firstname.

If specified, the field will be marked as sortable. `vuetable` will display appropriate
clickable icon after the field title. `vuetable` will also make a new request to the server
with the `sort=<sortField>` query string appended.

### # title
- type: [_String_, _Function_]

If you would like to specify the title yourself, you can put it in here. Otherwise, `vuetable`
will use the `name` option instead.

You can even put the icon class in the title, see example below
```javascript
//.. example using Semantic UI icon class
{
  name: 'birthdate',
  title: '<i class="orange birthday icon"></i> Birthdate'
}
//
```

_New feature (after v1.6.5)_
You can also define `title` as a function that returns a string. Vuetable will use that returned string to render the title of the column.
```javascript
//.. example using Semantic UI icon class
{
  name: 'birthdate',
  title: () => '<i class="orange birthday icon"></i> Birthdate'
}
//
```

This allow total flexibility and make it possible to make use of external i18n library.

### # titleClass
- type: _String_

The css class you would like to apply for the title of this field.

### # dataClass
- type: _String_

The css class you would like to apply for the data of this field.

### # callback
- type: [_String_, _Function_]

The name of the callback function to be called to allow formatting of the value
to be displayed. See [Callback](Callbacks) section for more info.

### # visible
- type: _Boolean_

Whether this field should be visible or hidden when rendering the table.

### # width _(since v1.7)_
- type: _String_

Specify the width of the column as string, e.g. `600px`. See [Fixed Header](Fixed-Header) section for more info.


## Nested JSON Data
If the JSON data structure contains nested objects, eg:
```json
{
  "links": {
    "pagination": {
      "per_page": 15,
    }
  },
  "data": [
    {
      "id": 1,
      "name": "xxxxxxxxx",
      "email": "xxx@xxx.xxx",
      "group_id": 1,
      "address" {
        "street_address":"123 abc place",
        "city":"townsville",
        "province":"Harbor",
        "country":"Antegria"
      }
    }
      .
      .
      .
    {
      "id": 50,
      "name": "xxxxxxxxx",
      "email": "xxx@xxx.xxx",
      "group_id": 3,
      "address" {
        "street_address":"456 xyz street",
        "city":"cityville",
        "province":"Portia",
        "country":"Norland"
      }
    }
  ]
}
```
In this case, the column names of nested objects can be specified in the following format:

```javascript
let columns = ['name', 'email', 'address.city', 'address.country']
```
