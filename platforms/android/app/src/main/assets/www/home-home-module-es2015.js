(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header [translucent]=\"true\">\n\n    <ion-toolbar color=\"bluefp\">\n        <ion-title class=\"labelTitleSelphi\">\n            Selphi\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n<ion-content>\n    <ion-grid style=\"height: 100%;\">\n        <ion-row class=\"labelRowSelphi\">\n            <ion-col class=\"labelColSelphi\">\n                <ion-label [ngModel]='' [ngClass]=\"showErrorClassStyle ? 'labelMessageErrorSelphi' : 'labelMessageSelphi'\" [class.hidden]=\"message.length == 0\">\n                    {{message}}\n                </ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row class=\"imgRowSelphi\">\n            <ion-col size=\"2\"></ion-col>\n            <ion-col size=\"8\">\n                <div class=\"imgColSelphi\">\n                    <ion-img [src]=\"bestImageCropped\" [class.hidden]=\"bestImageCropped == null\"></ion-img>\n                </div>\n            </ion-col>\n            <ion-col size=\"2\"></ion-col>\n        </ion-row>\n        <ion-row class=\"buttonRowSelphi\">\n            <ion-col size=\"1\"></ion-col>\n            <ion-col size=\"10\" class=\"buttonColSelphi\">\n                <ion-button class=\"buttonSelphi\" (click)='onLaunchSelphiProcess()' color=\"bluefp\">Launch</ion-button>\n            </ion-col>\n            <ion-col size=\"1\"></ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>");

/***/ }),

/***/ "./src/app/home/home-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HomePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function() { return HomePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"],
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], HomePageRoutingModule);



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/home/home-routing.module.ts");
/* harmony import */ var _services_selphi_face_selphi_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/selphi-face/selphi.service */ "./src/app/services/selphi-face/selphi.service.ts");








let HomePageModule = class HomePageModule {
};
HomePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _home_routing_module__WEBPACK_IMPORTED_MODULE_6__["HomePageRoutingModule"]
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]],
        providers: [
            _services_selphi_face_selphi_service__WEBPACK_IMPORTED_MODULE_7__["SelphiService"]
        ]
    })
], HomePageModule);



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".hidden {\n  opacity: 0;\n}\n\n.labelRowSelphi {\n  height: 25%;\n}\n\n.imgRowSelphi {\n  height: 50%;\n}\n\n.buttonRowSelphi {\n  height: 25%;\n}\n\n.labelColSelphi {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.imgColSelphi {\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  background-color: #e8e6e6;\n  border-radius: 10px;\n}\n\n.buttonColSelphi {\n  display: flex;\n  justify-content: center;\n  margin: 1%;\n  align-items: center;\n}\n\n.buttonSelphi {\n  border-color: var(--ion-color-bluefp);\n  --border-radius: 20px;\n  width: 50%;\n  font-size: 1.1em;\n  text-transform: capitalize;\n  font-family: \"Circular Std Bold\" !important;\n}\n\n.imageSelphi {\n  --border-radius: 10px;\n}\n\n.labelTitleSelphi {\n  width: 100%;\n  text-align: center;\n  font-size: 1.6em;\n  font-family: \"Circular Std Bold\" !important;\n}\n\n.labelMessageSelphi {\n  width: 100%;\n  text-align: center;\n  font-size: 1.6em;\n  color: var(--ion-color-bluefp);\n  font-family: \"Circular Std Bold\" !important;\n}\n\n.labelMessageErrorSelphi {\n  width: 100%;\n  text-align: center;\n  font-size: 1em;\n  color: var(--ion-color-danger);\n  font-family: \"Circular Std Bold\" !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFVBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7QUFDSjs7QUFFQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxhQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLG1CQUFBO0FBQ0o7O0FBRUE7RUFDSSxxQ0FBQTtFQUNBLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7RUFDQSwyQ0FBQTtBQUNKOztBQUVBO0VBQ0kscUJBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMkNBQUE7QUFDSjs7QUFFQTtFQUNJLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDQSwyQ0FBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLDhCQUFBO0VBQ0EsMkNBQUE7QUFDSiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGlkZGVuIHtcbiAgICBvcGFjaXR5OiAwO1xufVxuXG4ubGFiZWxSb3dTZWxwaGkge1xuICAgIGhlaWdodDogMjUlO1xufVxuXG4uaW1nUm93U2VscGhpIHtcbiAgICBoZWlnaHQ6IDUwJTtcbn1cblxuLmJ1dHRvblJvd1NlbHBoaSB7XG4gICAgaGVpZ2h0OiAyNSU7XG59XG5cbi5sYWJlbENvbFNlbHBoaSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uaW1nQ29sU2VscGhpIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlNmU2O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG5cbi5idXR0b25Db2xTZWxwaGkge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgbWFyZ2luOiAxJTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYnV0dG9uU2VscGhpIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1ibHVlZnApO1xuICAgIC0tYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZvbnQtc2l6ZTogMS4xZW07XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gICAgZm9udC1mYW1pbHk6ICdDaXJjdWxhciBTdGQgQm9sZCcgIWltcG9ydGFudDtcbn1cblxuLmltYWdlU2VscGhpIHtcbiAgICAtLWJvcmRlci1yYWRpdXM6IDEwcHg7XG59XG5cbi5sYWJlbFRpdGxlU2VscGhpIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxLjZlbTtcbiAgICBmb250LWZhbWlseTogJ0NpcmN1bGFyIFN0ZCBCb2xkJyAhaW1wb3J0YW50O1xufVxuXG4ubGFiZWxNZXNzYWdlU2VscGhpIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxLjZlbTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWJsdWVmcCk7XG4gICAgZm9udC1mYW1pbHk6ICdDaXJjdWxhciBTdGQgQm9sZCcgIWltcG9ydGFudDtcbn1cblxuLmxhYmVsTWVzc2FnZUVycm9yU2VscGhpIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxZW07XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYW5nZXIpO1xuICAgIGZvbnQtZmFtaWx5OiAnQ2lyY3VsYXIgU3RkIEJvbGQnICFpbXBvcnRhbnQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_selphi_face_selphi_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/selphi-face/selphi.service */ "./src/app/services/selphi-face/selphi.service.ts");
/* harmony import */ var _services_selphi_face_selphi_service_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/selphi-face/selphi.service.enums */ "./src/app/services/selphi-face/selphi.service.enums.ts");




