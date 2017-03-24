webpackJsonp([0,5],{

/***/ "+V6z":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"emitToggleRecording()\">\n  <md-icon>\n    <template [ngIf]=\"recordingStatus == 'enabled'\">mic_none</template>\n    <template [ngIf]=\"recordingStatus == 'disabled'\">mic_off</template>\n    <template [ngIf]=\"recordingStatus == 'recording'\">mic_on</template>\n  </md-icon>\n</button>\n\n"

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("x35b");


/***/ }),

/***/ "1RzP":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, "#extractor-outputs{max-width:80%;display:block;margin:0 auto}.container{margin-top:10pt;padding:10pt}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "3lao":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("EEr4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("Gvdl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("24R9");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeatureExtractionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




let FeatureExtractionService = class FeatureExtractionService {
    constructor(http, repositoryUri) {
        this.http = http;
        this.repositoryUri = repositoryUri;
        this.worker = new Worker('bootstrap-feature-extraction-worker.js');
        this.featuresExtracted = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.featuresExtracted$ = this.featuresExtracted.asObservable();
        this.librariesUpdated = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.librariesUpdated$ = this.librariesUpdated.asObservable();
        this.worker.addEventListener('message', (ev) => {
            const isValidResponse = ev.data.method === 'import'
                && ev.data.result.available !== undefined;
            if (isValidResponse) {
                this.librariesUpdated.next(ev.data.result);
            }
        });
    }
    list() {
        return this.request({ method: 'list', params: {} }, (ev) => ev.data.result.available !== undefined).then(msg => msg.result);
    }
    process(request) {
        return this.request({ method: 'process', params: request }, (ev) => ev.data.method === 'process').then(msg => {
            this.featuresExtracted.next(msg.result);
            return msg.result;
        });
    }
    collect(request) {
        return this.request({ method: 'collect', params: request }, (ev) => ev.data.method === 'collect').then(msg => {
            this.featuresExtracted.next(msg.result);
            return msg.result;
        });
    }
    updateAvailableLibraries() {
        return this.http.get(this.repositoryUri)
            .map(res => {
            const map = res.json();
            this.worker.postMessage({
                method: 'addRemoteLibraries',
                params: map
            });
            return map;
        })
            .catch((error) => {
            console.error(error);
            return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(error);
        });
    }
    load(libraryKey) {
        this.worker.postMessage({ method: 'import', params: libraryKey });
    }
    request(request, predicate) {
        return new Promise(res => {
            const listener = (ev) => {
                this.worker.removeEventListener('message', listener);
                if (predicate(ev))
                    res(ev.data);
            };
            this.worker.addEventListener('message', listener);
            this.worker.postMessage(request);
        }).catch(err => console.error(err));
    }
};
FeatureExtractionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])('PiperRepoUri')),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _a || Object, String])
], FeatureExtractionService);

var _a;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/feature-extraction.service.js.map

/***/ }),

/***/ "4Wxe":
/***/ (function(module, exports) {

module.exports = "<input #open type=\"file\" accept=\"audio/*\" (change)=\"decodeAudio($event.target.files)\"/>\n<button md-icon-button (click)=\"openAudioDialog()\">\n    <md-icon>folder_open</md-icon>\n</button>\n"

/***/ }),

/***/ "5xMp":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-container\">\n  <div class=\"app-header\">\n    <md-toolbar color=\"primary\">\n      <md-icon svgIcon=\"duck\"></md-icon>\n\n      <span class=\"app-toolbar-filler\"></span>\n\n      <app-playback-control></app-playback-control>\n      <ugly-recording-control\n        (finishedRecording)=\"onFileOpened($event)\"\n      ></ugly-recording-control>\n\n      <!-- This fills the remaining space of the current row -->\n      <span class=\"app-toolbar-filler\"></span>\n\n\n      <app-audio-file-open\n        (fileOpened)=\"onFileOpened($event)\"\n      ></app-audio-file-open>\n      <!-- menu opens when trigger button is clicked -->\n      <button md-icon-button (click)=\"sidenav.toggle()\">\n        <md-icon>extension</md-icon>\n      </button>\n    </md-toolbar>\n  </div>\n\n  <div class=\"app-content\">\n    <md-sidenav-container>\n      <md-sidenav #sidenav align=\"start\" mode=\"over\">\n        <app-feature-extraction-menu\n          (requestOutput)=\"extractFeatures($event)\"\n          [disabled]=\"!canExtract\">\n        </app-feature-extraction-menu>\n      </md-sidenav>\n      <ugly-notebook-feed\n        [analyses]=\"analyses\"\n        [rootAudioUri]=\"rootAudioUri\"></ugly-notebook-feed>\n    </md-sidenav-container>\n  </div>\n\n  <div class=\"app-footer\">\n    <md-toolbar color=\"primary\">\n\n      <!-- menu opens when trigger button is clicked -->\n      <button md-icon-button (click)=\"sidenav.toggle()\">\n        <md-icon>extension</md-icon>\n      </button>\n    </md-toolbar>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "6o5O":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, ".track{height:160px;width:100%}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "7G6f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__("YWx4");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__("Iksp");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/index.js.map

/***/ }),

/***/ "7vD/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_audio_recorder_audio_recorder_service__ = __webpack_require__("pcIR");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordingControlComponent; });
/**
 * Created by lucas on 17/03/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let RecordingControlComponent = class RecordingControlComponent {
    constructor(recordingService) {
        this.recordingService = recordingService;
        this.recordingStatus = "disabled";
        this.finishedRecording = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
    }
    ngOnInit() {
        this.recordingState = this.recordingService.recordingStateChange$.subscribe((status) => {
            this.recordingStatus = status;
        });
        this.newRecording = this.recordingService.newRecording$.subscribe((recordingBlob) => {
            this.finishedRecording.emit(recordingBlob);
        });
    }
    ngOnDestroy() {
        this.recordingState.unsubscribe();
        this.newRecording.unsubscribe();
    }
    emitToggleRecording() {
        this.recordingService.toggleRecording();
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _a || Object)
], RecordingControlComponent.prototype, "finishedRecording", void 0);
RecordingControlComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'ugly-recording-control',
        template: __webpack_require__("+V6z")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_audio_recorder_audio_recorder_service__["b" /* AudioRecorderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_audio_recorder_audio_recorder_service__["b" /* AudioRecorderService */]) === "function" && _b || Object])
], RecordingControlComponent);

var _a, _b;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/recording-control.component.js.map

/***/ }),

/***/ "A7Tv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioFileOpenComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AudioFileOpenComponent = class AudioFileOpenComponent {
    constructor() {
        this.fileOpened = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
    }
    ngOnInit() {
    }
    decodeAudio(files) {
        if (files.length > 0) {
            this.fileOpened.emit(files[0]);
        }
    }
    openAudioDialog() {
        this.open.nativeElement.click();
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* ViewChild */])('open'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === "function" && _a || Object)
], AudioFileOpenComponent.prototype, "open", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _b || Object)
], AudioFileOpenComponent.prototype, "fileOpened", void 0);
AudioFileOpenComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'app-audio-file-open',
        template: __webpack_require__("4Wxe"),
        styles: [__webpack_require__("t89E")]
    }),
    __metadata("design:paramtypes", [])
], AudioFileOpenComponent);

