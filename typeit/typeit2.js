var au = true;
var ctrlOverride = false;
var defaultFontSize = 18;
var prefCookiesPostfix = "default";
var defaultCSSFontFamily = "sans-serif";
var defaultAutoPretty = true;
var preventStickyFormatting = false;
var capturePunctuationOnKeyDown = false;
var highlightFrequentButtons = false;
var highlightShadowColor = [0, 204, 255];
var highlightTextColor = [0, 0, 0];
var highlightFirstInterval = 30;
var av;
var aw;
var ax;
var ay;
var textBoxHasLoaded = false;
var az = false;
var keys = new Object;
var aA = new Object;
var chars = new Object;
var aB = window.location;
var aC = new Object;
aC = {
    name: "",
    shift: false
};
var aD = 0;
var aE = new Object;
var aF = false;
var aG = false;
var aH = aB.hostname;
var makeCrossDomainSave = false;
var aI;
var aJ;
var aK;
var aL;
var aM, aN, aO, aP, aQ, aR;

function aS() {
    if (aK.selection) {
        aE = aK.selection.createRange()
    }
}

function aT() {
    if (aK.selection) {
        aE.select()
    } else {
        if (BrowserDetect.g == "Firefox") {
            aK.body.focus()
        }
    }
}

function aU(b) {
    if (BrowserDetect.g != "Explorer" && BrowserDetect.g != "Safari" && BrowserDetect.g != "Chrome") {
        return false
    }
    if (!aF) {
        return false
    }
    if (!b) {
        if (aL.event) {
            var b = aL.event
        } else {
            return true
        }
    }
    if (document.selection) {
        aE.moveStart("character", -1);
        aE.select();
        aK.execCommand("RemoveFormat", false, false);
        aE.moveStart("character", 1);
        aE.select()
    } else {
        if (BrowserDetect.g == "Safari" || BrowserDetect.g == "Chrome") {
            var a = aL.getSelection();
            var g = a.baseNode.parentNode;
            if (g.nodeName == "SUP" || (g.nodeName == "SPAN" && g.style.verticalAlign == "super")) {
                if (a.baseOffset > 2) {
                    return
                }
                a.modify("extend", "backward", "character");
                var d = a.toString();
                aK.execCommand("Delete", false, false);
                var c = aK.createTextNode(d);
                if (a.baseOffset == 0) {
                    g.parentNode.insertBefore(c, g)
                } else {
                    g.parentNode.insertBefore(c, g.nextSibling);
                    a.modify("move", "forward", "character")
                }
            } else {
                a.modify("extend", "backward", "character");
                aK.execCommand("RemoveFormat", false, false);
                a.collapseToEnd()
            }
        }
    }
    aF = false
}

function command(b, a) {
    if (!a) {
        var a = window.event
    }
    if (b == "ClearAll") {
        command("SelectAll");
        command("Delete")
    } else {
        aK.execCommand(b, false, false)
    }
}

function aV(b, i) {
    if (i) {
        var h = (b.upper) ? (b.upper) : (b.lower)
    } else {
        var h = b.lower
    }
    if (aK.selection) {
        switch (b.format) {
            case "superscript":
                h = "<sup>" + h + "</sup>";
                break;
            case "italic":
                h = "<i>" + h + "</i>";
                break;
            case "strikethrough":
                h = "<s>" + h + "</s>";
                break
        }
        if (aE) {
            aE.select();
            aE.pasteHTML(h);
            aE.collapse(false);
            if (!b.format && preventStickyFormatting) {
                aE.moveStart("character", -h.length);
                aE.execCommand("RemoveFormat", false, false);
                aE.moveStart("character", h.length)
            }
            aE.select()
        }
    } else {
        if (BrowserDetect.g == "Firefox") {
            var g = aK.queryCommandState("bold");
            var d = aK.queryCommandState("italic");
            var c = aK.queryCommandState("underline");
            var a = aK.queryCommandState("superscript");
            aK.execCommand("styleWithCSS", false, false);
            if (c) {
                h = "<u>" + h + "</u>"
            }
            if (g) {
                h = "<b>" + h + "</b>"
            }
            if (d) {
                h = "<i>" + h + "</i>"
            }
            if ((a && !preventStickyFormatting) || b.format == "superscript") {
                h = "<sup>" + h + "</sup>"
            }
            if (b.format == "strikethrough") {
                h = "<s>" + h + "</s>"
            }
            aK.execCommand("insertHTML", false, h);
            if (preventStickyFormatting && b.format) {
                aK.execCommand("RemoveFormat", false, false);
                if (g) {
                    aK.execCommand("bold", false, false)
                }
                if (d) {
                    aK.execCommand("italic", false, false)
                }
                if (c) {
                    aK.execCommand("underline", false, false)
                }
                if (a) {
                    aK.execCommand("superscript", false, false)
                }
            }
            aK.body.focus()
        } else {
            if (BrowserDetect.g == "Safari" || BrowserDetect.g == "Chrome") {
                if (preventStickyFormatting) {
                    var j = aL.getSelection();
                    if (!j.isCollapsed) {
                        aK.execCommand("Delete", false, false)
                    }
                    var l = j.baseNode.parentNode;
                    if (l.nodeName == "SUP" || (l.nodeName == "SPAN" && l.style.verticalAlign == "super")) {
                        var k = aK.createTextNode(h);
                        if (j.baseOffset == 0) {
                            l.parentNode.insertBefore(k, l)
                        } else {
                            l.parentNode.insertBefore(k, l.nextSibling);
                            j.modify("move", "forward", "character")
                        }
                    } else {
                        aK.execCommand("insertHTML", false, h);
                        if (!b.format) {
                            j.modify("extend", "backward", "character");
                            aK.execCommand("RemoveFormat", false, false);
                            j.collapseToEnd()
                        }
                    }
                } else {
                    aK.execCommand("insertHTML", false, h)
                }
                if (b.format) {
                    j.modify("extend", "backward", "character");
                    if (b.format == "superscript") {
                        aK.execCommand("Superscript", false, false)
                    } else {
                        if (b.format == "italic") {
                            aK.execCommand("Italic", false, false)
                        } else {
                            if (b.format == "strikethrough") {
                                aK.execCommand("Strikethrough", false, false)
                            }
                        }
                    }
                    j.collapseToEnd()
                }
            }
        }
    }
}

function aW(c, j, h) {
    var g = (h) ? ((j.upper) ? j.upper.length : j.lower.length) : j.lower.length;
    if (aK.selection) {
        if (aE) {
            aE.moveStart("character", -g);
            aV(c, h);
            aE.select();
            aK.body.focus()
        }
    } else {
        if (BrowserDetect.g == "Firefox" && BrowserDetect.h < 4) {
            var d;
            for (var a = 0; a < g; a++) {
                d = document.createEvent("KeyboardEvent");
                d.initKeyEvent("keypress", false, true, null, false, false, false, false, 8, 0);
                aK.dispatchEvent(d)
            }
            aV(c, h)
        } else {
            if (j.combChars) {
                g = g - j.combChars
            }
            var b = aL.getSelection();
            if (g == 0) {
                b.modify("extend", "backward", "character");
                aK.execCommand("insertHTML", false, b.toString()[0])
            }
            for (var a = 0; a < g; a++) {
                b.modify("extend", "backward", "character")
            }
            aV(c, h)
        }
    }
}

