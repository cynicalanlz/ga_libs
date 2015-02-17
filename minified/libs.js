function providePlugin(e, b) {
	var d = window[window.GoogleAnalyticsObject || "ga"];
	if (d) {
		d("provide", e, b);
	}
}

var GA_data = function(c, b) {
	this.tracker = c;
	this.uid = c.get("clientId");
	this.isDebug = b.debug;
	this.tracker_name = b.tracker_name;
	this.uid_enc_out_tag = b.uid_enc_out_tag;
	this.uid_plain_out_tag = b.uid_plain_out_tag;
	this.uid_in = b.uid_in;
	this.Zinfo = {};
	this.Zinfo.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "ъ", "э", "ю", "я"];
	this.urlRefc = b.urlRef;
	this.cookieC = b.cookieC;
	this.metas = b.metas;
	this.uid_ = b.uid_;
	this.uid_ck = b.uid_ck;	
};
GA_data.prototype.ZdigitToInt = function(c) {
	for (var b = 0; b < this.Zinfo.digits.length; b++) {
		if (c == this.Zinfo.digits[b]) {
			return b - 0;
		}
	}
	return 0;
};
GA_data.prototype.Zconvert = function(l, k, i) {
	try {
		var m = l.substr(0, 1);
		if (m == "+" || m == "-") {
			l = l.substr(1);
		} else {
			m = "";
		}
		var e = 0;
		while (l != "") {
			var b = l.substr(0, 1);
			b = this.ZdigitToInt(b);
			l = l.substr(1);
			e = e * k + b;
		}
		l = e;
		e = "";
		do {
			var b = Math.round(l % i, 0);
			l = Math.round((l - b) / i, 0);
			e = this.Zinfo.digits[b] + e;
		} while (l > 0);
		e = m + e;
		return e;
	} catch (j) {
		alert("Error for: '" + l + "'");
		return 0;
	}
};
GA_data.prototype.encode = function(b) {
	return this.Zconvert(b.split(".")[0], 10, 40);
};
GA_data.prototype.decode = function(b) {
	return this.Zconvert(b, 40, 10);
};
GA_data.prototype.write_encoded = function() {
	document.getElementById(this.uid_enc_out_tag).innerText = this.encode(this.uid);
	document.getElementById(this.uid_enc_out_tag).textContent = document.getElementById(this.uid_enc_out_tag).innerText;
};
GA_data.prototype.write_plain = function() {
	document.getElementById(this.uid_plain_out_tag).innerText = this.uid_ck;
	document.getElementById(this.uid_plain_out_tag).textContent = document.getElementById(this.uid_plain_out_tag).innerText;
};
GA_data.prototype.fire = function() {
	this.tracker.set("dimension1", this.uid);
	if (this.urlRefc !== "" && this.urlRefc !== this.cookieC) {
		this.tracker.set("dimension2", this.urlRefc);
	}
	if (this.uid_in != 0) {
		this.tracker.set("userId", this.uid_in);
	}
	this.tracker.set("dimension3", this.metas.desc);
	this.tracker.set("dimension4", this.metas.keywords);
	this.debugMessage(this.tracker.get("dimension1") + " - " + this.tracker_name + " dimension set - " + this.uid + " - " + this.tracker.get("screenResolution") + " - " + this.metas.desc + " - " + this.metas.keywords + " - " + this.tracker.get("dimension3") + " - " + this.tracker.get("dimension4"));
	this.tracker.send("pageview", {
		hitCallback: function() {
			window.config.GA_pageview_sent = "true";
			dataLayer.push({
				'pageview': 'sent'
			});
		},
		useBeacon : true
	});
};
GA_data.prototype.setDebug = function(b) {
	this.isDebug = b;
};
GA_data.prototype.debugMessage = function(b) {
	if (!this.isDebug) {
		return;
	}
	if (console) {
		console.debug(b);
	}
};
providePlugin("GA_data", GA_data);


