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
config.textMobile = function(a) {
    /*if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))){*/
        config._rr(true, function(){
            document.getElementById("header-phone").addEvent("change",function(){
               var phone = document.getElementById("header-phone").innerHTML.replace(/-/g,"");
                document.getElementById("header-phone").innerHTML = phone;
                document.getElementById("header-phone").textContent = phone;
            });
        })

        
    /*}*/
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
        config.sb.script("//mod.calltouch.ru/d_client.js?param;client_id" + config.uid.userId + ";ref" + encodeURI(config.ref) + ";url" + encodeURI(config.loc.href.split("#")[0]) + ";cook" + encodeURI(config.ck)).wait(function(){      
            config.textMobile(navigator.userAgent || navigator.vendor || window.opera);            
        });
    })
    .script("//mc.yandex.ru/metrika/watch.js")
    .script("//www.googletagmanager.com/gtm.js?id=" + config.tagmanager_id + (config.dataLayer_var != "dataLayer" ? "&l=" + config.dataLayer_var : ""));