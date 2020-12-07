cordova.define("facephi-selphi-plugin.WidgetMode", function(require, exports, module) {
/**
 * Enum for the Widget process operation.
 *
 * @class WidgetMode
 * @constructor
 */
WidgetMode = Object.freeze({ "Authenticate": "Authenticate", "Register": "Register", "ShowTutorial": "ShowTutorial"});

var keysWidgetMode = Object.keys(WidgetMode).reduce(function (acc, key) {
    return acc[WidgetMode[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected mode.
 *
 * @method getEnumLivenessDiagnostic
 * @type   Integer
 */
WidgetMode.getEnumWidgetMode = function (ordinal) {
    return keysWidgetMode[ordinal];
}

module.exports.WidgetMode = WidgetMode;

});
