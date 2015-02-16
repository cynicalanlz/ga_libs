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
    debug: true,
    tagmanager_id: "GTM-PNFDW6",
    tracker_id: "UA-41176985-1",
    yam_id: "21345325",
    ga_object: "ga",
    dataLayer_var: "dataLayer",
    tracker_name: "eCommerce",
    highest_level_domain: "auto",
    dz: 1460,
    uid_in: 0,
    uid_enc_out_tag: "registrationId",
    uid_plain_out_tag: "uid_out",
    expId : "YByMKfprRCStcMvK8zh1yw",
    readyComplete : false
},
uid_set, tag_loaded;