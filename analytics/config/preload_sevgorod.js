define("__preload", function() {    
    var config = {
        startTime: new Date().getTime(),        
        ck: document.cookie,
        loc: window.location,
        ref: document.referrer,
        debug: true,
        tagmanager_id: "GTM-TSQTRX",
        tracker_id: ["UA-37849584-1","UA-38092225-1","UA-38092225-1"],
        yam_id: "19547275",
        ga_object: "ga",
        dataLayer_var: "dataLayer",
        tracker_name: ["eCommerce", "eCommerce2", "eCommerce3"],
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
    config.requirejs = {        
        paths: {
            "__preload": "empty:",
            "tagmanager": "//www.googletagmanager.com/gtm.js?id=" + config.tagmanager_id + (config.dataLayer_var != "dataLayer" ? "&l=" + config.dataLayer_var : ""),
            "metrika": "//mc.yandex.ru/metrika/watch",
            "libs": "analytics/min/libs_min",
            "analytics": "//www.google-analytics.com/analytics" + (config.debug ? "_debug" : ""),
            "__postload": "analytics/min/postload_min",
            "widgetPlanoplan" : "//widget.planoplan.com/js/widget.js?vd4c8332c6bf27210af3b3af228f7f417" + "&"  + config.ga_id
        },
        waitSeconds: 0
    };
    window.__s = '316fdfbd11b231a84fecfac95a524e95';
    window.newton_callback_id="7765758641b43bcfcc0ed99f3e5648a9";
    return config;
});
require(["__preload"], function(config) {
    var MergeRecursive=function(r,e){for(var c in e)try{r[c]=e[c].constructor==Object?MergeRecursive(r[c],e[c]):e[c]}catch(t){r[c]=e[c]}return r};
    var require_conf={};
    config.requirejs = MergeRecursive(config.requirejs, require_conf);
    require.config(config.requirejs);
    require(["__postload", "libs", "analytics"], function(cfg) {
        var ntr = cfg.tracker_id.length;
        for (i=0;i<ntr;i++){            
            var tracker = window.ga.create({
                trackingId: cfg.tracker_id[i],
                cookieDomain: cfg.highest_level_domain,
                name: cfg.tracker_name[i],
                cookieExpires: cfg.dz * 24 * 60 * 60,
                allowAnchor: true,
                allowLinker: true,
                clientId: cfg.ga_id
            });
            window.ga(cfg.tracker_name[i] + ".require", "linker");
            window.ga(cfg.tracker_name[i] + ".require", "displayfeatures");
            if (i==0) {
                window.ga(cfg.tracker_name[0] + ".require", "Monster", cfg);        
                window.ga(cfg.tracker_name[0] + ".require", "Scroll_tr", cfg);
                window.ga(cfg.tracker_name[0] + ".Monster:getBestInfo");
                window.ga(cfg.tracker_name[0] + ".Monster:preMonster");
                window.ga(cfg.tracker_name[0] + ".Monster:dirmonURL");
            }
            console.log(i);
            console.log(ntr-1);
            if (i<ntr-1){
                window.ga(cfg.tracker_name[i] + ".require", "GA_data", cfg);                
                window.ga(cfg.tracker_name[i] + ".GA_data:fire");
            }
           
        }
        cfg._rr(true, function() {            
            // cfg.getHeader();
            // cfg.checkErrors();
            window.ga(cfg.tracker_name[0] + ".Scroll_tr:init");        
            window.onscroll = function() {
                window.ga(cfg.tracker_name[0] + ".Scroll_tr:fire");
            };            
        });
          
        (window["yandex_metrika_callbacks"] = window["yandex_metrika_callbacks"] || []).push(function() {
            window["yaCounter" + cfg.yam_id] = new Ya.Metrika({
                id: cfg.yam_id,
                webvisor: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                params: cfg.uid || {}
            });
        });
        require(["metrika", "tagmanager"]);
        setTimeout(function(){
            for (i=0;i<ntr-1;i++){
                window.ga(cfg.tracker_name[i] + ".send", {
                  hitType: 'event',
                  eventCategory: 'New Visitor',
                  eventAction: cfg.loc.pathname                  
                });
            }            
        }, 30000);  
    });    
}); 