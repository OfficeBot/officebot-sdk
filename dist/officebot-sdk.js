(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/scottpeterson/Dev/officebot-sdk/index.js":[function(require,module,exports){
var angular = require('angular');
var moduleName = 'officebot-sdk';

angular
	.module(moduleName, [
		require('./sdk-core')
	])

module.exports = moduleName;
},{"./sdk-core":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/index.js","angular":"angular"}],"/Users/scottpeterson/Dev/officebot-sdk/node_modules/extend/index.js":[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],"/Users/scottpeterson/Dev/officebot-sdk/node_modules/object-hash/dist/object_hash.js":[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.objectHash=e()}}(function(){return function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return f(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,a,f,s,c,l){"use strict";function d(e,t){return t=h(e,t),g(e,t)}function h(e,t){if(t=t||{},t.algorithm=t.algorithm||"sha1",t.encoding=t.encoding||"hex",t.excludeValues=!!t.excludeValues,t.algorithm=t.algorithm.toLowerCase(),t.encoding=t.encoding.toLowerCase(),t.ignoreUnknown=t.ignoreUnknown===!0,t.respectType=t.respectType!==!1,t.respectFunctionNames=t.respectFunctionNames!==!1,t.respectFunctionProperties=t.respectFunctionProperties!==!1,t.unorderedArrays=t.unorderedArrays===!0,t.unorderedSets=t.unorderedSets!==!1,t.replacer=t.replacer||void 0,"undefined"==typeof e)throw new Error("Object argument required.");for(var n=0;n<v.length;++n)v[n].toLowerCase()===t.algorithm.toLowerCase()&&(t.algorithm=v[n]);if(v.indexOf(t.algorithm)===-1)throw new Error('Algorithm "'+t.algorithm+'"  not supported. supported values: '+v.join(", "));if(m.indexOf(t.encoding)===-1&&"passthrough"!==t.algorithm)throw new Error('Encoding "'+t.encoding+'"  not supported. supported values: '+m.join(", "));return t}function p(e){if("function"!=typeof e)return!1;var t=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;return null!=t.exec(Function.prototype.toString.call(e))}function g(e,t){var n;n="passthrough"!==t.algorithm?b.createHash(t.algorithm):new w,"undefined"==typeof n.write&&(n.write=n.update,n.end=n.update);var r=y(t,n);if(r.dispatch(e),n.update||n.end(""),n.digest)return n.digest("buffer"===t.encoding?void 0:t.encoding);var o=n.read();return"buffer"===t.encoding?o:o.toString(t.encoding)}function y(e,t,n){n=n||[];var r=function(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")};return{dispatch:function(t){e.replacer&&(t=e.replacer(t));var n=typeof t;return null===t&&(n="null"),this["_"+n](t)},_object:function(t){var o=/\[object (.*)\]/i,u=Object.prototype.toString.call(t),a=o.exec(u);a=a?a[1]:"unknown:["+u+"]",a=a.toLowerCase();var f=null;if((f=n.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+f+"]");if(n.push(t),"undefined"!=typeof i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===a||"function"===a){var s=Object.keys(t).sort();e.respectType===!1||p(t)||s.splice(0,0,"prototype","__proto__","constructor"),r("object:"+s.length+":");var c=this;return s.forEach(function(n){c.dispatch(n),r(":"),e.excludeValues||c.dispatch(t[n]),r(",")})}if(!this["_"+a]){if(e.ignoreUnknown)return r("["+a+"]");throw new Error('Unknown object type "'+a+'"')}this["_"+a](t)},_array:function(t,o){o="undefined"!=typeof o?o:e.unorderedArrays!==!1;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach(function(e){return i.dispatch(e)});var u=[],a=t.map(function(t){var r=new w,o=n.slice(),i=y(e,r,o);return i.dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()});return n=n.concat(u),a.sort(),this._array(a,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e)},_function:function(t){r("fn:"),p(t)?this.dispatch("[native]"):this.dispatch(t.toString()),e.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString(),"utf8")},_map:function(t){r("map:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_set:function(t){r("set:");var n=Array.from(t);return this._array(n,e.unorderedSets!==!1)},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function w(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}var b=e("crypto");n=t.exports=d,n.sha1=function(e){return d(e)},n.keys=function(e){return d(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return d(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return d(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var v=b.getHashes?b.getHashes().slice():["sha1","md5"];v.push("passthrough");var m=["buffer","hex","binary","base64"];n.writeToStream=function(e,t,n){return"undefined"==typeof n&&(n=t,t={}),t=h(e,t),y(t,n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_1e7b3280.js","/")},{buffer:3,crypto:5,lYpoI2:10}],2:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){var c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===i||t===l?62:t===u||t===d?63:t<a?-1:t<a+10?t-a+26+26:t<s+26?t-s:t<f+26?t-f+26:void 0}function n(e){function n(e){s[l++]=e}var r,i,u,a,f,s;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var c=e.length;f="="===e.charAt(c-2)?2:"="===e.charAt(c-1)?1:0,s=new o(3*e.length/4-f),u=f>0?e.length-4:e.length;var l=0;for(r=0,i=0;r<u;r+=4,i+=3)a=t(e.charAt(r))<<18|t(e.charAt(r+1))<<12|t(e.charAt(r+2))<<6|t(e.charAt(r+3)),n((16711680&a)>>16),n((65280&a)>>8),n(255&a);return 2===f?(a=t(e.charAt(r))<<2|t(e.charAt(r+1))>>4,n(255&a)):1===f&&(a=t(e.charAt(r))<<10|t(e.charAt(r+1))<<4|t(e.charAt(r+2))>>2,n(a>>8&255),n(255&a)),s}function r(e){function t(e){return c.charAt(e)}function n(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var r,o,i,u=e.length%3,a="";for(r=0,i=e.length-u;r<i;r+=3)o=(e[r]<<16)+(e[r+1]<<8)+e[r+2],a+=n(o);switch(u){case 1:o=e[e.length-1],a+=t(o>>2),a+=t(o<<4&63),a+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],a+=t(o>>10),a+=t(o>>4&63),a+=t(o<<2&63),a+="="}return a}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,i="+".charCodeAt(0),u="/".charCodeAt(0),a="0".charCodeAt(0),f="a".charCodeAt(0),s="A".charCodeAt(0),l="-".charCodeAt(0),d="_".charCodeAt(0);e.toByteArray=n,e.fromByteArray=r}("undefined"==typeof n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:10}],3:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r=typeof e;if("base64"===t&&"string"===r)for(e=N(e);e.length%4!==0;)e+="=";var i;if("number"===r)i=F(e);else if("string"===r)i=o.byteLength(e,t);else{if("object"!==r)throw new Error("First argument needs to be a number, array or string.");i=F(e.length)}var u;o._useTypedArrays?u=o._augment(new Uint8Array(i)):(u=this,u.length=i,u._isBuffer=!0);var a;if(o._useTypedArrays&&"number"==typeof e.byteLength)u._set(e);else if(O(e))for(a=0;a<i;a++)o.isBuffer(e)?u[a]=e.readUInt8(a):u[a]=e[a];else if("string"===r)u.write(e,0,t);else if("number"===r&&!o._useTypedArrays&&!n)for(a=0;a<i;a++)u[a]=0;return u}function l(e,t,n,r){n=Number(n)||0;var i=e.length-n;r?(r=Number(r),r>i&&(r=i)):r=i;var u=t.length;G(u%2===0,"Invalid hex string"),r>u/2&&(r=u/2);for(var a=0;a<r;a++){var f=parseInt(t.substr(2*a,2),16);G(!isNaN(f),"Invalid hex string"),e[n+a]=f}return o._charsWritten=2*a,a}function d(e,t,n,r){var i=o._charsWritten=W(V(t),e,n,r);return i}function h(e,t,n,r){var i=o._charsWritten=W(q(t),e,n,r);return i}function p(e,t,n,r){return h(e,t,n,r)}function g(e,t,n,r){var i=o._charsWritten=W(R(t),e,n,r);return i}function y(e,t,n,r){var i=o._charsWritten=W(P(t),e,n,r);return i}function w(e,t,n){return 0===t&&n===e.length?K.fromByteArray(e):K.fromByteArray(e.slice(t,n))}function b(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=J(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+J(o)}function v(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function m(e,t,n){return v(e,t,n)}function _(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=t;i<n;i++)o+=H(e[i]);return o}function E(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function I(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(i=e[t],t+1<o&&(i|=e[t+1]<<8)):(i=e[t]<<8,t+1<o&&(i|=e[t+1])),i}}function A(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i;return n?(t+2<o&&(i=e[t+2]<<16),t+1<o&&(i|=e[t+1]<<8),i|=e[t],t+3<o&&(i+=e[t+3]<<24>>>0)):(t+1<o&&(i=e[t+1]<<16),t+2<o&&(i|=e[t+2]<<8),t+3<o&&(i|=e[t+3]),i+=e[t]<<24>>>0),i}}function B(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+1<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=I(e,t,n,!0),u=32768&i;return u?(65535-i+1)*-1:i}}function L(e,t,n,r){r||(G("boolean"==typeof n,"missing or invalid endian"),G(void 0!==t&&null!==t,"missing offset"),G(t+3<e.length,"Trying to read beyond buffer length"));var o=e.length;if(!(t>=o)){var i=A(e,t,n,!0),u=2147483648&i;return u?(4294967295-i+1)*-1:i}}function U(e,t,n,r){return r||(G("boolean"==typeof n,"missing or invalid endian"),G(t+3<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,23,4)}function x(e,t,n,r){return r||(G("boolean"==typeof n,"missing or invalid endian"),G(t+7<e.length,"Trying to read beyond buffer length")),Q.read(e,t,n,52,8)}function S(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+1<e.length,"trying to write beyond buffer length"),z(t,65535));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,2);u<a;u++)e[n+u]=(t&255<<8*(r?u:1-u))>>>8*(r?u:1-u)}function C(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+3<e.length,"trying to write beyond buffer length"),z(t,4294967295));var i=e.length;if(!(n>=i))for(var u=0,a=Math.min(i-n,4);u<a;u++)e[n+u]=t>>>8*(r?u:3-u)&255}function j(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+1<e.length,"Trying to write beyond buffer length"),X(t,32767,-32768));var i=e.length;n>=i||(t>=0?S(e,t,n,r,o):S(e,65535+t+1,n,r,o))}function k(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+3<e.length,"Trying to write beyond buffer length"),X(t,2147483647,-2147483648));var i=e.length;n>=i||(t>=0?C(e,t,n,r,o):C(e,4294967295+t+1,n,r,o))}function T(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+3<e.length,"Trying to write beyond buffer length"),$(t,3.4028234663852886e38,-3.4028234663852886e38));var i=e.length;n>=i||Q.write(e,t,n,r,23,4)}function M(e,t,n,r,o){o||(G(void 0!==t&&null!==t,"missing value"),G("boolean"==typeof r,"missing or invalid endian"),G(void 0!==n&&null!==n,"missing offset"),G(n+7<e.length,"Trying to write beyond buffer length"),$(t,1.7976931348623157e308,-1.7976931348623157e308));var i=e.length;n>=i||Q.write(e,t,n,r,52,8)}function N(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Y(e,t,n){return"number"!=typeof e?n:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function F(e){return e=~~Math.ceil(+e),e<0?0:e}function D(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function O(e){return D(e)||o.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function H(e){return e<16?"0"+e.toString(16):e.toString(16)}function V(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else{var o=n;r>=55296&&r<=57343&&n++;for(var i=encodeURIComponent(e.slice(o,n+1)).substr(1).split("%"),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}}return t}function q(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}function P(e){for(var t,n,r,o=[],i=0;i<e.length;i++)t=e.charCodeAt(i),n=t>>8,r=t%256,o.push(r),o.push(n);return o}function R(e){return K.toByteArray(e)}function W(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function J(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function z(e,t){G("number"==typeof e,"cannot write a non-number as a number"),G(e>=0,"specified a negative value for writing an unsigned value"),G(e<=t,"value is larger than maximum value for type"),G(Math.floor(e)===e,"value has a fractional component")}function X(e,t,n){G("number"==typeof e,"cannot write a non-number as a number"),G(e<=t,"value larger than maximum allowed value"),G(e>=n,"value smaller than minimum allowed value"),G(Math.floor(e)===e,"value has a fractional component")}function $(e,t,n){G("number"==typeof e,"cannot write a non-number as a number"),G(e<=t,"value larger than maximum allowed value"),G(e>=n,"value smaller than minimum allowed value")}function G(e,t){if(!e)throw new Error(t||"Failed assertion")}var K=e("base64-js"),Q=e("ieee754");n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(n){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=V(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=R(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if(G(D(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];var n;if("number"!=typeof t)for(t=0,n=0;n<e.length;n++)t+=e[n].length;var r=new o(t),i=0;for(n=0;n<e.length;n++){var u=e[n];u.copy(r,i),i+=u.length}return r},o.prototype.write=function(e,t,n,r){if(isFinite(t))isFinite(n)||(r=n,n=void 0);else{var o=r;r=t,t=n,n=o}t=Number(t)||0;var i=this.length-t;n?(n=Number(n),n>i&&(n=i)):n=i,r=String(r||"utf8").toLowerCase();var u;switch(r){case"hex":u=l(this,e,t,n);break;case"utf8":case"utf-8":u=d(this,e,t,n);break;case"ascii":u=h(this,e,t,n);break;case"binary":u=p(this,e,t,n);break;case"base64":u=g(this,e,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":u=y(this,e,t,n);break;default:throw new Error("Unknown encoding")}return u},o.prototype.toString=function(e,t,n){var r=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,n=void 0!==n?Number(n):n=r.length,n===t)return"";var o;switch(e){case"hex":o=_(r,t,n);break;case"utf8":case"utf-8":o=b(r,t,n);break;case"ascii":o=v(r,t,n);break;case"binary":o=m(r,t,n);break;case"base64":o=w(r,t,n);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":o=E(r,t,n);break;default:throw new Error("Unknown encoding")}return o},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){var i=this;if(n||(n=0),r||0===r||(r=this.length),t||(t=0),r!==n&&0!==e.length&&0!==i.length){G(r>=n,"sourceEnd < sourceStart"),G(t>=0&&t<e.length,"targetStart out of bounds"),G(n>=0&&n<i.length,"sourceStart out of bounds"),G(r>=0&&r<=i.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n);var u=r-n;if(u<100||!o._useTypedArrays)for(var a=0;a<u;a++)e[a+t]=this[a+n];else e._set(this.subarray(n,n+u),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=Y(e,n,0),t=Y(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,(void 0),(!0)),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||(G(void 0!==e&&null!==e,"missing offset"),G(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return I(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return I(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return A(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return A(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||(G(void 0!==e&&null!==e,"missing offset"),G(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var n=128&this[e];return n?(255-this[e]+1)*-1:this[e]}},o.prototype.readInt16LE=function(e,t){return B(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return B(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return L(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return L(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return U(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return U(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return x(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return x(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||(G(void 0!==e&&null!==e,"missing value"),G(void 0!==t&&null!==t,"missing offset"),G(t<this.length,"trying to write beyond buffer length"),z(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){S(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){S(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){C(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){C(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||(G(void 0!==e&&null!==e,"missing value"),G(void 0!==t&&null!==t,"missing offset"),G(t<this.length,"Trying to write beyond buffer length"),X(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){j(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){j(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){k(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){k(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){T(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){T(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){M(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){M(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(e||(e=0),t||(t=0),n||(n=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),G("number"==typeof e&&!isNaN(e),"value is not a number"),G(n>=t,"end < start"),n!==t&&0!==this.length){G(t>=0&&t<this.length,"start out of bounds"),G(n>=0&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=H(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var Z=o.prototype;o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=Z.get,e.set=Z.set,e.write=Z.write,e.toString=Z.toString,e.toLocaleString=Z.toString,e.toJSON=Z.toJSON,e.copy=Z.copy,e.slice=Z.slice,e.readUInt8=Z.readUInt8,e.readUInt16LE=Z.readUInt16LE,e.readUInt16BE=Z.readUInt16BE,e.readUInt32LE=Z.readUInt32LE,e.readUInt32BE=Z.readUInt32BE,e.readInt8=Z.readInt8,e.readInt16LE=Z.readInt16LE,e.readInt16BE=Z.readInt16BE,e.readInt32LE=Z.readInt32LE,e.readInt32BE=Z.readInt32BE,e.readFloatLE=Z.readFloatLE,e.readFloatBE=Z.readFloatBE,e.readDoubleLE=Z.readDoubleLE,e.readDoubleBE=Z.readDoubleBE,e.writeUInt8=Z.writeUInt8,e.writeUInt16LE=Z.writeUInt16LE,e.writeUInt16BE=Z.writeUInt16BE,e.writeUInt32LE=Z.writeUInt32LE,e.writeUInt32BE=Z.writeUInt32BE,e.writeInt8=Z.writeInt8,e.writeInt16LE=Z.writeInt16LE,e.writeInt16BE=Z.writeInt16BE,e.writeInt32LE=Z.writeInt32LE,e.writeInt32BE=Z.writeInt32BE,e.writeFloatLE=Z.writeFloatLE,e.writeFloatBE=Z.writeFloatBE,e.writeDoubleLE=Z.writeDoubleLE,e.writeDoubleBE=Z.writeDoubleBE,e.fill=Z.fill,e.inspect=Z.inspect,e.toArrayBuffer=Z.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:11,lYpoI2:10}],4:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){if(e.length%p!==0){var n=e.length+(p-e.length%p);e=o.concat([e,g],n)}for(var r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=p)r.push(i.call(e,u));return r}function d(e,t,n){for(var r=new o(t),i=n?r.writeInt32BE:r.writeInt32LE,u=0;u<e.length;u++)i.call(r,e[u],4*u,!0);return r}function h(e,t,n,r){o.isBuffer(e)||(e=new o(e));var i=t(l(e,r),e.length*y);return d(i,n,r)}var o=e("buffer").Buffer,p=4,g=new o(p);g.fill(0);var y=8;t.exports={hash:h}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],5:[function(e,t,n){(function(t,r,o,i,u,a,f,s,c){function l(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>m?t=e(t):t.length<m&&(t=o.concat([t,_],m));for(var r=new o(m),i=new o(m),u=0;u<m;u++)r[u]=54^t[u],i[u]=92^t[u];var a=e(o.concat([r,n]));return e(o.concat([i,a]))}function d(e,t){e=e||"sha1";var n=v[e],r=[],i=0;return n||h("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),i+=e.length,this},digest:function(e){var i=o.concat(r),u=t?l(n,t,i):n(i);return r=null,e?u.toString(e):u}}}function h(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function p(e,t){for(var n in e)t(e[n],n)}var o=e("buffer").Buffer,g=e("./sha"),y=e("./sha256"),w=e("./rng"),b=e("./md5"),v={sha1:g,sha256:y,md5:b},m=64,_=new o(m);_.fill(0),n.createHash=function(e){return d(e)},n.createHmac=function(e,t){return d(e,t)},n.randomBytes=function(e,t){if(!t||!t.call)return new o(w(e));try{t.call(this,void 0,new o(w(e)))}catch(n){t(n)}},p(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){n[e]=function(){h("sorry,",e,"is not implemented yet")}})}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:10}],6:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var a=n,f=r,s=o,c=i;n=h(n,r,o,i,e[u+0],7,-680876936),i=h(i,n,r,o,e[u+1],12,-389564586),o=h(o,i,n,r,e[u+2],17,606105819),r=h(r,o,i,n,e[u+3],22,-1044525330),n=h(n,r,o,i,e[u+4],7,-176418897),i=h(i,n,r,o,e[u+5],12,1200080426),o=h(o,i,n,r,e[u+6],17,-1473231341),r=h(r,o,i,n,e[u+7],22,-45705983),n=h(n,r,o,i,e[u+8],7,1770035416),i=h(i,n,r,o,e[u+9],12,-1958414417),o=h(o,i,n,r,e[u+10],17,-42063),r=h(r,o,i,n,e[u+11],22,-1990404162),n=h(n,r,o,i,e[u+12],7,1804603682),i=h(i,n,r,o,e[u+13],12,-40341101),o=h(o,i,n,r,e[u+14],17,-1502002290),r=h(r,o,i,n,e[u+15],22,1236535329),n=p(n,r,o,i,e[u+1],5,-165796510),i=p(i,n,r,o,e[u+6],9,-1069501632),o=p(o,i,n,r,e[u+11],14,643717713),r=p(r,o,i,n,e[u+0],20,-373897302),n=p(n,r,o,i,e[u+5],5,-701558691),i=p(i,n,r,o,e[u+10],9,38016083),o=p(o,i,n,r,e[u+15],14,-660478335),r=p(r,o,i,n,e[u+4],20,-405537848),n=p(n,r,o,i,e[u+9],5,568446438),i=p(i,n,r,o,e[u+14],9,-1019803690),o=p(o,i,n,r,e[u+3],14,-187363961),r=p(r,o,i,n,e[u+8],20,1163531501),n=p(n,r,o,i,e[u+13],5,-1444681467),i=p(i,n,r,o,e[u+2],9,-51403784),o=p(o,i,n,r,e[u+7],14,1735328473),r=p(r,o,i,n,e[u+12],20,-1926607734),n=g(n,r,o,i,e[u+5],4,-378558),i=g(i,n,r,o,e[u+8],11,-2022574463),o=g(o,i,n,r,e[u+11],16,1839030562),r=g(r,o,i,n,e[u+14],23,-35309556),n=g(n,r,o,i,e[u+1],4,-1530992060),i=g(i,n,r,o,e[u+4],11,1272893353),o=g(o,i,n,r,e[u+7],16,-155497632),r=g(r,o,i,n,e[u+10],23,-1094730640),n=g(n,r,o,i,e[u+13],4,681279174),i=g(i,n,r,o,e[u+0],11,-358537222),o=g(o,i,n,r,e[u+3],16,-722521979),r=g(r,o,i,n,e[u+6],23,76029189),n=g(n,r,o,i,e[u+9],4,-640364487),i=g(i,n,r,o,e[u+12],11,-421815835),o=g(o,i,n,r,e[u+15],16,530742520),r=g(r,o,i,n,e[u+2],23,-995338651),n=y(n,r,o,i,e[u+0],6,-198630844),i=y(i,n,r,o,e[u+7],10,1126891415),o=y(o,i,n,r,e[u+14],15,-1416354905),r=y(r,o,i,n,e[u+5],21,-57434055),n=y(n,r,o,i,e[u+12],6,1700485571),i=y(i,n,r,o,e[u+3],10,-1894986606),o=y(o,i,n,r,e[u+10],15,-1051523),r=y(r,o,i,n,e[u+1],21,-2054922799),n=y(n,r,o,i,e[u+8],6,1873313359),i=y(i,n,r,o,e[u+15],10,-30611744),o=y(o,i,n,r,e[u+6],15,-1560198380),r=y(r,o,i,n,e[u+13],21,1309151649),n=y(n,r,o,i,e[u+4],6,-145523070),i=y(i,n,r,o,e[u+11],10,-1120210379),o=y(o,i,n,r,e[u+2],15,718787259),r=y(r,o,i,n,e[u+9],21,-343485551),n=w(n,a),r=w(r,f),o=w(o,s),i=w(i,c)}return Array(n,r,o,i)}function d(e,t,n,r,o,i){return w(b(w(w(t,e),w(r,i)),o),n)}function h(e,t,n,r,o,i,u){return d(t&n|~t&r,e,t,o,i,u)}function p(e,t,n,r,o,i,u){return d(t&r|n&~r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return d(t^n^r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return d(n^(t|~r),e,t,o,i,u)}function w(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function b(e,t){return e<<t|e>>>32-t}var v=e("./helpers");t.exports=function(e){return v.hash(e,l,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],7:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){!function(){var e,n,r=this;e=function(e){for(var t,t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n},r.crypto&&crypto.getRandomValues&&(n=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=n||e}()}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:10}],8:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){function l(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var n=Array(80),r=1732584193,o=-271733879,i=-1732584194,u=271733878,a=-1009589776,f=0;f<e.length;f+=16){for(var s=r,c=o,l=i,y=u,w=a,b=0;b<80;b++){b<16?n[b]=e[f+b]:n[b]=g(n[b-3]^n[b-8]^n[b-14]^n[b-16],1);var v=p(p(g(r,5),d(b,o,i,u)),p(p(a,n[b]),h(b)));a=u,u=i,i=g(o,30),o=r,r=v}r=p(r,s),o=p(o,c),i=p(i,l),u=p(u,y),a=p(a,w)}return Array(r,o,i,u,a)}function d(e,t,n,r){return e<20?t&n|~t&r:e<40?t^n^r:e<60?t&n|t&r|n&r:t^n^r}function h(e){return e<20?1518500249:e<40?1859775393:e<60?-1894007588:-899497514}function p(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n}function g(e,t){return e<<t|e>>>32-t}var y=e("./helpers");t.exports=function(e){return y.hash(e,l,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],9:[function(e,t,n){(function(n,r,o,i,u,a,f,s,c){var l=e("./helpers"),d=function(e,t){var n=(65535&e)+(65535&t),r=(e>>16)+(t>>16)+(n>>16);return r<<16|65535&n},h=function(e,t){return e>>>t|e<<32-t},p=function(e,t){return e>>>t},g=function(e,t,n){return e&t^~e&n},y=function(e,t,n){return e&t^e&n^t&n},w=function(e){return h(e,2)^h(e,13)^h(e,22)},b=function(e){return h(e,6)^h(e,11)^h(e,25)},v=function(e){return h(e,7)^h(e,18)^p(e,3)},m=function(e){return h(e,17)^h(e,19)^p(e,10)},_=function(e,t){var n,r,o,i,u,a,f,s,c,l,h,p,_=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),E=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),I=new Array(64);
e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var c=0;c<e.length;c+=16){n=E[0],r=E[1],o=E[2],i=E[3],u=E[4],a=E[5],f=E[6],s=E[7];for(var l=0;l<64;l++)l<16?I[l]=e[l+c]:I[l]=d(d(d(m(I[l-2]),I[l-7]),v(I[l-15])),I[l-16]),h=d(d(d(d(s,b(u)),g(u,a,f)),_[l]),I[l]),p=d(w(n),y(n,r,o)),s=f,f=a,a=u,u=d(i,h),i=o,o=r,r=n,n=d(h,p);E[0]=d(n,E[0]),E[1]=d(r,E[1]),E[2]=d(o,E[2]),E[3]=d(i,E[3]),E[4]=d(u,E[4]),E[5]=d(a,E[5]),E[6]=d(f,E[6]),E[7]=d(s,E[7])}return E};t.exports=function(e){return l.hash(e,_,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:10}],10:[function(e,t,n){(function(e,n,r,o,i,u,a,f,s){function c(){}var e=t.exports={};e.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=c,e.addListener=c,e.once=c,e.off=c,e.removeListener=c,e.removeAllListeners=c,e.emit=c,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:10}],11:[function(e,t,n){(function(e,t,r,o,i,u,a,f,s){n.read=function(e,t,n,r,o){var i,u,a=8*o-r-1,f=(1<<a)-1,s=f>>1,c=-7,l=n?o-1:0,d=n?-1:1,h=e[t+l];for(l+=d,i=h&(1<<-c)-1,h>>=-c,c+=a;c>0;i=256*i+e[t+l],l+=d,c-=8);for(u=i&(1<<-c)-1,i>>=-c,c+=r;c>0;u=256*u+e[t+l],l+=d,c-=8);if(0===i)i=1-s;else{if(i===f)return u?NaN:(h?-1:1)*(1/0);u+=Math.pow(2,r),i-=s}return(h?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,a,f,s=8*i-o-1,c=(1<<s)-1,l=c>>1,d=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,p=r?1:-1,g=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,u=c):(u=Math.floor(Math.log(t)/Math.LN2),t*(f=Math.pow(2,-u))<1&&(u--,f*=2),t+=u+l>=1?d/f:d*Math.pow(2,1-l),t*f>=2&&(u++,f/=2),u+l>=c?(a=0,u=c):u+l>=1?(a=(t*f-1)*Math.pow(2,o),u+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));o>=8;e[n+h]=255&a,h+=p,a/=256,o-=8);for(u=u<<o|a,s+=o;s>0;e[n+h]=255&u,h+=p,u/=256,s-=8);e[n+h-p]|=128*g}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")},{buffer:3,lYpoI2:10}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api-endpoint-config.js":[function(require,module,exports){
/**
	* @name InstantiateApiEndpointConfig
	* @desc Creates a new Api Endpoint Config object
	* @namespace OfficeBotSDK.ApiEndpointConfig
	* @memberof OfficeBotSDK
	* @param {provider} $injector
	* @returns {object} ApiEndpointConfig
	*/
module.exports = function InstantiateApiEndpointConfig($injector) {
	/**
	  * @constructor
	  */
	function ApiEndpointConfig() {}
	ApiEndpointConfig.prototype.route = route;
	ApiEndpointConfig.prototype.model = model;
	ApiEndpointConfig.prototype.methods = methods;
	ApiEndpointConfig.prototype.classDef = classDef;

	return ApiEndpointConfig;

	/**
		* @desc Overrides the methods for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function methods(methods) {
	  this.methods = $injector.instantiate(methods); 
	  return this;
	}
	/**
		* @desc Overrides the model constructor for this endpoint
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function model(model) {
	  this.model = $injector.instantiate(model);
	  return this;
	}

	function classDef(classDefObject) {
		this._classDef = classDefObject;
		return this;
	}

	/**
		* @desc Points this endpoint to a given route on the server
		* @memberof OfficeBotSDK.ApiEndpointConfig
		* @param {object} methods
		* @returns {object} this
		*/
	function route(route) {
	  this.route = route;
	  return this;
	}

};
},{}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api-endpoint.js":[function(require,module,exports){
var angular = require('angular');
var extend = require('extend');
var instantiateModel = require('./model.js');
var utils = require('./utils.js');

/**
  * @name ApiEndpoint
  * @desc Constructor for api endpoints
  * @namespace OfficeBotSDK.ApiEndpoint
  * @memberof OfficeBotSDK
  * @param {string} baseRoute
  * @param {object} endpointConfig
  * @param {object} transport
  * @returns {object} endpoint
  * @requires angular
  * @requires extend
  */
module.exports = function ApiEndpoint(baseRoute, endpointConfig, transport, cache, $timeout) {
  'use strict';
  'ngInject';

  /*
    This might seem confusing, but what we actually doing is providing an interface
    for when we call `new` on this. That is, if we do something like:
    var someObj = new ThisEndpoint()

    We then have the ability to pass in default data
  */
  var self = function(data, onReady) {
    if (data) {
      extend(true, this, data);
    }

    /*
      If we've passed in a custom model object, let's extend our default model
      with this custom model. This gives us new methods that newly created models for
      this endpoint will have
    */
    // if (endpointConfig.model) {
    //   var instance = this;
    //   var modelInstance = new endpointConfig.model(instance);
    //   angular.extend(this, modelInstance);
    // }
    var rootUrl = baseRoute + endpointConfig.route;

    if ('function' === typeof endpointConfig._classDef) {
      var instance = this;
      var modelInstance = new endpointConfig._classDef(instance);
      for (var i in instance) {
        if ('function' === typeof instance[i]) {
          modelInstance[i] = instance[i];
        }
      }
      return modelInstance;
    }

    return this;
  };

  /*
    Defaults for our request, in case config objects aren't passed in
  */
  self.req = {
    method : 'get',
    url : '',
    query : {},
    config : {},
    data : {}
  };

  /*
    Bring in the configurations that were passed in on baseRoute and endpointConfig
  */
  self.config = endpointConfig;
  self.baseUrl = baseRoute + self.config.route;

  /*
    Instead of inlining our functions, use hoisting to make things nice and clean
  */
  self.exec = exec;
  self.find = find;
  self.skip = skip;
  self.fields = fields;
  self.limit = limit;
  self.findById = findById;
  self.findByIdAndRemove = findByIdAndRemove;
  self.findByIdAndUpdate = findByIdAndUpdate;

  /*
    Save is bound to the prototype so we can use it when creating a new instance
  */
  self.prototype.save = save;

  /*
    If the endpointConfig has a custom methods object, extend our current methods list
    with the methods that we've passed in. This hasn't been tested very extensively
  */
  if (endpointConfig.methods) {
    endpointConfig.methods._parent = self;
    angular.extend(self, endpointConfig.methods);
  }

  return self;

  /**
    * @desc Indicates the amount of records to return when querying
    * @memberOf OfficeBotSDK.ApiEndpoint
    * @param {number} amount
    * @returns {object} self
    */
  function limit(amount) {
    self.req.query.limit = amount;
    return self;
  }

  /**
   * @desc This function will allow us to select specific fields that we want back from the db
   * @memberof OfficeBotSDK.ApiEndpoint
   * @param {string|array} fieldNames
   * @returns {object} self
   */
  function fields(fieldNames) {
    if (Array.isArray(fieldNames)) {
      fieldNames = fieldNames.join(',');
    }
    if ('string' !== typeof fieldNames) {
      fieldNames = '';
    }
    self.req.query.fields = fieldNames;
    return self;
  }
  /**
    * @desc Indicates the amount of records to skip over when querying
    * @memberOf OfficeBotSDK.ApiEndpoint
    * @param {number} amount
    * @returns {object} self
    */
  function skip(amount) {
    self.req.query.skip = amount;
    return self;
  }


  function save(callback) {
    var cb = callback || angular.noop;
    /* jshint validthis: true */
    var _this = this;
    //Use .request instead of .post in the super rare case we want to pass in some
    //config object prior to saving. I can't think of any need for this, but I'm
    //including that functionality just in case.
    /**
      * HACK - this only works *just because* and should be fixed to use a model instance
      */
    var method = 'POST'; //if new
    var targetUrl = self.baseUrl;
    if (_this.hasOwnProperty('@href')) {
      // if (_this._temporary !== true) {
      //   method = 'PUT';
      // }
      targetUrl = _this['@href'];
    }

    transport
      .request(targetUrl, method, _this, {}, self.req.config)
      .then(function(response) {
        response = response || {};
        var data = response.data;

        extend(true, _this, data);

        // cache.invalidate(data._id);

        //Signature is: error, *this* instance, full response body (mostly for debugging/sanity check)
        return cb(null, _this, response);
      }, function(err) {
        cb(err);
      });
  }

  /**
    * @desc Sends a query to the api. If a function is passed as the last
    * parameter, this method will execute the query and return the results
    * using that callback function. Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {object} query
    * @param {object=} config
    * @param {function=} callback
    * @returns {object|promise}
    */
  function find(query, config, callback) {
    var req = self.req;
    req.method = 'get';
    req.url = self.baseUrl;
    req.query = {
      search : query
    }
    if ('object' === typeof config) {
      req.config = config;
    } else {
      req.config = {};
    }

    var cb;

    if ('function' === typeof config) {
      cb = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    } else {
      req.config = config;
    }

    if ('function' === typeof cb) {
      return self.exec(cb);
    }
    return self;
  }

  /**
    * @desc Asks the api to return one element. If a function is passed as the
    * last parameter, this method will execute the query and return the results
    * using that callback function. Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
    * @param {object=} config
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findById(id, config, callback) {
    var req = self.req;
    req.method = 'get';
    /* jshint validthis: true */
    req.url = this.baseUrl + '/' + id;
    if ('object' === typeof config) {
      req.config = config;
    }

    var cb;

    if ('function' === typeof config) {
      cb = config;
    } else {
      req.config = config;
    }

    if ('function' === typeof callback) {
      cb = callback;
    }

    // Here, we need to see if this object is already in the cache. If so,
    // fetch it and override our callback stack

    var cachedModel = cache.get(id, _instantiate);
    if (cachedModel) {
      if ('function' === typeof cb) {
        return cb(null, cachedModel)
      } else {
        return {
          exec : function(callback) {
            return $timeout(function() {
              return callback(null, cachedModel);
            },10);
          }
        }
      }

    } else if ('function' === typeof cb) {
      return self.exec(cb);
    } else {
      return self;
    }

  }

  /**
    * @desc Finds an element on the API and removes it using a unique ID. If a
    * function is passed as the last parameter, this method will execute
    * the query and return the results using that callback function.
    * Otherwise, `this` gets returned for
    * chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} resource id
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findByIdAndRemove(id, callback) {
    var req = self.req;
    req.method = 'delete';
    req.url = self.baseUrl + '/' + id;

    if ('function' === typeof callback) {
      return self.exec(callback);
    }

    return self;
  }

  /**
    * @desc Finds a single element on the API using a unique id and REPLACES it
    * with the data you provide. This function does not provide atomic updates.
    * If a function is passed as the callback, the query will execute and the
    * error or result from the call will be passed back using the callback. If
    * no function is provided, `this` will be returned for chaining purposes
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {string} id
    * @param {object} data
    * @param {function=} callback
    * @returns {object|promise}
    */
  function findByIdAndUpdate(id, data, callback) {
    var req = self.req;
    req.method = 'put';
    req.data = data;
    req.url = self.baseUrl + '/' + id;

    if ('function' === typeof callback) {
      return self.exec(callback);
    }

    return self;

  }

  /**
    * @desc This method will compose the final request, send it over our transport,
    * and return the error or results using the provided callback function.
    * Additionally, the response is wrapped in our custom Model objects to make
    * working with them a lot easier
    * @memberof OfficeBotSDK.ApiEndpoint
    * @param {function} callback
    * @returns {promise}
    */
  function exec(cb) {
    var req = self.req;
    return transport
      .request(req.url, req.method, req.data, req.query, req.config)
      .then(function(response) {
        //convert response to models
        var model;
        response = response || {};
        var data = response.data;
        var headers = response.headers;
        if (data) {
          if (data.hasOwnProperty('length')) {
            model = data.map(function(item) {
              // return instantiateModel(item, transport, baseRoute, endpointConfig);
              return _instantiate(item);
            });
          } else {
            model = _instantiate(data);
            // model = instantiateModel(data, transport, baseRoute, endpointConfig);
          }
          data = model;
        }
        return cb(null, data, response, headers);
      }, function(err) {
        err = err || {};
        return cb(err);
      });
  }

  function _instantiate(item) {
    return instantiateModel(item, transport, baseRoute, endpointConfig, cache);
  }
};

},{"./model.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/model.js","./utils.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/utils.js","angular":"angular","extend":"/Users/scottpeterson/Dev/officebot-sdk/node_modules/extend/index.js"}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api-provider.js":[function(require,module,exports){
/**
	* @name ApiProvider
	* @desc Wires up the api functions and provides a config function
	* @namespace OfficeBotSDK.ApiProvider
	* @memberof OfficeBotSDK
	* @param {provider} $provide
	* @param {provider} $injector
	* @returns null
	*/
module.exports = function ApiProvider($provide, $injector) {
	'use strict';
	'ngInject';

	var Api = require('./api.js')($provide, $injector);
	$provide.provider('api', Api);
};
},{"./api.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api.js"}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api.js":[function(require,module,exports){
var angular = require('angular');
/**
  * @name InstantiateApi
  * @desc Returns Api constructor
  * @namespace OfficeBotSDK.Api
  * @memberof OfficeBotSDK
  * @param {provider} $provide
  * @param {provider} $inject
  * @returns {object} api
  * @requires angular
  */
module.exports = function InstantiateApi($provide, $inject) {
  'ngInject';

  var ApiEndpointConfig = require('./api-endpoint-config.js')($inject);
  var ApiEndpointConstructor = require('./api-endpoint.js');
  /**
    * @constructor
    * @memberof OfficeBotSDK.Api
    */
  function Api() {
    this.endpoints = {};
    return this;
  }

  Api.prototype.setBaseRoute = setBaseRoute;
  Api.prototype.endpoint = endpoint;
  Api.prototype.$get = ['$injector','transport','modelCache','$timeout', get];

  return Api;
  /**
    * @desc Sets the root url for this api
    * @memberof OfficeBotSDK.Api
    * @param {string} baseUrl
    * @returns {object} this
    */
  function setBaseRoute(baseUrl) {
    this.baseRoute = baseUrl;
    return this;
  }

  /**
    * @desc Creates a new endpoint configurations and attaches it to this
    * @memberof OfficeBotSDK.Api
    * @param {string} name The name of the endpoint
    * @returns {object} newEndpoint
    */
  function endpoint(name) {
    var baseRoute = this.baseRoute;
    var newEndpoint = new ApiEndpointConfig();
    this.endpoints[name] = newEndpoint;
    return newEndpoint;
  }

  /**
    * @desc Injector function that angular will use
    * @memberof OfficeBotSDK.Api
    * @param {provider} $injector
    * @param {object} transport
    * @param {object} modelCache
    * @returns {object} api
    */
  function get($injector, transport, modelCache) {
    var api = {};

    var self = this;
    angular.forEach(this.endpoints, function(endpointConfig, name) {
      api[name] = $injector.instantiate(ApiEndpointConstructor, {
        baseRoute: self.baseRoute,
        endpointConfig: endpointConfig,
        transport : transport,
        cache : modelCache
      });
    });

    return api;
  }
};
},{"./api-endpoint-config.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api-endpoint-config.js","./api-endpoint.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api-endpoint.js","angular":"angular"}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/cache.js":[function(require,module,exports){
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
},{}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/index.js":[function(require,module,exports){
var angular = require('angular');
var moduleName = 'sdk-core';
/**
	* @name sdk-core
	* @desc OfficeBotSDK library
	* @namespace OfficeBotSDK
	* @returns {string} moduleName
	* @requires angular
	*/
angular
	.module(moduleName, [])
	.service('transport', require('./transport.js'))
	.service('modelCache', require('./cache.js'))
	.config(require('./api-provider.js'));

	module.exports = moduleName;
},{"./api-provider.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/api-provider.js","./cache.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/cache.js","./transport.js":"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/transport.js","angular":"angular"}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/model.js":[function(require,module,exports){
var extend = require('extend');
var angular = require('angular');
var hash = require('object-hash');

/**
	* @name InstantiateModel
	* @desc Returns a new instance of a Model object
	* @namespace Model
	* @memberof OfficeBotSDK
	* @param {object} data Modal properties to instantiate with
	* @returns {object} model
	* @requires extend
	* @requires angular
	*/ 
module.exports = function InstantiateModel(data, transport, baseRoute, endpointConfig, modelCache) {
	'use strict';
	'ngInject';

	/**
		* @desc This is our constructor function that gets called at the end of this file.
		* @memberof OfficeBotSDK.Model
		* @param {object} data
		* @returns {object}
		*/
	var Model = function(data) {
		extend(true, this, data);
		this['@hash'] = hash(angular.toJson(this));
		return this;
	};

	/**
		* @desc Saves the current model's representation to the API. The model MUST
		* have a valid HREF tag or this call will fail
		* @memberof OfficeBotSDK.Model
		* @param {function} callback
		* @returns {null}
		*/
	Model.prototype.save = function(cb) {
	  var callback = cb || angular.noop;
	  var model = this;

	  delete model['@hash'];
		var tmp = JSON.parse( angular.toJson(model) );
		var method = 'put';
		var href = tmp['@href'];

	  transport
		  .request(href, method, tmp, {}, {})
	    .then(function(response) {
	      if (response && response.data) {
	      	extend(true, model, response.data);
	      	model['@hash'] = hash(angular.toJson(model));
	      }
	      return callback(null, response.data);
	    }, function(err) {
	      return callback(err);
	    });
	};

	/**
		* @desc Does a simple dirty check by calculating a new hash and comparing it to
		* the original
		*/
	Model.prototype.isDirty = function() {
		var currentHash = this['@hash'];
		var currentModel = JSON.parse( JSON.stringify(this) );
		delete currentModel['@hash'];
		var newHash = hash(angular.toJson(currentModel));
		return newHash !== currentHash;
	};

	/**
		* @desc Removes this model from the API. The model MUST
		* have a valid HREF tag or this call will fail
		* @memberof OfficeBotSDK.Model
		* @param {function} callback
		* @returns {null}
		*/
	Model.prototype.remove = function(cb) {
	  var callback = cb || angular.noop;
	  var model = this;

	  return transport
	  	.delete( model['@href'] )
	    .then(function(response) {
	      return callback(null, response.data);
	    }, function(err) {
	      return callback(err);
	    });
	};
	
	//Finally, send the new model back
	var newModel = new Model(data);
	if ('function' === typeof endpointConfig._classDef) {
    var modelInstance = new endpointConfig._classDef(newModel);
    for (var i in newModel) {
    	if ('function' === typeof newModel[i]) {
    		modelInstance[i] = newModel[i];
    	}
    }
    return modelInstance;
	}
	return newModel;
};
},{"angular":"angular","extend":"/Users/scottpeterson/Dev/officebot-sdk/node_modules/extend/index.js","object-hash":"/Users/scottpeterson/Dev/officebot-sdk/node_modules/object-hash/dist/object_hash.js"}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/transport.js":[function(require,module,exports){
/**
	* @name httpTransport
	* @desc Abstraction layer for our connections inside of the api provider.
	* This will allow us to easily replace this down the line with something
	* else (like sockets) if we decide to
	* @memberof OfficeBotSDK
	* @namespace OffieBotSDK.Transport
	* @param {provider} $http
	* @returns {object}
	*/
module.exports = function httpTransport($http) {
	'use strict';
	'ngInject';

	var self = {};
	self.request = request;
	self.get = get;
	self.post = post;
	self.put = put;
	self.delete = remove;
	self.patch = patch;
	self.head = head;
	self.options = options;
	
	return self;

	/**
		* @desc This method bundles everything up into an $http request
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {string} method
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function request(url, method, data, query, headers) {
		return $http({
			url : url,
			method : method.toUpperCase(),
			data : data,
			params : query,
			headers : headers
		});
	}

	/**
		* @desc Shortcut function for request(url, 'GET', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function get(url, query, headers) {
		return request(url, 'GET', {}, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'GET', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function post(url, data, query, headers) {
		return request(url, 'POST', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'PUT', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function put(url, data, query, headers) {
		return request(url, 'PUT', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'DELETE', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function remove(url, query, headers) {
		return request(url, 'DELETE', {}, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'HEAD', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} headers
		* @returns {promise}
		*/
	function head(url, headers) {
		return request(url, 'HEAD', {}, {}, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'PATCH', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} data
		* @param {object=} query
		* @param {object=} headers
		* @returns {promise}
		*/
	function patch(url, data, query, headers) {
		return request(url, 'PATCH', data, query, headers);
	}

	/**
		* @desc Shortcut function for request(url, 'OPTIONS', ...)
		* @memberof OffieBotSDK.Transport
		* @param {string} url
		* @param {object=} headers
		* @returns {promise}
		*/
	function options(url, headers) {
		return request(url, 'OPTIONS', {}, {}, headers);
	}
};
},{}],"/Users/scottpeterson/Dev/officebot-sdk/sdk-core/utils.js":[function(require,module,exports){
/**
	* @name utils
	* @desc Utils library
	* @returns {object} self
	* @namespace OfficeBotSDK.Utils
	* @memberof OfficeBotSDK
	*/
module.exports = function utils() {
	var self = {};
	self.remove = remove;

	return self;

	/**
	  * @private
	  * @desc Helper function to nullify objects after .remove is called
	  * @param {object} item Thing to be removed
	  * @returns {boolean} status
	  * @memberof OfficeBotSDK.Utils
	  */
	function remove(item) {
	  for (var i in item) {
	    item[i] = undefined;
	    delete item[i];
	  }
	  item = undefined;
	  delete item;
	  return true;
	}
};
},{}]},{},["/Users/scottpeterson/Dev/officebot-sdk/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leHRlbmQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWhhc2gvZGlzdC9vYmplY3RfaGFzaC5qcyIsInNkay1jb3JlL2FwaS1lbmRwb2ludC1jb25maWcuanMiLCJzZGstY29yZS9hcGktZW5kcG9pbnQuanMiLCJzZGstY29yZS9hcGktcHJvdmlkZXIuanMiLCJzZGstY29yZS9hcGkuanMiLCJzZGstY29yZS9jYWNoZS5qcyIsInNkay1jb3JlL2luZGV4LmpzIiwic2RrLWNvcmUvbW9kZWwuanMiLCJzZGstY29yZS90cmFuc3BvcnQuanMiLCJzZGstY29yZS91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RGQTtBQUNBOzs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBtb2R1bGVOYW1lID0gJ29mZmljZWJvdC1zZGsnO1xuXG5hbmd1bGFyXG5cdC5tb2R1bGUobW9kdWxlTmFtZSwgW1xuXHRcdHJlcXVpcmUoJy4vc2RrLWNvcmUnKVxuXHRdKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZU5hbWU7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBpc0FycmF5ID0gZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcblx0aWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKTtcblx0fVxuXG5cdHJldHVybiB0b1N0ci5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG5cdGlmICghb2JqIHx8IHRvU3RyLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgaGFzT3duQ29uc3RydWN0b3IgPSBoYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpO1xuXHR2YXIgaGFzSXNQcm90b3R5cGVPZiA9IG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlICYmIGhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG5cdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0aWYgKG9iai5jb25zdHJ1Y3RvciAmJiAhaGFzT3duQ29uc3RydWN0b3IgJiYgIWhhc0lzUHJvdG90eXBlT2YpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBPd24gcHJvcGVydGllcyBhcmUgZW51bWVyYXRlZCBmaXJzdGx5LCBzbyB0byBzcGVlZCB1cCxcblx0Ly8gaWYgbGFzdCBvbmUgaXMgb3duLCB0aGVuIGFsbCBwcm9wZXJ0aWVzIGFyZSBvd24uXG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIG9iaikgey8qKi99XG5cblx0cmV0dXJuIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fSBlbHNlIGlmICgodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykgfHwgdGFyZ2V0ID09IG51bGwpIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdGZvciAoOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzW2ldO1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAob3B0aW9ucyAhPSBudWxsKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbbmFtZV07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKHRhcmdldCAhPT0gY29weSkge1xuXHRcdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRcdGlmIChkZWVwICYmIGNvcHkgJiYgKGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gaXNBcnJheShjb3B5KSkpKSB7XG5cdFx0XHRcdFx0XHRpZiAoY29weUlzQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNBcnJheShzcmMpID8gc3JjIDogW107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNvcHkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBjb3B5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4iLCIhZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShlKTtlbHNle3ZhciB0O1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/dD13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD90PWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKHQ9c2VsZiksdC5vYmplY3RIYXNoPWUoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIG8odSxhKXtpZighblt1XSl7aWYoIXRbdV0pe3ZhciBmPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWEmJmYpcmV0dXJuIGYodSwhMCk7aWYoaSlyZXR1cm4gaSh1LCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3UrXCInXCIpfXZhciBzPW5bdV09e2V4cG9ydHM6e319O3RbdV1bMF0uY2FsbChzLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFt1XVsxXVtlXTtyZXR1cm4gbyhuP246ZSl9LHMscy5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW3VdLmV4cG9ydHN9Zm9yKHZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsdT0wO3U8ci5sZW5ndGg7dSsrKW8oclt1XSk7cmV0dXJuIG99KHsxOltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHIsbyxpLHUsYSxmLHMsYyxsKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBkKGUsdCl7cmV0dXJuIHQ9aChlLHQpLGcoZSx0KX1mdW5jdGlvbiBoKGUsdCl7aWYodD10fHx7fSx0LmFsZ29yaXRobT10LmFsZ29yaXRobXx8XCJzaGExXCIsdC5lbmNvZGluZz10LmVuY29kaW5nfHxcImhleFwiLHQuZXhjbHVkZVZhbHVlcz0hIXQuZXhjbHVkZVZhbHVlcyx0LmFsZ29yaXRobT10LmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpLHQuZW5jb2Rpbmc9dC5lbmNvZGluZy50b0xvd2VyQ2FzZSgpLHQuaWdub3JlVW5rbm93bj10Lmlnbm9yZVVua25vd249PT0hMCx0LnJlc3BlY3RUeXBlPXQucmVzcGVjdFR5cGUhPT0hMSx0LnJlc3BlY3RGdW5jdGlvbk5hbWVzPXQucmVzcGVjdEZ1bmN0aW9uTmFtZXMhPT0hMSx0LnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXM9dC5yZXNwZWN0RnVuY3Rpb25Qcm9wZXJ0aWVzIT09ITEsdC51bm9yZGVyZWRBcnJheXM9dC51bm9yZGVyZWRBcnJheXM9PT0hMCx0LnVub3JkZXJlZFNldHM9dC51bm9yZGVyZWRTZXRzIT09ITEsdC5yZXBsYWNlcj10LnJlcGxhY2VyfHx2b2lkIDAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKFwiT2JqZWN0IGFyZ3VtZW50IHJlcXVpcmVkLlwiKTtmb3IodmFyIG49MDtuPHYubGVuZ3RoOysrbil2W25dLnRvTG93ZXJDYXNlKCk9PT10LmFsZ29yaXRobS50b0xvd2VyQ2FzZSgpJiYodC5hbGdvcml0aG09dltuXSk7aWYodi5pbmRleE9mKHQuYWxnb3JpdGhtKT09PS0xKXRocm93IG5ldyBFcnJvcignQWxnb3JpdGhtIFwiJyt0LmFsZ29yaXRobSsnXCIgIG5vdCBzdXBwb3J0ZWQuIHN1cHBvcnRlZCB2YWx1ZXM6ICcrdi5qb2luKFwiLCBcIikpO2lmKG0uaW5kZXhPZih0LmVuY29kaW5nKT09PS0xJiZcInBhc3N0aHJvdWdoXCIhPT10LmFsZ29yaXRobSl0aHJvdyBuZXcgRXJyb3IoJ0VuY29kaW5nIFwiJyt0LmVuY29kaW5nKydcIiAgbm90IHN1cHBvcnRlZC4gc3VwcG9ydGVkIHZhbHVlczogJyttLmpvaW4oXCIsIFwiKSk7cmV0dXJuIHR9ZnVuY3Rpb24gcChlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXJldHVybiExO3ZhciB0PS9eZnVuY3Rpb25cXHMrXFx3KlxccypcXChcXHMqXFwpXFxzKntcXHMrXFxbbmF0aXZlIGNvZGVcXF1cXHMrfSQvaTtyZXR1cm4gbnVsbCE9dC5leGVjKEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKX1mdW5jdGlvbiBnKGUsdCl7dmFyIG47bj1cInBhc3N0aHJvdWdoXCIhPT10LmFsZ29yaXRobT9iLmNyZWF0ZUhhc2godC5hbGdvcml0aG0pOm5ldyB3LFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLndyaXRlJiYobi53cml0ZT1uLnVwZGF0ZSxuLmVuZD1uLnVwZGF0ZSk7dmFyIHI9eSh0LG4pO2lmKHIuZGlzcGF0Y2goZSksbi51cGRhdGV8fG4uZW5kKFwiXCIpLG4uZGlnZXN0KXJldHVybiBuLmRpZ2VzdChcImJ1ZmZlclwiPT09dC5lbmNvZGluZz92b2lkIDA6dC5lbmNvZGluZyk7dmFyIG89bi5yZWFkKCk7cmV0dXJuXCJidWZmZXJcIj09PXQuZW5jb2Rpbmc/bzpvLnRvU3RyaW5nKHQuZW5jb2RpbmcpfWZ1bmN0aW9uIHkoZSx0LG4pe249bnx8W107dmFyIHI9ZnVuY3Rpb24oZSl7cmV0dXJuIHQudXBkYXRlP3QudXBkYXRlKGUsXCJ1dGY4XCIpOnQud3JpdGUoZSxcInV0ZjhcIil9O3JldHVybntkaXNwYXRjaDpmdW5jdGlvbih0KXtlLnJlcGxhY2VyJiYodD1lLnJlcGxhY2VyKHQpKTt2YXIgbj10eXBlb2YgdDtyZXR1cm4gbnVsbD09PXQmJihuPVwibnVsbFwiKSx0aGlzW1wiX1wiK25dKHQpfSxfb2JqZWN0OmZ1bmN0aW9uKHQpe3ZhciBvPS9cXFtvYmplY3QgKC4qKVxcXS9pLHU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpLGE9by5leGVjKHUpO2E9YT9hWzFdOlwidW5rbm93bjpbXCIrdStcIl1cIixhPWEudG9Mb3dlckNhc2UoKTt2YXIgZj1udWxsO2lmKChmPW4uaW5kZXhPZih0KSk+PTApcmV0dXJuIHRoaXMuZGlzcGF0Y2goXCJbQ0lSQ1VMQVI6XCIrZitcIl1cIik7aWYobi5wdXNoKHQpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpJiZpLmlzQnVmZmVyJiZpLmlzQnVmZmVyKHQpKXJldHVybiByKFwiYnVmZmVyOlwiKSxyKHQpO2lmKFwib2JqZWN0XCI9PT1hfHxcImZ1bmN0aW9uXCI9PT1hKXt2YXIgcz1PYmplY3Qua2V5cyh0KS5zb3J0KCk7ZS5yZXNwZWN0VHlwZT09PSExfHxwKHQpfHxzLnNwbGljZSgwLDAsXCJwcm90b3R5cGVcIixcIl9fcHJvdG9fX1wiLFwiY29uc3RydWN0b3JcIikscihcIm9iamVjdDpcIitzLmxlbmd0aCtcIjpcIik7dmFyIGM9dGhpcztyZXR1cm4gcy5mb3JFYWNoKGZ1bmN0aW9uKG4pe2MuZGlzcGF0Y2gobikscihcIjpcIiksZS5leGNsdWRlVmFsdWVzfHxjLmRpc3BhdGNoKHRbbl0pLHIoXCIsXCIpfSl9aWYoIXRoaXNbXCJfXCIrYV0pe2lmKGUuaWdub3JlVW5rbm93bilyZXR1cm4gcihcIltcIithK1wiXVwiKTt0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb2JqZWN0IHR5cGUgXCInK2ErJ1wiJyl9dGhpc1tcIl9cIithXSh0KX0sX2FycmF5OmZ1bmN0aW9uKHQsbyl7bz1cInVuZGVmaW5lZFwiIT10eXBlb2Ygbz9vOmUudW5vcmRlcmVkQXJyYXlzIT09ITE7dmFyIGk9dGhpcztpZihyKFwiYXJyYXk6XCIrdC5sZW5ndGgrXCI6XCIpLCFvfHx0Lmxlbmd0aDw9MSlyZXR1cm4gdC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBpLmRpc3BhdGNoKGUpfSk7dmFyIHU9W10sYT10Lm1hcChmdW5jdGlvbih0KXt2YXIgcj1uZXcgdyxvPW4uc2xpY2UoKSxpPXkoZSxyLG8pO3JldHVybiBpLmRpc3BhdGNoKHQpLHU9dS5jb25jYXQoby5zbGljZShuLmxlbmd0aCkpLHIucmVhZCgpLnRvU3RyaW5nKCl9KTtyZXR1cm4gbj1uLmNvbmNhdCh1KSxhLnNvcnQoKSx0aGlzLl9hcnJheShhLCExKX0sX2RhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJkYXRlOlwiK2UudG9KU09OKCkpfSxfc3ltYm9sOmZ1bmN0aW9uKGUpe3JldHVybiByKFwic3ltYm9sOlwiK2UudG9TdHJpbmcoKSl9LF9lcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcImVycm9yOlwiK2UudG9TdHJpbmcoKSl9LF9ib29sZWFuOmZ1bmN0aW9uKGUpe3JldHVybiByKFwiYm9vbDpcIitlLnRvU3RyaW5nKCkpfSxfc3RyaW5nOmZ1bmN0aW9uKGUpe3IoXCJzdHJpbmc6XCIrZS5sZW5ndGgrXCI6XCIpLHIoZSl9LF9mdW5jdGlvbjpmdW5jdGlvbih0KXtyKFwiZm46XCIpLHAodCk/dGhpcy5kaXNwYXRjaChcIltuYXRpdmVdXCIpOnRoaXMuZGlzcGF0Y2godC50b1N0cmluZygpKSxlLnJlc3BlY3RGdW5jdGlvbk5hbWVzIT09ITEmJnRoaXMuZGlzcGF0Y2goXCJmdW5jdGlvbi1uYW1lOlwiK1N0cmluZyh0Lm5hbWUpKSxlLnJlc3BlY3RGdW5jdGlvblByb3BlcnRpZXMmJnRoaXMuX29iamVjdCh0KX0sX251bWJlcjpmdW5jdGlvbihlKXtyZXR1cm4gcihcIm51bWJlcjpcIitlLnRvU3RyaW5nKCkpfSxfeG1sOmZ1bmN0aW9uKGUpe3JldHVybiByKFwieG1sOlwiK2UudG9TdHJpbmcoKSl9LF9udWxsOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJOdWxsXCIpfSxfdW5kZWZpbmVkOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJVbmRlZmluZWRcIil9LF9yZWdleHA6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJyZWdleDpcIitlLnRvU3RyaW5nKCkpfSxfdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQ4YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfdWludDhjbGFtcGVkYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50OGNsYW1wZWRhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9pbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1aW50OGFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQxNmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDE2YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MTZhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQxNmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX3VpbnQzMmFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiByKFwidWludDMyYXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfaW50MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcInVpbnQzMmFycmF5OlwiKSx0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGUpKX0sX2Zsb2F0MzJhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gcihcImZsb2F0MzJhcnJheTpcIiksdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlKSl9LF9mbG9hdDY0YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJmbG9hdDY0YXJyYXk6XCIpLHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZSkpfSxfYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJhcnJheWJ1ZmZlcjpcIiksdGhpcy5kaXNwYXRjaChuZXcgVWludDhBcnJheShlKSl9LF91cmw6ZnVuY3Rpb24oZSl7cmV0dXJuIHIoXCJ1cmw6XCIrZS50b1N0cmluZygpLFwidXRmOFwiKX0sX21hcDpmdW5jdGlvbih0KXtyKFwibWFwOlwiKTt2YXIgbj1BcnJheS5mcm9tKHQpO3JldHVybiB0aGlzLl9hcnJheShuLGUudW5vcmRlcmVkU2V0cyE9PSExKX0sX3NldDpmdW5jdGlvbih0KXtyKFwic2V0OlwiKTt2YXIgbj1BcnJheS5mcm9tKHQpO3JldHVybiB0aGlzLl9hcnJheShuLGUudW5vcmRlcmVkU2V0cyE9PSExKX0sX2Jsb2I6ZnVuY3Rpb24oKXtpZihlLmlnbm9yZVVua25vd24pcmV0dXJuIHIoXCJbYmxvYl1cIik7dGhyb3cgRXJyb3IoJ0hhc2hpbmcgQmxvYiBvYmplY3RzIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkXFxuKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcHVsZW9zL29iamVjdC1oYXNoL2lzc3Vlcy8yNilcXG5Vc2UgXCJvcHRpb25zLnJlcGxhY2VyXCIgb3IgXCJvcHRpb25zLmlnbm9yZVVua25vd25cIlxcbicpfSxfZG9td2luZG93OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJkb213aW5kb3dcIil9LF9wcm9jZXNzOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJwcm9jZXNzXCIpfSxfdGltZXI6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInRpbWVyXCIpfSxfcGlwZTpmdW5jdGlvbigpe3JldHVybiByKFwicGlwZVwiKX0sX3RjcDpmdW5jdGlvbigpe3JldHVybiByKFwidGNwXCIpfSxfdWRwOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJ1ZHBcIil9LF90dHk6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInR0eVwiKX0sX3N0YXR3YXRjaGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJzdGF0d2F0Y2hlclwiKX0sX3NlY3VyZWNvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInNlY3VyZWNvbnRleHRcIil9LF9jb25uZWN0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJjb25uZWN0aW9uXCIpfSxfemxpYjpmdW5jdGlvbigpe3JldHVybiByKFwiemxpYlwiKX0sX2NvbnRleHQ6ZnVuY3Rpb24oKXtyZXR1cm4gcihcImNvbnRleHRcIil9LF9ub2Rlc2NyaXB0OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJub2Rlc2NyaXB0XCIpfSxfaHR0cHBhcnNlcjpmdW5jdGlvbigpe3JldHVybiByKFwiaHR0cHBhcnNlclwiKX0sX2RhdGF2aWV3OmZ1bmN0aW9uKCl7cmV0dXJuIHIoXCJkYXRhdmlld1wiKX0sX3NpZ25hbDpmdW5jdGlvbigpe3JldHVybiByKFwic2lnbmFsXCIpfSxfZnNldmVudDpmdW5jdGlvbigpe3JldHVybiByKFwiZnNldmVudFwiKX0sX3Rsc3dyYXA6ZnVuY3Rpb24oKXtyZXR1cm4gcihcInRsc3dyYXBcIil9fX1mdW5jdGlvbiB3KCl7cmV0dXJue2J1ZjpcIlwiLHdyaXRlOmZ1bmN0aW9uKGUpe3RoaXMuYnVmKz1lfSxlbmQ6ZnVuY3Rpb24oZSl7dGhpcy5idWYrPWV9LHJlYWQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5idWZ9fX12YXIgYj1lKFwiY3J5cHRvXCIpO249dC5leHBvcnRzPWQsbi5zaGExPWZ1bmN0aW9uKGUpe3JldHVybiBkKGUpfSxuLmtleXM9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSx7ZXhjbHVkZVZhbHVlczohMCxhbGdvcml0aG06XCJzaGExXCIsZW5jb2Rpbmc6XCJoZXhcIn0pfSxuLk1ENT1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwifSl9LG4ua2V5c01ENT1mdW5jdGlvbihlKXtyZXR1cm4gZChlLHthbGdvcml0aG06XCJtZDVcIixlbmNvZGluZzpcImhleFwiLGV4Y2x1ZGVWYWx1ZXM6ITB9KX07dmFyIHY9Yi5nZXRIYXNoZXM/Yi5nZXRIYXNoZXMoKS5zbGljZSgpOltcInNoYTFcIixcIm1kNVwiXTt2LnB1c2goXCJwYXNzdGhyb3VnaFwiKTt2YXIgbT1bXCJidWZmZXJcIixcImhleFwiLFwiYmluYXJ5XCIsXCJiYXNlNjRcIl07bi53cml0ZVRvU3RyZWFtPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgbiYmKG49dCx0PXt9KSx0PWgoZSx0KSx5KHQsbikuZGlzcGF0Y2goZSl9fSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV8xZTdiMzI4MC5qc1wiLFwiL1wiKX0se2J1ZmZlcjozLGNyeXB0bzo1LGxZcG9JMjoxMH1dLDI6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24oZSx0LHIsbyxpLHUsYSxmLHMpe3ZhciBjPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiOyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KGUpe3ZhciB0PWUuY2hhckNvZGVBdCgwKTtyZXR1cm4gdD09PWl8fHQ9PT1sPzYyOnQ9PT11fHx0PT09ZD82Mzp0PGE/LTE6dDxhKzEwP3QtYSsyNisyNjp0PHMrMjY/dC1zOnQ8ZisyNj90LWYrMjY6dm9pZCAwfWZ1bmN0aW9uIG4oZSl7ZnVuY3Rpb24gbihlKXtzW2wrK109ZX12YXIgcixpLHUsYSxmLHM7aWYoZS5sZW5ndGglND4wKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7dmFyIGM9ZS5sZW5ndGg7Zj1cIj1cIj09PWUuY2hhckF0KGMtMik/MjpcIj1cIj09PWUuY2hhckF0KGMtMSk/MTowLHM9bmV3IG8oMyplLmxlbmd0aC80LWYpLHU9Zj4wP2UubGVuZ3RoLTQ6ZS5sZW5ndGg7dmFyIGw9MDtmb3Iocj0wLGk9MDtyPHU7cis9NCxpKz0zKWE9dChlLmNoYXJBdChyKSk8PDE4fHQoZS5jaGFyQXQocisxKSk8PDEyfHQoZS5jaGFyQXQocisyKSk8PDZ8dChlLmNoYXJBdChyKzMpKSxuKCgxNjcxMTY4MCZhKT4+MTYpLG4oKDY1MjgwJmEpPj44KSxuKDI1NSZhKTtyZXR1cm4gMj09PWY/KGE9dChlLmNoYXJBdChyKSk8PDJ8dChlLmNoYXJBdChyKzEpKT4+NCxuKDI1NSZhKSk6MT09PWYmJihhPXQoZS5jaGFyQXQocikpPDwxMHx0KGUuY2hhckF0KHIrMSkpPDw0fHQoZS5jaGFyQXQocisyKSk+PjIsbihhPj44JjI1NSksbigyNTUmYSkpLHN9ZnVuY3Rpb24gcihlKXtmdW5jdGlvbiB0KGUpe3JldHVybiBjLmNoYXJBdChlKX1mdW5jdGlvbiBuKGUpe3JldHVybiB0KGU+PjE4JjYzKSt0KGU+PjEyJjYzKSt0KGU+PjYmNjMpK3QoNjMmZSl9dmFyIHIsbyxpLHU9ZS5sZW5ndGglMyxhPVwiXCI7Zm9yKHI9MCxpPWUubGVuZ3RoLXU7cjxpO3IrPTMpbz0oZVtyXTw8MTYpKyhlW3IrMV08PDgpK2VbcisyXSxhKz1uKG8pO3N3aXRjaCh1KXtjYXNlIDE6bz1lW2UubGVuZ3RoLTFdLGErPXQobz4+MiksYSs9dChvPDw0JjYzKSxhKz1cIj09XCI7YnJlYWs7Y2FzZSAyOm89KGVbZS5sZW5ndGgtMl08PDgpK2VbZS5sZW5ndGgtMV0sYSs9dChvPj4xMCksYSs9dChvPj40JjYzKSxhKz10KG88PDImNjMpLGErPVwiPVwifXJldHVybiBhfXZhciBvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5P1VpbnQ4QXJyYXk6QXJyYXksaT1cIitcIi5jaGFyQ29kZUF0KDApLHU9XCIvXCIuY2hhckNvZGVBdCgwKSxhPVwiMFwiLmNoYXJDb2RlQXQoMCksZj1cImFcIi5jaGFyQ29kZUF0KDApLHM9XCJBXCIuY2hhckNvZGVBdCgwKSxsPVwiLVwiLmNoYXJDb2RlQXQoMCksZD1cIl9cIi5jaGFyQ29kZUF0KDApO2UudG9CeXRlQXJyYXk9bixlLmZyb21CeXRlQXJyYXk9cn0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4/dGhpcy5iYXNlNjRqcz17fTpuKX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYlwiKX0se2J1ZmZlcjozLGxZcG9JMjoxMH1dLDM6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24odCxyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIG8oZSx0LG4pe2lmKCEodGhpcyBpbnN0YW5jZW9mIG8pKXJldHVybiBuZXcgbyhlLHQsbik7dmFyIHI9dHlwZW9mIGU7aWYoXCJiYXNlNjRcIj09PXQmJlwic3RyaW5nXCI9PT1yKWZvcihlPU4oZSk7ZS5sZW5ndGglNCE9PTA7KWUrPVwiPVwiO3ZhciBpO2lmKFwibnVtYmVyXCI9PT1yKWk9RihlKTtlbHNlIGlmKFwic3RyaW5nXCI9PT1yKWk9by5ieXRlTGVuZ3RoKGUsdCk7ZWxzZXtpZihcIm9iamVjdFwiIT09cil0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLlwiKTtpPUYoZS5sZW5ndGgpfXZhciB1O28uX3VzZVR5cGVkQXJyYXlzP3U9by5fYXVnbWVudChuZXcgVWludDhBcnJheShpKSk6KHU9dGhpcyx1Lmxlbmd0aD1pLHUuX2lzQnVmZmVyPSEwKTt2YXIgYTtpZihvLl91c2VUeXBlZEFycmF5cyYmXCJudW1iZXJcIj09dHlwZW9mIGUuYnl0ZUxlbmd0aCl1Ll9zZXQoZSk7ZWxzZSBpZihPKGUpKWZvcihhPTA7YTxpO2ErKylvLmlzQnVmZmVyKGUpP3VbYV09ZS5yZWFkVUludDgoYSk6dVthXT1lW2FdO2Vsc2UgaWYoXCJzdHJpbmdcIj09PXIpdS53cml0ZShlLDAsdCk7ZWxzZSBpZihcIm51bWJlclwiPT09ciYmIW8uX3VzZVR5cGVkQXJyYXlzJiYhbilmb3IoYT0wO2E8aTthKyspdVthXT0wO3JldHVybiB1fWZ1bmN0aW9uIGwoZSx0LG4scil7bj1OdW1iZXIobil8fDA7dmFyIGk9ZS5sZW5ndGgtbjtyPyhyPU51bWJlcihyKSxyPmkmJihyPWkpKTpyPWk7dmFyIHU9dC5sZW5ndGg7Ryh1JTI9PT0wLFwiSW52YWxpZCBoZXggc3RyaW5nXCIpLHI+dS8yJiYocj11LzIpO2Zvcih2YXIgYT0wO2E8cjthKyspe3ZhciBmPXBhcnNlSW50KHQuc3Vic3RyKDIqYSwyKSwxNik7RyghaXNOYU4oZiksXCJJbnZhbGlkIGhleCBzdHJpbmdcIiksZVtuK2FdPWZ9cmV0dXJuIG8uX2NoYXJzV3JpdHRlbj0yKmEsYX1mdW5jdGlvbiBkKGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKFYodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIGgoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcocSh0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gcChlLHQsbixyKXtyZXR1cm4gaChlLHQsbixyKX1mdW5jdGlvbiBnKGUsdCxuLHIpe3ZhciBpPW8uX2NoYXJzV3JpdHRlbj1XKFIodCksZSxuLHIpO3JldHVybiBpfWZ1bmN0aW9uIHkoZSx0LG4scil7dmFyIGk9by5fY2hhcnNXcml0dGVuPVcoUCh0KSxlLG4scik7cmV0dXJuIGl9ZnVuY3Rpb24gdyhlLHQsbil7cmV0dXJuIDA9PT10JiZuPT09ZS5sZW5ndGg/Sy5mcm9tQnl0ZUFycmF5KGUpOksuZnJvbUJ5dGVBcnJheShlLnNsaWNlKHQsbikpfWZ1bmN0aW9uIGIoZSx0LG4pe3ZhciByPVwiXCIsbz1cIlwiO249TWF0aC5taW4oZS5sZW5ndGgsbik7Zm9yKHZhciBpPXQ7aTxuO2krKyllW2ldPD0xMjc/KHIrPUoobykrU3RyaW5nLmZyb21DaGFyQ29kZShlW2ldKSxvPVwiXCIpOm8rPVwiJVwiK2VbaV0udG9TdHJpbmcoMTYpO3JldHVybiByK0oobyl9ZnVuY3Rpb24gdihlLHQsbil7dmFyIHI9XCJcIjtuPU1hdGgubWluKGUubGVuZ3RoLG4pO2Zvcih2YXIgbz10O288bjtvKyspcis9U3RyaW5nLmZyb21DaGFyQ29kZShlW29dKTtyZXR1cm4gcn1mdW5jdGlvbiBtKGUsdCxuKXtyZXR1cm4gdihlLHQsbil9ZnVuY3Rpb24gXyhlLHQsbil7dmFyIHI9ZS5sZW5ndGg7KCF0fHx0PDApJiYodD0wKSwoIW58fG48MHx8bj5yKSYmKG49cik7Zm9yKHZhciBvPVwiXCIsaT10O2k8bjtpKyspbys9SChlW2ldKTtyZXR1cm4gb31mdW5jdGlvbiBFKGUsdCxuKXtmb3IodmFyIHI9ZS5zbGljZSh0LG4pLG89XCJcIixpPTA7aTxyLmxlbmd0aDtpKz0yKW8rPVN0cmluZy5mcm9tQ2hhckNvZGUocltpXSsyNTYqcltpKzFdKTtyZXR1cm4gb31mdW5jdGlvbiBJKGUsdCxuLHIpe3J8fChHKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLEcodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpO3JldHVybiBuPyhpPWVbdF0sdCsxPG8mJihpfD1lW3QrMV08PDgpKTooaT1lW3RdPDw4LHQrMTxvJiYoaXw9ZVt0KzFdKSksaX19ZnVuY3Rpb24gQShlLHQsbixyKXtyfHwoRyhcImJvb2xlYW5cIj09dHlwZW9mIG4sXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEcodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSxHKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKTt2YXIgbz1lLmxlbmd0aDtpZighKHQ+PW8pKXt2YXIgaTtyZXR1cm4gbj8odCsyPG8mJihpPWVbdCsyXTw8MTYpLHQrMTxvJiYoaXw9ZVt0KzFdPDw4KSxpfD1lW3RdLHQrMzxvJiYoaSs9ZVt0KzNdPDwyND4+PjApKToodCsxPG8mJihpPWVbdCsxXTw8MTYpLHQrMjxvJiYoaXw9ZVt0KzJdPDw4KSx0KzM8byYmKGl8PWVbdCszXSksaSs9ZVt0XTw8MjQ+Pj4wKSxpfX1mdW5jdGlvbiBCKGUsdCxuLHIpe3J8fChHKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLEcodCsxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpPUkoZSx0LG4sITApLHU9MzI3NjgmaTtyZXR1cm4gdT8oNjU1MzUtaSsxKSotMTppfX1mdW5jdGlvbiBMKGUsdCxuLHIpe3J8fChHKFwiYm9vbGVhblwiPT10eXBlb2YgbixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3Npbmcgb2Zmc2V0XCIpLEcodCszPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpO3ZhciBvPWUubGVuZ3RoO2lmKCEodD49bykpe3ZhciBpPUEoZSx0LG4sITApLHU9MjE0NzQ4MzY0OCZpO3JldHVybiB1Pyg0Mjk0OTY3Mjk1LWkrMSkqLTE6aX19ZnVuY3Rpb24gVShlLHQsbixyKXtyZXR1cm4gcnx8KEcoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHQrMzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxRLnJlYWQoZSx0LG4sMjMsNCl9ZnVuY3Rpb24geChlLHQsbixyKXtyZXR1cm4gcnx8KEcoXCJib29sZWFuXCI9PXR5cGVvZiBuLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHQrNzxlLmxlbmd0aCxcIlRyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpKSxRLnJlYWQoZSx0LG4sNTIsOCl9ZnVuY3Rpb24gUyhlLHQsbixyLG8pe298fChHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSxHKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLEcobisxPGUubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHoodCw2NTUzNSkpO3ZhciBpPWUubGVuZ3RoO2lmKCEobj49aSkpZm9yKHZhciB1PTAsYT1NYXRoLm1pbihpLW4sMik7dTxhO3UrKyllW24rdV09KHQmMjU1PDw4KihyP3U6MS11KSk+Pj44KihyP3U6MS11KX1mdW5jdGlvbiBDKGUsdCxuLHIsbyl7b3x8KEcodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLEcoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksRyhuKzM8ZS5sZW5ndGgsXCJ0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikseih0LDQyOTQ5NjcyOTUpKTt2YXIgaT1lLmxlbmd0aDtpZighKG4+PWkpKWZvcih2YXIgdT0wLGE9TWF0aC5taW4oaS1uLDQpO3U8YTt1KyspZVtuK3VdPXQ+Pj44KihyP3U6My11KSYyNTV9ZnVuY3Rpb24gaihlLHQsbixyLG8pe298fChHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyB2YWx1ZVwiKSxHKFwiYm9vbGVhblwiPT10eXBlb2YgcixcIm1pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW5cIiksRyh2b2lkIDAhPT1uJiZudWxsIT09bixcIm1pc3Npbmcgb2Zmc2V0XCIpLEcobisxPGUubGVuZ3RoLFwiVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLFgodCwzMjc2NywtMzI3NjgpKTt2YXIgaT1lLmxlbmd0aDtuPj1pfHwodD49MD9TKGUsdCxuLHIsbyk6UyhlLDY1NTM1K3QrMSxuLHIsbykpfWZ1bmN0aW9uIGsoZSx0LG4scixvKXtvfHwoRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksRyhcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEcodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSxHKG4rMzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSxYKHQsMjE0NzQ4MzY0NywtMjE0NzQ4MzY0OCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fCh0Pj0wP0MoZSx0LG4scixvKTpDKGUsNDI5NDk2NzI5NSt0KzEsbixyLG8pKX1mdW5jdGlvbiBUKGUsdCxuLHIsbyl7b3x8KEcodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIHZhbHVlXCIpLEcoXCJib29sZWFuXCI9PXR5cGVvZiByLFwibWlzc2luZyBvciBpbnZhbGlkIGVuZGlhblwiKSxHKHZvaWQgMCE9PW4mJm51bGwhPT1uLFwibWlzc2luZyBvZmZzZXRcIiksRyhuKzM8ZS5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksJCh0LDMuNDAyODIzNDY2Mzg1Mjg4NmUzOCwtMy40MDI4MjM0NjYzODUyODg2ZTM4KSk7dmFyIGk9ZS5sZW5ndGg7bj49aXx8US53cml0ZShlLHQsbixyLDIzLDQpfWZ1bmN0aW9uIE0oZSx0LG4scixvKXtvfHwoRyh2b2lkIDAhPT10JiZudWxsIT09dCxcIm1pc3NpbmcgdmFsdWVcIiksRyhcImJvb2xlYW5cIj09dHlwZW9mIHIsXCJtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuXCIpLEcodm9pZCAwIT09biYmbnVsbCE9PW4sXCJtaXNzaW5nIG9mZnNldFwiKSxHKG4rNzxlLmxlbmd0aCxcIlRyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSwkKHQsMS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCwtMS43OTc2OTMxMzQ4NjIzMTU3ZTMwOCkpO3ZhciBpPWUubGVuZ3RoO24+PWl8fFEud3JpdGUoZSx0LG4sciw1Miw4KX1mdW5jdGlvbiBOKGUpe3JldHVybiBlLnRyaW0/ZS50cmltKCk6ZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLFwiXCIpfWZ1bmN0aW9uIFkoZSx0LG4pe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlP246KGU9fn5lLGU+PXQ/dDplPj0wP2U6KGUrPXQsZT49MD9lOjApKX1mdW5jdGlvbiBGKGUpe3JldHVybiBlPX5+TWF0aC5jZWlsKCtlKSxlPDA/MDplfWZ1bmN0aW9uIEQoZSl7cmV0dXJuKEFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGUpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKX0pKGUpfWZ1bmN0aW9uIE8oZSl7cmV0dXJuIEQoZSl8fG8uaXNCdWZmZXIoZSl8fGUmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZcIm51bWJlclwiPT10eXBlb2YgZS5sZW5ndGh9ZnVuY3Rpb24gSChlKXtyZXR1cm4gZTwxNj9cIjBcIitlLnRvU3RyaW5nKDE2KTplLnRvU3RyaW5nKDE2KX1mdW5jdGlvbiBWKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWUuY2hhckNvZGVBdChuKTtpZihyPD0xMjcpdC5wdXNoKGUuY2hhckNvZGVBdChuKSk7ZWxzZXt2YXIgbz1uO3I+PTU1Mjk2JiZyPD01NzM0MyYmbisrO2Zvcih2YXIgaT1lbmNvZGVVUklDb21wb25lbnQoZS5zbGljZShvLG4rMSkpLnN1YnN0cigxKS5zcGxpdChcIiVcIiksdT0wO3U8aS5sZW5ndGg7dSsrKXQucHVzaChwYXJzZUludChpW3VdLDE2KSl9fXJldHVybiB0fWZ1bmN0aW9uIHEoZSl7Zm9yKHZhciB0PVtdLG49MDtuPGUubGVuZ3RoO24rKyl0LnB1c2goMjU1JmUuY2hhckNvZGVBdChuKSk7cmV0dXJuIHR9ZnVuY3Rpb24gUChlKXtmb3IodmFyIHQsbixyLG89W10saT0wO2k8ZS5sZW5ndGg7aSsrKXQ9ZS5jaGFyQ29kZUF0KGkpLG49dD4+OCxyPXQlMjU2LG8ucHVzaChyKSxvLnB1c2gobik7cmV0dXJuIG99ZnVuY3Rpb24gUihlKXtyZXR1cm4gSy50b0J5dGVBcnJheShlKX1mdW5jdGlvbiBXKGUsdCxuLHIpe2Zvcih2YXIgbz0wO288ciYmIShvK24+PXQubGVuZ3RofHxvPj1lLmxlbmd0aCk7bysrKXRbbytuXT1lW29dO3JldHVybiBvfWZ1bmN0aW9uIEooZSl7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZSl9Y2F0Y2godCl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjU1MzMpfX1mdW5jdGlvbiB6KGUsdCl7RyhcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksRyhlPj0wLFwic3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWVcIiksRyhlPD10LFwidmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZVwiKSxHKE1hdGguZmxvb3IoZSk9PT1lLFwidmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnRcIil9ZnVuY3Rpb24gWChlLHQsbil7RyhcIm51bWJlclwiPT10eXBlb2YgZSxcImNhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXJcIiksRyhlPD10LFwidmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlXCIpLEcoZT49bixcInZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWVcIiksRyhNYXRoLmZsb29yKGUpPT09ZSxcInZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50XCIpfWZ1bmN0aW9uICQoZSx0LG4pe0coXCJudW1iZXJcIj09dHlwZW9mIGUsXCJjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyXCIpLEcoZTw9dCxcInZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZVwiKSxHKGU+PW4sXCJ2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlXCIpfWZ1bmN0aW9uIEcoZSx0KXtpZighZSl0aHJvdyBuZXcgRXJyb3IodHx8XCJGYWlsZWQgYXNzZXJ0aW9uXCIpfXZhciBLPWUoXCJiYXNlNjQtanNcIiksUT1lKFwiaWVlZTc1NFwiKTtuLkJ1ZmZlcj1vLG4uU2xvd0J1ZmZlcj1vLG4uSU5TUEVDVF9NQVhfQllURVM9NTAsby5wb29sU2l6ZT04MTkyLG8uX3VzZVR5cGVkQXJyYXlzPWZ1bmN0aW9uKCl7dHJ5e3ZhciBlPW5ldyBBcnJheUJ1ZmZlcigwKSx0PW5ldyBVaW50OEFycmF5KGUpO3JldHVybiB0LmZvbz1mdW5jdGlvbigpe3JldHVybiA0Mn0sNDI9PT10LmZvbygpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnN1YmFycmF5fWNhdGNoKG4pe3JldHVybiExfX0oKSxvLmlzRW5jb2Rpbmc9ZnVuY3Rpb24oZSl7c3dpdGNoKFN0cmluZyhlKS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJoZXhcIjpjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcImJhc2U2NFwiOmNhc2VcInJhd1wiOmNhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiEwO2RlZmF1bHQ6cmV0dXJuITF9fSxvLmlzQnVmZmVyPWZ1bmN0aW9uKGUpe3JldHVybiEobnVsbD09PWV8fHZvaWQgMD09PWV8fCFlLl9pc0J1ZmZlcil9LG8uYnl0ZUxlbmd0aD1mdW5jdGlvbihlLHQpe3ZhciBuO3N3aXRjaChlKz1cIlwiLHR8fFwidXRmOFwiKXtjYXNlXCJoZXhcIjpuPWUubGVuZ3RoLzI7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6bj1WKGUpLmxlbmd0aDticmVhaztjYXNlXCJhc2NpaVwiOmNhc2VcImJpbmFyeVwiOmNhc2VcInJhd1wiOm49ZS5sZW5ndGg7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bj1SKGUpLmxlbmd0aDticmVhaztjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpuPTIqZS5sZW5ndGg7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBufSxvLmNvbmNhdD1mdW5jdGlvbihlLHQpe2lmKEcoRChlKSxcIlVzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxubGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuXCIpLDA9PT1lLmxlbmd0aClyZXR1cm4gbmV3IG8oMCk7aWYoMT09PWUubGVuZ3RoKXJldHVybiBlWzBdO3ZhciBuO2lmKFwibnVtYmVyXCIhPXR5cGVvZiB0KWZvcih0PTAsbj0wO248ZS5sZW5ndGg7bisrKXQrPWVbbl0ubGVuZ3RoO3ZhciByPW5ldyBvKHQpLGk9MDtmb3Iobj0wO248ZS5sZW5ndGg7bisrKXt2YXIgdT1lW25dO3UuY29weShyLGkpLGkrPXUubGVuZ3RofXJldHVybiByfSxvLnByb3RvdHlwZS53cml0ZT1mdW5jdGlvbihlLHQsbixyKXtpZihpc0Zpbml0ZSh0KSlpc0Zpbml0ZShuKXx8KHI9bixuPXZvaWQgMCk7ZWxzZXt2YXIgbz1yO3I9dCx0PW4sbj1vfXQ9TnVtYmVyKHQpfHwwO3ZhciBpPXRoaXMubGVuZ3RoLXQ7bj8obj1OdW1iZXIobiksbj5pJiYobj1pKSk6bj1pLHI9U3RyaW5nKHJ8fFwidXRmOFwiKS50b0xvd2VyQ2FzZSgpO3ZhciB1O3N3aXRjaChyKXtjYXNlXCJoZXhcIjp1PWwodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6dT1kKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImFzY2lpXCI6dT1oKHRoaXMsZSx0LG4pO2JyZWFrO2Nhc2VcImJpbmFyeVwiOnU9cCh0aGlzLGUsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjp1PWcodGhpcyxlLHQsbik7YnJlYWs7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6dT15KHRoaXMsZSx0LG4pO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBlbmNvZGluZ1wiKX1yZXR1cm4gdX0sby5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oZSx0LG4pe3ZhciByPXRoaXM7aWYoZT1TdHJpbmcoZXx8XCJ1dGY4XCIpLnRvTG93ZXJDYXNlKCksdD1OdW1iZXIodCl8fDAsbj12b2lkIDAhPT1uP051bWJlcihuKTpuPXIubGVuZ3RoLG49PT10KXJldHVyblwiXCI7dmFyIG87c3dpdGNoKGUpe2Nhc2VcImhleFwiOm89XyhyLHQsbik7YnJlYWs7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6bz1iKHIsdCxuKTticmVhaztjYXNlXCJhc2NpaVwiOm89dihyLHQsbik7YnJlYWs7Y2FzZVwiYmluYXJ5XCI6bz1tKHIsdCxuKTticmVhaztjYXNlXCJiYXNlNjRcIjpvPXcocix0LG4pO2JyZWFrO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOm89RShyLHQsbik7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIGVuY29kaW5nXCIpfXJldHVybiBvfSxvLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm57dHlwZTpcIkJ1ZmZlclwiLGRhdGE6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyfHx0aGlzLDApfX0sby5wcm90b3R5cGUuY29weT1mdW5jdGlvbihlLHQsbixyKXt2YXIgaT10aGlzO2lmKG58fChuPTApLHJ8fDA9PT1yfHwocj10aGlzLmxlbmd0aCksdHx8KHQ9MCksciE9PW4mJjAhPT1lLmxlbmd0aCYmMCE9PWkubGVuZ3RoKXtHKHI+PW4sXCJzb3VyY2VFbmQgPCBzb3VyY2VTdGFydFwiKSxHKHQ+PTAmJnQ8ZS5sZW5ndGgsXCJ0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzXCIpLEcobj49MCYmbjxpLmxlbmd0aCxcInNvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHNcIiksRyhyPj0wJiZyPD1pLmxlbmd0aCxcInNvdXJjZUVuZCBvdXQgb2YgYm91bmRzXCIpLHI+dGhpcy5sZW5ndGgmJihyPXRoaXMubGVuZ3RoKSxlLmxlbmd0aC10PHItbiYmKHI9ZS5sZW5ndGgtdCtuKTt2YXIgdT1yLW47aWYodTwxMDB8fCFvLl91c2VUeXBlZEFycmF5cylmb3IodmFyIGE9MDthPHU7YSsrKWVbYSt0XT10aGlzW2Erbl07ZWxzZSBlLl9zZXQodGhpcy5zdWJhcnJheShuLG4rdSksdCl9fSxvLnByb3RvdHlwZS5zbGljZT1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMubGVuZ3RoO2lmKGU9WShlLG4sMCksdD1ZKHQsbixuKSxvLl91c2VUeXBlZEFycmF5cylyZXR1cm4gby5fYXVnbWVudCh0aGlzLnN1YmFycmF5KGUsdCkpO2Zvcih2YXIgcj10LWUsaT1uZXcgbyhyLCh2b2lkIDApLCghMCkpLHU9MDt1PHI7dSsrKWlbdV09dGhpc1t1K2VdO3JldHVybiBpfSxvLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGNvbnNvbGUubG9nKFwiLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuXCIpLHRoaXMucmVhZFVJbnQ4KGUpfSxvLnByb3RvdHlwZS5zZXQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gY29uc29sZS5sb2coXCIuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC5cIiksdGhpcy53cml0ZVVJbnQ4KGUsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50OD1mdW5jdGlvbihlLHQpe2lmKHR8fChHKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyBvZmZzZXRcIiksRyhlPHRoaXMubGVuZ3RoLFwiVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIikpLCEoZT49dGhpcy5sZW5ndGgpKXJldHVybiB0aGlzW2VdfSxvLnByb3RvdHlwZS5yZWFkVUludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gSSh0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRVSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBJKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZFVJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEEodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkVUludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQSh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQ4PWZ1bmN0aW9uKGUsdCl7aWYodHx8KEcodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIG9mZnNldFwiKSxHKGU8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aFwiKSksIShlPj10aGlzLmxlbmd0aCkpe3ZhciBuPTEyOCZ0aGlzW2VdO3JldHVybiBuPygyNTUtdGhpc1tlXSsxKSotMTp0aGlzW2VdfX0sby5wcm90b3R5cGUucmVhZEludDE2TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gQih0aGlzLGUsITAsdCl9LG8ucHJvdG90eXBlLnJlYWRJbnQxNkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEIodGhpcyxlLCExLHQpfSxvLnByb3RvdHlwZS5yZWFkSW50MzJMRT1mdW5jdGlvbihlLHQpe3JldHVybiBMKHRoaXMsZSwhMCx0KX0sby5wcm90b3R5cGUucmVhZEludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gTCh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLnJlYWRGbG9hdExFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFUodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkRmxvYXRCRT1mdW5jdGlvbihlLHQpe3JldHVybiBVKHRoaXMsZSwhMSx0KX0sby5wcm90b3R5cGUucmVhZERvdWJsZUxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHgodGhpcyxlLCEwLHQpfSxvLnByb3RvdHlwZS5yZWFkRG91YmxlQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4geCh0aGlzLGUsITEsdCl9LG8ucHJvdG90eXBlLndyaXRlVUludDg9ZnVuY3Rpb24oZSx0LG4pe258fChHKHZvaWQgMCE9PWUmJm51bGwhPT1lLFwibWlzc2luZyB2YWx1ZVwiKSxHKHZvaWQgMCE9PXQmJm51bGwhPT10LFwibWlzc2luZyBvZmZzZXRcIiksRyh0PHRoaXMubGVuZ3RoLFwidHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpLHooZSwyNTUpKSx0Pj10aGlzLmxlbmd0aHx8KHRoaXNbdF09ZSl9LG8ucHJvdG90eXBlLndyaXRlVUludDE2TEU9ZnVuY3Rpb24oZSx0LG4pe1ModGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDE2QkU9ZnVuY3Rpb24oZSx0LG4pe1ModGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe0ModGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlVUludDMyQkU9ZnVuY3Rpb24oZSx0LG4pe0ModGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlSW50OD1mdW5jdGlvbihlLHQsbil7bnx8KEcodm9pZCAwIT09ZSYmbnVsbCE9PWUsXCJtaXNzaW5nIHZhbHVlXCIpLEcodm9pZCAwIT09dCYmbnVsbCE9PXQsXCJtaXNzaW5nIG9mZnNldFwiKSxHKHQ8dGhpcy5sZW5ndGgsXCJUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIiksWChlLDEyNywtMTI4KSksdD49dGhpcy5sZW5ndGh8fChlPj0wP3RoaXMud3JpdGVVSW50OChlLHQsbik6dGhpcy53cml0ZVVJbnQ4KDI1NStlKzEsdCxuKSl9LG8ucHJvdG90eXBlLndyaXRlSW50MTZMRT1mdW5jdGlvbihlLHQsbil7aih0aGlzLGUsdCwhMCxuKX0sby5wcm90b3R5cGUud3JpdGVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxuKXtqKHRoaXMsZSx0LCExLG4pfSxvLnByb3RvdHlwZS53cml0ZUludDMyTEU9ZnVuY3Rpb24oZSx0LG4pe2sodGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlSW50MzJCRT1mdW5jdGlvbihlLHQsbil7ayh0aGlzLGUsdCwhMSxuKX0sby5wcm90b3R5cGUud3JpdGVGbG9hdExFPWZ1bmN0aW9uKGUsdCxuKXtUKHRoaXMsZSx0LCEwLG4pfSxvLnByb3RvdHlwZS53cml0ZUZsb2F0QkU9ZnVuY3Rpb24oZSx0LG4pe1QodGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLndyaXRlRG91YmxlTEU9ZnVuY3Rpb24oZSx0LG4pe00odGhpcyxlLHQsITAsbil9LG8ucHJvdG90eXBlLndyaXRlRG91YmxlQkU9ZnVuY3Rpb24oZSx0LG4pe00odGhpcyxlLHQsITEsbil9LG8ucHJvdG90eXBlLmZpbGw9ZnVuY3Rpb24oZSx0LG4pe2lmKGV8fChlPTApLHR8fCh0PTApLG58fChuPXRoaXMubGVuZ3RoKSxcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9ZS5jaGFyQ29kZUF0KDApKSxHKFwibnVtYmVyXCI9PXR5cGVvZiBlJiYhaXNOYU4oZSksXCJ2YWx1ZSBpcyBub3QgYSBudW1iZXJcIiksRyhuPj10LFwiZW5kIDwgc3RhcnRcIiksbiE9PXQmJjAhPT10aGlzLmxlbmd0aCl7Ryh0Pj0wJiZ0PHRoaXMubGVuZ3RoLFwic3RhcnQgb3V0IG9mIGJvdW5kc1wiKSxHKG4+PTAmJm48PXRoaXMubGVuZ3RoLFwiZW5kIG91dCBvZiBib3VuZHNcIik7Zm9yKHZhciByPXQ7cjxuO3IrKyl0aGlzW3JdPWV9fSxvLnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9dGhpcy5sZW5ndGgscj0wO3I8dDtyKyspaWYoZVtyXT1IKHRoaXNbcl0pLHI9PT1uLklOU1BFQ1RfTUFYX0JZVEVTKXtlW3IrMV09XCIuLi5cIjticmVha31yZXR1cm5cIjxCdWZmZXIgXCIrZS5qb2luKFwiIFwiKStcIj5cIn0sby5wcm90b3R5cGUudG9BcnJheUJ1ZmZlcj1mdW5jdGlvbigpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5KXtpZihvLl91c2VUeXBlZEFycmF5cylyZXR1cm4gbmV3IG8odGhpcykuYnVmZmVyO2Zvcih2YXIgZT1uZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aCksdD0wLG49ZS5sZW5ndGg7dDxuO3QrPTEpZVt0XT10aGlzW3RdO3JldHVybiBlLmJ1ZmZlcn10aHJvdyBuZXcgRXJyb3IoXCJCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKX07dmFyIFo9by5wcm90b3R5cGU7by5fYXVnbWVudD1mdW5jdGlvbihlKXtyZXR1cm4gZS5faXNCdWZmZXI9ITAsZS5fZ2V0PWUuZ2V0LGUuX3NldD1lLnNldCxlLmdldD1aLmdldCxlLnNldD1aLnNldCxlLndyaXRlPVoud3JpdGUsZS50b1N0cmluZz1aLnRvU3RyaW5nLGUudG9Mb2NhbGVTdHJpbmc9Wi50b1N0cmluZyxlLnRvSlNPTj1aLnRvSlNPTixlLmNvcHk9Wi5jb3B5LGUuc2xpY2U9Wi5zbGljZSxlLnJlYWRVSW50OD1aLnJlYWRVSW50OCxlLnJlYWRVSW50MTZMRT1aLnJlYWRVSW50MTZMRSxlLnJlYWRVSW50MTZCRT1aLnJlYWRVSW50MTZCRSxlLnJlYWRVSW50MzJMRT1aLnJlYWRVSW50MzJMRSxlLnJlYWRVSW50MzJCRT1aLnJlYWRVSW50MzJCRSxlLnJlYWRJbnQ4PVoucmVhZEludDgsZS5yZWFkSW50MTZMRT1aLnJlYWRJbnQxNkxFLGUucmVhZEludDE2QkU9Wi5yZWFkSW50MTZCRSxlLnJlYWRJbnQzMkxFPVoucmVhZEludDMyTEUsZS5yZWFkSW50MzJCRT1aLnJlYWRJbnQzMkJFLGUucmVhZEZsb2F0TEU9Wi5yZWFkRmxvYXRMRSxlLnJlYWRGbG9hdEJFPVoucmVhZEZsb2F0QkUsZS5yZWFkRG91YmxlTEU9Wi5yZWFkRG91YmxlTEUsZS5yZWFkRG91YmxlQkU9Wi5yZWFkRG91YmxlQkUsZS53cml0ZVVJbnQ4PVoud3JpdGVVSW50OCxlLndyaXRlVUludDE2TEU9Wi53cml0ZVVJbnQxNkxFLGUud3JpdGVVSW50MTZCRT1aLndyaXRlVUludDE2QkUsZS53cml0ZVVJbnQzMkxFPVoud3JpdGVVSW50MzJMRSxlLndyaXRlVUludDMyQkU9Wi53cml0ZVVJbnQzMkJFLGUud3JpdGVJbnQ4PVoud3JpdGVJbnQ4LGUud3JpdGVJbnQxNkxFPVoud3JpdGVJbnQxNkxFLGUud3JpdGVJbnQxNkJFPVoud3JpdGVJbnQxNkJFLGUud3JpdGVJbnQzMkxFPVoud3JpdGVJbnQzMkxFLGUud3JpdGVJbnQzMkJFPVoud3JpdGVJbnQzMkJFLGUud3JpdGVGbG9hdExFPVoud3JpdGVGbG9hdExFLGUud3JpdGVGbG9hdEJFPVoud3JpdGVGbG9hdEJFLGUud3JpdGVEb3VibGVMRT1aLndyaXRlRG91YmxlTEUsZS53cml0ZURvdWJsZUJFPVoud3JpdGVEb3VibGVCRSxlLmZpbGw9Wi5maWxsLGUuaW5zcGVjdD1aLmluc3BlY3QsZS50b0FycmF5QnVmZmVyPVoudG9BcnJheUJ1ZmZlcixlfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlclwiKX0se1wiYmFzZTY0LWpzXCI6MixidWZmZXI6MyxpZWVlNzU0OjExLGxZcG9JMjoxMH1dLDQ6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtpZihlLmxlbmd0aCVwIT09MCl7dmFyIG49ZS5sZW5ndGgrKHAtZS5sZW5ndGglcCk7ZT1vLmNvbmNhdChbZSxnXSxuKX1mb3IodmFyIHI9W10saT10P2UucmVhZEludDMyQkU6ZS5yZWFkSW50MzJMRSx1PTA7dTxlLmxlbmd0aDt1Kz1wKXIucHVzaChpLmNhbGwoZSx1KSk7cmV0dXJuIHJ9ZnVuY3Rpb24gZChlLHQsbil7Zm9yKHZhciByPW5ldyBvKHQpLGk9bj9yLndyaXRlSW50MzJCRTpyLndyaXRlSW50MzJMRSx1PTA7dTxlLmxlbmd0aDt1KyspaS5jYWxsKHIsZVt1XSw0KnUsITApO3JldHVybiByfWZ1bmN0aW9uIGgoZSx0LG4scil7by5pc0J1ZmZlcihlKXx8KGU9bmV3IG8oZSkpO3ZhciBpPXQobChlLHIpLGUubGVuZ3RoKnkpO3JldHVybiBkKGksbixyKX12YXIgbz1lKFwiYnVmZmVyXCIpLkJ1ZmZlcixwPTQsZz1uZXcgbyhwKTtnLmZpbGwoMCk7dmFyIHk9ODt0LmV4cG9ydHM9e2hhc2g6aH19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9oZWxwZXJzLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw1OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKHQscixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCxuKXtvLmlzQnVmZmVyKHQpfHwodD1uZXcgbyh0KSksby5pc0J1ZmZlcihuKXx8KG49bmV3IG8obikpLHQubGVuZ3RoPm0/dD1lKHQpOnQubGVuZ3RoPG0mJih0PW8uY29uY2F0KFt0LF9dLG0pKTtmb3IodmFyIHI9bmV3IG8obSksaT1uZXcgbyhtKSx1PTA7dTxtO3UrKylyW3VdPTU0XnRbdV0saVt1XT05Ml50W3VdO3ZhciBhPWUoby5jb25jYXQoW3Isbl0pKTtyZXR1cm4gZShvLmNvbmNhdChbaSxhXSkpfWZ1bmN0aW9uIGQoZSx0KXtlPWV8fFwic2hhMVwiO3ZhciBuPXZbZV0scj1bXSxpPTA7cmV0dXJuIG58fGgoXCJhbGdvcml0aG06XCIsZSxcImlzIG5vdCB5ZXQgc3VwcG9ydGVkXCIpLHt1cGRhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIG8uaXNCdWZmZXIoZSl8fChlPW5ldyBvKGUpKSxyLnB1c2goZSksaSs9ZS5sZW5ndGgsdGhpc30sZGlnZXN0OmZ1bmN0aW9uKGUpe3ZhciBpPW8uY29uY2F0KHIpLHU9dD9sKG4sdCxpKTpuKGkpO3JldHVybiByPW51bGwsZT91LnRvU3RyaW5nKGUpOnV9fX1mdW5jdGlvbiBoKCl7dmFyIGU9W10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oXCIgXCIpO3Rocm93IG5ldyBFcnJvcihbZSxcIndlIGFjY2VwdCBwdWxsIHJlcXVlc3RzXCIsXCJodHRwOi8vZ2l0aHViLmNvbS9kb21pbmljdGFyci9jcnlwdG8tYnJvd3NlcmlmeVwiXS5qb2luKFwiXFxuXCIpKX1mdW5jdGlvbiBwKGUsdCl7Zm9yKHZhciBuIGluIGUpdChlW25dLG4pfXZhciBvPWUoXCJidWZmZXJcIikuQnVmZmVyLGc9ZShcIi4vc2hhXCIpLHk9ZShcIi4vc2hhMjU2XCIpLHc9ZShcIi4vcm5nXCIpLGI9ZShcIi4vbWQ1XCIpLHY9e3NoYTE6ZyxzaGEyNTY6eSxtZDU6Yn0sbT02NCxfPW5ldyBvKG0pO18uZmlsbCgwKSxuLmNyZWF0ZUhhc2g9ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSl9LG4uY3JlYXRlSG1hYz1mdW5jdGlvbihlLHQpe3JldHVybiBkKGUsdCl9LG4ucmFuZG9tQnl0ZXM9ZnVuY3Rpb24oZSx0KXtpZighdHx8IXQuY2FsbClyZXR1cm4gbmV3IG8odyhlKSk7dHJ5e3QuY2FsbCh0aGlzLHZvaWQgMCxuZXcgbyh3KGUpKSl9Y2F0Y2gobil7dChuKX19LHAoW1wiY3JlYXRlQ3JlZGVudGlhbHNcIixcImNyZWF0ZUNpcGhlclwiLFwiY3JlYXRlQ2lwaGVyaXZcIixcImNyZWF0ZURlY2lwaGVyXCIsXCJjcmVhdGVEZWNpcGhlcml2XCIsXCJjcmVhdGVTaWduXCIsXCJjcmVhdGVWZXJpZnlcIixcImNyZWF0ZURpZmZpZUhlbGxtYW5cIixcInBia2RmMlwiXSxmdW5jdGlvbihlKXtuW2VdPWZ1bmN0aW9uKCl7aChcInNvcnJ5LFwiLGUsXCJpcyBub3QgaW1wbGVtZW50ZWQgeWV0XCIpfX0pfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvaW5kZXguanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9tZDVcIjo2LFwiLi9ybmdcIjo3LFwiLi9zaGFcIjo4LFwiLi9zaGEyNTZcIjo5LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDY6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe2Z1bmN0aW9uIGwoZSx0KXtlW3Q+PjVdfD0xMjg8PHQlMzIsZVsodCs2ND4+Pjk8PDQpKzE0XT10O2Zvcih2YXIgbj0xNzMyNTg0MTkzLHI9LTI3MTczMzg3OSxvPS0xNzMyNTg0MTk0LGk9MjcxNzMzODc4LHU9MDt1PGUubGVuZ3RoO3UrPTE2KXt2YXIgYT1uLGY9cixzPW8sYz1pO249aChuLHIsbyxpLGVbdSswXSw3LC02ODA4NzY5MzYpLGk9aChpLG4scixvLGVbdSsxXSwxMiwtMzg5NTY0NTg2KSxvPWgobyxpLG4scixlW3UrMl0sMTcsNjA2MTA1ODE5KSxyPWgocixvLGksbixlW3UrM10sMjIsLTEwNDQ1MjUzMzApLG49aChuLHIsbyxpLGVbdSs0XSw3LC0xNzY0MTg4OTcpLGk9aChpLG4scixvLGVbdSs1XSwxMiwxMjAwMDgwNDI2KSxvPWgobyxpLG4scixlW3UrNl0sMTcsLTE0NzMyMzEzNDEpLHI9aChyLG8saSxuLGVbdSs3XSwyMiwtNDU3MDU5ODMpLG49aChuLHIsbyxpLGVbdSs4XSw3LDE3NzAwMzU0MTYpLGk9aChpLG4scixvLGVbdSs5XSwxMiwtMTk1ODQxNDQxNyksbz1oKG8saSxuLHIsZVt1KzEwXSwxNywtNDIwNjMpLHI9aChyLG8saSxuLGVbdSsxMV0sMjIsLTE5OTA0MDQxNjIpLG49aChuLHIsbyxpLGVbdSsxMl0sNywxODA0NjAzNjgyKSxpPWgoaSxuLHIsbyxlW3UrMTNdLDEyLC00MDM0MTEwMSksbz1oKG8saSxuLHIsZVt1KzE0XSwxNywtMTUwMjAwMjI5MCkscj1oKHIsbyxpLG4sZVt1KzE1XSwyMiwxMjM2NTM1MzI5KSxuPXAobixyLG8saSxlW3UrMV0sNSwtMTY1Nzk2NTEwKSxpPXAoaSxuLHIsbyxlW3UrNl0sOSwtMTA2OTUwMTYzMiksbz1wKG8saSxuLHIsZVt1KzExXSwxNCw2NDM3MTc3MTMpLHI9cChyLG8saSxuLGVbdSswXSwyMCwtMzczODk3MzAyKSxuPXAobixyLG8saSxlW3UrNV0sNSwtNzAxNTU4NjkxKSxpPXAoaSxuLHIsbyxlW3UrMTBdLDksMzgwMTYwODMpLG89cChvLGksbixyLGVbdSsxNV0sMTQsLTY2MDQ3ODMzNSkscj1wKHIsbyxpLG4sZVt1KzRdLDIwLC00MDU1Mzc4NDgpLG49cChuLHIsbyxpLGVbdSs5XSw1LDU2ODQ0NjQzOCksaT1wKGksbixyLG8sZVt1KzE0XSw5LC0xMDE5ODAzNjkwKSxvPXAobyxpLG4scixlW3UrM10sMTQsLTE4NzM2Mzk2MSkscj1wKHIsbyxpLG4sZVt1KzhdLDIwLDExNjM1MzE1MDEpLG49cChuLHIsbyxpLGVbdSsxM10sNSwtMTQ0NDY4MTQ2NyksaT1wKGksbixyLG8sZVt1KzJdLDksLTUxNDAzNzg0KSxvPXAobyxpLG4scixlW3UrN10sMTQsMTczNTMyODQ3Mykscj1wKHIsbyxpLG4sZVt1KzEyXSwyMCwtMTkyNjYwNzczNCksbj1nKG4scixvLGksZVt1KzVdLDQsLTM3ODU1OCksaT1nKGksbixyLG8sZVt1KzhdLDExLC0yMDIyNTc0NDYzKSxvPWcobyxpLG4scixlW3UrMTFdLDE2LDE4MzkwMzA1NjIpLHI9ZyhyLG8saSxuLGVbdSsxNF0sMjMsLTM1MzA5NTU2KSxuPWcobixyLG8saSxlW3UrMV0sNCwtMTUzMDk5MjA2MCksaT1nKGksbixyLG8sZVt1KzRdLDExLDEyNzI4OTMzNTMpLG89ZyhvLGksbixyLGVbdSs3XSwxNiwtMTU1NDk3NjMyKSxyPWcocixvLGksbixlW3UrMTBdLDIzLC0xMDk0NzMwNjQwKSxuPWcobixyLG8saSxlW3UrMTNdLDQsNjgxMjc5MTc0KSxpPWcoaSxuLHIsbyxlW3UrMF0sMTEsLTM1ODUzNzIyMiksbz1nKG8saSxuLHIsZVt1KzNdLDE2LC03MjI1MjE5NzkpLHI9ZyhyLG8saSxuLGVbdSs2XSwyMyw3NjAyOTE4OSksbj1nKG4scixvLGksZVt1KzldLDQsLTY0MDM2NDQ4NyksaT1nKGksbixyLG8sZVt1KzEyXSwxMSwtNDIxODE1ODM1KSxvPWcobyxpLG4scixlW3UrMTVdLDE2LDUzMDc0MjUyMCkscj1nKHIsbyxpLG4sZVt1KzJdLDIzLC05OTUzMzg2NTEpLG49eShuLHIsbyxpLGVbdSswXSw2LC0xOTg2MzA4NDQpLGk9eShpLG4scixvLGVbdSs3XSwxMCwxMTI2ODkxNDE1KSxvPXkobyxpLG4scixlW3UrMTRdLDE1LC0xNDE2MzU0OTA1KSxyPXkocixvLGksbixlW3UrNV0sMjEsLTU3NDM0MDU1KSxuPXkobixyLG8saSxlW3UrMTJdLDYsMTcwMDQ4NTU3MSksaT15KGksbixyLG8sZVt1KzNdLDEwLC0xODk0OTg2NjA2KSxvPXkobyxpLG4scixlW3UrMTBdLDE1LC0xMDUxNTIzKSxyPXkocixvLGksbixlW3UrMV0sMjEsLTIwNTQ5MjI3OTkpLG49eShuLHIsbyxpLGVbdSs4XSw2LDE4NzMzMTMzNTkpLGk9eShpLG4scixvLGVbdSsxNV0sMTAsLTMwNjExNzQ0KSxvPXkobyxpLG4scixlW3UrNl0sMTUsLTE1NjAxOTgzODApLHI9eShyLG8saSxuLGVbdSsxM10sMjEsMTMwOTE1MTY0OSksbj15KG4scixvLGksZVt1KzRdLDYsLTE0NTUyMzA3MCksaT15KGksbixyLG8sZVt1KzExXSwxMCwtMTEyMDIxMDM3OSksbz15KG8saSxuLHIsZVt1KzJdLDE1LDcxODc4NzI1OSkscj15KHIsbyxpLG4sZVt1KzldLDIxLC0zNDM0ODU1NTEpLG49dyhuLGEpLHI9dyhyLGYpLG89dyhvLHMpLGk9dyhpLGMpfXJldHVybiBBcnJheShuLHIsbyxpKX1mdW5jdGlvbiBkKGUsdCxuLHIsbyxpKXtyZXR1cm4gdyhiKHcodyh0LGUpLHcocixpKSksbyksbil9ZnVuY3Rpb24gaChlLHQsbixyLG8saSx1KXtyZXR1cm4gZCh0Jm58fnQmcixlLHQsbyxpLHUpfWZ1bmN0aW9uIHAoZSx0LG4scixvLGksdSl7cmV0dXJuIGQodCZyfG4mfnIsZSx0LG8saSx1KX1mdW5jdGlvbiBnKGUsdCxuLHIsbyxpLHUpe3JldHVybiBkKHRebl5yLGUsdCxvLGksdSl9ZnVuY3Rpb24geShlLHQsbixyLG8saSx1KXtyZXR1cm4gZChuXih0fH5yKSxlLHQsbyxpLHUpfWZ1bmN0aW9uIHcoZSx0KXt2YXIgbj0oNjU1MzUmZSkrKDY1NTM1JnQpLHI9KGU+PjE2KSsodD4+MTYpKyhuPj4xNik7cmV0dXJuIHI8PDE2fDY1NTM1Jm59ZnVuY3Rpb24gYihlLHQpe3JldHVybiBlPDx0fGU+Pj4zMi10fXZhciB2PWUoXCIuL2hlbHBlcnNcIik7dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiB2Lmhhc2goZSxsLDE2KX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9tZDUuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSw3OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKGUsbixyLG8saSx1LGEsZixzKXshZnVuY3Rpb24oKXt2YXIgZSxuLHI9dGhpcztlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCx0LG49bmV3IEFycmF5KGUpLHI9MDtyPGU7cisrKTA9PSgzJnIpJiYodD00Mjk0OTY3Mjk2Kk1hdGgucmFuZG9tKCkpLG5bcl09dD4+PigoMyZyKTw8MykmMjU1O3JldHVybiBufSxyLmNyeXB0byYmY3J5cHRvLmdldFJhbmRvbVZhbHVlcyYmKG49ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXModCksdH0pLHQuZXhwb3J0cz1ufHxlfSgpfSkuY2FsbCh0aGlzLGUoXCJsWXBvSTJcIiksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnkvcm5nLmpzXCIsXCIvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvY3J5cHRvLWJyb3dzZXJpZnlcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSw4OltmdW5jdGlvbihlLHQsbil7KGZ1bmN0aW9uKG4scixvLGksdSxhLGYscyxjKXtmdW5jdGlvbiBsKGUsdCl7ZVt0Pj41XXw9MTI4PDwyNC10JTMyLGVbKHQrNjQ+Pjk8PDQpKzE1XT10O2Zvcih2YXIgbj1BcnJheSg4MCkscj0xNzMyNTg0MTkzLG89LTI3MTczMzg3OSxpPS0xNzMyNTg0MTk0LHU9MjcxNzMzODc4LGE9LTEwMDk1ODk3NzYsZj0wO2Y8ZS5sZW5ndGg7Zis9MTYpe2Zvcih2YXIgcz1yLGM9byxsPWkseT11LHc9YSxiPTA7Yjw4MDtiKyspe2I8MTY/bltiXT1lW2YrYl06bltiXT1nKG5bYi0zXV5uW2ItOF1ebltiLTE0XV5uW2ItMTZdLDEpO3ZhciB2PXAocChnKHIsNSksZChiLG8saSx1KSkscChwKGEsbltiXSksaChiKSkpO2E9dSx1PWksaT1nKG8sMzApLG89cixyPXZ9cj1wKHIscyksbz1wKG8sYyksaT1wKGksbCksdT1wKHUseSksYT1wKGEsdyl9cmV0dXJuIEFycmF5KHIsbyxpLHUsYSl9ZnVuY3Rpb24gZChlLHQsbixyKXtyZXR1cm4gZTwyMD90Jm58fnQmcjplPDQwP3Rebl5yOmU8NjA/dCZufHQmcnxuJnI6dF5uXnJ9ZnVuY3Rpb24gaChlKXtyZXR1cm4gZTwyMD8xNTE4NTAwMjQ5OmU8NDA/MTg1OTc3NTM5MzplPDYwPy0xODk0MDA3NTg4Oi04OTk0OTc1MTR9ZnVuY3Rpb24gcChlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn1mdW5jdGlvbiBnKGUsdCl7cmV0dXJuIGU8PHR8ZT4+PjMyLXR9dmFyIHk9ZShcIi4vaGVscGVyc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHkuaGFzaChlLGwsMjAsITApfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5L3NoYS5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2NyeXB0by1icm93c2VyaWZ5XCIpfSx7XCIuL2hlbHBlcnNcIjo0LGJ1ZmZlcjozLGxZcG9JMjoxMH1dLDk6W2Z1bmN0aW9uKGUsdCxuKXsoZnVuY3Rpb24obixyLG8saSx1LGEsZixzLGMpe3ZhciBsPWUoXCIuL2hlbHBlcnNcIiksZD1mdW5jdGlvbihlLHQpe3ZhciBuPSg2NTUzNSZlKSsoNjU1MzUmdCkscj0oZT4+MTYpKyh0Pj4xNikrKG4+PjE2KTtyZXR1cm4gcjw8MTZ8NjU1MzUmbn0saD1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+dHxlPDwzMi10fSxwPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj50fSxnPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZSZ0Xn5lJm59LHk9ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBlJnReZSZuXnQmbn0sdz1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDIpXmgoZSwxMyleaChlLDIyKX0sYj1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDYpXmgoZSwxMSleaChlLDI1KX0sdj1mdW5jdGlvbihlKXtyZXR1cm4gaChlLDcpXmgoZSwxOClecChlLDMpfSxtPWZ1bmN0aW9uKGUpe3JldHVybiBoKGUsMTcpXmgoZSwxOSlecChlLDEwKX0sXz1mdW5jdGlvbihlLHQpe3ZhciBuLHIsbyxpLHUsYSxmLHMsYyxsLGgscCxfPW5ldyBBcnJheSgxMTE2MzUyNDA4LDE4OTk0NDc0NDEsMzA0OTMyMzQ3MSwzOTIxMDA5NTczLDk2MTk4NzE2MywxNTA4OTcwOTkzLDI0NTM2MzU3NDgsMjg3MDc2MzIyMSwzNjI0MzgxMDgwLDMxMDU5ODQwMSw2MDcyMjUyNzgsMTQyNjg4MTk4NywxOTI1MDc4Mzg4LDIxNjIwNzgyMDYsMjYxNDg4ODEwMywzMjQ4MjIyNTgwLDM4MzUzOTA0MDEsNDAyMjIyNDc3NCwyNjQzNDcwNzgsNjA0ODA3NjI4LDc3MDI1NTk4MywxMjQ5MTUwMTIyLDE1NTUwODE2OTIsMTk5NjA2NDk4NiwyNTU0MjIwODgyLDI4MjE4MzQzNDksMjk1Mjk5NjgwOCwzMjEwMzEzNjcxLDMzMzY1NzE4OTEsMzU4NDUyODcxMSwxMTM5MjY5OTMsMzM4MjQxODk1LDY2NjMwNzIwNSw3NzM1Mjk5MTIsMTI5NDc1NzM3MiwxMzk2MTgyMjkxLDE2OTUxODM3MDAsMTk4NjY2MTA1MSwyMTc3MDI2MzUwLDI0NTY5NTYwMzcsMjczMDQ4NTkyMSwyODIwMzAyNDExLDMyNTk3MzA4MDAsMzM0NTc2NDc3MSwzNTE2MDY1ODE3LDM2MDAzNTI4MDQsNDA5NDU3MTkwOSwyNzU0MjMzNDQsNDMwMjI3NzM0LDUwNjk0ODYxNiw2NTkwNjA1NTYsODgzOTk3ODc3LDk1ODEzOTU3MSwxMzIyODIyMjE4LDE1MzcwMDIwNjMsMTc0Nzg3Mzc3OSwxOTU1NTYyMjIyLDIwMjQxMDQ4MTUsMjIyNzczMDQ1MiwyMzYxODUyNDI0LDI0Mjg0MzY0NzQsMjc1NjczNDE4NywzMjA0MDMxNDc5LDMzMjkzMjUyOTgpLEU9bmV3IEFycmF5KDE3NzkwMzM3MDMsMzE0NDEzNDI3NywxMDEzOTA0MjQyLDI3NzM0ODA3NjIsMTM1OTg5MzExOSwyNjAwODIyOTI0LDUyODczNDYzNSwxNTQxNDU5MjI1KSxJPW5ldyBBcnJheSg2NCk7XG5lW3Q+PjVdfD0xMjg8PDI0LXQlMzIsZVsodCs2ND4+OTw8NCkrMTVdPXQ7Zm9yKHZhciBjPTA7YzxlLmxlbmd0aDtjKz0xNil7bj1FWzBdLHI9RVsxXSxvPUVbMl0saT1FWzNdLHU9RVs0XSxhPUVbNV0sZj1FWzZdLHM9RVs3XTtmb3IodmFyIGw9MDtsPDY0O2wrKylsPDE2P0lbbF09ZVtsK2NdOklbbF09ZChkKGQobShJW2wtMl0pLElbbC03XSksdihJW2wtMTVdKSksSVtsLTE2XSksaD1kKGQoZChkKHMsYih1KSksZyh1LGEsZikpLF9bbF0pLElbbF0pLHA9ZCh3KG4pLHkobixyLG8pKSxzPWYsZj1hLGE9dSx1PWQoaSxoKSxpPW8sbz1yLHI9bixuPWQoaCxwKTtFWzBdPWQobixFWzBdKSxFWzFdPWQocixFWzFdKSxFWzJdPWQobyxFWzJdKSxFWzNdPWQoaSxFWzNdKSxFWzRdPWQodSxFWzRdKSxFWzVdPWQoYSxFWzVdKSxFWzZdPWQoZixFWzZdKSxFWzddPWQocyxFWzddKX1yZXR1cm4gRX07dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBsLmhhc2goZSxfLDMyLCEwKX19KS5jYWxsKHRoaXMsZShcImxZcG9JMlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeS9zaGEyNTYuanNcIixcIi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9jcnlwdG8tYnJvd3NlcmlmeVwiKX0se1wiLi9oZWxwZXJzXCI6NCxidWZmZXI6MyxsWXBvSTI6MTB9XSwxMDpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLG4scixvLGksdSxhLGYscyl7ZnVuY3Rpb24gYygpe312YXIgZT10LmV4cG9ydHM9e307ZS5uZXh0VGljaz1mdW5jdGlvbigpe3ZhciBlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5zZXRJbW1lZGlhdGUsdD1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cucG9zdE1lc3NhZ2UmJndpbmRvdy5hZGRFdmVudExpc3RlbmVyO2lmKGUpcmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGUpfTtpZih0KXt2YXIgbj1bXTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zb3VyY2U7aWYoKHQ9PT13aW5kb3d8fG51bGw9PT10KSYmXCJwcm9jZXNzLXRpY2tcIj09PWUuZGF0YSYmKGUuc3RvcFByb3BhZ2F0aW9uKCksbi5sZW5ndGg+MCkpe3ZhciByPW4uc2hpZnQoKTtyKCl9fSwhMCksZnVuY3Rpb24oZSl7bi5wdXNoKGUpLHdpbmRvdy5wb3N0TWVzc2FnZShcInByb2Nlc3MtdGlja1wiLFwiKlwiKX19cmV0dXJuIGZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoZSwwKX19KCksZS50aXRsZT1cImJyb3dzZXJcIixlLmJyb3dzZXI9ITAsZS5lbnY9e30sZS5hcmd2PVtdLGUub249YyxlLmFkZExpc3RlbmVyPWMsZS5vbmNlPWMsZS5vZmY9YyxlLnJlbW92ZUxpc3RlbmVyPWMsZS5yZW1vdmVBbGxMaXN0ZW5lcnM9YyxlLmVtaXQ9YyxlLmJpbmRpbmc9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWRcIil9LGUuY3dkPWZ1bmN0aW9uKCl7cmV0dXJuXCIvXCJ9LGUuY2hkaXI9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwicHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkXCIpfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3NcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XSwxMTpbZnVuY3Rpb24oZSx0LG4peyhmdW5jdGlvbihlLHQscixvLGksdSxhLGYscyl7bi5yZWFkPWZ1bmN0aW9uKGUsdCxuLHIsbyl7dmFyIGksdSxhPTgqby1yLTEsZj0oMTw8YSktMSxzPWY+PjEsYz0tNyxsPW4/by0xOjAsZD1uPy0xOjEsaD1lW3QrbF07Zm9yKGwrPWQsaT1oJigxPDwtYyktMSxoPj49LWMsYys9YTtjPjA7aT0yNTYqaStlW3QrbF0sbCs9ZCxjLT04KTtmb3IodT1pJigxPDwtYyktMSxpPj49LWMsYys9cjtjPjA7dT0yNTYqdStlW3QrbF0sbCs9ZCxjLT04KTtpZigwPT09aSlpPTEtcztlbHNle2lmKGk9PT1mKXJldHVybiB1P05hTjooaD8tMToxKSooMS8wKTt1Kz1NYXRoLnBvdygyLHIpLGktPXN9cmV0dXJuKGg/LTE6MSkqdSpNYXRoLnBvdygyLGktcil9LG4ud3JpdGU9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciB1LGEsZixzPTgqaS1vLTEsYz0oMTw8cyktMSxsPWM+PjEsZD0yMz09PW8/TWF0aC5wb3coMiwtMjQpLU1hdGgucG93KDIsLTc3KTowLGg9cj8wOmktMSxwPXI/MTotMSxnPXQ8MHx8MD09PXQmJjEvdDwwPzE6MDtmb3IodD1NYXRoLmFicyh0KSxpc05hTih0KXx8dD09PTEvMD8oYT1pc05hTih0KT8xOjAsdT1jKToodT1NYXRoLmZsb29yKE1hdGgubG9nKHQpL01hdGguTE4yKSx0KihmPU1hdGgucG93KDIsLXUpKTwxJiYodS0tLGYqPTIpLHQrPXUrbD49MT9kL2Y6ZCpNYXRoLnBvdygyLDEtbCksdCpmPj0yJiYodSsrLGYvPTIpLHUrbD49Yz8oYT0wLHU9Yyk6dStsPj0xPyhhPSh0KmYtMSkqTWF0aC5wb3coMixvKSx1Kz1sKTooYT10Kk1hdGgucG93KDIsbC0xKSpNYXRoLnBvdygyLG8pLHU9MCkpO28+PTg7ZVtuK2hdPTI1NSZhLGgrPXAsYS89MjU2LG8tPTgpO2Zvcih1PXU8PG98YSxzKz1vO3M+MDtlW24raF09MjU1JnUsaCs9cCx1Lz0yNTYscy09OCk7ZVtuK2gtcF18PTEyOCpnfX0pLmNhbGwodGhpcyxlKFwibFlwb0kyXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30sZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvbm9kZV9tb2R1bGVzL2llZWU3NTRcIil9LHtidWZmZXI6MyxsWXBvSTI6MTB9XX0se30sWzFdKSgxKX0pOyIsIi8qKlxuXHQqIEBuYW1lIEluc3RhbnRpYXRlQXBpRW5kcG9pbnRDb25maWdcblx0KiBAZGVzYyBDcmVhdGVzIGEgbmV3IEFwaSBFbmRwb2ludCBDb25maWcgb2JqZWN0XG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdG9yXG5cdCogQHJldHVybnMge29iamVjdH0gQXBpRW5kcG9pbnRDb25maWdcblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSW5zdGFudGlhdGVBcGlFbmRwb2ludENvbmZpZygkaW5qZWN0b3IpIHtcblx0LyoqXG5cdCAgKiBAY29uc3RydWN0b3Jcblx0ICAqL1xuXHRmdW5jdGlvbiBBcGlFbmRwb2ludENvbmZpZygpIHt9XG5cdEFwaUVuZHBvaW50Q29uZmlnLnByb3RvdHlwZS5yb3V0ZSA9IHJvdXRlO1xuXHRBcGlFbmRwb2ludENvbmZpZy5wcm90b3R5cGUubW9kZWwgPSBtb2RlbDtcblx0QXBpRW5kcG9pbnRDb25maWcucHJvdG90eXBlLm1ldGhvZHMgPSBtZXRob2RzO1xuXHRBcGlFbmRwb2ludENvbmZpZy5wcm90b3R5cGUuY2xhc3NEZWYgPSBjbGFzc0RlZjtcblxuXHRyZXR1cm4gQXBpRW5kcG9pbnRDb25maWc7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBPdmVycmlkZXMgdGhlIG1ldGhvZHMgZm9yIHRoaXMgZW5kcG9pbnRcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gbWV0aG9kcyhtZXRob2RzKSB7XG5cdCAgdGhpcy5tZXRob2RzID0gJGluamVjdG9yLmluc3RhbnRpYXRlKG1ldGhvZHMpOyBcblx0ICByZXR1cm4gdGhpcztcblx0fVxuXHQvKipcblx0XHQqIEBkZXNjIE92ZXJyaWRlcyB0aGUgbW9kZWwgY29uc3RydWN0b3IgZm9yIHRoaXMgZW5kcG9pbnRcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRDb25maWdcblx0XHQqIEBwYXJhbSB7b2JqZWN0fSBtZXRob2RzXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0fSB0aGlzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gbW9kZWwobW9kZWwpIHtcblx0ICB0aGlzLm1vZGVsID0gJGluamVjdG9yLmluc3RhbnRpYXRlKG1vZGVsKTtcblx0ICByZXR1cm4gdGhpcztcblx0fVxuXG5cdGZ1bmN0aW9uIGNsYXNzRGVmKGNsYXNzRGVmT2JqZWN0KSB7XG5cdFx0dGhpcy5fY2xhc3NEZWYgPSBjbGFzc0RlZk9iamVjdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgUG9pbnRzIHRoaXMgZW5kcG9pbnQgdG8gYSBnaXZlbiByb3V0ZSBvbiB0aGUgc2VydmVyXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50Q29uZmlnXG5cdFx0KiBAcGFyYW0ge29iamVjdH0gbWV0aG9kc1xuXHRcdCogQHJldHVybnMge29iamVjdH0gdGhpc1xuXHRcdCovXG5cdGZ1bmN0aW9uIHJvdXRlKHJvdXRlKSB7XG5cdCAgdGhpcy5yb3V0ZSA9IHJvdXRlO1xuXHQgIHJldHVybiB0aGlzO1xuXHR9XG5cbn07IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG52YXIgaW5zdGFudGlhdGVNb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwuanMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxuLyoqXG4gICogQG5hbWUgQXBpRW5kcG9pbnRcbiAgKiBAZGVzYyBDb25zdHJ1Y3RvciBmb3IgYXBpIGVuZHBvaW50c1xuICAqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuICAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlUm91dGVcbiAgKiBAcGFyYW0ge29iamVjdH0gZW5kcG9pbnRDb25maWdcbiAgKiBAcGFyYW0ge29iamVjdH0gdHJhbnNwb3J0XG4gICogQHJldHVybnMge29iamVjdH0gZW5kcG9pbnRcbiAgKiBAcmVxdWlyZXMgYW5ndWxhclxuICAqIEByZXF1aXJlcyBleHRlbmRcbiAgKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQXBpRW5kcG9pbnQoYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZywgdHJhbnNwb3J0LCBjYWNoZSwgJHRpbWVvdXQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAnbmdJbmplY3QnO1xuXG4gIC8qXG4gICAgVGhpcyBtaWdodCBzZWVtIGNvbmZ1c2luZywgYnV0IHdoYXQgd2UgYWN0dWFsbHkgZG9pbmcgaXMgcHJvdmlkaW5nIGFuIGludGVyZmFjZVxuICAgIGZvciB3aGVuIHdlIGNhbGwgYG5ld2Agb24gdGhpcy4gVGhhdCBpcywgaWYgd2UgZG8gc29tZXRoaW5nIGxpa2U6XG4gICAgdmFyIHNvbWVPYmogPSBuZXcgVGhpc0VuZHBvaW50KClcblxuICAgIFdlIHRoZW4gaGF2ZSB0aGUgYWJpbGl0eSB0byBwYXNzIGluIGRlZmF1bHQgZGF0YVxuICAqL1xuICB2YXIgc2VsZiA9IGZ1bmN0aW9uKGRhdGEsIG9uUmVhZHkpIHtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgZXh0ZW5kKHRydWUsIHRoaXMsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICBJZiB3ZSd2ZSBwYXNzZWQgaW4gYSBjdXN0b20gbW9kZWwgb2JqZWN0LCBsZXQncyBleHRlbmQgb3VyIGRlZmF1bHQgbW9kZWxcbiAgICAgIHdpdGggdGhpcyBjdXN0b20gbW9kZWwuIFRoaXMgZ2l2ZXMgdXMgbmV3IG1ldGhvZHMgdGhhdCBuZXdseSBjcmVhdGVkIG1vZGVscyBmb3JcbiAgICAgIHRoaXMgZW5kcG9pbnQgd2lsbCBoYXZlXG4gICAgKi9cbiAgICAvLyBpZiAoZW5kcG9pbnRDb25maWcubW9kZWwpIHtcbiAgICAvLyAgIHZhciBpbnN0YW5jZSA9IHRoaXM7XG4gICAgLy8gICB2YXIgbW9kZWxJbnN0YW5jZSA9IG5ldyBlbmRwb2ludENvbmZpZy5tb2RlbChpbnN0YW5jZSk7XG4gICAgLy8gICBhbmd1bGFyLmV4dGVuZCh0aGlzLCBtb2RlbEluc3RhbmNlKTtcbiAgICAvLyB9XG4gICAgdmFyIHJvb3RVcmwgPSBiYXNlUm91dGUgKyBlbmRwb2ludENvbmZpZy5yb3V0ZTtcblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZW5kcG9pbnRDb25maWcuX2NsYXNzRGVmKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgdmFyIG1vZGVsSW5zdGFuY2UgPSBuZXcgZW5kcG9pbnRDb25maWcuX2NsYXNzRGVmKGluc3RhbmNlKTtcbiAgICAgIGZvciAodmFyIGkgaW4gaW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBpbnN0YW5jZVtpXSkge1xuICAgICAgICAgIG1vZGVsSW5zdGFuY2VbaV0gPSBpbnN0YW5jZVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1vZGVsSW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLypcbiAgICBEZWZhdWx0cyBmb3Igb3VyIHJlcXVlc3QsIGluIGNhc2UgY29uZmlnIG9iamVjdHMgYXJlbid0IHBhc3NlZCBpblxuICAqL1xuICBzZWxmLnJlcSA9IHtcbiAgICBtZXRob2QgOiAnZ2V0JyxcbiAgICB1cmwgOiAnJyxcbiAgICBxdWVyeSA6IHt9LFxuICAgIGNvbmZpZyA6IHt9LFxuICAgIGRhdGEgOiB7fVxuICB9O1xuXG4gIC8qXG4gICAgQnJpbmcgaW4gdGhlIGNvbmZpZ3VyYXRpb25zIHRoYXQgd2VyZSBwYXNzZWQgaW4gb24gYmFzZVJvdXRlIGFuZCBlbmRwb2ludENvbmZpZ1xuICAqL1xuICBzZWxmLmNvbmZpZyA9IGVuZHBvaW50Q29uZmlnO1xuICBzZWxmLmJhc2VVcmwgPSBiYXNlUm91dGUgKyBzZWxmLmNvbmZpZy5yb3V0ZTtcblxuICAvKlxuICAgIEluc3RlYWQgb2YgaW5saW5pbmcgb3VyIGZ1bmN0aW9ucywgdXNlIGhvaXN0aW5nIHRvIG1ha2UgdGhpbmdzIG5pY2UgYW5kIGNsZWFuXG4gICovXG4gIHNlbGYuZXhlYyA9IGV4ZWM7XG4gIHNlbGYuZmluZCA9IGZpbmQ7XG4gIHNlbGYuc2tpcCA9IHNraXA7XG4gIHNlbGYuZmllbGRzID0gZmllbGRzO1xuICBzZWxmLmxpbWl0ID0gbGltaXQ7XG4gIHNlbGYuZmluZEJ5SWQgPSBmaW5kQnlJZDtcbiAgc2VsZi5maW5kQnlJZEFuZFJlbW92ZSA9IGZpbmRCeUlkQW5kUmVtb3ZlO1xuICBzZWxmLmZpbmRCeUlkQW5kVXBkYXRlID0gZmluZEJ5SWRBbmRVcGRhdGU7XG5cbiAgLypcbiAgICBTYXZlIGlzIGJvdW5kIHRvIHRoZSBwcm90b3R5cGUgc28gd2UgY2FuIHVzZSBpdCB3aGVuIGNyZWF0aW5nIGEgbmV3IGluc3RhbmNlXG4gICovXG4gIHNlbGYucHJvdG90eXBlLnNhdmUgPSBzYXZlO1xuXG4gIC8qXG4gICAgSWYgdGhlIGVuZHBvaW50Q29uZmlnIGhhcyBhIGN1c3RvbSBtZXRob2RzIG9iamVjdCwgZXh0ZW5kIG91ciBjdXJyZW50IG1ldGhvZHMgbGlzdFxuICAgIHdpdGggdGhlIG1ldGhvZHMgdGhhdCB3ZSd2ZSBwYXNzZWQgaW4uIFRoaXMgaGFzbid0IGJlZW4gdGVzdGVkIHZlcnkgZXh0ZW5zaXZlbHlcbiAgKi9cbiAgaWYgKGVuZHBvaW50Q29uZmlnLm1ldGhvZHMpIHtcbiAgICBlbmRwb2ludENvbmZpZy5tZXRob2RzLl9wYXJlbnQgPSBzZWxmO1xuICAgIGFuZ3VsYXIuZXh0ZW5kKHNlbGYsIGVuZHBvaW50Q29uZmlnLm1ldGhvZHMpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBJbmRpY2F0ZXMgdGhlIGFtb3VudCBvZiByZWNvcmRzIHRvIHJldHVybiB3aGVuIHF1ZXJ5aW5nXG4gICAgKiBAbWVtYmVyT2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50XG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBzZWxmXG4gICAgKi9cbiAgZnVuY3Rpb24gbGltaXQoYW1vdW50KSB7XG4gICAgc2VsZi5yZXEucXVlcnkubGltaXQgPSBhbW91bnQ7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2MgVGhpcyBmdW5jdGlvbiB3aWxsIGFsbG93IHVzIHRvIHNlbGVjdCBzcGVjaWZpYyBmaWVsZHMgdGhhdCB3ZSB3YW50IGJhY2sgZnJvbSB0aGUgZGJcbiAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgKiBAcGFyYW0ge3N0cmluZ3xhcnJheX0gZmllbGROYW1lc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBzZWxmXG4gICAqL1xuICBmdW5jdGlvbiBmaWVsZHMoZmllbGROYW1lcykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpZWxkTmFtZXMpKSB7XG4gICAgICBmaWVsZE5hbWVzID0gZmllbGROYW1lcy5qb2luKCcsJyk7XG4gICAgfVxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGZpZWxkTmFtZXMpIHtcbiAgICAgIGZpZWxkTmFtZXMgPSAnJztcbiAgICB9XG4gICAgc2VsZi5yZXEucXVlcnkuZmllbGRzID0gZmllbGROYW1lcztcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuICAvKipcbiAgICAqIEBkZXNjIEluZGljYXRlcyB0aGUgYW1vdW50IG9mIHJlY29yZHMgdG8gc2tpcCBvdmVyIHdoZW4gcXVlcnlpbmdcbiAgICAqIEBtZW1iZXJPZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnRcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcbiAgICAqL1xuICBmdW5jdGlvbiBza2lwKGFtb3VudCkge1xuICAgIHNlbGYucmVxLnF1ZXJ5LnNraXAgPSBhbW91bnQ7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHNhdmUoY2FsbGJhY2spIHtcbiAgICB2YXIgY2IgPSBjYWxsYmFjayB8fCBhbmd1bGFyLm5vb3A7XG4gICAgLyoganNoaW50IHZhbGlkdGhpczogdHJ1ZSAqL1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgLy9Vc2UgLnJlcXVlc3QgaW5zdGVhZCBvZiAucG9zdCBpbiB0aGUgc3VwZXIgcmFyZSBjYXNlIHdlIHdhbnQgdG8gcGFzcyBpbiBzb21lXG4gICAgLy9jb25maWcgb2JqZWN0IHByaW9yIHRvIHNhdmluZy4gSSBjYW4ndCB0aGluayBvZiBhbnkgbmVlZCBmb3IgdGhpcywgYnV0IEknbVxuICAgIC8vaW5jbHVkaW5nIHRoYXQgZnVuY3Rpb25hbGl0eSBqdXN0IGluIGNhc2UuXG4gICAgLyoqXG4gICAgICAqIEhBQ0sgLSB0aGlzIG9ubHkgd29ya3MgKmp1c3QgYmVjYXVzZSogYW5kIHNob3VsZCBiZSBmaXhlZCB0byB1c2UgYSBtb2RlbCBpbnN0YW5jZVxuICAgICAgKi9cbiAgICB2YXIgbWV0aG9kID0gJ1BPU1QnOyAvL2lmIG5ld1xuICAgIHZhciB0YXJnZXRVcmwgPSBzZWxmLmJhc2VVcmw7XG4gICAgaWYgKF90aGlzLmhhc093blByb3BlcnR5KCdAaHJlZicpKSB7XG4gICAgICAvLyBpZiAoX3RoaXMuX3RlbXBvcmFyeSAhPT0gdHJ1ZSkge1xuICAgICAgLy8gICBtZXRob2QgPSAnUFVUJztcbiAgICAgIC8vIH1cbiAgICAgIHRhcmdldFVybCA9IF90aGlzWydAaHJlZiddO1xuICAgIH1cblxuICAgIHRyYW5zcG9ydFxuICAgICAgLnJlcXVlc3QodGFyZ2V0VXJsLCBtZXRob2QsIF90aGlzLCB7fSwgc2VsZi5yZXEuY29uZmlnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZSB8fCB7fTtcbiAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgIGV4dGVuZCh0cnVlLCBfdGhpcywgZGF0YSk7XG5cbiAgICAgICAgLy8gY2FjaGUuaW52YWxpZGF0ZShkYXRhLl9pZCk7XG5cbiAgICAgICAgLy9TaWduYXR1cmUgaXM6IGVycm9yLCAqdGhpcyogaW5zdGFuY2UsIGZ1bGwgcmVzcG9uc2UgYm9keSAobW9zdGx5IGZvciBkZWJ1Z2dpbmcvc2FuaXR5IGNoZWNrKVxuICAgICAgICByZXR1cm4gY2IobnVsbCwgX3RoaXMsIHJlc3BvbnNlKTtcbiAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICBjYihlcnIpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIFNlbmRzIGEgcXVlcnkgdG8gdGhlIGFwaS4gSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGxhc3RcbiAgICAqIHBhcmFtZXRlciwgdGhpcyBtZXRob2Qgd2lsbCBleGVjdXRlIHRoZSBxdWVyeSBhbmQgcmV0dXJuIHRoZSByZXN1bHRzXG4gICAgKiB1c2luZyB0aGF0IGNhbGxiYWNrIGZ1bmN0aW9uLiBPdGhlcndpc2UsIGB0aGlzYCBnZXRzIHJldHVybmVkIGZvclxuICAgICogY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBxdWVyeVxuICAgICogQHBhcmFtIHtvYmplY3Q9fSBjb25maWdcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmQocXVlcnksIGNvbmZpZywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmVxLm1ldGhvZCA9ICdnZXQnO1xuICAgIHJlcS51cmwgPSBzZWxmLmJhc2VVcmw7XG4gICAgcmVxLnF1ZXJ5ID0ge1xuICAgICAgc2VhcmNoIDogcXVlcnlcbiAgICB9XG4gICAgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuY29uZmlnID0ge307XG4gICAgfVxuXG4gICAgdmFyIGNiO1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjb25maWcpIHtcbiAgICAgIGNiID0gY29uZmlnO1xuICAgIH1cblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgIGNiID0gY2FsbGJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcS5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYikge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYik7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBBc2tzIHRoZSBhcGkgdG8gcmV0dXJuIG9uZSBlbGVtZW50LiBJZiBhIGZ1bmN0aW9uIGlzIHBhc3NlZCBhcyB0aGVcbiAgICAqIGxhc3QgcGFyYW1ldGVyLCB0aGlzIG1ldGhvZCB3aWxsIGV4ZWN1dGUgdGhlIHF1ZXJ5IGFuZCByZXR1cm4gdGhlIHJlc3VsdHNcbiAgICAqIHVzaW5nIHRoYXQgY2FsbGJhY2sgZnVuY3Rpb24uIE90aGVyd2lzZSwgYHRoaXNgIGdldHMgcmV0dXJuZWQgZm9yXG4gICAgKiBjaGFpbmluZyBwdXJwb3Nlc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlIGlkXG4gICAgKiBAcGFyYW0ge29iamVjdD19IGNvbmZpZ1xuICAgICogQHBhcmFtIHtmdW5jdGlvbj19IGNhbGxiYWNrXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fHByb21pc2V9XG4gICAgKi9cbiAgZnVuY3Rpb24gZmluZEJ5SWQoaWQsIGNvbmZpZywgY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmVxLm1ldGhvZCA9ICdnZXQnO1xuICAgIC8qIGpzaGludCB2YWxpZHRoaXM6IHRydWUgKi9cbiAgICByZXEudXJsID0gdGhpcy5iYXNlVXJsICsgJy8nICsgaWQ7XG4gICAgaWYgKCdvYmplY3QnID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICByZXEuY29uZmlnID0gY29uZmlnO1xuICAgIH1cblxuICAgIHZhciBjYjtcblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY29uZmlnKSB7XG4gICAgICBjYiA9IGNvbmZpZztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICBjYiA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIC8vIEhlcmUsIHdlIG5lZWQgdG8gc2VlIGlmIHRoaXMgb2JqZWN0IGlzIGFscmVhZHkgaW4gdGhlIGNhY2hlLiBJZiBzbyxcbiAgICAvLyBmZXRjaCBpdCBhbmQgb3ZlcnJpZGUgb3VyIGNhbGxiYWNrIHN0YWNrXG5cbiAgICB2YXIgY2FjaGVkTW9kZWwgPSBjYWNoZS5nZXQoaWQsIF9pbnN0YW50aWF0ZSk7XG4gICAgaWYgKGNhY2hlZE1vZGVsKSB7XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNiKSB7XG4gICAgICAgIHJldHVybiBjYihudWxsLCBjYWNoZWRNb2RlbClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZXhlYyA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBjYWNoZWRNb2RlbCk7XG4gICAgICAgICAgICB9LDEwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNiKSB7XG4gICAgICByZXR1cm4gc2VsZi5leGVjKGNiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEZpbmRzIGFuIGVsZW1lbnQgb24gdGhlIEFQSSBhbmQgcmVtb3ZlcyBpdCB1c2luZyBhIHVuaXF1ZSBJRC4gSWYgYVxuICAgICogZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZSBsYXN0IHBhcmFtZXRlciwgdGhpcyBtZXRob2Qgd2lsbCBleGVjdXRlXG4gICAgKiB0aGUgcXVlcnkgYW5kIHJldHVybiB0aGUgcmVzdWx0cyB1c2luZyB0aGF0IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICogT3RoZXJ3aXNlLCBgdGhpc2AgZ2V0cyByZXR1cm5lZCBmb3JcbiAgICAqIGNoYWluaW5nIHB1cnBvc2VzXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaUVuZHBvaW50XG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2UgaWRcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmRCeUlkQW5kUmVtb3ZlKGlkLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ2RlbGV0ZSc7XG4gICAgcmVxLnVybCA9IHNlbGYuYmFzZVVybCArICcvJyArIGlkO1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHNlbGYuZXhlYyhjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIEZpbmRzIGEgc2luZ2xlIGVsZW1lbnQgb24gdGhlIEFQSSB1c2luZyBhIHVuaXF1ZSBpZCBhbmQgUkVQTEFDRVMgaXRcbiAgICAqIHdpdGggdGhlIGRhdGEgeW91IHByb3ZpZGUuIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcHJvdmlkZSBhdG9taWMgdXBkYXRlcy5cbiAgICAqIElmIGEgZnVuY3Rpb24gaXMgcGFzc2VkIGFzIHRoZSBjYWxsYmFjaywgdGhlIHF1ZXJ5IHdpbGwgZXhlY3V0ZSBhbmQgdGhlXG4gICAgKiBlcnJvciBvciByZXN1bHQgZnJvbSB0aGUgY2FsbCB3aWxsIGJlIHBhc3NlZCBiYWNrIHVzaW5nIHRoZSBjYWxsYmFjay4gSWZcbiAgICAqIG5vIGZ1bmN0aW9uIGlzIHByb3ZpZGVkLCBgdGhpc2Agd2lsbCBiZSByZXR1cm5lZCBmb3IgY2hhaW5pbmcgcHVycG9zZXNcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpRW5kcG9pbnRcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb249fSBjYWxsYmFja1xuICAgICogQHJldHVybnMge29iamVjdHxwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGZpbmRCeUlkQW5kVXBkYXRlKGlkLCBkYXRhLCBjYWxsYmFjaykge1xuICAgIHZhciByZXEgPSBzZWxmLnJlcTtcbiAgICByZXEubWV0aG9kID0gJ3B1dCc7XG4gICAgcmVxLmRhdGEgPSBkYXRhO1xuICAgIHJlcS51cmwgPSBzZWxmLmJhc2VVcmwgKyAnLycgKyBpZDtcblxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBzZWxmLmV4ZWMoY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xuXG4gIH1cblxuICAvKipcbiAgICAqIEBkZXNjIFRoaXMgbWV0aG9kIHdpbGwgY29tcG9zZSB0aGUgZmluYWwgcmVxdWVzdCwgc2VuZCBpdCBvdmVyIG91ciB0cmFuc3BvcnQsXG4gICAgKiBhbmQgcmV0dXJuIHRoZSBlcnJvciBvciByZXN1bHRzIHVzaW5nIHRoZSBwcm92aWRlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAqIEFkZGl0aW9uYWxseSwgdGhlIHJlc3BvbnNlIGlzIHdyYXBwZWQgaW4gb3VyIGN1c3RvbSBNb2RlbCBvYmplY3RzIHRvIG1ha2VcbiAgICAqIHdvcmtpbmcgd2l0aCB0aGVtIGEgbG90IGVhc2llclxuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlFbmRwb2ludFxuICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAqIEByZXR1cm5zIHtwcm9taXNlfVxuICAgICovXG4gIGZ1bmN0aW9uIGV4ZWMoY2IpIHtcbiAgICB2YXIgcmVxID0gc2VsZi5yZXE7XG4gICAgcmV0dXJuIHRyYW5zcG9ydFxuICAgICAgLnJlcXVlc3QocmVxLnVybCwgcmVxLm1ldGhvZCwgcmVxLmRhdGEsIHJlcS5xdWVyeSwgcmVxLmNvbmZpZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vY29udmVydCByZXNwb25zZSB0byBtb2RlbHNcbiAgICAgICAgdmFyIG1vZGVsO1xuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlIHx8IHt9O1xuICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIHZhciBoZWFkZXJzID0gcmVzcG9uc2UuaGVhZGVycztcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnbGVuZ3RoJykpIHtcbiAgICAgICAgICAgIG1vZGVsID0gZGF0YS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAvLyByZXR1cm4gaW5zdGFudGlhdGVNb2RlbChpdGVtLCB0cmFuc3BvcnQsIGJhc2VSb3V0ZSwgZW5kcG9pbnRDb25maWcpO1xuICAgICAgICAgICAgICByZXR1cm4gX2luc3RhbnRpYXRlKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGVsID0gX2luc3RhbnRpYXRlKGRhdGEpO1xuICAgICAgICAgICAgLy8gbW9kZWwgPSBpbnN0YW50aWF0ZU1vZGVsKGRhdGEsIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEgPSBtb2RlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2IobnVsbCwgZGF0YSwgcmVzcG9uc2UsIGhlYWRlcnMpO1xuICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGVyciA9IGVyciB8fCB7fTtcbiAgICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9pbnN0YW50aWF0ZShpdGVtKSB7XG4gICAgcmV0dXJuIGluc3RhbnRpYXRlTW9kZWwoaXRlbSwgdHJhbnNwb3J0LCBiYXNlUm91dGUsIGVuZHBvaW50Q29uZmlnLCBjYWNoZSk7XG4gIH1cbn07XG4iLCIvKipcblx0KiBAbmFtZSBBcGlQcm92aWRlclxuXHQqIEBkZXNjIFdpcmVzIHVwIHRoZSBhcGkgZnVuY3Rpb25zIGFuZCBwcm92aWRlcyBhIGNvbmZpZyBmdW5jdGlvblxuXHQqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLkFwaVByb3ZpZGVyXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9ICRwcm92aWRlXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gJGluamVjdG9yXG5cdCogQHJldHVybnMgbnVsbFxuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBcGlQcm92aWRlcigkcHJvdmlkZSwgJGluamVjdG9yKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0J25nSW5qZWN0JztcblxuXHR2YXIgQXBpID0gcmVxdWlyZSgnLi9hcGkuanMnKSgkcHJvdmlkZSwgJGluamVjdG9yKTtcblx0JHByb3ZpZGUucHJvdmlkZXIoJ2FwaScsIEFwaSk7XG59OyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuLyoqXG4gICogQG5hbWUgSW5zdGFudGlhdGVBcGlcbiAgKiBAZGVzYyBSZXR1cm5zIEFwaSBjb25zdHJ1Y3RvclxuICAqIEBuYW1lc3BhY2UgT2ZmaWNlQm90U0RLLkFwaVxuICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcbiAgKiBAcGFyYW0ge3Byb3ZpZGVyfSAkcHJvdmlkZVxuICAqIEBwYXJhbSB7cHJvdmlkZXJ9ICRpbmplY3RcbiAgKiBAcmV0dXJucyB7b2JqZWN0fSBhcGlcbiAgKiBAcmVxdWlyZXMgYW5ndWxhclxuICAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZUFwaSgkcHJvdmlkZSwgJGluamVjdCkge1xuICAnbmdJbmplY3QnO1xuXG4gIHZhciBBcGlFbmRwb2ludENvbmZpZyA9IHJlcXVpcmUoJy4vYXBpLWVuZHBvaW50LWNvbmZpZy5qcycpKCRpbmplY3QpO1xuICB2YXIgQXBpRW5kcG9pbnRDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vYXBpLWVuZHBvaW50LmpzJyk7XG4gIC8qKlxuICAgICogQGNvbnN0cnVjdG9yXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICovXG4gIGZ1bmN0aW9uIEFwaSgpIHtcbiAgICB0aGlzLmVuZHBvaW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgQXBpLnByb3RvdHlwZS5zZXRCYXNlUm91dGUgPSBzZXRCYXNlUm91dGU7XG4gIEFwaS5wcm90b3R5cGUuZW5kcG9pbnQgPSBlbmRwb2ludDtcbiAgQXBpLnByb3RvdHlwZS4kZ2V0ID0gWyckaW5qZWN0b3InLCd0cmFuc3BvcnQnLCdtb2RlbENhY2hlJywnJHRpbWVvdXQnLCBnZXRdO1xuXG4gIHJldHVybiBBcGk7XG4gIC8qKlxuICAgICogQGRlc2MgU2V0cyB0aGUgcm9vdCB1cmwgZm9yIHRoaXMgYXBpXG4gICAgKiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLLkFwaVxuICAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVcmxcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IHRoaXNcbiAgICAqL1xuICBmdW5jdGlvbiBzZXRCYXNlUm91dGUoYmFzZVVybCkge1xuICAgIHRoaXMuYmFzZVJvdXRlID0gYmFzZVVybDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgICogQGRlc2MgQ3JlYXRlcyBhIG5ldyBlbmRwb2ludCBjb25maWd1cmF0aW9ucyBhbmQgYXR0YWNoZXMgaXQgdG8gdGhpc1xuICAgICogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5BcGlcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlbmRwb2ludFxuICAgICogQHJldHVybnMge29iamVjdH0gbmV3RW5kcG9pbnRcbiAgICAqL1xuICBmdW5jdGlvbiBlbmRwb2ludChuYW1lKSB7XG4gICAgdmFyIGJhc2VSb3V0ZSA9IHRoaXMuYmFzZVJvdXRlO1xuICAgIHZhciBuZXdFbmRwb2ludCA9IG5ldyBBcGlFbmRwb2ludENvbmZpZygpO1xuICAgIHRoaXMuZW5kcG9pbnRzW25hbWVdID0gbmV3RW5kcG9pbnQ7XG4gICAgcmV0dXJuIG5ld0VuZHBvaW50O1xuICB9XG5cbiAgLyoqXG4gICAgKiBAZGVzYyBJbmplY3RvciBmdW5jdGlvbiB0aGF0IGFuZ3VsYXIgd2lsbCB1c2VcbiAgICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuQXBpXG4gICAgKiBAcGFyYW0ge3Byb3ZpZGVyfSAkaW5qZWN0b3JcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSB0cmFuc3BvcnRcbiAgICAqIEBwYXJhbSB7b2JqZWN0fSBtb2RlbENhY2hlXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBhcGlcbiAgICAqL1xuICBmdW5jdGlvbiBnZXQoJGluamVjdG9yLCB0cmFuc3BvcnQsIG1vZGVsQ2FjaGUpIHtcbiAgICB2YXIgYXBpID0ge307XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuZW5kcG9pbnRzLCBmdW5jdGlvbihlbmRwb2ludENvbmZpZywgbmFtZSkge1xuICAgICAgYXBpW25hbWVdID0gJGluamVjdG9yLmluc3RhbnRpYXRlKEFwaUVuZHBvaW50Q29uc3RydWN0b3IsIHtcbiAgICAgICAgYmFzZVJvdXRlOiBzZWxmLmJhc2VSb3V0ZSxcbiAgICAgICAgZW5kcG9pbnRDb25maWc6IGVuZHBvaW50Q29uZmlnLFxuICAgICAgICB0cmFuc3BvcnQgOiB0cmFuc3BvcnQsXG4gICAgICAgIGNhY2hlIDogbW9kZWxDYWNoZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXBpO1xuICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbW9kZWxDYWNoZVNlcnZpY2UoKSB7XG5cdHZhciBsID0gbG9jYWxTdG9yYWdlO1xuXG5cdHRoaXMucHV0ID0gcHV0O1xuXHR0aGlzLmdldCA9IGdldDtcblx0dGhpcy5pbnZhbGlkYXRlID0gaW52YWxpZGF0ZTtcblxuXHRmdW5jdGlvbiBwdXQob2JqZWN0LCBrZXkpIHtcblx0XHR2YXIgb2JqZWN0SWQgPSBrZXkgfHwgb2JqZWN0Ll9pZDtcblx0XHRsLnNldEl0ZW0ob2JqZWN0SWQsIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuXHRcdHJldHVybiBvYmplY3RJZDtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldChvYmplY3RJZCwgY29uc3RydWN0b3IpIHtcblx0XHRpZiAoIW9iamVjdElkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBjYWNoZWRJdGVtO1xuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGwuZ2V0SXRlbShvYmplY3RJZCkpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNhY2hlZEl0ZW0gPSBKU09OLnBhcnNlKCBsLmdldEl0ZW0ob2JqZWN0SWQpICk7XG5cdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0aW52YWxpZGF0ZShvYmplY3RJZCk7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNvbnN0cnVjdG9yKSB7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3IoY2FjaGVkSXRlbSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBjYWNoZWRJdGVtO1xuXHRcdH1cblx0XHRcblx0fVxuXG5cdGZ1bmN0aW9uIGludmFsaWRhdGUob2JqZWN0SWQpIHtcblx0XHRpZiAoIW9iamVjdElkKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiBsLnJlbW92ZUl0ZW0ob2JqZWN0SWQpO1xuXHR9XG59IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgbW9kdWxlTmFtZSA9ICdzZGstY29yZSc7XG4vKipcblx0KiBAbmFtZSBzZGstY29yZVxuXHQqIEBkZXNjIE9mZmljZUJvdFNESyBsaWJyYXJ5XG5cdCogQG5hbWVzcGFjZSBPZmZpY2VCb3RTREtcblx0KiBAcmV0dXJucyB7c3RyaW5nfSBtb2R1bGVOYW1lXG5cdCogQHJlcXVpcmVzIGFuZ3VsYXJcblx0Ki9cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcblx0LnNlcnZpY2UoJ3RyYW5zcG9ydCcsIHJlcXVpcmUoJy4vdHJhbnNwb3J0LmpzJykpXG5cdC5zZXJ2aWNlKCdtb2RlbENhY2hlJywgcmVxdWlyZSgnLi9jYWNoZS5qcycpKVxuXHQuY29uZmlnKHJlcXVpcmUoJy4vYXBpLXByb3ZpZGVyLmpzJykpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gbW9kdWxlTmFtZTsiLCJ2YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBoYXNoID0gcmVxdWlyZSgnb2JqZWN0LWhhc2gnKTtcblxuLyoqXG5cdCogQG5hbWUgSW5zdGFudGlhdGVNb2RlbFxuXHQqIEBkZXNjIFJldHVybnMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBNb2RlbCBvYmplY3Rcblx0KiBAbmFtZXNwYWNlIE1vZGVsXG5cdCogQG1lbWJlcm9mIE9mZmljZUJvdFNES1xuXHQqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIE1vZGFsIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgd2l0aFxuXHQqIEByZXR1cm5zIHtvYmplY3R9IG1vZGVsXG5cdCogQHJlcXVpcmVzIGV4dGVuZFxuXHQqIEByZXF1aXJlcyBhbmd1bGFyXG5cdCovIFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBJbnN0YW50aWF0ZU1vZGVsKGRhdGEsIHRyYW5zcG9ydCwgYmFzZVJvdXRlLCBlbmRwb2ludENvbmZpZywgbW9kZWxDYWNoZSkge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBUaGlzIGlzIG91ciBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGF0IHRoZSBlbmQgb2YgdGhpcyBmaWxlLlxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5Nb2RlbFxuXHRcdCogQHBhcmFtIHtvYmplY3R9IGRhdGFcblx0XHQqIEByZXR1cm5zIHtvYmplY3R9XG5cdFx0Ki9cblx0dmFyIE1vZGVsID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdGV4dGVuZCh0cnVlLCB0aGlzLCBkYXRhKTtcblx0XHR0aGlzWydAaGFzaCddID0gaGFzaChhbmd1bGFyLnRvSnNvbih0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH07XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTYXZlcyB0aGUgY3VycmVudCBtb2RlbCdzIHJlcHJlc2VudGF0aW9uIHRvIHRoZSBBUEkuIFRoZSBtb2RlbCBNVVNUXG5cdFx0KiBoYXZlIGEgdmFsaWQgSFJFRiB0YWcgb3IgdGhpcyBjYWxsIHdpbGwgZmFpbFxuXHRcdCogQG1lbWJlcm9mIE9mZmljZUJvdFNESy5Nb2RlbFxuXHRcdCogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcblx0XHQqIEByZXR1cm5zIHtudWxsfVxuXHRcdCovXG5cdE1vZGVsLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oY2IpIHtcblx0ICB2YXIgY2FsbGJhY2sgPSBjYiB8fCBhbmd1bGFyLm5vb3A7XG5cdCAgdmFyIG1vZGVsID0gdGhpcztcblxuXHQgIGRlbGV0ZSBtb2RlbFsnQGhhc2gnXTtcblx0XHR2YXIgdG1wID0gSlNPTi5wYXJzZSggYW5ndWxhci50b0pzb24obW9kZWwpICk7XG5cdFx0dmFyIG1ldGhvZCA9ICdwdXQnO1xuXHRcdHZhciBocmVmID0gdG1wWydAaHJlZiddO1xuXG5cdCAgdHJhbnNwb3J0XG5cdFx0ICAucmVxdWVzdChocmVmLCBtZXRob2QsIHRtcCwge30sIHt9KVxuXHQgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0ICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmRhdGEpIHtcblx0ICAgICAgXHRleHRlbmQodHJ1ZSwgbW9kZWwsIHJlc3BvbnNlLmRhdGEpO1xuXHQgICAgICBcdG1vZGVsWydAaGFzaCddID0gaGFzaChhbmd1bGFyLnRvSnNvbihtb2RlbCkpO1xuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgIH0sIGZ1bmN0aW9uKGVycikge1xuXHQgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcblx0ICAgIH0pO1xuXHR9O1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgRG9lcyBhIHNpbXBsZSBkaXJ0eSBjaGVjayBieSBjYWxjdWxhdGluZyBhIG5ldyBoYXNoIGFuZCBjb21wYXJpbmcgaXQgdG9cblx0XHQqIHRoZSBvcmlnaW5hbFxuXHRcdCovXG5cdE1vZGVsLnByb3RvdHlwZS5pc0RpcnR5ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGN1cnJlbnRIYXNoID0gdGhpc1snQGhhc2gnXTtcblx0XHR2YXIgY3VycmVudE1vZGVsID0gSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkodGhpcykgKTtcblx0XHRkZWxldGUgY3VycmVudE1vZGVsWydAaGFzaCddO1xuXHRcdHZhciBuZXdIYXNoID0gaGFzaChhbmd1bGFyLnRvSnNvbihjdXJyZW50TW9kZWwpKTtcblx0XHRyZXR1cm4gbmV3SGFzaCAhPT0gY3VycmVudEhhc2g7XG5cdH07XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBSZW1vdmVzIHRoaXMgbW9kZWwgZnJvbSB0aGUgQVBJLiBUaGUgbW9kZWwgTVVTVFxuXHRcdCogaGF2ZSBhIHZhbGlkIEhSRUYgdGFnIG9yIHRoaXMgY2FsbCB3aWxsIGZhaWxcblx0XHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuTW9kZWxcblx0XHQqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG5cdFx0KiBAcmV0dXJucyB7bnVsbH1cblx0XHQqL1xuXHRNb2RlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oY2IpIHtcblx0ICB2YXIgY2FsbGJhY2sgPSBjYiB8fCBhbmd1bGFyLm5vb3A7XG5cdCAgdmFyIG1vZGVsID0gdGhpcztcblxuXHQgIHJldHVybiB0cmFuc3BvcnRcblx0ICBcdC5kZWxldGUoIG1vZGVsWydAaHJlZiddIClcblx0ICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdCAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXNwb25zZS5kYXRhKTtcblx0ICAgIH0sIGZ1bmN0aW9uKGVycikge1xuXHQgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcblx0ICAgIH0pO1xuXHR9O1xuXHRcblx0Ly9GaW5hbGx5LCBzZW5kIHRoZSBuZXcgbW9kZWwgYmFja1xuXHR2YXIgbmV3TW9kZWwgPSBuZXcgTW9kZWwoZGF0YSk7XG5cdGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZW5kcG9pbnRDb25maWcuX2NsYXNzRGVmKSB7XG4gICAgdmFyIG1vZGVsSW5zdGFuY2UgPSBuZXcgZW5kcG9pbnRDb25maWcuX2NsYXNzRGVmKG5ld01vZGVsKTtcbiAgICBmb3IgKHZhciBpIGluIG5ld01vZGVsKSB7XG4gICAgXHRpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIG5ld01vZGVsW2ldKSB7XG4gICAgXHRcdG1vZGVsSW5zdGFuY2VbaV0gPSBuZXdNb2RlbFtpXTtcbiAgICBcdH1cbiAgICB9XG4gICAgcmV0dXJuIG1vZGVsSW5zdGFuY2U7XG5cdH1cblx0cmV0dXJuIG5ld01vZGVsO1xufTsiLCIvKipcblx0KiBAbmFtZSBodHRwVHJhbnNwb3J0XG5cdCogQGRlc2MgQWJzdHJhY3Rpb24gbGF5ZXIgZm9yIG91ciBjb25uZWN0aW9ucyBpbnNpZGUgb2YgdGhlIGFwaSBwcm92aWRlci5cblx0KiBUaGlzIHdpbGwgYWxsb3cgdXMgdG8gZWFzaWx5IHJlcGxhY2UgdGhpcyBkb3duIHRoZSBsaW5lIHdpdGggc29tZXRoaW5nXG5cdCogZWxzZSAobGlrZSBzb2NrZXRzKSBpZiB3ZSBkZWNpZGUgdG9cblx0KiBAbWVtYmVyb2YgT2ZmaWNlQm90U0RLXG5cdCogQG5hbWVzcGFjZSBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkaHR0cFxuXHQqIEByZXR1cm5zIHtvYmplY3R9XG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGh0dHBUcmFuc3BvcnQoJGh0dHApIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdHZhciBzZWxmID0ge307XG5cdHNlbGYucmVxdWVzdCA9IHJlcXVlc3Q7XG5cdHNlbGYuZ2V0ID0gZ2V0O1xuXHRzZWxmLnBvc3QgPSBwb3N0O1xuXHRzZWxmLnB1dCA9IHB1dDtcblx0c2VsZi5kZWxldGUgPSByZW1vdmU7XG5cdHNlbGYucGF0Y2ggPSBwYXRjaDtcblx0c2VsZi5oZWFkID0gaGVhZDtcblx0c2VsZi5vcHRpb25zID0gb3B0aW9ucztcblx0XG5cdHJldHVybiBzZWxmO1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgVGhpcyBtZXRob2QgYnVuZGxlcyBldmVyeXRoaW5nIHVwIGludG8gYW4gJGh0dHAgcmVxdWVzdFxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHJlcXVlc3QodXJsLCBtZXRob2QsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdHVybCA6IHVybCxcblx0XHRcdG1ldGhvZCA6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0ZGF0YSA6IGRhdGEsXG5cdFx0XHRwYXJhbXMgOiBxdWVyeSxcblx0XHRcdGhlYWRlcnMgOiBoZWFkZXJzXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciByZXF1ZXN0KHVybCwgJ0dFVCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gZ2V0KHVybCwgcXVlcnksIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdHRVQnLCB7fSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdHRVQnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcG9zdCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUE9TVCcsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnUFVUJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBkYXRhXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHB1dCh1cmwsIGRhdGEsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnUFVUJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdERUxFVEUnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IHF1ZXJ5XG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGhlYWRlcnNcblx0XHQqIEByZXR1cm5zIHtwcm9taXNlfVxuXHRcdCovXG5cdGZ1bmN0aW9uIHJlbW92ZSh1cmwsIHF1ZXJ5LCBoZWFkZXJzKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3QodXJsLCAnREVMRVRFJywge30sIHF1ZXJ5LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnSEVBRCcsIC4uLilcblx0XHQqIEBtZW1iZXJvZiBPZmZpZUJvdFNESy5UcmFuc3BvcnRcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB1cmxcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gaGVhZCh1cmwsIGhlYWRlcnMpIHtcblx0XHRyZXR1cm4gcmVxdWVzdCh1cmwsICdIRUFEJywge30sIHt9LCBoZWFkZXJzKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgU2hvcnRjdXQgZnVuY3Rpb24gZm9yIHJlcXVlc3QodXJsLCAnUEFUQ0gnLCAuLi4pXG5cdFx0KiBAbWVtYmVyb2YgT2ZmaWVCb3RTREsuVHJhbnNwb3J0XG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdXJsXG5cdFx0KiBAcGFyYW0ge29iamVjdD19IGRhdGFcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gcXVlcnlcblx0XHQqIEBwYXJhbSB7b2JqZWN0PX0gaGVhZGVyc1xuXHRcdCogQHJldHVybnMge3Byb21pc2V9XG5cdFx0Ki9cblx0ZnVuY3Rpb24gcGF0Y2godXJsLCBkYXRhLCBxdWVyeSwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ1BBVENIJywgZGF0YSwgcXVlcnksIGhlYWRlcnMpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgcmVxdWVzdCh1cmwsICdPUFRJT05TJywgLi4uKVxuXHRcdCogQG1lbWJlcm9mIE9mZmllQm90U0RLLlRyYW5zcG9ydFxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHVybFxuXHRcdCogQHBhcmFtIHtvYmplY3Q9fSBoZWFkZXJzXG5cdFx0KiBAcmV0dXJucyB7cHJvbWlzZX1cblx0XHQqL1xuXHRmdW5jdGlvbiBvcHRpb25zKHVybCwgaGVhZGVycykge1xuXHRcdHJldHVybiByZXF1ZXN0KHVybCwgJ09QVElPTlMnLCB7fSwge30sIGhlYWRlcnMpO1xuXHR9XG59OyIsIi8qKlxuXHQqIEBuYW1lIHV0aWxzXG5cdCogQGRlc2MgVXRpbHMgbGlicmFyeVxuXHQqIEByZXR1cm5zIHtvYmplY3R9IHNlbGZcblx0KiBAbmFtZXNwYWNlIE9mZmljZUJvdFNESy5VdGlsc1xuXHQqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREtcblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdXRpbHMoKSB7XG5cdHZhciBzZWxmID0ge307XG5cdHNlbGYucmVtb3ZlID0gcmVtb3ZlO1xuXG5cdHJldHVybiBzZWxmO1xuXG5cdC8qKlxuXHQgICogQHByaXZhdGVcblx0ICAqIEBkZXNjIEhlbHBlciBmdW5jdGlvbiB0byBudWxsaWZ5IG9iamVjdHMgYWZ0ZXIgLnJlbW92ZSBpcyBjYWxsZWRcblx0ICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtIFRoaW5nIHRvIGJlIHJlbW92ZWRcblx0ICAqIEByZXR1cm5zIHtib29sZWFufSBzdGF0dXNcblx0ICAqIEBtZW1iZXJvZiBPZmZpY2VCb3RTREsuVXRpbHNcblx0ICAqL1xuXHRmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuXHQgIGZvciAodmFyIGkgaW4gaXRlbSkge1xuXHQgICAgaXRlbVtpXSA9IHVuZGVmaW5lZDtcblx0ICAgIGRlbGV0ZSBpdGVtW2ldO1xuXHQgIH1cblx0ICBpdGVtID0gdW5kZWZpbmVkO1xuXHQgIGRlbGV0ZSBpdGVtO1xuXHQgIHJldHVybiB0cnVlO1xuXHR9XG59OyJdfQ==
