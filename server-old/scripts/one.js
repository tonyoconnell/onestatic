var addEvent = function addEvent(element, eventName, func) {
	if (element.addEventListener) {
    	return element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        return element.attachEvent("on" + eventName, func);
    }
};

addEvent(document.getElementById('open-left'), 'click', function(){
	snapper.open('left');
});

/* Prevent Safari opening links when viewing as a Mobile App */
(function (a, b, c) {
    if(c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener("click", function (a) {
            d = a.target;
            while(!f.test(d.nodeName)) d = d.parentNode;
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
        }, !1)
    }
})(document, window.navigator, "standalone");
/*
FlameViewportScale. 0.12. Facilitates a simple viewport scale query.
Optic Swerve, opticswerve.com
Documented at http://menacingcloud.com/?c=viewportScale
*/

/*--------------------------|
| FlameViewportScale		|
|--------------------------*/
function FlameViewportScale() {
	this.delay = 600; // Delay after calling update to account for viewport bounce
	this.orientation;
	this.screenWidth; // Screen width corrected for orientation
	this.timeout;
	this.viewportScale;

	// Get current scale
	//-------------------
	this.getScale = function() {
		this.viewportScale = undefined;

		// Get viewport width
		var viewportWidth = document.documentElement.clientWidth;

		// Abort. Screen width is greater than the viewport width (not fullscreen).
		if(screen.width > viewportWidth) {
			console.log('Aborted viewport scale measurement. Screen width > viewport width');
			return;

		}

		// Get the orientation corrected screen width
		this.updateOrientation();
		this.screenWidth = screen.width;

		if(this.orientation === 'portrait') {
			// Take smaller of the two dimensions
			if(screen.width > screen.height) this.screenWidth = screen.height;

		}
		else {
			// Take larger of the two dimensions
			if(screen.width < screen.height) this.screenWidth = screen.height;

		}

		// Calculate viewport scale
		this.viewportScale = this.screenWidth / window.innerWidth;
		return this.viewportScale;

	};

	// Update viewport orientation
	//-----------------------------
	this.updateOrientation = function() {
		this.orientation = window.orientation;

		if(this.orientation === undefined) {
			// No JavaScript orientation support. Work it out.
			if(document.documentElement.clientWidth > document.documentElement.clientHeight) this.orientation = 'landscape';
			else this.orientation = 'portrait';

		}
		else if(this.orientation === 0 || this.orientation === 180) this.orientation = 'portrait';
		else this.orientation = 'landscape'; // Assumed default, most laptop and PC screens.

	};

	// Update
	//--------	
	this.update = function(callback) {
		// Clear timeout if already set
		if(this.timeout !== undefined) {
			clearTimeout(this.timeout);
			this.timeout = undefined;

		}

		if(this.delay > 0) {
			// Delay compensates for viewport bounce
			var viewScale = this;

			this.timeout = setTimeout(function() {
				viewScale.getScale();
				if(callback !== undefined) callback();

			}, this.delay);

		}
		else {
			// Immediate scale update
			this.getScale();
			if(callback !== undefined) callback();

		}

	};

	return true;

}
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge]
 * @returns {Object} dest
 */