function aX(a) {
    function g() {
        if (document.selection) {
            return (aE.text != "")
        } else {
            if (aJ.getSelection) {
                return (!aJ.getSelection().isCollapsed)
            } else {
                return false
            }
        }
    }

    function d(h) {
        var j = "";
        var i = "";
        if (h.type == "keydown") {
            switch (h.keyCode) {
                case 59:
                case 186:
                    j = ";:";
                    break;
                case 61:
                case 107:
                case 187:
                    j = "=+";
                    break;
                case 188:
                    j = ",<";
                    break;
                case 109:
                case 189:
                    j = "-_";
                    break;
                case 190:
                    j = ".>";
                    break;
                case 191:
                    j = "/?";
                    break;
                case 219:
                    j = "[{";
                    break;
                case 220:
                    j = "\u005C|";
                    break;
                case 221:
                    j = "]}";
                    break;
                case 192:
                case 223:
                    j = "`~";
                    break;
                case 222:
                    j = "'\"";
                    break;
                case 32:
                    j = "Space";
                    break;
                case 37:
                    j = "Left";
                    break;
                case 38:
                    j = "Up";
                    break;
                case 39:
                    j = "Right";
                    break;
                case 40:
                    j = "Down";
                    break;
                default:
                    if (h.keyCode < 48) {
                        j = "Special"
                    } else {
                        j = String.fromCharCode(h.keyCode)
                    }
            }
            if (h.altKey) {
                i = "Alt+"
            }
            if (h.ctrlKey) {
                i = "Ctrl+" + i
            }
            if (BrowserDetect.g == "Chrome" && BrowserDetect.k == "Windows") {
                if (h.metaKey) {
                    i = "Command+" + i
                }
            }
            if (h.shiftKey && keys[i + "Shift+" + j]) {
                j = i + "Shift+" + j
            } else {
                j = i + j
            }
        } else {
            if (h.type == "keypress") {
                if (h.which !== undefined) {
                    j = String.fromCharCode(h.which)
                } else {
                    j = String.fromCharCode(h.keyCode)
                }
            }
        }
        return j
    }
    if (!a) {
        if (aL.event) {
            var a = aL.event
        } else {
            return true
        }
    }
    var c = a.keyCode;
    if (aO && a.type == "keydown" && c == 13 && a.ctrlKey && !a.altKey && !a.shiftKey && !a.metaKey) {
        ax = !ax;
        aO.checked = ax
    }
    var b = new Object;
    if (a.type == "keypress") {
        if (a.which !== undefined) {
            c = a.which
        } else {
            c = a.keyCode
        }
        if (c >= 33) {
            aF = true;
            if (!a.ctrlKey && !a.altKey && !a.metaKey && ((c <= 64) || (c >= 91 && c <= 96) || (c > 122))) {
                b.name = d(a);
                b.shift = false;
                if (capturePunctuationOnKeyDown && !ax && aG) {
                    return true
                }
            } else {
                return true
            }
        } else {
            return true
        }
    } else {
        if (a.type == "keydown") {
            if (c == 18 || c == 17 || c == 16 || c == 20 || c == 224) {
                return true
            }
            if (a.ctrlKey || a.altKey || a.metaKey || (c >= 65 && c <= 90) || (c <= 46) || (c >= 112 && c <= 126) || (capturePunctuationOnKeyDown && !ax && ((c >= 219 && c <= 222) || c == 186 || c == 187 || c == 188 || c == 190 || c == 191 || c == 192 || c == 59 || c == 107 || c == 61))) {} else {
                return true
            }
            b.name = d(a);
            b.shift = a.shiftKey
        } else {
            return true
        }
    }
    if (aD > 0 && (b.name != aC.name || b.shift != aC.shift)) {
        aD = 0
    }
    aC.name = b.name;
    aC.shift = b.shift;
    if (!b.shift && (b.name == "Ctrl+B" || b.name == "Ctrl+I" || b.name == "Ctrl+U" || b.name == "Ctrl+S" || b.name == "Ctrl+Up" || b.name == "Ctrl+Down" || b.name == "Ctrl+Space")) {
        if (!keys[b.name] || g()) {
            switch (b.name) {
                case "Ctrl+B":
                    aK.execCommand("Bold", false, false);
                    break;
                case "Ctrl+I":
                    aK.execCommand("Italic", false, false);
                    break;
                case "Ctrl+U":
                    aK.execCommand("Underline", false, false);
                    break;
                case "Ctrl+S":
                    if (aD == 0) {
                        aK.execCommand("Superscript", false, false);
                        aD++
                    } else {
                        if (aD == 1) {
                            if (BrowserDetect.g == "Explorer") {
                                aK.execCommand("RemoveFormat", false, false)
                            }
                            aK.execCommand("Subscript", false, false);
                            aD++
                        } else {
                            aK.execCommand("RemoveFormat", false, false);
                            aD = 0
                        }
                    }
                    break;
                case "Ctrl+Up":
                    aK.execCommand("Superscript", false, false);
                    break;
                case "Ctrl+Down":
                    aK.execCommand("Subscript", false, false);
                    break;
                case "Ctrl+Space":
                    aK.execCommand("RemoveFormat", false, false);
                    break
            }
            if (a.preventDefault) {
                a.preventDefault()
            }
            return false
        }
    }
    if (ax && b.name != "\x22" && b.name != "'" && b.name != "\x2d") {
        return
    }
    if (keys[b.name]) {
        aF = false;
        if (b.name == "Ctrl+C" && !b.shift && g()) {
            return true
        }
        if (b.name == "Ctrl+X" && !b.shift && g()) {
            return true
        }
        if (!keys[b.name][1]) {
            aV(keys[b.name][0], b.shift)
        } else {
            if (aD == 0) {
                aV(keys[b.name][0], b.shift)
            } else {
                if (keys[b.name][aD]) {
                    aW(keys[b.name][aD], keys[b.name][aD - 1], b.shift)
                } else {
                    aW(keys[b.name][0], keys[b.name][aD - 1], b.shift);
                    aD = 0
                }
            }
        }
        aD++;
        if (a.type == "keydown") {
            aG = true
        }
        if (a.preventDefault) {
            a.preventDefault();
            a.cancel = true
        } else {
            a.returnValue = false;
            a.keyCode = 0;
            a.cancelBubble = true;
            return false
        }
        return false
    }
    if (ctrlOverride && a.ctrlKey && !a.altKey && ((c >= 65 && c <= 90) || (c >= 48 && c <= 57)) && ((c != 67 && c != 86 && c != 88 && c != 90) || a.shiftKey) && !a.metaKey) {
        if (a.preventDefault) {
            a.preventDefault()
        } else {
            a.returnValue = false;
            a.keyCode = 0;
            return false
        }
        return false
    }
}

function aY(a) {
    if (!a) {
        if (aL.event) {
            var a = aL.event
        } else {
            return true
        }
    }
    aS();
    if (preventStickyFormatting) {
        aU(a)
    }
    if (a.keyCode == 17 || a.keyCode == 18) {
        aD = 0
    }
    aG = false
}
var BrowserDetect = {
    init: function() {
        this.g = this.searchString(this.m) || "An unknown browser";
        this.o = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.p) || "an unknown OS";
        this.h = Math.floor(this.o)
    },
    searchString: function(d) {
        for (var a = 0; a < d.length; a++) {
            var c = d[a].q;
            var b = d[a].r;
            this.u = d[a].w || d[a].A;
            if (c) {
                if (c.indexOf(d[a].B) != -1) {
                    return d[a].A
                }
            } else {
                if (b) {
                    return d[a].A
                }
            }
        }
    },
    searchVersion: function(b) {
        var a = b.indexOf(this.u);
        if (a == -1) {
            return
        }
        return parseFloat(b.substring(a + this.u.length + 1))
    },
    m: [{
        q: navigator.userAgent,
        B: "Chrome",
        A: "Chrome"
    }, {
        q: navigator.userAgent,
        B: "OmniWeb",
        w: "OmniWeb/",
        A: "OmniWeb"
    }, {
        q: navigator.vendor,
        B: "Apple",
        A: "Safari",
        w: "Version"
    }, {
        r: window.opera,
        A: "Opera"
    }, {
        q: navigator.vendor,
        B: "iCab",
        A: "iCab"
    }, {
        q: navigator.vendor,
        B: "KDE",
        A: "Konqueror"
    }, {
        q: navigator.userAgent,
        B: "Firefox",
        A: "Firefox"
    }, {
        q: navigator.vendor,
        B: "Camino",
        A: "Camino"
    }, {
        q: navigator.userAgent,
        B: "Netscape",
        A: "Netscape"
    }, {
        q: navigator.userAgent,
        B: "MSIE",
        A: "Explorer",
        w: "MSIE"
    }, {
        q: navigator.userAgent,
        B: "Gecko",
        A: "Mozilla",
        w: "rv"
    }, {
        q: navigator.userAgent,
        B: "Mozilla",
        A: "Netscape",
        w: "Mozilla"
    }],
    p: [{
        q: navigator.platform,
        B: "Win",
        A: "Windows"
    }, {
        q: navigator.platform,
        B: "Mac",
        A: "MacOS"
    }, {
        q: navigator.platform,
        B: "Linux",
        A: "Linux"
    }]
};

