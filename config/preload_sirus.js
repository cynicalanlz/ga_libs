define("__preload", function() {    
    var config = {
        startTime: new Date().getTime(),        
        ck: document.cookie,
        loc: window.location,
        ref: document.referrer,
        debug: true,
        tagmanager_id: "GTM-5V8S4F",
        tracker_id: "UA-28849482-1",
        yam_id: "12251719",
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
    var ga_present = config.ck.indexOf("_ga=") > -1;
    var referal_hash = config.loc.href.indexOf("&rf=") > -1;
    var linker_hash_present = config.loc.href.indexOf("#_ga=") > -1;

    if (linker_hash_present) {
        var linker_hash = config.loc.hash.split(/#_ga=|\/|#/)[1];
        window.location.hash = config.loc.hash.replace("#_ga=" + linker_hash, "");
        linker_hash = linker_hash.split(".");
        linker_hash = [linker_hash[2], linker_hash[3]].join(".");
        if (typeof config.uid_ck === "undefined") {
            config.uid_ck = config.createCookie("_uid", linker_hash, config.dz);
        }
        config.urlRefc = linker_hash;
    } else {
        var random_hash = Math.floor((Math.random() * 1000000000) + 1) + "." + new Date().getTime();
        if (typeof config.uid_ck === "undefined") {
            config.uid_ck = config.createCookie("_uid", random_hash, config.dz);
        }
        config.urlRefc = referal_hash ? config.loc.href.split("&rf=")[1].split(/[&,?]/)[0] : "";
    }

    config.cookieC = ga_present ? config.ck.toString().split("_ga=")[1].split(";")[0].split(/GA[0-9]\.[0-9]\./)[1] : "";
    config.ga_id = ga_present ? config.cookieC : config.uid_ck;

    config.uid = {
        "userId": config.ga_id,
        "referrer" : config.ref != "" ?  config.ref : "(not set)",
        "location" : config.loc.hostname+config.loc.pathname+config.loc.search+config.loc.hash
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
        baseUrl: "/js/",
        paths: {
            "__preload": "empty:",
            "tagmanager": "//www.googletagmanager.com/gtm.js?id=" + config.tagmanager_id + (config.dataLayer_var != "dataLayer" ? "&l=" + config.dataLayer_var : ""),
            "metrika": "//mc.yandex.ru/metrika/watch",
            "libs": "analytics/min/libs_min",
            "analytics": "//www.google-analytics.com/analytics" + (config.debug ? "_debug" : ""),
            "__postload": "analytics/min/postload_min"            
        },
        waitSeconds: 0
    };
    return config;
});
require(["__preload"], function(config) {       
    require.config(config.requirejs);
    cfg = require(["__postload", "libs", "analytics"], function(cfg) {
        var tracker = window.ga.create({
            trackingId: cfg.tracker_id,
            cookieDomain: cfg.highest_level_domain,
            name: cfg.tracker_name,
            cookieExpires: cfg.dz * 24 * 60 * 60,
            allowAnchor: true,
            allowLinker: true,
            clientId: cfg.ga_id
        });
        window.ga(cfg.tracker_name + ".require", "linker");
        window.ga(cfg.tracker_name + ".require", "displayfeatures");
        window.ga(cfg.tracker_name + ".require", "Monster", cfg);
        window.ga(cfg.tracker_name + ".require", "GA_data", cfg);
        window.ga(cfg.tracker_name + ".require", "Scroll_tr", cfg);
        window.ga(cfg.tracker_name + ".Monster:getBestInfo");
        window.ga(cfg.tracker_name + ".Monster:preMonster");
        window.ga(cfg.tracker_name + ".Monster:dirmonURL");  
        window.ga(cfg.tracker_name + ".GA_data:fire");    
        cfg._rr(true, function() {            
            cfg.getHeader();
            cfg.checkErrors();            
            window.ga(cfg.tracker_name + ".Scroll_tr:init");        
            window.onscroll = function() {
                window.ga(cfg.tracker_name + ".Scroll_tr:fire");
            };            
        });
        return cfg;
    });
    console.log(cfg)
    require(["metrika", "tagmanager"]);
}); 