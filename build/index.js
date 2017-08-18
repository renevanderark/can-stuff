/******/ (function(modules) { // webpackBootstrap
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

	"use strict";

	var _frameRenderer = __webpack_require__(1);

	var _frameRenderer2 = _interopRequireDefault(_frameRenderer);

	var _resizeListeners = __webpack_require__(2);

	var _resizeListeners2 = _interopRequireDefault(_resizeListeners);

	var _viewport = __webpack_require__(3);

	var _viewport2 = _interopRequireDefault(_viewport);

	var _eventListeners = __webpack_require__(4);

	var _eventListeners2 = _interopRequireDefault(_eventListeners);

	var _makeLevel = __webpack_require__(5);

	var _makeLevel2 = _interopRequireDefault(_makeLevel);

	var _grid = __webpack_require__(7);

	var _grid2 = _interopRequireDefault(_grid);

	var _puppet = __webpack_require__(8);

	var _puppet2 = _interopRequireDefault(_puppet);

	var _thoughtCloud = __webpack_require__(9);

	var _thoughtCloud2 = _interopRequireDefault(_thoughtCloud);

	var _gameEvents = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var VIRT_WIDTH = 1000;
	var VIRT_HEIGHT = 1000;

	var fooLayer = document.getElementById("foo-layer");
	var barLayer = document.getElementById("bar-layer");

	var fooFrameRenderer = (0, _frameRenderer2.default)(fooLayer.getContext('2d'), fooLayer);
	var barFrameRenderer = (0, _frameRenderer2.default)(barLayer.getContext('2d'), barLayer);

	var eventListeners = (0, _eventListeners2.default)();

	var gridKit = void 0;
	var gm = { walls: [] };
	var puppet = null;
	var thoughtCloud = (0, _thoughtCloud2.default)(VIRT_WIDTH);
	var isWelcome = true;

	(0, _viewport2.default)(VIRT_WIDTH, VIRT_HEIGHT, (0, _resizeListeners2.default)([fooLayer, barLayer], eventListeners.onResize, fooFrameRenderer.onResize, barFrameRenderer.onResize, function () {
	  return [puppet].filter(function (p) {
	    return p !== null;
	  }).concat(thoughtCloud).concat(gm.walls).forEach(function (d) {
	    return d.forceUpdate();
	  });
	}));

	function startLevel() {
	  var siz = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 11;
	  var lvl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	  var size = siz > 51 ? 51 : siz;
	  fooFrameRenderer.clear();
	  gridKit = (0, _grid2.default)(size, VIRT_WIDTH);
	  gm = (0, _makeLevel2.default)(gridKit);
	  puppet = (0, _puppet2.default)(gridKit, gm.walls);
	  thoughtCloud.followPuppet.apply(thoughtCloud, _toConsumableArray(gridKit.getVirtPos(puppet.getPos())));
	  if (isWelcome) {
	    thoughtCloud.setTrainOfThoughtAndAppear(["Welcome to my confused mind!", "I have to find a way out of here!", "Use the arrow keys to move me around...", "left click to rotate my brain barriers...", "and right click to move the rotation point...", "of a brain barrier.", "Press any key to suppress my thought bubble...", "Be careful not to squash me!"]);
	    isWelcome = false;
	  }
	  (0, _gameEvents.initGameEvents)(gm, puppet, gridKit, eventListeners, barLayer, fooLayer, thoughtCloud, function () {
	    return clearLevel(function () {
	      return startLevel();
	    });
	  }, // onGameOver
	  function () {
	    return clearLevel(function () {
	      return startLevel(size + 2, lvl + 1);
	    });
	  } // onSolveLevel
	  );
	}

	function clearLevel(startNextLevel) {
	  puppet = null;
	  gm.walls = [];
	  startNextLevel();
	}

	startLevel();

	var renderLoop = function renderLoop() {
	  fooFrameRenderer.render([puppet].filter(function (p) {
	    return p !== null;
	  }).concat(gm.walls));
	  barFrameRenderer.render([thoughtCloud]);
	  requestAnimationFrame(renderLoop);
	};
	renderLoop();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (ctx, can) {
		var scale = void 0;
		var clearRequested = false;

		return {
			onResize: function onResize(s) {
				scale = s;
			},
			clear: function clear() {
				clearRequested = true;
			},
			render: function render(drawables) {
				if (clearRequested) {
					ctx.clearRect(0, 0, can.width, can.height);
					clearRequested = false;
				} else {
					drawables.filter(function (d) {
						return d.updated();
					}).forEach(function (d) {
						return d.clear(ctx, scale);
					});
				}
				drawables.filter(function (d) {
					return d.updated();
				}).forEach(function (d) {
					return d.draw(ctx, scale);
				});
			}
		};
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (canvases) {
		for (var _len = arguments.length, listeners = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			listeners[_key - 1] = arguments[_key];
		}

		function rescaleGame(scale, width, height) {
			canvases.forEach(function (canvas) {
				canvas.style.left = parseInt(Math.floor((window.innerWidth - width) / 2), 10);
				canvas.style.top = parseInt(Math.floor((window.innerHeight - height) / 2), 10);
				canvas.width = width;
				canvas.height = height;
			});
		}

		return [rescaleGame].concat(listeners);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (vWidth, vHeight, listeners) {
		var aspectRatio = vHeight / vWidth;

		function invokeListeners(width, height, scale) {
			listeners.forEach(function (listener) {
				return listener(scale, width, height);
			});
		}

		function onResize() {
			var _window = window,
			    innerWidth = _window.innerWidth,
			    innerHeight = _window.innerHeight;

			if (innerWidth * aspectRatio > innerHeight) {
				invokeListeners(parseInt(Math.floor(innerHeight / aspectRatio), 10), innerHeight, innerHeight / aspectRatio / vWidth);
			} else {
				invokeListeners(innerWidth, parseInt(Math.floor(innerWidth * aspectRatio), 10), innerWidth / vWidth);
			}
		}

		onResize();
		window.addEventListener("resize", onResize);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {
		var scale = void 0;
		var registered = [];

		return {
			onResize: function onResize(s) {
				scale = s;
			},
			add: function add(eventName, onEvent) {
				var elem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;

				var fn = function fn(ev) {
					return onEvent(ev, scale);
				};

				registered.push({
					elem: elem,
					eventName: eventName,
					fn: fn
				});

				elem.addEventListener(eventName, fn);
			},
			clear: function clear() {
				registered.forEach(function (_ref) {
					var elem = _ref.elem,
					    eventName = _ref.eventName,
					    fn = _ref.fn;
					return elem.removeEventListener(eventName, fn);
				});
			}
		};
	};

	;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (gridKit) {
	  var initGrid = gridKit.initGrid,
	      Types = gridKit.Types,
	      getP = gridKit.getP,
	      getY = gridKit.getY,
	      SIZE = gridKit.SIZE;

	  var _wallMaker = (0, _wall2.default)(gridKit),
	      makeWall = _wallMaker.makeWall;

	  var grid = initGrid();
	  grid[getP((SIZE - 1) / 2, (SIZE - 1) / 2)] = Types.ClosedSpace;
	  var walls = [];
	  for (var i = 0; i < SIZE * SIZE; i += Math.floor(Math.random() * 3) + 1) {
	    var cur = i + getY(i) % 2;
	    if (grid[cur] !== Types.ClosedSpace) {
	      var newWall = makeWall(cur, grid, Math.floor(Math.random() * 2.5) === 0 ? 3 : 2);
	      if (newWall !== null) {
	        walls.push(newWall);
	      }
	    }
	  }

	  return {
	    walls: walls,
	    complexity: walls.length
	  };
	};

	var _wall = __webpack_require__(6);

	var _wall2 = _interopRequireDefault(_wall);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = function (gridKit) {
	  var getOpen = gridKit.getOpen,
	      Types = gridKit.Types,
	      getScreenPos = gridKit.getScreenPos,
	      getGridSize = gridKit.getGridSize,
	      getRect = gridKit.getRect,
	      getX = gridKit.getX,
	      getY = gridKit.getY,
	      getP = gridKit.getP;


	  var _makeWall = function _makeWall(initWallDims) {
	    var wallSpaces = initWallDims;
	    var pivotIdx = Math.floor(Math.random() * initWallDims.length);
	    var pivot = wallSpaces[pivotIdx];
	    var _updated = true;

	    var getPivotPos = function getPivotPos() {
	      return { x: getX(pivot), y: getY(pivot) };
	    };

	    var rotateVec2 = function rotateVec2(pivotPos, vec, rad) {
	      return {
	        x: pivotPos.x + Math.round(vec.x * Math.cos(rad) - vec.y * Math.sin(rad)),
	        y: pivotPos.y + Math.round(vec.x * Math.sin(rad) + vec.y * Math.cos(rad))
	      };
	    };

	    var getRotatedPositions = function getRotatedPositions(positions, pivotPos, pivotDeltae, rad) {
	      return positions.map(function (p, i) {
	        return rotateVec2(pivotPos, pivotDeltae[i], rad);
	      }).map(function (_ref) {
	        var x = _ref.x,
	            y = _ref.y;
	        return getP(x, y);
	      });
	    };

	    var determineCurrentRotation = function determineCurrentRotation() {
	      var pivotPos = getPivotPos();
	      var positions = initWallDims.map(function (w) {
	        return { x: getX(w), y: getY(w) };
	      });
	      var pivotDeltae = positions.map(function (p) {
	        return { x: pivotPos.x - p.x, y: pivotPos.y - p.y };
	      });
	      for (var rot = 0; rot < 4; rot++) {
	        var rad = rot * 90 * (Math.PI / 180);
	        var rotatedSpaces = getRotatedPositions(positions, pivotPos, pivotDeltae, rad);
	        if (rotatedSpaces.filter(function (r, i) {
	          return r === initWallDims[i];
	        }).length === initWallDims.length) {
	          return rot;
	        }
	      }
	      return 0;
	    };

	    var drawStrokes = function drawStrokes(ctx, scale, strokeStyle) {
	      var redux = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	      ctx.strokeStyle = strokeStyle;
	      ctx.lineWidth = Math.floor(getGridSize(scale) - 2 * redux);
	      wallSpaces.forEach(function (p, i) {
	        if (i === 0) {
	          ctx.moveTo.apply(ctx, _toConsumableArray(getScreenPos(p, scale).map(function (p) {
	            return p - redux;
	          })));
	        } else {
	          ctx.lineTo.apply(ctx, _toConsumableArray(getScreenPos(p, scale).map(function (p) {
	            return p - redux;
	          })));
	        }
	      });
	      ctx.stroke();
	    };
	    var currentRotation = determineCurrentRotation();

	    return {
	      movePivot: function movePivot() {
	        pivotIdx = pivotIdx < wallSpaces.length - 1 ? pivotIdx + 1 : 0;
	        pivot = wallSpaces[pivotIdx];
	        initWallDims = wallSpaces;
	        currentRotation = determineCurrentRotation();
	        _updated = true;
	      },
	      getSpaces: function getSpaces() {
	        return wallSpaces;
	      },
	      isAt: function isAt(screenX, screenY, scale) {
	        var siz = getGridSize(scale) / 2;
	        for (var i = 0; i < wallSpaces.length; i++) {
	          var _getScreenPos = getScreenPos(wallSpaces[i], scale),
	              _getScreenPos2 = _slicedToArray(_getScreenPos, 2),
	              x = _getScreenPos2[0],
	              y = _getScreenPos2[1];

	          if (y - siz < screenY && y + siz > screenY && x - siz < screenX && x + siz > screenX) {
	            return true;
	          }
	        }
	        return false;
	      },
	      rotate: function rotate(gridSpaceIsFree) {
	        var pivotPos = getPivotPos();
	        var positions = initWallDims.map(function (w) {
	          return { x: getX(w), y: getY(w) };
	        });
	        var pivotDeltae = positions.map(function (p) {
	          return { x: pivotPos.x - p.x, y: pivotPos.y - p.y };
	        });

	        var lastRotation = currentRotation;

	        do {
	          currentRotation = currentRotation === 3 ? 0 : currentRotation + 1;
	          var rad = currentRotation * 90 * (Math.PI / 180);
	          var rotatedSpaces = getRotatedPositions(positions, pivotPos, pivotDeltae, rad);
	          if (rotatedSpaces.indexOf(-1) < 0 && rotatedSpaces.filter(function (rs) {
	            return !gridSpaceIsFree(rs);
	          }).length === 0) {
	            wallSpaces = rotatedSpaces;
	            break;
	          }
	        } while (currentRotation !== lastRotation);

	        _updated = true;
	        return currentRotation;
	      },
	      draw: function draw(ctx, scale) {
	        ctx.beginPath();
	        ctx.lineCap = 'round';
	        drawStrokes(ctx, scale, "rgba(96, 0, 0, 0.6)", 0);
	        drawStrokes(ctx, scale, "rgba(128, 0, 0, 0.8)", 1);
	        drawStrokes(ctx, scale, "rgb(196, 0, 0)", 2);

	        ctx.beginPath();
	        ctx.fillStyle = "rgb(96, 0, 0)";
	        ctx.arc.apply(ctx, _toConsumableArray(getScreenPos(pivot, scale).map(function (p) {
	          return p - 1;
	        })).concat([getGridSize(scale) / 10, 0, 2 * Math.PI, false]));
	        ctx.fill();

	        ctx.beginPath();
	        ctx.strokeStyle = "rgb(196, 96, 96)";
	        var gridSize = getGridSize(scale);
	        ctx.lineWidth = Math.round(gridSize / 14);
	        ctx.moveTo.apply(ctx, _toConsumableArray(getScreenPos(pivot, scale).map(function (p) {
	          return p - 1;
	        })));
	        ctx.lineTo.apply(ctx, _toConsumableArray(getScreenPos(pivot, scale).map(function (p, i) {
	          return p - (i === 0 ? 3 * scale : 0.4 * gridSize * scale);
	        })));
	        ctx.stroke();

	        _updated = false;
	      },
	      clear: function clear(ctx, scale) {
	        wallSpaces.forEach(function (p) {
	          ctx.clearRect.apply(ctx, _toConsumableArray(getRect(p, scale).map(function (p, i) {
	            return i < 2 ? p - 1 : p + 1;
	          })));
	        });
	      },
	      forceUpdate: function forceUpdate() {
	        _updated = true;
	      },

	      updated: function updated() {
	        return _updated;
	      }
	    };
	  };

	  var makeWall = function makeWall(p, grid) {
	    var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	    var wall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

	    grid[p] = Types.ClosedSpace;
	    var open = getOpen(p, grid);
	    if (open.length === 0 || len === 1) {
	      return wall.length < 1 ? null : _makeWall(wall.concat(p));
	    } else {
	      return makeWall(open[parseInt(Math.random() * open.length, 10)], grid, len - 1, wall.concat(p));
	    }
	  };

	  return {
	    makeWall: makeWall
	  };
	};

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (SIZE, VIRT_WIDTH) {
	  var Types = {
	    OpenSpace: 0,
	    PathSpace: 1,
	    ClosedSpace: 2
	  };

	  var screenSize = VIRT_WIDTH / SIZE;

	  var getX = function getX(p) {
	    return p % SIZE;
	  };
	  var getY = function getY(p) {
	    return (p - p % SIZE) / SIZE;
	  };
	  var getP = function getP(x, y) {
	    return x >= 0 && x < SIZE && y >= 0 && y < SIZE ? x + y * SIZE : -1;
	  };
	  var getDirs = function getDirs(x, y) {
	    return [y > 0 ? getP(x, y - 1) : null, // up
	    y < SIZE - 1 ? getP(x, y + 1) : null, // down
	    x > 0 ? getP(x - 1, y) : null, // left
	    x < SIZE - 1 ? getP(x + 1, y) : null // right
	    ];
	  };
	  var getScreenPos = function getScreenPos(p, scale) {
	    return [getX(p) * screenSize * scale + screenSize * scale * 0.5, getY(p) * screenSize * scale + screenSize * scale * 0.5];
	  };
	  var getRect = function getRect(p, scale) {
	    return [getX(p) * screenSize * scale, getY(p) * screenSize * scale, screenSize * scale, screenSize * scale];
	  };
	  var getGridSize = function getGridSize(scale) {
	    return screenSize * scale;
	  };
	  var getVirtPos = function getVirtPos(p) {
	    return [getX(p) * screenSize + screenSize / 2, getY(p) * screenSize + screenSize / 2];
	  };

	  var isOpen = function isOpen(p, grid) {
	    return grid[p] === Types.OpenSpace;
	  };
	  var getOpen = function getOpen(p, grid) {
	    return getDirs(getX(p), getY(p)).filter(function (p) {
	      return isOpen(p, grid);
	    });
	  };

	  var initGrid = function initGrid() {
	    var grid = [];
	    for (var y = 0; y < SIZE; y++) {
	      for (var x = 0; x < SIZE; x++) {
	        grid[getP(x, y)] = Types.OpenSpace;
	      }
	    }
	    return grid;
	  };

	  var gridSpaceIsFree = function gridSpaceIsFree(walls, wallIdx) {
	    return function (spaceIdx) {
	      return walls.filter(function (w, idx) {
	        return idx !== wallIdx;
	      }).map(function (w) {
	        return w.getSpaces();
	      }).reduce(function (a, b) {
	        return a.concat(b);
	      }, []).indexOf(spaceIdx) < 0;
	    };
	  };

	  return {
	    SIZE: SIZE,
	    getRect: getRect,
	    getScreenPos: getScreenPos,
	    getGridSize: getGridSize,
	    getVirtPos: getVirtPos,
	    getX: getX,
	    getY: getY,
	    getP: getP,
	    getOpen: getOpen,
	    Types: Types,
	    initGrid: initGrid,
	    gridSpaceIsFree: gridSpaceIsFree
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	exports.default = function (gridKit, walls) {
	  var getP = gridKit.getP,
	      getScreenPos = gridKit.getScreenPos,
	      getGridSize = gridKit.getGridSize,
	      SIZE = gridKit.SIZE,
	      getRect = gridKit.getRect,
	      getX = gridKit.getX,
	      getY = gridKit.getY;

	  var pos = getP((SIZE - 1) / 2, (SIZE - 1) / 2);
	  var lastPos = pos;
	  var _updated = true;
	  return {
	    getPos: function getPos() {
	      return pos;
	    },
	    move: function move(x, y) {
	      var newPos = getP(getX(pos) + x, getY(pos) + y);
	      lastPos = pos;
	      if (newPos > -1 && gridKit.gridSpaceIsFree(walls, -1)(newPos)) {
	        pos = newPos;
	      }
	      _updated = true;
	    },
	    draw: function draw(ctx, scale) {
	      ctx.beginPath();
	      ctx.fillStyle = "rgb(128,128,255)";
	      ctx.arc.apply(ctx, _toConsumableArray(getScreenPos(pos, scale)).concat([getGridSize(scale) / 3, 0, 2 * Math.PI, false]));
	      ctx.fill();
	      ctx.fillStyle = "black";
	      ctx.font = "normal " + getGridSize(scale) * 0.75 + "px sans-serif";
	      ctx.save();
	      ctx.translate(-(getGridSize(scale) / 4), getGridSize(scale) / 10);
	      ctx.fillText.apply(ctx, ["∞"].concat(_toConsumableArray(getScreenPos(pos, scale))));
	      ctx.restore();
	      _updated = false;
	    },
	    clear: function clear(ctx, scale) {
	      ctx.clearRect.apply(ctx, _toConsumableArray(getRect(lastPos, scale)));
	    },
	    forceUpdate: function forceUpdate() {
	      _updated = true;
	    },

	    updated: function updated() {
	      return _updated;
	    }
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (VIRT_WIDTH) {
	  var puppetPos = { x: 0, y: 0 };
	  var _updated = true,
	      visible = false;
	  var currentText = "...";
	  var timeouts = [];

	  var disappear = function disappear() {
	    timeouts.forEach(function (t) {
	      return clearTimeout(t);
	    });
	    visible = false;
	    _updated = true;
	    currentText = "...";
	  };

	  return {
	    isVisible: function isVisible() {
	      return visible;
	    },
	    followPuppet: function followPuppet(virtX, virtY) {
	      puppetPos = { x: virtX, y: virtY };
	      _updated = true;
	    },


	    disappear: disappear,

	    setTrainOfThoughtAndAppear: function setTrainOfThoughtAndAppear(thoughts) {
	      var interval = 2500;
	      currentText = thoughts.shift();
	      timeouts.forEach(function (t) {
	        return clearTimeout(t);
	      });
	      thoughts.forEach(function (t, i) {
	        timeouts.push(setTimeout(function () {
	          currentText = t;_updated = true;
	        }, interval * (i + 1)));
	      });
	      timeouts.push(setTimeout(disappear, (thoughts.length + 1) * interval));
	      visible = true;
	    },
	    draw: function draw(ctx, scale) {
	      if (!visible) {
	        return;
	      }
	      var cloudY = puppetPos.y > 250 ? 150 : 450;
	      var cloudX = VIRT_WIDTH / 2;
	      ctx.fillStyle = "rgba(255,255,255,1)";
	      ctx.strokeStyle = "black";
	      ctx.lineWidth = 1 * scale;
	      ctx.save();
	      ctx.translate(cloudX * scale, cloudY * scale);

	      ctx.scale(3, 1);
	      ctx.beginPath();
	      ctx.arc(0, 0, 150 * scale, 2 * Math.PI, false);
	      ctx.fill();
	      ctx.stroke();
	      ctx.restore();
	      var targetAng = Math.atan2(cloudY - puppetPos.y, cloudX / 2 - puppetPos.x);
	      var ang = targetAng - 1.5;
	      var delta = Math.sqrt(Math.pow(cloudX / 2 - puppetPos.x, 2) + Math.pow(cloudY - puppetPos.y, 2));
	      var x = puppetPos.x - 10,
	          y = puppetPos.y;
	      for (var s = 0; s < 10; s++) {
	        ang += 0.2;
	        x += Math.cos(ang) * (delta * (s / 70));
	        y += Math.sin(ang) * (delta * (s / 70));
	        ctx.beginPath();
	        ctx.arc(x * scale, y * scale, (s + 1) * scale, 2 * Math.PI, false);
	        ctx.fill();
	      }
	      ctx.font = "bold " + 30 * scale + "px sans-serif";
	      ctx.fillStyle = "black";
	      ctx.fillText(currentText, cloudX * scale - ctx.measureText(currentText).width / 2, (15 + cloudY) * scale);
	      _updated = false;
	    },
	    clear: function clear(ctx) {
	      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	    },
	    forceUpdate: function forceUpdate() {
	      _updated = true;
	    },

	    updated: function updated() {
	      return _updated;
	    }
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initGameEvents = undefined;

	var _thoughts = __webpack_require__(11);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function initGameEvents(gm, puppet, gridKit, eventListeners, barLayer, fooLayer, thoughtCloud, onGameOver, onSolveLevel) {

	  var idleSecs = 0;
	  var strayThoughtInterval = setInterval(function () {
	    idleSecs++;
	    if (idleSecs >= 10 && !thoughtCloud.isVisible()) {
	      thoughtCloud.setTrainOfThoughtAndAppear((0, _thoughts.strayThought)());
	      idleSecs = 0;
	    }
	  }, 1000);

	  eventListeners.add("click", function (ev, scale) {
	    gm.walls.map(function (w, wIdx) {
	      return { w: w, wIdx: wIdx };
	    }).filter(function (_ref) {
	      var w = _ref.w;
	      return w.isAt(ev.clientX - ev.target.offsetLeft, ev.clientY - ev.target.offsetTop, scale);
	    }).forEach(function (_ref2) {
	      var w = _ref2.w,
	          wIdx = _ref2.wIdx;

	      w.clear(fooLayer.getContext('2d'), scale);
	      w.rotate(gridKit.gridSpaceIsFree(gm.walls, wIdx));
	    });

	    if (!gridKit.gridSpaceIsFree(gm.walls, -1)(puppet.getPos())) {
	      thoughtCloud.setTrainOfThoughtAndAppear([(0, _thoughts.gameOverThought)()]);
	      clearInterval(strayThoughtInterval);
	      eventListeners.clear();

	      window.setTimeout(onGameOver, 2500);
	    }
	  }, barLayer);

	  eventListeners.add("contextmenu", function (ev, scale) {
	    gm.walls.filter(function (w) {
	      return w.isAt(ev.clientX - ev.target.offsetLeft, ev.clientY - ev.target.offsetTop, scale);
	    }).forEach(function (w) {
	      return w.movePivot();
	    });

	    return ev.preventDefault();
	  });

	  eventListeners.add("keydown", function (ev, scale) {
	    idleSecs = 0;
	    thoughtCloud.disappear();
	    switch (ev.keyCode) {
	      case 37:
	        puppet.move(-1, 0);break;
	      case 38:
	        puppet.move(0, -1);break;
	      case 39:
	        puppet.move(1, 0);break;
	      case 40:
	        puppet.move(0, 1);break;
	    }

	    thoughtCloud.followPuppet.apply(thoughtCloud, _toConsumableArray(gridKit.getVirtPos(puppet.getPos())));
	    if (gridKit.getX(puppet.getPos()) === 0 || gridKit.getY(puppet.getPos()) === 0 || gridKit.getX(puppet.getPos()) === gridKit.SIZE - 1 || gridKit.getY(puppet.getPos()) === gridKit.SIZE - 1) {

	      clearInterval(strayThoughtInterval);
	      eventListeners.clear();

	      thoughtCloud.setTrainOfThoughtAndAppear([(0, _thoughts.salvationThought)()]);
	      window.setTimeout(onSolveLevel, 1000);
	    }
	  });
	}

	exports.initGameEvents = initGameEvents;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var gameOverThoughts = ["Noooo!!", "The agony!", "Why?!", "What did you do?", "The pain!", "The anguish!"];

	var salvationThoughts = ["Thank you!", "Bless you!", "Salvation!", "Freedom!", "Joy!", "Hurray!"];

	var strayThoughts = [["Where did I put my keys?", "I must have left them somewhere..."], ["What are you waiting for?", "I'm going crazy in here!"], ["What were the four noble truths again?", "Suffering...", "...the origin of suffering...", "...the cessation of suffering...", "...the noble 8-fold path."], ["Stuck in the wheel of becoming..."]];

	var randomThought = function randomThought(ary) {
	  return ary[Math.floor(Math.random() * ary.length)];
	};
	var gameOverThought = function gameOverThought() {
	  return randomThought(gameOverThoughts);
	};
	var salvationThought = function salvationThought() {
	  return randomThought(salvationThoughts);
	};
	var strayThought = function strayThought() {
	  return randomThought(strayThoughts).slice();
	};

	exports.gameOverThought = gameOverThought;
	exports.salvationThought = salvationThought;
	exports.strayThought = strayThought;

/***/ }
/******/ ]);