function setupBrowserWarning() {
    var g = false;
    var d = false;
    if (BrowserDetect.OS == "Windows") {
        if (BrowserDetect.g == "Explorer") {
            if (BrowserDetect.o < 8) {
                g = true
            }
        } else {
            if (BrowserDetect.g == "Firefox") {
                if (BrowserDetect.h < 3) {
                    g = true
                }
            } else {
                if (BrowserDetect.g == "Chrome") {
                    g = true;
                    d = true
                } else {
                    g = true
                }
            }
        }
    } else {
        if (BrowserDetect.OS == "MacOS") {
            if (BrowserDetect.g == "Safari") {
                if (BrowserDetect.h < 3) {
                    g = true
                }
            } else {
                if (BrowserDetect.g == "Firefox") {
                    if (BrowserDetect.o < 3) {
                        g = true
                    }
                } else {
                    g = true
                }
            }
        } else {
            if (BrowserDetect.OS == "Linux") {
                if (BrowserDetect.g == "Firefox") {
                    if (BrowserDetect.h < 3) {
                        g = true
                    }
                } else {
                    if (BrowserDetect.g == "Chrome") {
                        g = true;
                        d = true
                    } else {
                        g = true
                    }
                }
            }
        }
    }
    if (g) {
        var b = document.getElementById("typeit_browser_warning");
        if (b) {
            if (BrowserDetect.OS == "Windows") {
                var a = '<li><a href="http://www.mozilla.com/firefox/">Mozilla Firefox</a></li>'
            }
            if (BrowserDetect.OS == "MacOS") {
                var a = '<li><a href="http://www.mozilla.com/firefox/">Mozilla Firefox</a></li><li>Safari</li>'
            }
            if (BrowserDetect.OS == "Linux") {
                var a = '<li><a href="http://www.mozilla.com/firefox/">Mozilla Firefox</a></li>'
            }
            var c;
            if (d) {
                c = 'You are using Google Chrome. Several shortcuts (<kbd>Ctrl + W N T</kbd>) will not work correctly. See <a href="http://www.typeit.org/help.htm#chrome">here</a> for details. You can currently fix this problem in two ways: (1) Install TypeIt as a “Chrome app” by following <a href="https://support.google.com/chrome/answer/95710?hl=en">these instructions</a> or (2) install one of the recommended browsers for ' + BrowserDetect.OS + ": "
            } else {
                if (g) {
                    c = "You are using an unsupported browser. Keyboard shortcuts may not work properly or characters may appear in the wrong places. For the best experience on " + BrowserDetect.OS + ", please use one of these browsers: "
                }
            }
            b.innerHTML = "<label>Warning:</label> " + c + "<ul>" + a + "</ul>";
            b.style.display = "block"
        }
    }
}

function aZ(y) {
    var n = [1518500249, 1859775393, 2400959708, 3395469782];
    y += String.fromCharCode(128);
    var q = Math.ceil(y.length / 4) + 2;
    var k = Math.ceil(q / 16);
    var m = new Array(k);
    for (var v = 0; v < k; v++) {
        m[v] = new Array(16);
        for (var r = 0; r < 16; r++) {
            m[v][r] = (y.charCodeAt(v * 64 + r * 4) << 24) | (y.charCodeAt(v * 64 + r * 4 + 1) << 16) | (y.charCodeAt(v * 64 + r * 4 + 2) << 8) | (y.charCodeAt(v * 64 + r * 4 + 3))
        }
    }
    m[k - 1][14] = ((y.length - 1) * 8) / Math.pow(2, 32);
    m[k - 1][14] = Math.floor(m[k - 1][14]);
    m[k - 1][15] = ((y.length - 1) * 8) & 4294967295;
    var x = 1732584193;
    var w = 4023233417;
    var u = 2562383102;
    var F = 271733878;
    var E = 3285377520;
    var g = new Array(80);
    var D, C, B, A, z;
    for (var v = 0; v < k; v++) {
        for (var o = 0; o < 16; o++) {
            g[o] = m[v][o]
        }
        for (var o = 16; o < 80; o++) {
            g[o] = ROTL(g[o - 3] ^ g[o - 8] ^ g[o - 14] ^ g[o - 16], 1)
        }
        D = x;
        C = w;
        B = u;
        A = F;
        z = E;
        for (var o = 0; o < 80; o++) {
            var p = Math.floor(o / 20);
            var h = (ROTL(D, 5) + f(p, C, B, A) + z + n[p] + g[o]) & 4294967295;
            z = A;
            A = B;
            B = ROTL(C, 30);
            C = D;
            D = h
        }
        x = (x + D) & 4294967295;
        w = (w + C) & 4294967295;
        u = (u + B) & 4294967295;
        F = (F + A) & 4294967295;
        E = (E + z) & 4294967295
    }
    return x.toHexStr() + w.toHexStr() + u.toHexStr() + F.toHexStr() + E.toHexStr()
}

function f(b, a, d, c) {
    switch (b) {
        case 0:
            return (a & d) ^ (~a & c);
        case 1:
            return a ^ d ^ c;
        case 2:
            return (a & d) ^ (a & c) ^ (d & c);
        case 3:
            return a ^ d ^ c
    }
}

function ROTL(a, b) {
    return (a << b) | (a >>> (32 - b))
}
Number.prototype.toHexStr = function() {
    var c = "",
        a;
    for (var b = 7; b >= 0; b--) {
        a = (this >>> (b * 4)) & 15;
        c += a.toString(16)
    }
    return c
};

function setCookie(h, g, d, c, b) {
    var a, k, j;
    if (b === undefined) {
        b = true
    }
    if (b) {
        if (window.location.hostname.indexOf(".typeit.org") >= 0) {
            a = "; domain=typeit.org"
        } else {
            if (window.location.hostname.indexOf(".typeit.local") >= 0) {
                a = "; domain=typeit.local"
            }
        }
    } else {
        a = ""
    }
    if (d) {
        j = "; path=" + d
    } else {
        j = ""
    }
    if (!c) {
        k = ""
    } else {
        var i = new Date();
        i.setTime(i.getTime() + c * 24 * 60 * 60 * 1000);
        k = "; expires=" + i.toGMTString()
    }
    document.cookie = h + "\x3d" + escape(g) + k + j + a;
    if (cachedCookies) {
        cachedCookies[h] = g
    }
}

function ba() {
    if (typeof cachedCookies !== "undefined") {
        return
    }
    cachedCookies = new Object;
    if (document.cookie.length > 0) {
        var d = document.cookie.split("; ");
        for (var a = 0; a < d.length; a++) {
            var c = d[a].indexOf("\x3d");
            var b = d[a].substring(0, c);
            cachedCookies[b] = unescape(d[a].substring(c + 1))
        }
    }
}

function getCookie(a) {
    return (cachedCookies[a]) ? cachedCookies[a] : null
}

function bb(c, b, a) {
    if (b === undefined) {
        b = "\x2f"
    }
    if (a === undefined) {
        a = true
    }
    setCookie(c, "", b, -1, a);
    delete cachedCookies[c]
}

