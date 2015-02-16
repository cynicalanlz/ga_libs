var dataLayer = [],
config = {                
    startTime: new Date().getTime(),
    plugins_path : 'minified/libs.js',
    ck: document.cookie,
    loc: window.location,
    ref: document.referrer,
    metas: {
        all: document.getElementsByTagName("meta"),
        count: {
            all: 0,
            desc: 0,
            keywords: 0
        },
        header : {}
    },
    debug: false,
    tagmanager_id: "GTM-5V8S4F",
    tracker_id: "UA-28849482-1",
    yam_id: "12251719",
    ga_object: "ga",
    dataLayer_var: "dataLayer",
    tracker_name: "eCommerce",
    highest_level_domain: "auto",
    dz: 1460,
    uid_in: 0,
    uid_enc_out_tag: "registrationId",
    uid_plain_out_tag: "uid_out",
    readyComplete : false
},
uid_set, tag_loaded;