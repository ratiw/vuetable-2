# Vuetable-2

This is a fork of version 1.7.5 of [https://ratiw.github.io/vuetable-2](https://ratiw.github.io/vuetable-2). Please open an issue or submit a PR if you want to contribute.

---

### Documentation and Tutorial

Documentation by @ratiw and @cristijora can be found at [https://ratiw.github.io/vuetable-2](https://ratiw.github.io/vuetable-2).

Check out
- the [Tutorial](https://github.com/ratiw/vuetable-2-tutorial/wiki)
with follow-along project [here](https://github.com/ratiw/vuetable-2-tutorial). It should be enough to get you started.

- [Sample project](https://github.com/ratiw/vuetable-2-with-laravel-5.4) using Vuetable-2 with Laravel 5.4 and Laravel-Mix

# Example Code
- Clone the project
- Go into the cloned directory
- `npm install`
- `npm run dev`
- Open browser to `http://localhost:8080`

# Usage
## NPM via Github - there is no npm release, yet.

```shell
npm install kulmann/vuetable-2 --save-dev
```

```javascript
function install(Vue){
  Vue.component("vuetable", Vuetable);
  Vue.component("vuetable-pagination", VueTablePagination);
  Vue.component("vuetable-pagination-dropdown", VueTablePaginationDropDown);
  Vue.component("vuetable-pagination-info", VueTablePaginationInfo);
}
```

Also you have the ability to access certain components if you need them:
```javascript
VueTable: VueTable.default/VueTable.VueTable,
VueTablePagination: VueTable.VueTablePagination,
VueTablePaginationInfo: VueTable.VueTablePaginationInfo,
VueTablePaginationDropdown: VueTable.VueTablePaginationDropdown
```

# Contributions
Any contribution to the code (via pull request would be nice) or any part of the documentation and any idea and/or suggestion are very welcome.

> __Note__
> For any bug fix, the PR should be forked from the `master` branch. And for any suggestion or additional feature, the PR should be forked from the `develop` branch, where it can be integrated and rolled out in the next release.
>
> If you are not sure, please ask by opening a new issue.

However, please do not feel bad if your pull requests or contributions do not get merged or implemented into Vuetable.

Your contributions might not only help make Vuetable better, but also push it away from what I intend to use it for. I just hope that you find it useful for your use or learn something useful from its source code. But remember, you can always fork it to make it work the way you want.

# License
Vuetable is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