function bc() {
    var i, h, d;
    if (aN && aP) {
        i = false;
        if (h = getCookie("fontName-" + prefCookiesPostfix)) {
            for (var b = 0; b < aP.length; b++) {
                if (aP[b].value == h) {
                    i = true;
                    aN.selectedIndex = b;
                    break
                }
            }
        }
        if (!i) {
            for (var b = 0; b < aP.length; b++) {
                if (aP[b].getAttribute("data-typeit_default")) {
                    aN.selectedIndex = b
                }
            }
        }
        var g = aP[aN.selectedIndex].getAttribute("data-typeit_stack");
        d = (g) ? (g) : aP[aN.selectedIndex].value;
        var c = aP[aN.selectedIndex].getAttribute("data-typeit_lineheight");
        if (c) {
            aK.body.style.lineHeight = c
        }
    } else {
        d = defaultCSSFontFamily
    }
    aK.body.style.fontFamily = d;
    if (aQ && aR) {
        var a = getCookie("fontSizePx-" + prefCookiesPostfix);
        if (parseInt(a) > 11) {
            av = parseInt(a)
        } else {
            av = defaultFontSize
        }
    } else {
        av = defaultFontSize
    }
    aK.body.style.fontSize = av + "px"
}

function bd() {
    if (aO) {
        ax = aO.checked
    } else {
        ax = false
    }
}

function be() {
    if (keys["'"]) {
        aA["'"] = keys["'"]
    }
    if (keys['"']) {
        aA['"'] = keys['"']
    }
    if (keys["\x2d"]) {
        aA["\x2d"] = keys["\x2d"]
    }
    var a = getCookie("autoPretty");
    if (a) {
        if (a == "true") {
            updateAutoPretty(true);
            if (aM) {
                aM.checked = true
            }
            return
        } else {
            if (a == "false") {
                updateAutoPretty(false);
                if (aM) {
                    aM.checked = false
                }
                return
            }
        }
    }
    updateAutoPretty(defaultAutoPretty);
    if (aM) {
        aM.checked = defaultAutoPretty
    }
}

function updateAutoPretty(a) {
    if (a == true) {
        aw = true;
        if (!keys["'"]) {
            keys["'"] = aA["'"]
        }
        if (!keys['"']) {
            keys['"'] = aA['"']
        }
        if (!keys["\x2d"]) {
            keys["\x2d"] = aA["\x2d"]
        }
    } else {
        aw = false;
        if (keys["'"]) {
            delete keys["'"]
        }
        if (keys['"']) {
            delete keys['"']
        }
        if (keys["\x2d"]) {
            delete keys["\x2d"]
        }
    }
}

function bf() {
    for (var a = 0; a < editButtons.length; a++) {
        if (BrowserDetect.g == "Explorer") {
            if (editButtons[a].id == "selectall") {
                editButtons[a].style.display = "none"
            } else {
                editButtons[a].style.visibility = "inherit"
            }
        } else {
            if (editButtons[a].id == "copyall") {
                editButtons[a].style.display = "none"
            } else {
                editButtons[a].style.visibility = "inherit"
            }
        }
    }
}

function bg() {
    if (aO) {
        aO.onclick = function(c) {
            ax = this.checked;
            aT()
        }
    }
    if (resetHighlightsSelector) {
        resetHighlightsSelector.onclick = function(c) {
            highlights.reset();
            aK.body.focus()
        }
    }
    if (aM) {
        aM.onclick = function b(c) {
            setCookie("autoPretty", this.checked.toString(), "\x2f", 180);
            updateAutoPretty(this.checked);
            aK.body.focus();
            aT()
        }
    }
    if (aN && aP) {
        aN.onchange = function a(c) {
            setCookie("fontName-" + prefCookiesPostfix, this.value, "\x2f", 180);
            var h = aP[aN.selectedIndex];
            var g = h.getAttribute("data-typeit_stack");
            aK.body.style.fontFamily = (g) ? (g) : h.value;
            var d = h.getAttribute("data-typeit_lineheight");
            if (d) {
                aK.body.style.lineHeight = d
            }
            aK.body.focus()
        }
    }
    if (aQ && aR) {
        aQ.onclick = function() {
            av += 1;
            setCookie("fontSizePx-" + prefCookiesPostfix, av, "\x2f", 180);
            aK.body.style.fontSize = av + "px";
            aK.body.focus()
        };
        aR.onclick = function() {
            if (av > 11) {
                av -= 1
            }
            setCookie("fontSizePx-" + prefCookiesPostfix, av, "\x2f", 180);
            aK.body.style.fontSize = av + "px";
            aK.body.focus()
        }
    }
}

function bh() {
    if (document.getElementsByClassName) {
        var k = document.getElementsByClassName("popuphelp")
    } else {
        var g = document.getElementsByTagName("\x2a");
        var k = [];
        for (var b = 0; b < g.length; b++) {
            var d = g[b].className.split("\x20");
            for (var a = 0; a < d.length; a++) {
                if (d[a] == "popuphelp") {
                    k.push(g[b]);
                    break
                }
            }
        }
    }
    for (var b = 0; b < k.length; b++) {
        var c = k[b];
        if (c.getAttribute("data-popup_title") !== null) {
            c.onclick = function h(l) {
                if (l === undefined) {
                    l = window.event
                }
                if (l.preventDefault) {
                    l.stopPropagation();
                    l.preventDefault()
                } else {
                    l.cancelBubble = true
                }
                var j = document.getElementById("_helppopup");
                if (j !== null) {
                    m();
                    if (j.sourceElement == this) {
                        return false
                    }
                }
                var i = document.createElement("div");
                i.sourceElement = this;
                i.id = "_helppopup";
                i.className = "popuphelpbox";
                i.innerHTML = this.getAttribute("data-popup_title") + "<div class=message style='text-align: center'>click anywhere to close</div>";
                var u = 300;
                i.style.width = u + "px";
                i.style.position = "absolute";
                i.style.visibility = "hidden";

                function m() {
                    var v = document.getElementById("_helppopup");
                    if (v) {
                        document.body.removeChild(v)
                    }
                    if (document.addEventListener) {
                        document.removeEventListener("click", m, false);
                        aK.removeEventListener("click", m, false);
                        aK.removeEventListener("keypress", m, false)
                    } else {
                        if (document.attachEvent) {
                            document.detachEvent("onclick", m);
                            aK.detachEvent("onclick", m);
                            aK.detachEvent("onkeypress", m)
                        }
                    }
                }
                document.body.appendChild(i);
                var t = i.clientHeight;
                var s = this.getBoundingClientRect();
                var r = getViewportHeight();
                var q = getViewportWidth();
                var p = s.left - 150;
                if (p < 5) {
                    p = 5
                } else {
                    if (p + u + 5 > q) {
                        p = q - 5 - u
                    }
                }
                var o = s.bottom + 10;
                if (o + t + 5 > r) {
                    o = s.top - 10 - t
                }
                var n = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                i.style.top = Math.round(o + n) + "px";
                i.style.left = Math.round(p) + "px";
                if (document.addEventListener) {
                    document.addEventListener("click", m, false);
                    aK.addEventListener("click", m, false);
                    aK.addEventListener("keypress", m, false)
                } else {
                    if (document.attachEvent) {
                        document.attachEvent("onclick", m);
                        aK.attachEvent("onclick", m);
                        aK.attachEvent("onkeypress", m)
                    }
                }
                transition.start("fade", "in", null, 10, [i]);
                return false
            }
        }
    }
}

function bi(c) {
    var b = c.split(/[\(,\)]/);
    var a = [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])];
    return a
}

