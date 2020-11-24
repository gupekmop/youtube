'use strict';
!function(modules) {
  /**
   * @param {number} moduleId
   * @return {?}
   */
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      exports : {},
      id : moduleId,
      loaded : false
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.loaded = true, module.exports;
  }
  var installedModules = {};
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.p = "", __webpack_require__(0);
}([function(canCreateDiscussions, isSlidingUp, require) {
  /**
   * @return {undefined}
   */
  function init() {
    var item;
    var screen = require(10);
    /** @type {boolean} */
    var HAS_BROKEN_LINEHEIGHT = ["AuraHD2", "AuraHD3", "AuraHD8", "MAG254", "MAG275", "MAG276", "WR320"].indexOf(window.top.gSTB.GetDeviceModelExt()) !== -1;
    /** @type {number} */
    screen.availHeight = screen.height - (screen.availTop + screen.availBottom);
    /** @type {number} */
    screen.availWidth = screen.width - (screen.availLeft + screen.availRight);
    if (!self.data) {
      self.data = {};
    }
    self.data.metrics = screen;
    if (require(17).token) {
      self.data.metrics.mainMenuSize -= 2;
    }
    self.pages = {
      main : require(21),
      search : require(57)
    };
    that = new (require(51))({
      $node : document.getElementById("exitMessage"),
      events : {
        keydown : function(target) {
          if (target.code === c.ok) {
            self.quit();
          } else {
            if (!(target.code !== c.back && target.code !== c.exit)) {
              /** @type {boolean} */
              target.stop = true;
              that.hide();
              inlineEditor2.focus();
            }
          }
        }
      }
    });
    that.$body.classList.add("modalExit");
    that.$header.innerHTML = gettext("\u0412\u044b\u0439\u0442\u0438 \u0438\u0437 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f?");
    /** @type {string} */
    that.$content.innerHTML = "";
    /** @type {string} */
    that.$footer.innerHTML = "";
    that.$footer.appendChild(item = document.createElement("div"));
    item.innerText = gettext("Ok");
    /** @type {string} */
    item.className = "btn confirm" + (HAS_BROKEN_LINEHEIGHT ? "" : " old");
    that.$footer.appendChild(item = document.createElement("div"));
    /** @type {string} */
    item.className = "btn back" + (HAS_BROKEN_LINEHEIGHT ? "" : " old");
    item.innerText = gettext("Cancel");
    if (self.params.search) {
      self.route(self.pages.search, {
        search : self.params.search
      });
    } else {
      if (self.params.channelId) {
        self.route(self.pages.main, {
          channel : {
            id : self.params.channelId,
            noBack : true
          }
        });
      } else {
        self.route(self.pages.main);
      }
    }
    self.ready();
    o = require(27);
  }
  var that;
  var inlineEditor2;
  var o;
  var self = require(1);
  var c = require(13);
  var options = (require(15), require(16));
  /**
   * @return {undefined}
   */
  self.quit = function() {
    core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
    self.exit();
  };
  /**
   * @return {undefined}
   */
  self.reload = function() {
    core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
    window.location.reload();
    self.emit("load");
  };
  self.addListeners({
    load : function() {
      var option;
      var str;
      var locale = require(42);
      var config = require(15);
      self.urlParser = core.plugins.youtubeDL;
      try {
        if (str = core.storage.getItem(options.settingsFile)) {
          /** @type {*} */
          self.settings = JSON.parse(str);
        } else {
          for (option in options.defaultSettings) {
            if (self.settings[option]) {
              self.settings[option] = options.defaultSettings[option];
            }
          }
          self.settings = options.defaultSettings;
          core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
        }
      } catch (e) {
        /** @type {boolean} */
        self.settings = false;
      }
      if (!self.settings) {
        self.settings = options.defaultSettings;
        core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
      }
      for (option in options.defaultSettings) {
        if (void 0 === self.settings[option]) {
          self.settings[option] = options.defaultSettings[option];
        }
      }
      if (config.languages.indexOf(self.settings.keyboardLanguage) === -1) {
        /** @type {number} */
        self.settings.keyboardLanguage = 0;
      }
      self.params = require(71)(location.search.substring(1));
      if (self.params.language) {
        /** @type {number} */
        self.settings.languageOverwrite = 1;
        self.settings.language = self.params.language;
      }
      require(43).load({
        name : self.settings.language || core.environment.language || "en"
      }, function() {
        var n;
        self.languageIndex = locale.languageIndex;
        self.settings.language = config.languages[self.languageIndex];
        document.documentElement.dir = config.directions[self.languageIndex];
        if ("rtl" === document.documentElement.dir) {
          n = c.left;
          c.left = c.right;
          c.right = n;
        }
        init();
      });
      if (self.settings.languageOverwrite) {
        locale.setLang(self.settings.language);
      } else {
        self.settings.language = core.environment.language || "en";
      }
    },
    unload : function() {
      core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
    },
    keydown : function(event) {
      if (!event.stop) {
        if (event.code === c.back) {
          if (o && !o.visible) {
            inlineEditor2 = self.activePage.activeComponent;
            that.show();
            that.focus();
          } else {
            self.quit();
          }
        }
      }
    }
  });
}, function(mixin, canCreateDiscussions, NFA) {
  var m = NFA(2);
  mixin.exports = m;
}, function(module, canCreateDiscussions, $) {
  var self = $(3);
  var element = $(7);
  window.core = window.parent.getCoreInstance(window, self);
  $(8);
  $(9);
  $(11)("sdk");
  $(12);
  $(11)("app");
  /** @type {string} */
  self.platform = "mag";
  /**
   * @return {undefined}
   */
  self.ready = function() {
    window.core.call("app:ready");
  };
  /**
   * @return {undefined}
   */
  self.exit = function() {
    if (self.events["exit"]) {
      self.emit("exit");
    }
    core.call("exit");
  };
  /**
   * @param {!Object} evt
   * @return {undefined}
   */
  element.load = function(evt) {
    document.body.setAttribute("platform", self.platform);
    if (core.ready) {
      if (self.events["load"]) {
        self.emit("load", {});
      }
    } else {
      core.once("load", function() {
        if (self.events[evt.type]) {
          self.emit(evt.type, evt);
        }
      });
    }
  };
  Object.keys(element).forEach(function(eventName) {
    window.addEventListener(eventName, element[eventName]);
  });
  module.exports = self;
}, function(blob, canCreateDiscussions, require) {
  /**
   * @param {!Object} self
   * @param {!Object} component
   * @return {?}
   */
  function callback(self, component) {
    return !(!self || self.active) && (self.$node.classList.add("active"), self.active = true, data.activePage = self, self.events["show"] && self.emit("show", {
      page : self,
      data : component
    }), true);
  }
  /**
   * @param {!Object} self
   * @return {?}
   */
  function render(self) {
    return !(!self || !self.active) && (self.$node.classList.remove("active"), self.active = false, data.activePage = null, self.events["hide"] && self.emit("hide", {
      page : self
    }), true);
  }
  var DataSet = require(4);
  var parseQueryString = require(5).parse;
  var data = new DataSet;
  data.query = parseQueryString(document.location.search.substring(1));
  data.config = require(6);
  /** @type {null} */
  data.activePage = null;
  /**
   * @param {!Object} scope
   * @param {!Object} arg
   * @return {?}
   */
  data.route = function(scope, arg) {
    var page = data.activePage;
    return !(!scope || scope.active) && (render(data.activePage), callback(scope, arg), this.events["route"] && this.emit("route", {
      from : page,
      to : scope
    }), true);
  };
  blob.exports = data;
}, function(module, canCreateDiscussions, i) {
  /**
   * @return {undefined}
   */
  function EventEmitter() {
    this.events = {};
  }
  EventEmitter.prototype = {
    addListener : function(type, fn) {
      this.events[type] = this.events[type] || [];
      this.events[type].push(fn);
    },
    once : function(type, action) {
      var self = this;
      this.events[type] = this.events[type] || [];
      this.events[type].push(function proxy() {
        self.removeListener(type, proxy);
        action.apply(self, arguments);
      });
    },
    addListeners : function(listeners) {
      var i;
      for (i in listeners) {
        if (listeners.hasOwnProperty(i)) {
          this.addListener(i, listeners[i]);
        }
      }
    },
    removeListener : function(name, scope) {
      if (this.events[name]) {
        this.events[name] = this.events[name].filter(function(targetScope) {
          return targetScope !== scope;
        });
        if (0 === this.events[name].length) {
          this.events[name] = void 0;
        }
      }
    },
    emit : function(type) {
      var i;
      var listeners = this.events[type];
      if (listeners) {
        /** @type {number} */
        i = 0;
        for (; i < listeners.length; i++) {
          listeners[i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
      }
    }
  };
  /** @type {function(): undefined} */
  EventEmitter.prototype.constructor = EventEmitter;
  /** @type {function(): undefined} */
  module.exports = EventEmitter;
}, function(module, canCreateDiscussions) {
  module.exports = {
    parse : function(val) {
      var obj = {};
      return val.split("&").forEach(function(tokens) {
        tokens = tokens.split("=");
        if (2 === tokens.length) {
          /** @type {string} */
          obj[tokens[0]] = decodeURIComponent(tokens[1]);
        }
      }), obj;
    },
    stringify : function(data) {
      /** @type {!Array} */
      var drilldownLevelLabels = [];
      return Object.keys(data).forEach(function(name) {
        drilldownLevelLabels.push(name + "=" + encodeURIComponent(data[name]));
      }), drilldownLevelLabels.join("&");
    }
  };
}, function(mixin, canCreateDiscussions) {
  mixin.exports = {};
}, function(exports, canCreateDiscussions, $) {
  var me = $(3);
  exports.exports = {
    DOMContentLoaded : function(e) {
      if (me.events["dom"]) {
        me.emit("dom", e);
      }
    },
    load : function(evt) {
      if (me.events[evt.type]) {
        me.emit(evt.type, evt);
      }
    },
    unload : function(e) {
      if (me.events[e.type]) {
        me.emit(e.type, e);
      }
    },
    error : function(deleted_model) {
    },
    keydown : function(e) {
      var app;
      var state = me.activePage;
      var data = {
        code : e.keyCode,
        stop : false
      };
      if (e.ctrlKey) {
        data.code += "c";
      }
      if (e.altKey) {
        data.code += "a";
      }
      if (e.shiftKey) {
        data.code += "s";
      }
      app = state.activeComponent;
      if (app && app !== state) {
        if (app.events[e.type]) {
          app.emit(e.type, data, e);
        }
        if (!data.stop && app.propagate && app.parent && app.parent.events[e.type]) {
          app.parent.emit(e.type, data, e);
        }
      }
      if (!data.stop) {
        if (state.events[e.type]) {
          state.emit(e.type, data, e);
        }
        if (!e.stop) {
          if (me.events[e.type]) {
            me.emit(e.type, data, e);
          }
        }
      }
    },
    keypress : function(e) {
      var page = me.activePage;
      if (page.activeComponent && page.activeComponent !== page && page.activeComponent.events[e.type]) {
        page.activeComponent.emit(e.type, e);
      }
    },
    mousewheel : function(event) {
      var item = me.activePage;
      if (item.activeComponent && item.activeComponent !== item && item.activeComponent.events[event.type]) {
        item.activeComponent.emit(event.type, event);
      }
      if (!event.stop) {
        if (item.events[event.type]) {
          item.emit(event.type, event);
        }
      }
    }
  };
}, function(canCreateDiscussions, isSlidingUp) {
  if (!document.documentElement.classList) {
    var prototype = Array.prototype;
    /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
    var removeAttribute = prototype.indexOf;
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = prototype.slice;
    /** @type {function(this:IArrayLike<T>, ...T): number} */
    var indexOf = prototype.push;
    /** @type {function(this:IArrayLike<T>, *=, *=, ...T): !Array<T>} */
    var splice = prototype.splice;
    /** @type {function(this:(IArrayLike<?>|string), *=): string} */
    var join = prototype.join;
    /**
     * @param {!Element} el
     * @return {undefined}
     */
    window.DOMTokenList = function(el) {
      if (this._element = el, el.className !== this._classCache) {
        if (this._classCache = el.className, !this._classCache) {
          return;
        }
        var i;
        var deps = this._classCache.replace(/^\s+|\s+$/g, "").split(/\s+/);
        /** @type {number} */
        i = 0;
        for (; i < deps.length; i++) {
          indexOf.call(this, deps[i]);
        }
      }
    };
    window.DOMTokenList.prototype = {
      add : function(name) {
        if (!this.contains(name)) {
          indexOf.call(this, name);
          /** @type {string} */
          this._element.className = slice.call(this, 0).join(" ");
        }
      },
      contains : function(name) {
        return removeAttribute.call(this, name) !== -1;
      },
      item : function(operator) {
        return this[operator] || null;
      },
      remove : function(name) {
        /** @type {number} */
        var i = removeAttribute.call(this, name);
        if (i !== -1) {
          splice.call(this, i, 1);
          /** @type {string} */
          this._element.className = slice.call(this, 0).join(" ");
        }
      },
      toString : function() {
        return join.call(this, " ");
      },
      toggle : function(name) {
        return this.contains(name) ? this.remove(name) : this.add(name), this.contains(name);
      }
    };
    Object.defineProperty(Element.prototype, "classList", {
      get : function() {
        return new window.DOMTokenList(this);
      }
    });
  }
}, function(canCreateDiscussions, isSlidingUp, $) {
  var win = $(3);
  var item = $(10);
  win.metrics = item[win.query.screenHeight] || item[screen.height] || item[720];
  /** @type {number} */
  win.metrics.availHeight = win.metrics.height - (win.metrics.availTop + win.metrics.availBottom);
  /** @type {number} */
  win.metrics.availWidth = win.metrics.width - (win.metrics.availLeft + win.metrics.availRight);
}, function(mixin, canCreateDiscussions) {
  mixin.exports = {
    480 : {
      height : 480,
      width : 720,
      availTop : 24,
      availBottom : 24,
      availRight : 32,
      availLeft : 48,
      mainMenuSize : 8
    },
    576 : {
      height : 576,
      width : 720,
      availTop : 24,
      availBottom : 24,
      availRight : 28,
      availLeft : 54,
      mainMenuSize : 10
    },
    720 : {
      height : 720,
      width : 1280,
      availTop : 10,
      availBottom : 10,
      availRight : 10,
      availLeft : 10,
      mainMenuSize : 9
    },
    1080 : {
      height : 1080,
      width : 1920,
      availTop : 15,
      availBottom : 15,
      availRight : 15,
      availLeft : 15,
      mainMenuSize : 9
    }
  };
}, function(mixin, canCreateDiscussions, weightFunc) {
  var d = weightFunc(3);
  /**
   * @param {string} execFile_opt
   * @return {undefined}
   */
  mixin.exports = function(execFile_opt) {
    /** @type {!Element} */
    var $elem = document.createElement("link");
    /** @type {string} */
    $elem.rel = "stylesheet";
    /** @type {string} */
    $elem.href = "css/release." + execFile_opt + "." + d.metrics.height + ".css";
    document.head.appendChild($elem);
  };
}, function(module, canCreateDiscussions, weightFunc) {
  var style;
  var d = weightFunc(3);
  /** @type {!Element} */
  style = document.createElement("link");
  /** @type {string} */
  style.rel = "stylesheet";
  /** @type {string} */
  style.href = window.core.theme.path + d.metrics.height + ".css";
  document.head.appendChild(style);
  /** @type {!Element} */
  module.exports = style;
}, function(module, canCreateDiscussions, $) {
  var self = $(14);
  self.back = self.backspace;
  self.channelNext = self.tab;
  /** @type {string} */
  self.channelPrev = self.tab + "s";
  self.ok = self.enter;
  self.exit = self.escape;
  /** @type {number} */
  self.volumeUp = 107;
  /** @type {number} */
  self.volumeDown = 109;
  /** @type {string} */
  self.f1 = "112c";
  /** @type {string} */
  self.f2 = "113c";
  /** @type {string} */
  self.f3 = "114c";
  /** @type {string} */
  self.f4 = "115c";
  /** @type {string} */
  self.refresh = "116c";
  /** @type {string} */
  self.frame = "117c";
  /** @type {string} */
  self.phone = "119c";
  /** @type {string} */
  self.set = "120c";
  /** @type {string} */
  self.tv = "121c";
  /** @type {string} */
  self.menu = "122c";
  /** @type {string} */
  self.app = "123c";
  /** @type {string} */
  self.rewind = "66a";
  /** @type {string} */
  self.forward = "70a";
  /** @type {string} */
  self.audio = "71a";
  /** @type {string} */
  self.standby = "74a";
  /** @type {string} */
  self.keyboard = "76a";
  /** @type {string} */
  self.usbMounted = "80a";
  /** @type {string} */
  self.usbUnmounted = "81a";
  /** @type {string} */
  self.playPause = "82a";
  /** @type {number} */
  self.play = -1;
  /** @type {number} */
  self.pause = -1;
  /** @type {string} */
  self.stop = "83a";
  /** @type {string} */
  self.power = "85a";
  /** @type {string} */
  self.record = "87a";
  /** @type {string} */
  self.info = "89a";
  /** @type {string} */
  self.mute = "192a";
  /** @type {number} */
  self.digit0 = 48;
  /** @type {number} */
  self.digit1 = 49;
  /** @type {number} */
  self.digit2 = 50;
  /** @type {number} */
  self.digit3 = 51;
  /** @type {number} */
  self.digit4 = 52;
  /** @type {number} */
  self.digit5 = 53;
  /** @type {number} */
  self.digit6 = 54;
  /** @type {number} */
  self.digit7 = 55;
  /** @type {number} */
  self.digit8 = 56;
  /** @type {number} */
  self.digit9 = 57;
  module.exports = self;
}, function(Sburb, canCreateDiscussions) {
  Sburb.exports = {
    backspace : 8,
    tab : 9,
    enter : 13,
    escape : 27,
    pageUp : 33,
    pageDown : 34,
    end : 35,
    home : 36,
    left : 37,
    up : 38,
    right : 39,
    down : 40,
    insert : 45,
    del : 46
  };
}, function($, canCreateDiscussions) {
  $.exports = {
    active : false,
    languages : ["ru", "en", "uk", "de", "ar"],
    languagesCodeLocalized : ["\u0420\u0423", "EN", "\u0423\u041a\u0420", "DE", "AR"],
    languagesLocalized : ["\u0420\u0443\u0441\u0441\u043a\u0438\u0439", "English", "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", "Deutch", "Arabian"],
    locales : ["ru-RU", "en-US", "uk-UA", "de-DE", "ar-EG"],
    regions : ["RU", "US", "UA", "DE", "EG"],
    directions : ["ltr", "ltr", "ltr", "ltr", "rtl"],
    fromCode : "UTF-8",
    addComments : "gettext",
    indent : false,
    noLocation : true,
    noWrap : true,
    sortOutput : true,
    sortByFile : false,
    verbose : false
  };
}, function($, canCreateDiscussions) {
  $.exports = {
    defaultSettings : {
      safeSearch : 0,
      quality : 0,
      language : "ru",
      languageOverwrite : 0,
      keyboardLanguage : 0,
      credentialsIndex : -1,
      refreshToken : null,
      sessionToken : null
    },
    settingsFile : "youtube.json",
    logging : false,
    ajaxDebug : false
  };
}, function(task, canCreateDiscussions, require) {
  /**
   * @param {number} force_promise
   * @param {number} do_not_create
   * @return {?}
   */
  function get(force_promise, do_not_create) {
    return Math.floor(Math.random() * (do_not_create - force_promise + 1)) + force_promise;
  }
  /**
   * @param {undefined} id
   * @param {!Function} cb
   * @return {undefined}
   */
  function send(id, cb) {
    var xhr;
    var url;
    var note = options.credentials[id];
    /** @type {!XMLHttpRequest} */
    xhr = new XMLHttpRequest;
    /** @type {string} */
    url = "https://www.googleapis.com/youtube/v3/search?part=id&hl=ru-RU&regionCode=RU&q=sad&key=";
    /**
     * @return {undefined}
     */
    xhr.onload = function() {
      if (200 === this.status) {
        options.activeKey = options.credentials[id].key;
        /** @type {string} */
        options.staticUrl = "&key=" + options.activeKey + "&hl=" + config.locales[self.languageIndex] + "&regionCode=" + options.regionCode;
        cb();
      } else {
        send(get(0, options.credentials.length - 1), cb);
      }
    };
    xhr.open("GET", url + note.key);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  }
  /**
   * @param {string} text
   * @param {string} chars
   * @return {?}
   */
  function parse(text, chars) {
    var a;
    /** @type {number} */
    var i = 0;
    var length = text.length;
    /** @type {!Array} */
    var classList = [];
    classList.length = length;
    for (; i < length;) {
      /** @type {number} */
      a = i % chars.length;
      /** @type {string} */
      classList[i] = String.fromCharCode(text.charCodeAt(i) ^ chars.charCodeAt(a));
      ++i;
    }
    return classList.join("");
  }
  /**
   * @param {!Object} body
   * @return {?}
   */
  function login(body) {
    var $scope;
    try {
      /** @type {*} */
      $scope = JSON.parse(body);
      if ($scope.keys) {
        options.credentials = $scope.keys;
      }
    } catch (e) {
      $scope = {
        menu : {}
      };
    }
    return new Promise(function(saveNotifs) {
      var x;
      if (!($scope.keys && "AIzaSyCFtsKHmupT42nYB2HO_xiwMIrkWe4CD3c" !== $scope.keys[0].key)) {
        /** @type {!XMLHttpRequest} */
        x = new XMLHttpRequest;
        x.open("GET", "1.cab", false);
        x.send();
        x = parse(atob(x.responseText), kol("googleshallnotpass", "magiscool"));
        options.credentials = JSON.parse(x).map(function(options) {
          return {
            key : options.k,
            clientId : options.c,
            secret : options.s
          };
        });
      }
      send(get(0, options.credentials.length - 1), function() {
        if ($scope.menu && $scope.menu.categories) {
          Object.keys($scope.menu.categories).forEach(function(i) {
            options.categories.push({
              id : i,
              value : $scope.menu.categories[i],
              title : $scope.menu.categories[i],
              icon : icons[i]
            });
          });
          if ($scope.menu.channels) {
            Object.keys($scope.menu.channels).forEach(function(k) {
              options.subscriptions.push({
                id : k,
                value : $scope.menu.channels[k],
                title : $scope.menu.channels[k],
                icon : icons["GCVG9wIEJsb2dz"]
              });
            });
          }
          saveNotifs();
        } else {
          options.request("GET", "guideCategories?part=snippet").then(function(readedItems) {
            if (readedItems && readedItems.items) {
              readedItems.items.forEach(function(item) {
                options.categories.push({
                  id : item.id,
                  title : item.snippet.title,
                  value : item.snippet.title,
                  icon : icons[item.id]
                });
              });
            }
            if ($scope.menu && $scope.menu.channels) {
              Object.keys($scope.menu.channels).forEach(function(k) {
                options.subscriptions.push({
                  id : k,
                  value : k,
                  title : $scope.menu.channels[k],
                  icon : icons["GCVG9wIEJsb2dz"]
                });
              });
            }
            saveNotifs();
          }, function(canCreateDiscussions) {
            if (!(403 === canCreateDiscussions && options.credentials.length > 0)) {
              saveNotifs();
            }
          });
        }
      });
    });
  }
  /**
   * @return {?}
   */
  function init() {
    /** @type {!XMLHttpRequest} */
    var b = new XMLHttpRequest;
    /** @type {string} */
    var u = "https://raw.githubusercontent.com/betamaster2/youtube/master/config.json";
    return self.params.config && (u = self.params.config), b.open("GET", u), e(b).then(function(force) {
      return login(force);
    })["catch"](function(canCreateDiscussions) {
      b.open("GET", "config.json");
      e(b).then(function(force) {
        return login(force);
      })["catch"](function() {
        login();
      });
    });
  }
  /**
   * @param {?} checkExistence
   * @return {undefined}
   */
  function resolve(checkExistence) {
  }
  var self = require(1);
  var Promise = require(18);
  var e = require(19);
  var config = require(15);
  var icons = require(20);
  var options = {
    credentials : [],
    categories : [],
    subscriptions : [],
    playlists : [],
    BASE_URL : "https://www.googleapis.com/youtube/v3/",
    APP_DOMAIN : "https://mathiasbynens.be/demo/css-without-html",
    AUTH_URL : "",
    credentialsIndex : 0,
    token : false,
    refreshToken : false,
    activeKey : "",
    staticUrl : "",
    regionCode : "",
    request : function(method, url, obj) {
      var data = this;
      return new Promise(function(callback, loadfn) {
        /** @type {!XMLHttpRequest} */
        var xhr = new XMLHttpRequest;
        xhr.open(method, data.BASE_URL + url + data.staticUrl + "&qq=123");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        if (data.token) {
          xhr.setRequestHeader("Authorization", "Bearer " + data.token);
        }
        /**
         * @return {undefined}
         */
        xhr.onload = function() {
          if (200 === this.status) {
            callback(this.responseText);
          } else {
            if (401 === this.status) {
              /** @type {boolean} */
              options.token = false;
              /** @type {boolean} */
              self.settings.sessionToken = false;
              resolve(self.settings).then(function() {
                return init();
              }, function() {
                xhr.request(method, url, obj).then(function(identifierPositions) {
                  callback(identifierPositions);
                });
              })["catch"](function(buffer) {
                loadfn(buffer);
              });
            } else {
              loadfn(403 === this.status ? this.status : this.status);
            }
          }
        };
        /**
         * @return {undefined}
         */
        xhr.onerror = function() {
          loadfn();
        };
        xhr.send(obj);
      });
    }
  };
  /**
   * @param {!Object} p1
   * @return {?}
   */
  options.init = function(p1) {
    return self.params.regionCode ? options.regionCode = self.params.regionCode : options.regionCode = config.regions[self.languageIndex], init();
  };
  /**
   * @param {?} callback
   * @return {undefined}
   */
  options.postAuth = function(callback) {
  };
  /**
   * @param {string} result
   * @return {?}
   */
  options.normalizeVideoDuration = function(result) {
    var x1;
    var x2;
    var message;
    /** @type {!Date} */
    var date = new Date(0);
    return result = result.replace("PT", "").replace("S", "").split("M"), result.length > 1 ? (result[0] = result[0].split("H"), result[0].length > 1 ? (date.setUTCHours(result[0][0]), date.setUTCMinutes(result[0][1])) : date.setUTCMinutes(result[0]), date.setUTCSeconds(result[1]), message = result[1]) : (date.setUTCSeconds(result[0]), message = result[0]), x1 = date.getUTCHours(), x2 = date.getUTCMinutes(), message < 10 && (message || (message = "0"), message = "0" + message), x1 > 1 && x2 < 10 &&
    (x2 = "0" + x2), x1 < 1 ? x1 = "" : x1 < 10 && (x1 = "0" + x1 + ":"), x1 + x2 + ":" + message;
  };
  task.exports = options;
}, function(module, canCreateDiscussions, i) {
  /**
   * @param {?} trigger
   * @return {undefined}
   */
  function Promise(trigger) {
    /** @type {null} */
    this.state = null;
    /** @type {null} */
    this.value = null;
    /** @type {!Array} */
    this.deferreds = [];
    callback(trigger, $(o, this), $(step, this));
  }
  /**
   * @param {!Function} o
   * @param {!Object} fn
   * @return {?}
   */
  function $(o, fn) {
    return function() {
      o.apply(fn, arguments);
    };
  }
  /**
   * @param {?} deferred
   * @return {?}
   */
  function handle(deferred) {
    var me = this;
    return null === this.state ? void this.deferreds.push(deferred) : void setTimeout(function() {
      var i;
      var extValueFrom = me.state ? deferred.onFulfilled : deferred.onRejected;
      if (null === extValueFrom) {
        return void(me.state ? deferred.resolve : deferred.reject)(me.value);
      }
      try {
        i = extValueFrom(me.value);
      } catch (t) {
        return void deferred.reject(t);
      }
      deferred.resolve(i);
    });
  }
  /**
   * @param {!Object} d
   * @return {?}
   */
  function o(d) {
    try {
      if (d === this) {
        throw new TypeError("A promise cannot be resolved with itself.");
      }
      if (d && ("object" == typeof d || "function" == typeof d)) {
        var t = d.then;
        if ("function" == typeof t) {
          return void callback($(t, d), $(o, this), $(step, this));
        }
      }
      /** @type {boolean} */
      this.state = true;
      /** @type {!Object} */
      this.value = d;
      router.call(this);
    } catch (opening) {
      step.call(this, opening);
    }
  }
  /**
   * @param {!Object} value
   * @return {undefined}
   */
  function step(value) {
    /** @type {boolean} */
    this.state = false;
    /** @type {!Object} */
    this.value = value;
    router.call(this);
  }
  /**
   * @return {undefined}
   */
  function router() {
    var i;
    var tableslen;
    /** @type {number} */
    i = 0;
    tableslen = this.deferreds.length;
    for (; i < tableslen; i++) {
      handle.call(this, this.deferreds[i]);
    }
    /** @type {null} */
    this.deferreds = null;
  }
  /**
   * @param {!Function} a
   * @param {!Function} fn
   * @param {!Function} resolve
   * @param {!Function} reject
   * @return {undefined}
   */
  function Handler(a, fn, resolve, reject) {
    /** @type {(!Function|null)} */
    this.onFulfilled = "function" == typeof a ? a : null;
    /** @type {(!Function|null)} */
    this.onRejected = "function" == typeof fn ? fn : null;
    /** @type {!Function} */
    this.resolve = resolve;
    /** @type {!Function} */
    this.reject = reject;
  }
  /**
   * @param {?} e
   * @param {?} fn
   * @param {?} $
   * @return {undefined}
   */
  function callback(e, fn, $) {
    /** @type {boolean} */
    var n = false;
    try {
      e(function(responce) {
        if (!n) {
          /** @type {boolean} */
          n = true;
          fn(responce);
        }
      }, function(desc) {
        if (!n) {
          /** @type {boolean} */
          n = true;
          $(desc);
        }
      });
    } catch (htmlDoc) {
      if (n) {
        return;
      }
      /** @type {boolean} */
      n = true;
      $(htmlDoc);
    }
  }
  /**
   * @param {!Function} onSettled
   * @return {?}
   */
  Promise.prototype["catch"] = function(onSettled) {
    return this.then(null, onSettled);
  };
  /**
   * @param {!Function} value
   * @param {!Function} onRejected
   * @return {?}
   */
  Promise.prototype.then = function(value, onRejected) {
    var elem = this;
    return new Promise(function(resolve, reject) {
      handle.call(elem, new Handler(value, onRejected, resolve, reject));
    });
  };
  /**
   * @return {?}
   */
  Promise.all = function() {
    /** @type {!Array<?>} */
    var map = Array.prototype.slice.call(1 === arguments.length && Array.isArray(arguments[0]) ? arguments[0] : arguments);
    return new Promise(function(fulfill, reject) {
      /**
       * @param {!Object} key
       * @param {!Object} val
       * @return {?}
       */
      function cb(key, val) {
        try {
          if (val && ("object" == typeof val || "function" == typeof val)) {
            var then = val.then;
            if ("function" == typeof then) {
              return void then.call(val, function(body) {
                cb(key, body);
              }, reject);
            }
          }
          /** @type {!Object} */
          map[key] = val;
          if (0 === --start) {
            fulfill(map);
          }
        } catch (ABORTING) {
          reject(ABORTING);
        }
      }
      var j;
      /** @type {number} */
      var start = map.length;
      if (0 === map.length) {
        return fulfill([]);
      }
      /** @type {number} */
      j = 0;
      for (; j < map.length; j++) {
        cb(j, map[j]);
      }
    });
  };
  /**
   * @param {!Object} value
   * @return {?}
   */
  Promise.resolve = function(value) {
    return value && "object" == typeof value && value.constructor === Promise ? value : new Promise(function(resolve) {
      resolve(value);
    });
  };
  /**
   * @param {!Object} result
   * @return {?}
   */
  Promise.reject = function(result) {
    return new Promise(function(canCreateDiscussions, callback) {
      callback(result);
    });
  };
  /**
   * @param {!NodeList} values
   * @return {?}
   */
  Promise.race = function(values) {
    return new Promise(function(t, throwException) {
      /** @type {number} */
      var i = 0;
      var l = values.length;
      for (; i < l; i++) {
        values[i].then(t, throwException);
      }
    });
  };
  module.exports = window.Promise || Promise;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} e
   * @param {?} url
   * @return {?}
   */
  function render(e, url) {
    return new ReactElement(function(callback, reject) {
      /**
       * @return {undefined}
       */
      e.onload = function() {
        if (200 === this.status) {
          callback(this.responseText);
        } else {
          reject(this.statusText);
        }
      };
      /**
       * @return {undefined}
       */
      e.onerror = function() {
        reject();
      };
      e.send(url);
    });
  }
  var ReactElement = require(18);
  /** @type {function(!Object, ?): ?} */
  module.exports = render;
}, function(mixin, canCreateDiscussions) {
  mixin.exports = {
    GCQmVzdCBvZiBZb3VUdWJl : "icon popular",
    GCUGFpZCBDaGFubmVscw : "icon purchases",
    GCTXVzaWM : "icon music",
    GCQ29tZWR5 : "icon humor",
    GCRmlsbSAmIEVudGVydGFpbm1lbnQ : "icon entertainment",
    GCR2FtaW5n : "icon games",
    GCQmVhdXR5ICYgRmFzaGlvbg : "icon social",
    GCRnJvbSBUVg : "fa fa-youtube-play",
    GCQXV0b21vdGl2ZQ : "fa fa-car",
    GCQW5pbWF0aW9u : "fa fa-picture-o",
    GCVG9wIFlvdVR1YmUgQ29sbGVjdGlvbnM : "icon popular",
    GCVG9wIEJsb2dz : "icon social",
    GCU3BvcnRz : "icon sport",
    GCSG93LXRvICYgRElZ : "fa fa-wrench",
    GCVGVjaA : "icon hobbie",
    GCU2NpZW5jZSAmIEVkdWNhdGlvbg : "fa fa-book",
    GCQ29va2luZyAmIEhlYWx0aA : "fa fa-spoon",
    GCQ2F1c2VzICYgTm9uLXByb2ZpdHM : "fa fa-users",
    GCTmV3cyAmIFBvbGl0aWNz : "icon news",
    GCTGlmZXN0eWxl : "fa fa-leaf"
  };
}, function(mixin, canCreateDiscussions, $) {
  var panel;
  var tab;
  var i;
  var self = $(13);
  var $scope = $(1);
  var modal = $(22);
  /** @type {string} */
  var a = "pm";
  var Navigation = $(25);
  var m = new modal({
    $node : document.getElementById(a)
  });
  /** @type {null} */
  var url = null;
  m.addListener("keydown", function(event) {
    if (event.code === self.info) {
      panel.focus();
    } else {
      if (event.code === self.f3) {
        $scope.route($scope.pages.search);
      } else {
        if (event.code === self.back && url) {
          $scope.route(url);
          /** @type {boolean} */
          event.stop = true;
        }
      }
    }
  });
  m.once("show", function() {
    tab.content.tabs[tab.activeTab].activate();
  });
  m.addListener("show", function(options) {
    /** @type {null} */
    url = null;
    window.page = options.page;
    Navigation.updateView({
      SEARCH : {
        icon : "search",
        visible : true,
        text : gettext("Search")
      },
      MORE : {
        icon : "more",
        visible : false,
        text : ""
      },
      GUIDE : {
        icon : "info",
        visible : true,
        text : gettext("Guide")
      },
      BACK : {
        icon : "back",
        visible : true,
        text : gettext("Exit")
      }
    }, "pageMain");
    if (options.data && options.data.channel) {
      i = tab.activeTab;
      tab.content.tabs[tab.activeTab].hide();
      /** @type {number} */
      tab.activeTab = 1;
      if (!options.data.channel.noBack) {
        url = $scope.pages.search;
      }
      tab.content.tabs[tab.activeTab].activate(options.data.channel);
    } else {
      if (tab.content.tabs.length > 0) {
        if (!i) {
          /** @type {number} */
          i = 3;
        }
        tab.content.tabs[tab.activeTab].hide();
        tab.activeTab = i;
        tab.content.tabs[tab.activeTab].activate();
      }
    }
  });
  m.addListener("hide", function() {
    $(27).hide();
  });
  tab = $(28);
  m.add(panel = $(29));
  panel.addListener("show", function() {
    Navigation.updateView({
      SEARCH : {
        icon : "search",
        visible : false,
        text : gettext("Search")
      },
      GUIDE : {
        icon : "info",
        visible : true,
        text : gettext("Close guide")
      }
    }, "pageMain");
  });
  panel.addListener("hide", function() {
    Navigation.updateView({
      SEARCH : {
        icon : "search",
        visible : true,
        text : gettext("Search")
      },
      GUIDE : {
        icon : "info",
        visible : true,
        text : gettext("Guide")
      }
    }, "pageMain");
  });
  tab.content.tabs.push($(32));
  tab.content.tabs.push($(47));
  tab.content.tabs.push($(50));
  tab.content.tabs.push($(55));
  tab.content.tabs.forEach(function(e) {
    m.add(e);
  });
  if ($(17).token) {
    $(46).getMine().then(function(e) {
      window.pmUserInfo.data = {
        disabled : true
      };
      window.pmUserInfo.appendChild(document.createElement("div"));
      /** @type {string} */
      window.pmUserInfo.firstChild.style.backgroundImage = "url(" + e.icon + ")";
      window.pmUserInfo.firstChild.classList.add("userImage");
      window.pmUserInfo.appendChild(document.createElement("div"));
      window.pmUserInfo.children[1].innerHTML = e.title;
      window.pmUserInfo.children[1].classList.add("userName");
    })["catch"](function(canCreateDiscussions) {
    });
  } else {
    /** @type {string} */
    window.pmUserInfo.style.display = "none";
  }
  mixin.exports = m;
}, function(module, canCreateDiscussions, factory) {
  module.exports = factory(23);
  /** @type {string} */
  module.exports.prototype.name = "stb-component-page";
}, function(module, canCreateDiscussions, getVoxel) {
  /**
   * @param {number} event
   * @return {undefined}
   */
  function render(event) {
    event = event || {};
    /** @type {boolean} */
    this.active = false;
    /** @type {null} */
    this.activeComponent = null;
    b.call(this, event);
    this.active = this.$node.classList.contains("active");
    if (null === this.$node.parentNode) {
      document.body.appendChild(this.$node);
    }
    this.page = this;
  }
  var b = getVoxel(24);
  /** @type {!Object} */
  render.prototype = Object.create(b.prototype);
  /** @type {function(number): undefined} */
  render.prototype.constructor = render;
  /** @type {string} */
  render.prototype.name = "spa-component-page";
  /** @type {function(number): undefined} */
  module.exports = render;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  function show(data) {
    var i;
    var element = this;
    if (data = data || {}, this.visible = true, this.focusable = true, this.$node = null, this.$body = null, this.parent = null, this.children = [], this.propagate = !!data.propagate, NumericType.call(this), this.$node = data.$node || document.createElement("div"), this.$body = data.$body || this.$node, this.$node.className = this.name + " " + (data.className || ""), this.id = data.id || this.$node.id || "cid" + cid++, data.parent && data.parent.add(this), data.visible === false && this.hide(), data.focusable ===
    false && (this.focusable = false), this.defaultEvents) {
      data.events = data.events || {};
      for (i in this.defaultEvents) {
        data.events[i] = data.events[i] || this.defaultEvents[i];
      }
    }
    if (data.events) {
      Object.keys(data.events).forEach(function(eventName) {
        element.addListener(eventName, data.events[eventName]);
      });
    }
    if (data.children) {
      this.add.apply(this, data.children);
    }
    this.$node.addEventListener("click", function(e) {
      element.focus();
      if (element.events["click"]) {
        element.emit("click", e);
      }
      e.stopPropagation();
    });
  }
  var view = require(3);
  var NumericType = require(4);
  /** @type {number} */
  var cid = 0;
  /** @type {!Object} */
  show.prototype = Object.create(NumericType.prototype);
  /** @type {function(!Object): undefined} */
  show.prototype.constructor = show;
  /** @type {null} */
  show.prototype.defaultEvents = null;
  /**
   * @param {string} obj
   * @return {undefined}
   */
  show.prototype.add = function(obj) {
    var arg;
    /** @type {number} */
    arg = 0;
    for (; arg < arguments.length; arg++) {
      obj = arguments[arg];
      this.children.push(obj);
      obj.parent = this;
      if (obj.$node && null === obj.$node.parentNode) {
        this.$body.appendChild(obj.$node);
      }
      if (this.events["add"]) {
        this.emit("add", {
          item : obj
        });
      }
    }
  };
  /**
   * @return {undefined}
   */
  show.prototype.remove = function() {
    if (this.parent) {
      if (view.activePage.activeComponent === this) {
        this.blur();
        this.parent.focus();
      }
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
    this.children.forEach(function(inventoryService) {
      inventoryService.remove();
    });
    this.events = {};
    this.$node.parentNode.removeChild(this.$node);
    if (this.events["remove"]) {
      this.emit("remove");
    }
  };
  /**
   * @param {?} e
   * @return {?}
   */
  show.prototype.focus = function(e) {
    var state = view.activePage;
    var self = state.activeComponent;
    return !(!this.focusable || this === self) && (self && self.blur(), state.activeComponent = self = this, self.$node.classList.add("focus"), self.events["focus"] && self.emit("focus", e), true);
  };
  /**
   * @return {?}
   */
  show.prototype.blur = function() {
    var store = view.activePage;
    var remote = store.activeComponent;
    return this.$node.classList.remove("focus"), this === remote && (store.activeComponent = null, this.events["blur"] && this.emit("blur"), true);
  };
  /**
   * @param {?} e
   * @return {?}
   */
  show.prototype.show = function(e) {
    return !!this.visible || (this.$node.classList.remove("hidden"), this.visible = true, this.events["show"] && this.emit("show", e), true);
  };
  /**
   * @return {?}
   */
  show.prototype.hide = function() {
    return !this.visible || (this.$node.classList.add("hidden"), this.visible = false, this.events["hide"] && this.emit("hide"), true);
  };
  /** @type {function(!Object): undefined} */
  module.exports = show;
}, function(module, canCreateDiscussions, floor) {
  var i;
  var startYNew = floor(26);
  var self = new startYNew({
    $node : document.getElementById("widgetHintButtons"),
    visible : false
  });
  var articles = {
    BACK : document.getElementById("hintBack"),
    SEARCH : document.getElementById("hintSearch"),
    MORE : document.getElementById("hintMore"),
    GUIDE : document.getElementById("hintGuide")
  };
  for (i in articles) {
    articles[i].$icon = articles[i].appendChild(document.createElement("div"));
    articles[i].$label = articles[i].appendChild(document.createElement("div"));
    /** @type {string} */
    articles[i].$label.className = "hintText";
  }
  /**
   * @param {(Object|string)} t
   * @param {string} name
   * @return {undefined}
   */
  self.updateView = function(t, name) {
    var k;
    this.show();
    for (k in t) {
      if (t.hasOwnProperty(k)) {
        if (t[k].visible) {
          /** @type {string} */
          articles[k].$icon.className = "ico " + t[k].icon;
          /** @type {string} */
          articles[k].style.display = "";
          articles[k].$label.innerHTML = t[k].text;
        } else {
          /** @type {string} */
          articles[k].style.display = "none";
        }
      }
    }
    if (name) {
      /** @type {string} */
      self.$node.className = "component widget " + name;
    } else {
      /** @type {string} */
      self.$node.className = "component widget";
    }
  };
  module.exports = self;
}, function(module, canCreateDiscussions, NFA) {
  /**
   * @param {!Object} element
   * @return {undefined}
   */
  function Modal(element) {
    element = element || {};
    element.focusable = element.focusable || false;
    element.visible = element.visible || false;
    m.call(this, element);
  }
  var m = NFA(24);
  /** @type {!Object} */
  Modal.prototype = Object.create(m.prototype);
  /** @type {function(!Object): undefined} */
  Modal.prototype.constructor = Modal;
  /** @type {string} */
  Modal.prototype.name = "spa-component-widget";
  /** @type {function(!Object): undefined} */
  module.exports = Modal;
}, function(module, canCreateDiscussions, floor) {
  /**
   * @return {undefined}
   */
  function render() {
    if (c) {
      /** @type {string} */
      self.$node.style.backgroundImage = "url(" + sounds[i].src + ")";
      ++i;
      if (4 === i) {
        /** @type {number} */
        i = 0;
      }
    }
    /** @type {number} */
    resizeTimeout = setTimeout(render, 200);
  }
  var startYNew = floor(26);
  var self = new startYNew({
    $node : document.getElementById("loaderWidget"),
    visible : false
  });
  /** @type {number} */
  var resizeTimeout = -1;
  /** @type {number} */
  var i = 0;
  /** @type {boolean} */
  var c = false;
  /** @type {!Array} */
  var sounds = [];
  !function() {
    /** @type {number} */
    var e = 4;
    ["img/loader/1.png", "img/loader/2.png", "img/loader/3.png", "img/loader/4.png"].forEach(function(url) {
      /** @type {!Image} */
      var i = new Image;
      /** @type {string} */
      i.src = url;
      /**
       * @return {undefined}
       */
      i.onload = function() {
        --e;
        if (0 === e) {
          /** @type {boolean} */
          c = true;
        }
      };
      sounds.push(i);
    });
  }();
  /**
   * @param {?} e
   * @return {?}
   */
  self.show = function(e) {
    return !!this.visible || (this.$node.classList.remove("hidden"), this.visible = true, void 0 !== this.events["show"] && this.emit("show", e), resizeTimeout = setTimeout(render, 200), true);
  };
  /**
   * @return {?}
   */
  self.hide = function() {
    return i = 1, clearTimeout(resizeTimeout), !this.visible || (this.$node.classList.add("hidden"), this.visible = false, void 0 !== this.events["hide"] && this.emit("hide"), true);
  };
  module.exports = self;
}, function(blob, canCreateDiscussions, dselect) {
  var a = dselect(1);
  var data = {
    types : {
      CATEGORY_HEADER : 1,
      CATEGORY_ITEM : 2
    },
    content : {
      data : [],
      focusIndex : 1,
      tabs : []
    },
    activeTab : 3
  };
  data.content.data.push({
    disabled : false,
    onclick : function() {
      a.route(a.pages.search);
    },
    type : data.types.CATEGORY_ITEM,
    value : gettext("Search"),
    id : -2,
    className : "icon search"
  });
  data.content.data.push({
    disabled : false,
    tabIndex : 3,
    type : data.types.CATEGORY_ITEM,
    value : gettext("Main"),
    id : -2,
    className : "icon what-to-watch"
  });
  data.content.data.push({
    disabled : false,
    tabIndex : 2,
    type : data.types.CATEGORY_ITEM,
    value : gettext("Settings"),
    id : -2,
    className : "icon player-settings"
  });
  blob.exports = data;
}, function(module, canCreateDiscussions, $) {
  var inst;
  var result = $(13);
  var link = $(1);
  var ctor = $(30);
  var self = $(28);
  inst = new ctor({
    $node : window.pmListMainMenu,
    $body : window.pmListMainMenuBody,
    className : "hidden",
    data : self.content.data,
    size : link.data.metrics.mainMenuSize,
    focusIndex : self.content.focusIndex,
    render : function(node, options) {
      if (!node.ready) {
        /** @type {!Element} */
        node.$icon = document.createElement("span");
        node.appendChild(node.$icon);
        /** @type {!Element} */
        node.$label = document.createElement("span");
        node.appendChild(node.$label);
        /** @type {boolean} */
        node.ready = true;
      }
      if (options.type === self.types.CATEGORY_ITEM) {
        node.$icon.className = options.className || "image";
        /** @type {string} */
        node.$icon.style.backgroundImage = options.icon ? "url(" + options.icon + ")" : "none";
        /** @type {string} */
        node.$label.className = "itemLabel";
        node.$label.innerHTML = options.value;
      } else {
        if (options.type === self.types.CATEGORY_HEADER) {
          /** @type {string} */
          node.$icon.className = "";
          /** @type {string} */
          node.$label.className = "categorylabel";
          node.$label.innerHTML = options.value;
        }
      }
    },
    visible : false,
    events : {
      keydown : function(event) {
        switch(event.code) {
          case result.back:
          case result.right:
          case result.info:
            this.hide();
            self.content.tabs[self.activeTab].activate();
            /** @type {boolean} */
            event.stop = true;
            break;
          case result.up:
          case result.down:
          case result.pageUp:
          case result.pageDown:
          case result.home:
          case result.end:
            this.move(event.code);
            break;
          case result.ok:
            this.emit("click:item", {
              $item : this.$focusItem,
              event : event
            });
        }
      },
      "click:item" : function(context) {
        this.hide();
        if ("function" == typeof context.$item.data.onclick) {
          self.content.tabs[self.activeTab].activate(context.$item.data);
          context.$item.data.onclick();
        } else {
          self.content.tabs[self.activeTab].hide();
          self.activeTab = context.$item.data.tabIndex;
          self.content.tabs[self.activeTab].activate(context.$item.data);
        }
      },
      focus : function() {
        this.show();
      }
    }
  });
  /**
   * @param {string} key
   * @return {undefined}
   */
  inst.move = function(key) {
    /** @type {null} */
    var selectedItem = null;
    /** @type {null} */
    var cell = null;
    if (key === result.up && this.$focusItem && this.$focusItem.index > 0) {
      if (this.$focusItem === this.$body.firstChild) {
        /** @type {number} */
        cell = this.viewIndex - 1;
      } else {
        selectedItem = this.$focusItem.previousSibling;
      }
    }
    if (key === result.down && this.$focusItem && this.$focusItem.index < this.data.length - 1) {
      if (this.$focusItem === this.$body.lastChild) {
        cell = this.viewIndex + 1;
      } else {
        selectedItem = this.$focusItem.nextSibling;
      }
    }
    if (key === result.pageUp) {
      /** @type {number} */
      cell = this.viewIndex < this.size ? 0 : this.viewIndex - this.size + 1;
      selectedItem = this.$body.firstChild;
    }
    if (key === result.pageDown) {
      if (this.data.length > this.size) {
        /** @type {number} */
        cell = this.viewIndex > this.data.length - 2 * this.size ? this.data.length - this.size : this.viewIndex + this.size - 1;
        selectedItem = this.$body.lastChild;
      } else {
        selectedItem = this.$body.children[this.data.length - 1];
      }
    }
    if (key === result.home) {
      /** @type {number} */
      cell = 0;
      selectedItem = this.$body.firstChild;
    }
    if (key === result.end) {
      if (this.data.length > this.size) {
        /** @type {number} */
        cell = this.data.length - this.size;
        selectedItem = this.$body.lastChild;
      } else {
        selectedItem = this.$body.children[this.data.length - 1];
      }
    }
    if (null !== cell) {
      this.renderView(cell);
    }
    if (null !== selectedItem) {
      this.focusItem(selectedItem);
    }
    if (this.$focusItem.data.disabled) {
      if (this.$focusItem.index > 0) {
        this.move(key);
      } else {
        if (key === result.up) {
          this.move(result.down);
        }
      }
    }
  };
  module.exports = inst;
}, function(context, canCreateDiscussions, f) {
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  function init(event) {
    event = event || {};
    /** @type {null} */
    this.$focusItem = null;
    /** @type {null} */
    this.viewIndex = null;
    /** @type {!Array} */
    this.data = [];
    this.type = this.TYPE_VERTICAL;
    /** @type {number} */
    this.size = 5;
    /** @type {boolean} */
    this.cycle = false;
    /** @type {null} */
    this.scroll = null;
    if (event.type) {
      this.type = event.type;
    }
    /** @type {null} */
    this.provider = null;
    if (this.type === this.TYPE_HORIZONTAL) {
      event.className += " horizontal";
    }
    message.call(this, event);
    this.init(event);
  }
  /**
   * @param {!Array} labels
   * @return {?}
   */
  function get(labels) {
    var i;
    var returnValue;
    /** @type {number} */
    i = 0;
    for (; i < labels.length; i++) {
      returnValue = labels[i];
      if ("object" != typeof returnValue) {
        returnValue = labels[i] = {
          value : labels[i]
        };
      }
    }
    return labels;
  }
  var message = f(31);
  var k = f(13);
  /** @type {!Object} */
  init.prototype = Object.create(message.prototype);
  /** @type {function(!Object): undefined} */
  init.prototype.constructor = init;
  /** @type {string} */
  init.prototype.name = "mag-component-list";
  /** @type {number} */
  init.prototype.TYPE_VERTICAL = 1;
  /** @type {number} */
  init.prototype.TYPE_HORIZONTAL = 2;
  /**
   * @param {!Object} data
   * @param {!Object} target
   * @return {undefined}
   */
  init.prototype.renderItemDefault = function(data, target) {
    data.innerText = target.value;
  };
  /** @type {function(!Object, !Object): undefined} */
  init.prototype.renderItem = init.prototype.renderItemDefault;
  init.prototype.defaultEvents = {
    mousewheel : function(event) {
      if (this.type === this.TYPE_VERTICAL && event.wheelDeltaY) {
        this.move(event.wheelDeltaY > 0 ? k.up : k.down);
      }
      if (this.type === this.TYPE_HORIZONTAL && event.wheelDeltaX) {
        this.move(event.wheelDeltaX > 0 ? k.left : k.right);
      }
    },
    keydown : function(event) {
      switch(event.code) {
        case k.up:
        case k.down:
        case k.right:
        case k.left:
        case k.pageUp:
        case k.pageDown:
        case k.home:
        case k.end:
          this.move(event.code);
          break;
        case k.enter:
          if (this.events["click:item"] && this.$focusItem) {
            this.emit("click:item", {
              $item : this.$focusItem,
              event : event
            });
          }
      }
    }
  };
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  init.prototype.init = function(options) {
    var data;
    var index;
    var self = this;
    var value = this.$body.children.length;
    /**
     * @param {string} event
     * @return {undefined}
     */
    var update = function(event) {
      if (this.data) {
        self.focusItem(this);
        if (self.events["click:item"]) {
          self.emit("click:item", {
            $item : this,
            event : event
          });
        }
      }
    };
    if (void 0 !== options.cycle && (this.cycle = options.cycle), options.scroll && (this.scroll = options.scroll), options.provider && (this.provider = options.provider), options.render && (this.renderItem = options.render), options.size && (this.size = options.size), options.events && Object.keys(options.events).forEach(function(eventName) {
      /** @type {null} */
      self.events[eventName] = null;
      self.addListener(eventName, options.events[eventName]);
    }), this.size !== value) {
      if (value > 0) {
        /** @type {null} */
        this.$body.innerText = null;
      }
      /** @type {number} */
      index = 0;
      for (; index < this.size; index++) {
        /** @type {!Element} */
        data = document.createElement("div");
        /** @type {number} */
        data.index = index;
        /** @type {string} */
        data.className = "item";
        data.addEventListener("click", update);
        this.$body.appendChild(data);
      }
    }
    if (this.provider) {
      this.provider.get(null, function(imageInfoItem, serializedData) {
        if (imageInfoItem) {
          if (self.events["data:error"]) {
            self.emit("data:error", imageInfoItem);
          }
        } else {
          if (serializedData) {
            /** @type {!Object} */
            options.data = serializedData;
            self.setData(options);
            if (self.scroll) {
              self.scroll.init({
                realSize : self.provider.maxCount,
                viewSize : self.provider.size,
                value : self.provider.head + self.provider.pos
              });
            }
          }
          if (self.events["data:get"]) {
            self.emit("data:get");
          }
        }
      });
    } else {
      if (options.data) {
        this.setData(options);
      }
    }
  };
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  init.prototype.setData = function(data) {
    if (data.data) {
      this.data = get(data.data);
    }
    /** @type {null} */
    this.viewIndex = null;
    if (this.$focusItem) {
      this.blurItem(this.$focusItem);
    }
    if (this.scroll) {
      if (this.provider) {
        if (this.scroll.realSize !== this.provider.maxCount) {
          this.scroll.init({
            realSize : this.provider.maxCount,
            viewSize : this.provider.size,
            value : this.provider.head + this.provider.pos
          });
        }
      } else {
        this.scroll.init({
          realSize : this.data.length,
          viewSize : this.size,
          value : data.viewIndex || 0
        });
      }
    }
    if (void 0 !== data.focusIndex && this.data.length) {
      this.focusIndex(data.focusIndex);
    } else {
      this.renderView(data.viewIndex || 0);
    }
  };
  /**
   * @param {number} data
   * @return {?}
   */
  init.prototype.renderView = function(data) {
    var item;
    var i;
    var event;
    var prevIndex;
    var RoxyFilemanConf;
    if (this.viewIndex !== data) {
      prevIndex = this.viewIndex;
      this.viewIndex = RoxyFilemanConf = data;
      /** @type {number} */
      i = 0;
      for (; i < this.size; i++) {
        item = this.$body.children[i];
        event = this.data[data];
        if (event) {
          item.data = event;
          /** @type {number} */
          item.index = data;
          this.renderItem(item, event);
          if (event.mark) {
            item.classList.add("mark");
          } else {
            item.classList.remove("mark");
          }
        } else {
          item.data = item.index = void 0;
          /** @type {string} */
          item.innerHTML = "&nbsp;";
          /** @type {boolean} */
          item.ready = false;
        }
        data++;
      }
      return this.events["move:view"] && this.emit("move:view", {
        prevIndex : prevIndex,
        currIndex : RoxyFilemanConf
      }), this.events["select:item"] && this.emit("select:item", {
        $item : item
      }), this.scroll && this.scroll.scrollTo(this.provider ? this.provider.head + this.provider.pos : this.viewIndex), true;
    }
    return false;
  };
  /**
   * @param {string} type
   * @return {?}
   */
  init.prototype.move = function(type) {
    var view = this;
    /** @type {boolean} */
    var isStatement = false;
    if (this.data.length) {
      switch(type) {
        case k.left:
          if (this.type !== this.TYPE_HORIZONTAL) {
            break;
          }
          /** @type {boolean} */
          isStatement = true;
        case k.up:
          if (isStatement || this.type === this.TYPE_VERTICAL) {
            if (this.$focusItem && this.$focusItem.index > 0) {
              if (this.$focusItem === this.$body.firstChild) {
                this.renderView(this.viewIndex - 1);
              } else {
                this.focusItem(this.$focusItem.previousSibling);
              }
            } else {
              if (this.provider) {
                this.provider.get(type, function(e, instancesTypes, n) {
                  if (e) {
                    if (view.events["data:error"]) {
                      view.emit("data:error", e);
                    }
                  } else {
                    if (instancesTypes) {
                      view.setData({
                        data : instancesTypes,
                        focusIndex : n || 0 === n ? n : view.$focusItem.index
                      });
                    }
                  }
                });
              } else {
                if (this.cycle) {
                  this.move(k.end);
                }
                if (this.events["overflow"]) {
                  this.emit("overflow", {
                    direction : type,
                    cycle : this.cycle
                  });
                }
              }
            }
          }
          break;
        case k.right:
          if (this.type !== this.TYPE_HORIZONTAL) {
            break;
          }
          /** @type {boolean} */
          isStatement = true;
        case k.down:
          if (isStatement || this.type === this.TYPE_VERTICAL) {
            if (this.$focusItem && this.$focusItem.index < this.data.length - 1) {
              if (this.$focusItem === this.$body.lastChild) {
                this.renderView(this.viewIndex + 1);
              } else {
                this.focusItem(this.$focusItem.nextSibling);
              }
            } else {
              if (this.provider) {
                this.provider.get(type, function(e, instancesTypes, n) {
                  if (e) {
                    if (view.events["data:error"]) {
                      view.emit("data:error", e);
                    }
                  } else {
                    if (instancesTypes) {
                      view.setData({
                        data : instancesTypes,
                        focusIndex : n || 0 === n ? n : view.$focusItem.index
                      });
                    }
                  }
                });
              } else {
                if (this.cycle) {
                  this.move(k.home);
                }
                if (this.events["overflow"]) {
                  this.emit("overflow", {
                    direction : type,
                    cycle : this.cycle
                  });
                }
              }
            }
          }
          break;
        case k.pageUp:
          if (this.provider) {
            return void this.provider.get(type, function(e, instancesTypes, n) {
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else {
                if (instancesTypes) {
                  view.setData({
                    data : instancesTypes,
                    focusIndex : n ? n : 0
                  });
                }
              }
            });
          }
          if (this.viewIndex < this.size) {
            this.renderView(0);
          } else {
            this.renderView(this.viewIndex - this.size + 1);
          }
          this.focusItem(this.$body.firstChild);
          break;
        case k.pageDown:
          if (this.provider) {
            this.provider.get(type, function(e, a, n) {
              var k;
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else {
                if (a) {
                  k = n || 0 === n ? n : a.length < view.size ? a.length - 1 : view.size - 1;
                  view.setData({
                    data : a,
                    focusIndex : k
                  });
                }
              }
            });
            break;
          }
          if (this.data.length > this.size) {
            if (this.viewIndex > this.data.length - 2 * this.size) {
              this.renderView(this.data.length - this.size);
            } else {
              this.renderView(this.viewIndex + this.size - 1);
            }
            this.focusItem(this.$body.lastChild);
          } else {
            this.focusItem(this.$body.children[this.data.length - 1]);
          }
          break;
        case k.home:
          if (this.provider) {
            this.provider.get(type, function(e, instancesTypes, n) {
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else {
                if (instancesTypes) {
                  view.setData({
                    data : instancesTypes,
                    focusIndex : n ? n : 0
                  });
                }
              }
            });
            break;
          }
          this.renderView(0);
          this.focusItem(this.$body.firstChild);
          break;
        case k.end:
          if (this.provider) {
            this.provider.get(type, function(e, a, n) {
              var k;
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else {
                if (a) {
                  k = n || 0 === n ? n : a.length < view.size ? a.length - 1 : view.size - 1;
                  view.setData({
                    data : a,
                    focusIndex : k
                  });
                }
              }
            });
            break;
          }
          if (this.data.length > this.size) {
            this.renderView(this.data.length - this.size);
            this.focusItem(this.$body.lastChild);
          } else {
            this.focusItem(this.$body.children[this.data.length - 1]);
          }
      }
    }
  };
  /**
   * @param {!Object} item
   * @return {?}
   */
  init.prototype.focusItem = function(item) {
    var x = this.$focusItem;
    return !(!item || x === item) && (null !== x && (x.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
      $item : x
    })), this.$focusItem = item, this.$focusItem.data = this.data[this.$focusItem.index], item.classList.add("focus"), this.events["focus:item"] && this.emit("focus:item", {
      $prev : x,
      $curr : item
    }), this.events["select:item"] && this.emit("select:item", {
      $item : item
    }), true);
  };
  /**
   * @param {!Object} $item
   * @return {?}
   */
  init.prototype.blurItem = function($item) {
    return !!$item && ($item === this.$focusItem && (this.$focusItem = null), $item.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
      $item : $item
    }), true);
  };
  /**
   * @param {number} i
   * @return {undefined}
   */
  init.prototype.focusIndex = function(i) {
    var start = this.viewIndex || 0;
    if (i >= start + this.size) {
      i = i < this.data.length - 1 ? i : this.data.length - 1;
      this.renderView(i - this.size + 1);
      this.focusItem(this.$body.lastChild);
    } else {
      if (i < start) {
        i = i > 0 ? i : 0;
        this.renderView(i);
        this.focusItem(this.$body.firstChild);
      } else {
        if (null === this.viewIndex) {
          this.renderView(0);
        }
        this.focusItem(this.$body.children[i - start]);
      }
    }
  };
  /**
   * @param {!Object} index
   * @param {number} options
   * @return {undefined}
   */
  init.prototype.markItem = function(index, options) {
    if (options) {
      index.classList.add("mark");
    } else {
      index.classList.remove("mark");
    }
    /** @type {number} */
    index.data.mark = options;
  };
  /** @type {function(!Object): undefined} */
  context.exports = init;
}, function(module, canCreateDiscussions, factory) {
  module.exports = factory(24);
}, function(module, canCreateDiscussions, $) {
  /**
   * @param {number} i
   * @param {boolean} t
   * @return {?}
   */
  function render(i, t) {
    /** @type {number} */
    var key = 1 ^ i;
    if (!lowest_high_x) {
      if (t) {
        /** @type {boolean} */
        lowest_high_x = true;
        model.getPage({
          page : page - 1,
          count : 1
        }).then(function(charge) {
          --page;
          --current;
          nodes[key].model.init({
            channel : charge[0]
          });
          /** @type {number} */
          k = key;
          /** @type {number} */
          j = i;
          /** @type {number} */
          type = key;
        }, function(canCreateDiscussions) {
        });
      } else {
        if (0 === nodes[j].data.length) {
          return void nodes[i].emit("view:ready");
        }
        /** @type {boolean} */
        lowest_high_x = true;
        model.getPage({
          page : current + 1,
          count : 1
        }).then(function(charge) {
          ++page;
          ++current;
          nodes[i].model.init({
            channel : charge[0]
          });
          /** @type {number} */
          k = key;
          /** @type {number} */
          j = i;
          /** @type {number} */
          type = key;
        }, function(size) {
          /** @type {boolean} */
          lowest_high_x = false;
          if ("overflow" === size) {
            ++page;
            ++current;
            nodes[i].model.init({
              channel : {
                id : "!",
                title : ""
              }
            });
            /** @type {!Array} */
            nodes[i].data = [];
            /** @type {null} */
            nodes[i].viewIndex = null;
            nodes[i].renderView(0);
            nodes[i].focusIndex(0);
            /** @type {string} */
            nodes[i].$title.innerHTML = "";
            /** @type {number} */
            k = key;
            /** @type {number} */
            j = i;
            /** @type {number} */
            type = key;
            /** @type {number} */
            nodes[k].$node.style.top = _from_key;
            nodes[j].$node.style.top = pos;
            nodes[type].focus();
          }
        });
      }
    }
  }
  var options = $(13);
  var item = $(1);
  var Menu = $(33);
  var $realtime = $(30);
  var RootView = $(35);
  var that = $(36);
  var $Element = $(37);
  var Model = $(38);
  var model = $(46);
  var fakeInputElement = $(29);
  /** @type {!Array} */
  var nodes = [];
  /** @type {(Element|null)} */
  var title = document.getElementById("pm");
  /** @type {number} */
  var type = 0;
  var self = new Menu({
    $node : document.getElementById("pmTabCategoryContent"),
    className : "tab hidden",
    visible : false,
    events : {
      focus : function() {
        nodes[type].focus();
      },
      show : function() {
        /** @type {string} */
        title.style.backgroundImage = "";
      }
    }
  });
  var view = new RootView({
    $node : document.getElementById("pmCategorySearch"),
    $body : document.getElementById("pmCategorySearchBody"),
    className : "component input tabInputSearch",
    events : {
      focus : function() {
        this.setValue("");
        item.route(item.pages.search);
      }
    }
  });
  var searchContactPanel = $(27);
  /** @type {number} */
  var pos = 0;
  /** @type {number} */
  var _from_key = 0;
  /** @type {number} */
  var k = 0;
  /** @type {number} */
  var j = 1;
  /** @type {number} */
  var page = 0;
  /** @type {number} */
  var current = 1;
  /** @type {number} */
  var _takingTooLongTimeout = -1;
  /** @type {boolean} */
  var lowest_high_x = true;
  model.addListener("category:changed", function() {
    clearTimeout(_takingTooLongTimeout);
    /** @type {number} */
    _takingTooLongTimeout = setTimeout(function() {
      searchContactPanel.hide();
    }, 1e4);
    if (0 === nodes.length) {
      nodes.push(new $Element({
        $node : document.getElementById("pmListCategoryVideos0Node"),
        $body : document.getElementById("pmListCategoryVideos0Body"),
        $title : document.getElementById("pmCategoryChannelTitle0"),
        className : "listMovie0Node",
        model : new Model({
          type : "video"
        }),
        size : 5,
        viewIndex : 0,
        focusIndex : 0,
        type : $realtime.prototype.TYPE_HORIZONTAL,
        events : {
          overflow : function(data) {
            if (data.direction === options.left) {
              fakeInputElement.focus();
            }
          },
          "view:ready" : function() {
            /** @type {number} */
            nodes[k].$node.style.top = _from_key;
            if (nodes[j]) {
              nodes[j].$node.style.top = pos;
            }
            this.$title.innerHTML = this.model.channel.title;
            this.show();
            searchContactPanel.hide();
            clearTimeout(_takingTooLongTimeout);
            nodes[type].focus();
            /** @type {boolean} */
            lowest_high_x = false;
          },
          "view:error" : function(undefined) {
            /** @type {boolean} */
            lowest_high_x = false;
            if ("empty" === undefined) {
              /** @type {!Array} */
              this.data = [{
                id : "",
                value : "",
                publishedAt : "",
                icon : "img/no.image.png",
                duration : "",
                title : gettext("No videos"),
                channelTitle : "",
                viewCount : "",
                locale : {
                  publishedAt : "",
                  viewCount : "",
                  channelTitle : ""
                }
              }];
              /** @type {null} */
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[type];
              /** @type {number} */
              nodes[k].$node.style.top = _from_key;
              if (nodes[j]) {
                nodes[j].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              this.show();
              searchContactPanel.hide();
              clearTimeout(_takingTooLongTimeout);
              nodes[type].focus();
            } else {
              if (0 === page) {
                render(0, false);
              }
            }
          },
          "click:item" : function(context) {
            if (context.$item.data.id) {
              that.setContent({
                channel : this.model.channel,
                video : context.$item.data,
                playlist : this.data,
                position : context.$item.index
              });
            }
          }
        }
      }));
      nodes.push(new $Element({
        $node : document.getElementById("pmListCategoryVideos1Node"),
        $body : document.getElementById("pmListCategoryVideos1Body"),
        $title : document.getElementById("pmCategoryChannelTitle1"),
        className : "listMovie1Node",
        model : new Model({
          type : "video"
        }),
        size : 5,
        viewIndex : 0,
        focusIndex : 0,
        type : $realtime.prototype.TYPE_HORIZONTAL,
        events : {
          overflow : function(data) {
            if (data.direction === options.left) {
              fakeInputElement.focus();
              self.focusEntry = this;
            }
          },
          "view:ready" : function() {
            /** @type {number} */
            nodes[k].$node.style.top = _from_key;
            nodes[j].$node.style.top = pos;
            this.$title.innerHTML = this.model.channel.title;
            this.show();
            searchContactPanel.hide();
            clearTimeout(_takingTooLongTimeout);
            nodes[type].focus();
            /** @type {boolean} */
            lowest_high_x = false;
          },
          "view:error" : function(undefined) {
            /** @type {boolean} */
            lowest_high_x = false;
            if ("empty" === undefined) {
              /** @type {!Array} */
              this.data = [{
                id : "",
                value : "",
                publishedAt : "",
                icon : "img/no.image.png",
                duration : "",
                title : gettext("No videos"),
                channelTitle : "",
                viewCount : "",
                locale : {
                  publishedAt : "",
                  viewCount : "",
                  channelTitle : ""
                }
              }];
              /** @type {null} */
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[type];
              /** @type {number} */
              nodes[k].$node.style.top = _from_key;
              if (nodes[j]) {
                nodes[j].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              this.show();
              searchContactPanel.hide();
              clearTimeout(_takingTooLongTimeout);
              nodes[type].focus();
            }
          },
          "click:item" : function(context) {
            if (context.$item.data.id) {
              that.setContent({
                channel : this.model.channel,
                video : context.$item.data,
                playlist : this.data,
                position : context.$item.index
              });
            }
          }
        }
      }));
      self.add(nodes[0]);
      self.add(nodes[1]);
      nodes[0].focus();
      nodes[0].addListener("keydown", function(data) {
        if (data.code === options.down) {
          render(0, false);
        } else {
          if (data.code === options.up) {
            if (page > 0) {
              render(0, true);
            } else {
              view.focus();
            }
          } else {
            if (data.code === options.playPause) {
              that.setContent({
                channel : this.model.channel,
                video : this.$focusItem.data,
                playlist : this.data,
                position : this.$focusItem.index
              });
            }
          }
        }
      });
      nodes[1].addListener("keydown", function(data) {
        if (data.code === options.down) {
          render(1, false);
        } else {
          if (data.code === options.up) {
            if (page > 0) {
              render(1, true);
            } else {
              view.focus();
            }
          } else {
            if (data.code === options.playPause) {
              that.setContent({
                channel : this.model.channel,
                video : this.$focusItem.data,
                playlist : this.data,
                position : this.$focusItem.index
              });
            }
          }
        }
      });
      pos = window.getComputedStyle(nodes[1].$node).getPropertyValue("top");
    }
    model.getPage({
      page : 0,
      count : 1
    }).then(function(charge) {
      /** @type {number} */
      page = 0;
      /** @type {number} */
      k = 0;
      /** @type {number} */
      j = 1;
      /** @type {number} */
      current = 1;
      /** @type {number} */
      type = 0;
      nodes[k].model.filter({
        channel : charge[0]
      });
      model.getPage({
        page : 1,
        count : 1
      }).then(function(charge) {
        nodes[j].model.filter({
          channel : charge[0]
        });
        nodes[type].focus();
      });
    })["catch"](function(canCreateDiscussions) {
    });
  });
  /**
   * @param {string} parent
   * @return {undefined}
   */
  self.activate = function(parent) {
    this.show();
    if (model.setActiveCategory(parent)) {
      searchContactPanel.show();
    } else {
      nodes[type].focus();
    }
  };
  self.add(view);
  module.exports = self;
}, function(module, canCreateDiscussions, factory) {
  module.exports = factory(34);
  /** @type {string} */
  module.exports.prototype.name = "stb-component-panel";
}, function(module, canCreateDiscussions, NFA) {
  /**
   * @param {number} element
   * @return {undefined}
   */
  function Modal(element) {
    element = element || {};
    element.focusable = element.focusable || false;
    m.call(this, element);
  }
  var m = NFA(24);
  /** @type {!Object} */
  Modal.prototype = Object.create(m.prototype);
  /** @type {function(number): undefined} */
  Modal.prototype.constructor = Modal;
  /** @type {string} */
  Modal.prototype.name = "spa-component-panel";
  /** @type {function(number): undefined} */
  module.exports = Modal;
}, function(context, canCreateDiscussions, getVoxel) {
  /**
   * @param {!Object} config
   * @return {undefined}
   */
  function init(config) {
    config = config || {};
    /** @type {string} */
    this.name = "component";
    /** @type {string} */
    this.value = "";
    this.type = this.TYPE_TEXT;
    /** @type {string} */
    config.className = "input " + (config.className || "");
    b.call(this, config);
    this.$line = this.$body.appendChild(document.createElement("div"));
    /** @type {string} */
    this.$line.className = "line";
    this.$caret = this.$line.appendChild(document.createElement("div"));
    /** @type {string} */
    this.$caret.className = "caret";
    this.$placeholder = this.$line.appendChild(document.createElement("div"));
    /** @type {string} */
    this.$placeholder.className = "placeholder";
    /** @type {number} */
    this.$caret.index = 0;
    this.init(config);
  }
  var b = getVoxel(31);
  var ret = getVoxel(13);
  /** @type {!Object} */
  init.prototype = Object.create(b.prototype);
  /** @type {function(!Object): undefined} */
  init.prototype.constructor = init;
  /** @type {number} */
  init.prototype.TYPE_TEXT = 0;
  /** @type {number} */
  init.prototype.TYPE_PASSWORD = 1;
  init.prototype.defaultEvents = {
    keypress : function(event) {
      this.addChar(String.fromCharCode(event.keyCode), this.$caret.index);
    },
    keydown : function(event) {
      switch(event.code) {
        case ret["delete"]:
          this.removeChar(this.$caret.index);
          break;
        case ret.back:
          this.removeChar(this.$caret.index - 1);
          break;
        case ret.left:
          this.setCaretPosition(this.$caret.index - 1);
          break;
        case ret.right:
          this.setCaretPosition(this.$caret.index + 1);
          break;
        case ret.end:
        case ret.down:
          this.setCaretPosition(this.value.length);
          break;
        case ret.home:
        case ret.up:
          this.setCaretPosition(0);
      }
    }
  };
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  init.prototype.init = function(options) {
    if (options.type) {
      this.type = options.type;
    }
    if (options.value) {
      this.setValue(options.value);
    }
    if (options.placeholder) {
      this.$placeholder.innerText = options.placeholder;
    }
    this.$line.dir = options.direction || "ltr";
  };
  /**
   * @param {string} text
   * @param {number} index
   * @return {undefined}
   */
  init.prototype.addChar = function(text, index) {
    /** @type {!Element} */
    var span = document.createElement("div");
    index = void 0 === index ? this.$caret.index : index;
    if (0 === this.value.length) {
      this.$line.removeChild(this.$placeholder);
    }
    /** @type {string} */
    span.className = "char";
    this.value = this.value.substring(0, index) + text + this.value.substring(index, this.value.length);
    ++this.$caret.index;
    if (this.type === this.TYPE_PASSWORD) {
      /** @type {string} */
      span.innerText = "*";
    } else {
      if (" " === text) {
        /** @type {string} */
        span.innerHTML = "&nbsp;";
      } else {
        /** @type {string} */
        span.innerText = text;
      }
    }
    if (index >= this.value.length) {
      this.$line.appendChild(span);
      this.$line.appendChild(this.$caret);
    } else {
      this.$line.insertBefore(this.$caret, this.$line.children[index]);
      this.$line.insertBefore(span, this.$caret);
    }
    if (this.events["input"]) {
      this.emit("input", {
        value : this.value
      });
    }
  };
  /**
   * @param {number} i
   * @return {undefined}
   */
  init.prototype.removeChar = function(i) {
    var oldValue = this.value;
    i = void 0 === i ? this.$caret.index - 1 : i;
    if (this.value.length > 0) {
      if (this.$caret.index === i && i < this.value.length) {
        this.$line.removeChild(this.$line.children[i + 1]);
      } else {
        if (this.$caret.index > i) {
          --this.$caret.index;
          this.$line.removeChild(this.$line.children[i]);
        }
      }
      this.value = this.value.substring(0, i) + this.value.substring(i + 1, this.value.length);
      if (this.events["input"] && oldValue !== this.value) {
        this.emit("input", {
          value : this.value
        });
      }
    }
    if (0 === this.value.length) {
      this.$line.appendChild(this.$placeholder);
    }
  };
  /**
   * @param {number} position
   * @return {undefined}
   */
  init.prototype.setCaretPosition = function(position) {
    if (position >= 0 && position <= this.value.length && this.$caret.index !== position) {
      this.$line.removeChild(this.$caret);
      if (position === this.value.length) {
        this.$line.appendChild(this.$caret);
      } else {
        this.$line.insertBefore(this.$caret, this.$line.children[position]);
      }
      /** @type {number} */
      this.$caret.index = position;
    }
  };
  /**
   * @param {string} v
   * @return {undefined}
   */
  init.prototype.setValue = function(v) {
    var span;
    var n;
    var l = this.value.length;
    var j = v.length;
    /** @type {number} */
    var i = 0;
    if (v !== this.value) {
      if (j > 0) {
        if (this.$placeholder.parentNode === this.$line && this.$line.removeChild(this.$placeholder), this.$line.removeChild(this.$caret), j !== l) {
          if (n = j - l, n > 0) {
            /** @type {number} */
            i = 0;
            for (; i < n; i++) {
              span = this.$line.appendChild(document.createElement("div"));
              /** @type {string} */
              span.className = "char";
            }
          } else {
            /** @type {number} */
            i = 0;
            for (; i > n; i--) {
              this.$line.removeChild(this.$line.lastChild);
            }
          }
        }
        /** @type {number} */
        i = 0;
        for (; i < j; i++) {
          span = this.$line.children[i];
          if (this.type === this.TYPE_PASSWORD) {
            /** @type {string} */
            span.innerHTML = "*";
          } else {
            if (" " === v[i]) {
              /** @type {string} */
              span.innerHTML = "&nbsp;";
            } else {
              span.innerText = v[i];
            }
          }
        }
        /** @type {string} */
        this.value = v;
        this.$caret.index = j;
        this.$line.appendChild(this.$caret);
      } else {
        /** @type {string} */
        this.value = "";
        /** @type {string} */
        this.$line.innerText = "";
        this.$line.appendChild(this.$caret);
        this.$line.appendChild(this.$placeholder);
      }
      if (this.events["input"]) {
        this.emit("input", {
          value : this.value
        });
      }
    }
  };
  /** @type {function(!Object): undefined} */
  context.exports = init;
}, function(mixin, canCreateDiscussions, $) {
  var notificationSiteId;
  var mockFormAttributeDataResponse;
  var event = $(1);
  /** @type {boolean} */
  var o = false;
  var searchContactPanel = $(27);
  notificationSiteId = event.urlParser;
  mockFormAttributeDataResponse = {
    intent : null,
    movie : {},
    channel : {},
    playlist : null,
    setContent : function(data) {
      /** @type {boolean} */
      o = true;
      if (!data.urlParseErrorCount) {
        /** @type {number} */
        data.urlParseErrorCount = 0;
      }
      if (void 0 !== data.channel) {
        this.channel = data.channel;
      } else {
        this.channel = {
          title : data.video.channelTitle,
          id : data.video.channelId
        };
      }
      this.playlist = data.playlist;
      this.listPosition = data.position;
      /** @type {null} */
      this.context = null;
      this.prepare(data);
    },
    prepare : function(e, data) {
      var $scope = this;
      return this.movie.title = e.video.title, "" === e.video.duration ? (window.core.notify({
        title : gettext("Live broadcasting is not supported"),
        icon : "alert",
        type : "warning",
        timeout : 5E3
      }), void(o = false)) : (this.movie.id = e.video.id, searchContactPanel.show(), void notificationSiteId.getInfo("https://www.youtube.com/watch?v=" + e.video.id, function(n, typeOptions) {
        var options;
        var i;
        var tableslen;
        if (searchContactPanel.hide(), n) {
          return "0:00" === e.video.duration ? window.core.notify({
            title : gettext("Live broadcasting is not supported"),
            icon : "alert",
            type : "warning",
            timeout : 5E3
          }) : window.core.notify({
            title : gettext("Video is not available"),
            icon : "alert",
            type : "warning",
            timeout : 5E3
          }), void(o = false);
        }
        if (0 === typeOptions.formats.length) {
          return "0:00" === e.video.duration ? window.core.notify({
            title : gettext("Live broadcasting is not supported"),
            icon : "alert",
            type : "warning",
            timeout : 5E3
          }) : window.core.notify({
            title : gettext("Video is not available"),
            icon : "alert",
            type : "warning",
            timeout : 5E3
          }), void(o = false);
        }
        /** @type {number} */
        i = 0;
        tableslen = typeOptions.formats.length;
        for (; i < tableslen; ++i) {
          typeOptions.formats[i].resolution = typeOptions.formats[i].resolution || "";
          if ("mp4" === typeOptions.formats[i].container && typeOptions.formats[i].audioBitrate) {
            if (options) {
              if (options.resolution < typeOptions.formats[i].resolution && typeOptions.formats[i].type.indexOf("video") !== -1) {
                options = typeOptions.formats[i];
              }
            } else {
              if (typeOptions.formats[i].type.indexOf("video") !== -1) {
                options = typeOptions.formats[i];
              }
            }
          }
        }
        if (!options) {
          options = typeOptions.formats[0];
        }
        $scope.movie.url = options.url;
        $scope.play(data);
      }));
    },
    play : function(element) {
      var start;
      var next;
      var params = this;
      if (params.playlist.length && params.playlist.length > params.listPosition) {
        /**
         * @return {undefined}
         */
        next = function() {
          params.next(element);
        };
      }
      if (params.playlist.length && params.listPosition > 0) {
        /**
         * @return {undefined}
         */
        start = function() {
          params.prev(element);
        };
      }
      this.intent = core.intent({
        action : "play",
        mime : "content/video",
        data : {
          title : params.movie.title,
          uri : params.movie.url,
          movie : params.movie.id,
          proxy : event.params.proxy
        },
        events : {
          end : function() {
            if (params.playlist.length) {
              params.next(element);
            } else {
              params.intent.close();
            }
          },
          error : function() {
            params.intent.close();
          },
          close : function() {
            /** @type {null} */
            element = null;
          },
          next : next,
          prev : start
        },
        context : element
      }, function(canCreateDiscussions, parent_dom_node) {
        /** @type {string} */
        element = parent_dom_node;
      });
    },
    next : function(element) {
      if (this.playlist.length > this.listPosition + 1) {
        this.listPosition++;
        this.prepare({
          video : this.playlist[this.listPosition]
        }, element);
      }
    },
    prev : function(element) {
      if (this.listPosition > 0) {
        this.listPosition--;
        this.prepare({
          video : this.playlist[this.listPosition]
        }, element);
      }
    }
  };
  mixin.exports = mockFormAttributeDataResponse;
}, function(exports, canCreateDiscussions, i) {
  /**
   * @param {!Object} props
   * @return {undefined}
   */
  function initialize(props) {
    var data = this;
    /** @type {null} */
    this.model = null;
    /** @type {number} */
    this.activePage = 0;
    /** @type {null} */
    this.$title = null;
    /** @type {boolean} */
    this.loading = false;
    /** @type {boolean} */
    props.visible = false;
    /** @type {!Array} */
    props.data = [{
      id : "",
      value : "",
      publishedAt : "",
      icon : "",
      duration : "",
      title : "",
      channelTitle : "",
      viewCount : "",
      locale : {
        publishedAt : "",
        viewCount : "",
        channelTitle : ""
      }
    }];
    d.call(data, props);
    this.$node.classList.add("movieList");
    this.$body.classList.add("movieListBody");
    if (void 0 !== props.$title) {
      this.$title = props.$title;
      this.$title.classList.add("movieListHeader");
    }
    if (void 0 !== props.model) {
      this.model = props.model;
      this.model.addListener("content:changed", function() {
        data.model.getPage({
          page : 0,
          count : 50
        }, function(canCreateDiscussions, darray) {
          /** @type {number} */
          data.activePage = 0;
          /** @type {!Object} */
          data.data = darray;
          /** @type {null} */
          data.viewIndex = null;
          data.renderView(0);
          data.focusIndex(0);
          data.emit("view:ready");
        });
      });
    }
  }
  var b = i(13);
  var d = i(30);
  /** @type {!Object} */
  initialize.prototype = Object.create(d.prototype);
  /** @type {function(!Object): undefined} */
  initialize.prototype.constructor = initialize;
  /**
   * @param {number} i
   * @return {?}
   */
  initialize.prototype.renderView = function(i) {
    var item;
    var j;
    var data;
    var prevIndex;
    var commonIndex;
    if (this.viewIndex !== i) {
      prevIndex = this.viewIndex;
      this.viewIndex = commonIndex = i;
      /** @type {number} */
      j = 0;
      for (; j < this.size; j++) {
        item = this.$body.children[j];
        if (this.data.length > i) {
          item.classList.remove("hidden");
          data = this.data[i];
          if (void 0 !== data) {
            item.data = data;
            /** @type {number} */
            item.index = i;
            this.renderItem(item, data);
            if (data.mark) {
              item.classList.add("mark");
            } else {
              item.classList.remove("mark");
            }
          } else {
            item.data = item.index = void 0;
            /** @type {string} */
            item.innerHTML = "";
            /** @type {boolean} */
            item.ready = false;
          }
          i++;
        } else {
          item.classList.add("hidden");
        }
      }
      return void 0 !== this.events["move:view"] && this.emit("move:view", {
        prevIndex : prevIndex,
        currIndex : commonIndex
      }), true;
    }
    return false;
  };
  /**
   * @param {!Object} node
   * @param {!Object} data
   * @return {undefined}
   */
  initialize.prototype.renderItem = function(node, data) {
    var body;
    var n;
    var s;
    if (data.duration.length > 10) {
      data.duration = data.duration.substring(0, 10);
    }
    if (node.ready) {
      /** @type {string} */
      node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
      node.$videoDuration.innerText = data.duration;
      node.$videoTitle.innerText = data.title;
      node.$videoAthour.innerText = data.locale.channelTitle;
      node.$viewCounter.innerText = data.locale.viewCount;
      node.$dateAdded.innerText = data.locale.publishedAt;
    } else {
      /** @type {!Element} */
      body = document.createElement("div");
      /** @type {string} */
      body.className = "container";
      node.appendChild(body);
      /** @type {!Element} */
      n = document.createElement("div");
      /** @type {string} */
      n.className = "tileTop";
      body.appendChild(n);
      /** @type {!Element} */
      s = document.createElement("div");
      /** @type {string} */
      s.className = "tileBottom";
      body.appendChild(s);
      /** @type {!Element} */
      node.$videoThumb = document.createElement("div");
      /** @type {string} */
      node.$videoThumb.className = "thumb";
      /** @type {string} */
      node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
      n.appendChild(node.$videoThumb);
      /** @type {!Element} */
      node.$videoDuration = document.createElement("div");
      /** @type {string} */
      node.$videoDuration.className = "duration";
      node.$videoDuration.innerText = data.duration;
      n.appendChild(node.$videoDuration);
      /** @type {!Element} */
      node.$videoTitle = document.createElement("div");
      /** @type {string} */
      node.$videoTitle.className = "title";
      node.$videoTitle.innerText = data.title;
      s.appendChild(node.$videoTitle);
      /** @type {!Element} */
      node.$videoAthour = document.createElement("div");
      /** @type {string} */
      node.$videoAthour.className = "uploader";
      if (data.channelTitle) {
        node.$videoAthour.innerText = data.locale.channelTitle;
      }
      s.appendChild(node.$videoAthour);
      /** @type {!Element} */
      node.$viewCounter = document.createElement("div");
      /** @type {string} */
      node.$viewCounter.className = "viewCount";
      if (data.viewCount) {
        node.$viewCounter.innerText = data.locale.viewCount;
      }
      s.appendChild(node.$viewCounter);
      /** @type {!Element} */
      node.$dateAdded = document.createElement("div");
      /** @type {string} */
      node.$dateAdded.className = "uploaded";
      node.$dateAdded.innerText = data.locale.publishedAt;
      s.appendChild(node.$dateAdded);
      /** @type {boolean} */
      node.ready = true;
    }
  };
  /**
   * @param {!Object} event
   * @return {undefined}
   */
  initialize.prototype.defaultEvents.keydown = function(event) {
    if (!this.loading && this.data) {
      switch(event.code) {
        case b.right:
          if (this.$focusItem.index < this.data.length - 1) {
            if (this.$focusItem.index > 0) {
              this.activePage++;
              this.renderView(this.activePage);
            } else {
              this.focusIndex(1);
            }
          }
          break;
        case b.left:
          if (this.activePage > 0) {
            this.activePage--;
            this.renderView(this.activePage);
          } else {
            this.move(event.code);
          }
          break;
        case b.ok:
          if (void 0 !== this.events["click:item"]) {
            this.emit("click:item", {
              $item : this.$focusItem,
              event : event
            });
          }
      }
    }
  };
  /** @type {function(!Object): undefined} */
  exports.exports = initialize;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} name
   * @return {undefined}
   */
  function Router(name) {
    this.pages = {};
    /** @type {string} */
    this.searchQuery = "";
    /** @type {string} */
    this.relatedToVideoId = "";
    /** @type {string} */
    this.channelId = "";
    /** @type {string} */
    this.order = "";
    /** @type {string} */
    this.type = "";
    NumericType.call(this);
    name = name || {};
    this.filter(name);
  }
  var isEvaluating;
  var err_msg;
  var source;
  var PromiseProxy = require(18);
  var FileTodoProvider = require(1);
  var request = require(17);
  var NumericType = require(39);
  /** @type {!Object} */
  Router.prototype = Object.create(NumericType.prototype);
  /** @type {function(!Object): undefined} */
  Router.prototype.constructor = Router;

  function createGetVideosListUrl (pageToken = null) {
    var key = 'AIzaSyDjh5DKSn06D1lqhiC6-Zyn1hDtnt6iMKU';
    var url = 'https://www.googleapis.com/youtube/v3/videos' +
      '?key=' + key +
      '&chart=mostPopular' +
      '&part=snippet';
    if(pageToken) {
      url += 'pageToken=' + pageToken;
    }
    return url;
  }

  /**
   * @param {!Object} params
   * @return {?}
   */
  Router.prototype.getPage = function(params) {
    var url;
    var self = this;
    return isEvaluating || (isEvaluating = require(42), source = require(45), err_msg = gettext("Author")), new PromiseProxy(function(applyComputed, parse) {
      if (params.channel = params.channel || self.channel, params.type = self.type, params.searchQuery = params.searchQuery || self.searchQuery, params.page = +params.page || 0, params.relatedToVideoId = params.relatedToVideoId || self.relatedToVideoId, url = "search?part=id&maxResults=" + (params.count || 6), params.page) {
        if (!self.pages[params.page]) {
          return void parse();
        }
        /** @type {string} */
        url = url + ("&pageToken=" + self.pages[params.page]);
      }
      if (params.channel && params.channel.id) {
        /** @type {string} */
        url = url + ("&channelId=" + params.channel.id);
      }
      if (self.order) {
        /** @type {string} */
        url = url + ("&order=" + self.order);
      }
      if (params.relatedToVideoId) {
        /** @type {string} */
        url = url + ("&type=video&relatedToVideoId=" + params.relatedToVideoId);
      } else {
        if (params.type) {
          /** @type {string} */
          url = url + "&type=video";
        }
      }
      if (params.searchQuery) {
        /** @type {string} */
        url = url + ("&q=" + encodeURIComponent(params.searchQuery));
      }
      if (FileTodoProvider.settings.safeSearch) {
        /** @type {string} */
        url = url + "&safeSearch=strict";
      }
      request.request("GET", url).then(function(data) {
        var i;
        /** @type {!Array} */
        var list = [];
        /** @type {number} */
        var tableslen = 0;
        var turned = {};
        var options = {};
        /** @type {string} */
        var keyToAdd = "";
        /** @type {string} */
        var postParam = "";
        /** @type {string} */
        var micropost = "";
        if (data = JSON.parse(data), data.nextPageToken && (self.pages[params.page + 1] = data.nextPageToken), data.prevPageToken && (self.pages[params.page - 1] = data.prevPageToken), data = data.items, 0 === data.length) {
          parse("empty");
        } else {
          tableslen = data.length;
          /** @type {number} */
          i = 0;
          for (; i < tableslen; ++i) {
            if ("youtube#video" === data[i].id.kind) {
              /** @type {string} */
              keyToAdd = keyToAdd + (data[i].id.videoId + ",");
            } else {
              if ("youtube#channel" === data[i].id.kind) {
                /** @type {string} */
                postParam = postParam + (data[i].id.channelId + ",");
                /** @type {number} */
                turned[i] = 1;
              } else {
                if ("youtube#playlist" === data[i].id.kind) {
                  /** @type {string} */
                  micropost = micropost + (data[i].id.playlistId + ",");
                  /** @type {number} */
                  options[i] = 1;
                }
              }
            }
          }
          PromiseProxy.all([self.getMovies(keyToAdd.substr(0, keyToAdd.length - 1)), self.getChannelsInfo(postParam.substr(0, postParam.length - 1)), self.getTotalInfoPlaylists({
            id : micropost.substr(0, micropost.length - 1),
            channel : false
          })]).then(function(policySet) {
            /** @type {number} */
            var end = +new Date;
            /** @type {number} */
            var index = 0;
            /** @type {number} */
            var j = 0;
            /** @type {number} */
            var id = 0;
            /** @type {number} */
            i = 0;
            for (; i < tableslen; ++i) {
              if (turned[i] && policySet[1][j]) {
                list.push({
                  value : 1,
                  id : policySet[1][j].id,
                  title : policySet[1][j].snippet.localized.title,
                  icon : policySet[1][j].snippet.thumbnails["high"].url,
                  type : "channel",
                  viewCount : policySet[1][j].statistics.viewCount,
                  commentCount : policySet[1][j].statistics.commentCount,
                  subscriberCount : policySet[1][j].statistics.subscriberCount,
                  hiddenSubscriberCount : policySet[1][j].statistics.hiddenSubscriberCount,
                  videoCount : policySet[1][j].statistics.videoCount,
                  locale : {
                    subscriberCount : policySet[1][j].statistics.subscriberCount + " " + ngettext("subscriber", "subscribers", +policySet[1][j].statistics.subscriberCount)
                  }
                });
                ++j;
              } else {
                if (options[i] && policySet[2][id]) {
                  list.push({
                    value : 1,
                    playlistId : policySet[2][id].id,
                    channel : {
                      title : policySet[2][id].snippet.channelTitle,
                      id : policySet[2][id].snippet.channelId
                    },
                    title : policySet[2][id].snippet.title,
                    icon : policySet[2][id].snippet.thumbnails["high"].url,
                    type : "playlist",
                    channelTitle : policySet[2][id].snippet.channelTitle,
                    viewCount : " ",
                    duration : " ",
                    publishedAt : policySet[2][id].snippet.publishedAt,
                    locale : {
                      publishedAt : source(policySet[2][id].snippet.publishedAt, end),
                      viewCount : " ",
                      channelTitle : policySet[2][id].snippet.channelTitle ? err_msg + ": " + policySet[2][id].snippet.channelTitle : " "
                    }
                  });
                  ++id;
                } else {
                  if (policySet[0][index]) {
                    list.push({
                      value : 1,
                      id : policySet[0][index].id,
                      channelTitle : policySet[0][index].snippet.channelTitle,
                      duration : request.normalizeVideoDuration(policySet[0][index].contentDetails.duration),
                      realDuration : policySet[0][index].contentDetails.duration,
                      viewCount : policySet[0][index].statistics.viewCount,
                      publishedAt : policySet[0][index].snippet.publishedAt,
                      dimension : policySet[0][index].contentDetails.dimension,
                      definition : policySet[0][index].contentDetails.definition,
                      title : policySet[0][index].snippet.localized.title,
                      icon : policySet[0][index].snippet.thumbnails["high"].url,
                      channelId : policySet[0][index].snippet.channelId,
                      type : "video",
                      locale : {
                        publishedAt : source(policySet[0][index].snippet.publishedAt, end),
                        viewCount : ngettext("view", "views", +policySet[0][index].statistics.viewCount) + " " + policySet[0][index].statistics.viewCount,
                        channelTitle : err_msg + ": " + policySet[0][index].snippet.channelTitle
                      }
                    });
                    ++index;
                  }
                }
              }
            }
            applyComputed(list);
          }, function(canCreateDiscussions) {
          })["catch"](function(canCreateDiscussions) {
          });
        }
      })["catch"](function(canCreateDiscussions) {
      });
    });
  };
  /**
   * @param {string} url
   * @return {?}
   */
  Router.prototype.getChannelsInfo = function(url) {
    return url ? request.request("GET", "channels?part=snippet,statistics&id=" + url).then(function(b) {
      return JSON.parse(b).items;
    }) : PromiseProxy.resolve([]);
  };
  /**
   * @param {!Object} params
   * @return {?}
   */
  Router.prototype.filter = function(params) {
    /** @type {boolean} */
    var t = false;
    return void 0 !== params.channel && this.init({
      channel : params.channel
    }), void 0 !== params.searchQuery && this.searchQuery !== params.searchQuery && (t = true, this.searchQuery = params.searchQuery), void 0 !== params.relatedToVideoId && this.relatedToVideoId !== params.relatedToVideoId && (t = true, this.relatedToVideoId = params.relatedToVideoId), void 0 !== params.order && this.order !== params.order && (t = true, this.order = params.order), void 0 !== params.type && this.type !== params.type && (t = true, this.type = params.type), !!t && (this.pages = {},
      this.emit("content:changed", params), true);
  };
  /** @type {function(!Object): undefined} */
  module.exports = Router;
}, function(context, canCreateDiscussions, parse) {
  /**
   * @param {!Object} item
   * @return {undefined}
   */
  function init(item) {
    this.pages = {};
    /** @type {null} */
    this.channel = null;
    handler.call(this);
    item = item || {};
    if (void 0 !== item.events) {
      this.addListeners(item.events);
    }
    this.init(item);
  }
  var event;
  var err_msg;
  var h = parse(18);
  var handler = parse(40);
  var proxy = parse(17);
  /** @type {!Object} */
  init.prototype = Object.create(handler.prototype);
  /** @type {function(!Object): undefined} */
  init.prototype.constructor = init;
  /**
   * @param {!Object} config
   * @return {?}
   */
  init.prototype.getPage = function(config) {
    var self = this;
    return err_msg || (event = parse(45), err_msg = gettext("Author")), config.channel = config.channel || this.channel, config.count = config.count || 6, config.page = +config.page || 0, new h(function(childCompute, cb) {
      return config.channel ? void self.getPlaylists({
        count : 1,
        channel : config.channel,
        page : config.page
      }).then(function(tmp) {
        config.playlist = tmp[0];
        self.getPlayListItems(config).then(childCompute, cb);
      }) : void cb(config);
    });
  };
  /**
   * @param {!Object} params
   * @return {?}
   */
  init.prototype.getPlaylists = function(params) {
    var data = this;
    /** @type {string} */
    var endpoint = "playlists?part=id";
    if (params.channel = params.channel || this.channel, params.channel) {
      if (params.page) {
        if (!data.pages[params.page]) {
          return h.reject("no page");
        }
        /** @type {string} */
        endpoint = endpoint + ("&pageToken=" + data.pages[params.page]);
      }
      return endpoint = endpoint + ("&channelId=" + params.channel.id + "&maxResults=" + params.count), proxy.request("GET", endpoint).then(function(response) {
        return response = JSON.parse(response), response.nextPageToken && (data.pages[params.page + 1] = response.nextPageToken), response.prevPageToken && (data.pages[params.page - 1] = response.prevPageToken), response.items;
      });
    }
  };
  /**
   * @param {!Object} params
   * @return {?}
   */
  init.prototype.getTotalInfoPlaylists = function(params) {
    var data = this;
    /** @type {string} */
    var endpoint = "playlists?part=snippet";
    if (params.channel = void 0 === params.channel ? this.channel : params.channel, params.page) {
      if (!data.pages[params.page]) {
        return h.reject("no page");
      }
      /** @type {string} */
      endpoint = endpoint + ("&pageToken=" + data.pages[params.page]);
    }
    if (params.channel) {
      /** @type {string} */
      endpoint = endpoint + ("&channelId=" + params.channel.id);
    } else {
      if (!(void 0 !== params.id && params.id.length > 0)) {
        return h.resolve([]);
      }
      /** @type {string} */
      endpoint = endpoint + ("&id=" + params.id);
    }
    return void 0 !== params.count && (endpoint = endpoint + ("&maxResults=" + params.count)), proxy.request("GET", endpoint).then(function(response) {
      return response = JSON.parse(response), response.nextPageToken && (data.pages[params.page + 1] = response.nextPageToken), response.prevPageToken && (data.pages[params.page - 1] = response.prevPageToken), response.items;
    });
  };
  /**
   * @param {string} verb
   * @return {?}
   */
  init.prototype.getChannelBackground = function(verb) {
    return verb = verb || this.channel, proxy.request("GET", "channels?part=brandingSettings&id=" + verb.id).then(function(e) {
      return e = JSON.parse(e), e.items[0].brandingSettings.image.bannerTvImageUrl;
    });
  };
  /**
   * @param {!Object} data
   * @return {?}
   */
  init.prototype.init = function(data) {
    /** @type {boolean} */
    var t = false;
    return void 0 !== data.channel && (this.channel ? this.channel && this.channel.id !== data.channel.id && (t = true, this.channel = data.channel) : (t = true, this.channel = data.channel)), data.mode && this.mode !== data.mode && (this.mode = data.mode), !!t && (this.pages = {}, this.emit("content:changed", data), true);
  };
  /** @type {function(!Object): undefined} */
  context.exports = init;
}, function(context, canCreateDiscussions, $) {
  /**
   * @param {string} data
   * @return {?}
   */
  function callback(data) {
    return data && data.playlist ? "pid:" + data.playlist.id + ";p:" + data.page : "PLAYLIST";
  }
  /**
   * @param {!Object} item
   * @return {undefined}
   */
  function init(item) {
    this.pages = {};
    /** @type {null} */
    this.playlist = null;
    c.call(this);
    item = item || {};
    if (void 0 !== item.events) {
      this.addListeners(item.events);
    }
    this.init(item);
  }
  var ch;
  var err_msg;
  var a = $(18);
  var c = $(4);
  var me = $(17);
  /** @type {boolean} */
  var $c$ = false;
  var self = $(41);
  /** @type {!Object} */
  init.prototype = Object.create(c.prototype);
  /** @type {function(!Object): undefined} */
  init.prototype.constructor = init;
  /**
   * @param {!Object} result
   * @return {?}
   */
  init.prototype.getPage = function(result) {
    var isFirstTimeShow;
    var arrayToReturn = this;
    return result.playlist = result.playlist || this.playlist, result.page = +result.page || 0, result.count = result.count || 20, new a(function(callback, reject) {
      if (isFirstTimeShow = self.get(callback(result))) {
        callback(isFirstTimeShow);
      } else {
        if (!result.playlist.id) {
          return void reject(result);
        }
        arrayToReturn.getPlayListItems(result).then(callback, reject);
      }
    });
  };
  /**
   * @param {!Object} data
   * @return {?}
   */
  init.prototype.getPlayListItems = function(data) {
    var state = this;
    /** @type {!Array} */
    var result = [];
    /** @type {string} */
    var postParam = "";
    /** @type {string} */
    var path = "playlistItems?part=snippet&playlistId=" + data.playlist.id + "&maxResults=" + (data.count || 30);
    if (data.page = +data.page || 0, $c$ || ($c$ = $(42), ch = $(45), err_msg = gettext("Author")), data.page) {
      if (!state.pages[data.page]) {
        return a.reject();
      }
      /** @type {string} */
      path = path + ("&pageToken=" + state.pages[data.page]);
    }
    return me.request("GET", path).then(function(response) {
      try {
        /** @type {*} */
        response = JSON.parse(response);
        if (response.nextPageToken) {
          state.pages[data.page + 1] = response.nextPageToken;
        }
        if (response.prevPageToken) {
          state.pages[data.page - 1] = response.prevPageToken;
        }
        response.items.forEach(function(data) {
          postParam = postParam + (data.snippet.resourceId.videoId + ",");
        });
      } catch (e) {
      }
      return state.getMovies(postParam.substr(0, postParam.length - 1)).then(function(items) {
        var l;
        var i;
        /** @type {number} */
        var val = +new Date;
        l = items.length;
        /** @type {number} */
        i = 0;
        for (; i < l; ++i) {
          result.push({
            value : 1,
            id : items[i].id,
            channelTitle : items[i].snippet.channelTitle,
            duration : me.normalizeVideoDuration(items[i].contentDetails.duration),
            realDuration : items[i].contentDetails.duration,
            viewCount : items[i].statistics.viewCount,
            publishedAt : items[i].snippet.publishedAt,
            dimension : items[i].contentDetails.dimension,
            definition : items[i].contentDetails.definition,
            title : items[i].snippet.localized.title,
            icon : items[i].snippet.thumbnails["high"].url,
            channelId : items[i].snippet.channelId,
            type : "video",
            locale : {
              publishedAt : ch(items[i].snippet.publishedAt, val),
              viewCount : items[i].statistics.viewCount + " " + ngettext("view", "views", +items[i].statistics.viewCount),
              channelTitle : err_msg + ": " + items[i].snippet.channelTitle
            }
          });
        }
        return self.set(callback(data), result, 3E5), result;
      });
    });
  };
  /**
   * @param {string} url
   * @return {?}
   */
  init.prototype.getMovies = function(url) {
    var itemNodeList;
    var options;
    var i;
    var max;
    /** @type {!Array} */
    var newNodeLists = [];
    options = url.split(",");
    /** @type {number} */
    i = 0;
    max = options.length;
    for (; i < max; ++i) {
      if (itemNodeList = self.get("vid:" + options[i])) {
        newNodeLists.push(itemNodeList);
      }
    }
    return me.request("GET", "videos?part=statistics,contentDetails,snippet&id=" + url).then(function(data) {
      data = JSON.parse(data).items;
      /** @type {number} */
      i = 0;
      max = data.length;
      for (; i < max; ++i) {
        self.set("vid:" + data[i].id, data[i], 6E4);
      }
      return data;
    });
  };
  /**
   * @param {!Object} params
   * @return {?}
   */
  init.prototype.init = function(params) {
    return void 0 !== params.playlist && (this.playlist ? this.playlist && this.playlist.id !== params.playlist.id && (this.playlist = params.playlist) : this.playlist = params.playlist, this.pages = {}, this.emit("content:changed", params), true);
  };
  /** @type {function(!Object): undefined} */
  context.exports = init;
}, function(context, canCreateDiscussions, i) {
  var service = {
    store : {},
    size : 0,
    set : function(name, bin, options) {
      var obj;
      var term;
      var a = this;
      term = this.store[name] ? this.store[name] : void 0;
      if (term && term.timeout) {
        clearTimeout(term.timeout);
      }
      obj = {
        value : bin,
        timeout : -1
      };
      if ("number" == typeof options) {
        /** @type {number} */
        obj.timeout = setTimeout(function() {
          a.remove(name);
        }, options);
      }
      this.store[name] = obj;
      ++this.size;
    },
    get : function(key, callback) {
      return !!this.store[key] && ("function" != typeof callback ? this.store[key].value : void callback(this.store[key].value));
    },
    remove : function(name) {
      --this.size;
      /** @type {null} */
      this.store[name] = null;
    },
    clear : function() {
      var csize = this.size;
      return this.store = {}, csize;
    }
  };
  context.exports = service;
}, function(mixin, canCreateDiscussions, $) {
  var nav = $(15);
  var problem = $(16);
  mixin.exports = {
    languageIndex : 0,
    nextLang : function(canCreateDiscussions) {
      return canCreateDiscussions === nav.languages.length - 1 ? 0 : ++canCreateDiscussions;
    },
    setLang : function(pluginName) {
      var self = this;
      $(43).load({
        name : pluginName
      }, function(i) {
        if (i) {
          /** @type {number} */
          self.languageIndex = -1;
        } else {
          self.languageIndex = nav.languages.indexOf(pluginName);
        }
        if (self.languageIndex === -1) {
          self.languageIndex = nav.languages.indexOf(problem.defaultSettings.language);
        }
      });
    }
  };
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {!Object} options
   * @return {?}
   */
  function initialize(options) {
    var django = new Vue(options);
    return window.gettext = window._ = django.gettext, window.pgettext = django.pgettext, window.ngettext = django.ngettext, django;
  }
  var ProjectConfiguration = require(4);
  var Vue = require(44);
  var config = new ProjectConfiguration;
  /** @type {string} */
  config.defaultLanguage = "en";
  /**
   * @param {!Object} options
   * @param {!Function} next
   * @return {?}
   */
  config.load = function(options, next) {
    var request;
    return options.ext = options.ext || "json", options.path = options.path || "lang", options.name === config.defaultLanguage ? (initialize(), next(null), false) : (request = new XMLHttpRequest, request.onload = function() {
      var connectionOptions;
      try {
        /** @type {*} */
        connectionOptions = JSON.parse(request.responseText);
        initialize(connectionOptions);
        next(null);
        if (config.events["load"]) {
          config.emit("load");
        }
      } catch (e) {
        request.onerror(e);
      }
    }, request.ontimeout = request.onerror = function(reason) {
      initialize();
      next(reason);
      if (config.events["error"]) {
        config.emit("error", reason);
      }
    }, request.open("GET", options.path + "/" + options.name + "." + options.ext, true), request.send(null), true);
  };
  module.exports = config;
}, function(module$jscomp$0, exports$jscomp$0, __webpack_require__$jscomp$0) {
  /**
   * @param {!Object} config$jscomp$2
   * @return {undefined}
   */
  function Gettext$jscomp$0(config$jscomp$2) {
    var data$jscomp$32;
    var meta$jscomp$0;
    config$jscomp$2 = config$jscomp$2 || {};
    data$jscomp$32 = config$jscomp$2.data || {};
    data$jscomp$32[""] = data$jscomp$32[""] || {};
    meta$jscomp$0 = config$jscomp$2.meta;
    /**
     * @param {?} i
     * @return {?}
     */
    this.gettext = function(i) {
      return data$jscomp$32[""][i] || i;
    };
    /**
     * @param {?} forApp
     * @param {?} metric
     * @return {?}
     */
    this.pgettext = function(forApp, metric) {
      return data$jscomp$32[forApp] && data$jscomp$32[forApp][metric] || metric;
    };
    /**
     * @param {string} msgId$jscomp$0
     * @param {string} plural$jscomp$0
     * @param {number} value$jscomp$84
     * @return {?}
     */
    this.ngettext = function(msgId$jscomp$0, plural$jscomp$0, value$jscomp$84) {
      var n$jscomp$68;
      return data$jscomp$32 && meta$jscomp$0 && data$jscomp$32[""][msgId$jscomp$0] ? data$jscomp$32[""][msgId$jscomp$0][eval("n = " + value$jscomp$84 + "; " + meta$jscomp$0.plural)] : 1 === value$jscomp$84 ? msgId$jscomp$0 : plural$jscomp$0;
    };
  }
  /** @type {function(!Object): undefined} */
  Gettext$jscomp$0.prototype.constructor = Gettext$jscomp$0;
  /** @type {function(!Object): undefined} */
  module$jscomp$0.exports = Gettext$jscomp$0;
}, function(mixin, canCreateDiscussions) {
  /**
   * @param {number} e
   * @param {number} t
   * @return {?}
   */
  mixin.exports = function(e, t) {
    var d;
    var re;
    var title;
    return e ? (re = e.match(/(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d\d\d)Z/), re.shift(), re.pop(), d = new Date(re[0], re[1] - 1, re[2], re[3], re[4], re[5]), d.setTime(t - d.getTime()), e = d.getTime(), d.getFullYear() > 1970 ? (title = d.getFullYear() - 1970, e = title + " " + ngettext("year", "years", +title) + " " + gettext("ago")) : d.getMonth() > 0 ? (title = d.getMonth() + 1, e = title + " " + ngettext("month", "months", +title) + " " + gettext("ago")) : d.getDate() > 1 ? (title =
      d.getDate(), e = title + " " + ngettext("day", "days", +title) + " " + gettext("ago")) : d.getHours() > 0 ? (title = d.getHours(), e = title + " " + ngettext("hour", "hours", +title) + " " + gettext("ago")) : d.getMinutes() > 0 ? (title = d.getMinutes(), e = title + " " + ngettext("minute", "minutes", +title) + " " + gettext("ago")) : (title = d.getSeconds(), e = title + " " + ngettext("second", "seconds", +title) + " " + gettext("ago")), e) : e;
  };
}, function(child, canCreateDiscussions, require) {
  var NotFound = require(18);
  var Scope = require(4);
  var request = require(17);
  var R = require(41);
  var $scope = new Scope;
  $scope.activeCategory = {};
  $scope.pages = {};
  /** @type {null} */
  $scope.ownChannel = null;
  /**
   * @param {!Object} b
   * @return {?}
   */
  $scope.cacheKey = function(b) {
    return "c:" + b.category.id + ";p:" + b.page;
  };
  /**
   * @param {!Object} i
   * @return {?}
   */
  $scope.getPage = function(i) {
    var formOrder;
    var post;
    var data = this;
    return i.page = +i.page || 0, i.category = i.category || this.activeCategory, new NotFound(function(each, error) {
      if (formOrder = R.get(data.cacheKey(i))) {
        each(formOrder);
      } else {
        if (post = "channels?part=snippet&categoryId=" + i.category.id + "&maxResults=" + i.count, i.page) {
          if (!data.pages[i.page]) {
            return data.activeCategory.totalResults === i.page ? void error("overflow") : void error("no page");
          }
          /** @type {string} */
          post = post + ("&pageToken=" + data.pages[i.page]);
        }
        request.request("GET", post).then(function(result) {
          var j;
          var lastCommaTermCount;
          /** @type {!Array} */
          var res = [];
          /** @type {*} */
          result = JSON.parse(result);
          if (result.pageInfo.totalResults) {
            data.activeCategory.totalResults = result.pageInfo.totalResults;
          }
          if (result.nextPageToken) {
            data.pages[i.page + 1] = result.nextPageToken;
          }
          if (result.prevPageToken) {
            data.pages[i.page - 1] = result.prevPageToken;
          }
          result = result.items;
          lastCommaTermCount = result.length;
          /** @type {number} */
          j = 0;
          for (; j < lastCommaTermCount; ++j) {
            res.push({
              value : result[j].id,
              id : result[j].id,
              title : result[j].snippet.localized.title,
              icon : result[j].snippet.thumbnails["high"].url
            });
          }
          R.set(data.cacheKey(i), res, 3E5);
          each(res);
        })["catch"](function(canCreateDiscussions) {
        });
      }
    });
  };
  /**
   * @param {string} url
   * @return {?}
   */
  $scope.getInfo = function(url) {
    return new NotFound(function(getDefaultState, throwException) {
      request.request("GET", "channels?part=snippet&id=" + url).then(function(b) {
        getDefaultState(JSON.parse(b).items);
      }, throwException);
    });
  };
  /**
   * @return {?}
   */
  $scope.getMine = function() {
    return new NotFound(function(accountSortTool, throwException) {
      if (null !== $scope.ownChannel) {
        accountSortTool($scope.ownChannel);
      } else {
        request.request("GET", "channels?part=snippet&mine=true").then(function(b) {
          $scope.ownChannel = JSON.parse(b).items[0];
          $scope.ownChannel.title = $scope.ownChannel.snippet.title;
          $scope.ownChannel.icon = $scope.ownChannel.snippet.thumbnails["default"].url;
          request.ownChannel = $scope.ownChannel;
          accountSortTool($scope.ownChannel);
        }, throwException);
      }
    });
  };
  /**
   * @param {string} category
   * @return {?}
   */
  $scope.setActiveCategory = function(category) {
    return !(!category || this.activeCategory.id === category.id) && (this.activeCategory = category, this.pages = {}, void 0 !== this.events["category:changed"] && this.emit("category:changed", category), true);
  };
  child.exports = $scope;
}, function(module, canCreateDiscussions, context) {
  /**
   * @param {number} index
   * @param {boolean} done
   * @return {?}
   */
  function process(index, done) {
    /** @type {number} */
    var k = 1 ^ index;
    if (!N) {
      if (done) {
        /** @type {boolean} */
        N = true;
        self.getPage({
          page : page - 1,
          count : 1
        }, function(canCreateDiscussions, groupExist) {
          --page;
          --current;
          /** @type {number} */
          i = k;
          /** @type {number} */
          id = index;
          /** @type {number} */
          j = k;
          /** @type {!Object} */
          items[k].data = groupExist;
          /** @type {null} */
          items[k].viewIndex = null;
          items[k].renderView(0);
          items[k].emit("view:ready");
        });
      } else {
        if (0 === items[id].data.length) {
          return void items[index].emit("view:ready");
        }
        /** @type {boolean} */
        N = true;
        self.getPage({
          page : current + 1,
          count : 1
        }, function(canCreateDiscussions, serializedData) {
          return serializedData ? void(canCreateDiscussions || 0 === serializedData.length ? (++page, ++current, items[index].data = [], items[index].viewIndex = null, items[index].renderView(0), items[index].$title.innerHTML = "", i = k, id = index, j = k, items[i].$node.style.top = _from_key, items[id].$node.style.top = pos, items[j].focus(), items[index].emit("view:ready")) : (++page, ++current, i = k, id = index, j = k, items[index].data = serializedData, items[index].viewIndex = null, items[index].renderView(0),
            items[index].emit("view:ready"), items[j].focus())) : void items[index].emit("view:ready");
        });
      }
    }
  }
  var options = context(13);
  var Dialog = (context(1), context(33));
  var Store = context(30);
  var BoxItem = context(37);
  var Date = context(48);
  var that = context(36);
  var d = (context(42), context(29));
  /** @type {!Array} */
  var items = [];
  var obj = new Dialog({
    $node : document.getElementById("pmTabChannelContent"),
    className : "tab hidden",
    visible : false,
    events : {
      focus : function() {
        items[j].focus();
      }
    }
  });
  var a = context(27);
  /** @type {(Element|null)} */
  var title = document.getElementById("pm");
  /** @type {(Element|null)} */
  var head = document.getElementById("pmChannelTitle");
  /** @type {(Element|null)} */
  var icon_div = document.getElementById("pmChannelIcon");
  /** @type {number} */
  var pos = 0;
  /** @type {number} */
  var _from_key = 0;
  /** @type {number} */
  var i = 0;
  /** @type {number} */
  var id = 1;
  /** @type {number} */
  var j = 0;
  /** @type {number} */
  var page = 0;
  /** @type {number} */
  var current = 1;
  /** @type {number} */
  var _takingTooLongTimeout = -1;
  /** @type {boolean} */
  var N = true;
  var self = new Date;
  var node = {
    id : null,
    title : null
  };
  self.addListener("content:changed", function() {
    clearTimeout(_takingTooLongTimeout);
    /** @type {number} */
    _takingTooLongTimeout = setTimeout(function() {
      a.hide();
    }, 1E4);
    if (0 === items.length) {
      items.push(new BoxItem({
        $node : document.getElementById("pmListChannelVideos0Node"),
        $body : document.getElementById("pmListChannelVideos0Body"),
        $title : document.getElementById("pmChannelTitle0"),
        className : "listMovie0Node",
        size : 5,
        viewIndex : 0,
        focusIndex : 0,
        type : Store.prototype.TYPE_HORIZONTAL,
        events : {
          overflow : function(data) {
            if (data.direction === options.left) {
              d.focus();
            }
          },
          "view:ready" : function() {
            obj.focusEntry = items[j];
            /** @type {number} */
            items[i].$node.style.top = _from_key;
            if (items[id]) {
              items[id].$node.style.top = pos;
            }
            /** @type {string} */
            this.$title.innerHTML = "";
            if (items[j] && items[j].data.length > 0 && items[j].data[0].value) {
              a.hide();
              clearTimeout(_takingTooLongTimeout);
            }
            this.show();
            items[j].focus();
            /** @type {boolean} */
            N = false;
          },
          "view:error" : function(undefined) {
            /** @type {boolean} */
            N = false;
            if ("empty" === undefined) {
              /** @type {!Array} */
              this.data = [{
                id : "",
                value : "",
                publishedAt : "",
                icon : "img/no.image.png",
                duration : "",
                title : gettext("No videos"),
                channelTitle : "",
                viewCount : "",
                locale : {
                  publishedAt : "",
                  viewCount : "",
                  channelTitle : ""
                }
              }];
              /** @type {null} */
              this.viewIndex = null;
              this.renderView(0);
              obj.focusEntry = items[j];
              /** @type {number} */
              items[i].$node.style.top = _from_key;
              if (items[id]) {
                items[id].$node.style.top = pos;
              }
              this.show();
              a.hide();
              clearTimeout(_takingTooLongTimeout);
              items[j].focus();
            } else {
              if (0 === page) {
                process(0, false);
              }
            }
          },
          "click:item" : function(context) {
            if (context.$item.data.id) {
              that.setContent({
                channel : node,
                video : context.$item.data,
                playlist : this.data,
                position : context.$item.index
              });
            }
          }
        }
      }));
      items.push(new BoxItem({
        $node : document.getElementById("pmListChannelVideos1Node"),
        $body : document.getElementById("pmListChannelVideos1Body"),
        $title : document.getElementById("pmChannelTitle1"),
        className : "listMovie1Node",
        size : 5,
        viewIndex : 0,
        focusIndex : 0,
        type : Store.prototype.TYPE_HORIZONTAL,
        events : {
          overflow : function(data) {
            if (data.direction === options.left) {
              d.focus();
            }
          },
          "view:ready" : function() {
            obj.focusEntry = items[j];
            /** @type {number} */
            items[i].$node.style.top = _from_key;
            if (items[id]) {
              items[id].$node.style.top = pos;
            }
            /** @type {string} */
            this.$title.innerHTML = "";
            if (items[j] && items[j].data.length > 0 && items[j].data[0].value) {
              a.hide();
              clearTimeout(_takingTooLongTimeout);
            }
            this.show();
            items[j].focus();
            /** @type {boolean} */
            N = false;
          },
          "view:error" : function(undefined) {
            /** @type {boolean} */
            N = false;
            if ("empty" === undefined) {
              /** @type {!Array} */
              this.data = [{
                id : "",
                value : "",
                publishedAt : "",
                icon : " ",
                duration : "",
                title : " ",
                channelTitle : "",
                viewCount : "",
                locale : {
                  publishedAt : "",
                  viewCount : "",
                  channelTitle : ""
                }
              }];
              /** @type {null} */
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              obj.focusEntry = items[j];
              /** @type {number} */
              items[i].$node.style.top = _from_key;
              if (items[id]) {
                items[id].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title ? this.model.channel.title : "&nbsp;";
              this.show();
              a.hide();
              clearTimeout(_takingTooLongTimeout);
              items[j].focus();
            }
          },
          "click:item" : function(context) {
            if (context.$item.data.id) {
              that.setContent({
                channel : node,
                video : context.$item.data,
                playlist : this.data,
                position : context.$item.index
              });
            }
          }
        }
      }));
      obj.add(items[0]);
      obj.add(items[1]);
      items[0].focus();
      items[0].addListener("keydown", function(data) {
        if (data.code === options.down) {
          process(0, false);
        } else {
          if (data.code === options.up) {
            if (page > 0) {
              process(0, true);
            }
          } else {
            if (data.code === options.playPause) {
              that.setContent({
                channel : this.model.channel,
                video : this.$focusItem.data,
                playlist : this.data,
                position : this.$focusItem.index
              });
            }
          }
        }
      });
      items[1].addListener("keydown", function(data) {
        if (data.code === options.down) {
          process(1, false);
        } else {
          if (data.code === options.up) {
            if (page > 0) {
              process(1, true);
            }
          } else {
            if (data.code === options.playPause) {
              that.setContent({
                channel : this.model.channel,
                video : this.$focusItem.data,
                playlist : this.data,
                position : this.$focusItem.index
              });
            }
          }
        }
      });
      pos = window.getComputedStyle(items[1].$node).getPropertyValue("top");
    }
    self.getPage({
      page : 0,
      count : 1
    }, function(canCreateDiscussions, groupExist) {
      /** @type {number} */
      page = 0;
      /** @type {number} */
      i = 0;
      /** @type {number} */
      id = 1;
      /** @type {number} */
      current = 1;
      /** @type {number} */
      j = 0;
      /** @type {string} */
      items[i].data = groupExist;
      /** @type {null} */
      items[i].viewIndex = null;
      items[i].renderView(0);
      items[i].emit("view:ready");
      items[j].focus();
      self.getPage({
        page : 1,
        count : 1
      }, function(canCreateDiscussions, groupExist) {
        /** @type {!Object} */
        items[id].data = groupExist;
        /** @type {null} */
        items[id].viewIndex = null;
        items[id].renderView(0);
        items[id].emit("view:ready");
        items[j].focus();
      });
    });
  });
  /**
   * @param {string} params
   * @return {undefined}
   */
  obj.activate = function(params) {
    if (params) {
      this.show();
      if (items.length) {
        items[j].focus();
      }
      self.channelId = node.id = params.id;
      self.getInfo({}, function(canCreateDiscussions, scope) {
        if (!canCreateDiscussions) {
          scope.background = scope.background.split("=")[0] + "=w1920-fcrop64=1,00000000ffffffff-nd-c0xffffffff-rj-k-no";
          /** @type {string} */
          title.style.backgroundImage = "url(" + scope.background + ")";
          /** @type {string} */
          icon_div.style.backgroundImage = "url(" + scope.icon + ")";
          node.title = head.innerHTML = scope.title;
          node.icon = scope.icon;
          self.emit("content:changed");
        }
      });
    }
  };
  module.exports = obj;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} topic
   * @param {!Object} data
   * @return {?}
   */
  function cb(topic, data) {
    var tel;
    var actual;
    var translate;
    var date;
    var str;
    var inputText;
    var crossfilterable_layers;
    var start;
    var end;
    var allcookies;
    var layer_i;
    /** @type {!Array} */
    var ret = [];
    crossfilterable_layers = topic.split("channels-content-item");
    /** @type {number} */
    layer_i = 0;
    for (; layer_i < crossfilterable_layers.length; layer_i++) {
      allcookies = crossfilterable_layers[layer_i];
      if (allcookies.indexOf("yt-lockup-video") !== -1) {
        start = allcookies.indexOf('="https://i.ytimg') + 2;
        end = allcookies.indexOf('"', start);
        inputText = allcookies.substring(start, end);
        start = allcookies.indexOf('data-context-item-id="') + 22;
        end = allcookies.indexOf('"', start);
        tel = allcookies.substring(start, end);
        start = allcookies.indexOf('<span class="video-time" aria-hidden="true">') + 44;
        start = allcookies.indexOf(">", start) + 1;
        end = allcookies.indexOf("</span>", start);
        actual = allcookies.substring(start, end);
        start = allcookies.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
        end = allcookies.indexOf(" ", start);
        translate = allcookies.substring(start, end);
        start = allcookies.indexOf("</li><li>", start) + 9;
        end = allcookies.indexOf("</li>", start);
        date = allcookies.substring(start, end);
        start = allcookies.indexOf('" href="/watch?v=') + 17;
        start = allcookies.indexOf(">", start) + 1;
        end = allcookies.indexOf("</a><span", start);
        str = allcookies.substring(start, end);
        ret.push({
          value : 1,
          id : tel,
          channelTitle : data.title,
          duration : actual,
          realDuration : actual,
          viewCount : translate,
          publishedAt : date,
          dimension : "",
          definition : "",
          title : str,
          icon : inputText,
          channelId : data.id,
          type : "video",
          locale : {
            publishedAt : date,
            viewCount : translate,
            channelTitle : data.title
          }
        });
      }
    }
    return ret;
  }
  /**
   * @return {undefined}
   */
  function self() {
    NumericType.call(this);
    /** @type {null} */
    this.channelId = null;
    this.pages = {};
  }
  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  /** @type {!Object} */
  self.prototype = Object.create(NumericType.prototype);
  /** @type {function(): undefined} */
  self.prototype.constructor = self;
  /**
   * @param {!Object} data
   * @param {!Function} callback
   * @return {?}
   */
  self.prototype.getInfo = function(data, callback) {
    return data = data || {}, !data.channelId && this.channelId && (data.channelId = this.channelId), data.channelId ? void ajax("get", "https://www.youtube.com/" + data.channelId + "/about", function(c, n) {
      var b;
      var a;
      var initialRotation;
      var noteValueToDisplay;
      var t;
      var d;
      var backgroundAttr;
      return 200 !== n ? void callback({
        message : "request got bad http status (" + n + ")"
      }, {}) : (b = c.indexOf('img class="channel-header-profile-image" src="') + 46, a = c.indexOf('"', b), initialRotation = c.substring(b, a), b = c.indexOf("yt-subscription-button-subscriber-count-branded-horizontal"), b = c.indexOf('title="', b) + 7, a = c.indexOf('"', b), noteValueToDisplay = c.substring(b, a), b = c.indexOf('class="qualified-channel-title-text"'), b = c.indexOf('title="', b) + 7, a = c.indexOf('"', b), t = c.substring(b, a), b = c.indexOf('<div class="about-description'),
        a = c.indexOf('<div class="about-metadata-label', b), d = c.substring(b, a), b = c.indexOf(".hd-banner-image {"), b = c.indexOf("background-image: url(", b) + 22, a = c.indexOf(");", b), backgroundAttr = "http:" + c.substring(b, a), void callback(null, {
        icon : initialRotation,
        subscribers : noteValueToDisplay,
        background : backgroundAttr,
        title : t,
        id : data.channelId,
        description : d
      }));
    }) : void callback({
      message : "error: field arguments[0].channelId is empty"
    }, {});
  };
  /**
   * @param {!Object} params
   * @param {!Function} callback
   * @return {?}
   */
  self.prototype.getPage = function(params, callback) {
    var data = this;
    return params = params || {}, !params.channelId && this.channelId && (params.channelId = this.channelId), params.page = +params.page || 0, params.channelId ? void(this.pages[params.page] && this.pages[params.page].parseId ? this.pages[params.page].cached ? callback(null, this.pages[params.page].data) : ajax("get", "https://www.youtube.com" + this.pages[params.page].parseId, function(i, a) {
      var post;
      var interestingPoint;
      var c;
      var e;
      var resizewidth;
      var p;
      if (200 !== a) {
        return void callback({
          message : "request got bad http status (" + a + ")"
        }, []);
      }
      try {
        /** @type {*} */
        post = JSON.parse(i);
      } catch (viewportCenter) {
        interestingPoint = viewportCenter;
        /** @type {string} */
        post = "";
      }
      return post ? (post.load_more_widget_html.trim().length > 10 ? (c = post.load_more_widget_html.indexOf('data-uix-load-more-href="/browse_ajax') + 25, e = post.load_more_widget_html.indexOf('"', c), resizewidth = post.load_more_widget_html.substring(c, e).replace(/&amp;/g, "&")) : resizewidth = "", data.pages[params.page + 1] = {
        parseId : resizewidth,
        cached : false
      }, i.indexOf('class="qualified-channel-title-text"') === -1 ? p = data.pages[0] && data.pages[0].data && data.pages[0].data[0] && data.pages[0].data[0] && data.pages[0].data[0].channelTitle ? data.pages[0].data[0].channelTitle : "" : (c = i.indexOf('class="qualified-channel-title-text"'), c = i.indexOf('title="', c) + 7, e = i.indexOf('"', c), p = i.substring(c, e)), data.pages[params.page].cached = true, data.pages[params.page].data = cb(post.content_html, {
        id : params.channelId,
        title : p
      }), void callback(null, data.pages[params.page].data)) : void callback({
        message : "parse error for page id " + data.pages[params.page].parseId,
        code : interestingPoint
      }, []);
    }) : params.page ? this.pages[params.page] && !this.pages[params.page].parseId ? callback(null, []) : callback({
      message : "wrong page number (page id not found in cache)"
    }, []) : ajax("get", "https://www.youtube.com/" + params.channelId + "/videos", function(s, a) {
      var q;
      var t;
      var index;
      var contents;
      return 200 !== a ? void callback({
        message : "request got bad http status (" + a + ")"
      }, []) : (t = s.indexOf('class="qualified-channel-title-text"'), t = s.indexOf('title="', t) + 7, index = s.indexOf('"', t), contents = s.substring(t, index), t = s.indexOf('data-uix-load-more-href="/browse_ajax') + 25, index = s.indexOf('"', t), data.pages[params.page + 1] = {
        parseId : s.substring(t, index).replace(/&amp;/g, "&"),
        cached : false
      }, q = s.slice(s.indexOf('id="channels-browse-content-grid"'), s.indexOf("browse-items-load-more-button")), data.pages[0] = {
        cached : true,
        parseId : "   ",
        data : cb(q, {
          id : params.channelId,
          title : contents
        })
      }, void callback(null, data.pages[0].data));
    })) : void callback({
      message : "error: field arguments[0].channelId is empty"
    }, []);
  };
  /**
   * @return {?}
   */
  self.prototype.filter = function() {
    return false;
  };
  /** @type {function(): undefined} */
  module.exports = self;
}, function(module, canCreateDiscussions) {
  /**
   * @param {?} uri
   * @return {?}
   */
  function parseUri(uri) {
    var o = {
      strictMode : false,
      key : ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
      q : {
        name : "queryKey",
        parser : /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser : {
        strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose : /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    };
    var targets = o.parser[o.strictMode ? "strict" : "loose"].exec(uri);
    var e = {};
    /** @type {number} */
    var i = 14;
    for (; i--;) {
      e[o.key[i]] = targets[i] || "";
    }
    return e[o.q.name] = {}, e[o.key[12]].replace(o.q.parser, function(canCreateDiscussions, propertyToSet, s) {
      if (propertyToSet) {
        e[o.q.name][propertyToSet] = s;
      }
    }), e;
  }
  /**
   * @param {string} type
   * @param {string} uri
   * @param {!Function} cb
   * @param {?} value
   * @param {string} undefined
   * @param {boolean} async
   * @return {?}
   */
  function ajax(type, uri, cb, value, undefined, async) {
    var headerName;
    /** @type {null} */
    var auto = null;
    /** @type {null} */
    var _takingTooLongTimeout = null;
    /** @type {!XMLHttpRequest} */
    var xhr = new XMLHttpRequest;
    "AJAX " + type.toUpperCase() + " " + uri;
    if (async = async !== false, xhr.onreadystatechange = function() {
      var iconCtx;
      if (4 === xhr.readyState) {
        if (clearTimeout(_takingTooLongTimeout), "json" === undefined && 200 === xhr.status) {
          try {
            /** @type {*} */
            auto = JSON.parse(xhr.responseText);
          } catch (e) {
            /** @type {null} */
            auto = null;
          }
        }
        if ("function" == typeof cb) {
          /** @type {*} */
          iconCtx = "xml" === undefined ? xhr.responseXML : "json" === undefined ? auto : xhr.responseText;
          cb(iconCtx, xhr.status, xhr);
        }
      }
    }, xhr.open(type, uri, async), value) {
      for (headerName in value) {
        if (value.hasOwnProperty(headerName)) {
          xhr.setRequestHeader(headerName, value[headerName]);
        }
      }
    }
    return xhr.send(), _takingTooLongTimeout = setTimeout(function() {
      xhr.abort();
      if ("function" == typeof cb) {
        cb(null, 0);
      }
    }, 6E4), xhr;
  }
  /** @type {function(string, string, !Function, ?, string, boolean): ?} */
  window.ajax = ajax;
  module.exports = {
    ajax : ajax,
    parseUri : parseUri
  };
}, function(module, canCreateDiscussions, $) {
  /**
   * @return {?}
   */
  function init() {
    return data.languageIndex !== key && (me ? (me.show(), inlineEditor2 = data.activePage.activeComponent, me.focus()) : (me = new Definition({
      visible : false,
      events : {
        keydown : function(e) {
          var barIndex;
          var context;
          if (e.code === options.ok) {
            data.settings.language = action.languages[key];
            /** @type {number} */
            key = -1;
            /** @type {number} */
            data.settings.languageOverwrite = 1;
            /** @type {number} */
            data.settings.keyboardLanguage = key;
            data.reload();
          } else {
            if (e.code === options.back) {
              p.data[p.size - 1].value = key = data.languageIndex;
              /** @type {boolean} */
              e.stop = true;
              me.hide();
              searchContactPanel.show();
              inlineEditor2.focus();
              barIndex = p.$focusItem.index;
              context = p.viewIndex;
              /** @type {null} */
              p.viewIndex = null;
              p.renderView(context);
              p.focusIndex(barIndex);
            }
          }
        }
      }
    }), me.$body.classList.add("modalExit"), me.$header.innerHTML = gettext("To apply a new language, you should restart the application"), me.$content.innerHTML = "", me.$content.appendChild(item = document.createElement("div")), item.innerText = gettext("Ok"), item.className = "btn confirm" + (enable_keys ? " old" : ""), me.$content.appendChild(item = document.createElement("div")), item.className = "btn back" + (enable_keys ? " old" : ""), item.innerText = gettext("Cancel"), me.$footer.innerHTML =
      "", data.activePage.add(me), searchContactPanel.hide(), me.show(), inlineEditor2 = data.activePage.activeComponent, me.focus()), true);
  }
  var p;
  var me;
  var item;
  var inlineEditor2;
  var options = $(13);
  var data = $(1);
  var Buffer = $(30);
  var Menu = $(33);
  var Definition = $(51);
  var instance = ($(17), $(53));
  var action = $(15);
  /** @type {(Element|null)} */
  var title = document.getElementById("pm");
  var camera = new Menu({
    $node : document.getElementById("pmTabSettings"),
    className : "tab",
    visible : false,
    events : {
      show : function() {
        /** @type {string} */
        title.style.backgroundImage = "";
      }
    }
  });
  var fakeInputElement = $(29);
  var searchContactPanel = $(25);
  /** @type {boolean} */
  var enable_keys = ["AuraHD2", "AuraHD3", "AuraHD8", "MAG254", "MAG275", "MAG276", "WR320"].indexOf(instance.deviceModel()) !== -1;
  var key = data.languageIndex;
  fakeInputElement.addListener("focus", function() {
    init();
  });
  /**
   * @return {undefined}
   */
  camera.activate = function() {
    var inputel;
    var badge;
    if (!p) {
      badge = $(42);
      inputel = $(54);
      p = new Buffer({
        $node : document.getElementById("pmSettingsList"),
        type : Buffer.prototype.TYPE_HORIZONTAL,
        size : 1,
        data : [{
          title : gettext("Language"),
          value : data.languageIndex,
          values : action.languagesLocalized,
          description : gettext("Interface language"),
          icon : "icon flag",
          onclick : function(data) {
            var i = badge.nextLang(this.value);
            this.value = i;
            key = i;
            data.$value.innerText = action.languagesLocalized[i];
          }
        }],
        render : function(self, obj) {
          if (!self.ready) {
            self.$container = self.appendChild(document.createElement("div"));
            /** @type {string} */
            self.$container.className = "container";
            self.$title = self.$container.appendChild(document.createElement("div"));
            /** @type {string} */
            self.$title.className = "title";
            self.$value = self.$container.appendChild(document.createElement("div"));
            /** @type {string} */
            self.$value.className = "value";
            self.$icon = self.$container.appendChild(document.createElement("div"));
            self.$description = self.appendChild(document.createElement("div"));
            /** @type {string} */
            self.$description.className = "description";
            /** @type {boolean} */
            self.ready = true;
          }
          self.$title.innerText = obj.title;
          self.$value.innerHTML = obj.values[obj.value];
          self.$icon.className = obj.icon;
          self.$description.innerText = obj.description;
        },
        events : {
          keydown : function(event) {
            switch(event.code) {
              case options.right:
                break;
              case options.left:
                if (this.viewIndex > 0 && this.viewIndex < this.data.length - this.size) {
                  this.renderView(this.viewIndex + 1);
                } else {
                  this.move(event.code);
                }
                break;
              case options.ok:
                if (void 0 !== this.events["click:item"]) {
                  this.emit("click:item", {
                    $item : this.$focusItem,
                    event : event
                  });
                }
                break;
              case options.back:
                if (init()) {
                  /** @type {boolean} */
                  event.stop = true;
                }
            }
          },
          "click:item" : function(self) {
            self.$item.data.onclick(self.$item);
          },
          overflow : function(data) {
            if (data.direction === options.left) {
              fakeInputElement.focus();
            }
          }
        }
      });
      camera.add(p);
      /**
       * @param {number} name
       * @return {?}
       */
      p.renderView = function(name) {
        var item;
        var i;
        var data;
        var prevIndex;
        var getObjArg;
        if (this.viewIndex !== name) {
          prevIndex = this.viewIndex;
          this.viewIndex = getObjArg = name;
          /** @type {number} */
          i = 0;
          for (; i < this.size; i++) {
            item = this.$body.children[i];
            data = this.data[name];
            if (void 0 !== data) {
              item.data = data;
              /** @type {number} */
              item.index = name;
              this.renderItem(item, data);
              if (data.mark) {
                item.classList.add("mark");
              } else {
                item.classList.remove("mark");
              }
            } else {
              item.data = item.index = void 0;
              /** @type {string} */
              item.innerHTML = "";
              /** @type {boolean} */
              item.ready = false;
            }
            name++;
          }
          return void 0 !== this.events["move:view"] && this.emit("move:view", {
            prevIndex : prevIndex,
            currIndex : getObjArg
          }), true;
        }
        return false;
      };
    }
    this.show();
    p.focus();
    p.focusIndex(0);
    camera.focusEntry = p;
  };
  module.exports = camera;
}, function(context, canCreateDiscussions, getVoxel) {
  /**
   * @param {!Object} e
   * @return {undefined}
   */
  function init(e) {
    e = e || {};
    /** @type {string} */
    e.className = "modalMessage" + (e.className || "");
    b.call(this, e);
    this.$header = this.$body.appendChild(document.createElement("div"));
    this.$content = this.$body.appendChild(document.createElement("div"));
    this.$footer = this.$body.appendChild(document.createElement("div"));
    /** @type {string} */
    this.$header.className = "header";
    /** @type {string} */
    this.$content.className = "content";
    /** @type {string} */
    this.$footer.className = "footer";
    /** @type {string} */
    this.$header.innerText = "header";
    /** @type {string} */
    this.$content.innerText = "content";
    /** @type {string} */
    this.$footer.innerText = "footer";
    this.hide();
  }
  var b = getVoxel(52);
  /** @type {!Object} */
  init.prototype = Object.create(b.prototype);
  /** @type {function(!Object): undefined} */
  init.prototype.constructor = init;
  /** @type {function(!Object): undefined} */
  context.exports = init;
}, function(module, canCreateDiscussions, promiseSupplier) {
  /**
   * @param {number} that
   * @return {undefined}
   */
  function Menu(that) {
    that = that || {};
    /** @type {!Element} */
    that.$body = document.createElement("div");
    /** @type {string} */
    that.$body.className = "body";
    s.call(this, that);
    this.$node.appendChild(document.createElement("div").appendChild(this.$body).parentNode);
  }
  var s = promiseSupplier(24);
  /** @type {!Object} */
  Menu.prototype = Object.create(s.prototype);
  /** @type {function(number): undefined} */
  Menu.prototype.constructor = Menu;
  /** @type {string} */
  Menu.prototype.name = "spa-component-modal";
  /** @type {function(number): undefined} */
  module.exports = Menu;
}, function(module, canCreateDiscussions) {
  module.exports = {
    initPlayer : window.top.gSTB.InitPlayer,
    saveUserData : window.top.gSTB.SaveUserData,
    loadUserData : window.top.gSTB.LoadUserData,
    setPosTime : window.top.gSTB.SetPosTime,
    getPosTime : window.top.gSTB.GetPosTime,
    play : window.top.gSTB.Play,
    pause : window.top.gSTB.Pause,
    continuePlay : window.top.gSTB.Continue,
    getVolume : window.top.gSTB.GetVolume,
    setVolume : window.top.gSTB.SetVolume,
    setNativeStringMode : window.top.gSTB && window.top.gSTB.SetNativeStringMode ? window.top.gSTB.SetNativeStringMode : function() {
    },
    setServiceButtonState : window.top.gSTB.EnableServiceButton,
    setVKButtonState : window.top.gSTB.EnableVKButton,
    setTvButtonState : window.top.gSTB.EnableTvButton,
    setAppButtonState : window.top.gSTB.EnableAppButton,
    hideVK : window.top.gSTB.HideVirtualKeyboard,
    showVK : window.top.gSTB.ShowVirtualKeyboard,
    getStandByStatus : window.top.gSTB.GetStandByStatus,
    setStandByStatus : window.top.gSTB.StandBy,
    getEnv : window.top.gSTB.GetEnv,
    isMuted : window.top.gSTB.GetMute,
    setMute : window.top.gSTB.SetMute,
    deviceModel : window.top.gSTB.GetDeviceModelExt
  };
}, function(child, canCreateDiscussions, floor) {
  var startYNew = floor(4);
  var $scope = new startYNew;
  $scope.data = {
    quality : [gettext("Best"), "720p", "480p", "360p", "240p"],
    safeSearch : [gettext("Off"), gettext("On")]
  };
  /**
   * @param {string} prop
   * @param {number} i
   * @return {?}
   */
  $scope.getNext = function(prop, i) {
    if ($scope.data[prop] && $scope.data[prop][i]) {
      return ++i, $scope.data[prop].length === i && (i = 0), this.emit("changed", {
        key : prop,
        value : $scope.data[prop][i],
        index : i
      }), {
        value : $scope.data[prop][i],
        index : i
      };
    }
  };
  child.exports = $scope;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {number} to
   * @param {boolean} str
   * @return {?}
   */
  function process(to, str) {
    /** @type {number} */
    var j = 1 ^ to;
    if (!toPlayer) {
      if (str) {
        /** @type {boolean} */
        toPlayer = true;
        model.getPage({
          page : page - 1,
          count : 1
        }, function(canCreateDiscussions, groupExist) {
          --page;
          --current;
          /** @type {number} */
          k = j;
          /** @type {number} */
          i = to;
          /** @type {number} */
          index = j;
          /** @type {!Object} */
          nodes[j].data = groupExist;
          /** @type {null} */
          nodes[j].viewIndex = null;
          nodes[j].renderView(0);
          nodes[j].focusIndex(0);
          nodes[j].emit("view:ready");
        });
      } else {
        if (0 === nodes[i].data.length) {
          return void nodes[to].emit("view:ready");
        }
        /** @type {boolean} */
        toPlayer = true;
        model.getPage({
          page : current + 1,
          count : 1
        }, function(canCreateDiscussions, serializedData) {
          return serializedData ? void(canCreateDiscussions || 0 === serializedData.length ? (++page, ++current, nodes[to].data = [], nodes[to].viewIndex = null, nodes[to].renderView(0), nodes[to].focusIndex(0), nodes[to].$title.innerHTML = "", k = j, i = to, index = j, nodes[k].$node.style.top = _from_key, nodes[i].$node.style.top = pos, nodes[index].focus(), nodes[to].emit("view:ready")) : (++page, ++current, k = j, i = to, index = j, nodes[to].data = serializedData, nodes[to].viewIndex = null,
            nodes[to].renderView(0), nodes[to].focusIndex(0), nodes[to].emit("view:ready"))) : void nodes[to].emit("view:ready");
        });
      }
    }
  }
  var options = require(13);
  var test = require(1);
  var ctor = require(33);
  var ActionClient = require(30);
  var Dialog = require(35);
  var ViewModel = require(37);
  var t = require(36);
  var Model = require(56);
  var model = new Model;
  var fbLargeCommandLine = require(29);
  var rebaseBtn = require(27);
  /** @type {!Array} */
  var nodes = [];
  /** @type {(Element|null)} */
  var title = document.getElementById("pm");
  /** @type {number} */
  var index = 0;
  var self = new ctor({
    $node : document.getElementById("pmTabMainContent"),
    visible : false,
    className : "tab hidden",
    events : {
      focus : function() {
        nodes[index].focus();
      },
      show : function() {
        /** @type {string} */
        title.style.backgroundImage = "";
      }
    }
  });
  var d = new Dialog({
    $node : document.getElementById("pmMainSearch"),
    $body : document.getElementById("pmMainSearchBody"),
    className : "tabInputSearch",
    events : {
      focus : function() {
        this.setValue("");
        test.route(test.pages.search);
      }
    }
  });
  /** @type {number} */
  var pos = 0;
  /** @type {number} */
  var _from_key = 0;
  /** @type {number} */
  var k = 0;
  /** @type {number} */
  var i = 1;
  /** @type {number} */
  var page = 0;
  /** @type {number} */
  var current = 1;
  /** @type {number} */
  var _takingTooLongTimeout = -1;
  /** @type {boolean} */
  var toPlayer = true;
  /**
   * @return {undefined}
   */
  self.activate = function() {
    this.show();
    clearTimeout(_takingTooLongTimeout);
    /** @type {number} */
    _takingTooLongTimeout = setTimeout(function() {
      rebaseBtn.hide();
    }, 1E4);
    if (0 === nodes.length) {
      rebaseBtn.show();
      nodes.push(new ViewModel({
        $node : document.getElementById("pmListMainVideos0Node"),
        $body : document.getElementById("pmListMainVideos0Body"),
        $title : document.getElementById("pmMainChannelTitle0"),
        className : "listMovie0Node",
        model : new Model({
          type : "video"
        }),
        size : 5,
        viewIndex : 0,
        focusIndex : 0,
        type : ActionClient.prototype.TYPE_HORIZONTAL,
        events : {
          overflow : function(data) {
            if (data.direction === options.left) {
              fbLargeCommandLine.focus();
            }
          },
          "view:ready" : function() {
            self.focusEntry = nodes[index];
            /** @type {number} */
            nodes[k].$node.style.top = _from_key;
            if (nodes[i]) {
              nodes[i].$node.style.top = pos;
            }
            /** @type {string} */
            this.$title.innerHTML = "";
            if (nodes[index] && nodes[index].data.length > 0 && nodes[index].data[0].value) {
              rebaseBtn.hide();
              clearTimeout(_takingTooLongTimeout);
            }
            this.show();
            nodes[index].focus();
            /** @type {boolean} */
            toPlayer = false;
          },
          "view:error" : function(undefined) {
            /** @type {boolean} */
            toPlayer = false;
            if ("empty" === undefined) {
              /** @type {!Array} */
              this.data = [];
              /** @type {null} */
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[index];
              /** @type {number} */
              nodes[k].$node.style.top = _from_key;
              if (nodes[i]) {
                nodes[i].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              rebaseBtn.hide();
              this.show();
              clearTimeout(_takingTooLongTimeout);
              nodes[index].focus();
            } else {
              if (0 === page) {
                process(0, false);
              }
            }
          },
          "click:item" : function(context) {
            if (context.$item.data.id) {
              t.setContent({
                channel : this.model.channel,
                video : context.$item.data,
                playlist : this.data,
                position : context.$item.index
              });
            }
          },
          focus : function() {
            self.focusEntry = this;
          }
        }
      }));
      nodes.push(new ViewModel({
        $node : document.getElementById("pmListMainVideos1Node"),
        $body : document.getElementById("pmListMainVideos1Body"),
        $title : document.getElementById("pmMainChannelTitle1"),
        className : "listMovie1Node",
        model : new Model({
          type : "video"
        }),
        size : 5,
        viewIndex : 0,
        focusIndex : 0,
        type : ActionClient.prototype.TYPE_HORIZONTAL,
        events : {
          overflow : function(data) {
            if (data.direction === options.left) {
              fbLargeCommandLine.focus();
            }
          },
          "view:ready" : function() {
            self.focusEntry = nodes[index];
            /** @type {number} */
            nodes[k].$node.style.top = _from_key;
            nodes[i].$node.style.top = pos;
            /** @type {string} */
            this.$title.innerHTML = "";
            if (nodes[index] && nodes[index].data.length > 0 && nodes[index].data[0].value) {
              rebaseBtn.hide();
              clearTimeout(_takingTooLongTimeout);
            }
            this.show();
            clearTimeout(_takingTooLongTimeout);
            nodes[index].focus();
            /** @type {boolean} */
            toPlayer = false;
          },
          "view:error" : function(undefined) {
            /** @type {boolean} */
            toPlayer = false;
            if ("empty" === undefined) {
              /** @type {!Array} */
              this.data = [{
                id : "",
                value : "",
                publishedAt : "",
                icon : "img/no.image.png",
                duration : "",
                title : gettext("No videos"),
                channelTitle : "",
                viewCount : "",
                locale : {
                  publishedAt : "",
                  viewCount : "",
                  channelTitle : ""
                }
              }];
              /** @type {null} */
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[index];
              /** @type {number} */
              nodes[k].$node.style.top = _from_key;
              if (nodes[i]) {
                nodes[i].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              this.show();
              rebaseBtn.hide();
              clearTimeout(_takingTooLongTimeout);
              nodes[index].focus();
            }
          },
          "click:item" : function(context) {
            if (context.$item.data.id) {
              t.setContent({
                channel : this.model.channel,
                video : context.$item.data,
                playlist : this.data,
                position : context.$item.index
              });
            }
          },
          focus : function() {
            self.focusEntry = this;
          }
        }
      }));
      self.add(nodes[0]);
      self.add(nodes[1]);
      nodes[0].addListener("keydown", function(data) {
        if (data.code === options.down) {
          process(0, false);
        } else {
          if (data.code === options.up) {
            if (page > 0) {
              process(0, true);
            } else {
              d.focus();
            }
          } else {
            if (data.code === options.playPause) {
              t.setContent({
                channel : this.model.channel,
                video : this.$focusItem.data,
                playlist : this.data,
                position : this.$focusItem.index
              });
            }
          }
        }
      });
      nodes[1].addListener("keydown", function(data) {
        if (data.code === options.down) {
          process(1, false);
        } else {
          if (data.code === options.up) {
            if (page > 0) {
              process(1, true);
            } else {
              d.focus();
            }
          } else {
            if (data.code === options.playPause) {
              t.setContent({
                channel : this.model.channel,
                video : this.$focusItem.data,
                playlist : this.data,
                position : this.$focusItem.index
              });
            }
          }
        }
      });
      pos = window.getComputedStyle(nodes[1].$node).getPropertyValue("top");
      model.getPage({
        page : 0,
        count : 1
      }, function(canCreateDiscussions, groupExist) {
        if (canCreateDiscussions) {
          /** @type {!Array} */
          groupExist = [];
        }
        /** @type {number} */
        page = 0;
        /** @type {number} */
        k = 0;
        /** @type {number} */
        i = 1;
        /** @type {number} */
        current = 1;
        /** @type {number} */
        index = 0;
        /** @type {!Object} */
        nodes[k].data = groupExist;
        /** @type {null} */
        nodes[k].viewIndex = null;
        nodes[k].renderView(0);
        nodes[k].focusIndex(0);
        nodes[k].emit("view:ready");
        nodes[index].focus();
        model.getPage({
          page : 1,
          count : 1
        }, function(canCreateDiscussions, groupExist) {
          if (canCreateDiscussions) {
            /** @type {!Array} */
            groupExist = [];
          }
          /** @type {!Object} */
          nodes[i].data = groupExist;
          /** @type {null} */
          nodes[i].viewIndex = null;
          nodes[i].renderView(0);
          nodes[i].focusIndex(0);
          nodes[i].emit("view:ready");
        });
      });
    } else {
      if (nodes[index].data.length) {
        nodes[index].focus();
      }
    }
    /** @type {!Array} */
    window.lists = nodes;
  };
  self.add(d);
  module.exports = self;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} width
   * @return {?}
   */
  function resolve(width) {
    var packageId;
    var a;
    var n;
    var s;
    var r;
    var t;
    var awesomeIcon;
    var name;
    var crossfilterable_layers;
    var p;
    var i;
    var albumIDwithAuthkey;
    var layer_i;
    var type;
    var playlistId;
    var hide;
    /** @type {!Array} */
    var items = [];
    crossfilterable_layers = width.split('<li class="yt-shelf-grid-item');
    /** @type {number} */
    layer_i = 0;
    for (; layer_i < crossfilterable_layers.length; layer_i++) {
      if (albumIDwithAuthkey = crossfilterable_layers[layer_i], albumIDwithAuthkey.indexOf("yt-lockup-content") !== -1) {
        if (albumIDwithAuthkey.indexOf("yt-lockup-playlist") !== -1) {
          /** @type {string} */
          type = "playlist";
        } else {
          if (albumIDwithAuthkey.indexOf("yt-lockup-video") === -1 || albumIDwithAuthkey.indexOf("branded-page-module") !== -1 || albumIDwithAuthkey.indexOf("data-set-reminder-text") !== -1) {
            continue;
          }
          /** @type {string} */
          type = "video";
          /** @type {boolean} */
          hide = albumIDwithAuthkey.indexOf("yt-badge-live") !== -1;
        }
        p = albumIDwithAuthkey.indexOf("//i.ytimg");
        i = albumIDwithAuthkey.indexOf('"', p);
        awesomeIcon = "https:" + albumIDwithAuthkey.substring(p, i).replace(/&amp;/g, "&");
        if (albumIDwithAuthkey.indexOf('<a href="/channel/') === -1) {
          if (albumIDwithAuthkey.indexOf("data-channel-external-id=") === -1) {
            if (albumIDwithAuthkey.indexOf('<a href="/user/') === -1) {
              /** @type {string} */
              name = "";
            } else {
              p = albumIDwithAuthkey.indexOf('<a href="/user/') + 10;
              i = albumIDwithAuthkey.indexOf('"', p);
              name = albumIDwithAuthkey.substring(p, i);
            }
          } else {
            p = albumIDwithAuthkey.indexOf('data-channel-external-id="') + 26;
            i = albumIDwithAuthkey.indexOf('"', p);
            name = "channel/" + albumIDwithAuthkey.substring(p, i);
          }
        } else {
          p = albumIDwithAuthkey.indexOf('<a href="/channel/') + 10;
          i = albumIDwithAuthkey.indexOf('"', p);
          name = albumIDwithAuthkey.substring(p, i);
        }
        if ("playlist" === type) {
          p = albumIDwithAuthkey.indexOf('" dir="ltr">') + 12;
          i = albumIDwithAuthkey.indexOf("</a><span", p);
          t = albumIDwithAuthkey.substring(p, i);
          if (albumIDwithAuthkey.indexOf('<div class="yt-lockup-byline ">YouTube</div>') !== -1) {
            /** @type {string} */
            name = "";
          }
          p = albumIDwithAuthkey.indexOf('<a href="/watch?v=') + 9;
          i = albumIDwithAuthkey.indexOf('"', p);
          playlistId = albumIDwithAuthkey.substring(p, i).replace("&amp;", "&");
          p = albumIDwithAuthkey.indexOf('" dir="ltr">') + 12;
          i = albumIDwithAuthkey.indexOf("<", p);
          a = albumIDwithAuthkey.substring(p, i);
          items.push({
            value : 1,
            playlistId : playlistId,
            channel : {
              title : a.substr(0, 100),
              id : name
            },
            title : t.substr(0, 100),
            icon : awesomeIcon,
            type : "playlist",
            channelTitle : a.substr(0, 100),
            viewCount : " ",
            duration : " ",
            publishedAt : " ",
            locale : {
              publishedAt : " ",
              viewCount : " ",
              channelTitle : a.substr(0, 100)
            }
          });
        }
        if ("video" === type) {
          p = albumIDwithAuthkey.indexOf('data-context-item-id="') + 22;
          i = albumIDwithAuthkey.indexOf('"', p);
          packageId = albumIDwithAuthkey.substring(p, i);
          p = albumIDwithAuthkey.indexOf('<span class="video-time" aria-hidden="true">') + 44;
          i = albumIDwithAuthkey.indexOf("</span>", p);
          n = albumIDwithAuthkey.substring(p, i);
          p = albumIDwithAuthkey.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
          i = albumIDwithAuthkey.indexOf(" ", p);
          s = albumIDwithAuthkey.substring(p, i);
          p = albumIDwithAuthkey.indexOf("</li><li>", p) + 9;
          i = albumIDwithAuthkey.indexOf("</li></ul></div>", p);
          r = albumIDwithAuthkey.substring(p, i);
          p = albumIDwithAuthkey.indexOf('" dir="ltr">') + 12;
          if (11 === p) {
            p = albumIDwithAuthkey.indexOf(' dir="ltr">') + 11;
            if (10 === p) {
              p = albumIDwithAuthkey.indexOf('" dir="rtl">') + 12;
            }
          }
          i = albumIDwithAuthkey.indexOf("</", p);
          t = albumIDwithAuthkey.substring(p, i);
          p = albumIDwithAuthkey.indexOf('<a href="', i);
          p = albumIDwithAuthkey.indexOf(">", p) + 1;
          i = albumIDwithAuthkey.indexOf("</a>", p);
          a = albumIDwithAuthkey.substring(p, i);
          items.push({
            value : 1,
            id : packageId,
            channelTitle : a.substr(0, 100),
            duration : hide ? "" : n.substr(0, 100),
            realDuration : hide ? "" : n.substr(0, 100),
            viewCount : s.substr(0, 100),
            publishedAt : hide ? "" : r.substr(0, 100),
            dimension : "",
            definition : "",
            title : t.substr(0, 100),
            icon : awesomeIcon,
            channelId : name,
            type : "video",
            locale : {
              publishedAt : hide ? "" : r.substr(0, 100),
              viewCount : s.substr(0, 100),
              channelTitle : a.substr(0, 100)
            }
          });
        }
      }
    }
    return items;
  }
  /**
   * @return {undefined}
   */
  function Router() {
    NumericType.call(this);
    this.pages = {};
  }
  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  /** @type {!Object} */
  Router.prototype = Object.create(NumericType.prototype);
  /** @type {function(): undefined} */
  Router.prototype.constructor = Router;
  /**
   * @param {!Object} page
   * @param {!Function} callback
   * @return {undefined}
   */
  Router.prototype.getPage = function(page, callback) {
    var state = this;
    /** @type {number} */
    page.page = +page.page || 0;
    if (this.pages[page.page] && this.pages[page.page].parseId) {
      if (this.pages[page.page].cached) {
        callback(null, this.pages[page.page].data);
      } else {
        ajax("get", "https://www.youtube.com" + this.pages[page.page].parseId, function(cookie, mmCoreSecondsYear) {
          var data;
          var interestingPoint;
          var a;
          var b;
          var resizewidth;
          if (200 !== mmCoreSecondsYear) {
            return void callback({
              message : "request got bad http status (" + mmCoreSecondsYear + ")"
            }, []);
          }
          try {
            /** @type {*} */
            data = JSON.parse(cookie);
          } catch (viewportCenter) {
            interestingPoint = viewportCenter;
            /** @type {string} */
            data = "";
          }
          return data ? (data.load_more_widget_html.trim().length > 10 ? (a = data.load_more_widget_html.indexOf('data-uix-load-more-href="') + 25, b = data.load_more_widget_html.indexOf('"', a), resizewidth = data.load_more_widget_html.substring(a, b).replace(/&amp;/g, "&")) : resizewidth = "", state.pages[page.page + 1] = {
            parseId : resizewidth,
            cached : false
          }, state.pages[page.page].cached = true, state.pages[page.page].data = resolve(data.content_html), void callback(null, state.pages[page.page].data)) : void callback({
            message : "parse error for page id " + state.pages[page.page].parseId,
            code : interestingPoint
          }, []);
        });
      }
    } else {
      if (page.page) {
        if (this.pages[page.page] && !this.pages[page.page].parseId) {
          callback(null, []);
        } else {
          callback({
            message : "wrong page number (page id not found in cache)"
          }, []);
        }
      } else {
        ajax("get", "https://www.youtube.com/", function(s, a) {
          var e;
          var j;
          var i;
          return 200 !== a ? void callback({
            message : "request got bad http status (" + a + ")"
          }, []) : (j = s.indexOf('data-uix-load-more-href="') + 25, i = s.indexOf('"', j), state.pages[page.page + 1] = {
            parseId : s.substring(j, i).replace(/&amp;/g, "&"),
            cached : false
          }, e = s.slice(s.indexOf('id="feed-main-'), s.indexOf('id="feed-error"')), state.pages[0] = {
            cached : true,
            parseId : "   ",
            data : resolve(e)
          }, void callback(null, state.pages[0].data));
        });
      }
    }
  };
  /**
   * @return {?}
   */
  Router.prototype.filter = function() {
    return false;
  };
  /** @type {function(): undefined} */
  module.exports = Router;
}, function(context, canCreateDiscussions, $) {
  var c;
  var notifyComment;
  var a;
  /** @type {string} */
  var i = "ps";
  var options = $(13);
  var self = $(1);
  var $realtime = $(22);
  var expected = $(58);
  var RootView = $(37);
  var model = $(59);
  var n = $(36);
  var that = new ($(60));
  var v = $(61);
  var Navigation = $(25);
  var element = ($(15), new $realtime({
    $node : document.getElementById(i)
  }));
  var input = new expected({
    $node : document.getElementById("psSearch"),
    $body : document.getElementById("psSearchInput")
  });
  var searchContactPanel = $(27);
  /** @type {boolean} */
  var x = true;
  /** @type {string} */
  var postcssUnprocessedInputText = " ";
  /** @type {null} */
  var ctrl = null;
  /** @type {number} */
  var _takingTooLongTimeout = -1;
  element.addListener("keydown", function(event) {
    if (event.code === options.back) {
      self.route(self.pages.main);
      /** @type {boolean} */
      event.stop = true;
    }
  });
  element.addListener("hide", function() {
    searchContactPanel.hide();
  });
  notifyComment = v(function(action) {
    postcssUnprocessedInputText = action.value;
    ctrl.model.filter({
      searchQuery : action.value
    });
    clearTimeout(_takingTooLongTimeout);
    /** @type {number} */
    _takingTooLongTimeout = setTimeout(function() {
      searchContactPanel.hide();
    }, 5E3);
  }, 1E3);
  element.addListener("show", function(match) {
    match = match.data || {};
    Navigation.updateView({
      SEARCH : {
        icon : "search",
        visible : false,
        text : ""
      },
      MORE : {
        icon : "more",
        visible : false,
        text : ""
      },
      GUIDE : {
        icon : "info",
        visible : false,
        text : ""
      },
      BACK : {
        icon : "back",
        visible : true,
        text : gettext("Back")
      }
    });
    searchContactPanel.hide();
    if (!element.activeComponent) {
      if (x) {
        /** @type {string} */
        window.psSearchIcon.style.display = "block";
        setTimeout(function() {
          /** @type {string} */
          window.psSearchIcon.style.display = "inline-table";
        }, 0);
      }
      if (!(null !== element.activeComponent && element.activeComponent !== input)) {
        setTimeout(function() {
          input.focus();
          window.searchInput = input;
          if (match.search) {
            input.setValue(match.search);
          }
        }, 0);
      }
    }
  });
  (function() {
    c = $(62);
    input.addListener("keydown", function(event) {
      if (event.code === options.down) {
        a = input.getCaretPosition();
        c.focus();
      } else {
        if (event.code === options.up && ctrl.visible) {
          ctrl.focus();
          if (!ctrl.$focusItem) {
            ctrl.focusIndex(0);
          }
        } else {
          if (event.code === options.back && 0 === this.$body.value.length) {
            self.route(self.pages.main);
            /** @type {boolean} */
            event.stop = true;
          }
        }
      }
    });
    input.addListener("input", function(comment) {
      ctrl.hide();
      searchContactPanel.show();
      notifyComment(comment);
    });
    c.addListener("overflow", function(data) {
      if (data.direction === options.up) {
        input.focus();
      }
    });
    c.addListener("click:item", function(context) {
      if ("symbol" === context.$item.data.className) {
        input.addChar(context.$item.data.value, a);
        ++a;
      } else {
        if (context.$item.data.className.indexOf("keySpace") !== -1) {
          input.addChar(" ", a);
          a = input.getCaretPosition();
        } else {
          if (context.$item.data.className.indexOf("keyDelete") !== -1) {
            input.removeChar();
            a = input.getCaretPosition();
          } else {
            if (context.$item.data.className.indexOf("delete") !== -1) {
              input.setValue("");
              a = input.getCaretPosition();
            }
          }
        }
      }
    });
    c.addListener("keydown", function() {
      notifyComment({
        value : input.value
      });
    });
    ctrl = new RootView({
      $node : document.getElementById("psListVideos"),
      model : new model({
        order : "relevance"
      }),
      className : "movieList",
      size : 5,
      events : {
        keydown : function(event) {
          switch(event.code) {
            case options.down:
              input.focus();
              break;
            case options.right:
              if (this.$focusItem.index < this.data.length - 1) {
                if (this.$focusItem.index > 0) {
                  this.activePage++;
                  this.renderView(this.activePage);
                } else {
                  this.focusIndex(1);
                }
              }
              break;
            case options.left:
              if (this.activePage > 0) {
                this.activePage--;
                this.renderView(this.activePage);
              } else {
                if (1 === this.$focusItem.index) {
                  this.focusIndex(0);
                } else {
                  this.move(event.code);
                }
              }
              break;
            case options.ok:
              this.emit("click:item", {
                $item : this.$focusItem,
                event : event
              });
          }
        },
        "click:item" : function(context) {
          if ("video" === context.$item.data.type) {
            n.setContent({
              video : context.$item.data,
              playlist : this.data,
              position : context.$item.index
            });
          } else {
            if ("playlist" === context.$item.data.type) {
              that.getPage({
                playlistId : context.$item.data.playlistId
              }, function(canCreateDiscussions, results) {
                n.setContent({
                  channel : context.$item.data.channel,
                  video : results[0],
                  playlist : results,
                  position : 0
                });
              });
            } else {
              if ("channel" === context.$item.data.type) {
                self.route(self.pages.main, {
                  channel : context.$item.data
                });
              }
            }
          }
        },
        "view:ready" : function() {
          clearTimeout(_takingTooLongTimeout);
          searchContactPanel.hide();
          this.show();
          this.focusIndex(0);
        }
      },
      render : function(node, data) {
        var body;
        var n;
        var s;
        if (node.ready) {
          /** @type {string} */
          node.$videoThumb.className = "thumb " + data.type;
          /** @type {string} */
          node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
          node.$videoTitle.innerText = data.title;
          /** @type {string} */
          node.$videoTitle.className = "title " + data.type;
          /** @type {string} */
          node.$videoAthour.className = "uploader " + data.type;
          if ("video" === data.type) {
            node.$videoAthour.innerText = data.locale.channelTitle;
            node.$viewCounter.innerText = data.locale.viewCount;
            node.$dateAdded.innerText = data.locale.publishedAt;
            node.$videoDuration.innerText = data.duration;
          } else {
            if ("channel" === data.type) {
              node.$videoAthour.innerText = data.locale.subscriberCount;
              /** @type {string} */
              node.$viewCounter.innerText = "";
              /** @type {string} */
              node.$dateAdded.innerText = "";
              /** @type {string} */
              node.$videoDuration.innerText = "";
            } else {
              node.$videoAthour.innerText = data.locale.channelTitle;
              /** @type {string} */
              node.$viewCounter.innerText = "";
              /** @type {string} */
              node.$dateAdded.innerText = "";
              /** @type {string} */
              node.$videoDuration.innerText = "";
            }
          }
          if ("playlist" === data.type) {
            /** @type {string} */
            node.$videoDuration.className = "icon playlist";
          } else {
            /** @type {string} */
            node.$videoDuration.className = "duration";
          }
        } else {
          /** @type {!Element} */
          body = document.createElement("div");
          /** @type {string} */
          body.className = "container";
          node.appendChild(body);
          /** @type {!Element} */
          n = document.createElement("div");
          /** @type {string} */
          n.className = "tileTop";
          body.appendChild(n);
          /** @type {!Element} */
          s = document.createElement("div");
          /** @type {string} */
          s.className = "tileBottom";
          body.appendChild(s);
          /** @type {!Element} */
          node.$videoThumb = document.createElement("div");
          /** @type {string} */
          node.$videoThumb.className = "thumb " + data.type;
          /** @type {string} */
          node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
          n.appendChild(node.$videoThumb);
          /** @type {!Element} */
          node.$videoDuration = document.createElement("div");
          if ("playlist" === data.type) {
            /** @type {string} */
            node.$videoDuration.className = "icon playlist";
          } else {
            /** @type {string} */
            node.$videoDuration.className = "duration";
          }
          if (data.duration) {
            node.$videoDuration.innerText = data.duration;
          } else {
            /** @type {string} */
            node.$videoDuration.innerText = "";
          }
          n.appendChild(node.$videoDuration);
          /** @type {!Element} */
          node.$videoTitle = document.createElement("div");
          /** @type {string} */
          node.$videoTitle.className = "title " + data.type;
          node.$videoTitle.innerText = data.title;
          s.appendChild(node.$videoTitle);
          /** @type {!Element} */
          node.$videoAthour = document.createElement("div");
          /** @type {string} */
          node.$videoAthour.className = "uploader " + data.type;
          if (data.channelTitle) {
            node.$videoAthour.innerText = data.locale.channelTitle;
          } else {
            if ("channel" === data.type) {
              node.$videoAthour.innerText = data.locale.subscriberCount;
            } else {
              /** @type {string} */
              node.$videoAthour.innerText = "";
            }
          }
          s.appendChild(node.$videoAthour);
          /** @type {!Element} */
          node.$viewCounter = document.createElement("div");
          /** @type {string} */
          node.$viewCounter.className = "viewCount";
          if ("video" === data.type) {
            node.$viewCounter.innerText = data.locale.viewCount;
          } else {
            /** @type {string} */
            node.$viewCounter.innerText = "";
          }
          s.appendChild(node.$viewCounter);
          /** @type {!Element} */
          node.$dateAdded = document.createElement("div");
          /** @type {string} */
          node.$dateAdded.className = "uploaded";
          if ("video" === data.type) {
            node.$dateAdded.innerText = data.locale.publishedAt;
          } else {
            /** @type {string} */
            node.$dateAdded.innerText = "";
          }
          s.appendChild(node.$dateAdded);
          /** @type {boolean} */
          node.ready = true;
        }
      }
    });
  })();
  context.exports = element;
}, function(context, canCreateDiscussions, parse) {
  /**
   * @param {!Object} config
   * @return {undefined}
   */
  function init(config) {
    var that = this;
    /** @type {string} */
    this.value = "";
    this.type = this.TYPE_TEXT;
    this.type = this.TYPE_TEXT;
    /** @type {string} */
    this.direction = "ltr";
    /** @type {boolean} */
    this.noprevent = true;
    config = config || {};
    /** @type {string} */
    config.className = "inputNative " + (config.className || "");
    b.call(this, config);
    this.init(config);
    this.addListener("keydown", function(event) {
      if (event.code === options.back) {
        /** @type {boolean} */
        event.stop = true;
      }
    });
    this.$body.addEventListener("input", function(canCreateDiscussions) {
      that.value = that.$body.value;
      if (void 0 !== that.events["input"]) {
        that.emit("input", {
          value : that.$body.value
        });
      }
    });
    this.addListener("focus", function() {
      that.$body.focus();
    });
    this.addListener("blur", function() {
      that.$body.blur();
    });
  }
  var b = parse(31);
  var options = parse(13);
  /** @type {!Object} */
  init.prototype = Object.create(b.prototype);
  /** @type {function(!Object): undefined} */
  init.prototype.constructor = init;
  /**
   * @param {!Object} data
   * @return {undefined}
   */
  init.prototype.init = function(data) {
    if (void 0 !== data.type) {
      this.$body.type = this.type = data.type;
    }
    if (void 0 !== data.value) {
      this.$body.value = this.value = data.value;
    }
    if (void 0 !== data.placeholder) {
      this.$body.placeholder = data.placeholder;
    }
    if (void 0 !== data.direction) {
      this.$node.dir = this.direction = data.direction;
    }
  };
  /**
   * @param {string} char
   * @param {number} index
   * @return {undefined}
   */
  init.prototype.addChar = function(char, index) {
    index = void 0 === index ? this.value.length : index;
    this.value = this.value.substring(0, index) + char + this.value.substring(index, this.value.length);
    this.$body.value = this.value;
    if (void 0 !== this.events["input"]) {
      this.emit("input", {
        value : this.value
      });
    }
  };
  /**
   * @param {number} index
   * @return {undefined}
   */
  init.prototype.removeChar = function(index) {
    index = void 0 === index ? this.value.length - 1 : index;
    if (this.value.length > 0) {
      this.value = this.value.substring(0, index) + this.value.substring(index + 1, this.value.length);
      this.$body.value = this.value;
      if (void 0 !== this.events["input"]) {
        this.emit("input", {
          value : this.value
        });
      }
    }
    this.$body.value = this.value;
  };
  /**
   * @param {number} start
   * @return {undefined}
   */
  init.prototype.setCaretPosition = function(start) {
    this.$body.setSelectionRange(start, start);
  };
  /**
   * @return {?}
   */
  init.prototype.getCaretPosition = function() {
    return this.$body.selectionStart;
  };
  /**
   * @param {string} value
   * @return {undefined}
   */
  init.prototype.setValue = function(value) {
    if (this.value !== value) {
      /** @type {string} */
      this.value = value;
      this.$body.value = this.value;
      if (void 0 !== this.events["input"]) {
        this.emit("input", {
          value : this.value
        });
      }
    }
  };
  /** @type {function(!Object): undefined} */
  context.exports = init;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} src
   * @return {?}
   */
  function parse(src) {
    var type;
    var c;
    var r;
    var m;
    var config;
    var sum;
    var h;
    var awesomeIcon;
    var name;
    var playlistId;
    var js;
    var n;
    var data;
    var o;
    var crossfilterable_layers;
    var layer_i;
    var cmp;
    var hide;
    /** @type {!Array} */
    var items = [];
    crossfilterable_layers = src.split('<div class="yt-lockup yt-lockup-tile ');
    /** @type {number} */
    layer_i = 0;
    for (; layer_i < crossfilterable_layers.length; layer_i++) {
      if (cmp = crossfilterable_layers[layer_i], cmp.indexOf("yt-lockup-content") !== -1) {
        if (cmp.indexOf("yt-lockup-playlist") !== -1) {
          /** @type {string} */
          type = "playlist";
        } else {
          if (cmp.indexOf("yt-lockup-channel") !== -1) {
            /** @type {string} */
            type = "channel";
          } else {
            if (cmp.indexOf("yt-lockup-video") === -1 || cmp.indexOf("branded-page-module") !== -1 || cmp.indexOf("data-set-reminder-text") !== -1) {
              continue;
            }
            /** @type {boolean} */
            hide = cmp.indexOf("yt-badge-live") !== -1;
            /** @type {string} */
            type = "video";
          }
        }
        data = cmp.indexOf("//i.ytimg");
        o = cmp.indexOf('"', data);
        awesomeIcon = "https:" + cmp.substring(data, o).replace(/&amp;/g, "&");
        data = cmp.indexOf('" dir="ltr">') + 12;
        if (11 === data) {
          data = cmp.indexOf(' dir="ltr">') + 11;
          if (10 === data) {
            data = cmp.indexOf('" dir="rtl">') + 12;
          }
        }
        o = cmp.indexOf("</", data);
        h = cmp.substring(data, o);
        if (cmp.indexOf('<a href="/channel/') === -1) {
          if (cmp.indexOf("data-channel-external-id=") === -1) {
            if (cmp.indexOf('<a href="/user/') === -1) {
              /** @type {string} */
              name = "";
            } else {
              data = cmp.indexOf('<a href="/user/') + 10;
              o = cmp.indexOf('"', data);
              name = cmp.substring(data, o);
            }
          } else {
            data = cmp.indexOf('data-channel-external-id="') + 26;
            o = cmp.indexOf('"', data);
            name = "channel/" + cmp.substring(data, o);
          }
        } else {
          data = cmp.indexOf('<a href="/channel/') + 10;
          o = cmp.indexOf('"', data);
          name = cmp.substring(data, o);
        }
        if ("playlist" === type) {
          if (cmp.indexOf('<div class="yt-lockup-byline ">YouTube</div>') !== -1) {
            /** @type {string} */
            name = "";
          }
          data = cmp.indexOf('<a href="/watch?v=') + 9;
          o = cmp.indexOf('"', data);
          playlistId = cmp.substring(data, o).replace("&amp;", "&");
          data = cmp.indexOf('" dir="ltr">', o) + 12;
          o = cmp.indexOf("<", data);
          r = cmp.substring(data, o);
          items.push({
            value : 1,
            playlistId : playlistId,
            channel : {
              title : r.substr(0, 100),
              id : name
            },
            title : h.substr(0, 100),
            icon : awesomeIcon,
            type : "playlist",
            channelTitle : r.substr(0, 100),
            viewCount : " ",
            duration : " ",
            publishedAt : " ",
            locale : {
              publishedAt : " ",
              viewCount : " ",
              channelTitle : r.substr(0, 100)
            }
          });
        }
        if ("video" === type) {
          data = cmp.indexOf('href="/watch?v=') + 15;
          o = cmp.indexOf('"', data);
          c = cmp.substring(data, o);
          data = cmp.indexOf('<a href="', data);
          data = cmp.indexOf(">", data) + 1;
          o = cmp.indexOf("</a>", data);
          r = cmp.substring(data, o);
          data = cmp.indexOf('<span class="video-time" aria-hidden="true">') + 44;
          if (43 === data) {
            data = cmp.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
          }
          o = cmp.indexOf("</", data);
          m = cmp.substring(data, o);
          data = cmp.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
          o = cmp.indexOf("</", data);
          sum = cmp.substring(data, o);
          if (hide) {
            data = cmp.indexOf('<ul class="yt-lockup-meta-info"><li>') + 36;
            o = cmp.indexOf("<", data);
          } else {
            data = cmp.indexOf("</li><li>", data) + 9;
            o = cmp.indexOf(" ", data);
          }
          config = cmp.substring(data, o);
          items.push({
            value : 1,
            id : c,
            channelTitle : r.substr(0, 100),
            duration : hide ? "" : m.substr(0, 100),
            realDuration : hide ? "" : m.substr(0, 100),
            viewCount : config.substr(0, 100),
            publishedAt : hide ? "" : sum.substr(0, 100),
            dimension : "",
            definition : "",
            title : h.substr(0, 100),
            icon : awesomeIcon,
            channelId : name,
            type : "video",
            locale : {
              publishedAt : hide ? "" : sum.substr(0, 100),
              viewCount : config.substr(0, 100),
              channelTitle : r.substr(0, 100)
            }
          });
        }
        if ("channel" === type) {
          data = cmp.indexOf("//yt");
          o = cmp.indexOf('"', data);
          awesomeIcon = "https:" + cmp.substring(data, o);
          data = cmp.indexOf('" dir="ltr">') + 12;
          o = cmp.indexOf("<", data);
          h = cmp.substring(data, o);
          if (cmp.indexOf("yt-channel-title-autogenerated") === -1) {
            data = cmp.indexOf('"yt-lockup-meta-info"><li>') + 26;
            o = cmp.indexOf(" ", data);
            js = cmp.substring(data, o);
          } else {
            /** @type {string} */
            js = "";
          }
          data = cmp.indexOf('yt-subscriber-count" title="') + 28;
          o = cmp.indexOf('"', data);
          n = cmp.substring(data, o);
          items.push({
            value : 1,
            id : name,
            title : h.substr(0, 100),
            icon : awesomeIcon,
            type : "channel",
            viewCount : "",
            commentCount : "",
            subscriberCount : n.substr(0, 100),
            hiddenSubscriberCount : "",
            videoCount : js.substr(0, 100),
            locale : {
              subscriberCount : n.substr(0, 100)
            }
          });
        }
      }
    }
    return items;
  }
  /**
   * @param {!Object} name
   * @return {undefined}
   */
  function Router(name) {
    NumericType.call(this);
    this.pages = {};
    /** @type {string} */
    this.searchQuery = "";
    this.filter(name);
  }
  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  /** @type {!Object} */
  Router.prototype = Object.create(NumericType.prototype);
  /** @type {function(!Object): undefined} */
  Router.prototype.constructor = Router;
  /**
   * @param {!Object} page
   * @param {!Function} callback
   * @return {undefined}
   */
  Router.prototype.getPage = function(page, callback) {
    var state = this;
    /** @type {number} */
    page.page = +page.page || 0;
    if (this.pages[page.page] && this.pages[page.page].parseId) {
      if (this.pages[page.page].cached) {
        callback(null, this.pages[page.page].data);
      } else {
        ajax("get", "https://www.youtube.com" + this.pages[page.page].parseId, function(s, a) {
          var tokens;
          var j;
          var i;
          var resizewidth;
          return 200 !== a ? void callback({
            message : "request got bad http status (" + a + ")"
          }, []) : (j = s.indexOf('class="branded-page-box search-pager'), i = s.indexOf('class="branded-page-v2-secondary-col', j), tokens = s.substring(j, i), tokens = tokens.split('<a href="'), tokens[tokens.length - 1] && tokens[tokens.length - 1].indexOf("\u00bb") !== -1 ? (j = tokens[tokens.length - 1].indexOf('href="/results?') + 6, i = tokens[tokens.length - 1].indexOf('"', j), resizewidth = tokens[tokens.length - 1].substring(j, i).replace("&amp;", "&")) : resizewidth = "", state.pages[page.page +
          1] = {
            parseId : resizewidth,
            cached : false
          }, tokens = s.slice(s.indexOf('id="item-section-'), s.indexOf('class="branded-page-box search-pager')), state.pages[page.page] = {
            cached : true,
            data : parse(tokens)
          }, void callback(null, state.pages[page.page].data));
        });
      }
    } else {
      if (page.page) {
        if (this.pages[page.page] && !this.pages[page.page].parseId) {
          callback(null, []);
        } else {
          callback({
            message : "wrong page number (page id not found in cache)"
          }, []);
        }
      } else {
        ajax("get", "https://www.youtube.com/results?search_query=" + this.searchQuery, function(s, a) {
          var tokens;
          var j;
          var i;
          var resizewidth;
          return 200 !== a ? void callback({
            message : "request got bad http status (" + a + ")"
          }, []) : (j = s.indexOf('class="branded-page-box search-pager'), i = s.indexOf('class="branded-page-v2-secondary-col', j), tokens = s.substring(j, i), tokens = tokens.split('<a href="'), tokens[tokens.length - 1] && tokens[tokens.length - 1].indexOf("\u00bb") !== -1 ? (j = tokens[tokens.length - 1].indexOf('href="/results?') + 6, i = tokens[tokens.length - 1].indexOf('"', j), resizewidth = tokens[tokens.length - 1].substring(j, i).replace("&amp;", "&")) : resizewidth = "", state.pages[page.page +
          1] = {
            parseId : resizewidth,
            cached : false
          }, tokens = s.slice(s.indexOf('id="item-section-'), s.indexOf('class="branded-page-box search-pager')), state.pages[0] = {
            cached : true,
            parseId : "/results?search_query=" + state.searchQuery,
            data : parse(tokens)
          }, void callback(null, state.pages[0].data));
        });
      }
    }
  };
  /**
   * @param {!Function} params
   * @return {?}
   */
  Router.prototype.filter = function(params) {
    /** @type {boolean} */
    var t = false;
    return void 0 !== params.searchQuery && this.searchQuery !== params.searchQuery && (t = true, this.searchQuery = params.searchQuery), !!t && (this.pages = {}, this.emit("content:changed", params), true);
  };
  /** @type {function(!Object): undefined} */
  module.exports = Router;
}, function(module, canCreateDiscussions, require) {
  /**
   * @param {string} fn
   * @param {number} name
   * @return {?}
   */
  function resolve(fn, name) {
    var token;
    var str;
    var text;
    var awesomeIcon;
    var crossfilterable_layers;
    var index;
    var end;
    var template_string;
    var layer_i;
    /** @type {!Array} */
    var arr = [];
    crossfilterable_layers = fn.split('<li class="yt-uix-scroller-scroll-unit');
    /** @type {number} */
    layer_i = 0;
    for (; layer_i < crossfilterable_layers.length; layer_i++) {
      template_string = crossfilterable_layers[layer_i];
      if (template_string.indexOf('<div class="playlist-video-description">') !== -1) {
        index = template_string.indexOf('<span class="video-uploader-byline">') + 36;
        end = template_string.indexOf("</span>", index);
        if (template_string.substring(index, end).trim()) {
          index = template_string.indexOf('data-video-id="') + 15;
          end = template_string.indexOf('"', index);
          token = template_string.substring(index, end);
          index = template_string.indexOf('data-video-title="') + 18;
          end = template_string.indexOf('"', index);
          text = template_string.substring(index, end);
          index = template_string.indexOf('="https://i.ytimg') + 2;
          end = template_string.indexOf('"', index);
          awesomeIcon = template_string.substring(index, end).replace(/&amp;/g, "&");
          index = template_string.indexOf('data-video-username="') + 21;
          end = template_string.indexOf('"', index);
          str = template_string.substring(index, end);
          arr.push({
            value : 1,
            id : token,
            channelTitle : str,
            duration : " ",
            realDuration : " ",
            viewCount : " ",
            publishedAt : " ",
            dimension : "",
            definition : "",
            title : text,
            icon : awesomeIcon,
            channelId : name,
            type : "video",
            locale : {
              publishedAt : " ",
              viewCount : " ",
              channelTitle : str
            }
          });
        }
      }
    }
    return arr;
  }
  /**
   * @return {undefined}
   */
  function Router() {
    NumericType.call(this);
    this.pages = {};
    /** @type {null} */
    this.playlistId = null;
  }
  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  /** @type {!Object} */
  Router.prototype = Object.create(NumericType.prototype);
  /** @type {function(): undefined} */
  Router.prototype.constructor = Router;
  /**
   * @param {!Object} data
   * @param {!Function} callback
   * @return {?}
   */
  Router.prototype.getPage = function(data, callback) {
    var childSection = this;
    return data.page = data.page || 0, data.playlistId ? (data.playlistId !== this.playlistId && (this.playlistId = data.playlistId, this.pages = {}), data.page ? void callback(null, []) : void(this.pages[0] ? callback(null, this.pages[0].data) : ajax("get", "https://www.youtube.com" + data.playlistId, function(s, a) {
      var e;
      var j;
      var i;
      var track;
      return 200 !== a ? void callback({
        message : "request got bad http status (" + a + ")"
      }, []) : (j = s.indexOf('<a href="/channel/') + 10, i = s.indexOf('"', j), track = s.substring(j, i), j = s.indexOf('id="playlist-autoscroll-list"'), i = s.indexOf('id="placeholder-player"', j), e = s.slice(j, i), childSection.pages[0] = {
        cached : true,
        parseId : data.playlistId.replace(/&amp;/g, "&"),
        data : resolve(e, track)
      }, void callback(null, childSection.pages[0].data));
    }))) : void callback({
      message : "error: field arguments[0].playlistId is empty"
    }, []);
  };
  /**
   * @return {?}
   */
  Router.prototype.filter = function() {
    return false;
  };
  /** @type {function(): undefined} */
  module.exports = Router;
}, function(mixin, canCreateDiscussions) {
  /**
   * @param {!Function} _
   * @param {?} t
   * @return {?}
   */
  mixin.exports = function(_, t) {
    var redrawTimeout;
    return function() {
      var andClause = this;
      /** @type {!Arguments} */
      var others = arguments;
      clearTimeout(redrawTimeout);
      /** @type {number} */
      redrawTimeout = setTimeout(function() {
        /** @type {null} */
        redrawTimeout = null;
        _.apply(andClause, others);
      }, t);
    };
  };
}, function(blob, canCreateDiscussions, unescape) {
  var $first;
  var v = unescape(1);
  var ContentBlock = unescape(63);
  var path = unescape(42);
  var n = unescape(15);
  var content = new ContentBlock({
    $node : document.getElementById("psKeyboard"),
    className : "keyList",
    cycleY : false,
    events : {
      "click:item" : function(context) {
        if (context.$item.data.className.indexOf("keyGlobe") !== -1) {
          v.settings.keyboardLanguage = path.nextLang(v.settings.keyboardLanguage);
          /** @type {null} */
          this.viewIndex = null;
          this.init({
            data : unescape(65)("./" + n.languages[v.settings.keyboardLanguage])
          });
          this.focusItem($first);
          window.top.gSTB.SetInputLang(n.languages[v.settings.keyboardLanguage]);
        } else {
          if (context.$item.data.className.indexOf("nums") !== -1) {
            this.init({
              data : [[{
                value : "1",
                className : "symbol"
              }, {
                value : "2",
                className : "symbol"
              }, {
                value : "3",
                className : "symbol"
              }, {
                value : "^",
                className : "symbol"
              }, {
                value : "`",
                className : "symbol"
              }, {
                value : "!",
                className : "symbol"
              }, {
                value : "#",
                className : "symbol"
              }, {
                value : "$",
                className : "symbol"
              }, {
                value : "%",
                className : "symbol"
              }], [{
                value : "4",
                className : "symbol"
              }, {
                value : "5",
                className : "symbol"
              }, {
                value : "6",
                className : "symbol"
              }, {
                value : "&",
                className : "symbol"
              }, {
                value : "(",
                className : "symbol"
              }, {
                value : ")",
                className : "symbol"
              }, {
                value : "*",
                className : "symbol"
              }, {
                value : ";",
                className : "symbol"
              }, {
                value : ":",
                className : "symbol"
              }], [{
                value : "7",
                className : "symbol"
              }, {
                value : "8",
                className : "symbol"
              }, {
                value : "9",
                className : "symbol"
              }, {
                value : "~",
                className : "symbol"
              }, {
                value : "/",
                className : "symbol"
              }, {
                value : "|",
                className : "symbol"
              }, {
                value : "%",
                className : "symbol"
              }, {
                value : ":",
                className : "symbol"
              }, {
                value : "?",
                className : "symbol"
              }], [{
                value : "\u2116",
                className : "symbol"
              }, {
                value : "0",
                className : "symbol"
              }, {
                value : "[",
                className : "symbol"
              }, {
                value : "]",
                className : "symbol"
              }, {
                value : '"',
                className : "symbol"
              }, {
                value : "'",
                className : "symbol"
              }, {
                value : "{",
                className : "symbol"
              }, {
                value : "}",
                className : "symbol"
              }, {
                value : "ABC",
                className : "symbol letters"
              }]]
            });
          } else {
            if (context.$item.data.className.indexOf("letters") !== -1) {
              this.init({
                data : unescape(65)("./" + n.languages[v.settings.keyboardLanguage])
              });
            }
          }
        }
      }
    },
    render : function(fn, el) {
      if ("keyGlobe" === el.className) {
        fn.innerHTML = n.languagesCodeLocalized[v.settings.keyboardLanguage];
        /** @type {!Object} */
        $first = fn;
      } else {
        fn.innerHTML = el.value;
      }
      if (el.className) {
        /** @type {string} */
        fn.className = "item " + el.className;
      }
    },
    data : unescape(65)("./" + n.languages[v.settings.keyboardLanguage])
  });
  window.top.gSTB.SetInputLang(n.languages[v.settings.keyboardLanguage]);
  blob.exports = content;
}, function(module, canCreateDiscussions, factory) {
  module.exports = factory(64);
  /** @type {string} */
  module.exports.prototype.name = "stb-component-grid";
}, function(module, canCreateDiscussions, d3MapProjection) {
  /**
   * @param {!Object} config
   * @return {undefined}
   */
  function Node(config) {
    config = config || {};
    /** @type {!Array} */
    this.map = [];
    /** @type {null} */
    this.$focusItem = null;
    /** @type {!Array} */
    this.data = [];
    /** @type {boolean} */
    this.cycleX = true;
    /** @type {boolean} */
    this.cycleY = true;
    /** @type {number} */
    this.focusX = 0;
    /** @type {number} */
    this.focusY = 0;
    b.call(this, config);
    this.init(config);
  }
  /**
   * @param {!Array} object
   * @return {?}
   */
  function merge(object) {
    var idx;
    var i;
    var options;
    /** @type {number} */
    idx = 0;
    for (; idx < object.length; idx++) {
      /** @type {number} */
      i = 0;
      for (; i < object[idx].length; i++) {
        options = object[idx][i];
        if ("object" == typeof options) {
          options.colSpan = options.colSpan || 1;
          options.rowSpan = options.rowSpan || 1;
        } else {
          options = object[idx][i] = {
            value : object[idx][i],
            colSpan : 1,
            rowSpan : 1
          };
        }
      }
    }
    return object;
  }
  /**
   * @param {!Array} data
   * @param {number} i
   * @param {number} x
   * @param {number} y
   * @param {number} l
   * @param {!Object} a
   * @return {undefined}
   */
  function drawLine(data, i, x, y, l, a) {
    var c;
    var l;
    /** @type {number} */
    c = x;
    for (; c < x + l; c++) {
      if (data.length < c + 1) {
        data.push([]);
      }
      for (; void 0 !== data[c][i];) {
        i++;
      }
      /** @type {number} */
      l = i;
      for (; l < i + y; l++) {
        if (data[c].length < l + 1) {
          data[c].push();
        }
        /** @type {!Object} */
        data[c][l] = a;
        if (void 0 === a.x) {
          a.x = l;
        }
        if (void 0 === a.y) {
          a.y = c;
        }
      }
    }
  }
  /**
   * @param {!Array} events
   * @return {?}
   */
  function clone(events) {
    var e;
    var i;
    var item;
    /** @type {!Array} */
    var result = [];
    /** @type {number} */
    e = 0;
    for (; e < events.length; e++) {
      /** @type {number} */
      i = 0;
      for (; i < events[e].length; i++) {
        item = events[e][i];
        drawLine(result, i, e, item.colSpan, item.rowSpan, item.$item);
        delete item.$item;
      }
    }
    return result;
  }
  var b = d3MapProjection(24);
  var c = d3MapProjection(14);
  /** @type {!Object} */
  Node.prototype = Object.create(b.prototype);
  /** @type {function(!Object): undefined} */
  Node.prototype.constructor = Node;
  /** @type {string} */
  Node.prototype.name = "spa-component-grid";
  /**
   * @param {!Object} val
   * @param {!Object} args
   * @return {undefined}
   */
  Node.prototype.renderItemDefault = function(val, args) {
    val.innerText = args.value;
  };
  /** @type {function(!Object, !Object): undefined} */
  Node.prototype.renderItem = Node.prototype.renderItemDefault;
  Node.prototype.defaultEvents = {
    mousewheel : function(event) {
      if (event.wheelDeltaY) {
        this.move(event.wheelDeltaY > 0 ? c.up : c.down);
      }
      if (event.wheelDeltaX) {
        this.move(event.wheelDeltaX > 0 ? c.left : c.right);
      }
    },
    keydown : function(event) {
      switch(event.code) {
        case c.up:
        case c.down:
        case c.right:
        case c.left:
          this.move(event.code);
          break;
        case c.enter:
          if (this.events["click:item"]) {
            this.emit("click:item", {
              $item : this.$focusItem,
              event : event
            });
          }
      }
    }
  };
  /**
   * @param {!Object} options
   * @return {undefined}
   */
  Node.prototype.init = function(options) {
    var t;
    var i;
    var row;
    var obj;
    var body;
    var id;
    var item;
    var fresh;
    var self = this;
    /** @type {boolean} */
    var result = false;
    /**
     * @param {string} event
     * @return {undefined}
     */
    var update = function(event) {
      if (this.data.disable !== true) {
        self.focusItem(this);
        if (self.events["click:item"]) {
          self.emit("click:item", {
            $item : this,
            event : event
          });
        }
      }
    };
    /**
     * @param {string} data
     * @return {undefined}
     */
    var render = function(data) {
      if (data && self.data !== data && (self.data = data, result = true), options.render && self.renderItem !== options.render && (self.renderItem = options.render, result = true), result) {
        /** @type {!Element} */
        self.$table = document.createElement("table");
        /** @type {!Element} */
        body = document.createElement("tbody");
        self.data = merge(self.data);
        /** @type {number} */
        t = 0;
        for (; t < self.data.length; t++) {
          row = body.insertRow();
          /** @type {number} */
          i = 0;
          for (; i < self.data[t].length; i++) {
            obj = row.insertCell(-1);
            /** @type {string} */
            obj.className = "item";
            item = self.data[t][i];
            item.$item = obj;
            obj.colSpan = item.colSpan;
            obj.rowSpan = item.rowSpan;
            if (item.focus) {
              id = obj;
            }
            if (item.disable) {
              obj.classList.add("disable");
            }
            if (item.mark) {
              obj.classList.add("mark");
            }
            self.renderItem(obj, item);
            obj.data = item;
            obj.addEventListener("click", update);
          }
          body.appendChild(row);
        }
        self.map = clone(self.data);
        /** @type {null} */
        self.$body.innerText = null;
        self.$table.appendChild(body);
        self.$body.appendChild(self.$table);
        if (id) {
          self.focusItem(id);
        } else {
          self.focusItem(self.map[0][0]);
        }
      }
    };
    if (void 0 !== options.cycleX) {
      this.cycleX = options.cycleX;
    }
    if (void 0 !== options.cycleY) {
      this.cycleY = options.cycleY;
    }
    if (options.provider) {
      this.provider = options.provider;
      this.sizeX = options.sizeX;
      this.sizeY = options.sizeY;
    }
    if (options.translate) {
      this.translate = options.translate;
    }
    if (options.provider) {
      fresh = this.provider.get(null, function(imageInfoItem, c) {
        if (imageInfoItem && self.events["data:error"]) {
          self.emit("data:error", imageInfoItem);
        }
        render(self.translate(c));
        if (self.events["data:ready"]) {
          self.emit("data:ready");
        }
      });
      if (this.events["data:get"]) {
        this.emit("data:get", {
          fresh : fresh
        });
      }
    } else {
      render(options.data);
    }
  };
  /**
   * @param {!Object} d
   * @return {?}
   */
  Node.prototype.defaultTranslate = function(d) {
    var id;
    var i;
    var dd;
    /** @type {!Array} */
    var _draggablesById = [];
    /** @type {number} */
    id = 0;
    for (; id < this.sizeY; id++) {
      /** @type {!Array} */
      dd = [];
      /** @type {number} */
      i = 0;
      for (; i < this.sizeX; i++) {
        dd[i] = d[id * this.sizeX + i];
      }
      /** @type {!Array} */
      _draggablesById[id] = dd;
    }
    return _draggablesById;
  };
  /** @type {function(!Object): ?} */
  Node.prototype.translate = Node.prototype.defaultTranslate;
  /**
   * @param {string} type
   * @return {undefined}
   */
  Node.prototype.move = function(type) {
    var fresh;
    var y = this.focusX;
    var x = this.focusY;
    /** @type {boolean} */
    var s = true;
    /** @type {boolean} */
    var a = false;
    /** @type {boolean} */
    var cycle = false;
    for (; s;) {
      switch(type) {
        case c.up:
          if (x > 0) {
            x--;
          } else {
            if (this.cycleY) {
              /** @type {number} */
              x = this.map.length - 1;
              /** @type {boolean} */
              cycle = true;
            }
            /** @type {boolean} */
            a = true;
          }
          break;
        case c.down:
          if (x < this.map.length - 1) {
            x++;
          } else {
            if (this.cycleY) {
              /** @type {number} */
              x = 0;
              /** @type {boolean} */
              cycle = true;
            }
            /** @type {boolean} */
            a = true;
          }
          break;
        case c.right:
          if (y < this.map[x].length - 1) {
            y++;
          } else {
            if (this.cycleX) {
              /** @type {number} */
              y = 0;
              /** @type {boolean} */
              cycle = true;
            }
            /** @type {boolean} */
            a = true;
          }
          break;
        case c.left:
          if (y > 0) {
            y--;
          } else {
            if (this.cycleX) {
              /** @type {number} */
              y = this.map[x].length - 1;
              /** @type {boolean} */
              cycle = true;
            }
            /** @type {boolean} */
            a = true;
          }
      }
      if (y === this.focusX && x === this.focusY) {
        /** @type {boolean} */
        s = false;
      }
      if (this.map[x][y] !== this.map[this.focusY][this.focusX] && this.map[x][y].data.disable !== true) {
        /** @type {boolean} */
        s = false;
      }
      if (a) {
        /** @type {boolean} */
        s = false;
        if (this.map[x][y].data.disable === true) {
          y = this.focusX;
          x = this.focusY;
        }
      }
    }
    this.focusItem(this.map[x][y]);
    this.focusX = y;
    this.focusY = x;
    if (a) {
      if (this.provider) {
        fresh = this.provider.get(type, function(imageInfoItem, t) {
          var collectionName;
          var i;
          if (imageInfoItem && self.events["data:error"]) {
            return void self.emit("data:error", imageInfoItem);
          }
          if (t) {
            self.data = self.translate(t);
            /** @type {number} */
            collectionName = 0;
            for (; collectionName < self.sizeY - 1; collectionName++) {
              /** @type {number} */
              i = 0;
              for (; i < self.sizeX; i++) {
                self.renderItem(self.map[collectionName][i], self.data[collectionName][i]);
              }
            }
            if (self.events["data:ready"]) {
              self.emit("data:ready");
            }
          }
        });
        if (this.events["data:get"]) {
          this.emit("data:get", {
            fresh : fresh
          });
        }
      }
      if (this.events["overflow"]) {
        this.emit("overflow", {
          direction : type,
          cycle : cycle
        });
      }
    }
  };
  /**
   * @param {!Object} item
   * @return {?}
   */
  Node.prototype.focusItem = function(item) {
    var x = this.$focusItem;
    return !(!item || x === item || item.data.disable === true) && (null !== x && (x.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
      $item : x
    })), this.focusX = item.x, this.focusY = item.y, this.$focusItem = item, item.classList.add("focus"), this.events["focus:item"] && this.emit("focus:item", {
      $prev : x,
      $curr : item
    }), true);
  };
  /**
   * @param {!Object} index
   * @param {number} options
   * @return {undefined}
   */
  Node.prototype.markItem = function(index, options) {
    if (options) {
      index.classList.add("mark");
    } else {
      index.classList.remove("mark");
    }
    /** @type {number} */
    index.data.mark = options;
  };
  /** @type {function(!Object): undefined} */
  module.exports = Node;
}, function(context, canCreateDiscussions, func) {
  /**
   * @param {!Object} val
   * @return {?}
   */
  function result(val) {
    return func(resolve(val));
  }
  /**
   * @param {!Object} x
   * @return {?}
   */
  function resolve(x) {
    return schemasValue[x] || function() {
      throw new Error("Cannot find module '" + x + "'.");
    }();
  }
  var schemasValue = {
    "./ar" : 66,
    "./ar.js" : 66,
    "./de" : 67,
    "./de.js" : 67,
    "./en" : 68,
    "./en.js" : 68,
    "./ru" : 69,
    "./ru.js" : 69,
    "./uk" : 70,
    "./uk.js" : 70
  };
  /**
   * @return {?}
   */
  result.keys = function() {
    return Object.keys(schemasValue);
  };
  /** @type {function(!Object): ?} */
  result.resolve = resolve;
  /** @type {function(!Object): ?} */
  context.exports = result;
  /** @type {number} */
  result.id = 65;
}, function(mixin, canCreateDiscussions) {
  /** @type {!Array} */
  mixin.exports = [[{
    value : "\u0636",
    className : "symbol"
  }, {
    value : "\u0635",
    className : "symbol"
  }, {
    value : "\u062b",
    className : "symbol"
  }, {
    value : "\u0642",
    className : "symbol"
  }, {
    value : "\u0641",
    className : "symbol"
  }, {
    value : "\u063a",
    className : "symbol"
  }, {
    value : "\u0639",
    className : "symbol"
  }, {
    value : "\u0647",
    className : "symbol"
  }, {
    value : "\u062e",
    className : "symbol"
  }, {
    value : "\u062d",
    className : "symbol"
  }, {
    value : "\u062c",
    className : "symbol"
  }, {
    value : "Delete",
    className : "symbol delete wide",
    colSpan : 2
  }, {
    value : "&nbsp;",
    className : "icon keyDelete"
  }], [{
    value : "\u062f",
    className : "symbol"
  }, {
    value : "\u0634",
    className : "symbol"
  }, {
    value : "\u0633",
    className : "symbol"
  }, {
    value : "\u064a",
    className : "symbol"
  }, {
    value : "\u0628",
    className : "symbol"
  }, {
    value : "\u0644",
    className : "symbol"
  }, {
    value : "\u0627",
    className : "symbol"
  }, {
    value : "\u062a",
    className : "symbol"
  }, {
    value : "\u0646",
    className : "symbol"
  }, {
    value : "\u0630",
    className : "symbol"
  }, {
    value : "\u0645",
    className : "symbol"
  }, {
    value : "\u0643",
    className : "symbol"
  }, {
    value : "123",
    className : "symbol nums wide"
  }, {
    value : "&nbsp;",
    className : "keyGlobe"
  }], [{
    value : "\u0637",
    className : "symbol"
  }, {
    value : "\u0626",
    className : "symbol"
  }, {
    value : "\u0621",
    className : "symbol"
  }, {
    value : "\u0624",
    className : "symbol"
  }, {
    value : "\u0631",
    className : "symbol"
  }, {
    value : "\u0644\u0627",
    className : "symbol"
  }, {
    value : "\u0649",
    className : "symbol"
  }, {
    value : "\u0629",
    className : "symbol"
  }, {
    value : "\u0648",
    className : "symbol"
  }, {
    value : "\u0632",
    className : "symbol"
  }, {
    value : "\u0638",
    className : "symbol"
  }, {
    value : "&nbsp;",
    className : "icon keySpace",
    colSpan : 3
  }]];
}, function(mixin, canCreateDiscussions) {
  /** @type {!Array} */
  mixin.exports = [[{
    value : "q",
    className : "symbol"
  }, {
    value : "w",
    className : "symbol"
  }, {
    value : "e",
    className : "symbol"
  }, {
    value : "r",
    className : "symbol"
  }, {
    value : "t",
    className : "symbol"
  }, {
    value : "z",
    className : "symbol"
  }, {
    value : "u",
    className : "symbol"
  }, {
    value : "i",
    className : "symbol"
  }, {
    value : "o",
    className : "symbol"
  }, {
    value : "p",
    className : "symbol"
  }, {
    value : "\u00fc",
    className : "symbol"
  }, {
    value : "&nbsp;",
    className : "icon keyDelete",
    colSpan : 2
  }], [{
    value : "a",
    className : "symbol"
  }, {
    value : "s",
    className : "symbol"
  }, {
    value : "d",
    className : "symbol"
  }, {
    value : "f",
    className : "symbol"
  }, {
    value : "g",
    className : "symbol"
  }, {
    value : "h",
    className : "symbol"
  }, {
    value : "j",
    className : "symbol"
  }, {
    value : "k",
    className : "symbol"
  }, {
    value : "l",
    className : "symbol"
  }, {
    value : "\u00f6",
    className : "symbol"
  }, {
    value : "\u00e4",
    className : "symbol"
  }, {
    value : "Delete",
    className : "symbol delete",
    colSpan : 2
  }], [{
    value : "y",
    className : "symbol"
  }, {
    value : "x",
    className : "symbol"
  }, {
    value : "c",
    className : "symbol"
  }, {
    value : "v",
    className : "symbol"
  }, {
    value : "b",
    className : "symbol"
  }, {
    value : "n",
    className : "symbol"
  }, {
    value : "m",
    className : "symbol"
  }, {
    value : ".",
    className : "symbol"
  }, {
    value : ",",
    className : "symbol"
  }, {
    value : "/",
    className : "symbol"
  }, {
    value : "@",
    className : "symbol"
  }, {
    value : "123",
    className : "symbol nums"
  }, {
    value : "&nbsp;",
    className : "keyGlobe"
  }], [{
    value : "&nbsp;",
    className : "icon keySpace",
    colSpan : 13
  }]];
}, function(mixin, canCreateDiscussions) {
  /** @type {!Array} */
  mixin.exports = [[{
    value : "q",
    className : "symbol"
  }, {
    value : "w",
    className : "symbol"
  }, {
    value : "e",
    className : "symbol"
  }, {
    value : "r",
    className : "symbol"
  }, {
    value : "t",
    className : "symbol"
  }, {
    value : "y",
    className : "symbol"
  }, {
    value : "u",
    className : "symbol"
  }, {
    value : "i",
    className : "symbol"
  }, {
    value : "o",
    className : "symbol"
  }, {
    value : "p",
    className : "symbol"
  }, {
    value : "&nbsp;",
    className : "icon keyDelete",
    colSpan : 2
  }], [{
    value : "a",
    className : "symbol"
  }, {
    value : "s",
    className : "symbol"
  }, {
    value : "d",
    className : "symbol"
  }, {
    value : "f",
    className : "symbol"
  }, {
    value : "g",
    className : "symbol"
  }, {
    value : "h",
    className : "symbol"
  }, {
    value : "j",
    className : "symbol"
  }, {
    value : "k",
    className : "symbol"
  }, {
    value : "l",
    className : "symbol"
  }, {
    value : "-",
    className : "symbol"
  }, {
    value : "Delete",
    className : "symbol delete",
    colSpan : 2
  }], [{
    value : "z",
    className : "symbol"
  }, {
    value : "x",
    className : "symbol"
  }, {
    value : "c",
    className : "symbol"
  }, {
    value : "v",
    className : "symbol"
  }, {
    value : "b",
    className : "symbol"
  }, {
    value : "n",
    className : "symbol"
  }, {
    value : "m",
    className : "symbol"
  }, {
    value : ",",
    className : "symbol"
  }, {
    value : ".",
    className : "symbol"
  }, {
    value : "/",
    className : "symbol"
  }, {
    value : "123",
    className : "symbol nums"
  }, {
    value : "&nbsp;",
    className : "keyGlobe"
  }], [{
    value : "&nbsp;",
    className : "icon keySpace",
    colSpan : 12
  }]];
}, function(mixin, canCreateDiscussions) {
  /** @type {!Array} */
  mixin.exports = [[{
    value : "\u0439",
    className : "symbol"
  }, {
    value : "\u0446",
    className : "symbol"
  }, {
    value : "\u0443",
    className : "symbol"
  }, {
    value : "\u043a",
    className : "symbol"
  }, {
    value : "\u0435",
    className : "symbol"
  }, {
    value : "\u043d",
    className : "symbol"
  }, {
    value : "\u0433",
    className : "symbol"
  }, {
    value : "\u0448",
    className : "symbol"
  }, {
    value : "\u0449",
    className : "symbol"
  }, {
    value : "\u0437",
    className : "symbol"
  }, {
    value : "\u0445",
    className : "symbol"
  }, {
    value : "\u044a",
    className : "symbol"
  }, {
    value : "&nbsp;",
    className : "icon keyDelete",
    colSpan : 2
  }], [{
    value : "\u0444",
    className : "symbol"
  }, {
    value : "\u044b",
    className : "symbol"
  }, {
    value : "\u0432",
    className : "symbol"
  }, {
    value : "\u0430",
    className : "symbol"
  }, {
    value : "\u043f",
    className : "symbol"
  }, {
    value : "\u0440",
    className : "symbol"
  }, {
    value : "\u043e",
    className : "symbol"
  }, {
    value : "\u043b",
    className : "symbol"
  }, {
    value : "\u0434",
    className : "symbol"
  }, {
    value : "\u0436",
    className : "symbol"
  }, {
    value : "\u044d",
    className : "symbol"
  }, {
    value : "/",
    className : "symbol"
  }, {
    value : "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    className : "symbol delete",
    colSpan : 2
  }], [{
    value : "\u044f",
    className : "symbol"
  }, {
    value : "\u0447",
    className : "symbol"
  }, {
    value : "\u0441",
    className : "symbol"
  }, {
    value : "\u043c",
    className : "symbol"
  }, {
    value : "\u0438",
    className : "symbol"
  }, {
    value : "\u0442",
    className : "symbol"
  }, {
    value : "\u044c",
    className : "symbol"
  }, {
    value : "\u0431",
    className : "symbol"
  }, {
    value : "\u044e",
    className : "symbol"
  }, {
    value : "\u0451",
    className : "symbol"
  }, {
    value : ".",
    className : "symbol"
  }, {
    value : ",",
    className : "symbol"
  }, {
    value : "123",
    className : "symbol nums"
  }, {
    value : "&nbsp;",
    className : "keyGlobe"
  }], [{
    value : "&nbsp;",
    className : "icon keySpace",
    colSpan : 14
  }]];
}, function(mixin, canCreateDiscussions) {
  /** @type {!Array} */
  mixin.exports = [[{
    value : "\u0439",
    className : "symbol"
  }, {
    value : "\u0446",
    className : "symbol"
  }, {
    value : "\u0443",
    className : "symbol"
  }, {
    value : "\u043a",
    className : "symbol"
  }, {
    value : "\u0435",
    className : "symbol"
  }, {
    value : "\u043d",
    className : "symbol"
  }, {
    value : "\u0433",
    className : "symbol"
  }, {
    value : "\u0448",
    className : "symbol"
  }, {
    value : "\u0449",
    className : "symbol"
  }, {
    value : "\u0437",
    className : "symbol"
  }, {
    value : "\u0445",
    className : "symbol"
  }, {
    value : "\u0457",
    className : "symbol"
  }, {
    value : "&nbsp;",
    className : "icon keyDelete",
    colSpan : 2
  }], [{
    value : "\u0444",
    className : "symbol"
  }, {
    value : "\u0456",
    className : "symbol"
  }, {
    value : "\u0432",
    className : "symbol"
  }, {
    value : "\u0430",
    className : "symbol"
  }, {
    value : "\u043f",
    className : "symbol"
  }, {
    value : "\u0440",
    className : "symbol"
  }, {
    value : "\u043e",
    className : "symbol"
  }, {
    value : "\u043b",
    className : "symbol"
  }, {
    value : "\u0434",
    className : "symbol"
  }, {
    value : "\u0436",
    className : "symbol"
  }, {
    value : "\u0454",
    className : "symbol"
  }, {
    value : "/",
    className : "symbol"
  }, {
    value : "\u0423\u0434\u0430\u043b\u0438\u0442\u044c",
    className : "symbol delete",
    colSpan : 2
  }], [{
    value : "\u0491",
    className : "symbol"
  }, {
    value : "\u044f",
    className : "symbol"
  }, {
    value : "\u0447",
    className : "symbol"
  }, {
    value : "\u0441",
    className : "symbol"
  }, {
    value : "\u043c",
    className : "symbol"
  }, {
    value : "\u0438",
    className : "symbol"
  }, {
    value : "\u0442",
    className : "symbol"
  }, {
    value : "\u044c",
    className : "symbol"
  }, {
    value : "\u0431",
    className : "symbol"
  }, {
    value : "\u044e",
    className : "symbol"
  }, {
    value : ".",
    className : "symbol"
  }, {
    value : ",",
    className : "symbol"
  }, {
    value : "123",
    className : "symbol nums"
  }, {
    value : "&nbsp;",
    className : "keyGlobe"
  }], [{
    value : "&nbsp;",
    className : "icon keySpace",
    colSpan : 14
  }]];
}, function(mixin, canCreateDiscussions) {
  /**
   * @param {string} e
   * @return {?}
   */
  mixin.exports = function(e) {
    var data = {};
    return e.split("&").forEach(function(kv) {
      kv = kv.split("=");
      if (2 === kv.length) {
        /** @type {string} */
        data[kv[0]] = decodeURIComponent(kv[1]);
      }
    }), data;
  };
}]);
