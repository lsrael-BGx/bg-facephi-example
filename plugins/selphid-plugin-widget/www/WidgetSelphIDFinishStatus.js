/**
 * Enum for the Widget process finish status.
 *
 * @class WidgetSelphIDFinishStatus
 * @constructor
 */
WidgetSelphIDFinishStatus = Object.freeze({ "Ok": 1, "Error": 2, "CancelByUser": 3, "Timeout": 4});

var keysWidgetFinishStatus = Object.keys(WidgetSelphIDFinishStatus).reduce(function (acc, key) {
    return acc[WidgetSelphIDFinishStatus[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected status.
 *
 * @method getEnumFinishStatus
 * @type   Integer
 */
WidgetSelphIDFinishStatus.getEnumWidgetFinishStatus = function (ordinal) {
    return keysWidgetSelphIDFinishStatus[ordinal];
}

module.exports.WidgetSelphIDFinishStatus = WidgetSelphIDFinishStatus;