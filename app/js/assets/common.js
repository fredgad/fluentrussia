jQuery(document).ready(function(e) {
    e(document).on("focus gesturestart", function(e) {
        e.preventDefault()
    }),
    e("body").on("focus", "input.error, textarea.error, select.error", function() {
        e(this).removeClass("error")
    }),
    e("body").find("[phonemask]").each(function() {
        var t = e(this).attr("placeholder")
          , i = e(this).attr("code") || "+7";
        e(this).mask(i + " (hhh) hhh-hh-hh", {
            autoclear: !1
        }).attr({
            placeholder: t,
            type: "tel"
        })
    }),
    e("body").find(".phone ,[phone]").each(function() {
        e(this).attr("code");
        e(this).attr("href", "tel:" + e(this).text().trim().replace(/-|\(|\)|\s/g, "").replace(/^8/, "+7"))
    }),
    e("body").find(".whatsapp, [whatsapp]").each(function() {
        var t = e(this).data("message")
          , i = e(this).text().trim().replace(/-|\(|\)|\s/g, "").replace(/^8/, "+7");
        e(this).attr("code");
        e(this).attr("href", "whatsapp://send?phone=" + i + "&abid=" + i + "&text=" + t)
    }),
    e("body").find(".email, [email]").each(function() {
        e(this).attr("href", "mailto:" + e(this).text().trim())
    }),
    e("body").on("submit", "form:not([action])", function(e) {
        return e.preventDefault(),
        !1
    }),
    e("body").on("focus", 'input[type="text"], input[type="password"], input[type="number"], input[type="email"], input[type="tel"]', function() {
        e(this).removeAttrib("readonly")
    }),
    e("body").on("blur", 'input[type="text"], input[type="password"], input[type="number"], input[type="email"], input[type="tel"]', function() {
        e(this).setAttrib("readonly")
    }),
    e("body").on("change", 'input[type="checkbox"]', function() {
        e(this)[0].hasAttribute("checked") ? (e(this).prop("checked", !1),
        e(this)[0].removeAttribute("checked")) : (e(this).prop("checked", !0),
        e(this)[0].setAttribute("checked", ""))
    });
    var t;
    t = e(window).scrollTop(),
    t > 2 * e(window).height() ? e("[scrolltop]").addClass("visible") : e("[scrolltop]").removeClass("visible"),
    e(window).on("scroll", function() {
        t = e(this).scrollTop(),
        t > 2 * e(window).height() ? e("[scrolltop]").addClass("visible") : e("[scrolltop]").removeClass("visible hover")
    }),
    e("[scrolltop]").on("click", function(t) {
        t.preventDefault(),
        e("html, body").animate({
            scrollTop: 0
        }, 800, "easeInOutQuint")
    }),
    e("[scrolltop]").on("tap click mouseenter", function() {
        e(this).addClass("hover")
    }),
    e("[scrolltop]").on("mouseleave", function() {
        e(this).removeClass("hover")
    }),
    e("body").find("[parallax]").each(function() {
        var t = e(this).attr("parallax").split("|");
        e(this).parallax({
            imageSrc: t[0],
            speed: parseFloat(t[1])
        })
    }),
    e("body").on(tapEvent, ".tabstitles li", function() {
        var t = this
          , i = location.hash.substr(1, location.hash.length).split(".")
          , a = e(t).attr("id")
          , n = i[0]
          , s = e(t).closest(".tabstitles")
          , l = e(s).siblings(".tabscontent");
        e(t).removeClass("error"),
        void 0 == i[2] && e("#" + n).find(".tabstitles:not(.sub)").siblings(".tabscontent").find(".tabstitles.sub").each(function() {
            e(this).children("li").removeClass("active"),
            e(this).children("li:first").addClass("active"),
            e(this).siblings(".tabscontent").find("[tabid]").removeClass("visible"),
            e(this).siblings(".tabscontent").find("[tabid]:first").addClass("visible")
        }),
        e(s).children("li").removeClass("active"),
        e(t).addClass("active"),
        0 == e(s).hasClass("sub") ? location.hash = n + "." + a : location.hash = n + "." + i[1] + "." + a,
        0 == e(l).children('[tabid="' + a + '"]').hasClass("visible") && (e(l).children("[tabid]").removeClass("visible"),
        e(l).children('[tabid="' + a + '"]').addClass("visible")),
        initEditors()
    });
    var i, a, n, s = "", l = {
        images: "png|jpg|jpeg|gif|ico|bmp",
        videos: "mp4|avi|mov|wmv|mpeg|3gp|flv|m4v|mpg|swf",
        audios: "mp3|wav|wma|m3u|ogg|wav|wave",
        docs: "doc|docx|pdf|ppt|pptx|rtf|xls|xlsx|txt"
    };
    s += '<div class="filemanager__client" id="clientFileManager">',
    s += '<div class="filemanager__topdirs mb-2">',
    s += '<ul class="filemanager__dirstree noselect" id="clientFilemanagerDirs"></ul>',
    s += "</div>",
    s += '<div class="filemanager__bottomfiles">',
    s += '<div class="filemanager__content_files filemanager__content_clientfiles noselect" id="clientFilemanagerContentFiles">',
    s += '<p class="empty center">Выберите раздел</p>',
    s += "</div>",
    s += "</div>",
    s += "</div>",
    e("body").append(s),
    e("body").on(tapEvent, "[filemanager]", function() {
        n = lscache.get("clientmanagerdir") || !1,
        a = this,
        i = e(this).attr("filemanager") || 0,
        void 0 != l[i] && (i = l[i]),
        n && (getAjaxHtml("filemanager/files_get", {
            directory: n,
            filetypes: i
        }, function(t) {
            e("#clientFilemanagerContentFiles").html(t)
        }),
        getAjaxHtml("filemanager/dirs_get", {
            current_dir: n
        }, function(t) {
            e("#clientFilemanagerDirs").html(t)
        })),
        0 == e("#clientFileManager").hasClass("visible") && e("#clientFileManager").addClass("visible")
    }),
    e("body").on(tapEvent, ".filemanager_remove", function() {
        var t = e(this).closest(".file");
        e(t).find(".image_name").text("нет файла"),
        e(t).find("img").attr("src", "./public/images/none.png"),
        e(t).find('input[type="hidden"]').val("")
    }),
    getAjaxHtml("filemanager/dirs_get", {
        current_dir: n
    }, function(t) {
        e("#clientFilemanagerDirs").html(t)
    }),
    e("#clientFilemanagerDirs").on(tapEvent, "[directory]:not(.disabled):not(.active)", function() {
        var t = e(this).attr("directory");
        lscache.set("clientmanagerdir", t),
        e("#clientFilemanagerDirs").find("[directory]").removeClass("active"),
        e(this).addClass("active"),
        getAjaxHtml("filemanager/files_get", {
            directory: t,
            filetypes: i
        }, function(t) {
            e("#clientFilemanagerContentFiles").html(t)
        })
    }),
    e("#clientFilemanagerContentFiles").on(tapEvent, ".image", function() {
        var t = e(this).closest(".file")
          , i = e(t).attr("dirfile")
          , n = e(t).attr("namefile")
          , s = e(this).find("img").attr("src");
        e(a).closest(".file").find('input[type="hidden"]').val(i),
        e(a).find("img").attr("src", s),
        e(a).closest(".file").find(".image_name").text(n),
        e("#clientFileManager").removeClass("visible") 
    }),
    e("body").on(tapEvent, function() {
        e("#clientFileManager").is(":hover") || 0 != e("[filemanager]:hover").length || e("#clientFileManager").hasClass("visible") && e("#clientFileManager").removeClass("visible")
    }),
    e("#clientFileManager").on("mouseenter", function() {
        disableScroll()
    }),
    e("#clientFileManager").on("mouseleave", function() {
        enableScroll()
    })
});
