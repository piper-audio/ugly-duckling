webpackJsonp([0,5],{

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

module.exports = "<md-toolbar color=\"primary\">\n  <md-icon svgIcon=\"duck\"></md-icon>\n\n  <span class=\"app-toolbar-filler\"></span>\n\n  <app-playback-control></app-playback-control>\n  <button md-icon-button>\n    <md-icon>mic_off</md-icon>\n  </button>\n\n  <!-- This fills the remaining space of the current row -->\n  <span class=\"app-toolbar-filler\"></span>\n\n\n  <app-audio-file-open (fileOpened)=\"onFileOpened($event)\"></app-audio-file-open>\n  <!-- menu opens when trigger button is clicked -->\n  <button md-icon-button (click)=\"sidenav.toggle()\">\n    <md-icon>extension</md-icon>\n  </button>\n</md-toolbar>\n\n<md-sidenav-container>\n  <md-sidenav #sidenav align=\"start\" mode=\"over\">\n    <app-feature-extraction-menu\n      (requestOutput)=\"extractFeatures($event)\"\n      [disabled]=\"!canExtract\">\n    </app-feature-extraction-menu>\n  </md-sidenav>\n  <app-waveform\n    [audioBuffer]=\"audioBuffer\"\n    ></app-waveform>\n</md-sidenav-container>\n"

/***/ }),

/***/ "6o5O":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, ".track{height:100%}", ""]);

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
/* unused harmony export createAudioContext */
/* unused harmony export createAudioElement */
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__waveform_waveform_component__["a" /* WaveformComponent */],
            __WEBPACK_IMPORTED_MODULE_7__audio_file_open_audio_file_open_component__["a" /* AudioFileOpenComponent */],
            __WEBPACK_IMPORTED_MODULE_8__playback_control_playback_control_component__["a" /* PlaybackControlComponent */],
            __WEBPACK_IMPORTED_MODULE_11__feature_extraction_menu_feature_extraction_menu_component__["a" /* FeatureExtractionMenuComponent */]
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
            __WEBPACK_IMPORTED_MODULE_10__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */],
            { provide: 'PiperRepoUri', useValue: 'assets/remote-plugins.json' }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/app.module.js.map

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
        this.canExtract = false;
        iconRegistry.addSvgIcon('duck', sanitizer.bypassSecurityTrustResourceUrl('assets/duck.svg'));
    }
    onFileOpened(file) {
        this.canExtract = false;
        const reader = new FileReader();
        const mimeType = file.type;
        reader.onload = (event) => {
            this.audioService.loadAudioFromUrl(URL.createObjectURL(new Blob([event.target.result], { type: mimeType })));
            // TODO use a rxjs/Subject instead?
            this.audioService.decodeAudioData(event.target.result).then(audioBuffer => {
                this.audioBuffer = audioBuffer;
                if (this.audioBuffer)
                    this.canExtract = true;
            });
        };
        reader.readAsArrayBuffer(file);
    }
    extractFeatures(outputInfo) {
        if (!this.canExtract || !outputInfo)
            return;
        this.canExtract = false;
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
        }).catch(err => console.error(err));
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

/***/ "nKj7":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"emitPlayPause()\">\n  <md-icon>\n    <template [ngIf]=\"isPlaying()\">pause</template>\n    <template [ngIf]=\"!isPlaying()\">play_arrow</template>\n  </md-icon>\n</button>\n"

/***/ }),

