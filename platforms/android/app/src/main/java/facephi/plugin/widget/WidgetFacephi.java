package facephi.plugin.widget;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Base64;

import com.facephi.fphiwidgetcore.WidgetConfiguration;
import com.facephi.fphiwidgetcore.WidgetLivenessMode;
import com.facephi.fphiwidgetcore.WidgetMode;
import com.facephi.fphiwidgetcore.WidgetResult;
import com.facephi.fphiwidgetcore.WidgetException;
import com.facephi.fphiwidgetcore.WidgetExceptionType;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Iterator;

/**
 * This class echoes a string called from JavaScript. Launches the Android User Control.
 */
public class WidgetFacephi extends CordovaPlugin {

	public static final String WIZARD_REG      = "Register";
	public static final String AUTHENTICATE    = "Authenticate";
	public static final String SHOW_TUTORIAL    = "ShowTutorial";
	public static final String GENERATE_TEMPLATE_RAW = "GenerateTemplateRaw";

	public CallbackContext _callbackContext;
    public JSONArray _args = null;

    private float _jpgQuality = 0.8f;
	public boolean _isCordovaActivityDestroyed = false;

	/**
	 * Entry method from Javascript code. Executes the request and returns PluginResult.
	 *
	 * @param action	 		Is used to distinguish between different method calls that users may make to your plugin.
	 * @param args		 		Method arguments in JSON format.
	 * @param callbackContext	The callback id used when calling back into JavaScript.
	 * @return 					True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
	 * 							Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
	 */
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        _callbackContext = callbackContext;
		_args = args;
		if(action.equals("StartWidget"))
			configureUCMode(); 
		else if(action.equals(GENERATE_TEMPLATE_RAW)) 
		{
			try {
				generateTemplateRaw(getUCArg(_args, "templateRaw"));
			} catch (Exception e) {
				System.err.println("Exception: " + e.getMessage());
				_callbackContext.error(e.getMessage());
			}
		}

