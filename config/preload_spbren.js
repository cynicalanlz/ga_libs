define("__preload", function() {
    var config = {
        startTime: new Date().getTime(),
        plugins_path: "libs_min",
        ck: document.cookie,
        loc: window.location,
        ref: document.referrer,
        debug: false,
        tagmanager_id: "GTM-PNFDW6",
        tracker_id: "UA-41176985-1",
        yam_id: "28580776",
        ga_object: "ga",
        dataLayer_var: "dataLayer",
        tracker_name: "eCommerce",
        highest_level_domain: "auto",
        dz: 1460,
        uid_in: 0,
        uid_enc_out_tag: "registrationId",
        uid_plain_out_tag: "uid_out",
        // expId: "jgZOTGVqTVWjkqt8O2JVtA",
        readyComplete: false
    };
    window.dataLayer = [];
    window.uid_set = void 0;
    window.tag_loaded = void 0;
    window["GoogleAnalyticsObject"] = config.ga_object;
    window[config.ga_object] = window[config.ga_object] || function() {
        (window[config.ga_object].q = window[config.ga_object].q || []).push(arguments);
    }, window[config.ga_object].l = 1 * new Date();
    (window[config.dataLayer_var] = window[config.dataLayer_var] || []).push({
        "gtm.start": (new Date).getTime(),
        event: "gtm.js"
    });
    config.createCookie = function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var xprs = "; expires=" + date.toGMTString();
        } else {
            var xprs = "";
        }
        document.cookie = name + "=" + value + xprs + "; path=/";
        return value;
    };
    config.uid_ck = (config.ck.match("(^|; )_uid=([^;]*)") || 0)[2];
    if (typeof config.uid_ck === "undefined") {
        config.uid_ck = config.createCookie("_uid", Math.floor((Math.random() * 1000000000) + 1) + "." + new Date().getTime(), config.dz);
    }
    var ga_present = config.ck.indexOf("_ga=") > -1;
    var referal_hash = config.loc.href.indexOf("&rf=") > -1;
    config.cookieC = ga_present ? config.ck.toString().split("_ga=")[1].split(";")[0].split(/GA[0-9]\.[0-9]\./)[1] : "";
    config.ga_id = ga_present ? config.cookieC : config.uid_ck;
    config.urlRefc = referal_hash ? config.loc.href.split("&rf=")[1].split(/[&,?]/)[0] : "";
    config.uid = {
        "userId": config.ga_id
    };
    (window["yandex_metrika_callbacks"] = window["yandex_metrika_callbacks"] || []).push(function() {
        window["yaCounter" + config.yam_id] = new Ya.Metrika({
            id: config.yam_id,
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            params: config.uid || {}
        });
    });
    config.requirejs = {
        baseUrl: "/bitrix/templates/index/js/",
        paths: {
            "__preload": "empty:",
            "tagmanager": "//www.googletagmanager.com/gtm.js?id=" + config.tagmanager_id + (config.dataLayer_var != "dataLayer" ? "&l=" + config.dataLayer_var : ""),
            "metrika": "//mc.yandex.ru/metrika/watch",
            "libs": "analytics/min/" + config.plugins_path,
            "analytics": "//www.google-analytics.com/analytics" + (config.debug ? "_debug" : ""),
            "__postload": "analytics/min/postload_min",
            "calltouch": "//mod.calltouch.ru/d_client.js?param;client_id" + config.ga_id + ";ref" + encodeURI(config.ref) + ";url" + encodeURI(config.loc.href.split("#")[0]) + ";cook" + encodeURI(config.ck) + ";"
            /*,
            "experiment": "//www.google-analytics.com/cx/api.js?experiment=" + config.expId*/
        },
        waitSeconds: 0,
        encforceDefine: true
    };
    return config;
});
require(["__preload"], function(config) {
    var MergeRecursive = function(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = MergeRecursive(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    };
    config = MergeRecursive(config, {
        requirejs: {
            paths: {
                "jquery":           "jquery",
                "fotorama":         "fotorama/fotorama",
                "nicescroll":       "jquery.nicescroll",
                "fancybox":         "fancy/jquery.fancybox.pack",
                "jquery.validate":  "jquery.validate/jquery.validate.min",
                "messages":         "jquery.validate/messages_ru",
                "jquery-ui":        "jquery-ui/jquery-ui.min",
                "app":              "script_"
            },
            shim: {
                "calltouch": {
                    deps: ["jquery"]
                },
                "nicescroll": {
                    deps: ["jquery"]
                },
                "fotorama": {
                    deps: ["jquery"]
                },
                "fancybox": {
                    deps: ["jquery"]
                },
                "jquery-ui": {
                    deps: ["jquery"]
                },
                "jquery.validate": {
                    deps: ["jquery"]
                },
                "messages": {
                    deps: ["jquery.validate"]
                }
            },
            deps: ["app"],
            callback: function() {
                if (document.readyState === "complete" && typeof window.onload == "function") {
                    window.onload();
                }
            }
        }
    });
    require.config(config.requirejs);
    require(["__postload", "libs", "analytics"/*, "experiment"*/], function(cfg) {
        var tracker = window.ga.create({
            trackingId: cfg.tracker_id,
            cookieDomain: cfg.highest_level_domain,
            name: cfg.tracker_name,
            cookieExpires: cfg.dz * 24 * 60 * 60,
            allowAnchor: true,
            clientId: cfg.ga_id
        });

        // cfg.expVar = cxApi.chooseVariation();
        // cxApi.setChosenVariation(cfg.expVar, cfg.expId);
        // tracker.set("expId", cfg.expId);
        // tracker.set("expVar", cfg.expVar);
        // tracker.set("dimension5", [cfg.expVar, cfg.expId].join("--"));
        window.ga(cfg.tracker_name + ".require", "displayfeatures");
        window.ga(cfg.tracker_name + ".require", "Monster", cfg);
        window.ga(cfg.tracker_name + ".require", "GA_data", cfg);
        window.ga(cfg.tracker_name + ".require", "Scroll_tr", cfg);
        window.ga(cfg.tracker_name + ".Monster:getBestInfo");
        window.ga(cfg.tracker_name + ".Monster:preMonster");
        window.ga(cfg.tracker_name + ".GA_data:fire");
        window.ga(cfg.tracker_name + ".Monster:dirmonURL");
        cfg._rr(true, function() {
            var root = document.documentElement;
            root.className += " b-custom-header b-custom-header_var4";
            // switch (cfg.expVar) {
            //     case 0:
            //         root.className += " b-custom-header b-custom-header_var1";
            //         break;
            //     case 1:
            //         root.className += " b-custom-header b-custom-header_var2";
            //         break;
            //     case 2:
            //         root.className += " b-custom-header b-custom-header_var4";
            //         break;
            // }
            cfg.getHeader();
            cfg.checkErrors();
            window.ga(cfg.tracker_name + ".Scroll_tr:init");
            window.onscroll = function() {
                window.ga(cfg.tracker_name + ".Scroll_tr:fire");
            };
        });
    });
    require(["metrika", "tagmanager"]);
});