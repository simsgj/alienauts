/* Constants */
var c = {
    "DEBUG"     : false,

    "WIDTH"     : window.innerWidth,
    "HEIGHT"    : window.innerHeight,

    "MOBILE"    : navigator.userAgent.match(/Android|iPhone|iPad|iPod/i),
    "GUID"      : (function () {
        function S4() {
            return ("000" + Math.floor(Math.random() * 0x10000).toString(16)).slice(-4);
        };

        return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
    })()
};

// Helper to enable debug by setting a special hash in the URL.
if (document.location.hash === "#debug") {
    c.DEBUG = true;
}

// Adjust height for mobile browsers to account for the iOS bar.
// Is this necessary for Android?
if (c.MOBILE) {
    c.HEIGHT = window.outerHeight - 20;
}

window.addEventListener("hashchange", function onHashChange(e) {
    var debug = (document.location.hash === "#debug");
    c.__defineGetter__("DEBUG", function () {
        return debug;
    });
});

// Turn the `c` object into a hash of constants.
try {
    Object.keys(c).forEach(function eachKey(key) {
        if (typeof(c[key]) === "function") {
            return;
        }

        c.__defineGetter__(
            key,
            (function getterFactory(value) {
                return function returnValue() {
                    return value
                };
            })(c[key])
        );
    });
}
catch (e) {
    // No getters? FAKE CONSTANTS!
}


// Game engine settings.
me.sys.pauseOnBlur = false;
me.sys.gravity = 0;
me.sys.useNativeAnimFrame = true; // Be fast!
//me.sys.dirtyRegion = true; // Be faster!
//me.debug.renderHitBox = true;
//me.debug.renderCollisionMap = true;
me.sys.stopOnAudioError = false;