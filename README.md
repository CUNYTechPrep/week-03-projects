# Week 3 In-class projects

## Installing `create-react-app`

The `create-react-app` utility helps you create new React projects easily. It handles generating a project, setting up babel, a dev server, and testing. It is the fastest way to get started developing react apps locally.

You only have to install the utility once using the following commands:

```
npm install -g npm
npm install -g create-react-app
```

> Note: the first command is to make sure you're running the most up to date version of npm.

## The Zip and City search API (ctp-zip-api)

http://ctp-zip-api.herokuapp.com/

For these weeks projects we will be developing two simple applications, (1) the first app allows us to search for City names and details for a given zip code, and (2) the second app allows us to find all of Zip codes associated with a given City name.

### find Cities given a zipcode

`http://ctp-zip-api.herokuapp.com/zip/:zipcode`

provide the zipcode in the url and you will receive a JSON response with an array containing an object for each city found. For example see:

http://ctp-zip-api.herokuapp.com/zip/10016

### find Zip codes given a city name

`http://ctp-zip-api.herokuapp.com/city/:cityname`

`:cityname` must be in all caps

provide the city name in the url and you will receive a JSON response with an array containing a list of all zip codes for that city:

http://ctp-zip-api.herokuapp.com/city/SPRINGFIELD


## Project 1: Zip Code Search app

In this project you will build a simple Zip Code search app. We will need an input field where the user can enter a zip code, like in the following image:

![Input field for searching Zip codes](zip-search-1.png)

We will use the user input to search the ctp-zip-api. If the zip code is valid the API will respond with an object for each city. Use that response to display each city in a separate div like in the following image: 

![Display City Results](zip-search-2.png)


## Project 2: City Search app

- `create-react-app city-search`
- `cd city-search`
- `npm start`

At this point you should see the React hello world page running on your browser. You should leave it running in the background while you work on this project.

Now open this folder (`city-search`) in your text editor, and begin developing the following app:

Using the same API as project 1, we will build a City search app, where given a city name, we will display all returned zip codes.

### Tasks

- Implement a City Search field that takes city names
    + it should allow city names to be entered in upper, lower, or mixed case letters
- Display all zip codes received from the API

### Extra credit

- Display all states where the city was found in the API
- Group received zip codes by state

> Note: these will require additional fetch call to the API.
