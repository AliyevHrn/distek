"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Util = t(e.jQuery);
}(void 0, function (e) {
  "use strict";

  e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e["default"] : e;
  var t = "transitionend";

  function i(t) {
    var i = this,
        o = !1;
    return e(this).one(n.TRANSITION_END, function () {
      o = !0;
    }), setTimeout(function () {
      o || n.triggerTransitionEnd(i);
    }, t), this;
  }

  var n = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function getUID(e) {
      do {
        e += ~~(1e6 * Math.random());
      } while (document.getElementById(e));

      return e;
    },
    getSelectorFromElement: function getSelectorFromElement(e) {
      var t = e.getAttribute("data-target");

      if (!t || "#" === t) {
        var i = e.getAttribute("href");
        t = i && "#" !== i ? i.trim() : "";
      }

      try {
        return document.querySelector(t) ? t : null;
      } catch (e) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(t) {
      if (!t) return 0;
      var i = e(t).css("transition-duration"),
          n = e(t).css("transition-delay"),
          o = parseFloat(i),
          s = parseFloat(n);
      return o || s ? (i = i.split(",")[0], n = n.split(",")[0], 1e3 * (parseFloat(i) + parseFloat(n))) : 0;
    },
    reflow: function reflow(e) {
      return e.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(i) {
      e(i).trigger(t);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(t);
    },
    isElement: function isElement(e) {
      return (e[0] || e).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(e, t, i) {
      for (var o in i) {
        if (Object.prototype.hasOwnProperty.call(i, o)) {
          var s = i[o],
              r = t[o],
              a = r && n.isElement(r) ? "element" : null == (l = r) ? "" + l : {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();
          if (!new RegExp(s).test(a)) throw new Error(e.toUpperCase() + ': Option "' + o + '" provided type "' + a + '" but expected type "' + s + '".');
        }
      }

      var l;
    },
    findShadowRoot: function findShadowRoot(e) {
      if (!document.documentElement.attachShadow) return null;

      if ("function" == typeof e.getRootNode) {
        var t = e.getRootNode();
        return t instanceof ShadowRoot ? t : null;
      }

      return e instanceof ShadowRoot ? e : e.parentNode ? n.findShadowRoot(e.parentNode) : null;
    },
    jQueryDetection: function jQueryDetection() {
      if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      var t = e.fn.jquery.split(" ")[0].split(".");
      if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
    }
  };
  return n.jQueryDetection(), e.fn.emulateTransitionEnd = i, e.event.special[n.TRANSITION_END] = {
    bindType: t,
    delegateType: t,
    handle: function handle(t) {
      if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments);
    }
  }, n;
}), function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t(require("jquery"), require("./util.js")) : "function" == typeof define && define.amd ? define(["jquery", "./util.js"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Modal = t(e.jQuery, e.Util);
}(void 0, function (e, t) {
  "use strict";

  function i() {
    return (i = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];

        for (var n in i) {
          Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  function n(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e["default"] : e, t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t["default"] : t;

  var o = "modal",
      s = ".bs.modal",
      r = e.fn.modal,
      a = {
    backdrop: !0,
    keyboard: !0,
    focus: !0,
    show: !0
  },
      l = {
    backdrop: "(boolean|string)",
    keyboard: "boolean",
    focus: "boolean",
    show: "boolean"
  },
      d = ".modal-dialog",
      h = function () {
    function r(e, t) {
      this._config = this._getConfig(t), this._element = e, this._dialog = e.querySelector(d), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0;
    }

    var h,
        c,
        u,
        f = r.prototype;
    return f.toggle = function (e) {
      return this._isShown ? this.hide() : this.show(e);
    }, f.show = function (t) {
      var i = this;

      if (!this._isShown && !this._isTransitioning) {
        e(this._element).hasClass("fade") && (this._isTransitioning = !0);
        var n = e.Event("show.bs.modal", {
          relatedTarget: t
        });
        e(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on("click.dismiss.bs.modal", '[data-dismiss="modal"]', function (e) {
          return i.hide(e);
        }), e(this._dialog).on("mousedown.dismiss.bs.modal", function () {
          e(i._element).one("mouseup.dismiss.bs.modal", function (t) {
            e(t.target).is(i._element) && (i._ignoreBackdropClick = !0);
          });
        }), this._showBackdrop(function () {
          return i._showElement(t);
        }));
      }
    }, f.hide = function (i) {
      var n = this;

      if (i && i.preventDefault(), this._isShown && !this._isTransitioning) {
        var o = e.Event("hide.bs.modal");

        if (e(this._element).trigger(o), this._isShown && !o.isDefaultPrevented()) {
          this._isShown = !1;
          var s = e(this._element).hasClass("fade");

          if (s && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off("focusin.bs.modal"), e(this._element).removeClass("show"), e(this._element).off("click.dismiss.bs.modal"), e(this._dialog).off("mousedown.dismiss.bs.modal"), s) {
            var r = t.getTransitionDurationFromElement(this._element);
            e(this._element).one(t.TRANSITION_END, function (e) {
              return n._hideModal(e);
            }).emulateTransitionEnd(r);
          } else this._hideModal();
        }
      }
    }, f.dispose = function () {
      [window, this._element, this._dialog].forEach(function (t) {
        return e(t).off(s);
      }), e(document).off("focusin.bs.modal"), e.removeData(this._element, "bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null;
    }, f.handleUpdate = function () {
      this._adjustDialog();
    }, f._getConfig = function (e) {
      return e = i({}, a, e), t.typeCheckConfig(o, e, l), e;
    }, f._triggerBackdropTransition = function () {
      var i = this;

      if ("static" === this._config.backdrop) {
        var n = e.Event("hidePrevented.bs.modal");
        if (e(this._element).trigger(n), n.defaultPrevented) return;
        var o = this._element.scrollHeight > document.documentElement.clientHeight;
        o || (this._element.style.overflowY = "hidden"), this._element.classList.add("modal-static");
        var s = t.getTransitionDurationFromElement(this._dialog);
        e(this._element).off(t.TRANSITION_END), e(this._element).one(t.TRANSITION_END, function () {
          i._element.classList.remove("modal-static"), o || e(i._element).one(t.TRANSITION_END, function () {
            i._element.style.overflowY = "";
          }).emulateTransitionEnd(i._element, s);
        }).emulateTransitionEnd(s), this._element.focus();
      } else this.hide();
    }, f._showElement = function (i) {
      var n = this,
          o = e(this._element).hasClass("fade"),
          s = this._dialog ? this._dialog.querySelector(".modal-body") : null;
      this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), e(this._dialog).hasClass("modal-dialog-scrollable") && s ? s.scrollTop = 0 : this._element.scrollTop = 0, o && t.reflow(this._element), e(this._element).addClass("show"), this._config.focus && this._enforceFocus();

      var r = e.Event("shown.bs.modal", {
        relatedTarget: i
      }),
          a = function a() {
        n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(r);
      };

      if (o) {
        var l = t.getTransitionDurationFromElement(this._dialog);
        e(this._dialog).one(t.TRANSITION_END, a).emulateTransitionEnd(l);
      } else a();
    }, f._enforceFocus = function () {
      var t = this;
      e(document).off("focusin.bs.modal").on("focusin.bs.modal", function (i) {
        document !== i.target && t._element !== i.target && 0 === e(t._element).has(i.target).length && t._element.focus();
      });
    }, f._setEscapeEvent = function () {
      var t = this;
      this._isShown ? e(this._element).on("keydown.dismiss.bs.modal", function (e) {
        t._config.keyboard && 27 === e.which ? (e.preventDefault(), t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition();
      }) : this._isShown || e(this._element).off("keydown.dismiss.bs.modal");
    }, f._setResizeEvent = function () {
      var t = this;
      this._isShown ? e(window).on("resize.bs.modal", function (e) {
        return t.handleUpdate(e);
      }) : e(window).off("resize.bs.modal");
    }, f._hideModal = function () {
      var t = this;
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function () {
        e(document.body).removeClass("modal-open"), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger("hidden.bs.modal");
      });
    }, f._removeBackdrop = function () {
      this._backdrop && (e(this._backdrop).remove(), this._backdrop = null);
    }, f._showBackdrop = function (i) {
      var n = this,
          o = e(this._element).hasClass("fade") ? "fade" : "";

      if (this._isShown && this._config.backdrop) {
        if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", o && this._backdrop.classList.add(o), e(this._backdrop).appendTo(document.body), e(this._element).on("click.dismiss.bs.modal", function (e) {
          n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : e.target === e.currentTarget && n._triggerBackdropTransition();
        }), o && t.reflow(this._backdrop), e(this._backdrop).addClass("show"), !i) return;
        if (!o) return void i();
        var s = t.getTransitionDurationFromElement(this._backdrop);
        e(this._backdrop).one(t.TRANSITION_END, i).emulateTransitionEnd(s);
      } else if (!this._isShown && this._backdrop) {
        e(this._backdrop).removeClass("show");

        var r = function r() {
          n._removeBackdrop(), i && i();
        };

        if (e(this._element).hasClass("fade")) {
          var a = t.getTransitionDurationFromElement(this._backdrop);
          e(this._backdrop).one(t.TRANSITION_END, r).emulateTransitionEnd(a);
        } else r();
      } else i && i();
    }, f._adjustDialog = function () {
      var e = this._element.scrollHeight > document.documentElement.clientHeight;
      !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px");
    }, f._resetAdjustments = function () {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }, f._checkScrollbar = function () {
      var e = document.body.getBoundingClientRect();
      this._isBodyOverflowing = Math.round(e.left + e.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
    }, f._setScrollbar = function () {
      var t = this;

      if (this._isBodyOverflowing) {
        var i = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),
            n = [].slice.call(document.querySelectorAll(".sticky-top"));
        e(i).each(function (i, n) {
          var o = n.style.paddingRight,
              s = e(n).css("padding-right");
          e(n).data("padding-right", o).css("padding-right", parseFloat(s) + t._scrollbarWidth + "px");
        }), e(n).each(function (i, n) {
          var o = n.style.marginRight,
              s = e(n).css("margin-right");
          e(n).data("margin-right", o).css("margin-right", parseFloat(s) - t._scrollbarWidth + "px");
        });
        var o = document.body.style.paddingRight,
            s = e(document.body).css("padding-right");
        e(document.body).data("padding-right", o).css("padding-right", parseFloat(s) + this._scrollbarWidth + "px");
      }

      e(document.body).addClass("modal-open");
    }, f._resetScrollbar = function () {
      var t = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));
      e(t).each(function (t, i) {
        var n = e(i).data("padding-right");
        e(i).removeData("padding-right"), i.style.paddingRight = n || "";
      });
      var i = [].slice.call(document.querySelectorAll(".sticky-top"));
      e(i).each(function (t, i) {
        var n = e(i).data("margin-right");
        void 0 !== n && e(i).css("margin-right", n).removeData("margin-right");
      });
      var n = e(document.body).data("padding-right");
      e(document.body).removeData("padding-right"), document.body.style.paddingRight = n || "";
    }, f._getScrollbarWidth = function () {
      var e = document.createElement("div");
      e.className = "modal-scrollbar-measure", document.body.appendChild(e);
      var t = e.getBoundingClientRect().width - e.clientWidth;
      return document.body.removeChild(e), t;
    }, r._jQueryInterface = function (t, n) {
      return this.each(function () {
        var o = e(this).data("bs.modal"),
            s = i({}, a, e(this).data(), "object" == _typeof(t) && t ? t : {});

        if (o || (o = new r(this, s), e(this).data("bs.modal", o)), "string" == typeof t) {
          if (void 0 === o[t]) throw new TypeError('No method named "' + t + '"');
          o[t](n);
        } else s.show && o.show(n);
      });
    }, h = r, u = [{
      key: "VERSION",
      get: function get() {
        return "4.5.2";
      }
    }, {
      key: "Default",
      get: function get() {
        return a;
      }
    }], (c = null) && n(h.prototype, c), u && n(h, u), r;
  }();

  return e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (n) {
    var o,
        s = this,
        r = t.getSelectorFromElement(this);
    r && (o = document.querySelector(r));
    var a = e(o).data("bs.modal") ? "toggle" : i({}, e(o).data(), e(this).data());
    "A" !== this.tagName && "AREA" !== this.tagName || n.preventDefault();
    var l = e(o).one("show.bs.modal", function (t) {
      t.isDefaultPrevented() || l.one("hidden.bs.modal", function () {
        e(s).is(":visible") && s.focus();
      });
    });

    h._jQueryInterface.call(e(o), a, this);
  }), e.fn.modal = h._jQueryInterface, e.fn.modal.Constructor = h, e.fn.modal.noConflict = function () {
    return e.fn.modal = r, h._jQueryInterface;
  }, h;
});