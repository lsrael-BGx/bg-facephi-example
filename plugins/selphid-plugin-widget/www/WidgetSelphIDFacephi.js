var exec=require("cordova/exec");   
   /**
     * Calls the native code of the Widget SelphID Plugin. 
     * @param Callback successCallback		The callback for the success event.
     * @param Callback errorCallback 		The callback for the error event.
     * @param WidgetSelphIDOperation operation  The operation of the Widget execution.
     * @param String resourcesPath 		Name of the resources bundle used by the plugin.
     * @param String license 			Widget license formatted in base64.
     * @param WidgetSelphIDConfig config        Optional parameter. Aditional configuration params for the widget.
     */
     StartCapture = function (successCallback, errorCallback, operation, resourcesPath, license, previousOCRData, config) {
       
        try {
            actualConfig = [];
            action = operation;

            switch (arguments.length) {
                case 6:
                    if(previousOCRData == null)
                        actualConfig = [{ "operation": operation, "resourcesPath": resourcesPath, "license": license }];
                    else
                        actualConfig = [{ "operation": operation, "resourcesPath": resourcesPath, "license": license, "previousOCRData": previousOCRData }];
                    break;

                case 7:
                    if(previousOCRData == null)
                        actualConfig = [{ "operation": operation, "resourcesPath": resourcesPath, "license": license, "config": config }];
                    else
                    actualConfig = [{ "operation": operation, "resourcesPath": resourcesPath , "license": license, "previousOCRData": previousOCRData, "config": config }];
                    break;
                default:
                    break;
            }
        } catch (e) {
        }

        exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'WidgetSelphID', // mapped to our native Java class called "WidgetSelphIDFacephi"
            'StartCapture', // with this action name
            actualConfig
        );
    };

    StartTest = function (successCallback, errorCallback, operation, resourcesPath, license, previousOCRData, config, testImage) {

        actualConfig = [];
        action = operation;

            if(previousOCRData == null)
                actualConfig = [{ "operation": operation, "resourcesPath": resourcesPath , "license": license, "previousOCRData": previousOCRData, "config": config }];
            else
                actualConfig = [{ "operation": operation, "resourcesPath": resourcesPath , "license": license, "previousOCRData": previousOCRData, "config": config,  "testImage": testImage}];

        exec(
            successCallback, // success callback function
            errorCallback, // error callback function
            'WidgetSelphID', // mapped to our native Java class called "WidgetSelphIDFacephi"
            'StartTest', // with this action name
            actualConfig
        );
        
    };

    module.exports.StartTest = StartTest;
    module.exports.StartCapture = StartCapture;