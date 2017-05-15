class Response {
	constructor(httpObject) {
		this.config = {};
		if (httpObject) {
			this.parseResponse(httpObject);
		}
	}

	/**
		* This helps us match responses to requests. This won't make a request,
		* it just assigned the original request into this response object
		*/
	requestedWith(originalRequest) {
		if ('object' === typeof originalRequest) {
			this.config.originalRequest = originalRequest;
			return this;
		} else {
			return this.config.originalRequest;
		}
	}

	body(bodyConfig) {
		if ('string' === typeof bodyConfig) {
			try {
				this.config.body = JSON.parse(bodyConfig);
			} catch(e) {
				this.config.body = {};
			}
			return this;
		} else if ('object' === typeof bodyConfig) {
			this.config.body = bodyConfig;
			return this;
		} else {
			return this.config.body;
		}
	}

	headers(headerConfig) {
		if ('undefined' !== typeof headerConfig) {
			this.config.headers = headerConfig;
			return this;
		} else {
			return this.config.headers;
		}
	}

	status(newStatus) {
		if ('undefined' !== typeof newStatus) {
			this.config.status = parseInt(newStatus);
			if (isNaN(this.config.status)) {
				this.config.status = 500;
			}
			return this;
		} else {
			return this.config.status;
		}
	}

	statusText(newStatusText) {
		if ('undefined' !== typeof newStatusText) {
			this.config.statusText = newStatusText;
			return this;
		} else {
			return this.config.statusText;
		}
	}

	url(newUrl) {
		if ('string' === typeof newUrl) {
			this.config.url = newUrl;
			return this;
		} else {
			return this.config.url;
		}
	}

	parseResponse(httpObject) {
		let response = new Response();

		let body = {};
		if ('object' === typeof httpObject.response) {
			body = httpObject.response;
		} else {
			try {
				body = JSON.parse( httpObject.response );
			} catch(e) {
				console.log(e);
			}
		}

		let headers = {};
		httpObject.getAllResponseHeaders().split('\n').forEach(headerText => {
			let pieces = headerText.split(':');
			let headerName = pieces[0];
			let value = (pieces[1] || '').replace(/^\s+/,'');
			if ('string' === typeof headerName && headerName.length) {
				headers[headerName] = value;
			}
		});

		this
			.body( body )
			.headers( headers )
			.url( httpObject.responseURL )
			.statusText( httpObject.statusText )
			.status( httpObject.status );

		return this;
	}
}

module.exports = Response;

