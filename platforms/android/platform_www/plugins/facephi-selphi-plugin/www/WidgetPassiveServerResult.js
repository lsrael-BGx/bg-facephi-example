cordova.define("facephi-selphi-plugin.WidgetPassiveServerResult", function(require, exports, module) {
/**
 * Enum for Passive Liveness Diagnostic. Only relevant if you are calling Only relevant if you are calling the widget with LivenessMode => PassiveMode.
 *
 * @class WidgetPassiveServerResult
 * @constructor
 */
WidgetPassiveServerResult = Object.freeze({ "Ok": 1, "ErrorDatabase": -1, "ErrorSoapHeader":-2, "ErrorCredentialNotValid": -3, "ErrorCredentialLocked": -4, "ErrorImage1Format": -5, "ErrorImage2Format": -6, "ErrorImagesFormat": -7, "ErrorImage1Lib": -8, "ErrorImage2Lib": -9, "ErrorImagesLib": -10,  "ErrorImage1NotExtracted" : -11, "ErrorImage2NotExtracted" : -12, "ErrorImagesNotExtracted": -13, "ErrorVerification": -14, "ErrorNone": -15,  "ErrorInternal" : -16, "ErrorException": -17,  "ErrorInvalidEncryptedData" : -18 });

var keysWidgetPassiveServerResult = Object.keys(WidgetPassiveServerResult).reduce(function (acc, key) {
    return acc[WidgetPassiveServerResult[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected diagnostic.
 *
 * @method getEnumWidgetPassiveServerResult
 * @type   Integer
 */
WidgetPassiveServerResult.getEnumWidgetPassiveServerResult = function (ordinal) {
    return keysWidgetPassiveServerResult[ordinal];
}

// Exports enum for APP visibility
module.exports.WidgetPassiveServerResult = WidgetPassiveServerResult;

});
