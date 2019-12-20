breakpoints = {},
["SM", "MD", "LG", "XL"].forEach(function(e) {
    var t = parseInt($(":root").css("--breakpoint-" + e.toLowerCase()));
    window["breakpoint" + e] = t,
    breakpoints[e.toLowerCase()] = t
}),
tapEvent = "ontouchstart"in window ? "tap" : "click",
thisDevice = "desktop",
/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) && (thisDevice = "mobile"),
Counter = function(e, t, o) {
    var n = e || 0;
    return function(e) {
        return n = void 0 != e ? e : n,
        void 0 == t || "+" == t ? "-" == t ? n -= o : n += o : n -= o
    }
}
,
$.fn.setAttrib = function(e, t) {
    if (void 0 == e)
        return !1;
    $(this).prop(e, t || !0),
    $(this)[0].setAttribute(e, t || !0)
}
,
$.fn.removeAttrib = function(e) {
    if (void 0 == e)
        return !1;
    $(this).prop(e, !1),
    $(this)[0].removeAttribute(e)
}
,
disableScroll = function() {
    var e = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    $("html").data("scroll-position", e),
    $("html").data("previous-overflow", $("html").css("overflow")),
    $("html").css("overflow", "hidden"),
    window.scrollTo(e[0], e[1])
}
,
enableScroll = function() {
    var e = $("html").data("scroll-position");
    e && ($("html").css("overflow", $("html").data("previous-overflow")),
    window.scrollTo(e[0], e[1]))
}
,
scrollFix = function(e, t) {
    var o, n, r = $.extend({
        cls: "fixed",
        pos: 500
    }, t);
    n = $(window).scrollTop(),
    n > r.pos && !$(e).hasClass(r.cls) ? $(e).addClass(r.cls) : n <= r.pos && $(e).hasClass(r.cls) && $(e).removeClass(r.cls),
    $(window).scroll(function(t) {
        clearTimeout(o),
        o = setTimeout(function() {
            n = $(window).scrollTop(),
            n > r.pos && !$(e).hasClass(r.cls) ? $(e).addClass(r.cls) : n <= r.pos && $(e).hasClass(r.cls) && $(e).removeClass(r.cls)
        }, 30)
    })
}
,
random = function(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e
}
,
generateCode = function(e) {
    for (var t = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], o = "", n = 0; n < e.length; n++)
        "l" == e.substr(n, 1) ? o += t[random(0, 25)] : "L" == e.substr(n, 1) ? o += t[random(0, 25)].toUpperCase() : "n" == e.substr(n, 1) && (o += random(0, 9));
    return o
}
,
getArgs = function(e) {
    var t, o = location.search.substr(1, location.search.length).split("&"), n = [];
    return $.each(o, function(e, o) {
        t = o.split("="),
        n[t[0]] = t[1]
    }),
    void 0 != e && void 0 != n[e] ? n[e] : (void 0 == e || void 0 != n[e]) && n
}
,
urlExists = function(e) {
    var t = new XMLHttpRequest;
    return t.open("HEAD", e, !1),
    t.send(),
    404 != t.status
}
,
showError = function(e) {
    var t = generateCode("lLLnnn");
    if ($("body").find(".show_error").length > 0 && $("body").find(".show_error").remove(),
    e.responseText) {
        var o, n = "<div>" + e.responseText + "</div>";
        o = $(n).find("#container").length > 0 ? '<div class="show_error"><div>' + $(n).find("#container").html() + '</div><button id="' + t + '">Закрыть</button></div>' : '<div class="show_error"><div>' + e.responseText + '</div><button id="' + t + '">Закрыть</button></div>',
        $("body").append(o),
        $("#" + t).on(tapEvent, function() {
            $(this).parent(".show_error").remove()
        })
    }
}
,
getAjaxHtml = function() {
    var e = arguments
      , t = "string" == typeof e[0] && ("/" != e[0].substr(0, 1) ? "/" + e[0] : e[0])
      , o = "object" == typeof e[1] ? e[1] : {}
      , n = "function" == typeof e[1] ? e[1] : void 0 !== e[2] && e[2]
      , r = "object" != typeof e[1] ? void 0 !== e[2] && "function" == typeof e[2] && e[2] : void 0 !== e[3] && "function" == typeof e[3] && e[3];
    $.post(t, o, function(e) {
        e = e.trim(),
        e && n ? n(e, !0) : n && n('<p class="empty center">Нет данных</p>', !1)
    }, "html").always(function() {
        r && r()
    }).fail(function(e) {
        notify("Системная ошибка!", "error"),
        showError(e)
    })
}
,
sendFormData = function(e, t) {
    if (void 0 == e || 0 == $(e).length || void 0 == t.url)
        return !1;
    var o = new FormData($(e)[0])
      , n = "/" != t.url.substr(0, 1) ? "/" + t.url : t.url;
    t.params && $.each(t.params, function(e, t) {
        o.append(e, t)
    }),
    $.ajax({
        type: t.type || "POST",
        url: n,
        dataType: t.dataType || "json",
        cache: !1,
        contentType: !1,
        processData: !1,
        beforeSend: function() {
            t.beforeSend && "function" == typeof t.beforeSend && t.beforeSend()
        },
        data: o,
        success: function(e) {
            t.success && "function" == typeof t.success && t.success(e)
        },
        error: function(e, o) {
            notify("Системная ошибка отправки данных!", "error"),
            showError(e),
            t.error && "function" == typeof t.error && t.error(o)
        },
        complete: function() {
            t.complete && "function" == typeof t.complete && t.complete()
        }
    })
}
,
initEditors = function() {
    var e = {
        disableDragAndDrop: !0,
        lang: "en-US",
        emptyPara: "",
        toolbar: [["font", ["bold", "italic", "underline", "clear"]], ["height", ["height"]], ["style", ["style"]], ["fontname", ["fontname"]], ["color", ["color"]], ["para", ["ul", "ol", "paragraph"]], ["table", ["table"]], ["insert", ["link", "image", "video"]], ["view", ["fullscreen", "codeview"]]],
        buttons: {
            image: function(e) {
                return $.summernote.ui.button({
                    contents: '<i class="note-icon-picture" />',
                    tooltip: "тултип",
                    className: "editorfile",
                    click: function() {
                        (currentDir = lscache.get("clientmanagerdir")) && (getAjaxHtml("filemanager/files_get", {
                            directory: currentDir,
                            filetypes: "png|jpg|jpeg|gif|ico|bmp"
                        }, function(e) {
                            $("#clientFilemanagerContentFiles").html(e)
                        }),
                        getAjaxHtml("filemanager/dirs_get", {
                            current_dir: currentDir
                        }, function(e) {
                            $("#clientFilemanagerDirs").html(e)
                        })),
                        0 == $("#clientFileManager").hasClass("visible") && $("#clientFileManager").addClass("visible"),
                        $("#clientFilemanagerContentFiles").off(tapEvent, ".image").on(tapEvent, ".image", function() {
                            var t = $(this).closest(".file")
                              , o = $(t).attr("dirfile");
                            $(t).attr("namefile"),
                            $(this).find("img").attr("src"),
                            e.invoke("editor.insertImage", location.origin + "/public/filemanager/" + o),
                            $("#clientFileManager").removeClass("visible")
                        })
                    }
                }).render()
            }
        }
    }
      , t = []
      , o = $("body").find("[editor]");
    $.each(o, function(e, o) {
        var n = $(o).attr("editor").split("|")
          , r = void 0 != n[1] ? parseInt(n[1]) : 500;
        t.push({
            selector: $(o).attr("editor"), 
            height: r
        })
    }),
    $.each(t, function(t, o) {
        e.height = o.height,
        $('[editor="' + o.selector + '"]').summernote(e),
        $('[editor="' + o.selector + '"]').addClass("activate")
    })
}
;
