(function() {

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
      console.log("Set %s to %o", property, value);
      return true;
    }
  };

  // our backing array
  // var array = { vals : ["a", "b", "c", "d"] };
  var proxy = new Proxy({vals : ["a", "b", "c", "d"]}, proxyHandle);
  proxy.vals = new Proxy(proxy.vals, proxyHandle);
  // proxy.vals = new Proxy(, proxyHandle)

  // a proxy for our array
  // var proxy = new Proxy(array, {);
  console.log("Set a specific index..");
  proxy.vals[0] = "x";

  console.log("Add via push()...");
  proxy.vals.push("z");

  console.log("Add/remove via splice()...");
  proxy.vals.splice(1, 3, "y");

  console.log("Current state of array: %o", proxy);

})();