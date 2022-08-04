
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//获取翻译词典
const collins = new _dictionary_index__WEBPACK_IMPORTED_MODULE_1__["default"](); //获取anki

var anki = new _anki_index__WEBPACK_IMPORTED_MODULE_0__.AnkiConnection(); //初始化isOpen标识文本

(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.getStorage)({
  isOpen: function isOpen(value) {
    switchBadgeText(value);
  }
});
(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.onStorageChange)({
  isOpen: function isOpen(_, value) {
    return switchBadgeText(value);
  }
}); //监听用户快捷键，用于开关拓展

(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.onCommand)({
  openHotkeyAndSelection: function openHotkeyAndSelection() {
    (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.getStorage)({
      isOpen: function isOpen(_isOpen) {
        return (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.setStorage)({
          isOpen: !_isOpen
        });
      }
    });
  },
  showTranslationPage: function showTranslationPage() {
    (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.postFrontend)(_utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.ShowIframe);
  },
  openSearchBar: function openSearchBar() {
    return (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.postFrontend)(_utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.SwitchSearchBar);
  }
}); //在鼠标右键菜单中添加一项 “注入划词助手” 的选项，
//并在其点击后注入相应脚本，使其能够通过划词进行翻译

(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.addContextMenuItem)({
  contexts: ["frame"],
  title: "注入Anki划词助手"
}, function () {
  //避免重复注入脚本
  var injectedFrames = []; //监听注入划词助手栏目的点击

  (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.onContextMenuClick)(function (info) {
    var frameId = info.frameId;
    if (!frameId) throw new Error("info.frameId is undefined");
    if (injectedFrames.includes(frameId)) return;
    injectedFrames.push(frameId);
    (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.executeScript)({
      frameId: info.frameId,
      file: "/addonScript.js"
    });
  });
}); //监听所有发生到后端的请求，并进行处理

(0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.onMessage)( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var command, data, sendResponse, response, _response, _response2, _response3, _response4, _response5, _response6, _response7;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            command = _ref.command, data = _ref.data, sendResponse = _ref.sendResponse;
            _context.t0 = command;
            _context.next = _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.TranslateText ? 4 : _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.TranslateAddonPageText ? 9 : _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.AddNote ? 14 : _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.RelearnNote ? 19 : _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.GetDeckNames ? 24 : _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.GetModelNames ? 29 : _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.GetVersion ? 34 : _context.t0 === _utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.GetModelFieldNames ? 39 : 44;
            break;

          case 4:
            _context.next = 6;
            return collins.translate(data);

          case 6:
            response = _context.sent;
            sendResponse(response);
            return _context.abrupt("break", 45);

          case 9:
            _context.next = 11;
            return collins.translate(data.text);

          case 11:
            _response = _context.sent;
            (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.postFrontend)(_utils_command__WEBPACK_IMPORTED_MODULE_3__.Command.ShowAddonPageTranslationText, {
              translatedData: _response,
              point: data.point
            });
            return _context.abrupt("break", 45);

          case 14:
            _context.next = 16;
            return anki.addNote(data);

          case 16:
            _response2 = _context.sent;
            sendResponse(_response2);
            return _context.abrupt("break", 45);

          case 19:
            _context.next = 21;
            return anki.relearnCards(data);

          case 21:
            _response3 = _context.sent;
            sendResponse(_response3);
            return _context.abrupt("break", 45);

          case 24:
            _context.next = 26;
            return anki.getDeckNames();

          case 26:
            _response4 = _context.sent;
            sendResponse(_response4);
            return _context.abrupt("break", 45);

          case 29:
            _context.next = 31;
            return anki.getModelNames();

          case 31:
            _response5 = _context.sent;
            sendResponse(_response5);
            return _context.abrupt("break", 45);

          case 34:
            _context.next = 36;
            return anki.getVersion();

          case 36:
            _response6 = _context.sent;
            sendResponse(_response6);
            return _context.abrupt("break", 45);

          case 39:
            _context.next = 41;
            return anki.getModelFieldNames(data);

          case 41:
            _response7 = _context.sent;
            sendResponse(_response7);
            return _context.abrupt("break", 45);

          case 44:
            throw new Error("存在未处理的指令:" + command);

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}()); ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//辅助函数

function switchBadgeText(isOpen) {
  isOpen ? (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.setBadgeText)({
    text: ""
  }) : (0,_extensions_apis__WEBPACK_IMPORTED_MODULE_2__.setBadgeText)({
    text: "off"
  });
}
