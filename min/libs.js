define("libs", ["__postload"], function(t) {
	function e(t, e) {
		var i = window[window.GoogleAnalyticsObject || "ga"];
		i && i("provide", t, e);
	}
	var s = function(t, e) {
		console.log(e.ref);
		this.tracker = t, 
		this.uid = e.ga_id, 
		this.isDebug = e.debug, 
		this.tracker_name = e.tracker_name, 
		this.uid_enc_out_tag = e.uid_enc_out_tag, 
		this.uid_plain_out_tag = e.uid_plain_out_tag, 
		this.uid_in = e.uid_in, 
		this.Zinfo = {}, 
		this.Zinfo.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "ъ", "э", "ю", "я"],
		this.urlRefc = e.urlRefc, 
		this.cookieC = e.cookieC, 
		this.metas = e.metas, 
		this.uid_ = e.uid_, 
		this.uid_ck = e.uid_ck;
		this.ref = e.ref;
		this.loc = e.loc;
	};
	s.prototype.ZdigitToInt = function(t) {
		for (var e = 0; e < this.Zinfo.digits.length; e++) {
			if (t == this.Zinfo.digits[e]) {
				return e - 0;
			}
		}
		return 0;
	};

	s.prototype.Zconvert = function(t, e, i) {
		try {
			var s = t.substr(0, 1);
			"+" == s || "-" == s ? t = t.substr(1) : s = "";
			for (var o = 0;
				"" != t;) {
				var r = t.substr(0, 1);
				r = this.ZdigitToInt(r), t = t.substr(1), o = o * e + r;
			}
			t = o, o = "";
			do {
				var r = Math.round(t % i, 0);
				t = Math.round((t - r) / i, 0), o = this.Zinfo.digits[r] + o;
			} while (t > 0);
			return o = s + o;
		} catch (c) {
			return alert("Error for: '" + t + "'"), 0;
		}
	};
	s.prototype.encode = function(t) {
		return this.Zconvert(t.split(".")[0], 10, 40);
	};
	s.prototype.decode = function(t) {
		return this.Zconvert(t, 40, 10);
	};
	s.prototype.write_encoded = function() {
		document.getElementById(this.uid_enc_out_tag).innerText = this.encode(this.uid);
		document.getElementById(this.uid_enc_out_tag).textContent = document.getElementById(this.uid_enc_out_tag).innerText;
	};
	s.prototype.write_plain = function() {
		document.getElementById(this.uid_plain_out_tag).innerText = this.uid_ck;
		document.getElementById(this.uid_plain_out_tag).textContent = document.getElementById(this.uid_plain_out_tag).innerText;
	}; 
	s.prototype.fire = function() {
		this.tracker.set("dimension1", this.uid);				
		"" !== this.urlRefc && this.urlRefc !== this.uid && this.tracker.set("dimension2", this.urlRefc);
		0 != this.uid_in && this.tracker.set("userId", this.uid_in);
		this.tracker.set("dimension3", this.metas.desc);
		this.tracker.set("dimension4", this.metas.keywords);
		this.tracker.set("dimension5", this.loc.hostname+this.loc.pathname+this.loc.search+this.loc.hash);
		this.tracker.set("dimension6", this.ref != "" ?  this.ref : "(not set)");
		this.debugMessage(this.tracker.get("dimension1") + " - " + this.tracker_name + " dimension set - " + this.uid + " - " + this.tracker.get("screenResolution") + " - " + this.metas.desc + " - " + this.metas.keywords + " - " + this.tracker.get("dimension3") + " - " + this.tracker.get("dimension4") + " - " + this.tracker.get("dimension5") + " - " + this.tracker.get("dimension6")); 
		this.tracker.send("pageview", {
			hitCallback: function() {
				t.GA_pageview_sent = "true", dataLayer.push({
					pageview: "sent"
				});
			},
			useBeacon: !0
		});
	};
	s.prototype.setDebug = function(t) {
		this.isDebug = t;
	};
	s.prototype.debugMessage = function(t) {
		this.isDebug && console && console.debug(t);
	};

	e("GA_data", s);

	var o = function(t, e) {
		this.tracker = t;
		this.uid = e.ga_id;
		this.isDebug = e.debug; 
		this.source = "";
		this.medium = "";
		this.campaign = "";
		this.term = "";
		this.content = "";
		this.gclid = "";
		this.dclid = "";
		this.i = "";
		this.getReferrer = "";
		this.foundSearchEngine = !1;
		this.loc = e.loc;
		this.ck = e.ck;
		this.ref = e.ref;
		this.ownedHostNames = this.loc.hostname.replace("www.", "");
		"" !== this.ref && (this.getReferrer = this.ref.replace("www.", "").split(/:\/\//)[1].split("/")[0]);
		this.enginesAndQueryParams = "daum:q= eniro:search_word= naver:query= pchome:q= images.google:q= google:q= yahoo:p= yahoo:q= msn:q= bing:q= aol:query= aol:q= lycos:q= lycos:query= ask:q= netscape:query= cnn:query= about:terms= mamma:q= voila:rdata= virgilio:qs= live:q= baidu:wd= alice:qs= yandex:text= najdi:q= seznam:q= rakuten:qt= biglobe:q= goo.ne:MT= wp:szukaj= onet:qt= yam:k= kvasir:q= ozu:q= terra:query= rambler:query= conduit:q= babylon:q= search-results:q= avg:q= comcast:q= incredimail:q= startsiden:q= go.mail.ru:q= search.centrum.cz:q= 360.cn:q=".split(" ");
		this.urlRefc = e.urlRefc;
		this.cookieC = e.cookieC;
	};


	o.prototype.remixed = function(t) {
		var e = "",
			i = "",
			s = "",
			o = t.split("");
		switch (t) {
			case "(direct)":
				e = "d";
				break;
			case "referral":
				e = "r";
				break;
			case "google":
				e = "g";
				break;
			case "organic":
				e = "o";
				break;
			case "(organic)":
				e = "or";
				break;
			case "yahoo":
				e = "ya";
				break;
			case "bing":
				e = "b";
				break;
			case "facebook.com":
				e = "f";
				break;
			case "m.facebook.com":
				e = "fm";
				break;
			case "twitter.com":
				e = "tw";
				break;
			case "linkedin.com":
				e = "l";
				break;
			case "youtube.com":
				e = "y";
				break;
			case "m.youtube.com":
				e = "ym";
				break;
			case "t.co":
				e = "t";
				break;
			case "stackoverflow.com":
				e = "so";
				break;
			case "pinterest.com":
				e = "p";
				break;
			case "plus.google.com":
				e = "gu";
				break;
			case "plus.url.google.com":
				e = "gp";
				break;
			case "(none)":
				e = "n";
				break;
			case "(not set)":
				e = "ns";
				break;
			case "(not provided)":
				e = "np";
				break;
			case "cpc":
				e = "c";
				break;
			default:
				for (s = 0; s < o.length; s++) {
					if (o[s].search(/[A-Za-z]+/) > -1) {
						switch (o[s].charCodeAt(0)) {
							case 90:
								i = "A";
								break;
							case 122:
								i = "a";
								break;
							default:
								i = o[s].charCodeAt(0) + 1;
						}
						e += String.fromCharCode(i);
					} else {
						e += o[s];
					}
				}
		}
		return e;
	};
	o.prototype.demixed = function(t) {
		var e = "",
			i = "",
			s = "",
			o = t.split("");
		switch (t) {
			case "d":
				e = "(direct)";
				break;
			case "r":
				e = "referral";
				break;
			case "g":
				e = "google";
				break;
			case "o":
				e = "organic";
				break;
			case "or":
				e = "(organic)";
				break;
			case "ya":
				e = "yahoo";
				break;
			case "b":
				e = "bing";
				break;
			case "f":
				e = "facebook.com";
				break;
			case "fm":
				e = "m.facebook.com";
				break;
			case "tw":
				e = "twitter.com";
				break;
			case "l":
				e = "linkedin.com";
				break;
			case "y":
				e = "youtube.com";
				break;
			case "ym":
				e = "m.youtube.com";
				break;
			case "t":
				e = "t.co";
				break;
			case "so":
				e = "stackoverflow.com";
				break;
			case "p":
				e = "pinterest.com";
				break;
			case "gu":
				e = "plus.google.com";
				break;
			case "gp":
				e = "plus.url.google.com";
				break;
			case "n":
				e = "(none)";
				break;
			case "ns":
				e = "(not set)";
				break;
			case "np":
				e = "(not provided)";
				break;
			case "c":
				e = "cpc";
				break;
			default:
				for (s = 0; s < t.length; s++) {
					if (o[s].search(/[A-Za-z]+/) > -1) {
						switch (o[s].charCodeAt(0)) {
							case 65:
								i = "Z";
								break;
							case 97:
								i = "z";
								break;
							default:
								i = o[s].charCodeAt(0) - 1;
						}
						e += String.fromCharCode(i);
					} else {
						e += o[s];
					}
				}
		}
		return e;
	};
	o.prototype.updateHash = function(t) {
		t = t ? "/" + t : "";
		var e = ["#", (window.location.hash || "#").split("#")[1].split("/")[0], t].join("");
		window._monsterHash = t, window.location.replace(window.location.href.split("#")[0] + e);
	};
	o.prototype.preMonster = function() {
		if ("" === this.ref && -1 === this.loc.hash.search(/(\?|&|#)(utm_source|dclid|gclid)=/) && this.cookieC !== this.urlRefc) {
			var t = "",
				e = "",
				i = "",
				s = "",
				o = "",
				r = "",
				c = "",
				n = "";
			this.loc.hash.indexOf("#g=") > -1 && (t = "gclid=" + this.demixed(this.loc.hash.split("#g=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0])), this.loc.hash.indexOf("#d=") > -1 && (e = "dclid=" + this.demixed(this.loc.hash.split("#d=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0])), this.loc.hash.indexOf("#sr=") > -1 && (i = "utm_source=" + this.demixed(this.loc.hash.split("#sr=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0])), this.loc.hash.indexOf("&m=") > -1 && (s = "&utm_medium=" + this.demixed(this.loc.hash.split("&m=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0])), this.loc.hash.indexOf("&cp=") > -1 && (o = "&utm_campaign=" + this.demixed(this.loc.hash.split("&cp=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0])), this.loc.hash.indexOf("&ct=") > -1 && (r = "&utm_content=" + this.demixed(this.loc.hash.split("&ct=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0])), this.loc.hash.indexOf("&st=") > -1 && (c = "&utm_term=" + this.demixed(this.loc.hash.split("&st=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0])), this.loc.hash.indexOf("&rf=") > -1 && (n = "&rf=" + this.loc.hash.split("&rf=")[1].split(/&m=|&cp=|&ct=|&st=/)[0]);
			var h = e + t + i + s + o + c + r + n;
			this.updateHash(h);
		}
		this.loc.href.search(/#(utm_source|gclid|dclid)=/) > -1 && this.cookieC === this.urlRefc && window.location.hash && this.updateHash("");
	};
	o.prototype.dirmonURL = function() {
		var t = "",
			e = "",
			i = "",
			s = "",
			o = "",
			r = "",
			c = "";
		if (this.loc.href.search(/(\?|&)(utm_source|dclid|gclid)=/) > -1) {
			this.updateHash("&rf=" + this.uid);
		} else {
			this.source.length > 0 && (t = "#sr=" + this.remixed(this.source)), this.dclid.length > 0 && (c = "#d=" + this.remixed(this.dclid)), this.gclid.length > 0 && (r = "#g=" + this.remixed(this.gclid)), this.medium.length > 0 && (e = "&m=" + this.remixed(this.medium)), this.campaign.length > 0 && (i = "&cp=" + this.remixed(this.campaign)), this.term.length > 0 && (s = "&st=" + this.remixed(this.term)), o = this.content.length > 0 ? this.content.search(/-slb|-tmc/) > -1 ? "&ct=" + this.remixed(this.content) : "&ct=" + this.remixed(this.content + "-slb") : "&ct=-tmc";
			var n = t + c + r + e + i + s + o + "&rf=" + this.uid;
			this.updateHash(n);
		}
	};
	o.prototype.dirmonCookie = function() {
		var t = "",
			e = "",
			i = "",
			s = "",
			o = "",
			r = "",
			c = "";
		this.source.length > 0 && (t = "ldmcsr=" + this.remixed(this.source)), this.dclid.length > 0 && (c = "ldmdclid=" + this.remixed(this.dclid)), this.gclid.length > 0 && (r = "ldmgclid=" + this.remixed(this.gclid)), this.medium.length > 0 && (e = "|ldmcmd=" + this.remixed(this.medium)), this.campaign.length > 0 && (i = "|ldmccn=" + this.remixed(this.campaign)), this.term.length > 0 && (s = "|ldmctr=" + this.remixed(this.term)), this.content.length > 0 && (o = "|ldmcct=" + this.remixed(this.content));
		var n = t + c + r + e + i + s + o,
			h = new Date;
		h.setMonth(h.getMonth() + 6);
		var a = "utmzombie=" + n + "; path=/; expires=" + h;
		document.cookie = a;
	};

	o.prototype.getBestInfo = function() {
		if (this.loc.href.indexOf("?") > -1) {
			var t = this.loc.href.split("?")[1].split(/#/)[0].split(/&/g);
			for (i = 0; i < t.length; i++) {
				t[i].indexOf("gclid") > -1 || t[i].indexOf("dclid") > -1 ? (t[i].indexOf("gclid") > -1 && (this.source = "google", this.medium = "cpc", this.content = t[i].split("=")[1]), t[i].indexOf("dclid") > -1 && (this.source = "google", this.medium = "display", this.content = t[i].split("=")[1]), this.ref.indexOf("google.com") > -1 ? this.term = this.ref.split(/&q=|\?q=|#q=/)[1].split(/&/)[0] : this.loc.href.indexOf("&st=") > -1 ? this.term = this.demixed(this.loc.href.split("&st=")[1].split(/&/)[0]) : this.ck.indexOf("|ldmcct=") > -1 && (this.term = this.ck.split("utmzombie")[1].split(";")[0].split(/utmctr=/)[1].split(/\|/)[0])) : t[i].indexOf("utm_source=") > -1 ? this.source = t[i].split("=")[1] : t[i].indexOf("utm_medium=") > -1 ? this.medium = t[i].split("=")[1] : t[i].indexOf("utm_campaign=") > -1 ? this.campaign = t[i].split("=")[1] : t[i].indexOf("utm_term=") > -1 ? this.term = t[i].split("=")[1] : t[i].indexOf("utm_content=") > -1 && (this.content = t[i].split("=")[1]);
			}
		} else {
			if ("" !== this.ref && -1 === this.getReferrer.search(this.ownedHostNames)) {
				for (i = 0; i < this.enginesAndQueryParams.length; i++) {
					this.ref.indexOf(this.enginesAndQueryParams[i].split(":")[0]) > -1 && (this.ref.indexOf(this.enginesAndQueryParams[i].split(":")[1]) > -1 ? (this.term = this.ref.split(this.enginesAndQueryParams[i].split(":")[1])[1].split("&")[0], "" === this.term && this.ref.indexOf("google.com/") > -1 && (this.term = "(not%20provided)"), this.source = this.enginesAndQueryParams[i].split(":")[0], this.medium = "organic", this.foundSearchEngine = !0) : "https://www.google.com/" === this.ref && (this.source = "google", this.medium = "organic", this.term = "(not%20provided)", this.foundSearchEngine = !0));
				}
				this.foundSearchEngine === !1 && (this.source = this.ref.replace("www.", "").split(/:\/\//)[1].split("/")[0], this.medium = "referral", this.content = this.ref.split(this.getReferrer)[1].split(/\?|#/)[0], "/" === this.content && (this.content = ""));
			} else {
				if (this.loc.href.search(/#sr=|#d=|#g=/) > -1) {
					var e = this.loc.hash.split(/&/g);
					for (i = 0; i < e.length; i++) {
						e[i].indexOf("#sr=") > -1 && (this.source = this.demixed(e[i].split("=")[1])), e[i].indexOf("#g=") > -1 && (this.gclid = this.demixed(e[i].split("=")[1])), e[i].indexOf("#d=") > -1 && (this.dclid = this.demixed(e[i].split("=")[1])), e[i].indexOf("m=") > -1 && (this.medium = this.demixed(e[i].split("=")[1])), e[i].indexOf("cp=") > -1 && (this.campaign = this.demixed(e[i].split("=")[1])), e[i].indexOf("st=") > -1 && (this.term = this.demixed(e[i].split("=")[1])), e[i].indexOf("ct=") > -1 && (this.content = this.demixed(e[i].split("=")[1]));
					}
				} else {
					if (this.ck.indexOf("utmzombie=") > -1) {
						var s = this.ck.split("utmzombie=")[1].split(";")[0].split(/\|/);
						for (i = 0; i < s.length; i++) {
							s[i].indexOf("ldmcsr=") > -1 && (this.source = this.demixed(s[i].split("=")[1])), s[i].indexOf("ldmgclid=") > -1 && (this.gclid = this.demixed(s[i].split("=")[1])), s[i].indexOf("ldmdclid=") > -1 && (this.dclid = this.demixed(s[i].split("=")[1])), s[i].indexOf("ldmcmd=") > -1 && (this.medium = this.demixed(s[i].split("=")[1])), s[i].indexOf("ldmccn=") > -1 && (this.campaign = this.demixed(s[i].split("=")[1])), s[i].indexOf("ldmctr=") > -1 && (this.term = this.demixed(s[i].split("=")[1])), s[i].indexOf("ldmcct=") > -1 && (this.content = this.demixed(s[i].split("=")[1]));
						}
					}
				}
			}
		}
		this.dirmonCookie();
	};
	o.prototype.setDebug = function(t) {
		this.isDebug = t;
	};
	o.prototype.debugMessage = function(t) {
		this.isDebug && console && console.debug(t);
	};

	e("Monster", o);

	var r = function(t, e) {
		this.tracker = t,
		this.uid = e.ga_id,		
		this.isDebug = e.debug, 
		this.tracker_name = e.tracker_name, 
		this.ck = e.ck, 
		this.loc = e.loc, 
		this.defaultOptions = {
			trackDelay: 1500,
			percentInterval: 25,
			callback: null,
			cookieName: "_scroll_tr_ck"
		}, 
		this.lastScroll = null;
	};

	r.prototype.init = function(t) {
		this.viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight || 0;
		this.pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
		this.clientHeight = document.documentElement.clientTop || 0;
		if (typeof d == typeof {}) {
			for (var e in t) {
				t.hasOwnProperty(e) && (this.defaultOptions[e] = t[e]);
			}
		}
		return this.processScroll(), this;
	};
	r.prototype.callback = function() {
		var t = this.readCookie();
		return t !== !1 && t.scrollPercent > 0 && t.documentLocation.length > 0 ? (this.setCookie(0, "", !0), t) : !1;
	};
	r.prototype.data = function() {
		var t = this.readCookie();
		return t !== !1 && t.scrollPercent > 0 && t.documentLocation.length > 0 ? t : !1;
	};
	r.prototype.throttle = function(t, e) {
		var i, s, o, r = null,
			c = 0,
			n = function() {
				c = new Date, r = null, o = t.apply(i, s);
			};
		return function() {
			var h = new Date;
			c || (c = h);
			var a = e - (h - c);
			return i = this, s = arguments, 0 >= a ? (clearTimeout(r), r = null, c = h, o = t.apply(i, s)) : r || (r = setTimeout(n, a)), o;
		};
	};
	r.prototype.scrollPercent = function() {
		return this.debugMessage("scroll percent" + (this.scrollPosition() + this.viewportHeight) / this.pageHeight * 100), Math.ceil((this.scrollPosition() + this.viewportHeight) / this.pageHeight * 100);
	};
	r.prototype.scrollPosition = function() {
		return (window.pageYOffset || document.documentElement.scrollTop) - this.clientHeight;
	};
	r.prototype.scrollPercentByInterval = function(t) {
		var e = parseInt(this.scrollPercent() / (parseInt(t) - 1e-10));
		return e * parseInt(t);
	};
	r.prototype.setCookie = function(t, e, i, s) {
		t = parseInt(t);
		var o = this.readCookie();
		return t > o.scrollPercent || s === !0 ? (expire_time = new Date, expire_time.setTime(expire_time.getTime() + 3600000), document.cookie = this.defaultOptions.cookieName + "=" + escape(t + "|||" + e) + "; expires=" + expire_time.toUTCString() + "; path=" + i, dataLayer.push({
			event: "scroll",
			action: t,
			label: e
		}), !1) : void 0;
	};
	r.prototype.readCookie = function() {
		var t = (document.cookie.match("(^|; )" + this.defaultOptions.cookieName + "=([^;]*)") || 0)[2];
		return void 0 === t && (t = "0|||"), t = decodeURIComponent(t), t = t.split("|||"), 2 == t.length ? {
			scrollPercent: parseInt(t[0]),
			documentLocation: t[1]
		} : !1;
	};
	r.prototype.processScroll = function() {
		(null === this.lastScroll || (new Date).getTime() - this.lastScroll >= parseInt(this.trackDelay)) && this.setCookie(this.scrollPercentByInterval(this.defaultOptions.percentInterval), this.loc.href, this.loc.pathname);
	};
	r.prototype.debugProcessScroll = function() {
		window.config.lastScroll = (new Date).getTime(), setTimeout(this.processScroll, parseInt(this.defaultOptions.trackDelay) + 25);
	};
	r.prototype.fire = function() {
		this.throttle(this.processScroll(), 100);
	};
	r.prototype.setDebug = function(t) {
		this.isDebug = t;
	};
	r.prototype.debugMessage = function(t) {
		this.isDebug && console && console.debug(t);
	};

	e("Scroll_tr", r);
	
	return t;

});