var _a, _b;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/audio-file-open.component.js.map

/***/ }),

/***/ "Iksp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("D8Yg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("36+m");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("24R9");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("YWx4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("TC1X");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__waveform_waveform_component__ = __webpack_require__("tem0");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__audio_file_open_audio_file_open_component__ = __webpack_require__("A7Tv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__playback_control_playback_control_component__ = __webpack_require__("kETe");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_feature_extraction_feature_extraction_service__ = __webpack_require__("3lao");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__feature_extraction_menu_feature_extraction_menu_component__ = __webpack_require__("tfge");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__progress_spinner_progress_spinner_component__ = __webpack_require__("iHFK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_audio_recorder_audio_recorder_service__ = __webpack_require__("pcIR");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__recording_control_recording_control_component__ = __webpack_require__("7vD/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__notebook_feed_notebook_feed_component__ = __webpack_require__("Qvmv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__analysis_item_analysis_item_component__ = __webpack_require__("jat4");
/* unused harmony export createAudioContext */
/* unused harmony export createAudioElement */
/* unused harmony export createAudioInputProvider */
/* unused harmony export createMediaRecorderFactory */
/* unused harmony export createUrlResourceManager */
/* unused harmony export createResourceReader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















function createAudioContext() {
    return new (window.AudioContext
        || window.webkitAudioContext)();
}
function createAudioElement() {
    return new Audio();
}
function createAudioInputProvider() {
    if (navigator.mediaDevices &&
        typeof navigator.mediaDevices.getUserMedia === 'function') {
        return () => navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }
    else {
        return () => Promise.reject('Recording is not supported in this browser.');
    }
}
function createMediaRecorderFactory() {
    if (typeof MediaRecorder !== 'undefined') {
        return MediaRecorder;
    }
    else {
        return __WEBPACK_IMPORTED_MODULE_13__services_audio_recorder_audio_recorder_service__["a" /* ThrowingMediaRecorder */];
    }
}
function createUrlResourceManager() {
    return {
        createUrlToResource: (resource) => {
            return URL.createObjectURL(resource);
        },
        revokeUrlToResource: (url) => {
            URL.revokeObjectURL(url);
        }
    };
}
function createResourceReader() {
    return (resource) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                res(event.target.result);
            };
            reader.onerror = (event) => {
                rej(event.message);
            };
            reader.readAsArrayBuffer(resource);
        });
    };
    ;
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__waveform_waveform_component__["a" /* WaveformComponent */],
            __WEBPACK_IMPORTED_MODULE_7__audio_file_open_audio_file_open_component__["a" /* AudioFileOpenComponent */],
            __WEBPACK_IMPORTED_MODULE_8__playback_control_playback_control_component__["a" /* PlaybackControlComponent */],
            __WEBPACK_IMPORTED_MODULE_14__recording_control_recording_control_component__["a" /* RecordingControlComponent */],
            __WEBPACK_IMPORTED_MODULE_11__feature_extraction_menu_feature_extraction_menu_component__["a" /* FeatureExtractionMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_12__progress_spinner_progress_spinner_component__["a" /* ProgressSpinnerComponent */],
            __WEBPACK_IMPORTED_MODULE_16__analysis_item_analysis_item_component__["a" /* AnalysisItemComponent */],
            __WEBPACK_IMPORTED_MODULE_15__notebook_feed_notebook_feed_component__["a" /* NotebookFeedComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */]
        ],
        providers: [
            { provide: HTMLAudioElement, useFactory: createAudioElement },
            { provide: 'AudioContext', useFactory: createAudioContext },
            __WEBPACK_IMPORTED_MODULE_9__services_audio_player_audio_player_service__["a" /* AudioPlayerService */],
            { provide: 'AudioInputProvider', useFactory: createAudioInputProvider },
            __WEBPACK_IMPORTED_MODULE_13__services_audio_recorder_audio_recorder_service__["b" /* AudioRecorderService */],
            __WEBPACK_IMPORTED_MODULE_10__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */],
            { provide: 'MediaRecorderFactory', useFactory: createMediaRecorderFactory },
            { provide: 'PiperRepoUri', useValue: 'assets/remote-plugins.json' },
            { provide: 'UrlResourceLifetimeManager', useFactory: createUrlResourceManager },
            { provide: 'ResourceReader', useFactory: createResourceReader }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/app.module.js.map

/***/ }),

/***/ "L+Fk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_piper_fft_RealFft__ = __webpack_require__("BHE1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_piper_fft_RealFft___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_piper_fft_RealFft__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_piper_FftUtilities__ = __webpack_require__("vgcF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_piper_FftUtilities___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_piper_FftUtilities__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui__ = __webpack_require__("myhA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_waves_ui__);
/**
 * Created by lucast on 16/03/2017.
 */



class SpectrogramEntity extends __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.utils.MatrixEntity {
    constructor(samples, options) {
        super();
        this.samples = samples;
        this.framing = options;
        this.real = new Float32Array(this.framing.blockSize);
        this.nCols = Math.floor(this.samples.length / this.framing.stepSize); //!!! not correct
        this.columnHeight = Math.round(this.framing.blockSize / 2) + 1;
        this.fft = new __WEBPACK_IMPORTED_MODULE_0_piper_fft_RealFft__["KissRealFft"](this.framing.blockSize);
        this.window = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_piper_FftUtilities__["hann"])(this.framing.blockSize);
    }
    dispose() {
        this.fft.dispose();
    }
    getColumnCount() {
        return this.nCols;
    }
    getColumnHeight() {
        return this.columnHeight;
    }
    getColumn(n) {
        const startSample = n * this.framing.stepSize;
        const sz = this.framing.blockSize;
        this.real.fill(0);
        let available = sz;
        if (startSample + sz >= this.samples.length) {
            available = this.samples.length - startSample;
        }
        for (let i = 0; i < available; ++i) {
            this.real[i] = this.samples[startSample + i] * this.window[i];
        }
        const complex = this.fft.forward(this.real);
        const h = this.getColumnHeight();
        const col = new Float32Array(h);
        const scale = 1.0 / Math.sqrt(sz);
        for (let i = 0; i < h; ++i) {
            const re = complex[i * 2] * scale;
            const im = complex[i * 2 + 1] * scale;
            const mag = Math.sqrt(re * re + im * im);
            col[i] = mag;
        }
        return col;
    }
}
class WavesSpectrogramLayer extends __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.core.Layer {
    constructor(buffer, options) {
        const defaults = {
            normalise: 'hybrid',
            gain: 40.0,
            channel: -1,
            stepSize: 512,
            blockSize: 1024
        };
        const mergedOptions = Object.assign({}, defaults, options);
        const getSamples = ((buffer, channel) => {
            const nch = buffer.numberOfChannels;
            if (channel >= 0 || nch == 1) {
                return buffer.getChannelData(channel);
            }
            else {
                const before = performance.now();
                console.log("mixing down " + nch + " channels for spectrogram...");
                const mixed = Float32Array.from(buffer.getChannelData(0));
                const n = mixed.length;
                for (let ch = 1; ch < nch; ++ch) {
                    const buf = buffer.getChannelData(ch);
                    for (let i = 0; i < n; ++i)
                        mixed[i] += buf[i];
                }
                const scale = 1.0 / nch;
                for (let i = 0; i < n; ++i)
                    mixed[i] *= scale;
                console.log("done in " + (performance.now() - before) + "ms");
                return mixed;
            }
        });
        super('entity', new SpectrogramEntity(getSamples(buffer, mergedOptions.channel), mergedOptions), mergedOptions);
        this.configureShape(__WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.shapes.Matrix, {}, mergedOptions);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WavesSpectrogramLayer;

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/Spectrogram.js.map

/***/ }),

