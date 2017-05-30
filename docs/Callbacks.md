# Callbacks

In Vuetable, each field can have an associated callback function that will allow you to format the value of the column for display.

> __Note__  
> The name `callback` might be changed to `format` in the near future to make it really reflect what it does.

You can define the callback function inside the field definition using the `callback` option by specifying either the name of the function to be called or the function reference.

Here is the example of a field defining a callback function.
```javascript
// specifying the name of the function as string
{
  name: 'gender',
  callback: 'gender'
}

// specifying the function reference.
// in this case, function `gender` must be defined in the `methods` section.
{
  name: 'gender',
  callback: gender
}
```

In this case, the field named `gender` has a callback function, which is coincidently named `gender` as well. Vuetable will automatically look for this callback function in its parent Vue.js instance.

The callbacks are defined inside the Vue.js instance where Vuetable component is defined.

Let's look at the `gender` callback function.
```javascript
new Vue({
  el: '#app',
  methods: {
    gender: function(value) {
      return value == 'M' ? 'Male' : 'Female'
    }
  }
})
```

Vuetable will automatically pass the value of that field to the callback function. The callback function can then work on the value, and the value returned from the callback will be used to display to the user.

In this case, if the `value` that gets passed to `gender` callback is `M`, it will return `Male`. Vuetable will display `Male` for this field instead of `M`.

#### Passing Additional Parameters to Callback function
Suppose you have a callback function to format the date value to be displayed in certain date format, but you also would like to be able to override that default date format as well. You can do so like this:
```javascript
new Vue({
  el: '#app',
  columns: [
    {
      name: 'birthdate',
      callback: 'formatDate|D/MM/Y'
    }
  ],
  methods: {
    formatDate: function(value, fmt) {
      if (value == null) return ''
      fmt = (typeof fmt == 'undefined') ? 'D MMM YYYY' : fmt
      return moment(value, 'YYYY-MM-DD').format(fmt)
    }
  }
})
```

In this example, field `birthdate` has a callback named `formatDate`. The callback defines additional parameter using `|` character following the name of the callback function.

When the `formatDate` callback is called the `value` of the field will be passed as well as the additional parameters. So, the callback function can use that additional parameters to decide what the return value should be based on those additional parameters.

