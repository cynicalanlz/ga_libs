define('__postload', ['__preload'], function(config) {
    config.metas = {
            all: document.getElementsByTagName("meta"),
            count: {
                all: 0,
                desc: 0,
                keywords: 0
            },
            header: {}
    };
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
                            config.metas.count.desc++
                            break;
                        case "keywords":
                            config.metas.keywords = config.metas.all[q].content != "" ? config.metas.all[q].content : "(not set)";
                            config.metas.count.keywords++
                            break;
                    }
                }
            }
        }
    }
    config.readyList = [];
    config.readyFired = false;
    config.readyEventHandlersInstalled = false;

    config.compl = function() {
        if (!config.readyComplete) {
            config.readyComplete = !0;
            for (var a = config.readyList.length; a--;) {
                config.readyList[a].fn.call(window, config.readyList[a].cxt);
            }
            config.readyList = [];
        }
    };
    config.ready = function() {
        if (!config.readyFired) {
            config.readyFired = !0;
            for (var a = config.readyList.length; a--;) {
                if (config.readyList[a].inx) {
                    config.readyList[a].fn.call(window, config.readyList[a].cxt);
                    config.readyList.splice(a, 1);
                }
            }
        }
        if (!config.readyComplete) {
            /^co/.test(document.readyState) && config.compl();
        }
    };
    config.readyStateChange = function() {
        switch (config.expVar) {
            case "complete":
                config.ready();
                break;
            case "interactive":
                config.compl();
        }
    };

    config._rr = function(inx, a, cxt) {
        config.readyComplete || config.readyFired && inx ? setTimeout(function() {
            a(cxt);
        }, 1) : (config.readyList.push({
            fn: a,
            cxt: cxt,
            inx: inx
        }), /^in|^co/.test(document.readyState) && setTimeout(config.ready, 1), config.readyEventHandlersInstalled || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", config.ready, !1), window.addEventListener("load", config.compl, !1)) : (document.attachEvent("onreadystatechange", config.readyStateChange), window.attachEvent("onload", config.compl)), config.readyEventHandlersInstalled = !0));
    };

    config.changeText = function(a) {
        var phone = document.getElementById(a).innerHTML.replace(/-/g, "");
        document.getElementById(a).innerHTML = phone;
        document.getElementById(a).textContent = phone;
    };

    config.getHeader = function() {
        config.metas.header.all = document.getElementsByTagName("h1");
        0 < config.metas.header.all.length && (config.metas.header.text = "" != config.metas.header.all[0].innerHTML ? config.metas.header.all[0].innerHTML : "(not set)", config.metas.count.header = config.metas.header.all.length);
    };
    config.checkErrors = function() {
        if (config.metas.count.desc == 0 || config.metas.count.desc > 1 || config.metas.desc == "(not set)") {
            config.errMsg = config.loc.href + " has " + config.metas.count.desc + " description tags and first tag is " + ((config.metas.desc == "(not set)") ? "not set" : "set");
            window.ga(config.tracker_name + ".send", "exception", {
                "exFatal": false,
                "exDescription": config.errMsg,
                "useBeacon": true,
                "nonInteraction":true
            });
        }
        if (config.metas.count.keywords == 0 || config.metas.count.keywords > 1 || config.metas.keywords == "(not set)") {
            config.errMsg = config.loc.href + " has " + config.metas.count.keywords + " keywords tags and first tag is " + ((config.metas.keywords == "(not set)") ? "not set" : "set");
            window.ga(config.tracker_name + ".send", "exception", {
                "exFatal": false,
                "exDescription": config.errMsg,
                "useBeacon": true,
                "nonInteraction":true
            });
        }
        if (config.metas.count.header == 0 || config.metas.count.header > 1 || config.metas.header.text == "(not set)") {
            config.errMsg = config.loc.href + " has " + config.metas.count.header + " h1 tags and first tag is " + ((config.metas.header.text == "(not set)") ? "not set" : "set");
            window.ga(config.tracker_name + ".send", "exception", {
                "exFatal": false,
                "exDescription": config.errMsg,
                "useBeacon": true,
                "nonInteraction":true
            });
        }
    };    
    return config;
});