let HomePage = class HomePage {
    constructor(selphiService) {
        // UriImage header for base64 images visualization.
        this.URI_JPEG_HEADER = 'data:image/jpeg;base64,';
        this.message = '';
        this.bestImageCropped = null;
        this.showErrorClassStyle = false;
        this.onLaunchSelphiProcess = () => {
            this.message = '';
            this.selphiFaceService.launchSelphiAuthentication()
                .then((result) => this.onSuccessSelphiExtraction(result), (err) => this.onErrorSelphiExtraction(err));
            this.bestImageCropped = null;
        };
        //  Formatting output
        this.onSuccessSelphiExtraction = (result) => {
            console.log('Receiving selphi success event...');
            if (result !== null && result) {
                switch (result.finishStatus) {
                    case _services_selphi_face_selphi_service_enums__WEBPACK_IMPORTED_MODULE_3__["SelphiPluginFinishStatus"].Ok: // OK
                        this.processSuccessResult(result); // Logging the info for debug purposes
                        this.bestImageCropped = this.URI_JPEG_HEADER + result.bestImageCropped;
                        this.showErrorClassStyle = false;
                        this.message = 'Preview selfie';
                        return;
                    case _services_selphi_face_selphi_service_enums__WEBPACK_IMPORTED_MODULE_3__["SelphiPluginFinishStatus"].CancelByUser: // CancelByUser
                        this.showErrorClassStyle = true;
                        this.message = 'The user has cancelled the process';
                        return;
                    case _services_selphi_face_selphi_service_enums__WEBPACK_IMPORTED_MODULE_3__["SelphiPluginFinishStatus"].Timeout: // Timeout
                        this.showErrorClassStyle = true;
                        this.message = 'The finished due to a timeout';
                        return;
                }
            }
        };
        /** Method implemented only for debug purposes */
        this.processSuccessResult = (result) => {
            const message = `* FinishStatus: ' ${result.finishStatus}
    * TypeError: ' ${result.typeError}
    * TemplateRaw length: ' ${result.templateRaw.length}
    * BestImage length: ' ${result.bestImage.length}
    * BestImageCropped length: ' ${result.bestImageCropped.length}
    * EyesGlassesScore: ' ${result.eyeGlassesScore}
    * TemplateScore: ' ${result.templateScore}`;
            console.log(message);
        };
        this.onErrorSelphiExtraction = (result) => {
            console.log('Receiving selphi plugin error event...');
            this.showErrorClassStyle = true;
            this.message = 'An error has ocurred. Read the log for more info';
            console.error('SELPHI_ERROR:' + result);
        };
        this.selphiFaceService = selphiService;
    }
};
HomePage.ctorParameters = () => [
    { type: _services_selphi_face_selphi_service__WEBPACK_IMPORTED_MODULE_2__["SelphiService"] }
];
HomePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")).default]
    })
], HomePage);



/***/ }),

/***/ "./src/app/services/selphi-face/selphi.service.constants.ts":
/*!******************************************************************!*\
  !*** ./src/app/services/selphi-face/selphi.service.constants.ts ***!
  \******************************************************************/
/*! exports provided: SELPHI_RESOURCES_PATH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELPHI_RESOURCES_PATH", function() { return SELPHI_RESOURCES_PATH; });
// The bundle zip name with all the Widget UI.
const SELPHI_RESOURCES_PATH = 'fphi-selphi-widget-resources-selphi-live-1.2';


/***/ }),

