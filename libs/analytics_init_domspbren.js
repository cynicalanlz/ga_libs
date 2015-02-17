if (typeof config.metas != "undefined") {
    if (config.metas.all.length > 0) {
        config.metas.count = {
            all: config.metas.all.length,
            desc: 0,
            keywords: 0
        };
        for (var q = config.metas.count.all; q--;) {
            if (config.metas.all[q].name != null) {
                switch (config.metas.all[q].name.toLowerCase()) {
                    case "description":
                        config.metas.desc = config.metas.all[q].content != "" ? config.metas.all[q].content : "(not set)";
                        break;

                    case "keywords":
                        config.metas.keywords = config.metas.all[q].content != "" ? config.metas.all[q].content : "(not set)";
                        break;
                }
            }
        }
    }
}

config.readyList = [];
config.readyFired = false;
config.readyEventHandlersInstalled = false;
config.compl = function (){        
   if (!config.readyComplete) {        
        config.readyComplete = !0;        
        for (var a = config.readyList.length; a--;){
            config.readyList[a].fn.call(window, config.readyList[a].cxt);                             
        }         
        config.readyList = []; 
   } 
};
config.ready = function() {          
    if (!config.readyFired) {            
        config.readyFired = !0;        
        for (var a = config.readyList.length; a--;){            
            if(config.readyList[a].inx){                                
                config.readyList[a].fn.call(window, config.readyList[a].cxt);       
                config.readyList.splice(a,1);                                                               
            }            
        }                                         
    }    
    if (!config.readyComplete){        
        /^co/.test(document.readyState) && config.compl();
    }
};
config.readyStateChange = function() { 
    switch(config.expVar){
        case "complete":config.ready();break;
        case "interactive":config.compl()
    };    
};
config._rr = function(inx, a, cxt) {   
    config.readyComplete||config.readyFired&&inx?setTimeout(function(){a(cxt)},1):(config.readyList.push({fn:a,cxt:cxt,inx:inx}),/^in|^co/.test(document.readyState)&&setTimeout(config.ready,1),config.readyEventHandlersInstalled||(document.addEventListener?(document.addEventListener("DOMContentLoaded",config.ready,!1),window.addEventListener("load",config.compl,!1)):(document.attachEvent("onreadystatechange",config.readyStateChange),window.attachEvent("onload",config.compl)),config.readyEventHandlersInstalled=!0));
};
config.changeText = function(a){
    var phone = document.getElementById(a).innerHTML.replace(/-/g,"");
    document.getElementById(a).innerHTML = phone;
    document.getElementById(a).textContent = phone;
};
config.uid_ck = (config.ck.match("(^|; )_uid=([^;]*)") || 0)[2];
config.cookieC = config.ck.indexOf("_ga=") > -1 ? config.ck.toString().split("_ga=")[1].split(";")[0].split(/GA[0-9]\.[0-9]\./)[1] : "";
config.urlRefc = config.loc.href.indexOf("&rf=") > -1 ? config.loc.href.split("&rf=")[1].split(/[&,?]/)[0] : "";
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
if (typeof config.uid_ck === "undefined") {
    config.uid_ck = config.createCookie("_uid", Math.floor((Math.random() * 1000000000) + 1) + "." + new Date().getTime(), config.dz);
}
config.getHeader = function () {
    config.metas.header.all = document.getElementsByTagName("h1");
    0<config.metas.header.all.length&&(config.metas.header.text=""!=config.metas.header.all[0].innerHTML?config.metas.header.all[0].innerHTML:"(not set)",config.metas.count.header=config.metas.header.all.length);
};
config.checkErrors = function() {
    if (config.metas.count.desc == 0 || config.metas.count.desc > 1 || config.metas.desc == "(not set)") {
        config.errMsg = config.loc.href + " has " + config.metas.count.desc + " description tags and first tag is " + ((config.metas.desc == "(not set)") ? "not set" : "set");        
        ga(config.tracker_name + ".send", "exception", {
            "exFatal": false,
            "exDescription": config.errMsg,
            "useBeacon": true
        });
    }
    if (config.metas.count.keywords == 0 || config.metas.count.keywords > 1 || config.metas.keywords == "(not set)") {
        config.errMsg = config.loc.href + " has " + config.metas.count.keywords + " keywords tags and first tag is " + ((config.metas.keywords == "(not set)") ? "not set" : "set");        
        ga(config.tracker_name + ".send", "exception", {
            "exFatal": false,
            "exDescription": config.errMsg,
            "useBeacon": true
        });
    }
    if (config.metas.count.header == 0 || config.metas.count.header > 1 || config.metas.header.text == "(not set)") {
        config.errMsg = config.loc.href + " has " + config.metas.count.header + " h1 tags and first tag is " + ((config.metas.header.text == "(not set)") ? "not set" : "set");        
        ga(config.tracker_name + ".send", "exception", {
            "exFatal": false,
            "exDescription": config.errMsg,
            "useBeacon": true
        });
    }
};
window['GoogleAnalyticsObject'] = config.ga_object;
window[config.ga_object] = window[config.ga_object] || function() {
    (window[config.ga_object].q = window[config.ga_object].q || []).push(arguments);
}, window[config.ga_object].l = 1 * new Date();
(window[config.dataLayer_var] = window[config.dataLayer_var] || []).push({
    "gtm.start": (new Date).getTime(),
    event: "gtm.js"
});
$LAB    
    .script(config.plugins_path)
    .script("//www.google-analytics.com/cx/api.js?experiment=" + config.expId)
    .script("//www.google-analytics.com/analytics" + (config.debug == true ? "_debug" : "") + ".js").wait(function() {
        var tracker = ga.create(config.tracker_id, config.highest_level_domain,{
            name: config.tracker_name,
            cookieExpires: config.dz * 24 * 60 * 60,
            allowAnchor: true
        });
        config.uid = {
            'userId': tracker.get('clientId')
        };
        config.expVar = cxApi.chooseVariation();
        cxApi.setChosenVariation(config.expVar, config.expId);                    
        tracker.set('expId', config.expId);
        tracker.set('expVar', config.expVar);        
        ga(config.tracker_name + ".require", "displayfeatures");
        ga(config.tracker_name + ".require", "Monster", config);
        ga(config.tracker_name + ".require", "GA_data", config);
        ga(config.tracker_name + ".require", "Scroll_tr", config);
        ga(config.tracker_name + ".Monster:getBestInfo");
        ga(config.tracker_name + ".Monster:preMonster");
        ga(config.tracker_name + ".GA_data:fire");        
        ga(config.tracker_name + ".Monster:dirmonURL");        
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
        config._rr(true, function (){
            var root = document.documentElement;
            switch (config.expVar){                
                case 0 :                     
                    root.className += " b-custom-header b-custom-header_var1"; 
                    break;                
                case 1 :
                    root.className += " b-custom-header b-custom-header_var2";
                    break;
                case 2 :
                    root.className += " b-custom-header b-custom-header_var4";
                    break;               
            }
            config.getHeader();
            config.checkErrors();       
            ga(config.tracker_name + ".Scroll_tr:init");
            window.onscroll = function() {
                ga(config.tracker_name + ".Scroll_tr:fire");
            };        
        }); 
        config.sb = $LAB.sandbox();
        config.sb.script("//mod.calltouch.ru/d_client.js?param;client_id" + config.uid.userId + ";ref" + encodeURI(config.ref) + ";url" + encodeURI(config.loc.href.split("#")[0]) + ";cook" + encodeURI(config.ck));
    })
    .script("//mc.yandex.ru/metrika/watch.js")
    .script("//www.googletagmanager.com/gtm.js?id=" + config.tagmanager_id + (config.dataLayer_var != "dataLayer" ? "&l=" + config.dataLayer_var : ""));