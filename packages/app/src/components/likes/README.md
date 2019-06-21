About Likes module

Likes must be last module, initialized in other packages, that uses them. It's because of the way Likes are fetched from API - fetching saga listens to last 'ModuleAdded' action from DynamicModuleLoader, and then fetches data. So if Likes module added, and then some other modules still need to be added, it'll bring an Promise error. 

If likes SUDDENLY stop being fetched - find the only ![#c5f015](https://placehold.it/15/59ff00/000000?text=+) `green` comment in likes-duck and check if an action, used there, is fired by DynamicModules. If not - edit action name. If yes - check an api-adress in 'likes' service.

####Utils
Likes uses `selectorOnId`, `serverRequests`, `hashTables` and `noop` utils 