import { Component } from '@angular/core';
import { SelphiService } from '../services/selphi-face/selphi.service';
import { SelphiPluginFinishStatus } from '../services/selphi-face/selphi.service.enums';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // UriImage header for base64 images visualization.
  URI_JPEG_HEADER = 'data:image/jpeg;base64,';

  selphiFaceService: SelphiService;

  message = '';
  bestImageCropped: string = null;
  showErrorClassStyle = false;

  constructor(selphiService: SelphiService) {
    this.selphiFaceService = selphiService;
  }

  onLaunchSelphiProcess = () => {
    this.message = '';
    this.selphiFaceService.launchSelphiAuthentication()
    .then((result: string) => this.onSuccessSelphiExtraction(result), (err: string) => this.onErrorSelphiExtraction(err));
    this.bestImageCropped = null;
  }


  //  Formatting output
  onSuccessSelphiExtraction = (result) => {
    console.log('Receiving selphi success event...');
    if (result !== null && result) {
      switch (result.finishStatus) {
        case SelphiPluginFinishStatus.Ok: // OK
          this.processSuccessResult(result); // Logging the info for debug purposes
          this.bestImageCropped = this.URI_JPEG_HEADER + result.bestImageCropped;
          this.showErrorClassStyle = false;
          this.message = 'Preview selfie';
          return;
        case SelphiPluginFinishStatus.CancelByUser: // CancelByUser
          this.showErrorClassStyle = true;
          this.message = 'The user has cancelled the process';
          return;
        case SelphiPluginFinishStatus.Timeout: // Timeout
          this.showErrorClassStyle = true;
          this.message = 'The finished due to a timeout';
          return;
      }
    }
  }

  /** Method implemented only for debug purposes */
  processSuccessResult = (result) => {
    const message =
   `* FinishStatus: ' ${ result.finishStatus }
    * TypeError: ' ${ result.typeError }
    * TemplateRaw length: ' ${ result.templateRaw.length }
    * BestImage length: ' ${ result.bestImage.length }
    * BestImageCropped length: ' ${ result.bestImageCropped.length }
    * EyesGlassesScore: ' ${ result.eyeGlassesScore }
    * TemplateScore: ' ${ result.templateScore }`;
    console.log(message);
  }

  onErrorSelphiExtraction = (result) => {
    console.log('Receiving selphi plugin error event...');
    this.showErrorClassStyle = true;
    this.message = 'An error has ocurred. Read the log for more info';
    console.error('SELPHI_ERROR:' + result);
  }
}