/***/ "MOVZ":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "MOVZ";


/***/ }),

/***/ "Qvmv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui__ = __webpack_require__("myhA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_waves_ui__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotebookFeedComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 21/03/2017.
 */


let NotebookFeedComponent = class NotebookFeedComponent {
    constructor() {
        this.sharedTimeline = new __WEBPACK_IMPORTED_MODULE_1_waves_ui___default.a.core.Timeline();
        this.analyses = [];
    }
    set rootAudioUri(uri) {
        this._rootAudioUri = uri;
        // TODO is this safe? will the fact references are held elsewhere
        // keep the previous instance alive? Or will it get garbage collected in
        // screw previous layers up?
        this.sharedTimeline = new __WEBPACK_IMPORTED_MODULE_1_waves_ui___default.a.core.Timeline();
    }
    get rootAudioUri() {
        return this._rootAudioUri;
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Array)
], NotebookFeedComponent.prototype, "analyses", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NotebookFeedComponent.prototype, "rootAudioUri", null);
NotebookFeedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'ugly-notebook-feed',
        template: __webpack_require__("vB4/"),
        styles: [__webpack_require__("lZe/")]
    }),
    __metadata("design:paramtypes", [])
], NotebookFeedComponent);

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/notebook-feed.component.js.map

/***/ }),

/***/ "W1+o":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <md-select #extractorSelect\n    placeholder=\"Extractors\">\n    <md-option\n      *ngFor=\"let extractor of extractors\"\n      [value]=\"extractor.combinedKey\"\n    >\n      {{extractor.name}}\n    </md-option>\n  </md-select>\n  <p>\n    <button md-raised-button\n            color=\"primary\"\n            (click)=\"extract(extractorSelect.selected.value)\"\n            [disabled]=\"disabled\">Extract</button>\n  </p>\n  <p>\n    <button md-raised-button\n            (click)=\"load()\">Load Remote Plugins</button>\n  </p>\n</div>\n"

/***/ }),

/***/ "XS25":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__("wu3h");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__("45Dp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__("DAFs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__("FD+i");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__("qXjp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__("IzNg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__("MVjO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__("oFcf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__("nR/1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__("cUYv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__("594w");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__("7N90");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__("/Ife");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__("2tFN");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__("ChGr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__("ZSR1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_hammerjs__ = __webpack_require__("rxKx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_hammerjs__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.

















//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/polyfills.js.map

/***/ }),

/***/ "YWx4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__ = __webpack_require__("3lao");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("D8Yg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("TC1X");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let AppComponent = class AppComponent {
    constructor(audioService, piperService, iconRegistry, sanitizer) {
        this.audioService = audioService;
        this.piperService = piperService;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.analyses = [];
        this.canExtract = false;
        this.nRecordings = 0;
        iconRegistry.addSvgIcon('duck', sanitizer.bypassSecurityTrustResourceUrl('assets/duck.svg'));
        this.onAudioDataSubscription = this.audioService.audioLoaded$.subscribe(resource => {
            const wasError = resource.message != null;
            if (wasError) {
                this.analyses.shift();
                this.canExtract = false;
            }
            else {
                this.audioBuffer = resource.samples;
                if (this.audioBuffer) {
                    this.canExtract = true;
                }
            }
        });
    }
    onFileOpened(file) {
        this.canExtract = false;
        const url = this.audioService.loadAudio(file);
        this.rootAudioUri = url; // TODO this isn't going to work to id previously loaded files
        // TODO is it safe to assume it is a recording?
        const title = (file instanceof File) ?
            file.name : `Recording ${this.nRecordings++}`;
        if (this.analyses.filter(item => item.title === title).length > 0) {
            // TODO this reveals how brittle the current name / uri based id is
            // need something more robust, and also need to notify the user
            // in a suitable way in the actual event of a duplicate file
            console.warn('There is already a notebook based on this audio file.');
            return;
        }
        // TODO re-ordering of items for display
        // , one alternative is a Angular Pipe / Filter for use in the Template
        this.analyses.unshift({
            rootAudioUri: url,
            hasSharedTimeline: true,
            extractorKey: 'not:real',
            isRoot: true,
            title: title,
            description: new Date().toLocaleString()
        });
    }
    extractFeatures(outputInfo) {
        if (!this.canExtract || !outputInfo)
            return;
        this.canExtract = false;
        this.analyses.unshift({
            rootAudioUri: this.rootAudioUri,
            hasSharedTimeline: true,
            extractorKey: outputInfo.combinedKey,
            isRoot: false,
            title: outputInfo.name,
            description: outputInfo.outputId
        });
        this.piperService.collect({
            audioData: [...Array(this.audioBuffer.numberOfChannels).keys()]
                .map(i => this.audioBuffer.getChannelData(i)),
            audioFormat: {
                sampleRate: this.audioBuffer.sampleRate,
                channelCount: this.audioBuffer.numberOfChannels
            },
            key: outputInfo.extractorKey,
            outputId: outputInfo.outputId
        }).then(() => {
            this.canExtract = true;
        }).catch(err => {
            this.canExtract = true;
            console.error(err);
        });
    }
    ngOnDestroy() {
        this.onAudioDataSubscription.unsubscribe();
    }
};
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("5xMp"),
        styles: [__webpack_require__("okgc")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MdIconRegistry */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MdIconRegistry */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/app.component.js.map

/***/ }),

/***/ "c1nP":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, "md-card{padding-left:0;padding-right:0;width:100%}md-card-actions{width:calc(100% - 16px);padding-left:16px}md-card-header{margin-bottom:8px}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "cqUy":
/***/ (function(module, exports) {

module.exports = "<md-card>\n  <md-card-header>\n    <md-card-title>{{title}}</md-card-title>\n    <md-card-subtitle>{{description}}</md-card-subtitle>\n  </md-card-header>\n  <md-card-content>\n    <app-waveform\n      [timeline]=\"timeline\"\n      [trackIdPrefix]=\"title\"\n      [isSubscribedToAudioService]=\"isActive && isRoot\"\n      [isSubscribedToExtractionService]=\"isActive && !isRoot\"\n      [isOneShotExtractor]=\"true\"\n      [isSeeking]=\"isActive\"\n    ></app-waveform>\n  </md-card-content>\n</md-card>\n"

/***/ }),

/***/ "iHFK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressSpinnerComponent; });
/**
 * Created by lucast on 14/03/2017.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let ProgressSpinnerComponent = class ProgressSpinnerComponent {
    constructor() {
        this.isVisible = true;
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean)
], ProgressSpinnerComponent.prototype, "isVisible", void 0);
ProgressSpinnerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'ugly-progress-spinner',
        template: `
    <div class="container" [hidden]="!isVisible">
      <md-spinner
        class="spinner"
        color="primary"
      ></md-spinner>
    </div>
  `,
        styles: [`
    .container {
      height: 40px;
      width: 40px;
      position: absolute;
      top: calc(50% - 20px);
      left: calc(50% - 20px);
    }
    
    .spinner {
      width: 100%;
      height: 100%;
    }
  `]
    })
], ProgressSpinnerComponent);

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/progress-spinner.component.js.map

/***/ }),

/***/ "jJWp":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "jat4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalysisItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 21/03/2017.
 */

let AnalysisItemComponent = class AnalysisItemComponent {
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Object)
], AnalysisItemComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", String)
], AnalysisItemComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", String)
], AnalysisItemComponent.prototype, "description", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean)
], AnalysisItemComponent.prototype, "isActive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean)
], AnalysisItemComponent.prototype, "isRoot", void 0);
AnalysisItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'ugly-analysis-item',
        template: __webpack_require__("cqUy"),
        styles: [__webpack_require__("c1nP")]
    })
], AnalysisItemComponent);

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/analysis-item.component.js.map