/***/ "okgc":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, ".app-toolbar-filler{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}md-sidenav-container{height:calc(100vh - 64px)}md-sidenav{text-align:center}md-tab-group{height:calc(100vh - 64px)}md-tab-group>>>.md-tab-body-wrapper{-webkit-box-align:center;-ms-flex-align:center;align-items:center}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "pox9":
/***/ (function(module, exports) {

module.exports = "<div #track class=\"track\"></div>\n"

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
        this.colouredLayers = new Map();
        this.disposableLayers = [];
        this._audioBuffer = undefined;
        this.timeline = undefined;
        this.cursorLayer = undefined;
        this.isPlaying = false;
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
        this.featureExtractionSubscription = piperService.featuresExtracted$.subscribe(features => {
            this.renderFeatures(features, colours.next().value);
        });
        this.playingStateSubscription = audioService.playingStateChange$.subscribe(isPlaying => {
            this.isPlaying = isPlaying;
            if (this.isPlaying)
                this.animate();
        });
        this.seekedSubscription = audioService.seeked$.subscribe(() => {
            if (!this.isPlaying)
                this.animate();
        });
    }
    set audioBuffer(buffer) {
        this._audioBuffer = buffer || undefined;
        if (this.audioBuffer)
            this.renderWaveform(this.audioBuffer);
    }
    get audioBuffer() {
        return this._audioBuffer;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.timeline = this.renderTimeline();
    }
    renderTimeline(duration = 1.0) {
        const track = this.trackDiv.nativeElement;
        track.innerHTML = "";
        const height = track.getBoundingClientRect().height;
        const width = track.getBoundingClientRect().width;
        const pixelsPerSecond = width / duration;
        const timeline = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.core.Timeline(pixelsPerSecond, width);
        timeline.createTrack(track, height, 'main');
        return timeline;
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
            return [(i >> 16) & 255, (i >> 8) & 255, i & 255, 255];
        });
        const last = colours.length - 1;
        return (value => {
            // value must be in the range [0,1]. We quantize to 256 levels,
            // as the PNG encoder deep inside uses a limited palette for
            // simplicity. Should document this for the mapper. Also that
            // individual colour values should be integers
            value = Math.round(value * 255) / 255;
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
            return [Math.round(c0[0] * prop0 + c1[0] * prop1),
                Math.round(c0[1] * prop0 + c1[1] * prop1),
                Math.round(c0[2] * prop0 + c1[2] * prop1),
                255];
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
    renderWaveform(buffer) {
        const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
        const mainTrack = this.timeline.getTrackById('main');
        if (this.timeline) {
            // resize
            const width = this.trackDiv.nativeElement.getBoundingClientRect().width;
            // loop through layers and remove them, waves-ui provides methods for this but it seems to not work properly
            const timeContextChildren = this.timeline.timeContext._children;
            for (let i = 0, length = this.disposableLayers.length; i < length; ++i) {
                let layer = this.disposableLayers.pop();
                mainTrack.remove(layer);
                const index = timeContextChildren.indexOf(layer.timeContext);
                if (index >= 0)
                    timeContextChildren.splice(index, 1);
                layer.destroy();
            }
            this.colouredLayers.clear();
            this.timeline.visibleWidth = width;
            this.timeline.pixelsPerSecond = width / buffer.duration;
            mainTrack.height = height;
        }
        else {
            this.timeline = this.renderTimeline(buffer.duration);
        }
        this.timeline.timeContext.offset = 0.5 * this.timeline.timeContext.visibleDuration;
        // time axis
        const timeAxis = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.TimeAxisLayer({
            height: height,
            color: '#b0b0b0'
        });
        this.addLayer(timeAxis, mainTrack, this.timeline.timeContext, true);
        const waveformLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.WaveformLayer(buffer, {
            top: 10,
            height: height * 0.9,
            color: 'darkblue'
        });
        this.addLayer(waveformLayer, mainTrack, this.timeline.timeContext);
        /*
            const spectrogramLayer = new wavesUI.helpers.SpectrogramLayer(buffer, {
              top: 10,
              height: height * 0.9,
              stepSize: 512,
              fftSize: 1024
            });
            this.addLayer(spectrogramLayer, mainTrack, this.timeline.timeContext);
        */
        this.cursorLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.CursorLayer({
            height: height
        });
        this.addLayer(this.cursorLayer, mainTrack, this.timeline.timeContext);
        this.timeline.state = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.states.CenteredZoomState(this.timeline);
        mainTrack.render();
        mainTrack.update();
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
            const seek = (ev) => {
                this.audioService.seekTo(this.timeline.timeContext.timeToPixel.invert(ev.center.x) - this.timeline.timeContext.offset);
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
            hammertime.on('tap', seek);
        }
        this.animate();
    }
    // TODO refactor - this doesn't belong here
    renderFeatures(extracted, colour) {
        if (!extracted.hasOwnProperty('features') || !extracted.hasOwnProperty('outputDescriptor'))
            return;
        if (!extracted.features.hasOwnProperty('shape') || !extracted.features.hasOwnProperty('data'))
            return;
        const features = extracted.features;
        const outputDescriptor = extracted.outputDescriptor;
        const height = this.trackDiv.nativeElement.getBoundingClientRect().height;
        const mainTrack = this.timeline.getTrackById('main');
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
                this.colouredLayers.set(this.addLayer(lineLayer, mainTrack, this.timeline.timeContext), colour);
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
                // TODO refactor, this is incomprehensible
                if (isMarker) {
                    const plotData = featureData.map(feature => {
                        return { x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper__["toSeconds"])(feature.timestamp) };
                    });
                    let markerLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.MarkerLayer(plotData, {
                        height: height,
                        color: colour,
                    });
                    this.colouredLayers.set(this.addLayer(markerLayer, mainTrack, this.timeline.timeContext), colour);
                }
                else if (isRegion) {
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
                    this.colouredLayers.set(this.addLayer(segmentLayer, mainTrack, this.timeline.timeContext), colour);
                }
                break;
            }
            case 'matrix': {
                const stepDuration = features.stepDuration;
                const matrixData = features.data;
                if (matrixData.length === 0)
                    return;
                console.log("matrix data length = " + matrixData.length);
                console.log("height of first column = " + matrixData[0].length);
                const targetValue = this.estimatePercentile(matrixData, 95);
                const gain = (targetValue > 0.0 ? (1.0 / targetValue) : 1.0);
                console.log("setting gain to " + gain);
                const matrixEntity = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.utils.PrefilledMatrixEntity(matrixData);
                let matrixLayer = new __WEBPACK_IMPORTED_MODULE_2_waves_ui___default.a.helpers.MatrixLayer(matrixEntity, {
                    gain,
                    height: height * 0.8,
                    top: height * 0.1,
                    normalise: 'none',
                    mapper: this.iceMapper()
                });
                this.colouredLayers.set(this.addLayer(matrixLayer, mainTrack, this.timeline.timeContext), colour);
                break;
            }
            default:
                console.log("Cannot render an appropriate layer for feature shape '" +
                    features.shape + "'");
        }
        this.timeline.tracks.update();
    }
    animate() {
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
        layer.render();
        layer.update();
        if (this.cursorLayer) {
            track.$layout.appendChild(this.cursorLayer.$el);
        }
        return this.disposableLayers.push(layer) - 1;
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
        this.featureExtractionSubscription.unsubscribe();
        this.playingStateSubscription.unsubscribe();
        this.seekedSubscription.unsubscribe();
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* ViewChild */])('track'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === "function" && _a || Object)
], WaveformComponent.prototype, "trackDiv", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WaveformComponent.prototype, "audioBuffer", null);
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
    constructor(audioElement /* TODO probably shouldn't play audio this way */, audioContext) {
        this.audioElement = audioElement; /* TODO probably shouldn't play audio this way */
        this.audioContext = audioContext;
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
    }
    getCurrentTime() {
        return this.audioElement.currentTime;
    }
    isPlaying() {
        return !this.audioElement.paused;
    }
    decodeAudioData(buffer) {
        return new Promise((res, rej) => this.audioContext.decodeAudioData(buffer, res, rej));
    }
    loadAudioFromUrl(url) {
        if (this.currentObjectUrl)
            URL.revokeObjectURL(this.currentObjectUrl);
        this.currentObjectUrl = url;
        this.audioElement.pause();
        this.audioElement.src = url;
        this.audioElement.load();
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
        return this.audioElement.duration;
    }
};
AudioPlayerService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(HTMLAudioElement)),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])('AudioContext')),
    __metadata("design:paramtypes", [Object, Object])
], AudioPlayerService);

//# sourceMappingURL=/Users/lucas/code/ugly-duckling/src/audio-player.service.js.map

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