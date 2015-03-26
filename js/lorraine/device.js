var device = {
    checkDevice: function() {
            var root = (typeof exports == 'undefined' ? window : exports);
            var screenWidth = document.body.offsetWidth;
            var response = {};
            
            var isRetina = function(){
                var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                                            (min--moz-device-pixel-ratio: 1.5),\
                                            (-o-min-device-pixel-ratio: 3/2),\
                                            (min-resolution: 1.5dppx)";

                if (root.devicePixelRatio > 1) { return true; }
                else if (root.matchMedia && root.matchMedia(mediaQuery).matches) { return true; }
                else { return false; }
}
            var orientation = function() {
              return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
            }
            
            response.retina = isRetina();
            response.orientation = orientation();
            response.screenWidth = screenWidth;
            return response;
}
}
app.debug(DEBUG, { message: "Device Module loaded." });
