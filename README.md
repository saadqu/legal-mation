# 📄 LM Challenge

This project addresses most of the code challenge requirements using the following technologies:
- ReactJS using typescript
- Vite.js(https://vitejs.dev) – as bundler
- Vitest(https://vitest.dev) – as testing framework
- Redux Toolkit(https://redux-toolkit.js.org) – application state provider
- React router for navigation between pages
- React form hook, for forms and validations
- MirageJS for local test API's

This project utilizes MUI for layouts, controls, and a clean-looking environment.

## Installation

Using `yarn` as package manager. Follow below steps to run the project.
1. Install `node` version `20.7.0`.
2. Run `yarn` or `yarn install`.
3. Run `yarn dev` to start the project.
4. Copy `http://localhost:5173/` and open it on browser.

To run the tests, use `yarn test` to initiate the testing process. I've added some tests, but unfortunately, not all are covered yet.

## Functionalities

Covering aspects of authors and books.
As mentioned on the requirement document using [random user photos](https://randomuser.me/photos) for adding pictures of authors.
An author can be added and auto generated photo will be attached to the author.
After that An Author list can be seen on route: `/authors`

In this list action button can be seen for edit and deletion. Right now photos can not be changed photos can only be added when creating.
On press of `Trash Icon` a pop up will appear for confirming the deletion action.

``NOTE: If you delete an author which have the books assosiated to will crash the flow, as the books entites are still there if you delete it. I have tried to locate the function on MirageJS so it can auto delete all of the books assosited to but couldn't found it. So I moved forward to finish the remaining tasks.``

On above `Navbar` there is an option for `Books` where `Book list` and other actions are added.
When moving to `books` section there's an `Add` button and below is the list of `Books`.
Click the `Add` button will open up the page where a book can be created.
There are validations added so all fields are required.

`NOTE: authors in dropdown will only be shown if there are authors added to the system.`

## Further Plan

I am planning to add more tests and integrate `RTK Query` tests. Initially, I tested using the `React Query library`, and everything worked. However, after switching to `RTK Query`, some tests started failing. I will soon update the logic to fully utilize `RTK Query`, which is why some functions still rely on the `React Query library`.

Initially, I implemented the tests utilizing React Query, and these tests were successfully integrated and are functioning correctly on the `features-react-query-mirage` branch.
However, after evaluating our application requirements and performance considerations, I decided to migrate the app's functionality to use `RTK Query`. This transition promises more efficient data handling and better integration with `Redux`.
To review the initial tests using `React Query`, you can switch to the `features-react-query-mirage` branch. The updated tests, now aligned with RTK Query, have been committed to the main branch.
