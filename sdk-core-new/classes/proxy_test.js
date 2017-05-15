var changelog = [];



function makeProxy(obj, root) {

	return new Proxy(obj, {
	  apply: function(target, thisArg, argumentsList) {
	    return thisArg[target].apply(this, argumentList);
	  },
	  deleteProperty: function(target, property) {
	    console.log("Deleted %s", property);
	    return true;
	  },
	  set: function(target, property, value, receiver) {    
			let change = {
				action : 'set',
				value : value,
				property : property,
				target : target,
				root : root, //closure
				receiver : receiver
			};
			changelog.push(change);
	    target[property] = value;
	    return true;
	  }
	});
}

var base = makeProxy({
	some : 'primitive',
	nested : makeProxy({
		values : 'are harder'
	}),
	another : makeProxy(['array'])
});

base.nested.values = 'easy now!';
// console.log(changelog);
console.log(base);
// base.another.push('some value');