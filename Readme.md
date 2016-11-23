# Office Bot SDK

This module provides a common platform for accessing Office Bot's different API's from an Angular application. This library is a specialized version of the API provider code outlined in the [2014 ng-conf lecture](https://youtu.be/62RvRQuMVyg).

# Getting Started

The first step is to include the library into your Angular application. We use [Browserify](https://github.com/substack/node-browserify) to bundle our application together, so our application usually looks something like this:

```
var angular = require('angular');

angular
	.module('application-root', [
		require('officebot-sdk')
	]);

```

If you are including this code directly from your HTML, be sure to use the files in `/dist`.

```
<script src='/node_modules/officebot-sdk/dist/officebot-sdk.js'></script>
```

# Basic Usage

Once you have the library included in your application, you will need to tell your application a little information about the API endpoints you plan on targeting. To do that, you will need to define an angular `.config` block with something like:


```
.config(function(apiProvider) {

	apiProvider
		.setBaseRoute('/api/v1');

	apiProvider.endpoint('SomeEndpoint')
		.route('/some-endpoint');

	apiProvider.endpoint('SomeOtherEndpoint')
		.route('/some-other-endpoint');

	//...additional routes go here

});

```

Now that you have that defined, you can use the `api` service from any of your controllers like this:

```
.controller(function YourController(api, $scope) {
	api.SomeEndpoint
		.find(someQuery)
		.exec(function(err, results) {
			if (err) {
				window.self-destruct(); //or, you know, handle the error
			}
			$scope.results = results;
		});
});

```

# Endpoint methods

Since we use mongoose for our ORM, we wanted our code to mimic the mongoose api as much as possible. As such, this code offers a lot of the same functionality. One each endpoint, by default, offers the following methods:

## .find(query, config, callback)

Sends a query to the api. If a function is passed as the last this method will execute the query and return the results using that callback function. Otherwise, `this` gets returned for chaining purposes

```
@param {object} query
@param {object=} config
@param {function=} callback
@returns {object|promise}
```

## .findById(query, config, callback)

Asks the api to return one element with matching id. If a function is passed as the last parameter, this method will execute the query and return the results using that callback function. Otherwise, `this` gets returned for chaining purposes

```
@param {string} resource id
@param {object=} config
@param {function=} callback
@returns {object|promise}
```

## .findByIdAndUpdate(id, config, callback)

Finds a single element on the API using a unique id and REPLACES it with the data you provide. This function does not provide atomic updates. If a function is passed as the callback, the query will execute and the error or result from the call will be passed back using the callback. If no function is provided, `this` will be returned for chaining purposes

```
@param {string} resource id
@param {object=} config
@param {function=} callback
@returns {object|promise}
```

## .findByIdAndRemove(id, callback)

Finds an element on the API and removes it using a unique ID. If a  function is passed as the last parameter, this method will execute the query and return the results using that callback function. Otherwise, `this` gets returned for chaining purposes

```
@param {string} resource id
@param {function=} callback
@returns {object|promise}
```

## .exec(callback)
This method will compose the final request, send it over our transport, and return the error or results using the provided callback function. Additionally, the response is wrapped in our custom Model objects to make working with them a lot easier

```
@param {function} callback
@returns {promise}
```

## .skip

Asks the API to pass over the first N records when returning data. API support may vary.

```
@param {number} Number of records to skip
@returns {object} self
```

## .limit

Asks the API to limit the number of records returns. API support may vary.

```
@param {number} Max number of records to return
@returns {object} self
```

# Models

Models give our returned data a logical wrapper so we aren't working with raw JSON data.

## Instantiation

Creating a new model can be as easy as calling the `new` keyword, but if you're wanting to wait for defaults back from the server before you proceed, pass a callback function as your second parameter to your instantiation method (the first parameter being any initial values you would like to persist).

```
var someModel = new ModelName(defaults, function onReady(err) {
	//By this point, someModel will have defaults from the server but this instance WON'T persist until .save is called
});
```

## .save(callback)

This is used when we are creating a new object that is to be saved on the given endpoint. Here's an example:

```
var someModel = new api.SomeModel(dataYouWantToSave);
someModel.save(function(err) {
	if (err) {...}
	//someModel will now also have defaults from the server, depending on the API
});
```

## .remove(callback)

Calling this method on a model will ask the API to remove it from the database. The callback function will return a single error parameter if something goes wrong.

```
someModel.remove(function(err) {
	if (err) {...}
});
```

# Todo

* Write unit tests
* Fix jshint errors

# License
MIT