function bj(a) {
    return ("rgb(" + a[0] + "\x2c" + a[1] + "\x2c" + a[2] + "\x29")
}
var highlights = {
    init: function() {
        this.C = 0;
        this.D = highlightFirstInterval;
        this.E = 400;
        this.F = 2;
        this.highlightTextColor = highlightTextColor;
        this.highlightShadowColor = highlightShadowColor;
        this.G = (typeof document.body.style.textShadow == "string");
        for (var g = 0; g < charButtons.length; g++) {
            var d = charButtons[g];
            var b, a;
            if (d.currentStyle) {
                b = d.currentStyle.color;
                a = d.currentStyle.backgroundColor
            } else {
                if (window.getComputedStyle) {
                    var c = window.getComputedStyle(d, null);
                    b = c.getPropertyValue("color");
                    a = c.getPropertyValue("background-color")
                } else {
                    b = "rgb(0,0,0)";
                    buttonBackgroundTextColor = "rgb(229,229,229)"
                }
            }
            d.H = bi(b);
            d.I = bi(a);
            d.backgroundColor = d.I;
            d.onmouseover = function(h) {
                if (!h) {
                    var h = window.event
                }
                if (h.target) {
                    var i = h.target
                } else {
                    var i = h.srcElement
                }
                i.J = true;
                i.style.backgroundColor = bj(highlights.brightenColor(i.backgroundColor))
            };
            d.onmouseout = function(h) {
                if (!h) {
                    var h = window.event
                }
                if (h.target) {
                    var i = h.target
                } else {
                    var i = h.srcElement
                }
                i.J = false;
                i.style.backgroundColor = bj(i.backgroundColor)
            }
        }
        this.restoreState()
    },
    enableCSSTransitions: function() {
        for (var a = 0; a < charButtons.length; a++) {
            charButtons[a].style.transition = "text-shadow 0.25s";
            charButtons[a].style.webkitTransition = "text-shadow 0.25s";
            charButtons[a].style.mozTransition = "text-shadow 0.25s"
        }
    },
    brightenColor: function(c) {
        var b = new Array(3);
        for (var a = 0; a < 3; a++) {
            b[a] = Math.round(c[a] * 1.09);
            if (b[a] > 255) {
                b[a] = 255
            }
        }
        return b
    },
    update: function(a) {
        if (a.target) {
            var d = a.target
        } else {
            var d = a.srcElement
        }
        if (this.C <= d.L) {
            d.O = Math.round(d.O * (1 + (1 - d.P) * (this.F - 1)));
            if (d.O > this.E) {
                d.O = this.E
            }
        } else {
            d.O = this.D
        }
        d.L = this.C + d.O;
        d.P = 1;
        for (var c = 0; c < charButtons.length; c++) {
            var b = charButtons[c];
            if (b.P > 0) {
                b.P = (b.L - this.C) / b.O;
                this.updateButtonStyle(b)
            }
        }
        this.C++
    },
    reset: function() {
        for (var b = 0; b < charButtons.length; b++) {
            var a = charButtons[b];
            a.P = 0;
            a.L = -1;
            this.updateButtonStyle(a)
        }
    },
    updateButtonStyle: function(h) {
        if (h.P == 0) {
            if (this.G) {
                h.style.textShadow = "none"
            } else {
                h.style.backgroundColor = bj(h.I);
                h.backgroundColor = h.I
            }
            var g = 0
        } else {
            var g;
            if (this.G) {
                g = Math.pow(h.P, 0.33)
            } else {
                g = Math.pow(h.P, 0.33) / 3
            }
            var c = new Array(3);
            c[0] = Math.round(h.I[0] + (this.highlightShadowColor[0] - h.I[0]) * g);
            c[1] = Math.round(h.I[1] + (this.highlightShadowColor[1] - h.I[1]) * g);
            c[2] = Math.round(h.I[2] + (this.highlightShadowColor[2] - h.I[2]) * g);
            if (this.G) {
                var a = bj(c);
                h.style.textShadow = "0px 0px 2px " + a + ", 0px 0px 4px " + a + ", 0px 0px 10px " + a + ", 0px 0px 15px " + a
            } else {
                h.backgroundColor = c
            }
        }
        if (h.J) {
            h.style.backgroundColor = bj(this.brightenColor(h.backgroundColor))
        } else {
            h.style.backgroundColor = bj(h.backgroundColor)
        }
        var d = new Array(3);
        d[0] = Math.round(h.H[0] + (this.highlightTextColor[0] - h.H[0]) * g);
        d[1] = Math.round(h.H[1] + (this.highlightTextColor[1] - h.H[1]) * g);
        d[2] = Math.round(h.H[2] + (this.highlightTextColor[2] - h.H[2]) * g);
        var b = bj(d);
        h.style.color = b
    },
    saveState: function() {
        var c = "";
        for (var b = 0; b < charButtons.length; b++) {
            var a = charButtons[b];
            c += a.name + "\x7c" + Math.round(a.P * 100) + "\x7c" + a.O + "\x7c"
        }
        if (window.localStorage) {
            localStorage.setItem("highlightStatus-" + editorID, c)
        } else {
            setCookie("highlightStatus-" + editorID, c, null, 14, false)
        }
    },
    restoreState: function() {
        if (window.localStorage) {
            var j = localStorage.getItem("highlightStatus-" + editorID)
        } else {
            var j = getCookie("highlightStatus-" + editorID)
        }
        if (j !== null) {
            var h = j.split("\x7c");
            var d = new Object;
            var a = 0;
            while (a + 2 < h.length) {
                var b = h[a];
                d[b] = {
                    P: parseInt(h[a + 1]) / 100,
                    O: parseInt(h[a + 2])
                };
                a += 3
            }
        }
        for (var g = 0; g < charButtons.length; g++) {
            var c = charButtons[g];
            if (d && d[c.name]) {
                if (d[c.name].P >= 0 && d[c.name].P <= 1 && d[c.name].O > 0) {
                    c.P = d[c.name].P;
                    if (d[c.name].O > this.E) {
                        c.O = this.E
                    } else {
                        c.O = d[c.name].O
                    }
                    c.L = this.C + Math.round(c.O * c.P)
                } else {
                    c.P = 0;
                    c.O = this.D;
                    c.L = -1
                }
            } else {
                c.P = 0;
                c.O = this.D;
                c.L = -1
            }
            this.updateButtonStyle(c)
        }
    }
};

function bk(a) {
    if (!a) {
        var a = window.event
    }
    aV(chars[this.name], a.shiftKey);
    if (highlightFrequentButtons) {
        highlights.update(a)
    }
}

function bl() {
    function i(m) {
        if (!m) {
            return false
        }
        if (!m[0]) {
            alert("TypeIt error: exclude is not an array!");
            return false
        }
        for (var l = 0; l < m.length; l++) {
            var k = m[l];
            if (k.name == BrowserDetect.g) {
                if (!k.versions) {
                    return true
                }
                if (!k.versions[0]) {
                    alert("TypeIt error: exclude.versions is not an array!");
                    return true
                }
                for (var j = 0; j < k.versions.length; j++) {
                    if (k.versions[j] == BrowserDetect.h) {
                        return true
                    }
                }
            }
        }
        return false
    }
    for (var h = 0; h < charButtons.length; h++) {
        var d = charButtons[h];
        if (d.name && chars[d.name]) {
            if (!i(chars[d.name].exclude)) {
                if (d.firstChild == null) {
                    var b;
                    if (chars[d.name].displayOnWin && BrowserDetect.OS == "Windows") {
                        b = chars[d.name].displayOnWin
                    } else {
                        b = chars[d.name].lower
                    }
                    if (chars[d.name].format == "italic") {
                        d.innerHTML = "<i>" + b + "</i>"
                    } else {
                        if (chars[d.name].format == "superscript") {
                            d.innerHTML = "<sup>" + b + "</sup>"
                        } else {
                            if (chars[d.name].format == "strikethrough") {
                                d.innerHTML = "<s>" + b + "</s>"
                            } else {
                                d.innerHTML = b
                            }
                        }
                    }
                }
                d.style.visibility = "inherit";
                d.onclick = bk
            } else {
                d.style.display = "none"
            }
        }
    }
    for (var g in keys) {
        var c = keys[g].length;
        for (var a = 0; a < c; a++) {
            if (keys[g][a] === undefined) {
                alert("keys[" + g + "] refers to undefined char at position " + a + "\x21");
                continue
            }
            if (i(keys[g][a].exclude)) {
                if (c > 1) {
                    keys[g].splice(a, 1);
                    a--;
                    c--
                } else {
                    delete keys[g];
                    break
                }
            }
        }
    }
}

