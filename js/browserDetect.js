var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "unknown-browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "unknown-version";
        this.OS = this.searchString(this.dataOS) || "unknown-os";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "chrome"
        },
        { 	string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "omniweb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "icab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "camino"
        },
        {		// for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "mozilla",
            versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "macos"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "ios"
        },
        {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "ios"
        },
        {
            string: navigator.userAgent,
            subString: "iPod",
            identity: "ios"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "linux"
        }
    ]

};

$(document).ready(function() {
    BrowserDetect.init();
    //var bodyClasses = [BrowserDetect.OS, BrowserDetect.browser, BrowserDetect.browser + "-" + BrowserDetect.version];
    var bodyClasses = [BrowserDetect.OS, BrowserDetect.browser];
    $("body").addClass(bodyClasses.join(" "));
});
