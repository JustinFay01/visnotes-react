# Project Structure

This repository follows a modified version of [bulletproof-react](https://github.com/alan2207/bulletproof-react/tree/master). For more detail visit their official github page.

## Basic Overview

For the full documentation visit [here](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md). **The only key difference, is that we will recommend a shared api folder instead of one 'per feature.'** In many cases, the api layer will be shared across multiple features, however, there are cases where a feature may have a unique api call. In this case, the api call will be placed in the feature folder.

### Api Layer

As we add react query to the app we will have the API call and query/mutation hook in the same file. With this pattern we'll want to have each API call in a separate file the following convention `{verb}-{resource}` (i.e. `get-subjects` or `update-subject`).

### Structure

```
src
|
|
+-- api               # exported API request declarations and api hooks
|    |
|    |
|    +-- {resource}
|    |    |
|    |   +-- {verb}-{resource}.ts      # both the axios api call and the react query. (i.e. `get-subjects` or `update-subject`).
|    |
|    +-- query-keys                    # contains query key arrays for the resource (see best practices for an example).
|        +-- {resource}-key-factory.ts
|
+-- app               # application layer containing:
|   |                 # this folder might differ based on the meta framework used
|   +-- routes        # application routes / can also be pages
|   +-- app.tsx       # main application component
|   +-- provider.tsx  # application provider that wraps the entire application with different global providers
|   +-- router.tsx    # application router configuration
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|   |
|   +-- layouts       # global layouts which can include things like side nav and global header
|   |
|   +-- ui            # absolute base components. Wrappers for third party libraries. No logic should be contained here
|   |
|   +-- feedback      # loading ui, modals, global toasts, etc.
|   |
|   +-- ...           # any other global base components specific to the application. Logos etc.
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries pre-configured for the application
|
+-- state            # global state
|
+-- test              # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```

## Feature Overview

```
src/features
|
|
+-- top-level-feature   
    |
    +-- assets          # assets folder can contain all the static files for a specific feature
    |
    +-- components      # components scoped to a specific feature
    |
    +-- hooks           # hooks scoped to a specific feature
    |
    +-- state           # state for a specific feature
    |
    +-- types           # typescript types used within the feature
    |
    +-- utils           # utility functions for a specific feature
```
