package facephi.plugin.widget;

import android.content.Intent;
import android.os.Bundle;
import android.util.Base64;


import com.facephi.fphiselphidwidgetcore.WidgetException;
import com.facephi.fphiselphidwidgetcore.WidgetExceptionType;
import com.facephi.fphiselphidwidgetcore.WidgetSelphIDConfiguration;
import com.facephi.fphiselphidwidgetcore.WidgetSelphIDDocumentSide;
import com.facephi.fphiselphidwidgetcore.WidgetSelphIDDocumentType;
import com.facephi.fphiselphidwidgetcore.WidgetSelphIDResult;
import com.facephi.fphiselphidwidgetcore.WidgetSelphIDScanMode;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;

/**
 * This class echoes a string called from JavaScript. Launches the Android User Control.
 */
public class WidgetSelphID extends CordovaPlugin {
    
    public static final String FRONT_MODE      = "Front";
    public static final String BACK_MODE       = "Back";
    public static final String WIZARD_MODE   = "Wizard";
    public static final String SHOW_TUTORIAL   = "Tutorial";
    
    public static final int FRONT_MODE_REQUEST      = 1200;
    public static final int BACK_MODE_REQUEST       = 1201;
    public static final int WIZARD_MODE_REQUEST   = 1202;
    public static final int SHOW_TUTORIAL_REQUEST   = 1203;
    
    private static final String DOCUMENTTYPE_IDCARD = "DT_IDCard";
    private static final String DOCUMENTTYPE_PASSPORT = "DT_Passport";
    
    
    public CallbackContext _callbackContext;
    public JSONArray _args = null;
    
    
    public boolean _isCordovaActivityDestroyed = false;
    
    /**
     * Entry method from Javascript code. Executes the request and returns PluginResult.
     *
     * @param action             Is used to distinguish between different method calls that users may make to your plugin.
     * @param args                 Method arguments in JSON format.
     * @param callbackContext    The callback id used when calling back into JavaScript.
     * @return                     True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
     *                             Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        _callbackContext = callbackContext;
        _args = args;
    
        if (action.equals("StartCapture")) configureUCMode(false); 
        else if (action.equals("StartTest")) configureUCMode(true); 
        else this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "The selected action is not valid."));    
        
        return true;
    }

    /**
     * Configures the user control operation and launches the activity that will execute it.
     *
     */
    private void configureUCMode(boolean isTestOperation) throws JSONException {
        
        String mode = getUCArg(_args, "operation");
        String resourcesPath = getUCArg(_args, "resourcesPath");
        String widgetLicense = getUCArg(_args, "license");
        String ocrPreviousData = getUCArg(_args, "previousOCRData");

        if(isTestOperation) {
            String testImage = getUCArg(_args, "testImage");

        }

        if (!mode.isEmpty()) {
            if (mode.equals(FRONT_MODE)) {
                WidgetSelphIDConfiguration conf = new WidgetSelphIDConfiguration();
                conf.setLicense(widgetLicense);
                conf.setDocumentSide(WidgetSelphIDDocumentSide.DSFront);
                conf.setWizardMode(false);
                conf = getUCConfiguration(conf, _args);
                if (conf.getWizardMode())
                    conf.setTokenPreviousCaptureData(null);
                else
                    conf.setTokenPreviousCaptureData(ocrPreviousData);
               
                
                conf.setResourcesPath(resourcesPath + ".zip");
                this.launchActivityUC(conf, FRONT_MODE_REQUEST);
            }
            
            if (mode.equals(BACK_MODE)) {
                WidgetSelphIDConfiguration conf = new WidgetSelphIDConfiguration();
                conf.setLicense(widgetLicense);
                conf.setDocumentSide(WidgetSelphIDDocumentSide.DSBack);
                conf = getUCConfiguration(conf, _args);
                conf.setWizardMode(false);
                conf.setResourcesPath(resourcesPath + ".zip");
                this.launchActivityUC(conf, BACK_MODE_REQUEST);
            }
            
            if (mode.equals(WIZARD_MODE)) {
                WidgetSelphIDConfiguration conf = new WidgetSelphIDConfiguration();
                conf.setLicense(widgetLicense);
                conf = getUCConfiguration(conf, _args);
                conf.setWizardMode(true);
                conf.setResourcesPath(resourcesPath + ".zip");
                this.launchActivityUC(conf, WIZARD_MODE_REQUEST);
                
            }
            if (mode.equals(SHOW_TUTORIAL)) {
                WidgetSelphIDConfiguration conf = new WidgetSelphIDConfiguration();
                conf.setLicense(widgetLicense);
                conf.setTutorialFlag(true);
                conf.setTutorialOnlyFlag(true);
                conf = getUCConfiguration(conf, _args);
                conf.setWizardMode(false);
                conf.setResourcesPath(resourcesPath + ".zip");
                launchTutorial(conf, SHOW_TUTORIAL_REQUEST);
            }
        }
    }
    