function bm(g, d, b) {
    if (b === undefined) {
        var b = aK.body
    }
    if (d === undefined) {
        var d = false
    }
    var a = 0;

    function c(i) {
        if (i.nodeType == Node.ELEMENT_NODE && i != b) {
            a += 1
        }
        if (!d && i == g) {
            return true
        }
        if (i.nodeType == Node.TEXT_NODE) {
            a += i.nodeValue.length
        } else {
            if (i.nodeType == Node.ELEMENT_NODE) {
                var h = i.firstChild;
                while (h) {
                    if (c(h)) {
                        return true
                    }
                    h = h.nextSibling
                }
                if (i != b) {
                    a += 1
                }
            }
        }
        if (d && i == g) {
            return true
        }
        return false
    }
    if (c(b)) {
        return a
    } else {
        return 0
    }
}

function bn(b, a) {
    if (b.nodeType == Node.TEXT_NODE) {
        return a
    } else {
        if (b.nodeType == Node.ELEMENT_NODE) {
            if (a == 0) {
                return 0
            }
            if (b.childNodes[a - 1]) {
                return bm(b.childNodes[a - 1], true, b)
            }
        }
    }
    return 0
}
var bo = {
    Q: null,
    R: null,
    S: null,
    U: null,
    V: function() {
        var a = this.Q + "<>" + this.R + "<>" + this.S + "<>" + this.U;
        setCookie("textBoxHash", aZ(a), "\x2f");
        window.name = a
    },
    X: function() {
        var b = getCookie("textBoxHash");
        if (b === null || aZ(window.name) != b) {
            return false
        }
        bb("textBoxHash", "\x2f");
        var a = window.name.split("<>");
        window.name = "";
        if (a.length < 4) {
            return false
        }
        this.Q = a[0];
        this.R = parseInt(a[1]);
        this.S = parseInt(a[2]);
        this.U = parseInt(a[3]);
        if (!(this.R >= 0) || !(this.S >= 0) || !(this.U >= 0)) {
            return false
        }
        return true
    },
    Y: function() {
        if (typeof sessionStorage == "undefined") {
            return false
        }
        sessionStorage.setItem("textBoxContents", this.Q);
        sessionStorage.setItem("textBoxStartPos", this.R);
        sessionStorage.setItem("textBoxEndPos", this.S);
        sessionStorage.setItem("textBoxYOffset", this.U);
        return true
    },
    Z: function() {
        if (typeof sessionStorage == "undefined") {
            return false
        }
        this.Q = sessionStorage.getItem("textBoxContents");
        if (this.Q === null) {
            return false
        }
        this.R = sessionStorage.getItem("textBoxStartPos");
        if (this.R === null) {
            return false
        } else {
            this.R = parseInt(this.R)
        }
        this.S = sessionStorage.getItem("textBoxEndPos");
        if (this.S === null) {
            return false
        } else {
            this.S = parseInt(this.S)
        }
        this.U = parseInt(sessionStorage.getItem("textBoxYOffset"));
        if (this.U === null) {
            return false
        } else {
            this.U = parseInt(this.U)
        }
        if (!(this.R >= 0) || !(this.S >= 0) || !(this.U >= 0)) {
            return false
        }
        return true
    },
    aa: function() {
        if (typeof sessionStorage != "undefined") {
            sessionStorage.removeItem("textBoxContents");
            sessionStorage.removeItem("textBoxStartPos");
            sessionStorage.removeItem("textBoxEndPos");
            sessionStorage.removeItem("textBoxYOffset")
        }
    }
};

function bp(i) {
    if (i === undefined) {
        i = false
    }
    if (textBoxIsEmpty()) {
        bo.aa();
        return
    }
    if (aJ.pageYOffset) {
        bo.U = aJ.pageYOffset
    } else {
        bo.U = aJ.document.documentElement.scrollTop
    }
    if (bo.U === null) {
        bo.U = 0
    }
    if (document.selection) {
        var h = aE.duplicate();
        var g = h.text.length;
        bo.R = -h.move("character", -2000000);
        bo.S = bo.R + g
    } else {
        if (aJ.getSelection) {
            var d = aJ.getSelection();
            if (d.getRangeAt) {
                var c = aJ.getSelection().getRangeAt(0);
                if (c) {
                    var b = c.startContainer;
                    var a = c.startOffset;
                    var k = c.endContainer;
                    var g = c.endOffset;
                    if (b) {
                        var j = bm(b);
                        bo.R = j + bn(b, a);
                        if (k == b) {
                            if (g == a) {
                                bo.S = bo.R
                            } else {
                                bo.S = j + bn(k, g)
                            }
                        } else {
                            bo.S = bm(k) + bn(k, g)
                        }
                    }
                }
            }
        }
    }
    bo.Q = aK.body.innerHTML;
    if (i) {
        bo.aa();
        bo.V()
    } else {
        bo.Y()
    }
}

function bq(h) {
    var g = 0;
    var c = aK.body;
    var a = null;
    var d = null;

    function b(k) {
        if (g >= h && k != c) {
            alert("Searched-for position reached at node entry")
        }
        if (k.nodeType == Node.ELEMENT_NODE) {
            if (k != c) {
                g += 1
            }
            if (g == h) {
                a = k;
                d = 0;
                return true
            }
        }
        if (k.nodeType == Node.TEXT_NODE) {
            if (g + k.nodeValue.length >= h) {
                a = k;
                d = h - g;
                return true
            } else {
                g += k.nodeValue.length
            }
        } else {
            if (k.nodeType == Node.ELEMENT_NODE) {
                var j = k.childNodes;
                for (var i = 0; i < j.length; i++) {
                    if (b(j[i])) {
                        return true
                    } else {
                        if (g == h) {
                            a = k;
                            d = i + 1;
                            return true
                        }
                    }
                }
                if (k != c) {
                    g += 1
                }
            }
        }
        return false
    }
    if (b(c) && a !== null && d !== null) {
        return {
            ab: a,
            ac: d
        }
    } else {
        return null
    }
}

function br() {
    if (bo.X()) {
        bo.Y()
    } else {
        bo.Z()
    }
    if (bo.Q !== null) {
        aK.body.innerHTML = bo.Q
    }
    if (BrowserDetect.g == "Firefox" && BrowserDetect.h < 4) {
        aV({
            lower: "\u00A0"
        }, false);
        var h = document.createEvent("KeyboardEvent");
        h.initKeyEvent("keypress", false, true, null, false, false, false, false, 8, 0);
        aK.dispatchEvent(h)
    }
    if (document.selection) {
        aK.body.focus();
        aS();
        if (bo.R !== null && bo.S !== null) {
            aE.move("character", bo.R);
            var g = bo.S - bo.R;
            aE.moveEnd("character", g);
            aE.select()
        }
    } else {
        if (aJ.getSelection && aJ.getSelection().getRangeAt) {
            aK.body.focus();
            if (bo.R !== null && bo.S !== null) {
                var c = bq(bo.R);
                if (bo.R == bo.S) {
                    var a = c
                } else {
                    var a = bq(bo.S)
                }
                if (c !== null && a !== null) {
                    var d = aK.createRange();
                    d.setStart(c.ab, c.ac);
                    d.setEnd(a.ab, a.ac);
                    aK.body.focus();
                    var b = aJ.getSelection();
                    b.removeAllRanges();
                    b.addRange(d)
                }
            }
        }
    }
    if (bo.U > 0) {
        aJ.setScroll(bo.U)
    }
    aK.body.focus()
}

function textBoxIsEmpty() {
    function b(g) {
        for (var c = 0; c < g.length; c++) {
            var d = g.charAt(c);
            if (d != "\0" && d != "\x20" && d != "\u00A0" && d != "\n" && d != "\r" && d != "\t" && d != "\b" && d != "\f" && d != "\v") {
                return true
            }
        }
        return false
    }

    function a(d) {
        if (d.nodeType == Node.TEXT_NODE) {
            if (b(d.nodeValue)) {
                return true
            } else {
                return false
            }
        } else {
            if (d.nodeType == Node.ELEMENT_NODE) {
                var c = d.firstChild;
                while (c) {
                    if (a(c)) {
                        return true
                    }
                    c = c.nextSibling
                }
                return false
            } else {
                return false
            }
        }
    }
    return !a(aK.body)
}

