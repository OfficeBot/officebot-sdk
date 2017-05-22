let Request = require('./request.class.js');

module.exports = function EndpointInstantiator(endpointConfig = {}) {

	if (!endpointConfig) {
		throw new Error('Invalid endpoint configuration');
	}

	class ApiEndpoint {
		constructor(createWithData = {}) {
			let constructorFn = endpointConfig.model();
			let instance = new constructorFn( createWithData);

			//An easily overwritable save method
			instance.save = function(cb) {
				let callback = cb || function noop() {};
				return new Promise((resolve, reject) => {
					new Request()
						.post()
						.exec()
						.then(response => {
							let model = new constructorFn( response.body(), response.config() );
							callback(null, model);
							return resolve(model);
						}).catch(err => {
							callback(err);
							return reject(err); //bubble
						});
				});

			};
			return instance;
		}

		static relativeUrl(componentsArray = []) {
			if ('string' === typeof componentsArray) {
				componentsArray = [componentsArray];
			}
			let target = [endpointConfig.baseUrl].concat(componentsArray).join('/');
			return target;
		}

		static find(searchFor = {}) {
			return new Request()
				.get()
				.query( searchFor )
				.transformResponse(function(response) {
					let constructorFn = endpointConfig.model();
					return new constructorFn( response.config.body, response.config );
				})
				.url( ApiEndpoint.relativeUrl() );

		}

		static findById(id) {
			if ('string' !== typeof id) {
				return new Request().error(new Error('"id" must be type "string".'));
			}
			return new Request()
				.get()
				.transformResponse(function(response) {
					let constructorFn = endpointConfig.model();
					return new constructorFn( response.config.body, response.config );
				})
				.url( ApiEndpoint.relativeUrl(id) );
		}

		static findByIdAndUpdate(id, newContents) {
			if ('string' !== typeof id) {
				return new Request().error(new Error('"id" must be type "string".'));
			}
			if ('object' !== typeof newContents) {
				return new Request().error(new Error('"contents" must be type "object".'));
			}

			return new Request()
				.put()
				.body(newContents)
				.transformResponse(function(response) {
					let constructorFn = endpointConfig.model();
					return new constructorFn( response.config.body, response.config );
				})
				.url( ApiEndpoint.relativeUrl(id) );
		}

		static findByIdAndRemove(id) {
			if ('string' !== typeof id) {
				return new Request().error(new Error('"id" must be type "string".'));
			}
			return new Request()
				.delete()
				.url( ApiEndpoint.relativeUrl(id) );
		}

	} //end inner constructor
	return ApiEndpoint;

};
