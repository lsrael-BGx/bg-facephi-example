/**
 * Encapsulates the Widget response. 
 *
 * @class WidgetSelphIDResults
 * @constructor
 * @param String resultJSON Widget response in JSON format
 */
WidgetSelphIDResults = function (resultJSON) {
    checkTypes(resultJSON, ['string']);
    var obj = JSON.parse(resultJSON);
    this.finishStatus = obj.finishStatus;   
    this.frontDocumentImage = obj.frontDocumentImage;
    this.backDocumentImage = obj.backDocumentImage;
    this.faceImage = obj.faceImage;
    this.rawBackDocumentImage = obj.rawBackDocumentImage;
    this.rawFrontDocumentImage = obj.rawFrontDocumentImage;
    this.signatureImage = obj.signatureImage;
    this.fingerprintImage = obj.fingerprintImage;
    this.tokenOCR = obj.tokenOCR;
    this.tokenFaceImage = obj.tokenFaceImage;
    this.tokenFrontDocument = obj.tokenFrontDocument;
    this.tokenBackDocument = obj.tokenBackDocument;
    this.tokenRawFrontDocument = obj.tokenRawFrontDocument;
    this.tokenRawBackDocument = obj.tokenRawBackDocument;
    this.documentData = JSON.parse(obj.documentData);
    this.errorType = obj.errorType;
    this.errorMessage = obj.errorMessage;
    this.timeoutStatus = obj.timeoutStatus;
    this.documentCaptured = obj.documentCaptured;

}

/**
 * Gets the final status of the Widget process.  
 *
 * @property getFinishStatus
 * @type     WidgetFinishStatus
 */
WidgetSelphIDResults.prototype.getFinishStatus = function() {
    return this.finishStatus;
}

/**
 * Gets all the data obtained during the scan process. 
 *
 * @property getDocData
 * @type     JSONString
 */
WidgetSelphIDResults.prototype.getDocumentData = function() {
    return this.documentData;
}


/**
 * Gets all the data obtained during the scan process. 
 *
 * @property getDocData
 * @type     JSONString
 */
WidgetSelphIDResults.prototype.getDocumentCaptured = function() {
    return this.documentCaptured;
}

/**
 * Gets the type of the error if exists. 
 *
 * @property getErrorType
 * @type     WidgetErrorType 
 */
WidgetSelphIDResults.prototype.getErrorType = function() {
    return this.errorType;
}

/**
 * Gets the message error if exists or null. 
 *
 * @property getErrorMessage
 * @type     String 
 */
WidgetSelphIDResults.prototype.getErrorMessage = function() {
    return this.errorMessage;
}

/**
 * Gets the document front image in base64 format. 
 *
 * @property getFrontDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getFrontDocumentImageToBase64 = function() {
    return this.frontDocumentImage;
}

/**
 * Gets the document back image in base64 format. 
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64 
 */
WidgetSelphIDResults.prototype.getBackDocumentImageToBase64 = function() {
    return this.backDocumentImage;
}

/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getSignatureImageToBase64 = function() {
    return this.signatureImage;
}

/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getFingerprintImageToBase64 = function() {
    return this.fingerprintImage;
}


/**
 * Gets the document front image in URI format. 
 *
 * @property getFrontDocumentImageToURI
 * @type     URIImage 
 */
WidgetSelphIDResults.prototype.getFrontDocumentImageToURI = function() {
    if(this.frontDocumentImage) {
    	var frontImg = new Image();
        frontImg.src = obj.frontDocumentImage; // Format: 'data:image/png;base64,iVBORw0K...'; This format can be used directly in a HTML <img> tag.
	return frontImg;
    }
    return null;
}


/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getTokenOCR = function() {
    return this.tokenOCR;
}



/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getTokenFaceImage = function() {
    return this.tokenFaceImage;
}


/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getTokenFrontDocument = function() {
    return this.tokenFrontDocument;
}


/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getTokenBackDocument = function() {
    return this.tokenBackDocument;
}


/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getTokenRawFrontDocument = function() {
    return this.tokenRawFrontDocument;
}


/**
 * Gets the document back image in base64 format.
 *
 * @property getBackDocumentImageToBase64
 * @type     ImageBase64
 */
WidgetSelphIDResults.prototype.getTokenRawBackDocument = function() {
    return this.tokenRawBackDocument;
}


/**
 * Gets the document back image in URI format. 
 *
 * @property getBackDocumentImageToURI
 * @type     URIImage 
 */
WidgetSelphIDResults.prototype.getBackDocumentImageToURI = function() {
    if(this.backDocumentImage) {
    	var backImg = new Image();
        backImg.src = obj.backDocumentImage; // Format: 'data:image/png;base64,iVBORw0K...'; This format can be used directly in a HTML <img> tag.
	return backImg;
    }
    return null;
}


WidgetSelphIDResults.prototype.getTimeoutStatus = function() {
	return this.timeoutStatus;
}


module.exports.WidgetSelphIDResults = WidgetSelphIDResults;
