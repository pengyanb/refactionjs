# refactionjs
Refactoring exercise for Node

To run:
```
npm install
npm start
```
Browse to [http://localhost:3000](http://localhost:3000)

The exercise is to clean up this code and put it in a sensible structure, using the best of idiomatic ES and modern libraries and frameworks possible. The application runs correctly, but there's a lot of duplication and tangling of concerns, and its filtering is limited.

## Important - the requirements

* The code must run in the latest 6.x version of Node
* The code must be able to be built and run with npm commands - no extra scripts or tools that can't be run started from what's in the package.json
* You are welcome to introduce any libraries you feel are useful, but these must run on Windows, Mac, and Linux

## Guidance

There is no "right answer", but some good things to do might be:
* Separate concerns: untangle business logic, web serving, and data access
* Use React + Redux, or some other single page app framework to avoid having to make page reloads and to generalise the filtering system (e.g. so you can select all people who are both male and 20 years old)
* Use ES6+ features (only the ones available in Node 6.x) to improve the readability, scoping, reuse, and checking
* Introduce a task runner (we like Webpack :-)) with a transpiler to take advantage of even more modern ES features
* Introduce a linter
* Improve the configurability by replacing hardcoding of values with appropriate mechanisms for specifying them
* Improve error handling
* Add useful comments
* Add logging

## Most importantly: show us what you can do!