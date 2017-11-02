# Fixed Header _(since v1.7)_

Vuetable is now able to fixed the table header, so that when the table data height is more than the specified table height, the table body can be scrolled.

This is mostly useful if you're using Vuetable in Data mode, where you manually supply the data to Vuetable instead of let Vuetable handle the API data request to the server side, or you need to limit the height of the table to a certain value.

To enable fixed header, you have to specify the height of the table via [`table-height`](Vuetable-Properties#-table-height) prop.

By default, `table-height` value is `null` so it shouldn't affect any previous code in ealier version.

Once fixed header has been enabled, you can "disable" it by setting `table-height` prop to `null`.

The `width` option has been added to [Fields definition](Fields-Definition) options, to allow specifying width for each column table. This is go well with the fixed header. So, you will definitely want to add `width` option to all your field definition.

You can find the example in the `main.js` file in the `src` direction.


