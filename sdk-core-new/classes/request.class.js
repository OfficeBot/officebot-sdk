const Transport = require('./transport.class.js');
const Query = require('./query.class.js');
const Response = require('./response.class.js');

class Request {
	constructor(config = {}) {
		let defaults = {
			method : 'get',
			headers : {},
			body : {},
			query : new Query()
		};
		this.config = {};
		Object.assign(this.config, defaults, config);
	}

	get() {
		this.config.method = 'get';
		return this;
	}

	post() {
		this.config.method = 'post';
		return this;
	}

	put() {
		this.config.method = 'put';
		return this;
	}

	delete() {
		this.config.method = 'delete';
		return this;
	}

	method(newMethod) {
		if ('string' === typeof newMethod) {
			this.config.method = newMethod;
			return this;
		} else {
			return this.config.method;
		}
	}

	query(queryString) {
		if ('undefined' !== typeof queryString) {
			this.config.query = new Query(queryString);
			return this;
		} else {
			return this.config.query.toString();
		}
	}

	body(newBody) {
		if ('undefined' !== typeof newBody) {
			this.config.body = newBody;
			return this;
		} else {
			return this.config.body;
		}
	}

	headers(newHeaders) {
		if ('undefined' !== typeof newHeaders) {
			this.config.headers = newHeaders;
			return this;
		} else {
			return this.config.headers;
		}
	}

	url(targetUrl) {
		if ('string' === typeof targetUrl) {
			this.config.url = targetUrl;
			return this;
		} else {
			return this.config.url;
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
			this.config.transformer = transformFn;
			return this;
		} else {
			return this.config.transformer;
		}
	}

	exec(callback) {
		return new Transport(this).exec(callback).then(rawResponse => {
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