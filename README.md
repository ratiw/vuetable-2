[![npm](https://img.shields.io/npm/v/vuetable-2.svg)](https://www.npmjs.com/package/vuetable-2)
[![npm](https://img.shields.io/npm/l/vuetable-2.svg?maxAge=2592000)]()

# Dependencies

First you have to install the datepicker dependency
[a link](https://www.npmjs.com/package/vue2-datepicker)

```shell
npm install vue2-datepicker --save
```

# Usage

On vuetable definition declare searchField:true, type:3 types available: input | select | date. You can see the following example
```javascript
data () {
      return {
        fields: [
          {
            name: 'id',
            title: 'ID',
            titleClass: 'text-left',
            dataClass: 'text-left',
            searchField:true,
            type:'input'
          },         
          {
            title: 'status',
            name: 'forward_status_code',
            sortField: 'forward_status_code',
            callback: 'formatForward',
            searchField:true,
            type:'select',
            selectData:[{ text: 'OK', value: '200' }, { text: 'Error', value: '5' }]
          },
          {
            name: 'date',
            title: 'date range',
            sortField: 'date',
            titleClass: 'text-center',
            dataClass: 'text-center',
            callback: 'formatDate|DD-MM-YYYY',
            searchField:true,
            type:'date'
          },
         .
         .
         .
         .
    },
```

On server side you can do 

```php

if (!empty($request['filter']) )
        {
            $filters = json_decode($request['filter']);

            foreach($filters as $column => $value)
            {

                if(Schema::hasColumn('receipt', $column)) {

                    if(is_array($value))
                    {
                        $dt = new DateTime($value[0]);
                        $min = $dt->format('Y-m-d 00:00:00');
                        $dt = new DateTime($value[1]);
                        $max = $dt->format('Y-m-d 23:59:59');
                        $query->whereBetween($column, [$min, $max]);
                    }
                    else
                    {
                        $val = "%{$value}%";
                        $query->where($column, 'like', $val);
                    }



                }

            }
        }
   ```
# Vuetable-2 - data table simplify!

### Vuetable-2 works with Vue 2.x, vuetable is for Vue 1.x

If you're looking for the version that's working with Vue 1.x, please go to [`vuetable`](https://github.com/ratiw/vue-table) repo.

---

### Documentation and Tutorial

Documentation is still under development. Meanwhile, check out the [Tutorial](https://github.com/ratiw/vuetable-2-tutorial/blob/master/doc/README.md)
with follow-along project [here](https://github.com/ratiw/vuetable-2-tutorial). It should be enough to get you started.

If you've been using Vuetable for Vue 1.x before, checkout [what's changed](https://github.com/ratiw/vuetable-2/blob/master/changes.md) for info on changes from Vuetable for Vue 1.x and the [upgrade guide](https://github.com/ratiw/vuetable-2/blob/master/upgrade-guide.md) on how you could upgrade from Vuetable for Vue 1.x.

