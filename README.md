# Jobscraper

Scrape job sites for keywords

- only supports Indeed.com
- Stores results in csv file
- Fully traverses set of results pages



[toc]



***

## Setup

Create react app

```shell
$ npx create-react-app jobscraper
```

Add top-level directory for the Flask project

```shell
$ mkdir api
$ cd api
```

Activate venv (python3 ) and install modules

```shell
$ python3 -m venv env 
$ source env/bin/activate
$ pip install -r requirements.txt
```

Check that flask is set up

```shell
$ python3 -c "import flask; print(flask.__version__)"
```

Continue working from project root

```shell
$ cd ..
```

If everything is working, add a proxy key to package.json so that React will redirect requests on its default port 3000 to Flask on port 5000. 

```json
"proxy": "http://localhost:5000"
```

Include flask in your `package.json`

```json
"start-api": "cd api && FLASK_APP=main.py FLASK_ENV=development env/bin/flask run --no-debugger",
```



### Add Cypress testing framework

```shell
$ yarn add cypress --dev
```

and edit`package.json`

``` json
"cypress": "cypress open"
```

Add `baseUrl` to `cypress.json` so that `cy.visit('/')` will resolve.

```json
"baseUrl": "http://localhost:3000"
```



### Convert Javascript to Typescript

App Typescript packages to project

```shell
$ yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

Create `tsconfig.json`

```shell
$ npx tsc --init
```

Refactor until the Typescript compiler is happy. Some examples of type refactoring include:

* create JSON types based on APIs
* create types for `class` component state
* use `className` instead of `class` for styles

#### Troubleshooting

* If Jest and Cypress types conflict, read the closing comment on the [Github issue](https://github.com/cypress-io/cypress/issues/1319)



### Convert CSS to Sass

Add Sass packages to project

```shell
$ yarn add node-sass
```

Then rename App `.css` files to `.scss`. That's it! (+ refactoring)

If you get an error like `Node Sass version 6.0.0. is incompatible with ^4.0.0 ||  ^5.0.0`, then update `sass-loader` and add it to `devDependencies` in `package.json`.

```shell
$ yarn add -D sass-loader
$ rm -rf node_modules
$ rm yarn.lock
$ yarn install
```



## Testing

Start automated testing with Cypress

```shell
$ yarn cypress
```



**To test:**

* [ ] search
  * [ ]  search button
  * [ ]  add term button
  * [ ] search term list
    * [ ] add
    * [ ] delete
* [ ] popout search bar
* [ ] transition to results page
* [ ] cards list on results page
* [ ] card transition to fullscreen
* [ ] card go to link



## Run

Start flask server

```shell
$ yarn start-api
```

Start react app

```shell
$ yarn start
```



## Todo

* [ ] Setup test framework



## Notes

* send URL encoded search queries: `http://localhost:5000/search?terms=python+senior`



***

## *Getting Started with Create React App*

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify]
