# Jobscraper

Scrape job sites for keywords

- only supports Indeed.com
- Stores results in csv file
- Fully traverses set of results pages



[toc]



***

## Setup

Note to self: don't use the yarn package manager, because of issues like `yarn check` .... >:( 

Use npm instead.

```shell
$ npm install
```

If there are security vulnerabilities in dependencies, then try to have npm automatically fix them. This requires that no breaking changes are necessary.

```shell
$ npm audit fix
```

If this fails, then you are at the mercy of the devs (usually). Open an issue or submit a PR!



### Migrating from create-react-app to Next.js

Create react app

```shell
$ npx create-react-app jobscraper
```

Whoops! You fell for a noob trap! Time to migrate to Next.js which has [better performance.](https://blog.logrocket.com/next-js-vs-create-react-app/) CRA has unpatched vulnerabilities for over a month and there is developer drama. Best to bite the bullet and use Next.JS.

```shell
$ npx create-next jobscraper
```



### Flask backend

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

~~If everything is working, add a proxy key to package.json so that React will redirect requests on its default port 3000 to Flask on port 5000.~~ With Next.js, can add a Rewrite in `next.config.js` for Next to communicate with Flask with the same proxy feel.

Include flask in your `package.json` scripts.

```json
"flask": "cd api && FLASK_APP=main.py FLASK_ENV=development env/bin/flask run --no-debugger",
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

To use `.scss` with Typescript and Next.js, use the `typed-scss-modules` package.

```shell
$ npm install -D typed-scss-modules
```

You may have to modify your dependencies since  `typed-css-module` doesn't support `node-sass` 6.0 yet.

This package will automatically generate `.d.ts` files

```shell
$ ./node_modules/.bin/tsm src
```

#### Troubleshooting

* If Jest and Cypress types conflict, read the closing comment on this [Github issue](https://github.com/cypress-io/cypress/issues/1319)

* If _document.tsx or _app.tsx are needed, check [this gist.](https://gist.github.com/elzup/db2229b132ccda46d4ac3b25a52b60b7) The _document.tsx file can be used to override the root level document that is [rendered only on the server](https://nextjs.org/docs/advanced-features/custom-document) so it can be used for CDN scripts or meta tags.



### Convert CSS to Sass

Add Sass packages to project

```shell
$ npm add node-sass
```

Then rename App `.css` files to `.scss`. That's it! (+ refactoring)

If you get an error like `Node Sass version 6.0.0. is incompatible with ^4.0.0 ||  ^5.0.0`, then update `sass-loader` and add it to `devDependencies` in `package.json`.

```shell
$ npm add -D sass-loader
$ rm -rf node_modules
$ rm package-lock.json
$ npm install
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
$ npm run flask
```

Start react app

```shell
$ npm run dev
```



## Todo

- [ ] Read [Flask Mega-tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-xxiii-application-programming-interfaces-apis) on APIs

## Notes

* send URL encoded search queries: `http://localhost:5000/search?terms=python+senior`

* install the React dev tools extension for Chrome for `Component` debugging

## Keywords

* ES6, JSX, Next.js, React, Typescript, Javascript, Flask, Python, Sass, HTML, CSS, Cypress

