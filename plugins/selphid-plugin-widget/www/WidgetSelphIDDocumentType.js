/**
 * Enum for document type (IDCard or Passport). 
 *
 * @class WidgetSelphIDDocumentType
 * @constructor
 */
WidgetSelphIDDocumentType = Object.freeze({ "IDCard": "DT_IDCard", "Passport": "DT_Passport" });

var keysDocumentType = Object.keys(WidgetSelphIDDocumentType).reduce(function (acc, key) {
    return acc[WidgetSelphIDDocumentType[key]] = key, acc;
}, {});

/**
 * Gets the integer value of the selected scan mode.
 *
 * @method getEnumDocumentType
 * @type   Integer
 */
WidgetSelphIDScanMode.getEnumDocumentType = function (ordinal) {
    return keysDocumentType[ordinal];
}

// Exports enum for APP visibility
module.exports.WidgetSelphIDDocumentType = WidgetSelphIDDocumentType;
