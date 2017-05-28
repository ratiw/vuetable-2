# API mode vs. Data mode

Despite designing to work with API from the beginning, in version 1.6, Vuetable can now work with local data.

This can be done by specifying that you want to disable the API Mode by setting `:api-mode="false"` and supplying your own data via `:data` prop. But this will also make the server related functionality (like sorting, paging, and page sizing, etc.) stop working. 



## Note

Vuetable is opinionated toward working with the API endpoints from the beginning. This is based solely on my experiences building applications either for desktop or for the web. 

I have a strong believe that this is the model for building app. The client side should handle most of the presentation that interacts with the user, while the server side should handle most of the logic behind the application, this also includes the database related functions.

Most of the time, we have a very powerful and well developed database server on the server side where it can do an excellent and efficient tasks it was designed to do, like searching, sorting, and filtering of data. Another great benefit of this is that your app will also scale better instead of implementing the client side code to do these tasks. 



