package facephi.plugin.widget;

import android.graphics.Bitmap;
import android.util.Base64;

import com.facephi.fphiselphidwidgetcore.WidgetExceptionType;
import com.facephi.fphiselphidwidgetcore.WidgetSelphIDResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Random;

/**
 * @description Encapsulates the User Control Result.
 */
public class OutputBundleSelphID {
    
    public int _finishStatus = 1;
    private int _errorDiagnostic = 2;
    private int _timeoutStatus = -1;

    private String _errorMessage = null;
    
    private String _documentCaptured = null;
    private String _frontDocumentImage = null;
    private String _backDocumentImage = null;
    private String _faceImage = null;
    private String _rawFrontDocument = null;
    private String _rawBackDocument = null;
    private String _signatureImage = null;
    private String _fingerprintImage = null;
    
    private String _tokenOCR = null;
    private String _tokenFaceImage = null;
    private String _tokenFrontDocument = null;
    private String _tokenBackDocument = null;
    private String _tokenRawFrontDocument = null;
    private String _tokenRawBackDocument = null;
    
    private String _documentData = null;
    private float _matchingSidesScore = 0.0f;
    
    
    /**
     * @description Default overloaded. Process the User Control result exception.
     * @param exceptionType User Control Exception type if exists.
     */
    public OutputBundleSelphID(WidgetExceptionType exceptionType) {
        switch (exceptionType) {
            case StoppedManually:
                _finishStatus = 3; // CancelByUser
                _errorDiagnostic = 2; // NoError
                break;
            case Timeout:
                _finishStatus = 4; // Timeout
                _errorDiagnostic = 2; // NoError
                break;
            case None:
                _finishStatus = 1; // Ok
                _errorDiagnostic = 2; // NoError
                break;
            case CameraPermissionDenied:
                _finishStatus = 2; // Error
                _errorDiagnostic = 3; // CameraPermissionDenied
                break;
            case SettingsPermissionDenied:
                _finishStatus = 2; // Error
                _errorDiagnostic = 4; // SettingsPermissionDenied
                break;
            case HardwareError:
                _finishStatus = 2; // Error
                _errorDiagnostic = 5; // HardwareError
                break;
            default:
                _finishStatus = 2; // Error
                _errorDiagnostic = 1; // UnknownError
                break;
        }
        // _documentCaptured = null;
    }
    
    /**
     * @description Default constructor. Process the User Control result and encapsulates his values
     * @param result Control result
     */
    public OutputBundleSelphID(WidgetSelphIDResult result) {
        if (result.getException() != null) {
            if (result.getException().getExceptionType() != null) {
                switch (result.getException().getExceptionType()) {
                case StoppedManually:
                    _finishStatus = 3; // CancelByUser
                    _errorDiagnostic = 2; // NoError
                    return;
                case Timeout:
                    _finishStatus = 4; // Timeout
                    _errorDiagnostic = 2; // NoError
                    return;
                case None:
                    _finishStatus = 1; // Ok
                    _errorDiagnostic = 2; // NoError
                    break;
                case CameraPermissionDenied:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 3; // CameraPermissionDenied
                    return;
                case SettingsPermissionDenied:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 4; // SettingsPermissionDenied
                    return;
                case HardwareError:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 5; // HardwareError
                    return;
                case ExtractionLicenseError:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 6; // ExtractionLicenseError
                    return;
                case UnexpectedCaptureError:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 7; // UnexpectedCaptureError
                    return;
                case ControlNotInitializedError:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 8; // ControlNotInitializedError
                    return;
                case BadExtractorConfiguration:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 9; // ControlNotInitializedError
                    return;
                default:
                    _finishStatus = 2; // Error
                    _errorDiagnostic = 1; // UnknownError
                    return;
                }
            } else {
                _finishStatus = 2; // Error
                _errorDiagnostic = 1; // UnknownError
                _errorMessage = result.getException().getMessage();
                return;
            }
        }
        
        
        //_documentCaptured = processPicture(result.);

        _timeoutStatus = result.getCaptureProgress();
        _frontDocumentImage = processPicture(result.getDocumentFrontImage());
        _backDocumentImage = processPicture(result.getDocumentBackImage());
        _faceImage = processPicture(result.getFaceImage());
        _rawFrontDocument = processPicture(result.getRawDocumentFrontImage());
        _rawBackDocument = processPicture(result.getRawDocumentBackImage());
        _signatureImage = processPicture(result.getSignatureImage());
        _fingerprintImage = processPicture(result.getFingerprintImage());

        _tokenOCR = result.getTokenOCR();
        _tokenFaceImage = result.getTokenFaceImage();
        _tokenFrontDocument = result.getTokenFrontDocument();
        _tokenBackDocument  = result.getTokenBackDocument();
        _tokenRawFrontDocument = result.getTokenRawFrontDocument();
        _tokenRawBackDocument = result.getTokenRawBackDocument();
        
        if (result.ocrResults != null)
            _documentData = (new JSONObject(result.ocrResults)).toString();
        
        _documentCaptured = result.getDocumentCaptured();
		_matchingSidesScore = result.getMatchingSidesScore();
    }
    
    
    /**
     * @description Sets the results message.
     *
     * @param errorMessage The error message.
     */
    public void setResultMessage(String errorMessage) {
        _errorMessage = errorMessage;
    }
    
