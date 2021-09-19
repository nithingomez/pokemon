# How to run

Navigate to project folder (pokemonApp folder)
Run `npm install` to install all dependencies
Run `npm start` or `ng serve' to run the applicaiton in `http://localhost:4200/`

# Features of Pokemon Application

All functionality is achived except keyboard navigation including clean coding,responsiveness, listing, sorting, searching, items per page, detail page etc.
Pagination added using ngx-pagination, Persisting data after refresh done using Browser Local Storage
Additional functionalities implemented
 *spinning loading indicator added ngx-spinner
 *service worker (pwa) to cache the assets in disk to load the page faster

## Performance Optimization

Methods are created as pure functions for performance optimizations
Usage of pure pipes instead
Browser Local Storage is used to retain the search and sort state of the application
Other performance optimizations not implemented due to time constraint (memoization,virtual scroll)

## Pre push hook

Added ng lint pre push hook (using husky)

## Exclusions

Keyboard Navigation, Unit Testing, Beautification excluded due to time constraint


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).