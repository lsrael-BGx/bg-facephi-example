cordova.define("facephi-selphi-plugin.WidgetLivenessMode", function(require, exports, module) {
/**
 * Enum for the Widget liveness mode authentication.
 *
 * @class WidgetLivenessMode
 * @constructor
 */
WidgetLivenessMode = Object.freeze({ "BlinkMode": "BLINK", "MovementMode": "MOVE", "None": "NONE"});

var keysWidgetLivenessMode = Object.keys(WidgetLivenessMode).reduce(function (acc, key) {
    return acc[WidgetLivenessMode[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected mode.
 *
 * @method getEnumLivenessMode
 * @type   Integer
 */
WidgetLivenessMode.getEnumWidgetLivenessMode = function (ordinal) {
    return keysWidgetLivenessMode[ordinal];
}

module.exports.WidgetLivenessMode = WidgetLivenessMode;

});
