# Decisions
About Architecture: I used an MVP (Model-View-Presenter) mixed up with Clean Architecture(https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) to have a reusable front end (You can re-use everything excepts the views if you want to change react for react native, vue, backbone, have a console interface, etc...) and it's super easy to test.
About logic responsibility: All the game logic is located in the InMemoryGameService. Why do you ask? If I had a backend, I would have all my models there with them own logic and the front end with just the presentation logic. Because I hadn't a backend, I mimic it with this service, which could be easily replaced with a real HTTP implementation that connects to an API, modifying and returning the state of the game.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn`
To install all the dependencies. Do it, before run "yarn start".

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
