function providePlugin(c, a) {
	var g = window[window.GoogleAnalyticsObject || "ga"];
	if (g) {
		g("provide", c, a);
	}
}
var Monster = function(e, a) {
	this.tracker = e;
	this.uid = e.get("clientId");
	this.uid_ = a.uid_;
	this.isDebug = a.debug;
	this.tracker_name = a.tracker_name;
	this.yam_id = a.yam_id;
	this.tagmanager_id = a.tagmanager_id;
	this.uid_set_e = a.uid_set_e;
	this.uid_set_m = a.uid_set_m;
	this.tag_loaded_m = a.tag_loaded_m;
	this.tag_loaded_e = a.tag_loaded_e;
	this.uid_enc_out_tag = a.uid_enc_out_tag;
	this.uid_plain_out_tag = a.uid_plain_out_tag;
	this.uid_in = a.uid_in;
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
	this.ownedHostNames = document.location.hostname.replace("www.", "");
	if (document.referrer !== "") {
		this.getReferrer = document.referrer.replace("www.", "").split(/:\/\//)[1].split("/")[0];
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
	if (document.referrer === "" && document.location.hash.search(/(\?|&|#)(utm_source|dclid|gclid)=/) === -1 && this.cookieC !== this.urlRefc) {
		var pmGclid = "";
		var pmDclid = "";
		var pmSource = "";
		var pmMedium = "";
		var pmCampaign = "";
		var pmContent = "";
		var pmTerm = "";
		var pmRefcid = "";
		if (document.location.hash.indexOf("#g=") > -1) {
			pmGclid = "gclid=" + this.demixed(document.location.hash.split("#g=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (document.location.hash.indexOf("#d=") > -1) {
			pmDclid = "dclid=" + this.demixed(document.location.hash.split("#d=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (document.location.hash.indexOf("#sr=") > -1) {
			pmSource = "utm_source=" + this.demixed(document.location.hash.split("#sr=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (document.location.hash.indexOf("&m=") > -1) {
			pmMedium = "&utm_medium=" + this.demixed(document.location.hash.split("&m=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (document.location.hash.indexOf("&cp=") > -1) {
			pmCampaign = "&utm_campaign=" + this.demixed(document.location.hash.split("&cp=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (document.location.hash.indexOf("&ct=") > -1) {
			pmContent = "&utm_content=" + this.demixed(document.location.hash.split("&ct=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (document.location.hash.indexOf("&st=") > -1) {
			pmTerm = "&utm_term=" + this.demixed(document.location.hash.split("&st=")[1].split(/&m=|&cp=|&ct=|&st=|&rf=/)[0]);
		}
		if (document.location.hash.indexOf("&rf=") > -1) {
			pmRefcid = "&rf=" + document.location.hash.split("&rf=")[1].split(/&m=|&cp=|&ct=|&st=/)[0];
		}
		var fixedHash = pmDclid + pmGclid + pmSource + pmMedium + pmCampaign + pmTerm + pmContent + pmRefcid;
		document.location.hash = fixedHash;
	}
	if (document.location.href.search(/#(utm_source|gclid|dclid)=/) > -1 && this.cookieC === this.urlRefc) {
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
	if (window.location.href.search(/(\?|&)(utm_source|dclid|gclid)=/) > -1) {
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
	if (document.location.href.indexOf("?") > -1) {
		var queryParams = document.location.href.split("?")[1].split(/#/)[0].split(/&/g);
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
				if (document.referrer.indexOf("google.com") > -1) {
					this.term = document.referrer.split(/&q=|\?q=|#q=/)[1].split(/&/)[0];
				} else {
					if (document.location.href.indexOf("&st=") > -1) {
						this.term = this.demixed(document.location.href.split("&st=")[1].split(/&/)[0]);
					} else {
						if (document.cookie.indexOf("|ldmcct=") > -1) {
							this.term = document.cookie.split("utmzombie")[1].split(";")[0].split(/utmctr=/)[1].split(/\|/)[0];
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
		if (document.referrer !== "" && this.getReferrer.search(this.ownedHostNames) === -1) {
			for (i = 0; i < this.enginesAndQueryParams.length; i++) {
				if (document.referrer.indexOf(this.enginesAndQueryParams[i].split(":")[0]) > -1) {
					if (document.referrer.indexOf(this.enginesAndQueryParams[i].split(":")[1]) > -1) {
						this.term = document.referrer.split(this.enginesAndQueryParams[i].split(":")[1])[1].split("&")[0];
						if (this.term === "" && document.referrer.indexOf("google.com/") > -1) {
							this.term = "(not%20provided)";
						}
						this.source = this.enginesAndQueryParams[i].split(":")[0];
						this.medium = "organic";
						this.foundSearchEngine = true;
					} else {
						if (document.referrer === "https://www.google.com/") {
							this.source = "google";
							this.medium = "organic";
							this.term = "(not%20provided)";
							this.foundSearchEngine = true;
						}
					}
				}
			}
			if (this.foundSearchEngine === false) {
				this.source = document.referrer.replace("www.", "").split(/:\/\//)[1].split("/")[0];
				this.medium = "referral";
				this.content = document.referrer.split(this.getReferrer)[1].split(/\?|#/)[0];
				if (this.content === "/") {
					this.content = "";
				}
			}
		} else {
			if (document.location.href.search(/#sr=|#d=|#g=/) > -1) {
				var hashedParams = document.location.hash.split(/&/g);
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
				if (document.cookie.indexOf("utmzombie=") > -1) {
					var cookieBits = document.cookie.split("utmzombie=")[1].split(";")[0].split(/\|/);
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