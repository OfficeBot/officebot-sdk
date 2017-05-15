let modelHandler = {
  set : function(obj, propertyName, newValue) {
    let currentValue = obj[propertyName];
    if (currentValue !== newValue) {
      if (propertyName.charAt(0) !== '_') { //ignore private
        obj.__edits = obj.__edits || {};
        obj.__edits[propertyName] = newValue;
      }
    } else {
    	console.log(currentValue, newValue);
    	console.log(`No change on ${propertyName}`);
    }
    if ('object' === typeof newValue && newValue !== null) {
      obj[propertyName] = new Proxy(newValue, modelHandler);
    } else {
      obj[propertyName] = newValue;
    }
    return true;
  },
  defineProperty: function(target, property, descriptor) {
  	console.log('property defined');
  	return true;
  },
  // get : function(target, property, receiver) {
  // 	console.log(`"get" called on ${property}`);
  // 	let currentVal = target[property];
  // 	console.log(`${property} currently is`,typeof currentVal)
  // 	return target[property];
  // },
  apply: function(target, thisArg, argumentsList) {
  	console.log('apply')
	  return thisArg[target].apply(this, argumentList);
  },
  deleteProperty: function(target, property) {
	  console.log("Deleted %s", property);
    return true;
  }
};

class Model {
  constructor(data = {}) {
    Object.assign(this, data);
  }

  remove() {

  }

  patch() {

  }

  pull() {

  }

  save() {

  }

  isDirty() {
  	// console.log(this.__edits);
    return Object.keys(this.__edits || {}).length > 0;
  }

  toString(spaces = 1) {
    return JSON.stringify(this, false, spaces);
  }

  clean() {
  	this.__edits = {};
  }

}

function implementsInterface(constructorFn) {
	if ('function' !== typeof constructorFn || !constructorFn.prototype) {
		return false;
	}

	let requiredFunctions = ['isDirty','save','remove','toString','patch','pull'];
	for (let k = 0; k < requiredFunctions.length; ++k) {
		if ( Reflect.has(constructorFn.prototype, requiredFunctions[k] ) !== true) {
			return false;
		}
	}
	return true;
}

module.exports = function modelFactory(modelData = {}, modelConstructor = Model) {
	if ( !implementsInterface(modelConstructor) ) {
		throw new Error('Model constructor does not implement model interface');
	}
	let instance = new modelConstructor(modelData);
	let watcher = new Proxy(instance, {
    apply: function(target, thisArg, argumentsList) {
      return thisArg[target].apply(this, argumentList);
    },
    deleteProperty: function(target, property) {
      console.log("Deleted %s", property);
      return true;
    },
    set: function(target, property, value, receiver) {      
      target[property] = value;
      console.log("Set %s to %o", property, value);
      return true;
    }
  });
	return watcher;
}

