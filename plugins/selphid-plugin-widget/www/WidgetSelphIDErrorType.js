/**
 * Enum for the widget error type.
 *
 * @class WidgetSelphIDErrorType
 * @constructor
 */
WidgetSelphIDErrorType = Object.freeze({ "UnknownError": 1, "NoError": 2, "CameraPermissionDenied": 3, "SettingsPermissionDenied": 4, "HardwareError": 5, "ExtractionLicenseError": 6,
							"UnexpectedCaptureError": 7, "ControlNotInitializedError": 8, "BadExtractorConfiguration": 9});


var keysWidgetSelphIDErrorType = Object.keys(WidgetSelphIDErrorType).reduce(function (acc, key) {
    return acc[WidgetSelphIDErrorType[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected error.
 *
 * @method getEnumWidgetSelphIDErrorType
 * @type   Integer
 */
WidgetSelphIDErrorType.getEnumWidgetSelphIDErrorType = function (ordinal) {
    return keysWidgetSelphIDErrorType[ordinal];
}

module.exports.WidgetSelphIDErrorType = WidgetSelphIDErrorType;