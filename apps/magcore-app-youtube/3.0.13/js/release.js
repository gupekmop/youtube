'use strict';
var DEBUG_MODE = true;
var CACHE_CIPHER = {};
var YOUTUBE_PHP = window.location.href.replace(/index\.html$/, "") + "youtube.php";
var DEFAULT_LANGUAGE_ENGLISH = false; //true - for default English interface & keyboard (trending & search results see youtube.php)

function debug(content) {
  if (DEBUG_MODE) {
    console.log(content);
  }
}

function parseItems(data) {
  var items = [];
  data.forEach(function (el) {
    var publishedAt = el.snippet.publishedAt.replace("T", " ").replace("Z", "");
    var item = {
      value: 1,
      id: el.id,
      canonicalBaseUrl: el.hasOwnProperty("canonicalBaseUrl") ? el.canonicalBaseUrl : "",
      channelTitle: el.snippet.channelTitle,
      duration: el.contentDetails.hasOwnProperty("realDuration") ? el.contentDetails.duration : normalizeVideoDuration(el.contentDetails.duration),
      realDuration: el.contentDetails.duration,
      viewCount: el.statistics.viewCount + (el.statistics.likeCount ? " | +" + el.statistics.likeCount : "") + (el.statistics.dislikeCount ? " | -" + el.statistics.dislikeCount : ""),
      publishedAt: publishedAt,
      dimension: el.contentDetails.dimension,
      definition: el.contentDetails.definition,
      title: el.snippet.title,
      icon: el.snippet.thumbnails.hasOwnProperty("high") ? el.snippet.thumbnails["high"].url : el.snippet.thumbnails[el.snippet.thumbnails.length - 1].url,
      channelId: el.snippet.channelId,
      type: "video",
      locale: {
        publishedAt: publishedAt,
        viewCount: el.statistics.viewCount + (el.statistics.likeCount ? " | +" + el.statistics.likeCount : "") + (el.statistics.dislikeCount ? " | -" + el.statistics.dislikeCount : ""),
        channelTitle: el.snippet.channelTitle
      }
    };
    //debug(JSON.stringify(item));
    //debug("================================================================================");
    items.push(item);
  });
  return items;
}

function normalizeVideoDuration(duration) {
  var match = duration.match(/PT(?:(\d{1,2})D)?(?:(\d{1,2})H)?(?:(\d{1,2})M)?(?:(\d{1,2})S)?/);
  if (match) {
    var
      d = match[1] || 0,
      h = match[2] || 0,
      m = match[3] || 0,
      s = match[4] || 0;
    duration = (d ? d + ":" : "") + ((d || h) ? (h > 9 ? h : (d ? "0" + h : h)) + ":" : "") + ((d || h) ? (m > 9 ? m : "0" + m) : m) + ":" + (s > 9 ? s : "0" + s);
  }
  return duration;
}