/***/ }),

/***/ "kETe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__ = __webpack_require__("3lao");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaybackControlComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let PlaybackControlComponent = class PlaybackControlComponent {
    constructor(audioService, featureExtractionService) {
        this.audioService = audioService;
        this.featureExtractionService = featureExtractionService;
    }
    ngOnInit() { }
    emitPlayPause() {
        this.audioService.togglePlaying();
    }
    emitFastForward() {
        this.audioService.seekBy(5); // TODO this should probably be some dynamic amount based on the zoom level ala Sonic Visualiser
    }
    emitFastForwardEnd() {
        this.audioService.seekToEnd();
    }
    emitFastRewind() {
        this.audioService.seekBy(-5);
    }
    emitFastRewindStart() {
        this.audioService.seekToStart();
    }
    emitVolumeChanged(value) {
        this.audioService.setVolume(value);
    }
    // TODO seems wrong to be repeating myself
    isPlaying() {
        return this.audioService.isPlaying();
    }
};
PlaybackControlComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'app-playback-control',
        template: __webpack_require__("nKj7"),
        styles: [__webpack_require__("jJWp")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _b || Object])
], PlaybackControlComponent);

var _a, _b;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/playback-control.component.js.map

/***/ }),

/***/ "kZql":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const environment = {
    production: true
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/environment.js.map

/***/ }),

/***/ "lZe/":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, ".break{margin-bottom:32px}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "nKj7":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"emitPlayPause()\">\n  <md-icon>\n    <template [ngIf]=\"isPlaying()\">pause</template>\n    <template [ngIf]=\"!isPlaying()\">play_arrow</template>\n  </md-icon>\n</button>\n"

/***/ }),

/***/ "okgc":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, ".app-toolbar-filler{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}md-sidenav-container{height:100%;width:100%;position:absolute}md-sidenav{text-align:center}.app-container{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.app-header{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.app-content{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;overflow-y:auto;position:relative}.app-footer{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "pcIR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("Gvdl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AudioRecorderService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by lucas on 17/03/2017.
 */


class ThrowingMediaRecorder {
    constructor(stream, options) {
        throw "MediaRecorder not available in this browser.";
    }
    static isTypeSupported(mimeType) {
        return false;
    }
    pause() {
    }
    requestData() {
    }
    resume() {
    }
    start(timeslice) {
    }
    stop() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ThrowingMediaRecorder;

let AudioRecorderService = class AudioRecorderService {
    constructor(requestProvider, recorderImpl, ngZone) {
        this.ngZone = ngZone;
        this.requestProvider = requestProvider;
        this.recorderImpl = recorderImpl;
        this.recordingStateChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.recordingStateChange$ = this.recordingStateChange.asObservable();
        this.newRecording = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.newRecording$ = this.newRecording.asObservable();
        this.isRecordingAble = false;
        this.isRecording = false;
        this.chunks = [];
        this.hasRecordingCapabilities();
    }
    hasRecordingCapabilities() {
        this.requestProvider().then(stream => {
            try {
                this.recorder = new this.recorderImpl(stream);
                this.recorder.ondataavailable = e => this.chunks.push(e.data);
                this.recorder.onstop = () => {
                    const blob = new Blob(this.chunks, { 'type': this.recorder.mimeType });
                    this.chunks.length = 0;
                    this.ngZone.run(() => {
                        this.newRecording.next(blob);
                    });
                };
                this.isRecordingAble = true;
                this.recordingStateChange.next("enabled");
            }
            catch (e) {
                this.isRecordingAble = false;
                this.recordingStateChange.next("disabled"); // don't really need to do this
                console.warn(e); // TODO emit an error message for display?
            }
        }, rejectMessage => {
            this.isRecordingAble = false;
            this.recordingStateChange.next("disabled"); // again, probably not needed
            console.warn(rejectMessage); // TODO something better
        });
    }
    toggleRecording() {
        if (!this.isRecordingAble)
            return;
        if (this.isRecording) {
            this.endRecording();
        }
        else {
            this.startRecording();
        }
    }
    startRecording() {
        if (this.recorder) {
            this.isRecording = true;
            this.recorder.start();
            this.recordingStateChange.next("recording");
        }
    }
    endRecording() {
        if (this.recorder) {
            this.isRecording = false;
            this.recorder.stop();
            this.chunks.length = 0; // empty the array
            this.recordingStateChange.next("enabled");
        }
    }
};
AudioRecorderService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])('AudioInputProvider')),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])('MediaRecorderFactory')),
    __metadata("design:paramtypes", [Function, Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]) === "function" && _a || Object])
], AudioRecorderService);

var _a;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/audio-recorder.service.js.map

/***/ }),

/***/ "pox9":
/***/ (function(module, exports) {

module.exports = "<div\n  #track class=\"track\"\n  (mousedown)=\"seekStart()\"\n  (mouseup)=\"seekEnd($event.clientX)\"></div>\n<template [ngIf]=\"isLoading\">\n  <ugly-progress-spinner [isVisible]=\"true\"></ugly-progress-spinner>\n</template>\n"

/***/ }),