        return true;
    }

	/**
	 * Configures the user control operation and launches the activity that will execute it.
	 *
	 */
    private void configureUCMode() throws JSONException {
		String mode = getUCArg(_args, "mode");
		String resourcesPath = getUCArg(_args, "resourcesPath");
		if(!mode.isEmpty()) {
			if (mode.equals(WIZARD_REG)) {
				WidgetConfiguration conf = new WidgetConfiguration(WidgetMode.Register, resourcesPath + ".zip");
				conf = getUCConfiguration(conf, _args);
				this.launchActivityUC(conf, 100);
			}

			if (mode.equals(AUTHENTICATE)) {
				WidgetConfiguration conf = new WidgetConfiguration(WidgetMode.Authenticate, resourcesPath + ".zip");
				conf = getUCConfiguration(conf, _args);
				this.launchActivityUC(conf, 101);
			} if (mode.equals(SHOW_TUTORIAL)) {
				WidgetConfiguration conf = new WidgetConfiguration();
				conf = getUCConfiguration(conf, _args);
				conf.setResourcesPath(resourcesPath + ".zip");
				launchTutorial(conf, 102);
			}
		}
	}
	
	private void generateTemplateRaw(String imageBase64) {
		Bitmap bmpImage = ImageUtils.toBitmap(imageBase64);
		byte[] bestImageTemplate = WidgetConfiguration.generateTemplateRawFromBitmap(bmpImage);
		this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, ImageUtils.toBase64(bestImageTemplate)));
	}


	 /**
	 * Launches the User Control Activity selected by the user.
	 *
	 * @param conf	 			The User Control configuration
	 * @param operation			Index of the User Control operation
	 * @return 					True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
	 * 							Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
	 */
	private boolean launchActivityUC(WidgetConfiguration conf, int operation) {
		// TODO
		// cordova.getActivity ().runOnUiThread (new Runnable () {

		try {
			Intent intent = new Intent(cordova.getActivity().getBaseContext(), com.facephi.selphi.Widget.class);
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
	 * @param conf	 			The User Control configuration
	 * @param operation			Index of the User Control operation
	 * @return 					True if plugin handles a particular action, and "false" otherwise. Note that this does indicate the success or failure of the handling.
	 * 							Indicating success is failure is done by calling the appropriate method on the callbackContext. While our code only passes back a message
	 */
	private boolean launchTutorial(WidgetConfiguration conf, int operation) {
		// TODO
		// cordova.getActivity ().runOnUiThread (new Runnable () {

		/*try {
			Intent intent = new Intent(cordova.getActivity().getBaseContext(), com.facephi.fphiwidgetcore.FPhiWidgetAndroid.tutorial.TutorialActivity.class);
			intent.putExtra("configuration", conf);

			PluginResult r = new PluginResult(PluginResult.Status.NO_RESULT);
			r.setKeepCallback(true);
			_callbackContext.sendPluginResult(r);

			cordova.startActivityForResult(this, intent, operation);
		} catch (Exception exc) {
			System.err.println("Exception: " + exc.getMessage());
			_callbackContext.error(exc.getMessage());
		}*/
		return true;
	}

	/**
	 * Processes the activity result from the User Control.
	 *
	 * @param requestCode	 	Code Request
	 * @param resultCode		Operation code
	 * @param data				Result of the User Control
	 */
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		try {

			// Gestionar WRITE_SETTINGS permission
			/*if (requestCode == 1500 && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
				if (!Settings.System.canWrite(cordova.getActivity())) {
					OutputBundle output = new OutputBundle(UserControlExceptionType.SettingsPermissionDenied);
					_callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, output.ReturnOutputJSON()));
					return;
				} else {
					requestPermissions(2000);
				}
			}*/

			if(_isCordovaActivityDestroyed) {
				return;
			}

			if(requestCode == 102)
				return;

			if (requestCode == -1) {
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
				return;
			}

			if (data == null) {
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
				return;
			}

			WidgetResult ucResult = data.getParcelableExtra("result");
			OutputBundle output = new OutputBundle(ucResult, _jpgQuality);

			if (ucResult == null) {
				// Toast.makeText(cordova.getActivity().getBaseContext(), cordova.getActivity().getResources().getString(R.string.message_no_results), Toast.LENGTH_LONG).show();
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,  new String()));
				return;
			}

			// at last call sendPluginResult
			if(output._finishStatus == 2) { // Es un error. Se envía al evento de error.
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, output.ReturnOutputJSON()));
			}
			else { // Ha salido sin producirse un error en el control de usuario, se gestiona en el evento de acierto.
				this._callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, output.ReturnOutputJSON()));
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
	 * @param args		JSON array with input arguments.
	 * @return 			Mode of the user control
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
	 * @param args		JSON array with input arguments.
	 * @return 			Configuration of the user control
	 */
	private WidgetConfiguration getUCConfiguration(WidgetConfiguration conf, JSONArray args) throws JSONException {
		if(args == null || args.length() == 0)
			return conf;

		JSONObject actualObject = args.getJSONObject(0);

		Iterator iterator = actualObject.keys();
		while(iterator.hasNext()){
			String key = (String)iterator.next();
			if(key.equalsIgnoreCase("config")) {
				JSONObject issue = actualObject.getJSONObject(key);
				boolean enableImages = issue.optBoolean("enableImages");
				double sceneTimeout = issue.optDouble("sceneTimeout");
				double cropPercent = issue.optDouble("cropPercent");
				double jpgQuality = issue.optDouble("jpgQuality");
				boolean debug = issue.optBoolean("debug");
				boolean crop = issue.optBoolean("crop");
				boolean fullscreen = issue.optBoolean("fullscreen");
				boolean stabilizationMode = issue.optBoolean("stabilizationMode", false);
				boolean templateRawOptimized = issue.optBoolean("templateRawOptimized", false);

				if(issue.has("desiredCameraWidth"))
					conf.setParam("DesiredCameraWidth", String.valueOf(issue.optInt("desiredCameraWidth")));
				if(issue.has("desiredCameraHeight"))
					conf.setParam("DesiredCameraHeight",  String.valueOf(issue.optInt("desiredCameraHeight")));

				String livenessMode = issue.optString("livenessMode");
				if(livenessMode.equalsIgnoreCase("BLINK")) conf.setLivenessMode(WidgetLivenessMode.LIVENESS_BLINK);
				else if(livenessMode.equalsIgnoreCase("MOVE")) conf.setLivenessMode(WidgetLivenessMode.LIVENESS_MOVE);
				else if(livenessMode.equalsIgnoreCase("PASSIVE")) {
					conf.setParam("DesiredCameraWidth", "1280");
					conf.setParam("DesiredCameraHeight", "720");
					conf.setLivenessMode(WidgetLivenessMode.LIVENESS_PASSIVE);
				}
				else conf.setLivenessMode(WidgetLivenessMode.LIVENESS_NONE);


				String locale = issue.optString("locale");
				String qrValidatorExpression = issue.optString("qrValidatorExpression");
				boolean isFrontalCamera = issue.optBoolean("frontalCameraPreferred", true);

				if(isFrontalCamera)
					conf.setFrontFacingCameraAsPreferred();
				else
					conf.setBackFacingCameraAsPreferred();

				String userTagsStr = issue.optString("uTags", null);
				byte[] userTags = null;
				if(userTagsStr != null && !userTagsStr.isEmpty()) {
					userTags = Base64.decode(userTagsStr, Base64.DEFAULT);
					conf.setUserTags(userTags);
				}

				conf.setFullscreen(fullscreen);
				conf.setJPGQuality((float)jpgQuality);
				_jpgQuality = (float)jpgQuality;
				
				if(locale != null && !locale.equalsIgnoreCase("null")) conf.setLocale(locale);
				if (!qrValidatorExpression.isEmpty()) {
					facephi.plugin.widget.QRValidator.evaluatorReg = qrValidatorExpression;
					conf.setIFPhiWidgetQR_classname("facephi.plugin.usercontrol.QRValidator");
				}

				conf.setStabilizationMode(stabilizationMode);
				conf.setTemplateRawOptimized(templateRawOptimized);

				conf.logImages(enableImages);
				conf.setSceneTimeout((float)sceneTimeout);
				if(conf.getExtractionConfig() != null) conf.getExtractionConfig().setCropImagePercent((float)cropPercent);
				if(conf.getExtractionConfig() != null) conf.getExtractionConfig().setCropImageDebug(crop);
				conf.setDebug(debug);

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
		WidgetResult ucResult = new WidgetResult();
		ucResult.setException(new WidgetException(WidgetExceptionType.HardwareError));
		OutputBundle _outputBundle = new OutputBundle(ucResult, _jpgQuality);

		try {
			errorCallbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, _outputBundle.ReturnOutputJSON()));
			this._callbackContext = errorCallbackContext;
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return;

	}
}
