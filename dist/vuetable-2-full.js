/**
 * vuetable-2 v2.0.0-beta.4
 * https://github.com/ratiw/vuetable-2
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vuetable"] = factory();
	else
		root["Vuetable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 103);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(52);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(34)('wks')
  , uid        = __webpack_require__(19)
  , Symbol     = __webpack_require__(3).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(10)
  , IE8_DOM_DEFINE = __webpack_require__(56)
  , toPrimitive    = __webpack_require__(37)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(57)
  , defined = __webpack_require__(28);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(5)
  , createDesc = __webpack_require__(14);
module.exports = __webpack_require__(8) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(61)
  , enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(95),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableFieldMixin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33b355c9", Component.options)
  } else {
    hotAPI.reload("data-v-33b355c9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , core      = __webpack_require__(7)
  , ctx       = __webpack_require__(54)
  , hide      = __webpack_require__(9)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(163)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(106);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(105);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(101),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetablePaginationMixin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32ce7b55", Component.options)
  } else {
    hotAPI.reload("data-v-32ce7b55", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(1);
var normalizeHeaderName = __webpack_require__(86);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(48);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(48);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)))

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  table: {
    tableWrapper: '',
    tableHeaderClass: 'fixed',
    tableBodyClass: 'fixed',
    tableClass: 'ui blue selectable unstackable celled table',
    loadingClass: 'loading',
    ascendingIcon: 'blue chevron up icon',
    descendingIcon: 'blue chevron down icon',
    ascendingClass: 'sorted-asc',
    descendingClass: 'sorted-desc',
    sortableIcon: 'grey sort icon',
    handleIcon: 'grey sidebar icon'
  },

  pagination: {
    wrapperClass: 'ui right floated pagination menu',
    activeClass: 'active large',
    disabledClass: 'disabled',
    pageClass: 'item',
    linkClass: 'icon item',
    paginationClass: 'ui bottom attached segment grid',
    paginationInfoClass: 'left floated left aligned six wide column',
    dropdownClass: 'ui search dropdown',
    icons: {
      first: 'angle double left icon',
      prev: 'left chevron icon',
      next: 'right chevron icon',
      last: 'angle double right icon'
    }
  },

  paginationInfo: {
    infoClass: 'left floated left aligned six wide column'
  }
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(53);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f
  , has = __webpack_require__(4)
  , TAG = __webpack_require__(2)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys')
  , uid    = __webpack_require__(19);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(17);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(3)
  , core           = __webpack_require__(7)
  , LIBRARY        = __webpack_require__(30)
  , wksExt         = __webpack_require__(39)
  , defineProperty = __webpack_require__(5).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(161)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(91),
  /* template */
  __webpack_require__(157),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableColGutter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetableColGutter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-90d988ee", Component.options)
  } else {
    hotAPI.reload("data-v-90d988ee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(92),
  /* template */
  __webpack_require__(154),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableFieldCheckbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetableFieldCheckbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70ca67ab", Component.options)
  } else {
    hotAPI.reload("data-v-70ca67ab", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(93),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableFieldCheckboxMixin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-84209574", Component.options)
  } else {
    hotAPI.reload("data-v-84209574", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(94),
  /* template */
  __webpack_require__(155),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableFieldHandle.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetableFieldHandle.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-795318e0", Component.options)
  } else {
    hotAPI.reload("data-v-795318e0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(96),
  /* template */
  __webpack_require__(149),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableFieldSequence.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetableFieldSequence.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-037594a9", Component.options)
  } else {
    hotAPI.reload("data-v-037594a9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(100),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetablePaginationInfoMixin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-845c4772", Component.options)
  } else {
    hotAPI.reload("data-v-845c4772", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(102),
  /* template */
  __webpack_require__(156),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableRowHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetableRowHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a067856", Component.options)
  } else {
    hotAPI.reload("data-v-7a067856", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 47 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var settle = __webpack_require__(78);
var buildURL = __webpack_require__(81);
var parseHeaders = __webpack_require__(87);
var isURLSameOrigin = __webpack_require__(85);
var createError = __webpack_require__(51);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(80);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(83);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(77);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(111);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(17)
  , document = __webpack_require__(3).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(11)(function(){
  return Object.defineProperty(__webpack_require__(55)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(27);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(30)
  , $export        = __webpack_require__(16)
  , redefine       = __webpack_require__(62)
  , hide           = __webpack_require__(9)
  , has            = __webpack_require__(4)
  , Iterators      = __webpack_require__(12)
  , $iterCreate    = __webpack_require__(121)
  , setToStringTag = __webpack_require__(32)
  , getPrototypeOf = __webpack_require__(130)
  , ITERATOR       = __webpack_require__(2)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(10)
  , dPs         = __webpack_require__(127)
  , enumBugKeys = __webpack_require__(29)
  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(55)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(117).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(61)
  , hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(4)
  , toIObject    = __webpack_require__(6)
  , arrayIndexOf = __webpack_require__(113)(false)
  , IE_PROTO     = __webpack_require__(33)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(35)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(131)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(58)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 65 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(147).setImmediate))

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(159)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(89),
  /* template */
  __webpack_require__(152),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/Vuetable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Vuetable.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5cc42bfc", Component.options)
  } else {
    hotAPI.reload("data-v-5cc42bfc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(97),
  /* template */
  __webpack_require__(153),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetablePagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetablePagination.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a9dd43c", Component.options)
  } else {
    hotAPI.reload("data-v-6a9dd43c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(98),
  /* template */
  __webpack_require__(151),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetablePaginationDropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetablePaginationDropdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-397c17ed", Component.options)
  } else {
    hotAPI.reload("data-v-397c17ed", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(99),
  /* template */
  __webpack_require__(158),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetablePaginationInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetablePaginationInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-910bb7ec", Component.options)
  } else {
    hotAPI.reload("data-v-910bb7ec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(72);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var bind = __webpack_require__(52);
var Axios = __webpack_require__(74);
var defaults = __webpack_require__(24);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(49);
axios.CancelToken = __webpack_require__(73);
axios.isCancel = __webpack_require__(50);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(88);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(49);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(24);
var utils = __webpack_require__(1);
var InterceptorManager = __webpack_require__(75);
var dispatchRequest = __webpack_require__(76);
var isAbsoluteURL = __webpack_require__(84);
var combineURLs = __webpack_require__(82);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var transformData = __webpack_require__(79);
var isCancel = __webpack_require__(50);
var defaults = __webpack_require__(24);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(51);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VuetableRowHeader__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VuetableRowHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__VuetableRowHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VuetableColGroup__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VuetableColGroup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__VuetableColGroup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VuetableCssSemanticUI_js__ = __webpack_require__(25);











/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Vuetable',

  components: {
    VuetableRowHeader: __WEBPACK_IMPORTED_MODULE_5__VuetableRowHeader___default.a,
    VuetableColGroup: __WEBPACK_IMPORTED_MODULE_6__VuetableColGroup___default.a
  },

  props: {
    fields: {
      type: Array,
      required: true
    },
    loadOnStart: {
      type: Boolean,
      default: true
    },
    apiUrl: {
      type: String,
      default: ''
    },
    httpMethod: {
      type: String,
      default: 'get',
      validator: function validator(value) {
        return ['get', 'post'].indexOf(value) > -1;
      }
    },
    reactiveApiUrl: {
      type: Boolean,
      default: true
    },
    apiMode: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Array, Object],
      default: null
    },
    dataManager: {
      type: Function,
      default: null
    },
    dataPath: {
      type: String,
      default: 'data'
    },
    paginationPath: {
      type: String,
      default: 'links.pagination'
    },
    queryParams: {
      type: [Object, Function],
      default: function _default() {
        return {
          sort: 'sort',
          page: 'page',
          perPage: 'per_page'
        };
      }
    },
    appendParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    httpOptions: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    httpFetch: {
      type: Function,
      default: null
    },
    perPage: {
      type: Number,
      default: 10
    },

    initialPage: {
      type: Number,
      default: 1
    },

    firstPage: {
      type: Number,
      default: 1
    },
    sortOrder: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    multiSort: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: String,
      default: null
    },

    multiSortKey: {
      type: String,
      default: 'alt'
    },
    rowClass: {
      type: [String, Function],
      default: ''
    },
    detailRowComponent: {
      type: [String, Object],
      default: ''
    },
    detailRowTransition: {
      type: String,
      default: ''
    },
    detailRowClass: {
      type: [String, Function],
      default: 'vuetable-detail-row'
    },
    detailRowOptions: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    css: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    minRows: {
      type: Number,
      default: 0
    },
    silent: {
      type: Boolean,
      default: false
    },
    noDataTemplate: {
      type: String,
      default: function _default() {
        return 'No Data Available';
      }
    },
    showSortIcons: {
      type: Boolean,
      default: true
    },
    headerRows: {
      type: Array,
      default: function _default() {
        return ['VuetableRowHeader'];
      }
    },
    transform: {
      type: Function,
      default: null
    },
    sortParams: {
      type: Function,
      default: null
    },
    fieldPrefix: {
      type: String,
      default: function _default() {
        return 'vuetable-field-';
      }
    },
    eventPrefix: {
      type: String,
      default: function _default() {
        return 'vuetable:';
      }
    }
  },

  data: function data() {
    return {
      tableFields: [],
      tableData: null,
      tablePagination: null,
      currentPage: this.initialPage,
      selectedTo: [],
      visibleDetailRows: [],
      lastScrollPosition: 0,
      scrollBarWidth: '17px',
      scrollVisible: false,
      $_css: {}
    };
  },


  computed: {
    version: function version() {
      return "2.0.0-beta.4";
    },
    useDetailRow: function useDetailRow() {
      if (!this.dataIsAvailable) return false;

      return this.detailRowComponent !== '';
    },
    dataIsAvailable: function dataIsAvailable() {
      if (!this.tableData) return false;

      return this.tableData.length > 0;
    },
    hasRowIdentifier: function hasRowIdentifier() {
      return this.tableData && typeof this.tableData[0][this.trackBy] !== 'undefined';
    },
    countVisibleFields: function countVisibleFields() {
      return this.tableFields.filter(function (field) {
        return field.visible;
      }).length;
    },
    countTableData: function countTableData() {
      if (this.tableData === null) {
        return 0;
      }
      return this.tableData.length;
    },
    displayEmptyDataRow: function displayEmptyDataRow() {
      return this.countTableData === 0 && this.noDataTemplate.length > 0;
    },
    lessThanMinRows: function lessThanMinRows() {
      if (this.tableData === null || this.tableData.length === 0) {
        return true;
      }
      return this.tableData.length < this.minRows;
    },
    blankRows: function blankRows() {
      if (this.tableData === null || this.tableData.length === 0) {
        return this.minRows;
      }
      if (this.tableData.length >= this.minRows) {
        return 0;
      }

      return this.minRows - this.tableData.length;
    },
    isApiMode: function isApiMode() {
      return this.apiMode;
    },
    isDataMode: function isDataMode() {
      return !this.apiMode;
    },
    isFixedHeader: function isFixedHeader() {
      return this.tableHeight != null;
    },
    vuetable: function vuetable() {
      return this;
    }
  },

  created: function created() {
    var _this = this;

    this.mergeCss();
    this.normalizeFields();
    this.normalizeSortOrder();
    this.$nextTick(function () {
      _this.fireEvent('initialized', _this.tableFields);
    });
  },
  mounted: function mounted() {
    if (this.loadOnStart) {
      this.loadData();
    }

    if (this.isFixedHeader) {
      this.scrollBarWidth = this.getScrollBarWidth() + 'px';

      var elem = this.$el.getElementsByClassName('vuetable-body-wrapper')[0];
      if (elem != null) {
        elem.addEventListener('scroll', this.handleScroll);
      }
    }
  },
  destroyed: function destroyed() {
    var elem = this.$el.getElementsByClassName('vuetable-body-wrapper')[0];
    if (elem != null) {
      elem.removeEventListener('scroll', this.handleScroll);
    }
  },


  watch: {
    multiSort: function multiSort(newVal, oldVal) {
      if (newVal === false && this.sortOrder.length > 1) {
        this.sortOrder.splice(1);
        this.loadData();
      }
    },
    apiUrl: function apiUrl(newVal, oldVal) {
      if (this.reactiveApiUrl && newVal !== oldVal) this.refresh();
    },
    data: function data(newVal, oldVal) {
      this.setData(newVal);
    },
    tableHeight: function tableHeight(newVal, oldVal) {
      this.checkScrollbarVisibility();
    },
    fields: function fields(newVal, oldVal) {
      this.normalizeFields();
    },
    perPage: function perPage(newVal, oldVal) {
      this.reload();
    }
  },

  methods: {
    getScrollBarWidth: function getScrollBarWidth() {
      var outer = document.createElement('div');
      var inner = document.createElement('div');

      outer.style.visibility = 'hidden';
      outer.style.width = '100px';

      inner.style.width = '100%';

      outer.appendChild(inner);
      document.body.appendChild(outer);

      var widthWithoutScrollbar = outer.offsetWidth;
      outer.style.overflow = 'scroll';
      var widthWithScrollbar = inner.offsetWidth;
      document.body.removeChild(outer);

      return widthWithoutScrollbar - widthWithScrollbar;
    },
    handleScroll: function handleScroll(e) {
      var horizontal = e.currentTarget.scrollLeft;

      if (horizontal != this.lastScrollPosition) {
        var header = this.$el.getElementsByClassName('vuetable-head-wrapper')[0];
        if (header != null) {
          header.scrollLeft = horizontal;
        }
        this.lastScrollPosition = horizontal;
      }
    },
    mergeCss: function mergeCss() {
      this.$_css = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_7__VuetableCssSemanticUI_js__["a" /* default */].table, this.css);
    },
    bodyClass: function bodyClass(base, field) {
      return [base, field.dataClass];
    },
    normalizeFields: function normalizeFields() {
      var _this2 = this;

      if (typeof this.fields === 'undefined') {
        this.warn('You need to provide "fields" prop.');
        return;
      }

      this.tableFields = [];

      this.fields.forEach(function (field, i) {
        _this2.tableFields.push(_this2.newField(field, i));
      });
    },
    newField: function newField(field, index) {
      var defaultField = {
        name: '',

        titleClass: '',
        dataClass: '',
        sortField: null,
        formatter: null,
        visible: true,
        width: null,
        $_index: index
      };

      if (typeof field === 'string') {
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default()({}, defaultField, {
          name: this.normalizeFieldName(field),
          title: this.makeTitle(field)
        });
      }

      var obj = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default()({}, defaultField, field);
      obj.name = this.normalizeFieldName(obj.name);
      if (obj.title === undefined) {
        obj.title = this.makeTitle(obj.name);
      }
      if (obj.formatter !== null && typeof obj.formatter !== 'function') {
        console.error(obj.name + ' field formatter must be a function');
        obj.formatter = null;
      }
      return obj;
    },
    normalizeFieldName: function normalizeFieldName(fieldName) {
      if (fieldName instanceof Object) return fieldName;

      return typeof fieldName === 'string' && fieldName.replace('__', this.fieldPrefix);
    },
    setData: function setData(data) {
      var _this3 = this;

      if (data === null || typeof data === 'undefined') return;

      this.fireEvent('loading');

      if (Array.isArray(data)) {
        this.tableData = data;
        this.fireEvent('loaded');
        return;
      }

      this.tableData = this.getObjectValue(data, this.dataPath, null);
      this.tablePagination = this.getObjectValue(data, this.paginationPath, null);

      this.$nextTick(function () {
        _this3.checkIfRowIdentifierExists();
        _this3.updateHeader();
        _this3.fireEvent('pagination-data', _this3.tablePagination);
        _this3.fireEvent('loaded');
      });
    },
    checkIfRowIdentifierExists: function checkIfRowIdentifierExists() {
      if (!this.dataIsAvailable) return;

      if (!this.hasRowIdentifier) {
        this.warn('Invalid your data! Use "track-by" prop to specify.');
        return false;
      }

      return true;
    },
    makeTitle: function makeTitle(str) {
      if (this.isFieldComponent(str)) {
        return '';
      }

      return this.titleCase(str.replace('.', ' '));
    },
    getFieldTitle: function getFieldTitle(field) {
      if (typeof field.title === 'function') return field.title();

      return field.title;
    },
    renderNormalField: function renderNormalField(field, item) {
      return this.hasFormatter(field) ? this.callFormatter(field, item) : this.getObjectValue(item, field.name, '');
    },
    isFieldComponent: function isFieldComponent(fieldName) {
      if (fieldName instanceof Object) {
        return true;
      }

      return fieldName.slice(0, this.fieldPrefix.length) === this.fieldPrefix || fieldName.slice(0, 2) === '__';
    },
    isFieldSlot: function isFieldSlot(fieldName) {
      return typeof this.$scopedSlots[fieldName] !== 'undefined';
    },
    titleCase: function titleCase(str) {
      return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    },
    camelCase: function camelCase(str) {
      var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';

      return str.split(delimiter).map(function (item) {
        return self.titleCase(item);
      }).join('');
    },
    loadData: function loadData() {
      var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.loadSuccess;
      var failed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.loadFailed;

      if (this.isDataMode) {
        this.handleDataMode();
        return;
      }

      this.fireEvent('loading');

      this.httpOptions['params'] = this.getAppendParams(this.getAllQueryParams());

      return this.fetch(this.apiUrl, this.httpOptions).then(success, failed).catch(function () {
        return failed();
      });
    },
    fetch: function fetch(apiUrl, httpOptions) {
      if (this.httpFetch) {
        return this.httpFetch(apiUrl, httpOptions);
      }

      if (this.httpMethod === 'get') {
        return __WEBPACK_IMPORTED_MODULE_4_axios___default.a.get(apiUrl, httpOptions);
      } else {
        var params = httpOptions.params;
        delete httpOptions.params;
        return __WEBPACK_IMPORTED_MODULE_4_axios___default.a.post(apiUrl, params, httpOptions);
      }
    },
    loadSuccess: function loadSuccess(response) {
      var _this4 = this;

      this.fireEvent('load-success', response);

      var body = this.transform ? this.transform(response.data) : response.data;

      this.tableData = this.getObjectValue(body, this.dataPath, null);
      this.tablePagination = this.getObjectValue(body, this.paginationPath, null);

      if (this.tablePagination === null) {
        this.warn('vuetable: pagination-path "' + this.paginationPath + '" not found. ' + 'It looks like the data returned from the server does not have pagination information ' + "or you may have set it incorrectly.\n" + 'You can explicitly suppress this warning by setting pagination-path="".');
      }

      this.$nextTick(function () {
        _this4.checkIfRowIdentifierExists();
        _this4.updateHeader();
        _this4.fireEvent('pagination-data', _this4.tablePagination);
        _this4.fireEvent('loaded');
      });
    },
    updateHeader: function updateHeader() {
      setTimeout(this.checkScrollbarVisibility, 80);
    },
    checkScrollbarVisibility: function checkScrollbarVisibility() {
      var _this5 = this;

      this.$nextTick(function () {
        var elem = _this5.$el.getElementsByClassName('vuetable-body-wrapper')[0];
        if (elem != null) {
          _this5.scrollVisible = elem.scrollHeight > elem.clientHeight;
          _this5.fireEvent('scrollbar-visible', _this5.scrollVisible);
        }
      });
    },
    loadFailed: function loadFailed(response) {
      console.error('load-error', response);
      this.fireEvent('load-error', response);
      this.fireEvent('loaded');
    },
    fireEvent: function fireEvent() {
      if (arguments.length === 1) {
        return this.$emit(this.eventPrefix + arguments[0]);
      }

      if (arguments.length > 1) {
        var args = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(arguments);
        args[0] = this.eventPrefix + args[0];
        return this.$emit.apply(this, args);
      }
    },
    warn: function warn(msg) {
      if (!this.silent) {
        console.warn(msg);
      }
    },
    getAllQueryParams: function getAllQueryParams() {
      var params = {};

      if (typeof this.queryParams === 'function') {
        params = this.queryParams(this.sortOrder, this.currentPage, this.perPage);
        return (typeof params === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(params)) === 'object' ? params : {};
      }

      params[this.queryParams.sort] = this.getSortParam();
      params[this.queryParams.page] = this.currentPage;
      params[this.queryParams.perPage] = this.perPage;

      return params;
    },
    getSortParam: function getSortParam() {
      if (!this.sortOrder || this.sortOrder.field == '') {
        return '';
      }

      if (typeof this.sortParams === 'function') {
        return this.sortParams(this.sortOrder);
      }

      return this.getDefaultSortParam();
    },
    getDefaultSortParam: function getDefaultSortParam() {
      return this.sortOrder.map(function (item) {
        return item.sortField + '|' + item.direction;
      }).join(',');
    },
    getAppendParams: function getAppendParams(params) {
      for (var x in this.appendParams) {
        params[x] = this.appendParams[x];
      }

      return params;
    },
    isSortable: function isSortable(field) {
      return field.sortField !== null;
    },
    currentSortOrderPosition: function currentSortOrderPosition(field) {
      if (!this.isSortable(field)) {
        return false;
      }

      for (var i = 0; i < this.sortOrder.length; i++) {
        if (this.fieldIsInSortOrderPosition(field, i)) {
          return i;
        }
      }

      return false;
    },
    fieldIsInSortOrderPosition: function fieldIsInSortOrderPosition(field, i) {
      return this.sortOrder[i].field === field.name && this.sortOrder[i].sortField === field.sortField;
    },
    orderBy: function orderBy(field, event) {
      if (!this.isSortable(field)) return;

      var key = this.multiSortKey.toLowerCase() + 'Key';

      if (this.multiSort && event[key]) {
        this.multiColumnSort(field);
      } else {
        this.singleColumnSort(field);
      }

      this.currentPage = this.firstPage;
      if (this.apiMode || this.dataManager) {
        this.loadData();
      }
    },
    addSortColumn: function addSortColumn(field, direction) {
      this.sortOrder.push({
        field: field.name,
        sortField: field.sortField,
        direction: 'asc'
      });
    },
    removeSortColumn: function removeSortColumn(index) {
      this.sortOrder.splice(index, 1);
    },
    setSortColumnDirection: function setSortColumnDirection(index, direction) {
      this.sortOrder[index].direction = direction;
    },
    multiColumnSort: function multiColumnSort(field) {
      var i = this.currentSortOrderPosition(field);

      if (i === false) {
        this.addSortColumn(field, 'asc');
      } else {
        if (this.sortOrder[i].direction === 'asc') {
          this.setSortColumnDirection(i, 'desc');
        } else {
          this.removeSortColumn(i);
        }
      }
    },
    singleColumnSort: function singleColumnSort(field) {
      if (this.sortOrder.length === 0) {
        this.addSortColumn(field, 'asc');
        return;
      }

      this.sortOrder.splice(1);

      if (this.fieldIsInSortOrderPosition(field, 0)) {
        this.sortOrder[0].direction = this.sortOrder[0].direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortOrder[0].direction = 'asc';
      }
      this.sortOrder[0].field = field.name;
      this.sortOrder[0].sortField = field.sortField;
    },
    clearSortOrder: function clearSortOrder() {
      this.sortOrder = [];
    },
    hasFormatter: function hasFormatter(item) {
      return typeof item.formatter === 'function';
    },
    callFormatter: function callFormatter(field, item) {
      if (!this.hasFormatter(field)) return;

      if (typeof field.formatter === 'function') {
        return field.formatter(this.getObjectValue(item, field.name), this);
      }
    },
    getObjectValue: function getObjectValue(object, path, defaultValue) {
      defaultValue = typeof defaultValue === 'undefined' ? null : defaultValue;

      var obj = object;
      if (path.trim() != '') {
        var keys = path.split('.');
        keys.forEach(function (key) {
          if (obj !== null && typeof obj[key] !== 'undefined' && obj[key] !== null) {
            obj = obj[key];
          } else {
            obj = defaultValue;
            return;
          }
        });
      }
      return obj;
    },
    selectId: function selectId(key) {
      if (!this.isSelectedRow(key)) {
        this.selectedTo.push(key);
      }
    },
    unselectId: function unselectId(key) {
      this.selectedTo = this.selectedTo.filter(function (item) {
        return item !== key;
      });
    },
    isSelectedRow: function isSelectedRow(key) {
      return this.selectedTo.indexOf(key) >= 0;
    },
    clearSelectedValues: function clearSelectedValues() {
      this.selectedTo = [];
    },
    gotoPreviousPage: function gotoPreviousPage() {
      if (this.currentPage > this.firstPage) {
        this.currentPage--;
        this.loadData();
      }
    },
    gotoNextPage: function gotoNextPage() {
      if (this.currentPage < this.tablePagination.last_page) {
        this.currentPage++;
        this.loadData();
      }
    },
    gotoPage: function gotoPage(page) {
      if (page != this.currentPage && page >= this.firstPage && page <= this.tablePagination.last_page) {
        this.currentPage = page;
        this.loadData();
      }
    },
    isVisibleDetailRow: function isVisibleDetailRow(rowId) {
      return this.visibleDetailRows.indexOf(rowId) >= 0;
    },
    showDetailRow: function showDetailRow(rowId) {
      if (!this.isVisibleDetailRow(rowId)) {
        this.visibleDetailRows.push(rowId);
      }
      this.checkScrollbarVisibility();
    },
    hideDetailRow: function hideDetailRow(rowId) {
      if (this.isVisibleDetailRow(rowId)) {
        this.visibleDetailRows.splice(this.visibleDetailRows.indexOf(rowId), 1);
        this.updateHeader();
      }
    },
    toggleDetailRow: function toggleDetailRow(rowId) {
      if (this.isVisibleDetailRow(rowId)) {
        this.hideDetailRow(rowId);
      } else {
        this.showDetailRow(rowId);
      }
    },
    showField: function showField(index) {
      if (index < 0 || index > this.tableFields.length) return;

      this.tableFields[index].visible = true;
    },
    hideField: function hideField(index) {
      if (index < 0 || index > this.tableFields.length) return;

      this.tableFields[index].visible = false;
    },
    toggleField: function toggleField(index) {
      if (index < 0 || index > this.tableFields.length) return;

      this.tableFields[index].visible = !this.tableFields[index].visible;
    },
    makePagination: function makePagination() {
      var total = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var currentPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var pagination = {};
      total = total === null ? 0 : total;
      perPage = perPage === null ? this.perPage : perPage;
      currentPage = currentPage === null ? this.currentPage : currentPage;

      return {
        'total': total,
        'per_page': perPage,
        'current_page': currentPage,
        'last_page': Math.ceil(total / perPage) || 0,
        'next_page_url': '',
        'prev_page_url': '',
        'from': (currentPage - 1) * perPage + 1,
        'to': Math.min(currentPage * perPage, total)
      };
    },
    normalizeSortOrder: function normalizeSortOrder() {
      this.sortOrder.forEach(function (item) {
        item.sortField = item.sortField || item.field;
      });
    },
    handleDataMode: function handleDataMode() {
      if (this.data !== null && Array.isArray(this.data)) {
        this.setData(this.data);
        return;
      }

      if (this.dataManager) {
        this.callDataManager();
      } else {
        this.setData(this.data);
      }
    },
    callDataManager: function callDataManager() {
      var _this6 = this;

      var result = this.dataManager(this.sortOrder, this.makePagination());

      if (this.isPromiseObject(result)) {
        result.then(function (data) {
          return _this6.setData(data);
        });
      } else {
        this.setData(result);
      }
    },
    isObject: function isObject(unknown) {
      return (typeof unknown === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(unknown)) === "object" && unknown !== null;
    },
    isPromiseObject: function isPromiseObject(unknown) {
      return this.isObject(unknown) && typeof unknown.then === "function";
    },
    onRowClass: function onRowClass(dataItem, index) {
      if (typeof this.rowClass === 'function') {
        return this.rowClass(dataItem, index);
      }

      return this.rowClass;
    },
    onDetailRowClass: function onDetailRowClass(dataItem, index) {
      if (typeof this.detailRowClass === 'function') {
        return this.detailRowClass(dataItem, index);
      }

      return this.detailRowClass;
    },
    onRowClicked: function onRowClicked(dataItem, dataIndex, event) {
      this.fireEvent('row-clicked', { data: dataItem, index: dataIndex, event: event });
      return true;
    },
    onRowDoubleClicked: function onRowDoubleClicked(dataItem, dataIndex, event) {
      this.fireEvent('row-dblclicked', { data: dataItem, index: dataIndex, event: event });
    },
    onDetailRowClick: function onDetailRowClick(dataItem, dataIndex, event) {
      this.fireEvent('detail-row-clicked', { data: dataItem, index: dataIndex, event: event });
    },
    onCellClicked: function onCellClicked(dataItem, dataIndex, field, event) {
      this.fireEvent('cell-clicked', { data: dataItem, index: dataIndex, field: field, event: event });
    },
    onCellDoubleClicked: function onCellDoubleClicked(dataItem, dataIndex, field, event) {
      this.fireEvent('cell-dblclicked', { data: dataItem, index: dataIndex, field: field, event: event });
    },
    onCellRightClicked: function onCellRightClicked(dataItem, dataIndex, field, event) {
      this.fireEvent('cell-rightclicked', { data: dataItem, index: dataIndex, field: field, event: event });
    },
    onMouseOver: function onMouseOver(dataItem, dataIndex, event) {
      this.fireEvent('row-mouseover', { data: dataItem, index: dataIndex, event: event });
    },
    onFieldEvent: function onFieldEvent(type, payload) {
      this.fireEvent('field-event', type, payload, this);
    },
    onHeaderEvent: function onHeaderEvent(type, payload) {
      this.fireEvent('header-event', type, payload, this);
    },
    onCheckboxToggled: function onCheckboxToggled(isChecked, fieldName, dataItem) {
      var idColumn = this.trackBy;

      if (dataItem[idColumn] === undefined) {
        this.warn('checkbox field: The "' + this.trackBy + '" field does not exist! Make sure the field you specify in "track-by" prop does exist.');
        return;
      }

      var key = dataItem[idColumn];
      if (isChecked) {
        this.selectId(key);
      } else {
        this.unselectId(key);
      }

      this.fireEvent('checkbox-toggled', isChecked, fieldName);
    },
    onCheckboxToggledAll: function onCheckboxToggledAll(isChecked) {
      var _this7 = this;

      var idColumn = this.trackBy;

      if (isChecked) {
        this.tableData.forEach(function (dataItem) {
          _this7.selectId(dataItem[idColumn]);
        });
      } else {
        this.tableData.forEach(function (dataItem) {
          _this7.unselectId(dataItem[idColumn]);
        });
      }

      this.fireEvent('checkbox-toggled-all', isChecked);
    },
    changePage: function changePage(page) {
      if (page === 'prev') {
        this.gotoPreviousPage();
      } else if (page === 'next') {
        this.gotoNextPage();
      } else {
        this.gotoPage(page);
      }
    },
    reload: function reload() {
      return this.loadData();
    },
    refresh: function refresh() {
      this.currentPage = this.firstPage;
      return this.loadData();
    },
    resetData: function resetData() {
      this.tableData = null;
      this.tablePagination = null;
      this.fireEvent('data-reset');
    }
  } });

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vuetable-col-group',

  props: {
    isHeader: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    vuetable: function vuetable() {
      return this.$parent;
    }
  },

  methods: {
    columnClass: function columnClass(field, fieldIndex) {
      var fieldName = void 0;
      if (typeof field.name === "function") {
        var component = field.name;

        if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(component.options) === "object" && component.options.name) {
          fieldName = component.options.name;
        } else {
            fieldName = component.name;
          }
      } else if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(field.name) === "object" && field.name !== null) {
        fieldName = field.name.name;
      } else {
        fieldName = field.name;
      }
      fieldName = fieldName.replace(this.fieldPrefix, "");

      return ['vuetable-col-' + fieldName, field.titleClass];
    }
  }
});

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vuetable-th-gutter',

  computed: {
    vuetable: function vuetable() {
      return this.$parent;
    }
  }

});

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckboxMixin_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckboxMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckboxMixin_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vuetable-field-checkbox',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckboxMixin_vue___default.a]
});

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue__);



