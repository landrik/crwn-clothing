# CRWN-CLOTHING
A full-stack E-Commerce solution built entirely with JavaScript

[![Build Status]()](https://travis-ci.com/ovieokeh/ecommerce-turing)
[![Maintainability]()](https://codeclimate.com/github/ovieokeh/ecommerce-turing/maintainability)
[![Test Coverage]()](https://codeclimate.com/github/ovieokeh/ecommerce-turing/test_coverage)

This is a monorepo containing the API and Frontend of the Shopstack e-commerce platform.

This project is an E-Commerce store that sells T-Shirts powered with a Stripe payment system. Here are the technologies used in the project.

Access the demo here: [Link to Hosted Demo](http://crwn-clothing.herokuapp.com/)

## How To Run The App
This app makes use of `.env` files to store sensitive data, it is located in the root folder and should contain the following data:
```
NODE_ENV=development
PORT=[preferred port]

SALT_ROUNDS=[any integer > 0 && < 20]
SECRET_KEY=[a string for encrypting JWT tokens]

REACT_APP_SITE_TITLE = [your react app name]

REACT_APP_API_KEY = [an api key from gotten from firebase]
REACT_APP_AUTH_DOMAIN = [a domain name gotten from firebase]
REACT_APP_DATABASE_URL = [a database url gotten from firebase]
REACT_APP_PROJECT_ID = [project id name gotten from firebase]
REACT_APP_STORAGE_BUCKET = [storage bucket name from firebase]
REACT_APP_MESSAGING_SENDER_ID = [messaging sender id from firebase]

REACT_APP_STRIPE_PUBLISHABLE_KEY = [a stripe publishable key gotten from stripe]
REACT_APP_STRIPE_SECRET_KEY = [a stripe secret key gotten from stripe]

```

After setting up the environment keys, you can then run the following commands to get the app started:
```
$ npm i && npm run install:all
$ npm start
```
Now navigate to `http://localhost:<your_api_port>` from your browser and the app should be live.

Building The App
------
If you want to build the app and run the compiled version locally, you have to add a `.env` file in the root directory of the project.

Then in the root directory, run the following commands:
```
$ npm run build
$ npm start
```

## How To Run The API Tests
There are tests for all the API endpoints to ensure that they work as expected. To run them, first ensure that you have your environment keys setup then navigate to `/src/api` and run `npm t`.

## Project Info

### Backend API

Technologies used:

- Node.js with Express.js
- JWT for authentication
- firebase for database management
- Redis for server side caching of GET endpoints
- Throng for worker management

Access the API Documentation here: [Link to Documentation](https://shopstack-e.herokuapp.com/api-docs/). To access it on local, build the app, run `npm start` and navigate to `localhost:[port]/api-docs`.

The API is built on top of Node.js with the Express framework for performance and maintainability. For security, protected endpoints require a valid JWT token which is attached in the request headers like so:

```
user-key: <TOKEN>
```

Most of the GET endpoints are cached with a high-performant Redis server to prevent unnecessary calls to the database. The cached data expires after 1 hour so that outdated content is refreshed automatically.

There are integration tests for all the controllers that ensure that the API works as expected. To run the tests, run the following command from the root directory:

```
cd src/api && npm run test
```

Note that for the tests to run, you have to create a `.env` file with these details:

```
NODE_ENV=development
PORT=<ANY_FREE_PORT>
SALT_ROUNDS=<A_NUMBER_BETWEEN 1 - 10>
SECRET_KEY=<A_LONG_STRING>

DB_USERNAME_TEST=<DATABASE_USERNAME>
DB_PASSWORD_TEST=<DATABASE_PASSWORD>
DB_NAME_TEST=<DATABASE_NAME>
DB_HOST_TEST=<DATABASE_HOST>

```

### Frontend App

Technologies used:

- React.js
- Redux (with Redux Thunk)
- React Router
- Axios (for network calls to the backend)
- Sass (for styling)

The frontend is a fully responsive Single Page Application (SPA) optimised for performance by limiting renders when possible.