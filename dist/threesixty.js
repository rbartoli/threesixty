(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("threesixty", [], factory);
	else if(typeof exports === 'object')
		exports["threesixty"] = factory();
	else
		root["threesixty"] = factory();
})(window, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar threesixty = function threesixty(container, images, options) {\n  if (!container) {\n    throw new Error('A container argument is required');\n  }\n\n  if (!images) {\n    throw new Error('An images argument is required');\n  }\n\n  var defaults = {\n    interactive: true,\n    reverse: false,\n    currentFrame: 0\n  };\n  var o = Object.assign({}, defaults, options);\n  var totalFrames = images.length;\n  var mouseX = 0;\n  var oldMouseX = 0; //------------------------------------------------------------------------------\n  //\n  //  Initialisation\n  //\n  //------------------------------------------------------------------------------\n\n  var init = function init() {\n    preloadimages(images, start);\n  };\n\n  var preloadimages = function preloadimages(sourceImages, cb) {\n    var total = sourceImages.length;\n    var loaded = 0;\n\n    var onload = function onload() {\n      if (++loaded >= total) cb(finalImages);\n    };\n\n    var finalImages = sourceImages.map(function (item) {\n      var image = new Image();\n      image.src = item;\n      image.onload = onload;\n      image.onerror = onload;\n      image.onabort = onload;\n      image.draggable = false;\n      return image;\n    });\n  };\n\n  var start = function start(loadedImages) {\n    images = loadedImages;\n    emptyDomNode(container);\n    container.appendChild(images[o.currentFrame]);\n\n    if (o.interactive) {\n      initListeners();\n    }\n  }; //------------------------------------------------------------------------------\n  //\n  //  Events\n  //\n  //------------------------------------------------------------------------------\n\n\n  var initListeners = function initListeners() {\n    container.addEventListener('touchstart', startDrag, {\n      passive: true\n    });\n    container.addEventListener('mousedown', startDrag);\n  };\n\n  var drag = function drag(e) {\n    if (!isTouchEvent(e)) {\n      e.preventDefault();\n    }\n\n    mouseX = e.pageX !== undefined ? e.pageX : e.changedTouches[0].pageX;\n\n    if (o.reverse) {\n      if (mouseX > oldMouseX) {\n        previous();\n      } else if (mouseX < oldMouseX) {\n        next();\n      }\n    } else {\n      if (mouseX < oldMouseX) {\n        previous();\n      } else if (mouseX > oldMouseX) {\n        next();\n      }\n    }\n\n    oldMouseX = mouseX;\n  };\n\n  var startDrag = function startDrag(e) {\n    if (!isTouchEvent(e)) {\n      e.preventDefault();\n    }\n\n    document.addEventListener('touchmove', drag, {\n      passive: true\n    });\n    document.addEventListener('mousemove', drag);\n    document.addEventListener('touchend', stopDrag);\n    document.addEventListener('mouseup', stopDrag);\n  };\n\n  var stopDrag = function stopDrag(e) {\n    if (!isTouchEvent(e)) {\n      e.preventDefault();\n    }\n\n    document.removeEventListener('touchmove', drag);\n    document.removeEventListener('mousemove', drag);\n    document.addEventListener('touchend', stopDrag, {\n      passive: true\n    });\n    document.addEventListener('mouseup', stopDrag);\n  }; //------------------------------------------------------------------------------\n  //\n  //  Sequence management\n  //\n  //------------------------------------------------------------------------------\n\n\n  var replaceImage = function replaceImage() {\n    container.replaceChild(images[o.currentFrame], container.childNodes[0]);\n  };\n\n  var previous = function previous() {\n    o.currentFrame--;\n    if (o.currentFrame < 0) o.currentFrame = totalFrames - 1;\n    replaceImage();\n  };\n\n  var next = function next() {\n    o.currentFrame++;\n    if (o.currentFrame === totalFrames) o.currentFrame = 0;\n    replaceImage();\n  };\n\n  var isInteractive = function isInteractive() {\n    return o.interactive;\n  };\n\n  var isReverse = function isReverse() {\n    return o.reverse;\n  };\n\n  var getCurrentFrame = function getCurrentFrame() {\n    return o.currentFrame;\n  }; //------------------------------------------------------------------------------\n  //\n  //  API\n  //\n  //------------------------------------------------------------------------------\n\n\n  return {\n    init: init,\n    previous: previous,\n    next: next,\n    isInteractive: isInteractive,\n    isReverse: isReverse,\n    getCurrentFrame: getCurrentFrame\n  };\n}; //------------------------------------------------------------------------------\n//\n//  Utilities\n//\n//------------------------------------------------------------------------------\n\n\nvar emptyDomNode = function emptyDomNode(element) {\n  if (element.hasChildNodes()) {\n    while (element.firstChild) {\n      element.removeChild(element.firstChild);\n    }\n  }\n};\n\nvar isTouchEvent = function isTouchEvent(e) {\n  return e.touches;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (threesixty);\n\n//# sourceURL=webpack://threesixty/./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack://threesixty/multi_./src/index.js?");

/***/ })

/******/ });
});