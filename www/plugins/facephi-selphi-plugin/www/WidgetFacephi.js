cordova.define("facephi-selphi-plugin.WidgetFacephi", function(require, exports, module) {
var exec = require('cordova/exec');

    /**
     * Calls the native code of the Widget Plugin. 
     * @param Callback successCallback	The callback for the success event.
	 * @param Callback errorCallback 	The callback for the error event.
     * @param WidgetMode   mode             The operation of the Widget execution.
     * @param WidgetConfig config           Optional parameter. Aditional configuration params for the widget.
	 */
     StartWidget = function (successCallback, errorCallback, mode, resourcesPath, config) {

        try {

            actualConfig = [];
            action = mode;
            switch (arguments.length) {
                case 5:
                    actualConfig = [{ "mode": mode, "resourcesPath": resourcesPath , "config": config }];
                    break;
                default:
                    throw "Incorrect number of parameter";
            }

            exec(
                successCallback, // success callback function
                errorCallback, // error callback function
                'WidgetFacephi', // mapped to our native Java class called "WidgetFacephi"
                'StartWidget', // with this action name
                actualConfig
                );

        } catch (e) {
            throw e;
        }
    };



    /**
     * Calls the native code of the Widget Plugin. 
     * @param Callback successCallback	The callback for the success event.
	 * @param Callback errorCallback 	The callback for the error event.
     * @param WidgetMode   mode             The operation of the Widget execution.
     * @param WidgetConfig config           Optional parameter. Aditional configuration params for the widget.
	 */
    GenerateTemplateRaw = function (successCallback, errorCallback, imageBase64) {

        try {

            actualConfig = [];

            switch (arguments.length) {
                case 3:
                    actualConfig = [{ "templateRaw": imageBase64}];
                    break;
                default:
                    throw "Incorrect number of parameter";
            }
        
            exec(
                successCallback, // success callback function
                errorCallback, // error callback function
                'WidgetFacephi', // mapped to our native Java class called "WidgetFacephi"
                'GenerateTemplateRaw', // with this action name
                actualConfig
                );

        } catch (e) {
            throw e;
        }
    };
    
    module.exports.GenerateTemplateRaw = GenerateTemplateRaw;
    module.exports.StartWidget = StartWidget;
});
