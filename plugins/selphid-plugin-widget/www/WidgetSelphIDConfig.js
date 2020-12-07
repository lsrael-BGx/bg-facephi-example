    /**
     * Modifies the Widget configuration.
     * @param Boolean debug         enables or disables the Widget debug options.
     * @param Boolean showResultAfterCapture         If it is true, after document side capture the widget show the result and ask you if you want to repeat the process.
     * @param Double  showTutorial   If it is true, then the tutorial will be showed before the operation process.
     * @param WidgetSelphIDScanMode  scanMode  Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
     * @param String  locale  the localization (example: ES_es)
     * @param WidgetSelphIDDocumentType documentType IDCARD: Scans searching country id documents, PASSPORT: Scans searching passport documents.
     */
    WidgetSelphIDConfig = function () {
        this.debug = false;
        this.showResultAfterCapture = true;
        this.showTutorial = true;
        this.scanMode = "Generic";
        this.specificData = null;
        this.locale = null;
        this.fullscreen = true;
        this.documentType = "DT_IDCard";
    }

	
   /**
    * Sets the localisation (example: ES_es)
    */
    WidgetSelphIDConfig.prototype.setLocale = function (locale) {
        this.locale = locale;
    }



/**
 * Sets the localisation (example: ES_es)
 */
WidgetSelphIDConfig.prototype.setFullscreen = function (fullscreen) {
    this.fullscreen = fullscreen;
}


  /**
   * If it is true, after document side capture the widget show the result and ask you if you want to repeat the process.
   *
   * @property getShowResultAfterCapture
   * @type   Boolean
   * @default false
   */
    WidgetSelphIDConfig.prototype.getShowResultAfterCapture = function () {
        return this.showResultAfterCapture;
    }

   /**
    * If it is true, then the tutorial will be showed before the operation process.
    *
    * @property getShowTutorial
    * @type   Boolean
    * @default true
    */
    WidgetSelphIDConfig.prototype.getShowTutorial = function () {
        return this.showTutorial;
    }

   /**
    * Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
    *
    * @property getScanMode
    * @type   WidgetSelphIDScanMode
    * @default Generic
    */
    WidgetSelphIDConfig.prototype.getScanMode = function () {
        return this.scanMode;
    }


   /**
    * Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
    *
    * @property getScanMode
    * @type   WidgetSelphIDScanMode
    * @default Generic
    */
   WidgetSelphIDConfig.prototype.getDocumentType = function () {
    return this.documentType;
}

  /**
   * Gets the specific type of document to scan if the scan mode is 'Specific'
   *
   * @property getSpecificData
   * @type   Boolean
   * @default false
   */
    WidgetSelphIDConfig.prototype.getSpecificData = function () {
        return this.specificData;
    }

   /**
    * Sets the specific type of document to scan if the scan mode is 'Specific'
    */
    WidgetSelphIDConfig.prototype.setSpecificData = function (specificData) {
        this.specificData = specificData;
    }



   /**
    * Sets the debug mode enabled or disabled
    *
    * @property setDebug
    * @type   Boolean
    * @default false
    */
    WidgetSelphIDConfig.prototype.setDebug = function (_debug) {
        checkType(_debug, ['boolean']);
        this.debug = _debug;
    }
	
	
   /**
    * If it is true, after document side capture the widget show the result and ask you if you want to repeat the process.
    *
    * @property setShowResultAfterCapture
    * @type   Boolean
    * @default false
    */
    WidgetSelphIDConfig.prototype.setShowResultAfterCapture = function (_showResultAfterCapture) {
        checkType(_showResultAfterCapture, ['boolean']);
        this.showResultAfterCapture = _showResultAfterCapture;
    }

   /**
    * If it is true, then the tutorial will be showed before the operation process.
    *
    * @property setShowTutorial
    * @type   Double
    * @default 1.0
    */
    WidgetSelphIDConfig.prototype.setShowTutorial = function (_showTutorial) {
        checkType(_showTutorial, ['boolean']);
        this.showTutorial = _showTutorial;
    }

   /**
    * Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
    *
    * @property setScanMode
    * @type   String
    * @default Generic
    */
    WidgetSelphIDConfig.prototype.setScanMode = function (_scanMode) {
        this.scanMode = _scanMode;
    }

    /**
    * Generic: Scans the document using a generic template, Specific: Scans the document using a specific template based in the country code, Search: Scans the document using all the templates and detecting which fits best.
    *
    * @property setScanMode
    * @type   String
    * @default Generic
    */
   WidgetSelphIDConfig.prototype.setDocumentType = function (_documentType) {
        this.documentType = _documentType;
    }


   /** 
    * Returns params in JSON string format
    *
    * @method toString 
    * @return String Widget params JSON structure in string format 
    */
    WidgetSelphIDConfig.prototype.toString = function () {
        this.specificData = null;
		this.fullscreen = true;
		this.enableLiveness = false;
		this.locale = null;
        var output =
               [{ "debug": +String(this.debug) },
                { "showResultAfterCapture": +String(this.showResultAfterCapture) },
                { "showTutorial": +String(this.showTutorial) },
                { "scanMode": +String(this.scanMode) },
                { "documentType": +String(this.documentType) },
                { "specificData": +String(this.specificData) },
                { "fullscreen": +String(this.fullscreen) },
		{ "locale": +String(this.locale)}]

        return JSON.stringify(output);
    }


   
    function typeOf(obj) {
        return {}.toString.call(obj).match(/\s(\w+)/)[1].toLowerCase();
    }


    var binArrayToJson = function(binArray)
	{
		var decoder = new TextDecoder('utf8');
		return btoa(decoder.decode(binArray));
	}



   /** 
    * Checks if the param type is correct
    *
    * @method checkType 
    * @throws TypeError Throws a type error exception if the type is not correct.
    */
    function checkType(args, types) {
        // args = [].slice.call(args);
        for (var i = 0; i < types.length; ++i) {
            if (typeOf(args) != types[i]) {
                throw new TypeError('param ' + i + ' must be of type ' + types[i]);
            }
        }
    }


    module.exports.WidgetSelphIDConfig = WidgetSelphIDConfig;