/***/ "./src/app/services/selphi-face/selphi.service.enums.ts":
/*!**************************************************************!*\
  !*** ./src/app/services/selphi-face/selphi.service.enums.ts ***!
  \**************************************************************/
/*! exports provided: SelphiPluginFinishStatus, SelphiPluginErrorType, SelphiPassiveDiagnostic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelphiPluginFinishStatus", function() { return SelphiPluginFinishStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelphiPluginErrorType", function() { return SelphiPluginErrorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelphiPassiveDiagnostic", function() { return SelphiPassiveDiagnostic; });
/** The generic diagnostic that the plugin returns. */
var SelphiPluginFinishStatus;
(function (SelphiPluginFinishStatus) {
    SelphiPluginFinishStatus[SelphiPluginFinishStatus["Ok"] = 1] = "Ok";
    SelphiPluginFinishStatus[SelphiPluginFinishStatus["Error"] = 2] = "Error";
    SelphiPluginFinishStatus[SelphiPluginFinishStatus["CancelByUser"] = 3] = "CancelByUser";
    SelphiPluginFinishStatus[SelphiPluginFinishStatus["Timeout"] = 4] = "Timeout";
})(SelphiPluginFinishStatus || (SelphiPluginFinishStatus = {}));
/** The type of exception due to an issue during the plugin call */
var SelphiPluginErrorType;
(function (SelphiPluginErrorType) {
    SelphiPluginErrorType[SelphiPluginErrorType["UnknownError"] = 1] = "UnknownError";
    SelphiPluginErrorType[SelphiPluginErrorType["NoError"] = 2] = "NoError";
    SelphiPluginErrorType[SelphiPluginErrorType["CameraPermissionDenied"] = 3] = "CameraPermissionDenied";
    SelphiPluginErrorType[SelphiPluginErrorType["SettingsPermissionDenied"] = 4] = "SettingsPermissionDenied";
    SelphiPluginErrorType[SelphiPluginErrorType["HardwareError"] = 5] = "HardwareError";
    SelphiPluginErrorType[SelphiPluginErrorType["ExtractionLicenseError"] = 6] = "ExtractionLicenseError";
    SelphiPluginErrorType[SelphiPluginErrorType["ControlNotInitializedError"] = 7] = "ControlNotInitializedError";
    SelphiPluginErrorType[SelphiPluginErrorType["BadExtractorConfiguration"] = 8] = "BadExtractorConfiguration";
})(SelphiPluginErrorType || (SelphiPluginErrorType = {}));
/** The diagnostic code for the liveness passive process. This diagnostic is returned after the web service request. */
var SelphiPassiveDiagnostic;
(function (SelphiPassiveDiagnostic) {
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["None"] = 0] = "None";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["Spoof"] = 1] = "Spoof";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["Uncertain"] = 2] = "Uncertain";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["Live"] = 3] = "Live";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseBadQuality"] = 4] = "NoneBecauseBadQuality";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseFaceTooClose"] = 5] = "NoneBecauseFaceTooClose";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseFaceNotFound"] = 6] = "NoneBecauseFaceNotFound";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseFaceTooSmall"] = 7] = "NoneBecauseFaceTooSmall";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseAngleTooLarge"] = 8] = "NoneBecauseAngleTooLarge";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseImageDataError"] = 9] = "NoneBecauseImageDataError";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseInternalError"] = 10] = "NoneBecauseInternalError";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseImagePreprocessError"] = 11] = "NoneBecauseImagePreprocessError";
    SelphiPassiveDiagnostic[SelphiPassiveDiagnostic["NoneBecauseTooManyFaces"] = 12] = "NoneBecauseTooManyFaces";
})(SelphiPassiveDiagnostic || (SelphiPassiveDiagnostic = {}));


/***/ }),

/***/ "./src/app/services/selphi-face/selphi.service.ts":
/*!********************************************************!*\
  !*** ./src/app/services/selphi-face/selphi.service.ts ***!
  \********************************************************/
/*! exports provided: SelphiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelphiService", function() { return SelphiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _selphi_service_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selphi.service.constants */ "./src/app/services/selphi-face/selphi.service.constants.ts");




let SelphiService = class SelphiService {
    constructor(platform) {
        this.platform = platform;
        /**
         * Method that launches the plugin using the authentication with liveness passive mode.
         * @returns Promise with a JSON string.
         */
        this.launchSelphiAuthentication = () => {
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
                    return facephi.widget.universal.StartWidget(console.log, console.log, facephi.widget.mode.WidgetMode.Authenticate, _selphi_service_constants__WEBPACK_IMPORTED_MODULE_3__["SELPHI_RESOURCES_PATH"], widgetConfig)
                        .then((result) => resolve(result), (err) => reject(err));
                });
            });
        };
    }
};
SelphiService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"] }
];
SelphiService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], SelphiService);



/***/ })

}]);
//# sourceMappingURL=home-home-module-es2015.js.map