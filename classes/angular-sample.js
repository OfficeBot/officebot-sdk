let Model = require('./model.class.js');
let ApiClass = require('./api.class.js');

angular
.module('officebot-sdk', [])
.constant('Model', Model)
.factory('api', function sdkFactory() {
  let apiDefs = new ApiClass();

  	apiDefs.endpoint('Test')
  		.model(Test)
  		.route('/test');

  	apiDefs.endpoint('Standard')
  		.model(Model)
  		.route('/standard');


  let api = apiDefs.init();

  return api;
});
