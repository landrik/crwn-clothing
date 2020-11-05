# CRWN-CLOTHING
A full-stack E-Commerce solution built entirely with JavaScript

[![Build Status]()](https://travis-ci.com/landrik/ecommerce-turing)
[![Maintainability]()](https://codeclimate.com/github/landrik/ecommerce-turing/maintainability)
[![Test Coverage]()](https://codeclimate.com/github/landrik/ecommerce-turing/test_coverage)

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

### Frontend App

Technologies used:

- React.js
- Redux (with Redux Thunk)
- React Router
- Axios (for network calls to the backend)
- Sass (for styling)

The frontend is a fully responsive Single Page Application (SPA) optimised for performance by limiting renders when possible.