# Full Stack Engineering Challenge

## Changes
- Two new endpoints were added to backend\src\tasks\tasks.controller.ts `findAllTopLevel` and `findSubtasks`. 
This is so that we may retrieve only the top level tasks at app start, and then retrieve sub tasks for the individual tasks by clicking on the + sign on the task in the UI.
This was we only fetch the data we need.

- Corresponding methods were added in the tasks.service.ts, and the TaskContext component and api.ts in the frontend.

- Additionally, the API shall no longer return Task entity data types with eager-loaded related entities as before. It will now return DTOs with refrences by ID to the parent task and subtasks (if any)

- An Add Subtask button was added next to each task field, that will display a field allowing the user to enter a subtask.

- A '+' button was added next to each task, which fetches subtasks for that task  and displays them (if any)

- API methods were refactored as static methods of an API class. All will instead call a private fetch method with the appropriate method, url and data (if any). This was done so that fetch errors may be handled in a single catch block, and also so that the functionality may be extended without repeating code.

- Creating tasks remains unchanged

- App structure was refactored as a monorepo. In the future other apps may be added that consume this api, also any common libraries (that say, define shared data types like the TaskDTO) may be placed here. (perhaps also personal preference, I prefer to work this way as I believe it's cleaner and how I'm used to working)

- Added .dockerignore files. This way, if someone builds and runs these apps outside of Docker (for development perhaps) the build process won't copy node_modules and dist
