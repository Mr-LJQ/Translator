import {CursorListener,SelectionListener,HotKeyListener,SearchBox} from "@/user-operation"
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events */ "./src/events/index.ts");
/* harmony import */ var _iframe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iframe */ "./src/content-script/iframe.ts");
/* harmony import */ var _utils_command__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/command */ "./src/utils/command.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils/index.ts");
/* harmony import */ var _extensions_apis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../extensions-apis */ "./src/extensions-apis/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//监听用户操作的模块
 //展示模块

 //指令常量

 //通用函数

 //浏览器拓展API

 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明引入

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//监听用户操作
const cursorListener = new CursorListener();
const getClientPoint = cursorListener.getClientPoint;
const searchListener = new SearchBox(translateAndShowSearchText);
const selectionListener = new SelectionListener(translateAndShowText);
const hotKeyListener = new HotKeyListener(translateAndShowText, getClientPoint);
cursorListener.install();
searchListener.install(); 

//监听iframe传递的指令并进行处理
const iframe = new Iframe();
iframe.onMessage(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.AddNote, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, sendResponse) {
    var response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.postBackend)(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.AddNote, data);

          case 2:
            response = _context.sent;
            sendResponse(response);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
iframe.onMessage(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.RelearnNote, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, sendResponse) {
    var response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.postBackend)(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.RelearnNote, data);

          case 2:
            response = _context2.sent;
            sendResponse(response);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
iframe.onMessage(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.TranslateText, function (data) {
  translateAndShowIframeText(data);
});
iframe.install();
/**
 * 用于处理注入脚本的翻译，其特别之处在于其point相对于浏览器窗口左上角而非视口左上角，因此需要额外的调整
 */

function showAddonPageTranslationText(data) {
  var _data$point = data.point,
      x = _data$point.x,
      y = _data$point.y; //此处的x,y是鼠标相对于屏幕左上角的坐标，需要将其装换为：鼠标相对于浏览器左上角的坐标

  x -= window.screenX;
  y -= window.screenY;
  var point = {
    x: x,
    y: y
  }; //point是鼠标到浏览器窗口左上角位置，所以为了获得到视口左上角位置需要进行如下处理

  point.x -= window.outerWidth - window.innerWidth;
  if (point.x < 0) point.x = x;
  point.y -= window.outerHeight - window.innerHeight;
  if (point.y < 0) point.y = y;
  iframe.showTranslation({
    translatedData: data.translatedData,
    point: point
  });
}
/**
 * 处理选中文本的翻译，
 * 其特别之处在于其只对英文起反应，
 * 且过滤掉输入框内的拖蓝查询
 */


function translateAndShowText(_x5) {
  return _translateAndShowText.apply(this, arguments);
}
/**
 * 用于处理searchBar传递的数据，
 * 其特别之处在于其会对中文进行查询
 */


function _translateAndShowText() {
  _translateAndShowText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(text) {
    var result, translatedData, point;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!iframe.isVisible()) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return");

          case 2:
            //过滤掉非英文
            result = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.validateText)(text);

            if (result) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return");

          case 5:
            _context4.next = 7;
            return (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.postBackend)(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.TranslateText, text);

          case 7:
            translatedData = _context4.sent;
            point = getCursorPosition();
            iframe.showTranslation({
              translatedData: translatedData,
              point: point
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _translateAndShowText.apply(this, arguments);
}

function translateAndShowSearchText(_x6) {
  return _translateAndShowSearchText.apply(this, arguments);
}
/**
 * 用于处理shower传递的翻译，
 * 其特别之处在于iframe不会移动(point没有变化),只支持英文
 * @param text 待翻译文本
 * @returns
 */


function _translateAndShowSearchText() {
  _translateAndShowSearchText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(text) {
    var translatedData, point;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.postBackend)(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.TranslateText, text);

          case 2:
            translatedData = _context5.sent;
            point = getCursorPosition();
            iframe.showTranslation({
              translatedData: translatedData,
              point: point
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _translateAndShowSearchText.apply(this, arguments);
}

function translateAndShowIframeText(_x7) {
  return _translateAndShowIframeText.apply(this, arguments);
}

function _translateAndShowIframeText() {
  _translateAndShowIframeText = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(text) {
    var result, translatedData;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //过滤掉非英文
            result = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.validateText)(text);

            if (result) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return");

          case 3:
            _context6.next = 5;
            return (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.postBackend)(_utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.TranslateText, text);

          case 5:
            translatedData = _context6.sent;
            iframe.showTranslation({
              translatedData: translatedData
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _translateAndShowIframeText.apply(this, arguments);
}

function openSelectionAndHotKeyListener() {
  hotKeyListener.install();
  selectionListener.install();
}

function closeSelectionAndHotKeyListener() {
  hotKeyListener.uninstall();
  selectionListener.uninstall();
}

(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.getStorage)({
  isOpen: function isOpen(value) {
    return value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener();
  },
  hotKey: function hotKey(value) {
    return hotKeyListener.updateHotKey(value);
  },
  openStrengthenSelectionByPressedCtrl: function openStrengthenSelectionByPressedCtrl(value) {
    return selectionListener.openStrengthenSelectionByPressedCtrl(value);
  }
});
(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.onStorageChange)({
  isOpen: function isOpen(_, value) {
    return value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener();
  },
  hotKey: function hotKey(_, value) {
    return hotKeyListener.updateHotKey(value);
  },
  openStrengthenSelectionByPressedCtrl: function openStrengthenSelectionByPressedCtrl(_, value) {
    return selectionListener.openStrengthenSelectionByPressedCtrl(value);
  }
}); //监听后端传递的指令并进行处理

(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_4__.onMessage)( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref3) {
    var command, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            command = _ref3.command, data = _ref3.data;
            if (command === _utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.ShowIframe) iframe.showUI(getCursorPosition());
            if (command === _utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.SwitchSearchBar) searchListener.openSearchBar();
            if (command === _utils_command__WEBPACK_IMPORTED_MODULE_2__.Command.ShowAddonPageTranslationText) showAddonPageTranslationText(data);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x8) {
    return _ref4.apply(this, arguments);
  };
}());