/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue___default.a],

  methods: {
    toggleCheckbox: function toggleCheckbox(dataItem, event) {
      this.vuetable.onCheckboxToggled(event.target.checked, this.rowField.name, dataItem);
    },
    toggleAllCheckbox: function toggleAllCheckbox(event) {
      this.vuetable.onCheckboxToggledAll(event.target.checked);
    },
    isSelected: function isSelected(rowData) {
      return this.vuetable.isSelectedRow(rowData[this.vuetable.trackBy]);
    },
    isAllItemsInCurrentPageSelected: function isAllItemsInCurrentPageSelected() {
      var _this = this;

      if (!this.vuetable.tableData) return;

      var idColumn = this.vuetable.trackBy;
      var checkbox = this.$el.querySelector('input[type=checkbox]');
      var selected = this.vuetable.tableData.filter(function (item) {
        return _this.vuetable.isSelectedRow(item[idColumn]);
      });

      if (selected.length <= 0) {
        checkbox.indeterminate = false;
        return false;
      } else if (selected.length < this.vuetable.perPage) {
          checkbox.indeterminate = true;
          return true;
        } else {
            checkbox.indeterminate = false;
            return true;
          }
    }
  }
});

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vuetable-field-handle',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue___default.a],

  computed: {
    css: function css() {
      return this.vuetable.$_css;
    }
  },

  methods: {
    renderIconTag: function renderIconTag(classes) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return typeof this.css.renderIcon === 'undefined' ? '<i class="' + classes.join(' ') + '" ' + options + '></i>' : this.css.renderIcon(classes, options);
    }
  }
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    rowData: {
      type: Object,
      default: null
    },
    rowIndex: {
      type: Number
    },
    rowField: {
      type: Object
    },
    isHeader: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    vuetable: {
      type: Object,
      default: null
    }
  }
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vuetable-field-sequence',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__VuetableFieldMixin_vue___default.a],

  methods: {
    renderSequence: function renderSequence() {
      return this.vuetable.tablePagination ? this.vuetable.tablePagination.from + this.rowIndex : 1 + this.rowIndex;
    }
  }
});

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue___default.a]
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__VuetablePaginationMixin_vue___default.a],
  props: {
    pageText: {
      type: String,
      default: function _default() {
        return 'Page';
      }
    }
  },
  methods: {
    registerEvents: function registerEvents() {
      var _this = this;

      this.$on('vuetable:pagination-data', function (tablePagination) {
        _this.setPaginationData(tablePagination);
      });
    }
  },
  created: function created() {
    this.registerEvents();
  }
});

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetablePaginationInfoMixin_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetablePaginationInfoMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetablePaginationInfoMixin_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__VuetablePaginationInfoMixin_vue___default.a]
});

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VuetableCssSemanticUI_js__ = __webpack_require__(25);




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    css: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    infoTemplate: {
      type: String,
      default: function _default() {
        return "Displaying {from} to {to} of {total} items";
      }
    },
    noDataTemplate: {
      type: String,
      default: function _default() {
        return 'No relevant data';
      }
    }
  },
  data: function data() {
    return {
      tablePagination: null,
      $_css: {}
    };
  },
  computed: {
    paginationInfo: function paginationInfo() {
      if (this.tablePagination == null || this.tablePagination.total == 0) {
        return this.noDataTemplate;
      }

      return this.infoTemplate.replace('{from}', this.tablePagination.from || 0).replace('{to}', this.tablePagination.to || 0).replace('{total}', this.tablePagination.total || 0);
    }
  },
  created: function created() {
    this.mergeCss();
  },

  methods: {
    mergeCss: function mergeCss() {
      this.$_css = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_1__VuetableCssSemanticUI_js__["a" /* default */].paginationInfo, this.css);
    },
    setPaginationData: function setPaginationData(tablePagination) {
      this.tablePagination = tablePagination;
    },
    resetData: function resetData() {
      this.tablePagination = null;
    }
  }
});

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VuetableCssSemanticUI_js__ = __webpack_require__(25);




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    css: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    onEachSide: {
      type: Number,
      default: function _default() {
        return 2;
      }
    },
    firstPage: {
      type: Number,
      default: 1
    }
  },
  data: function data() {
    return {
      eventPrefix: 'vuetable-pagination:',
      tablePagination: null,
      $_css: {}
    };
  },
  computed: {
    totalPage: function totalPage() {
      return this.tablePagination === null ? 0 : this.tablePagination.last_page - this.firstPage + 1;
    },
    lastPage: function lastPage() {
      return this.tablePagination === null ? 0 : this.tablePagination.last_page;
    },
    isOnFirstPage: function isOnFirstPage() {
      return this.tablePagination === null ? false : this.tablePagination.current_page === this.firstPage;
    },
    isOnLastPage: function isOnLastPage() {
      return this.tablePagination === null ? false : this.tablePagination.current_page === this.lastPage;
    },
    notEnoughPages: function notEnoughPages() {
      return this.totalPage < this.onEachSide * 2 + 4;
    },
    windowSize: function windowSize() {
      return this.onEachSide * 2 + 1;
    },
    windowStart: function windowStart() {
      if (!this.tablePagination || this.tablePagination.current_page <= this.onEachSide) {
        return 1;
      } else if (this.tablePagination.current_page >= this.totalPage - this.onEachSide) {
        return this.totalPage - this.onEachSide * 2;
      }

      return this.tablePagination.current_page - this.onEachSide;
    }
  },
  created: function created() {
    this.mergeCss();
  },

  methods: {
    mergeCss: function mergeCss() {
      this.$_css = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_1__VuetableCssSemanticUI_js__["a" /* default */].pagination, this.css);
    },
    loadPage: function loadPage(page) {
      this.$emit(this.eventPrefix + 'change-page', page);
    },
    isCurrentPage: function isCurrentPage(page) {
      return page === this.tablePagination.current_page;
    },
    setPaginationData: function setPaginationData(tablePagination) {
      this.tablePagination = tablePagination;
    },
    resetData: function resetData() {
      this.tablePagination = null;
    }
  }
});

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckbox__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckbox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VuetableFieldHandle__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VuetableFieldHandle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__VuetableFieldHandle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VuetableFieldSequence__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VuetableFieldSequence___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__VuetableFieldSequence__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VuetableColGutter__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VuetableColGutter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__VuetableColGutter__);







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    'vuetable-field-checkbox': __WEBPACK_IMPORTED_MODULE_0__VuetableFieldCheckbox___default.a,
    'vuetable-field-handle': __WEBPACK_IMPORTED_MODULE_1__VuetableFieldHandle___default.a,
    'vuetable-field-sequence': __WEBPACK_IMPORTED_MODULE_2__VuetableFieldSequence___default.a,
    VuetableColGutter: __WEBPACK_IMPORTED_MODULE_3__VuetableColGutter___default.a
  },

  computed: {
    sortOrder: function sortOrder() {
      return this.$parent.sortOrder;
    },
    css: function css() {
      return this.$parent.$_css;
    },
    vuetable: function vuetable() {
      return this.$parent;
    }
  },

  methods: {
    stripPrefix: function stripPrefix(name) {
      return name.replace(this.vuetable.fieldPrefix, '');
    },
    headerClass: function headerClass(base, field) {
      return [base + '-' + this.toSnakeCase(field.name), field.titleClass || '', this.sortClass(field), { 'sortable': this.vuetable.isSortable(field) }];
    },
    toSnakeCase: function toSnakeCase(str) {
      return typeof str === 'string' && str.replace(/([A-Z])/g, function (chr) {
        return "_" + chr.toLowerCase();
      }).replace(' ', '_').replace('.', '_');
    },
    sortClass: function sortClass(field) {
      var cls = '';
      var i = this.currentSortOrderPosition(field);

      if (i !== false) {
        cls = this.sortOrder[i].direction == 'asc' ? this.css.ascendingClass : this.css.descendingClass;
      }

      return cls;
    },
    sortIcon: function sortIcon(field) {
      var cls = this.css.sortableIcon;
      var i = this.currentSortOrderPosition(field);

      if (i !== false) {
        cls = this.sortOrder[i].direction == 'asc' ? this.css.ascendingIcon : this.css.descendingIcon;
      }

      return cls;
    },
    isInCurrentSortGroup: function isInCurrentSortGroup(field) {
      return this.currentSortOrderPosition(field) !== false;
    },
    hasSortableIcon: function hasSortableIcon(field) {
      return this.vuetable.isSortable(field) && this.css.sortableIcon != '';
    },
    currentSortOrderPosition: function currentSortOrderPosition(field) {
      if (!this.vuetable.isSortable(field)) {
        return false;
      }

      for (var i = 0; i < this.sortOrder.length; i++) {
        if (this.fieldIsInSortOrderPosition(field, i)) {
          return i;
        }
      }

      return false;
    },
    fieldIsInSortOrderPosition: function fieldIsInSortOrderPosition(field, i) {
      return this.sortOrder[i].field === field.name && this.sortOrder[i].sortField === field.sortField;
    },
    renderTitle: function renderTitle(field) {
      var title = this.getTitle(field);

      if (title.length > 0 && this.isInCurrentSortGroup(field) || this.hasSortableIcon(field)) {
        var style = 'opacity:' + this.sortIconOpacity(field) + ';position:relative;float:right';
        var iconTag = this.vuetable.showSortIcons ? this.renderIconTag(['sort-icon', this.sortIcon(field)], 'style="' + style + '"') : '';
        return title + ' ' + iconTag;
      }

      return title;
    },
    getTitle: function getTitle(field) {
      if (typeof field.title === 'function') return field.title();

      return typeof field.title === 'undefined' ? field.name.replace('.', ' ') : field.title;
    },
    sortIconOpacity: function sortIconOpacity(field) {
      var max = 1.0,
          min = 0.3,
          step = 0.3;

      var count = this.sortOrder.length;
      var current = this.currentSortOrderPosition(field);

      if (max - count * step < min) {
        step = (max - min) / (count - 1);
      }

      var opacity = max - current * step;

      return opacity;
    },
    renderIconTag: function renderIconTag(classes) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return typeof this.css.renderIcon === 'undefined' ? '<i class="' + classes.join(' ') + '" ' + options + '></i>' : this.css.renderIcon(classes, options);
    },
    onColumnHeaderClicked: function onColumnHeaderClicked(field, event) {
      this.vuetable.orderBy(field, event);
    }
  }
});

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Vuetable_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Vuetable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Vuetable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_VuetableFieldMixin_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_VuetableFieldMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_VuetableFieldMixin_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_VuetableFieldCheckboxMixin_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_VuetableFieldCheckboxMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_VuetableFieldCheckboxMixin_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_VuetablePaginationMixin_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_VuetablePaginationMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_VuetablePaginationMixin_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_VuetablePaginationInfoMixin_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_VuetablePaginationInfoMixin_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_VuetablePaginationInfoMixin_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_VuetablePagination_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_VuetablePagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_VuetablePagination_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_VuetablePaginationDropdown_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_VuetablePaginationDropdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_VuetablePaginationDropdown_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_VuetablePaginationInfo_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_VuetablePaginationInfo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_VuetablePaginationInfo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_VuetableFieldCheckbox_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_VuetableFieldCheckbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_VuetableFieldCheckbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_VuetableFieldHandle_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_VuetableFieldHandle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_VuetableFieldHandle_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_VuetableFieldSequence_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_VuetableFieldSequence_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_VuetableFieldSequence_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_VuetableRowHeader_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_VuetableRowHeader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_VuetableRowHeader_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_VuetableColGutter_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_VuetableColGutter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_VuetableColGutter_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_promise_polyfill__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_promise_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_promise_polyfill__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "Vuetable", function() { return __WEBPACK_IMPORTED_MODULE_1__components_Vuetable_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetableFieldMixin", function() { return __WEBPACK_IMPORTED_MODULE_2__components_VuetableFieldMixin_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetableFieldCheckboxMixin", function() { return __WEBPACK_IMPORTED_MODULE_3__components_VuetableFieldCheckboxMixin_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetablePaginationInfoMixin", function() { return __WEBPACK_IMPORTED_MODULE_5__components_VuetablePaginationInfoMixin_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetablePaginationMixin", function() { return __WEBPACK_IMPORTED_MODULE_4__components_VuetablePaginationMixin_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetableColGutter", function() { return __WEBPACK_IMPORTED_MODULE_13__components_VuetableColGutter_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetableFieldCheckbox", function() { return __WEBPACK_IMPORTED_MODULE_9__components_VuetableFieldCheckbox_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetableFieldHandle", function() { return __WEBPACK_IMPORTED_MODULE_10__components_VuetableFieldHandle_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetableFieldSequence", function() { return __WEBPACK_IMPORTED_MODULE_11__components_VuetableFieldSequence_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetablePagination", function() { return __WEBPACK_IMPORTED_MODULE_6__components_VuetablePagination_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetablePaginationDropDown", function() { return __WEBPACK_IMPORTED_MODULE_7__components_VuetablePaginationDropdown_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetablePaginationInfo", function() { return __WEBPACK_IMPORTED_MODULE_8__components_VuetablePaginationInfo_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "VuetableRowHeader", function() { return __WEBPACK_IMPORTED_MODULE_12__components_VuetableRowHeader_vue___default.a; });


















var rootVariable = (typeof self === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(global)) === 'object' && global || this;
if (!rootVariable.Promise) {
  rootVariable.Promise = __WEBPACK_IMPORTED_MODULE_14_promise_polyfill___default.a;
}

function install(Vue) {
  Vue.component("vuetable", __WEBPACK_IMPORTED_MODULE_1__components_Vuetable_vue___default.a);
  Vue.component("vuetable-col-gutter", __WEBPACK_IMPORTED_MODULE_13__components_VuetableColGutter_vue___default.a);
  Vue.component("vuetable-field-checkbox", __WEBPACK_IMPORTED_MODULE_9__components_VuetableFieldCheckbox_vue___default.a);
  Vue.component("vuetable-field-handle", __WEBPACK_IMPORTED_MODULE_10__components_VuetableFieldHandle_vue___default.a);
  Vue.component("vuetable-field-sequence", __WEBPACK_IMPORTED_MODULE_11__components_VuetableFieldSequence_vue___default.a);
  Vue.component("vuetable-pagination", __WEBPACK_IMPORTED_MODULE_6__components_VuetablePagination_vue___default.a);
  Vue.component("vuetable-pagination-dropdown", __WEBPACK_IMPORTED_MODULE_7__components_VuetablePaginationDropdown_vue___default.a);
  Vue.component("vuetable-pagination-info", __WEBPACK_IMPORTED_MODULE_8__components_VuetablePaginationInfo_vue___default.a);
  Vue.component("vuetable-row-header", __WEBPACK_IMPORTED_MODULE_12__components_VuetableRowHeader_vue___default.a);
}


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__components_Vuetable_vue___default.a);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(47)))

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(134);
module.exports = __webpack_require__(7).Array.from;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
module.exports = __webpack_require__(7).Object.assign;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(138);
__webpack_require__(137);
__webpack_require__(139);
__webpack_require__(140);
module.exports = __webpack_require__(7).Symbol;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(141);
module.exports = __webpack_require__(39).f('iterator');

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6)
  , toLength  = __webpack_require__(63)
  , toIndex   = __webpack_require__(132);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(27)
  , TAG = __webpack_require__(2)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5)
  , createDesc      = __webpack_require__(14);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(13)
  , gOPS    = __webpack_require__(31)
  , pIE     = __webpack_require__(18);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3).document && document.documentElement;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(12)
  , ITERATOR   = __webpack_require__(2)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(27);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(59)
  , descriptor     = __webpack_require__(14)
  , setToStringTag = __webpack_require__(32)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(2)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(13)
  , toIObject = __webpack_require__(6);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(19)('meta')
  , isObject = __webpack_require__(17)
  , has      = __webpack_require__(4)
  , setDesc  = __webpack_require__(5).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(11)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(13)
  , gOPS     = __webpack_require__(31)
  , pIE      = __webpack_require__(18)
  , toObject = __webpack_require__(36)
  , IObject  = __webpack_require__(57)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(5)
  , anObject = __webpack_require__(10)
  , getKeys  = __webpack_require__(13);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(18)
  , createDesc     = __webpack_require__(14)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(37)
  , has            = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(56)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6)
  , gOPN      = __webpack_require__(60).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(4)
  , toObject    = __webpack_require__(36)
  , IE_PROTO    = __webpack_require__(33)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35)
  , defined   = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(114)
  , ITERATOR  = __webpack_require__(2)('iterator')
  , Iterators = __webpack_require__(12);
