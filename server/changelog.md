<!-- add PR # and description -->

### Jul 3
- [] Add Update/Delete functionality on ServiceDetails page
- [] Add Update Dependency functionality 
### June 21
- [] Remove unique flag from name field in service model
- [] Update serviceController.registerService controller to handle duplicatation validation for the same-name services
- [] Update serviceController.registerService controller to push the new service into the project record
- [] Update backend global error handler to have flexible for different error status code
- [] Update Project Schema to use an array of object id instead of an array of strings
- [] Add Project context at the top of the react app & useProjectContext hook
- [] Update ProjectDetails react component to use real data for services list

### May 22
- [] Update config so that the backend repo, you can now use ES6 module exports/imports instead of commonJS modules
- [] Replace JS method of hiding keys & credentials with industry standard environment variables (env file & dotenv module)
- [] Add SIgn In With Google using passportJS, express-session, connect-mongo, etc.
- [] Fix issues with models (naming inconsistencies, mongo options, mongo types, exports/imports)
- [] Refactor & restructure backend repo to have proper directory hierarchy & code splitting
- [] Add proxy to be able to take in requests from frontend react server
