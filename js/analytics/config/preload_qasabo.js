define("__preload", function() {
    var config = {
        startTime: new Date().getTime(),
        plugins_path: "libs_min",
        ck: document.cookie,
        loc: window.location,
        ref: document.referrer,
        debug: true,
        tagmanager_id: "GTM-5JFBX9", 
        tracker_id: "UA-7818688-11",
        yam_id: "25686854",
        ga_object: "ga",
        dataLayer_var: "dataLayer", 
        tracker_name: "qasabo",
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
        baseUrl: "/v13/js/", 
        paths: {
            "__preload":  "empty:",
            "tagmanager": "//www.googletagmanager.com/gtm.js?id=" + config.tagmanager_id + (config.dataLayer_var != "dataLayer" ? "&l=" + config.dataLayer_var : ""),
            "metrika":    "//mc.yandex.ru/metrika/watch",
            "libs":       "analytics/min/" + config.plugins_path,
            "analytics":  "//www.google-analytics.com/analytics" + (config.debug ? "_debug" : ""),
            "__postload": "analytics/min/postload_min"            
        },
        waitSeconds: 0  
    };
    return config;
    
    
});
require(["__preload"], function(config) {
    var MergeRecursive=function(r,e){for(var c in e)try{r[c]=e[c].constructor==Object?MergeRecursive(r[c],e[c]):e[c]}catch(t){r[c]=e[c]}return r};
    config = MergeRecursive(config, {
        requirejs: {
                paths: {
                'jquery':             'jquery_min', 
                'jquery-mousewheel':  'jquery.mousewheel-3.0.6.pack',
                'fancybox':           'jquery.fancybox.js?v=2.0.6',
                'fancybox-thumbs':    'jquery.fancybox-thumbs.js?v =1.0.2',
                'form':               'form',
                'mslider':            'mslider',
                'mousetoogle':        'mousetoogle',
                'muploader':          'modules/muploader/muploader',
                'app':                'main',
                'jquery-backstretch': 'jquery.backstretch.min',
                'layout-logic':       'layout-logic', 
                'smoothscroll':       'smoothscroll'                
                },
            shim: {
                'form': {
                    deps : ['jquery']                    
                },
                'jquery-mousewheel' :{
                    deps : ['jquery']
                },
                'mslider' : {
                    deps : ['jquery']
                },
                'fancybox' : {
                    deps: ['jquery']
                },
                'mousetoogle': {
                    deps: ['jquery']
                },
                'muploader': {
                    deps: ['jquery']
                },
                'fancybox-thumbs' : {
                    deps: ['fancybox']
                },
                'ajax_jquery' : {
                    deps: ['jquery']
                },
                'smoothscroll' : {
                    deps: ['jquery']
                },
                'jquery-backstretch': {
                    deps: ['jquery']
                },
                'layout-logic':{
                    deps: ['jquery']
                }
            },
            deps : ['app']            
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
            // var root = document.documentElement;
            // root.className += " b-custom-header b-custom-header_var4";
            cfg.getHeader();
            cfg.checkErrors();
            window.ga(cfg.tracker_name + ".Scroll_tr:init");
            window.onscroll = function() {
                window.ga(cfg.tracker_name + ".Scroll_tr:fire");
            };            
            window.ga(cfg.tracker_name + ".GA_data:write_encoded");
        });
    });

});