/***/ "t89E":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, "input{display:none}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "tem0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui__ = __webpack_require__("myhA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_waves_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_feature_extraction_feature_extraction_service__ = __webpack_require__("3lao");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper__ = __webpack_require__("eGCF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs__ = __webpack_require__("rxKx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__spectrogram_Spectrogram__ = __webpack_require__("L+Fk");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WaveformComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let WaveformComponent = class WaveformComponent {
    constructor(audioService, piperService, ngZone) {
        this.audioService = audioService;
        this.piperService = piperService;
        this.ngZone = ngZone;
        this.isSubscribedToAudioService = true;
        this.isSeeking = true;
        this.layers = [];
        this.audioBuffer = undefined;
        this.timeline = undefined;
        this.cursorLayer = undefined;
        this.isPlaying = false;
        this.isLoading = true;
    }
    set isSubscribedToExtractionService(isSubscribed) {
        if (isSubscribed) {
            if (this.featureExtractionSubscription) {
                return;
            }
            const colours = function* () {
                const circularColours = [
                    'black',
                    'red',
                    'green',
                    'purple',
                    'orange'
                ];
                let index = 0;
                const nColours = circularColours.length;
                while (true) {
                    yield circularColours[index = ++index % nColours];
                }
            }();
            this.featureExtractionSubscription =
                this.piperService.featuresExtracted$.subscribe(features => {
                    this.renderFeatures(features, colours.next().value);
                });
        }
        else {
            if (this.featureExtractionSubscription) {
                this.featureExtractionSubscription.unsubscribe();
            }
        }
    }
    set isSubscribedToAudioService(isSubscribed) {
        this._isSubscribedToAudioService = isSubscribed;
        if (isSubscribed) {
            if (this.onAudioDataSubscription) {
                return;
            }
            this.onAudioDataSubscription =
                this.audioService.audioLoaded$.subscribe(res => {
                    const wasError = res.message != null;
                    if (wasError) {
                        console.warn('No audio, display error?');
                    }
                    else {
                        this.audioBuffer = res.samples;
                    }
                });
        }
        else {
            if (this.onAudioDataSubscription) {
                this.onAudioDataSubscription.unsubscribe();
            }
        }
    }
    get isSubscribedToAudioService() {
        return this._isSubscribedToAudioService;
    }
    set isOneShotExtractor(isOneShot) {
        this._isOneShotExtractor = isOneShot;
    }
    get isOneShotExtractor() {
        return this._isOneShotExtractor;
    }
    set isSeeking(isSeeking) {
        this._isSeeking = isSeeking;
        if (isSeeking) {
            if (this.seekedSubscription) {
                return;
            }
            if (this.playingStateSubscription) {
                return;
            }
            this.seekedSubscription = this.audioService.seeked$.subscribe(() => {
                if (!this.isPlaying)
                    this.animate();
            });
            this.playingStateSubscription =
                this.audioService.playingStateChange$.subscribe(isPlaying => {
                    this.isPlaying = isPlaying;
                    if (this.isPlaying)
                        this.animate();
                });
        }
        else {
            if (this.isPlaying) {
                this.isPlaying = false;
            }
            if (this.playingStateSubscription) {
                this.playingStateSubscription.unsubscribe();
            }
            if (this.seekedSubscription) {
                this.seekedSubscription.unsubscribe();
            }
        }
    }
    get isSeeking() {
        return this._isSeeking;
    }
    set audioBuffer(buffer) {
        this._audioBuffer = buffer || undefined;
        if (this.audioBuffer) {
            this.renderWaveform(this.audioBuffer);
        }
    }
    get audioBuffer() {
        return this._audioBuffer;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.trackIdPrefix = this.trackIdPrefix || "default";
        if (this.timeline) {
            this.renderTimeline(null, true, true);
        }
        else {
            this.renderTimeline();
        }
    }
    renderTimeline(duration = 1.0, useExistingDuration = false, isInitialRender = false) {
        const track = this.trackDiv.nativeElement;
        track.innerHTML = "";
        const height = track.getBoundingClientRect().height;
        const width = track.getBoundingClientRect().width;
        const pixelsPerSecond = width / duration;
        const hasExistingTimeline = this.timeline instanceof __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.core.Timeline;
        if (hasExistingTimeline) {
            if (!useExistingDuration) {
                this.timeline.pixelsPerSecond = pixelsPerSecond;
                this.timeline.visibleWidth = width;
            }
        }
        else {
            this.timeline = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.core.Timeline(pixelsPerSecond, width);
        }
        const waveTrack = this.timeline.createTrack(track, height, `wave-${this.trackIdPrefix}`);
        if (isInitialRender && hasExistingTimeline) {
            // time axis
            const timeAxis = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.TimeAxisLayer({
                height: height,
                color: '#b0b0b0'
            });
            this.addLayer(timeAxis, waveTrack, this.timeline.timeContext, true);
            this.cursorLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.CursorLayer({
                height: height
            });
            this.addLayer(this.cursorLayer, waveTrack, this.timeline.timeContext);
        }
        // this.timeline.createTrack(track, height/2, `wave-${this.trackIdPrefix}`);
        // this.timeline.createTrack(track, height/2, `grid-${this.trackIdPrefix}`);
    }
    estimatePercentile(matrix, percentile) {
        // our sample is not evenly distributed across the whole data set:
        // it is guaranteed to include at least one sample from every
        // column, and could sample some values more than once. But it
        // should be good enough in most cases (todo: show this)
        if (matrix.length === 0) {
            return 0.0;
        }
        const w = matrix.length;
        const h = matrix[0].length;
        const n = w * h;
        const m = (n > 50000 ? 50000 : n); // should base that on the %ile
        let m_per = Math.floor(m / w);
        if (m_per < 1)
            m_per = 1;
        let sample = [];
        for (let x = 0; x < w; ++x) {
            for (let i = 0; i < m_per; ++i) {
                const y = Math.floor(Math.random() * h);
                const value = matrix[x][y];
                if (!isNaN(value) && value !== Infinity) {
                    sample.push(value);
                }
            }
        }
        if (sample.length === 0) {
            console.log("WARNING: No samples gathered, even though we hoped for " +
                (m_per * w) + " of them");
            return 0.0;
        }
        sample.sort((a, b) => { return a - b; });
        const ix = Math.floor((sample.length * percentile) / 100);
        console.log("Estimating " + percentile + "-%ile of " +
            n + "-sample dataset (" + w + " x " + h + ") as value " + ix +
            " of sorted " + sample.length + "-sample subset");
        const estimate = sample[ix];
        console.log("Estimate is: " + estimate + " (where min sampled value = " +
            sample[0] + " and max = " + sample[sample.length - 1] + ")");
        return estimate;
    }
    interpolatingMapper(hexColours) {
        const colours = hexColours.map(n => {
            const i = parseInt(n, 16);
            return [((i >> 16) & 255) / 255.0,
                ((i >> 8) & 255) / 255.0,
                ((i) & 255) / 255.0];
        });
        const last = colours.length - 1;
        return (value => {
            const m = value * last;
            if (m >= last) {
                return colours[last];
            }
            if (m <= 0) {
                return colours[0];
            }
            const base = Math.floor(m);
            const prop0 = base + 1.0 - m;
            const prop1 = m - base;
            const c0 = colours[base];
            const c1 = colours[base + 1];
            return [c0[0] * prop0 + c1[0] * prop1,
                c0[1] * prop0 + c1[1] * prop1,
                c0[2] * prop0 + c1[2] * prop1];
        });
    }
    iceMapper() {
        let hexColours = [
            // Based on ColorBrewer ylGnBu
            "ffffff", "ffff00", "f7fcf0", "e0f3db", "ccebc5", "a8ddb5",
            "7bccc4", "4eb3d3", "2b8cbe", "0868ac", "084081", "042040"
        ];
        hexColours.reverse();
        return this.interpolatingMapper(hexColours);
    }
    hsv2rgb(h, s, v) {
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        let r = 0, g = 0, b = 0;
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return [r, g, b];
    }
    greenMapper() {
        const blue = 0.6666;
        const pieslice = 0.3333;
        return (value => {
            const h = blue - value * 2.0 * pieslice;
            const s = 0.5 + value / 2.0;
            const v = value;
            return this.hsv2rgb(h, s, v);
        });
    }
    sunsetMapper() {
        return (value => {
            let r = (value - 0.24) * 2.38;
            let g = (value - 0.64) * 2.777;
            let b = (3.6 * value);
            if (value > 0.277)
                b = 2.0 - b;
            return [r, g, b];
        });
    }
    clearTimeline() {
        // loop through layers and remove them, waves-ui provides methods for this but it seems to not work properly
        const timeContextChildren = this.timeline.timeContext._children;
        for (let track of this.timeline.tracks) {
            if (track.layers.length === 0) {
                continue;
            }
            const trackLayers = Array.from(track.layers);
            while (trackLayers.length) {
                let layer = trackLayers.pop();
                if (this.layers.includes(layer)) {
                    track.remove(layer);
                    this.layers.splice(this.layers.indexOf(layer), 1);
                    const index = timeContextChildren.indexOf(layer.timeContext);
                    if (index >= 0) {
                        timeContextChildren.splice(index, 1);
                    }
                    layer.destroy();
                }
            }
        }
    }
    renderWaveform(buffer) {
        // const height: number = this.trackDiv.nativeElement.getBoundingClientRect().height / 2;
        const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
        const waveTrack = this.timeline.getTrackById(`wave-${this.trackIdPrefix}`);
        if (this.timeline) {
            // resize
            const width = this.trackDiv.nativeElement.getBoundingClientRect().width;
            this.clearTimeline();
            this.timeline.visibleWidth = width;
            this.timeline.pixelsPerSecond = width / buffer.duration;
            waveTrack.height = height;
        }
        else {
            this.renderTimeline(buffer.duration);
        }
        this.timeline.timeContext.offset = 0.5 * this.timeline.timeContext.visibleDuration;
        // time axis
        const timeAxis = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.TimeAxisLayer({
            height: height,
            color: '#b0b0b0'
        });
        this.addLayer(timeAxis, waveTrack, this.timeline.timeContext, true);
        const nchannels = buffer.numberOfChannels;
        const totalWaveHeight = height * 0.9;
        const waveHeight = totalWaveHeight / nchannels;
        for (let ch = 0; ch < nchannels; ++ch) {
            console.log("about to construct a waveform layer for channel " + ch);
            const waveformLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.WaveformLayer(buffer, {
                top: (height - totalWaveHeight) / 2 + waveHeight * ch,
                height: waveHeight,
                color: 'darkblue',
                channel: ch
            });
            this.addLayer(waveformLayer, waveTrack, this.timeline.timeContext);
        }
        this.cursorLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.CursorLayer({
            height: height
        });
        this.addLayer(this.cursorLayer, waveTrack, this.timeline.timeContext);
        this.timeline.state = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.states.CenteredZoomState(this.timeline);
        waveTrack.render();
        waveTrack.update();
        if ('ontouchstart' in window) {
            let zoomGestureJustEnded = false;
            const pixelToExponent = __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.utils.scales.linear()
                .domain([0, 100]) // 100px => factor 2
                .range([0, 1]);
            const calculateDistance = (p1, p2) => {
                return Math.pow(Math.pow(p2.x - p1.x, 2) +
                    Math.pow(p2.y - p1.y, 2), 0.5);
            };
            const hammertime = new __WEBPACK_IMPORTED_MODULE_5_hammerjs__(this.trackDiv.nativeElement);
            const scroll = (ev) => {
                if (zoomGestureJustEnded) {
                    zoomGestureJustEnded = false;
                    console.log("Skip this event: likely a single touch dangling from pinch");
                    return;
                }
                this.timeline.timeContext.offset = this.offsetAtPanStart +
                    this.timeline.timeContext.timeToPixel.invert(ev.deltaX);
                this.timeline.tracks.update();
            };
            const zoom = (ev) => {
                const minZoom = this.timeline.state.minZoom;
                const maxZoom = this.timeline.state.maxZoom;
                const distance = calculateDistance({
                    x: ev.pointers[0].clientX,
                    y: ev.pointers[0].clientY
                }, {
                    x: ev.pointers[1].clientX,
                    y: ev.pointers[1].clientY
                });
                const lastCenterTime = this.timeline.timeContext.timeToPixel.invert(ev.center.x);
                const exponent = pixelToExponent(distance - this.initialDistance);
                const targetZoom = this.initialZoom * Math.pow(2, exponent);
                this.timeline.timeContext.zoom =
                    Math.min(Math.max(targetZoom, minZoom), maxZoom);
                const newCenterTime = this.timeline.timeContext.timeToPixel.invert(ev.center.x);
                this.timeline.timeContext.offset += newCenterTime - lastCenterTime;
                this.timeline.tracks.update();
            };
            hammertime.get('pinch').set({ enable: true });
            hammertime.on('panstart', () => {
                this.offsetAtPanStart = this.timeline.timeContext.offset;
            });
            hammertime.on('panleft', scroll);
            hammertime.on('panright', scroll);
            hammertime.on('pinchstart', (e) => {
                this.initialZoom = this.timeline.timeContext.zoom;
                this.initialDistance = calculateDistance({
                    x: e.pointers[0].clientX,
                    y: e.pointers[0].clientY
                }, {
                    x: e.pointers[1].clientX,
                    y: e.pointers[1].clientY
                });
            });
            hammertime.on('pinch', zoom);
            hammertime.on('pinchend', () => {
                zoomGestureJustEnded = true;
            });
        }
        this.isLoading = false;
        this.animate();
    }
    renderSpectrogram(buffer) {
        const height = this.trackDiv.nativeElement.getBoundingClientRect().height / 2;
        const gridTrack = this.timeline.getTrackById(`grid-${this.trackIdPrefix}`);
        const spectrogramLayer = new __WEBPACK_IMPORTED_MODULE_6__spectrogram_Spectrogram__["a" /* WavesSpectrogramLayer */](buffer, {
            top: height * 0.05,
            height: height * 0.9,
            stepSize: 512,
            blockSize: 1024,
            normalise: 'none',
            mapper: this.sunsetMapper()
        });
        this.addLayer(spectrogramLayer, gridTrack, this.timeline.timeContext);
        this.timeline.tracks.update();
    }
    // TODO refactor - this doesn't belong here
    renderFeatures(extracted, colour) {
        if (this.isOneShotExtractor && !this.hasShot) {
            this.featureExtractionSubscription.unsubscribe();
            this.hasShot = true;
        }
        if (!extracted.hasOwnProperty('features') || !extracted.hasOwnProperty('outputDescriptor'))
            return;
        if (!extracted.features.hasOwnProperty('shape') || !extracted.features.hasOwnProperty('data'))
            return;
        const features = extracted.features;
        const outputDescriptor = extracted.outputDescriptor;
        // const height = this.trackDiv.nativeElement.getBoundingClientRect().height / 2;
        const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
        const waveTrack = this.timeline.getTrackById(`wave-${this.trackIdPrefix}`);
        // TODO refactor all of this
        switch (features.shape) {
            case 'vector': {
                const stepDuration = features.stepDuration;
                const featureData = features.data;
                if (featureData.length === 0)
                    return;
                const normalisationFactor = 1.0 /
                    featureData.reduce((currentMax, feature) => Math.max(currentMax, feature), -Infinity);
                const plotData = [...featureData].map((feature, i) => {
                    return {
                        cx: i * stepDuration,
                        cy: feature * normalisationFactor
                    };
                });
                let lineLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.LineLayer(plotData, {
                    color: colour,
                    height: height
                });
                this.addLayer(lineLayer, waveTrack, this.timeline.timeContext);
                break;
            }
            case 'list': {
                const featureData = features.data;
                if (featureData.length === 0)
                    return;
                // TODO look at output descriptor instead of directly inspecting features
                const hasDuration = outputDescriptor.configured.hasDuration;
                const isMarker = !hasDuration
                    && outputDescriptor.configured.binCount === 0
                    && featureData[0].featureValues == null;
                const isRegion = hasDuration
                    && featureData[0].timestamp != null;
                console.log("Have list features: length " + featureData.length +
                    ", isMarker " + isMarker + ", isRegion " + isRegion +
                    ", hasDuration " + hasDuration);
                // TODO refactor, this is incomprehensible
                if (isMarker) {
                    const plotData = featureData.map(feature => {
                        return {
                            time: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper__["toSeconds"])(feature.timestamp),
                            label: feature.label
                        };
                    });
                    let featureLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.TickLayer(plotData, {
                        height: height,
                        color: colour,
                        labelPosition: 'bottom',
                        shadeSegments: true
                    });
                    this.addLayer(featureLayer, waveTrack, this.timeline.timeContext);
                }
                else if (isRegion) {
                    console.log("Output is of region type");
                    const binCount = outputDescriptor.configured.binCount || 0;
                    const isBarRegion = featureData[0].featureValues.length >= 1 || binCount >= 1;
                    const getSegmentArgs = () => {
                        if (isBarRegion) {
                            // TODO potentially change impl., i.e avoid reduce
                            const findMin = (arr, getElement) => {
                                return arr.reduce((min, val) => Math.min(min, getElement(val)), Infinity);
                            };
                            const findMax = (arr, getElement) => {
                                return arr.reduce((min, val) => Math.max(min, getElement(val)), -Infinity);
                            };
                            const min = findMin(featureData, (x) => {
                                return findMin(x.featureValues, y => y);
                            });
                            const max = findMax(featureData, (x) => {
                                return findMax(x.featureValues, y => y);
                            });
                            const barHeight = 1.0 / height;
                            return [
                                featureData.reduce((bars, feature) => {
                                    const staticProperties = {
                                        x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper__["toSeconds"])(feature.timestamp),
                                        width: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper__["toSeconds"])(feature.duration),
                                        height: min + barHeight,
                                        color: colour,
                                        opacity: 0.8
                                    };
                                    // TODO avoid copying Float32Array to an array - map is problematic here
                                    return bars.concat([...feature.featureValues]
                                        .map(val => Object.assign({}, staticProperties, { y: val })));
                                }, []),
                                { yDomain: [min, max + barHeight], height: height }
                            ];
                        }
                        else {
                            return [featureData.map(feature => {
                                    return {
                                        x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper__["toSeconds"])(feature.timestamp),
                                        width: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper__["toSeconds"])(feature.duration),
                                        color: colour,
                                        opacity: 0.8
                                    };
                                }), { height: height }];
                        }
                    };
                    let segmentLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.SegmentLayer(...getSegmentArgs());
                    this.addLayer(segmentLayer, waveTrack, this.timeline.timeContext);
                }
                break;
            }
            case 'matrix': {
                const stepDuration = features.stepDuration;
                //!!! + start time
                const matrixData = features.data;
                if (matrixData.length === 0)
                    return;
                console.log("matrix data length = " + matrixData.length);
                console.log("height of first column = " + matrixData[0].length);
                const targetValue = this.estimatePercentile(matrixData, 95);
                const gain = (targetValue > 0.0 ? (1.0 / targetValue) : 1.0);
                console.log("setting gain to " + gain);
                const matrixEntity = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.utils.PrefilledMatrixEntity(matrixData, 0, // startTime
                stepDuration);
                let matrixLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.MatrixLayer(matrixEntity, {
                    gain,
                    height: height * 0.9,
                    top: height * 0.05,
                    normalise: 'none',
                    mapper: this.iceMapper()
                });
                this.addLayer(matrixLayer, waveTrack, this.timeline.timeContext);
                break;
            }
            default:
                console.log("Cannot render an appropriate layer for feature shape '" +
                    features.shape + "'");
        }
        this.isLoading = false;
        this.timeline.tracks.update();
    }
    animate() {
        if (!this.isSeeking)
            return;
        this.ngZone.runOutsideAngular(() => {
            // listen for time passing...
            const updateSeekingCursor = () => {
                const currentTime = this.audioService.getCurrentTime();
                this.cursorLayer.currentPosition = currentTime;
                this.cursorLayer.update();
                const currentOffset = this.timeline.timeContext.offset;
                const offsetTimestamp = currentOffset
                    + currentTime;
                const visibleDuration = this.timeline.timeContext.visibleDuration;
                // TODO reduce duplication between directions and make more declarative
                // this kinda logic should also be tested
                const mustPageForward = offsetTimestamp > visibleDuration;
                const mustPageBackward = currentTime < -currentOffset;
                if (mustPageForward) {
                    const hasSkippedMultiplePages = offsetTimestamp - visibleDuration > visibleDuration;
                    this.timeline.timeContext.offset = hasSkippedMultiplePages ?
                        -currentTime + 0.5 * visibleDuration :
                        currentOffset - visibleDuration;
                    this.timeline.tracks.update();
                }
                if (mustPageBackward) {
                    const hasSkippedMultiplePages = currentTime + visibleDuration < -currentOffset;
                    this.timeline.timeContext.offset = hasSkippedMultiplePages ?
                        -currentTime + 0.5 * visibleDuration :
                        currentOffset + visibleDuration;
                    this.timeline.tracks.update();
                }
                if (this.isPlaying)
                    requestAnimationFrame(updateSeekingCursor);
            };
            updateSeekingCursor();
        });
    }
    addLayer(layer, track, timeContext, isAxis = false) {
        timeContext.zoom = 1.0;
        if (!layer.timeContext) {
            layer.setTimeContext(isAxis ?
                timeContext : new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.core.LayerTimeContext(timeContext));
        }
        track.add(layer);
        this.layers.push(layer);
        layer.render();
        layer.update();
        if (this.cursorLayer && track.$layout.contains(this.cursorLayer.$el)) {
            track.$layout.appendChild(this.cursorLayer.$el);
        }
    }
    static changeColour(layer, colour) {
        const butcherShapes = (shape) => {
            shape.install({ color: () => colour });
            shape.params.color = colour;
            shape.update(layer._renderingContext, layer.data);
        };
        layer._$itemCommonShapeMap.forEach(butcherShapes);
        layer._$itemShapeMap.forEach(butcherShapes);
        layer.render();
        layer.update();
    }
    ngOnDestroy() {
        if (this.featureExtractionSubscription)
            this.featureExtractionSubscription.unsubscribe();
        if (this.playingStateSubscription)
            this.playingStateSubscription.unsubscribe();
        if (this.seekedSubscription)
            this.seekedSubscription.unsubscribe();
        if (this.onAudioDataSubscription)
            this.onAudioDataSubscription.unsubscribe();
    }
    seekStart() {
        this.zoomOnMouseDown = this.timeline.timeContext.zoom;
        this.offsetOnMouseDown = this.timeline.timeContext.offset;
    }
    seekEnd(x) {
        const hasSameZoom = this.zoomOnMouseDown ===
            this.timeline.timeContext.zoom;
        const hasSameOffset = this.offsetOnMouseDown ===
            this.timeline.timeContext.offset;
        if (hasSameZoom && hasSameOffset) {
            this.seek(x);
        }
    }
    seek(x) {
        if (this.timeline) {
            const timeContext = this.timeline.timeContext;
            if (this.isSeeking) {
                this.audioService.seekTo(timeContext.timeToPixel.invert(x) - timeContext.offset);
            }
        }
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* ViewChild */])('track'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === "function" && _a || Object)
], WaveformComponent.prototype, "trackDiv", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Object)
], WaveformComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", String)
], WaveformComponent.prototype, "trackIdPrefix", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WaveformComponent.prototype, "isSubscribedToExtractionService", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WaveformComponent.prototype, "isSubscribedToAudioService", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WaveformComponent.prototype, "isOneShotExtractor", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WaveformComponent.prototype, "isSeeking", null);
WaveformComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'app-waveform',
        template: __webpack_require__("pox9"),
        styles: [__webpack_require__("6o5O")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgZone */]) === "function" && _d || Object])
], WaveformComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/waveform.component.js.map

