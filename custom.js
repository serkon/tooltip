/**
 * Created by Serkan KONAKCI on 12.09.2014.
 * @Dependency : Jquery
 * @Optional : Jquery-ui.core.js
 * @Optional : Jquery-ui.effects.js
 * @parameter {object} options - The default value for tooltip setting
 * @parameter {number} options.space - The default number of height beetween tooltip-arrow with tooltip trigger.
 * @parameter {number} options.duration - The default milisecond of effect duration time.
 * @parameter {number} options.easingIn - The default effect of on mouseenter tooltip trigger.
 * @parameter {number} options.easingOut - The default effect of on mouseleave tooltip trigger.
 */
 
/*
! HTML Usage Sample
=============================
<span class="tooltip">
	Deneme
	<div class="tooltip-container">
		<div class="tooltip-content">
			<b>Bold</b> text here<br /><a href="">Açıklama yetmeyebilir buraya kadarki kısımda</a>
		</div>
		<div class="tooltip-arrow"></div>
	</div>
</span> yapıyorum</div>
*/



$.fn.extend({
    /**
     * !URL
     * description This plugin get web browser url address root with default port
     * @example $.fn.url();
     * @returns {string} http://localhost:9000
     */
    "url": function() {
        var port = $(location).attr("port");
        port = (typeof port === "undefined" || port === null || port.length <= 0) ? port : ":" + $(location).attr("port");
        return $(location).attr("protocol") + "//" + $(location).attr("hostname") + port;
    },
    /**
     * !REDIRECT
     * @description This plugin redirect page to given parameter address
     * @example $.fn.redirect(location);
     * @param {string} location - Will be redirected to the page address
     */
    "redirect": function(location) {
        window.location.href = location;
    },
    /**
     * !REQUEST
     * @description This plugin request page data throught Jquery ajax plugin
     * @example $.fn.request("data/sample/list.php", data, func, method);
     * @param {string} path - The page URL address that will be getting data
     * @param {string} data - QueryString parameter that will be send to path
     * @param {string} func - Callback function name
     * @param {string} method - HTTP send method
     * @returns {Object} return Ajax object
     */
    "request": function(path, data, func, method) {
        var ajax = $.ajax({
            type: typeof method !== "undefined" ? method : "GET",
            url: this.url() + "/" + path,
            data: {
                get: data
            },
            async: false,
            beforeSend: function() {
                $('.loader').show();
            },
            complete: function(data) {
                if (typeof func !== "undefined") {
                    eval(func + "(ajax)");
                    return true;
                }
                $('.loader').hide();
                return (ajax);
            },
            'error': function(data) {
                alert('Error occured');
                return false;
            }
        });
        return ajax;
    },
    version:function(script,version){
        version = version || "0.0.0";
        return (parseInt(script.split('.').join('')) >= parseInt(version.split('.').join(''))) ? true :false;
    }
});



(function() {
/**
 * Created by Serkan KONAKCI on 12.09.2014.
 * @Dependency : Jquery
 * @Optional : Jquery-ui.core.js
 * @Optional : Jquery-ui.effects.js
 * @parameter {object} options - The default value for tooltip setting
 * @parameter {number} options.space - The default number of height beetween tooltip-arrow with tooltip trigger.
 * @parameter {number} options.duration - The default milisecond of effect duration time.
 * @parameter {number} options.easingIn - The default effect of on mouseenter tooltip trigger.
 * @parameter {number} options.easingOut - The default effect of on mouseleave tooltip trigger.
 */

/*
! HTML Usage Sample
=============================
<span class="tooltip">
    Deneme
    <div class="tooltip-container">
        <div class="tooltip-content">
            <b>Bold</b> text here<br /><a href="">Açıklama yetmeyebilir buraya kadarki kısımda</a>
        </div>
        <div class="tooltip-arrow"></div>
    </div>
</span> yapıyorum</div>
*/

$.fn.extooltip = function(options) {
    // Checking for effect.js was imported
    var $effects = $.effects && $.fn.version($.effects.version, "1.11.0") || false;
    var settings = $.extend({
        space: 25,
        duration: 300,
        easingIn: ($effects) ? "easeInOutBack" : "swing",
        //easingIn: ($effects) ? "easeOutCirc" : "swing",
        easingOut: ($effects) ? "easeInBack" : "swing"
    }, options);
    $this = $(this);
    return this.each(function() {
        $container = $(".tooltip-container", this);
        $container.css({
            "left": -$container.width() / 2,
            "margin-left": $(this).width() / 2
        });
        $(this).on({
            "mouseenter": function() {
                $(".tooltip-container").css({
                    "display": "none"
                });
                $(".tooltip-container", this).css({
                    "display": "inline-block",
                }).stop().stop(true,true).animate({
                    "bottom": $this.height() + settings.space - 10,
                    "opacity": 1
                }, settings.duration, settings.easingIn);
            },
            "mouseleave": function(e) {
                $(".tooltip-container", this).stop(true,false).animate({
                    "bottom": 0,
                    "opacity": 0
                }, settings.duration / 2, settings.easingOut, function() {
                    $(this).css({
                        "display": "none"
                    });
                });
            }
        });
    });
}
$(".tooltip").extooltip();
})();