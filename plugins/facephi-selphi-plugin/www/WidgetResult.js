/**
 * Encapsulates the Widget response. 
 *
 * @class WidgetResult
 * @constructor
 * @param String resultJSON Widget response in JSON format
 */
WidgetResult = function (resultJSON) {
    checkTypes(resultJSON, ['string']);
    var obj = JSON.parse(resultJSON);
    this.finishStatus = obj.finishStatus;
    this.template = convertDataURIToBinary(obj.template); // Base64 to array??
    this.templateRaw = convertDataURIToBinary(obj.templateRaw); // Base64 to array??
    this.eyeGlassesScore = obj.eyeGlassesScore;
    this.templateScore = obj.templateScore;
    this.qrData = obj.qrData;
    imagesJSON = obj.images;    

    this.image = [];
    for (var im in imagesJSON) {
        this.image = imagesJSON[im]; // Concat directly the images.
    }
    this.livenessDiagnostic = obj.livenessDiagnostic;
    this.errorType = obj.errorType;
    this.errorMessage = obj.errorMessage;
}

/**
 * Gets the final status of the Widget process.  
 *
 * @property getFinishStatus
 * @type     WidgetFinishStatus
 */
WidgetResult.prototype.getFinishStatus = function() {
    return this.finishStatus;
}

/**
 * Gets the user template. 
 *
 * @property getTemplate
 * @type     StringBase64
 */
WidgetResult.prototype.getTemplate = function() {
    return this.template;
}

/**
 * Gets eyeGlassesScore
 *
 * @property getEyeGlassesScore
 * @type     Float
 */
WidgetResult.prototype.getEyeGlassesScore = function() {
    return this.eyeGlassesScore;
}

/**
 * Gets templateScore
 *
 * @property getTemplateScore
 * @type     Float
 */
WidgetResult.prototype.getTemplateScore = function() {
    return this.templateScore;
}

/**
 * Gets the liveness diagnostic. 
 *
 * @property getLivenessDiagnostic
 * @type    UCLivenessDiagnostic 
 */
WidgetResult.prototype.getLivenessDiagnostic = function() {
    return this.livenessDiagnostic;
}

/**
 * Gets the type of the error if exists. 
 *
 * @property getErrorType
 * @type     WidgetErrorType 
 */
WidgetResult.prototype.getErrorType = function() {
    return this.errorType;
}

/**
 * Gets the message error if exists or null. 
 *
 * @property getErrorMessage
 * @type     String 
 */
WidgetResult.prototype.getErrorMessage = function() {
    return this.errorMessage;
}

/**
 * Gets the best image of the Base64 format. 
 *
 * @property getImage
 * @type     URIImage 
 */
WidgetResult.prototype.getImage = function() {
    return this.image;
}

/**
 * Get qr string data. Only available in qr modes.
 *
 * @property getQRData
 * @type     String
 */
WidgetResult.prototype.getQRData = function() {
    return this.qrData;
}

/**
 * Get template raw  data.
 *
 * @property getQRData
 * @type     String
 */
WidgetResult.prototype.getTemplateRaw = function() {
    return this.templateRaw;
}


/**
 * Converts an URI image to raw. 
 *
 * @method convertDataURIToBinary
 * @type     URIImage 
 */
function convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

module.exports.WidgetResult = WidgetResult;
