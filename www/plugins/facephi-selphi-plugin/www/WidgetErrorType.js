cordova.define("facephi-selphi-plugin.WidgetErrorType", function(require, exports, module) {
/**
 * Enum for the widget error type.
 *
 * @class WidgetErrorType
 * @constructor
 */
WidgetErrorType = Object.freeze({ "UnknownError": 1, "NoError": 2, "CameraPermissionDenied": 3, "SettingsPermissionDenied": 4, "HardwareError": 5, "ExtractionLicenseError": 6,
							"UnexpectedCaptureError": 7, "ControlNotInitializedError": 8, "BadExtractorConfiguration": 9});


var keysWidgetErrorType = Object.keys(WidgetErrorType).reduce(function (acc, key) {
    return acc[WidgetErrorType[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected error.
 *
 * @method getEnumWidgetErrorType
 * @type   Integer
 */
WidgetErrorType.getEnumWidgetErrorType = function (ordinal) {
    return keysWidgetErrorType[ordinal];
}

module.exports.WidgetErrorType = WidgetErrorType;
});