function bs(a) {
    if (a === undefined) {
        a = false
    }
    if (highlightFrequentButtons) {
        highlights.saveState()
    }
    bp(a)
}

function bt() {
    var c = document.getElementById("typeit_navbar");
    if (!c) {
        return false
    }
    var b = c.getElementsByTagName("\x61");
    if (!b) {
        return false
    }
    for (var a = 0; a < b.length; a++) {
        b[a].onclick = function() {
            makeCrossDomainSave = true
        }
    }
}

function setupShowMoreButtons() {
    var j = document.getElementById("typeit_showhiddenbuttons");
    if (!j) {
        return false
    }
    var h = document.getElementById("typeit_hidehiddenbuttons");
    if (!h) {
        return false
    }
    var d = charButtonsSection.childNodes;
    if (!d) {
        return false
    }
    var b = new Array();
    for (var g = 0; g < d.length; g++) {
        var c = d[g];
        if (c.nodeType == Node.ELEMENT_NODE && c.getAttribute("typeit_hidden") == "true") {
            b.push(c)
        }
    }
    ay = (getCookie("hiddenButtons-" + editorID) == "shown");
    if (ay) {
        for (var a = 0; a < b.length; a++) {
            b[a].style.display = "block";
            j.style.display = "none";
            h.style.display = "inline"
        }
    } else {
        for (var a = 0; a < b.length; a++) {
            b[a].style.display = "none";
            b[a].style.visibility = "hidden";
            j.style.display = "inline";
            h.style.display = "none"
        }
    }
    j.onclick = function(m) {
        if (ay) {
            return false
        }
        ay = true;
        setCookie("hiddenButtons-" + editorID, "shown", null, 30, false);
        if (au) {
            transition.start("slide", "in", null, null, b, null, setTextBoxHeight);
            transition.start("fade", "in", null, null, b, k)
        } else {
            for (var l = 0; l < b.length; l++) {
                b[l].style.display = "block";
                b[l].style.visibility = "inherit"
            }
            k()
        }
        j.style.display = "none";

        function k() {
            h.style.display = "inline"
        }
    };
    h.onclick = function(l) {
        if (!ay) {
            return false
        }
        ay = false;
        setCookie("hiddenButtons-" + editorID, "hidden", null, 30, false);
        if (au) {
            transition.start("fade", "out", null, null, b);
            transition.start("slide", "out", null, null, b, m, setTextBoxHeight)
        } else {
            for (var k = 0; k < b.length; k++) {
                b[k].style.display = "none";
                b[k].style.visibility = "hidden"
            }
            m()
        }
        h.style.display = "none";

        function m() {
            j.style.display = "inline"
        }
    }
}
var transition = {
    start: function(i, h, d, b, g, c, a) {
        if (!this.ad) {
            this.ad = new Array()
        }
        this.ad.push({
            type: i,
            direction: h,
            ae: d,
            O: b,
            elements: g,
            af: c,
            ag: a
        });
        this.attempt()
    },
    end: function() {
        this.ah = false;
        this.attempt()
    },
    attempt: function() {
        if (this.ah) {
            return
        }
        this.ah = true;
        var a = this.ad.shift();
        if (!a) {
            this.ah = false;
            return
        }
        this.elements = a.elements;
        this.direction = a.direction;
        this.ae = a.ae;
        this.O = a.O;
        this.ag = a.ag;
        this.af = a.af;
        if (a.type == "fade") {
            this.fade()
        } else {
            if (a.type == "slide") {
                this.slide()
            } else {
                this.end()
            }
        }
    },
    fade: function() {
        this.ai = (this.direction == "in");
        this.aj = (document.body.style.opacity !== undefined);
        this.ak = (BrowserDetect.g == "Explorer" && BrowserDetect.h >= 8);
        var c;
        for (var a = 0; a < this.elements.length; a++) {
            var b;
            if (this.elements[a].currentStyle) {
                b = parseFloat(this.elements[a].currentStyle.opacity)
            } else {
                if (window.getComputedStyle) {
                    b = parseFloat(window.getComputedStyle(this.elements[a], null).getPropertyValue("opacity"))
                }
            }
            if (b > 0) {
                this.elements[a].al = b
            } else {
                this.elements[a].al = 1
            }
        }
        if (this.aj || this.ak) {
            if (this.ai) {
                c = 0
            } else {
                c = 1
            }
            if (this.aj) {
                if (this.ai) {
                    for (var a = 0; a < this.elements.length; a++) {
                        this.elements[a].style.opacity = 0
                    }
                } else {
                    for (var a = 0; a < this.elements.length; a++) {
                        this.elements[a].style.opacity = this.elements[a].al
                    }
                }
            } else {
                if (this.ak) {
                    for (var a = 0; a < this.elements.length; a++) {
                        var c = (this.ai) ? 0 : (this.elements[a].al * 100);
                        if (!this.elements[a].style.filter) {
                            this.elements[a].style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + c + ",enabled=true)"
                        } else {
                            this.elements[a].filters.item("DXImageTransform.Microsoft.Alpha").Enabled = true
                        }
                        this.elements[a].filters.item("DXImageTransform.Microsoft.Alpha").Opacity = c
                    }
                }
            }
            if (this.ai) {
                for (var a = 0; a < this.elements.length; a++) {
                    this.elements[a].style.visibility = "visible"
                }
            }
            this.am = (this.ae === null) ? 10 : this.ae;
            this.an = (this.O === null) ? 40 : this.O;
            this.processFade(0)
        } else {
            if (this.ai) {
                for (var a = 0; a < this.elements.length; a++) {
                    this.elements[a].style.visibility = "visible"
                }
            } else {
                for (var a = 0; a < this.elements.length; a++) {
                    this.elements[a].style.visibility = "hidden"
                }
            }
            if (this.af) {
                this.af(this.elements)
            }
            this.end()
        }
    },
    processFade: function(c) {
        if (c <= this.am) {
            for (var a = 0; a < this.elements.length; a++) {
                if (this.ai) {
                    var b = ((c / this.am) * this.elements[a].al).toFixed(2)
                } else {
                    var b = ((1 - (c / this.am)) * this.elements[a].al).toFixed(2)
                }
                if (this.aj) {
                    this.elements[a].style.opacity = b
                } else {
                    if (this.ak) {
                        this.elements[a].filters.item("DXImageTransform.Microsoft.Alpha").Opacity = b * 100
                    }
                }
                if (this.ai && (b == 1)) {
                    if (this.ak) {
                        this.elements[a].filters.item("DXImageTransform.Microsoft.Alpha").Enabled = false
                    }
                } else {
                    if (!this.ai && (b == 0)) {
                        if (this.ak) {
                            this.elements[a].filters.item("DXImageTransform.Microsoft.Alpha").Enabled = false
                        }
                        this.elements[a].style.visibility = "hidden";
                        this.elements[a].style.opacity = this.elements[a].al
                    }
                }
            }
            if (this.ag) {
                this.ag()
            }
            if (c < this.am) {
                window.setTimeout("transition.processFade(" + (c + 1) + "\x29", this.an)
            } else {
                if (this.af) {
                    this.af(this.elements)
                }
                this.end()
            }
        }
    },
    slide: function() {
        this.ao = (this.direction == "in");
        for (var a = 0; a < this.elements.length; a++) {
            this.elements[a].style.display = "block";
            this.elements[a].ap = (this.elements[a].clientHeight) ? (this.elements[a].clientHeight) : (this.elements[a].offsetHeight)
        }
        if (this.ao) {
            for (var a = 0; a < this.elements.length; a++) {
                this.elements[a].style.height = "0px"
            }
        }
        this.aq = (this.ae === null) ? 25 : this.ae;
        this.ar = (this.O === null) ? 15 : this.O;
        this.processSlide(0)
    },
    processSlide: function(c) {
        if (c <= this.aq) {
            for (var a = 0; a < this.elements.length; a++) {
                if (this.ao) {
                    var b = Math.round((c / this.aq) * this.elements[a].ap)
                } else {
                    var b = Math.round((1 - c / this.aq) * this.elements[a].ap)
                }
                this.elements[a].style.height = b + "px"
            }
            if (this.ag) {
                this.ag()
            }
            if (c < this.aq) {
                window.setTimeout("transition.processSlide(" + (c + 1) + "\x29", this.ar)
            } else {
                if (!this.ao) {
                    for (var a = 0; a < this.elements.length; a++) {
                        this.elements[a].style.display = "none";
                        this.elements[a].style.height = ""
                    }
                }
                if (this.af) {
                    this.af(this.elements)
                }
                this.end()
            }
        }
    }
};