var Monster = function(e, a) {
	this.tracker = e;
	this.uid = e.get("clientId");
	this.uid_ = a.uid_;
	this.isDebug = a.debug;
	this.source = "";
	this.medium = "";
	this.campaign = "";
	this.term = "";
	this.content = "";
	this.gclid = "";
	this.dclid = "";
	this.URLnewHash = "";
	this.i = "";
	this.getReferrer = "";
	this.foundSearchEngine = false;
	this.loc = a.loc;
	this.ck = a.ck;
	this.ref = a.ref;
	this.ownedHostNames = this.loc.hostname.replace("www.", "");
	if (this.ref !== "") {
		this.getReferrer = this.ref.replace("www.", "").split(/:\/\//)[1].split("/")[0];
	}
	this.enginesAndQueryParams = "daum:q= eniro:search_word= naver:query= pchome:q= images.google:q= google:q= yahoo:p= yahoo:q= msn:q= bing:q= aol:query= aol:q= lycos:q= lycos:query= ask:q= netscape:query= cnn:query= about:terms= mamma:q= voila:rdata= virgilio:qs= live:q= baidu:wd= alice:qs= yandex:text= najdi:q= seznam:q= rakuten:qt= biglobe:q= goo.ne:MT= wp:szukaj= onet:qt= yam:k= kvasir:q= ozu:q= terra:query= rambler:query= conduit:q= babylon:q= search-results:q= avg:q= comcast:q= incredimail:q= startsiden:q= go.mail.ru:q= search.centrum.cz:q= 360.cn:q=".split(" ");
	this.urlRefc = a.urlRefc;
	this.cookieC = a.cookieC;	
};
Monster.prototype.remixed = function(paramBits) {
	var reduxBits = "";
	var newChar = "";
	var i = "";
	var splitBits = paramBits.split("");
	switch (paramBits) {
		case "(direct)":
			reduxBits = "d";
			break;
		case "referral":
			reduxBits = "r";
			break;
		case "google":
			reduxBits = "g";
			break;
		case "organic":
			reduxBits = "o";
			break;
		case "(organic)":
			reduxBits = "or";
			break;
		case "yahoo":
			reduxBits = "ya";
			break;
		case "bing":
			reduxBits = "b";
			break;
		case "facebook.com":
			reduxBits = "f";
			break;
		case "m.facebook.com":
			reduxBits = "fm";
			break;
		case "twitter.com":
			reduxBits = "tw";
			break;
		case "linkedin.com":
			reduxBits = "l";
			break;
		case "youtube.com":
			reduxBits = "y";
			break;
		case "m.youtube.com":
			reduxBits = "ym";
			break;
		case "t.co":
			reduxBits = "t";
			break;
		case "stackoverflow.com":
			reduxBits = "so";
			break;
		case "pinterest.com":
			reduxBits = "p";
			break;
		case "plus.google.com":
			reduxBits = "gu";
			break;
		case "plus.url.google.com":
			reduxBits = "gp";
			break;
		case "(none)":
			reduxBits = "n";
			break;
		case "(not set)":
			reduxBits = "ns";
			break;
		case "(not provided)":
			reduxBits = "np";
			break;
		case "cpc":
			reduxBits = "c";
			break;
		default:
			for (i = 0; i < splitBits.length; i++) {
				if (splitBits[i].search(/[A-Za-z]+/) > -1) {
					switch (splitBits[i].charCodeAt(0)) {
						case 90:
							newChar = "A";
							break;
						case 122:
							newChar = "a";
							break;
						default:
							newChar = splitBits[i].charCodeAt(0) + 1;
							break;
					}
					reduxBits += String.fromCharCode(newChar);
				} else {
					reduxBits += splitBits[i];
				}
			}
			break;
	}
	return reduxBits;
};
Monster.prototype.demixed = function(paramEncodes) {
	var reduxBits = "";
	var newChar = "";
	var i = "";
	var splitBits = paramEncodes.split("");
	switch (paramEncodes) {
		case "d":
			reduxBits = "(direct)";
			break;
		case "r":
			reduxBits = "referral";
			break;
		case "g":
			reduxBits = "google";
			break;
		case "o":
			reduxBits = "organic";
			break;
		case "or":
			reduxBits = "(organic)";
			break;
		case "ya":
			reduxBits = "yahoo";
			break;
		case "b":
			reduxBits = "bing";
			break;
		case "f":
			reduxBits = "facebook.com";
			break;
		case "fm":
			reduxBits = "m.facebook.com";
			break;
		case "tw":
			reduxBits = "twitter.com";
			break;
		case "l":
			reduxBits = "linkedin.com";
			break;
		case "y":
			reduxBits = "youtube.com";
			break;
		case "ym":
			reduxBits = "m.youtube.com";
			break;
		case "t":
			reduxBits = "t.co";
			break;
		case "so":
			reduxBits = "stackoverflow.com";
			break;
		case "p":
			reduxBits = "pinterest.com";
			break;
		case "gu":
			reduxBits = "plus.google.com";
			break;
		case "gp":
			reduxBits = "plus.url.google.com";
			break;
		case "n":
			reduxBits = "(none)";
			break;
		case "ns":
			reduxBits = "(not set)";
			break;
		case "np":
			reduxBits = "(not provided)";
			break;
		case "c":
			reduxBits = "cpc";
			break;
		default:
			for (i = 0; i < paramEncodes.length; i++) {
				if (splitBits[i].search(/[A-Za-z]+/) > -1) {
					switch (splitBits[i].charCodeAt(0)) {
						case 65:
							newChar = "Z";
							break;
						case 97:
							newChar = "z";
							break;
						default:
							newChar = splitBits[i].charCodeAt(0) - 1;
							break;
					}
					reduxBits += String.fromCharCode(newChar);
				} else {
					reduxBits += splitBits[i];
				}
			}
			break;
	}
	return reduxBits;
};
Monster.prototype.preMonster = function() {
	if (this.ref === "" && this.loc.hash.search(/(\?|&|#)(utm_source|dclid|gclid)=/) === -1 && this.cookieC !== this.urlRefc) {
		var pmGclid = "";
		var pmDclid = "";
		var pmSource = "";
		var pmMedium = "";
		var pmCampaign = "";
		var pmContent = "";
		var pmTerm = "";
		var pmRefcid = "";
		if (this.loc.hash.indexOf("#g=") > -1) {
			pmGclid = "gclid=" + this.demixed(this.loc.hash.split("#g=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (this.loc.hash.indexOf("#d=") > -1) {
			pmDclid = "dclid=" + this.demixed(this.loc.hash.split("#d=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (this.loc.hash.indexOf("#sr=") > -1) {
			pmSource = "utm_source=" + this.demixed(this.loc.hash.split("#sr=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (this.loc.hash.indexOf("&m=") > -1) {
			pmMedium = "&utm_medium=" + this.demixed(this.loc.hash.split("&m=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (this.loc.hash.indexOf("&cp=") > -1) {
			pmCampaign = "&utm_campaign=" + this.demixed(this.loc.hash.split("&cp=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (this.loc.hash.indexOf("&ct=") > -1) {
			pmContent = "&utm_content=" + this.demixed(this.loc.hash.split("&ct=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (this.loc.hash.indexOf("&st=") > -1) {
			pmTerm = "&utm_term=" + this.demixed(this.loc.hash.split("&st=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (this.loc.hash.indexOf("&rf=") > -1) {
			pmRefcid = "&rf=" + this.loc.hash.split("&rf=")[1].split(/&m=|&cp=|&ct=|&st=/)[0];
		}
		var fixedHash = pmDclid + pmGclid + pmSource + pmMedium + pmCampaign + pmTerm + pmContent + pmRefcid;
		window.location.hash = fixedHash;
	}
	if (this.loc.href.search(/#(utm_source|gclid|dclid)=/) > -1 && this.cookieC === this.urlRefc) {
		window.location.hash = "";
	}
};
Monster.prototype.dirmonURL = function() {	
	var urlSource = "";
	var urlMedium = "";
	var urlCampaign = "";
	var urlTerm = "";
	var urlContent = "";
	var urlGclid = "";
	var urlDclid = "";
	if (this.loc.href.search(/(\?|&)(utm_source|dclid|gclid)=/) > -1) {
		window.location.hash = "&rf=" + this.uid;
	} else {
		if (this.source.length > 0) {
			urlSource = "#sr=" + this.remixed(this.source);
		}
		if (this.dclid.length > 0) {
			urlDclid = "#d=" + this.remixed(this.dclid);
		}
		if (this.gclid.length > 0) {
			urlGclid = "#g=" + this.remixed(this.gclid);
		}
		if (this.medium.length > 0) {
			urlMedium = "&m=" + this.remixed(this.medium);
		}
		if (this.campaign.length > 0) {
			urlCampaign = "&cp=" + this.remixed(this.campaign);
		}
		if (this.term.length > 0) {
			urlTerm = "&st=" + this.remixed(this.term);
		}
		if (this.content.length > 0) {
			if (this.content.search(/-slb|-tmc/) > -1) {
				urlContent = "&ct=" + this.remixed(this.content);
			} else {
				urlContent = "&ct=" + this.remixed(this.content + "-slb");
			}
		} else {
			urlContent = "&ct=-tmc";
		}
		this.URLnewHash = urlSource + urlDclid + urlGclid + urlMedium + urlCampaign + urlTerm + urlContent + "&rf=" + this.uid;
		window.location.hash = this.URLnewHash;
	}
};
Monster.prototype.dirmonCookie = function() {
	var cookSource = "";
	var cookMedium = "";
	var cookCampaign = "";
	var cookTerm = "";
	var cookContent = "";
	var cookGclid = "";
	var cookDclid = "";
	if (this.source.length > 0) {
		cookSource = "ldmcsr=" + this.remixed(this.source);
	}
	if (this.dclid.length > 0) {
		cookDclid = "ldmdclid=" + this.remixed(this.dclid);
	}
	if (this.gclid.length > 0) {
		cookGclid = "ldmgclid=" + this.remixed(this.gclid);
	}
	if (this.medium.length > 0) {
		cookMedium = "|ldmcmd=" + this.remixed(this.medium);
	}
	if (this.campaign.length > 0) {
		cookCampaign = "|ldmccn=" + this.remixed(this.campaign);
	}
	if (this.term.length > 0) {
		cookTerm = "|ldmctr=" + this.remixed(this.term);
	}
	if (this.content.length > 0) {
		cookContent = "|ldmcct=" + this.remixed(this.content);
	}
	var cookieString = cookSource + cookDclid + cookGclid + cookMedium + cookCampaign + cookTerm + cookContent;
	var cookieExpires = new Date();
	cookieExpires.setMonth(cookieExpires.getMonth() + 6);
	var finalCookie = "utmzombie=" + cookieString + "; path=/; expires=" + cookieExpires;
	document.cookie = finalCookie;
};
Monster.prototype.getBestInfo = function() {	
	if (this.loc.href.indexOf("?") > -1) {
		var queryParams = this.loc.href.split("?")[1].split(/#/)[0].split(/&/g);
		for (i = 0; i < queryParams.length; i++) {
			if (queryParams[i].indexOf("gclid") > -1 || queryParams[i].indexOf("dclid") > -1) {
				if (queryParams[i].indexOf("gclid") > -1) {
					this.source = "google";
					this.medium = "cpc";
					this.content = queryParams[i].split("=")[1];
				}
				if (queryParams[i].indexOf("dclid") > -1) {
					this.source = "google";
					this.medium = "display";
					this.content = queryParams[i].split("=")[1];
				}
				if (this.ref.indexOf("google.com") > -1) {
					this.term = this.ref.split(/&q=|\?q=|#q=/)[1].split(/&/)[0];
				} else {
					if (this.loc.href.indexOf("&st=") > -1) {
						this.term = this.demixed(this.loc.href.split("&st=")[1].split(/&/)[0]);
					} else {
						if (this.ck.indexOf("|ldmcct=") > -1) {
							this.term = this.ck.split("utmzombie")[1].split(";")[0].split(/utmctr=/)[1].split(/\|/)[0];
						}
					}
				}
			} else {
				if (queryParams[i].indexOf("utm_source=") > -1) {
					this.source = queryParams[i].split("=")[1];
				} else {
					if (queryParams[i].indexOf("utm_medium=") > -1) {
						this.medium = queryParams[i].split("=")[1];
					} else {
						if (queryParams[i].indexOf("utm_campaign=") > -1) {
							this.campaign = queryParams[i].split("=")[1];
						} else {
							if (queryParams[i].indexOf("utm_term=") > -1) {
								this.term = queryParams[i].split("=")[1];
							} else {
								if (queryParams[i].indexOf("utm_content=") > -1) {
									this.content = queryParams[i].split("=")[1];
								}
							}
						}
					}
				}
			}
		}
	} else {
		if (this.ref !== "" && this.getReferrer.search(this.ownedHostNames) === -1) {
			for (i = 0; i < this.enginesAndQueryParams.length; i++) {
				if (this.ref.indexOf(this.enginesAndQueryParams[i].split(":")[0]) > -1) {
					if (this.ref.indexOf(this.enginesAndQueryParams[i].split(":")[1]) > -1) {
						this.term = this.ref.split(this.enginesAndQueryParams[i].split(":")[1])[1].split("&")[0];
						if (this.term === "" && this.ref.indexOf("google.com/") > -1) {
							this.term = "(not%20provided)";
						}
						this.source = this.enginesAndQueryParams[i].split(":")[0];
						this.medium = "organic";
						this.foundSearchEngine = true;
					} else {
						if (this.ref === "https://www.google.com/") {
							this.source = "google";
							this.medium = "organic";
							this.term = "(not%20provided)";
							this.foundSearchEngine = true;
						}
					}
				}
			}
			if (this.foundSearchEngine === false) {
				this.source = this.ref.replace("www.", "").split(/:\/\//)[1].split("/")[0];
				this.medium = "referral";
				this.content = this.ref.split(this.getReferrer)[1].split(/\?|#/)[0];
				if (this.content === "/") {
					this.content = "";
				}
			}
		} else {
			if (this.loc.href.search(/#sr=|#d=|#g=/) > -1) {
				var hashedParams = this.loc.hash.split(/&/g);
				for (i = 0; i < hashedParams.length; i++) {
					if (hashedParams[i].indexOf("#sr=") > -1) {
						this.source = this.demixed(hashedParams[i].split("=")[1]);
					}
					if (hashedParams[i].indexOf("#g=") > -1) {
						this.gclid = this.demixed(hashedParams[i].split("=")[1]);
					}
					if (hashedParams[i].indexOf("#d=") > -1) {
						this.dclid = this.demixed(hashedParams[i].split("=")[1]);
					}
					if (hashedParams[i].indexOf("m=") > -1) {
						this.medium = this.demixed(hashedParams[i].split("=")[1]);
					}
					if (hashedParams[i].indexOf("cp=") > -1) {
						this.campaign = this.demixed(hashedParams[i].split("=")[1]);
					}
					if (hashedParams[i].indexOf("st=") > -1) {
						this.term = this.demixed(hashedParams[i].split("=")[1]);
					}
					if (hashedParams[i].indexOf("ct=") > -1) {
						this.content = this.demixed(hashedParams[i].split("=")[1]);
					}
				}
			} else {
				if (this.ck.indexOf("utmzombie=") > -1) {
					var cookieBits = this.ck.split("utmzombie=")[1].split(";")[0].split(/\|/);
					for (i = 0; i < cookieBits.length; i++) {
						if (cookieBits[i].indexOf("ldmcsr=") > -1) {
							this.source = this.demixed(cookieBits[i].split("=")[1]);
						}
						if (cookieBits[i].indexOf("ldmgclid=") > -1) {
							this.gclid = this.demixed(cookieBits[i].split("=")[1]);
						}
						if (cookieBits[i].indexOf("ldmdclid=") > -1) {
							this.dclid = this.demixed(cookieBits[i].split("=")[1]);
						}
						if (cookieBits[i].indexOf("ldmcmd=") > -1) {
							this.medium = this.demixed(cookieBits[i].split("=")[1]);
						}
						if (cookieBits[i].indexOf("ldmccn=") > -1) {
							this.campaign = this.demixed(cookieBits[i].split("=")[1]);
						}
						if (cookieBits[i].indexOf("ldmctr=") > -1) {
							this.term = this.demixed(cookieBits[i].split("=")[1]);
						}
						if (cookieBits[i].indexOf("ldmcct=") > -1) {
							this.content = this.demixed(cookieBits[i].split("=")[1]);
						}
					}
				}
			}
		}
	}
	this.dirmonCookie();
};
Monster.prototype.setDebug = function(a) {
	this.isDebug = a;
};
Monster.prototype.debugMessage = function(a) {
	if (!this.isDebug) {
		return;
	}
	if (console) {
		console.debug(a);
	}
};
providePlugin("Monster", Monster);



var Scroll_tr = function(c, d) {
	this.tracker = c;
	this.uid = c.get("clientId");
	this.srvid = d.srvid;
	this.isDebug = d.debug;
	this.tracker_name = d.tracker_name;
	this.ck = d.ck;
	this.loc = d.loc;
	this.defaultOptions = {
		trackDelay: 1500,
		percentInterval: 25,
		callback: null,
		cookieName: "_scroll_tr_ck"
	};
	this.lastScroll = null;
};
Scroll_tr.prototype.init = function(d) {		
	this.viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight || 0;
	this.pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
	this.clientHeight = document.documentElement.clientTop || 0;		
	window.config.lastScroll = this.lastScroll;		
	if (typeof d == typeof {}) {
		for (var e in d) {
			if (d.hasOwnProperty(e)) {
				this.defaultOptions[e] = d[e];
			}
		}
	}	
	this.processScroll();
	return this;
};
Scroll_tr.prototype.callback = function() {
	var b = this.readCookie();
	if (b !== false && b.scrollPercent > 0 && b.documentLocation.length > 0) {
		this.setCookie(0, "", true);
		return b;
	}
	return false;
};
Scroll_tr.prototype.data = function() {
	var b = this.readCookie();
	if (b !== false && b.scrollPercent > 0 && b.documentLocation.length > 0) {
		return b;
	}
	return false;
};
Scroll_tr.prototype.throttle = function(m, p) {
	var k, n, e;
	var o = null;
	var l = 0;
	var i = function() {
		l = new Date;
		o = null;
		e = m.apply(k, n);
	};
	return function() {
		var b = new Date;
		if (!l) {
			l = b;
		}
		var a = p - (b - l);
		k = this;
		n = arguments;
		if (a <= 0) {
			clearTimeout(o);
			o = null;
			l = b;
			e = m.apply(k, n);
		} else {
			if (!o) {
				o = setTimeout(i, a);
			}
		}
		return e;
	};
};
Scroll_tr.prototype.scrollPercent = function() {
	this.debugMessage("scroll percent" + (this.scrollPosition() + this.viewportHeight) / this.pageHeight * 100);
	return Math.ceil((this.scrollPosition() + this.viewportHeight) / this.pageHeight * 100);
};

Scroll_tr.prototype.scrollPosition = function() {
	return (window.pageYOffset || document.documentElement.scrollTop) - this.clientHeight;
};
Scroll_tr.prototype.scrollPercentByInterval = function(c) {
	var d = parseInt(this.scrollPercent() / (parseInt(c) - 1e-10));
	return d * parseInt(c);
};
Scroll_tr.prototype.setCookie = function(i, g, f, h) {
	i = parseInt(i);
	var e = this.readCookie();
	console.log( "scrollpercent = " +  e.scrollPercent + ", i = " + i);
	if (i > e.scrollPercent || h === true) {
		expire_time = new Date;
		expire_time.setTime(expire_time.getTime() + 60 * 60000);
		document.cookie = this.defaultOptions.cookieName + "=" + escape(i + "|||" + g) + "; expires=" + expire_time.toUTCString() + "; path=" + f;
		dataLayer.push({
			event: "scroll",
			action: i,
			label: g
		});
		return false;
	}
};
Scroll_tr.prototype.readCookie = function() {
	var b = (document.cookie.match("(^|; )" + this.defaultOptions.cookieName + "=([^;]*)") || 0)[2];
	if (b === undefined) {
		b = "0|||";
	}
	b = decodeURIComponent(b);
	b = b.split("|||");
	return b.length == 2 ? {
		scrollPercent: parseInt(b[0]),
		documentLocation: b[1]
	} : false;
};
Scroll_tr.prototype.processScroll = function() {
	if (window.config.lastScroll === null || (new Date).getTime() - window.config.lastScroll >= parseInt(this.trackDelay)) {
		this.setCookie(this.scrollPercentByInterval(this.defaultOptions.percentInterval), this.loc.href, this.loc.pathname);
	}
};
Scroll_tr.prototype.debugProcessScroll = function() {
	window.config.lastScroll = (new Date).getTime();
	setTimeout(this.processScroll, parseInt(this.defaultOptions.trackDelay) + 25);
};
Scroll_tr.prototype.fire = function() {
	this.throttle(this.processScroll(), 100);
};
Scroll_tr.prototype.setDebug = function(b) {
	this.isDebug = b;
};
Scroll_tr.prototype.debugMessage = function(b) {
	if (!this.isDebug) {
		return;
	}
	if (console) {
		console.debug(b);
	}
};
providePlugin("Scroll_tr", Scroll_tr);