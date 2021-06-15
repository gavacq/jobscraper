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

### Setup MySQL

Install MySQL server

```shell
$ sudo apt install mysql-server
```

Install MySQL client, in this case `PyMySQL`

```shell
$ pip install PyMySQL
```

Install SQLAlchemy to facilitate DB communication

```shell
$ pip install SQLAlchemy
```

Create a new DB for the project

```sql
CREATE DATABASE jobscraper;
```

Run Hello World to verify the DB is set up correctly

```python
pymysql.install_as_MySQLdb()

engine = create_engine("mysql://gaa:123@localhost/jobscraper", echo=True, future=True)

with engine.connect() as conn:
  result = conn.execute(text("select 'hello world'"))
  print(result.all())
```

**Troubleshooting**

* MySQL privilege [error](https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost)
  * [should use](https://stackoverflow.com/questions/49194719/authentication-plugin-caching-sha2-password-cannot-be-loaded)  `mysql_native_password` auth method for simplicity in this project.
* [tutorial](https://www.digitalocean.com/community/tutorials/build-a-crud-web-app-with-python-and-flask-part-one), more on [Connection](https://docs.sqlalchemy.org/en/14/tutorial/dbapi_transactions.html)

### SQLAlchemy actions

Initialize DB session. Changes will be applied here first before being `commit`ed to the actual DB.

```python
db = sessionLocal()
```

Bind engine to model metadata if data will be added to the DB.

```python
models.base.metadata.create_all(bind=engine)
```

Add job record to Records table.

```python
db.add(models.Record(name="Bob",url="bob.com",desc="Bob was here"))
```

Check [pending](https://stackoverflow.com/questions/13910576/find-out-how-many-uncommitted-items-are-in-the-session) session transactions. Can iterate through set `IdentitySet` if required.

```python
db.new
```

Commit the transaction and check that it was stored correctly. Can use `.all()` and list indexing if there are multiple matching records.

```python
db.commit()
Record.query.where(Record.name=='Bob').first()[0].desc
```

Alternatively add record using `store_records` function (see `main.py`)

```python
store_records([{"name":"Jill", "url":"jill.com", "desc":"Jill was here"}])
```

Delete items from table.

```python
d = Record.query.where(models.Record.name != 'Joe').delete()
db.commit
```

Close the DB after use.

```python
db.close()
```

## Testing

Start automated testing with Cypress

```shell
$ npm run cypress
```

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

- [ ] Read [REST API best practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/) then read [Flask Mega-tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-prt-xxiii-application-programming-interfaces-apis) on APIs

## Notes

* send URL encoded search queries: `http://localhost:5000/search?terms=python+senior`

### React

* install the React dev tools extension for Chrome for `Component` debugging

**Passing data between React components**

* use `props` for Parent -> Child
* use [function callbacks](https://reactjs.org/docs/faq-functions.html) from Child -> Parent
* for deeply nested component trees, use Redux or React Contexts

**States in React**

* `useState`hook is for functional Components
* `setState` function is for class Components



## Keywords

* ES6, JSX, Next.js, React, Typescript, Javascript, Flask, Python, Sass, HTML, CSS, Cypress