function bu() {
    var b = [toolbar, prefbar];
    if (au) {
        transition.start("fade", "in", null, null, b)
    } else {
        for (var a = 0; a < b.length; a++) {
            b[a].style.visibility = "inherit"
        }
    }
}

function showImage(i, h, g) {
    var d = document.getElementById("typeit_overlay");
    if (d) {
        if (i == document.getElementById("typeit_overlay_image").as) {
            return false
        } else {
            a(d)
        }
    }
    var d = document.createElement("div");
    d.id = "typeit_overlay";
    d.style.position = "fixed";
    d.style.width = h + "px";
    d.style.height = g + "px";
    d.style.backgroundColor = "white";
    d.style.left = "0px";
    d.style.top = "0px";
    d.style.borderWidth = "1px";
    d.onclick = function() {
        a(d)
    };

    function a(l) {
        transition.start("fade", "out", null, null, [l], function() {
            document.body.removeChild(l)
        })
    }
    d.style.visibility = "hidden";
    var c = document.createElement("img");
    c.src = i;
    c.as = i;
    c.id = "typeit_overlay_image";
    c.style.width = h + "px";
    c.style.height = g + "px";
    var b = document.createElement("div");
    b.innerHTML = "Click on image to close";
    b.className = "message";
    b.style.position = "absolute";
    d.appendChild(c);
    d.appendChild(b);
    document.body.appendChild(d);
    var k = getViewportHeight();
    var j = getViewportWidth();
    divHeight = g + 2;
    divWidth = h + 2;
    d.style.left = ((j - divWidth > 0) ? Math.round((j - divWidth) / 2) : 0) + "px";
    d.style.top = ((k - divHeight > 0) ? Math.round((k - divHeight) / 2) : 0) + "px";
    transition.start("fade", "in", null, null, [d])
}

function getViewportHeight() {
    if (window.innerHeight) {
        return window.innerHeight
    } else {
        if (document.documentElement.clientHeight > 0) {
            return document.documentElement.clientHeight
        } else {
            if (document.body.clientHeight > 0) {
                return document.body.clientHeight
            } else {
                return false
            }
        }
    }
}

function getViewportWidth() {
    if (window.innerWidth) {
        return window.innerWidth
    } else {
        if (document.documentElement.clientWidth > 0) {
            return document.documentElement.clientWidth
        } else {
            if (document.body.clientWidth > 0) {
                return document.body.clientWidth
            } else {
                return false
            }
        }
    }
}

function setTextBoxHeight() {
    function d(h) {
        if (!h.offsetParent) {
            return false
        }
        var g = 0;
        do {
            g += h.offsetTop
        } while (h = h.offsetParent);
        return g
    }
    var c = getViewportHeight();
    var b = d(textBoxIframe);
    if (b > 0) {
        var a = (c - b - 65);
        if (a < 240) {
            textBoxHeight = 240
        } else {
            if (a > 550) {
                textBoxHeight = 550
            } else {
                textBoxHeight = a
            }
        }
        textBoxIframe.style.height = textBoxHeight + "px"
    }
}
ba();
BrowserDetect.init();
try {
    if (Node.ELEMENT_NODE !== 1) {}
} catch (e) {
    var Node = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3
    }
}

function bv() {
    if (az) {
        return
    }
    try {
        document.documentElement.doScroll("left")
    } catch (a) {
        setTimeout(bv, 50);
        return
    }
    init()
}
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false)
} else {
    if (document.attachEvent) {
        document.attachEvent("onreadystatechange", init);
        window.attachEvent("onload", init);
        var toplevel = false;
        try {
            toplevel = window.frameElement == null
        } catch (e) {}
        if (document.documentElement.doScroll && toplevel) {
            bv()
        }
    }
}

function init() {
    if (az) {
        return
    }
    if (document.attachEvent && !document.addEventListener) {
        document.detachEvent("onreadystatechange", init)
    }
    if (!document.body) {
        setTimeout(init, 1);
        return
    }
    textBoxIframe = document.getElementById("typeit_textbox_iframe");
    if (BrowserDetect.g != "Explorer" && textBoxIframe === null) {
        alert("TypeIt error: Could not locate element with id = 'typeit_textbox_iframe'!")
    }
    if (!textBoxHasLoaded) {
        textBoxIframe.onload = init;
        textBoxHasLoaded = true;
        return
    }
    az = true;
    if (textBoxIframe.contentDocument) {
        if (textBoxIframe.contentWindow) {
            aL = textBoxIframe.contentWindow
        } else {
            aL = null
        }
        aK = textBoxIframe.contentDocument
    } else {
        aL = textBoxIframe.contentWindow;
        aK = aL.document
    }
    aJ = window.frames.typeit_textbox_iframe;
    aO = document.getElementById("typeit_disablekeysselector");
    aM = document.getElementById("typeit_autoprettyselector");
    resetHighlightsSelector = document.getElementById("typeit_reset_highlights");
    aN = document.getElementById("typeit_fontselector");
    if (aN) {
        aP = aN.getElementsByTagName("option")
    }
    aQ = document.getElementById("typeit_font_plus");
    aR = document.getElementById("typeit_font_minus");
    toolbar = document.getElementById("typeit_toolbar");
    if (!toolbar) {
        alert("TypeIt error: Could not locate element with id = 'typeit_toolbar'!");
        return
    }
    prefbar = document.getElementById("typeit_prefbar");
    if (!prefbar) {
        alert("TypeIt error: Could not locate element with id = 'typeit_prefbar'!");
        return
    }
    editButtonsSection = document.getElementById("typeit_editbuttons");
    editButtons = (editButtonsSection) ? (editButtonsSection.getElementsByTagName("button")) : null;
    charButtonsSection = document.getElementById("typeit_buttons");
    if (!charButtonsSection) {
        alert("TypeIt error: Could not locate element with id = 'typeit_buttons'!");
        return
    }
    charButtons = charButtonsSection.getElementsByTagName("button");
    if (aH.indexOf("\u0074\u0079\u0070\u0065\u0069\u0074") == -1) {
        aV = function() {
            makeCrossDomainSave = true
        }
    }
    bc();
    bf();
    bl();
    if (highlightFrequentButtons) {
        highlights.init()
    }
    textBoxIframe.style.visibility = "inherit";
    br();
    bd();
    be();
    bg();
    bh();
    bt();
    aK.body.onselect = aS;
    aK.onclick = function() {
        aC.name = "";
        aS()
    };
    aK.onblur = function() {
        aC.name = ""
    };
    aK.oncontextmenu = function() {
        aC.name = ""
    };
    aK.onkeyup = aY;
    aK.onkeydown = aX;
    aK.onkeypress = aX;
    window.onbeforeunload = function() {
        bs(makeCrossDomainSave)
    };
    window.onresize = setTextBoxHeight;
    if (BrowserDetect.g == "Explorer" && BrowserDetect.h < 8) {
        setTextBoxHeight()
    }
    if (BrowserDetect.g == "Safari" || BrowserDetect.g == "Chrome" || (BrowserDetect.g == "Firefox" && BrowserDetect.h < 4)) {
        toolbar.onmousedown = function(a) {
            a.preventDefault()
        }
    } else {
        toolbar.onclick = function() {
            aT()
        }
    }
    if (typeof sessionStorage !== "undefined") {
        aI = window.setInterval(function() {
            bs(false)
        }, 30 * 1000)
    }
    bu();
    if (highlightFrequentButtons) {
        highlights.enableCSSTransitions()
    }
    aK.body.focus()
};