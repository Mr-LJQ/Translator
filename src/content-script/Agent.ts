__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */ Iframe: () => /* binding */ Iframe,
  /* harmony export */
});
/* harmony import */ var _utils_command__WEBPACK_IMPORTED_MODULE_0__ =
  __webpack_require__(/*! ../utils/command */ "./src/utils/command.ts");
/* harmony import */ var _events_Messenger__WEBPACK_IMPORTED_MODULE_1__ =
  __webpack_require__(/*! ../events/Messenger */ "./src/events/Messenger.ts");
/* harmony import */ var _extensions_apis__WEBPACK_IMPORTED_MODULE_2__ =
  __webpack_require__(
    /*! ../extensions-apis */ "./src/extensions-apis/index.ts"
  );
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明引入

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//创建iframe，将其链接到预定义的View中
//魔法字符串
var openSelection = "OPEN_SELECTION";
var hiddenChinese = "HIDDEN_CHINESE";
var Iframe = /*#__PURE__*/ (function () {
  function Iframe() {
    var _this = this;

    _classCallCheck(this, Iframe);

    _defineProperty(this, "onMessage", void 0);

    _defineProperty(this, "mask", void 0);

    _defineProperty(this, "configMask", void 0);

    _defineProperty(this, "configContainer", void 0);

    _defineProperty(this, "messenger", void 0);

    _defineProperty(this, "postMessage", void 0);

    _defineProperty(this, "translationContainer", void 0);

    _defineProperty(this, "translationWrapper", void 0);

    _defineProperty(this, "isVisible", function () {
      return _this.mask.isConnected;
    });

    _defineProperty(this, "onClickToggle", function () {
      var _this$postMessage;

      _this.hiddenTranslationView();

      (_this$postMessage = _this.postMessage) === null ||
      _this$postMessage === void 0
        ? void 0
        : _this$postMessage.call(
            _this,
            _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.PauseAudio
          );
    });

    _defineProperty(this, "install", function () {
      var _this$messenger;

      (_this$messenger = _this.messenger) === null || _this$messenger === void 0
        ? void 0
        : _this$messenger.install();
      document.body.append(_this.translationWrapper);
    });

    _defineProperty(this, "uninstall", function () {
      var _this$messenger2;

      _this.hiddenTranslationView();

      (_this$messenger2 = _this.messenger) === null ||
      _this$messenger2 === void 0
        ? void 0
        : _this$messenger2.uninstall();

      _this.translationWrapper.remove();
    });

    //建立通信
    this.messenger =
      new _events_Messenger__WEBPACK_IMPORTED_MODULE_1__.Messenger({
        self: window,
      });
    this.onMessage = this.messenger.onMessage;
    this.postMessage = this.messenger.postMessage; //创建iframe

    var _createTranslationVie = createTranslationView(),
      iframe = _createTranslationVie.iframe,
      wrapper = _createTranslationVie.wrapper,
      container = _createTranslationVie.container,
      backButton = _createTranslationVie.backButton,
      configButton = _createTranslationVie.configButton,
      forwardButton = _createTranslationVie.forwardButton,
      configContainer = _createTranslationVie.configContainer;

    this.translationWrapper = wrapper;
    this.translationContainer = container;
    this.configContainer = configContainer; //保证获取contentWindow

    iframe.addEventListener("load", function () {
      var contentWindow = iframe.contentWindow;

      _this.messenger.addTarget(contentWindow);

      _this.messenger.install(); //实现历史按钮的明暗功能 明（存在历史记录） ,暗（不存在历史记录）

      _this.onMessage(
        _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.HistoryIndex,
        function (_ref) {
          var index = _ref.index,
            head = _ref.head,
            tail = _ref.tail;

          if (index <= head) {
            backButton.classList.add("invalid");
          } else {
            backButton.classList.remove("invalid");
          }

          if (index >= tail) {
            forwardButton.classList.add("invalid");
          } else {
            forwardButton.classList.remove("invalid");
          }
        }
      ); //绑定一些事件

      configContainer.addEventListener("input", function (event) {
        var input = event.target;
        if (!isInputElement(input)) return;

        if (input.name === openSelection) {
          var isOpen = input.checked;

          _this.messenger.postMessage(
            _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.OpenSelection,
            isOpen
          );

          (0, _extensions_apis__WEBPACK_IMPORTED_MODULE_2__.setStorage)({
            openSelection: isOpen,
          });
        }

        if (input.name === hiddenChinese) {
          var hidden = input.checked;

          _this.messenger.postMessage(
            _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.HiddenChinese,
            hidden
          );

          (0, _extensions_apis__WEBPACK_IMPORTED_MODULE_2__.setStorage)({
            hiddenChinese: hidden,
          });
        }
      });
      var configMask = createMask(
        "\n        position:absolute;\n        margin:0;\n        left:0;\n        top:0;\n        right:0;\n        bottom:0;\n      "
      );
      _this.configMask = configMask;
      configMask.addEventListener("click", function () {
        configContainer.classList.add("hidden");
        configMask.remove();
      });
      container.addEventListener("click", function (event) {
        var target = event.target;

        if (target === configButton) {
          configContainer.classList.remove("hidden"); //需要用到层叠规则的‘后来居上’，所以使用prepend插入configMask

          container.prepend(configMask);
        }

        if (target === backButton) {
          _this.messenger.postMessage(
            _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.BackHistory
          );
        }

        if (target === forwardButton) {
          _this.messenger.postMessage(
            _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.ForwardHistory
          );
        }
      }); //拖拽
      //因为拖拽是通过监听document上的鼠标移动实现的，而内部存在iframe会导致对document的监听失效
      //因此在拖拽行为发生的时候，生成一个层次更高的蒙版，以能够正确的监听document上的鼠标移动

      var moveMask = createMask(
        "\n        position:fixed;\n        margin:0;\n        left:0;\n        top:0;\n        bottom:0;\n        right:0;\n      "
      );
      var count = 0; //用于降低拖拽判断的灵敏度，避免用户单击出现问题

      container.addEventListener("mousedown", function (event) {
        var _container$getBoundin = container.getBoundingClientRect(),
          left = _container$getBoundin.left,
          top = _container$getBoundin.top;

        var clientX = event.clientX,
          clientY = event.clientY;
        var relativeX = clientX - left;
        var relativeY = clientY - top;

        var mouseMoveHandle = function mouseMoveHandle(event) {
          count++;
          if (count <= 3) return; //要先触发三次该事件才认为用户执行拖拽

          container.append(moveMask);
          container.style.left = event.clientX - relativeX + "px";
          container.style.top = event.clientY - relativeY + "px";
        };

        var mouseUpHandle = function mouseUpHandle() {
          moveMask.remove();
          count = 0; //重置数值

          document.removeEventListener("mousemove", mouseMoveHandle);
          document.removeEventListener("mouseup", mouseUpHandle);
        };

        document.addEventListener("mousemove", mouseMoveHandle);
        document.addEventListener("mouseup", mouseUpHandle);
      });
      (0,
      _extensions_apis__WEBPACK_IMPORTED_MODULE_2__.getStorage)(["openSelection", "hiddenChinese", "openStrengthenSelectionByPressedCtrl", "isOpen"], function (item) {
        _this.postMessage(
          _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.IsOpen,
          item.isOpen
        );

        _this.postMessage(
          _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.OpenSelection,
          item.openSelection
        );

        _this.postMessage(
          _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.HiddenChinese,
          item.hiddenChinese
        );
      });
      (0, _extensions_apis__WEBPACK_IMPORTED_MODULE_2__.onStorageChange)({
        isOpen: function isOpen(_, value) {
          _this.postMessage(
            _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command.IsOpen,
            value
          );
        },
      });
    }); //此处的translationPage.html需要参考所生成文件的具体名称

    iframe.src = (0, _extensions_apis__WEBPACK_IMPORTED_MODULE_2__.getURL)(
      "translationPage.html"
    );
    /**
     * 之所以不使用 inset: 0px; 的写法，是因为那样写会占用更多的内存
     *  该 mask 已经提升到合成层，而合成层会占用更大的内存，而占用的内存与元素大小正相关
     *  通过下面的写法，元素的大小为 1*1,占用内存小，而用scale放大后又可以保证原有效果（本质是时间换空间？）
     */

    var mask = createMask(
      "\n      position:fixed;\n      z-index:99999;\n      top:50%;\n      left:50%;\n      width:1px;\n      height:1px;\n      transform:scale(5000);\n      background:rgba(0,0,0,.3);\n    "
    );
    this.mask = mask;
    this.mask.addEventListener("click", this.onClickToggle);
  }

  _createClass(Iframe, [
    {
      key: "hiddenTranslationView",
      value: function hiddenTranslationView() {
        var _this$configMask;

        this.mask.remove();
        (_this$configMask = this.configMask) === null ||
        _this$configMask === void 0
          ? void 0
          : _this$configMask.remove(); //不能够使用 hidden=true 的形式，因为那样会导致 translationContainer 在渲染树中删除
        //这样会导致 translationPage 更新时，不能够实时获取内部元素的高度

        this.translationContainer.style.visibility = "";
        this.configContainer.classList.add("hidden");
      },
    },
    {
      key: "showTranslation",
      value:
        /**
         * 一层简单的封装，其目的在于使外部调用更加便捷统一
         * @param data
         */
        function showTranslation(data) {
          var _this$postMessage2,
            _this2 = this;

          var translatedData = data.translatedData,
            point = data.point;
          (_this$postMessage2 = this.postMessage) === null ||
          _this$postMessage2 === void 0
            ? void 0
            : _this$postMessage2.call(
                this,
                _utils_command__WEBPACK_IMPORTED_MODULE_0__.Command
                  .ShowTranslation,
                translatedData,
                function () {
                  //UI更新后再展示iframe,避免闪烁
                  _this2.showUI(point);
                }
              );
        },
      /**
       * 展示UI
       */
    },
    {
      key: "showUI",
      value: function showUI(point) {
        var rect = this.translationContainer.getBoundingClientRect();
        var width = rect.width,
          height = rect.height;
        var left =
          (point === null || point === void 0 ? void 0 : point.x) || rect.left;
        var top =
          (point === null || point === void 0 ? void 0 : point.y) || rect.top; //用于判断是否超出视口

        var clientWidth = document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight; //对越界位置进行修正

        left = Math.min(Math.max(0, left), clientWidth - width);
        top = Math.min(Math.max(0, top), clientHeight - height);
        !this.mask.isConnected && document.body.append(this.mask);
        this.translationContainer.style.cssText =
          "\n    visibility:visible;\n    left:"
            .concat(left, "px;\n    top:")
            .concat(top, "px;\n    ");
      },
    },
  ]);

  return Iframe;
})();

