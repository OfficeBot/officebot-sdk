const Transport = require('./transport.class.js');
const Query = require('./query.class.js');
const Response = require('./response.class.js');

let config = new WeakMap();
let noop = function(data) { return data; };

class Request {
	constructor(options = {}) {
		let defaults = {
			method : 'get',
			headers : {},
			body : {},
			url : '',
			transformer : noop,
			query : new Query()
		};

		Object.assign(defaults, options);
		config.set(this, defaults);
	}

	config() {
		return config.get(this);
	}

	error(e) {
		if (e) {
			this.config().error = e;
			return this;
		} else {
			return this.config().error;
		}
	}

	get() {
		config.get(this).method = 'get';
		return this;
	}

	post() {
		config.get(this).method = 'post';
		return this;
	}

	put() {
		config.get(this).method = 'put';
		return this;
	}

	delete() {
		config.get(this).method = 'delete';
		return this;
	}

	method(newMethod) {
		if ('string' === typeof newMethod) {
			config.get(this).method = newMethod;
			return this;
		} else {
			return config.get(this).method;
		}
	}

	query(queryString) {
		if ('string' === typeof queryString || 'object' === typeof queryString) {
			config.get(this).query = new Query(queryString);
			return this;
		} else {
			return config.get(this).query.toString();
		}
	}

	body(newBody) {
		if ('string' === typeof newBody || 'object' === typeof newBody) {
			config.get(this).body = newBody;
			return this;
		} else {
			return config.get(this).body;
		}
	}

	headers(newHeaders) {
		if ('object' === typeof newHeaders) {
			config.get(this).headers = newHeaders;
			return this;
		} else {
			return config.get(this).headers;
		}
	}

	url(targetUrl) {
		if ('string' === typeof targetUrl) {
			config.get(this).url = targetUrl;
			return this;
		} else {
			return config.get(this).url;
		}
	}

 	requestUrl() {
		let target = this.url();
		if (this.query()) {
			target += '?' + this.query();
		}
		return target;
	}

	transformResponse(transformFn) {
		if ('function' === typeof transformFn) {
			config.get(this).transformer = transformFn;
			return this;
		} else {
			return config.get(this).transformer;
		}
	}

	exec() {
		if (this.error()) {
			return new Promise((resolve, reject) => {
				return reject(this.error());
			});
		}
		return new Transport(this).exec().then(rawResponse => {
			let response = new Response(rawResponse).requestedWith(this);
			if ('function' === typeof this.transformResponse()) {
				return this.transformResponse()( response );
			} else {
				return response;
			}
		});
	}
}

module.exports = Request;
