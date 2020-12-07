import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SELPHI_RESOURCES_PATH } from './selphi.service.constants';

declare let facephi: any;

@Injectable({
  providedIn: 'root'
})
export class SelphiService {

  constructor(public platform: Platform) { }

  /**
   * Method that launches the plugin using the authentication with liveness passive mode.
   * @returns Promise with a JSON string.
   */
  launchSelphiAuthentication = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        console.log('Preparing selphi configuration...');
        const widgetConfig = new facephi.widget.config.WidgetConfig();
        widgetConfig.livenessMode = facephi.widget.livenessmode.WidgetLivenessMode.BlinkMode;
        widgetConfig.debug = false;
        widgetConfig.crop = false;
        widgetConfig.cropPercent = 1.0;
        widgetConfig.sceneTimeout = 10.0;
        widgetConfig.enableImages = true;
        widgetConfig.qrValidatorExpression = null;
        widgetConfig.fullscreen = true;
        widgetConfig.locale = null;
        widgetConfig.uTags = null;
        widgetConfig.specificData = 'PA|<ALL>';
        widgetConfig.showResultAfterCapture = true;
        widgetConfig.frontalCameraPreferred = true;

        console.log('Launching selphi widget...');
        return facephi.widget.universal.StartWidget(console.log, console.log,
          facephi.widget.mode.WidgetMode.Authenticate, SELPHI_RESOURCES_PATH, widgetConfig)
        .then((result: string) => resolve(result), (err: string) => reject(err));
      });
    });
  }
}