function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
function merge(dest, src) {
    return extend(dest, src, true);
}

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        extend(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument;
    return (doc.defaultView || doc.parentWindow);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = last.deltaX - input.deltaX;
        var deltaY = last.deltaY - input.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.allow = true; // used by Input.TouchMouse to disable mouse events
    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down, and mouse events are allowed (see the TouchMouse input)
        if (!this.pressed || !this.allow) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */
function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        // when we're in a touch event, so  block all upcoming mouse events
        // most mobile browser also emit mouseevents, right after touchstart
        if (isTouch) {
            this.mouse.allow = false;
        } else if (isMouse && !this.mouse.allow) {
            return;
        }

        // reset the allowMouse when we're done
        if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
            this.mouse.allow = true;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        // not needed with native support for the touchAction property
        if (NATIVE_TOUCH_ACTION) {
            return;
        }

        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // pan-x and pan-y can be combined
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.id = uniqueId();

    this.manager = null;
    this.options = merge(options || {}, this.defaults);

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        extend(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(withState) {
            self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(true);
        }

        emit(); // simple 'eventName' events

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(true);
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = extend({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {
        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        this._super.emit.call(this, input);
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            this.manager.emit(this.options.event + inOut, input);
        }
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 500, // minimal time of the pointer to be pressed
        threshold: 5 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.65,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.velocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.velocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.velocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.direction &&
            input.distance > this.options.threshold &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.direction);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 2, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED ) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create an manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.4';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, { enable: false }],
        [PinchRecognizer, { enable: false }, ['rotate']],
        [SwipeRecognizer,{ direction: DIRECTION_HORIZONTAL }],
        [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    options = options || {};

    this.options = merge(options, Hammer.defaults);
    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        extend(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        var recognizers = this.recognizers;
        recognizer = this.get(recognizer);
        recognizers.splice(inArray(recognizers, recognizer), 1);

        this.touchAction.update();
        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    each(manager.options.cssProps, function(value, name) {
        element.style[prefixed(element.style, name)] = add ? value : '';
    });
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

extend(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

if (typeof define == TYPE_FUNCTION && define.amd) {
    define(function() {
        return Hammer;
    });
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (arguments.length > 1 && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));

/*!
 * jQuery smartModal
 *
 * Version: 2.2.1
 * Author: Ben Marshall
 * Author URL: http://www.benmarshall.me
 * jQuery Plugin URL: http://plugins.jquery.com/smartModal/
 * Plugin URL: http://www.benmarshall.me/jquery-smartmodal/
 * GitHub: https://github.com/bmarshall511/jquery-smartModal
 *
 * Licensed under the MIT license
 */
/*jslint browser: true, devel: true, indent: 2 */

(function ($) {
  "use strict";

  var settings = {
    overlayDelay: 300,
    hideDelay: 300,
    cookieExpires: 365,
    debug: false,
    clickClose: true,
    animationDuration: 800,
    animationEasing: 'linear',
    gaTracking: false,
    shortkeys: true,
    onOpen: function ( id ) {
      return id;
    },
    onClose: function ( id ) {
      return id;
    }
  },
    storageEnabled = false,
    cookiesEnabled = false,
    gaEnabled = false,
    gaVersion = false,
    numModals = 0,
    timeouts = [],
    intervals = [],
    modalIDs = [],
    overlay = $('<div />').addClass('smartmodal-overlay').attr('id', 'smartmodal-overlay').css('display', 'none'), // Build the modal overlay.
    methods = {
      // Initialize the plugin
      'init': function () {
        // Check if GA is enabled
        if (settings.gaTracking) {
          if (typeof(_gaq) !== 'undefined') {
            gaEnabled = true;
            // Classic Analytics
            gaVersion = 'c';
          } else if (typeof(ga) !== 'undefined') {
            gaEnabled = true;
            // Universal Analytics
            gaVersion = 'u';
          } else if (settings.debug) {
            console.log('GA not loaded. Tracking disabled.');
          }
        }

        // Check if web storage is supported
        if (window.localStorage) {
          storageEnabled = true;
        } else {
          if (settings.debug) {
            console.log('Web storage not supported. Using jQuery.cookie plugin.');
          }
        }

        // Check if the jQuery.cookie plugin has been loaded
        if ($.cookie) {
          cookiesEnabled = true;
        } else {
          if (settings.debug) {
            console.log('jQuery.cookie plugin not loaded. Cookies have been disabled.');
          }
        }

        // Set the number of modals that appear on the page
        methods.countModals();

        // Setup the modals
        methods.setupModals();

        // Listen for events
        methods.eventHandler();
      },
      // Show the modal
      'showModal': function (id) {
        var modal = $('#' + id),
          animated = false,
          easing = settings.animationEasing,
          time = settings.animationDuration,
          animationStart,
          animationArray,
          autoclose = true,
          expires = settings.cookieExpires; // set the default time until a cookie expires;

        // Check to ensure the modal exists
        if (!modal.length) {
          if (settings.debug) {
            console.log('#' + id + ' not found.');
          }
          return false;
        }

        // Style and position the modal
        modal.addClass('smartmodal-modal');
        methods.positionModal(id);

        // Check if the overlay is already on the page
        if (!$('#smartmodal-overlay').length) {
          $('body').append(overlay);
        }

        // Check if the modal should be animated
        if (modal.data('animation')) {
          // Check if multiple parameters
          if (modal.data('animation').indexOf('|') >= 0) {
            animationArray = modal.data('animation').split('|');
            if (animationArray[0]) {
              animationStart = animationArray[0];
            }
            if (animationArray[1]) {
              easing = animationArray[1];
            }
            if (animationArray[2]) {
              time = parseInt(animationArray[2], 10);
            }
          } else {
            animationStart = modal.data('animation');
          }

          animated = true;
          methods.positionModal(id, animationStart);
        }

        // Display the modal
        overlay.fadeIn(settings.overlayDelay);
        if (animated) {
          modal.show().animate({
            left: methods.calculatePos(modal, 'left'),
            top: methods.calculatePos(modal, 'top')
          }, {
            duration: time,
            specialEasing: {
              top: easing
            }
          });
        } else {
          modal.fadeIn(settings.overlayDelay);
        }

        // Send event to Google Analytics if set
        if (gaEnabled && modal.data('name')) {
          methods.gaTrackEvent('jQuery.smartModal', modal.data('name'), 'Opened');
        }

        // Check for onOpen callback
        if (settings.onOpen) {
          if ($.isFunction( settings.onOpen )) {
            settings.onOpen( modal.attr('id') );
          } else if (settings.debug) {
            console.log( settings.onOpen + ' is not a valid function for onOpen.' );
          }
        }

        // Check if a timed modal
        if (modal.data('time')) {
          // Check if autoclose has been disabled
          if (modal.data('close') && modal.data('close') === 'manual') {
            autoclose = false;
            $('.close', modal).hide();
          }

          if (autoclose) {
            // Set a timeout
            timeouts[id] = window.setTimeout(function () {
              // Check if a sticky modal
              var isSticky = false;
              if (modal.hasClass('sticky')) {
                modal.removeClass('sticky');
                isSticky = true;
              }
              methods.closeModal(id);

              // If sticky, make it sticky again
              if (isSticky) {
                modal.addClass('sticky');
              }
            }, (modal.data('time') * 1000));
          }

          // Check if seconds should be displayed in the modal
          if ($('.sec', modal).length) {
            // Show the starting time
            $('.sec', modal).text(modal.data('time'));

            // Set an interval for the countdown
            intervals[id] = window.setInterval(function () {
              var sec = parseInt($('.sec', modal).text(), 10) - 1;
              if (sec >= 0) {
                $('.sec', modal).text(sec);
              } else {
                // Check if autoclose has been disabled, if so show the close trigger
                if (!autoclose && $('.close', modal).is(':hidden')) {
                  // Check if timed sticky, if so make it unsticky
                  if (modal.hasClass('sticky') && modal.data('time')) {
                    modal.removeClass('sticky').addClass('wasSticky');
                  }
                  $('.close', modal).show();
                }
                window.clearInterval(intervals[id]);
              }
            }, 1000);
          }
        }

        // Check if the modal should only be shown once
        if (modal.hasClass('once')) {
          // Use web storage if supported
          if (storageEnabled) {
            localStorage['smartModal-' + id] = 'shown';
          } else if (cookiesEnabled) {
            // Check if modal has specified cookie expire limit
            if (modal.data('expires')) {
              expires = modal.data('expires');
            }

            // Set the cookie.
            $.cookie('smartModal-' + id, 'shown', { 'path' : '/', 'expires' : expires });
          }
        }
      },
      // Close a modal
      'closeModal': function (id) {
        // Check to make sure the modal exists
        if ($('#' + id).length) {
          var modal = $('#' + id);

          // Check if it's a sticky modal
          if (!modal.hasClass('sticky')) {
            // Check if modal was a sticky, if so, make it sticky again
            if (modal.hasClass('wasSticky')) {
              modal.removeClass('wasSticky').addClass('sticky');
            }

            // Check if a interval for the modal has been set
            if (intervals[id]) {
              window.clearInterval(intervals[id]);
            }

            // Check if a timeout for the modal has been set
            if (timeouts[id]) {
              window.clearTimeout(timeouts[id]);
            }

            modal.fadeOut(settings.hideDelay, function () {
              // Make sure no other modals are active before removing the overlay
              if (!$('.smartmodal-modal:visible').length) {
                methods.removeOverlay();
              }
            });

            // Send event to Google Analytics if set
            if (gaEnabled && modal.data('name')) {
              methods.gaTrackEvent('jQuery.smartModal', modal.data('name'), 'Closed');
            }

            // Check for onClose callback
            if (settings.onClose) {
              if ($.isFunction( settings.onClose )) {
                settings.onClose( modal.attr('id') );
              } else if (settings.debug) {
                console.log( settings.onClose + ' is not a valid function for onClose.' );
              }
            }
          }
        }
      },
      // Remove the modal overlay
      'removeOverlay': function () {
        if ($('#smartmodal-overlay').length) {
          $('#smartmodal-overlay').fadeOut(settings.hideDelay, function () {
            $(this).remove();
          });
        }
      },
      // Position the modal
      'positionModal': function (id, start) {
        if (id) {
          // Check to make sure the modal exists
          if ($('#' + id).length) {

            // Get the modal
            var modal = $('#' + id);

            if (start) {
              switch (start) {
              case 'top':
                modal.css({
                  'top': -(modal.height()),
                  'left': methods.calculatePos(modal, 'left')
                });
                break;
              case 'bottom':
                modal.css({
                  'top': $(window).height() + modal.height(),
                  'left': methods.calculatePos(modal, 'left')
                });
                break;
              case 'left':
                modal.css({
                  'top': methods.calculatePos(modal, 'top'),
                  'left': -(modal.width())
                });
                break;
              case 'right':
                modal.css({
                  'top': methods.calculatePos(modal, 'top'),
                  'left': $(window).width() + modal.width()
                });
                break;
              }
            } else {
              // Center the modal
              modal.css({
                'top': methods.calculatePos(modal, 'top'),
                'left': methods.calculatePos(modal, 'left')
              });
            }
          }
        }
      },
      'calculatePos': function (modal, pos) {
        // Get the window's dimisions
        var width = $(window).width(), // Get the window's width
          height = $(window).height(), // Get the window's height
          mwidth = modal.width(), // Get the modal's width
          mheight = modal.height(); // Get the modal's height

        switch (pos) {
        case 'left':
          return (width - mwidth) / 2;
        case 'top':
          return (height - mheight) / 2;
        }
      },
      // // Counts the number of modals on the page
      'countModals': function () {
        numModals = $('.smartmodal').length;
        if (settings.debug) {
          console.log(numModals + ' modals found.');
        }
      },
      'eventHandler': function () {
        // Check if shortkeys are enabled
        if (settings.shortkeys) {
          // Listen for ESC key.
          $(document).keyup(function (e) {
            if (e.keyCode === 27) { // esc
              $.each($('.smartmodal-modal'), function () {
                if (!$(this).hasClass('sticky')) {
                  var id = $(this).attr('id');

                  methods.closeModal(id);
                }
              });
            }
          });
        }

        // Listen when the close trigger is clicked
        $('.smartmodal .close').bind("click", function () {
          var id = $(this).closest('.smartmodal').attr('id');
          methods.closeModal(id);
        });

        // Listen for window resize
        $(window).resize(function () {
          $.each($('.smartmodal'), function () {
            var id = $(this).attr('id');
            methods.positionModal(id);
          });
        });

        // Check if clicking on the overlay to close is enabled
        if (settings.clickClose) {
          $('body').delegate("#smartmodal-overlay", "click", function (e) {
            e.preventDefault();
            $.each($('.smartmodal-modal'), function () {
              methods.closeModal($(this).attr('id'));
            });
          });
        }
      },
      // Setup the modals
      'setupModals': function () {
        // Find and initialize all modals
        $('.smartmodal').each(function () {
          var modal = $(this), // Get the modal
            c = true,
            id,
            i;

          // Check to ensure each modal has an ID, if not, assign one
          if (!modal.attr('id')) {
            while (c) {
              i = 'SM-' + Math.floor((Math.random() * numModals) + 1);
              if (!$('#' + i).length) {
                modal.attr('id', i);
                c = false;
              }
            }
          }

          id = modal.attr('id'); // Get the modal id

          // Check if duplicate IDs exist
          if ($.inArray(id, modalIDs) > -1) {
            if (settings.debug) {
              console.log(' Multiple #' + id);
            }
          }
          modalIDs.push(id);

          // Hide smartModals by default.
          modal.hide();

          // Check if modal should appear automagically
          if (modal.hasClass('once')) {
            // First, check web storage
            if (storageEnabled) {
              if (localStorage['smartModal-' + id] === 'shown') {
                modal = false;
                methods.countModals();
              }
            // If web storage isn't supported, check cookies
            } else if (cookiesEnabled) {
              if ($.cookie('smartModal-' + id) === 'shown') {
                modal = false;
                methods.countModals();
              }
            }
          }

          // Check if it's an active modal.
          if (modal) {
            // Check if the modal should popup automagically
            if (modal.hasClass('auto')) {
              // Check if a timer has been set to show the modal
              if (modal.data('wait')) {
                // Set the timeout
                setTimeout(function () {
                  methods.showModal(id);
                }, (modal.data('wait') * 1000));
              } else {
                // Show the modal as soon as the page has loaded
                methods.showModal(id);
              }
            }
          }

          // Check if a modal trigger is on the page
          if ($('.' + id).length) {
            // Bind the modal trigger to the click event
            $('.' + id).bind('click', function (e) {
              e.preventDefault();
              methods.showModal(id);
            });
          }
        });
      },
      // Google Analytics event tracking (https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide)
      'gaTrackEvent': function (category, action, label, value) {
        if (gaEnabled) {
          if (gaVersion === 'c') {
            _gaq.push([
              '_trackEvent', category, action, label, value
            ]);
          } else if (gaVersion === 'u') {
            ga('send', 'event', category, action, label, value);
          }
        }
      }
    };

  $.smartModal = function (options, id) {
    if (typeof options === 'object') {
      settings = $.extend(settings, options);
      methods.init();
    } else if (typeof options === 'string' && typeof id === 'string') {
      switch (options) {
      case 'show':
        methods.showModal(id);
        break;
      case 'hide':
        methods.closeModal(id);
        break;
      default:
        if (settings.debug) {
          console.log(options + 'not valid.');
        }
        break;
      }
    } else if (typeof options === 'string' && typeof id === 'object') {
      switch (options) {
      case 'init':
        if (id) {
          settings = $.extend(settings, id);
        }
        methods.init();
        break;
      case 'settings':
        settings = $.extend(settings, id);
        break;
      default:
        if (settings.debug) {
          console.log(options + ' not valid.');
        }
        break;
      }
    } else {
      methods.init();
    }
  };
}(jQuery));

/*
 *	jQuery Touch Optimized Sliders "R"Us 2.2.1
 *	
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	tosrus.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */
!function(s){function i(){o=function(s){return t+"-"+s},d=function(s){return t+"-"+s},r=function(s){return s+"."+t},s.each([o,d,r],function(s,i){i.add=function(s){s=s.split(" ");for(var e in s)i[s[e]]=i(s[e])}}),o.add("touch desktop scale-1 scale-2 scale-3 wrapper opened opening fixed inline hover slider slide loading noanimation fastanimation"),d.add("slide anchor"),r.add("open opening close closing prev next slideTo sliding click pinch scroll resize orientationchange load loading loaded transitionend webkitTransitionEnd"),a={complObject:function(i,e){return s.isPlainObject(i)||(i=e),i},complBoolean:function(s,i){return"boolean"!=typeof s&&(s=i),s},complNumber:function(i,e){return s.isNumeric(i)||(i=e),i},complString:function(s,i){return"string"!=typeof s&&(s=i),s},isPercentage:function(s){return"string"==typeof s&&"%"==s.slice(-1)},getPercentage:function(s){return parseInt(s.slice(0,-1))},resizeRatio:function(s,i,e,t,n){var o=i.width(),d=i.height();e&&o>e&&(o=e),t&&d>t&&(d=t),n>o/d?d=o/n:o=d*n,s.width(o).height(d)},transitionend:function(s,i,e){var t=!1,n=function(){t||i.call(s[0]),t=!0};s.one(r.transitionend,n),s.one(r.webkitTransitionEnd,n),setTimeout(n,1.1*e)},setViewportScale:function(){if(l.viewportScale){var s=l.viewportScale.getScale();"undefined"!=typeof s&&(s=1/s,l.$body.removeClass(o["scale-1"]).removeClass(o["scale-2"]).removeClass(o["scale-3"]).addClass(o["scale-"+Math.max(Math.min(Math.round(s),3),1)]))}}},l={$wndw:s(window),$html:s("html"),$body:s("body"),scrollPosition:0,viewportScale:null,viewportScaleInterval:null},l.$body.addClass(s[e].support.touch?o.touch:o.desktop),l.$wndw.on(r.scroll,function(s){l.$body.hasClass(o.opened)&&(window.scrollTo(0,l.scrollPosition),s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation())}),!l.viewportScale&&s[e].support.touch&&"undefined"!=typeof FlameViewportScale&&(l.viewportScale=new FlameViewportScale,a.setViewportScale(),l.$wndw.on(r.orientationchange+" "+r.resize,function(){l.viewportScaleInterval&&(clearTimeout(l.viewportScaleInterval),l.viewportScaleInterval=null),l.viewportScaleInterval=setTimeout(function(){a.setViewportScale()},500)})),s[e]._c=o,s[e]._d=d,s[e]._e=r,s[e]._f=a,s[e]._g=l}var e="tosrus",t="tos",n="2.2.1";if(!s[e]){var o={},d={},r={},a={},l={};s[e]=function(s,i,e){return this.$node=s,this.opts=i,this.conf=e,this.vars={},this.nodes={},this.slides={},this._init(),this},s[e].prototype={_init:function(){var i=this;this._complementOptions(),this.vars.fixed="window"==this.opts.wrapper.target,this.nodes.$wrpr=s('<div class="'+o.wrapper+'" />'),this.nodes.$sldr=s('<div class="'+o.slider+'" />').appendTo(this.nodes.$wrpr),this.nodes.$wrpr.addClass(this.vars.fixed?o.fixed:o.inline).addClass(o("fx-"+this.opts.effect)).addClass(o(this.opts.slides.scale)).addClass(this.opts.wrapper.classes),this.nodes.$wrpr.on(r.open+" "+r.close+" "+r.prev+" "+r.next+" "+r.slideTo,function(s){arguments=Array.prototype.slice.call(arguments);var s=arguments.shift(),e=s.type;s.stopPropagation(),"function"==typeof i[e]&&i[e].apply(i,arguments)}).on(r.opening+" "+r.closing+" "+r.sliding+" "+r.loading+" "+r.loaded,function(s){s.stopPropagation()}).on(r.click,function(s){switch(s.stopPropagation(),i.opts.wrapper.onClick){case"toggleUI":i.nodes.$wrpr.toggleClass(o.hover);break;case"close":i.close()}}),this.nodes.$anchors=this._initAnchors(),this.nodes.$slides=this._initSlides(),this.slides.total=this.nodes.$slides.length,this.slides.visible=this.opts.slides.visible,this.slides.index=0,this.vars.opened=!0;for(var t=0;t<s[e].addons.length;t++)s.isFunction(this["_addon_"+s[e].addons[t]])&&this["_addon_"+s[e].addons[t]]();for(var n=0;n<s[e].ui.length;n++)this.nodes.$wrpr.find("."+o[s[e].ui[n]]).length&&this.nodes.$wrpr.addClass(o("has-"+s[e].ui[n]));this.vars.fixed?(this.nodes.$wrpr.appendTo(l.$body),this.close(!0)):(this.nodes.$wrpr.appendTo(this.opts.wrapper.target),this.opts.show?(this.vars.opened=!1,this.open(0,!0)):this.close(!0))},open:function(i,e){var t=this;this.vars.opened||(this.vars.fixed&&(l.scrollPosition=l.$wndw.scrollTop(),l.$body.addClass(o.opened),a.setViewportScale()),e?this.nodes.$wrpr.addClass(o.opening).trigger(r.opening,[i,e]):setTimeout(function(){t.nodes.$wrpr.addClass(o.opening).trigger(r.opening,[i,e])},5),this.nodes.$wrpr.addClass(o.hover).addClass(o.opened)),this.vars.opened=!0,this._loadContents(),s.isNumeric(i)&&(e=e||!this.vars.opened,this.slideTo(i,e))},close:function(i){this.vars.opened&&(this.vars.fixed&&l.$body.removeClass(o.opened),i?this.nodes.$wrpr.removeClass(o.opened):a.transitionend(this.nodes.$wrpr,function(){s(this).removeClass(o.opened)},this.conf.transitionDuration),this.nodes.$wrpr.removeClass(o.hover).removeClass(o.opening).trigger(r.closing,[this.slides.index,i])),this.vars.opened=!1},prev:function(i,e){s.isNumeric(i)||(i=this.opts.slides.slide),this.slideTo(this.slides.index-i,e)},next:function(i,e){s.isNumeric(i)||(i=this.opts.slides.slide),this.slideTo(this.slides.index+i,e)},slideTo:function(i,t){if(!this.vars.opened)return!1;if(!s.isNumeric(i))return!1;var n=!0;if(0>i){var d=0==this.slides.index;this.opts.infinite?i=d?this.slides.total-this.slides.visible:0:(i=0,d&&(n=!1))}if(i+this.slides.visible>this.slides.total){var l=this.slides.index+this.slides.visible>=this.slides.total;this.opts.infinite?i=l?0:this.slides.total-this.slides.visible:(i=this.slides.total-this.slides.visible,l&&(n=!1))}if(this.slides.index=i,this._loadContents(),n){var h=0-this.slides.index*this.opts.slides.width+this.opts.slides.offset;this.slides.widthPercentage&&(h+="%"),t&&(this.nodes.$sldr.addClass(o.noanimation),a.transitionend(this.nodes.$sldr,function(){s(this).removeClass(o.noanimation)},5));for(var c in s[e].effects)if(c==this.opts.effect){s[e].effects[c].call(this,h,t);break}this.nodes.$wrpr.trigger(r.sliding,[i,t])}},_initAnchors:function(){var i=this,t=s();if(this.$node.is("a"))for(var n in s[e].media)t=t.add(this.$node.filter(function(){return s[e].media[n].filterAnchors.call(i,s(this).attr("href"))}));return t},_initSlides:function(){return this[this.$node.is("a")?"_initSlidesFromAnchors":"_initSlidesFromContent"](),this.nodes.$sldr.children().css("width",this.opts.slides.width+(this.slides.widthPercentage?"%":"px"))},_initSlidesFromAnchors:function(){var i=this;this.nodes.$anchors.each(function(e){var t=s(this),n=s('<div class="'+o.slide+" "+o.loading+'" />').data(d.anchor,t).appendTo(i.nodes.$sldr);t.data(d.slide,n).on(r.click,function(s){s.preventDefault(),i.open(e)})})},_initSlidesFromContent:function(){var i=this;this.$node.children().each(function(){var t=s(this);s('<div class="'+o.slide+'" />').append(t).appendTo(i.nodes.$sldr);for(var n in s[e].media)if(s[e].media[n].filterSlides.call(i,t)){s[e].media[n].initSlides.call(i,t),t.parent().addClass(o(n));break}})},_loadContents:function(){var s=this;switch(this.opts.slides.load){case"all":this._loadContent(0,this.slides.total);break;case"visible":this._loadContent(this.slides.index,this.slides.index+this.slides.visible);break;case"near-visible":default:this._loadContent(this.slides.index,this.slides.index+this.slides.visible),setTimeout(function(){s._loadContent(s.slides.index-s.slides.visible,s.slides.index),s._loadContent(s.slides.index+s.slides.visible,s.slides.index+2*s.slides.visible)},this.conf.transitionDuration)}},_loadContent:function(i,t){var n=this;this.nodes.$slides.slice(i,t).each(function(){var i=s(this);if(0==i.children().length){var t=i.data(d.anchor).attr("href");for(var a in s[e].media)if(s[e].media[a].filterAnchors.call(n,t)){s[e].media[a].initAnchors.call(n,i,t),i.addClass(o(a));break}i.trigger(r.loading,[i.data(d.anchor)])}})},_complementOptions:function(){if("undefined"==typeof this.opts.wrapper.target&&(this.opts.wrapper.target=this.$node.is("a")?"window":this.$node),"window"!=this.opts.wrapper.target&&"string"==typeof this.opts.wrapper.target&&(this.opts.wrapper.target=s(this.opts.wrapper.target)),this.opts.show=a.complBoolean(this.opts.show,"window"!=this.opts.wrapper.target),s.isNumeric(this.opts.slides.width))this.slides.widthPercentage=!1,this.opts.slides.visible=a.complNumber(this.opts.slides.visible,1);else{var i=a.isPercentage(this.opts.slides.width)?a.getPercentage(this.opts.slides.width):!1;this.slides.widthPercentage=!0,this.opts.slides.visible=a.complNumber(this.opts.slides.visible,i?Math.floor(100/i):1),this.opts.slides.width=i?i:Math.ceil(1e4/this.opts.slides.visible)/100}this.opts.slides.slide=a.complNumber(this.opts.slides.slide,this.opts.slides.visible),this.opts.slides.offset=a.isPercentage(this.opts.slides.offset)?a.getPercentage(this.opts.slides.offset):a.complNumber(this.opts.slides.offset,0)},_uniqueID:function(){return this.__uniqueID||(this.__uniqueID=0),this.__uniqueID++,o("uid-"+this.__uniqueID)}},s.fn[e]=function(t,n,o,d){l.$wndw||i(),t=s.extend(!0,{},s[e].defaults,t),t=s.extend(!0,{},t,s[e].support.touch?o:n),d=s.extend(!0,{},s[e].configuration,d);var r=new s[e](this,t,d);return this.data(e,r),r.nodes.$wrpr},s[e].support={touch:"ontouchstart"in window.document},s[e].defaults={infinite:!1,effect:"slide",wrapper:{classes:"",onClick:"toggleUI"},slides:{offset:0,scale:"fit",load:"near-visible",visible:1}},s[e].configuration={transitionDuration:400},s[e].debug=function(){},s[e].deprecated=function(s,i){"undefined"!=typeof console&&"undefined"!=typeof console.warn&&console.warn(e+": "+s+" is deprecated, use "+i+" instead.")},s[e].effects={slide:function(s){this.nodes.$sldr.css("left",s)},fade:function(i){a.transitionend(this.nodes.$sldr,function(){s(this).css("left",i).css("opacity",1)},this.conf.transitionDuration),this.nodes.$sldr.css("opacity",0)}},s[e].version=n,s[e].media={},s[e].addons=[],s[e].ui=[]}}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Buttons addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(s){function e(e,n){return s('<a class="'+t[e]+n+'" href="#"><span></span></a>')}function n(s,e,n,t){e.on(o.click,function(e){e.preventDefault(),e.stopPropagation(),s.trigger(o[n],[t])})}var t,i,o,d,p,l="tosrus",r="buttons",a=!1;s[l].prototype["_addon_"+r]=function(){a||(t=s[l]._c,i=s[l]._d,o=s[l]._e,d=s[l]._f,p=s[l]._g,t.add("prev next close disabled"),a=!0);var u=this,h=this.opts[r];this.nodes.$prev=null,this.nodes.$next=null,this.nodes.$clse=null,("boolean"==typeof h||"string"==typeof h&&"inline"==h)&&(h={prev:h,next:h}),"undefined"==typeof h.close&&(h.close=this.vars.fixed),this.nodes.$slides.length<2&&(h.prev=!1,h.next=!1),s.each({prev:"prev",next:"next",close:"clse"},function(i,d){h[i]&&("string"==typeof h[i]&&"inline"==h[i]?u.vars.fixed&&"close"!=i&&u.nodes.$slides.on(o.loading,function(){var o=e(i," "+t.inline)["prev"==i?"prependTo":"appendTo"](this);n(u.nodes.$wrpr,o,i,1),u.opts.infinite||("prev"==i&&s(this).is(":first-child")||"next"==i&&s(this).is(":last-child"))&&o.addClass(t.disabled)}):("string"==typeof h[i]&&(h[i]=s(h[i])),u.nodes["$"+d]=h[i]instanceof s?h[i]:e(i,"").appendTo(u.nodes.$wrpr),n(u.nodes.$wrpr,u.nodes["$"+d],i,null)))}),this.opts.infinite||(this.updateButtons(),this.nodes.$wrpr.on(o.sliding,function(){u.updateButtons()}))},s[l].prototype.updateButtons=function(){this.nodes.$prev&&this.nodes.$prev[(this.slides.index<1?"add":"remove")+"Class"](t.disabled),this.nodes.$next&&this.nodes.$next[(this.slides.index>=this.slides.total-this.slides.visible?"add":"remove")+"Class"](t.disabled)},s[l].defaults[r]={prev:!s[l].support.touch,next:!s[l].support.touch},s[l].addons.push(r),s[l].ui.push("prev"),s[l].ui.push("next"),s[l].ui.push("close")}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Caption addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(t){var i,s,a,e,d,n="tosrus",r="caption",o=!1;t[n].prototype["_addon_"+r]=function(){o||(i=t[n]._c,s=t[n]._d,a=t[n]._e,e=t[n]._f,d=t[n]._g,i.add("caption uibg"),s.add("caption"),o=!0);var p=this,c=this.opts[r];if(c.add){c.attributes=c.attributes||[],"string"==typeof c.target&&(c.target=t(c.target)),c.target instanceof t?this.nodes.$capt=c.target:(this.nodes.$capt=t('<div class="'+i.caption+'" />').appendTo(this.nodes.$wrpr),this.nodes.$uibg||(this.nodes.$uibg=t('<div class="'+i.uibg+'" />').prependTo(this.nodes.$wrpr)));for(var h=0,l=this.slides.visible;l>h;h++)t('<div class="'+i.caption+"-"+h+'" />').css("width",this.opts.slides.width+(this.slides.widthPercentage?"%":"px")).appendTo(this.nodes.$capt);this.nodes.$slides.each(function(){var i=t(this),a=p.vars.fixed?i.data(s.anchor):i.children();i.data(s.caption,"");for(var e=0,d=c.attributes.length;d>e;e++){var n=a.attr(c.attributes[e]);if(n&&n.length){i.data(s.caption,n);break}}}),this.nodes.$wrpr.on(a.sliding,function(){for(var t=0,i=p.slides.visible;i>t;t++)p.nodes.$capt.children().eq(t).text(p.nodes.$sldr.children().eq(p.slides.index+t).data(s.caption)||"")})}},t[n].defaults[r]={add:!1,target:null,attributes:["title","alt","rel"]},t[n].addons.push(r),t[n].ui.push("caption")}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Drag addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(e){if("function"==typeof Hammer){var n,s,t,i,r,a="tosrus",o="drag",d=!1;e[a].prototype["_addon_"+o]=function(){d||(n=e[a]._c,s=e[a]._d,t=e[a]._e,i=e[a]._f,r=e[a]._g,d=!0);var l=this;if(this.opts[o]&&"slide"==this.opts.effect){if(Hammer.VERSION<2)return e[a].deprecated("Older version of the Hammer library","version 2 or newer"),void 0;if(this.nodes.$slides.length>1){var f=0,p=!1,h=!1,c=new Hammer(this.nodes.$wrpr[0]);c.on("panstart panleft panright panend swipeleft swiperight",function(e){e.preventDefault()}).on("panstart",function(){l.nodes.$sldr.addClass(n.noanimation)}).on("panleft panright",function(e){switch(f=e.deltaX,h=!1,e.direction){case 2:p="left";break;case 4:p="right";break;default:p=!1}("left"==p&&l.slides.index+l.slides.visible>=l.slides.total||"right"==p&&0==l.slides.index)&&(f/=2.5),l.nodes.$sldr.css("margin-left",Math.round(f))}).on("swipeleft swiperight",function(){h=!0}).on("panend",function(){if(l.nodes.$sldr.removeClass(n.noanimation).addClass(n.fastanimation),i.transitionend(l.nodes.$sldr,function(){l.nodes.$sldr.removeClass(n.fastanimation)},l.conf.transitionDuration/2),l.nodes.$sldr.css("margin-left",0),"left"==p||"right"==p){if(h)var e=l.slides.visible;else var s=l.nodes.$slides.first().width(),e=Math.floor((Math.abs(f)+s/2)/s);e>0&&l.nodes.$wrpr.trigger(t["left"==p?"next":"prev"],[e])}p=!1})}}},e[a].defaults[o]=e[a].support.touch,e[a].addons.push(o)}}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Keys addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(e){var t,o,s,n,r,a="tosrus",p="keys",d=!1;e[a].prototype["_addon_"+p]=function(){d||(t=e[a]._c,o=e[a]._d,s=e[a]._e,n=e[a]._f,r=e[a]._g,s.add("keyup"),d=!0);var c=this,i=this.opts[p];"boolean"==typeof i&&i&&(i={prev:37,next:39,close:27}),e.isPlainObject(i)&&(this.nodes.$slides.length<2&&(i.prev=!1,i.next=!1),e(document).on(s.keyup,function(e){if(c.vars.opened){var t=!1;switch(e.keyCode){case i.prev:t=s.prev;break;case i.next:t=s.next;break;case i.close:t=s.close}t&&(e.preventDefault(),e.stopPropagation(),c.nodes.$wrpr.trigger(t))}}))},e[a].defaults[p]=!1,e[a].addons.push(p)}(jQuery);
/*	
 *	jQuery Touch Optimized Sliders "R"Us
 *	Pagination addon
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */

 (function( $ ) {
 
 	var _PLUGIN_ = 'tosrus',
		_ADDON_  = 'pagination';

	var _addonInitiated = false,
		_c, _d, _e, _f, _g;

	$[ _PLUGIN_ ].prototype[ '_addon_' + _ADDON_ ] = function()
	{		
		if ( !_addonInitiated )
		{
			_c = $[ _PLUGIN_ ]._c;
			_d = $[ _PLUGIN_ ]._d;
			_e = $[ _PLUGIN_ ]._e;
			_f = $[ _PLUGIN_ ]._f;
			_g = $[ _PLUGIN_ ]._g;

			_c.add( 'pagination selected uibg bullets thumbnails' );

			_addonInitiated = true;
		}

		var that = this,
			pagr = this.opts[ _ADDON_ ];


		//	DEPRECATED
		if ( typeof pagr == 'boolean' )
		{
			$[ _PLUGIN_ ].deprecated( 'A boolean for the option "pagination"', 'the option "pagination.add"' );
		}
		if ( typeof pagr == 'string' )
		{
			$[ _PLUGIN_ ].deprecated( 'A string for the option "pagination"', 'the option "pagination.target"' );
		}
		if ( pagr instanceof $ )
		{
			$[ _PLUGIN_ ].deprecated( 'A jQuery object for the option "pagination"', 'the option "pagination.target"' );
		}
		//	/DEPRECATED


		if ( this.nodes.$slides.length < 2 )
		{
			pagr.add = false;
		}

		if ( pagr.add )
		{
			if ( typeof pagr.target == 'string' )
			{
				pagr.target = $(pagr.target);
			}
			if ( pagr.target instanceof $ )
			{
				this.nodes.$pagr = pagr.target;
			}
			else
			{
				this.nodes.$pagr = $('<div class="' + _c.pagination + ' ' + _c[ pagr.type ] + '" />').appendTo( this.nodes.$wrpr );
				if ( !this.nodes.$uibg )
				{
					this.nodes.$uibg = $('<div class="' + _c.uibg + '" />').prependTo( this.nodes.$wrpr );
				}
			}

			if ( typeof pagr.anchorBuilder != 'function' )
			{
				switch( pagr.type )
				{
					case 'thumbnails':
						if ( this.vars.fixed )
						{
							pagr.anchorBuilder = function( index )
							{
								return '<a href="#" style="background-image: url(' + $(this).data( _d.anchor ).attr( 'href' ) + ');"></a>';
							};
						}
						else
						{
							pagr.anchorBuilder = function( index )
							{
								return '<a href="#" style="background-image: url(' + $(this).find( 'img' ).attr( 'src' ) + ');"></a>';
							};
						}
						break;

					case 'bullets':
					default:
						pagr.anchorBuilder = function( index )
						{
							return '<a href="#"></a>';
						};
						break;
				}
			}

			this.nodes.$slides
				.each(
					function( index )
					{
						$(pagr.anchorBuilder.call( this, index + 1 ) )
							.appendTo( that.nodes.$pagr )
							.on( _e.click,
								function( e )
								{
									e.preventDefault();
									e.stopPropagation();

									that.nodes.$wrpr.trigger( _e.slideTo, [ index ] );
								}
							);
					}
				);
			
			this.updatePagination();
			this.nodes.$wrpr
				.on( _e.sliding,
					function( e, slide, direct )
					{
						that.updatePagination();
					}
				);
		}
	};
	
	$[ _PLUGIN_ ].prototype.updatePagination = function()
	{
		if ( this.nodes.$pagr )
		{
			this.nodes.$pagr
				.children()
				.removeClass( _c.selected )
				.eq( this.slides.index )
				.addClass( _c.selected );
		}
	};

	//	Defaults
	$[ _PLUGIN_ ].defaults[ _ADDON_ ] = {
		add				: false,
		type			: 'bullets',
		target			: null,
		anchorBuilder	: null
	};

	//	Add to plugin
	$[ _PLUGIN_ ].addons.push( _ADDON_ );
	$[ _PLUGIN_ ].ui.push( 'pagination' );
	$[ _PLUGIN_ ].ui.push( 'bullets' );
	$[ _PLUGIN_ ].ui.push( 'thumbnails' );


})( jQuery );
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * HTML media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(i){var n="tosrus",e="html";i[n].media[e]={filterAnchors:function(n){return"#"==n.slice(0,1)&&i(n).is("div")},initAnchors:function(e,t){i('<div class="'+i[n]._c("html")+'" />').append(i(t)).appendTo(e),e.removeClass(i[n]._c.loading).trigger(i[n]._e.loaded)},filterSlides:function(i){return i.is("div")},initSlides:function(){}}}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Images media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(i){var n="tosrus",o="image";i[n].media[o]={filterAnchors:function(n){return i.inArray(n.toLowerCase().split(".").pop().split("?")[0],["jpg","jpe","jpeg","gif","png"])>-1},initAnchors:function(o,r){i('<img border="0" />').on(i[n]._e.load,function(r){r.stopPropagation(),o.removeClass(i[n]._c.loading).trigger(i[n]._e.loaded)}).appendTo(o).attr("src",r)},filterSlides:function(i){return i.is("img")},initSlides:function(){}}}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Vimeo media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(i){function t(t){function l(){m.length&&(m.attr("src",""),m.attr("src",h))}c||(o=i[s]._c,a=i[s]._d,e=i[s]._e,r=i[s]._f,n=i[s]._g,a.add("ratio maxWidth maxHeight"),c=!0);var m=t.children(),f=t.data(i[s]._d.anchor)||i(),h=m.attr("src"),u=f.data(a.ratio)||this.opts[d].ratio,g=f.data(a.maxWidth)||this.opts[d].maxWidth,p=f.data(a.maxHeight)||this.opts[d].maxHeight;t.removeClass(o.loading).trigger(e.loaded).on(e.loading,function(){r.resizeRatio(m,t,g,p,u)}),this.nodes.$wrpr.on(e.sliding,function(){l()}).on(e.closing,function(){l()}),n.$wndw.on(e.resize,function(){r.resizeRatio(m,t,g,p,u)})}var o,a,e,r,n,s="tosrus",d="vimeo",c=!1;i[s].media[d]={filterAnchors:function(i){return i.toLowerCase().indexOf("vimeo.com/")>-1},initAnchors:function(o,a){var e=this._uniqueID();a=a.split("vimeo.com/")[1].split("?")[0]+"?api=1&player_id="+e,i('<iframe id="'+e+'" src="http://player.vimeo.com/video/'+a+'" frameborder="0" allowfullscreen />').appendTo(o),t.call(this,o)},filterSlides:function(i){return i.is("iframe")&&i.attr("src")?i.attr("src").toLowerCase().indexOf("vimeo.com/video/")>-1:!1},initSlides:function(i){t.call(this,i)}},i[s].defaults[d]={ratio:16/9,maxWidth:!1,maxHeight:!1}}(jQuery);
/*	
 * jQuery Touch Optimized Sliders "R"Us
 * Youtube media
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 */
!function(t){function i(i){function u(t){l.length&&l[0].contentWindow.postMessage('{ "event": "command", "func": "'+t+'Video" }',"*")}c||(e=t[s]._c,o=t[s]._d,a=t[s]._e,n=t[s]._f,r=t[s]._g,o.add("ratio maxWidth maxHeight"),c=!0);var l=i.children(),m=i.data(t[s]._d.anchor)||t(),h=m.data(o.ratio)||this.opts[d].ratio,p=m.data(o.maxWidth)||this.opts[d].maxWidth,f=m.data(o.maxHeight)||this.opts[d].maxHeight;i.removeClass(e.loading).trigger(a.loaded).on(a.loading,function(){n.resizeRatio(l,i,p,f,h)}),this.nodes.$wrpr.on(a.sliding,function(){u("pause")}).on(a.closing,function(){u("stop")}),r.$wndw.on(a.resize,function(){n.resizeRatio(l,i,p,f,h)})}var e,o,a,n,r,s="tosrus",d="youtube",c=!1;t[s].media[d]={filterAnchors:function(t){return t.toLowerCase().indexOf("youtube.com/watch?v=")>-1},initAnchors:function(e,o){var a=o;o=o.split("?v=")[1].split("&")[0],this.opts[d].imageLink?(o="http://img.youtube.com/vi/"+o+"/0.jpg",t('<a href="'+a+'" class="'+t[s]._c("play")+'" target="_blank" />').appendTo(e),t('<img border="0" />').on(t[s]._e.load,function(i){i.stopPropagation(),e.removeClass(t[s]._c.loading).trigger(t[s]._e.loaded)}).appendTo(e).attr("src",o)):(t('<iframe src="http://www.youtube.com/embed/'+o+'?enablejsapi=1" frameborder="0" allowfullscreen />').appendTo(e),i.call(this,e))},filterSlides:function(t){return t.is("iframe")&&t.attr("src")?t.attr("src").toLowerCase().indexOf("youtube.com/embed/")>-1:!1},initSlides:function(t){i.call(this,t)}},t[s].defaults[d]={ratio:16/9,maxWidth:!1,maxHeight:!1,imageLink:t[s].support.touch}}(jQuery);
$(document).ready(function(){
  $("#nav > li > a").on("click", function(e){
    if($(this).parent().has("ul")) {
      e.preventDefault();
    }
    
    if(!$(this).hasClass("open")) {
      // hide any open menus and remove all other classes
      $("#nav li ul").slideUp(350);
      $("#nav li a").removeClass("open");
      
      // open our new menu and add the open class
      $(this).next("ul").slideDown(350);
      $(this).addClass("open");
    }
    
    else if($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).next("ul").slideUp(350);
    }
  });
});
/*
 * Snap.js
 *
 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/jakiestfu/Snap.js/
 * Version: 1.9.3
 */
/*jslint browser: true*/
/*global define, module, ender*/
(function(win, doc) {
    'use strict';
    var Snap = Snap || function(userOpts) {
        var settings = {
            element: null,
            dragger: null,
            disable: 'none',
            addBodyClasses: true,
            hyperextensible: true,
            resistance: 0.5,
            flickThreshold: 50,
            transitionSpeed: 0.3,
            easing: 'ease',
            maxPosition: 266,
            minPosition: -266,
            tapToClose: true,
            touchToDrag: true,
            slideIntent: 40, // degrees
            minDragDistance: 5
        },
        cache = {
            simpleStates: {
                opening: null,
                towards: null,
                hyperExtending: null,
                halfway: null,
                flick: null,
                translation: {
                    absolute: 0,
                    relative: 0,
                    sinceDirectionChange: 0,
                    percentage: 0
                }
            }
        },
        eventList = {},
        utils = {
            hasTouch: ('ontouchstart' in doc.documentElement || win.navigator.msPointerEnabled),
            eventType: function(action) {
                var eventTypes = {
                        down: (utils.hasTouch ? 'touchstart' : 'mousedown'),
                        move: (utils.hasTouch ? 'touchmove' : 'mousemove'),
                        up: (utils.hasTouch ? 'touchend' : 'mouseup'),
                        out: (utils.hasTouch ? 'touchcancel' : 'mouseout')
                    };
                return eventTypes[action];
            },
            page: function(t, e){
                return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page'+t] : e['page'+t];
            },
            klass: {
                has: function(el, name){
                    return (el.className).indexOf(name) !== -1;
                },
                add: function(el, name){
                    if(!utils.klass.has(el, name) && settings.addBodyClasses){
                        el.className += " "+name;
                    }
                },
                remove: function(el, name){
                    if(settings.addBodyClasses){
                        el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');
                    }
                }
            },
            dispatchEvent: function(type) {
                if (typeof eventList[type] === 'function') {
                    return eventList[type].call();
                }
            },
            vendor: function(){
                var tmp = doc.createElement("div"),
                    prefixes = 'webkit Moz O ms'.split(' '),
                    i;
                for (i in prefixes) {
                    if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {
                        return prefixes[i];
                    }
                }
            },
            transitionCallback: function(){
                return (cache.vendor==='Moz' || cache.vendor==='ms') ? 'transitionend' : cache.vendor+'TransitionEnd';
            },
            canTransform: function(){
                return typeof settings.element.style[cache.vendor+'Transform'] !== 'undefined';
            },
            deepExtend: function(destination, source) {
                var property;
                for (property in source) {
                    if (source[property] && source[property].constructor && source[property].constructor === Object) {
                        destination[property] = destination[property] || {};
                        utils.deepExtend(destination[property], source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            angleOfDrag: function(x, y) {
                var degrees, theta;
                // Calc Theta
                theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));
                if (theta < 0) {
                    theta += 2 * Math.PI;
                }
                // Calc Degrees
                degrees = Math.floor(theta * (180 / Math.PI) - 180);
                if (degrees < 0 && degrees > -180) {
                    degrees = 360 - Math.abs(degrees);
                }
                return Math.abs(degrees);
            },
            events: {
                addEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.addEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.attachEvent("on" + eventName, func);
                    }
                },
                removeEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.removeEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.detachEvent("on" + eventName, func);
                    }
                },
                prevent: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            },
            parentUntil: function(el, attr) {
                var isStr = typeof attr === 'string';
                while (el.parentNode) {
                    if (isStr && el.getAttribute && el.getAttribute(attr)){
                        return el;
                    } else if(!isStr && el === attr){
                        return el;
                    }
                    el = el.parentNode;
                }
                return null;
            }
        },
        action = {
            translate: {
                get: {
                    matrix: function(index) {

                        if( !utils.canTransform() ){
                            return parseInt(settings.element.style.left, 10);
                        } else {
                            var matrix = win.getComputedStyle(settings.element)[cache.vendor+'Transform'].match(/\((.*)\)/),
                                ieOffset = 8;
                            if (matrix) {
                                matrix = matrix[1].split(',');
                                if(matrix.length===16){
                                    index+=ieOffset;
                                }
                                return parseInt(matrix[index], 10);
                            }
                            return 0;
                        }
                    }
                },
                easeCallback: function(){
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.translation = action.translate.get.matrix(4);
                    cache.easing = false;
                    clearInterval(cache.animatingInterval);

                    if(cache.easingTo===0){
                        utils.klass.remove(doc.body, 'snapjs-right');
                        utils.klass.remove(doc.body, 'snapjs-left');
                    }

                    utils.dispatchEvent('animated');
                    utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                },
                easeTo: function(n) {

                    if( !utils.canTransform() ){
                        cache.translation = n;
                        action.translate.x(n);
                    } else {
                        cache.easing = true;
                        cache.easingTo = n;

                        settings.element.style[cache.vendor+'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;

                        cache.animatingInterval = setInterval(function() {
                            utils.dispatchEvent('animating');
                        }, 1);
                        
                        utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                        action.translate.x(n);
                    }
                    if(n===0){
                           settings.element.style[cache.vendor+'Transform'] = '';
                       }
                },
                x: function(n) {
                    if( (settings.disable==='left' && n>0) ||
                        (settings.disable==='right' && n<0)
                    ){ return; }
                    
                    if( !settings.hyperextensible ){
                        if( n===settings.maxPosition || n>settings.maxPosition ){
                            n=settings.maxPosition;
                        } else if( n===settings.minPosition || n<settings.minPosition ){
                            n=settings.minPosition;
                        }
                    }
                    
                    n = parseInt(n, 10);
                    if(isNaN(n)){
                        n = 0;
                    }

                    if( utils.canTransform() ){
                        var theTranslate = 'translate3d(' + n + 'px, 0,0)';
                        settings.element.style[cache.vendor+'Transform'] = theTranslate;
                    } else {
                        settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth)+'px';

                        settings.element.style.left = n+'px';
                        settings.element.style.right = '';
                    }
                }
            },
            drag: {
                listen: function() {
                    cache.translation = 0;
                    cache.easing = false;
                    utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                stopListening: function() {
                    utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                startDrag: function(e) {
                    // No drag on ignored elements
                    var target = e.target ? e.target : e.srcElement,
                        ignoreParent = utils.parentUntil(target, 'data-snap-ignore');
                    
                    if (ignoreParent) {
                        utils.dispatchEvent('ignore');
                        return;
                    }
                    
                    
                    if(settings.dragger){
                        var dragParent = utils.parentUntil(target, settings.dragger);
                        
                        // Only use dragger if we're in a closed state
                        if( !dragParent && 
                            (cache.translation !== settings.minPosition && 
                            cache.translation !== settings.maxPosition
                        )){
                            return;
                        }
                    }
                    
                    utils.dispatchEvent('start');
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.isDragging = true;
                    cache.hasIntent = null;
                    cache.intentChecked = false;
                    cache.startDragX = utils.page('X', e);
                    cache.startDragY = utils.page('Y', e);
                    cache.dragWatchers = {
                        current: 0,
                        last: 0,
                        hold: 0,
                        state: ''
                    };
                    cache.simpleStates = {
                        opening: null,
                        towards: null,
                        hyperExtending: null,
                        halfway: null,
                        flick: null,
                        translation: {
                            absolute: 0,
                            relative: 0,
                            sinceDirectionChange: 0,
                            percentage: 0
                        }
                    };
                },
                dragging: function(e) {
                    if (cache.isDragging && settings.touchToDrag) {

                        var thePageX = utils.page('X', e),
                            thePageY = utils.page('Y', e),
                            translated = cache.translation,
                            absoluteTranslation = action.translate.get.matrix(4),
                            whileDragX = thePageX - cache.startDragX,
                            openingLeft = absoluteTranslation > 0,
                            translateTo = whileDragX,
                            diff;

                        // Shown no intent already
                        if((cache.intentChecked && !cache.hasIntent)){
                            return;
                        }

                        if(settings.addBodyClasses){
                            if((absoluteTranslation)>0){
                                utils.klass.add(doc.body, 'snapjs-left');
                                utils.klass.remove(doc.body, 'snapjs-right');
                            } else if((absoluteTranslation)<0){
                                utils.klass.add(doc.body, 'snapjs-right');
                                utils.klass.remove(doc.body, 'snapjs-left');
                            }
                        }

                        if (cache.hasIntent === false || cache.hasIntent === null) {
                            var deg = utils.angleOfDrag(thePageX, thePageY),
                                inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
                                inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
                            if (!inLeftRange && !inRightRange) {
                                cache.hasIntent = false;
                            } else {
                                cache.hasIntent = true;
                            }
                            cache.intentChecked = true;
                        }

                        if (
                            (settings.minDragDistance>=Math.abs(thePageX-cache.startDragX)) || // Has user met minimum drag distance?
                            (cache.hasIntent === false)
                        ) {
                            return;
                        }

                        utils.events.prevent(e);
                        utils.dispatchEvent('drag');

                        cache.dragWatchers.current = thePageX;
                        // Determine which direction we are going
                        if (cache.dragWatchers.last > thePageX) {
                            if (cache.dragWatchers.state !== 'left') {
                                cache.dragWatchers.state = 'left';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        } else if (cache.dragWatchers.last < thePageX) {
                            if (cache.dragWatchers.state !== 'right') {
                                cache.dragWatchers.state = 'right';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        }
                        if (openingLeft) {
                            // Pulling too far to the right
                            if (settings.maxPosition < absoluteTranslation) {
                                diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'left',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.maxPosition < absoluteTranslation,
                                halfway: absoluteTranslation > (settings.maxPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.maxPosition)*100
                                }
                            };
                        } else {
                            // Pulling too far to the left
                            if (settings.minPosition > absoluteTranslation) {
                                diff = (absoluteTranslation - settings.minPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'right',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.minPosition > absoluteTranslation,
                                halfway: absoluteTranslation < (settings.minPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.minPosition)*100
                                }
                            };
                        }
                        action.translate.x(translateTo + translated);
                    }
                },
                endDrag: function(e) {
                    if (cache.isDragging) {
                        utils.dispatchEvent('end');
                        var translated = action.translate.get.matrix(4);

                        // Tap Close
                        if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {
                            utils.dispatchEvent('close');
                            utils.events.prevent(e);
                            action.translate.easeTo(0);
                            cache.isDragging = false;
                            cache.startDragX = 0;
                            return;
                        }

                        // Revealing Left
                        if (cache.simpleStates.opening === 'left') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.maxPosition); // Open Left
                                }
                            } else {
                                action.translate.easeTo(0); // Close Left
                            }
                            // Revealing Right
                        } else if (cache.simpleStates.opening === 'right') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.minPosition); // Open Right
                                }
                            } else {
                                action.translate.easeTo(0); // Close Right
                            }
                        }
                        cache.isDragging = false;
                        cache.startDragX = utils.page('X', e);
                    }
                }
            }
        },
        init = function(opts) {
            if (opts.element) {
                utils.deepExtend(settings, opts);
                cache.vendor = utils.vendor();
                action.drag.listen();
            }
        };
        /*
         * Public
         */
        this.open = function(side) {
            utils.dispatchEvent('open');
            utils.klass.remove(doc.body, 'snapjs-expand-left');
            utils.klass.remove(doc.body, 'snapjs-expand-right');

            if (side === 'left') {
                cache.simpleStates.opening = 'left';
                cache.simpleStates.towards = 'right';
                utils.klass.add(doc.body, 'snapjs-left');
                utils.klass.remove(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.maxPosition);
            } else if (side === 'right') {
                cache.simpleStates.opening = 'right';
                cache.simpleStates.towards = 'left';
                utils.klass.remove(doc.body, 'snapjs-left');
                utils.klass.add(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.minPosition);
            }
        };
        this.close = function() {
            utils.dispatchEvent('close');
            action.translate.easeTo(0);
        };
        this.expand = function(side){
            var to = win.innerWidth || doc.documentElement.clientWidth;

            if(side==='left'){
                utils.dispatchEvent('expandLeft');
                utils.klass.add(doc.body, 'snapjs-expand-left');
                utils.klass.remove(doc.body, 'snapjs-expand-right');
            } else {
                utils.dispatchEvent('expandRight');
                utils.klass.add(doc.body, 'snapjs-expand-right');
                utils.klass.remove(doc.body, 'snapjs-expand-left');
                to *= -1;
            }
            action.translate.easeTo(to);
        };

        this.on = function(evt, fn) {
            eventList[evt] = fn;
            return this;
        };
        this.off = function(evt) {
            if (eventList[evt]) {
                eventList[evt] = false;
            }
        };

        this.enable = function() {
            utils.dispatchEvent('enable');
            action.drag.listen();
        };
        this.disable = function() {
            utils.dispatchEvent('disable');
            action.drag.stopListening();
        };

        this.settings = function(opts){
            utils.deepExtend(settings, opts);
        };

        this.state = function() {
            var state,
                fromLeft = action.translate.get.matrix(4);
            if (fromLeft === settings.maxPosition) {
                state = 'left';
            } else if (fromLeft === settings.minPosition) {
                state = 'right';
            } else {
                state = 'closed';
            }
            return {
                state: state,
                info: cache.simpleStates
            };
        };
        init(userOpts);
    };
    if ((typeof module !== 'undefined') && module.exports) {
        module.exports = Snap;
    }
    if (typeof ender === 'undefined') {
        this.Snap = Snap;
    }
    if ((typeof define === "function") && define.amd) {
        define("snap", [], function() {
            return Snap;
        });
    }
}).call(this, window, document);

document.onload = function wait()
{
var addEvent = function addEvent(element, eventName, func) {
    if (element.addEventListener) {
        return element.addEventListener(eventName, func, false);
    } else if (element.attachEvent) {
        return element.attachEvent("on" + eventName, func);
    }
};


addEvent(document.getElementById('open-left'), 'click', function(){
    snapper.open('left');
});
}