module.exports = __webpack_require__(7).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(54)
  , $export        = __webpack_require__(16)
  , toObject       = __webpack_require__(36)
  , call           = __webpack_require__(120)
  , isArrayIter    = __webpack_require__(118)
  , toLength       = __webpack_require__(63)
  , createProperty = __webpack_require__(115)
  , getIterFn      = __webpack_require__(133);

$export($export.S + $export.F * !__webpack_require__(122)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(112)
  , step             = __webpack_require__(123)
  , Iterators        = __webpack_require__(12)
  , toIObject        = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(58)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(16);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(126)});

/***/ }),
/* 137 */
/***/ (function(module, exports) {



/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(3)
  , has            = __webpack_require__(4)
  , DESCRIPTORS    = __webpack_require__(8)
  , $export        = __webpack_require__(16)
  , redefine       = __webpack_require__(62)
  , META           = __webpack_require__(125).KEY
  , $fails         = __webpack_require__(11)
  , shared         = __webpack_require__(34)
  , setToStringTag = __webpack_require__(32)
  , uid            = __webpack_require__(19)
  , wks            = __webpack_require__(2)
  , wksExt         = __webpack_require__(39)
  , wksDefine      = __webpack_require__(38)
  , keyOf          = __webpack_require__(124)
  , enumKeys       = __webpack_require__(116)
  , isArray        = __webpack_require__(119)
  , anObject       = __webpack_require__(10)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(37)
  , createDesc     = __webpack_require__(14)
  , _create        = __webpack_require__(59)
  , gOPNExt        = __webpack_require__(129)
  , $GOPD          = __webpack_require__(128)
  , $DP            = __webpack_require__(5)
  , $keys          = __webpack_require__(13)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(60).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(18).f  = $propertyIsEnumerable;
  __webpack_require__(31).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(30)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('asyncIterator');

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('observable');

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(135);
var global        = __webpack_require__(3)
  , hide          = __webpack_require__(9)
  , Iterators     = __webpack_require__(12)
  , TO_STRING_TAG = __webpack_require__(2)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "\n[v-cloak] {\n  display: none;\n}\ntable.vuetable.fixed-header {\n  table-layout: fixed;\n}\n.vuetable th.sortable:hover {\n  color: #2185d0;\n  cursor: pointer;\n}\n.vuetable-head-wrapper {\n  overflow-x: hidden;\n}\n.vuetable-head-wrapper table.vuetable {\n  border-bottom-left-radius: 0px;\n  border-bottom-right-radius: 0px;\n}\n.vuetable-body-wrapper.fixed-header {\n  position:relative;\n  overflow-y:auto;\n}\n.vuetable-body-wrapper table.vuetable.fixed-header {\n  border-top:none !important;\n  margin-top:0 !important;\n  border-top-left-radius: 0px;\n  border-top-right-radius: 0px;\n}\n.vuetable-empty-result {\n  text-align: center;\n}\n", ""]);

// exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "\n.vuetable-pagination {\n  background: #f9fafb !important;\n}\n", ""]);

// exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "\n.vuetable-th-gutter {\n  padding: 0 !important;\n  border-left: none  !important;\n  border-right: none  !important;\n}\n", ""]);

// exports


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(20)(false);
// imports


// module
exports.push([module.i, "\n.vuetable-pagination-info {\n  margin-top: auto;\n  margin-bottom: auto;\n}\n", ""]);

// exports


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(47), __webpack_require__(65)))

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(146);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(90),
  /* template */
  __webpack_require__(150),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/kestred/Developer/github/vuetable-2/src/components/VuetableColGroup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] VuetableColGroup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33562181", Component.options)
  } else {
    hotAPI.reload("data-v-33562181", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.isHeader) ? _c('th', {
    staticClass: "vuetable-th-component-sequence",
    domProps: {
      "innerHTML": _vm._s(_vm.title)
    }
  }) : _c('td', {
    staticClass: "vuetable-td-component-sequence",
    domProps: {
      "innerHTML": _vm._s(_vm.renderSequence())
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-037594a9", module.exports)
  }
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('colgroup', [_vm._l((_vm.vuetable.tableFields), function(field, fieldIndex) {
    return [(field.visible) ? [_c('col', {
      key: fieldIndex,
      class: _vm.columnClass(field, fieldIndex),
      style: ({
        width: field.width
      })
    })] : _vm._e()]
  }), _vm._v(" "), (_vm.isHeader && _vm.vuetable.scrollVisible) ? _c('col', {
    staticClass: "vuetable-col-gutter",
    style: ({
      width: _vm.vuetable.scrollBarWidth
    })
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-33562181", module.exports)
  }
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: [_vm.$_css.wrapperClass]
  }, [_c('a', {
    class: [_vm.$_css.linkClass, ( _obj = {}, _obj[_vm.$_css.disabledClass] = _vm.isOnFirstPage, _obj )],
    on: {
      "click": function($event) {
        _vm.loadPage('prev')
      }
    }
  }, [_c('i', {
    class: _vm.$_css.icons.prev
  })]), _vm._v(" "), _c('select', {
    class: ['vuetable-pagination-dropdown', _vm.$_css.dropdownClass],
    on: {
      "change": function($event) {
        _vm.loadPage($event.target.selectedIndex + _vm.firstPage)
      }
    }
  }, _vm._l((_vm.totalPage), function(n, i) {
    return _c('option', {
      key: n,
      class: [_vm.$_css.pageClass],
      domProps: {
        "value": i + _vm.firstPage,
        "selected": _vm.isCurrentPage(i + _vm.firstPage)
      }
    }, [_vm._v("\n      " + _vm._s(_vm.pageText) + " " + _vm._s(n) + "\n    ")])
  })), _vm._v(" "), _c('a', {
    class: [_vm.$_css.linkClass, ( _obj$1 = {}, _obj$1[_vm.$_css.disabledClass] = _vm.isOnLastPage, _obj$1 )],
    on: {
      "click": function($event) {
        _vm.loadPage('next')
      }
    }
  }, [_c('i', {
    class: _vm.$_css.icons.next
  })])])
  var _obj;
  var _obj$1;
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-397c17ed", module.exports)
  }
}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.$_css.tableWrapper
  }, [(_vm.isFixedHeader) ? _c('div', {
    staticClass: "vuetable-head-wrapper"
  }, [_c('table', {
    class: ['vuetable', _vm.$_css.tableClass, _vm.$_css.tableHeaderClass]
  }, [_c('vuetable-col-group', {
    attrs: {
      "is-header": true
    }
  }), _vm._v(" "), _c('thead', [_vm._t("tableHeader", [_vm._l((_vm.headerRows), function(header, headerIndex) {
    return [_c(header, {
      key: headerIndex,
      tag: "component",
      on: {
        "vuetable:header-event": _vm.onHeaderEvent
      }
    })]
  })], {
    fields: _vm.tableFields
  })], 2)], 1)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "vuetable-body-wrapper",
    class: {
      'fixed-header': _vm.isFixedHeader
    },
    style: ({
      height: _vm.tableHeight
    })
  }, [_c('table', {
    class: ['vuetable', _vm.isFixedHeader ? 'fixed-header' : '', _vm.$_css.tableClass, _vm.$_css.tableBodyClass]
  }, [_c('vuetable-col-group'), _vm._v(" "), (!_vm.isFixedHeader) ? _c('thead', [_vm._t("tableHeader", [_vm._l((_vm.headerRows), function(header, headerIndex) {
    return [_c(header, {
      key: headerIndex,
      tag: "component",
      on: {
        "vuetable:header-event": _vm.onHeaderEvent
      }
    })]
  })], {
    fields: _vm.tableFields
  })], 2) : _vm._e(), _vm._v(" "), _c('tfoot', [_vm._t("tableFooter", null, {
    fields: _vm.tableFields
  })], 2), _vm._v(" "), _c('tbody', {
    staticClass: "vuetable-body"
  }, [_vm._l((_vm.tableData), function(item, itemIndex) {
    return [_c('tr', {
      key: itemIndex,
      class: _vm.onRowClass(item, itemIndex),
      attrs: {
        "item-index": itemIndex
      },
      on: {
        "click": function($event) {
          _vm.onRowClicked(item, itemIndex, $event)
        },
        "dblclick": function($event) {
          _vm.onRowDoubleClicked(item, itemIndex, $event)
        },
        "mouseover": function($event) {
          _vm.onMouseOver(item, itemIndex, $event)
        }
      }
    }, [_vm._l((_vm.tableFields), function(field, fieldIndex) {
      return [(field.visible) ? [(_vm.isFieldComponent(field.name)) ? [_c(field.name, {
        key: fieldIndex,
        tag: "component",
        class: _vm.bodyClass('vuetable-component', field),
        style: ({
          width: field.width
        }),
        attrs: {
          "row-data": item,
          "row-index": itemIndex,
          "row-field": field,
          "vuetable": _vm.vuetable
        },
        on: {
          "vuetable:field-event": _vm.onFieldEvent
        }
      })] : (_vm.isFieldSlot(field.name)) ? [_c('td', {
        key: fieldIndex,
        class: _vm.bodyClass('vuetable-slot', field),
        style: ({
          width: field.width
        })
      }, [_vm._t(field.name, null, {
        rowData: item,
        rowIndex: itemIndex,
        rowField: field
      })], 2)] : [_c('td', {
        key: fieldIndex,
        class: _vm.bodyClass('vuetable-td-' + field.name, field),
        style: ({
          width: field.width
        }),
        domProps: {
          "innerHTML": _vm._s(_vm.renderNormalField(field, item))
        },
        on: {
          "click": function($event) {
            _vm.onCellClicked(item, itemIndex, field, $event)
          },
          "dblclick": function($event) {
            _vm.onCellDoubleClicked(item, itemIndex, field, $event)
          },
          "contextmenu": function($event) {
            _vm.onCellRightClicked(item, itemIndex, field, $event)
          }
        }
      })]] : _vm._e()]
    })], 2), _vm._v(" "), (_vm.useDetailRow) ? [_c('transition', {
      key: itemIndex,
      attrs: {
        "name": _vm.detailRowTransition
      }
    }, [(_vm.isVisibleDetailRow(item[_vm.trackBy])) ? _c('tr', {
      class: _vm.onDetailRowClass(item, itemIndex),
      on: {
        "click": function($event) {
          _vm.onDetailRowClick(item, itemIndex, $event)
        }
      }
    }, [_c('td', {
      attrs: {
        "colspan": _vm.countVisibleFields
      }
    }, [_c(_vm.detailRowComponent, {
      tag: "component",
      attrs: {
        "row-data": item,
        "row-index": itemIndex,
        "options": _vm.detailRowOptions
      }
    })], 1)]) : _vm._e()])] : _vm._e()]
  }), _vm._v(" "), (_vm.displayEmptyDataRow) ? [_c('tr', [_c('td', {
    staticClass: "vuetable-empty-result",
    attrs: {
      "colspan": _vm.countVisibleFields
    },
    domProps: {
      "innerHTML": _vm._s(_vm.noDataTemplate)
    }
  })])] : _vm._e(), _vm._v(" "), (_vm.lessThanMinRows) ? _vm._l((_vm.blankRows), function(i) {
    return _c('tr', {
      key: i,
      staticClass: "blank-row"
    }, [_vm._l((_vm.tableFields), function(field, fieldIndex) {
      return [(field.visible) ? _c('td', {
        key: fieldIndex
      }, [_vm._v(" ")]) : _vm._e()]
    })], 2)
  }) : _vm._e()], 2)], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5cc42bfc", module.exports)
  }
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.tablePagination && _vm.lastPage > _vm.firstPage),
      expression: "tablePagination && lastPage > firstPage"
    }],
    class: _vm.$_css.wrapperClass
  }, [_c('a', {
    class: ['btn-nav', _vm.$_css.linkClass, _vm.isOnFirstPage ? _vm.$_css.disabledClass : ''],
    on: {
      "click": function($event) {
        _vm.loadPage(_vm.firstPage)
      }
    }
  }, [(_vm.$_css.icons.first != '') ? _c('i', {
    class: [_vm.$_css.icons.first]
  }) : _c('span', [_vm._v("«")])]), _vm._v(" "), _c('a', {
    class: ['btn-nav', _vm.$_css.linkClass, _vm.isOnFirstPage ? _vm.$_css.disabledClass : ''],
    on: {
      "click": function($event) {
        _vm.loadPage('prev')
      }
    }
  }, [(_vm.$_css.icons.next != '') ? _c('i', {
    class: [_vm.$_css.icons.prev]
  }) : _c('span', [_vm._v(" ‹")])]), _vm._v(" "), (_vm.notEnoughPages) ? [_vm._l((_vm.totalPage), function(n, i) {
    return [_c('a', {
      key: i,
      class: [_vm.$_css.pageClass, _vm.isCurrentPage(i + _vm.firstPage) ? _vm.$_css.activeClass : ''],
      domProps: {
        "innerHTML": _vm._s(n)
      },
      on: {
        "click": function($event) {
          _vm.loadPage(i + _vm.firstPage)
        }
      }
    })]
  })] : [_vm._l((_vm.windowSize), function(n, i) {
    return [_c('a', {
      key: i,
      class: [_vm.$_css.pageClass, _vm.isCurrentPage(_vm.windowStart + i + _vm.firstPage - 1) ? _vm.$_css.activeClass : ''],
      domProps: {
        "innerHTML": _vm._s(_vm.windowStart + n - 1)
      },
      on: {
        "click": function($event) {
          _vm.loadPage(_vm.windowStart + i + _vm.firstPage - 1)
        }
      }
    })]
  })], _vm._v(" "), _c('a', {
    class: ['btn-nav', _vm.$_css.linkClass, _vm.isOnLastPage ? _vm.$_css.disabledClass : ''],
    on: {
      "click": function($event) {
        _vm.loadPage('next')
      }
    }
  }, [(_vm.$_css.icons.next != '') ? _c('i', {
    class: [_vm.$_css.icons.next]
  }) : _c('span', [_vm._v("› ")])]), _vm._v(" "), _c('a', {
    class: ['btn-nav', _vm.$_css.linkClass, _vm.isOnLastPage ? _vm.$_css.disabledClass : ''],
    on: {
      "click": function($event) {
        _vm.loadPage(_vm.lastPage)
      }
    }
  }, [(_vm.$_css.icons.last != '') ? _c('i', {
    class: [_vm.$_css.icons.last]
  }) : _c('span', [_vm._v("»")])])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6a9dd43c", module.exports)
  }
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.isHeader) ? _c('th', {
    staticClass: "vuetable-th-component-checkbox"
  }, [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.isAllItemsInCurrentPageSelected()
    },
    on: {
      "change": function($event) {
        _vm.toggleAllCheckbox($event)
      }
    }
  })]) : _c('td', {
    staticClass: "vuetable-td-component-checkbox"
  }, [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.isSelected(_vm.rowData)
    },
    on: {
      "change": function($event) {
        _vm.toggleCheckbox(_vm.rowData, $event)
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-70ca67ab", module.exports)
  }
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.isHeader) ? _c('th', {
    staticClass: "vuetable-th-component-handle",
    domProps: {
      "innerHTML": _vm._s(_vm.title)
    }
  }) : _c('td', {
    staticClass: "vuetable-td-component-handle",
    domProps: {
      "innerHTML": _vm._s(_vm.renderIconTag(['handle-icon', _vm.css.handleIcon]))
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-795318e0", module.exports)
  }
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', [_vm._l((_vm.vuetable.tableFields), function(field, fieldIndex) {
    return [(field.visible) ? [(_vm.vuetable.isFieldComponent(field.name)) ? [_c(field.name, {
      key: fieldIndex,
      tag: "component",
      class: _vm.headerClass('vuetable-th-component', field),
      style: ({
        width: field.width
      }),
      attrs: {
        "row-field": field,
        "is-header": true,
        "title": _vm.renderTitle(field),
        "vuetable": _vm.vuetable
      },
      on: {
        "vuetable:header-event": _vm.vuetable.onHeaderEvent,
        "click": function($event) {
          _vm.onColumnHeaderClicked(field, $event)
        }
      }
    })] : (_vm.vuetable.isFieldSlot(field.name)) ? [_c('th', {
      key: fieldIndex,
      class: _vm.headerClass('vuetable-th-slot', field),
      style: ({
        width: field.width
      }),
      domProps: {
        "innerHTML": _vm._s(_vm.renderTitle(field))
      },
      on: {
        "click": function($event) {
          _vm.onColumnHeaderClicked(field, $event)
        }
      }
    })] : [_c('th', {
      key: fieldIndex,
      class: _vm.headerClass('vuetable-th', field),
      style: ({
        width: field.width
      }),
      attrs: {
        "id": '_' + field.name
      },
      domProps: {
        "innerHTML": _vm._s(_vm.renderTitle(field))
      },
      on: {
        "click": function($event) {
          _vm.onColumnHeaderClicked(field, $event)
        }
      }
    })]] : _vm._e()]
  }), _vm._v(" "), (_vm.vuetable.scrollVisible) ? _c('vuetable-col-gutter') : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7a067856", module.exports)
  }
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('th', {
    staticClass: "vuetable-th-gutter",
    style: ({
      width: _vm.vuetable.scrollBarWidth
    })
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-90d988ee", module.exports)
  }
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['vuetable-pagination-info', _vm.$_css.infoClass],
    domProps: {
      "innerHTML": _vm._s(_vm.paginationInfo)
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-910bb7ec", module.exports)
  }
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(142);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(21)("9c7810fe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5cc42bfc\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Vuetable.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5cc42bfc\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Vuetable.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(143);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(21)("53e9288b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6a9dd43c\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VuetablePagination.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6a9dd43c\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VuetablePagination.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(144);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(21)("80b0882e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-90d988ee\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VuetableColGutter.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-90d988ee\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VuetableColGutter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(145);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(21)("63364b20", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-910bb7ec\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VuetablePaginationInfo.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-910bb7ec\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VuetablePaginationInfo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 163 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});