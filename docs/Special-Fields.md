## Special Fields

Special fields are predefined field for specific purpose and their names are always started with double underscore characters `__`. 

Vuetable currently have the following special fields
- [__sequence](#-__sequence)
- [__handle](#-__handle)
- [__checkbox](#-__checkbox)
- [__component](#-__component)
- [__slot](#-__slot)

You can see the usage of these special fields in the [Vuetable-2 Tutorial - Using special fields](https://github.com/ratiw/vuetable-2-tutorial/blob/master/doc/lesson-11.md).

#### # __sequence

If you would like to display the sequence number of the records based on the pagination information, you can do that using __sequence special field.

> __Note__
> __sequence special field only work in API Mode (`:api-mode="true"`) as it 
> requires pagination information to work correctly.
 
The generated HTML output will be like this
```html
<th class="vuetable-th-sequence">
    ...
</th>

<td class="vuetable-sequence">
    ...
</td>
```

#### # __handle

This special field can be used to display CSS-class icon.

This allow you to use external library like [Sortable.js]() with Vuetable.

The generated HTML output will be like this
```html
<td class="vuetable-handle">
    <i class="handle-icon [css.handleIcon]"
</td>
```

The `css.handleIcon` can be overriden using `css` prop.

See also: [`css`]()

#### # __checkbox

Events emitted
- `vuetable:checkbox-toggled` -- when the user check/uncheck the checkbox in each row
- `vuetable:checkbox-toggled-all` -- when the user check/uncheck the checkbox on the table header

The `__checkbox` special field will display checkbox column for each row and also on the header row to allow select/unselect all functionality.

In order for Vuetable to keep track of the checkbox state of each data row. By default, `__checkbox` will use `id` field as [row identifier]() as it usually unique for each row. That also means your data will have to have `id` column.

But if you do not have `id` column in your data structure, or you want to use another available field that could also uniquely identify each data row, you can use `track-by` prop to specify it.

For example, if you want to use `item_code` field as you row identifier, you can do so like this.
```html
<vuetable ref="vuetable"
  track-by="item_code"
></vuetable>
```

The row identifier of the selected row will be store in [`selectedTo`]() prop. If you `ref` to define reference as the above code, you can access it using using Vue's `refs` property.
```javascript
this.$refs.vuetable.selectedTo
```

The generated HTML output will be like this
```html
<th class="vuetable-th-checkbox-[track-by]">
    ...
</th>
<td class="vuetable-checkboxes">
    <input type="checkbox">
</td>
```

See also: 
- [Row Identifier]()
- [`selectedTo` prop]()
- [`vuetable:checkbox-toggled` event]()
- [`vuetable:checkbox-toggled-all` event]()

#### # __component:&lt;name>

The `__component` special field allow you to create a component to handle the display of the row data as you want.

`<name>` is the name of the component registered globally using `Vue.component` that will be used to handle the rendering of the column data.

Vuetable will pass 3 props to the component
- `row-data` -- the data of the current row being rendered
- `row-index` -- the current row index 
- `row-field` -- the current `sortField` in field definition

You can see a sample use of `__component` special field in the [Vuetable-2 Tutorial -- Using special fields](https://github.com/ratiw/vuetable-2-tutorial/blob/master/doc/lesson-11.md)

The generated HTML output will be like this
```html
<th class="vuetable-th-component-[track-by]">
    ...
</th>
...
<td class="vuetable-component">
    ...component code..
</td>
```


#### # __slot:&lt;name>

The `__slot` special field allows you to use Vue's scoped slot inside Vuetable.

> [Scoped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots) is availble in Vue 2.1.0 onward. Please make sure you use at least the specified version of Vue.js.

Vuetable will pass 3 props to the slot
- `row-data` -- the data of the current row being rendered
- `row-index` -- the current row index 
- `row-field` -- the current `sortField` in field definition

You can see a sample use of `__slot` special field in the [Vuetable-2 Tutorial -- Using special fields](https://github.com/ratiw/vuetable-2-tutorial/blob/master/doc/lesson-11.md)

The generated HTML output will be like this
```html
<th class="vuetable-th-slot-[field-name]">
    ...
</th>
...
<td class="vuetable-slot">
    ...
</td>
```