    private HashMap<String,String> convertJsonToMap(String ocrPreviousData) throws JSONException {
        
        if(ocrPreviousData == null || ocrPreviousData.isEmpty())
            return null;
        
        JSONObject obj = new JSONObject(ocrPreviousData);
        Iterator<String> keys = obj.keys();
        HashMap<String, String> map = new HashMap<String, String>();
        while(keys.hasNext()) {
            String key = keys.next();
            map.put(key, obj.optString(key));
        }
        
        return map;
    }
    

    /**
     * Launches the User Control Activity selected by the user.
     *
     * @param conf                 The User Control configuration
     * @param operation            Index of the User Control operation
     * @return                     True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
     *                             Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
     */
    private boolean launchTest(WidgetSelphIDConfiguration conf, int operation) {
        try {
            Intent intent = new Intent(cordova.getActivity().getBaseContext(), com.facephi.selphid.Widget.class);
            intent.putExtra("configuration", conf);
            PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
            r.setKeepCallback(true);
            _callbackContext.sendPluginResult(r);
            
            cordova.startActivityForResult(this, intent, operation);
        } catch (Exception exc) {
            System.err.println("Exception: " + exc.getMessage());
            _callbackContext.error(exc.getMessage());
        }
        return true;
    }

    
    /**
     * Launches the User Control Activity selected by the user.
     *
     * @param conf                 The User Control configuration
     * @param operation            Index of the User Control operation
     * @return                     True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
     *                             Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
     */
    private boolean launchActivityUC(WidgetSelphIDConfiguration conf, int operation) {
        try {
            Intent intent = new Intent(cordova.getActivity().getBaseContext(), com.facephi.selphid.Widget.class);
            intent.putExtra("configuration", conf);
            PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
            r.setKeepCallback(true);
            _callbackContext.sendPluginResult(r);
            
            cordova.startActivityForResult(this, intent, operation);
        } catch (Exception exc) {
            System.err.println("Exception: " + exc.getMessage());
            _callbackContext.error(exc.getMessage());
        }
        return true;
    }
    

    
    /**
     * Launches the User Control Activity selected by the user.
     *
     * @param conf                 The User Control configuration
     * @param operation            Index of the User Control operation
     * @return                     True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
     *                             Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
     */
    private boolean launchTutorial(WidgetSelphIDConfiguration conf, int operation) {
        // TODO
        // cordova.getActivity ().runOnUiThread (new Runnable () {
        
        try {
            Intent intent = new Intent(cordova.getActivity().getBaseContext(), com.facephi.selphid.Widget.class);
            intent.putExtra("configuration", conf);
            
            PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
            r.setKeepCallback(true);
            _callbackContext.sendPluginResult(r);
            
            cordova.startActivityForResult(this, intent, operation);
        } catch (Exception exc) {
            System.err.println("Exception: " + exc.getMessage());
            _callbackContext.error(exc.getMessage());
        }
        return true;
    }
    
