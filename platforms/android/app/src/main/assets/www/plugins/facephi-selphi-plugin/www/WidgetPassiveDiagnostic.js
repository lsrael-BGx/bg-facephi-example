cordova.define("facephi-selphi-plugin.WidgetPassiveDiagnostic", function(require, exports, module) {
/**
 * Enum for Passive Liveness Diagnostic. Only relevant if you are calling Only relevant if you are calling the widget with LivenessMode => PassiveMode.
 *
 * @class WidgetPassiveDiagnostic
 * @constructor
 */
WidgetPassiveDiagnostic = Object.freeze({ "None": 0, "Spoof": 1, "Uncertain":2, "Live": 3, "NoneBecauseBadQuality": 4, "NoneBecauseFaceTooClose": 5, "NoneBecauseFaceNotFound": 6, "NoneBecauseFaceTooSmall": 7, "NoneBecauseAngleTooLarge": 8, "NoneBecauseImageDataError": 9, "NoneBecauseInternalError": 10,  "NoneBecauseImagePreprocessError" : 11, "NoneBecauseTooManyFaces" : 12 });

var keysWidgetPassiveDiagnostic = Object.keys(WidgetPassiveDiagnostic).reduce(function (acc, key) {
    return acc[WidgetPassiveDiagnostic[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected diagnostic.
 *
 * @method getEnumWidgetPassiveDiagnostic
 * @type   Integer
 */
WidgetPassiveDiagnostic.getEnumWidgetPassiveDiagnostic = function (ordinal) {
    return keysWidgetPassiveDiagnostic[ordinal];
}

// Exports enum for APP visibility
module.exports.WidgetPassiveDiagnostic = WidgetPassiveDiagnostic;

});
