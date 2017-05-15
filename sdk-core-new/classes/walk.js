var proxyHandle = {
  apply: function(target, thisArg, argumentsList) {
    return thisArg[target].apply(this, argumentList);
  },
  deleteProperty: function(target, property) {
    console.log("Deleted %s", property);
    return true;
  },
  set: function(target, property, value, receiver) {      
    target[property] = value;
    console.log("Set %s to", property, value);
    return true;
  },
  get(target, key) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], proxyHandle)
    } else {
      return target[key];
    }
  }
};

var walk = function(obj, parent, path = 'this') {
	if (Array.isArray(obj)) {
		return obj.forEach((item, index) => {
			return walk(item, obj, path + '.' + index);
		});
	} else if ('object' === typeof obj && Object.keys(obj).length) {
		return Object.keys(obj).forEach(key => {
			return walk(obj[key], obj, path + '.' + key);
		});
	}
}

class Observable {
	constructor(obj) {
		this.original = new Proxy(obj, proxyHandle);
	}
}

var sample = new Proxy({
	key1 : {
		deeply : {
			nested : ['array','of','values']
		}
	},
	key2 : 'simple string',
	key3 : 12
}, proxyHandle);

sample.key3 = 20;
sample.key1.deeply.newVal = 'new entry';
sample.key1.deeply.nested[0] = 'updated val';
// console.log(sample);

// let a = sample.key1.deeply.nested;
// a.push('!!!')
// console.log(sample.key1.deeply.nested instanceof Proxy);
// console.log(JSON.stringify(sample, false, 4));
// map['sample.key2'] = 'new value';
// map.sample.key2 = 'new value';
// console.log(map);
// console.log(sample);
// sample.key2 = 'inserted key';
// sample.key1.deeply.nested.push('new value');

