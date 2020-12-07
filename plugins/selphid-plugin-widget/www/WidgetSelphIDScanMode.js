/**
 * Enum for scan mode. Generic mode: It searches in all the documents templates. Specific: It searches in the document 
 *
 * @class WidgetSelphIDScanMode
 * @constructor
 */
WidgetSelphIDScanMode = Object.freeze({ "GenericMode": "Generic", "SpecificMode": "Specific", "SearchMode": "Search" });

var keysScanMode = Object.keys(WidgetSelphIDScanMode).reduce(function (acc, key) {
    return acc[WidgetSelphIDScanMode[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected scan mode.
 *
 * @method getEnumScanMode
 * @type   Integer
 */
WidgetSelphIDScanMode.getEnumScanMode = function (ordinal) {
    return keysScanMode[ordinal];
}

// Exports enum for APP visibility
module.exports.WidgetSelphIDScanMode = WidgetSelphIDScanMode;
