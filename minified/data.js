function providePlugin(e, b) {
	var d = window[window.GoogleAnalyticsObject || "ga"];
	if (d) {
		d("provide", e, b)
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
	if (typeof this.uid_plain_out_tag !== 'undefined'){
		document.getElementById(this.uid_plain_out_tag).innerText = this.uid_;
		document.getElementById(this.uid_plain_out_tag).textContent = document.getElementById(this.uid_plain_out_tag).innerText;
	}	
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
			dataLayer.push({pageview: "sent"});
			ga(this.tracker_name + ".Monster:dirmonURL");
		}
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

