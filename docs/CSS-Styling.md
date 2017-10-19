# CSS Styling

> __Note__
> The name inside the square bracket is optional. It may or may not appear depending on the relevant condition

# Vuetable

```javascript
{
  tableClass:     'ui blue selectable celled stackable attached table',
  loadingClass:   'loading',
  ascendingIcon:  'blue chevron up icon',
  descendingIcon: 'blue chevron down icon',
  detailRowClass: 'vuetable-detail-row',
  handleIcon:     'grey sidebar icon',
  sortableIcon:   '',  // since v1.7
  ascendingClass: 'sorted-asc', // since v1.7
  descendingClass: 'sorted-desc' // since v1.7
}
```

## Table `<table>`

```html
<table class="vuetable [css.tableClass]"></table>
```

## Table Header Column `<th>`

### Fields
```html
<th id="_{{field.name}}" class="vuetable-th-{{field.name}} [sortable] [field.titleClass]"></th>
```
### Special Fields

- __sequence
  ```html
  <th class="vuetable-th-sequence [field.titleClass]"></th>
  ```

- __checkbox
  ```html
  <th class="vuetable-th-checkbox-{{trackBy}} [field.titleClass]"></th>
  ```

- __component
  ```html
  <th class="vuetable-th-component-{{trackBy}} [sortable] [field.titleClass]"></th>
  ```

- __slot
  ```html
  <th class="vuetable-th-slot-{{field.name}} [sortable] [field.titleClass]"></th>
  ```

## Table Column `<td>`

### Fields
```html
<td class="[field.dataClass]"></td>
```

### Special Fields

- __sequence
  ```html
  <td id="vuetable-sequence [field.dataClass]"></td>
  ```

- __handle
  ```html
  <td id="vuetable-handle [field.dataClass]"></td>
  ```

- __checkbox
  ```html
  <td id="vuetable-checkboxes [field.dataClass]"></td>
  ```

- __component
  ```html
  <td id="vuetable-component [field.dataClass]"></td>
  ```

- __slot
  ```html
  <td id="vuetable-slot [field.dataClass]"></td>
  ```

## Detail Row

```html
<td class="[css.detailRowClass]"></td>
```

## Other Elements

### # loadingClass

### # ascendingIcon

### # descendingIcon

### # handleIcon

## Pagination

```javascript
{
  wrapperClass: 'ui right floated pagination menu',
  activeClass: 'active large',
  disabledClass: 'disabled',
  pageClass: 'item',
  linkClass: 'icon item',
  paginationClass: 'ui bottom attached segment grid',
  paginationInfoClass: 'left floated left aligned six wide column',
  dropdownClass: 'ui search dropdown',
  icons: {
    first: 'angle double left icon',
    prev: 'left chevron icon',
    next: 'right chevron icon',
    last: 'angle double right icon',
  }
}
```

