module.exports = function modelCacheService() {
	var l = localStorage;

	this.put = put;
	this.get = get;
	this.invalidate = invalidate;

	function put(object, key) {
		var objectId = key || object._id;
		l.setItem(objectId, JSON.stringify(object));
		return objectId;
	}

	function get(objectId, constructor) {
		if (!objectId) {
			return;
		}
		var cachedItem;
		if ('string' === typeof l.getItem(objectId)) {
			try {
				cachedItem = JSON.parse( l.getItem(objectId) );
			} catch(e) {
				invalidate(objectId);
				return null;
			}
		} else {
			return null;
		}

		if ('function' === typeof constructor) {
			return constructor(cachedItem);
		} else {
			return cachedItem;
		}
		
	}

	function invalidate(objectId) {
		if (!objectId) {
			return false;
		}
		return l.removeItem(objectId);
	}
}