/***/ }),

/***/ "tfge":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_feature_extraction_feature_extraction_service__ = __webpack_require__("3lao");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeatureExtractionMenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let FeatureExtractionMenuComponent = class FeatureExtractionMenuComponent {
    constructor(piperService) {
        this.piperService = piperService;
        this.extractorsMap = new Map();
        this.extractors = [];
        this.requestOutput = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]();
        this.isDisabled = true;
        this.populateExtractors = available => {
            const maxCharacterLimit = 50;
            available.available.forEach(staticData => {
                const isSingleOutputExtractor = staticData.basicOutputInfo.length === 1;
                staticData.basicOutputInfo.forEach(output => {
                    const combinedKey = `${staticData.key}:${output.identifier}`;
                    this.extractorsMap.set(combinedKey, {
                        extractorKey: staticData.key,
                        combinedKey: combinedKey,
                        name: (isSingleOutputExtractor
                            ? staticData.basic.name
                            : `${staticData.basic.name}: ${output.name}`).substr(0, maxCharacterLimit) + '...',
                        outputId: output.identifier
                    });
                });
            });
            this.extractors = [...this.extractorsMap.values()];
        };
    }
    set disabled(isDisabled) {
        this.isDisabled = isDisabled;
    }
    get disabled() {
        return this.isDisabled;
    }
    ngOnInit() {
        this.piperService.list().then(this.populateExtractors);
        this.librariesUpdatedSubscription = this.piperService.librariesUpdated$.subscribe(this.populateExtractors);
    }
    extract(combinedKey) {
        const info = this.extractorsMap.get(combinedKey);
        if (info) {
            this.requestOutput.emit(info);
        }
    }
    load() {
        this.piperService.updateAvailableLibraries().subscribe(res => {
            Object.keys(res).forEach(key => this.piperService.load(key));
        });
    }
    ngOnDestroy() {
        this.librariesUpdatedSubscription.unsubscribe();
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], FeatureExtractionMenuComponent.prototype, "disabled", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* EventEmitter */]) === "function" && _a || Object)
], FeatureExtractionMenuComponent.prototype, "requestOutput", void 0);
FeatureExtractionMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* Component */])({
        selector: 'app-feature-extraction-menu',
        template: __webpack_require__("W1+o"),
        styles: [__webpack_require__("1RzP")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _b || Object])
], FeatureExtractionMenuComponent);

