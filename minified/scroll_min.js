function providePlugin(d,e){var f=window[window.GoogleAnalyticsObject||"ga"];if(f){f("provide",d,e);}}var Scroll_tr=function(c,d){this.tracker=c;this.uid=c.get("clientId");this.srvid=d.srvid;this.isDebug=d.debug;this.tracker_name=d.tracker_name;this.defaultOptions={trackDelay:1500,percentInterval:25,callback:null,cookieName:"_scroll_tr_ck"};this.lastScroll=null;};Scroll_tr.prototype.init=function(d){this.debugMessage("init - "+bx.lastScroll);bx.lastScroll=this.lastScroll;this.debugMessage("init - "+bx.lastScroll);if(typeof d==typeof{}){for(var e in d){if(d.hasOwnProperty(e)){this.defaultOptions[e]=d[e];}}}if(typeof this.options.callback=="function"){var f=this.callback();if(f!==false){this.options.callback.call(window,f);}}this.processScroll();return this;};Scroll_tr.prototype.callback=function(){var b=this.readCookie();if(b!==false&&b.scrollPercent>0&&b.documentLocation.length>0){this.setCookie(0,"",true);return b;}return false;};Scroll_tr.prototype.data=function(){var b=this.readCookie();if(b!==false&&b.scrollPercent>0&&b.documentLocation.length>0){return b;}return false;};Scroll_tr.prototype.throttle=function(m,p){var k,n,e;var o=null;var l=0;var i=function(){l=new Date;o=null;e=m.apply(k,n);};return function(){var b=new Date;if(!l){l=b;}var a=p-(b-l);k=this;n=arguments;if(a<=0){clearTimeout(o);o=null;l=b;e=m.apply(k,n);}else{if(!o){o=setTimeout(i,a);}}return e;};};Scroll_tr.prototype.scrollPercent=function(){this.debugMessage("scroll percent"+(this.scrollPosition()+this.viewportHeight())/this.pageHeight()*100);return Math.ceil((this.scrollPosition()+this.viewportHeight())/this.pageHeight()*100);};Scroll_tr.prototype.pageHeight=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);};Scroll_tr.prototype.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight||0;};Scroll_tr.prototype.scrollPosition=function(){return(window.pageYOffset||document.documentElement.scrollTop)-(document.documentElement.clientTop||0);};Scroll_tr.prototype.scrollPercentByInterval=function(c){var d=parseInt(this.scrollPercent()/(parseInt(c)-1e-10));return d*parseInt(c);};Scroll_tr.prototype.setCookie=function(i,g,f,h){i=parseInt(i);var e=this.readCookie();if(i>e.scrollPercent||h===true){expire_time=new Date;expire_time.setTime(expire_time.getTime()+60*60000);document.cookie=this.defaultOptions.cookieName+"="+escape(i+"|||"+g)+"; expires="+expire_time.toUTCString()+"; path="+f;dataLayer.push({event:"scroll",action:i,label:g});return false;}};Scroll_tr.prototype.readCookie=function(){var b=(document.cookie.match("(^|; )"+this.defaultOptions.cookieName+"=([^;]*)")||0)[2];if(b===undefined){b="0|||";}b=decodeURIComponent(b);b=b.split("|||");return b.length==2?{scrollPercent:parseInt(b[0]),documentLocation:b[1]}:false;};Scroll_tr.prototype.processScroll=function(){if(bx.lastScroll===null||(new Date).getTime()-bx.lastScroll>=parseInt(this.trackDelay)){this.setCookie(this.scrollPercentByInterval(this.defaultOptions.percentInterval),document.location.href,document.location.pathname);}};Scroll_tr.prototype.debugProcessScroll=function(){bx.lastScroll=(new Date).getTime();setTimeout(this.processScroll,parseInt(this.defaultOptions.trackDelay)+25);};Scroll_tr.prototype.fire=function(){this.throttle(this.processScroll(),100);};Scroll_tr.prototype.setDebug=function(b){this.isDebug=b;};Scroll_tr.prototype.debugMessage=function(b){if(!this.isDebug){return;}if(console){console.debug(b);}};providePlugin("Scroll_tr",Scroll_tr);