    /**
     * @description Result output values in JSON format.
     */
    public JSONObject ReturnOutputJSON(int timeoutStatus) throws JSONException {
        JSONObject result = new JSONObject();
        
        result.put("finishStatus", _finishStatus);
        result.put("errorType", _errorDiagnostic);
        result.put("errorMessage", _errorMessage);
        result.put("timeoutStatus", timeoutStatus);
        
        if(_frontDocumentImage != null) result.put("frontDocumentImage", _frontDocumentImage);
        if(_backDocumentImage != null) result.put("backDocumentImage", _backDocumentImage);
        if(_faceImage != null) result.put("faceImage", _faceImage);
        if(_rawFrontDocument != null) result.put("rawFrontDocument", _rawFrontDocument);
        if(_rawBackDocument != null) result.put("rawBackDocument", _rawBackDocument);
        if(_signatureImage != null) result.put("signatureImage", _signatureImage);
        if(_fingerprintImage != null) result.put("frontDocumentImage", _fingerprintImage);
        
        // TODO TESTING STUB
        if(_tokenOCR != null) result.put("tokenOCR", _tokenOCR);
        if(_tokenFaceImage != null) result.put("tokenFaceImage", _tokenFaceImage);
        if(_tokenFrontDocument != null) result.put("tokenFrontDocument", _tokenFrontDocument);
        if(_tokenBackDocument != null) result.put("tokenBackDocument", _tokenBackDocument);
        if(_tokenRawFrontDocument != null) result.put("tokenRawFrontDocument", _tokenRawFrontDocument);
        if(_tokenRawBackDocument != null) result.put("tokenRawBackDocument", _tokenRawBackDocument);
        
        if(_documentData != null) result.put("documentData", _documentData);
        if(_documentCaptured != null) result.put("lastDocumentCaptured", _documentCaptured);
        
        result.put("matchingSidesScore", _matchingSidesScore);
        
        return result;
    }
    
    /**
     * @description Compress bitmap using jpeg, convert to Base64 encoded string, and return to JavaScript.
     *
     * @param bitmap
     */
    private String processPicture(Bitmap bitmap) {
        if(bitmap == null)
            return null;
        
        ByteArrayOutputStream jpeg_data = new ByteArrayOutputStream();
        Bitmap.CompressFormat compressFormat = Bitmap.CompressFormat.JPEG;
        
        try {
            if (bitmap.compress(compressFormat, 95, jpeg_data)) {
                byte[] code = jpeg_data.toByteArray();
                byte[] output = Base64.encode(code, Base64.NO_WRAP);
                String js_out = new String(output);
                return js_out;
            }
        } catch (Exception e) {
            //     this.failPicture("Error compressing image.");
        }
        return null;
    }
    
}