!function (modules) {
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      exports: {},
      id: moduleId,
      loaded: false
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.loaded = true;
    return module.exports;
  }

  var installedModules = {};
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.p = "";
  return __webpack_require__(0);
}([function (module, exports, require) {//require(0)
  function init() {
    debug('MODULE 0 - init()');
    var item;
    var screen = require(10);
    var HAS_BROKEN_LINEHEIGHT = ["AuraHD2", "AuraHD3", "AuraHD8", "MAG254", "MAG275", "MAG276", "WR320"].indexOf(window.top.gSTB.GetDeviceModelExt()) !== -1;
    screen.availHeight = screen.height - (screen.availTop + screen.availBottom);
    screen.availWidth = screen.width - (screen.availLeft + screen.availRight);
    if (!self.data) {
      self.data = {};
    }
    self.data.metrics = screen;
    if (require(17).token) {
      self.data.metrics.mainMenuSize -= 2;
    }
    self.pages = {
      main: require(21),
      search: require(57)
    };
    that = new (require(51))({
      $node: document.getElementById("exitMessage"),
      events: {
        keydown: function (key) {
          if (key.code === c.ok) {
            self.quit();
          } else if (key.code === c.back || key.code === c.exit) {
            key.stop = true;
            that.hide();
            inlineEditor2.focus();
          }
        }
      }
    });
    that.$body.classList.add("modalExit");
    that.$header.innerHTML = gettext("Exit from app?");
    that.$content.innerHTML = "";
    that.$footer.innerHTML = "";
    that.$footer.appendChild(item = document.createElement("div"));
    item.innerText = gettext("Ok");
    item.className = "btn confirm" + (HAS_BROKEN_LINEHEIGHT ? "" : " old");
    that.$footer.appendChild(item = document.createElement("div"));
    item.className = "btn back" + (HAS_BROKEN_LINEHEIGHT ? "" : " old");
    item.innerText = gettext("Cancel");
    if (self.params.search) {
      self.route(self.pages.search, {
        search: self.params.search
      });
    } else if (self.params.channelId) {
      self.route(self.pages.main, {
        channel: {
          id: self.params.channelId,
          noBack: true
        }
      });
    } else {
      self.route(self.pages.main);
    }
    self.ready();
    o = require(27);
  }

  var that;
  var inlineEditor2;
  var o;
  var self = require(1);
  var c = require(13);
  require(15);
  var options = require(16);
  self.quit = function () {
    core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
    self.exit();
  };
  self.reload = function () {
    core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
    window.location.reload();
    self.emit("load");
  };
  self.addListeners({
    load: function () {
      var option;
      var locale = require(42);
      var config = require(15);
      self.urlParser = core.plugins.youtubeDL;
      try {
        var str = core.storage.getItem(options.settingsFile)
        if (str) {
          self.settings = JSON.parse(str);
        } else {
          for (option in options.defaultSettings) {
            if (options.defaultSettings.hasOwnProperty(option) && self.settings[option]) {
              self.settings[option] = options.defaultSettings[option];
            }
          }
          self.settings = options.defaultSettings;
          core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
        }
      } catch (ex) {
        self.settings = false;
      }
      if (!self.settings) {
        self.settings = options.defaultSettings;
        core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
      }
      for (option in options.defaultSettings) {
        if (options.defaultSettings.hasOwnProperty(option) && self.settings[option] === undefined) {
          self.settings[option] = options.defaultSettings[option];
        }
      }
      if (config.languages.indexOf(self.settings.keyboardLanguage) === -1) {
        self.settings.keyboardLanguage = 0;
      }
      self.params = require(71)(location.search.substring(1));
      if (self.params.language) {
        self.settings.languageOverwrite = 1;
        self.settings.language = self.params.language;
      }
      require(43).load({
        name: self.settings.language || core.environment.language || "en"
      }, function () {
        var n;
        self.languageIndex = locale.languageIndex;
        self.settings.language = config.languages[self.languageIndex];
        document.documentElement.dir = config.directions[self.languageIndex];
        if (document.documentElement.dir === "rtl") {
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
    unload: function () {
      core.storage.setItem(options.settingsFile, JSON.stringify(self.settings));
    },
    keydown: function (key) {
      if (!key.stop && key.code === c.back) {
        if (o && !o.visible) {
          inlineEditor2 = self.activePage.activeComponent;
          that.show();
          that.focus();
        } else {
          self.quit();
        }
      }
    }
  });
}, function (module, exports, require) {//require(1)
  module.exports = require(2);
}, function (module, exports, require) {//require(2)
  var self = require(3);
  var element = require(7);
  window.core = window.parent.getCoreInstance(window, self);
  require(8);
  require(9);
  require(11)("sdk");
  require(12);
  require(11)("app");
  self.platform = "mag";
  self.ready = function () {
    window.core.call("app:ready");
  };
  self.exit = function () {
    if (self.events["exit"]) {
      self.emit("exit");
    }
    core.call("exit");
  };
  element.load = function (event) {
    document.body.setAttribute("platform", self.platform);
    if (core.ready) {
      if (self.events["load"]) {
        self.emit("load", {});
      }
    } else {
      core.once("load", function () {
        if (self.events[event.type]) {
          self.emit(event.type, event);
        }
      });
    }
  };
  Object.keys(element).forEach(function (eventName) {
    window.addEventListener(eventName, element[eventName]);
  });
  module.exports = self;
}, function (module, exports, require) {//require(3)
  function callback(self, component) {
    return self && !self.active && (self.$node.classList.add("active"), self.active = true, data.activePage = self, self.events["show"] && self.emit("show", {
      page: self,
      data: component
    }), true);
  }

  function render(self) {
    return self && self.active && (self.$node.classList.remove("active"), self.active = false, data.activePage = null, self.events["hide"] && self.emit("hide", {
      page: self
    }), true);
  }

  var DataSet = require(4);
  var parseQueryString = require(5).parse;
  var data = new DataSet;
  data.query = parseQueryString(document.location.search.substring(1));
  data.config = require(6);
  data.activePage = null;
  data.route = function (scope, arg) {
    var page = data.activePage;
    return scope && !scope.active && (render(data.activePage), callback(scope, arg), this.events["route"] && this.emit("route", {
      from: page,
      to: scope
    }), true);
  };
  module.exports = data;
}, function (module) {//require(4)
  function EventEmitter() {
    this.events = {};
  }

  EventEmitter.prototype = {
    addListener: function (type, fn) {
      this.events[type] = this.events[type] || [];
      this.events[type].push(fn);
    },
    once: function (type, action) {
      var self = this;
      this.events[type] = this.events[type] || [];
      this.events[type].push(function proxy() {
        self.removeListener(type, proxy);
        action.apply(self, arguments);
      });
    },
    addListeners: function (listeners) {
      for (var i in listeners) {
        if (listeners.hasOwnProperty(i)) {
          this.addListener(i, listeners[i]);
        }
      }
    },
    removeListener: function (name, scope) {
      if (this.events[name]) {
        this.events[name] = this.events[name].filter(function (targetScope) {
          return targetScope !== scope;
        });
        if (this.events[name].length === 0) {
          this.events[name] = undefined;
        }
      }
    },
    emit: function (type) {
      var listeners = this.events[type];
      if (listeners) {
        for (var i in listeners) {
          if (listeners.hasOwnProperty(i)) {
            listeners[i].apply(this, Array.prototype.slice.call(arguments, 1));
          }
        }
      }
    }
  };
  EventEmitter.prototype.constructor = EventEmitter;
  module.exports = EventEmitter;
}, function (module) {//require(5)
  module.exports = {
    parse: function (val) {
      var obj = {};
      val.split("&").forEach(function (tokens) {
        tokens = tokens.split("=");
        if (tokens.length === 2) {
          obj[tokens[0]] = decodeURIComponent(tokens[1]);
        }
      });
      return obj;
    },
    stringify: function (data) {
      var drilldownLevelLabels = [];
      Object.keys(data).forEach(function (name) {
        drilldownLevelLabels.push(name + "=" + encodeURIComponent(data[name]));
      });
      return drilldownLevelLabels.join("&");
    }
  };
}, function (module) {//require(6)
  module.exports = {};
}, function (module, exports, require) {//require(7)
  var me = require(3);
  module.exports = {
    DOMContentLoaded: function (e) {
      if (me.events["dom"]) {
        me.emit("dom", e);
      }
    },
    load: function (evt) {
      if (me.events[evt.type]) {
        me.emit(evt.type, evt);
      }
    },
    unload: function (e) {
      if (me.events[e.type]) {
        me.emit(e.type, e);
      }
    },
    error: function (deleted_model) {
    },
    keydown: function (key) {
      var app;
      var state = me.activePage;
      var data = {
        code: key.keyCode,
        stop: false
      };
      if (key.ctrlKey) {
        data.code += "c";
      }
      if (key.altKey) {
        data.code += "a";
      }
      if (key.shiftKey) {
        data.code += "s";
      }
      app = state.activeComponent;
      if (app && app !== state) {
        if (app.events[key.type]) {
          app.emit(key.type, data, key);
        }
        if (!data.stop && app.propagate && app.parent && app.parent.events[key.type]) {
          app.parent.emit(key.type, data, key);
        }
      }
      if (!data.stop) {
        if (state.events[key.type]) {
          state.emit(key.type, data, key);
        }
        if (!key.stop && me.events[key.type]) {
          me.emit(key.type, data, key);
        }
      }
    },
    keypress: function (key) {
      var page = me.activePage;
      if (page.activeComponent && page.activeComponent !== page && page.activeComponent.events[key.type]) {
        page.activeComponent.emit(key.type, key);
      }
    },
    mousewheel: function (event) {
      var item = me.activePage;
      if (item.activeComponent && item.activeComponent !== item && item.activeComponent.events[event.type]) {
        item.activeComponent.emit(event.type, event);
      }
      if (!event.stop && item.events[event.type]) {
        item.emit(event.type, event);
      }
    }
  };
}, function () {//require(8)
  if (!document.documentElement.classList) {
    var prototype = Array.prototype;
    var removeAttribute = prototype.indexOf;
    var slice = prototype.slice;
    var indexOf = prototype.push;
    var splice = prototype.splice;
    var join = prototype.join;
    window.DOMTokenList = function (el) {
      this._element = el;
      if (el.className !== this._classCache) {
        this._classCache = el.className;
        if (!this._classCache) {
          return;
        }
        var deps = this._classCache.replace(/^\s+|\s+$/g, "").split(/\s+/);
        var length = deps.length;
        for (var i = 0; i < length; i++) {
          indexOf.call(this, deps[i]);
        }
      }
    };
    window.DOMTokenList.prototype = {
      add: function (name) {
        if (!this.contains(name)) {
          indexOf.call(this, name);
          this._element.className = slice.call(this, 0).join(" ");
        }
      },
      contains: function (name) {
        return removeAttribute.call(this, name) !== -1;
      },
      item: function (operator) {
        return this[operator] || null;
      },
      remove: function (name) {
        var i = removeAttribute.call(this, name);
        if (i !== -1) {
          splice.call(this, i, 1);
          this._element.className = slice.call(this, 0).join(" ");
        }
      },
      toString: function () {
        return join.call(this, " ");
      },
      toggle: function (name) {
        if (this.contains(name)) {
          this.remove(name);
        } else {
          this.add(name);
        }
        return this.contains(name);
      }
    };
    Object.defineProperty(Element.prototype, "classList", {
      get: function () {
        return new window.DOMTokenList(this);
      }
    });
  }
}, function (module, exports, require) {//require(9)
  var win = require(3);
  var item = require(10);
  win.metrics = item[win.query.screenHeight] || item[screen.height] || item[720];
  win.metrics.availHeight = win.metrics.height - (win.metrics.availTop + win.metrics.availBottom);
  win.metrics.availWidth = win.metrics.width - (win.metrics.availLeft + win.metrics.availRight);
}, function (module) {//require(10)
  module.exports = {
    480: {
      height: 480,
      width: 720,
      availTop: 24,
      availBottom: 24,
      availRight: 32,
      availLeft: 48,
      mainMenuSize: 8
    },
    576: {
      height: 576,
      width: 720,
      availTop: 24,
      availBottom: 24,
      availRight: 28,
      availLeft: 54,
      mainMenuSize: 10
    },
    720: {
      height: 720,
      width: 1280,
      availTop: 10,
      availBottom: 10,
      availRight: 10,
      availLeft: 10,
      mainMenuSize: 9
    },
    1080: {
      height: 1080,
      width: 1920,
      availTop: 15,
      availBottom: 15,
      availRight: 15,
      availLeft: 15,
      mainMenuSize: 9
    }
  };
}, function (module, exports, require) {//require(11)
  var d = require(3);
  module.exports = function (execFile_opt) {
    var $elem = document.createElement("link");
    $elem.rel = "stylesheet";
    $elem.href = "css/release." + execFile_opt + "." + d.metrics.height + ".css";
    document.head.appendChild($elem);
  };
}, function (module, exports, require) {//require(12)
  var style;
  var d = require(3);
  style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = window.core.theme.path + d.metrics.height + ".css";
  document.head.appendChild(style);
  module.exports = style;
}, function (module, exports, require) {//require(13)
  var self = require(14);
  self.back = self.backspace;
  self.channelNext = self.tab;
  self.channelPrev = self.tab + "s";
  self.ok = self.enter;
  self.exit = self.escape;
  self.volumeUp = 107;
  self.volumeDown = 109;
  self.f1 = "112c";
  self.f2 = "113c";
  self.f3 = "114c";
  self.f4 = "115c";
  self.refresh = "116c";
  self.frame = "117c";
  self.phone = "119c";
  self.set = "120c";
  self.tv = "121c";
  self.menu = "122c";
  self.app = "123c";
  self.rewind = "66a";
  self.forward = "70a";
  self.audio = "71a";
  self.standby = "74a";
  self.keyboard = "76a";
  self.usbMounted = "80a";
  self.usbUnmounted = "81a";
  self.playPause = "82a";
  self.play = -1;
  self.pause = -1;
  self.stop = "83a";
  self.power = "85a";
  self.record = "87a";
  self.info = "89a";
  self.mute = "192a";
  self.digit0 = 48;
  self.digit1 = 49;
  self.digit2 = 50;
  self.digit3 = 51;
  self.digit4 = 52;
  self.digit5 = 53;
  self.digit6 = 54;
  self.digit7 = 55;
  self.digit8 = 56;
  self.digit9 = 57;
  module.exports = self;
}, function (module) {//require(14)
  module.exports = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    pageUp: 33,
    pageDown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    insert: 45,
    del: 46
  };
}, function (module) {//require(15)
  module.exports = {
    active: false,
    languages: DEFAULT_LANGUAGE_ENGLISH ? ["en", "ru", "uk", "de"] : ["ru", "en", "uk", "de"],
    languagesCodeLocalized: DEFAULT_LANGUAGE_ENGLISH ? ["EN", "РУ", "УК", "DE"] : ["РУ", "EN", "УК", "DE"],
    languagesLocalized: DEFAULT_LANGUAGE_ENGLISH ? ["English", "Русский", "Українська", "Deutch"] : ["Русский", "English", "Українська", "Deutch"],
    locales: DEFAULT_LANGUAGE_ENGLISH ? ["en-US", "ru-RU", "uk-UA", "de-DE"] : ["ru-RU", "en-US", "uk-UA", "de-DE"],
    regions: DEFAULT_LANGUAGE_ENGLISH ? ["US", "RU", "UA", "DE"] : ["RU", "US", "UA", "DE"],
    directions: ["ltr", "ltr", "ltr", "ltr"],
    fromCode: "UTF-8",
    addComments: "gettext",
    indent: false,
    noLocation: true,
    noWrap: true,
    sortOutput: true,
    sortByFile: false,
    verbose: false
  };
}, function (module) {//require(16)
  module.exports = {
    defaultSettings: {
      safeSearch: 0,
      quality: 0,
      language: DEFAULT_LANGUAGE_ENGLISH ? "en" : "ru",
      languageOverwrite: 0,
      keyboardLanguage: 0,
      credentialsIndex: -1,
      refreshToken: null,
      sessionToken: null
    },
    settingsFile: "youtube.json",
    logging: false,
    ajaxDebug: false
  };
}, function (module, exports, require) {//require(17)
  function get(force_promise, do_not_create) {
    return Math.floor(Math.random() * (do_not_create - force_promise + 1)) + force_promise;
  }

  function send(id, cb) {
    debug('MODULE 17 - send()');
    var xhr;
    var url;
    var note = options.credentials[id];
    xhr = new XMLHttpRequest;
    url = "https://www.googleapis.com/youtube/v3/search?part=id&hl=ru-RU&regionCode=RU&q=sad&key=";
    xhr.onload = function () {
      if (this.status === 200) {
        options.activeKey = options.credentials[id].key;
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

  function parse(text, chars) {
    var classList = [];
    var length = text.length;
    classList.length = length;
    for (var i = 0; i < length; i++) {
      var a = i % chars.length;
      classList[i] = String.fromCharCode(text.charCodeAt(i) ^ chars.charCodeAt(a));
    }
    return classList.join("");
  }

  function login(body) {
    debug('MODULE 17 - login()');
    var $scope;
    try {
      $scope = JSON.parse(body);
      if ($scope.keys) {
        options.credentials = $scope.keys;
      }
    } catch (ex) {
      $scope = {
        menu: {}
      };
    }
    return new Promise(function (saveNotifs) {
      var xhr;
      if (!$scope.keys || $scope.keys[0].key === "") {
        xhr = new XMLHttpRequest;
        xhr.open("GET", "1.cab", false);
        xhr.send();
        xhr = parse(atob(xhr.responseText), kol("googleshallnotpass", "magiscool"));
        options.credentials = JSON.parse(xhr).map(function (options) {
          return {
            key: options.k,
            clientId: options.c,
            secret: options.s
          };
        });
      }
      send(get(0, options.credentials.length - 1), function () {
        if ($scope.menu && $scope.menu.categories) {
          Object.keys($scope.menu.categories).forEach(function (i) {
            options.categories.push({
              id: i,
              value: $scope.menu.categories[i],
              title: $scope.menu.categories[i],
              icon: icons[i]
            });
          });
          if ($scope.menu.channels) {
            Object.keys($scope.menu.channels).forEach(function (k) {
              options.subscriptions.push({
                id: k,
                value: $scope.menu.channels[k],
                title: $scope.menu.channels[k],
                icon: icons["GCVG9wIEJsb2dz"]
              });
            });
          }
          saveNotifs();
        } else {
          options.request("GET", "guideCategories?part=snippet").then(function (data) {
            if (data && data.items) {
              data.items.forEach(function (item) {
                options.categories.push({
                  id: item.id,
                  title: item.snippet.title,
                  value: item.snippet.title,
                  icon: icons[item.id]
                });
              });
            }
            if ($scope.menu && $scope.menu.channels) {
              Object.keys($scope.menu.channels).forEach(function (k) {
                options.subscriptions.push({
                  id: k,
                  value: k,
                  title: $scope.menu.channels[k],
                  icon: icons["GCVG9wIEJsb2dz"]
                });
              });
            }
            saveNotifs();
          }, function (canCreateDiscussions) {
            if (canCreateDiscussions !== 403 || options.credentials.length <= 0) {
              saveNotifs();
            }
          });
        }
      });
    });
  }

  function init() {
    debug('MODULE 17 - init()');
    var xhr = new XMLHttpRequest;
    var url = "https://raw.githubusercontent.com/betamaster2/youtube/master/config.json";
    if (self.params.config) {
      url = self.params.config;
    }
    xhr.open("GET", url);
    return e(xhr).then(function (data) {
      return login(data);
    })["catch"](function () {
      xhr.open("GET", "config.json");
      e(xhr).then(function (data) {
        return login(data);
      })["catch"](function () {
        login();
      });
    });
  }

  function resolve(checkExistence) {
  }

  var self = require(1);
  var Promise = require(18);
  var e = require(19);
  var config = require(15);
  var icons = require(20);
  var options = {
    credentials: [],
    categories: [],
    subscriptions: [],
    playlists: [],
    BASE_URL: "https://www.googleapis.com/youtube/v3/",
    APP_DOMAIN: "https://mathiasbynens.be/demo/css-without-html",
    AUTH_URL: "",
    credentialsIndex: 0,
    token: false,
    refreshToken: false,
    activeKey: "",
    staticUrl: "",
    regionCode: "",
    request: function (method, url, obj) {
      debug('MODULE 17 - options.request()');
      var data = this;
      return new Promise(function (callback, loadfn) {
        var xhr = new XMLHttpRequest;
        xhr.open(method, data.BASE_URL + url + data.staticUrl + "&qq=123");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        if (data.token) {
          xhr.setRequestHeader("Authorization", "Bearer " + data.token);
        }
        xhr.onload = function () {
          if (this.status === 200) {
            callback(this.responseText);
          } else if (this.status === 401) {
            options.token = false;
            self.settings.sessionToken = false;
            resolve(self.settings).then(function () {
              return init();
            }, function () {
              xhr.request(method, url, obj).then(function (identifierPositions) {
                callback(identifierPositions);
              });
            })["catch"](function (buffer) {
              loadfn(buffer);
            });
          } else {
            loadfn(this.status);
          }
        };
        xhr.onerror = function () {
          loadfn();
        };
        xhr.send(obj);
      });
    }
  };
  options.init = function () {
    debug('MODULE 17 - options.init()');
    if (self.params.regionCode) {
      options.regionCode = self.params.regionCode;
    } else {
      options.regionCode = config.regions[self.languageIndex];
    }
    return init();
  };
  options.postAuth = function (callback) {
  };
  module.exports = options;
}, function (module) {//require(18)
  function Promise(trigger) {
    this.state = null;
    this.value = null;
    this.deferreds = [];
    callback(trigger, $(o, this), $(step, this));
  }

  function $(o, fn) {
    return function () {
      o.apply(fn, arguments);
    };
  }

  function handle(deferred) {
    var me = this;
    return this.state === null ? void this.deferreds.push(deferred) : void setTimeout(function () {
      var i;
      var extValueFrom = me.state ? deferred.onFulfilled : deferred.onRejected;
      if (extValueFrom === null) {
        return void (me.state ? deferred.resolve : deferred.reject)(me.value);
      }
      try {
        i = extValueFrom(me.value);
      } catch (ex) {
        return void deferred.reject(ex);
      }
      deferred.resolve(i);
    });
  }

  function o(d) {
    try {
      if (d === this) {
        return;
        //throw new TypeError("A promise cannot be resolved with itself.");
      }
      if (d && (typeof d == "object" || typeof d == "function")) {
        var t = d.then;
        if (typeof t == "function") {
          return void callback($(t, d), $(o, this), $(step, this));
        }
      }
      this.state = true;
      this.value = d;
      router.call(this);
    } catch (ex) {
      step.call(this, ex);
    }
  }

  function step(value) {
    this.state = false;
    this.value = value;
    router.call(this);
  }

  function router() {
    var length = this.deferreds.length;
    for (var i = 0; i < length; i++) {
      handle.call(this, this.deferreds[i]);
    }
    this.deferreds = null;
  }

  function Handler(a, fn, resolve, reject) {
    this.onFulfilled = typeof a == "function" ? a : null;
    this.onRejected = typeof fn == "function" ? fn : null;
    this.resolve = resolve;
    this.reject = reject;
  }

  function callback(e, fn, $) {
    var n = false;
    try {
      e(function (responce) {
        if (!n) {
          n = true;
          fn(responce);
        }
      }, function (desc) {
        if (!n) {
          n = true;
          $(desc);
        }
      });
    } catch (ex) {
      if (n) {
        return;
      }
      n = true;
      $(ex);
    }
  }

  Promise.prototype["catch"] = function (onSettled) {
    return this.then(null, onSettled);
  };
  Promise.prototype.then = function (value, onRejected) {
    var elem = this;
    return new Promise(function (resolve, reject) {
      handle.call(elem, new Handler(value, onRejected, resolve, reject));
    });
  };
  Promise.all = function () {
    var map = Array.prototype.slice.call(arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments);
    return new Promise(function (fulfill, reject) {
      function cb(key, val) {
        try {
          if (val && (typeof val == "object" || typeof val == "function")) {
            var then = val.then;
            if (typeof then == "function") {
              return void then.call(val, function (body) {
                cb(key, body);
              }, reject);
            }
          }
          map[key] = val;
          if (--start === 0) {
            fulfill(map);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      var length = map.length;
      if (length === 0) {
        return fulfill([]);
      }
      for (var j = 0; j < length; j++) {
        cb(j, map[j]);
      }
    });
  };
  Promise.resolve = function (value) {
    return value && typeof value == "object" && value.constructor === Promise ? value : new Promise(function (resolve) {
      resolve(value);
    });
  };
  Promise.reject = function (result) {
    return new Promise(function (canCreateDiscussions, callback) {
      callback(result);
    });
  };
  Promise.race = function (values) {
    return new Promise(function (t, throwException) {
      var length = values.length;
      for (var i = 0; i < length; i++) {
        values[i].then(t, throwException);
      }
    });
  };
  module.exports = window.Promise || Promise;
}, function (module, exports, require) {//require(19)
  function render(e, url) {
    return new ReactElement(function (callback, reject) {
      e.onload = function () {
        if (this.status === 200) {
          callback(this.responseText);
        } else {
          reject(this.statusText);
        }
      };
      e.onerror = function () {
        reject();
      };
      e.send(url);
    });
  }

  var ReactElement = require(18);
  module.exports = render;
}, function (module) {//require(20)
  module.exports = {
    GCQmVzdCBvZiBZb3VUdWJl: "icon popular",
    GCUGFpZCBDaGFubmVscw: "icon purchases",
    GCTXVzaWM: "icon music",
    GCQ29tZWR5: "icon humor",
    GCRmlsbSAmIEVudGVydGFpbm1lbnQ: "icon entertainment",
    GCR2FtaW5n: "icon games",
    GCQmVhdXR5ICYgRmFzaGlvbg: "icon social",
    GCRnJvbSBUVg: "fa fa-youtube-play",
    GCQXV0b21vdGl2ZQ: "fa fa-car",
    GCQW5pbWF0aW9u: "fa fa-picture-o",
    GCVG9wIFlvdVR1YmUgQ29sbGVjdGlvbnM: "icon popular",
    GCVG9wIEJsb2dz: "icon social",
    GCU3BvcnRz: "icon sport",
    GCSG93LXRvICYgRElZ: "fa fa-wrench",
    GCVGVjaA: "icon hobbie",
    GCU2NpZW5jZSAmIEVkdWNhdGlvbg: "fa fa-book",
    GCQ29va2luZyAmIEhlYWx0aA: "fa fa-spoon",
    GCQ2F1c2VzICYgTm9uLXByb2ZpdHM: "fa fa-users",
    GCTmV3cyAmIFBvbGl0aWNz: "icon news",
    GCTGlmZXN0eWxl: "fa fa-leaf"
  };
}, function (module, exports, require) {//require(21)
  var panel;
  var tab;
  var i;
  var self = require(13);
  var $scope = require(1);
  var modal = require(22);
  var Navigation = require(25);
  var m = new modal({
    $node: document.getElementById("pm")
  });
  var url = null;
  m.addListener("keydown", function (key) {
    if (key.code === self.info) {
      panel.focus();
    } else if (key.code === self.f3) {
      $scope.route($scope.pages.search);
    } else if (key.code === self.back && url) {
      $scope.route(url);
      key.stop = true;
    }
  });
  m.once("show", function () {
    tab.content.tabs[tab.activeTab].activate();
  });
  m.addListener("show", function (options) {
    url = null;
    window.page = options.page;
    Navigation.updateView({
      SEARCH: {
        icon: "search",
        visible: true,
        text: gettext("Search")
      },
      MORE: {
        icon: "more",
        visible: false,
        text: ""
      },
      GUIDE: {
        icon: "info",
        visible: true,
        text: gettext("Guide")
      },
      BACK: {
        icon: "back",
        visible: true,
        text: gettext("Exit")
      }
    }, "pageMain");
    if (options.data && options.data.channel) {
      i = tab.activeTab;
      tab.content.tabs[tab.activeTab].hide();
      tab.activeTab = 1;
      if (!options.data.channel.noBack) {
        url = $scope.pages.search;
      }
      tab.content.tabs[tab.activeTab].activate(options.data.channel);
    } else if (tab.content.tabs.length > 0) {
      if (!i) {
        i = 3;
      }
      tab.content.tabs[tab.activeTab].hide();
      tab.activeTab = i;
      tab.content.tabs[tab.activeTab].activate();
    }
  });
  m.addListener("hide", function () {
    require(27).hide();
  });
  tab = require(28);
  m.add(panel = require(29));
  panel.addListener("show", function () {
    Navigation.updateView({
      SEARCH: {
        icon: "search",
        visible: false,
        text: gettext("Search")
      },
      GUIDE: {
        icon: "info",
        visible: true,
        text: gettext("Close guide")
      }
    }, "pageMain");
  });
  panel.addListener("hide", function () {
    Navigation.updateView({
      SEARCH: {
        icon: "search",
        visible: true,
        text: gettext("Search")
      },
      GUIDE: {
        icon: "info",
        visible: true,
        text: gettext("Guide")
      }
    }, "pageMain");
  });
  tab.content.tabs.push(require(32));
  tab.content.tabs.push(require(47));
  tab.content.tabs.push(require(50));
  tab.content.tabs.push(require(55));
  tab.content.tabs.forEach(function (e) {
    m.add(e);
  });
  if (require(17).token) {
    require(46).getMine().then(function (e) {
      window.pmUserInfo.data = {
        disabled: true
      };
      window.pmUserInfo.appendChild(document.createElement("div"));
      window.pmUserInfo.firstChild.style.backgroundImage = "url(" + e.icon + ")";
      window.pmUserInfo.firstChild.classList.add("userImage");
      window.pmUserInfo.appendChild(document.createElement("div"));
      window.pmUserInfo.children[1].innerHTML = e.title;
      window.pmUserInfo.children[1].classList.add("userName");
    })["catch"](function (canCreateDiscussions) {
    });
  } else {
    window.pmUserInfo.style.display = "none";
  }
  module.exports = m;
}, function (module, exports, require) {//require(22)
  module.exports = require(23);
  module.exports.prototype.name = "stb-component-page";
}, function (module, exports, require) {//require(23)
  function Render(event) {
    event = event || {};
    this.active = false;
    this.activeComponent = null;
    b.call(this, event);
    this.active = this.$node.classList.contains("active");
    if (this.$node.parentNode === null) {
      document.body.appendChild(this.$node);
    }
    this.page = this;
  }

  var b = require(24);
  Render.prototype = Object.create(b.prototype);
  Render.prototype.constructor = Render;
  Render.prototype.name = "spa-component-page";
  module.exports = Render;
}, function (module, exports, require) {//require(24)
  function Show(data) {
    var element = this;
    data = data || {};
    this.visible = true;
    this.focusable = true;
    this.$node = null;
    this.$body = null;
    this.parent = null;
    this.children = [];
    this.propagate = !!data.propagate;
    NumericType.call(this);
    this.$node = data.$node || document.createElement("div");
    this.$body = data.$body || this.$node;
    this.$node.className = this.name + " " + (data.className || "");
    this.id = data.id || this.$node.id || "cid" + cid++;
    if (data.parent) {
      data.parent.add(this);
    }
    if (data.visible === false) {
      this.hide();
    }
    if (data.focusable === false) {
      this.focusable = false;
    }
    if (this.defaultEvents) {
      data.events = data.events || {};
      for (var i in this.defaultEvents) {
        if (this.defaultEvents.hasOwnProperty(i)) {
          data.events[i] = data.events[i] || this.defaultEvents[i];
        }
      }
    }
    if (data.events) {
      Object.keys(data.events).forEach(function (eventName) {
        element.addListener(eventName, data.events[eventName]);
      });
    }
    if (data.children) {
      this.add.apply(this, data.children);
    }
    this.$node.addEventListener("click", function (e) {
      element.focus();
      if (element.events["click"]) {
        element.emit("click", e);
      }
      e.stopPropagation();
    });
  }

  var view = require(3);
  var NumericType = require(4);
  var cid = 0;
  Show.prototype = Object.create(NumericType.prototype);
  Show.prototype.constructor = Show;
  Show.prototype.defaultEvents = null;
  Show.prototype.add = function (obj) {
    var length = arguments.length;
    for (var arg = 0; arg < length; arg++) {
      obj = arguments[arg];
      this.children.push(obj);
      obj.parent = this;
      if (obj.$node && obj.$node.parentNode === null) {
        this.$body.appendChild(obj.$node);
      }
      if (this.events["add"]) {
        this.emit("add", {
          item: obj
        });
      }
    }
  };
  Show.prototype.remove = function () {
    if (this.parent) {
      if (view.activePage.activeComponent === this) {
        this.blur();
        this.parent.focus();
      }
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
    this.children.forEach(function (inventoryService) {
      inventoryService.remove();
    });
    this.events = {};
    this.$node.parentNode.removeChild(this.$node);
    if (this.events["remove"]) {
      this.emit("remove");
    }
  };
  Show.prototype.focus = function (e) {
    var state = view.activePage;
    var self = state.activeComponent;
    return this.focusable && this !== self && (self && self.blur(), state.activeComponent = self = this, self.$node.classList.add("focus"), self.events["focus"] && self.emit("focus", e), true);
  };
  Show.prototype.blur = function () {
    var store = view.activePage;
    var remote = store.activeComponent;
    this.$node.classList.remove("focus");
    return this === remote && (store.activeComponent = null, this.events["blur"] && this.emit("blur"), true);
  };
  Show.prototype.show = function (e) {
    return !!this.visible || (this.$node.classList.remove("hidden"), this.visible = true, this.events["show"] && this.emit("show", e), true);
  };
  Show.prototype.hide = function () {
    return !this.visible || (this.$node.classList.add("hidden"), this.visible = false, this.events["hide"] && this.emit("hide"), true);
  };
  module.exports = Show;
}, function (module, exports, require) {//require(25)
  var startYNew = require(26);
  var self = new startYNew({
    $node: document.getElementById("widgetHintButtons"),
    visible: false
  });
  var articles = {
    BACK: document.getElementById("hintBack"),
    SEARCH: document.getElementById("hintSearch"),
    MORE: document.getElementById("hintMore"),
    GUIDE: document.getElementById("hintGuide")
  };
  for (var i in articles) {
    articles[i].$icon = articles[i].appendChild(document.createElement("div"));
    articles[i].$label = articles[i].appendChild(document.createElement("div"));
    articles[i].$label.className = "hintText";
  }
  self.updateView = function (t, name) {
    this.show();
    for (var k in t) {
      if (t.hasOwnProperty(k)) {
        if (t[k].visible) {
          articles[k].$icon.className = "ico " + t[k].icon;
          articles[k].style.display = "";
          articles[k].$label.innerHTML = t[k].text;
        } else {
          articles[k].style.display = "none";
        }
      }
    }
    if (name) {
      self.$node.className = "component widget " + name;
    } else {
      self.$node.className = "component widget";
    }
  };
  module.exports = self;
}, function (module, exports, require) {//require(26)
  function Modal(element) {
    element = element || {};
    element.focusable = element.focusable || false;
    element.visible = element.visible || false;
    m.call(this, element);
  }

  var m = require(24);
  Modal.prototype = Object.create(m.prototype);
  Modal.prototype.constructor = Modal;
  Modal.prototype.name = "spa-component-widget";
  module.exports = Modal;
}, function (module, exports, require) {//require(27)
  function render() {
    if (c) {
      self.$node.style.backgroundImage = "url(" + sounds[i].src + ")";
      ++i;
      if (i === 4) {
        i = 0;
      }
    }
    timeout = setTimeout(render, 200);
  }

  var startYNew = require(26);
  var self = new startYNew({
    $node: document.getElementById("loaderWidget"),
    visible: false
  });
  var timeout = -1;
  var i = 0;
  var c = false;
  var sounds = [];
  !function () {
    debug('MODULE 27 - preloader');
    var e = 4;
    ["img/loader/1.png", "img/loader/2.png", "img/loader/3.png", "img/loader/4.png"].forEach(function (url) {
      var i = new Image;
      i.src = url;
      i.onload = function () {
        --e;
        if (e === 0) {
          c = true;
        }
      };
      sounds.push(i);
    });
  }();
  self.show = function (e) {
    return !!this.visible || (this.$node.classList.remove("hidden"), this.visible = true, this.events["show"] !== undefined && this.emit("show", e), timeout = setTimeout(render, 200), true);
  };
  self.hide = function () {
    i = 1;
    clearTimeout(timeout);
    return !this.visible || (this.$node.classList.add("hidden"), this.visible = false, this.events["hide"] !== undefined && this.emit("hide"), true);
  };
  module.exports = self;
}, function (module, exports, require) {//require(28)
  var a = require(1);
  var data = {
    types: {
      CATEGORY_HEADER: 1,
      CATEGORY_ITEM: 2
    },
    content: {
      data: [],
      focusIndex: 1,
      tabs: []
    },
    activeTab: 3
  };
  data.content.data.push({
    disabled: false,
    onclick: function () {
      a.route(a.pages.search);
    },
    type: data.types.CATEGORY_ITEM,
    value: gettext("Search"),
    id: -2,
    className: "icon search"
  });
  data.content.data.push({
    disabled: false,
    tabIndex: 3,
    type: data.types.CATEGORY_ITEM,
    value: gettext("Main"),
    id: -2,
    className: "icon what-to-watch"
  });
  data.content.data.push({
    disabled: false,
    tabIndex: 2,
    type: data.types.CATEGORY_ITEM,
    value: gettext("Settings"),
    id: -2,
    className: "icon player-settings"
  });
  module.exports = data;
}, function (module, exports, require) {//require(29)
  var inst;
  var result = require(13);
  var link = require(1);
  var ctor = require(30);
  var self = require(28);
  inst = new ctor({
    $node: window.pmListMainMenu,
    $body: window.pmListMainMenuBody,
    className: "hidden",
    data: self.content.data,
    size: link.data.metrics.mainMenuSize,
    focusIndex: self.content.focusIndex,
    render: function (node, options) {
      if (!node.ready) {
        node.$icon = document.createElement("span");
        node.appendChild(node.$icon);
        node.$label = document.createElement("span");
        node.appendChild(node.$label);
        node.ready = true;
      }
      if (options.type === self.types.CATEGORY_ITEM) {
        node.$icon.className = options.className || "image";
        node.$icon.style.backgroundImage = options.icon ? "url(" + options.icon + ")" : "none";
        node.$label.className = "itemLabel";
        node.$label.innerHTML = options.value;
      } else if (options.type === self.types.CATEGORY_HEADER) {
        node.$icon.className = "";
        node.$label.className = "categorylabel";
        node.$label.innerHTML = options.value;
      }
    },
    visible: false,
    events: {
      keydown: function (key) {
        switch (key.code) {
          case result.back:
          case result.right:
          case result.info:
            this.hide();
            self.content.tabs[self.activeTab].activate();
            key.stop = true;
            break;
          case result.up:
          case result.down:
          case result.pageUp:
          case result.pageDown:
          case result.home:
          case result.end:
            this.move(key.code);
            break;
          case result.ok:
            this.emit("click:item", {
              $item: this.$focusItem,
              event: key
            });
        }
      },
      "click:item": function (context) {
        this.hide();
        if (typeof context.$item.data.onclick == "function") {
          self.content.tabs[self.activeTab].activate(context.$item.data);
          context.$item.data.onclick();
        } else {
          self.content.tabs[self.activeTab].hide();
          self.activeTab = context.$item.data.tabIndex;
          self.content.tabs[self.activeTab].activate(context.$item.data);
        }
      },
      focus: function () {
        this.show();
      }
    }
  });
  inst.move = function (key) {
    var selectedItem = null;
    var cell = null;
    if (key === result.up && this.$focusItem && this.$focusItem.index > 0) {
      if (this.$focusItem === this.$body.firstChild) {
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
      cell = this.viewIndex < this.size ? 0 : this.viewIndex - this.size + 1;
      selectedItem = this.$body.firstChild;
    }
    if (key === result.pageDown) {
      if (this.data.length > this.size) {
        cell = this.viewIndex > this.data.length - 2 * this.size ? this.data.length - this.size : this.viewIndex + this.size - 1;
        selectedItem = this.$body.lastChild;
      } else {
        selectedItem = this.$body.children[this.data.length - 1];
      }
    }
    if (key === result.home) {
      cell = 0;
      selectedItem = this.$body.firstChild;
    }
    if (key === result.end) {
      if (this.data.length > this.size) {
        cell = this.data.length - this.size;
        selectedItem = this.$body.lastChild;
      } else {
        selectedItem = this.$body.children[this.data.length - 1];
      }
    }
    if (cell !== null) {
      this.renderView(cell);
    }
    if (selectedItem !== null) {
      this.focusItem(selectedItem);
    }
    if (this.$focusItem.data.disabled) {
      if (this.$focusItem.index > 0) {
        this.move(key);
      } else if (key === result.up) {
        this.move(result.down);
      }
    }
  };
  module.exports = inst;
}, function (module, exports, require) {//require(30)
  function Init(event) {
    event = event || {};
    this.$focusItem = null;
    this.viewIndex = null;
    this.data = [];
    this.type = this.TYPE_VERTICAL;
    this.size = 5;
    this.cycle = false;
    this.scroll = null;
    if (event.type) {
      this.type = event.type;
    }
    this.provider = null;
    if (this.type === this.TYPE_HORIZONTAL) {
      event.className += " horizontal";
    }
    message.call(this, event);
    this.init(event);
  }

  function get(labels) {
    var returnValue;
    var length = labels.length;
    for (var i = 0; i < length; i++) {
      returnValue = labels[i];
      if (typeof returnValue != "object") {
        returnValue = labels[i] = {
          value: labels[i]
        };
      }
    }
    return labels;
  }

  var message = require(31);
  var k = require(13);
  Init.prototype = Object.create(message.prototype);
  Init.prototype.constructor = Init;
  Init.prototype.name = "mag-component-list";
  Init.prototype.TYPE_VERTICAL = 1;
  Init.prototype.TYPE_HORIZONTAL = 2;
  Init.prototype.renderItemDefault = function (data, target) {
    data.innerText = target.value;
  };
  Init.prototype.renderItem = Init.prototype.renderItemDefault;
  Init.prototype.defaultEvents = {
    mousewheel: function (event) {
      if (this.type === this.TYPE_VERTICAL && event.wheelDeltaY) {
        this.move(event.wheelDeltaY > 0 ? k.up : k.down);
      }
      if (this.type === this.TYPE_HORIZONTAL && event.wheelDeltaX) {
        this.move(event.wheelDeltaX > 0 ? k.left : k.right);
      }
    },
    keydown: function (key) {
      switch (key.code) {
        case k.up:
        case k.down:
        case k.right:
        case k.left:
        case k.pageUp:
        case k.pageDown:
        case k.home:
        case k.end:
          this.move(key.code);
          break;
        case k.enter:
          if (this.events["click:item"] && this.$focusItem) {
            this.emit("click:item", {
              $item: this.$focusItem,
              event: key
            });
          }
      }
    }
  };
  Init.prototype.init = function (options) {
    debug('MODULE 30 - prototype.init()');
    var data;
    var self = this;
    var value = this.$body.children.length;
    var update = function (event) {
      if (this.data) {
        self.focusItem(this);
        if (self.events["click:item"]) {
          self.emit("click:item", {
            $item: this,
            event: event
          });
        }
      }
    };
    if (options.cycle !== undefined) {
      this.cycle = options.cycle;
    }
    if (options.scroll) {
      this.scroll = options.scroll;
    }
    if (options.provider) {
      this.provider = options.provider;
    }
    if (options.render) {
      this.renderItem = options.render;
    }
    if (options.size) {
      this.size = options.size;
    }
    if (options.events) {
      Object.keys(options.events).forEach(function (eventName) {
        self.events[eventName] = null;
        self.addListener(eventName, options.events[eventName]);
      });
    }
    if (this.size !== value) {
      if (value > 0) {
        this.$body.innerText = null;
      }
      var length = this.size;
      for (var index = 0; index < length; index++) {
        data = document.createElement("div");
        data.index = index;
        data.className = "item";
        data.addEventListener("click", update);
        this.$body.appendChild(data);
      }
    }
    if (this.provider) {
      this.provider.get(null, function (imageInfoItem, serializedData) {
        if (imageInfoItem) {
          if (self.events["data:error"]) {
            self.emit("data:error", imageInfoItem);
          }
        } else {
          if (serializedData) {
            options.data = serializedData;
            self.setData(options);
            if (self.scroll) {
              self.scroll.init({
                realSize: self.provider.maxCount,
                viewSize: self.provider.size,
                value: self.provider.head + self.provider.pos
              });
            }
          }
          if (self.events["data:get"]) {
            self.emit("data:get");
          }
        }
      });
    } else if (options.data) {
      this.setData(options);
    }
  };
  Init.prototype.setData = function (data) {
    debug('MODULE 30 - prototype.setData()');
    if (data.data) {
      this.data = get(data.data);
    }
    this.viewIndex = null;
    if (this.$focusItem) {
      this.blurItem(this.$focusItem);
    }
    if (this.scroll) {
      if (this.provider) {
        if (this.scroll.realSize !== this.provider.maxCount) {
          this.scroll.init({
            realSize: this.provider.maxCount,
            viewSize: this.provider.size,
            value: this.provider.head + this.provider.pos
          });
        }
      } else {
        this.scroll.init({
          realSize: this.data.length,
          viewSize: this.size,
          value: data.viewIndex || 0
        });
      }
    }
    if (data.focusIndex !== undefined && this.data.length) {
      this.focusIndex(data.focusIndex);
    } else {
      this.renderView(data.viewIndex || 0);
    }
  };
  Init.prototype.renderView = function (data) {
    debug('MODULE 30 - prototype.renderView()');
    var item;
    var event;
    var prevIndex;
    var RoxyFilemanConf;
    if (this.viewIndex !== data) {
      prevIndex = this.viewIndex;
      this.viewIndex = RoxyFilemanConf = data;
      var length = this.size;
      for (var i = 0; i < length; i++) {
        item = this.$body.children[i];
        event = this.data[data];
        if (event) {
          item.data = event;
          item.index = data;
          this.renderItem(item, event);
          if (event.mark) {
            item.classList.add("mark");
          } else {
            item.classList.remove("mark");
          }
        } else {
          item.data = item.index = undefined;
          item.innerHTML = "&nbsp;";
          item.ready = false;
        }
        data++;
      }
      if (this.events["move:view"]) {
        this.emit("move:view", {
          prevIndex: prevIndex,
          currIndex: RoxyFilemanConf
        });
      }
      if (this.events["select:item"]) {
        this.emit("select:item", {
          $item: item
        });
      }
      if (this.scroll) {
        this.scroll.scrollTo(this.provider ? this.provider.head + this.provider.pos : this.viewIndex);
      }
      return true;
    }
    return false;
  };
  Init.prototype.move = function (type) {
    debug('MODULE 30 - prototype.move()');
    var view = this;
    var isStatement = false;
    if (this.data.length) {
      switch (type) {
        case k.left:
          if (this.type !== this.TYPE_HORIZONTAL) {
            break;
          }
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
                this.provider.get(type, function (e, instancesTypes, n) {
                  if (e) {
                    if (view.events["data:error"]) {
                      view.emit("data:error", e);
                    }
                  } else if (instancesTypes) {
                    view.setData({
                      data: instancesTypes,
                      focusIndex: n || n === 0 ? n : view.$focusItem.index
                    });
                  }
                });
              } else {
                if (this.cycle) {
                  this.move(k.end);
                }
                if (this.events["overflow"]) {
                  this.emit("overflow", {
                    direction: type,
                    cycle: this.cycle
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
                this.provider.get(type, function (e, instancesTypes, n) {
                  if (e) {
                    if (view.events["data:error"]) {
                      view.emit("data:error", e);
                    }
                  } else if (instancesTypes) {
                    view.setData({
                      data: instancesTypes,
                      focusIndex: n || n === 0 ? n : view.$focusItem.index
                    });
                  }
                });
              } else {
                if (this.cycle) {
                  this.move(k.home);
                }
                if (this.events["overflow"]) {
                  this.emit("overflow", {
                    direction: type,
                    cycle: this.cycle
                  });
                }
              }
            }
          }
          break;
        case k.pageUp:
          if (this.provider) {
            return void this.provider.get(type, function (e, instancesTypes, n) {
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else if (instancesTypes) {
                view.setData({
                  data: instancesTypes,
                  focusIndex: n ? n : 0
                });
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
            this.provider.get(type, function (e, instancesTypes, n) {
              var k;
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else if (instancesTypes) {
                k = n || n === 0 ? n : instancesTypes.length < view.size ? instancesTypes.length - 1 : view.size - 1;
                view.setData({
                  data: instancesTypes,
                  focusIndex: k
                });
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
            this.provider.get(type, function (e, instancesTypes, n) {
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else if (instancesTypes) {
                view.setData({
                  data: instancesTypes,
                  focusIndex: n ? n : 0
                });
              }
            });
            break;
          }
          this.renderView(0);
          this.focusItem(this.$body.firstChild);
          break;
        case k.end:
          if (this.provider) {
            this.provider.get(type, function (e, instancesTypes, n) {
              var k;
              if (e) {
                if (view.events["data:error"]) {
                  view.emit("data:error", e);
                }
              } else if (instancesTypes) {
                k = n || n === 0 ? n : instancesTypes.length < view.size ? instancesTypes.length - 1 : view.size - 1;
                view.setData({
                  data: instancesTypes,
                  focusIndex: k
                });
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
  Init.prototype.focusItem = function (item) {
    var x = this.$focusItem;
    return item && x !== item && (x !== null && (x.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
      $item: x
    })), this.$focusItem = item, this.$focusItem.data = this.data[this.$focusItem.index], item.classList.add("focus"), this.events["focus:item"] && this.emit("focus:item", {
      $prev: x,
      $curr: item
    }), this.events["select:item"] && this.emit("select:item", {
      $item: item
    }), true);
  };
  Init.prototype.blurItem = function (item) {
    return !!item && (item === this.$focusItem && (this.$focusItem = null), item.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
      $item: item
    }), true);
  };
  Init.prototype.focusIndex = function (i) {
    var start = this.viewIndex || 0;
    if (i >= start + this.size) {
      i = i < this.data.length - 1 ? i : this.data.length - 1;
      this.renderView(i - this.size + 1);
      this.focusItem(this.$body.lastChild);
    } else if (i < start) {
      i = i > 0 ? i : 0;
      this.renderView(i);
      this.focusItem(this.$body.firstChild);
    } else {
      if (this.viewIndex === null) {
        this.renderView(0);
      }
      this.focusItem(this.$body.children[i - start]);
    }
  };
  Init.prototype.markItem = function (index, options) {
    if (options) {
      index.classList.add("mark");
    } else {
      index.classList.remove("mark");
    }
    index.data.mark = options;
  };
  module.exports = Init;
}, function (module, exports, require) {//require(31)
  module.exports = require(24);
}, function (module, exports, require) {//require(32)
  function render(i, t) {
    var key = 1 ^ i;
    if (!lowest_high_x) {
      if (t) {
        lowest_high_x = true;
        model.getPage({
          page: page - 1,
          count: 1
        }).then(function (charge) {
          --page;
          --current;
          nodes[key].model.init({
            channel: charge[0]
          });
          k = key;
          j = i;
          type = key;
        }, function (canCreateDiscussions) {
        });
      } else {
        if (nodes[j].data.length === 0) {
          return void nodes[i].emit("view:ready");
        }
        lowest_high_x = true;
        model.getPage({
          page: current + 1,
          count: 1
        }).then(function (charge) {
          ++page;
          ++current;
          nodes[i].model.init({
            channel: charge[0]
          });
          k = key;
          j = i;
          type = key;
        }, function (size) {
          lowest_high_x = false;
          if (size === "overflow") {
            ++page;
            ++current;
            nodes[i].model.init({
              channel: {
                id: "!",
                title: ""
              }
            });
            nodes[i].data = [];
            nodes[i].viewIndex = null;
            nodes[i].renderView(0);
            nodes[i].focusIndex(0);
            nodes[i].$title.innerHTML = "";
            k = key;
            j = i;
            type = key;
            nodes[k].$node.style.top = "0";
            nodes[j].$node.style.top = pos;
            nodes[type].focus();
          }
        });
      }
    }
  }

  var options = require(13);
  var item = require(1);
  var Menu = require(33);
  var $realtime = require(30);
  var RootView = require(35);
  var that = require(36);
  var $Element = require(37);
  var Model = require(38);
  var model = require(46);
  var fakeInputElement = require(29);
  var nodes = [];
  var title = document.getElementById("pm");
  var type = 0;
  var self = new Menu({
    $node: document.getElementById("pmTabCategoryContent"),
    className: "tab hidden",
    visible: false,
    events: {
      focus: function () {
        nodes[type].focus();
      },
      show: function () {
        title.style.backgroundImage = "";
      }
    }
  });
  var view = new RootView({
    $node: document.getElementById("pmCategorySearch"),
    $body: document.getElementById("pmCategorySearchBody"),
    className: "component input tabInputSearch",
    events: {
      focus: function () {
        this.setValue("");
        item.route(item.pages.search);
      }
    }
  });
  var searchContactPanel = require(27);
  var pos = 0;
  var k = 0;
  var j = 1;
  var page = 0;
  var current = 1;
  var timeout = -1;
  var lowest_high_x = true;
  model.addListener("category:changed", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      searchContactPanel.hide();
    }, 1e4);
    if (nodes.length === 0) {
      nodes.push(new $Element({
        $node: document.getElementById("pmListCategoryVideos0Node"),
        $body: document.getElementById("pmListCategoryVideos0Body"),
        $title: document.getElementById("pmCategoryChannelTitle0"),
        className: "listMovie0Node",
        model: new Model({
          type: "video"
        }),
        size: 5,
        viewIndex: 0,
        focusIndex: 0,
        type: $realtime.prototype.TYPE_HORIZONTAL,
        events: {
          overflow: function (data) {
            if (data.direction === options.left) {
              fakeInputElement.focus();
            }
          },
          "view:ready": function () {
            nodes[k].$node.style.top = "0";
            if (nodes[j]) {
              nodes[j].$node.style.top = pos;
            }
            this.$title.innerHTML = this.model.channel.title;
            this.show();
            searchContactPanel.hide();
            clearTimeout(timeout);
            nodes[type].focus();
            lowest_high_x = false;
          },
          "view:error": function (view) {
            lowest_high_x = false;
            if (view === "empty") {
              this.data = [{
                id: "",
                value: "",
                publishedAt: "",
                icon: "img/no.image.png",
                duration: "",
                title: gettext("No videos"),
                channelTitle: "",
                viewCount: "",
                locale: {
                  publishedAt: "",
                  viewCount: "",
                  channelTitle: ""
                }
              }];
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[type];
              nodes[k].$node.style.top = "0";
              if (nodes[j]) {
                nodes[j].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              this.show();
              searchContactPanel.hide();
              clearTimeout(timeout);
              nodes[type].focus();
            } else {
              if (page === 0) {
                render(0, false);
              }
            }
          },
          "click:item": function (context) {
            if (context.$item.data.id) {
              that.setContent({
                channel: this.model.channel,
                video: context.$item.data,
                playlist: this.data,
                position: context.$item.index
              });
            }
          }
        }
      }));
      nodes.push(new $Element({
        $node: document.getElementById("pmListCategoryVideos1Node"),
        $body: document.getElementById("pmListCategoryVideos1Body"),
        $title: document.getElementById("pmCategoryChannelTitle1"),
        className: "listMovie1Node",
        model: new Model({
          type: "video"
        }),
        size: 5,
        viewIndex: 0,
        focusIndex: 0,
        type: $realtime.prototype.TYPE_HORIZONTAL,
        events: {
          overflow: function (data) {
            if (data.direction === options.left) {
              fakeInputElement.focus();
              self.focusEntry = this;
            }
          },
          "view:ready": function () {
            nodes[k].$node.style.top = "0";
            nodes[j].$node.style.top = pos;
            this.$title.innerHTML = this.model.channel.title;
            this.show();
            searchContactPanel.hide();
            clearTimeout(timeout);
            nodes[type].focus();
            lowest_high_x = false;
          },
          "view:error": function (view) {
            lowest_high_x = false;
            if (view === "empty") {
              this.data = [{
                id: "",
                value: "",
                publishedAt: "",
                icon: "img/no.image.png",
                duration: "",
                title: gettext("No videos"),
                channelTitle: "",
                viewCount: "",
                locale: {
                  publishedAt: "",
                  viewCount: "",
                  channelTitle: ""
                }
              }];
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[type];
              nodes[k].$node.style.top = "0";
              if (nodes[j]) {
                nodes[j].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              this.show();
              searchContactPanel.hide();
              clearTimeout(timeout);
              nodes[type].focus();
            }
          },
          "click:item": function (context) {
            if (context.$item.data.id) {
              that.setContent({
                channel: this.model.channel,
                video: context.$item.data,
                playlist: this.data,
                position: context.$item.index
              });
            }
          }
        }
      }));
      self.add(nodes[0]);
      self.add(nodes[1]);
      nodes[0].focus();
      nodes[0].addListener("keydown", function (key) {
        if (key.code === options.down) {
          render(0, false);
        } else if (key.code === options.up) {
          if (page > 0) {
            render(0, true);
          } else {
            view.focus();
          }
        } else if (key.code === options.playPause) {
          that.setContent({
            channel: this.model.channel,
            video: this.$focusItem.data,
            playlist: this.data,
            position: this.$focusItem.index
          });
        }
      });
      nodes[1].addListener("keydown", function (key) {
        if (key.code === options.down) {
          render(1, false);
        } else if (key.code === options.up) {
          if (page > 0) {
            render(1, true);
          } else {
            view.focus();
          }
        } else if (key.code === options.playPause) {
          that.setContent({
            channel: this.model.channel,
            video: this.$focusItem.data,
            playlist: this.data,
            position: this.$focusItem.index
          });
        }
      });
      pos = window.getComputedStyle(nodes[1].$node).getPropertyValue("top");
    }
    model.getPage({
      page: 0,
      count: 1
    }).then(function (charge) {
      page = 0;
      k = 0;
      j = 1;
      current = 1;
      type = 0;
      nodes[k].model.filter({
        channel: charge[0]
      });
      model.getPage({
        page: 1,
        count: 1
      }).then(function (charge) {
        nodes[j].model.filter({
          channel: charge[0]
        });
        nodes[type].focus();
      });
    })["catch"](function (canCreateDiscussions) {
    });
  });
  self.activate = function (parent) {
    this.show();
    if (model.setActiveCategory(parent)) {
      searchContactPanel.show();
    } else {
      nodes[type].focus();
    }
  };
  self.add(view);
  module.exports = self;
}, function (module, exports, require) {//require(33)
  module.exports = require(34);
  module.exports.prototype.name = "stb-component-panel";
}, function (module, exports, require) {//require(34)
  function Modal(element) {
    element = element || {};
    element.focusable = element.focusable || false;
    m.call(this, element);
  }

  var m = require(24);
  Modal.prototype = Object.create(m.prototype);
  Modal.prototype.constructor = Modal;
  Modal.prototype.name = "spa-component-panel";
  module.exports = Modal;
}, function (module, exports, require) {//require(35)
  function Init(config) {
    config = config || {};
    this.name = "component";
    this.value = "";
    this.type = this.TYPE_TEXT;
    config.className = "input " + (config.className || "");
    b.call(this, config);
    this.$line = this.$body.appendChild(document.createElement("div"));
    this.$line.className = "line";
    this.$caret = this.$line.appendChild(document.createElement("div"));
    this.$caret.className = "caret";
    this.$placeholder = this.$line.appendChild(document.createElement("div"));
    this.$placeholder.className = "placeholder";
    this.$caret.index = 0;
    this.init(config);
  }

  var b = require(31);
  var ret = require(13);
  Init.prototype = Object.create(b.prototype);
  Init.prototype.constructor = Init;
  Init.prototype.TYPE_TEXT = 0;
  Init.prototype.TYPE_PASSWORD = 1;
  Init.prototype.defaultEvents = {
    keypress: function (key) {
      this.addChar(String.fromCharCode(key.keyCode), this.$caret.index);
    },
    keydown: function (key) {
      switch (key.code) {
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
  Init.prototype.init = function (options) {
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
  Init.prototype.addChar = function (text, index) {
    var span = document.createElement("div");
    index = index === undefined ? this.$caret.index : index;
    if (this.value.length === 0) {
      this.$line.removeChild(this.$placeholder);
    }
    span.className = "char";
    this.value = this.value.substring(0, index) + text + this.value.substring(index, this.value.length);
    ++this.$caret.index;
    if (this.type === this.TYPE_PASSWORD) {
      span.innerText = "*";
    } else if (text === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.innerText = text;
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
        value: this.value
      });
    }
  };
  Init.prototype.removeChar = function (char) {
    var oldValue = this.value;
    char = char === undefined ? this.$caret.index - 1 : char;
    if (this.value.length > 0) {
      if (this.$caret.index === char && char < this.value.length) {
        this.$line.removeChild(this.$line.children[char + 1]);
      } else if (this.$caret.index > char) {
        --this.$caret.index;
        this.$line.removeChild(this.$line.children[char]);
      }
      this.value = this.value.substring(0, char) + this.value.substring(char + 1, this.value.length);
      if (this.events["input"] && oldValue !== this.value) {
        this.emit("input", {
          value: this.value
        });
      }
    }
    if (this.value.length === 0) {
      this.$line.appendChild(this.$placeholder);
    }
  };
  Init.prototype.setCaretPosition = function (position) {
    if (position >= 0 && position <= this.value.length && this.$caret.index !== position) {
      this.$line.removeChild(this.$caret);
      if (position === this.value.length) {
        this.$line.appendChild(this.$caret);
      } else {
        this.$line.insertBefore(this.$caret, this.$line.children[position]);
      }
      this.$caret.index = position;
    }
  };
  Init.prototype.setValue = function (value) {
    if (value !== this.value) {
      var span;
      var this_length = this.value.length;
      var length = value.length;
      var i;
      if (length > 0) {
        if (this.$placeholder.parentNode === this.$line) {
          this.$line.removeChild(this.$placeholder);
        }
        this.$line.removeChild(this.$caret);
        if (length !== this_length) {
          var n = length - this_length;
          if (n > 0) {
            for (i = 0; i < n; i++) {
              span = this.$line.appendChild(document.createElement("div"));
              span.className = "char";
            }
          } else {
            for (i = 0; i > n; i--) {
              this.$line.removeChild(this.$line.lastChild);
            }
          }
        }
        for (i = 0; i < length; i++) {
          span = this.$line.children[i];
          if (this.type === this.TYPE_PASSWORD) {
            span.innerHTML = "*";
          } else if (value[i] === " ") {
            span.innerHTML = "&nbsp;";
          } else {
            span.innerText = value[i];
          }
        }
        this.value = value;
        this.$caret.index = length;
        this.$line.appendChild(this.$caret);
      } else {
        this.value = "";
        this.$line.innerText = "";
        this.$line.appendChild(this.$caret);
        this.$line.appendChild(this.$placeholder);
      }
      if (this.events["input"]) {
        this.emit("input", {
          value: this.value
        });
      }
    }
  };
  module.exports = Init;
}, function (module, exports, require) {//require(36)
  var base_js = "", signatureCipher, url_cipher;

  function decipher(modify, signature) {
    modify = modify.split(";");
    var res = signature.split("");
    var length = modify.length;
    for (var i = 0; i < length; i++) {
      if (modify[i] === "r") {
        res = res.reverse();
      } else if (modify[i][0] === "c") {
        var index = parseInt(modify[i].substr(1)) % res.length;
        var c = res[0];
        res[0] = res[index];
        res[index] = c;
      } else if (modify[i][0] === "s") {
        res = res.splice(parseInt(modify[i].substr(1)));
      }
    }
    return res.join("");
  }

  var mockFormAttributeDataResponse;
  var event = require(1);
  var o = false;
  var searchContactPanel = require(27);
  mockFormAttributeDataResponse = {
    intent: null,
    movie: {},
    channel: {},
    playlist: null,
    setContent: function (data) {
      debug("MODULE 36 - setContent()");
      o = true;
      if (!data.urlParseErrorCount) {
        data.urlParseErrorCount = 0;
      }
      if (data.channel !== undefined) {
        this.channel = data.channel;
      } else {
        this.channel = {
          title: data.video.channelTitle,
          id: data.video.channelId
        };
      }
      this.playlist = data.playlist;
      this.listPosition = data.position;
      this.context = null;
      this.prepare(data);
    },
    prepare: function (element, data) {
      debug("MODULE 36 - prepare()");
      debug("https://www.youtube.com/watch?v=" + element.video.id);
      var $scope = this;
      this.movie.title = element.video.title;
      this.movie.id = element.video.id;
      searchContactPanel.show();
      ajax("get", "https://www.youtube.com/watch?v=" + element.video.id, function (result, status) {
        searchContactPanel.hide();
        if (status !== 200) {
          return window.core.notify({
            title: "Request got bad http status (" + status + ")",
            icon: "alert",
            type: "warning",
            timeout: 5E3
          });
        }
        try {
          var url = "";
          var formats = [];
          var regexp;
          url_cipher = "";
          regexp = result.match(/"formats(.?)":(\[[^\]]+])/);
          if (regexp) {
            if (regexp[1].length) {
              regexp[2] = regexp[2].replace(/\\(.)/g, "$1");
            }
            formats = formats.concat(JSON.parse(regexp[2]));
          }
          regexp = result.match(/"adaptiveFormats(.?)":(\[[^\]]+])/);
          if (regexp) {
            if (regexp[1].length) {
              regexp[2] = regexp[2].replace(/\\(.)/g, "$1");
            }
            formats = formats.concat(JSON.parse(regexp[2]));
          }
          //debug(JSON.stringify(formats));
          var length = formats.length;
          var id = -1;
          var width = 0;
          for (var i = 0; i < length; i++) {
            if (formats[i]["mimeType"].match(/^video\/(?:mp4|3gpp);/) && formats[i].hasOwnProperty("audioChannels") && formats[i].hasOwnProperty("width") && width < formats[i]["width"]) {
              id = i;
              width = formats[i]["width"];
            }
          }
          if (id >= 0) {
            if (formats[id].hasOwnProperty("url")) {
              debug("URL #" + id + "/" + (length - 1) + ", mimeType: " + formats[id]["mimeType"] + ", qualityLabel: " + formats[id]["qualityLabel"]);
              url = formats[id]["url"];
            } else if (formats[id].hasOwnProperty("signatureCipher")) {
              signatureCipher = formats[id]["signatureCipher"];
              base_js = result.match(/"jsUrl":"([^"]+)"/);
              base_js = base_js[1];
              if (base_js) {
                //debug(base_js);
                if (base_js in CACHE_CIPHER) {
                  //debug(CACHE_CIPHER[base_js]);
                  signatureCipher = signatureCipher.split("&");
                  //debug(signatureCipher);
                  var signature = decodeURIComponent(signatureCipher[0].substr(2));
                  //debug(signature);
                  //debug(decipher(CACHE_CIPHER[base_js], signature));
                  debug("CIPHER #" + id + "/" + (length - 1) + ", mimeType: " + formats[id]["mimeType"] + ", qualityLabel: " + formats[id]["qualityLabel"]);
                  url = decodeURIComponent(signatureCipher[2].substr(4)) + "&sig=" + encodeURIComponent(decipher(CACHE_CIPHER[base_js], signature));
                } else {
                  url_cipher = "true";
                  ajax("get", "https://www.youtube.com" + base_js, function (result_js, status_js) {
                    if (status_js === 200) {
                      var script = result_js.match(/a=a\.split\(""\);(.+?);return a\.join\(""\)/);
                      script = script[1].split(";");
                      //debug(script);
                      var script_length = script.length;
                      var modify = [];
                      for (var ii = 0; ii < script_length; ii++) {
                        var func = script[ii].match(/[\w\d]+\.([\w\d]+)\(a,(\d+)\)/);
                        //debug(func);
                        var tmp = result_js.match(new RegExp(func[1] + ':function\\(a\\){a\\.reverse\\(\\)}')) || [];
                        if (tmp.length) {
                          modify.push("r");
                          continue;
                        }
                        tmp = result_js.match(new RegExp(func[1] + ':function\\(a,b\\){var c=a\\[0\\];a\\[0\\]=a\\[b%a\\.length\\];a\\[b%a\\.length\\]=c}')) || [];
                        if (tmp.length) {
                          modify.push("c" + func[2]);
                          continue;
                        }
                        tmp = result_js.match(new RegExp(func[1] + ':function\\(a,b\\){a\\.splice\\(0,b\\)}')) || [];
                        if (tmp.length) {
                          modify.push("s" + func[2]);
                        }
                      }
                      CACHE_CIPHER[base_js] = modify.join(";");
                      //debug(CACHE_CIPHER[base_js]);
                      signatureCipher = signatureCipher.split("&");
                      //debug(signatureCipher);
                      var signature = decodeURIComponent(signatureCipher[0].substr(2));
                      //debug(signature);
                      //debug(decipher(CACHE_CIPHER[base_js], signature));
                      debug("CIPHER #" + id + "/" + (length - 1) + ", mimeType: " + formats[id]["mimeType"] + ", qualityLabel: " + formats[id]["qualityLabel"]);
                      url_cipher = decodeURIComponent(signatureCipher[2].substr(4)) + "&sig=" + encodeURIComponent(decipher(CACHE_CIPHER[base_js], signature));
                      debug(url_cipher);
                      $scope.movie.url = url_cipher;
                      $scope.play(data);
                    }
                  });
                }
              }
            }
            if (url) {
              debug(url);
              $scope.movie.url = url;
              $scope.play(data);
            } else if (!url_cipher) {
              debug("MODULE 36 - URL NOT FOUND #1");
              return window.core.notify({
                title: gettext("Video is not available"),
                icon: "alert",
                type: "warning",
                timeout: 5E3
              });
            }
          } else {
            debug("MODULE 36 - FORMATS NOT FOUND");
            ajax("get", YOUTUBE_PHP + "?v=" + element.video.id, function (result, status) {
              if (status !== 200) {
                return window.core.notify({
                  title: gettext("Video is not available"),
                  icon: "alert",
                  type: "warning",
                  timeout: 5E3
                });
              }

              result = JSON.parse(result);
              if (result.url) {
                debug(result.url);
                $scope.movie.url = result.url;
                $scope.play(data);
              } else {
                return window.core.notify({
                  title: gettext("Video is not available"),
                  icon: "alert",
                  type: "warning",
                  timeout: 5E3
                });
              }
            });
          }
        } catch (ex) {
          debug('MODULE 36 - Exception: ' + ex);
          return window.core.notify({
            title: ex,
            icon: "alert",
            type: "warning",
            timeout: 5E3
          });
        }
      });
    },
    play: function (element) {
      debug("MODULE 36 - play()");
      var start;
      var next;
      var params = this;
      if (params.playlist.length && params.playlist.length > params.listPosition) {
        next = function () {
          params.next(element);
        };
      }
      if (params.playlist.length && params.listPosition > 0) {
        start = function () {
          params.prev(element);
        };
      }
      this.intent = core.intent({
        action: "play",
        mime: "content/video",
        data: {
          title: params.movie.title,
          uri: params.movie.url,
          movie: params.movie.id,
          proxy: event.params.proxy
        },
        events: {
          end: function () {
            if (params.playlist.length) {
              params.next(element);
            } else {
              params.intent.close();
            }
          },
          error: function () {
            params.intent.close();
          },
          close: function () {
            element = null;
          },
          next: next,
          prev: start
        },
        context: element
      }, function (canCreateDiscussions, parent_dom_node) {
        element = parent_dom_node;
      });
    },
    next: function (element) {
      debug("MODULE 36 - next()");
      if (this.playlist.length > this.listPosition + 1) {
        this.listPosition++;
        this.prepare({
          video: this.playlist[this.listPosition]
        }, element);
      }
    },
    prev: function (element) {
      debug("MODULE 36 - prev()");
      if (this.listPosition > 0) {
        this.listPosition--;
        this.prepare({
          video: this.playlist[this.listPosition]
        }, element);
      }
    }
  };
  module.exports = mockFormAttributeDataResponse;
}, function (module, exports, require) {//require(37)
  function Initialize(props) {
    var data = this;
    this.model = null;
    this.activePage = 0;
    this.$title = null;
    this.loading = false;
    props.visible = false;
    props.data = [{
      id: "",
      value: "",
      publishedAt: "",
      icon: "",
      duration: "",
      title: "",
      channelTitle: "",
      viewCount: "",
      locale: {
        publishedAt: "",
        viewCount: "",
        channelTitle: ""
      }
    }];
    d.call(data, props);
    this.$node.classList.add("movieList");
    this.$body.classList.add("movieListBody");
    if (props.$title !== undefined) {
      this.$title = props.$title;
      this.$title.classList.add("movieListHeader");
    }
    if (props.model !== undefined) {
      this.model = props.model;
      this.model.addListener("content:changed", function () {
        debug('MODULE 37 - addListener content:changed');
        data.model.getPage({
          page: 0,
          count: 50
        }, function (canCreateDiscussions, darray) {
          data.activePage = 0;
          data.data = darray;
          data.viewIndex = null;
          data.renderView(0);
          data.focusIndex(0);
          data.emit("view:ready");
        });
      });
    }
  }

  var b = require(13);
  var d = require(30);
  Initialize.prototype = Object.create(d.prototype);
  Initialize.prototype.constructor = Initialize;
  Initialize.prototype.renderView = function (i) {
    var item;
    var data;
    var prevIndex;
    var commonIndex;
    if (this.viewIndex !== i) {
      prevIndex = this.viewIndex;
      this.viewIndex = commonIndex = i;
      var length = this.size;
      for (var j = 0; j < length; j++) {
        item = this.$body.children[j];
        if (this.data.length > i) {
          item.classList.remove("hidden");
          data = this.data[i];
          if (data !== undefined) {
            item.data = data;
            item.index = i;
            this.renderItem(item, data);
            if (data.mark) {
              item.classList.add("mark");
            } else {
              item.classList.remove("mark");
            }
          } else {
            item.data = item.index = undefined;
            item.innerHTML = "";
            item.ready = false;
          }
          i++;
        } else {
          item.classList.add("hidden");
        }
      }
      if (this.events["move:view"] !== undefined) {
        this.emit("move:view", {
          prevIndex: prevIndex,
          currIndex: commonIndex
        });
      }
      return true;
    }
    return false;
  };
  Initialize.prototype.renderItem = function (node, data) {
    var body;
    var n;
    var s;
    if (data.duration.length > 10) {
      data.duration = data.duration.substring(0, 10);
    }
    if (node.ready) {
      node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
      node.$videoDuration.innerText = data.duration;
      node.$videoTitle.innerText = data.title;
      node.$videoAthour.innerText = data.locale.channelTitle;
      node.$viewCounter.innerText = data.locale.viewCount;
      node.$dateAdded.innerText = data.locale.publishedAt;
    } else {
      body = document.createElement("div");
      body.className = "container";
      node.appendChild(body);
      n = document.createElement("div");
      n.className = "tileTop";
      body.appendChild(n);
      s = document.createElement("div");
      s.className = "tileBottom";
      body.appendChild(s);
      node.$videoThumb = document.createElement("div");
      node.$videoThumb.className = "thumb";
      node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
      n.appendChild(node.$videoThumb);
      node.$videoDuration = document.createElement("div");
      node.$videoDuration.className = "duration";
      node.$videoDuration.innerText = data.duration;
      n.appendChild(node.$videoDuration);
      node.$videoTitle = document.createElement("div");
      node.$videoTitle.className = "title";
      node.$videoTitle.innerText = data.title;
      s.appendChild(node.$videoTitle);
      node.$videoAthour = document.createElement("div");
      node.$videoAthour.className = "uploader";
      if (data.channelTitle) {
        node.$videoAthour.innerText = data.locale.channelTitle;
      }
      s.appendChild(node.$videoAthour);
      node.$viewCounter = document.createElement("div");
      node.$viewCounter.className = "viewCount";
      if (data.viewCount) {
        node.$viewCounter.innerText = data.locale.viewCount;
      }
      s.appendChild(node.$viewCounter);
      node.$dateAdded = document.createElement("div");
      node.$dateAdded.className = "uploaded";
      node.$dateAdded.innerText = data.locale.publishedAt;
      s.appendChild(node.$dateAdded);
      node.ready = true;
    }
  };
  Initialize.prototype.defaultEvents.keydown = function (key) {
    if (!this.loading && this.data) {
      switch (key.code) {
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
            this.move(key.code);
          }
          break;
        case b.ok:
          if (this.events["click:item"] !== undefined) {
            this.emit("click:item", {
              $item: this.$focusItem,
              event: key
            });
          }
      }
    }
  };
  module.exports = Initialize;
}, function (module, exports, require) {//require(38)
  function Router(name) {
    this.pages = {};
    this.searchQuery = "";
    this.relatedToVideoId = "";
    this.channelId = "";
    this.order = "";
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
  Router.prototype = Object.create(NumericType.prototype);
  Router.prototype.constructor = Router;
  Router.prototype.getPage = function (params) {
    debug('MODULE 38 - prototype.getPage()');
    var url;
    var self = this;
    return isEvaluating || (isEvaluating = require(42), source = require(45), err_msg = gettext("Author")), new PromiseProxy(function (applyComputed, parse) {
      params.channel = params.channel || self.channel;
      params.type = self.type;
      params.searchQuery = params.searchQuery || self.searchQuery;
      params.page = +params.page || 0;
      params.relatedToVideoId = params.relatedToVideoId || self.relatedToVideoId;
      url = "search?part=id&maxResults=" + (params.count || 6);
      if (params.page) {
        if (!self.pages[params.page]) {
          return void parse();
        }
        url = url + ("&pageToken=" + self.pages[params.page]);
      }
      if (params.channel && params.channel.id) {
        url = url + ("&channelId=" + params.channel.id);
      }
      if (self.order) {
        url = url + ("&order=" + self.order);
      }
      if (params.relatedToVideoId) {
        url = url + ("&type=video&relatedToVideoId=" + params.relatedToVideoId);
      } else if (params.type) {
        url = url + "&type=video";
      }
      if (params.searchQuery) {
        url = url + ("&q=" + encodeURIComponent(params.searchQuery));
      }
      if (FileTodoProvider.settings.safeSearch) {
        url = url + "&safeSearch=strict";
      }
      request.request("GET", url).then(function (data) {
        debug('MODULE 38 - prototype.getPage() request: ' + url);
        var list = [];
        var turned = {};
        var options = {};
        var keyToAdd = "";
        var postParam = "";
        var micropost = "";
        var i;
        data = JSON.parse(String(data));
        if (data.nextPageToken) {
          self.pages[params.page + 1] = data.nextPageToken;
        }
        if (data.prevPageToken) {
          self.pages[params.page - 1] = data.prevPageToken;
        }
        data = data.items;
        var length = data.length;
        if (length === 0) {
          parse("empty");
        } else {
          for (i = 0; i < length; ++i) {
            if (data[i].id.kind === "youtube#video") {
              keyToAdd = keyToAdd + (data[i].id.videoId + ",");
            } else if (data[i].id.kind === "youtube#channel") {
              postParam = postParam + (data[i].id.channelId + ",");
              turned[i] = 1;
            } else if (data[i].id.kind === "youtube#playlist") {
              micropost = micropost + (data[i].id.playlistId + ",");
              options[i] = 1;
            }
          }
          PromiseProxy.all([self.getMovies(keyToAdd.substr(0, keyToAdd.length - 1)), self.getChannelsInfo(postParam.substr(0, postParam.length - 1)), self.getTotalInfoPlaylists({
            id: micropost.substr(0, micropost.length - 1),
            channel: false
          })]).then(function (policySet) {
            var end = +new Date;
            var index = 0;
            var j = 0;
            var id = 0;
            for (i = 0; i < length; ++i) {
              if (turned[i] && policySet[1][j]) {
                list.push({
                  value: 1,
                  id: policySet[1][j].id,
                  title: policySet[1][j].snippet.localized.title,
                  icon: policySet[1][j].snippet.thumbnails["high"].url,
                  type: "channel",
                  viewCount: policySet[1][j].statistics.viewCount,
                  commentCount: policySet[1][j].statistics.commentCount,
                  subscriberCount: policySet[1][j].statistics.subscriberCount,
                  hiddenSubscriberCount: policySet[1][j].statistics.hiddenSubscriberCount,
                  videoCount: policySet[1][j].statistics.videoCount,
                  locale: {
                    subscriberCount: policySet[1][j].statistics.subscriberCount + " " + ngettext("subscriber", "subscribers", +policySet[1][j].statistics.subscriberCount)
                  }
                });
                ++j;
              } else if (options[i] && policySet[2][id]) {
                list.push({
                  value: 1,
                  playlistId: policySet[2][id].id,
                  channel: {
                    title: policySet[2][id].snippet.channelTitle,
                    id: policySet[2][id].snippet.channelId
                  },
                  title: policySet[2][id].snippet.title,
                  icon: policySet[2][id].snippet.thumbnails["high"].url,
                  type: "playlist",
                  channelTitle: policySet[2][id].snippet.channelTitle,
                  viewCount: " ",
                  duration: " ",
                  publishedAt: policySet[2][id].snippet.publishedAt,
                  locale: {
                    publishedAt: source(policySet[2][id].snippet.publishedAt, end),
                    viewCount: " ",
                    channelTitle: policySet[2][id].snippet.channelTitle ? err_msg + ": " + policySet[2][id].snippet.channelTitle : " "
                  }
                });
                ++id;
              } else if (policySet[0][index]) {
                list.push({
                  value: 1,
                  id: policySet[0][index].id,
                  channelTitle: policySet[0][index].snippet.channelTitle,
                  duration: normalizeVideoDuration(policySet[0][index].contentDetails.duration),
                  realDuration: policySet[0][index].contentDetails.duration,
                  viewCount: policySet[0][index].statistics.viewCount,
                  publishedAt: policySet[0][index].snippet.publishedAt,
                  dimension: policySet[0][index].contentDetails.dimension,
                  definition: policySet[0][index].contentDetails.definition,
                  title: policySet[0][index].snippet.localized.title,
                  icon: policySet[0][index].snippet.thumbnails["high"].url,
                  channelId: policySet[0][index].snippet.channelId,
                  type: "video",
                  locale: {
                    publishedAt: source(policySet[0][index].snippet.publishedAt, end),
                    viewCount: ngettext("view", "views", +policySet[0][index].statistics.viewCount) + " " + policySet[0][index].statistics.viewCount,
                    channelTitle: err_msg + ": " + policySet[0][index].snippet.channelTitle
                  }
                });
                ++index;
              }
            }
            applyComputed(list);
          }, function (canCreateDiscussions) {
          })["catch"](function (canCreateDiscussions) {
          });
        }
      })["catch"](function (canCreateDiscussions) {
      });
    });
  };
  Router.prototype.getChannelsInfo = function (url) {
    return url ? request.request("GET", "channels?part=snippet,statistics&id=" + url).then(function (data) {
      return JSON.parse(String(data)).items;
    }) : PromiseProxy.resolve([]);
  };
  Router.prototype.filter = function (params) {
    var t = false;
    return params.channel !== undefined && this.init({
      channel: params.channel
    }), params.searchQuery !== undefined && this.searchQuery !== params.searchQuery && (t = true, this.searchQuery = params.searchQuery), params.relatedToVideoId !== undefined && this.relatedToVideoId !== params.relatedToVideoId && (t = true, this.relatedToVideoId = params.relatedToVideoId), params.order !== undefined && this.order !== params.order && (t = true, this.order = params.order), params.type !== undefined && this.type !== params.type && (t = true, this.type = params.type), !!t && (this.pages = {}, this.emit("content:changed", params), true);
  };
  module.exports = Router;
}, function (module, exports, require) {//require(39)
  function Init(item) {
    this.pages = {};
    this.channel = null;
    handler.call(this);
    item = item || {};
    if (item.events !== undefined) {
      this.addListeners(item.events);
    }
    this.init(item);
  }

  var event;
  var err_msg;
  var h = require(18);
  var handler = require(40);
  var proxy = require(17);
  Init.prototype = Object.create(handler.prototype);
  Init.prototype.constructor = Init;
  Init.prototype.getPage = function (config) {
    var self = this;
    return err_msg || (event = require(45), err_msg = gettext("Author")), config.channel = config.channel || this.channel, config.count = config.count || 6, config.page = +config.page || 0, new h(function (childCompute, cb) {
      return config.channel ? void self.getPlaylists({
        count: 1,
        channel: config.channel,
        page: config.page
      }).then(function (tmp) {
        config.playlist = tmp[0];
        self.getPlayListItems(config).then(childCompute, cb);
      }) : void cb(config);
    });
  };
  Init.prototype.getPlaylists = function (params) {
    var data = this;
    var endpoint = "playlists?part=id";
    params.channel = params.channel || this.channel;
    if (params.channel) {
      if (params.page) {
        if (!data.pages[params.page]) {
          return h.reject("no page");
        }
        endpoint = endpoint + ("&pageToken=" + data.pages[params.page]);
      }
      endpoint = endpoint + ("&channelId=" + params.channel.id + "&maxResults=" + params.count);
      return proxy.request("GET", endpoint).then(function (response) {
        response = JSON.parse(String(response));
        if (response.nextPageToken) {
          data.pages[params.page + 1] = response.nextPageToken;
        }
        if (response.prevPageToken) {
          data.pages[params.page - 1] = response.prevPageToken;
        }
        return response.items;
      });
    }
  };
  Init.prototype.getTotalInfoPlaylists = function (params) {
    var data = this;
    var endpoint = "playlists?part=snippet";
    params.channel = params.channel === undefined ? this.channel : params.channel;
    if (params.page) {
      if (!data.pages[params.page]) {
        return h.reject("no page");
      }
      endpoint = endpoint + ("&pageToken=" + data.pages[params.page]);
    }
    if (params.channel) {
      endpoint = endpoint + ("&channelId=" + params.channel.id);
    } else {
      if (params.id === undefined || params.id.length <= 0) {
        return h.resolve([]);
      }
      endpoint = endpoint + ("&id=" + params.id);
    }
    if (params.count !== undefined) {
      endpoint = endpoint + ("&maxResults=" + params.count);
    }
    return proxy.request("GET", endpoint).then(function (response) {
      response = JSON.parse(String(response));
      if (response.nextPageToken) {
        data.pages[params.page + 1] = response.nextPageToken;
      }
      if (response.prevPageToken) {
        data.pages[params.page - 1] = response.prevPageToken;
      }
      return response.items;
    });
  };
  Init.prototype.getChannelBackground = function (verb) {
    verb = verb || this.channel;
    return proxy.request("GET", "channels?part=brandingSettings&id=" + verb.id).then(function (data) {
      data = JSON.parse(String(data));
      return data.items[0].brandingSettings.image.bannerTvImageUrl;
    });
  };
  Init.prototype.init = function (data) {
    var t = false;
    return data.channel !== undefined && (this.channel ? this.channel && this.channel.id !== data.channel.id && (t = true, this.channel = data.channel) : (t = true, this.channel = data.channel)), data.mode && this.mode !== data.mode && (this.mode = data.mode), !!t && (this.pages = {}, this.emit("content:changed", data), true);
  };
  module.exports = Init;
}, function (module, exports, require) {//require(40)
  function callback(data) {
    return data && data.playlist ? "pid:" + data.playlist.id + ";p:" + data.page : "PLAYLIST";
  }

  function Init(item) {
    this.pages = {};
    this.playlist = null;
    c.call(this);
    item = item || {};
    if (item.events !== undefined) {
      this.addListeners(item.events);
    }
    this.init(item);
  }

  var source;
  var err_msg;
  var a = require(18);
  var c = require(4);
  var me = require(17);
  var isEvaluating = false;
  var self = require(41);
  Init.prototype = Object.create(c.prototype);
  Init.prototype.constructor = Init;
  Init.prototype.getPage = function (result) {
    var isFirstTimeShow;
    var arrayToReturn = this;
    result.playlist = result.playlist || this.playlist;
    result.page = +result.page || 0;
    result.count = result.count || 20;
    return new a(function (callback, reject) {
      isFirstTimeShow = self.get(callback(result));
      if (isFirstTimeShow) {
        callback(isFirstTimeShow);
      } else {
        if (!result.playlist.id) {
          return void reject(result);
        }
        arrayToReturn.getPlayListItems(result).then(callback, reject);
      }
    });
  };
  Init.prototype.getPlayListItems = function (data) {
    var state = this;
    var result = [];
    var postParam = "";
    var path = "playlistItems?part=snippet&playlistId=" + data.playlist.id + "&maxResults=" + (data.count || 30);
    data.page = +data.page || 0;
    if (isEvaluating || (isEvaluating = require(42), source = require(45), err_msg = gettext("Author")), data.page) {
      if (!state.pages[data.page]) {
        return a.reject();
      }
      path = path + ("&pageToken=" + state.pages[data.page]);
    }
    return me.request("GET", path).then(function (data) {
      try {
        data = JSON.parse(String(data));
        if (data.nextPageToken) {
          state.pages[data.page + 1] = data.nextPageToken;
        }
        if (data.prevPageToken) {
          state.pages[data.page - 1] = data.prevPageToken;
        }
        data.items.forEach(function (data) {
          postParam = postParam + (data.snippet.resourceId.videoId + ",");
        });
      } catch (ex) {
      }
      return state.getMovies(postParam.substr(0, postParam.length - 1)).then(function (items) {
        var val = +new Date;
        var length = items.length;
        for (var i = 0; i < length; ++i) {
          result.push({
            value: 1,
            id: items[i].id,
            channelTitle: items[i].snippet.channelTitle,
            duration: normalizeVideoDuration(items[i].contentDetails.duration),
            realDuration: items[i].contentDetails.duration,
            viewCount: items[i].statistics.viewCount,
            publishedAt: items[i].snippet.publishedAt,
            dimension: items[i].contentDetails.dimension,
            definition: items[i].contentDetails.definition,
            title: items[i].snippet.localized.title,
            icon: items[i].snippet.thumbnails["high"].url,
            channelId: items[i].snippet.channelId,
            type: "video",
            locale: {
              publishedAt: source(items[i].snippet.publishedAt, val),
              viewCount: items[i].statistics.viewCount + " " + ngettext("view", "views", +items[i].statistics.viewCount),
              channelTitle: err_msg + ": " + items[i].snippet.channelTitle
            }
          });
        }
        self.set(callback(data), result, 3E5);
        return result;
      });
    });
  };
  Init.prototype.getMovies = function (url) {
    return me.request("GET", "videos?part=statistics,contentDetails,snippet&id=" + url).then(function (data) {
      data = JSON.parse(String(data)).items;
      var length = data.length;
      for (var i = 0; i < length; ++i) {
        self.set("vid:" + data[i].id, data[i], 6E4);
      }
      return data;
    });
  };
  Init.prototype.init = function (params) {
    return params.playlist !== undefined && (this.playlist ? this.playlist && this.playlist.id !== params.playlist.id && (this.playlist = params.playlist) : this.playlist = params.playlist, this.pages = {}, this.emit("content:changed", params), true);
  };
  module.exports = Init;
}, function (module) {//require(41)
  module.exports = {
    store: {},
    size: 0,
    set: function (name, bin, options) {
      var obj;
      var term;
      var a = this;
      term = this.store[name] ? this.store[name] : undefined;
      if (term && term.timeout) {
        clearTimeout(term.timeout);
      }
      obj = {
        value: bin,
        timeout: -1
      };
      if (typeof options == "number") {
        obj.timeout = setTimeout(function () {
          a.remove(name);
        }, options);
      }
      this.store[name] = obj;
      ++this.size;
    },
    get: function (key, callback) {
      return !!this.store[key] && (typeof callback != "function" ? this.store[key].value : void callback(this.store[key].value));
    },
    remove: function (name) {
      --this.size;
      this.store[name] = null;
    },
    clear: function () {
      var csize = this.size;
      this.store = {};
      return csize;
    }
  };
}, function (module, exports, require) {//require(42)
  var nav = require(15);
  var problem = require(16);
  module.exports = {
    languageIndex: 0,
    nextLang: function (canCreateDiscussions) {
      return canCreateDiscussions === nav.languages.length - 1 ? 0 : ++canCreateDiscussions;
    },
    setLang: function (pluginName) {
      var self = this;
      require(43).load({
        name: pluginName
      }, function (i) {
        if (i) {
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
}, function (module, exports, require) {//require(43)
  function initialize(options) {
    var django = new Vue(options);
    window.gettext = window._ = django.gettext;
    window.pgettext = django.pgettext;
    window.ngettext = django.ngettext;
    return django;
  }

  var ProjectConfiguration = require(4);
  var Vue = require(44);
  var config = new ProjectConfiguration;
  config.defaultLanguage = "en";
  config.load = function (options, next) {
    var xhr;
    options.ext = options.ext || "json";
    options.path = options.path || "lang";
    return options.name === config.defaultLanguage ? (initialize(), next(null), false) : (xhr = new XMLHttpRequest, xhr.onload = function () {
      var connectionOptions;
      try {
        connectionOptions = JSON.parse(xhr.responseText);
        initialize(connectionOptions);
        next(null);
        if (config.events["load"]) {
          config.emit("load");
        }
      } catch (ex) {
        xhr.onerror(ex);
      }
    }, xhr.ontimeout = xhr.onerror = function (reason) {
      initialize();
      next(reason);
      if (config.events["error"]) {
        config.emit("error", reason);
      }
    }, xhr.open("GET", options.path + "/" + options.name + "." + options.ext, true), xhr.send(null), true);
  };
  module.exports = config;
}, function (module) {//require(44)
  function Gettext(config) {
    var data;
    var meta;
    config = config || {};
    data = config.data || {};
    data[""] = data[""] || {};
    meta = config.meta;
    this.gettext = function (i) {
      return data[""][i] || i;
    };
    this.pgettext = function (forApp, metric) {
      return data[forApp] && data[forApp][metric] || metric;
    };
    this.ngettext = function (msgId, plural, value) {
      return data && meta && data[""][msgId] ? data[""][msgId][eval("n = " + value + "; " + meta.plural)] : value === 1 ? msgId : plural;
    };
  }

  Gettext.prototype.constructor = Gettext;
  module.exports = Gettext;
}, function (module) {//require(45)
  module.exports = function (e, t) {
    var d;
    var re;
    var title;
    if (e) {
      re = e.match(/(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).(\d\d\d)Z/);
      re.shift();
      re.pop();
      d = new Date(re[0], re[1] - 1, re[2], re[3], re[4], re[5]);
      d.setTime(t - d.getTime());
      e = d.getTime();
      if (d.getFullYear() > 1970) {
        title = d.getFullYear() - 1970;
        e = title + " " + ngettext("year", "years", +title) + " " + gettext("ago");
      } else if (d.getMonth() > 0) {
        title = d.getMonth() + 1;
        e = title + " " + ngettext("month", "months", +title) + " " + gettext("ago");
      } else if (d.getDate() > 1) {
        title = d.getDate();
        e = title + " " + ngettext("day", "days", +title) + " " + gettext("ago");
      } else if (d.getHours() > 0) {
        title = d.getHours();
        e = title + " " + ngettext("hour", "hours", +title) + " " + gettext("ago");
      } else if (d.getMinutes() > 0) {
        title = d.getMinutes();
        e = title + " " + ngettext("minute", "minutes", +title) + " " + gettext("ago");
      } else {
        title = d.getSeconds();
        e = title + " " + ngettext("second", "seconds", +title) + " " + gettext("ago");
      }
    }
    return e;
  };
}, function (module, exports, require) {//require(46)
  var NotFound = require(18);
  var Scope = require(4);
  var request = require(17);
  var R = require(41);
  var $scope = new Scope;
  $scope.activeCategory = {};
  $scope.pages = {};
  $scope.ownChannel = null;
  $scope.cacheKey = function (b) {
    return "c:" + b.category.id + ";p:" + b.page;
  };
  $scope.getPage = function (i) {
    var formOrder;
    var post;
    var data = this;
    i.page = +i.page || 0;
    i.category = i.category || this.activeCategory;
    return new NotFound(function (each, error) {
      formOrder = R.get(data.cacheKey(i));
      if (formOrder) {
        each(formOrder);
      } else {
        post = "channels?part=snippet&categoryId=" + i.category.id + "&maxResults=" + i.count;
        if (i.page) {
          if (!data.pages[i.page]) {
            return data.activeCategory.totalResults === i.page ? void error("overflow") : void error("no page");
          }
          post = post + ("&pageToken=" + data.pages[i.page]);
        }
        request.request("GET", post).then(function (response) {
          var res = [];
          response = JSON.parse(String(response));
          if (response.pageInfo.totalResults) {
            data.activeCategory.totalResults = response.pageInfo.totalResults;
          }
          if (response.nextPageToken) {
            data.pages[i.page + 1] = response.nextPageToken;
          }
          if (response.prevPageToken) {
            data.pages[i.page - 1] = response.prevPageToken;
          }
          response = response.items;
          var length = response.length;
          for (var j = 0; j < length; ++j) {
            res.push({
              value: response[j].id,
              id: response[j].id,
              title: response[j].snippet.localized.title,
              icon: response[j].snippet.thumbnails["high"].url
            });
          }
          R.set(data.cacheKey(i), res, 3E5);
          each(res);
        })["catch"](function (canCreateDiscussions) {
        });
      }
    });
  };
  $scope.getInfo = function (url) {
    return new NotFound(function (getDefaultState, throwException) {
      request.request("GET", "channels?part=snippet&id=" + url).then(function (data) {
        getDefaultState(JSON.parse(String(data)).items);
      }, throwException);
    });
  };
  $scope.getMine = function () {
    return new NotFound(function (accountSortTool, throwException) {
      if ($scope.ownChannel !== null) {
        accountSortTool($scope.ownChannel);
      } else {
        request.request("GET", "channels?part=snippet&mine=true").then(function (data) {
          $scope.ownChannel = JSON.parse(String(data)).items[0];
          $scope.ownChannel.title = $scope.ownChannel.snippet.title;
          $scope.ownChannel.icon = $scope.ownChannel.snippet.thumbnails["default"].url;
          request.ownChannel = $scope.ownChannel;
          accountSortTool($scope.ownChannel);
        }, throwException);
      }
    });
  };
  $scope.setActiveCategory = function (category) {
    return category && this.activeCategory.id !== category.id && (this.activeCategory = category, this.pages = {}, this.events["category:changed"] !== undefined && this.emit("category:changed", category), true);
  };
  module.exports = $scope;
}, function (module, exports, require) {//require(47)
  function process(index, done) {
    var k = 1 ^ index;
    if (!N) {
      if (done) {
        N = true;
        self.getPage({
          page: page - 1,
          count: 1
        }, function (canCreateDiscussions, groupExist) {
          --page;
          --current;
          i = k;
          id = index;
          j = k;
          items[k].data = groupExist;
          items[k].viewIndex = null;
          items[k].renderView(0);
          items[k].emit("view:ready");
        });
      } else {
        if (items[id].data.length === 0) {
          return void items[index].emit("view:ready");
        }
        N = true;
        self.getPage({
          page: current + 1,
          count: 1
        }, function (canCreateDiscussions, serializedData) {
          return serializedData ? void (canCreateDiscussions || serializedData.length === 0 ? (++page, ++current, items[index].data = [], items[index].viewIndex = null, items[index].renderView(0), items[index].$title.innerHTML = "", i = k, id = index, j = k, items[i].$node.style.top = "0", items[id].$node.style.top = pos, items[j].focus(), items[index].emit("view:ready")) : (++page, ++current, i = k, id = index, j = k, items[index].data = serializedData, items[index].viewIndex = null, items[index].renderView(0), items[index].emit("view:ready"), items[j].focus())) : void items[index].emit("view:ready");
        });
      }
    }
  }

  var options = require(13);
  require(1);
  var Dialog = require(33);
  var Store = require(30);
  var BoxItem = require(37);
  var Date = require(48);
  var that = require(36);
  require(42);
  var d = require(29);
  var items = [];
  var obj = new Dialog({
    $node: document.getElementById("pmTabChannelContent"),
    className: "tab hidden",
    visible: false,
    events: {
      focus: function () {
        items[j].focus();
      }
    }
  });
  var a = require(27);
  var title = document.getElementById("pm");
  var head = document.getElementById("pmChannelTitle");
  var icon_div = document.getElementById("pmChannelIcon");
  var pos = 0;
  var i = 0;
  var id = 1;
  var j = 0;
  var page = 0;
  var current = 1;
  var timeout = -1;
  var N = true;
  var self = new Date;
  var node = {
    id: null,
    title: null
  };
  self.addListener("content:changed", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      a.hide();
    }, 1E4);
    if (items.length === 0) {
      items.push(new BoxItem({
        $node: document.getElementById("pmListChannelVideos0Node"),
        $body: document.getElementById("pmListChannelVideos0Body"),
        $title: document.getElementById("pmChannelTitle0"),
        className: "listMovie0Node",
        size: 5,
        viewIndex: 0,
        focusIndex: 0,
        type: Store.prototype.TYPE_HORIZONTAL,
        events: {
          overflow: function (data) {
            if (data.direction === options.left) {
              d.focus();
            }
          },
          "view:ready": function () {
            obj.focusEntry = items[j];
            items[i].$node.style.top = "0";
            if (items[id]) {
              items[id].$node.style.top = pos;
            }
            this.$title.innerHTML = "";
            if (items[j] && items[j].data.length > 0 && items[j].data[0].value) {
              a.hide();
              clearTimeout(timeout);
            }
            this.show();
            items[j].focus();
            N = false;
          },
          "view:error": function (view) {
            N = false;
            if (view === "empty") {
              this.data = [{
                id: "",
                value: "",
                publishedAt: "",
                icon: "img/no.image.png",
                duration: "",
                title: gettext("No videos"),
                channelTitle: "",
                viewCount: "",
                locale: {
                  publishedAt: "",
                  viewCount: "",
                  channelTitle: ""
                }
              }];
              this.viewIndex = null;
              this.renderView(0);
              obj.focusEntry = items[j];
              items[i].$node.style.top = "0";
              if (items[id]) {
                items[id].$node.style.top = pos;
              }
              this.show();
              a.hide();
              clearTimeout(timeout);
              items[j].focus();
            } else if (page === 0) {
              process(0, false);
            }
          },
          "click:item": function (context) {
            if (context.$item.data.id) {
              that.setContent({
                channel: node,
                video: context.$item.data,
                playlist: this.data,
                position: context.$item.index
              });
            }
          }
        }
      }));
      items.push(new BoxItem({
        $node: document.getElementById("pmListChannelVideos1Node"),
        $body: document.getElementById("pmListChannelVideos1Body"),
        $title: document.getElementById("pmChannelTitle1"),
        className: "listMovie1Node",
        size: 5,
        viewIndex: 0,
        focusIndex: 0,
        type: Store.prototype.TYPE_HORIZONTAL,
        events: {
          overflow: function (data) {
            if (data.direction === options.left) {
              d.focus();
            }
          },
          "view:ready": function () {
            obj.focusEntry = items[j];
            items[i].$node.style.top = "0";
            if (items[id]) {
              items[id].$node.style.top = pos;
            }
            this.$title.innerHTML = "";
            if (items[j] && items[j].data.length > 0 && items[j].data[0].value) {
              a.hide();
              clearTimeout(timeout);
            }
            this.show();
            items[j].focus();
            N = false;
          },
          "view:error": function (view) {
            N = false;
            if (view === "empty") {
              this.data = [{
                id: "",
                value: "",
                publishedAt: "",
                icon: " ",
                duration: "",
                title: " ",
                channelTitle: "",
                viewCount: "",
                locale: {
                  publishedAt: "",
                  viewCount: "",
                  channelTitle: ""
                }
              }];
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              obj.focusEntry = items[j];
              items[i].$node.style.top = "0";
              if (items[id]) {
                items[id].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title ? this.model.channel.title : "&nbsp;";
              this.show();
              a.hide();
              clearTimeout(timeout);
              items[j].focus();
            }
          },
          "click:item": function (context) {
            if (context.$item.data.id) {
              that.setContent({
                channel: node,
                video: context.$item.data,
                playlist: this.data,
                position: context.$item.index
              });
            }
          }
        }
      }));
      obj.add(items[0]);
      obj.add(items[1]);
      items[0].focus();
      items[0].addListener("keydown", function (key) {
        if (key.code === options.down) {
          process(0, false);
        } else if (key.code === options.up) {
          if (page > 0) {
            process(0, true);
          }
        } else if (key.code === options.playPause) {
          that.setContent({
            channel: this.model.channel,
            video: this.$focusItem.data,
            playlist: this.data,
            position: this.$focusItem.index
          });
        }
      });
      items[1].addListener("keydown", function (key) {
        if (key.code === options.down) {
          process(1, false);
        } else if (key.code === options.up) {
          if (page > 0) {
            process(1, true);
          }
        } else if (key.code === options.playPause) {
          that.setContent({
            channel: this.model.channel,
            video: this.$focusItem.data,
            playlist: this.data,
            position: this.$focusItem.index
          });
        }
      });
      pos = window.getComputedStyle(items[1].$node).getPropertyValue("top");
    }
    self.getPage({
      page: 0,
      count: 1
    }, function (canCreateDiscussions, groupExist) {
      page = 0;
      i = 0;
      id = 1;
      current = 1;
      j = 0;
      items[i].data = groupExist;
      items[i].viewIndex = null;
      items[i].renderView(0);
      items[i].emit("view:ready");
      items[j].focus();
      self.getPage({
        page: 1,
        count: 1
      }, function (canCreateDiscussions, groupExist) {
        items[id].data = groupExist;
        items[id].viewIndex = null;
        items[id].renderView(0);
        items[id].emit("view:ready");
        items[j].focus();
      });
    });
  });
  obj.activate = function (params) {
    if (params) {
      this.show();
      if (items.length) {
        items[j].focus();
      }
      self.channelId = node.id = params.id;
      self.getInfo({}, function (canCreateDiscussions, scope) {
        if (!canCreateDiscussions) {
          scope.background = scope.background.split("=")[0] + "=w1920-fcrop64=1,00000000ffffffff-nd-c0xffffffff-rj-k-no";
          title.style.backgroundImage = "url(" + scope.background + ")";
          icon_div.style.backgroundImage = "url(" + scope.icon + ")";
          node.title = head.innerHTML = scope.title;
          node.icon = scope.icon;
          self.emit("content:changed");
        }
      });
    }
  };
  module.exports = obj;
}, function (module, exports, require) {//require(48)
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
    var ret = [];
    crossfilterable_layers = topic.split("channels-content-item");
    var length = crossfilterable_layers.length;
    for (var layer_i = 0; layer_i < length; layer_i++) {
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
          value: 1,
          id: tel,
          channelTitle: data.title,
          duration: actual,
          realDuration: actual,
          viewCount: translate,
          publishedAt: date,
          dimension: "",
          definition: "",
          title: str,
          icon: inputText,
          channelId: data.id,
          type: "video",
          locale: {
            publishedAt: date,
            viewCount: translate,
            channelTitle: data.title
          }
        });
      }
    }
    return ret;
  }

  function Self() {
    NumericType.call(this);
    this.channelId = null;
    this.pages = {};
  }

  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  Self.prototype = Object.create(NumericType.prototype);
  Self.prototype.constructor = Self;
  Self.prototype.getInfo = function (data, callback) {
    debug('MODULE 48 - prototype.getInfo()');
    data = data || {};
    if (!data.channelId && this.channelId) {
       data.channelId = this.channelId;
    }
    return data.channelId ? void ajax("get", "https://www.youtube.com/" + data.channelId + "/about", function (result, status) {
      var b;
      var a;
      var initialRotation;
      var noteValueToDisplay;
      var t;
      var d;
      var backgroundAttr;
      return status !== 200 ? void callback({
        message: "request got bad http status (" + status + ")"
      }, {}) : (b = result.indexOf('img class="channel-header-profile-image" src="') + 46, a = result.indexOf('"', b), initialRotation = result.substring(b, a), b = result.indexOf("yt-subscription-button-subscriber-count-branded-horizontal"), b = result.indexOf('title="', b) + 7, a = result.indexOf('"', b), noteValueToDisplay = result.substring(b, a), b = result.indexOf('class="qualified-channel-title-text"'), b = result.indexOf('title="', b) + 7, a = result.indexOf('"', b), t = result.substring(b, a), b = result.indexOf('<div class="about-description'),
        a = result.indexOf('<div class="about-metadata-label', b), d = result.substring(b, a), b = result.indexOf(".hd-banner-image {"), b = result.indexOf("background-image: url(", b) + 22, a = result.indexOf(");", b), backgroundAttr = "http:" + result.substring(b, a), void callback(null, {
        icon: initialRotation,
        subscribers: noteValueToDisplay,
        background: backgroundAttr,
        title: t,
        id: data.channelId,
        description: d
      }));
    }) : void callback({
      message: "error: field arguments[0].channelId is empty"
    }, {});
  };
  Self.prototype.getPage = function (params, callback) {
    debug('MODULE 48 - prototype.getPage()');
    var data = this;
    params = params || {};
    if (!params.channelId && this.channelId) {
      params.channelId = this.channelId;
    }
    params.page = +params.page || 0;
    return params.channelId ? void (this.pages[params.page] && this.pages[params.page].parseId ? this.pages[params.page].cached ? callback(null, this.pages[params.page].data) : ajax("get", "https://www.youtube.com" + this.pages[params.page].parseId, function (result, status) {
      var post;
      var interestingPoint;
      var c;
      var e;
      var resizewidth;
      var p;
      if (status !== 200) {
        return void callback({
          message: "request got bad http status (" + status + ")"
        }, []);
      }
      try {
        post = JSON.parse(result);
      } catch (ex) {
        interestingPoint = ex;
        post = "";
      }
      return post ? (post.load_more_widget_html.trim().length > 10 ? (c = post.load_more_widget_html.indexOf('data-uix-load-more-href="/browse_ajax') + 25, e = post.load_more_widget_html.indexOf('"', c), resizewidth = post.load_more_widget_html.substring(c, e).replace(/&amp;/g, "&")) : resizewidth = "", data.pages[params.page + 1] = {
        parseId: resizewidth,
        cached: false
      }, result.indexOf('class="qualified-channel-title-text"') === -1 ? p = data.pages[0] && data.pages[0].data && data.pages[0].data[0] && data.pages[0].data[0] && data.pages[0].data[0].channelTitle ? data.pages[0].data[0].channelTitle : "" : (c = result.indexOf('class="qualified-channel-title-text"'), c = result.indexOf('title="', c) + 7, e = result.indexOf('"', c), p = result.substring(c, e)), data.pages[params.page].cached = true, data.pages[params.page].data = cb(post.content_html, {
        id: params.channelId,
        title: p
      }), void callback(null, data.pages[params.page].data)) : void callback({
        message: "parse error for page id " + data.pages[params.page].parseId,
        code: interestingPoint
      }, []);
    }) : params.page ? this.pages[params.page] && !this.pages[params.page].parseId ? callback(null, []) : callback({
      message: "wrong page number (page id not found in cache)"
    }, []) : ajax("get", "https://www.youtube.com/" + params.channelId + "/videos", function (result, status) {
      debug('MODULE 48 - prototype.getPage() get channelId/videos');
      var q;
      var t;
      var index;
      var contents;
      return status !== 200 ? void callback({
        message: "request got bad http status (" + status + ")"
      }, []) : (t = result.indexOf('class="qualified-channel-title-text"'), t = result.indexOf('title="', t) + 7, index = result.indexOf('"', t), contents = result.substring(t, index), t = result.indexOf('data-uix-load-more-href="/browse_ajax') + 25, index = result.indexOf('"', t), data.pages[params.page + 1] = {
        parseId: result.substring(t, index).replace(/&amp;/g, "&"),
        cached: false
      }, q = result.slice(result.indexOf('id="channels-browse-content-grid"'), result.indexOf("browse-items-load-more-button")), data.pages[0] = {
        cached: true,
        parseId: "   ",
        data: cb(q, {
          id: params.channelId,
          title: contents
        })
      }, void callback(null, data.pages[0].data));
    })) : void callback({
      message: "error: field arguments[0].channelId is empty"
    }, []);
  };
  Self.prototype.filter = function () {
    return false;
  };
  module.exports = Self;
}, function (module) {//require(49)
  function parseUri(uri) {
    var o = {
      strictMode: false,
      key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
      q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    };
    var targets = o.parser[o.strictMode ? "strict" : "loose"].exec(uri);
    var e = {};
    for (var i = 14; i--;) {
      e[o.key[i]] = targets[i] || "";
    }
    e[o.q.name] = {};
    e[o.key[12]].replace(o.q.parser, function (canCreateDiscussions, propertyToSet, s) {
      if (propertyToSet) {
        e[o.q.name][propertyToSet] = s;
      }
    });
    return e;
  }

  function ajax(type, uri, cb, headers, format, async) {
    var auto = null;
    var timeout = null;
    var xhr = new XMLHttpRequest;
    async = async !== false;
    xhr.onreadystatechange = function () {
      var iconCtx;
      if (xhr.readyState === 4) {
        clearTimeout(timeout);
        if (format === "json" && xhr.status === 200) {
          try {
            auto = JSON.parse(xhr.responseText);
          } catch (ex) {
            auto = null;
          }
        }
        if (typeof cb == "function") {
          iconCtx = format === "xml" ? xhr.responseXML : format === "json" ? auto : xhr.responseText;
          cb(iconCtx, xhr.status, xhr);
        }
      }
    };
    xhr.open(type, uri, async);
    if (headers) {
      for (var headerName in headers) {
        if (headers.hasOwnProperty(headerName)) {
          xhr.setRequestHeader(headerName, headers[headerName]);
        }
      }
    }
    xhr.send();
    timeout = setTimeout(function () {
      xhr.abort();
      if (typeof cb == "function") {
        cb(null, 0);
      }
    }, 6E4);
    return xhr;
  }

  window.ajax = ajax;
  module.exports = {
    ajax: ajax,
    parseUri: parseUri
  };
}, function (module, exports, require) {//require(50)
  function init() {
    return data.languageIndex !== key && (me ? (me.show(), inlineEditor2 = data.activePage.activeComponent, me.focus()) : (me = new Definition({
      visible: false,
      events: {
        keydown: function (key) {
          var barIndex;
          var context;
          if (key.code === options.ok) {
            data.settings.language = action.languages[key];
            key = -1;
            data.settings.languageOverwrite = 1;
            data.settings.keyboardLanguage = key;
            data.reload();
          } else if (key.code === options.back) {
            p.data[p.size - 1].value = key = data.languageIndex;
            key.stop = true;
            me.hide();
            searchContactPanel.show();
            inlineEditor2.focus();
            barIndex = p.$focusItem.index;
            context = p.viewIndex;
            p.viewIndex = null;
            p.renderView(context);
            p.focusIndex(barIndex);
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
  var options = require(13);
  var data = require(1);
  var Buffer = require(30);
  var Menu = require(33);
  var Definition = require(51);
  require(17);
  var instance = require(53);
  var action = require(15);
  var title = document.getElementById("pm");
  var camera = new Menu({
    $node: document.getElementById("pmTabSettings"),
    className: "tab",
    visible: false,
    events: {
      show: function () {
        title.style.backgroundImage = "";
      }
    }
  });
  var fakeInputElement = require(29);
  var searchContactPanel = require(25);
  var enable_keys = ["AuraHD2", "AuraHD3", "AuraHD8", "MAG254", "MAG275", "MAG276", "WR320"].indexOf(instance.deviceModel()) !== -1;
  var key = data.languageIndex;
  fakeInputElement.addListener("focus", function () {
    init();
  });
  camera.activate = function () {
    var badge;
    if (!p) {
      badge = require(42);
      p = new Buffer({
        $node: document.getElementById("pmSettingsList"),
        type: Buffer.prototype.TYPE_HORIZONTAL,
        size: 1,
        data: [{
          title: gettext("Language"),
          value: data.languageIndex,
          values: action.languagesLocalized,
          description: gettext("Interface language"),
          icon: "icon flag",
          onclick: function (data) {
            var i = badge.nextLang(this.value);
            this.value = i;
            key = i;
            data.$value.innerText = action.languagesLocalized[i];
          }
        }],
        render: function (self, obj) {
          if (!self.ready) {
            self.$container = self.appendChild(document.createElement("div"));
            self.$container.className = "container";
            self.$title = self.$container.appendChild(document.createElement("div"));
            self.$title.className = "title";
            self.$value = self.$container.appendChild(document.createElement("div"));
            self.$value.className = "value";
            self.$icon = self.$container.appendChild(document.createElement("div"));
            self.$description = self.appendChild(document.createElement("div"));
            self.$description.className = "description";
            self.ready = true;
          }
          self.$title.innerText = obj.title;
          self.$value.innerHTML = obj.values[obj.value];
          self.$icon.className = obj.icon;
          self.$description.innerText = obj.description;
        },
        events: {
          keydown: function (key) {
            switch (key.code) {
              case options.right:
                break;
              case options.left:
                if (this.viewIndex > 0 && this.viewIndex < this.data.length - this.size) {
                  this.renderView(this.viewIndex + 1);
                } else {
                  this.move(key.code);
                }
                break;
              case options.ok:
                if (this.events["click:item"] !== undefined) {
                  this.emit("click:item", {
                    $item: this.$focusItem,
                    event: key
                  });
                }
                break;
              case options.back:
                if (init()) {
                  key.stop = true;
                }
            }
          },
          "click:item": function (self) {
            self.$item.data.onclick(self.$item);
          },
          overflow: function (data) {
            if (data.direction === options.left) {
              fakeInputElement.focus();
            }
          }
        }
      });
      camera.add(p);
      p.renderView = function (name) {
        var item;
        var data;
        var prevIndex;
        var getObjArg;
        if (this.viewIndex !== name) {
          prevIndex = this.viewIndex;
          this.viewIndex = getObjArg = name;
          var length = this.size;
          for (var i = 0; i < length; i++) {
            item = this.$body.children[i];
            data = this.data[name];
            if (data !== undefined) {
              item.data = data;
              item.index = name;
              this.renderItem(item, data);
              if (data.mark) {
                item.classList.add("mark");
              } else {
                item.classList.remove("mark");
              }
            } else {
              item.data = item.index = undefined;
              item.innerHTML = "";
              item.ready = false;
            }
            name++;
          }
          if (this.events["move:view"] !== undefined) {
            this.emit("move:view", {
              prevIndex: prevIndex,
              currIndex: getObjArg
            });
          }
          return true;
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
}, function (module, exports, require) {//require(51)
  function Init(e) {
    e = e || {};
    e.className = "modalMessage" + (e.className || "");
    b.call(this, e);
    this.$header = this.$body.appendChild(document.createElement("div"));
    this.$content = this.$body.appendChild(document.createElement("div"));
    this.$footer = this.$body.appendChild(document.createElement("div"));
    this.$header.className = "header";
    this.$content.className = "content";
    this.$footer.className = "footer";
    this.$header.innerText = "header";
    this.$content.innerText = "content";
    this.$footer.innerText = "footer";
    this.hide();
  }

  var b = require(52);
  Init.prototype = Object.create(b.prototype);
  Init.prototype.constructor = Init;
  module.exports = Init;
}, function (module, exports, require) {//require(52)
  function Menu(that) {
    that = that || {};
    that.$body = document.createElement("div");
    that.$body.className = "body";
    s.call(this, that);
    this.$node.appendChild(document.createElement("div").appendChild(this.$body).parentNode);
  }

  var s = require(24);
  Menu.prototype = Object.create(s.prototype);
  Menu.prototype.constructor = Menu;
  Menu.prototype.name = "spa-component-modal";
  module.exports = Menu;
}, function (module) {//require(53)
  module.exports = {
    initPlayer: window.top.gSTB.InitPlayer,
    saveUserData: window.top.gSTB.SaveUserData,
    loadUserData: window.top.gSTB.LoadUserData,
    setPosTime: window.top.gSTB.SetPosTime,
    getPosTime: window.top.gSTB.GetPosTime,
    play: window.top.gSTB.Play,
    pause: window.top.gSTB.Pause,
    continuePlay: window.top.gSTB.Continue,
    getVolume: window.top.gSTB.GetVolume,
    setVolume: window.top.gSTB.SetVolume,
    setNativeStringMode: window.top.gSTB && window.top.gSTB.SetNativeStringMode ? window.top.gSTB.SetNativeStringMode : function () {
    },
    setServiceButtonState: window.top.gSTB.EnableServiceButton,
    setVKButtonState: window.top.gSTB.EnableVKButton,
    setTvButtonState: window.top.gSTB.EnableTvButton,
    setAppButtonState: window.top.gSTB.EnableAppButton,
    hideVK: window.top.gSTB.HideVirtualKeyboard,
    showVK: window.top.gSTB.ShowVirtualKeyboard,
    getStandByStatus: window.top.gSTB.GetStandByStatus,
    setStandByStatus: window.top.gSTB.StandBy,
    getEnv: window.top.gSTB.GetEnv,
    isMuted: window.top.gSTB.GetMute,
    setMute: window.top.gSTB.SetMute,
    deviceModel: window.top.gSTB.GetDeviceModelExt
  };
}, function (module, exports, require) {//require(54)
  var startYNew = require(4);
  var $scope = new startYNew;
  $scope.data = {
    quality: [gettext("Best"), "720p", "480p", "360p", "240p"],
    safeSearch: [gettext("Off"), gettext("On")]
  };
  $scope.getNext = function (prop, i) {
    if ($scope.data[prop] && $scope.data[prop][i]) {
      ++i;
      if ($scope.data[prop].length === i) {
        i = 0;
      }
      this.emit("changed", {
        key: prop,
        value: $scope.data[prop][i],
        index: i
      });
      return {
        value: $scope.data[prop][i],
        index: i
      };
    }
  };
  module.exports = $scope;
}, function (module, exports, require) {//require(55)
  function process(to, str) {
    var j = 1 ^ to;
    if (!toPlayer) {
      if (str) {
        toPlayer = true;
        model.getPage({
          page: page - 1,
          count: 1
        }, function (canCreateDiscussions, groupExist) {
          --page;
          --current;
          k = j;
          i = to;
          index = j;
          nodes[j].data = groupExist;
          nodes[j].viewIndex = null;
          nodes[j].renderView(0);
          nodes[j].focusIndex(0);
          nodes[j].emit("view:ready");
        });
      } else {
        if (nodes[i].data.length === 0) {
          return void nodes[to].emit("view:ready");
        }
        toPlayer = true;
        model.getPage({
          page: current + 1,
          count: 1
        }, function (canCreateDiscussions, serializedData) {
          return serializedData ? void (canCreateDiscussions || serializedData.length === 0 ? (++page, ++current, nodes[to].data = [], nodes[to].viewIndex = null, nodes[to].renderView(0), nodes[to].focusIndex(0), nodes[to].$title.innerHTML = "", k = j, i = to, index = j, nodes[k].$node.style.top = "0", nodes[i].$node.style.top = pos, nodes[index].focus(), nodes[to].emit("view:ready")) : (++page, ++current, k = j, i = to, index = j, nodes[to].data = serializedData, nodes[to].viewIndex = null, nodes[to].renderView(0), nodes[to].focusIndex(0), nodes[to].emit("view:ready"))) : void nodes[to].emit("view:ready");
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
  var nodes = [];
  var title = document.getElementById("pm");
  var index = 0;
  var self = new ctor({
    $node: document.getElementById("pmTabMainContent"),
    visible: false,
    className: "tab hidden",
    events: {
      focus: function () {
        nodes[index].focus();
      },
      show: function () {
        title.style.backgroundImage = "";
      }
    }
  });
  var d = new Dialog({
    $node: document.getElementById("pmMainSearch"),
    $body: document.getElementById("pmMainSearchBody"),
    className: "tabInputSearch",
    events: {
      focus: function () {
        this.setValue("");
        test.route(test.pages.search);
      }
    }
  });
  var pos = 0;
  var k = 0;
  var i = 1;
  var page = 0;
  var current = 1;
  var timeout = -1;
  var toPlayer = true;
  self.activate = function () {
    this.show();
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      rebaseBtn.hide();
    }, 1E4);
    if (nodes.length === 0) {
      rebaseBtn.show();
      nodes.push(new ViewModel({
        $node: document.getElementById("pmListMainVideos0Node"),
        $body: document.getElementById("pmListMainVideos0Body"),
        $title: document.getElementById("pmMainChannelTitle0"),
        className: "listMovie0Node",
        model: new Model({
          type: "video"
        }),
        size: 5,
        viewIndex: 0,
        focusIndex: 0,
        type: ActionClient.prototype.TYPE_HORIZONTAL,
        events: {
          overflow: function (data) {
            if (data.direction === options.left) {
              fbLargeCommandLine.focus();
            }
          },
          "view:ready": function () {
            self.focusEntry = nodes[index];
            nodes[k].$node.style.top = "0";
            if (nodes[i]) {
              nodes[i].$node.style.top = pos;
            }
            this.$title.innerHTML = "";
            if (nodes[index] && nodes[index].data.length > 0 && nodes[index].data[0].value) {
              rebaseBtn.hide();
              clearTimeout(timeout);
            }
            this.show();
            nodes[index].focus();
            toPlayer = false;
          },
          "view:error": function (view) {
            toPlayer = false;
            if (view === "empty") {
              this.data = [];
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[index];
              nodes[k].$node.style.top = "0";
              if (nodes[i]) {
                nodes[i].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              rebaseBtn.hide();
              this.show();
              clearTimeout(timeout);
              nodes[index].focus();
            } else if (page === 0) {
              process(0, false);
            }
          },
          "click:item": function (context) {
            if (context.$item.data.id) {
              t.setContent({
                channel: this.model.channel,
                video: context.$item.data,
                playlist: this.data,
                position: context.$item.index
              });
            }
          },
          focus: function () {
            self.focusEntry = this;
          }
        }
      }));
      nodes.push(new ViewModel({
        $node: document.getElementById("pmListMainVideos1Node"),
        $body: document.getElementById("pmListMainVideos1Body"),
        $title: document.getElementById("pmMainChannelTitle1"),
        className: "listMovie1Node",
        model: new Model({
          type: "video"
        }),
        size: 5,
        viewIndex: 0,
        focusIndex: 0,
        type: ActionClient.prototype.TYPE_HORIZONTAL,
        events: {
          overflow: function (data) {
            if (data.direction === options.left) {
              fbLargeCommandLine.focus();
            }
          },
          "view:ready": function () {
            self.focusEntry = nodes[index];
            nodes[k].$node.style.top = "0";
            nodes[i].$node.style.top = pos;
            this.$title.innerHTML = "";
            if (nodes[index] && nodes[index].data.length > 0 && nodes[index].data[0].value) {
              rebaseBtn.hide();
              clearTimeout(timeout);
            }
            this.show();
            clearTimeout(timeout);
            nodes[index].focus();
            toPlayer = false;
          },
          "view:error": function (view) {
            toPlayer = false;
            if (view === "empty") {
              this.data = [{
                id: "",
                value: "",
                publishedAt: "",
                icon: "img/no.image.png",
                duration: "",
                title: gettext("No videos"),
                channelTitle: "",
                viewCount: "",
                locale: {
                  publishedAt: "",
                  viewCount: "",
                  channelTitle: ""
                }
              }];
              this.viewIndex = null;
              this.renderView(0);
              this.focusIndex(0);
              self.focusEntry = nodes[index];
              nodes[k].$node.style.top = "0";
              if (nodes[i]) {
                nodes[i].$node.style.top = pos;
              }
              this.$title.innerHTML = this.model.channel.title;
              this.show();
              rebaseBtn.hide();
              clearTimeout(timeout);
              nodes[index].focus();
            }
          },
          "click:item": function (context) {
            if (context.$item.data.id) {
              t.setContent({
                channel: this.model.channel,
                video: context.$item.data,
                playlist: this.data,
                position: context.$item.index
              });
            }
          },
          focus: function () {
            self.focusEntry = this;
          }
        }
      }));
      self.add(nodes[0]);
      self.add(nodes[1]);
      nodes[0].addListener("keydown", function (key) {
        if (key.code === options.down) {
          process(0, false);
        } else if (key.code === options.up) {
          if (page > 0) {
            process(0, true);
          } else {
            d.focus();
          }
        } else if (key.code === options.playPause) {
          t.setContent({
            channel: this.model.channel,
            video: this.$focusItem.data,
            playlist: this.data,
            position: this.$focusItem.index
          });
        }
      });
      nodes[1].addListener("keydown", function (key) {
        if (key.code === options.down) {
          process(1, false);
        } else if (key.code === options.up) {
          if (page > 0) {
            process(1, true);
          } else {
            d.focus();
          }
        } else if (key.code === options.playPause) {
          t.setContent({
            channel: this.model.channel,
            video: this.$focusItem.data,
            playlist: this.data,
            position: this.$focusItem.index
          });
        }
      });
      pos = window.getComputedStyle(nodes[1].$node).getPropertyValue("top");
      model.getPage({
        page: 0,
        count: 1
      }, function (canCreateDiscussions, groupExist) {
        if (canCreateDiscussions) {
          groupExist = [];
        }
        page = 0;
        k = 0;
        i = 1;
        current = 1;
        index = 0;
        nodes[k].data = groupExist;
        nodes[k].viewIndex = null;
        nodes[k].renderView(0);
        nodes[k].focusIndex(0);
        nodes[k].emit("view:ready");
        nodes[index].focus();
        model.getPage({
          page: 1,
          count: 1
        }, function (canCreateDiscussions, groupExist) {
          if (canCreateDiscussions) {
            groupExist = [];
          }
          nodes[i].data = groupExist;
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
    window.lists = nodes;
  };
  self.add(d);
  module.exports = self;
}, function (module, exports, require) {//require(56)
  function Router() {
    NumericType.call(this);
    this.pages = {};
  }

  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  Router.prototype = Object.create(NumericType.prototype);
  Router.prototype.constructor = Router;
  Router.prototype.getPage = function (page, callback) {
    var state = this;
    page.page = +page.page || 0;
    debug('MODULE 56 - prototype.getPage(' + page.page + ')');
    if (this.pages[page.page] && this.pages[page.page].parseId) {
      if (this.pages[page.page].cached) {
        debug('MODULE 56 - CACHE - prototype.getPage(' + page.page + ') pageToken = ' + state.pages[page.page].parseId);
        callback(null, this.pages[page.page].data);
      } else {
        ajax("get", YOUTUBE_PHP + "?pageToken=" + this.pages[page.page].parseId, function (result, status) {
          debug('MODULE 56 - AJAX - prototype.getPage(' + page.page + ') pageToken = ' + state.pages[page.page].parseId);
          var response;
          var interestingPoint;
          if (status !== 200) {
            return void callback({
              message: "request got bad http status (" + status + ")"
            }, []);
          }
          try {
            response = JSON.parse(result);
          } catch (ex) {
            interestingPoint = ex;
            response = "";
          }
          if (response) {
            state.pages[page.page + 1] = {
              parseId: response.nextPageToken || "",
              cached: false
            };
            state.pages[page.page].cached = true;
            state.pages[page.page].data = parseItems(response.items);
            return void callback(null, state.pages[page.page].data);
          } else {
            return void callback({
              message: "parse error for page id " + state.pages[page.page].parseId,
              code: interestingPoint
            }, []);
          }
        });
      }
    } else {
      if (this.pages[page.page] && !this.pages[page.page].parseId) {
          debug('MODULE 56 - CACHE - prototype.getPage(' + page.page + ') pageToken = ' + this.pages[page.page].parseId);
          if (this.pages[page.page].cached) {
            callback(null, this.pages[page.page].data);
          } else {
            callback(null, []);
          }
      } else {
        ajax("get", YOUTUBE_PHP, function (result, status) {
          debug('MODULE 56 - AJAX - prototype.getPage(' + page.page + ') pageToken =');
          if (status !== 200) {
            return void callback({
              message: "request got bad http status (" + status + ")"
            }, []);
          } else {
            var response;
            try {
              response = JSON.parse(result);
              if (response.hasOwnProperty("items") && response.items.length) {
                state.pages[page.page + 1] = {
                  parseId: response.nextPageToken,
                  cached: false
                };
                state.pages[0] = {
                  cached: true,
                  parseId: "",
                  data: parseItems(response.items)
                };
                void callback(null, state.pages[0].data);
              } else {
                return window.core.notify({
                  title: "-",
                  icon: "alert",
                  type: "warning",
                  timeout: 5E3
                });
              }
            } catch (ex) {
              debug('MODULE 56 - Exception: ' + ex);
              return window.core.notify({
                title: ex,
                icon: "alert",
                type: "warning",
                timeout: 5E3
              });
            }
          }
        });
      }
    }
  };
  Router.prototype.filter = function () {
    return false;
  };
  module.exports = Router;
}, function (module, exports, require) {//require(57)
  var c;
  var notifyComment;
  var a;
  var options = require(13);
  var self = require(1);
  var $realtime = require(22);
  var expected = require(58);
  var RootView = require(37);
  var model = require(59);
  var n = require(36);
  var that = new (require(60));
  var v = require(61);
  var Navigation = require(25);
  require(15);
  var element = new $realtime({
    $node: document.getElementById("ps")
  });
  var input = new expected({
    $node: document.getElementById("psSearch"),
    $body: document.getElementById("psSearchInput")
  });
  var searchContactPanel = require(27);
  var x = true;
  var postcssUnprocessedInputText = " ";
  var ctrl = null;
  var timeout = -1;
  element.addListener("keydown", function (key) {
    if (key.code === options.back) {
      self.route(self.pages.main);
      key.stop = true;
    }
  });
  element.addListener("hide", function () {
    searchContactPanel.hide();
  });
  notifyComment = v(function (action) {
    postcssUnprocessedInputText = action.value;
    ctrl.model.filter({
      searchQuery: action.value
    });
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      searchContactPanel.hide();
    }, 5E3);
  }, 1E3);
  element.addListener("show", function (match) {
    debug('MODULE 57 - addListener show');
    match = match.data || {};
    Navigation.updateView({
      SEARCH: {
        icon: "search",
        visible: false,
        text: ""
      },
      MORE: {
        icon: "more",
        visible: false,
        text: ""
      },
      GUIDE: {
        icon: "info",
        visible: true,
        text: gettext("Search")
      },
      BACK: {
        icon: "back",
        visible: true,
        text: gettext("Back")
      }
    });
    searchContactPanel.hide();
    input.setValue("");
    if (!element.activeComponent) {
      if (x) {
        window.psSearchIcon.style.display = "block";
        setTimeout(function () {
          window.psSearchIcon.style.display = "inline-table";
        }, 0);
      }
      if (element.activeComponent === null || element.activeComponent === input) {
        setTimeout(function () {
          input.focus();
          window.searchInput = input;
          if (match.search) {
            input.setValue(match.search);
          }
        }, 0);
      }
    }
  });
  (function () {
    c = require(62);
    input.addListener("keydown", function (key) {
      if (key.code === options.ok || key.code === options.info || key.code === options.playPause) {
        ctrl.hide();
        searchContactPanel.show();
        notifyComment({
          value: input.value
        });
      } else if (key.code === options.home || key.code === options.exit) {
        self.route(self.pages.main);
        key.stop = true;
      } else if (key.code === options.refresh) {
        input.setValue("");
        a = input.getCaretPosition();
      } else if (key.code === options.down) {
        a = input.getCaretPosition();
        c.focus();
      } else if (key.code === options.up && ctrl.visible) {
        ctrl.focus();
        if (!ctrl.$focusItem) {
          ctrl.focusIndex(0);
        }
      } else if (key.code === options.back && this.$body.value.length === 0) {
        self.route(self.pages.main);
        key.stop = true;
      }
    });
    /*input.addListener("input", function (comment) {
     ctrl.hide();
     searchContactPanel.show();
     notifyComment(comment);
   });*/
    c.addListener("overflow", function (data) {
      if (data.direction === options.up) {
        input.focus();
      }
    });
    c.addListener("click:item", function (context) {
      if (context.$item.data.className === "symbol") {
        input.addChar(context.$item.data.value, a);
        ++a;
      } else if (context.$item.data.className.indexOf("keySpace") !== -1) {
        input.addChar(" ", a);
        a = input.getCaretPosition();
      } else if (context.$item.data.className.indexOf("keyDelete") !== -1) {
        input.removeChar();
        a = input.getCaretPosition();
      } else if (context.$item.data.className.indexOf("delete") !== -1) {
        input.setValue("");
        a = input.getCaretPosition();
      }
    });
    c.addListener("keydown", function (key) {
      if (key.code === options.menu || key.code === options.info || key.code === options.playPause) {
        ctrl.hide();
        searchContactPanel.show();
        notifyComment({
          value: input.value
        });
      } else if (key.code === options.home || key.code === options.exit) {
        self.route(self.pages.main);
        key.stop = true;
      } else if (key.code === options.refresh) {
        input.setValue("");
        a = input.getCaretPosition();
      }
    });
    ctrl = new RootView({
      $node: document.getElementById("psListVideos"),
      model: new model({
        order: "relevance"
      }),
      className: "movieList",
      size: 5,
      events: {
        keydown: function (key) {
          switch (key.code) {
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
              } else if (this.$focusItem.index === 1) {
                this.focusIndex(0);
              } else {
                this.move(key.code);
              }
              break;
            case options.ok:
              this.emit("click:item", {
                $item: this.$focusItem,
                event: key
              });
          }
        },
        "click:item": function (context) {
          if (context.$item.data.type === "video") {
            if (context.$item.data.id) {
              n.setContent({
                video: context.$item.data,
                playlist: this.data,
                position: context.$item.index
              });
            } else if (context.$item.data.canonicalBaseUrl) {
              ctrl.hide();
              searchContactPanel.show();
              notifyComment({
                value: context.$item.data.canonicalBaseUrl
              });
            }
          } else {
            if (context.$item.data.type === "playlist") {
              that.getPage({
                playlistId: context.$item.data.playlistId
              }, function (canCreateDiscussions, results) {
                n.setContent({
                  channel: context.$item.data.channel,
                  video: results[0],
                  playlist: results,
                  position: 0
                });
              });
            } else if (context.$item.data.type === "channel") {
              self.route(self.pages.main, {
                channel: context.$item.data
              });
            }
          }
        },
        "view:ready": function () {
          clearTimeout(timeout);
          searchContactPanel.hide();
          this.show();
          this.focusIndex(0);
        }
      },
      render: function (node, data) {
        var body;
        var n;
        var s;
        if (node.ready) {
          node.$videoThumb.className = "thumb " + data.type;
          node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
          node.$videoTitle.innerText = data.title;
          node.$videoTitle.className = "title " + data.type;
          node.$videoAthour.className = "uploader " + data.type;
          if (data.type === "video") {
            node.$videoAthour.innerText = data.locale.channelTitle;
            node.$viewCounter.innerText = data.locale.viewCount;
            node.$dateAdded.innerText = data.locale.publishedAt;
            node.$videoDuration.innerText = data.duration;
          } else if (data.type === "channel") {
            node.$videoAthour.innerText = data.locale.subscriberCount;
            node.$viewCounter.innerText = "";
            node.$dateAdded.innerText = "";
            node.$videoDuration.innerText = "";
          } else {
            node.$videoAthour.innerText = data.locale.channelTitle;
            node.$viewCounter.innerText = "";
            node.$dateAdded.innerText = "";
            node.$videoDuration.innerText = "";
          }
          if (data.type === "playlist") {
            node.$videoDuration.className = "icon playlist";
          } else {
            node.$videoDuration.className = "duration";
          }
        } else {
          body = document.createElement("div");
          body.className = "container";
          node.appendChild(body);
          n = document.createElement("div");
          n.className = "tileTop";
          body.appendChild(n);
          s = document.createElement("div");
          s.className = "tileBottom";
          body.appendChild(s);
          node.$videoThumb = document.createElement("div");
          node.$videoThumb.className = "thumb " + data.type;
          node.$videoThumb.style.backgroundImage = "url(" + data.icon + ")";
          n.appendChild(node.$videoThumb);
          node.$videoDuration = document.createElement("div");
          if (data.type === "playlist") {
            node.$videoDuration.className = "icon playlist";
          } else {
            node.$videoDuration.className = "duration";
          }
          if (data.duration) {
            node.$videoDuration.innerText = data.duration;
          } else {
            node.$videoDuration.innerText = "";
          }
          n.appendChild(node.$videoDuration);
          node.$videoTitle = document.createElement("div");
          node.$videoTitle.className = "title " + data.type;
          node.$videoTitle.innerText = data.title;
          s.appendChild(node.$videoTitle);
          node.$videoAthour = document.createElement("div");
          node.$videoAthour.className = "uploader " + data.type;
          if (data.channelTitle) {
            node.$videoAthour.innerText = data.locale.channelTitle;
          } else if (data.type === "channel") {
            node.$videoAthour.innerText = data.locale.subscriberCount;
          } else {
            node.$videoAthour.innerText = "";
          }
          s.appendChild(node.$videoAthour);
          node.$viewCounter = document.createElement("div");
          node.$viewCounter.className = "viewCount";
          if (data.type === "video") {
            node.$viewCounter.innerText = data.locale.viewCount;
          } else {
            node.$viewCounter.innerText = "";
          }
          s.appendChild(node.$viewCounter);
          node.$dateAdded = document.createElement("div");
          node.$dateAdded.className = "uploaded";
          if (data.type === "video") {
            node.$dateAdded.innerText = data.locale.publishedAt;
          } else {
            node.$dateAdded.innerText = "";
          }
          s.appendChild(node.$dateAdded);
          node.ready = true;
        }
      }
    });
  })();
  module.exports = element;
}, function (module, exports, require) {//require(58)
  function Init(config) {
    var that = this;
    this.value = "";
    this.type = this.TYPE_TEXT;
    this.type = this.TYPE_TEXT;
    this.direction = "ltr";
    this.noprevent = true;
    config = config || {};
    config.className = "inputNative " + (config.className || "");
    b.call(this, config);
    this.init(config);
    this.addListener("keydown", function (key) {
      if (key.code === options.back) {
        key.stop = true;
      }
    });
    this.$body.addEventListener("input", function () {
      that.value = that.$body.value;
      if (that.events["input"] !== undefined) {
        that.emit("input", {
          value: that.$body.value
        });
      }
    });
    this.addListener("focus", function () {
      that.$body.focus();
    });
    this.addListener("blur", function () {
      that.$body.blur();
    });
  }

  var b = require(31);
  var options = require(13);
  Init.prototype = Object.create(b.prototype);
  Init.prototype.constructor = Init;
  Init.prototype.init = function (data) {
    if (data.type !== undefined) {
      this.$body.type = this.type = data.type;
    }
    if (data.value !== undefined) {
      this.$body.value = this.value = data.value;
    }
    if (data.placeholder !== undefined) {
      this.$body.placeholder = data.placeholder;
    }
    if (data.direction !== undefined) {
      this.$node.dir = this.direction = data.direction;
    }
  };
  Init.prototype.addChar = function (char, index) {
    index = index === undefined ? this.value.length : index;
    this.value = this.value.substring(0, index) + char + this.value.substring(index, this.value.length);
    this.$body.value = this.value;
    if (this.events["input"] !== undefined) {
      this.emit("input", {
        value: this.value
      });
    }
  };
  Init.prototype.removeChar = function (index) {
    index = index === undefined ? this.value.length - 1 : index;
    if (this.value.length > 0) {
      this.value = this.value.substring(0, index) + this.value.substring(index + 1, this.value.length);
      this.$body.value = this.value;
      if (this.events["input"] !== undefined) {
        this.emit("input", {
          value: this.value
        });
      }
    }
    this.$body.value = this.value;
  };
  Init.prototype.setCaretPosition = function (start) {
    this.$body.setSelectionRange(start, start);
  };
  Init.prototype.getCaretPosition = function () {
    return this.$body.selectionStart;
  };
  Init.prototype.setValue = function (value) {
    if (this.value !== value) {
      this.value = value;
      this.$body.value = this.value;
      if (this.events["input"] !== undefined) {
        this.emit("input", {
          value: this.value
        });
      }
    }
  };
  module.exports = Init;
}, function (module, exports, require) {//require(59)
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
    var cmp;
    var hide;
    var items = [];
    var crossfilterable_layers = src.split('<div class="yt-lockup yt-lockup-tile ');
    var length = crossfilterable_layers.length;
    for (var layer_i = 0; layer_i < length; layer_i++) {
      cmp = crossfilterable_layers[layer_i];
      if (cmp.indexOf("yt-lockup-content") !== -1) {
        if (cmp.indexOf("yt-lockup-playlist") !== -1) {
          type = "playlist";
        } else if (cmp.indexOf("yt-lockup-channel") !== -1) {
          type = "channel";
        } else {
          if (cmp.indexOf("yt-lockup-video") === -1 || cmp.indexOf("branded-page-module") !== -1 || cmp.indexOf("data-set-reminder-text") !== -1) {
            continue;
          }
          hide = cmp.indexOf("yt-badge-live") !== -1;
          type = "video";
        }
        data = cmp.indexOf("//i.ytimg");
        o = cmp.indexOf('"', data);
        awesomeIcon = "https:" + cmp.substring(data, o).replace(/&amp;/g, "&");
        data = cmp.indexOf('" dir="ltr">') + 12;
        if (data === 11) {
          data = cmp.indexOf(' dir="ltr">') + 11;
          if (data === 10) {
            data = cmp.indexOf('" dir="rtl">') + 12;
          }
        }
        o = cmp.indexOf("</", data);
        h = cmp.substring(data, o);
        if (cmp.indexOf('<a href="/channel/') === -1) {
          if (cmp.indexOf("data-channel-external-id=") === -1) {
            if (cmp.indexOf('<a href="/user/') === -1) {
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
        if (type === "playlist") {
          if (cmp.indexOf('<div class="yt-lockup-byline ">YouTube</div>') !== -1) {
            name = "";
          }
          data = cmp.indexOf('<a href="/watch?v=') + 9;
          o = cmp.indexOf('"', data);
          playlistId = cmp.substring(data, o).replace("&amp;", "&");
          data = cmp.indexOf('" dir="ltr">', o) + 12;
          o = cmp.indexOf("<", data);
          r = cmp.substring(data, o);
          items.push({
            value: 1,
            playlistId: playlistId,
            channel: {
              title: r.substr(0, 100),
              id: name
            },
            title: h.substr(0, 100),
            icon: awesomeIcon,
            type: "playlist",
            channelTitle: r.substr(0, 100),
            viewCount: " ",
            duration: " ",
            publishedAt: " ",
            locale: {
              publishedAt: " ",
              viewCount: " ",
              channelTitle: r.substr(0, 100)
            }
          });
        }
        if (type === "video") {
          data = cmp.indexOf('href="/watch?v=') + 15;
          o = cmp.indexOf('"', data);
          c = cmp.substring(data, o);
          data = cmp.indexOf('<a href="', data);
          data = cmp.indexOf(">", data) + 1;
          o = cmp.indexOf("</a>", data);
          r = cmp.substring(data, o);
          data = cmp.indexOf('<span class="video-time" aria-hidden="true">') + 44;
          if (data === 43) {
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
            value: 1,
            id: c,
            channelTitle: r.substr(0, 100),
            duration: hide ? "" : m.substr(0, 100),
            realDuration: hide ? "" : m.substr(0, 100),
            viewCount: config.substr(0, 100),
            publishedAt: hide ? "" : sum.substr(0, 100),
            dimension: "",
            definition: "",
            title: h.substr(0, 100),
            icon: awesomeIcon,
            channelId: name,
            type: "video",
            locale: {
              publishedAt: hide ? "" : sum.substr(0, 100),
              viewCount: config.substr(0, 100),
              channelTitle: r.substr(0, 100)
            }
          });
        }
        if (type === "channel") {
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
            js = "";
          }
          data = cmp.indexOf('yt-subscriber-count" title="') + 28;
          o = cmp.indexOf('"', data);
          n = cmp.substring(data, o);
          items.push({
            value: 1,
            id: name,
            title: h.substr(0, 100),
            icon: awesomeIcon,
            type: "channel",
            viewCount: "",
            commentCount: "",
            subscriberCount: n.substr(0, 100),
            hiddenSubscriberCount: "",
            videoCount: js.substr(0, 100),
            locale: {
              subscriberCount: n.substr(0, 100)
            }
          });
        }
      }
    }
    return items;
  }

  function Router(name) {
    NumericType.call(this);
    this.pages = {};
    this.searchQuery = "";
    this.filter(name);
  }

  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  Router.prototype = Object.create(NumericType.prototype);
  Router.prototype.constructor = Router;
  Router.prototype.getPage = function (page, callback) {
    var state = this;
    page.page = +page.page || 0;
    if (this.pages[page.page] && this.pages[page.page].parseId) {
      if (this.pages[page.page].cached) {
        callback(null, this.pages[page.page].data);
      } else {
        ajax("get", "https://www.youtube.com" + this.pages[page.page].parseId, function (result, status) {
          debug('MODULE 59 - prototype.getPage() ajax page > 0');
          var tokens;
          var j;
          var i;
          var resizewidth;
          return status !== 200 ? void callback({
            message: "request got bad http status (" + status + ")"
          }, []) : (j = result.indexOf('class="branded-page-box search-pager'), i = result.indexOf('class="branded-page-v2-secondary-col', j), tokens = result.substring(j, i), tokens = tokens.split('<a href="'), tokens[tokens.length - 1] && tokens[tokens.length - 1].indexOf("»") !== -1 ? (j = tokens[tokens.length - 1].indexOf('href="/results?') + 6, i = tokens[tokens.length - 1].indexOf('"', j), resizewidth = tokens[tokens.length - 1].substring(j, i).replace("&amp;", "&")) : resizewidth = "", state.pages[page.page +
          1] = {
            parseId: resizewidth,
            cached: false
          }, tokens = result.slice(result.indexOf('id="item-section-'), result.indexOf('class="branded-page-box search-pager')), state.pages[page.page] = {
            cached: true,
            data: parse(tokens)
          }, void callback(null, state.pages[page.page].data));
        });
      }
    } else {
      if (page.page) {
        if (this.pages[page.page] && !this.pages[page.page].parseId) {
          callback(null, []);
        } else {
          callback({
            message: "wrong page number (page id not found in cache)"
          }, []);
        }
      } else {
        var search = encodeURIComponent(this.searchQuery.trim().replace(/ +/g, " "));
        if (search.length) {
          ajax("get", YOUTUBE_PHP + "?search=" + search, function (result, status) {
            debug('MODULE 59 - prototype.getPage() search_query');
            if (status !== 200) {
              return window.core.notify({
                title: "Request got bad http status (" + status + ")",
                icon: "alert",
                type: "warning",
                timeout: 5E3
              });
            }
            var response;
            try {
              response = JSON.parse(result);
              if (response.hasOwnProperty("items") && response.items.length) {
                state.pages[page.page + 1] = {
                  parseId: response.nextPageToken,
                  cached: false
                };
                state.pages[0] = {
                  cached: true,
                  parseId: "/results?search_query=" + state.searchQuery,
                  data: parseItems(response.items)
                };
                void callback(null, state.pages[0].data);
              } else {
                return window.core.notify({
                  title: "-",
                  icon: "alert",
                  type: "warning",
                  timeout: 5E3
                });
              }
            } catch (ex) {
              debug('MODULE 59 - Exception: ' + ex);
              return window.core.notify({
                title: ex,
                icon: "alert",
                type: "warning",
                timeout: 5E3
              });
            }
          });
        }
      }
    }
  };
  Router.prototype.filter = function (params) {
    this.searchQuery = params.searchQuery;
    this.pages = {};
    this.emit("content:changed", params);
    return true;
    //var t = false;
    //return params.searchQuery !== undefined && this.searchQuery !== params.searchQuery && (t = true, this.searchQuery = params.searchQuery), !!t && (this.pages = {}, this.emit("content:changed", params), true);
  };
  module.exports = Router;
}, function (module, exports, require) {//require(60)
  function resolve(fn, name) {
    var token;
    var str;
    var text;
    var awesomeIcon;
    var index;
    var end;
    var template_string;
    var arr = [];
    var crossfilterable_layers = fn.split('<li class="yt-uix-scroller-scroll-unit');
    var length = crossfilterable_layers.length;
    for (var layer_i = 0; layer_i < length; layer_i++) {
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
            value: 1,
            id: token,
            channelTitle: str,
            duration: " ",
            realDuration: " ",
            viewCount: " ",
            publishedAt: " ",
            dimension: "",
            definition: "",
            title: text,
            icon: awesomeIcon,
            channelId: name,
            type: "video",
            locale: {
              publishedAt: " ",
              viewCount: " ",
              channelTitle: str
            }
          });
        }
      }
    }
    return arr;
  }

  function Router() {
    NumericType.call(this);
    this.pages = {};
    this.playlistId = null;
  }

  var $ = require(49);
  var ajax = $.ajax;
  var NumericType = require(4);
  Router.prototype = Object.create(NumericType.prototype);
  Router.prototype.constructor = Router;
  Router.prototype.getPage = function (data, callback) {
    debug('MODULE 60 - prototype.getPage()');
    var childSection = this;
    data.page = data.page || 0;
    return data.playlistId ? (data.playlistId !== this.playlistId && (this.playlistId = data.playlistId, this.pages = {}), data.page ? void callback(null, []) : void (this.pages[0] ? callback(null, this.pages[0].data) : ajax("get", "https://www.youtube.com" + data.playlistId, function (result, status) {
      var e;
      var j;
      var i;
      var track;
      return status !== 200 ? void callback({
        message: "request got bad http status (" + status + ")"
      }, []) : (j = result.indexOf('<a href="/channel/') + 10, i = result.indexOf('"', j), track = result.substring(j, i), j = result.indexOf('id="playlist-autoscroll-list"'), i = result.indexOf('id="placeholder-player"', j), e = result.slice(j, i), childSection.pages[0] = {
        cached: true,
        parseId: data.playlistId.replace(/&amp;/g, "&"),
        data: resolve(e, track)
      }, void callback(null, childSection.pages[0].data));
    }))) : void callback({
      message: "error: field arguments[0].playlistId is empty"
    }, []);
  };
  Router.prototype.filter = function () {
    return false;
  };
  module.exports = Router;
}, function (module) {//require(61)
  module.exports = function (_, t) {
    var timeout;
    return function () {
      var andClause = this;
      var others = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        _.apply(andClause, others);
      }, t);
    };
  };
}, function (module, exports, require) {//require(62)
  var $first;
  var v = require(1);
  var ContentBlock = require(63);
  var path = require(42);
  var n = require(15);
  var content = new ContentBlock({
    $node: document.getElementById("psKeyboard"),
    className: "keyList",
    cycleY: false,
    events: {
      "click:item": function (context) {
        if (context.$item.data.className.indexOf("keyGlobe") !== -1) {
          v.settings.keyboardLanguage = path.nextLang(v.settings.keyboardLanguage);
          this.viewIndex = null;
          this.init({
            data: require(65)("./" + n.languages[v.settings.keyboardLanguage])
          });
          this.focusItem($first);
          window.top.gSTB.SetInputLang(n.languages[v.settings.keyboardLanguage]);
        } else {
          if (context.$item.data.className.indexOf("nums") !== -1) {
            this.init({
              data: [[{
                value: "1",
                className: "symbol"
              }, {
                value: "2",
                className: "symbol"
              }, {
                value: "3",
                className: "symbol"
              }, {
                value: "^",
                className: "symbol"
              }, {
                value: "`",
                className: "symbol"
              }, {
                value: "!",
                className: "symbol"
              }, {
                value: "#",
                className: "symbol"
              }, {
                value: "$",
                className: "symbol"
              }, {
                value: "%",
                className: "symbol"
              }], [{
                value: "4",
                className: "symbol"
              }, {
                value: "5",
                className: "symbol"
              }, {
                value: "6",
                className: "symbol"
              }, {
                value: "&",
                className: "symbol"
              }, {
                value: "(",
                className: "symbol"
              }, {
                value: ")",
                className: "symbol"
              }, {
                value: "*",
                className: "symbol"
              }, {
                value: ";",
                className: "symbol"
              }, {
                value: ":",
                className: "symbol"
              }], [{
                value: "7",
                className: "symbol"
              }, {
                value: "8",
                className: "symbol"
              }, {
                value: "9",
                className: "symbol"
              }, {
                value: "~",
                className: "symbol"
              }, {
                value: "/",
                className: "symbol"
              }, {
                value: "|",
                className: "symbol"
              }, {
                value: "%",
                className: "symbol"
              }, {
                value: ":",
                className: "symbol"
              }, {
                value: "?",
                className: "symbol"
              }], [{
                value: "№",
                className: "symbol"
              }, {
                value: "0",
                className: "symbol"
              }, {
                value: "[",
                className: "symbol"
              }, {
                value: "]",
                className: "symbol"
              }, {
                value: '"',
                className: "symbol"
              }, {
                value: "'",
                className: "symbol"
              }, {
                value: "{",
                className: "symbol"
              }, {
                value: "}",
                className: "symbol"
              }, {
                value: "ABC",
                className: "symbol letters"
              }]]
            });
          } else if (context.$item.data.className.indexOf("letters") !== -1) {
            this.init({
              data: require(65)("./" + n.languages[v.settings.keyboardLanguage])
            });
          }
        }
      }
    },
    render: function (fn, el) {
      if (el.className === "keyGlobe") {
        fn.innerHTML = n.languagesCodeLocalized[v.settings.keyboardLanguage];
        $first = fn;
      } else {
        fn.innerHTML = el.value;
      }
      if (el.className) {
        fn.className = "item " + el.className;
      }
    },
    data: require(65)("./" + n.languages[v.settings.keyboardLanguage])
  });
  window.top.gSTB.SetInputLang(n.languages[v.settings.keyboardLanguage]);
  module.exports = content;
}, function (module, exports, require) {//require(63)
  module.exports = require(64);
  module.exports.prototype.name = "stb-component-grid";
}, function (module, exports, require) {//require(64)
  function Node(config) {
    config = config || {};
    this.map = [];
    this.$focusItem = null;
    this.data = [];
    this.cycleX = true;
    this.cycleY = true;
    this.focusX = 0;
    this.focusY = 0;
    b.call(this, config);
    this.init(config);
  }

  function merge(object) {
    var length = object.length;
    for (var idx = 0; idx < length; idx++) {
      var size = object[idx].length;
      for (var i = 0; i < size; i++) {
        var options = object[idx][i];
        if (typeof options == "object") {
          options.colSpan = options.colSpan || 1;
          options.rowSpan = options.rowSpan || 1;
        } else {
          options = object[idx][i] = {
            value: object[idx][i],
            colSpan: 1,
            rowSpan: 1
          };
        }
      }
    }
    return object;
  }

  function drawLine(data, row, col, colSpan, rowSpan, a) {
    var length = col + rowSpan;
    for (var c = col; c < length; c++) {
      if (data.length < c + 1) {
        data.push([]);
      }
      var size = row + colSpan;
      for (rowSpan = row; rowSpan < size; rowSpan++) {
        if (data[c].length < rowSpan + 1) {
          data[c].push();
        }
        data[c][rowSpan] = a;
        if (a.x === undefined) {
          a.x = rowSpan;
        }
        if (a.y === undefined) {
          a.y = c;
        }
      }
    }
  }

  function clone(events) {
    var item;
    var result = [];
    var length = events.length;
    for (var e = 0; e < length; e++) {
      var size = events[e].length;
      for (var i = 0; i < size; i++) {
        item = events[e][i];
        drawLine(result, i, e, item.colSpan, item.rowSpan, item.$item);
        delete item.$item;
      }
    }
    return result;
  }

  var b = require(24);
  var c = require(14);
  Node.prototype = Object.create(b.prototype);
  Node.prototype.constructor = Node;
  Node.prototype.name = "spa-component-grid";
  Node.prototype.renderItemDefault = function (val, args) {
    val.innerText = args.value;
  };
  Node.prototype.renderItem = Node.prototype.renderItemDefault;
  Node.prototype.defaultEvents = {
    mousewheel: function (event) {
      if (event.wheelDeltaY) {
        this.move(event.wheelDeltaY > 0 ? c.up : c.down);
      }
      if (event.wheelDeltaX) {
        this.move(event.wheelDeltaX > 0 ? c.left : c.right);
      }
    },
    keydown: function (key) {
      switch (key.code) {
        case c.up:
        case c.down:
        case c.right:
        case c.left:
          this.move(key.code);
          break;
        case c.enter:
          if (this.events["click:item"]) {
            this.emit("click:item", {
              $item: this.$focusItem,
              event: key
            });
          }
      }
    }
  };
  Node.prototype.init = function (options) {
    var t;
    var i;
    var row;
    var obj;
    var body;
    var id;
    var item;
    var fresh;
    var self = this;
    var result = false;
    var update = function (event) {
      if (this.data.disable !== true) {
        self.focusItem(this);
        if (self.events["click:item"]) {
          self.emit("click:item", {
            $item: this,
            event: event
          });
        }
      }
    };
    var render = function (data) {
      if (data && self.data !== data) {
        self.data = data;
        result = true;
      }
      if (options.render && self.renderItem !== options.render) {
        self.renderItem = options.render;
        result = true;
      }
      if (result) {
        self.$table = document.createElement("table");
        body = document.createElement("tbody");
        self.data = merge(self.data);
        var length = self.data.length;
        for (t = 0; t < length; t++) {
          row = body.insertRow();
          var size = self.data[t].length;
          for (i = 0; i < size; i++) {
            obj = row.insertCell(-1);
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
    if (options.cycleX !== undefined) {
      this.cycleX = options.cycleX;
    }
    if (options.cycleY !== undefined) {
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
      fresh = this.provider.get(null, function (imageInfoItem, c) {
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
          fresh: fresh
        });
      }
    } else {
      render(options.data);
    }
  };
  Node.prototype.defaultTranslate = function (d) {
    var _draggablesById = [];
    var sizeY = this.sizeY;
    var sizeX = this.sizeX;
    for (var id = 0; id < sizeY; id++) {
      var dd = [];
      for (var i = 0; i < sizeX; i++) {
        dd[i] = d[id * sizeX + i];
      }
      _draggablesById[id] = dd;
    }
    return _draggablesById;
  };
  Node.prototype.translate = Node.prototype.defaultTranslate;
  Node.prototype.move = function (type) {
    var fresh;
    var y = this.focusX;
    var x = this.focusY;
    var s = true;
    var a = false;
    var cycle = false;
    for (; s;) {
      switch (type) {
        case c.up:
          if (x > 0) {
            x--;
          } else {
            if (this.cycleY) {
              x = this.map.length - 1;
              cycle = true;
            }
            a = true;
          }
          break;
        case c.down:
          if (x < this.map.length - 1) {
            x++;
          } else {
            if (this.cycleY) {
              x = 0;
              cycle = true;
            }
            a = true;
          }
          break;
        case c.right:
          if (y < this.map[x].length - 1) {
            y++;
          } else {
            if (this.cycleX) {
              y = 0;
              cycle = true;
            }
            a = true;
          }
          break;
        case c.left:
          if (y > 0) {
            y--;
          } else {
            if (this.cycleX) {
              y = this.map[x].length - 1;
              cycle = true;
            }
            a = true;
          }
          break;
      }
      if (y === this.focusX && x === this.focusY) {
        s = false;
      }
      if (this.map[x][y] !== this.map[this.focusY][this.focusX] && this.map[x][y].data.disable !== true) {
        s = false;
      }
      if (a) {
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
        fresh = this.provider.get(type, function (imageInfoItem, t) {
          if (imageInfoItem && self.events["data:error"]) {
            return void self.emit("data:error", imageInfoItem);
          }
          if (t) {
            self.data = self.translate(t);
            var sizeY = self.sizeY - 1;
            var sizeX = self.sizeX;
            for (var collectionName = 0; collectionName < sizeY; collectionName++) {
              for (var i = 0; i < sizeX; i++) {
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
            fresh: fresh
          });
        }
      }
      if (this.events["overflow"]) {
        this.emit("overflow", {
          direction: type,
          cycle: cycle
        });
      }
    }
  };
  Node.prototype.focusItem = function (item) {
    var x = this.$focusItem;
    return item && x !== item && item.data.disable !== true && (x !== null && (x.classList.remove("focus"), this.events["blur:item"] && this.emit("blur:item", {
      $item: x
    })), this.focusX = item.x, this.focusY = item.y, this.$focusItem = item, item.classList.add("focus"), this.events["focus:item"] && this.emit("focus:item", {
      $prev: x,
      $curr: item
    }), true);
  };
  Node.prototype.markItem = function (index, options) {
    if (options) {
      index.classList.add("mark");
    } else {
      index.classList.remove("mark");
    }
    index.data.mark = options;
  };
  module.exports = Node;
}, function (module, exports, require) {//require(65)
  function result(val) {
    return require(resolve(val));
  }

  function resolve(x) {
    return schemasValue[x] || function () {
      throw new Error("Cannot find module '" + x + "'.");
    }();
  }

  var schemasValue = {
    "./ar": 66,
    "./ar.js": 66,
    "./de": 67,
    "./de.js": 67,
    "./en": 68,
    "./en.js": 68,
    "./ru": 69,
    "./ru.js": 69,
    "./uk": 70,
    "./uk.js": 70
  };
  result.keys = function () {
    return Object.keys(schemasValue);
  };
  result.resolve = resolve;
  module.exports = result;
  result.id = 65;
}, function (module) {//require(66)
  module.exports = [[{
    value: "\u0636",
    className: "symbol"
  }, {
    value: "\u0635",
    className: "symbol"
  }, {
    value: "\u062b",
    className: "symbol"
  }, {
    value: "\u0642",
    className: "symbol"
  }, {
    value: "\u0641",
    className: "symbol"
  }, {
    value: "\u063a",
    className: "symbol"
  }, {
    value: "\u0639",
    className: "symbol"
  }, {
    value: "\u0647",
    className: "symbol"
  }, {
    value: "\u062e",
    className: "symbol"
  }, {
    value: "\u062d",
    className: "symbol"
  }, {
    value: "\u062c",
    className: "symbol"
  }, {
    value: "Delete",
    className: "symbol delete wide",
    colSpan: 2
  }, {
    value: "&nbsp;",
    className: "icon keyDelete"
  }], [{
    value: "\u062f",
    className: "symbol"
  }, {
    value: "\u0634",
    className: "symbol"
  }, {
    value: "\u0633",
    className: "symbol"
  }, {
    value: "\u064a",
    className: "symbol"
  }, {
    value: "\u0628",
    className: "symbol"
  }, {
    value: "\u0644",
    className: "symbol"
  }, {
    value: "\u0627",
    className: "symbol"
  }, {
    value: "\u062a",
    className: "symbol"
  }, {
    value: "\u0646",
    className: "symbol"
  }, {
    value: "\u0630",
    className: "symbol"
  }, {
    value: "\u0645",
    className: "symbol"
  }, {
    value: "\u0643",
    className: "symbol"
  }, {
    value: "123",
    className: "symbol nums wide"
  }, {
    value: "&nbsp;",
    className: "keyGlobe"
  }], [{
    value: "\u0637",
    className: "symbol"
  }, {
    value: "\u0626",
    className: "symbol"
  }, {
    value: "\u0621",
    className: "symbol"
  }, {
    value: "\u0624",
    className: "symbol"
  }, {
    value: "\u0631",
    className: "symbol"
  }, {
    value: "\u0644\u0627",
    className: "symbol"
  }, {
    value: "\u0649",
    className: "symbol"
  }, {
    value: "\u0629",
    className: "symbol"
  }, {
    value: "\u0648",
    className: "symbol"
  }, {
    value: "\u0632",
    className: "symbol"
  }, {
    value: "\u0638",
    className: "symbol"
  }, {
    value: "Space",
    className: "icon keySpace",
    colSpan: 3
  }]];
}, function (module) {//require(67)
  module.exports = [[{
    value: "q",
    className: "symbol"
  }, {
    value: "w",
    className: "symbol"
  }, {
    value: "e",
    className: "symbol"
  }, {
    value: "r",
    className: "symbol"
  }, {
    value: "t",
    className: "symbol"
  }, {
    value: "z",
    className: "symbol"
  }, {
    value: "u",
    className: "symbol"
  }, {
    value: "i",
    className: "symbol"
  }, {
    value: "o",
    className: "symbol"
  }, {
    value: "p",
    className: "symbol"
  }, {
    value: "ü",
    className: "symbol"
  }, {
    value: "&nbsp;",
    className: "icon keyDelete",
    colSpan: 2
  }], [{
    value: "a",
    className: "symbol"
  }, {
    value: "s",
    className: "symbol"
  }, {
    value: "d",
    className: "symbol"
  }, {
    value: "f",
    className: "symbol"
  }, {
    value: "g",
    className: "symbol"
  }, {
    value: "h",
    className: "symbol"
  }, {
    value: "j",
    className: "symbol"
  }, {
    value: "k",
    className: "symbol"
  }, {
    value: "l",
    className: "symbol"
  }, {
    value: "ö",
    className: "symbol"
  }, {
    value: "ä",
    className: "symbol"
  }, {
    value: "Delete",
    className: "symbol delete",
    colSpan: 2
  }], [{
    value: "y",
    className: "symbol"
  }, {
    value: "x",
    className: "symbol"
  }, {
    value: "c",
    className: "symbol"
  }, {
    value: "v",
    className: "symbol"
  }, {
    value: "b",
    className: "symbol"
  }, {
    value: "n",
    className: "symbol"
  }, {
    value: "m",
    className: "symbol"
  }, {
    value: ".",
    className: "symbol"
  }, {
    value: ",",
    className: "symbol"
  }, {
    value: "/",
    className: "symbol"
  }, {
    value: "@",
    className: "symbol"
  }, {
    value: "123",
    className: "symbol nums"
  }, {
    value: "&nbsp;",
    className: "keyGlobe"
  }], [{
    value: "Space",
    className: "icon keySpace",
    colSpan: 13
  }]];
}, function (module) {//require(68)
  module.exports = [[{
    value: "q",
    className: "symbol"
  }, {
    value: "w",
    className: "symbol"
  }, {
    value: "e",
    className: "symbol"
  }, {
    value: "r",
    className: "symbol"
  }, {
    value: "t",
    className: "symbol"
  }, {
    value: "y",
    className: "symbol"
  }, {
    value: "u",
    className: "symbol"
  }, {
    value: "i",
    className: "symbol"
  }, {
    value: "o",
    className: "symbol"
  }, {
    value: "p",
    className: "symbol"
  }, {
    value: "&nbsp;",
    className: "icon keyDelete",
    colSpan: 2
  }], [{
    value: "a",
    className: "symbol"
  }, {
    value: "s",
    className: "symbol"
  }, {
    value: "d",
    className: "symbol"
  }, {
    value: "f",
    className: "symbol"
  }, {
    value: "g",
    className: "symbol"
  }, {
    value: "h",
    className: "symbol"
  }, {
    value: "j",
    className: "symbol"
  }, {
    value: "k",
    className: "symbol"
  }, {
    value: "l",
    className: "symbol"
  }, {
    value: "-",
    className: "symbol"
  }, {
    value: "Delete",
    className: "symbol delete",
    colSpan: 2
  }], [{
    value: "z",
    className: "symbol"
  }, {
    value: "x",
    className: "symbol"
  }, {
    value: "c",
    className: "symbol"
  }, {
    value: "v",
    className: "symbol"
  }, {
    value: "b",
    className: "symbol"
  }, {
    value: "n",
    className: "symbol"
  }, {
    value: "m",
    className: "symbol"
  }, {
    value: ",",
    className: "symbol"
  }, {
    value: ".",
    className: "symbol"
  }, {
    value: "/",
    className: "symbol"
  }, {
    value: "123",
    className: "symbol nums"
  }, {
    value: "&nbsp;",
    className: "keyGlobe"
  }], [{
    value: "Space",
    className: "icon keySpace",
    colSpan: 12
  }]];
}, function (module) {//require(69)
  module.exports = [[{
    value: "й",
    className: "symbol"
  }, {
    value: "ц",
    className: "symbol"
  }, {
    value: "у",
    className: "symbol"
  }, {
    value: "к",
    className: "symbol"
  }, {
    value: "е",
    className: "symbol"
  }, {
    value: "н",
    className: "symbol"
  }, {
    value: "г",
    className: "symbol"
  }, {
    value: "ш",
    className: "symbol"
  }, {
    value: "щ",
    className: "symbol"
  }, {
    value: "з",
    className: "symbol"
  }, {
    value: "х",
    className: "symbol"
  }, {
    value: "ъ",
    className: "symbol"
  }, {
    value: "&nbsp;",
    className: "icon keyDelete",
    colSpan: 2
  }], [{
    value: "ф",
    className: "symbol"
  }, {
    value: "ы",
    className: "symbol"
  }, {
    value: "в",
    className: "symbol"
  }, {
    value: "а",
    className: "symbol"
  }, {
    value: "п",
    className: "symbol"
  }, {
    value: "р",
    className: "symbol"
  }, {
    value: "о",
    className: "symbol"
  }, {
    value: "л",
    className: "symbol"
  }, {
    value: "д",
    className: "symbol"
  }, {
    value: "ж",
    className: "symbol"
  }, {
    value: "э",
    className: "symbol"
  }, {
    value: "/",
    className: "symbol"
  }, {
    value: "Удалить",
    className: "symbol delete",
    colSpan: 2
  }], [{
    value: "я",
    className: "symbol"
  }, {
    value: "ч",
    className: "symbol"
  }, {
    value: "с",
    className: "symbol"
  }, {
    value: "м",
    className: "symbol"
  }, {
    value: "и",
    className: "symbol"
  }, {
    value: "т",
    className: "symbol"
  }, {
    value: "ь",
    className: "symbol"
  }, {
    value: "б",
    className: "symbol"
  }, {
    value: "ю",
    className: "symbol"
  }, {
    value: "ё",
    className: "symbol"
  }, {
    value: ".",
    className: "symbol"
  }, {
    value: ",",
    className: "symbol"
  }, {
    value: "123",
    className: "symbol nums"
  }, {
    value: "&nbsp;",
    className: "keyGlobe"
  }], [{
    value: "Пробел",
    className: "icon keySpace",
    colSpan: 14
  }]];
}, function (module) {//require(70)
  module.exports = [[{
    value: "й",
    className: "symbol"
  }, {
    value: "ц",
    className: "symbol"
  }, {
    value: "у",
    className: "symbol"
  }, {
    value: "к",
    className: "symbol"
  }, {
    value: "е",
    className: "symbol"
  }, {
    value: "н",
    className: "symbol"
  }, {
    value: "г",
    className: "symbol"
  }, {
    value: "ш",
    className: "symbol"
  }, {
    value: "щ",
    className: "symbol"
  }, {
    value: "з",
    className: "symbol"
  }, {
    value: "х",
    className: "symbol"
  }, {
    value: "ї",
    className: "symbol"
  }, {
    value: "&nbsp;",
    className: "icon keyDelete",
    colSpan: 2
  }], [{
    value: "ф",
    className: "symbol"
  }, {
    value: "і",
    className: "symbol"
  }, {
    value: "в",
    className: "symbol"
  }, {
    value: "а",
    className: "symbol"
  }, {
    value: "п",
    className: "symbol"
  }, {
    value: "р",
    className: "symbol"
  }, {
    value: "о",
    className: "symbol"
  }, {
    value: "л",
    className: "symbol"
  }, {
    value: "д",
    className: "symbol"
  }, {
    value: "ж",
    className: "symbol"
  }, {
    value: "є",
    className: "symbol"
  }, {
    value: "/",
    className: "symbol"
  }, {
    value: "Удалить",
    className: "symbol delete",
    colSpan: 2
  }], [{
    value: "ґ",
    className: "symbol"
  }, {
    value: "я",
    className: "symbol"
  }, {
    value: "ч",
    className: "symbol"
  }, {
    value: "с",
    className: "symbol"
  }, {
    value: "м",
    className: "symbol"
  }, {
    value: "и",
    className: "symbol"
  }, {
    value: "т",
    className: "symbol"
  }, {
    value: "ь",
    className: "symbol"
  }, {
    value: "б",
    className: "symbol"
  }, {
    value: "ю",
    className: "symbol"
  }, {
    value: ".",
    className: "symbol"
  }, {
    value: ",",
    className: "symbol"
  }, {
    value: "123",
    className: "symbol nums"
  }, {
    value: "&nbsp;",
    className: "keyGlobe"
  }], [{
    value: "Пробіл",
    className: "icon keySpace",
    colSpan: 14
  }]];
}, function (module) {//require(71)
  module.exports = function (e) {
    var data = {};
    e.split("&").forEach(function (kv) {
      kv = kv.split("=");
      if (kv.length === 2) {
        data[kv[0]] = decodeURIComponent(kv[1]);
      }
    });
    return data;
  };
}]);