function isInputElement(ele) {
  //先排除非对象类型
  if (Object(ele) !== ele) return false;
  if (!(ele instanceof Element)) return false;
  return ele.tagName === "INPUT";
}

function createMask(cssText) {
  //通过蒙版点击监听来隐藏 translationPage，如果绑定在document上，有可能因为处于其它iframe而无效
  var wrapper = document.createElement("div");
  wrapper.style.setProperty("display", "contents", "important");
  var shadowRoot = wrapper.attachShadow({
    mode: "open",
  });
  shadowRoot.innerHTML = "\n    <style>\n      .mask {\n        ".concat(
    cssText,
    "\n      }\n    </style>\n  "
  );
  var mask = document.createElement("div");
  mask.classList.add("mask");
  shadowRoot.append(mask);
  return wrapper;
}

function createTranslationView() {
  const { width, height } = {
    width: 400,
    height: 300,
  };
  const wrapper = document.createElement("div");
  //创建幽灵节点
  wrapper.style.setProperty("display", "contents", "important");
  const shadowRoot = wrapper.attachShadow({
    mode: "open",
  });
  shadowRoot.innerHTML = `
    <style>
      .container {
        position:fixed;
        visibility:hidden;
        z-index: 999999;
        border-radius: 6px;
        background: #fff;
        user-select:none;
      }
      .header {
        height:30px;
      }
      .iframe {
        width:${width}px;
        height:${height}px;
        border: none;
      }
      .config {
        float: right;
        font-weight: 700;
      }
      .back,.forward {
        float:left;
        margin-left:5px;
      }
      .back,
      .config,
      .forward{
        height: 30px;
        width: 30px;
        padding: 0;
        color: inherit;
        font-size: 24px;
        text-align:center;
        border-style: none;
        line-height: 30px;
        background:transparent;
        cursor: pointer;
        user-select: none;
      }

      .back:focus-visible,
      .config:focus-visible,
      .forward:focus-visible{
        outline: 2px solid blue;
        border-radius: 5px;
        outline-offset: -5px;
      }
      
      .back.invalid,
      .forward.invalid{
        color:#aaa;
        cursor: auto;
      }

      .back:hover,
      .config:hover,
      .forward:hover{
        border-radius:50%;
        background:#ddd;
      }

      .back.invalid:hover,
      .forward.invalid:hover{
        border-radius:0px;
        background:none;
      }

      .hidden {
        display:none!important;
      }

      .config-container {
        display: flex;
        position: absolute;
        flex-flow: column;
        padding: 5px;
        border: 1px solid;
        border-radius: 5px 0 5px 5px;
        background:white;
        right: 6px;
        top: 40px;
        user-select:none;
      }

      .config-container:after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        right: 2px;
        top: -6px;
        border-style: solid;
        background: white;
        border-width: 1px 0 0 1px;
        transform: rotate(45deg);
      }
    </style>`;

  const container = document.createElement("div");
  const header = document.createElement("header");
  const iframe = document.createElement("iframe");
  const configButton = document.createElement("button");
  const forwardButton = document.createElement("button");
  const backButton = document.createElement("button");
  const configContainer = document.createElement("form");
  getStorage(["openSelection", "hiddenChinese"], function (item) {
    configContainer.innerHTML = `
      <label >启用选词翻译<input type="checkbox" name="${openSelection}" ${
      item.openSelection ? "checked" : ""
    }/></label>
      <label >隐藏中文翻译<input type="checkbox" name="${hiddenChinese}" ${
      item.hiddenChinese ? "checked" : ""
    }/></label>
      `;
  });
  configButton.textContent = "∨";
  forwardButton.textContent = "＞";
  backButton.textContent = "＜";
  header.append(backButton, forwardButton, configButton, configContainer);
  container.append(header, iframe);
  shadowRoot.append(container);
  header.classList.add("header");
  iframe.classList.add("iframe");
  container.classList.add("container");
  backButton.classList.add("back", "invalid");
  configButton.classList.add("config");
  forwardButton.classList.add("forward", "invalid");
  configContainer.classList.add("config-container", "hidden"); //部分页面为了避免广告插入，会在设置一个类似 iframe {display:none!important} 的样式
  //所为了避免受到影响，就需要添加下面这一行

  iframe.style.setProperty("display", "block", "important");
  return {
    container: container,
    iframe: iframe,
    forwardButton: forwardButton,
    backButton: backButton,
    configContainer: configContainer,
    configButton: configButton,
    wrapper: wrapper,
  };
}
