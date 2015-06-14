var requirejs, require, define;
(function(global) {
    function isFunction(a) {
        return ostring.call(a) === "[object Function]"
    }
    function isArray(a) {
        return ostring.call(a) === "[object Array]"
    }
    function each(a, b) {
        if (a) {
            var c;
            for (c = 0; c < a.length; c += 1)
                if (a[c] && b(a[c], c, a))
                    break
        }
    }
    function eachReverse(a, b) {
        if (a) {
            var c;
            for (c = a.length - 1; c > -1; c -= 1)
                if (a[c] && b(a[c], c, a))
                    break
        }
    }
    function hasProp(a, b) {
        return hasOwn.call(a, b)
    }
    function eachProp(a, b) {
        var c;
        for (c in a)
            if (a.hasOwnProperty(c) && b(a[c], c))
                break
    }
    function mixin(a, b, c, d) {
        return b && eachProp(b, function(b, e) {
            if (c || !hasProp(a, e))
                d && typeof b != "string" ? (a[e] || (a[e] = {}), mixin(a[e], b, c, d)) : a[e] = b
        }), a
    }
    function bind(a, b) {
        return function() {
            return b.apply(a, arguments)
        }
    }
    function scripts() {
        return document.getElementsByTagName("script")
    }
    function getGlobal(a) {
        if (!a)
            return a;
        var b = global;
        return each(a.split("."), function(a) {
            b = b[a]
        }), b
    }
    function makeContextModuleFunc(a, b, c) {
        return function() {
            var d = aps.call(arguments, 0), e;
            return c && isFunction(e = d[d.length - 1]) && (e.__requireJsBuild = !0), d.push(b), a.apply(null, d)
        }
    }
    function addRequireMethods(a, b, c) {
        each([["toUrl"], ["undef"], ["defined", "requireDefined"], ["specified", "requireSpecified"]], function(d) {
            var e = d[1] || d[0];
            a[d[0]] = b ? makeContextModuleFunc(b[e], c) : function() {
                var a = contexts[defContextName];
                return a[e].apply(a, arguments)
            }
        })
    }
    function makeError(a, b, c, d) {
        var e = new Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a);
        return e.requireType = a, e.requireModules = d, c && (e.originalError = c), e
    }
    function newContext(a) {
        function p(a) {
            var b, c;
            for (b = 0; a[b]; b += 1) {
                c = a[b];
                if (c === ".")
                    a.splice(b, 1), b -= 1;
                else if (c === "..") {
                    if (b === 1 && (a[2] === ".." || a[0] === ".."))
                        break;
                    b > 0 && (a.splice(b - 1, 2), b -= 2)
                }
            }
        }
        function q(a, b, c) {
            var d, e, f, h, i, j, k, l, m, n, o, q = b && b.split("/"), r = q, s = g.map, t = s && s["*"];
            a && a.charAt(0) === "." && (b ? (g.pkgs[b] ? r = q = [b] : r = q.slice(0, q.length - 1), a = r.concat(a.split("/")), p(a), e = g.pkgs[d = a[0]], a = a.join("/"), e && a === d + "/" + e.main && (a = d)) : a.indexOf("./") === 0 && (a = a.substring(2)));
            if (c && (q || t) && s) {
                h = a.split("/");
                for (i = h.length; i > 0; i -= 1) {
                    k = h.slice(0, i).join("/");
                    if (q)
                        for (j = q.length; j > 0; j -= 1) {
                            f = s[q.slice(0, j).join("/")];
                            if (f) {
                                f = f[k];
                                if (f) {
                                    l = f, m = i;
                                    break
                                }
                            }
                        }
                    if (l)
                        break;
                    !n && t && t[k] && (n = t[k], o = i)
                }
                !l && n && (l = n, m = o), l && (h.splice(0, m, l), a = h.join("/"))
            }
            return a
        }
        function r(a) {
            isBrowser && each(scripts(), function(b) {
                if (b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === d.contextName)
                    return b.parentNode.removeChild(b), !0
            })
        }
        function s(a) {
            var b = g.paths[a];
            if (b && isArray(b) && b.length > 1)
                return r(a), b.shift(), d.undef(a), d.require([a]), !0
        }
        function t(a, b, c, e) {
            var f, g, h, i = a ? a.indexOf("!") : -1, j = null, l = b ? b.name : null, o = a, p = !0, r = "";
            return a || (p = !1, a = "_@r" + (m += 1)), i !== -1 && (j = a.substring(0, i), a = a.substring(i + 1, a.length)), j && (j = q(j, l, e), g = k[j]), a && (j ? g && g.normalize ? r = g.normalize(a, function(a) {
                return q(a, l, e)
            }) : r = q(a, l, e) : (r = q(a, l, e), f = d.nameToUrl(r))), h = j && !g && !c ? "_unnormalized" + (n += 1) : "", {prefix: j,name: r,parentMap: b,unnormalized: !!h,url: f,originalName: o,isDefine: p,id: (j ? j + "!" + r : r) + h}
        }
        function u(a) {
            var b = a.id, c = h[b];
            return c || (c = h[b] = new d.Module(a)), c
        }
        function v(a, b, c) {
            var d = a.id, e = h[d];
            hasProp(k, d) && (!e || e.defineEmitComplete) ? b === "defined" && c(k[d]) : u(a).on(b, c)
        }
        function w(a, b) {
            var c = a.requireModules, d = !1;
            b ? b(a) : (each(c, function(b) {
                var c = h[b];
                c && (c.error = a, c.events.error && (d = !0, c.emit("error", a)))
            }), d || req.onError(a))
        }
        function x() {
            globalDefQueue.length && (apsp.apply(j, [j.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
        }
        function y(a, b, c) {
            var e = a && a.map, f = makeContextModuleFunc(c || d.require, e, b);
            return addRequireMethods(f, d, e), f.isBrowser = isBrowser, f
        }
        function z(a) {
            delete h[a], each(o, function(b, c) {
                if (b.map.id === a)
                    return o.splice(c, 1), b.defined || (d.waitCount -= 1), !0
            })
        }
        function A(a, b) {
            var c = a.map.id, d = a.depMaps, e;
            if (!a.inited)
                return;
            return b[c] ? a : (b[c] = !0, each(d, function(a) {
                var d = a.id, f = h[d];
                if (!f)
                    return;
                return !f.inited || !f.enabled ? (e = null, delete b[c], !0) : e = A(f, mixin({}, b))
            }), e)
        }
        function B(a, b, c) {
            var d = a.map.id, f = a.depMaps;
            if (!a.inited || !a.map.isDefine)
                return;
            return b[d] ? k[d] : (b[d] = a, each(f, function(f) {
                var g = f.id, i = h[g], j;
                if (e[g])
                    return;
                if (i) {
                    if (!i.inited || !i.enabled) {
                        c[d] = !0;
                        return
                    }
                    j = B(i, b, c), c[g] || a.defineDepById(g, j)
                }
            }), a.check(!0), k[d])
        }
        function C(a) {
            a.check()
        }
        function D() {
            var a, c, e, i, j = g.waitSeconds * 1e3, k = j && d.startTime + j < (new Date).getTime(), l = [], m = !1, n = !0;
            if (b)
                return;
            b = !0, eachProp(h, function(b) {
                a = b.map, c = a.id;
                if (!b.enabled)
                    return;
                if (!b.error)
                    if (!b.inited && k)
                        s(c) ? (i = !0, m = !0) : (l.push(c), r(c));
                    else if (!b.inited && b.fetched && a.isDefine) {
                        m = !0;
                        if (!a.prefix)
                            return n = !1
                    }
            });
            if (k && l.length)
                return e = makeError("timeout", "Load timeout for modules: " + l, null, l), e.contextName = d.contextName, w(e);
            n && (each(o, function(a) {
                if (a.defined)
                    return;
                var b = A(a, {}), c = {};
                b && (B(b, c, {}), eachProp(c, C))
            }), eachProp(h, C)), (!k || i) && m && (isBrowser || isWebWorker) && !f && (f = setTimeout(function() {
                f = 0, D()
            }, 50)), b = !1
        }
        function E(a) {
            u(t(a[0], null, !0)).init(a[1], a[2])
        }
        function F(a, b, c, d) {
            a.detachEvent && !isOpera ? d && a.detachEvent(d, b) : a.removeEventListener(c, b, !1)
        }
        function G(a) {
            var b = a.currentTarget || a.srcElement;
            return F(b, d.onScriptLoad, "load", "onreadystatechange"), F(b, d.onScriptError, "error"), {node: b,id: b && b.getAttribute("data-requiremodule")}
        }
        var b, c, d, e, f, g = {waitSeconds: 7,baseUrl: "./",paths: {},pkgs: {},shim: {}}, h = {}, i = {}, j = [], k = {}, l = {}, m = 1, n = 1, o = [];
        return e = {require: function(a) {
                return y(a)
            },exports: function(a) {
                a.usingExports = !0;
                if (a.map.isDefine)
                    return a.exports = k[a.map.id] = {}
            },module: function(a) {
                return a.module = {id: a.map.id,uri: a.map.url,config: function() {
                        return g.config && g.config[a.map.id] || {}
                    },exports: k[a.map.id]}
            }}, c = function(a) {
            this.events = i[a.id] || {}, this.map = a, this.shim = g.shim[a.id], this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, c.prototype = {init: function(a, b, c, d) {
                d = d || {};
                if (this.inited)
                    return;
                this.factory = b, c ? this.on("error", c) : this.events.error && (c = bind(this, function(a) {
                    this.emit("error", a)
                })), this.depMaps = a && a.slice(0), this.depMaps.rjsSkipMap = a.rjsSkipMap, this.errback = c, this.inited = !0, this.ignore = d.ignore, d.enabled || this.enabled ? this.enable() : this.check()
            },defineDepById: function(a, b) {
                var c;
                return each(this.depMaps, function(b, d) {
                    if (b.id === a)
                        return c = d, !0
                }), this.defineDep(c, b)
            },defineDep: function(a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
            },fetch: function() {
                if (this.fetched)
                    return;
                this.fetched = !0, d.startTime = (new Date).getTime();
                var a = this.map;
                if (!this.shim)
                    return a.prefix ? this.callPlugin() : this.load();
                y(this, !0)(this.shim.deps || [], bind(this, function() {
                    return a.prefix ? this.callPlugin() : this.load()
                }))
            },load: function() {
                var a = this.map.url;
                l[a] || (l[a] = !0, d.load(this.map.id, a))
            },check: function(a) {
                if (!this.enabled || this.enabling)
                    return;
                var b, c, e = this.map.id, f = this.depExports, g = this.exports, i = this.factory;
                if (!this.inited)
                    this.fetch();
                else if (this.error)
                    this.emit("error", this.error);
                else if (!this.defining) {
                    this.defining = !0;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(i)) {
                            if (this.events.error)
                                try {
                                    g = d.execCb(e, i, f, g)
                                } catch (j) {
                                    b = j
                                }
                            else
                                g = d.execCb(e, i, f, g);
                            this.map.isDefine && (c = this.module, c && c.exports !== undefined && c.exports !== this.exports ? g = c.exports : g === undefined && this.usingExports && (g = this.exports));
                            if (b)
                                return b.requireMap = this.map, b.requireModules = [this.map.id], b.requireType = "define", w(this.error = b)
                        } else
                            g = i;
                        this.exports = g, this.map.isDefine && !this.ignore && (k[e] = g, req.onResourceLoad && req.onResourceLoad(d, this.map, this.depMaps)), delete h[e], this.defined = !0, d.waitCount -= 1, d.waitCount === 0 && (o = [])
                    }
                    this.defining = !1, a || this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                }
            },callPlugin: function() {
                var a = this.map, b = a.id, c = t(a.prefix, null, !1, !0);
                v(c, "defined", bind(this, function(c) {
                    var e, f, i, j = this.map.name, k = this.map.parentMap ? this.map.parentMap.name : null;
                    if (this.map.unnormalized) {
                        c.normalize && (j = c.normalize(j, function(a) {
                            return q(a, k, !0)
                        }) || ""), f = t(a.prefix + "!" + j, this.map.parentMap, !1, !0), v(f, "defined", bind(this, function(a) {
                            this.init([], function() {
                                return a
                            }, null, {enabled: !0,ignore: !0})
                        })), i = h[f.id], i && (this.events.error && i.on("error", bind(this, function(a) {
                            this.emit("error", a)
                        })), i.enable());
                        return
                    }
                    e = bind(this, function(a) {
                        this.init([], function() {
                            return a
                        }, null, {enabled: !0})
                    }), e.error = bind(this, function(a) {
                        this.inited = !0, this.error = a, a.requireModules = [b], eachProp(h, function(a) {
                            a.map.id.indexOf(b + "_unnormalized") === 0 && z(a.map.id)
                        }), w(a)
                    }), e.fromText = function(a, b) {
                        var c = useInteractive;
                        c && (useInteractive = !1), u(t(a)), req.exec(b), c && (useInteractive = !0), d.completeLoad(a)
                    }, c.load(a.name, y(a.parentMap, !0, function(a, b, c) {
                        return a.rjsSkipMap = !0, d.require(a, b, c)
                    }), e, g)
                })), d.enable(c, this), this.pluginMaps[c.id] = c
            },enable: function() {
                this.enabled = !0, this.waitPushed || (o.push(this), d.waitCount += 1, this.waitPushed = !0), this.enabling = !0, each(this.depMaps, bind(this, function(a, b) {
                    var c, f, g;
                    if (typeof a == "string") {
                        a = t(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.depMaps.rjsSkipMap), this.depMaps[b] = a, g = e[a.id];
                        if (g) {
                            this.depExports[b] = g(this);
                            return
                        }
                        this.depCount += 1, v(a, "defined", bind(this, function(a) {
                            this.defineDep(b, a), this.check()
                        })), this.errback && v(a, "error", this.errback)
                    }
                    c = a.id, f = h[c], !e[c] && f && !f.enabled && d.enable(a, this)
                })), eachProp(this.pluginMaps, bind(this, function(a) {
                    var b = h[a.id];
                    b && !b.enabled && d.enable(a, this)
                })), this.enabling = !1, this.check()
            },on: function(a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []), c.push(b)
            },emit: function(a, b) {
                each(this.events[a], function(a) {
                    a(b)
                }), a === "error" && delete this.events[a]
            }}, d = {config: g,contextName: a,registry: h,defined: k,urlFetched: l,waitCount: 0,defQueue: j,Module: c,makeModuleMap: t,configure: function(a) {
                a.baseUrl && a.baseUrl.charAt(a.baseUrl.length - 1) !== "/" && (a.baseUrl += "/");
                var b = g.pkgs, c = g.shim, e = g.paths, f = g.map;
                mixin(g, a, !0), g.paths = mixin(e, a.paths, !0), a.map && (g.map = mixin(f || {}, a.map, !0, !0)), a.shim && (eachProp(a.shim, function(a, b) {
                    isArray(a) && (a = {deps: a}), a.exports && !a.exports.__buildReady && (a.exports = d.makeShimExports(a.exports)), c[b] = a
                }), g.shim = c), a.packages && (each(a.packages, function(a) {
                    var c;
                    a = typeof a == "string" ? {name: a} : a, c = a.location, b[a.name] = {name: a.name,location: c || a.name,main: (a.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")}
                }), g.pkgs = b), eachProp(h, function(a, b) {
                    !a.inited && !a.map.unnormalized && (a.map = t(b))
                }), (a.deps || a.callback) && d.require(a.deps || [], a.callback)
            },makeShimExports: function(a) {
                var b;
                return typeof a == "string" ? (b = function() {
                    return getGlobal(a)
                }, b.exports = a, b) : function() {
                    return a.apply(global, arguments)
                }
            },requireDefined: function(a, b) {
                return hasProp(k, t(a, b, !1, !0).id)
            },requireSpecified: function(a, b) {
                return a = t(a, b, !1, !0).id, hasProp(k, a) || hasProp(h, a)
            },require: function(b, c, e, f) {
                var g, h, i, l, m;
                if (typeof b == "string")
                    return isFunction(c) ? w(makeError("requireargs", "Invalid require call"), e) : req.get ? req.get(d, b, c) : (g = b, f = c, i = t(g, f, !1, !0), h = i.id, hasProp(k, h) ? k[h] : w(makeError("notloaded", 'Module name "' + h + '" has not been loaded yet for context: ' + a)));
                e && !isFunction(e) && (f = e, e = undefined), c && !isFunction(c) && (f = c, c = undefined), x();
                while (j.length) {
                    m = j.shift();
                    if (m[0] === null)
                        return w(makeError("mismatch", "Mismatched anonymous define() module: " + m[m.length - 1]));
                    E(m)
                }
                return l = u(t(null, f)), l.init(b, c, e, {enabled: !0}), D(), d.require
            },undef: function(a) {
                x();
                var b = t(a, null, !0), c = h[a];
                delete k[a], delete l[b.url], delete i[a], c && (c.events.defined && (i[a] = c.events), z(a))
            },enable: function(a, b) {
                var c = h[a.id];
                c && u(a).enable()
            },completeLoad: function(a) {
                var b, c, d, e = g.shim[a] || {}, f = e.exports && e.exports.exports;
                x();
                while (j.length) {
                    c = j.shift();
                    if (c[0] === null) {
                        c[0] = a;
                        if (b)
                            break;
                        b = !0
                    } else
                        c[0] === a && (b = !0);
                    E(c)
                }
                d = h[a];
                if (!b && !k[a] && d && !d.inited) {
                    if (g.enforceDefine && (!f || !getGlobal(f))) {
                        if (s(a))
                            return;
                        return w(makeError("nodefine", "No define call for " + a, null, [a]))
                    }
                    E([a, e.deps || [], e.exports])
                }
                D()
            },toUrl: function(a, b) {
                var c = a.lastIndexOf("."), e = null;
                return c !== -1 && (e = a.substring(c, a.length), a = a.substring(0, c)), d.nameToUrl(q(a, b && b.id, !0), e)
            },nameToUrl: function(a, b) {
                var c, d, e, f, h, i, j, k, l;
                if (req.jsExtRegExp.test(a))
                    k = a + (b || "");
                else {
                    c = g.paths, d = g.pkgs, h = a.split("/");
                    for (i = h.length; i > 0; i -= 1) {
                        j = h.slice(0, i).join("/"), e = d[j], l = c[j];
                        if (l) {
                            isArray(l) && (l = l[0]), h.splice(0, i, l);
                            break
                        }
                        if (e) {
                            a === e.name ? f = e.location + "/" + e.main : f = e.location, h.splice(0, i, f);
                            break
                        }
                    }
                    k = h.join("/"), k += b || (/\?/.test(k) ? "" : ".js"), k = (k.charAt(0) === "/" || k.match(/^[\w\+\.\-]+:/) ? "" : g.baseUrl) + k
                }
                return g.urlArgs ? k + ((k.indexOf("?") === -1 ? "?" : "&") + g.urlArgs) : k
            },load: function(a, b) {
                req.load(d, a, b)
            },execCb: function(a, b, c, d) {
                return b.apply(d, c)
            },onScriptLoad: function(a) {
                if (a.type === "load" || readyRegExp.test((a.currentTarget || a.srcElement).readyState)) {
                    interactiveScript = null;
                    var b = G(a);
                    d.completeLoad(b.id)
                }
            },onScriptError: function(a) {
                var b = G(a);
                if (!s(b.id))
                    return w(makeError("scripterror", "Script error", a, [b.id]))
            }}
    }
    function getInteractiveScript() {
        return interactiveScript && interactiveScript.readyState === "interactive" ? interactiveScript : (eachReverse(scripts(), function(a) {
            if (a.readyState === "interactive")
                return interactiveScript = a
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.0.5", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, aps = ap.slice, apsp = ap.splice, isBrowser = typeof window != "undefined" && !!navigator && !!document, isWebWorker = !isBrowser && typeof importScripts != "undefined", readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]", contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    if (typeof define != "undefined")
        return;
    if (typeof requirejs != "undefined") {
        if (isFunction(requirejs))
            return;
        cfg = requirejs, requirejs = undefined
    }
    typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function(a, b, c, d) {
        var e, f, g = defContextName;
        return !isArray(a) && typeof a != "string" && (f = a, isArray(b) ? (a = b, b = c, c = d) : a = []), f && f.context && (g = f.context), e = contexts[g], e || (e = contexts[g] = req.s.newContext(g)), f && e.configure(f), e.require(a, b, c)
    }, req.config = function(a) {
        return req(a)
    }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {contexts: contexts,newContext: newContext}, req({}), addRequireMethods(req), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = function(a) {
        throw a
    }, req.load = function(a, b, c) {
        var d = a && a.config || {}, e;
        if (isBrowser)
            return e = d.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), e.type = d.scriptType || "text/javascript", e.charset = "utf-8", e.async = !0, e.setAttribute("data-requirecontext", a.contextName), e.setAttribute("data-requiremodule", b), e.attachEvent && !(e.attachEvent.toString && e.attachEvent.toString().indexOf("[native code") < 0) && !isOpera ? (useInteractive = !0, e.attachEvent("onreadystatechange", a.onScriptLoad)) : (e.addEventListener("load", a.onScriptLoad, !1), e.addEventListener("error", a.onScriptError, !1)), e.src = c, currentlyAddingScript = e, baseElement ? head.insertBefore(e, baseElement) : head.appendChild(e), currentlyAddingScript = null, e;
        isWebWorker && (importScripts(c), a.completeLoad(b))
    }, isBrowser && eachReverse(scripts(), function(a) {
        head || (head = a.parentNode), dataMain = a.getAttribute("data-main");
        if (dataMain)
            return cfg.baseUrl || (src = dataMain.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath, dataMain = mainScript), dataMain = dataMain.replace(jsSuffixRegExp, ""), cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [dataMain], !0
    }), define = function(a, b, c) {
        var d, e;
        typeof a != "string" && (c = b, b = a, a = null), isArray(b) || (c = b, b = []), !b.length && isFunction(c) && c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(a, c) {
            b.push(c)
        }), b = (c.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(b)), useInteractive && (d = currentlyAddingScript || getInteractiveScript(), d && (a || (a = d.getAttribute("data-requiremodule")), e = contexts[d.getAttribute("data-requirecontext")])), (e ? e.defQueue : globalDefQueue).push([a, b, c])
    }, define.amd = {jQuery: !0}, req.exec = function(text) {
        return eval(text)
    }, req(cfg)
})(this), function() {
    (function(a, b) {
        function c(a) {
            var b = ob[a] = {};
            return $.each(a.split(bb), function(a, c) {
                b[c] = !0
            }), b
        }
        function d(a, c, d) {
            if (d === b && a.nodeType === 1) {
                var e = "data-" + c.replace(qb, "-$1").toLowerCase();
                d = a.getAttribute(e);
                if (typeof d == "string") {
                    try {
                        d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : pb.test(d) ? $.parseJSON(d) : d
                    } catch (f) {
                    }
                    $.data(a, c, d)
                } else
                    d = b
            }
            return d
        }
        function e(a) {
            var b;
            for (b in a) {
                if (b === "data" && $.isEmptyObject(a[b]))
                    continue;
                if (b !== "toJSON")
                    return !1
            }
            return !0
        }
        function f() {
            return !1
        }
        function g() {
            return !0
        }
        function h(a) {
            return !a || !a.parentNode || a.parentNode.nodeType === 11
        }
        function i(a, b) {
            do
                a = a[b];
            while (a && a.nodeType !== 1);
            return a
        }
        function j(a, b, c) {
            b = b || 0;
            if ($.isFunction(b))
                return $.grep(a, function(a, d) {
                    var e = !!b.call(a, d, a);
                    return e === c
                });
            if (b.nodeType)
                return $.grep(a, function(a, d) {
                    return a === b === c
                });
            if (typeof b == "string") {
                var d = $.grep(a, function(a) {
                    return a.nodeType === 1
                });
                if (Kb.test(b))
                    return $.filter(b, d, !c);
                b = $.filter(b, d)
            }
            return $.grep(a, function(a, d) {
                return $.inArray(a, b) >= 0 === c
            })
        }
        function k(a) {
            var b = Nb.split("|"), c = a.createDocumentFragment();
            if (c.createElement)
                while (b.length)
                    c.createElement(b.pop());
            return c
        }
        function l(a, b) {
            return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
        }
        function m(a, b) {
            if (b.nodeType !== 1 || !$.hasData(a))
                return;
            var c, d, e, f = $._data(a), g = $._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; d < e; d++)
                        $.event.add(b, c, h[c][d])
            }
            g.data && (g.data = $.extend({}, g.data))
        }
        function n(a, b) {
            var c;
            if (b.nodeType !== 1)
                return;
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && Xb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text), b.removeAttribute($.expando)
        }
        function o(a) {
            return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
        }
        function p(a) {
            Xb.test(a.type) && (a.defaultChecked = a.checked)
        }
        function q(a, b) {
            if (b in a)
                return b;
            var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = qc.length;
            while (e--) {
                b = qc[e] + c;
                if (b in a)
                    return b
            }
            return d
        }
        function r(a, b) {
            return a = b || a, $.css(a, "display") === "none" || !$.contains(a.ownerDocument, a)
        }
        function s(a, b) {
            var c, d, e = [], f = 0, g = a.length;
            for (; f < g; f++) {
                c = a[f];
                if (!c.style)
                    continue;
                e[f] = $._data(c, "olddisplay"), b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), c.style.display === "" && r(c) && (e[f] = $._data(c, "olddisplay", w(c.nodeName)))) : (d = cc(c, "display"), !e[f] && d !== "none" && $._data(c, "olddisplay", d))
            }
            for (f = 0; f < g; f++) {
                c = a[f];
                if (!c.style)
                    continue;
                if (!b || c.style.display === "none" || c.style.display === "")
                    c.style.display = b ? e[f] || "" : "none"
            }
            return a
        }
        function t(a, b, c) {
            var d = jc.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }
        function u(a, b, c, d) {
            var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0, f = 0;
            for (; e < 4; e += 2)
                c === "margin" && (f += $.css(a, c + pc[e], !0)), d ? (c === "content" && (f -= parseFloat(cc(a, "padding" + pc[e])) || 0), c !== "margin" && (f -= parseFloat(cc(a, "border" + pc[e] + "Width")) || 0)) : (f += parseFloat(cc(a, "padding" + pc[e])) || 0, c !== "padding" && (f += parseFloat(cc(a, "border" + pc[e] + "Width")) || 0));
            return f
        }
        function v(a, b, c) {
            var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = !0, f = $.support.boxSizing && $.css(a, "boxSizing") === "border-box";
            if (d <= 0) {
                d = cc(a, b);
                if (d < 0 || d == null)
                    d = a.style[b];
                if (kc.test(d))
                    return d;
                e = f && ($.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0
            }
            return d + u(a, b, c || (f ? "border" : "content"), e) + "px"
        }
        function w(a) {
            if (mc[a])
                return mc[a];
            var b = $("<" + a + ">").appendTo(P.body), c = b.css("display");
            b.remove();
            if (c === "none" || c === "") {
                dc = P.body.appendChild(dc || $.extend(P.createElement("iframe"), {frameBorder: 0,width: 0,height: 0}));
                if (!ec || !dc.createElement)
                    ec = (dc.contentWindow || dc.contentDocument).document, ec.write("<!doctype html><html><body>"), ec.close();
                b = ec.body.appendChild(ec.createElement(a)), c = cc(b, "display"), P.body.removeChild(dc)
            }
            return mc[a] = c, c
        }
        function x(a, b, c, d) {
            var e;
            if ($.isArray(b))
                $.each(b, function(b, e) {
                    c || tc.test(a) ? d(a, e) : x(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d)
                });
            else if (!c && $.type(b) === "object")
                for (e in b)
                    x(a + "[" + e + "]", b[e], c, d);
            else
                d(a, b)
        }
        function y(a) {
            return function(b, c) {
                typeof b != "string" && (c = b, b = "*");
                var d, e, f, g = b.toLowerCase().split(bb), h = 0, i = g.length;
                if ($.isFunction(c))
                    for (; h < i; h++)
                        d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c)
            }
        }
        function z(a, c, d, e, f, g) {
            f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
            var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === Jc;
            for (; j < k && (l || !h); j++)
                h = i[j](c, d, e), typeof h == "string" && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = z(a, c, d, e, h, g)));
            return (l || !h) && !g["*"] && (h = z(a, c, d, e, "*", g)), h
        }
        function A(a, c) {
            var d, e, f = $.ajaxSettings.flatOptions || {};
            for (d in c)
                c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
            e && $.extend(!0, a, e)
        }
        function B(a, c, d) {
            var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
            for (f in k)
                f in d && (c[k[f]] = d[f]);
            while (j[0] === "*")
                j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
            if (e)
                for (f in i)
                    if (i[f] && i[f].test(e)) {
                        j.unshift(f);
                        break
                    }
            if (j[0] in d)
                g = j[0];
            else {
                for (f in d) {
                    if (!j[0] || a.converters[f + " " + j[0]]) {
                        g = f;
                        break
                    }
                    h || (h = f)
                }
                g = g || h
            }
            if (g)
                return g !== j[0] && j.unshift(g), d[g]
        }
        function C(a, b) {
            var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
            a.dataFilter && (b = a.dataFilter(b, a.dataType));
            if (g[1])
                for (c in a.converters)
                    i[c.toLowerCase()] = a.converters[c];
            for (; e = g[++j]; )
                if (e !== "*") {
                    if (h !== "*" && h !== e) {
                        c = i[h + " " + e] || i["* " + e];
                        if (!c)
                            for (d in i) {
                                f = d.split(" ");
                                if (f[1] === e) {
                                    c = i[h + " " + f[0]] || i["* " + f[0]];
                                    if (c) {
                                        c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                                        break
                                    }
                                }
                            }
                        if (c !== !0)
                            if (c && a["throws"])
                                b = c(b);
                            else
                                try {
                                    b = c(b)
                                } catch (k) {
                                    return {state: "parsererror",error: c ? k : "No conversion from " + h + " to " + e}
                                }
                    }
                    h = e
                }
            return {state: "success",data: b}
        }
        function D() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {
            }
        }
        function E() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {
            }
        }
        function F() {
            return setTimeout(function() {
                Uc = b
            }, 0), Uc = $.now()
        }
        function G(a, b) {
            $.each(b, function(b, c) {
                var d = ($c[b] || []).concat($c["*"]), e = 0, f = d.length;
                for (; e < f; e++)
                    if (d[e].call(a, b, c))
                        return
            })
        }
        function H(a, b, c) {
            var d, e = 0, f = 0, g = Zc.length, h = $.Deferred().always(function() {
                delete i.elem
            }), i = function() {
                var b = Uc || F(), c = Math.max(0, j.startTime + j.duration - b), d = 1 - (c / j.duration || 0), e = 0, f = j.tweens.length;
                for (; e < f; e++)
                    j.tweens[e].run(d);
                return h.notifyWith(a, [j, d, c]), d < 1 && f ? c : (h.resolveWith(a, [j]), !1)
            }, j = h.promise({elem: a,props: $.extend({}, b),opts: $.extend(!0, {specialEasing: {}}, c),originalProperties: b,originalOptions: c,startTime: Uc || F(),duration: c.duration,tweens: [],createTween: function(b, c, d) {
                    var e = $.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(e), e
                },stop: function(b) {
                    var c = 0, d = b ? j.tweens.length : 0;
                    for (; c < d; c++)
                        j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }}), k = j.props;
            I(k, j.opts.specialEasing);
            for (; e < g; e++) {
                d = Zc[e].call(j, a, k, j.opts);
                if (d)
                    return d
            }
            return G(j, k), $.isFunction(j.opts.start) && j.opts.start.call(a, j), $.fx.timer($.extend(i, {anim: j,queue: j.opts.queue,elem: a})), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }
        function I(a, b) {
            var c, d, e, f, g;
            for (c in a) {
                d = $.camelCase(c), e = b[d], f = a[c], $.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = $.cssHooks[d];
                if (g && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f)
                        c in a || (a[c] = f[c], b[c] = e)
                } else
                    b[d] = e
            }
        }
        function J(a, b, c) {
            var d, e, f, g, h, i, j, k, l = this, m = a.style, n = {}, o = [], p = a.nodeType && r(a);
            c.queue || (j = $._queueHooks(a, "fx"), j.unqueued == null && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function() {
                j.unqueued || k()
            }), j.unqueued++, l.always(function() {
                l.always(function() {
                    j.unqueued--, $.queue(a, "fx").length || j.empty.fire()
                })
            })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], $.css(a, "display") === "inline" && $.css(a, "float") === "none" && (!$.support.inlineBlockNeedsLayout || w(a.nodeName) === "inline" ? m.display = "inline-block" : m.zoom = 1)), c.overflow && (m.overflow = "hidden", $.support.shrinkWrapBlocks || l.done(function() {
                m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2]
            }));
            for (d in b) {
                f = b[d];
                if (Wc.exec(f)) {
                    delete b[d];
                    if (f === (p ? "hide" : "show"))
                        continue;
                    o.push(d)
                }
            }
            g = o.length;
            if (g) {
                h = $._data(a, "fxshow") || $._data(a, "fxshow", {}), p ? $(a).show() : l.done(function() {
                    $(a).hide()
                }), l.done(function() {
                    var b;
                    $.removeData(a, "fxshow", !0);
                    for (b in n)
                        $.style(a, b, n[b])
                });
                for (d = 0; d < g; d++)
                    e = o[d], i = l.createTween(e, p ? h[e] : 0), n[e] = h[e] || $.style(a, e), e in h || (h[e] = i.start, p && (i.end = i.start, i.start = e === "width" || e === "height" ? 1 : 0))
            }
        }
        function K(a, b, c, d, e) {
            return new K.prototype.init(a, b, c, d, e)
        }
        function L(a, b) {
            var c, d = {height: a}, e = 0;
            for (; e < 4; e += 2 - b)
                c = pc[e], d["margin" + c] = d["padding" + c] = a;
            return b && (d.opacity = d.width = a), d
        }
        function M(a) {
            return $.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
        }
        var N, O, P = a.document, Q = a.location, R = a.navigator, S = a.jQuery, T = a.$, U = Array.prototype.push, V = Array.prototype.slice, W = Array.prototype.indexOf, X = Object.prototype.toString, Y = Object.prototype.hasOwnProperty, Z = String.prototype.trim, $ = function(a, b) {
            return new $.fn.init(a, b, N)
        }, _ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, ab = /\S/, bb = /\s+/, cb = ab.test(" ") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, db = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, eb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, fb = /^[\],:{}\s]*$/, gb = /(?:^|:|,)(?:\s*\[)+/g, hb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, ib = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, jb = /^-ms-/, kb = /-([\da-z])/gi, lb = function(a, b) {
            return (b + "").toUpperCase()
        }, mb = function() {
            P.addEventListener ? (P.removeEventListener("DOMContentLoaded", mb, !1), $.ready()) : P.readyState === "complete" && (P.detachEvent("onreadystatechange", mb), $.ready())
        }, nb = {};
        $.fn = $.prototype = {constructor: $,init: function(a, c, d) {
                var e, f, g, h;
                if (!a)
                    return this;
                if (a.nodeType)
                    return this.context = this[0] = a, this.length = 1, this;
                if (typeof a == "string") {
                    a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? e = [null, a, null] : e = db.exec(a);
                    if (e && (e[1] || !c)) {
                        if (e[1])
                            return c = c instanceof $ ? c[0] : c, h = c && c.nodeType ? c.ownerDocument || c : P, a = $.parseHTML(e[1], h, !0), eb.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0), $.merge(this, a);
                        f = P.getElementById(e[2]);
                        if (f && f.parentNode) {
                            if (f.id !== e[2])
                                return d.find(a);
                            this.length = 1, this[0] = f
                        }
                        return this.context = P, this.selector = a, this
                    }
                    return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
                }
                return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), $.makeArray(a, this))
            },selector: "",jquery: "1.8.0",length: 0,size: function() {
                return this.length
            },toArray: function() {
                return V.call(this)
            },get: function(a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            },pushStack: function(a, b, c) {
                var d = $.merge(this.constructor(), a);
                return d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
            },each: function(a, b) {
                return $.each(this, a, b)
            },ready: function(a) {
                return $.ready.promise().done(a), this
            },eq: function(a) {
                return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1)
            },first: function() {
                return this.eq(0)
            },last: function() {
                return this.eq(-1)
            },slice: function() {
                return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
            },map: function(a) {
                return this.pushStack($.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },end: function() {
                return this.prevObject || this.constructor(null)
            },push: U,sort: [].sort,splice: [].splice}, $.fn.init.prototype = $.fn, $.extend = $.fn.extend = function() {
            var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
            typeof h == "boolean" && (k = h, h = arguments[1] || {}, i = 2), typeof h != "object" && !$.isFunction(h) && (h = {}), j === i && (h = this, --i);
            for (; i < j; i++)
                if ((a = arguments[i]) != null)
                    for (c in a) {
                        d = h[c], e = a[c];
                        if (h === e)
                            continue;
                        k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1, g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {}, h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e)
                    }
            return h
        }, $.extend({noConflict: function(b) {
                return a.$ === $ && (a.$ = T), b && a.jQuery === $ && (a.jQuery = S), $
            },isReady: !1,readyWait: 1,holdReady: function(a) {
                a ? $.readyWait++ : $.ready(!0)
            },ready: function(a) {
                if (a === !0 ? --$.readyWait : $.isReady)
                    return;
                if (!P.body)
                    return setTimeout($.ready, 1);
                $.isReady = !0;
                if (a !== !0 && --$.readyWait > 0)
                    return;
                O.resolveWith(P, [$]), $.fn.trigger && $(P).trigger("ready").off("ready")
            },isFunction: function(a) {
                return $.type(a) === "function"
            },isArray: Array.isArray || function(a) {
                return $.type(a) === "array"
            },isWindow: function(a) {
                return a != null && a == a.window
            },isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            },type: function(a) {
                return a == null ? String(a) : nb[X.call(a)] || "object"
            },isPlainObject: function(a) {
                if (!a || $.type(a) !== "object" || a.nodeType || $.isWindow(a))
                    return !1;
                try {
                    if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a)
                    ;
                return d === b || Y.call(a, d)
            },isEmptyObject: function(a) {
                var b;
                for (b in a)
                    return !1;
                return !0
            },error: function(a) {
                throw new Error(a)
            },parseHTML: function(a, b, c) {
                var d;
                return !a || typeof a != "string" ? null : (typeof b == "boolean" && (c = b, b = 0), b = b || P, (d = eb.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []), $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes)))
            },parseJSON: function(b) {
                if (!b || typeof b != "string")
                    return null;
                b = $.trim(b);
                if (a.JSON && a.JSON.parse)
                    return a.JSON.parse(b);
                if (fb.test(b.replace(hb, "@").replace(ib, "]").replace(gb, "")))
                    return (new Function("return " + b))();
                $.error("Invalid JSON: " + b)
            },parseXML: function(c) {
                var d, e;
                if (!c || typeof c != "string")
                    return null;
                try {
                    a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (f) {
                    d = b
                }
                return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && $.error("Invalid XML: " + c), d
            },noop: function() {
            },globalEval: function(b) {
                b && ab.test(b) && (a.execScript || function(b) {
                    a.eval.call(a, b)
                })(b)
            },camelCase: function(a) {
                return a.replace(jb, "ms-").replace(kb, lb)
            },nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            },each: function(a, c, d) {
                var e, f = 0, g = a.length, h = g === b || $.isFunction(a);
                if (d) {
                    if (h) {
                        for (e in a)
                            if (c.apply(a[e], d) === !1)
                                break
                    } else
                        for (; f < g; )
                            if (c.apply(a[f++], d) === !1)
                                break
                } else if (h) {
                    for (e in a)
                        if (c.call(a[e], e, a[e]) === !1)
                            break
                } else
                    for (; f < g; )
                        if (c.call(a[f], f, a[f++]) === !1)
                            break;
                return a
            },trim: Z ? function(a) {
                return a == null ? "" : Z.call(a)
            } : function(a) {
                return a == null ? "" : a.toString().replace(cb, "")
            },makeArray: function(a, b) {
                var c, d = b || [];
                return a != null && (c = $.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)), d
            },inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (W)
                        return W.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++)
                        if (c in b && b[c] === a)
                            return c
                }
                return -1
            },merge: function(a, c) {
                var d = c.length, e = a.length, f = 0;
                if (typeof d == "number")
                    for (; f < d; f++)
                        a[e++] = c[f];
                else
                    while (c[f] !== b)
                        a[e++] = c[f++];
                return a.length = e, a
            },grep: function(a, b, c) {
                var d, e = [], f = 0, g = a.length;
                c = !!c;
                for (; f < g; f++)
                    d = !!b(a[f], f), c !== d && e.push(a[f]);
                return e
            },map: function(a, c, d) {
                var e, f, g = [], h = 0, i = a.length, j = a instanceof $ || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || $.isArray(a));
                if (j)
                    for (; h < i; h++)
                        e = c(a[h], h, d), e != null && (g[g.length] = e);
                else
                    for (f in a)
                        e = c(a[f], f, d), e != null && (g[g.length] = e);
                return g.concat.apply([], g)
            },guid: 1,proxy: function(a, c) {
                var d, e, f;
                return typeof c == "string" && (d = a[c], c = a, a = d), $.isFunction(a) ? (e = V.call(arguments, 2), f = function() {
                    return a.apply(c, e.concat(V.call(arguments)))
                }, f.guid = a.guid = a.guid || f.guid || $.guid++, f) : b
            },access: function(a, c, d, e, f, g, h) {
                var i, j = d == null, k = 0, l = a.length;
                if (d && typeof d == "object") {
                    for (k in d)
                        $.access(a, c, k, d[k], 1, g, e);
                    f = 1
                } else if (e !== b) {
                    i = h === b && $.isFunction(e), j && (i ? (i = c, c = function(a, b, c) {
                        return i.call($(a), c)
                    }) : (c.call(a, e), c = null));
                    if (c)
                        for (; k < l; k++)
                            c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
                    f = 1
                }
                return f ? a : j ? c.call(a) : l ? c(a[0], d) : g
            },now: function() {
                return (new Date).getTime()
            }}), $.ready.promise = function(b) {
            if (!O) {
                O = $.Deferred();
                if (P.readyState === "complete" || P.readyState !== "loading" && P.addEventListener)
                    setTimeout($.ready, 1);
                else if (P.addEventListener)
                    P.addEventListener("DOMContentLoaded", mb, !1), a.addEventListener("load", $.ready, !1);
                else {
                    P.attachEvent("onreadystatechange", mb), a.attachEvent("onload", $.ready);
                    var c = !1;
                    try {
                        c = a.frameElement == null && P.documentElement
                    } catch (d) {
                    }
                    c && c.doScroll && function e() {
                        if (!$.isReady) {
                            try {
                                c.doScroll("left")
                            } catch (a) {
                                return setTimeout(e, 50)
                            }
                            $.ready()
                        }
                    }()
                }
            }
            return O.promise(b)
        }, $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
            nb["[object " + b + "]"] = b.toLowerCase()
        }), N = $(P);
        var ob = {};
        $.Callbacks = function(a) {
            a = typeof a == "string" ? ob[a] || c(a) : $.extend({}, a);
            var d, e, f, g, h, i, j = [], k = !a.once && [], l = function(b) {
                d = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0;
                for (; j && i < h; i++)
                    if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                        d = !1;
                        break
                    }
                f = !1, j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable())
            }, m = {add: function() {
                    if (j) {
                        var b = j.length;
                        (function c(b) {
                            $.each(b, function(b, d) {
                                $.isFunction(d) && (!a.unique || !m.has(d)) ? j.push(d) : d && d.length && c(d)
                            })
                        })(arguments), f ? h = j.length : d && (g = b, l(d))
                    }
                    return this
                },remove: function() {
                    return j && $.each(arguments, function(a, b) {
                        var c;
                        while ((c = $.inArray(b, j, c)) > -1)
                            j.splice(c, 1), f && (c <= h && h--, c <= i && i--)
                    }), this
                },has: function(a) {
                    return $.inArray(a, j) > -1
                },empty: function() {
                    return j = [], this
                },disable: function() {
                    return j = k = d = b, this
                },disabled: function() {
                    return !j
                },lock: function() {
                    return k = b, d || m.disable(), this
                },locked: function() {
                    return !k
                },fireWith: function(a, b) {
                    return b = b || [], b = [a, b.slice ? b.slice() : b], j && (!e || k) && (f ? k.push(b) : l(b)), this
                },fire: function() {
                    return m.fireWith(this, arguments), this
                },fired: function() {
                    return !!e
                }};
            return m
        }, $.extend({Deferred: function(a) {
                var b = [["resolve", "done", $.Callbacks("once memory"), "resolved"], ["reject", "fail", $.Callbacks("once memory"), "rejected"], ["notify", "progress", $.Callbacks("memory")]], c = "pending", d = {state: function() {
                        return c
                    },always: function() {
                        return e.done(arguments).fail(arguments), this
                    },then: function() {
                        var a = arguments;
                        return $.Deferred(function(c) {
                            $.each(b, function(b, d) {
                                var f = d[0], g = a[b];
                                e[d[1]]($.isFunction(g) ? function() {
                                    var a = g.apply(this, arguments);
                                    a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a])
                                } : c[f])
                            }), a = null
                        }).promise()
                    },promise: function(a) {
                        return typeof a == "object" ? $.extend(a, d) : d
                    }}, e = {};
                return d.pipe = d.then, $.each(b, function(a, f) {
                    var g = f[2], h = f[3];
                    d[f[1]] = g.add, h && g.add(function() {
                        c = h
                    }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            },when: function(a) {
                var b = 0, c = V.call(arguments), d = c.length, e = d !== 1 || a && $.isFunction(a.promise) ? d : 0, f = e === 1 ? a : $.Deferred(), g = function(a, b, c) {
                    return function(d) {
                        b[a] = this, c[a] = arguments.length > 1 ? V.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c)
                    }
                }, h, i, j;
                if (d > 1) {
                    h = new Array(d), i = new Array(d), j = new Array(d);
                    for (; b < d; b++)
                        c[b] && $.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e
                }
                return e || f.resolveWith(j, c), f.promise()
            }}), $.support = function() {
            var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement("div");
            m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = m.getElementsByTagName("*"), d = m.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5";
            if (!c || !c.length || !d)
                return {};
            e = P.createElement("select"), f = e.appendChild(P.createElement("option")), g = m.getElementsByTagName("input")[0], b = {leadingWhitespace: m.firstChild.nodeType === 3,tbody: !m.getElementsByTagName("tbody").length,htmlSerialize: !!m.getElementsByTagName("link").length,style: /top/.test(d.getAttribute("style")),hrefNormalized: d.getAttribute("href") === "/a",opacity: /^0.5/.test(d.style.opacity),cssFloat: !!d.style.cssFloat,checkOn: g.value === "on",optSelected: f.selected,getSetAttribute: m.className !== "t",enctype: !!P.createElement("form").enctype,html5Clone: P.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",boxModel: P.compatMode === "CSS1Compat",submitBubbles: !0,changeBubbles: !0,focusinBubbles: !1,deleteExpando: !0,noCloneEvent: !0,inlineBlockNeedsLayout: !1,shrinkWrapBlocks: !1,reliableMarginRight: !0,boxSizingReliable: !0,pixelPosition: !1}, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
            try {
                delete m.test
            } catch (n) {
                b.deleteExpando = !1
            }
            !m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function() {
                b.noCloneEvent = !1
            }), m.cloneNode(!0).fireEvent("onclick"), m.detachEvent("onclick", l)), g = P.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = g.value === "t", g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), m.appendChild(g), h = P.createDocumentFragment(), h.appendChild(m.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(m);
            if (m.attachEvent)
                for (j in {submit: !0,change: !0,focusin: !0})
                    i = "on" + j, k = i in m, k || (m.setAttribute(i, "return;"), k = typeof m[i] == "function"), b[j + "Bubbles"] = k;
            return $(function() {
                var c, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;", h = P.getElementsByTagName("body")[0];
                if (!h)
                    return;
                c = P.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", h.insertBefore(c, h.firstChild), d = P.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = d.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", k = e[0].offsetHeight === 0, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = k && e[0].offsetHeight === 0, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = d.offsetWidth === 4, b.doesNotIncludeMarginInBodyOffset = h.offsetTop !== 1, a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(d, null) || {width: "4px"}).width === "4px", f = P.createElement("div"), f.style.cssText = d.style.cssText = g, f.style.marginRight = f.style.width = "0", d.style.width = "1px", d.appendChild(f), b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)), typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = d.offsetWidth !== 3, c.style.zoom = 1), h.removeChild(c), c = d = e = f = null
            }), h.removeChild(m), c = d = e = f = g = h = m = null, b
        }();
        var pb = /^(?:\{.*\}|\[.*\])$/, qb = /([A-Z])/g;
        $.extend({cache: {},deletedIds: [],uuid: 0,expando: "jQuery" + ($.fn.jquery + Math.random()).replace(/\D/g, ""),noData: {embed: !0,object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet: !0},hasData: function(a) {
                return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando], !!a && !e(a)
            },data: function(a, c, d, e) {
                if (!$.acceptData(a))
                    return;
                var f, g, h = $.expando, i = typeof c == "string", j = a.nodeType, k = j ? $.cache : a, l = j ? a[h] : a[h] && h;
                if ((!l || !k[l] || !e && !k[l].data) && i && d === b)
                    return;
                l || (j ? a[h] = l = $.deletedIds.pop() || ++$.uuid : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = $.noop));
                if (typeof c == "object" || typeof c == "function")
                    e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c);
                return f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[$.camelCase(c)] = d), i ? (g = f[c], g == null && (g = f[$.camelCase(c)])) : g = f, g
            },removeData: function(a, b, c) {
                if (!$.acceptData(a))
                    return;
                var d, f, g, h = a.nodeType, i = h ? $.cache : a, j = h ? a[$.expando] : $.expando;
                if (!i[j])
                    return;
                if (b) {
                    d = c ? i[j] : i[j].data;
                    if (d) {
                        $.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (f = 0, g = b.length; f < g; f++)
                            delete d[b[f]];
                        if (!(c ? e : $.isEmptyObject)(d))
                            return
                    }
                }
                if (!c) {
                    delete i[j].data;
                    if (!e(i[j]))
                        return
                }
                h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null
            },_data: function(a, b, c) {
                return $.data(a, b, c, !0)
            },acceptData: function(a) {
                var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
                return !b || b !== !0 && a.getAttribute("classid") === b
            }}), $.fn.extend({data: function(a, c) {
                var e, f, g, h, i, j = this[0], k = 0, l = null;
                if (a === b) {
                    if (this.length) {
                        l = $.data(j);
                        if (j.nodeType === 1 && !$._data(j, "parsedAttrs")) {
                            g = j.attributes;
                            for (i = g.length; k < i; k++)
                                h = g[k].name, h.indexOf("data-") === 0 && (h = $.camelCase(h.substring(5)), d(j, h, l[h]));
                            $._data(j, "parsedAttrs", !0)
                        }
                    }
                    return l
                }
                return typeof a == "object" ? this.each(function() {
                    $.data(this, a)
                }) : (e = a.split(".", 2), e[1] = e[1] ? "." + e[1] : "", f = e[1] + "!", $.access(this, function(c) {
                    if (c === b)
                        return l = this.triggerHandler("getData" + f, [e[0]]), l === b && j && (l = $.data(j, a), l = d(j, a, l)), l === b && e[1] ? this.data(e[0]) : l;
                    e[1] = c, this.each(function() {
                        var b = $(this);
                        b.triggerHandler("setData" + f, e), $.data(this, a, c), b.triggerHandler("changeData" + f, e)
                    })
                }, null, c, arguments.length > 1, null, !1))
            },removeData: function(a) {
                return this.each(function() {
                    $.removeData(this, a)
                })
            }}), $.extend({queue: function(a, b, c) {
                var d;
                if (a)
                    return b = (b || "fx") + "queue", d = $._data(a, b), c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)), d || []
            },dequeue: function(a, b) {
                b = b || "fx";
                var c = $.queue(a, b), d = c.shift(), e = $._queueHooks(a, b), f = function() {
                    $.dequeue(a, b)
                };
                d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), delete e.stop, d.call(a, f, e)), !c.length && e && e.empty.fire()
            },_queueHooks: function(a, b) {
                var c = b + "queueHooks";
                return $._data(a, c) || $._data(a, c, {empty: $.Callbacks("once memory").add(function() {
                        $.removeData(a, b + "queue", !0), $.removeData(a, c, !0)
                    })})
            }}), $.fn.extend({queue: function(a, c) {
                var d = 2;
                return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function() {
                    var b = $.queue(this, a, c);
                    $._queueHooks(this, a), a === "fx" && b[0] !== "inprogress" && $.dequeue(this, a)
                })
            },dequeue: function(a) {
                return this.each(function() {
                    $.dequeue(this, a)
                })
            },delay: function(a, b) {
                return a = $.fx ? $.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function() {
                        clearTimeout(d)
                    }
                })
            },clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },promise: function(a, c) {
                var d, e = 1, f = $.Deferred(), g = this, h = this.length, i = function() {
                    --e || f.resolveWith(g, [g])
                };
                typeof a != "string" && (c = a, a = b), a = a || "fx";
                while (h--)
                    (d = $._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(i));
                return i(), f.promise(c)
            }});
        var rb, sb, tb, ub = /[\t\r\n]/g, vb = /\r/g, wb = /^(?:button|input)$/i, xb = /^(?:button|input|object|select|textarea)$/i, yb = /^a(?:rea|)$/i, zb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Ab = $.support.getSetAttribute;
        $.fn.extend({attr: function(a, b) {
                return $.access(this, $.attr, a, b, arguments.length > 1)
            },removeAttr: function(a) {
                return this.each(function() {
                    $.removeAttr(this, a)
                })
            },prop: function(a, b) {
                return $.access(this, $.prop, a, b, arguments.length > 1)
            },removeProp: function(a) {
                return a = $.propFix[a] || a, this.each(function() {
                    try {
                        this[a] = b, delete this[a]
                    } catch (c) {
                    }
                })
            },addClass: function(a) {
                var b, c, d, e, f, g, h;
                if ($.isFunction(a))
                    return this.each(function(b) {
                        $(this).addClass(a.call(this, b, this.className))
                    });
                if (a && typeof a == "string") {
                    b = a.split(bb);
                    for (c = 0, d = this.length; c < d; c++) {
                        e = this[c];
                        if (e.nodeType === 1)
                            if (!e.className && b.length === 1)
                                e.className = a;
                            else {
                                f = " " + e.className + " ";
                                for (g = 0, h = b.length; g < h; g++)
                                    ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
                                e.className = $.trim(f)
                            }
                    }
                }
                return this
            },removeClass: function(a) {
                var c, d, e, f, g, h, i;
                if ($.isFunction(a))
                    return this.each(function(b) {
                        $(this).removeClass(a.call(this, b, this.className))
                    });
                if (a && typeof a == "string" || a === b) {
                    c = (a || "").split(bb);
                    for (h = 0, i = this.length; h < i; h++) {
                        e = this[h];
                        if (e.nodeType === 1 && e.className) {
                            d = (" " + e.className + " ").replace(ub, " ");
                            for (f = 0, g = c.length; f < g; f++)
                                while (d.indexOf(" " + c[f] + " ") > -1)
                                    d = d.replace(" " + c[f] + " ", " ");
                            e.className = a ? $.trim(d) : ""
                        }
                    }
                }
                return this
            },toggleClass: function(a, b) {
                var c = typeof a, d = typeof b == "boolean";
                return $.isFunction(a) ? this.each(function(c) {
                    $(this).toggleClass(a.call(this, c, this.className, b), b)
                }) : this.each(function() {
                    if (c === "string") {
                        var e, f = 0, g = $(this), h = b, i = a.split(bb);
                        while (e = i[f++])
                            h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e)
                    } else if (c === "undefined" || c === "boolean")
                        this.className && $._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : $._data(this, "__className__") || ""
                })
            },hasClass: function(a) {
                var b = " " + a + " ", c = 0, d = this.length;
                for (; c < d; c++)
                    if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) > -1)
                        return !0;
                return !1
            },val: function(a) {
                var c, d, e, f = this[0];
                if (!arguments.length) {
                    if (f)
                        return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(vb, "") : d == null ? "" : d);
                    return
                }
                return e = $.isFunction(a), this.each(function(d) {
                    var f, g = $(this);
                    if (this.nodeType !== 1)
                        return;
                    e ? f = a.call(this, d, g.val()) : f = a, f == null ? f = "" : typeof f == "number" ? f += "" : $.isArray(f) && (f = $.map(f, function(a) {
                        return a == null ? "" : a + ""
                    })), c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()];
                    if (!c || !("set" in c) || c.set(this, f, "value") === b)
                        this.value = f
                })
            }}), $.extend({valHooks: {option: {get: function(a) {
                        var b = a.attributes.value;
                        return !b || b.specified ? a.value : a.text
                    }},select: {get: function(a) {
                        var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = a.type === "select-one";
                        if (f < 0)
                            return null;
                        c = i ? f : 0, d = i ? f + 1 : h.length;
                        for (; c < d; c++) {
                            e = h[c];
                            if (e.selected && ($.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !$.nodeName(e.parentNode, "optgroup"))) {
                                b = $(e).val();
                                if (i)
                                    return b;
                                g.push(b)
                            }
                        }
                        return i && !g.length && h.length ? $(h[f]).val() : g
                    },set: function(a, b) {
                        var c = $.makeArray(b);
                        return $(a).find("option").each(function() {
                            this.selected = $.inArray($(this).val(), c) >= 0
                        }), c.length || (a.selectedIndex = -1), c
                    }}},attrFn: {},attr: function(a, c, d, e) {
                var f, g, h, i = a.nodeType;
                if (!a || i === 3 || i === 8 || i === 2)
                    return;
                if (e && $.isFunction($.fn[c]))
                    return $(a)[c](d);
                if (typeof a.getAttribute == "undefined")
                    return $.prop(a, c, d);
                h = i !== 1 || !$.isXMLDoc(a), h && (c = c.toLowerCase(), g = $.attrHooks[c] || (zb.test(c) ? sb : rb));
                if (d !== b) {
                    if (d === null) {
                        $.removeAttr(a, c);
                        return
                    }
                    return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d)
                }
                return g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f)
            },removeAttr: function(a, b) {
                var c, d, e, f, g = 0;
                if (b && a.nodeType === 1) {
                    d = b.split(bb);
                    for (; g < d.length; g++)
                        e = d[g], e && (c = $.propFix[e] || e, f = zb.test(e), f || $.attr(a, e, ""), a.removeAttribute(Ab ? e : c), f && c in a && (a[c] = !1))
                }
            },attrHooks: {type: {set: function(a, b) {
                        if (wb.test(a.nodeName) && a.parentNode)
                            $.error("type property can't be changed");
                        else if (!$.support.radioValue && b === "radio" && $.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }},value: {get: function(a, b) {
                        return rb && $.nodeName(a, "button") ? rb.get(a, b) : b in a ? a.value : null
                    },set: function(a, b, c) {
                        if (rb && $.nodeName(a, "button"))
                            return rb.set(a, b, c);
                        a.value = b
                    }}},propFix: {tabindex: "tabIndex",readonly: "readOnly","for": "htmlFor","class": "className",maxlength: "maxLength",cellspacing: "cellSpacing",cellpadding: "cellPadding",rowspan: "rowSpan",colspan: "colSpan",usemap: "useMap",frameborder: "frameBorder",contenteditable: "contentEditable"},prop: function(a, c, d) {
                var e, f, g, h = a.nodeType;
                if (!a || h === 3 || h === 8 || h === 2)
                    return;
                return g = h !== 1 || !$.isXMLDoc(a), g && (c = $.propFix[c] || c, f = $.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c]
            },propHooks: {tabIndex: {get: function(a) {
                        var c = a.getAttributeNode("tabindex");
                        return c && c.specified ? parseInt(c.value, 10) : xb.test(a.nodeName) || yb.test(a.nodeName) && a.href ? 0 : b
                    }}}}), sb = {get: function(a, c) {
                var d, e = $.prop(a, c);
                return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
            },set: function(a, b, c) {
                var d;
                return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
            }}, Ab || (tb = {name: !0,id: !0,coords: !0}, rb = $.valHooks.button = {get: function(a, c) {
                var d;
                return d = a.getAttributeNode(c), d && (tb[c] ? d.value !== "" : d.specified) ? d.value : b
            },set: function(a, b, c) {
                var d = a.getAttributeNode(c);
                return d || (d = P.createAttribute(c), a.setAttributeNode(d)), d.value = b + ""
            }}, $.each(["width", "height"], function(a, b) {
            $.attrHooks[b] = $.extend($.attrHooks[b], {set: function(a, c) {
                    if (c === "")
                        return a.setAttribute(b, "auto"), c
                }})
        }), $.attrHooks.contenteditable = {get: rb.get,set: function(a, b, c) {
                b === "" && (b = "false"), rb.set(a, b, c)
            }}), $.support.hrefNormalized || $.each(["href", "src", "width", "height"], function(a, c) {
            $.attrHooks[c] = $.extend($.attrHooks[c], {get: function(a) {
                    var d = a.getAttribute(c, 2);
                    return d === null ? b : d
                }})
        }), $.support.style || ($.attrHooks.style = {get: function(a) {
                return a.style.cssText.toLowerCase() || b
            },set: function(a, b) {
                return a.style.cssText = "" + b
            }}), $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {get: function(a) {
                var b = a.parentNode;
                return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
            }})), $.support.enctype || ($.propFix.enctype = "encoding"), $.support.checkOn || $.each(["radio", "checkbox"], function() {
            $.valHooks[this] = {get: function(a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }}
        }), $.each(["radio", "checkbox"], function() {
            $.valHooks[this] = $.extend($.valHooks[this], {set: function(a, b) {
                    if ($.isArray(b))
                        return a.checked = $.inArray($(a).val(), b) >= 0
                }})
        });
        var Bb = /^(?:textarea|input|select)$/i, Cb = /^([^\.]*|)(?:\.(.+)|)$/, Db = /(?:^|\s)hover(\.\S+|)\b/, Eb = /^key/, Fb = /^(?:mouse|contextmenu)|click/, Gb = /^(?:focusinfocus|focusoutblur)$/, Hb = function(a) {
            return $.event.special.hover ? a : a.replace(Db, "mouseenter$1 mouseleave$1")
        };
        $.event = {add: function(a, c, d, e, f) {
                var g, h, i, j, k, l, m, n, o, p, q;
                if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = $._data(a)))
                    return;
                d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = $.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function(a) {
                    return typeof $ == "undefined" || !!a && $.event.triggered === a.type ? b : $.event.dispatch.apply(h.elem, arguments)
                }, h.elem = a), c = $.trim(Hb(c)).split(" ");
                for (j = 0; j < c.length; j++) {
                    k = Cb.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), q = $.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = $.event.special[l] || {}, n = $.extend({type: l,origType: k[1],data: e,handler: d,guid: d.guid,selector: f,namespace: m.join(".")}, o), p = i[l];
                    if (!p) {
                        p = i[l] = [], p.delegateCount = 0;
                        if (!q.setup || q.setup.call(a, e, m, h) === !1)
                            a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h)
                    }
                    q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, n) : p.push(n), $.event.global[l] = !0
                }
                a = null
            },global: {},remove: function(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
                if (!q || !(m = q.events))
                    return;
                b = $.trim(Hb(b || "")).split(" ");
                for (f = 0; f < b.length; f++) {
                    g = Cb.exec(b[f]) || [], h = i = g[1], j = g[2];
                    if (!h) {
                        for (h in m)
                            $.event.remove(a, h + b[f], c, d, !0);
                        continue
                    }
                    n = $.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                    for (l = 0; l < o.length; l++)
                        p = o[l], (e || i === p.origType) && (!c || c.guid === p.guid) && (!j || j.test(p.namespace)) && (!d || d === p.selector || d === "**" && p.selector) && (o.splice(l--, 1), p.selector && o.delegateCount--, n.remove && n.remove.call(a, p));
                    o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, q.handle) === !1) && $.removeEvent(a, h, q.handle), delete m[h])
                }
                $.isEmptyObject(m) && (delete q.handle, $.removeData(a, "events", !0))
            },customEvent: {getData: !0,setData: !0,changeData: !0},trigger: function(c, d, e, f) {
                if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                    var g, h, i, j, k, l, m, n, o, p, q = c.type || c, r = [];
                    if (Gb.test(q + $.event.triggered))
                        return;
                    q.indexOf("!") >= 0 && (q = q.slice(0, -1), h = !0), q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort());
                    if ((!e || $.event.customEvent[q]) && !$.event.global[q])
                        return;
                    c = typeof c == "object" ? c[$.expando] ? c : new $.Event(q, c) : new $.Event(q), c.type = q, c.isTrigger = !0, c.exclusive = h, c.namespace = r.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = q.indexOf(":") < 0 ? "on" + q : "";
                    if (!e) {
                        g = $.cache;
                        for (i in g)
                            g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0);
                        return
                    }
                    c.result = b, c.target || (c.target = e), d = d != null ? $.makeArray(d) : [], d.unshift(c), m = $.event.special[q] || {};
                    if (m.trigger && m.trigger.apply(e, d) === !1)
                        return;
                    o = [[e, m.bindType || q]];
                    if (!f && !m.noBubble && !$.isWindow(e)) {
                        p = m.delegateType || q, j = Gb.test(p + q) ? e : e.parentNode;
                        for (k = e; j; j = j.parentNode)
                            o.push([j, p]), k = j;
                        k === (e.ownerDocument || P) && o.push([k.defaultView || k.parentWindow || a, p])
                    }
                    for (i = 0; i < o.length && !c.isPropagationStopped(); i++)
                        j = o[i][0], c.type = o[i][1], n = ($._data(j, "events") || {})[c.type] && $._data(j, "handle"), n && n.apply(j, d), n = l && j[l], n && $.acceptData(j) && n.apply(j, d) === !1 && c.preventDefault();
                    return c.type = q, !f && !c.isDefaultPrevented() && (!m._default || m._default.apply(e.ownerDocument, d) === !1) && (q !== "click" || !$.nodeName(e, "a")) && $.acceptData(e) && l && e[q] && (q !== "focus" && q !== "blur" || c.target.offsetWidth !== 0) && !$.isWindow(e) && (k = e[l], k && (e[l] = null), $.event.triggered = q, e[q](), $.event.triggered = b, k && (e[l] = k)), c.result
                }
                return
            },dispatch: function(c) {
                c = $.event.fix(c || a.event);
                var d, e, f, g, h, i, j, k, l, m, n, o = ($._data(this, "events") || {})[c.type] || [], p = o.delegateCount, q = [].slice.call(arguments), r = !c.exclusive && !c.namespace, s = $.event.special[c.type] || {}, t = [];
                q[0] = c, c.delegateTarget = this;
                if (s.preDispatch && s.preDispatch.call(this, c) === !1)
                    return;
                if (p && (!c.button || c.type !== "click")) {
                    g = $(this), g.context = this;
                    for (f = c.target; f != this; f = f.parentNode || this)
                        if (f.disabled !== !0 || c.type !== "click") {
                            i = {}, k = [], g[0] = f;
                            for (d = 0; d < p; d++)
                                l = o[d], m = l.selector, i[m] === b && (i[m] = g.is(m)), i[m] && k.push(l);
                            k.length && t.push({elem: f,matches: k})
                        }
                }
                o.length > p && t.push({elem: this,matches: o.slice(p)});
                for (d = 0; d < t.length && !c.isPropagationStopped(); d++) {
                    j = t[d], c.currentTarget = j.elem;
                    for (e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++) {
                        l = j.matches[e];
                        if (r || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace))
                            c.data = l.data, c.handleObj = l, h = (($.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, q), h !== b && (c.result = h, h === !1 && (c.preventDefault(), c.stopPropagation()))
                    }
                }
                return s.postDispatch && s.postDispatch.call(this, c), c.result
            },props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks: {},keyHooks: {props: "char charCode key keyCode".split(" "),filter: function(a, b) {
                    return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
                }},mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter: function(a, c) {
                    var d, e, f, g = c.button, h = c.fromElement;
                    return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || P, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), a
                }},fix: function(a) {
                if (a[$.expando])
                    return a;
                var b, c, d = a, e = $.event.fixHooks[a.type] || {}, f = e.props ? this.props.concat(e.props) : this.props;
                a = $.Event(d);
                for (b = f.length; b; )
                    c = f[--b], a[c] = d[c];
                return a.target || (a.target = d.srcElement || P), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, e.filter ? e.filter(a, d) : a
            },special: {ready: {setup: $.bindReady},load: {noBubble: !0},focus: {delegateType: "focusin"},blur: {delegateType: "focusout"},beforeunload: {setup: function(a, b, c) {
                        $.isWindow(this) && (this.onbeforeunload = c)
                    },teardown: function(a, b) {
                        this.onbeforeunload === b && (this.onbeforeunload = null)
                    }}},simulate: function(a, b, c, d) {
                var e = $.extend(new $.Event, c, {type: a,isSimulated: !0,originalEvent: {}});
                d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }}, $.event.handle = $.event.dispatch, $.removeEvent = P.removeEventListener ? function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function(a, b, c) {
            var d = "on" + b;
            a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c))
        }, $.Event = function(a, b) {
            if (!(this instanceof $.Event))
                return new $.Event(a, b);
            a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a, b && $.extend(this, b), this.timeStamp = a && a.timeStamp || $.now(), this[$.expando] = !0
        }, $.Event.prototype = {preventDefault: function() {
                this.isDefaultPrevented = g;
                var a = this.originalEvent;
                if (!a)
                    return;
                a.preventDefault ? a.preventDefault() : a.returnValue = !1
            },stopPropagation: function() {
                this.isPropagationStopped = g;
                var a = this.originalEvent;
                if (!a)
                    return;
                a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
            },stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = g, this.stopPropagation()
            },isDefaultPrevented: f,isPropagationStopped: f,isImmediatePropagationStopped: f}, $.each({mouseenter: "mouseover",mouseleave: "mouseout"}, function(a, b) {
            $.event.special[a] = {delegateType: b,bindType: b,handle: function(a) {
                    var c, d = this, e = a.relatedTarget, f = a.handleObj, g = f.selector;
                    if (!e || e !== d && !$.contains(d, e))
                        a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b;
                    return c
                }}
        }), $.support.submitBubbles || ($.event.special.submit = {setup: function() {
                if ($.nodeName(this, "form"))
                    return !1;
                $.event.add(this, "click._submit keypress._submit", function(a) {
                    var c = a.target, d = $.nodeName(c, "input") || $.nodeName(c, "button") ? c.form : b;
                    d && !$._data(d, "_submit_attached") && ($.event.add(d, "submit._submit", function(a) {
                        a._submit_bubble = !0
                    }), $._data(d, "_submit_attached", !0))
                })
            },postDispatch: function(a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && $.event.simulate("submit", this.parentNode, a, !0))
            },teardown: function() {
                if ($.nodeName(this, "form"))
                    return !1;
                $.event.remove(this, "._submit")
            }}), $.support.changeBubbles || ($.event.special.change = {setup: function() {
                if (Bb.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio")
                        $.event.add(this, "propertychange._change", function(a) {
                            a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                        }), $.event.add(this, "click._change", function(a) {
                            this._just_changed && !a.isTrigger && (this._just_changed = !1), $.event.simulate("change", this, a, !0)
                        });
                    return !1
                }
                $.event.add(this, "beforeactivate._change", function(a) {
                    var b = a.target;
                    Bb.test(b.nodeName) && !$._data(b, "_change_attached") && ($.event.add(b, "change._change", function(a) {
                        this.parentNode && !a.isSimulated && !a.isTrigger && $.event.simulate("change", this.parentNode, a, !0)
                    }), $._data(b, "_change_attached", !0))
                })
            },handle: function(a) {
                var b = a.target;
                if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")
                    return a.handleObj.handler.apply(this, arguments)
            },teardown: function() {
                return $.event.remove(this, "._change"), Bb.test(this.nodeName)
            }}), $.support.focusinBubbles || $.each({focus: "focusin",blur: "focusout"}, function(a, b) {
            var c = 0, d = function(a) {
                $.event.simulate(b, a.target, $.event.fix(a), !0)
            };
            $.event.special[b] = {setup: function() {
                    c++ === 0 && P.addEventListener(a, d, !0)
                },teardown: function() {
                    --c === 0 && P.removeEventListener(a, d, !0)
                }}
        }), $.fn.extend({on: function(a, c, d, e, g) {
                var h, i;
                if (typeof a == "object") {
                    typeof c != "string" && (d = d || c, c = b);
                    for (i in a)
                        this.on(i, c, d, a[i], g);
                    return this
                }
                d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
                if (e === !1)
                    e = f;
                else if (!e)
                    return this;
                return g === 1 && (h = e, e = function(a) {
                    return $().off(a), h.apply(this, arguments)
                }, e.guid = h.guid || (h.guid = $.guid++)), this.each(function() {
                    $.event.add(this, a, e, d, c)
                })
            },one: function(a, b, c, d) {
                return this.on(a, b, c, d, 1)
            },off: function(a, c, d) {
                var e, g;
                if (a && a.preventDefault && a.handleObj)
                    return e = a.handleObj, $(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
                if (typeof a == "object") {
                    for (g in a)
                        this.off(g, c, a[g]);
                    return this
                }
                if (c === !1 || typeof c == "function")
                    d = c, c = b;
                return d === !1 && (d = f), this.each(function() {
                    $.event.remove(this, a, d, c)
                })
            },bind: function(a, b, c) {
                return this.on(a, null, b, c)
            },unbind: function(a, b) {
                return this.off(a, null, b)
            },live: function(a, b, c) {
                return $(this.context).on(a, this.selector, b, c), this
            },die: function(a, b) {
                return $(this.context).off(a, this.selector || "**", b), this
            },delegate: function(a, b, c, d) {
                return this.on(b, a, c, d)
            },undelegate: function(a, b, c) {
                return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c)
            },trigger: function(a, b) {
                return this.each(function() {
                    $.event.trigger(a, b, this)
                })
            },triggerHandler: function(a, b) {
                if (this[0])
                    return $.event.trigger(a, b, this[0], !0)
            },toggle: function(a) {
                var b = arguments, c = a.guid || $.guid++, d = 0, e = function(c) {
                    var e = ($._data(this, "lastToggle" + a.guid) || 0) % d;
                    return $._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
                };
                e.guid = c;
                while (d < b.length)
                    b[d++].guid = c;
                return this.click(e)
            },hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }}), $.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
            $.fn[b] = function(a, c) {
                return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }, Eb.test(b) && ($.event.fixHooks[b] = $.event.keyHooks), Fb.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks)
        }), function(a, b) {
            function c(a, b, c, d) {
                var e = 0, f = b.length;
                for (; e < f; e++)
                    fb(a, b[e], c, d)
            }
            function d(a, b, d, e, f, g) {
                var h, i = gb.setFilters[b.toLowerCase()];
                return i || fb.error(b), (a || !(h = f)) && c(a || "*", e, h = [], f), h.length > 0 ? i(h, d, g) : []
            }
            function e(a, e, f, g, h) {
                var i, j, k, l, m, n, o, p, q = 0, r = h.length, s = S.POS, t = new RegExp("^" + s.source + "(?!" + y + ")", "i"), u = function() {
                    var a = 1, c = arguments.length - 2;
                    for (; a < c; a++)
                        arguments[a] === b && (i[a] = b)
                };
                for (; q < r; q++) {
                    s.exec(""), a = h[q], l = [], k = 0, m = g;
                    while (i = s.exec(a)) {
                        p = s.lastIndex = i.index + i[0].length;
                        if (p > k) {
                            o = a.slice(k, i.index), k = p, n = [e], I.test(o) && (m && (n = m), m = g);
                            if (j = O.test(o))
                                o = o.slice(0, -5).replace(I, "$&*");
                            i.length > 1 && i[0].replace(t, u), m = d(o, i[1], i[2], n, m, j)
                        }
                    }
                    m ? (l = l.concat(m), (o = a.slice(k)) && o !== ")" ? I.test(o) ? c(o, l, f, g) : fb(o, e, f, g ? g.concat(m) : m) : w.apply(f, l)) : fb(a, e, f, g)
                }
                return r === 1 ? f : fb.uniqueSort(f)
            }
            function f(a, b, c) {
                var d, e, f, g = [], h = 0, i = K.exec(a), j = !i.pop() && !i.pop(), k = j && a.match(J) || [""], l = gb.preFilter, m = gb.filter, n = !c && b !== p;
                for (; (e = k[h]) != null && j; h++) {
                    g.push(d = []), n && (e = " " + e);
                    while (e) {
                        j = !1;
                        if (i = I.exec(e))
                            e = e.slice(i[0].length), j = d.push({part: i.pop().replace(H, " "),captures: i});
                        for (f in m)
                            (i = S[f].exec(e)) && (!l[f] || (i = l[f](i, b, c))) && (e = e.slice(i.shift().length), j = d.push({part: f,captures: i}));
                        if (!j)
                            break
                    }
                }
                return j || fb.error(a), g
            }
            function g(a, b, c) {
                var d = b.dir, e = u++;
                return a || (a = function(a) {
                    return a === c
                }), b.first ? function(b, c) {
                    while (b = b[d])
                        if (b.nodeType === 1)
                            return a(b, c) && b
                } : function(b, c) {
                    var f, g = e + "." + l, h = g + "." + k;
                    while (b = b[d])
                        if (b.nodeType === 1) {
                            if ((f = b[x]) === h)
                                return b.sizset;
                            if (typeof f == "string" && f.indexOf(g) === 0) {
                                if (b.sizset)
                                    return b
                            } else {
                                b[x] = h;
                                if (a(b, c))
                                    return b.sizset = !0, b;
                                b.sizset = !1
                            }
                        }
                }
            }
            function h(a, b) {
                return a ? function(c, d) {
                    var e = b(c, d);
                    return e && a(e === !0 ? c : e, d)
                } : b
            }
            function i(a, b, c) {
                var d, e, f = 0;
                for (; d = a[f]; f++)
                    gb.relative[d.part] ? e = g(e, gb.relative[d.part], b) : (d.captures.push(b, c), e = h(e, gb.filter[d.part].apply(null, d.captures)));
                return e
            }
            function j(a) {
                return function(b, c) {
                    var d, e = 0;
                    for (; d = a[e]; e++)
                        if (d(b, c))
                            return !0;
                    return !1
                }
            }
            var k, l, m, n, o, p = a.document, q = p.documentElement, r = "undefined", s = !1, t = !0, u = 0, v = [].slice, w = [].push, x = ("sizcache" + Math.random()).replace(".", ""), y = "[\\x20\\t\\r\\n\\f]", z = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", A = z.replace("w", "w#"), B = "([*^$|!~]?=)", C = "\\[" + y + "*(" + z + ")" + y + "*(?:" + B + y + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + A + ")|)|)" + y + "*\\]", D = ":(" + z + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)", E = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", F = y + "*([\\x20\\t\\r\\n\\f>+~])" + y + "*", G = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + C + "|" + D.replace(2, 7) + "|[^\\\\(),])+", H = new RegExp("^" + y + "+|((?:^|[^\\\\])(?:\\\\.)*)" + y + "+$", "g"), I = new RegExp("^" + F), J = new RegExp(G + "?(?=" + y + "*,|$)", "g"), K = new RegExp("^(?:(?!,)(?:(?:^|,)" + y + "*" + G + ")*?|" + y + "*(.*?))(\\)|$)"), L = new RegExp(G.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + F, "g"), M = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, N = /[\x20\t\r\n\f]*[+~]/, O = /:not\($/, P = /h\d/i, Q = /input|select|textarea|button/i, R = /\\(?!\\)/g, S = {ID: new RegExp("^#(" + z + ")"),CLASS: new RegExp("^\\.(" + z + ")"),NAME: new RegExp("^\\[name=['\"]?(" + z + ")['\"]?\\]"),TAG: new RegExp("^(" + z.replace("[-", "[-\\*") + ")"),ATTR: new RegExp("^" + C),PSEUDO: new RegExp("^" + D),CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + y + "*(even|odd|(([+-]|)(\\d*)n|)" + y + "*(?:([+-]|)" + y + "*(\\d+)|))" + y + "*\\)|)", "i"),POS: new RegExp(E, "ig"),needsContext: new RegExp("^" + y + "*[>+~]|" + E, "i")}, T = {}, U = [], V = {}, W = [], X = function(a) {
                return a.sizzleFilter = !0, a
            }, Y = function(a) {
                return function(b) {
                    return b.nodeName.toLowerCase() === "input" && b.type === a
                }
            }, Z = function(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return (c === "input" || c === "button") && b.type === a
                }
            }, _ = function(a) {
                var b = !1, c = p.createElement("div");
                try {
                    b = a(c)
                } catch (d) {
                }
                return c = null, b
            }, ab = _(function(a) {
                a.innerHTML = "<select></select>";
                var b = typeof a.lastChild.getAttribute("multiple");
                return b !== "boolean" && b !== "string"
            }), bb = _(function(a) {
                a.id = x + 0, a.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", q.insertBefore(a, q.firstChild);
                var b = p.getElementsByName && p.getElementsByName(x).length === 2 + p.getElementsByName(x + 0).length;
                return o = !p.getElementById(x), q.removeChild(a), b
            }), cb = _(function(a) {
                return a.appendChild(p.createComment("")), a.getElementsByTagName("*").length === 0
            }), db = _(function(a) {
                return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== r && a.firstChild.getAttribute("href") === "#"
            }), eb = _(function(a) {
                return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || a.getElementsByClassName("e").length === 0 ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length !== 1)
            }), fb = function(a, b, c, d) {
                c = c || [], b = b || p;
                var e, f, g, h, i = b.nodeType;
                if (i !== 1 && i !== 9)
                    return [];
                if (!a || typeof a != "string")
                    return c;
                g = ib(b);
                if (!g && !d)
                    if (e = M.exec(a))
                        if (h = e[1]) {
                            if (i === 9) {
                                f = b.getElementById(h);
                                if (!f || !f.parentNode)
                                    return c;
                                if (f.id === h)
                                    return c.push(f), c
                            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && jb(b, f) && f.id === h)
                                return c.push(f), c
                        } else {
                            if (e[2])
                                return w.apply(c, v.call(b.getElementsByTagName(a), 0)), c;
                            if ((h = e[3]) && eb && b.getElementsByClassName)
                                return w.apply(c, v.call(b.getElementsByClassName(h), 0)), c
                        }
                return mb(a, b, c, d, g)
            }, gb = fb.selectors = {cacheLength: 50,match: S,order: ["ID", "TAG"],attrHandle: {},createPseudo: X,find: {ID: o ? function(a, b, c) {
                        if (typeof b.getElementById !== r && !c) {
                            var d = b.getElementById(a);
                            return d && d.parentNode ? [d] : []
                        }
                    } : function(a, c, d) {
                        if (typeof c.getElementById !== r && !d) {
                            var e = c.getElementById(a);
                            return e ? e.id === a || typeof e.getAttributeNode !== r && e.getAttributeNode("id").value === a ? [e] : b : []
                        }
                    },TAG: cb ? function(a, b) {
                        if (typeof b.getElementsByTagName !== r)
                            return b.getElementsByTagName(a)
                    } : function(a, b) {
                        var c = b.getElementsByTagName(a);
                        if (a === "*") {
                            var d, e = [], f = 0;
                            for (; d = c[f]; f++)
                                d.nodeType === 1 && e.push(d);
                            return e
                        }
                        return c
                    }},relative: {">": {dir: "parentNode",first: !0}," ": {dir: "parentNode"},"+": {dir: "previousSibling",first: !0},"~": {dir: "previousSibling"}},preFilter: {ATTR: function(a) {
                        return a[1] = a[1].replace(R, ""), a[3] = (a[4] || a[5] || "").replace(R, ""), a[2] === "~=" && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    },CHILD: function(a) {
                        return a[1] = a[1].toLowerCase(), a[1] === "nth" ? (a[2] || fb.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && fb.error(a[0]), a
                    },PSEUDO: function(a) {
                        var b, c = a[4];
                        return S.CHILD.test(a[0]) ? null : (c && (b = K.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a)
                    }},filter: {ID: o ? function(a) {
                        return a = a.replace(R, ""), function(b) {
                            return b.getAttribute("id") === a
                        }
                    } : function(a) {
                        return a = a.replace(R, ""), function(b) {
                            var c = typeof b.getAttributeNode !== r && b.getAttributeNode("id");
                            return c && c.value === a
                        }
                    },TAG: function(a) {
                        return a === "*" ? function() {
                            return !0
                        } : (a = a.replace(R, "").toLowerCase(), function(b) {
                            return b.nodeName && b.nodeName.toLowerCase() === a
                        })
                    },CLASS: function(a) {
                        var b = T[a];
                        return b || (b = T[a] = new RegExp("(^|" + y + ")" + a + "(" + y + "|$)"), U.push(a), U.length > gb.cacheLength && delete T[U.shift()]), function(a) {
                            return b.test(a.className || typeof a.getAttribute !== r && a.getAttribute("class") || "")
                        }
                    },ATTR: function(a, b, c) {
                        return b ? function(d) {
                            var e = fb.attr(d, a), f = e + "";
                            if (e == null)
                                return b === "!=";
                            switch (b) {
                                case "=":
                                    return f === c;
                                case "!=":
                                    return f !== c;
                                case "^=":
                                    return c && f.indexOf(c) === 0;
                                case "*=":
                                    return c && f.indexOf(c) > -1;
                                case "$=":
                                    return c && f.substr(f.length - c.length) === c;
                                case "~=":
                                    return (" " + f + " ").indexOf(c) > -1;
                                case "|=":
                                    return f === c || f.substr(0, c.length + 1) === c + "-"
                            }
                        } : function(b) {
                            return fb.attr(b, a) != null
                        }
                    },CHILD: function(a, b, c, d) {
                        if (a === "nth") {
                            var e = u++;
                            return function(a) {
                                var b, f, g = 0, h = a;
                                if (c === 1 && d === 0)
                                    return !0;
                                b = a.parentNode;
                                if (b && (b[x] !== e || !a.sizset)) {
                                    for (h = b.firstChild; h; h = h.nextSibling)
                                        if (h.nodeType === 1) {
                                            h.sizset = ++g;
                                            if (h === a)
                                                break
                                        }
                                    b[x] = e
                                }
                                return f = a.sizset - d, c === 0 ? f === 0 : f % c === 0 && f / c >= 0
                            }
                        }
                        return function(b) {
                            var c = b;
                            switch (a) {
                                case "only":
                                case "first":
                                    while (c = c.previousSibling)
                                        if (c.nodeType === 1)
                                            return !1;
                                    if (a === "first")
                                        return !0;
                                    c = b;
                                case "last":
                                    while (c = c.nextSibling)
                                        if (c.nodeType === 1)
                                            return !1;
                                    return !0
                            }
                        }
                    },PSEUDO: function(a, b, c, d) {
                        var e = gb.pseudos[a] || gb.pseudos[a.toLowerCase()];
                        return e || fb.error("unsupported pseudo: " + a), e.sizzleFilter ? e(b, c, d) : e
                    }},pseudos: {not: X(function(a, b, c) {
                        var d = lb(a.replace(H, "$1"), b, c);
                        return function(a) {
                            return !d(a)
                        }
                    }),enabled: function(a) {
                        return a.disabled === !1
                    },disabled: function(a) {
                        return a.disabled === !0
                    },checked: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && !!a.checked || b === "option" && !!a.selected
                    },selected: function(a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },parent: function(a) {
                        return !gb.pseudos.empty(a)
                    },empty: function(a) {
                        var b;
                        a = a.firstChild;
                        while (a) {
                            if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4)
                                return !1;
                            a = a.nextSibling
                        }
                        return !0
                    },contains: X(function(a) {
                        return function(b) {
                            return (b.textContent || b.innerText || kb(b)).indexOf(a) > -1
                        }
                    }),has: X(function(a) {
                        return function(b) {
                            return fb(a, b).length > 0
                        }
                    }),header: function(a) {
                        return P.test(a.nodeName)
                    },text: function(a) {
                        var b, c;
                        return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b)
                    },radio: Y("radio"),checkbox: Y("checkbox"),file: Y("file"),password: Y("password"),image: Y("image"),submit: Z("submit"),reset: Z("reset"),button: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && a.type === "button" || b === "button"
                    },input: function(a) {
                        return Q.test(a.nodeName)
                    },focus: function(a) {
                        var b = a.ownerDocument;
                        return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href)
                    },active: function(a) {
                        return a === a.ownerDocument.activeElement
                    }},setFilters: {first: function(a, b, c) {
                        return c ? a.slice(1) : [a[0]]
                    },last: function(a, b, c) {
                        var d = a.pop();
                        return c ? a : [d]
                    },even: function(a, b, c) {
                        var d = [], e = c ? 1 : 0, f = a.length;
                        for (; e < f; e += 2)
                            d.push(a[e]);
                        return d
                    },odd: function(a, b, c) {
                        var d = [], e = c ? 0 : 1, f = a.length;
                        for (; e < f; e += 2)
                            d.push(a[e]);
                        return d
                    },lt: function(a, b, c) {
                        return c ? a.slice(+b) : a.slice(0, +b)
                    },gt: function(a, b, c) {
                        return c ? a.slice(0, +b + 1) : a.slice(+b + 1)
                    },eq: function(a, b, c) {
                        var d = a.splice(+b, 1);
                        return c ? a : d
                    }}};
            gb.setFilters.nth = gb.setFilters.eq, gb.filters = gb.pseudos, db || (gb.attrHandle = {href: function(a) {
                    return a.getAttribute("href", 2)
                },type: function(a) {
                    return a.getAttribute("type")
                }}), bb && (gb.order.push("NAME"), gb.find.NAME = function(a, b) {
                if (typeof b.getElementsByName !== r)
                    return b.getElementsByName(a)
            }), eb && (gb.order.splice(1, 0, "CLASS"), gb.find.CLASS = function(a, b, c) {
                if (typeof b.getElementsByClassName !== r && !c)
                    return b.getElementsByClassName(a)
            });
            try {
                v.call(q.childNodes, 0)[0].nodeType
            } catch (hb) {
                v = function(a) {
                    var b, c = [];
                    for (; b = this[a]; a++)
                        c.push(b);
                    return c
                }
            }
            var ib = fb.isXML = function(a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? b.nodeName !== "HTML" : !1
            }, jb = fb.contains = q.compareDocumentPosition ? function(a, b) {
                return !!(a.compareDocumentPosition(b) & 16)
            } : q.contains ? function(a, b) {
                var c = a.nodeType === 9 ? a.documentElement : a, d = b.parentNode;
                return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d))
            } : function(a, b) {
                while (b = b.parentNode)
                    if (b === a)
                        return !0;
                return !1
            }, kb = fb.getText = function(a) {
                var b, c = "", d = 0, e = a.nodeType;
                if (e) {
                    if (e === 1 || e === 9 || e === 11) {
                        if (typeof a.textContent == "string")
                            return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling)
                            c += kb(a)
                    } else if (e === 3 || e === 4)
                        return a.nodeValue
                } else
                    for (; b = a[d]; d++)
                        c += kb(b);
                return c
            };
            fb.attr = function(a, b) {
                var c, d = ib(a);
                return d || (b = b.toLowerCase()), gb.attrHandle[b] ? gb.attrHandle[b](a) : ab || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null)
            }, fb.error = function(a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, [0, 0].sort(function() {
                return t = 0
            }), q.compareDocumentPosition ? m = function(a, b) {
                return a === b ? (s = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
            } : (m = function(a, b) {
                if (a === b)
                    return s = !0, 0;
                if (a.sourceIndex && b.sourceIndex)
                    return a.sourceIndex - b.sourceIndex;
                var c, d, e = [], f = [], g = a.parentNode, h = b.parentNode, i = g;
                if (g === h)
                    return n(a, b);
                if (!g)
                    return -1;
                if (!h)
                    return 1;
                while (i)
                    e.unshift(i), i = i.parentNode;
                i = h;
                while (i)
                    f.unshift(i), i = i.parentNode;
                c = e.length, d = f.length;
                for (var j = 0; j < c && j < d; j++)
                    if (e[j] !== f[j])
                        return n(e[j], f[j]);
                return j === c ? n(a, f[j], -1) : n(e[j], b, 1)
            }, n = function(a, b, c) {
                if (a === b)
                    return c;
                var d = a.nextSibling;
                while (d) {
                    if (d === b)
                        return -1;
                    d = d.nextSibling
                }
                return 1
            }), fb.uniqueSort = function(a) {
                var b, c = 1;
                if (m) {
                    s = t, a.sort(m);
                    if (s)
                        for (; b = a[c]; c++)
                            b === a[c - 1] && a.splice(c--, 1)
                }
                return a
            };
            var lb = fb.compile = function(a, b, c) {
                var d, e, g, h = V[a];
                if (h && h.context === b)
                    return h;
                e = f(a, b, c);
                for (g = 0; d = e[g]; g++)
                    e[g] = i(d, b, c);
                return h = V[a] = j(e), h.context = b, h.runs = h.dirruns = 0, W.push(a), W.length > gb.cacheLength && delete V[W.shift()], h
            };
            fb.matches = function(a, b) {
                return fb(a, null, null, b)
            }, fb.matchesSelector = function(a, b) {
                return fb(b, null, null, [a]).length > 0
            };
            var mb = function(a, b, c, d, f) {
                a = a.replace(H, "$1");
                var g, h, i, j, m, n, o, p, q, r = a.match(J), s = a.match(L), t = b.nodeType;
                if (S.POS.test(a))
                    return e(a, b, c, d, r);
                if (d)
                    g = v.call(d, 0);
                else if (r && r.length === 1) {
                    if (s.length > 1 && t === 9 && !f && (r = S.ID.exec(s[0]))) {
                        b = gb.find.ID(r[1], b, f)[0];
                        if (!b)
                            return c;
                        a = a.slice(s.shift().length)
                    }
                    p = (r = N.exec(s[0])) && !r.index && b.parentNode || b, q = s.pop(), n = q.split(":not")[0];
                    for (i = 0, j = gb.order.length; i < j; i++) {
                        o = gb.order[i];
                        if (r = S[o].exec(n)) {
                            g = gb.find[o]((r[1] || "").replace(R, ""), p, f);
                            if (g == null)
                                continue;
                            n === q && (a = a.slice(0, a.length - q.length) + n.replace(S[o], ""), a || w.apply(c, v.call(g, 0)));
                            break
                        }
                    }
                }
                if (a) {
                    h = lb(a, b, f), l = h.dirruns++, g == null && (g = gb.find.TAG("*", N.test(a) && b.parentNode || b));
                    for (i = 0; m = g[i]; i++)
                        k = h.runs++, h(m, b) && c.push(m)
                }
                return c
            };
            p.querySelectorAll && function() {
                var a, b = mb, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [], f = [":active"], g = q.matchesSelector || q.mozMatchesSelector || q.webkitMatchesSelector || q.oMatchesSelector || q.msMatchesSelector;
                _(function(a) {
                    a.innerHTML = "<select><option selected></option></select>", a.querySelectorAll("[selected]").length || e.push("\\[" + y + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || e.push(":checked")
                }), _(function(a) {
                    a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + y + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'>", a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled")
                }), e = e.length && new RegExp(e.join("|")), mb = function(a, d, f, g, h) {
                    if (!g && !h && (!e || !e.test(a)))
                        if (d.nodeType === 9)
                            try {
                                return w.apply(f, v.call(d.querySelectorAll(a), 0)), f
                            } catch (i) {
                            }
                        else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                            var j = d.getAttribute("id"), k = j || x, l = N.test(a) && d.parentNode || d;
                            j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k);
                            try {
                                return w.apply(f, v.call(l.querySelectorAll(a.replace(J, "[id='" + k + "'] $&")), 0)), f
                            } catch (i) {
                            }finally {
                                j || d.removeAttribute("id")
                            }
                        }
                    return b(a, d, f, g, h)
                }, g && (_(function(b) {
                    a = g.call(b, "div");
                    try {
                        g.call(b, "[test!='']:sizzle"), f.push(gb.match.PSEUDO)
                    } catch (c) {
                    }
                }), f = new RegExp(f.join("|")), fb.matchesSelector = function(b, c) {
                    c = c.replace(d, "='$1']");
                    if (!ib(b) && !f.test(c) && (!e || !e.test(c)))
                        try {
                            var h = g.call(b, c);
                            if (h || a || b.document && b.document.nodeType !== 11)
                                return h
                        } catch (i) {
                        }
                    return fb(c, null, null, [b]).length > 0
                })
            }(), fb.attr = $.attr, $.find = fb, $.expr = fb.selectors, $.expr[":"] = $.expr.pseudos, $.unique = fb.uniqueSort, $.text = fb.getText, $.isXMLDoc = fb.isXML, $.contains = fb.contains
        }(a);
        var Ib = /Until$/, Jb = /^(?:parents|prev(?:Until|All))/, Kb = /^.[^:#\[\.,]*$/, Lb = $.expr.match.needsContext, Mb = {children: !0,contents: !0,next: !0,prev: !0};
        $.fn.extend({find: function(a) {
                var b, c, d, e, f, g, h = this;
                if (typeof a != "string")
                    return $(a).filter(function() {
                        for (b = 0, c = h.length; b < c; b++)
                            if ($.contains(h[b], this))
                                return !0
                    });
                g = this.pushStack("", "find", a);
                for (b = 0, c = this.length; b < c; b++) {
                    d = g.length, $.find(a, this[b], g);
                    if (b > 0)
                        for (e = d; e < g.length; e++)
                            for (f = 0; f < d; f++)
                                if (g[f] === g[e]) {
                                    g.splice(e--, 1);
                                    break
                                }
                }
                return g
            },has: function(a) {
                var b, c = $(a, this), d = c.length;
                return this.filter(function() {
                    for (b = 0; b < d; b++)
                        if ($.contains(this, c[b]))
                            return !0
                })
            },not: function(a) {
                return this.pushStack(j(this, a, !1), "not", a)
            },filter: function(a) {
                return this.pushStack(j(this, a, !0), "filter", a)
            },is: function(a) {
                return !!a && (typeof a == "string" ? Lb.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0)
            },closest: function(a, b) {
                var c, d = 0, e = this.length, f = [], g = Lb.test(a) || typeof a != "string" ? $(a, b || this.context) : 0;
                for (; d < e; d++) {
                    c = this[d];
                    while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
                        if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
                            f.push(c);
                            break
                        }
                        c = c.parentNode
                    }
                }
                return f = f.length > 1 ? $.unique(f) : f, this.pushStack(f, "closest", a)
            },index: function(a) {
                return a ? typeof a == "string" ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
            },add: function(a, b) {
                var c = typeof a == "string" ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a), d = $.merge(this.get(), c);
                return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d))
            },addBack: function(a) {
                return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
            }}), $.fn.andSelf = $.fn.addBack, $.each({parent: function(a) {
                var b = a.parentNode;
                return b && b.nodeType !== 11 ? b : null
            },parents: function(a) {
                return $.dir(a, "parentNode")
            },parentsUntil: function(a, b, c) {
                return $.dir(a, "parentNode", c)
            },next: function(a) {
                return i(a, "nextSibling")
            },prev: function(a) {
                return i(a, "previousSibling")
            },nextAll: function(a) {
                return $.dir(a, "nextSibling")
            },prevAll: function(a) {
                return $.dir(a, "previousSibling")
            },nextUntil: function(a, b, c) {
                return $.dir(a, "nextSibling", c)
            },prevUntil: function(a, b, c) {
                return $.dir(a, "previousSibling", c)
            },siblings: function(a) {
                return $.sibling((a.parentNode || {}).firstChild, a)
            },children: function(a) {
                return $.sibling(a.firstChild)
            },contents: function(a) {
                return $.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes)
            }}, function(a, b) {
            $.fn[a] = function(c, d) {
                var e = $.map(this, b, c);
                return Ib.test(a) || (d = c), d && typeof d == "string" && (e = $.filter(d, e)), e = this.length > 1 && !Mb[a] ? $.unique(e) : e, this.length > 1 && Jb.test(a) && (e = e.reverse()), this.pushStack(e, a, V.call(arguments).join(","))
            }
        }), $.extend({filter: function(a, b, c) {
                return c && (a = ":not(" + a + ")"), b.length === 1 ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b)
            },dir: function(a, c, d) {
                var e = [], f = a[c];
                while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !$(f).is(d)))
                    f.nodeType === 1 && e.push(f), f = f[c];
                return e
            },sibling: function(a, b) {
                var c = [];
                for (; a; a = a.nextSibling)
                    a.nodeType === 1 && a !== b && c.push(a);
                return c
            }});
        var Nb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Ob = / jQuery\d+="(?:null|\d+)"/g, Pb = /^\s+/, Qb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rb = /<([\w:]+)/, Sb = /<tbody/i, Tb = /<|&#?\w+;/, Ub = /<(?:script|style|link)/i, Vb = /<(?:script|object|embed|option|style)/i, Wb = new RegExp("<(?:" + Nb + ")[\\s/>]", "i"), Xb = /^(?:checkbox|radio)$/, Yb = /checked\s*(?:[^=]|=\s*.checked.)/i, Zb = /\/(java|ecma)script/i, $b = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, _b = {option: [1, "<select multiple='multiple'>", "</select>"],legend: [1, "<fieldset>", "</fieldset>"],thead: [1, "<table>", "</table>"],tr: [2, "<table><tbody>", "</tbody></table>"],td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],area: [1, "<map>", "</map>"],_default: [0, "", ""]}, ac = k(P), bc = ac.appendChild(P.createElement("div"));
        _b.optgroup = _b.option, _b.tbody = _b.tfoot = _b.colgroup = _b.caption = _b.thead, _b.th = _b.td, $.support.htmlSerialize || (_b._default = [1, "X<div>", "</div>"]), $.fn.extend({text: function(a) {
                return $.access(this, function(a) {
                    return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a))
                }, null, a, arguments.length)
            },wrapAll: function(a) {
                if ($.isFunction(a))
                    return this.each(function(b) {
                        $(this).wrapAll(a.call(this, b))
                    });
                if (this[0]) {
                    var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                        var a = this;
                        while (a.firstChild && a.firstChild.nodeType === 1)
                            a = a.firstChild;
                        return a
                    }).append(this)
                }
                return this
            },wrapInner: function(a) {
                return $.isFunction(a) ? this.each(function(b) {
                    $(this).wrapInner(a.call(this, b))
                }) : this.each(function() {
                    var b = $(this), c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },wrap: function(a) {
                var b = $.isFunction(a);
                return this.each(function(c) {
                    $(this).wrapAll(b ? a.call(this, c) : a)
                })
            },unwrap: function() {
                return this.parent().each(function() {
                    $.nodeName(this, "body") || $(this).replaceWith(this.childNodes)
                }).end()
            },append: function() {
                return this.domManip(arguments, !0, function(a) {
                    (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a)
                })
            },prepend: function() {
                return this.domManip(arguments, !0, function(a) {
                    (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild)
                })
            },before: function() {
                if (!h(this[0]))
                    return this.domManip(arguments, !1, function(a) {
                        this.parentNode.insertBefore(a, this)
                    });
                if (arguments.length) {
                    var a = $.clean(arguments);
                    return this.pushStack($.merge(a, this), "before", this.selector)
                }
            },after: function() {
                if (!h(this[0]))
                    return this.domManip(arguments, !1, function(a) {
                        this.parentNode.insertBefore(a, this.nextSibling)
                    });
                if (arguments.length) {
                    var a = $.clean(arguments);
                    return this.pushStack($.merge(this, a), "after", this.selector)
                }
            },remove: function(a, b) {
                var c, d = 0;
                for (; (c = this[d]) != null; d++)
                    if (!a || $.filter(a, [c]).length)
                        !b && c.nodeType === 1 && ($.cleanData(c.getElementsByTagName("*")), $.cleanData([c])), c.parentNode && c.parentNode.removeChild(c);
                return this
            },empty: function() {
                var a, b = 0;
                for (; (a = this[b]) != null; b++) {
                    a.nodeType === 1 && $.cleanData(a.getElementsByTagName("*"));
                    while (a.firstChild)
                        a.removeChild(a.firstChild)
                }
                return this
            },clone: function(a, b) {
                return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                    return $.clone(this, a, b)
                })
            },html: function(a) {
                return $.access(this, function(a) {
                    var c = this[0] || {}, d = 0, e = this.length;
                    if (a === b)
                        return c.nodeType === 1 ? c.innerHTML.replace(Ob, "") : b;
                    if (typeof a == "string" && !Ub.test(a) && ($.support.htmlSerialize || !Wb.test(a)) && ($.support.leadingWhitespace || !Pb.test(a)) && !_b[(Rb.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = a.replace(Qb, "<$1></$2>");
                        try {
                            for (; d < e; d++)
                                c = this[d] || {}, c.nodeType === 1 && ($.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                            c = 0
                        } catch (f) {
                        }
                    }
                    c && this.empty().append(a)
                }, null, a, arguments.length)
            },replaceWith: function(a) {
                return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), "replaceWith", a) : this : $.isFunction(a) ? this.each(function(b) {
                    var c = $(this), d = c.html();
                    c.replaceWith(a.call(this, b, d))
                }) : (typeof a != "string" && (a = $(a).detach()), this.each(function() {
                    var b = this.nextSibling, c = this.parentNode;
                    $(this).remove(), b ? $(b).before(a) : $(c).append(a)
                }))
            },detach: function(a) {
                return this.remove(a, !0)
            },domManip: function(a, c, d) {
                a = [].concat.apply([], a);
                var e, f, g, h, i = 0, j = a[0], k = [], m = this.length;
                if (!$.support.checkClone && m > 1 && typeof j == "string" && Yb.test(j))
                    return this.each(function() {
                        $(this).domManip(a, c, d)
                    });
                if ($.isFunction(j))
                    return this.each(function(e) {
                        var f = $(this);
                        a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
                    });
                if (this[0]) {
                    e = $.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, g.childNodes.length === 1 && (g = f);
                    if (f) {
                        c = c && $.nodeName(f, "tr");
                        for (h = e.cacheable || m - 1; i < m; i++)
                            d.call(c && $.nodeName(this[i], "table") ? l(this[i], "tbody") : this[i], i === h ? g : $.clone(g, !0, !0))
                    }
                    g = f = null, k.length && $.each(k, function(a, b) {
                        b.src ? $.ajax ? $.ajax({url: b.src,type: "GET",dataType: "script",async: !1,global: !1,"throws": !0}) : $.error("no ajax") : $.globalEval((b.text || b.textContent || b.innerHTML || "").replace($b, "")), b.parentNode && b.parentNode.removeChild(b)
                    })
                }
                return this
            }}), $.buildFragment = function(a, c, d) {
            var e, f, g, h = a[0];
            return c = c || P, c = (c[0] || c).ownerDocument || c[0] || c, typeof c.createDocumentFragment == "undefined" && (c = P), a.length === 1 && typeof h == "string" && h.length < 512 && c === P && h.charAt(0) === "<" && !Vb.test(h) && ($.support.checkClone || !Yb.test(h)) && ($.support.html5Clone || !Wb.test(h)) && (f = !0, e = $.fragments[h], g = e !== b), e || (e = c.createDocumentFragment(), $.clean(a, c, e, d), f && ($.fragments[h] = g && e)), {fragment: e,cacheable: f}
        }, $.fragments = {}, $.each({appendTo: "append",prependTo: "prepend",insertBefore: "before",insertAfter: "after",replaceAll: "replaceWith"}, function(a, b) {
            $.fn[a] = function(c) {
                var d, e = 0, f = [], g = $(c), h = g.length, i = this.length === 1 && this[0].parentNode;
                if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1)
                    return g[b](this[0]), this;
                for (; e < h; e++)
                    d = (e > 0 ? this.clone(!0) : this).get(), $(g[e])[b](d), f = f.concat(d);
                return this.pushStack(f, a, g.selector)
            }
        }), $.extend({clone: function(a, b, c) {
                var d, e, f, g;
                $.support.html5Clone || $.isXMLDoc(a) || !Wb.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bc.innerHTML = a.outerHTML, bc.removeChild(g = bc.firstChild));
                if ((!$.support.noCloneEvent || !$.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !$.isXMLDoc(a)) {
                    n(a, g), d = o(a), e = o(g);
                    for (f = 0; d[f]; ++f)
                        e[f] && n(d[f], e[f])
                }
                if (b) {
                    m(a, g);
                    if (c) {
                        d = o(a), e = o(g);
                        for (f = 0; d[f]; ++f)
                            m(d[f], e[f])
                    }
                }
                return d = e = null, g
            },clean: function(a, b, c, d) {
                var e, f, g, h, i, j, l, m, n, o, q, r, s = 0, t = [];
                if (!b || typeof b.createDocumentFragment == "undefined")
                    b = P;
                for (f = b === P && ac; (g = a[s]) != null; s++) {
                    typeof g == "number" && (g += "");
                    if (!g)
                        continue;
                    if (typeof g == "string")
                        if (!Tb.test(g))
                            g = b.createTextNode(g);
                        else {
                            f = f || k(b), l = l || f.appendChild(b.createElement("div")), g = g.replace(Qb, "<$1></$2>"), h = (Rb.exec(g) || ["", ""])[1].toLowerCase(), i = _b[h] || _b._default, j = i[0], l.innerHTML = i[1] + g + i[2];
                            while (j--)
                                l = l.lastChild;
                            if (!$.support.tbody) {
                                m = Sb.test(g), n = h === "table" && !m ? l.firstChild && l.firstChild.childNodes : i[1] === "<table>" && !m ? l.childNodes : [];
                                for (e = n.length - 1; e >= 0; --e)
                                    $.nodeName(n[e], "tbody") && !n[e].childNodes.length && n[e].parentNode.removeChild(n[e])
                            }
                            !$.support.leadingWhitespace && Pb.test(g) && l.insertBefore(b.createTextNode(Pb.exec(g)[0]), l.firstChild), g = l.childNodes, l = f.lastChild
                        }
                    g.nodeType ? t.push(g) : t = $.merge(t, g)
                }
                l && (f.removeChild(l), g = l = f = null);
                if (!$.support.appendChecked)
                    for (s = 0; (g = t[s]) != null; s++)
                        $.nodeName(g, "input") ? p(g) : typeof g.getElementsByTagName != "undefined" && $.grep(g.getElementsByTagName("input"), p);
                if (c) {
                    q = function(a) {
                        if (!a.type || Zb.test(a.type))
                            return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a)
                    };
                    for (s = 0; (g = t[s]) != null; s++)
                        if (!$.nodeName(g, "script") || !q(g))
                            c.appendChild(g), typeof g.getElementsByTagName != "undefined" && (r = $.grep($.merge([], g.getElementsByTagName("script")), q), t.splice.apply(t, [s + 1, 0].concat(r)), s += r.length)
                }
                return t
            },cleanData: function(a, b) {
                var c, d, e, f, g = 0, h = $.expando, i = $.cache, j = $.support.deleteExpando, k = $.event.special;
                for (; (e = a[g]) != null; g++)
                    if (b || $.acceptData(e)) {
                        d = e[h], c = d && i[d];
                        if (c) {
                            if (c.events)
                                for (f in c.events)
                                    k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
                            i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, $.deletedIds.push(d))
                        }
                    }
            }}), function() {
            var a, b;
            $.uaMatch = function(a) {
                a = a.toLowerCase();
                var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
                return {browser: b[1] || "",version: b[2] || "0"}
            }, a = $.uaMatch(R.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.webkit && (b.safari = !0), $.browser = b, $.sub = function() {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }
                $.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) {
                    return d && d instanceof $ && !(d instanceof a) && (d = a(d)), $.fn.init.call(this, c, d, b)
                }, a.fn.init.prototype = a.fn;
                var b = a(P);
                return a
            }
        }();
        var cc, dc, ec, fc = /alpha\([^)]*\)/i, gc = /opacity=([^)]*)/, hc = /^(top|right|bottom|left)$/, ic = /^margin/, jc = new RegExp("^(" + _ + ")(.*)$", "i"), kc = new RegExp("^(" + _ + ")(?!px)[a-z%]+$", "i"), lc = new RegExp("^([-+])=(" + _ + ")", "i"), mc = {}, nc = {position: "absolute",visibility: "hidden",display: "block"}, oc = {letterSpacing: 0,fontWeight: 400,lineHeight: 1}, pc = ["Top", "Right", "Bottom", "Left"], qc = ["Webkit", "O", "Moz", "ms"], rc = $.fn.toggle;
        $.fn.extend({css: function(a, c) {
                return $.access(this, function(a, c, d) {
                    return d !== b ? $.style(a, c, d) : $.css(a, c)
                }, a, c, arguments.length > 1)
            },show: function() {
                return s(this, !0)
            },hide: function() {
                return s(this)
            },toggle: function(a, b) {
                var c = typeof a == "boolean";
                return $.isFunction(a) && $.isFunction(b) ? rc.apply(this, arguments) : this.each(function() {
                    (c ? a : r(this)) ? $(this).show() : $(this).hide()
                })
            }}), $.extend({cssHooks: {opacity: {get: function(a, b) {
                        if (b) {
                            var c = cc(a, "opacity");
                            return c === "" ? "1" : c
                        }
                    }}},cssNumber: {fillOpacity: !0,fontWeight: !0,lineHeight: !0,opacity: !0,orphans: !0,widows: !0,zIndex: !0,zoom: !0},cssProps: {"float": $.support.cssFloat ? "cssFloat" : "styleFloat"},style: function(a, c, d, e) {
                if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)
                    return;
                var f, g, h, i = $.camelCase(c), j = a.style;
                c = $.cssProps[i] || ($.cssProps[i] = q(j, i)), h = $.cssHooks[c] || $.cssHooks[i];
                if (d === b)
                    return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                g = typeof d, g === "string" && (f = lc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)), g = "number");
                if (d == null || g === "number" && isNaN(d))
                    return;
                g === "number" && !$.cssNumber[i] && (d += "px");
                if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b)
                    try {
                        j[c] = d
                    } catch (k) {
                    }
            },css: function(a, c, d, e) {
                var f, g, h, i = $.camelCase(c);
                return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)), h = $.cssHooks[c] || $.cssHooks[i], h && "get" in h && (f = h.get(a, !0, e)), f === b && (f = cc(a, c)), f === "normal" && c in oc && (f = oc[c]), d || e !== b ? (g = parseFloat(f), d || $.isNumeric(g) ? g || 0 : f) : f
            },swap: function(a, b, c) {
                var d, e, f = {};
                for (e in b)
                    f[e] = a.style[e], a.style[e] = b[e];
                d = c.call(a);
                for (e in b)
                    a.style[e] = f[e];
                return d
            }}), a.getComputedStyle ? cc = function(a, b) {
            var c, d, e, f, g = getComputedStyle(a, null), h = a.style;
            return g && (c = g[b], c === "" && !$.contains(a.ownerDocument.documentElement, a) && (c = $.style(a, b)), kc.test(c) && ic.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)), c
        } : P.documentElement.currentStyle && (cc = function(a, b) {
            var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
            return e == null && f && f[b] && (e = f[b]), kc.test(e) && !hc.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), e === "" ? "auto" : e
        }), $.each(["height", "width"], function(a, b) {
            $.cssHooks[b] = {get: function(a, c, d) {
                    if (c)
                        return a.offsetWidth !== 0 || cc(a, "display") !== "none" ? v(a, b, d) : $.swap(a, nc, function() {
                            return v(a, b, d)
                        })
                },set: function(a, c, d) {
                    return t(a, c, d ? u(a, b, d, $.support.boxSizing && $.css(a, "boxSizing") === "border-box") : 0)
                }}
        }), $.support.opacity || ($.cssHooks.opacity = {get: function(a, b) {
                return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
            },set: function(a, b) {
                var c = a.style, d = a.currentStyle, e = $.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", f = d && d.filter || c.filter || "";
                c.zoom = 1;
                if (b >= 1 && $.trim(f.replace(fc, "")) === "" && c.removeAttribute) {
                    c.removeAttribute("filter");
                    if (d && !d.filter)
                        return
                }
                c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e
            }}), $(function() {
            $.support.reliableMarginRight || ($.cssHooks.marginRight = {get: function(a, b) {
                    return $.swap(a, {display: "inline-block"}, function() {
                        if (b)
                            return cc(a, "marginRight")
                    })
                }}), !$.support.pixelPosition && $.fn.position && $.each(["top", "left"], function(a, b) {
                $.cssHooks[b] = {get: function(a, c) {
                        if (c) {
                            var d = cc(a, b);
                            return kc.test(d) ? $(a).position()[b] + "px" : d
                        }
                    }}
            })
        }), $.expr && $.expr.filters && ($.expr.filters.hidden = function(a) {
            return a.offsetWidth === 0 && a.offsetHeight === 0 || !$.support.reliableHiddenOffsets && (a.style && a.style.display || cc(a, "display")) === "none"
        }, $.expr.filters.visible = function(a) {
            return !$.expr.filters.hidden(a)
        }), $.each({margin: "",padding: "",border: "Width"}, function(a, b) {
            $.cssHooks[a + b] = {expand: function(c) {
                    var d, e = typeof c == "string" ? c.split(" ") : [c], f = {};
                    for (d = 0; d < 4; d++)
                        f[a + pc[d] + b] = e[d] || e[d - 2] || e[0];
                    return f
                }}, ic.test(a) || ($.cssHooks[a + b].set = t)
        });
        var sc = /%20/g, tc = /\[\]$/, uc = /\r?\n/g, vc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, wc = /^(?:select|textarea)/i;
        $.fn.extend({serialize: function() {
                return $.param(this.serializeArray())
            },serializeArray: function() {
                return this.map(function() {
                    return this.elements ? $.makeArray(this.elements) : this
                }).filter(function() {
                    return this.name && !this.disabled && (this.checked || wc.test(this.nodeName) || vc.test(this.type))
                }).map(function(a, b) {
                    var c = $(this).val();
                    return c == null ? null : $.isArray(c) ? $.map(c, function(a, c) {
                        return {name: b.name,value: a.replace(uc, "\r\n")}
                    }) : {name: b.name,value: c.replace(uc, "\r\n")}
                }).get()
            }}), $.param = function(a, c) {
            var d, e = [], f = function(a, b) {
                b = $.isFunction(b) ? b() : b == null ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional);
            if ($.isArray(a) || a.jquery && !$.isPlainObject(a))
                $.each(a, function() {
                    f(this.name, this.value)
                });
            else
                for (d in a)
                    x(d, a[d], c, f);
            return e.join("&").replace(sc, "+")
        };
        var xc, yc, zc = /#.*$/, Ac = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, Bc = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Cc = /^(?:GET|HEAD)$/, Dc = /^\/\//, Ec = /\?/, Fc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Gc = /([?&])_=[^&]*/, Hc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Ic = $.fn.load, Jc = {}, Kc = {}, Lc = ["*/"] + ["*"];
        try {
            xc = Q.href
        } catch (Mc) {
            xc = P.createElement("a"), xc.href = "", xc = xc.href
        }
        yc = Hc.exec(xc.toLowerCase()) || [], $.fn.load = function(a, c, d) {
            if (typeof a != "string" && Ic)
                return Ic.apply(this, arguments);
            if (!this.length)
                return this;
            var e, f, g, h = this, i = a.indexOf(" ");
            return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), $.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (f = "POST"), $.ajax({url: a,type: f,dataType: "html",data: c,complete: function(a, b) {
                    d && h.each(d, g || [a.responseText, b, a])
                }}).done(function(a) {
                g = arguments, h.html(e ? $("<div>").append(a.replace(Fc, "")).find(e) : a)
            }), this
        }, $.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
            $.fn[b] = function(a) {
                return this.on(b, a)
            }
        }), $.each(["get", "post"], function(a, c) {
            $[c] = function(a, d, e, f) {
                return $.isFunction(d) && (f = f || e, e = d, d = b), $.ajax({type: c,url: a,data: d,success: e,dataType: f})
            }
        }), $.extend({getScript: function(a, c) {
                return $.get(a, b, c, "script")
            },getJSON: function(a, b, c) {
                return $.get(a, b, c, "json")
            },ajaxSetup: function(a, b) {
                return b ? A(a, $.ajaxSettings) : (b = a, a = $.ajaxSettings), A(a, b), a
            },ajaxSettings: {url: xc,isLocal: Bc.test(yc[1]),global: !0,type: "GET",contentType: "application/x-www-form-urlencoded; charset=UTF-8",processData: !0,async: !0,accepts: {xml: "application/xml, text/xml",html: "text/html",text: "text/plain",json: "application/json, text/javascript","*": Lc},contents: {xml: /xml/,html: /html/,json: /json/},responseFields: {xml: "responseXML",text: "responseText"},converters: {"* text": a.String,"text html": !0,"text json": $.parseJSON,"text xml": $.parseXML},flatOptions: {context: !0,url: !0}},ajaxPrefilter: y(Jc),ajaxTransport: y(Kc),ajax: function(a, c) {
                function d(a, c, d, g) {
                    var j, l, s, t, v, x = c;
                    if (u === 2)
                        return;
                    u = 2, i && clearTimeout(i), h = b, f = g || "", w.readyState = a > 0 ? 4 : 0, d && (t = B(m, w, d));
                    if (a >= 200 && a < 300 || a === 304)
                        m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && ($.lastModified[e] = v), v = w.getResponseHeader("Etag"), v && ($.etag[e] = v)), a === 304 ? (x = "notmodified", j = !0) : (j = C(m, t), x = j.state, l = j.data, s = j.error, j = !s);
                    else {
                        s = x;
                        if (!x || a)
                            x = "error", a < 0 && (a = 0)
                    }
                    w.status = a, w.statusText = "" + (c || x), j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger("ajax" + (j ? "Success" : "Error"), [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --$.active || $.event.trigger("ajaxStop"))
                }
                typeof a == "object" && (c = a, a = b), c = c || {};
                var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c), n = m.context || m, o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event, p = $.Deferred(), q = $.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {readyState: 0,setRequestHeader: function(a, b) {
                        if (!u) {
                            var c = a.toLowerCase();
                            a = t[c] = t[c] || a, s[a] = b
                        }
                        return this
                    },getAllResponseHeaders: function() {
                        return u === 2 ? f : null
                    },getResponseHeader: function(a) {
                        var c;
                        if (u === 2) {
                            if (!g) {
                                g = {};
                                while (c = Ac.exec(f))
                                    g[c[1].toLowerCase()] = c[2]
                            }
                            c = g[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },overrideMimeType: function(a) {
                        return u || (m.mimeType = a), this
                    },abort: function(a) {
                        return a = a || v, h && h.abort(a), d(0, a), this
                    }};
                p.promise(w), w.success = w.done, w.error = w.fail, w.complete = q.add, w.statusCode = function(a) {
                    if (a) {
                        var b;
                        if (u < 2)
                            for (b in a)
                                r[b] = [r[b], a[b]];
                        else
                            b = a[w.status], w.always(b)
                    }
                    return this
                }, m.url = ((a || m.url) + "").replace(zc, "").replace(Dc, yc[1] + "//"), m.dataTypes = $.trim(m.dataType || "*").toLowerCase().split(bb), m.crossDomain == null && (j = Hc.exec(m.url.toLowerCase()), m.crossDomain = !(!j || j[1] == yc[1] && j[2] == yc[2] && (j[3] || (j[1] === "http:" ? 80 : 443)) == (yc[3] || (yc[1] === "http:" ? 80 : 443)))), m.data && m.processData && typeof m.data != "string" && (m.data = $.param(m.data, m.traditional)), z(Jc, m, c, w);
                if (u === 2)
                    return w;
                k = m.global, m.type = m.type.toUpperCase(), m.hasContent = !Cc.test(m.type), k && $.active++ === 0 && $.event.trigger("ajaxStart");
                if (!m.hasContent) {
                    m.data && (m.url += (Ec.test(m.url) ? "&" : "?") + m.data, delete m.data), e = m.url;
                    if (m.cache === !1) {
                        var x = $.now(), y = m.url.replace(Gc, "$1_=" + x);
                        m.url = y + (y === m.url ? (Ec.test(m.url) ? "&" : "?") + "_=" + x : "")
                    }
                }
                (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), m.ifModified && (e = e || m.url, $.lastModified[e] && w.setRequestHeader("If-Modified-Since", $.lastModified[e]), $.etag[e] && w.setRequestHeader("If-None-Match", $.etag[e])), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + (m.dataTypes[0] !== "*" ? ", " + Lc + "; q=0.01" : "") : m.accepts["*"]);
                for (l in m.headers)
                    w.setRequestHeader(l, m.headers[l]);
                if (!m.beforeSend || m.beforeSend.call(n, w, m) !== !1 && u !== 2) {
                    v = "abort";
                    for (l in {success: 1,error: 1,complete: 1})
                        w[l](m[l]);
                    h = z(Kc, m, c, w);
                    if (!h)
                        d(-1, "No Transport");
                    else {
                        w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function() {
                            w.abort("timeout")
                        }, m.timeout));
                        try {
                            u = 1, h.send(s, d)
                        } catch (A) {
                            if (!(u < 2))
                                throw A;
                            d(-1, A)
                        }
                    }
                    return w
                }
                return w.abort()
            },active: 0,lastModified: {},etag: {}});
        var Nc = [], Oc = /\?/, Pc = /(=)\?(?=&|$)|\?\?/, Qc = $.now();
        $.ajaxSetup({jsonp: "callback",jsonpCallback: function() {
                var a = Nc.pop() || $.expando + "_" + Qc++;
                return this[a] = !0, a
            }}), $.ajaxPrefilter("json jsonp", function(c, d, e) {
            var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && Pc.test(j), m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Pc.test(i);
            if (c.dataTypes[0] === "jsonp" || l || m)
                return f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(Pc, "$1" + f) : m ? c.data = i.replace(Pc, "$1" + f) : k && (c.url += (Oc.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
                    return h || $.error(f + " was not called"), h[0]
                }, c.dataTypes[0] = "json", a[f] = function() {
                    h = arguments
                }, e.always(function() {
                    a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Nc.push(f)), h && $.isFunction(g) && g(h[0]), h = g = b
                }), "script"
        }), $.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents: {script: /javascript|ecmascript/},converters: {"text script": function(a) {
                    return $.globalEval(a), a
                }}}), $.ajaxPrefilter("script", function(a) {
            a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
        }), $.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var c, d = P.head || P.getElementsByTagName("head")[0] || P.documentElement;
                return {send: function(e, f) {
                        c = P.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, e) {
                            if (e || !c.readyState || /loaded|complete/.test(c.readyState))
                                c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success")
                        }, d.insertBefore(c, d.firstChild)
                    },abort: function() {
                        c && c.onload(0, 1)
                    }}
            }
        });
        var Rc, Sc = a.ActiveXObject ? function() {
            for (var a in Rc)
                Rc[a](0, 1)
        } : !1, Tc = 0;
        $.ajaxSettings.xhr = a.ActiveXObject ? function() {
            return !this.isLocal && D() || E()
        } : D, function(a) {
            $.extend($.support, {ajax: !!a,cors: !!a && "withCredentials" in a})
        }($.ajaxSettings.xhr()), $.support.ajax && $.ajaxTransport(function(c) {
            if (!c.crossDomain || $.support.cors) {
                var d;
                return {send: function(e, f) {
                        var g, h, i = c.xhr();
                        c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async);
                        if (c.xhrFields)
                            for (h in c.xhrFields)
                                i[h] = c.xhrFields[h];
                        c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (h in e)
                                i.setRequestHeader(h, e[h])
                        } catch (j) {
                        }
                        i.send(c.hasContent && c.data || null), d = function(a, e) {
                            var h, j, k, l, m;
                            try {
                                if (d && (e || i.readyState === 4)) {
                                    d = b, g && (i.onreadystatechange = $.noop, Sc && delete Rc[g]);
                                    if (e)
                                        i.readyState !== 4 && i.abort();
                                    else {
                                        h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);
                                        try {
                                            l.text = i.responseText
                                        } catch (a) {
                                        }
                                        try {
                                            j = i.statusText
                                        } catch (n) {
                                            j = ""
                                        }
                                        !h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204)
                                    }
                                }
                            } catch (o) {
                                e || f(-1, o)
                            }
                            l && f(h, j, l, k)
                        }, c.async ? i.readyState === 4 ? setTimeout(d, 0) : (g = ++Tc, Sc && (Rc || (Rc = {}, $(a).unload(Sc)), Rc[g] = d), i.onreadystatechange = d) : d()
                    },abort: function() {
                        d && d(0, 1)
                    }}
            }
        });
        var Uc, Vc, Wc = /^(?:toggle|show|hide)$/, Xc = new RegExp("^(?:([-+])=|)(" + _ + ")([a-z%]*)$", "i"), Yc = /queueHooks$/, Zc = [J], $c = {"*": [function(a, b) {
                    var c, d, e, f = this.createTween(a, b), g = Xc.exec(b), h = f.cur(), i = +h || 0, j = 1;
                    if (g) {
                        c = +g[2], d = g[3] || ($.cssNumber[a] ? "" : "px");
                        if (d !== "px" && i) {
                            i = $.css(f.elem, a, !0) || c || 1;
                            do
                                e = j = j || ".5", i /= j, $.style(f.elem, a, i + d), j = f.cur() / h;
                            while (j !== 1 && j !== e)
                        }
                        f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c
                    }
                    return f
                }]};
        $.Animation = $.extend(H, {tweener: function(a, b) {
                $.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                var c, d = 0, e = a.length;
                for (; d < e; d++)
                    c = a[d], $c[c] = $c[c] || [], $c[c].unshift(b)
            },prefilter: function(a, b) {
                b ? Zc.unshift(a) : Zc.push(a)
            }}), $.Tween = K, K.prototype = {constructor: K,init: function(a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ($.cssNumber[c] ? "" : "px")
            },cur: function() {
                var a = K.propHooks[this.prop];
                return a && a.get ? a.get(this) : K.propHooks._default.get(this)
            },run: function(a) {
                var b, c = K.propHooks[this.prop];
                return this.pos = b = $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration), this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
            }}, K.prototype.init.prototype = K.prototype, K.propHooks = {_default: {get: function(a) {
                    var b;
                    return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = $.css(a.elem, a.prop, !1, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop]
                },set: function(a) {
                    $.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (a.elem.style[$.cssProps[a.prop]] != null || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                }}}, K.propHooks.scrollTop = K.propHooks.scrollLeft = {set: function(a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }}, $.each(["toggle", "show", "hide"], function(a, b) {
            var c = $.fn[b];
            $.fn[b] = function(d, e, f) {
                return d == null || typeof d == "boolean" || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f)
            }
        }), $.fn.extend({fadeTo: function(a, b, c, d) {
                return this.filter(r).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
            },animate: function(a, b, c, d) {
                var e = $.isEmptyObject(a), f = $.speed(b, c, d), g = function() {
                    var b = H(this, $.extend({}, a), f);
                    e && b.stop(!0)
                };
                return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },stop: function(a, c, d) {
                var e = function(a) {
                    var b = a.stop;
                    delete a.stop, b(d)
                };
                return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0, c = a != null && a + "queueHooks", f = $.timers, g = $._data(this);
                    if (c)
                        g[c] && g[c].stop && e(g[c]);
                    else
                        for (c in g)
                            g[c] && g[c].stop && Yc.test(c) && e(g[c]);
                    for (c = f.length; c--; )
                        f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                    (b || !d) && $.dequeue(this, a)
                })
            }}), $.each({slideDown: L("show"),slideUp: L("hide"),slideToggle: L("toggle"),fadeIn: {opacity: "show"},fadeOut: {opacity: "hide"},fadeToggle: {opacity: "toggle"}}, function(a, b) {
            $.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), $.speed = function(a, b, c) {
            var d = a && typeof a == "object" ? $.extend({}, a) : {complete: c || !c && b || $.isFunction(a) && a,duration: a,easing: c && b || b && !$.isFunction(b) && b};
            d.duration = $.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default;
            if (d.queue == null || d.queue === !0)
                d.queue = "fx";
            return d.old = d.complete, d.complete = function() {
                $.isFunction(d.old) && d.old.call(this), d.queue && $.dequeue(this, d.queue)
            }, d
        }, $.easing = {linear: function(a) {
                return a
            },swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }}, $.timers = [], $.fx = K.prototype.init, $.fx.tick = function() {
            var a, b = $.timers, c = 0;
            for (; c < b.length; c++)
                a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || $.fx.stop()
        }, $.fx.timer = function(a) {
            a() && $.timers.push(a) && !Vc && (Vc = setInterval($.fx.tick, $.fx.interval))
        }, $.fx.interval = 13, $.fx.stop = function() {
            clearInterval(Vc), Vc = null
        }, $.fx.speeds = {slow: 600,fast: 200,_default: 400}, $.fx.step = {}, $.expr && $.expr.filters && ($.expr.filters.animated = function(a) {
            return $.grep($.timers, function(b) {
                return a === b.elem
            }).length
        });
        var _c = /^(?:body|html)$/i;
        $.fn.offset = function(a) {
            if (arguments.length)
                return a === b ? this : this.each(function(b) {
                    $.offset.setOffset(this, a, b)
                });
            var c, d, e, f, g, h, i, j, k, l, m = this[0], n = m && m.ownerDocument;
            if (!n)
                return;
            return (e = n.body) === m ? $.offset.bodyOffset(m) : (d = n.documentElement, $.contains(d, m) ? (c = m.getBoundingClientRect(), f = M(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, {top: k,left: l}) : {top: 0,left: 0})
        }, $.offset = {bodyOffset: function(a) {
                var b = a.offsetTop, c = a.offsetLeft;
                return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, "marginTop")) || 0, c += parseFloat($.css(a, "marginLeft")) || 0), {top: b,left: c}
            },setOffset: function(a, b, c) {
                var d = $.css(a, "position");
                d === "static" && (a.style.position = "relative");
                var e = $(a), f = e.offset(), g = $.css(a, "top"), h = $.css(a, "left"), i = (d === "absolute" || d === "fixed") && $.inArray("auto", [g, h]) > -1, j = {}, k = {}, l, m;
                i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), $.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
            }}, $.fn.extend({position: function() {
                if (!this[0])
                    return;
                var a = this[0], b = this.offsetParent(), c = this.offset(), d = _c.test(b[0].nodeName) ? {top: 0,left: 0} : b.offset();
                return c.top -= parseFloat($.css(a, "marginTop")) || 0, c.left -= parseFloat($.css(a, "marginLeft")) || 0, d.top += parseFloat($.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat($.css(b[0], "borderLeftWidth")) || 0, {top: c.top - d.top,left: c.left - d.left}
            },offsetParent: function() {
                return this.map(function() {
                    var a = this.offsetParent || P.body;
                    while (a && !_c.test(a.nodeName) && $.css(a, "position") === "static")
                        a = a.offsetParent;
                    return a || P.body
                })
            }}), $.each({scrollLeft: "pageXOffset",scrollTop: "pageYOffset"}, function(a, c) {
            var d = /Y/.test(c);
            $.fn[a] = function(e) {
                return $.access(this, function(a, e, f) {
                    var g = M(a);
                    if (f === b)
                        return g ? c in g ? g[c] : g.document.documentElement[e] : a[e];
                    g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f
                }, a, e, arguments.length, null)
            }
        }), $.each({Height: "height",Width: "width"}, function(a, c) {
            $.each({padding: "inner" + a,content: c,"": "outer" + a}, function(d, e) {
                $.fn[e] = function(e, f) {
                    var g = arguments.length && (d || typeof e != "boolean"), h = d || (e === !0 || f === !0 ? "margin" : "border");
                    return $.access(this, function(c, d, e) {
                        var f;
                        return $.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h)
                    }, c, g ? e : b, g)
                }
            })
        }), a.jQuery = a.$ = $, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
            return $
        })
    })(window);
    var a = function() {
        function e(f, g, h) {
            typeof f == "undefined" ? f = "p" : f = f.toString().toLowerCase(), typeof g == "undefined" && (g = "mm"), typeof h == "undefined" && (h = "a4");
            var i = h.toString().toLowerCase(), j = "20120619", k = [], l = 0, m = "1.3", n = {a3: [841.89, 1190.55],a4: [595.28, 841.89],a5: [420.94, 595.28],letter: [612, 792],legal: [612, 1008]}, o = "0 g", p = "0 G", q = 0, s = [], t = 2, u = !1, v = [], w = {}, x = {}, y = 16, z, A = .200025, B, C, D, E = {title: "",subject: "",author: "",keywords: "",creator: ""}, F = 0, G = 0, H = {}, I = new d(H);
            if (g == "pt")
                D = 1;
            else if (g == "mm")
                D = 72 / 25.4;
            else if (g == "cm")
                D = 72 / 2.54;
            else {
                if (g != "in")
                    throw "Invalid unit: " + g;
                D = 72
            }
            if (i in n)
                B = n[i][1] / D, C = n[i][0] / D;
            else
                try {
                    B = h[1], C = h[0]
                } catch (J) {
                    throw "Invalid format: " + h
                }
            if (f === "p" || f === "portrait") {
                f = "p";
                if (C > B) {
                    var K = C;
                    C = B, B = K
                }
            } else {
                if (f !== "l" && f !== "landscape")
                    throw "Invalid orientation: " + f;
                f = "l";
                if (B > C) {
                    var K = C;
                    C = B, B = K
                }
            }
            var L = function(a) {
                return a.toFixed(2)
            }, M = function(a) {
                return a.toFixed(3)
            }, N = function(a) {
                var b = a.toFixed(0);
                return a < 10 ? "0" + b : b
            }, O = function(a) {
                var b = a.toFixed(0);
                return b.length < 10 ? (new Array(11 - b.length)).join("0") + b : b
            }, P = function(a) {
                u ? s[q].push(a) : (k.push(a), l += a.length + 1)
            }, Q = function() {
                return t++, v[t] = l, P(t + " 0 obj"), t
            }, R = function() {
                var a = C * D, b = B * D, c, d;
                for (c = 1; c <= q; c++)
                    Q(), P("<</Type /Page"), P("/Parent 1 0 R"), P("/Resources 2 0 R"), P("/Contents " + (t + 1) + " 0 R>>"), P("endobj"), d = s[c].join("\n"), Q(), P("<</Length " + d.length + ">>"), S(d), P("endobj");
                v[1] = l, P("1 0 obj"), P("<</Type /Pages");
                var e = "/Kids [";
                for (var f = 0; f < q; f++)
                    e += 3 + 2 * f + " 0 R ";
                P(e + "]"), P("/Count " + q), P("/MediaBox [0 0 " + L(a) + " " + L(b) + "]"), P(">>"), P("endobj")
            }, S = function(a) {
                P("stream"), P(a), P("endstream")
            }, T = function() {
                U(), I.publish("putResources"), v[2] = l, P("2 0 obj"), P("<<"), _(), P(">>"), P("endobj")
            }, U = function() {
                for (var a in w)
                    w.hasOwnProperty(a) && V(w[a])
            }, V = function(a) {
                a.objectNumber = Q(), P("<</BaseFont/" + a.PostScriptName + "/Type/Font"), typeof a.encoding == "string" && P("/Encoding/" + a.encoding), P("/Subtype/Type1>>"), P("endobj")
            }, W = function(a, b, c) {
                var d;
                x[b] === d && (x[b] = {}), x[b][c] = a
            }, X = {}, Y = function(b, c, d, e) {
                var f = "F" + (a(w) + 1).toString(10), g = w[f] = {id: f,PostScriptName: b,fontName: c,fontStyle: d,encoding: e,metadata: {}};
                return W(f, c, d), I.publish("addFont", g), f
            }, Z = function() {
                var a = "helvetica", b = "times", c = "courier", d = "normal", e = "bold", f = "italic", g = "bolditalic", h = "StandardEncoding", i = [["Helvetica", a, d], ["Helvetica-Bold", a, e], ["Helvetica-Oblique", a, f], ["Helvetica-BoldOblique", a, g], ["Courier", c, d], ["Courier-Bold", c, e], ["Courier-Oblique", c, f], ["Courier-BoldOblique", c, g], ["Times-Roman", b, d], ["Times-Bold", b, e], ["Times-Italic", b, f], ["Times-BoldItalic", b, g]], j, k, l, m;
                for (j = 0, k = i.length; j < k; j++)
                    l = Y(i[j][0], i[j][1], i[j][2], h), m = i[j][0].split("-"), W(l, m[0], m[1] || "");
                I.publish("addFonts", {fonts: w,dictionary: x})
            }, _ = function() {
                P("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"), P("/Font <<");
                for (var a in w)
                    w.hasOwnProperty(a) && P("/" + a + " " + w[a].objectNumber + " 0 R");
                P(">>"), P("/XObject <<"), ab(), P(">>")
            }, ab = function() {
                I.publish("putXobjectDict")
            }, bb = function() {
                P("/Producer (jsPDF " + j + ")"), E.title && P("/Title (" + jb(E.title) + ")"), E.subject && P("/Subject (" + jb(E.subject) + ")"), E.author && P("/Author (" + jb(E.author) + ")"), E.keywords && P("/Keywords (" + jb(E.keywords) + ")"), E.creator && P("/Creator (" + jb(E.creator) + ")");
                var a = new Date;
                P("/CreationDate (D:" + [a.getFullYear(), N(a.getMonth() + 1), N(a.getDate()), N(a.getHours()), N(a.getMinutes()), N(a.getSeconds())].join("") + ")")
            }, cb = function() {
                P("/Type /Catalog"), P("/Pages 1 0 R"), P("/OpenAction [3 0 R /FitH null]"), P("/PageLayout /OneColumn")
            }, db = function() {
                P("/Size " + (t + 1)), P("/Root " + t + " 0 R"), P("/Info " + (t - 1) + " 0 R")
            }, eb = function() {
                q++, u = !0, s[q] = []
            }, fb = function() {
                eb(), P(L(A * D) + " w"), P(p), F !== 0 && P(F.toString(10) + " J"), G !== 0 && P(G.toString(10) + " j"), I.publish("addPage", {pageNumber: q})
            }, gb = function(a, b) {
                var c, d;
                a === d && (a = w[z].fontName), b === d && (b = w[z].fontStyle);
                try {
                    c = x[a][b]
                } catch (e) {
                    c = d
                }
                if (!c)
                    throw new Error("Unable to look up font label for font '" + a + "', '" + b + "'. Refer to getFontList() for available fonts.");
                return c
            }, hb = function() {
                u = !1, k = [], v = [], P("%PDF-" + m), R(), T(), Q(), P("<<"), bb(), P(">>"), P("endobj"), Q(), P("<<"), cb(), P(">>"), P("endobj");
                var a = l;
                P("xref"), P("0 " + (t + 1)), P("0000000000 65535 f ");
                for (var b = 1; b <= t; b++)
                    P(O(v[b]) + " 00000 n ");
                return P("trailer"), P("<<"), db(), P(">>"), P("startxref"), P(a), P("%%EOF"), u = !0, k.join("\n")
            }, ib = function(a, b) {
                var c, d, e;
                b === e && (b = {});
                var f = b.sourceEncoding ? f : "Unicode", g, h = b.outputEncoding, i, j, k, l;
                if ((b.autoencode || h) && w[z].metadata && w[z].metadata[f] && w[z].metadata[f].encoding) {
                    g = w[z].metadata[f].encoding, !h && w[z].encoding && (h = w[z].encoding), !h && g.codePages && (h = g.codePages[0]), typeof h == "string" && (h = g[h]);
                    if (h) {
                        j = !1, i = [];
                        for (c = 0, d = a.length; c < d; c++)
                            k = h[a.charCodeAt(c)], k ? i.push(String.fromCharCode(k)) : i.push(a[c]), i[c].charCodeAt(0) >> 8 && (j = !0);
                        a = i.join("")
                    }
                }
                c = a.length;
                while (j === e && c !== 0)
                    a.charCodeAt(c - 1) >> 8 && (j = !0), c--;
                if (!j)
                    return a;
                i = b.noBOM ? [] : [254, 255];
                for (c = 0, d = a.length; c < d; c++) {
                    k = a.charCodeAt(c), l = k >> 8;
                    if (l >> 8)
                        throw new Error("Character at position " + c.toString(10) + " of string '" + a + "' exceeds 16bits. Cannot be encoded into UCS-2 BE");
                    i.push(l), i.push(k - (l << 8))
                }
                return String.fromCharCode.apply(e, i)
            }, jb = function(a, b) {
                return ib(a, b).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
            }, kb = function(a) {
                var b = "S";
                if (a === "F")
                    b = "f";
                else if (a === "FD" || a === "DF")
                    b = "B";
                return b
            };
            H.internal = {pdfEscape: jb,getStyle: kb,getFont: function() {
                    return w[gb.apply(H, arguments)]
                },getFontSize: function() {
                    return y
                },btoa: btoa,write: function(a, b, c, d) {
                    P(arguments.length === 1 ? arguments[0] : Array.prototype.join.call(arguments, " "))
                },getCoordinateString: function(a) {
                    return L(a * D)
                },getVerticalCoordinateString: function(a) {
                    return L((B - a) * D)
                },collections: {},newObject: Q,putStream: S,events: I,scaleFactor: D,pageSize: {width: C,height: B},output: function(a, b) {
                    return lb(a, b)
                }}, H.addPage = function() {
                return fb(), this
            }, H.text = function(a, b, c, d) {
                var e, f, g, h;
                typeof arguments[0] == "number" && (f = arguments[2], g = arguments[0], h = arguments[1], a = f, b = g, c = h), typeof a == "string" && a.match(/[\n\r]/) && (a = a.split(/\r\n|\r|\n/g)), typeof d == "undefined" ? d = {noBOM: !0,autoencode: !0} : (d.noBOM === e && (d.noBOM = !0), d.autoencode === e && (d.autoencode = !0));
                var i, j;
                if (typeof a == "string")
                    j = jb(a, d);
                else {
                    if (!(a instanceof Array))
                        throw new Error('Type of text must be string or Array. "' + a + '" is not recognized.');
                    i = a.concat();
                    for (var k = i.length - 1; k !== -1; k--)
                        i[k] = jb(i[k], d);
                    j = i.join(") Tj\nT* (")
                }
                return P("BT\n/" + z + " " + y + " Tf\n" + y + " TL\n" + o + "\n" + L(b * D) + " " + L((B - c) * D) + " Td\n(" + j + ") Tj\nET"), this
            }, H.line = function(a, b, c, d) {
                return P(L(a * D) + " " + L((B - b) * D) + " m " + L(c * D) + " " + L((B - d) * D) + " l S"), this
            }, H.lines = function(a, b, c, d, e) {
                var f, g, h, i;
                typeof arguments[0] == "number" && (g = arguments[2], h = arguments[0], i = arguments[1], a = g, b = h, c = i), e = kb(e), d = d === f ? [1, 1] : d, P(M(b * D) + " " + M((B - c) * D) + " m ");
                var j = d[0], k = d[1], l = 0, m = a.length, n, o, p, q, r, s = b, t = c;
                for (; l < m; l++)
                    n = a[l], n.length === 2 ? (s = n[0] * j + s, t = n[1] * k + t, P(M(s * D) + " " + M((B - t) * D) + " l")) : (o = n[0] * j + s, p = n[1] * k + t, q = n[2] * j + s, r = n[3] * k + t, s = n[4] * j + s, t = n[5] * k + t, P(M(o * D) + " " + M((B - p) * D) + " " + M(q * D) + " " + M((B - r) * D) + " " + M(s * D) + " " + M((B - t) * D) + " c"));
                return P(e), this
            }, H.rect = function(a, b, c, d, e) {
                var f = kb(e);
                return P([L(a * D), L((B - b) * D), L(c * D), L(-d * D), "re", f].join(" ")), this
            }, H.triangle = function(a, b, c, d, e, f, g) {
                return this.lines([[c - a, d - b], [e - c, f - d], [a - e, b - f]], a, b, [1, 1], g), this
            }, H.roundedRect = function(a, b, c, d, e, f, g) {
                var h = 4 / 3 * (Math.SQRT2 - 1);
                return this.lines([[c - 2 * e, 0], [e * h, 0, e, f - f * h, e, f], [0, d - 2 * f], [0, f * h, -(e * h), f, -e, f], [-c + 2 * e, 0], [-(e * h), 0, -e, -(f * h), -e, -f], [0, -d + 2 * f], [0, -(f * h), e * h, -f, e, -f]], a + e, b, [1, 1], g), this
            }, H.ellipse = function(a, b, c, d, e) {
                var f = kb(e), g = 4 / 3 * (Math.SQRT2 - 1) * c, h = 4 / 3 * (Math.SQRT2 - 1) * d;
                return P([L((a + c) * D), L((B - b) * D), "m", L((a + c) * D), L((B - (b - h)) * D), L((a + g) * D), L((B - (b - d)) * D), L(a * D), L((B - (b - d)) * D), "c"].join(" ")), P([L((a - g) * D), L((B - (b - d)) * D), L((a - c) * D), L((B - (b - h)) * D), L((a - c) * D), L((B - b) * D), "c"].join(" ")), P([L((a - c) * D), L((B - (b + h)) * D), L((a - g) * D), L((B - (b + d)) * D), L(a * D), L((B - (b + d)) * D), "c"].join(" ")), P([L((a + g) * D), L((B - (b + d)) * D), L((a + c) * D), L((B - (b + h)) * D), L((a + c) * D), L((B - b) * D), "c", f].join(" ")), this
            }, H.circle = function(a, b, c, d) {
                return this.ellipse(a, b, c, c, d)
            }, H.setProperties = function(a) {
                for (var b in E)
                    E.hasOwnProperty(b) && a[b] && (E[b] = a[b]);
                return this
            }, H.setFontSize = function(a) {
                return y = a, this
            }, H.setFont = function(a, b) {
                return z = gb(a, b), this
            }, H.setFontStyle = H.setFontType = function(a) {
                var b;
                return z = gb(b, a), this
            }, H.getFontList = function() {
                var a = {}, b, c, d;
                for (b in x)
                    if (x.hasOwnProperty(b)) {
                        a[b] = d = [];
                        for (c in x[b])
                            x[b].hasOwnProperty(c) && d.push(c)
                    }
                return a
            }, H.setLineWidth = function(a) {
                return P((a * D).toFixed(2) + " w"), this
            }, H.setDrawColor = function(a, b, c, d) {
                var e, f;
                return b === e || d === e && a === b === c ? typeof a == "string" ? f = a + " G" : f = L(a / 255) + " G" : d === e ? typeof a == "string" ? f = [a, b, c, "RG"].join(" ") : f = [L(a / 255), L(b / 255), L(c / 255), "RG"].join(" ") : typeof a == "string" ? f = [a, b, c, d, "K"].join(" ") : f = [L(a), L(b), L(c), L(d), "K"].join(" "), P(f), this
            }, H.setFillColor = function(a, b, c, d) {
                var e, f;
                return b === e || d === e && a === b === c ? typeof a == "string" ? f = a + " g" : f = L(r / 255) + " g" : d === e ? typeof a == "string" ? f = [a, b, c, "rg"].join(" ") : f = [L(a / 255), L(b / 255), L(c / 255), "rg"].join(" ") : typeof a == "string" ? f = [a, b, c, d, "k"].join(" ") : f = [L(a), L(b), L(c), L(d), "k"].join(" "), P(f), this
            }, H.setTextColor = function(a, b, c) {
                return a === 0 && b === 0 && c === 0 || typeof b == "undefined" ? o = M(a / 255) + " g" : o = [M(a / 255), M(b / 255), M(c / 255), "rg"].join(" "), this
            }, H.CapJoinStyles = {0: 0,butt: 0,but: 0,bevel: 0,1: 1,round: 1,rounded: 1,circle: 1,2: 2,projecting: 2,project: 2,square: 2,milter: 2}, H.setLineCap = function(a) {
                var b, c = this.CapJoinStyles[a];
                if (c === b)
                    throw new Error("Line cap style of '" + a + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
                return F = c, P(c.toString(10) + " J"), this
            }, H.setLineJoin = function(a) {
                var b, c = this.CapJoinStyles[a];
                if (c === b)
                    throw new Error("Line join style of '" + a + "' is not recognized. See or extend .CapJoinStyles property for valid styles");
                return G = c, P(c.toString(10) + " j"), this
            };
            var lb = function(a, d) {
                var e;
                switch (a) {
                    case e:
                        return hb();
                    case "save":
                        $.browser.chrome = $.browser.webkit && !!window.chrome, $.browser.safari = $.browser.webkit && !window.chrome;
                        if ($.browser.webkit)
                            return H.output("dataurlnewwindow");
                        var f = new b, g = hb(), h = g.length, i = new Uint8Array(new ArrayBuffer(h));
                        for (var j = 0; j < h; j++)
                            i[j] = g.charCodeAt(j);
                        f.append(i);
                        var k = f.getBlob("application/pdf");
                        c(k, d);
                        break;
                    case "datauristring":
                    case "dataurlstring":
                        return "data:application/pdf;base64," + btoa(hb());
                    case "datauri":
                    case "dataurl":
                        document.location.href = "data:application/pdf;base64," + btoa(hb());
                        break;
                    case "dataurlnewwindow":
                        window.open("data:application/pdf;base64," + btoa(hb()));
                        break;
                    default:
                        throw new Error('Output type "' + a + '" is not supported.')
                }
            };
            H.output = lb, H.save = function(a) {
                H.output("save", a)
            };
            for (var mb in e.API)
                e.API.hasOwnProperty(mb) && (mb === "events" && e.API.events.length ? function(a, b) {
                    var c, d;
                    for (var e = b.length - 1; e !== -1; e--)
                        c = b[e][0], d = b[e][1], a.subscribe.apply(a, [c].concat(typeof d == "function" ? [d] : d))
                }(I, e.API.events) : H[mb] = e.API[mb]);
            return Z(), z = "F1", fb(), I.publish("initialized"), H
        }
        "use strict", typeof btoa == "undefined" && (window.btoa = function(a) {
            var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = b.split(""), d, e, f, g, h, i, j, k, l = 0, m = 0, n = "", o = [];
            do
                d = a.charCodeAt(l++), e = a.charCodeAt(l++), f = a.charCodeAt(l++), k = d << 16 | e << 8 | f, g = k >> 18 & 63, h = k >> 12 & 63, i = k >> 6 & 63, j = k & 63, o[m++] = c[g] + c[h] + c[i] + c[j];
            while (l < a.length);
            n = o.join("");
            var p = a.length % 3;
            return (p ? n.slice(0, p - 3) : n) + "===".slice(p || 3)
        }), typeof atob == "undefined" && (window.atob = function(a) {
            var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c, d, e, f, g, h, i, j, k = 0, l = 0, m = "", n = [];
            if (!a)
                return a;
            a += "";
            do
                f = b.indexOf(a.charAt(k++)), g = b.indexOf(a.charAt(k++)), h = b.indexOf(a.charAt(k++)), i = b.indexOf(a.charAt(k++)), j = f << 18 | g << 12 | h << 6 | i, c = j >> 16 & 255, d = j >> 8 & 255, e = j & 255, h == 64 ? n[l++] = String.fromCharCode(c) : i == 64 ? n[l++] = String.fromCharCode(c, d) : n[l++] = String.fromCharCode(c, d, e);
            while (k < a.length);
            return m = n.join(""), m
        });
        var a = typeof Object.keys == "function" ? function(a) {
            return Object.keys(a).length
        } : function(a) {
            var b = 0;
            for (var c in a)
                a.hasOwnProperty(c) && b++;
            return b
        }, d = function(a) {
            "use strict", this.topics = {}, this.context = a, this.publish = function(a, b) {
                "use strict";
                if (this.topics[a]) {
                    var c = this.topics[a], b = Array.prototype.slice.call(arguments, 1), d = [], e, f, g, h;
                    for (f = 0, g = c.length; f < g; f++)
                        h = c[f], e = h[0], h[1] && (h[0] = function() {
                        }, d.push(f)), e.apply(this.context, b);
                    for (f = 0, g = d.length; f < g; f++)
                        c.splice(d[f], 1)
                }
            }, this.subscribe = function(a, b, c) {
                return "use strict", this.topics[a] ? this.topics[a].push([b, c]) : this.topics[a] = [[b, c]], {topic: a,callback: b}
            }, this.unsubscribe = function(a) {
                if (this.topics[a.topic]) {
                    var b = this.topics[a.topic];
                    for (var c = 0, d = b.length; c < d; c++)
                        b[c][0] === a.callback && b.splice(c, 1)
                }
            }
        };
        return e.API = {events: []}, e
    }();
    define("jspdf", ["jquery"], function(a) {
        return function() {
            return a.jspdf
        }
    }(this));
    var b = b || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder || function(a) {
        var b = function(a) {
            return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]
        }, c = function() {
            this.data = []
        }, d = function(a, b, c) {
            this.data = a, this.size = a.length, this.type = b, this.encoding = c
        }, e = c.prototype, f = d.prototype, g = a.FileReaderSync, h = function(a) {
            this.code = this[this.name = a]
        }, i = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "), j = i.length, k = a.URL || a.webkitURL || a, l = k.createObjectURL, m = k.revokeObjectURL, n = k, o = a.btoa, p = a.atob, q = !1, r = function(a) {
            q = !a
        }, s = a.ArrayBuffer, t = a.Uint8Array;
        c.fake = f.fake = !0;
        while (j--)
            h.prototype[i[j]] = j + 1;
        try {
            t && r.apply(0, new t(1))
        } catch (u) {
        }
        return k.createObjectURL || (n = a.URL = {}), n.createObjectURL = function(a) {
            var b = a.type, c;
            b === null && (b = "application/octet-stream");
            if (a instanceof d)
                return c = "data:" + b, a.encoding === "base64" ? c + ";base64," + a.data : a.encoding === "URI" ? c + "," + decodeURIComponent(a.data) : o ? c + ";base64," + o(a.data) : c + "," + encodeURIComponent(a.data);
            if (real_create_object_url)
                return real_create_object_url.call(k, a)
        }, n.revokeObjectURL = function(a) {
            a.substring(0, 5) !== "data:" && real_revoke_object_url && real_revoke_object_url.call(k, a)
        }, e.append = function(a) {
            var c = this.data;
            if (t && a instanceof s)
                if (q)
                    c.push(String.fromCharCode.apply(String, new t(a)));
                else {
                    var e = "", f = new t(a), i = 0, j = f.length;
                    for (; i < j; i++)
                        e += String.fromCharCode(f[i])
                }
            else if (b(a) === "Blob" || b(a) === "File") {
                if (!g)
                    throw new h("NOT_READABLE_ERR");
                var k = new g;
                c.push(k.readAsBinaryString(a))
            } else
                a instanceof d ? a.encoding === "base64" && p ? c.push(p(a.data)) : a.encoding === "URI" ? c.push(decodeURIComponent(a.data)) : a.encoding === "raw" && c.push(a.data) : (typeof a != "string" && (a += ""), c.push(unescape(encodeURIComponent(a))))
        }, e.getBlob = function(a) {
            return arguments.length || (a = null), new d(this.data.join(""), a, "raw")
        }, e.toString = function() {
            return "[object BlobBuilder]"
        }, f.slice = function(a, b, c) {
            var e = arguments.length;
            return e < 3 && (c = null), new d(this.data.slice(a, e > 1 ? b : this.data.length), c, this.encoding)
        }, f.toString = function() {
            return "[object Blob]"
        }, c
    }(self);
    define("jspdfBlobBuilder", ["jspdf"], function(a) {
        return function() {
            return a.jspdfBlobBuilder
        }
    }(this));
    var c = c || navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(a) {
        var b = a.document, c = function() {
            return a.URL || a.webkitURL || a
        }, d = a.URL || a.webkitURL || a, e = b.createElementNS("http://www.w3.org/1999/xhtml", "a"), f = "download" in e, g = function(c) {
            var d = b.createEvent("MouseEvents");
            return d.initMouseEvent("click", !0, !1, a, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), c.dispatchEvent(d)
        }, h = a.webkitRequestFileSystem, i = a.requestFileSystem || h || a.mozRequestFileSystem, j = function(b) {
            (a.setImmediate || a.setTimeout)(function() {
                throw b
            }, 0)
        }, k = "application/octet-stream", l = 0, m = [], n = function() {
            var a = m.length;
            while (a--) {
                var b = m[a];
                typeof b == "string" ? d.revokeObjectURL(b) : b.remove()
            }
            m.length = 0
        }, o = function(a, b, c) {
            b = [].concat(b);
            var d = b.length;
            while (d--) {
                var e = a["on" + b[d]];
                if (typeof e == "function")
                    try {
                        e.call(a, c || a)
                    } catch (f) {
                        j(f)
                    }
            }
        }, p = function(b, d) {
            var j = this, n = b.type, p = !1, q, r, s = function() {
                var a = c().createObjectURL(b);
                return m.push(a), a
            }, t = function() {
                o(j, "writestart progress write writeend".split(" "))
            }, u = function() {
                if (p || !q)
                    q = s(b);
                r.location.href = q, j.readyState = j.DONE, t()
            }, v = function(a) {
                return function() {
                    if (j.readyState !== j.DONE)
                        return a.apply(this, arguments)
                }
            }, w = {create: !0,exclusive: !1}, x;
            j.readyState = j.INIT, d || (d = "download");
            if (f) {
                q = s(b), e.href = q, e.download = d;
                if (g(e)) {
                    j.readyState = j.DONE, t();
                    return
                }
            }
            a.chrome && n && n !== k && (x = b.slice || b.webkitSlice, b = x.call(b, 0, b.size, k), p = !0), h && d !== "download" && (d += ".download"), n === k || h ? r = a : r = a.open();
            if (!i) {
                u();
                return
            }
            l += b.size, i(a.TEMPORARY, l, v(function(a) {
                a.root.getDirectory("saved", w, v(function(a) {
                    var c = function() {
                        a.getFile(d, w, v(function(a) {
                            a.createWriter(v(function(c) {
                                c.onwriteend = function(b) {
                                    r.location.href = a.toURL(), m.push(a), j.readyState = j.DONE, o(j, "writeend", b)
                                }, c.onerror = function() {
                                    var a = c.error;
                                    a.code !== a.ABORT_ERR && u()
                                }, "writestart progress write abort".split(" ").forEach(function(a) {
                                    c["on" + a] = j["on" + a]
                                }), c.write(b), j.abort = function() {
                                    c.abort(), j.readyState = j.DONE
                                }, j.readyState = j.WRITING
                            }), u)
                        }), u)
                    };
                    a.getFile(d, {create: !1}, v(function(a) {
                        a.remove(), c()
                    }), v(function(a) {
                        a.code === a.NOT_FOUND_ERR ? c() : u()
                    }))
                }), u)
            }), u)
        }, q = p.prototype, r = function(a, b) {
            return new p(a, b)
        };
        return q.abort = function() {
            var a = this;
            a.readyState = a.DONE, o(a, "abort")
        }, q.readyState = q.INIT = 0, q.WRITING = 1, q.DONE = 2, q.error = q.onwritestart = q.onprogress = q.onwrite = q.onabort = q.onerror = q.onwriteend = null, a.addEventListener("unload", n, !1), r
    }(self);
    define("jspdfFileSaver", ["jspdf"], function(a) {
        return function() {
            return a.jspdfFileSaver
        }
    }(this)), function(a) {
        "use strict";
        var b = function(a) {
            var b = "0123456789abcdef", c = "klmnopqrstuvwxyz", d = {};
            for (var e = 0; e < c.length; e++)
                d[c[e]] = b[e];
            var f, g = {}, h = 1, i, j = g, k = [], l, m = "", n = "", o, p = a.length - 1, q;
            e = 1;
            while (e != p)
                q = a[e], e += 1, q == "'" ? i ? (o = i.join(""), i = f) : i = [] : i ? i.push(q) : q == "{" ? (k.push([j, o]), j = {}, o = f) : q == "}" ? (l = k.pop(), l[0][l[1]] = j, o = f, j = l[0]) : q == "-" ? h = -1 : o === f ? d.hasOwnProperty(q) ? (m += d[q], o = parseInt(m, 16) * h, h = 1, m = "") : m += q : d.hasOwnProperty(q) ? (n += d[q], j[o] = parseInt(n, 16) * h, h = 1, o = f, n = "") : n += q;
            return g
        }, c = {codePages: ["WinAnsiEncoding"],WinAnsiEncoding: b("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")}, d = {Unicode: {Courier: c,"Courier-Bold": c,"Courier-BoldOblique": c,"Courier-Oblique": c,Helvetica: c,"Helvetica-Bold": c,"Helvetica-BoldOblique": c,"Helvetica-Oblique": c,"Times-Roman": c,"Times-Bold": c,"Times-BoldItalic": c,"Times-Italic": c}}, e = {Unicode: {"Courier-Oblique": b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic": b("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold": b("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier: b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique": b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold": b("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Helvetica: b("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique": b("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),"Courier-Bold": b("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic": b("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman": b("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique": b("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};
        a.events.push(["addFonts", function(a) {
                var b, c, f, g, h = "Unicode", i;
                for (c in a.fonts)
                    a.fonts.hasOwnProperty(c) && (b = a.fonts[c], f = e[h][b.PostScriptName], f && (b.metadata[h] ? g = b.metadata[h] : g = b.metadata[h] = {}, g.widths = f.widths, g.kerning = f.kerning), i = d[h][b.PostScriptName], i && (b.metadata[h] ? g = b.metadata[h] : g = b.metadata[h] = {}, g.encoding = i, i.codePages && i.codePages.length && (b.encoding = i.codePages[0])))
            }])
    }(a.API), define("jspdfStandardFontsMetrics", ["jspdf"], function(a) {
        return function() {
            return a.jspdfStandardFontsMetrics
        }
    }(this)), function(a) {
        "use strict";
        var b = a.getCharWidthsArray = function(a, b) {
            b || (b = {});
            var c = b.widths ? b.widths : this.internal.getFont().metadata.Unicode.widths, d = c.fof ? c.fof : 1, e = b.kerning ? b.kerning : this.internal.getFont().metadata.Unicode.kerning, f = e.fof ? e.fof : 1, g, h, i, j, k = 0, l = c[0] || d, m = [];
            for (g = 0, h = a.length; g < h; g++)
                i = a.charCodeAt(g), m.push((c[i] || l) / d + (e[i] && e[i][k] || 0) / f), k = i;
            return m
        }, c = function(a) {
            var b = a.length, c = 0;
            while (b)
                b--, c += a[b];
            return c
        }, d = a.getStringUnitWidth = function(a, d) {
            return c(b.call(this, a, d))
        }, e = function(a, b, c, d) {
            var e = [], f = 0, g = a.length, h = 0;
            while (f !== g && h + b[f] < c)
                h += b[f], f++;
            e.push(a.slice(0, f));
            var i = f;
            h = 0;
            while (f !== g)
                h + b[f] > d && (e.push(a.slice(i, f)), h = 0, i = f), h += b[f], f++;
            return i !== f && e.push(a.slice(i, f)), e
        }, f = function(a, d, f) {
            f || (f = {});
            var g = b(" ", f)[0], h = a.split(" "), i = [], j = [i], k = f.textIndent || 0, l = 0, m = 0, n, o, p, q, r;
            for (p = 0, q = h.length; p < q; p++) {
                n = h[p], o = b(n, f), m = c(o);
                if (k + l + m > d) {
                    if (m > d) {
                        r = e(n, o, d - (k + l), d), i.push(r.shift()), i = [r.pop()];
                        while (r.length)
                            j.push([r.shift()]);
                        m = c(o.slice(n.length - i[0].length))
                    } else
                        i = [n];
                    j.push(i), k = m, l = g
                } else
                    i.push(n), k += l + m, l = g
            }
            var s = [];
            for (p = 0, q = j.length; p < q; p++)
                s.push(j[p].join(" "));
            return s
        };
        a.splitTextToSize = function(a, b, c) {
            "use strict", c || (c = {});
            var d = c.fontSize || this.internal.getFontSize(), e = function(a) {
                var b = {0: 1}, c = {};
                if (!a.widths || !a.kerning) {
                    var d = this.internal.getFont(a.fontName, a.fontStyle), e = "Unicode";
                    return d.metadata[e] ? {widths: d.metadata[e].widths || b,kerning: d.metadata[e].kerning || c} : {widths: b,kerning: c}
                }
                return {widths: a.widths,kerning: a.kerning}
            }.call(this, c), g;
            a.match(/[\n\r]/) ? g = a.split(/\r\n|\r|\n/g) : g = [a];
            var h = 1 * this.internal.scaleFactor * b / d;
            e.textIndent = c.textIndent ? c.textIndent * 1 * this.internal.scaleFactor / d : 0;
            var i, j, k = [];
            for (i = 0, j = g.length; i < j; i++)
                k = k.concat(f(g[i], h, e));
            return k
        }
    }(a.API), define("jspdfSplitTextToSize", ["jspdf"], function(a) {
        return function() {
            return a.jspdfSplitTextToSize
        }
    }(this)), function(a) {
        "use strict";
        var b = "addImage_", c = function(a) {
            "use strict";
            var b, c;
            if (!a.charCodeAt(0) === 255 || !a.charCodeAt(1) === 216 || !a.charCodeAt(2) === 255 || !a.charCodeAt(3) === 224 || !a.charCodeAt(6) === "J".charCodeAt(0) || !a.charCodeAt(7) === "F".charCodeAt(0) || !a.charCodeAt(8) === "I".charCodeAt(0) || !a.charCodeAt(9) === "F".charCodeAt(0) || !a.charCodeAt(10) === 0)
                throw new Error("getJpegSize requires a binary jpeg file");
            var d = a.charCodeAt(4) * 256 + a.charCodeAt(5), e = 4, f = a.length;
            while (e < f) {
                e += d;
                if (a.charCodeAt(e) !== 255)
                    throw new Error("getJpegSize could not find the size of the image");
                if (a.charCodeAt(e + 1) === 192)
                    return c = a.charCodeAt(e + 5) * 256 + a.charCodeAt(e + 6), b = a.charCodeAt(e + 7) * 256 + a.charCodeAt(e + 8), [b, c];
                e += 2, d = a.charCodeAt(e) * 256 + a.charCodeAt(e + 1)
            }
        }, d = function(a) {
            var b = this.internal.newObject(), c = this.internal.write, d = this.internal.putStream;
            a.n = b, c("<</Type /XObject"), c("/Subtype /Image"), c("/Width " + a.w), c("/Height " + a.h), a.cs === "Indexed" ? c("/ColorSpace [/Indexed /DeviceRGB " + (a.pal.length / 3 - 1) + " " + (b + 1) + " 0 R]") : (c("/ColorSpace /" + a.cs), a.cs === "DeviceCMYK" && c("/Decode [1 0 1 0 1 0 1 0]")), c("/BitsPerComponent " + a.bpc), "f" in a && c("/Filter /" + a.f), "dp" in a && c("/DecodeParms <<" + a.dp + ">>");
            if ("trns" in a && a["trns"].constructor == Array) {
                var e = "";
                for (var f = 0; f < a.trns.length; f++)
                    e += a[e][f] + " " + a.trns[f] + " ", c("/Mask [" + e + "]")
            }
            "smask" in a && c("/SMask " + (b + 1) + " 0 R"), c("/Length " + a.data.length + ">>"), d(a.data), c("endobj")
        }, e = function() {
            var a = this.internal.collections[b + "images"];
            for (var c in a)
                d.call(this, a[c])
        }, f = function() {
            var a = this.internal.collections[b + "images"], c = this.internal.write, d;
            for (var e in a)
                d = a[e], c("/I" + d.i, d.n, "0", "R")
        };
        a.addImage = function(a, d, g, h, i, j) {
            "use strict";
            if (typeof a == "object" && a.nodeType === 1) {
                var k = document.createElement("canvas");
                k.width = a.clientWidth, k.height = a.clientHeight;
                var l = k.getContext("2d");
                if (!l)
                    throw "addImage requires canvas to be supported by browser.";
                l.drawImage(a, 0, 0, k.width, k.height), a = k.toDataURL("image/jpeg"), d = "JPEG"
            }
            if (d.toUpperCase() !== "JPEG")
                throw new Error("addImage currently only supports format 'JPEG', not '" + d + "'");
            var m, n = this.internal.collections[b + "images"], o = this.internal.getCoordinateString, p = this.internal.getVerticalCoordinateString;
            a.substring(0, 23) === "data:image/jpeg;base64," && (a = atob(a.replace("data:image/jpeg;base64,", ""))), n ? m = Object.keys ? Object.keys(n).length : function(a) {
                var b = 0;
                for (var c in a)
                    a.hasOwnProperty(c) && b++;
                return b
            }(n) : (m = 0, this.internal.collections[b + "images"] = n = {}, this.internal.events.subscribe("putResources", e), this.internal.events.subscribe("putXobjectDict", f));
            var q = c(a), r = {w: q[0],h: q[1],cs: "DeviceRGB",bpc: 8,f: "DCTDecode",i: m,data: a};
            return n[m] = r, !i && !j && (i = -96, j = -96), i < 0 && (i = -1 * r.w * 72 / i / this.internal.scaleFactor), j < 0 && (j = -1 * r.h * 72 / j / this.internal.scaleFactor), i === 0 && (i = j * r.w / r.h), j === 0 && (j = i * r.h / r.w), this.internal.write("q", o(i), "0 0", o(j), o(g), p(h + j), "cm /I" + r.i, "Do Q"), this
        }
    }(a.API), define("jspdfAddImage", ["jspdf"], function(a) {
        return function() {
            return a.jspdfAddImage
        }
    }(this)), function(a) {
        function b(a) {
            var b = 0, c = a.length, d, e = !1, f = !1;
            while (!e && b !== c)
                d = a[b] = a[b].trimLeft(), d && (e = !0), b++;
            b = c - 1;
            while (c && !f && b !== -1)
                d = a[b] = a[b].trimRight(), d && (f = !0), b--;
            var g = /\s+$/g, h = !0;
            for (b = 0; b !== c; b++)
                d = a[b].replace(/\s+/g, " "), h && (d = d.trimLeft()), d && (h = g.test(d)), a[b] = d;
            return a
        }
        function c(a, b, c, d) {
            return this.pdf = a, this.x = b, this.y = c, this.settings = d, this.init(), this
        }
        function h(a) {
            var b, c = a.split(","), e = c.shift();
            while (!b && e)
                b = d[e.trim().toLowerCase()], e = c.shift();
            return b
        }
        function i(a) {
            var b, c = 16, d = g[a];
            return d ? d : (d = {"xx-small": 9,"x-small": 11,small: 13,medium: 16,large: 19,"x-large": 23,"xx-large": 28,auto: 0}[a], d !== b ? g[a] = d / c : (d = parseFloat(a)) ? g[a] = d / c : (d = a.match(/([\d\.]+)(px)/), d.length === 3 ? g[a] = parseFloat(d[1]) / c : g[a] = 1))
        }
        function j(a) {
            var b = $(a), c = {}, d;
            return c["font-family"] = h(b.css("font-family")) || "times", c["font-style"] = f[b.css("font-style")] || "normal", d = e[b.css("font-weight")] || "normal", d === "bold" && (c["font-style"] === "normal" ? c["font-style"] = d : c["font-style"] = d + c["font-style"]), c["font-size"] = i(b.css("font-size")) || 1, c["line-height"] = i(b.css("line-height")) || 1, c.display = b.css("display") === "inline" ? "inline" : "block", c.display === "block" && (c["margin-top"] = i(b.css("margin-top")) || 0, c["margin-bottom"] = i(b.css("margin-bottom")) || 0, c["padding-top"] = i(b.css("padding-top")) || 0, c["padding-bottom"] = i(b.css("padding-bottom")) || 0), c
        }
        function k(a, b, c) {
            var d = !1, e, f, g, h = c["#" + a.id];
            if (h)
                if (typeof h == "function")
                    d = h(a, b);
                else {
                    e = 0, f = h.length;
                    while (!d && e !== f)
                        d = h[e](a, b), e++
                }
            h = c[a.nodeName];
            if (!d && h)
                if (typeof h == "function")
                    d = h(a, b);
                else {
                    e = 0, f = h.length;
                    while (!d && e !== f)
                        d = h[e](a, b), e++
                }
            return d
        }
        function l(a, b, c) {
            var d = a.childNodes, e, f = j(a), g = f.display === "block";
            g && (b.setBlockBoundary(), b.setBlockStyle(f));
            for (var h = 0, i = d.length; h < i; h++)
                e = d[h], typeof e == "object" ? e.nodeType === 1 && e.nodeName != "SCRIPT" ? k(e, b, c) || l(e, b, c) : e.nodeType === 3 && b.addText(e.nodeValue, f) : typeof e == "string" && b.addText(e, f);
            g && b.setBlockBoundary()
        }
        function m(a, b, d, e, f) {
            typeof b == "string" && (b = function(a) {
                var b = "jsPDFhtmlText" + Date.now().toString() + (Math.random() * 1e3).toFixed(0), c = "position: absolute !important;clip: rect(1px 1px 1px 1px); /* IE6, IE7 */clip: rect(1px, 1px, 1px, 1px);padding:0 !important;border:0 !important;height: 1px !important;width: 1px !important; top:auto;left:-100px;overflow: hidden;", d = $('<div style="' + c + '">' + '<iframe style="height:1px;width:1px" name="' + b + '" />' + "</div>").appendTo(document.body), e = window.frames[b];
                return $(e.document.body).html(a)[0]
            }(b));
            var g = new c(a, d, e, f), h = l(b, g, f.elementHandlers);
            return g.dispose()
        }
        "use strict", String.prototype.trim || (String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "")
        }), String.prototype.trimLeft || (String.prototype.trimLeft = function() {
            return this.replace(/^\s+/g, "")
        }), String.prototype.trimRight || (String.prototype.trimRight = function() {
            return this.replace(/\s+$/g, "")
        }), c.prototype.init = function() {
            this.paragraph = {text: [],style: []}, this.pdf.internal.write("q")
        }, c.prototype.dispose = function() {
            return this.pdf.internal.write("Q"), {x: this.x,y: this.y}
        }, c.prototype.splitFragmentsIntoLines = function(a, b) {
            var c = 12, d = this.pdf.internal.scaleFactor, e = {}, f, g, h, i, j, k, l, m, n = [], o = [n], p = 0, q = this.settings.width;
            while (a.length) {
                i = a.shift(), j = b.shift();
                if (i) {
                    f = j["font-family"], g = j["font-style"], h = e[f + g], h || (h = this.pdf.internal.getFont(f, g).metadata.Unicode, e[f + g] = h), k = {widths: h.widths,kerning: h.kerning,fontSize: j["font-size"] * c,textIndent: p}, l = this.pdf.getStringUnitWidth(i, k) * k.fontSize / d;
                    if (p + l > q) {
                        m = this.pdf.splitTextToSize(i, q, k), n.push([m.shift(), j]);
                        while (m.length)
                            n = [[m.shift(), j]], o.push(n);
                        p = this.pdf.getStringUnitWidth(n[0][0], k) * k.fontSize / d
                    } else
                        n.push([i, j]), p += l
                }
            }
            return o
        }, c.prototype.RenderTextFragment = function(a, b) {
            var c = 12, d = this.pdf.internal.getFont(b["font-family"], b["font-style"]);
            this.pdf.internal.write("/" + d.id, (c * b["font-size"]).toFixed(2), "Tf", "(" + this.pdf.internal.pdfEscape(a) + ") Tj")
        }, c.prototype.renderParagraph = function() {
            var a = b(this.paragraph.text), c = this.paragraph.style, d = this.paragraph.blockstyle, e = this.paragraph.blockstyle || {};
            this.paragraph = {text: [],style: [],blockstyle: {},priorblockstyle: d};
            if (!a.join("").trim())
                return;
            var f = this.splitFragmentsIntoLines(a, c), g, h, i = 12, j = i / this.pdf.internal.scaleFactor, k = (Math.max((d["margin-top"] || 0) - (e["margin-bottom"] || 0), 0) + (d["padding-top"] || 0)) * j, l = ((d["margin-bottom"] || 0) + (d["padding-bottom"] || 0)) * j, m = this.pdf.internal.write, n, o;
            this.y += k, m("q", "BT", this.pdf.internal.getCoordinateString(this.x), this.pdf.internal.getVerticalCoordinateString(this.y), "Td");
            while (f.length) {
                g = f.shift(), h = 0;
                for (n = 0, o = g.length; n !== o; n++)
                    g[n][0].trim() && (h = Math.max(h, g[n][1]["line-height"], g[n][1]["font-size"]));
                m(0, (-1 * i * h).toFixed(2), "Td");
                for (n = 0, o = g.length; n !== o; n++)
                    g[n][0] && this.RenderTextFragment(g[n][0], g[n][1]);
                this.y += h * j
            }
            m("ET", "Q"), this.y += l
        }, c.prototype.setBlockBoundary = function() {
            this.renderParagraph()
        }, c.prototype.setBlockStyle = function(a) {
            this.paragraph.blockstyle = a
        }, c.prototype.addText = function(a, b) {
            this.paragraph.text.push(a), this.paragraph.style.push(b)
        };
        var d = {helvetica: "helvetica","sans-serif": "helvetica",serif: "times",times: "times","times new roman": "times",monospace: "courier",courier: "courier"}, e = {100: "normal",200: "normal",300: "normal",400: "normal",500: "bold",600: "bold",700: "bold",800: "bold",900: "bold",normal: "normal",bold: "bold",bolder: "bold",lighter: "normal"}, f = {normal: "normal",italic: "italic",oblique: "italic"}, g = {normal: 1};
        a.fromHTML = function(a, b, c, d) {
            return "use strict", m(this, a, b, c, d)
        }
    }(a.API), define("jspdfFormHtml", ["jspdf", "jspdfBlobBuilder", "jspdfFileSaver", "jspdfStandardFontsMetrics", "jspdfSplitTextToSize", "jspdfAddImage"], function(a) {
        return function() {
            return a.jspdfFormHtml
        }
    }(this)), define("pdfModule", ["jquery", "jspdfFormHtml"], function(b, c) {
        var d = {}, e, f, g, h, i, j, k, l = 11, m = 16, n = function() {
            e = 185, f = 8, g = 15, h = 20, i = 3, j = 10, k = 20
        }, o = function(a, b, c, d) {
            a.setFontSize(m), a.text(b + 3 * i, c - 5, d), a.setFontSize(l)
        }, p = function(a, c) {
            o(a, g, h, "Kort"), a.rect(g, h, e, f);
            var d = ["Type", "Aantal", "Opgenomen", "Gepland", "Resterend"], j = e / d.length, k = g + e / d.length, l = h + (c.categoryOverviews.length + 1) * f, m = g, n = h;
            a.setFontType("bold"), b.each(d, function(b, c) {
                a.text(m + i, n + i * 2, c), m += j, a.line(k + b * j, h, k + b * j, l)
            }), a.setFontType("normal"), b.each(c.categoryOverviews, function(c, d) {
                h += f, m = g, b.each(["name", "max", "aantalOpgenomen", "aantalGepland", "remaining"], function(b, c) {
                    a.text(m + i + b * j, h + i * 2, d[c] + "")
                }), a.rect(g, h, e, f)
            })
        }, q = function(a, c) {
            var d = (e - j) / 2, l = [" ", " "];
            b.each(c.categoryOverviews, function(a, b) {
                l.push(b.name)
            });
            var m = h + k + f;
            b.each(c.eventsGrouped, function(e, h) {
                g += e * (d + j), o(a, g, m, h.name);
                var k = d / l.length, n = g + d / l.length, p = m + (h.items.length + 1) * f, q = g, r = m;
                a.rect(g, m, d, (h.items.length + 1) * f), a.setFontType("bold"), b.each(l, function(b, c) {
                    a.text(q + i, r + i * 2, c), q += k, b > 0 && a.line(n + b * k, m, n + b * k, p)
                }), a.line(g, r + f, g + l.length * k, r + f), a.setFontType("normal"), q = g, r = m + f, b.each(h.items, function(d, e) {
                    var g = q, h = r + i * 2;
                    a.text(g + i, h, e.startDateText), b.each(c.categoryOverviews, function(b, c) {
                        g += k;
                        var d = c.name === e.summaryCatMatch ? "x" : " ";
                        a.text(g + i, h, d)
                    }), r += f
                })
            })
        };
        return d.create = function(b) {
            try {
                var c = new a;
                c.setFontSize(l), n(), p(c, b), q(c, b), c.output("dataurl", "Vakantie.pdf")
            } catch (d) {
                console.log(d)
            }
        }, d
    }), function() {
        function a(a) {
            throw a
        }
        function e(a) {
            return function() {
                return a
            }
        }
        function k(k) {
            function m(a, b, d, e, f) {
                var g = [], a = O.j(function() {
                    var a = b(d, f) || [];
                    0 < g.length && (O.a.Xa(o(g), a), e && O.r.K(e, c, [d, a, f])), g.splice(0, g.length), O.a.P(g, a)
                }, c, {W: a,Ja: function() {
                        return 0 == g.length || !O.a.X(g[0])
                    }});
                return {M: g,j: a.oa() ? a : j}
            }
            function o(a) {
                for (; a.length && !O.a.X(a[0]); )
                    a.splice(0, 1);
                if (1 < a.length) {
                    for (var b = a[0], c = a[a.length - 1], d = [b]; b !== c; ) {
                        b = b.nextSibling;
                        if (!b)
                            return;
                        d.push(b)
                    }
                    Array.prototype.splice.apply(a, [0, a.length].concat(d))
                }
                return a
            }
            function p(a, b, c, d, e) {
                var f = Math.min, g = Math.max, h = [], i, j = a.length, k, l = b.length, m = l - j || 1, n = j + l + 1, o, p, q;
                for (i = 0; i <= j; i++) {
                    p = o, h.push(o = []), q = f(l, i + m);
                    for (k = g(0, i - 1); k <= q; k++)
                        o[k] = k ? i ? a[i - 1] === b[k - 1] ? p[k - 1] : f(p[k] || n, o[k - 1] || n) + 1 : k + 1 : i + 1
                }
                f = [], g = [], m = [], i = j;
                for (k = l; i || k; )
                    l = h[i][k] - 1, k && l === h[i][k - 1] ? g.push(f[f.length] = {status: c,value: b[--k],index: k}) : i && l === h[i - 1][k] ? m.push(f[f.length] = {status: d,value: a[--i],index: i}) : (f.push({status: "retained",value: b[--k]}), --i);
                if (g.length && m.length)
                    for (var a = 10 * j, r, b = c = 0; (e || b < a) && (r = g[c]); c++) {
                        for (d = 0; h = m[d]; d++)
                            if (r.value === h.value) {
                                r.moved = h.index, h.moved = r.index, m.splice(d, 1), b = d = 0;
                                break
                            }
                        b += d
                    }
                return f.reverse()
            }
            function r(e, f, g, h, i) {
                var i = i || {}, j = e && s(e), j = j && j.ownerDocument, k = i.templateEngine || cb;
                O.ya.ub(g, k, j), g = k.renderTemplate(g, h, i, j), ("number" != typeof g.length || 0 < g.length && "number" != typeof g[0].nodeType) && a(Error("Template engine must return an array of DOM nodes")), j = d;
                switch (f) {
                    case "replaceChildren":
                        O.e.N(e, g), j = b;
                        break;
                    case "replaceNode":
                        O.a.Xa(e, g), j = b;
                        break;
                    case "ignoreTargetNode":
                        break;
                    default:
                        a(Error("Unknown renderMode: " + f))
                }
                return j && (u(g, h), i.afterRender && O.r.K(i.afterRender, c, [g, h.$data])), g
            }
            function s(a) {
                return a.nodeType ? a : 0 < a.length ? a[0] : c
            }
            function u(a, b) {
                if (a.length) {
                    var c = a[0], d = a[a.length - 1];
                    v(c, d, function(a) {
                        O.Ca(b, a)
                    }), v(c, d, function(a) {
                        O.s.hb(a, [b])
                    })
                }
            }
            function v(a, b, c) {
                for (var d, b = O.e.nextSibling(b); a && (d = a) !== b; )
                    a = O.e.nextSibling(d), (1 === d.nodeType || 8 === d.nodeType) && c(d)
            }
            function y(b, c, d) {
                for (var b = O.g.aa(b), e = O.g.Q, f = 0; f < b.length; f++) {
                    var g = b[f].key;
                    if (e.hasOwnProperty(g)) {
                        var h = e[g];
                        "function" == typeof h ? (g = h(b[f].value)) && a(Error(g)) : h || a(Error("This template engine does not support the '" + g + "' binding within its templates"))
                    }
                }
                return b = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + O.g.ba(b) + " } })()})", d.createJavaScriptEvaluatorBlock(b) + c
            }
            function z(b, d, e, f) {
                function g(a) {
                    return function() {
                        return k[a]
                    }
                }
                function h() {
                    return k
                }
                var i = 0, k, l;
                return O.j(function() {
                    var c = e && e instanceof O.z ? e : new O.z(O.a.d(e)), m = c.$data;
                    f && O.cb(b, c);
                    if (k = ("function" == typeof d ? d(c, b) : d) || O.J.instance.getBindings(b, c)) {
                        if (0 === i) {
                            i = 1;
                            for (var n in k) {
                                var o = O.c[n];
                                o && 8 === b.nodeType && !O.e.I[n] && a(Error("The binding '" + n + "' cannot be used with virtual elements")), o && "function" == typeof o.init && (o = (0, o.init)(b, g(n), h, m, c)) && o.controlsDescendantBindings && (l !== j && a(Error("Multiple bindings (" + l + " and " + n + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")), l = n)
                            }
                            i = 2
                        }
                        if (2 === i)
                            for (n in k)
                                (o = O.c[n]) && "function" == typeof o.update && (0, o.update)(b, g(n), h, m, c)
                    }
                }, c, {W: b}), {Mb: l === j}
            }
            function A(a, d, e) {
                var f = b, g = 1 === d.nodeType;
                g && O.e.Sa(d);
                if (g && e || O.J.instance.nodeHasBindings(d))
                    f = z(d, c, a, e).Mb;
                f && B(a, d, !g)
            }
            function B(a, b, c) {
                for (var d = O.e.firstChild(b); b = d; )
                    d = O.e.nextSibling(b), A(a, b, c)
            }
            function C(a, b) {
                var d = D(a, b);
                return d ? 0 < d.length ? d[d.length - 1].nextSibling : a.nextSibling : c
            }
            function D(b, d) {
                for (var e = b, f = 1, g = []; e = e.nextSibling; ) {
                    if (F(e) && (f--, 0 === f))
                        return g;
                    g.push(e), G(e) && f++
                }
                return d || a(Error("Cannot find closing comment tag to match: " + b.nodeValue)), c
            }
            function F(a) {
                return 8 == a.nodeType && (W ? a.text : a.nodeValue).match(Y)
            }
            function G(a) {
                return 8 == a.nodeType && (W ? a.text : a.nodeValue).match(X)
            }
            function I(a, b) {
                for (var d = c; a != d; )
                    d = a, a = a.replace(T, function(a, c) {
                        return b[c]
                    });
                return a
            }
            function J() {
                var a = [], b = [];
                this.save = function(c, d) {
                    var e = O.a.i(a, c);
                    0 <= e ? b[e] = d : (a.push(c), b.push(d))
                }, this.get = function(c) {
                    return c = O.a.i(a, c), 0 <= c ? b[c] : j
                }
            }
            function K(a, b, d) {
                function e(c) {
                    var e = b(a[c]);
                    switch (typeof e) {
                        case "boolean":
                        case "number":
                        case "string":
                        case "function":
                            f[c] = e;
                            break;
                        case "object":
                        case "undefined":
                            var g = d.get(e);
                            f[c] = g !== j ? g : K(e, b, d)
                    }
                }
                d = d || new J, a = b(a);
                if ("object" != typeof a || a === c || a === j || a instanceof Date)
                    return a;
                var f = a instanceof Array ? [] : {};
                d.save(a, f);
                var g = a;
                if (g instanceof Array) {
                    for (var h = 0; h < g.length; h++)
                        e(h);
                    "function" == typeof g.toJSON && e("toJSON")
                } else
                    for (h in g)
                        e(h);
                return f
            }
            function L(a, b) {
                if (a)
                    if (8 == a.nodeType) {
                        var d = O.s.Ta(a.nodeValue);
                        d != c && b.push({rb: a,Eb: d})
                    } else if (1 == a.nodeType)
                        for (var d = 0, e = a.childNodes, f = e.length; d < f; d++)
                            L(e[d], b)
            }
            function M(a, c, e, f) {
                O.c[a] = {init: function(a) {
                        return O.a.f.set(a, _, {}), {controlsDescendantBindings: b}
                    },update: function(a, d, g, h, i) {
                        var g = O.a.f.get(a, _), d = O.a.d(d()), h = !e != !d, j = !g.Ya;
                        if (j || c || h !== g.pb)
                            j && (g.Ya = O.a.Ha(O.e.childNodes(a), b)), h ? (j || O.e.N(a, O.a.Ha(g.Ya)), O.Da(f ? f(i, d) : i, a)) : O.e.Y(a), g.pb = h
                    }}, O.g.Q[a] = d, O.e.I[a] = b
            }
            function N(a, b, d) {
                d && b !== O.k.q(a) && O.k.T(a, b), b !== O.k.q(a) && O.r.K(O.a.Aa, c, [a, "change"])
            }
            var O = "undefined" != typeof k ? k : {};
            O.b = function(a, b) {
                for (var c = a.split("."), d = O, e = 0; e < c.length - 1; e++)
                    d = d[c[e]];
                d[c[c.length - 1]] = b
            }, O.p = function(a, b, c) {
                a[b] = c
            }, O.version = "2.2.0", O.b("version", O.version), O.a = new function() {
                function e(a, b) {
                    if ("input" !== O.a.u(a) || !a.type || "click" != b.toLowerCase())
                        return d;
                    var c = a.type;
                    return "checkbox" == c || "radio" == c
                }
                var k = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, m = {}, o = {};
                m[/Firefox\/2/i.test(h.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"], m.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
                for (var p in m) {
                    var r = m[p];
                    if (r.length)
                        for (var s = 0, t = r.length; s < t; s++)
                            o[r[s]] = p
                }
                var u = {propertychange: b}, v, m = 3;
                p = g.createElement("div");
                for (r = p.getElementsByTagName("i"); p.innerHTML = "<!--[if gt IE " + ++m + "]><i></i><![endif]-->", r[0]; )
                    ;
                return v = 4 < m ? m : j, {Ma: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],o: function(a, b) {
                        for (var c = 0, d = a.length; c < d; c++)
                            b(a[c])
                    },i: function(a, b) {
                        if ("function" == typeof Array.prototype.indexOf)
                            return Array.prototype.indexOf.call(a, b);
                        for (var c = 0, d = a.length; c < d; c++)
                            if (a[c] === b)
                                return c;
                        return -1
                    },kb: function(a, b, d) {
                        for (var e = 0, f = a.length; e < f; e++)
                            if (b.call(d, a[e]))
                                return a[e];
                        return c
                    },ga: function(a, b) {
                        var c = O.a.i(a, b);
                        0 <= c && a.splice(c, 1)
                    },Fa: function(a) {
                        for (var a = a || [], b = [], c = 0, d = a.length; c < d; c++)
                            0 > O.a.i(b, a[c]) && b.push(a[c]);
                        return b
                    },V: function(a, b) {
                        for (var a = a || [], c = [], d = 0, e = a.length; d < e; d++)
                            c.push(b(a[d]));
                        return c
                    },fa: function(a, b) {
                        for (var a = a || [], c = [], d = 0, e = a.length; d < e; d++)
                            b(a[d]) && c.push(a[d]);
                        return c
                    },P: function(a, b) {
                        if (b instanceof Array)
                            a.push.apply(a, b);
                        else
                            for (var c = 0, d = b.length; c < d; c++)
                                a.push(b[c]);
                        return a
                    },extend: function(a, b) {
                        if (b)
                            for (var c in b)
                                b.hasOwnProperty(c) && (a[c] = b[c]);
                        return a
                    },ka: function(a) {
                        for (; a.firstChild; )
                            O.removeNode(a.firstChild)
                    },Gb: function(a) {
                        for (var a = O.a.L(a), b = g.createElement("div"), c = 0, d = a.length; c < d; c++)
                            b.appendChild(O.A(a[c]));
                        return b
                    },Ha: function(a, c) {
                        for (var d = 0, e = a.length, f = []; d < e; d++) {
                            var g = a[d].cloneNode(b);
                            f.push(c ? O.A(g) : g)
                        }
                        return f
                    },N: function(a, b) {
                        O.a.ka(a);
                        if (b)
                            for (var c = 0, d = b.length; c < d; c++)
                                a.appendChild(b[c])
                    },Xa: function(a, b) {
                        var c = a.nodeType ? [a] : a;
                        if (0 < c.length) {
                            for (var d = c[0], e = d.parentNode, f = 0, g = b.length; f < g; f++)
                                e.insertBefore(b[f], d);
                            f = 0;
                            for (g = c.length; f < g; f++)
                                O.removeNode(c[f])
                        }
                    },ab: function(a, b) {
                        7 > v ? a.setAttribute("selected", b) : a.selected = b
                    },D: function(a) {
                        return (a || "").replace(k, "")
                    },Qb: function(a, b) {
                        for (var c = [], d = (a || "").split(b), e = 0, f = d.length; e < f; e++) {
                            var g = O.a.D(d[e]);
                            "" !== g && c.push(g)
                        }
                        return c
                    },Nb: function(a, b) {
                        return a = a || "", b.length > a.length ? d : a.substring(0, b.length) === b
                    },sb: function(a, e) {
                        if (e.compareDocumentPosition)
                            return 16 == (e.compareDocumentPosition(a) & 16);
                        for (; a != c; ) {
                            if (a == e)
                                return b;
                            a = a.parentNode
                        }
                        return d
                    },X: function(a) {
                        return O.a.sb(a, a.ownerDocument)
                    },u: function(a) {
                        return a && a.tagName && a.tagName.toLowerCase()
                    },n: function(c, f, g) {
                        var h = v && u[f];
                        if (!h && "undefined" != typeof i) {
                            if (e(c, f))
                                var j = g, g = function(a, c) {
                                    var d = this.checked;
                                    c && (this.checked = c.mb !== b), j.call(this, a), this.checked = d
                                };
                            i(c).bind(f, g)
                        } else
                            !h && "function" == typeof c.addEventListener ? c.addEventListener(f, g, d) : "undefined" != typeof c.attachEvent ? c.attachEvent("on" + f, function(a) {
                                g.call(c, a)
                            }) : a(Error("Browser doesn't support addEventListener or attachEvent"))
                    },Aa: function(c, h) {
                        (!c || !c.nodeType) && a(Error("element must be a DOM node when calling triggerEvent"));
                        if ("undefined" != typeof i) {
                            var j = [];
                            e(c, h) && j.push({mb: c.checked}), i(c).trigger(h, j)
                        } else
                            "function" == typeof g.createEvent ? "function" == typeof c.dispatchEvent ? (j = g.createEvent(o[h] || "HTMLEvents"), j.initEvent(h, b, b, f, 0, 0, 0, 0, 0, d, d, d, d, 0, c), c.dispatchEvent(j)) : a(Error("The supplied element doesn't support dispatchEvent")) : "undefined" != typeof c.fireEvent ? (e(c, h) && (c.checked = c.checked !== b), c.fireEvent("on" + h)) : a(Error("Browser doesn't support triggering events"))
                    },d: function(a) {
                        return O.$(a) ? a() : a
                    },ta: function(a) {
                        return O.$(a) ? a.t() : a
                    },da: function(a, b, c) {
                        if (b) {
                            var d = /[\w-]+/g, e = a.className.match(d) || [];
                            O.a.o(b.match(d), function(a) {
                                var b = O.a.i(e, a);
                                0 <= b ? c || e.splice(b, 1) : c && e.push(a)
                            }), a.className = e.join(" ")
                        }
                    },bb: function(a, b) {
                        var d = O.a.d(b);
                        if (d === c || d === j)
                            d = "";
                        if (3 === a.nodeType)
                            a.data = d;
                        else {
                            var e = O.e.firstChild(a);
                            !e || 3 != e.nodeType || O.e.nextSibling(e) ? O.e.N(a, [g.createTextNode(d)]) : e.data = d, O.a.vb(a)
                        }
                    },$a: function(a, b) {
                        a.name = b;
                        if (7 >= v)
                            try {
                                a.mergeAttributes(g.createElement("<input name='" + a.name + "'/>"), d)
                            } catch (c) {
                            }
                    },vb: function(a) {
                        9 <= v && (a = 1 == a.nodeType ? a : a.parentNode, a.style && (a.style.zoom = a.style.zoom))
                    },tb: function(a) {
                        if (9 <= v) {
                            var b = a.style.width;
                            a.style.width = 0, a.style.width = b
                        }
                    },Kb: function(a, b) {
                        for (var a = O.a.d(a), b = O.a.d(b), c = [], d = a; d <= b; d++)
                            c.push(d);
                        return c
                    },L: function(a) {
                        for (var b = [], c = 0, d = a.length; c < d; c++)
                            b.push(a[c]);
                        return b
                    },Ob: 6 === v,Pb: 7 === v,Z: v,Na: function(a, b) {
                        for (var c = O.a.L(a.getElementsByTagName("input")).concat(O.a.L(a.getElementsByTagName("textarea"))), d = "string" == typeof b ? function(a) {
                            return a.name === b
                        } : function(a) {
                            return b.test(a.name)
                        }, e = [], f = c.length - 1; 0 <= f; f--)
                            d(c[f]) && e.push(c[f]);
                        return e
                    },Hb: function(a) {
                        return "string" == typeof a && (a = O.a.D(a)) ? f.JSON && f.JSON.parse ? f.JSON.parse(a) : (new Function("return " + a))() : c
                    },wa: function(b, c, d) {
                        return ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) && a(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")), JSON.stringify(O.a.d(b), c, d)
                    },Ib: function(a, b, c) {
                        var c = c || {}, d = c.params || {}, e = c.includeFields || this.Ma, f = a;
                        if ("object" == typeof a && "form" === O.a.u(a))
                            for (var f = a.action, h = e.length - 1; 0 <= h; h--)
                                for (var i = O.a.Na(a, e[h]), j = i.length - 1; 0 <= j; j--)
                                    d[i[j].name] = i[j].value;
                        var b = O.a.d(b), k = g.createElement("form");
                        k.style.display = "none", k.action = f, k.method = "post";
                        for (var l in b)
                            a = g.createElement("input"), a.name = l, a.value = O.a.wa(O.a.d(b[l])), k.appendChild(a);
                        for (l in d)
                            a = g.createElement("input"), a.name = l, a.value = d[l], k.appendChild(a);
                        g.body.appendChild(k), c.submitter ? c.submitter(k) : k.submit(), setTimeout(function() {
                            k.parentNode.removeChild(k)
                        }, 0)
                    }}
            }, O.b("utils", O.a), O.b("utils.arrayForEach", O.a.o), O.b("utils.arrayFirst", O.a.kb), O.b("utils.arrayFilter", O.a.fa), O.b("utils.arrayGetDistinctValues", O.a.Fa), O.b("utils.arrayIndexOf", O.a.i), O.b("utils.arrayMap", O.a.V), O.b("utils.arrayPushAll", O.a.P), O.b("utils.arrayRemoveItem", O.a.ga), O.b("utils.extend", O.a.extend), O.b("utils.fieldsIncludedWithJsonPost", O.a.Ma), O.b("utils.getFormFields", O.a.Na), O.b("utils.peekObservable", O.a.ta), O.b("utils.postJson", O.a.Ib), O.b("utils.parseJson", O.a.Hb), O.b("utils.registerEventHandler", O.a.n), O.b("utils.stringifyJson", O.a.wa), O.b("utils.range", O.a.Kb), O.b("utils.toggleDomNodeCssClass", O.a.da), O.b("utils.triggerEvent", O.a.Aa), O.b("utils.unwrapObservable", O.a.d), Function.prototype.bind || (Function.prototype.bind = function(a) {
                var b = this, c = Array.prototype.slice.call(arguments), a = c.shift();
                return function() {
                    return b.apply(a, c.concat(Array.prototype.slice.call(arguments)))
                }
            }), O.a.f = new function() {
                var a = 0, e = "__ko__" + (new Date).getTime(), f = {};
                return {get: function(a, b) {
                        var c = O.a.f.getAll(a, d);
                        return c === j ? j : c[b]
                    },set: function(a, c, e) {
                        e === j && O.a.f.getAll(a, d) === j || (O.a.f.getAll(a, b)[c] = e)
                    },getAll: function(b, c) {
                        var d = b[e];
                        if (!d || "null" === d || !f[d]) {
                            if (!c)
                                return j;
                            d = b[e] = "ko" + a++, f[d] = {}
                        }
                        return f[d]
                    },clear: function(a) {
                        var g = a[e];
                        return g ? (delete f[g], a[e] = c, b) : d
                    }}
            }, O.b("utils.domData", O.a.f), O.b("utils.domData.clear", O.a.f.clear), O.a.F = new function() {
                function c(a, b) {
                    var c = O.a.f.get(a, f);
                    return c === j && b && (c = [], O.a.f.set(a, f, c)), c
                }
                function e(a) {
                    var b = c(a, d);
                    if (b)
                        for (var b = b.slice(0), f = 0; f < b.length; f++)
                            b[f](a);
                    O.a.f.clear(a), "function" == typeof i && "function" == typeof i.cleanData && i.cleanData([a]);
                    if (h[a.nodeType])
                        for (b = a.firstChild; a = b; )
                            b = a.nextSibling, 8 === a.nodeType && e(a)
                }
                var f = "__ko_domNodeDisposal__" + (new Date).getTime(), g = {1: b,8: b,9: b}, h = {1: b,9: b};
                return {Ba: function(d, e) {
                        "function" != typeof e && a(Error("Callback must be a function")), c(d, b).push(e)
                    },Wa: function(a, b) {
                        var e = c(a, d);
                        e && (O.a.ga(e, b), 0 == e.length && O.a.f.set(a, f, j))
                    },A: function(a) {
                        if (g[a.nodeType] && (e(a), h[a.nodeType])) {
                            var b = [];
                            O.a.P(b, a.getElementsByTagName("*"));
                            for (var c = 0, d = b.length; c < d; c++)
                                e(b[c])
                        }
                        return a
                    },removeNode: function(a) {
                        O.A(a), a.parentNode && a.parentNode.removeChild(a)
                    }}
            }, O.A = O.a.F.A, O.removeNode = O.a.F.removeNode, O.b("cleanNode", O.A), O.b("removeNode", O.removeNode), O.b("utils.domNodeDisposal", O.a.F), O.b("utils.domNodeDisposal.addDisposeCallback", O.a.F.Ba), O.b("utils.domNodeDisposal.removeDisposeCallback", O.a.F.Wa), O.a.sa = function(a) {
                var b;
                if ("undefined" != typeof i) {
                    if ((b = i.clean([a])) && b[0]) {
                        for (a = b[0]; a.parentNode && 11 !== a.parentNode.nodeType; )
                            a = a.parentNode;
                        a.parentNode && a.parentNode.removeChild(a)
                    }
                } else {
                    var c = O.a.D(a).toLowerCase();
                    b = g.createElement("div"), c = c.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !c.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!c.indexOf("<td") || !c.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""], a = "ignored<div>" + c[1] + a + c[2] + "</div>";
                    for ("function" == typeof f.innerShiv ? b.appendChild(f.innerShiv(a)) : b.innerHTML = a; c[0]--; )
                        b = b.lastChild;
                    b = O.a.L(b.lastChild.childNodes)
                }
                return b
            }, O.a.ca = function(a, b) {
                O.a.ka(a), b = O.a.d(b);
                if (b !== c && b !== j)
                    if ("string" != typeof b && (b = b.toString()), "undefined" != typeof i)
                        i(a).html(b);
                    else
                        for (var d = O.a.sa(b), e = 0; e < d.length; e++)
                            a.appendChild(d[e])
            }, O.b("utils.parseHtmlFragment", O.a.sa), O.b("utils.setHtml", O.a.ca);
            var P = {};
            O.s = {qa: function(b) {
                    "function" != typeof b && a(Error("You can only pass a function to ko.memoization.memoize()"));
                    var c = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
                    return P[c] = b, "<!--[ko_memo:" + c + "]-->"
                },gb: function(d, e) {
                    var f = P[d];
                    f === j && a(Error("Couldn't find any memo with ID " + d + ". Perhaps it's already been unmemoized."));
                    try {
                        return f.apply(c, e || []), b
                    }finally {
                        delete P[d]
                    }
                },hb: function(a, b) {
                    var c = [];
                    L(a, c);
                    for (var d = 0, e = c.length; d < e; d++) {
                        var f = c[d].rb, g = [f];
                        b && O.a.P(g, b), O.s.gb(c[d].Eb, g), f.nodeValue = "", f.parentNode && f.parentNode.removeChild(f)
                    }
                },Ta: function(a) {
                    return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : c
                }}, O.b("memoization", O.s), O.b("memoization.memoize", O.s.qa), O.b("memoization.unmemoize", O.s.gb), O.b("memoization.parseMemoText", O.s.Ta), O.b("memoization.unmemoizeDomNodeAndDescendants", O.s.hb), O.La = {throttle: function(a, b) {
                    a.throttleEvaluation = b;
                    var d = c;
                    return O.j({read: a,write: function(c) {
                            clearTimeout(d), d = setTimeout(function() {
                                a(c)
                            }, b)
                        }})
                },notify: function(a, b) {
                    return a.equalityComparer = "always" == b ? e(d) : O.m.fn.equalityComparer, a
                }}, O.b("extenders", O.La), O.eb = function(a, b, c) {
                this.target = a, this.ha = b, this.qb = c, O.p(this, "dispose", this.B)
            }, O.eb.prototype.B = function() {
                this.Bb = b, this.qb()
            }, O.S = function() {
                this.w = {}, O.a.extend(this, O.S.fn), O.p(this, "subscribe", this.xa), O.p(this, "extend", this.extend), O.p(this, "getSubscriptionsCount", this.xb)
            }, O.S.fn = {xa: function(a, b, c) {
                    var c = c || "change", a = b ? a.bind(b) : a, d = new O.eb(this, a, function() {
                        O.a.ga(this.w[c], d)
                    }.bind(this));
                    return this.w[c] || (this.w[c] = []), this.w[c].push(d), d
                },notifySubscribers: function(a, c) {
                    c = c || "change", this.w[c] && O.r.K(function() {
                        O.a.o(this.w[c].slice(0), function(c) {
                            c && c.Bb !== b && c.ha(a)
                        })
                    }, this)
                },xb: function() {
                    var a = 0, b;
                    for (b in this.w)
                        this.w.hasOwnProperty(b) && (a += this.w[b].length);
                    return a
                },extend: function(a) {
                    var b = this;
                    if (a)
                        for (var c in a) {
                            var d = O.La[c];
                            "function" == typeof d && (b = d(b, a[c]))
                        }
                    return b
                }}, O.Pa = function(a) {
                return "function" == typeof a.xa && "function" == typeof a.notifySubscribers
            }, O.b("subscribable", O.S), O.b("isSubscribable", O.Pa);
            var Q = [];
            O.r = {lb: function(a) {
                    Q.push({ha: a,Ka: []})
                },end: function() {
                    Q.pop()
                },Va: function(b) {
                    O.Pa(b) || a(Error("Only subscribable things can act as dependencies"));
                    if (0 < Q.length) {
                        var c = Q[Q.length - 1];
                        c && !(0 <= O.a.i(c.Ka, b)) && (c.Ka.push(b), c.ha(b))
                    }
                },K: function(a, b, d) {
                    try {
                        return Q.push(c), a.apply(b, d || [])
                    }finally {
                        Q.pop()
                    }
                }};
            var R = {"undefined": b,"boolean": b,number: b,string: b};
            O.m = function(a) {
                function b() {
                    if (0 < arguments.length) {
                        if (!b.equalityComparer || !b.equalityComparer(c, arguments[0]))
                            b.H(), c = arguments[0], b.G();
                        return this
                    }
                    return O.r.Va(b), c
                }
                var c = a;
                return O.S.call(b), b.t = function() {
                    return c
                }, b.G = function() {
                    b.notifySubscribers(c)
                }, b.H = function() {
                    b.notifySubscribers(c, "beforeChange")
                }, O.a.extend(b, O.m.fn), O.p(b, "peek", b.t), O.p(b, "valueHasMutated", b.G), O.p(b, "valueWillMutate", b.H), b
            }, O.m.fn = {equalityComparer: function(a, b) {
                    return a === c || typeof a in R ? a === b : d
                }};
            var S = O.m.Jb = "__ko_proto__";
            O.m.fn[S] = O.m, O.la = function(a, e) {
                return a === c || a === j || a[S] === j ? d : a[S] === e ? b : O.la(a[S], e)
            }, O.$ = function(a) {
                return O.la(a, O.m)
            }, O.Qa = function(a) {
                return "function" == typeof a && a[S] === O.m || "function" == typeof a && a[S] === O.j && a.yb ? b : d
            }, O.b("observable", O.m), O.b("isObservable", O.$), O.b("isWriteableObservable", O.Qa), O.R = function(b) {
                0 == arguments.length && (b = []), b !== c && b !== j && !("length" in b) && a(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."));
                var d = O.m(b);
                return O.a.extend(d, O.R.fn), d
            }, O.R.fn = {remove: function(a) {
                    for (var b = this.t(), c = [], d = "function" == typeof a ? a : function(b) {
                        return b === a
                    }, e = 0; e < b.length; e++) {
                        var f = b[e];
                        d(f) && (0 === c.length && this.H(), c.push(f), b.splice(e, 1), e--)
                    }
                    return c.length && this.G(), c
                },removeAll: function(a) {
                    if (a === j) {
                        var b = this.t(), c = b.slice(0);
                        return this.H(), b.splice(0, b.length), this.G(), c
                    }
                    return a ? this.remove(function(b) {
                        return 0 <= O.a.i(a, b)
                    }) : []
                },destroy: function(a) {
                    var c = this.t(), d = "function" == typeof a ? a : function(b) {
                        return b === a
                    };
                    this.H();
                    for (var e = c.length - 1; 0 <= e; e--)
                        d(c[e]) && (c[e]._destroy = b);
                    this.G()
                },destroyAll: function(a) {
                    return a === j ? this.destroy(e(b)) : a ? this.destroy(function(b) {
                        return 0 <= O.a.i(a, b)
                    }) : []
                },indexOf: function(a) {
                    var b = this();
                    return O.a.i(b, a)
                },replace: function(a, b) {
                    var c = this.indexOf(a);
                    0 <= c && (this.H(), this.t()[c] = b, this.G())
                }}, O.a.o("pop push reverse shift sort splice unshift".split(" "), function(a) {
                O.R.fn[a] = function() {
                    var b = this.t();
                    return this.H(), b = b[a].apply(b, arguments), this.G(), b
                }
            }), O.a.o(["slice"], function(a) {
                O.R.fn[a] = function() {
                    var b = this();
                    return b[a].apply(b, arguments)
                }
            }), O.b("observableArray", O.R), O.j = function(f, g, h) {
                function i() {
                    O.a.o(A, function(a) {
                        a.B()
                    }), A = []
                }
                function k() {
                    var a = o.throttleEvaluation;
                    a && 0 <= a ? (clearTimeout(B), B = setTimeout(m, a)) : m()
                }
                function m() {
                    if (!u)
                        if (s && y())
                            z();
                        else {
                            u = b;
                            try {
                                var a = O.a.V(A, function(a) {
                                    return a.target
                                });
                                O.r.lb(function(b) {
                                    var c;
                                    0 <= (c = O.a.i(a, b)) ? a[c] = j : A.push(b.xa(k))
                                });
                                for (var c = v.call(g), e = a.length - 1; 0 <= e; e--)
                                    a[e] && A.splice(e, 1)[0].B();
                                s = b, o.notifySubscribers(r, "beforeChange"), r = c
                            }finally {
                                O.r.end()
                            }
                            o.notifySubscribers(r), u = d, A.length || z()
                        }
                }
                function o() {
                    return 0 < arguments.length ? ("function" == typeof w ? w.apply(g, arguments) : a(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")), this) : (s || m(), O.r.Va(o), r)
                }
                function p() {
                    return !s || 0 < A.length
                }
                var r, s = d, u = d, v = f;
                v && "object" == typeof v ? (h = v, v = h.read) : (h = h || {}, v || (v = h.read)), "function" != typeof v && a(Error("Pass a function that returns the value of the ko.computed"));
                var w = h.write, x = h.disposeWhenNodeIsRemoved || h.W || c, y = h.disposeWhen || h.Ja || e(d), z = i, A = [], B = c;
                g || (g = h.owner), o.t = function() {
                    return s || m(), r
                }, o.wb = function() {
                    return A.length
                }, o.yb = "function" == typeof h.write, o.B = function() {
                    z()
                }, o.oa = p, O.S.call(o), O.a.extend(o, O.j.fn), O.p(o, "peek", o.t), O.p(o, "dispose", o.B), O.p(o, "isActive", o.oa), O.p(o, "getDependenciesCount", o.wb), h.deferEvaluation !== b && m();
                if (x && p()) {
                    z = function() {
                        O.a.F.Wa(x, arguments.callee), i()
                    }, O.a.F.Ba(x, z);
                    var C = y, y = function() {
                        return !O.a.X(x) || C()
                    }
                }
                return o
            }, O.Ab = function(a) {
                return O.la(a, O.j)
            }, k = O.m.Jb, O.j[k] = O.m, O.j.fn = {}, O.j.fn[k] = O.j, O.b("dependentObservable", O.j), O.b("computed", O.j), O.b("isComputed", O.Ab), O.fb = function(b) {
                return 0 == arguments.length && a(Error("When calling ko.toJS, pass the object you want to convert.")), K(b, function(a) {
                    for (var b = 0; O.$(a) && 10 > b; b++)
                        a = a();
                    return a
                })
            }, O.toJSON = function(a, b, c) {
                return a = O.fb(a), O.a.wa(a, b, c)
            }, O.b("toJS", O.fb), O.b("toJSON", O.toJSON), O.k = {q: function(a) {
                    switch (O.a.u(a)) {
                        case "option":
                            return a.__ko__hasDomDataOptionValue__ === b ? O.a.f.get(a, O.c.options.ra) : 7 >= O.a.Z ? a.getAttributeNode("value").specified ? a.value : a.text : a.value;
                        case "select":
                            return 0 <= a.selectedIndex ? O.k.q(a.options[a.selectedIndex]) : j;
                        default:
                            return a.value
                    }
                },T: function(a, d) {
                    switch (O.a.u(a)) {
                        case "option":
                            switch (typeof d) {
                                case "string":
                                    O.a.f.set(a, O.c.options.ra, j), "__ko__hasDomDataOptionValue__" in a && delete a.__ko__hasDomDataOptionValue__, a.value = d;
                                    break;
                                default:
                                    O.a.f.set(a, O.c.options.ra, d), a.__ko__hasDomDataOptionValue__ = b, a.value = "number" == typeof d ? d : ""
                            }
                            break;
                        case "select":
                            for (var e = a.options.length - 1; 0 <= e; e--)
                                if (O.k.q(a.options[e]) == d) {
                                    a.selectedIndex = e;
                                    break
                                }
                            break;
                        default:
                            if (d === c || d === j)
                                d = "";
                            a.value = d
                    }
                }}, O.b("selectExtensions", O.k), O.b("selectExtensions.readValue", O.k.q), O.b("selectExtensions.writeValue", O.k.T);
            var T = /\@ko_token_(\d+)\@/g, U = ["true", "false"], V = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;
            O.g = {Q: [],aa: function(a) {
                    var b = O.a.D(a);
                    if (3 > b.length)
                        return [];
                    "{" === b.charAt(0) && (b = b.substring(1, b.length - 1));
                    for (var a = [], d = c, e, f = 0; f < b.length; f++) {
                        var g = b.charAt(f);
                        if (d === c)
                            switch (g) {
                                case '"':
                                case "'":
                                case "/":
                                    d = f, e = g
                            }
                        else if (g == e && "\\" !== b.charAt(f - 1)) {
                            g = b.substring(d, f + 1), a.push(g);
                            var h = "@ko_token_" + (a.length - 1) + "@", b = b.substring(0, d) + h + b.substring(f + 1), f = f - (g.length - h.length), d = c
                        }
                    }
                    e = d = c;
                    for (var i = 0, j = c, f = 0; f < b.length; f++) {
                        g = b.charAt(f);
                        if (d === c)
                            switch (g) {
                                case "{":
                                    d = f, j = g, e = "}";
                                    break;
                                case "(":
                                    d = f, j = g, e = ")";
                                    break;
                                case "[":
                                    d = f, j = g, e = "]"
                            }
                        g === j ? i++ : g === e && (i--, 0 === i && (g = b.substring(d, f + 1), a.push(g), h = "@ko_token_" + (a.length - 1) + "@", b = b.substring(0, d) + h + b.substring(f + 1), f -= g.length - h.length, d = c))
                    }
                    e = [], b = b.split(","), d = 0;
                    for (f = b.length; d < f; d++)
                        i = b[d], j = i.indexOf(":"), 0 < j && j < i.length - 1 ? (g = i.substring(j + 1), e.push({key: I(i.substring(0, j), a),value: I(g, a)})) : e.push({unknown: I(i, a)});
                    return e
                },ba: function(a) {
                    for (var b = "string" == typeof a ? O.g.aa(a) : a, e = [], a = [], f, g = 0; f = b[g]; g++)
                        if (0 < e.length && e.push(","), f.key) {
                            var h;
                            a: {
                                h = f.key;
                                var i = O.a.D(h);
                                switch (i.length && i.charAt(0)) {
                                    case "'":
                                    case '"':
                                        break a;
                                    default:
                                        h = "'" + i + "'"
                                }
                            }
                            f = f.value, e.push(h), e.push(":"), e.push(f), f = O.a.D(f), 0 <= O.a.i(U, O.a.D(f).toLowerCase()) ? f = d : (i = f.match(V), f = i === c ? d : i[1] ? "Object(" + i[1] + ")" + i[2] : f), f && (0 < a.length && a.push(", "), a.push(h + " : function(__ko_value) { " + f + " = __ko_value; }"))
                        } else
                            f.unknown && e.push(f.unknown);
                    return b = e.join(""), 0 < a.length && (b = b + ", '_ko_property_writers' : { " + a.join("") + " } "), b
                },Db: function(a, c) {
                    for (var e = 0; e < a.length; e++)
                        if (O.a.D(a[e].key) == c)
                            return b;
                    return d
                },ea: function(a, b, c, d, e) {
                    !a || !O.Qa(a) ? (a = b()._ko_property_writers) && a[c] && a[c](d) : (!e || a.t() !== d) && a(d)
                }}, O.b("expressionRewriting", O.g), O.b("expressionRewriting.bindingRewriteValidators", O.g.Q), O.b("expressionRewriting.parseObjectLiteral", O.g.aa), O.b("expressionRewriting.preProcessBindings", O.g.ba), O.b("jsonExpressionRewriting", O.g), O.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", O.g.ba);
            var W = "<!--test-->" === g.createComment("test").text, X = W ? /^<\!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*--\>$/ : /^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/, Y = W ? /^<\!--\s*\/ko\s*--\>$/ : /^\s*\/ko\s*$/, Z = {ul: b,ol: b};
            O.e = {I: {},childNodes: function(a) {
                    return G(a) ? D(a) : a.childNodes
                },Y: function(a) {
                    if (G(a))
                        for (var a = O.e.childNodes(a), b = 0, c = a.length; b < c; b++)
                            O.removeNode(a[b]);
                    else
                        O.a.ka(a)
                },N: function(a, b) {
                    if (G(a)) {
                        O.e.Y(a);
                        for (var c = a.nextSibling, d = 0, e = b.length; d < e; d++)
                            c.parentNode.insertBefore(b[d], c)
                    } else
                        O.a.N(a, b)
                },Ua: function(a, b) {
                    G(a) ? a.parentNode.insertBefore(b, a.nextSibling) : a.firstChild ? a.insertBefore(b, a.firstChild) : a.appendChild(b)
                },Oa: function(a, b, c) {
                    c ? G(a) ? a.parentNode.insertBefore(b, c.nextSibling) : c.nextSibling ? a.insertBefore(b, c.nextSibling) : a.appendChild(b) : O.e.Ua(a, b)
                },firstChild: function(a) {
                    return G(a) ? !a.nextSibling || F(a.nextSibling) ? c : a.nextSibling : a.firstChild
                },nextSibling: function(a) {
                    return G(a) && (a = C(a)), a.nextSibling && F(a.nextSibling) ? c : a.nextSibling
                },ib: function(a) {
                    return (a = G(a)) ? a[1] : c
                },Sa: function(a) {
                    if (Z[O.a.u(a)]) {
                        var d = a.firstChild;
                        if (d)
                            do
                                if (1 === d.nodeType) {
                                    var e;
                                    e = d.firstChild;
                                    var f = c;
                                    if (e)
                                        do
                                            if (f)
                                                f.push(e);
                                            else if (G(e)) {
                                                var g = C(e, b);
                                                g ? e = g : f = [e]
                                            } else
                                                F(e) && (f = [e]);
                                        while (e = e.nextSibling);
                                    if (e = f) {
                                        f = d.nextSibling;
                                        for (g = 0; g < e.length; g++)
                                            f ? a.insertBefore(e[g], f) : a.appendChild(e[g])
                                    }
                                }
                            while (d = d.nextSibling)
                    }
                }}, O.b("virtualElements", O.e), O.b("virtualElements.allowedBindings", O.e.I), O.b("virtualElements.emptyNode", O.e.Y), O.b("virtualElements.insertAfter", O.e.Oa), O.b("virtualElements.prepend", O.e.Ua), O.b("virtualElements.setDomNodeChildren", O.e.N), O.J = function() {
                this.Ga = {}
            }, O.a.extend(O.J.prototype, {nodeHasBindings: function(a) {
                    switch (a.nodeType) {
                        case 1:
                            return a.getAttribute("data-bind") != c;
                        case 8:
                            return O.e.ib(a) != c;
                        default:
                            return d
                    }
                },getBindings: function(a, b) {
                    var d = this.getBindingsString(a, b);
                    return d ? this.parseBindingsString(d, b, a) : c
                },getBindingsString: function(a) {
                    switch (a.nodeType) {
                        case 1:
                            return a.getAttribute("data-bind");
                        case 8:
                            return O.e.ib(a);
                        default:
                            return c
                    }
                },parseBindingsString: function(b, c, d) {
                    try {
                        var e;
                        if (!(e = this.Ga[b])) {
                            var f = this.Ga, g = "with($context){with($data||{}){return{" + O.g.ba(b) + "}}}";
                            e = f[b] = new Function("$context", "$element", g)
                        }
                        return e(c, d)
                    } catch (h) {
                        a(Error("Unable to parse bindings.\nMessage: " + h + ";\nBindings value: " + b))
                    }
                }}), O.J.instance = new O.J, O.b("bindingProvider", O.J), O.c = {}, O.z = function(a, b, c) {
                b ? (O.a.extend(this, b), this.$parentContext = b, this.$parent = b.$data, this.$parents = (b.$parents || []).slice(0), this.$parents.unshift(this.$parent)) : (this.$parents = [], this.$root = a, this.ko = O), this.$data = a, c && (this[c] = a)
            }, O.z.prototype.createChildContext = function(a, b) {
                return new O.z(a, this, b)
            }, O.z.prototype.extend = function(a) {
                var b = O.a.extend(new O.z, this);
                return O.a.extend(b, a)
            }, O.cb = function(a, b) {
                if (2 != arguments.length)
                    return O.a.f.get(a, "__ko_bindingContext__");
                O.a.f.set(a, "__ko_bindingContext__", b)
            }, O.Ea = function(a, c, d) {
                return 1 === a.nodeType && O.e.Sa(a), z(a, c, d, b)
            }, O.Da = function(a, c) {
                (1 === c.nodeType || 8 === c.nodeType) && B(a, c, b)
            }, O.Ca = function(c, d) {
                d && 1 !== d.nodeType && 8 !== d.nodeType && a(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")), d = d || f.document.body, A(c, d, b)
            }, O.ja = function(a) {
                switch (a.nodeType) {
                    case 1:
                    case 8:
                        var b = O.cb(a);
                        if (b)
                            return b;
                        if (a.parentNode)
                            return O.ja(a.parentNode)
                }
                return j
            }, O.ob = function(a) {
                return (a = O.ja(a)) ? a.$data : j
            }, O.b("bindingHandlers", O.c), O.b("applyBindings", O.Ca), O.b("applyBindingsToDescendants", O.Da), O.b("applyBindingsToNode", O.Ea), O.b("contextFor", O.ja), O.b("dataFor", O.ob);
            var $ = {"class": "className","for": "htmlFor"};
            O.c.attr = {update: function(a, b) {
                    var e = O.a.d(b()) || {}, f;
                    for (f in e)
                        if ("string" == typeof f) {
                            var g = O.a.d(e[f]), h = g === d || g === c || g === j;
                            h && a.removeAttribute(f), 8 >= O.a.Z && f in $ ? (f = $[f], h ? a.removeAttribute(f) : a[f] = g) : h || a.setAttribute(f, g.toString()), "name" === f && O.a.$a(a, h ? "" : g.toString())
                        }
                }}, O.c.checked = {init: function(a, c, d) {
                    O.a.n(a, "click", function() {
                        var e;
                        if ("checkbox" == a.type)
                            e = a.checked;
                        else {
                            if ("radio" != a.type || !a.checked)
                                return;
                            e = a.value
                        }
                        var f = c(), g = O.a.d(f);
                        "checkbox" == a.type && g instanceof Array ? (e = O.a.i(g, a.value), a.checked && 0 > e ? f.push(a.value) : !a.checked && 0 <= e && f.splice(e, 1)) : O.g.ea(f, d, "checked", e, b)
                    }), "radio" == a.type && !a.name && O.c.uniqueName.init(a, e(b))
                },update: function(a, b) {
                    var c = O.a.d(b());
                    "checkbox" == a.type ? a.checked = c instanceof Array ? 0 <= O.a.i(c, a.value) : c : "radio" == a.type && (a.checked = a.value == c)
                }}, O.c.css = {update: function(a, c) {
                    var e = O.a.d(c());
                    if ("object" == typeof e)
                        for (var f in e) {
                            var g = O.a.d(e[f]);
                            O.a.da(a, f, g)
                        }
                    else
                        e = String(e || ""), O.a.da(a, a.__ko__cssValue, d), a.__ko__cssValue = e, O.a.da(a, e, b)
                }}, O.c.enable = {update: function(a, c) {
                    var d = O.a.d(c());
                    d && a.disabled ? a.removeAttribute("disabled") : !d && !a.disabled && (a.disabled = b)
                }}, O.c.disable = {update: function(a, b) {
                    O.c.enable.update(a, function() {
                        return !O.a.d(b())
                    })
                }}, O.c.event = {init: function(a, c, e, f) {
                    var g = c() || {}, h;
                    for (h in g)
                        (function() {
                            var g = h;
                            "string" == typeof g && O.a.n(a, g, function(a) {
                                var h, i = c()[g];
                                if (i) {
                                    var j = e();
                                    try {
                                        var k = O.a.L(arguments);
                                        k.unshift(f), h = i.apply(f, k)
                                    }finally {
                                        h !== b && (a.preventDefault ? a.preventDefault() : a.returnValue = d)
                                    }
                                    j[g + "Bubble"] === d && (a.cancelBubble = b, a.stopPropagation && a.stopPropagation())
                                }
                            })
                        })()
                }}, O.c.foreach = {Ra: function(a) {
                    return function() {
                        var b = a(), c = O.a.ta(b);
                        return !c || "number" == typeof c.length ? {foreach: b,templateEngine: O.C.na} : (O.a.d(b), {foreach: c.data,as: c.as,includeDestroyed: c.includeDestroyed,afterAdd: c.afterAdd,beforeRemove: c.beforeRemove,afterRender: c.afterRender,beforeMove: c.beforeMove,afterMove: c.afterMove,templateEngine: O.C.na})
                    }
                },init: function(a, b) {
                    return O.c.template.init(a, O.c.foreach.Ra(b))
                },update: function(a, b, c, d, e) {
                    return O.c.template.update(a, O.c.foreach.Ra(b), c, d, e)
                }}, O.g.Q.foreach = d, O.e.I.foreach = b, O.c.hasfocus = {init: function(a, e, f) {
                    function g(c) {
                        a.__ko_hasfocusUpdating = b;
                        var g = a.ownerDocument;
                        "activeElement" in g && (c = g.activeElement === a), g = e(), O.g.ea(g, f, "hasfocus", c, b), a.__ko_hasfocusUpdating = d
                    }
                    var h = g.bind(c, b), i = g.bind(c, d);
                    O.a.n(a, "focus", h), O.a.n(a, "focusin", h), O.a.n(a, "blur", i), O.a.n(a, "focusout", i)
                },update: function(a, b) {
                    var d = O.a.d(b());
                    a.__ko_hasfocusUpdating || (d ? a.focus() : a.blur(), O.r.K(O.a.Aa, c, [a, d ? "focusin" : "focusout"]))
                }}, O.c.html = {init: function() {
                    return {controlsDescendantBindings: b}
                },update: function(a, b) {
                    O.a.ca(a, b())
                }};
            var _ = "__ko_withIfBindingData";
            M("if"), M("ifnot", d, b), M("with", b, d, function(a, b) {
                return a.createChildContext(b)
            }), O.c.options = {update: function(c, d, e) {
                    "select" !== O.a.u(c) && a(Error("options binding applies only to SELECT elements"));
                    for (var f = 0 == c.length, h = O.a.V(O.a.fa(c.childNodes, function(a) {
                        return a.tagName && "option" === O.a.u(a) && a.selected
                    }), function(a) {
                        return O.k.q(a) || a.innerText || a.textContent
                    }), i = c.scrollTop, k = O.a.d(d()); 0 < c.length; )
                        O.A(c.options[0]), c.remove(0);
                    if (k) {
                        var e = e(), m = e.optionsIncludeDestroyed;
                        "number" != typeof k.length && (k = [k]);
                        if (e.optionsCaption) {
                            var n = g.createElement("option");
                            O.a.ca(n, e.optionsCaption), O.k.T(n, j), c.appendChild(n)
                        }
                        for (var d = 0, o = k.length; d < o; d++) {
                            var p = k[d];
                            if (!p || !p._destroy || m) {
                                var n = g.createElement("option"), q = function(a, b, c) {
                                    var d = typeof b;
                                    return "function" == d ? b(a) : "string" == d ? a[b] : c
                                }, r = q(p, e.optionsValue, p);
                                O.k.T(n, O.a.d(r)), p = q(p, e.optionsText, r), O.a.bb(n, p), c.appendChild(n)
                            }
                        }
                        k = c.getElementsByTagName("option"), d = m = 0;
                        for (o = k.length; d < o; d++)
                            0 <= O.a.i(h, O.k.q(k[d])) && (O.a.ab(k[d], b), m++);
                        c.scrollTop = i, f && "value" in e && N(c, O.a.ta(e.value), b), O.a.tb(c)
                    }
                }}, O.c.options.ra = "__ko.optionValueDomData__", O.c.selectedOptions = {init: function(a, b, c) {
                    O.a.n(a, "change", function() {
                        var d = b(), e = [];
                        O.a.o(a.getElementsByTagName("option"), function(a) {
                            a.selected && e.push(O.k.q(a))
                        }), O.g.ea(d, c, "value", e)
                    })
                },update: function(b, c) {
                    "select" != O.a.u(b) && a(Error("values binding applies only to SELECT elements"));
                    var d = O.a.d(c());
                    d && "number" == typeof d.length && O.a.o(b.getElementsByTagName("option"), function(a) {
                        var b = 0 <= O.a.i(d, O.k.q(a));
                        O.a.ab(a, b)
                    })
                }}, O.c.style = {update: function(a, b) {
                    var c = O.a.d(b() || {}), d;
                    for (d in c)
                        if ("string" == typeof d) {
                            var e = O.a.d(c[d]);
                            a.style[d] = e || ""
                        }
                }}, O.c.submit = {init: function(c, e, f, g) {
                    "function" != typeof e() && a(Error("The value for a submit binding must be a function")), O.a.n(c, "submit", function(a) {
                        var f, h = e();
                        try {
                            f = h.call(g, c)
                        }finally {
                            f !== b && (a.preventDefault ? a.preventDefault() : a.returnValue = d)
                        }
                    })
                }}, O.c.text = {update: function(a, b) {
                    O.a.bb(a, b())
                }}, O.e.I.text = b, O.c.uniqueName = {init: function(a, b) {
                    if (b()) {
                        var c = "ko_unique_" + ++O.c.uniqueName.nb;
                        O.a.$a(a, c)
                    }
                }}, O.c.uniqueName.nb = 0, O.c.value = {init: function(a, c, e) {
                    function f() {
                        i = d;
                        var b = c(), f = O.k.q(a);
                        O.g.ea(b, e, "value", f)
                    }
                    var g = ["change"], h = e().valueUpdate, i = d;
                    h && ("string" == typeof h && (h = [h]), O.a.P(g, h), g = O.a.Fa(g)), O.a.Z && "input" == a.tagName.toLowerCase() && "text" == a.type && "off" != a.autocomplete && (!a.form || "off" != a.form.autocomplete) && -1 == O.a.i(g, "propertychange") && (O.a.n(a, "propertychange", function() {
                        i = b
                    }), O.a.n(a, "blur", function() {
                        i && f()
                    })), O.a.o(g, function(b) {
                        var c = f;
                        O.a.Nb(b, "after") && (c = function() {
                            setTimeout(f, 0)
                        }, b = b.substring(5)), O.a.n(a, b, c)
                    })
                },update: function(a, c) {
                    var e = "select" === O.a.u(a), f = O.a.d(c()), g = O.k.q(a), h = f != g;
                    0 === f && 0 !== g && "0" !== g && (h = b), h && (g = function() {
                        O.k.T(a, f)
                    }, g(), e && setTimeout(g, 0)), e && 0 < a.length && N(a, f, d)
                }}, O.c.visible = {update: function(a, b) {
                    var c = O.a.d(b()), d = "none" != a.style.display;
                    c && !d ? a.style.display = "" : !c && d && (a.style.display = "none")
                }}, O.c.click = {init: function(a, b, c, d) {
                    return O.c.event.init.call(this, a, function() {
                        var a = {};
                        return a.click = b(), a
                    }, c, d)
                }}, O.v = function() {
            }, O.v.prototype.renderTemplateSource = function() {
                a(Error("Override renderTemplateSource"))
            }, O.v.prototype.createJavaScriptEvaluatorBlock = function() {
                a(Error("Override createJavaScriptEvaluatorBlock"))
            }, O.v.prototype.makeTemplateSource = function(b, c) {
                if ("string" == typeof b) {
                    var c = c || g, d = c.getElementById(b);
                    return d || a(Error("Cannot find template with ID " + b)), new O.l.h(d)
                }
                if (1 == b.nodeType || 8 == b.nodeType)
                    return new O.l.O(b);
                a(Error("Unknown template type: " + b))
            }, O.v.prototype.renderTemplate = function(a, b, c, d) {
                return a = this.makeTemplateSource(a, d), this.renderTemplateSource(a, b, c)
            }, O.v.prototype.isTemplateRewritten = function(a, c) {
                return this.allowTemplateRewriting === d ? b : this.makeTemplateSource(a, c).data("isRewritten")
            }, O.v.prototype.rewriteTemplate = function(a, c, d) {
                a = this.makeTemplateSource(a, d), c = c(a.text()), a.text(c), a.data("isRewritten", b)
            }, O.b("templateEngine", O.v);
            var ab = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi, bb = /<\!--\s*ko\b\s*([\s\S]*?)\s*--\>/g;
            O.ya = {ub: function(a, b, c) {
                    b.isTemplateRewritten(a, c) || b.rewriteTemplate(a, function(a) {
                        return O.ya.Fb(a, b)
                    }, c)
                },Fb: function(a, b) {
                    return a.replace(ab, function(a, c, d, e, f, g, h) {
                        return y(h, c, b)
                    }).replace(bb, function(a, c) {
                        return y(c, "<!-- ko -->", b)
                    })
                },jb: function(a) {
                    return O.s.qa(function(b, c) {
                        b.nextSibling && O.Ea(b.nextSibling, a, c)
                    })
                }}, O.b("__tr_ambtns", O.ya.jb), O.l = {}, O.l.h = function(a) {
                this.h = a
            }, O.l.h.prototype.text = function() {
                var a = O.a.u(this.h), a = "script" === a ? "text" : "textarea" === a ? "value" : "innerHTML";
                if (0 == arguments.length)
                    return this.h[a];
                var b = arguments[0];
                "innerHTML" === a ? O.a.ca(this.h, b) : this.h[a] = b
            }, O.l.h.prototype.data = function(a) {
                if (1 === arguments.length)
                    return O.a.f.get(this.h, "templateSourceData_" + a);
                O.a.f.set(this.h, "templateSourceData_" + a, arguments[1])
            }, O.l.O = function(a) {
                this.h = a
            }, O.l.O.prototype = new O.l.h, O.l.O.prototype.text = function() {
                if (0 == arguments.length) {
                    var a = O.a.f.get(this.h, "__ko_anon_template__") || {};
                    return a.za === j && a.ia && (a.za = a.ia.innerHTML), a.za
                }
                O.a.f.set(this.h, "__ko_anon_template__", {za: arguments[0]})
            }, O.l.h.prototype.nodes = function() {
                if (0 == arguments.length)
                    return (O.a.f.get(this.h, "__ko_anon_template__") || {}).ia;
                O.a.f.set(this.h, "__ko_anon_template__", {ia: arguments[0]})
            }, O.b("templateSources", O.l), O.b("templateSources.domElement", O.l.h), O.b("templateSources.anonymousTemplate", O.l.O);
            var cb;
            O.va = function(b) {
                b != j && !(b instanceof O.v) && a(Error("templateEngine must inherit from ko.templateEngine")), cb = b
            }, O.ua = function(b, d, e, f, g) {
                e = e || {}, (e.templateEngine || cb) == j && a(Error("Set a template engine before calling renderTemplate")), g = g || "replaceChildren";
                if (f) {
                    var h = s(f);
                    return O.j(function() {
                        var a = d && d instanceof O.z ? d : new O.z(O.a.d(d)), c = "function" == typeof b ? b(a.$data, a) : b, a = r(f, g, c, a, e);
                        "replaceNode" == g && (f = a, h = s(f))
                    }, c, {Ja: function() {
                            return !h || !O.a.X(h)
                        },W: h && "replaceNode" == g ? h.parentNode : h})
                }
                return O.s.qa(function(a) {
                    O.ua(b, d, e, a, "replaceNode")
                })
            }, O.Lb = function(a, b, d, e, f) {
                function g(a, b) {
                    u(b, i), d.afterRender && d.afterRender(b, a)
                }
                function h(b, e) {
                    i = f.createChildContext(O.a.d(b), d.as), i.$index = e;
                    var g = "function" == typeof a ? a(b, i) : a;
                    return r(c, "ignoreTargetNode", g, i, d)
                }
                var i;
                return O.j(function() {
                    var a = O.a.d(b) || [];
                    "undefined" == typeof a.length && (a = [a]), a = O.a.fa(a, function(a) {
                        return d.includeDestroyed || a === j || a === c || !O.a.d(a._destroy)
                    }), O.r.K(O.a.Za, c, [e, a, h, d, g])
                }, c, {W: e})
            }, O.c.template = {init: function(a, c) {
                    var d = O.a.d(c());
                    return "string" != typeof d && !d.name && (1 == a.nodeType || 8 == a.nodeType) && (d = 1 == a.nodeType ? a.childNodes : O.e.childNodes(a), d = O.a.Gb(d), (new O.l.O(a)).nodes(d)), {controlsDescendantBindings: b}
                },update: function(a, d, e, f, g) {
                    var d = O.a.d(d()), e = {}, f = b, h, i = c;
                    "string" != typeof d && (e = d, d = e.name, "if" in e && (f = O.a.d(e["if"])), f && "ifnot" in e && (f = !O.a.d(e.ifnot)), h = O.a.d(e.data)), "foreach" in e ? i = O.Lb(d || a, f && e.foreach || [], e, a, g) : f ? (g = "data" in e ? g.createChildContext(h, e.as) : g, i = O.ua(d || a, g, e, a)) : O.e.Y(a), g = i, (h = O.a.f.get(a, "__ko__templateComputedDomDataKey__")) && "function" == typeof h.B && h.B(), O.a.f.set(a, "__ko__templateComputedDomDataKey__", g && g.oa() ? g : j)
                }}, O.g.Q.template = function(a) {
                return a = O.g.aa(a), 1 == a.length && a[0].unknown || O.g.Db(a, "name") ? c : "This template engine does not support anonymous templates nested within its templates"
            }, O.e.I.template = b, O.b("setTemplateEngine", O.va), O.b("renderTemplate", O.ua), O.a.Ia = function(a, b, c) {
                return a = a || [], b = b || [], a.length <= b.length ? p(a, b, "added", "deleted", c) : p(b, a, "deleted", "added", c)
            }, O.b("utils.compareArrays", O.a.Ia), O.a.Za = function(a, c, d, e, f) {
                function g(a, b) {
                    w = k[b], s !== b && (v[a] = w), w.ma(s++), o(w.M), q.push(w), u.push(w)
                }
                function h(a, b) {
                    if (a)
                        for (var c = 0, d = b.length; c < d; c++)
                            b[c] && O.a.o(b[c].M, function(d) {
                                a(d, c, b[c].U)
                            })
                }
                for (var c = c || [], e = e || {}, i = O.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === j, k = O.a.f.get(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], n = O.a.V(k, function(a) {
                    return a.U
                }), p = O.a.Ia(n, c), q = [], r = 0, s = 0, t = [], u = [], c = [], v = [], n = [], w, x = 0, y, z; y = p[x]; x++)
                    switch (z = y.moved, y.status) {
                        case "deleted":
                            z === j && (w = k[r], w.j && w.j.B(), t.push.apply(t, o(w.M)), e.beforeRemove && (c[x] = w, u.push(w))), r++;
                            break;
                        case "retained":
                            g(x, r++);
                            break;
                        case "added":
                            z !== j ? g(x, z) : (w = {U: y.value,ma: O.m(s++)}, q.push(w), u.push(w), i || (n[x] = w))
                    }
                h(e.beforeMove, v), O.a.o(t, e.beforeRemove ? O.A : O.removeNode);
                for (var x = 0, i = O.e.firstChild(a), A; w = u[x]; x++) {
                    w.M || O.a.extend(w, m(a, d, w.U, f, w.ma));
                    for (r = 0; p = w.M[r]; i = p.nextSibling, A = p, r++)
                        p !== i && O.e.Oa(a, p, A);
                    !w.zb && f && (f(w.U, w.M, w.ma), w.zb = b)
                }
                h(e.beforeRemove, c), h(e.afterMove, v), h(e.afterAdd, n), O.a.f.set(a, "setDomNodeChildrenFromArrayMapping_lastMappingResult", q)
            }, O.b("utils.setDomNodeChildrenFromArrayMapping", O.a.Za), O.C = function() {
                this.allowTemplateRewriting = d
            }, O.C.prototype = new O.v, O.C.prototype.renderTemplateSource = function(a) {
                var d = 9 > O.a.Z || !a.nodes ? c : a.nodes();
                return d ? O.a.L(d.cloneNode(b).childNodes) : (a = a.text(), O.a.sa(a))
            }, O.C.na = new O.C, O.va(O.C.na), O.b("nativeTemplateEngine", O.C), O.pa = function() {
                var b = this.Cb = function() {
                    if ("undefined" == typeof i || !i.tmpl)
                        return 0;
                    try {
                        if (0 <= i.tmpl.tag.tmpl.open.toString().indexOf("__"))
                            return 2
                    } catch (a) {
                    }
                    return 1
                }();
                this.renderTemplateSource = function(d, e, f) {
                    f = f || {}, 2 > b && a(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later."));
                    var h = d.data("precompiled");
                    return h || (h = d.text() || "", h = i.template(c, "{{ko_with $item.koBindingContext}}" + h + "{{/ko_with}}"), d.data("precompiled", h)), d = [e.$data], e = i.extend({koBindingContext: e}, f.templateOptions), e = i.tmpl(h, d, e), e.appendTo(g.createElement("div")), i.fragments = {}, e
                }, this.createJavaScriptEvaluatorBlock = function(a) {
                    return "{{ko_code ((function() { return " + a + " })()) }}"
                }, this.addTemplate = function(a, b) {
                    g.write("<script type='text/html' id='" + a + "'>" + b + "</script>")
                }, 0 < b && (i.tmpl.tag.ko_code = {open: "__.push($1 || '');"}, i.tmpl.tag.ko_with = {open: "with($1) {",close: "} "})
            }, O.pa.prototype = new O.v, k = new O.pa, 0 < k.Cb && O.va(k), O.b("jqueryTmplTemplateEngine", O.pa)
        }
        var b = !0, c = null, d = !1, f = window, g = document, h = navigator, i = window.jQuery, j = void 0;
        "function" == typeof require && "object" == typeof exports && "object" == typeof module ? k(module.exports || exports) : "function" == typeof define && define.amd ? define("knockout", ["exports"], k) : k(f.ko = {}), b
    }(), define("settingsModule", ["knockout"], function(a) {
        var b = {}, c = !1;
        return b.init = function(b) {
            c || (a.applyBindings(b, $("#settingsContainer")[0]), c = !0)
        }, b
    }), function(a) {
        function b(a, b, c, d) {
            var e = c.lang();
            return e[a].call ? e[a](c, d) : e[a][b]
        }
        function c(a, b) {
            return function(c) {
                return h(a.call(this, c), b)
            }
        }
        function d(a) {
            return function(b) {
                var c = a.call(this, b);
                return c + this.lang().ordinal(c)
            }
        }
        function e(a, b, c) {
            this._d = a, this._isUTC = !!b, this._a = a._a || null, this._lang = c || !1
        }
        function f(a) {
            var b = this._data = {}, c = a.years || a.y || 0, d = a.months || a.M || 0, e = a.weeks || a.w || 0, f = a.days || a.d || 0, h = a.hours || a.h || 0, i = a.minutes || a.m || 0, j = a.seconds || a.s || 0, k = a.milliseconds || a.ms || 0;
            this._milliseconds = k + j * 1e3 + i * 6e4 + h * 36e5, this._days = f + e * 7, this._months = d + c * 12, b.milliseconds = k % 1e3, j += g(k / 1e3), b.seconds = j % 60, i += g(j / 60), b.minutes = i % 60, h += g(i / 60), b.hours = h % 24, f += g(h / 24), f += e * 7, b.days = f % 30, d += g(f / 30), b.months = d % 12, c += g(d / 12), b.years = c, this._lang = !1
        }
        function g(a) {
            return a < 0 ? Math.ceil(a) : Math.floor(a)
        }
        function h(a, b) {
            var c = a + "";
            while (c.length < b)
                c = "0" + c;
            return c
        }
        function i(a, b, c) {
            var d = b._milliseconds, e = b._days, f = b._months, g;
            d && a._d.setTime(+a + d * c), e && a.date(a.date() + e * c), f && (g = a.date(), a.date(1).month(a.month() + f * c).date(Math.min(g, a.daysInMonth())))
        }
        function j(a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        }
        function k(a, b) {
            var c = Math.min(a.length, b.length), d = Math.abs(a.length - b.length), e = 0, f;
            for (f = 0; f < c; f++)
                ~~a[f] !== ~~b[f] && e++;
            return e + d
        }
        function l(a, b, c, d) {
            var e, f, g = [];
            for (e = 0; e < 7; e++)
                g[e] = a[e] = a[e] == null ? e === 2 ? 1 : 0 : a[e];
            return a[7] = g[7] = b, a[8] != null && (g[8] = a[8]), a[3] += c || 0, a[4] += d || 0, f = new Date(0), b ? (f.setUTCFullYear(a[0], a[1], a[2]), f.setUTCHours(a[3], a[4], a[5], a[6])) : (f.setFullYear(a[0], a[1], a[2]), f.setHours(a[3], a[4], a[5], a[6])), f._a = g, f
        }
        function m(a, b) {
            var c, d, e = [];
            !b && H && (b = require("./lang/" + a));
            for (c = 0; c < I.length; c++)
                b[I[c]] = b[I[c]] || F.en[I[c]];
            for (c = 0; c < 12; c++)
                d = B([2e3, c]), e[c] = new RegExp("^" + (b.months[c] || b.months(d, "")) + "|^" + (b.monthsShort[c] || b.monthsShort(d, "")).replace(".", ""), "i");
            return b.monthsParse = b.monthsParse || e, F[a] = b, b
        }
        function n(a) {
            var b = typeof a == "string" && a || a && a._lang || null;
            return b ? F[b] || m(b) : B
        }
        function o(a) {
            return a.match(/\[.*\]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
        }
        function p(a) {
            var b = a.match(K), c, d;
            for (c = 0, d = b.length; c < d; c++)
                bb[b[c]] ? b[c] = bb[b[c]] : b[c] = o(b[c]);
            return function(e) {
                var f = "";
                for (c = 0; c < d; c++)
                    f += typeof b[c].call == "function" ? b[c].call(e, a) : b[c];
                return f
            }
        }
        function q(a, b) {
            function c(b) {
                return a.lang().longDateFormat[b] || b
            }
            var d = 5;
            while (d-- && L.test(b))
                b = b.replace(L, c);
            return $[b] || ($[b] = p(b)), $[b](a)
        }
        function r(a) {
            switch (a) {
                case "DDDD":
                    return P;
                case "YYYY":
                    return Q;
                case "S":
                case "SS":
                case "SSS":
                case "DDD":
                    return O;
                case "MMM":
                case "MMMM":
                case "dd":
                case "ddd":
                case "dddd":
                case "a":
                case "A":
                    return R;
                case "Z":
                case "ZZ":
                    return S;
                case "T":
                    return T;
                case "MM":
                case "DD":
                case "YY":
                case "HH":
                case "hh":
                case "mm":
                case "ss":
                case "M":
                case "D":
                case "d":
                case "H":
                case "h":
                case "m":
                case "s":
                    return N;
                default:
                    return new RegExp(a.replace("\\", ""))
            }
        }
        function s(a, b, c, d) {
            var e, f;
            switch (a) {
                case "M":
                case "MM":
                    c[1] = b == null ? 0 : ~~b - 1;
                    break;
                case "MMM":
                case "MMMM":
                    for (e = 0; e < 12; e++)
                        if (n().monthsParse[e].test(b)) {
                            c[1] = e, f = !0;
                            break
                        }
                    f || (c[8] = !1);
                    break;
                case "D":
                case "DD":
                case "DDD":
                case "DDDD":
                    b != null && (c[2] = ~~b);
                    break;
                case "YY":
                    c[0] = ~~b + (~~b > 70 ? 1900 : 2e3);
                    break;
                case "YYYY":
                    c[0] = ~~Math.abs(b);
                    break;
                case "a":
                case "A":
                    d.isPm = (b + "").toLowerCase() === "pm";
                    break;
                case "H":
                case "HH":
                case "h":
                case "hh":
                    c[3] = ~~b;
                    break;
                case "m":
                case "mm":
                    c[4] = ~~b;
                    break;
                case "s":
                case "ss":
                    c[5] = ~~b;
                    break;
                case "S":
                case "SS":
                case "SSS":
                    c[6] = ~~(("0." + b) * 1e3);
                    break;
                case "Z":
                case "ZZ":
                    d.isUTC = !0, e = (b + "").match(X), e && e[1] && (d.tzh = ~~e[1]), e && e[2] && (d.tzm = ~~e[2]), e && e[0] === "+" && (d.tzh = -d.tzh, d.tzm = -d.tzm)
            }
            b == null && (c[8] = !1)
        }
        function t(a, b) {
            var c = [0, 0, 1, 0, 0, 0, 0], d = {tzh: 0,tzm: 0}, e = b.match(K), f, g;
            for (f = 0; f < e.length; f++)
                g = (r(e[f]).exec(a) || [])[0], g && (a = a.slice(a.indexOf(g) + g.length)), bb[e[f]] && s(e[f], g, c, d);
            return d.isPm && c[3] < 12 && (c[3] += 12), d.isPm === !1 && c[3] === 12 && (c[3] = 0), l(c, d.isUTC, d.tzh, d.tzm)
        }
        function u(a, b) {
            var c, d = a.match(M) || [], f, g = 99, h, i, j;
            for (h = 0; h < b.length; h++)
                i = t(a, b[h]), f = q(new e(i), b[h]).match(M) || [], j = k(d, f), j < g && (g = j, c = i);
            return c
        }
        function v(a) {
            var b = "YYYY-MM-DDT", c;
            if (U.exec(a)) {
                for (c = 0; c < 4; c++)
                    if (W[c][1].exec(a)) {
                        b += W[c][0];
                        break
                    }
                return S.exec(a) ? t(a, b + " Z") : t(a, b)
            }
            return new Date(a)
        }
        function w(a, b, c, d, e) {
            var f = e.relativeTime[a];
            return typeof f == "function" ? f(b || 1, !!c, a, d) : f.replace(/%d/i, b || 1)
        }
        function x(a, b, c) {
            var d = D(Math.abs(a) / 1e3), e = D(d / 60), f = D(e / 60), g = D(f / 24), h = D(g / 365), i = d < 45 && ["s", d] || e === 1 && ["m"] || e < 45 && ["mm", e] || f === 1 && ["h"] || f < 22 && ["hh", f] || g === 1 && ["d"] || g <= 25 && ["dd", g] || g <= 45 && ["M"] || g < 345 && ["MM", D(g / 30)] || h === 1 && ["y"] || ["yy", h];
            return i[2] = b, i[3] = a > 0, i[4] = c, w.apply({}, i)
        }
        function y(a, b) {
            B.fn[a] = function(a) {
                var c = this._isUTC ? "UTC" : "";
                return a != null ? (this._d["set" + c + b](a), this) : this._d["get" + c + b]()
            }
        }
        function z(a) {
            B.duration.fn[a] = function() {
                return this._data[a]
            }
        }
        function A(a, b) {
            B.duration.fn["as" + a] = function() {
                return +this / b
            }
        }
        var B, C = "1.7.2", D = Math.round, E, F = {}, G = "en", H = typeof module != "undefined" && module.exports, I = "months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"), J = /^\/?Date\((\-?\d+)/i, K = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|.)/g, L = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?)/g, M = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, N = /\d\d?/, O = /\d{1,3}/, P = /\d{3}/, Q = /\d{1,4}/, R = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i, S = /Z|[\+\-]\d\d:?\d\d/i, T = /T/i, U = /^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, V = "YYYY-MM-DDTHH:mm:ssZ", W = [["HH:mm:ss.S", /T\d\d:\d\d:\d\d\.\d{1,3}/], ["HH:mm:ss", /T\d\d:\d\d:\d\d/], ["HH:mm", /T\d\d:\d\d/], ["HH", /T\d\d/]], X = /([\+\-]|\d\d)/gi, Y = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), Z = {Milliseconds: 1,Seconds: 1e3,Minutes: 6e4,Hours: 36e5,Days: 864e5,Months: 2592e6,Years: 31536e6}, $ = {}, _ = "DDD w M D d".split(" "), ab = "M D H h m s w".split(" "), bb = {M: function() {
                return this.month() + 1
            },MMM: function(a) {
                return b("monthsShort", this.month(), this, a)
            },MMMM: function(a) {
                return b("months", this.month(), this, a)
            },D: function() {
                return this.date()
            },DDD: function() {
                var a = new Date(this.year(), this.month(), this.date()), b = new Date(this.year(), 0, 1);
                return ~~((a - b) / 864e5 + 1.5)
            },d: function() {
                return this.day()
            },dd: function(a) {
                return b("weekdaysMin", this.day(), this, a)
            },ddd: function(a) {
                return b("weekdaysShort", this.day(), this, a)
            },dddd: function(a) {
                return b("weekdays", this.day(), this, a)
            },w: function() {
                var a = new Date(this.year(), this.month(), this.date() - this.day() + 5), b = new Date(a.getFullYear(), 0, 4);
                return ~~((a - b) / 864e5 / 7 + 1.5)
            },YY: function() {
                return h(this.year() % 100, 2)
            },YYYY: function() {
                return h(this.year(), 4)
            },a: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !0)
            },A: function() {
                return this.lang().meridiem(this.hours(), this.minutes(), !1)
            },H: function() {
                return this.hours()
            },h: function() {
                return this.hours() % 12 || 12
            },m: function() {
                return this.minutes()
            },s: function() {
                return this.seconds()
            },S: function() {
                return ~~(this.milliseconds() / 100)
            },SS: function() {
                return h(~~(this.milliseconds() / 10), 2)
            },SSS: function() {
                return h(this.milliseconds(), 3)
            },Z: function() {
                var a = -this.zone(), b = "+";
                return a < 0 && (a = -a, b = "-"), b + h(~~(a / 60), 2) + ":" + h(~~a % 60, 2)
            },ZZ: function() {
                var a = -this.zone(), b = "+";
                return a < 0 && (a = -a, b = "-"), b + h(~~(10 * a / 6), 4)
            }};
        while (_.length)
            E = _.pop(), bb[E + "o"] = d(bb[E]);
        while (ab.length)
            E = ab.pop(), bb[E + E] = c(bb[E], 2);
        bb.DDDD = c(bb.DDD, 3), B = function(b, c) {
            if (b === null || b === "")
                return null;
            var d, f;
            return B.isMoment(b) ? new e(new Date(+b._d), b._isUTC, b._lang) : (c ? j(c) ? d = u(b, c) : d = t(b, c) : (f = J.exec(b), d = b === a ? new Date : f ? new Date(+f[1]) : b instanceof Date ? b : j(b) ? l(b) : typeof b == "string" ? v(b) : new Date(b)), new e(d))
        }, B.utc = function(a, b) {
            return j(a) ? new e(l(a, !0), !0) : (typeof a == "string" && !S.exec(a) && (a += " +0000", b && (b += " Z")), B(a, b).utc())
        }, B.unix = function(a) {
            return B(a * 1e3)
        }, B.duration = function(a, b) {
            var c = B.isDuration(a), d = typeof a == "number", e = c ? a._data : d ? {} : a, g;
            return d && (b ? e[b] = a : e.milliseconds = a), g = new f(e), c && (g._lang = a._lang), g
        }, B.humanizeDuration = function(a, b, c) {
            return B.duration(a, b === !0 ? null : b).humanize(b === !0 ? !0 : c)
        }, B.version = C, B.defaultFormat = V, B.lang = function(a, b) {
            var c;
            if (!a)
                return G;
            (b || !F[a]) && m(a, b);
            if (F[a]) {
                for (c = 0; c < I.length; c++)
                    B[I[c]] = F[a][I[c]];
                B.monthsParse = F[a].monthsParse, G = a
            }
        }, B.langData = n, B.isMoment = function(a) {
            return a instanceof e
        }, B.isDuration = function(a) {
            return a instanceof f
        }, B.lang("en", {months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat: {LT: "h:mm A",L: "MM/DD/YYYY",LL: "MMMM D YYYY",LLL: "MMMM D YYYY LT",LLLL: "dddd, MMMM D YYYY LT"},meridiem: function(a, b, c) {
                return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
            },calendar: {sameDay: "[Today at] LT",nextDay: "[Tomorrow at] LT",nextWeek: "dddd [at] LT",lastDay: "[Yesterday at] LT",lastWeek: "[last] dddd [at] LT",sameElse: "L"},relativeTime: {future: "in %s",past: "%s ago",s: "a few seconds",m: "a minute",mm: "%d minutes",h: "an hour",hh: "%d hours",d: "a day",dd: "%d days",M: "a month",MM: "%d months",y: "a year",yy: "%d years"},ordinal: function(a) {
                var b = a % 10;
                return ~~(a % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th"
            }}), B.fn = e.prototype = {clone: function() {
                return B(this)
            },valueOf: function() {
                return +this._d
            },unix: function() {
                return Math.floor(+this._d / 1e3)
            },toString: function() {
                return this._d.toString()
            },toDate: function() {
                return this._d
            },toArray: function() {
                var a = this;
                return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds(), !!this._isUTC]
            },isValid: function() {
                return this._a ? this._a[8] != null ? !!this._a[8] : !k(this._a, (this._a[7] ? B.utc(this._a) : B(this._a)).toArray()) : !isNaN(this._d.getTime())
            },utc: function() {
                return this._isUTC = !0, this
            },local: function() {
                return this._isUTC = !1, this
            },format: function(a) {
                return q(this, a ? a : B.defaultFormat)
            },add: function(a, b) {
                var c = b ? B.duration(+b, a) : B.duration(a);
                return i(this, c, 1), this
            },subtract: function(a, b) {
                var c = b ? B.duration(+b, a) : B.duration(a);
                return i(this, c, -1), this
            },diff: function(a, b, c) {
                var d = this._isUTC ? B(a).utc() : B(a).local(), e = (this.zone() - d.zone()) * 6e4, f = this._d - d._d - e, g = this.year() - d.year(), h = this.month() - d.month(), i = this.date() - d.date(), j;
                return b === "months" ? j = g * 12 + h + i / 30 : b === "years" ? j = g + (h + i / 30) / 12 : j = b === "seconds" ? f / 1e3 : b === "minutes" ? f / 6e4 : b === "hours" ? f / 36e5 : b === "days" ? f / 864e5 : b === "weeks" ? f / 6048e5 : f, c ? j : D(j)
            },from: function(a, b) {
                return B.duration(this.diff(a)).lang(this._lang).humanize(!b)
            },fromNow: function(a) {
                return this.from(B(), a)
            },calendar: function() {
                var a = this.diff(B().sod(), "days", !0), b = this.lang().calendar, c = b.sameElse, d = a < -6 ? c : a < -1 ? b.lastWeek : a < 0 ? b.lastDay : a < 1 ? b.sameDay : a < 2 ? b.nextDay : a < 7 ? b.nextWeek : c;
                return this.format(typeof d == "function" ? d.apply(this) : d)
            },isLeapYear: function() {
                var a = this.year();
                return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
            },isDST: function() {
                return this.zone() < B([this.year()]).zone() || this.zone() < B([this.year(), 5]).zone()
            },day: function(a) {
                var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                return a == null ? b : this.add({d: a - b})
            },startOf: function(a) {
                switch (a.replace(/s$/, "")) {
                    case "year":
                        this.month(0);
                    case "month":
                        this.date(1);
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                }
                return this
            },endOf: function(a) {
                return this.startOf(a).add(a.replace(/s?$/, "s"), 1).subtract("ms", 1)
            },sod: function() {
                return this.clone().startOf("day")
            },eod: function() {
                return this.clone().endOf("day")
            },zone: function() {
                return this._isUTC ? 0 : this._d.getTimezoneOffset()
            },daysInMonth: function() {
                return B.utc([this.year(), this.month() + 1, 0]).date()
            },lang: function(b) {
                return b === a ? n(this) : (this._lang = b, this)
            }};
        for (E = 0; E < Y.length; E++)
            y(Y[E].toLowerCase(), Y[E]);
        y("year", "FullYear"), B.duration.fn = f.prototype = {weeks: function() {
                return g(this.days() / 7)
            },valueOf: function() {
                return this._milliseconds + this._days * 864e5 + this._months * 2592e6
            },humanize: function(a) {
                var b = +this, c = this.lang().relativeTime, d = x(b, !a, this.lang()), e = b <= 0 ? c.past : c.future;
                return a && (typeof e == "function" ? d = e(d) : d = e.replace(/%s/i, d)), d
            },lang: B.fn.lang};
        for (E in Z)
            Z.hasOwnProperty(E) && (A(E, Z[E]), z(E.toLowerCase()));
        A("Weeks", 6048e5), H && (module.exports = B), typeof ender == "undefined" && (this.moment = B), typeof define == "function" && define.amd && define("moment", [], function() {
            return B
        })
    }.call(this), define("timesheetModule", ["jquery", "knockout", "moment"], function(a, b, c) {
        var d = {}, e = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], f = !1, g = function(a) {
            var b = a.day();
            return b === 0 || b === 6
        }, h = function(a) {
            var b = {}, d = c(a).add("months", 1);
            b.start = c([a.year(), a.month(), 1]);
            var e = d.date(), f = d.subtract("days", e);
            return b.end = c([f.year(), f.month(), f.date()]), b
        }, i = function(a) {
            var b = {}, d = c(a).subtract("months", 1);
            b.start = c([d.year(), d.month(), 1]);
            var e = c([d.year(), d.month(), 1]), f = e.add("months", 1).subtract("days", 1);
            return b.end = c([f.year(), f.month(), f.date()]), b
        }, j = function(b) {
            var c = b.substring(0, b.indexOf("@")).split("."), d = a.map(c, function(a) {
                return a.charAt(0).toUpperCase() + a.slice(1)
            }), e = d.join(" ");
            return e
        }, k = function(a) {
            var b = this;
            b.isWeekend = a.isWeekend, b.date = a.startDate, b.workedFullDay = a.workedFullDay || !1, b.workedHalfDay = a.workedHalfDay || !1, b.hours = a.hours, b.comment = a.comment || ""
        }, l = function() {
            var d = this;
            d.notBillableDays = b.observableArray([]), d.notFullDayWorkedDays = b.observableArray([]), d.name = b.observable(""), d.timeSheetDay = b.observable(c()), d.firstAndLastOfMontForTimeSheetDay = b.computed(function() {
                var a = d.timeSheetDay(), b = a.date() > 20 ? h(a) : i(a);
                return b
            }), d.title = b.computed(function() {
                var a = e[d.firstAndLastOfMontForTimeSheetDay().start.month()], b = d.name();
                return b + " - " + a
            }), d.hours = b.observable(8), d.totaal = b.observable(0), d.timesheetDays = b.computed(function() {
                d.totaal(0);
                var b = [], e = d.notBillableDays(), f = d.notFullDayWorkedDays(), h = d.firstAndLastOfMontForTimeSheetDay(), i = function(a) {
                    return c(a.date).format("DD/MM/YYYY") === m
                }, j = c(h.start);
                for (var l = j; l <= h.end; l.add("days", 1)) {
                    var m = c(l).format("DD/MM/YYYY"), n = a.grep(e, i)[0], o = a.grep(f, i)[0], p = !1, q = !1, r = 0, s = g(l);
                    !n && !s && (o ? (r = d.hours() / 2, q = !0) : (p = !0, r = d.hours()), d.totaal(d.totaal() + r));
                    var t = n ? n.comment : "";
                    o && (t = "Halve dag"), b.push(new k({isWeekend: s,startDate: m,workedFullDay: p,workedHalfDay: q,hours: r,comment: t}))
                }
                return b
            }), d.gotoPreviousMonth = function() {
                var a = c(d.timeSheetDay()).subtract("months", 1);
                d.timeSheetDay(a)
            }, d.gotoNextMonth = function() {
                var a = c(d.timeSheetDay()).add("months", 1);
                d.timeSheetDay(a)
            }
        }, m = new l;
        return d.show = function(d, e) {
            var g = a("#timesheetContainer"), h = [], i = [];
            return a.each(d.eventsGrouped, function(b, c) {
                a.each(c.items, function(a, b) {
                    b.comment = b.summaryCatMatch;
                    var c = new k(b);
                    b.isFullDay ? h.push(c) : i.push(c)
                })
            }), a.each(d.holidays, function(a, b) {
                var d = new k({isWeekend: !0,startDate: c(b.start.date),workedFullDay: !1,workedHalfDay: !1,hours: 0,comment: b.summary});
                h.push(d)
            }), m.notBillableDays(h), m.notFullDayWorkedDays(i), e && m.timeSheetDay(e), m.name(j(d.calenderName)), f || (g.length && b.applyBindings(m, g[0]), f = !0), {timesheetDays: m.timesheetDays(),title: m.title(),totalHours: m.totaal()}
        }, d
    }), define("utils", ["jquery"], function(a) {
        var b = {};
        return b.months = ["Jan", "Feb", "Maart", "Apr", "Mei", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"], b.toDate = function(a) {
            if (a.date) {
                var b = parseInt(a.date.substring(0, 4), 10), c = parseInt(a.date.substring(5, 7), 10) - 1, d = parseInt(a.date.substring(8, 10), 10);
                return new Date(b, c, d)
            }
            if (a.dateTime)
                return new Date(a.dateTime);
            throw "Unable to convert input to a date " + a
        }, b.trimAndLowerCase = function(b) {
            return b ? a.trim(b.toLowerCase()) : ""
        }, b
    }), define("overviewCalculationModule", ["knockout", "utils"], function(a, b) {
        var c = {}, d = function(a, c) {
            var d = b.trimAndLowerCase(a.summary) === b.trimAndLowerCase(c), e = a.status === "confirmed";
            return d && e
        };
        return c.getOverviewByEventsAndCategories = function(c, e, f) {
            var g = f || new Date, h = [];
            return a.utils.arrayForEach(e, function(e) {
                var f = 0, i = 0, j = e.name(), k = e.number(), l = 0;
                a.utils.arrayForEach(c, function(a) {
                    if (!d(a, j))
                        return;
                    var c = a.isFullDay ? 1 : .5;
                    b.toDate(a.end) < g ? f += c : i += c
                }), l = k - f - i, h.push({name: j,max: k,aantalOpgenomen: f,aantalGepland: i,remaining: l})
            }), h
        }, c.getGroupedOverviewByEventsAndCategories = function(c, e, f) {
            var g = f || new Date, h = [{name: "Detail voorbijgaande",items: []}, {name: "Detail toekomst",items: []}];
            return a.utils.arrayForEach(c, function(c) {
                var f = b.toDate(c.end) < g, i = !1;
                a.utils.arrayForEach(e, function(a) {
                    d(c, a.name()) && (i = !0)
                });
                if (i) {
                    var j = f ? 0 : 1;
                    h[j].items.push(c)
                }
            }), h
        }, c
    }), define("ViewModel", ["knockout", "moment", "utils", "overviewCalculationModule"], function(a, b, c, d) {
        return function() {
            var e = this, f = (new Date).getFullYear();
            e.loading = a.observable(!0), e.authorized = a.observable(!1), e.categories = a.observableArray([]), e.events = a.observableArray([]), e.holidays = a.observableArray([]), e.eventsGrouped = a.computed(function() {
                var a = e.events(), b = e.categories();
                return d.getGroupedOverviewByEventsAndCategories(a, b)
            }), e.years = a.observable([f - 2, f - 1, f, f + 1]), e.categoryOverviews = a.computed(function() {
                var a = e.events(), b = e.categories();
                return d.getOverviewByEventsAndCategories(a, b)
            }), e.gotoPreviousMonth = function() {
                var a = b(e.monthDay()).subtract("months", 1);
                e.monthDay(a)
            }, e.gotoNextMonth = function() {
                var a = b(e.monthDay()).add("months", 1);
                e.monthDay(a)
            }, e.monthDay = a.observable(b()), e.month = a.computed(function() {
                var a = c.months[e.monthDay().month()];
                return a
            }), e.year = a.computed({read: function() {
                    return e.monthDay().year()
                },write: function(a) {
                    e.monthDay(e.monthDay().year(parseInt(a, 10)))
                },owner: e}), e.eventsInMonth = a.computed(function() {
                var b = e.monthDay().month(), d = e.categories();
                return a.utils.arrayFilter(e.events(), function(a) {
                    var e = !!$.grep(d, function(b) {
                        return c.trimAndLowerCase(a.summary) == c.trimAndLowerCase(b.name())
                    })[0];
                    return b === a.startDate.getMonth() && e
                })
            }), e.monthCounter = a.computed(function() {
                return e.eventsInMonth().length
            })
        }
    }), define("async", [], function() {
        function c(a) {
            var b, c;
            b = document.createElement("script"), b.type = "text/javascript", b.async = !0, b.src = a, c = document.getElementsByTagName("script")[0], c.parentNode.insertBefore(b, c)
        }
        function d(b, c) {
            var d = /!(.+)/, e = b.replace(d, ""), f = d.test(b) ? b.replace(/.+!/, "") : a;
            return e += e.indexOf("?") < 0 ? "?" : "&", e + f + "=" + c
        }
        function e() {
            return b += 1, "__async_req_" + b + "__"
        }
        var a = "callback", b = 0;
        return {load: function(a, b, f, g) {
                if (g.isBuild)
                    f(null);
                else {
                    var h = e();
                    window[h] = f, c(d(a, h))
                }
                var i = function() {
                    try {
                        gapi && gapi.client ? f() : setTimeout(function() {
                            i()
                        }, 10)
                    } catch (a) {
                        setTimeout(function() {
                            i()
                        }, 10)
                    }
                };
                i()
            }}
    }), define("gcalModule", ["async!https://apis.google.com/js/client.js?test=test"], function() {
        var a = function() {
            var a = this, b = new jQuery.Deferred, c = !1, d = !1, e = {read: ["https://www.googleapis.com/auth/calendar.readonly", "https://www.googleapis.com/auth/userinfo.profile"],readWrite: "https://www.googleapis.com/auth/calendar"}, f = {clientId: "235814546194.apps.googleusercontent.com",apiKey: "AIzaSyBu67W-Rs4jQr0sGksPujKU92ClbStmSZs",scopes: e.read}, g = function(a) {
                a && !a.error ? i().then(function() {
                    b.resolve()
                }) : b.reject()
            }, h = function() {
                gapi.auth.authorize({client_id: f.clientId,scope: f.scopes,immediate: !0}, g)
            }, i = function() {
                var a = new jQuery.Deferred;
                return $.when(j(), k()).then(function() {
                    a.resolve()
                }), a
            }, j = function() {
                var a = new jQuery.Deferred;
                return gapi.client.load("oauth2", "v2", function() {
                    d = gapi.client.oauth2, a.resolve(gapi.client.oauth2)
                }), a
            }, k = function() {
                var a = new jQuery.Deferred;
                return gapi.client.load("calendar", "v3", function() {
                    c = gapi.client.calendar, a.resolve(gapi.client.calendar)
                }), a
            }, l = function(a) {
                var b = new jQuery.Deferred;
                a.fields = "accessRole,description,etag,items,kind,nextPageToken,summary,timeZone,updated", a.orderBy = "startTime", a.singleEvents = !0;
                var d = c.events.list(a);
                return d.execute(function(a) {
                    a.message && console.log(a.message), a.error && console.log(a.error), a.items && b.resolve(a.items)
                }), b
            };
            a.getUserInfo = function() {
                var a = new jQuery.Deferred, b = d.userinfo.get();
                return b.execute(function(b) {
                    b.error && console.log(b.error), !b.error && a.resolve(b)
                }), a
            }, a.getEventsItems = function(a, b) {
                b = b || (new Date).getFullYear();
                var c = b + "-01-01T00:00:00+02:00", d = b + 1 + "-01-01T00:00:00+02:00";
                return l({calendarId: a,timeMin: c,timeMax: d})
            }, a.getCalendarList = function() {
                var a = new jQuery.Deferred, b = c.calendarList.list();
                return b.execute(function(b) {
                    b.message && console.log(b.message), b.error && console.log(b.error), b.items && a.resolve(b.items)
                }), a
            }, a.authorizeNotImmediate = function() {
                return b = new jQuery.Deferred, gapi.auth.authorize({client_id: f.clientId,scope: f.scopes,immediate: !1}, g), b
            }, a.authorize = function() {
                return b = new jQuery.Deferred, gapi.client.setApiKey(f.apiKey), window.setTimeout(h, 1), b
            }
        };
        return a
    }), define("navigatieModule", ["jquery"], function(a) {
        var b = {};
        return b.init = function() {
            a("a.navigator").click(function() {
                var b = a(this);
                a(".navbar li").removeClass("active"), b.parent().addClass("active"), a(".container-fluid").addClass("hide"), a(".navbar .container-fluid").removeClass("hide");
                var c = b.attr("href").replace("#", "");
                return a("#" + c).removeClass("hide"), !1
            })
        }, b
    }), define("CalendarViewModel", ["knockout", "moment"], function(a, b) {
        var c = function(a) {
            var b = this;
            b.name = a.summary, b.id = a.id
        }, d = function(a) {
            var b = this;
            b.id = a.id || "", b.email = a.email || "", b.name = a.name || "", b.link = a.link || "", b.firstName = a.given_name || "", b.lastName = a.family_name || ""
        };
        return function() {
            var b = this;
            b.setUser = function(a) {
                b.user(new d(a))
            }, b.authorized = a.observable(!1), b.user = a.observable(new d({})), b.calendarId = a.observable(""), b.holidayCalId = a.observable(""), b.calendars = a.observableArray([]), b.addCalendars = function(d) {
                var e = b.user().lastName.toLowerCase(), f = b.user().firstName.toLowerCase(), g = [], h = "";
                a.utils.arrayForEach(d, function(a) {
                    var d = new c(a);
                    g.push(d), d.name.indexOf("bite.be") !== -1 && d.name.toLowerCase().indexOf(f) !== -1 && (h = d.id), d.name === "Feestdagen" && b.holidayCalId(d.id)
                }), b.calendars(g), b.calendarId(h)
            }
        }
    }), define("SettingsViewModel", ["knockout"], function(a) {
        var b = function(a) {
            return a ? $.trim(a.toLowerCase()) : ""
        }, c = function(c, d, e) {
            var f = this;
            f.name = a.observable(c || ""), f.number = a.observable(parseFloat(d, 10) || 0).extend({throttle: 50}), f.summaryCatMatch = a.computed(function() {
                return b(f.name())
            }), f.name.subscribe(function() {
                e.changed(!e.changed())
            }), f.number.subscribe(function() {
                e.changed(!e.changed())
            })
        };
        return function() {
            var b = this;
            b.changed = a.observable(!0), b.categories = a.observableArray([new c("verlof CR", 12, b), new c("verlof", 20, b)]), b.holidays = a.observableArray([]), b.addCategories = function(d) {
                a.utils.arrayForEach(d, function(a) {
                    b.categories.push(new c(a.name, a.number, b))
                })
            }, b.clearCategories = function() {
                b.categories([])
            }
        }
    }), define("mapperModule", ["knockout", "moment", "utils"], function(a, b, c) {
        function h(a) {
            return a.charAt(0).toUpperCase() + a.slice(1)
        }
        var d = {}, e = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"], f = function(a, b, c, d) {
            console.log("event dat geen ganse dag duurt from " + a.start.dateTime + " till " + a.end.dateTime + " " + a.summary);
            var e = b.getHours();
            a.isFullDay = !1, e < 12 ? (a.isForenoon = !0, a.isAfternoon = !1) : (a.isAfternoon = !0, a.isForenoon = !1), d.push(a)
        }, g = function(a) {
            var b = this, d = function(a) {
                return e[a.getDay()] + " " + a.getDate() + " " + c.months[a.getMonth()] + " " + a.getFullYear()
            };
            b.summary = a.summary, b.summaryCatMatch = c.trimAndLowerCase(a.summary), b.start = a.start, b.end = a.end, b.startDate = c.toDate(b.start), b.startDateText = d(b.startDate), b.status = a.status, b.htmlLink = a.htmlLink, b.isWeekend = function() {
                var a = b.startDate.getDay();
                return a === 0 || a === 6
            }(), b.isFullDay = !0, b.isForenoon = !0, b.isAfternoon = !0;
			
					b.created=new Date(a.created);
		//later aangemaakt dan startdatum OF verlof voor dezelfde maand na 21ste
		b.suspicious= (b.created > b.startDate && b.startDate.getMonth() !== b.created.getMonth())
				|| (b.startDate.getMonth() == b.created.getMonth() && b.created.getDate() > 21);
		b.suspiciousText="Aangemaakt op "+d(b.created);
			
        };
        return d.mapHolidays = function(b) {
            return a.utils.arrayForEach(b, function(a) {
                a.isRecoverable = a.description && a.description === "recoverable"
            }), a.utils.arrayFilter(b, function(a) {
                return a.start.date && !a.start.dateTime
            })
        }, d.mapEvents = function(d, e) {
            var h = [];
            return a.utils.arrayForEach(d, function(a) {
                var d = new g(a), i = 0, j = c.toDate(a.start), k = c.toDate(a.end);
                if (a.start.date && a.end.date && a.end.date !== a.start.date) {
                    console.log("sequence from " + a.start.date + " till " + a.end.date + " " + a.summary);
                    var l = parseInt(b(k).format("YYYY"), 10) > e ? parseInt(b(new Date((new Date).getFullYear(), 11, 31)).format("DDD"), 10) + 1 : parseInt(b(k).format("DDD"), 10), m = l - parseInt(b(j).format("DDD"), 10);
                    if (m > 1)
                        for (i = 0; i < m; i++) {
                            var n = c.toDate(d.start), o = b(n).add("days", i), p = {date: o.format("YYYY-MM-DD")}, q = new g({summary: d.summary,end: p,start: p,status: d.status,htmlLink: d.htmlLink,created: d.created});
                            q.isWeekend || (console.log("    gesplitst in   " + q.end.date), h.push(q))
                        }
                    else if (m === 1 || m === 0)
                        d.isWeekend || h.push(d)
                } else
                    f(d, j, k, h)
            }), h.sort(function(a, b) {
                var c = a.startDate, d = b.startDate;
                return c == d ? 0 : c > d ? 1 : -1
            }), h
        }, d.mapSettings = function(b, c, d) {
            var e = [];
            return a.utils.arrayForEach(b || [], function(b) {
                c === b.employee && parseInt(b.year, 10) === d && $.each(b, function(b, c) {
                    var d = c.replace ? parseFloat(c.replace(",", ".")) : 0;
                    if (b !== "employee" && b !== "year" && b !== "rowNumber" && d !== 0 && !isNaN(d)) {
                        var f = b.split("-"), g = "", i = 0;
                        a.utils.arrayForEach(f, function(a) {
                            var b = "";
                            a = h(a), i === 1 && (a = a.toUpperCase(), b = " "), g = g + b + a, i++
                        }), e.push({name: g,number: d})
                    }
                })
            }), e
        }, d.mapHolidaysToSetting = function(b) {
            var c = a.utils.arrayFilter(b, function(a) {
                return a.isRecoverable
            }).length;
            return c > 0 ? [{name: "Verlof VF",number: c}] : []
        }, d
    }), function(a) {
        var b = function(a) {
            if (!this || !(this instanceof b))
                return new b(a);
            typeof a == "string" && (a = {key: a}), this.callback = a.callback, this.wanted = a.wanted || [], this.key = a.key, this.simpleSheet = !!a.simpleSheet, this.parseNumbers = !!a.parseNumbers, this.wait = !!a.wait, this.reverse = !!a.reverse, this.postProcess = a.postProcess, this.debug = !!a.debug, this.query = a.query || "", this.orderby = a.orderby, this.endpoint = a.endpoint || "https://spreadsheets.google.com", this.singleton = !!a.singleton, this.simple_url = !!a.simple_url, this.callbackContext = a.callbackContext, typeof a.proxy != "undefined" && (this.endpoint = a.proxy, this.simple_url = !0, this.singleton = !0), this.parameterize = a.parameterize || !1, this.singleton && (typeof b.singleton != "undefined" && this.log("WARNING! Tabletop singleton already defined"), b.singleton = this), /key=/.test(this.key) && (this.log("You passed a key as a URL! Attempting to parse."), this.key = this.key.match("key=(.*?)&")[1]);
            if (!this.key) {
                this.log("You need to pass Tabletop a key!");
                return
            }
            this.log("Initializing with key " + this.key), this.models = {}, this.model_names = [], this.base_json_path = "/feeds/worksheets/" + this.key + "/public/basic?alt=", this.base_json_path += "json-in-script", this.wait || this.fetch()
        };
        b.callbacks = {}, b.init = function(a) {
            return new b(a)
        }, b.sheets = function() {
            this.log("Times have changed! You'll want to use var tabletop = Tabletop.init(...); tabletop.sheets(...); instead of Tabletop.sheets(...)")
        }, b.prototype = {fetch: function(a) {
                typeof a != "undefined" && (this.callback = a), this.requestData(this.base_json_path, this.loadSheets)
            },requestData: function(a, b) {
                this.injectScript(a, b)
            },injectScript: function(a, c) {
                var d = document.createElement("script"), e;
                if (this.singleton)
                    c === this.loadSheets ? e = "Tabletop.singleton.loadSheets" : c === this.loadSheet && (e = "Tabletop.singleton.loadSheet");
                else {
                    var f = this;
                    e = "tt" + +(new Date) + Math.floor(Math.random() * 1e5), b.callbacks[e] = function() {
                        var a = Array.prototype.slice.call(arguments, 0);
                        c.apply(f, a), d.parentNode.removeChild(d), delete b.callbacks[e]
                    }, e = "Tabletop.callbacks." + e
                }
                var g = a + "&callback=" + e;
                this.simple_url ? a.indexOf("/list/") !== -1 ? d.src = this.endpoint + "/" + this.key + "-" + a.split("/")[4] : d.src = this.endpoint + "/" + this.key : d.src = this.endpoint + g, this.parameterize && (d.src = this.parameterize + encodeURIComponent(d.src)), document.getElementsByTagName("script")[0].parentNode.appendChild(d)
            },isWanted: function(a) {
                return this.wanted.length === 0 ? !0 : this.wanted.indexOf(a) !== -1
            },data: function() {
                return this.model_names.length === 0 ? undefined : this.simpleSheet ? (this.model_names.length > 1 && this.debug && this.log("WARNING You have more than one sheet but are using simple sheet mode! Don't blame me when something goes wrong."), this.models[this.model_names[0]].all()) : this.models
            },addWanted: function(a) {
                this.wanted.indexOf(a) === -1 && this.wanted.push(a)
            },loadSheets: function(a) {
                var b, c, d = [];
                this.foundSheetNames = [];
                for (b = 0, c = a.feed.entry.length; b < c; b++) {
                    this.foundSheetNames.push(a.feed.entry[b].title.$t);
                    if (this.isWanted(a.feed.entry[b].content.$t)) {
                        var e = a.feed.entry[b].link[3].href.substr(a.feed.entry[b].link[3].href.length - 3, 3), f = "/feeds/list/" + this.key + "/" + e + "/public/values?sq=" + this.query + "&alt=";
                        f += "json-in-script", this.orderby && (f += "&orderby=column:" + this.orderby.toLowerCase()), this.reverse && (f += "&reverse=true"), d.push(f)
                    }
                }
                this.sheetsToLoad = d.length;
                for (b = 0, c = d.length; b < c; b++)
                    this.requestData(d[b], this.loadSheet)
            },sheets: function(a) {
                if (typeof a == "undefined")
                    return this.models;
                if (typeof this.models[a] == "undefined")
                    return;
                return this.models[a]
            },loadSheet: function(a) {
                var c = new b.Model({data: a,parseNumbers: this.parseNumbers,postProcess: this.postProcess,tabletop: this});
                this.models[c.name] = c, this.model_names.indexOf(c.name) === -1 && this.model_names.push(c.name), this.sheetsToLoad--, this.sheetsToLoad === 0 && this.doCallback()
            },doCallback: function() {
                this.sheetsToLoad === 0 && this.callback.apply(this.callbackContext || this, [this.data(), this])
            },log: function(a) {
                this.debug && typeof console != "undefined" && typeof console.log != "undefined" && Function.prototype.apply.apply(console.log, [console, arguments])
            }}, b.Model = function(a) {
            var b, c, d, e;
            this.column_names = [], this.name = a.data.feed.title.$t, this.elements = [], this.raw = a.data;
            if (typeof a.data.feed.entry == "undefined") {
                a.tabletop.log("Missing data for " + this.name + ", make sure you didn't forget column headers"), this.elements = [];
                return
            }
            for (var f in a.data.feed.entry[0])
                /^gsx/.test(f) && this.column_names.push(f.replace("gsx$", ""));
            for (b = 0, d = a.data.feed.entry.length; b < d; b++) {
                var g = a.data.feed.entry[b], h = {};
                for (c = 0, e = this.column_names.length; c < e; c++) {
                    var i = g["gsx$" + this.column_names[c]];
                    typeof i != "undefined" ? a.parseNumbers && i.$t !== "" && !isNaN(i.$t) ? h[this.column_names[c]] = +i.$t : h[this.column_names[c]] = i.$t : h[this.column_names[c]] = ""
                }
                h.rowNumber === undefined && (h.rowNumber = b + 1), a.postProcess && a.postProcess(h), this.elements.push(h)
            }
        }, b.Model.prototype = {all: function() {
                return this.elements
            },toArray: function() {
                var a = [], b, c, d, e;
                for (b = 0, d = this.elements.length; b < d; b++) {
                    var f = [];
                    for (c = 0, e = this.column_names.length; c < e; c++)
                        f.push(this.elements[b][this.column_names[c]]);
                    a.push(f)
                }
                return a
            }}, a.Tabletop = b
    }(this), define("gdocsModule", ["jquery", "Tabletop"], function(a, b) {
        var c = {};
        return c.getSettings = function() {
            var a = new jQuery.Deferred;
            return b.init({key: "1cmdq0UirWbCsgm6LbIKCTq5Yua53hV5WIj-Z-KoXXqI",callback: function(b) {
                    a.resolve(b)
                },simpleSheet: !0}), a
        }, c
    }), require.config({shim: {Tabletop: {exports: "Tabletop"},jspdf: {deps: ["jquery"],exports: "jspdf"},jspdfFileSaver: {deps: ["jspdf"],exports: "jspdfFileSaver"},jspdfBlobBuilder: {deps: ["jspdf"],exports: "jspdfBlobBuilder"},jspdfStandardFontsMetrics: {deps: ["jspdf"],exports: "jspdfStandardFontsMetrics"},jspdfSplitTextToSize: {deps: ["jspdf"],exports: "jspdfSplitTextToSize"},jspdfAddImage: {deps: ["jspdf"],exports: "jspdfAddImage"},jspdfFormHtml: {deps: ["jspdf", "jspdfBlobBuilder", "jspdfFileSaver", "jspdfStandardFontsMetrics", "jspdfSplitTextToSize", "jspdfAddImage"],exports: "jspdfFormHtml"}},paths: {async: "vendor/requirejs-plugins/async",jquery: "vendor/jquery.min",knockout: "vendor/knockout-2.2.0",moment: "vendor/moment.min",jspdf: "vendor/jspdf",jspdfFileSaver: "vendor/FileSaver/FileSaver",jspdfBlobBuilder: "vendor/BlobBuilder/BlobBuilder",jspdfStandardFontsMetrics: "vendor/jspdf.plugin.standard_fonts_metrics",jspdfFormHtml: "vendor/jspdf.plugin.from_html",jspdfSplitTextToSize: "vendor/jspdf.plugin.split_text_to_size",jspdfAddImage: "vendor/jspdf.plugin.addimage",Tabletop: "scripts/vendor/Tabletop"}}), require(["ViewModel", "gcalModule", "knockout", "jquery", "navigatieModule", "CalendarViewModel", "SettingsViewModel", "mapperModule", "gdocsModule"], function(a, b, c, d, e, f, g, h, i) {
        function p() {
            k.authorized(!0), d.when(m.getUserInfo(), m.getCalendarList()).done(function(a, b) {
                l.setUser(a), l.addCalendars(b)
            })
        }
        function q() {
            m.authorize().done(p).always(function() {
                k.loading(!1)
            })
        }
        var j = new g, k = new a, l = new f, m = new b(k);
        k.categories(j.categories()), j.changed.subscribe(function() {
            k.categories(j.categories())
        }), k.holidays.subscribe(function(a) {
            j.holidays(a)
        });
        var n = function() {
            require(["timesheetModule"], function(a) {
                var b = c.toJS(k);
                b.calenderName = l.calendarId(), a.show(b)
            })
        };
        k.refresh = function() {
            var a = l.calendarId(), b = l.holidayCalId();
            k.events([]);
            var c = k.year();
            d.when(m.getEventsItems(a, c), m.getEventsItems(b, c), i.getSettings()).done(function(b, d, e) {
                k.holidays(h.mapHolidays(d)), k.events(h.mapEvents(b, c)), j.clearCategories(), j.addCategories(h.mapHolidaysToSetting(k.holidays())), j.addCategories(h.mapSettings(e, a, c)), j.changed(!j.changed()), n()
            })
        };
        var o = (new Date).getFullYear();
        k.year.subscribe(function(a) {
            a !== o && (k.refresh(), o = a)
        }), d(document).ready(function() {
            e.init(), k.authorized.subscribe(function(a) {
                l.authorized(a)
            }), c.applyBindings(k, d("#mainContainer")[0]), c.applyBindings(l, d("header")[0]), d("#getEventsButton").click(function() {
                return k.refresh(), !1
            }), l.calendarId.subscribe(function(a) {
                a && a.indexOf("bite") !== -1 && k.refresh()
            }), d("#authorize-button").click(function() {
                m.authorizeNotImmediate().done(p).fail(function() {
                    alert("Failed to authenticate")
                })
            }), d("#getPdfButton").click(function() {
                return require(["pdfModule"], function(a) {
                    var b = c.toJS(k);
                    a.create(b)
                }), !1
            }), d("#settingsLink").click(function() {
                return require(["settingsModule"], function(a) {
                    a.init(j)
                }), !1
            }), d("#timesheetLink").click(function() {
                return n(), !1
            }), q()
        })
    }), define("main", function() {
    })
}();
