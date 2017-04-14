[![npm](https://img.shields.io/npm/v/vuetable-2.svg)](https://www.npmjs.com/package/vuetable-2)
[![npm](https://img.shields.io/npm/l/vuetable-2.svg?maxAge=2592000)]()

# Vuetable-2 - data table simplify!

### Vuetable-2 works with Vue 2.x, vuetable is for Vue 1.x

If you're looking for the version that's working with Vue 1.x, please go to [`vuetable`](https://github.com/ratiw/vue-table) repo.

---

### Documentation and Tutorial

Documentation is still under development. Meanwhile, check out 

- the [Tutorial](https://github.com/ratiw/vuetable-2-tutorial/blob/master/doc/README.md)
with follow-along project [here](https://github.com/ratiw/vuetable-2-tutorial). It should be enough to get you started.

- [Sample project](https://github.com/ratiw/vuetable-2-with-laravel-5.4) using Vuetable-2 with Laravel 5.4 and Laravel-Mix

If you've been using Vuetable for Vue 1.x before, checkout [what's changed](https://github.com/ratiw/vuetable-2/blob/master/changes.md) for info on changes from Vuetable for Vue 1.x and the [upgrade guide](https://github.com/ratiw/vuetable-2/blob/master/upgrade-guide.md) on how you could upgrade from Vuetable for Vue 1.x.

You can now make use of Vue's scoped slot using the new `__slot` special field, thanks to @sjmarve. That means you are able to define action buttons per instance of a data table without depending on a globally defined component.

Use scoped slot in parent when defining the actions [Vue Doc for scopped Slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots)

e.g.
```html
<template slot="actions" scope="props">
    <div class="table-button-container">
        <button class="btn btn-default" @click="onClick('edit-item', props.rowData)"><i class="fa fa-edit"></i> View</button>&nbsp;&nbsp;
        <button class="btn btn-danger" @click="onClick('delete-item', props.rowData)"><i class="fa fa-remove"></i> Edit</button>&nbsp;&nbsp;
    </div>
</template>
```

the onClick function can now be defined in the parent and the parent has Access to rowData and rowIndex via props. :)

The original functionality still works
