var bx = new Object(),
	dataLayer = [],
	c_, uid_set, tag_loaded;
(function(c, x) {
	var d = function() {
		if (d.prototype._singletonInstance) {
			return d.prototype._singletonInstance;
		}
		d.prototype._singletonInstance = this;
		this.metas = {
			all: document.getElementsByTagName("meta"),
			desc: "(not set)",
			keywords: "(not set)",
			header: {
				text: "(not set)"
			}
		};
		if (this.metas.all.length > 0) {
			this.metas.count = {
				all: this.metas.all.length,
				desc: 0,
				keywords: 0
			};
			for (var q = 0; q < this.metas.count.all; q++) {
				if (this.metas.all[q].getAttribute("name") != null) {
					if (this.metas.all[q].getAttribute("name").toLowerCase() == "description") {
						if (this.metas.all[q].content != "") {
							this.metas.desc = this.metas.all[q].content;
						}
						this.metas.count.desc++;
					}
					if (this.metas.all[q].getAttribute("name").toLowerCase() == "keywords") {
						if (this.metas.all[q].content != "") {
							this.metas.keywords = this.metas.all[q].content;
						}
						this.metas.count.keywords++;
					}
				}
			}
		} else {
			this.metas.count = {
				all: 0,
				desc: 0,
				keywords: 0
			};
		}
		this.getHeader = function() {
			this.metas.header.all = document.getElementsByTagName("h1");
			if (this.metas.header.all.length > 0) {
				if (this.metas.header.all[0].innerHTML != "") {
					this.metas.header.text = this.metas.header.all[0].innerHTML;
				}
				this.metas.count.header = this.metas.header.all.length;
			}
		};
		this.checkErrors = function() {
			if (this.metas.count.desc == 0 || this.metas.count.desc > 1 || this.metas.desc == "(not set)") {
				this.errMsg = document.location.href + " has " + this.metas.count.desc + " description tags and first tag is " + ((this.metas.desc == "(not set)") ? "not set" : "set");
				ga("send", "exception", {
					"exFatal": false,
					"exDescription": this.errMsg
				});
			}
			if (this.metas.count.keywords == 0 || this.metas.count.keywords > 1 || this.metas.keywords == "(not set)") {
				this.errMsg = document.location.href + " has " + this.metas.count.keywords + " keywords tags and first tag is " + ((this.metas.keywords == "(not set)") ? "not set" : "set");
				ga("send", "exception", {
					"exFatal": false,
					"exDescription": this.errMsg
				});
			}
			if (this.metas.count.keywords == 0 || this.metas.count.header > 1 || this.metas.header.text == "(not set)") {
				this.errMsg = document.location.href + " has " + this.metas.count.header + " h1 tags and first tag is " + ((this.metas.header.text == "(not set)") ? "not set" : "set");
				ga("send", "exception", {
					"exFatal": false,
					"exDescription": this.errMsg
				});
			}
		};
		this.startTime = new Date().getTime();
		this.dz = 1460;
		this.uid_in = 0;
		this.uid_ck = (document.cookie.match("(^|; )_uid=([^;]*)") || 0)[2];
		this.urlRefc = "";
		this.cookieC = "";
		if (document.cookie.indexOf("_ga=") > -1) {
			this.cookieC = document.cookie.toString().split("_ga=")[1].split(";")[0].split(/GA[0-9]\.[0-9]\./)[1];
		}
		if (document.location.href.indexOf("&rf=") > -1) {
			this.urlRefc = document.location.href.split("&rf=")[1].split(/[&,?]/)[0];
		}
		this.createCookie = function(name, value, days) {
			if (days) {
				this.date = new Date();
				this.date.setTime(this.date.getTime() + (days * 24 * 60 * 60 * 1000));
				this.xprs = "; expires=" + this.date.toGMTString();
			} else {
				this.xprs = "";
			}
			document.cookie = name + "=" + value + this.xprs + "; path=/";
			return value;
		};
		if (typeof this.uid_ck === "undefined") {
			this.uid_ck = this.createCookie("_uid", Math.floor((Math.random() * 1000000000) + 1) + "." + new Date().getTime(), this.dz);
		}
		this.init = function() {
			return {
				debug: false,
				tagmanager_id: "GTM-5V8S4F",
				tracker_id: "UA-28849482-1",
				uid_: this.uid_ck,
				uid_in: this.uid_in,
				yam_id: "12251719",
				highest_level_domain: "auto",
				uid_enc_out_tag: "gaClientIdDiv",
				uid_set_e: "uid_set",
				tag_loaded_e: "tag_loaded",
				uid_plain_out_tag: "registrationId",
				tracker_name: "eCommerce",
				dataLayer_var: "UserId",
				timeout_placeholder: "timeout_placeholder",
				urlRef: this.urlRefc,
				cookieC: this.cookieC,
				dz: this.dz,
				metas: this.metas
			};
		};
		this.gaLoadTiming = function(src) {
			var endTime = new Date().getTime();
			ga(this.init().tracker_name + ".send", "timing", src.match(/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,})/i)[1], document.location.href, (endTime - this.startTime));
		};
	};
	c.c_ = new d;
	
	(function(l, e, j, m, i, n, k) {
		l.GoogleAnalyticsObject = i;
		l[i] = l[i] || function() {
			(l[i].q = l[i].q || []).push(arguments);
		}, l[i].l = 1 * new Date;
		n = e.createElement(j), k = e.getElementsByTagName(j)[0];
		n.async = 1;
		n.src = m;
		n.onload = c_.gaLoadTiming(n.src);
		k.parentNode.insertBefore(n, k);
	})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
	ga("create", c_.init().tracker_id, c_.init().highest_level_domain, {
		name: c_.init().tracker_name,
		cookieExpires: c_.init().dz * 24 * 60 * 60,
		allowAnchor: true
	});
	ga(c_.init().tracker_name + ".require", "displayfeatures");
	ga(c_.init().tracker_name + ".require", "GA_data", c_.init());
	ga(c_.init().tracker_name + ".require", "Scroll_tr", c_.init());
	ga(c_.init().tracker_name + ".require", "Monster", c_.init());
	ga(c_.init().tracker_name + ".Monster:getBestInfo");
	ga(c_.init().tracker_name + ".Monster:preMonster");
	ga(c_.init().tracker_name + ".GA_data:fire");
	ga(c_.init().tracker_name + ".Scroll_tr:init");
	c.onscroll = function(b) {
		ga(c_.init().tracker_name + ".Scroll_tr:fire");
	};
})(window, document);