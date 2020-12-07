cordova.define("facephi-selphi-plugin.WidgetFinishStatus", function(require, exports, module) {
/**
 * Enum for the Widget process finish status.
 *
 * @class WidgetFinishStatus
 * @constructor
 */
WidgetFinishStatus = Object.freeze({ "Ok": 1, "Error": 2, "CancelByUser": 3, "Timeout": 4});

var keysWidgetFinishStatus = Object.keys(WidgetFinishStatus).reduce(function (acc, key) {
    return acc[WidgetFinishStatus[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected diagnostic.
 *
 * @method getEnumLivenessDiagnostic
 * @type   Integer
 */
WidgetFinishStatus.getEnumWidgetFinishStatus = function (ordinal) {
    return keysWidgetFinishStatus[ordinal];
}

module.exports.WidgetFinishStatus = WidgetFinishStatus;
});
