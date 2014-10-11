!function (e) { "use strict"; var n = function (e, r) { return n["string" == typeof r ? "compile" : "render"].apply(n, arguments) }; n.version = "2.0.4", n.openTag = "<%", n.closeTag = "%>", n.isEscape = !0, n.isCompress = !1, n.parser = null, n.render = function (e, r) { var t = n.get(e) || a({ id: e, name: "Render Error", message: "No Template" }); return t(r) }, n.compile = function (e, t) { function o(r) { try { return new l(r, e) + "" } catch (i) { return s ? a(i)() : n.compile(e, t, !0)(r) } } var c = arguments, s = c[2], u = "anonymous"; "string" != typeof t && (s = c[1], t = c[0], e = u); try { var l = i(e, t, s) } catch (p) { return p.id = e || t, p.name = "Syntax Error", a(p) } return o.prototype = l.prototype, o.toString = function () { return l.toString() }, e !== u && (r[e] = o), o }; var r = n.cache = {}, t = n.helpers = function () { var e = function (n, r) { return "string" != typeof n && (r = typeof n, "number" === r ? n += "" : n = "function" === r ? e(n.call(n)) : ""), n }, r = { "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "&": "&#38;" }, t = function (n) { return e(n).replace(/&(?![\w#]+;)|[<>"']/g, function (e) { return r[e] }) }, a = Array.isArray || function (e) { return "[object Array]" === {}.toString.call(e) }, i = function (e, n) { if (a(e)) for (var r = 0, t = e.length; t > r; r++) n.call(e, e[r], r, e); else for (r in e) n.call(e, e[r], r) }; return { $include: n.render, $string: e, $escape: t, $each: i } }(); n.helper = function (e, n) { t[e] = n }, n.onerror = function (n) { var r = "Template Error\n\n"; for (var t in n) r += "<" + t + ">\n" + n[t] + "\n\n"; e.console && console.error(r) }, n.get = function (t) { var a; if (r.hasOwnProperty(t)) a = r[t]; else if ("document" in e) { var i = document.getElementById(t); if (i) { var o = i.value || i.innerHTML; a = n.compile(t, o.replace(/^\s*|\s*$/g, "")) } } return a }; var a = function (e) { return n.onerror(e), function () { return "{Template Error}" } }, i = function () { var e = t.$each, r = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", a = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g, i = /[^\w$]+/g, o = new RegExp(["\\b" + r.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), c = /^\d[^,]*|,\d[^,]*/g, s = /^,+|,+$/g, u = function (e) { return e.replace(a, "").replace(i, ",").replace(o, "").replace(c, "").replace(s, "").split(/^$|,+/) }; return function (r, a, i) { function o(e) { return m += e.split(/\n/).length - 1, n.isCompress && (e = e.replace(/[\n\r\t\s]+/g, " ").replace(/<!--.*?-->/g, "")), e && (e = x[1] + p(e) + x[2] + "\n"), e } function c(e) { var r = m; if ($ ? e = $(e) : i && (e = e.replace(/\n/g, function () { return m++, "$line=" + m + ";" })), 0 === e.indexOf("=")) { var a = !/^=[=#]/.test(e); if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), a && n.isEscape) { var o = e.replace(/\s*\([^\)]+\)/, ""); t.hasOwnProperty(o) || /^(include|print)$/.test(o) || (e = "$escape(" + e + ")") } else e = "$string(" + e + ")"; e = x[1] + e + x[2] } return i && (e = "$line=" + r + ";" + e), s(e), e + "\n" } function s(n) { n = u(n), e(n, function (e) { e && !v.hasOwnProperty(e) && (l(e), v[e] = !0) }) } function l(e) { var n; "print" === e ? n = k : "include" === e ? (y.$include = t.$include, n = E) : (n = "$data." + e, t.hasOwnProperty(e) && (y[e] = t[e], n = 0 === e.indexOf("$") ? "$helpers." + e : n + "===undefined?$helpers." + e + ":" + n)), w += e + "=" + n + "," } function p(e) { return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'" } var f = n.openTag, d = n.closeTag, $ = n.parser, g = a, h = "", m = 1, v = { $data: 1, $id: 1, $helpers: 1, $out: 1, $line: 1 }, y = {}, w = "var $helpers=this," + (i ? "$line=0," : ""), b = "".trim, x = b ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], T = b ? "$out+=$text;return $text;" : "$out.push($text);", k = "function($text){" + T + "}", E = "function(id,data){data=data||$data;var $text=$helpers.$include(id,data,$id);" + T + "}"; e(g.split(f), function (e) { e = e.split(d); var n = e[0], r = e[1]; 1 === e.length ? h += o(n) : (h += c(n), r && (h += o(r))) }), g = h, i && (g = "try{" + g + "}catch(e){" + "throw {" + "id:$id," + "name:'Render Error'," + "message:e.message," + "line:$line," + "source:" + p(a) + ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')" + "};" + "}"), g = w + x[0] + g + "return new String(" + x[3] + ");"; try { var j = new Function("$data", "$id", g); return j.prototype = y, j } catch (O) { throw O.temp = "function anonymous($data,$id) {" + g + "}", O } } }(); "function" == typeof define ? define(function () { return n }) : "undefined" != typeof exports && (module.exports = n), e.template = n }(this), function (e) { e.openTag = "{{", e.closeTag = "}}", e.parser = function (n) { n = n.replace(/^\s/, ""); var r = n.split(" "), t = r.shift(), a = r.join(" "); switch (t) { case "if": n = "if(" + a + "){"; break; case "else": r = "if" === r.shift() ? " if(" + r.join(" ") + ")" : "", n = "}else" + r + "{"; break; case "/if": n = "}"; break; case "each": var i = r[0] || "$data", o = r[1] || "as", c = r[2] || "$value", s = r[3] || "$index", u = c + "," + s; "as" !== o && (i = "[]"), n = "$each(" + i + ",function(" + u + "){"; break; case "/each": n = "});"; break; case "echo": n = "print(" + a + ");"; break; case "include": n = "include(" + r.join(",") + ");"; break; default: e.helpers.hasOwnProperty(t) ? n = "=#" + t + "(" + r.join(",") + ");" : (n = n.replace(/[\s;]*$/, ""), n = "=" + n) } return n } }(this.template);


$.fn.Divs = function (options) {
    var target = this;

    var defaults = {
        data: { name: "所有站点", id: "0", children: [{ name: "111111", id: "1", children: [] }, { name: "222222", id: "1", children: [] }, { name: "33333", id: "1", children: [] }, { name: "444444", id: "1", children: [] }, { name: "555555", id: "1", children: [] }] },
        onClick: function (ele, type) {

        }
    }

    var divs = {
        _template: template.compile("\
              <div class='area' id='divs_control'>\
         <div class='area-left'></div>\
         <div class='area-right'></div>\
         <div class='area-mid'>\
           <div class='title'>当前片区：<span class='thediv' style='color:#f50'>用户关注</span></div>\
           <a class='gis-icon icon-arrow-left prev' href='javascript:;'></a>\
           <a class='gis-icon icon-arrow-right next' href='javascript:;'></a>\
           <div class='area-content'>\
               {{each children as value index}}\
                   <div class='area-root'><a href='#' data-id='{{value.id}}' class='hasConfig' >{{value.name}}</a>\
                        {{if value.children.length>0}}\
                        <div class='sub' style='display:none'>\
                            <ul>\
                            {{each value.children as t index}}\
                                <li><a data-id='{{t.id}}'  class='hasConfig'>{{t.name}}</a></li>\
                            {{/each}}\
                            </ul>\
                        </div>\
                        {{/if}}\
                   </div>\
               {{/each}}\
               </div>\
                  <div style='float:right'><a href='#' id='showAll' style='color:#f50;position:absolute;right: 38px;bottom: 14px;'>显示全部</a>\
           </div>\
         </div>\
        </div>\
        "),
        render: function (d) {
            if (typeof target == 'object') {
                var t = $(target),
					html = this._template(this.data);
                t.html(html);

                this._event();
            } else {
                return;
            }
        },
        _ajax: function (type, url, data) {
            return $.ajax({
                data: data,
                url: url,
                contentType: "application/json",
                type: type,
                dataType: "json"
            })
        },
        _event: function () {

            $("#showAll").unbind().on("click", function (e) {
                $("#divs_control .area-content").find('a').removeClass("active");
                $("#divs_control .area-mid .title .thediv").text(e.target.innerHTML);
                divs.onClick(this, "all");
            })
            $("#divs_control .area-content").find('a').not("#showAll").each(function (index, ele) {
                $(ele).click(
                    function (e) {

                        divs.onClick(ele, "div");
                        $("#divs_control .area-content").find('a').removeClass("active");
                        $(ele).addClass("active");
                        if ($(ele).parents(".sub").length > 0) {
                            $(ele).parents(".sub").prev("a").addClass("active");
                        }
                        $("#divs_control .area-mid .title .thediv").text(e.target.innerHTML);

                    }
                )
            });
            $("#divs_control .area-content").find(".area-root").each(function (index, ele) {
                if ($(ele).find("li").length > 0) {
                    $(ele).hover(function () {
                        $(this).find(".sub").show();
                    }, function () {
                        $(this).find(".sub").hide();
                    })
                }
            })
            $("#divs_control .area-mid .title").css("cursor", "pointer").click(
               function () {
                   $("#divs_control .area-content").toggle();
                   $("#divs_control .gis-icon.icon-arrow-left").toggle();
                   $("#divs_control .gis-icon.icon-arrow-right").toggle();
                   $("#showAll").toggle();
                   if ($("#divs_control").css('width') == document.documentElement.clientWidth + 'px') {
                       $("#divs_control").css('width', 'inherit');
                   } else {
                       $("#divs_control").css('width', '100%');
                   }
               }
            )


            this._scroll();

            $(window).resize(function () {
                divs._scroll();
            });


        },
        _scroll: function () {
            var th = $("#divs_control .area-content").width() - 100;
            var sh = null;
            $("#divs_control .area-root").each(function () {
                sh += $(this).width();
                if (sh > th) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });

            this._redraw();
        },
        _redraw: function () {

            var next = $("#divs_control .area-root:visible:last").next();
            if (next.length <= 0) {
                $("#divs_control .next").removeClass("btn_active_right").unbind();
            } else {
                $("#divs_control .next").addClass("btn_active_right");
            }
            var prev = $("#divs_control .area-root:visible:first").prev();
            if (prev.length <= 0) {
                $("#divs_control .prev").removeClass("btn_active_left").unbind();
            } else {
                $("#divs_control .prev").addClass("btn_active_left");
            }
            this.prev_next();

        },
        prev_next: function () {
            var prev = $("#divs_control .prev");
            var next = $("#divs_control .next");          
            if (next.hasClass("btn_active_right")) {
                next.unbind().on("click", function () {
                    var next_show = $("#divs_control .area-root:visible:last").next(":first");
                    var first_hide = $("#divs_control .area-root:visible:first");
                    first_hide.hide();
                    next_show.show();
                    divs._redraw();
                });
            }
            if (prev.hasClass("btn_active_left")) {
                prev.unbind().on("click", function () {
                    var prev_show = $("#divs_control .area-root:visible:first").prev(":last");
                    var list_hide = $("#divs_control .area-root:visible:last");
                    list_hide.hide();
                    prev_show.show();
                    divs._redraw();

                })
            }

        }

    }

    $.extend(divs, defaults, options);

    return this.each(function () {
        divs.render();
    })


}