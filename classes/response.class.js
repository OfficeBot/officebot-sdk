let privateData = new WeakMap();

class Response {
	constructor(httpObject) {
		//set some defaults. Using weakmaps so gc can work correctly and to create
		//private data sets

		privateData.set(this, {
			headers : {},
			body : {},
			request : {},
			status : -1,
			statusText : '',
			url : ''
		});

		if (httpObject) {
			this.parseResponse(httpObject);
		}
	}


	config() {
		return privateData.get(this);
	}
	/**
		* This helps us match responses to requests. This won't make a request,
		* it just assigned the original request into this response object
		*/
	requestedWith(originalRequest) {
		if ('object' === typeof originalRequest) {
			privateData.get(this).request = originalRequest;
			return this;
		} else {
			return privateData.get(this).request;
		}
	}

	body(bodyConfig) {
		if ('string' === typeof bodyConfig) {
			let newBody = {};
			try {
				newBody = JSON.parse(bodyConfig);
			} catch(e) {
			}
			privateData.get(this).body = newBody;
			return this;
		} else if ('object' === typeof bodyConfig) {
			privateData.get(this).body = bodyConfig;
			return this;
		} else {
			return privateData.get(this).body;
		}
	}

	headers(headerConfig) {
		if ('string' === typeof headerConfig) {
			let newHeaders = {};
			try {
				newHeaders = JSON.parse(headerConfig);
			} catch(e) {
			}
			privateData.get(this).headers = newHeaders;
			return this;
		} else if ('object' === typeof headerConfig) {
			privateData.get(this).headers = headerConfig;
			return this;
		} else {
			return privateData.get(this).headers;
		}
	}

	status(newStatus) {
		if ('string' === typeof newStatus || 'number' === typeof newStatus) {
			let parsedStatus = parseInt(newStatus);
			if (isNaN(parsedStatus)) {
				parsedStatus = 400;
			}
			privateData.get(this).status = parsedStatus;
			return this;
		} else {
			return privateData.get(this).status;
		}
	}

	statusText(newStatusText) {
		if ('string' === typeof newStatusText) {
			privateData.get(this).statusText = newStatusText;
			return this;
		} else {
			return privateData.get(this).statusText;
		}
	}

	url(newUrl) {
		if ('string' === typeof newUrl) {
			privateData.get(this).url = newUrl;
			return this;
		} else {
			return privateData.get(this).url;
		}
	}

	parseResponse(httpObject) {
		if ('object' !== typeof httpObject) {
			throw new Error('First argument "httpObject" must be type "object"');
		}
		let body = {};
		if ('object' === typeof httpObject.response) {
			body = httpObject.response;
		} else {
			try {
				body = JSON.parse( httpObject.response );
			} catch(e) {}
		}

		let headers = {};
		if ('function' === typeof httpObject.getAllResponseHeaders) {
			httpObject.getAllResponseHeaders().split('\n').forEach(headerText => {
				let pieces = headerText.split(':');
				let headerName = pieces[0];
				let value = (pieces[1] || '').replace(/^\s+/,'');
				if ('string' === typeof headerName && headerName.length) {
					headers[headerName] = value;
				}
			});
		}

		this
			.body( body )
			.headers( headers )
			.url( httpObject.responseURL || '')
			.statusText( httpObject.statusText || '')
			.status( httpObject.status || -1);

		return this;
	}
}

module.exports = Response;
