define('__postload', ['__preload'], function(config) {
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
    return config;
});