    /**
     * Processes the activity result from the User Control.
     *
     * @param requestCode         Code Request
     * @param resultCode        Operation code
     * @param data                Result of the User Control
     */
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        try {
            
            if(_isCordovaActivityDestroyed) {
                return;
            }
            
            if(requestCode == 103) // Tutorial
                return;
            
            if (requestCode == -1) {
                this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
                return;
            }
            
            if (data == null) {
                this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
                return;
            }
            
            WidgetSelphIDResult ucResult = data.getParcelableExtra("result");
            OutputBundleSelphID output = new OutputBundleSelphID(ucResult);
            
            if (ucResult == null) {
                // Toast.makeText(cordova.getActivity().getBaseContext(), cordova.getActivity().getResources().getString(R.string.message_no_results), Toast.LENGTH_LONG).show();
                this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
                return;
            }
            
            // at last call sendPluginResult
            if(output._finishStatus == 2) { // Es un error. Se envía al evento de error.
                this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, output.ReturnOutputJSON(ucResult.getCaptureProgress())));
            }
            else { // Ha salido sin producirse un error en el control de usuario, se gestiona en el evento de acierto.
                this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, output.ReturnOutputJSON(ucResult.getCaptureProgress())));
            }
        } catch (Exception exc) {
            System.err.println("Exception: " + exc.getMessage());
            this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, new String()));
            this._callbackContext.error(exc.getMessage());
        }
    }
    
    
    /**
     * Processes the JSON input argument and gets the execution mode of the User Control.
     *
     * @param args        JSON array with input arguments.
     * @return             Mode of the user control
     */
    private String getUCArg(JSONArray args, String argId) throws JSONException {
        if(args == null || args.length() == 0)
            return "";
        
        JSONObject actualObject = args.getJSONObject(0);
        
        Iterator iterator = actualObject.keys();
        while(iterator.hasNext()){
            String key = (String)iterator.next();
            if(key.equalsIgnoreCase(argId)) {
                String issue = actualObject.getString(key);
                return issue;
            }
        }
        return "";
    }
    
    
    
    
    /**
     * Processes the JSON input argument and sets the configuration of the User Control.
     *
     * @param args        JSON array with input arguments.
     * @return             Configuration of the user control
     */
    private WidgetSelphIDConfiguration getUCConfiguration(WidgetSelphIDConfiguration conf, JSONArray args) throws JSONException {
        if(args == null || args.length() == 0)
            return conf;
        
        JSONObject actualObject = args.getJSONObject(0);
        
        Iterator iterator = actualObject.keys();
        while(iterator.hasNext()) {
            String key = (String) iterator.next();
            if (key.equalsIgnoreCase("config")) {
                JSONObject issue = actualObject.getJSONObject(key);
                boolean debug = issue.optBoolean("debug");
                conf.setDebug(debug);
                
                boolean fullscreen = issue.optBoolean("fullscreen", true);
                conf.setFullscreen(fullscreen);
                
                boolean isFrontalCamera = issue.optBoolean("frontalCameraPreferred", true);
                if (isFrontalCamera)
                    conf.setFrontFacingCameraAsPreferred();
                else
                    conf.setBackFacingCameraAsPreferred();
                
                String locale = issue.optString("locale");
                if (locale != null && !locale.equalsIgnoreCase("null")) conf.setLocale(locale);
                
                boolean showResultAfterCapture = issue.optBoolean("showResultAfterCapture");
                conf.setShowAfterCapture(showResultAfterCapture);
                
                double tokenImageQuality = issue.optDouble("tokenImageQuality", 0.8);
                conf.setTokenImageQuality((float)tokenImageQuality);
                                
                String scanMode = issue.optString("scanMode");
                if (scanMode == null)
                    conf.setScanMode(WidgetSelphIDScanMode.SMGeneric);
                else if (scanMode.equalsIgnoreCase("Generic")) {
                    conf.setScanMode(WidgetSelphIDScanMode.SMGeneric);
                } else if (scanMode.equalsIgnoreCase("Specific")) {
                    conf.setScanMode(WidgetSelphIDScanMode.SMSpecific);
                } else if (scanMode.equalsIgnoreCase("Search")) {
                    conf.setScanMode(WidgetSelphIDScanMode.SMSearch);
                } else {
                    conf.setScanMode(WidgetSelphIDScanMode.SMGeneric);
                }
                
                String specificData = issue.optString("specificData");
                if (specificData != null && !specificData.equalsIgnoreCase("null"))
                    conf.setSpecificData(specificData);

                String documentType = issue.optString("documentType");
                if (documentType == null)
                    conf.setDocumentType(WidgetSelphIDDocumentType.DTIDCard);
                else if (documentType.equalsIgnoreCase(DOCUMENTTYPE_PASSPORT)) {
                    conf.setDocumentType(WidgetSelphIDDocumentType.DTPassport);
                } else if (documentType.equalsIgnoreCase(DOCUMENTTYPE_IDCARD)) {
                    conf.setDocumentType(WidgetSelphIDDocumentType.DTIDCard);
                } else {
                    conf.setDocumentType(WidgetSelphIDDocumentType.DTIDCard);
                }

                boolean wizardMode = issue.optBoolean("wizardMode");
                conf.setWizardMode(wizardMode);

                boolean showTutorial = issue.optBoolean("showTutorial");
                conf.setTutorialFlag(showTutorial);
            }
        }
        return conf;
    }
    
    
    /**
     * Called when the Activity is being destroyed (e.g. if a plugin calls out to an
     * external Activity and the OS kills the CordovaActivity in the background).
     * The plugin should save its state in this method only if it is awaiting the
     * result of an external Activity and needs to preserve some information so as
     * to handle that result; onRestoreStateForActivityResult() will only be called
     * if the plugin is the recipient of an Activity result
     *
     * @return  Bundle containing the state of the plugin or null if state does not
     *          need to be saved
     */
    public Bundle onSaveInstanceState() {
        return null;
    }
    
    /**
     * Called when a plugin is the recipient of an Activity result after the
     * CordovaActivity has been destroyed. The Bundle will be the same as the one
     * the plugin returned in onSaveInstanceState()
     *
     * @param state             Bundle containing the state of the plugin
     * @param errorCallbackContext   Replacement Context to return the plugin result to
     */
    public void onRestoreStateForActivityResult(Bundle state, CallbackContext errorCallbackContext) {
        this._isCordovaActivityDestroyed = true;
        WidgetSelphIDResult ucResult = new WidgetSelphIDResult();
        ucResult.setException(new WidgetException(WidgetExceptionType.HardwareError));
        OutputBundleSelphID _outputBundle = new OutputBundleSelphID(ucResult);
        
        try {
            errorCallbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, _outputBundle.ReturnOutputJSON(ucResult.getCaptureProgress())));
            this._callbackContext = errorCallbackContext;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        
        return;
        
    }
}
