(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("threesixty", [], factory);
	else if(typeof exports === 'object')
		exports["threesixty"] = factory();
	else
		root["threesixty"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var threesixty = function threesixty(container, images, options) {
	  if (!container) {
	    throw new Error('A container argument is required');
	  }

	  if (!images) {
	    throw new Error('An images argument is required');
	  }

	  var defaults = {
	    interactive: true,
	    currentFrame: 0
	  };

	  var o = Object.assign({}, defaults, options);
	  var totalFrames = images.length;

	  var mouseX = 0;
	  var oldMouseX = 0;

	  //------------------------------------------------------------------------------
	  //
	  //  Initialisation
	  //
	  //------------------------------------------------------------------------------

	  var init = function init() {
	    preloadimages(images, start);
	  };

	  var preloadimages = function preloadimages(sourceImages, cb) {
	    var total = sourceImages.length;
	    var loaded = 0;

	    var onload = function onload() {
	      if (++loaded >= total) cb(finalImages);
	    };

	    var finalImages = sourceImages.map(function (item) {
	      var image = new Image();
	      image.src = item;
	      image.onload = onload;
	      image.onerror = onload;
	      image.onabort = onload;
	      image.draggable = false;
	      return image;
	    });
	  };

	  var start = function start(loadedImages) {
	    images = loadedImages;

	    emptyDomNode(container);
	    container.appendChild(images[o.currentFrame]);

	    if (o.interactive) {
	      initListeners();
	    }
	  };

	  //------------------------------------------------------------------------------
	  //
	  //  Events
	  //
	  //------------------------------------------------------------------------------

	  var initListeners = function initListeners() {
	    container.addEventListener('touchstart', startDrag);
	    container.addEventListener('mousedown', startDrag);
	  };

	  var drag = function drag(e) {
	    e.preventDefault();

	    mouseX = e.pageX !== undefined ? e.pageX : e.changedTouches[0].pageX;

	    if (mouseX < oldMouseX) {
	      previous();
	    } else if (mouseX > oldMouseX) {
	      next();
	    }

	    oldMouseX = mouseX;
	  };

	  var startDrag = function startDrag(e) {
	    e.preventDefault();
	    document.addEventListener('touchmove', drag);
	    document.addEventListener('mousemove', drag);
	    document.addEventListener('touchend', stopDrag);
	    document.addEventListener('mouseup', stopDrag);
	  };

	  var stopDrag = function stopDrag(e) {
	    e.preventDefault();
	    document.removeEventListener('touchmove', drag);
	    document.removeEventListener('mousemove', drag);
	    document.addEventListener('touchend', stopDrag);
	    document.addEventListener('mouseup', stopDrag);
	  };

	  //------------------------------------------------------------------------------
	  //
	  //  Sequence management
	  //
	  //------------------------------------------------------------------------------

	  var replaceImage = function replaceImage() {
	    container.replaceChild(images[o.currentFrame], container.childNodes[0]);
	  };

	  var previous = function previous() {
	    o.currentFrame--;
	    if (o.currentFrame < 0) o.currentFrame = totalFrames - 1;
	    replaceImage();
	  };

	  var next = function next() {
	    o.currentFrame++;
	    if (o.currentFrame === totalFrames) o.currentFrame = 0;
	    replaceImage();
	  };

	  var isInteractive = function isInteractive() {
	    return o.interactive;
	  };
	  var getCurrentFrame = function getCurrentFrame() {
	    return o.currentFrame;
	  };

	  //------------------------------------------------------------------------------
	  //
	  //  API
	  //
	  //------------------------------------------------------------------------------

	  return {
	    init: init,
	    previous: previous,
	    next: next,
	    isInteractive: isInteractive,
	    getCurrentFrame: getCurrentFrame
	  };
	};

	//------------------------------------------------------------------------------
	//
	//  Utilities
	//
	//------------------------------------------------------------------------------

	var emptyDomNode = function emptyDomNode(element) {
	  if (element.hasChildNodes()) {
	    while (element.firstChild) {
	      element.removeChild(element.firstChild);
	    }
	  }
	};

	exports.default = threesixty;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;