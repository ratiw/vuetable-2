## A Background Story

Vuetable was born out of a curiousity of learning more about Vue.js and turning a repeated task of creating a data table into a Vue component.

Like many others, I feel that CRUD based system is easy to understand and implement. With that I usually break up things into modules. Each module will have its own functionality built around CRUD, which are
- index page -- listing all the paginated data relevant to that module
- view page -- showing a specific data record that might also allow deletion 
- create page -- allow creating new data record
- edit page -- allow updating existing data record
- other suppporing pages 

Somehow, creating a index page for each module has become copying and pasting existing code from another module and making necessary changes to fit another module's needs. 

Not to mention all the API request stuffs that mostly looks and behaves the same from the backend. This became a boring stuff to do.

And that's when the [first version](https://github.com/ratiw/vue-table/commit/3143385d718c67e266b02a001e7035cb1c0ffd71) of Vuetable was created.

When Vue 2 was introduced, Vuetable was also revised to work with this version to take advantage of the Virtual DOM that makes it possible for Vuetable-2 to work with other browsers besides Chrome. 

With the help, the requests, and the suggestions from the community, Vuetable has grown in its features to where it is today. 