var _a, _b;
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/feature-extraction-menu.component.js.map

/***/ }),

/***/ "vATj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("EEr4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioPlayerService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


let AudioPlayerService = class AudioPlayerService {
    constructor(audioElement /* TODO probably shouldn't play audio this way */, audioContext, readResource, resourceManager) {
        this.audioElement = audioElement; /* TODO probably shouldn't play audio this way */
        this.audioContext = audioContext;
        this.readResource = readResource;
        this.resourceManager = resourceManager;
        this.currentObjectUrl = '';
        this.playingStateChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.playingStateChange$ = this.playingStateChange.asObservable();
        this.seeked = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.seeked$ = this.seeked.asObservable();
        this.audioElement.addEventListener('ended', () => {
            this.playingStateChange.next(this.isPlaying());
        });
        this.audioElement.addEventListener('seeked', () => {
            this.seeked.next(this.audioElement.currentTime);
        });
        this.audioLoaded = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.audioLoaded$ = this.audioLoaded.asObservable();
    }
    getCurrentTime() {
        return this.audioElement.currentTime;
    }
    isPlaying() {
        return !this.audioElement.paused;
    }
    loadAudio(resource) {
        if (this.currentObjectUrl)
            this.resourceManager.revokeUrlToResource(this.currentObjectUrl);
        const url = this.resourceManager.createUrlToResource(resource);
        this.currentObjectUrl = url;
        this.audioElement.pause();
        this.audioElement.src = url;
        this.audioElement.load();
        const decode = buffer => {
            return new Promise((res, rej) => this.audioContext.decodeAudioData(buffer, res, rej));
        };
        this.readResource(resource)
            .then(decode)
            .then(val => {
            this.audioLoaded.next({
                samples: val,
                url: url,
                mimeType: resource.type
            });
        })
            .catch(err => {
            this.audioLoaded.next({
                message: err.message
            });
        });
        return url;
    }
    togglePlaying() {
        if (this.audioElement.readyState >= 2) {
            this.isPlaying() ? this.audioElement.pause() : this.audioElement.play();
            this.playingStateChange.next(this.isPlaying());
        }
    }
    setVolume(value) {
        this.audioElement.volume = value; // TODO check bounds?
    }
    seekTo(seconds) {
        if (seconds < 0) {
            this.audioElement.currentTime = 0;
        }
        else if (seconds < this.getDuration()) {
            this.audioElement.currentTime = seconds;
        }
        else {
            this.audioElement.currentTime = this.getDuration();
        }
    }
    seekBy(seconds) {
        // TODO some kind of error handling?
        this.audioElement.currentTime += seconds;
    }
    seekToStart() {
        this.audioElement.currentTime = 0;
    }
    seekToEnd() {
        this.audioElement.currentTime = this.getDuration();
    }
    getDuration() {
        return this.audioElement.duration || 0;
    }
};
AudioPlayerService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(HTMLAudioElement)),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])('AudioContext')),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])('ResourceReader')),
    __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])('UrlResourceLifetimeManager')),
    __metadata("design:paramtypes", [Object, Object, Function, Object])
], AudioPlayerService);

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/audio-player.service.js.map

/***/ }),

/***/ "vB4/":
/***/ (function(module, exports) {

module.exports = "\n<template ngFor let-item [ngForOf]=\"analyses\">\n  <div [class.break]=\"item.isRoot\">\n      <ugly-analysis-item\n        [timeline]=\"item.hasSharedTimeline ? sharedTimeline : undefined\"\n        [title]=\"item.title\"\n        [description]=\"item.description\"\n        [isActive]=\"rootAudioUri === item.rootAudioUri\"\n        [isRoot]=\"item.isRoot\"></ugly-analysis-item>\n  </div>\n</template>\n"

/***/ }),

/***/ "x35b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("XS25");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("nzH4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("Rw+2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("kZql");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__("7G6f");





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/main.js.map

/***/ })

},[1]);