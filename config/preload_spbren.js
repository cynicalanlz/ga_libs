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
        yam_id: "21345325",
        ga_object: "ga",
        dataLayer_var: "dataLayer",
        tracker_name: "eCommerce",
        highest_level_domain: "auto",
        dz: 1460,
        uid_in: 0,
        uid_enc_out_tag: "registrationId",
        uid_plain_out_tag: "uid_out",
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
    window.onloadCallback = function(){
        var captcha_div = document.getElementsByClassName('g-recaptcha');
        if (typeof captcha_div !== 'undefined' && captcha_div.length > 0){
            widgetId2 = grecaptcha.render(captcha_div[0], {
                'sitekey' : '6Le0FgUTAAAAADiKsFQ7k_PWquIlchvWV9TYPk_A'
            });    
        }
        
    };    

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
        },
        waitSeconds: 0
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
        requirejs : {
            paths: {
                'jquery'          : 'jquery',
                'fotorama'        : 'fotorama/fotorama',
                'nicescroll'      : 'jquery.nicescroll',
                'fancybox'        : 'fancy/jquery.fancybox.pack',
                'jquery.validate' : 'jquery.validate/jquery.validate.min',
                'messages'        : 'jquery.validate/messages_ru',
                'jquery-ui'       : 'jquery-ui/jquery-ui.min',
                'app'             : 'script_',
                'polyfiller'      : 'webshim/js-webshim/minified/polyfiller',
                'polyfiller-cfg'  : 'webshim/js-webshim/minified/shims/i18n/formcfg-ru',
                'input-mask'      : 'inputmask/js/jquery.inputmask',
                'raphael'         : '/kswidgets/raphael_module/js/vendors/raphael.min',
                'utils'           : '/kswidgets/raphael_module/js/utils',
                'small'           : '/kswidgets/js/small-n',
                'recaptcha'       : 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'
            },
            shim: {
                'calltouch' : {
                    deps : ['jquery']
                },
                'nicescroll' : {
                    deps: ['jquery']
                },
                'fotorama' : {
                    deps: ['jquery'],
                    exports: 'fotorama'
                },
                'fancybox' : {
                    deps: ['jquery']
                },
                'jquery-ui' : {
                    deps: ['jquery']
                },
                'jquery.validate': {
                    deps: ['jquery']
                },
                'messages': {
                    deps: ['jquery.validate']
                },
                'polyfiller-cfg': {
                    deps: ['polyfiller']
                },
                'input-mask': {
                    deps: ['jquery']
                },
                'raphael': {
                    deps: ['jquery'],
                    exports : ['Raphael', 'eve']
                },
                'utils': {
                    deps: ['raphael']
                },
                'small': {
                    deps: ['raphael']
                }
            },
            deps : ['app'],
            callback: function(){                
                (/.*exists_func.*/.test(String(window.onload)) && typeof window.onload == 'function' && /^in|^co/.test(document.readyState)) && window.onload();
            }
        }
    });
    require.config(config.requirejs);
    require(["__postload", "libs", "analytics"], function(cfg) {
        var tracker = window.ga.create({
            trackingId: cfg.tracker_id,
            cookieDomain: cfg.highest_level_domain,
            name: cfg.tracker_name,
            cookieExpires: cfg.dz * 24 * 60 * 60,
            allowAnchor: true,
            clientId: cfg.ga_id
        });
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
