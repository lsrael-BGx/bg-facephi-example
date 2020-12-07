/**
 * Enum for the Widget process operation (capture).
 *
 * @class WidgetSelphIDOperation
 * @constructor
 */
WidgetSelphIDOperation = Object.freeze({ "CaptureFront": "Front", "CaptureBack": "Back", "CaptureWizard": "Wizard", "ShowTutorial": "Tutorial"});

var keysWidgetSelphIDOperation = Object.keys(WidgetSelphIDOperation).reduce(function (acc, key) {
    return acc[WidgetSelphIDOperation[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected operation.
 *
 * @method getEnumWidgetOperation
 * @type   Integer
 */
WidgetSelphIDOperation.getEnumWidgetOperation = function (ordinal) {
    return keysWidgetSelphIDOperation[ordinal];
}

module.exports.WidgetSelphIDOperation = WidgetSelphIDOperation;
