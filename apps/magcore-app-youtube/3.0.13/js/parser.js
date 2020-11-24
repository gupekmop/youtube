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

function resolve(data) {
  /** @type {!Array} */
  var items = [];
  data.forEach(el => {
    console.log(el)
    items.push({
      value : 1,
      id : el.id,
      channelTitle : el.snippet.channelTitle,
      duration : el.snippet.channelTitle,
      realDuration : 3,
      viewCount : 3,
      publishedAt : 3,
      dimension : 3,
      definition : 3,
      title : 3,
      icon : 3,
      channelId : 3,
      type : 3,
      locale : {
        publishedAt : 3,
        viewCount : 3,
        channelTitle : 3,
      }
    });
  });
  return items;
}

function createGetVideosListUrl (pageToken = null) {
  var key = 'AIzaSyDjh5DKSn06D1lqhiC6-Zyn1hDtnt6iMKU';
  var url = 'https://www.googleapis.com/youtube/v3/videos' +
    '?key=' + key +
    '&chart=mostPopular' +
    '&part=snippet,contentDetails';
  if(pageToken) {
    url += 'pageToken=' + pageToken;
  }
  return url;
}

const main = {
  pages: {},
  getParseContent: function (page, callback) {
    console.warn('Router.prototype.getPage 5787');
    console.warn('current page: ');
    console.warn(JSON.stringify(page));
    console.warn('this pages: ');
    console.warn(JSON.stringify(this.pages));
    console.warn('!-------------------------------');
    var state = this;
    /** @type {number} */
    page.page = +page.page || 0;
    if (this.pages[page.page] && this.pages[page.page].parseId) {
      if (this.pages[page.page].cached) {
        callback(null, this.pages[page.page].data);
      } else {
        ajax("get", "https://www.youtube.com" + this.pages[page.page].parseId, function(cookie, mmCoreSecondsYear) {
          console.warn('Router.prototype.getPage ajax get parseId');
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
          console.log(data);
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
        ajax("get", createGetVideosListUrl(), function(result, statusCode) {
          console.warn('Router.prototype.getPage ajax get https://www.youtube.com/');
          var response = JSON.parse(result);
          console.log(response);
          if(200 !== statusCode) {
            void callback({
              message : "request got bad http status (" + a + ")"
            });
            return null;
          }
          state.pages[page.page + 1] = {
            parseId : response.nextPageToken,
            cached : false
          };
          state.pages[0] = {
            cached : true,
            parseId : "   ",
            data : resolve(response.items)
          };
          void callback(null, state.pages[0].data);
        });
      }
    }
  }
};
main.getParseContent({"page":0,"count":1}, (metadata, pages) => {});