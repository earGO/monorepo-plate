About Comments module

Comments must be last module, initialized in other packages, that uses them. It's because of the way Likes are fetched from API - fetching saga listens to last 'ModuleAdded' action from DynamicModuleLoader, and then fetches data. So if Likes module added, and then some other modules still need to be added, it'll bring an Promise error. 

If likes SUDDENLY stop being fetched - find the only ![#c5f015](https://placehold.it/15/59ff00/000000?text=+) `green` comment in likes-duck and check if an action, used there, is fired by DynamicModules. If not - edit action name. If yes - check an api-adress in 'comments' service.

Nothing will break if Comments is not last module - there will be error of type "comments-api/LOAD_COMMENTS_ABORT" in console.

####Utils
Comments uses `selectorOnId`, `serverRequests`, `hashTables` and `noop` utils  