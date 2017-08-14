webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cDNt");


/***/ }),

/***/ "1B76":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rP7Y")(false);
// imports


// module
exports.push([module.i, ".track{height:100%;width:100%}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "9jta":
/***/ (function(module, exports) {

module.exports = "<md-card>\n  <md-card-header>\n    <md-card-title>{{item.title}}</md-card-title>\n    <md-card-subtitle>{{item.description}}</md-card-subtitle>\n  </md-card-header>\n  <md-card-content>\n    <div class=\"content\">\n      <ng-template [ngIf]=\"isLoading()\">\n        <ugly-progress-bar\n          [isDeterminate]=\"true\"\n          [progress]=\"item.progress\"\n        ></ugly-progress-bar>\n      </ng-template>\n      <ng-template [ngIf]=\"!isLoading()\">\n        <ugly-progress-spinner *ngIf=\"isPending()\"></ugly-progress-spinner>\n        <ugly-waves-play-head\n          [colour]=\"'#c33c54'\"\n          [isActive]=\"isActive\"\n        >\n          <ugly-waveform\n            *ngIf=\"isAudioItem(); else notAudio\"\n            [timeline]=\"timeline\"\n            [width]=\"contentWidth\"\n            [audioBuffer]=\"item.audioData\"\n            [onSeek]=\"onSeek\"\n            [colour]=\"'#0868ac'\"\n            [duration]=\"getDuration()\"\n          ></ugly-waveform>\n        </ugly-waves-play-head>\n\n\n        <ugly-waves-play-head\n          #notAudio\n          *ngIf=\"getFeatureShape() as shape\"\n          [ngSwitch]=\"shape\"\n          [colour]=\"'#c33c54'\"\n          [isActive]=\"isActive\"\n        >\n          <ugly-cross-hair-inspector\n            *ngSwitchCase=\"'vector'\"\n            [unit]=\"item.unit\"\n            [isAnimated]=\"isActive\"\n          >\n            <ugly-curve\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [curve]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-curve>\n          </ugly-cross-hair-inspector>\n          <ugly-cross-hair-inspector\n            *ngSwitchCase=\"'tracks'\"\n            [unit]=\"item.unit\"\n            [isAnimated]=\"isActive\"\n          >\n            <ugly-tracks\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [tracks]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-tracks>\n          </ugly-cross-hair-inspector>\n          <ugly-cross-hair-inspector\n            *ngSwitchCase=\"'notes'\"\n            [unit]=\"item.unit\"\n            [isAnimated]=\"isActive\"\n          >\n            <ugly-notes\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [notes]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-notes>\n          </ugly-cross-hair-inspector>\n          <ugly-cross-hair-inspector\n            *ngSwitchCase=\"'regions'\"\n            [unit]=\"item.unit\"\n            [isAnimated]=\"isActive\"\n          >\n            <ugly-regions\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [regions]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-regions>\n          </ugly-cross-hair-inspector>\n          <ugly-vertical-scale\n            *ngSwitchCase=\"'matrix'\"\n          >\n            <ugly-grid\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [grid]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-grid>\n          </ugly-vertical-scale>\n          <ugly-instants\n            *ngSwitchCase=\"'instants'\"\n            [colour]=\"getNextColour()\"\n            [timeline]=\"timeline\"\n            [width]=\"contentWidth\"\n            [onSeek]=\"onSeek\"\n            [instants]=\"item.collected\"\n            [duration]=\"getDuration()\"\n          ></ugly-instants>\n\n          <div *ngSwitchDefault>Feature cannot be visualised.</div>\n        </ugly-waves-play-head>\n      </ng-template>\n    </div>\n  </md-card-content>\n  <md-card-actions\n    *ngIf=\"isAudioItem()\">\n    <a md-icon-button\n       *ngIf=\"isAudioItem() && item.isExportable\"\n      [href]=\"sanitize(item.uri)\"\n      [download]=\"generateFilename(item)\"\n    ><md-icon>file_download</md-icon></a>\n    <button md-icon-button (click)=\"remove.emit(item)\">\n      <md-icon>delete_forever</md-icon>\n    </button>\n  </md-card-actions>\n</md-card>\n"

/***/ }),

/***/ "AERx":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rP7Y")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "AcCh":
/***/ (function(module, exports) {

module.exports = "<div\n  #track class=\"track\"\n  (mousedown)=\"seekStart()\"\n  (mouseup)=\"seekEnd($event.clientX)\"></div>\n"

/***/ }),

/***/ "D/YE":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rP7Y")(false);
// imports


// module
exports.push([module.i, ".break{margin-bottom:32px}.feed{width:100%;overflow-x:hidden}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "Eemu":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"emitToggleRecording()\">\n  <md-icon>\n    <ng-template [ngIf]=\"recordingStatus == 'enabled'\">mic_none</ng-template>\n    <ng-template [ngIf]=\"recordingStatus == 'disabled'\">mic_off</ng-template>\n    <ng-template [ngIf]=\"recordingStatus == 'recording'\">mic_on</ng-template>\n  </md-icon>\n</button>\n\n"

/***/ }),

/***/ "IXBa":
/***/ (function(module, exports) {

module.exports = "<div class=\"feed\">\n  <ng-template ngFor let-item [ngForOf]=\"analyses\">\n    <div [class.break]=\"isAudioItem(item)\">\n      <ugly-analysis-item (remove)=\"removeItem.emit($event)\"\n        [timeline]=\"getOrCreateTimeline(item)\"\n        [isActive]=\"isActiveItem(item)\"\n        [item]=\"item\"\n        [contentWidth]=\"width\"\n        [onSeek]=\"getOnSeekForItem(item)\"\n      ></ugly-analysis-item>\n    </div>\n  </ng-template>\n</div>\n"

/***/ }),

/***/ "J4P9":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <md-list dense>\n    <ng-container\n      *ngFor=\"let extractor of extractors\"\n    >\n      <h3 md-subheader>{{extractor.name}}</h3>\n      <md-list-item\n        *ngFor=\"let output of extractor.outputs\"\n        (click)=\"extract(output)\">\n        <md-icon md-list-icon>{{getFeatureIconName(output)}}</md-icon>\n        <h4 md-line>{{output.name}}</h4>\n        <p md-line>{{output.combinedKey}}</p>\n        <button md-icon-button\n                (click)=\"extract(output); $event.stopPropagation()\"\n                [disabled]=\"disabled\">\n          <md-icon>add</md-icon>\n        </button>\n      </md-list-item>\n      <md-divider></md-divider>\n    </ng-container>\n  </md-list>\n  <md-spinner *ngIf=\"isLoading\"></md-spinner>\n  <button\n    md-button\n    (click)=\"load()\"\n    [disabled]=\"isLoading\"\n  >Load more</button>\n</div>\n"

/***/ }),

/***/ "NXUV":
/***/ (function(module, exports) {

//# sourceMappingURL=PlayHeadHelpers.js.map

/***/ }),

/***/ "bese":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"emitFastRewindStart()\">\n  <md-icon>skip_previous</md-icon>\n</button>\n<button md-icon-button (click)=\"emitPlayPause()\">\n  <md-icon>\n    <ng-template [ngIf]=\"isPlaying()\">pause</ng-template>\n    <ng-template [ngIf]=\"!isPlaying()\">play_arrow</ng-template>\n  </md-icon>\n</button>\n"

/***/ }),

/***/ "cDNt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/polyfills.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__("GWWY");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__("f/CF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__("KvE9");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__("zbpw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__("NzKl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__("ajBu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__("feEK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__("r24B");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__("pEMT");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__("jOBH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__("Rjcp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__("W8w6");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__("yJzT");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__("/wY1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__("+iEx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_web_animations_js__ = __webpack_require__("lDyL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_web_animations_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_web_animations_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__ = __webpack_require__("eFQL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_hammerjs__ = __webpack_require__("rgUS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_hammerjs__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/













/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following to support `@angular/animation`. */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/** Evergreen browsers require these. **/


/** ALL Firefox browsers require the following to support `@angular/animation`. **/
 // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.

//# sourceMappingURL=polyfills.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/services/File.ts
class UrlResourceLifetimeManager {
}
//# sourceMappingURL=File.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/services/audio-player/audio-player.service.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("rlar");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("0imh");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__);
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
        this.playingStateChange = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.playingStateChange$ = this.playingStateChange
            .asObservable();
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
    loadAudioFromUri(uri) {
        this.currentObjectUrl = uri;
        this.audioElement.pause();
        this.audioElement.src = uri;
        this.audioElement.load();
    }
    loadAudio(resource) {
        const url = this.resourceManager.createUrlToResource(resource);
        this.loadAudioFromUri(url);
        const decode = buffer => {
            try {
                return this.audioContext.decodeAudioData(buffer);
            }
            catch (e) {
                console.warn('Falling back to callback style decodeAudioData');
                return new Promise((res, rej) => this.audioContext.decodeAudioData(buffer, res, rej));
            }
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
            const message = err && err.message ? err.message : 'Read error';
            this.audioLoaded.next({
                message: message
            });
        });
        return url;
    }
    unload() {
        this.loadAudioFromUri('');
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(HTMLAudioElement)),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('AudioContext')),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('ResourceReader')),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('UrlResourceLifetimeManager')),
    __metadata("design:paramtypes", [Object, Object, Function, typeof (_a = typeof UrlResourceLifetimeManager !== "undefined" && UrlResourceLifetimeManager) === "function" && _a || Object])
], AudioPlayerService);

var _a;
//# sourceMappingURL=audio-player.service.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/FeatureUtilities.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_piper_js_time__ = __webpack_require__("Xtij");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_piper_js_time___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_piper_js_time__);
/**
 * Created by lucast on 24/05/2017.
 */

function getCanonicalNoteLikeUnit(unit) {
    const canonicalUnits = ['midi', 'hz'];
    return canonicalUnits.find(canonicalUnit => {
        return unit.toLowerCase().indexOf(canonicalUnit) >= 0;
    });
}
function mapFeaturesToNotes(featureData, descriptor) {
    const canonicalUnit = getCanonicalNoteLikeUnit(descriptor.configured.unit);
    const isHz = canonicalUnit === 'hz';
    return featureData.map(feature => ({
        time: Object(__WEBPACK_IMPORTED_MODULE_0_piper_js_time__["toSeconds"])(feature.timestamp),
        duration: Object(__WEBPACK_IMPORTED_MODULE_0_piper_js_time__["toSeconds"])(feature.duration),
        pitch: isHz ?
            frequencyToMidiNote(feature.featureValues[0]) : feature.featureValues[0]
    }));
}
function mapFeaturesToRegions(featureData, descriptor) {
    return featureData.map(feature => ({
        time: Object(__WEBPACK_IMPORTED_MODULE_0_piper_js_time__["toSeconds"])(feature.timestamp),
        duration: Object(__WEBPACK_IMPORTED_MODULE_0_piper_js_time__["toSeconds"])(feature.duration),
        value: feature.featureValues.length > 0 ? feature.featureValues[0] : null,
        label: feature.label
    }));
}
function frequencyToMidiNote(frequency, concertA = 440.0) {
    return 69 + 12 * Math.log2(frequency / concertA);
}
function* createColourGenerator(colours) {
    let index = 0;
    const nColours = colours.length;
    while (true) {
        yield colours[index = ++index % nColours];
    }
}
const defaultColourGenerator = createColourGenerator([
    '#0868ac',
    '#c33c54',
    '#17bebb',
    '#001021',
    '#fa8334',
    '#034748' // "deep jungle green"
]);
class Grid {
}
// These needn't be classes (could just be interfaces), just experimenting
class ShapedFeature {
}
class Vector extends ShapedFeature {
}
class Matrix extends ShapedFeature {
}
class Tracks extends ShapedFeature {
}
class Notes extends ShapedFeature {
}
class Regions extends ShapedFeature {
}
class Instants extends ShapedFeature {
}
function hasKnownShapeOtherThanList(shape) {
    return ['vector', 'matrix', 'tracks'].includes(shape);
}
function throwShapeError(compileAssertion) {
    throw new Error('No shape could be deduced');
}
const rdfTypes = {
    'http://purl.org/ontology/af/Note': 'notes',
};
function deduceHigherLevelFeatureShape(response) {
    const collection = response.features;
    const descriptor = response.outputDescriptor;
    if (hasKnownShapeOtherThanList(collection.shape)) {
        return collection.shape;
    }
    // TODO it's a shame that the types in piper-js don't make this easy for the
    // compiler to deduce
    if (collection.shape !== 'list' && collection.collected instanceof Array) {
        throwShapeError();
    }
    const featureData = collection.collected;
    const hasDuration = descriptor.configured.hasDuration;
    const binCount = descriptor.configured.binCount;
    const isMarker = !hasDuration
        && binCount === 0
        && (featureData.length === 0 || featureData[0].featureValues == null);
    if (isMarker) {
        return 'instants';
    }
    if (descriptor.static) {
        const typeURI = descriptor.static.typeURI;
        if (typeof typeURI === 'string' && typeof rdfTypes[typeURI] === 'string') {
            return rdfTypes[typeURI];
        }
    }
    const isRegionLike = hasDuration &&
        (featureData.length > 0 && featureData[0].timestamp != null);
    const hasUnit = descriptor.configured && descriptor.configured.unit;
    const isMaybeNote = hasUnit
        && getCanonicalNoteLikeUnit(descriptor.configured.unit)
        && [1, 2].find(nBins => nBins === binCount);
    if (isRegionLike) {
        if (isMaybeNote) {
            return 'notes';
        }
        else {
            return 'regions';
        }
    }
    throwShapeError();
}
function toKnownShape(response) {
    const deducedShape = deduceHigherLevelFeatureShape(response);
    switch (deducedShape) {
        case 'vector':
            return response.features;
        case 'matrix':
            return {
                shape: deducedShape,
                collected: Object.assign(response.features.collected, {
                    binNames: response.outputDescriptor.configured.binNames || []
                })
            };
        case 'tracks':
            return response.features;
        case 'notes':
            return {
                shape: deducedShape,
                collected: mapFeaturesToNotes(response.features.collected, response.outputDescriptor)
            };
        case 'regions':
            return {
                shape: deducedShape,
                collected: mapFeaturesToRegions(response.features.collected, response.outputDescriptor)
            };
        case 'instants':
            const featureData = response.features.collected;
            return {
                shape: deducedShape,
                collected: featureData.map(feature => ({
                    time: Object(__WEBPACK_IMPORTED_MODULE_0_piper_js_time__["toSeconds"])(feature.timestamp),
                    label: feature.label
                }))
            };
    }
    throwShapeError(deducedShape);
}
function generatePlotData(features) {
    const winnowed = features.filter(feature => feature.data.length > 0);
    // First establish a [min,max] range across all of the features
    let [min, max] = winnowed.reduce((acc, feature) => {
        return feature.data.reduce((acc, val) => {
            const [min, max] = acc;
            return [Math.min(min, val), Math.max(max, val)];
        }, acc);
    }, [Infinity, -Infinity]);
    if (min === Infinity) {
        min = 0;
        max = 1;
    }
    if (min !== min || max !== max) {
        console.warn('WARNING: min or max is NaN');
        min = 0;
        max = 1;
    }
    return {
        data: winnowed.map(feature => {
            let duration = 0;
            // Give the plot items positions relative to the start of the
            // line, rather than relative to absolute time 0. This is
            // because we'll be setting the layer timeline start property
            // later on and these will be positioned relative to that
            const plotData = [...feature.data].map((val, i) => {
                const t = i * feature.stepDuration;
                duration = t + feature.stepDuration;
                return {
                    cx: t,
                    cy: val
                };
            });
            return {
                points: plotData,
                startTime: feature.startTime,
                duration: duration
            };
        }),
        yDomain: [min, max]
    };
}
//# sourceMappingURL=FeatureUtilities.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/services/notifications/notifications.service.ts
/* harmony import */ var notifications_service___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("Z04r");
var notifications_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var notifications_service___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 06/07/2017.
 */


let NotificationService = class NotificationService {
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    displayError(message) {
        // TODO perhaps actual distinguish this as an error?
        this.displayMessage(message);
    }
    displayMessage(message) {
        this.snackBar.open(message, 'Dismiss', { duration: 5000 });
    }
    ;
};
NotificationService = notifications_service___decorate([
    Object(notifications_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    notifications_service___metadata("design:paramtypes", [typeof (notifications_service__a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MdSnackBar */]) === "function" && notifications_service__a || Object])
], NotificationService);

var notifications_service__a;
//# sourceMappingURL=notifications.service.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/services/feature-extraction/feature-extraction.service.ts
/* harmony import */ var feature_extraction_service___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var feature_extraction_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("rlar");
/* harmony import */ var feature_extraction_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(feature_extraction_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("CPp0");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piper_js_web_worker__ = __webpack_require__("pDgZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piper_js_web_worker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_piper_js_web_worker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_js_streaming__ = __webpack_require__("vJQ5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_js_streaming___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_piper_js_streaming__);
var feature_extraction_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var feature_extraction_service___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var feature_extraction_service___param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







let feature_extraction_service_FeatureExtractionService = class FeatureExtractionService {
    constructor(http, repositoryUri, notifier) {
        this.http = http;
        this.repositoryUri = repositoryUri;
        this.notifier = notifier;
        this.worker = new Worker('bootstrap-feature-extraction-worker.js');
        this.featuresExtracted = new feature_extraction_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.featuresExtracted$ = this.featuresExtracted.asObservable();
        this.librariesUpdated = new feature_extraction_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.librariesUpdated$ = this.librariesUpdated.asObservable();
        this.progressUpdated = new feature_extraction_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.progressUpdated$ = this.progressUpdated.asObservable();
        this.worker.addEventListener('message', (ev) => {
            const isValidResponse = ev.data.method === 'import'
                && ev.data.result && ev.data.result.available;
            if (isValidResponse) {
                ev.stopImmediatePropagation();
                this.librariesUpdated.next(ev.data.result);
            }
        }, true);
        this.client = new __WEBPACK_IMPORTED_MODULE_3_piper_js_web_worker__["WebWorkerStreamingClient"](this.worker, Object(__WEBPACK_IMPORTED_MODULE_3_piper_js_web_worker__["countingIdProvider"])(0));
    }
    list() {
        return this.client.list({});
    }
    extract(analysisItemId, request) {
        let config;
        return Object(__WEBPACK_IMPORTED_MODULE_4_piper_js_streaming__["collect"])(this.client.process(request), val => {
            if (val.configuration) {
                config = val.configuration;
            }
            const progress = val.progress;
            if (progress.totalBlockCount > 0) {
                this.progressUpdated.next({
                    id: analysisItemId,
                    value: (progress.processedBlockCount / progress.totalBlockCount) * 100
                });
            }
        }).then(features => {
            const shaped = toKnownShape({
                features: features,
                outputDescriptor: config.outputDescriptor
            });
            const result = config.outputDescriptor.configured.unit ? {
                id: analysisItemId,
                result: shaped,
                unit: shaped.shape === 'notes' ?
                    'MIDI note' : config.outputDescriptor.configured.unit
            } : {
                id: analysisItemId,
                result: shaped
            };
            this.featuresExtracted.next(result);
            return result;
        });
    }
    updateAvailableLibraries() {
        this.http.get(this.repositoryUri)
            .toPromise() // just turn into a promise for now to subscribe / execute
            .then(res => {
            this.worker.postMessage({
                method: 'addRemoteLibraries',
                params: res.json()
            });
        })
            .catch(err => this.notifier.displayError(err));
    }
    load(libraryKey) {
        this.worker.postMessage({ method: 'import', params: libraryKey });
    }
};
feature_extraction_service_FeatureExtractionService = feature_extraction_service___decorate([
    Object(feature_extraction_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    feature_extraction_service___param(1, Object(feature_extraction_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('PiperRepoUri')),
    feature_extraction_service___metadata("design:paramtypes", [typeof (feature_extraction_service__a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && feature_extraction_service__a || Object, String, typeof (_b = typeof NotificationService !== "undefined" && NotificationService) === "function" && _b || Object])
], feature_extraction_service_FeatureExtractionService);

var feature_extraction_service__a, _b;
//# sourceMappingURL=feature-extraction.service.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/analysis-item/AnalysisItem.ts
class Item {
}
function isItem(item) {
    return item.id != null && item.hasSharedTimeline != null;
}
function isPendingRootAudioItem(item) {
    return isItem(item) && typeof item.uri === 'string';
}
function isLoadedRootAudioItem(item) {
    return item && isPendingRootAudioItem(item) &&
        item.audioData instanceof AudioBuffer;
}
function isPendingAnalysisItem(item) {
    const downcast = item;
    return isLoadedRootAudioItem(downcast.parent)
        && typeof downcast.extractorKey === 'string';
}
function isExtractedAnalysisItem(it) {
    const downcast = it;
    return isPendingAnalysisItem(it) &&
        downcast.shape != null &&
        downcast.collected != null;
}
function getRootAudioItem(item) {
    if (isPendingRootAudioItem(item)) {
        return item;
    }
    if (isPendingAnalysisItem(item)) {
        return item.parent;
    }
    throw new Error('Invalid item.');
}
// these should probably be actual concrete types with their own getUri methods
function getRootUri(item) {
    return getRootAudioItem(item).uri;
}
function createExtractionRequest(item) {
    return {
        audioData: [...Array(item.parent.audioData.numberOfChannels).keys()]
            .map(i => item.parent.audioData.getChannelData(i)),
        audioFormat: {
            sampleRate: item.parent.audioData.sampleRate,
            channelCount: item.parent.audioData.numberOfChannels,
            length: item.parent.audioData.length
        },
        key: item.extractorKey,
        outputId: item.outputId
    };
}
//# sourceMappingURL=AnalysisItem.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/Session.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const exampleSession = {
    root: {
        id: '1',
        hasSharedTimeline: true,
        title: 'Drum Loop',
        description: 'Remotely hosted audio file',
        uri: 'https://piper-audio.github.io/waves-ui-piper/examples/assets/drum-loop.wav'
    },
    analyses: [
        {
            id: '2',
            hasSharedTimeline: true,
            extractorKey: 'vamp-example-plugins:amplitudefollower',
            outputId: 'amplitude',
            title: 'Amplitude',
            description: 'amplitude'
        },
        {
            id: '3',
            hasSharedTimeline: true,
            extractorKey: 'vamp-example-plugins:powerspectrum',
            outputId: 'powerspectrum',
            title: 'Simple Power Spectrum',
            description: 'powerspectrum'
        },
    ]
};
const downloadResource = (url) => __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(url);
    const mimeType = response.headers.get('content-type');
    // Safari's fetch.blob implementation doesn't populate the type property
    // causing the audio player to fail due to an unsupported type.
    // Manually create a blob from an array buffer and the content type in
    // the response object
    const arrayBufferToBlob = () => __awaiter(this, void 0, void 0, function* () {
        const arrayBuffer = yield response.arrayBuffer();
        return new Blob([arrayBuffer], { type: mimeType });
    });
    return mimeType ? arrayBufferToBlob() : response.blob();
});
class PersistentStack {
    constructor() {
        this.stack = [];
        this.history = [[]];
        this.historyOffset = 0;
    }
    shiftMutating() {
        const item = this.stack[0];
        this.stack = this.stack.slice(1);
        return item;
    }
    shift() {
        const item = this.shiftMutating();
        this.updateHistory();
        return item;
    }
    unshiftMutating(item) {
        this.stack = [item, ...this.stack];
        return this.stack.length;
    }
    unshift(item) {
        const newLength = this.unshift(item);
        this.updateHistory();
        return newLength;
    }
    findIndex(predicate) {
        return this.stack.findIndex(predicate);
    }
    findIndexAndUse(predicate, use) {
        const index = this.stack.findIndex(predicate);
        const didFind = index !== -1;
        if (didFind) {
            use(index);
        }
        return didFind;
    }
    filter(predicate) {
        return this.stack.filter(predicate);
    }
    get(index) {
        return this.stack[index];
    }
    set(index, value) {
        this.setMutating(index, value);
        this.updateHistory();
    }
    setMutating(index, value) {
        this.stack = [
            ...this.stack.slice(0, index),
            value,
            ...this.stack.slice(index + 1)
        ];
    }
    map(transform) {
        return this.stack.map(transform);
    }
    reduce(reducer, initialValue) {
        return this.stack.reduce(reducer, initialValue);
    }
    remove(...indices) {
        this.stack = this.stack.reduce((acc, item, i) => {
            if (!indices.includes(i)) {
                acc.push(item);
            }
            return acc;
        }, []);
        this.updateHistory();
    }
    stepBack() {
        const latest = this.history.length - 1;
        if (++this.historyOffset <= latest) {
            this.stack = this.history[latest - this.historyOffset];
        }
        else {
            this.historyOffset = latest;
        }
    }
    stepForward() {
        const latest = this.history.length - 1;
        if (--this.historyOffset >= 0) {
            this.stack = this.history[latest - this.historyOffset];
        }
        else {
            this.historyOffset = 0;
        }
    }
    toIterable() {
        return this.stack;
    }
    updateHistory() {
        if (this.historyOffset !== 0) {
            this.history = this.history.slice(0, this.history.length - this.historyOffset);
            this.historyOffset = 0;
        }
        this.history.push([...this.stack]);
    }
}
//# sourceMappingURL=Session.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/app.component.ts
/* harmony import */ var app_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("fc+i");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("Z04r");
var app_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var app_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var app_component___param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










let app_component_AppComponent = class AppComponent {
    constructor(audioService, featureService, iconRegistry, sanitizer, resourceManager, notifier) {
        this.audioService = audioService;
        this.featureService = featureService;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.resourceManager = resourceManager;
        this.notifier = notifier;
        this.analyses = new PersistentStack();
        this.canExtract = false;
        this.nRecordings = 0;
        this.countingId = 0;
        this.onSeek = (time) => this.audioService.seekTo(time);
        iconRegistry.addSvgIcon('duck', sanitizer.bypassSecurityTrustResourceUrl('assets/duck.svg'));
        this.onAudioDataSubscription = this.audioService.audioLoaded$.subscribe(resource => {
            const findCurrentAudio = val => isPendingRootAudioItem(val) && val.uri === getRootAudioItem(this.analyses.get(0)).uri;
            const wasError = (res) => res.message != null;
            if (wasError(resource)) {
                this.notifier.displayError(resource.message);
                this.analyses.findIndexAndUse(findCurrentAudio, index => this.analyses.remove(index));
                this.canExtract = false;
            }
            else {
                const audioData = resource.samples;
                if (audioData) {
                    this.canExtract = true;
                    this.analyses.findIndexAndUse(findCurrentAudio, currentRootIndex => this.analyses.set(currentRootIndex, Object.assign({}, this.analyses.get(currentRootIndex), { audioData })));
                }
            }
        });
        this.onProgressUpdated = this.featureService.progressUpdated$.subscribe(progress => {
            this.analyses.findIndexAndUse(val => val.id === progress.id, index => this.analyses.setMutating(index, Object.assign({}, this.analyses.get(index), { progress: progress.value })));
        });
    }
    onFileOpened(file, createExportableItem = false) {
        this.canExtract = false;
        const url = this.audioService.loadAudio(file);
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
        const pending = {
            uri: url,
            hasSharedTimeline: true,
            title: title,
            description: new Date().toLocaleString(),
            id: `${++this.countingId}`,
            mimeType: file.type,
            isExportable: createExportableItem
        };
        // TODO re-ordering of items for display
        // , one alternative is a Angular Pipe / Filter for use in the Template
        this.analyses.unshiftMutating(pending);
    }
    extractFeatures(outputInfo) {
        if (!this.canExtract || !outputInfo) {
            return;
        }
        this.canExtract = false;
        const rootAudio = getRootAudioItem(this.analyses.get(0));
        if (isLoadedRootAudioItem(rootAudio)) {
            const placeholderCard = {
                parent: rootAudio,
                hasSharedTimeline: true,
                extractorKey: outputInfo.extractorKey,
                outputId: outputInfo.outputId,
                title: outputInfo.name,
                description: outputInfo.outputId,
                id: `${++this.countingId}`,
                progress: 0
            };
            this.analyses.unshiftMutating(placeholderCard);
            this.sendExtractionRequest(placeholderCard);
            return placeholderCard.id;
        }
        throw new Error('Cannot extract. No audio loaded');
    }
    removeItem(item) {
        const indicesToRemove = this.analyses.reduce((toRemove, current, index) => {
            if (isPendingAnalysisItem(current) && current.parent.id === item.id) {
                toRemove.push(index);
            }
            else if (item.id === current.id) {
                toRemove.push(index);
            }
            return toRemove;
        }, []);
        this.analyses.remove(...indicesToRemove);
    }
    ngOnDestroy() {
        this.onAudioDataSubscription.unsubscribe();
        this.onProgressUpdated.unsubscribe();
    }
    sendExtractionRequest(analysis) {
        const findAndUpdateItem = (result) => {
            // TODO subscribe to the extraction service instead
            this.analyses.findIndexAndUse(val => val.id === result.id, (index) => this.analyses.set(index, Object.assign({}, this.analyses.get(index), result.result, result.unit ? { unit: result.unit } : {})));
            this.canExtract = true;
        };
        return this.featureService.extract(analysis.id, createExtractionRequest(analysis))
            .then(findAndUpdateItem)
            .catch(err => {
            this.canExtract = true;
            this.analyses.findIndexAndUse(val => val.id === analysis.id, index => this.analyses.remove(index));
            this.notifier.displayError(`Error whilst extracting: ${err}`);
        });
    }
};
app_component_AppComponent = app_component___decorate([
    Object(app_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-root',
        template: __webpack_require__("efyd"),
        styles: [__webpack_require__("hxJY")]
    }),
    app_component___param(4, Object(app_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('UrlResourceLifetimeManager')),
    app_component___metadata("design:paramtypes", [typeof (app_component__a = typeof AudioPlayerService !== "undefined" && AudioPlayerService) === "function" && app_component__a || Object, typeof (app_component__b = typeof feature_extraction_service_FeatureExtractionService !== "undefined" && feature_extraction_service_FeatureExtractionService) === "function" && app_component__b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MdIconRegistry */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["d" /* MdIconRegistry */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _d || Object, typeof (_e = typeof UrlResourceLifetimeManager !== "undefined" && UrlResourceLifetimeManager) === "function" && _e || Object, typeof (_f = typeof NotificationService !== "undefined" && NotificationService) === "function" && _f || Object])
], app_component_AppComponent);

var app_component__a, app_component__b, _c, _d, _e, _f;
//# sourceMappingURL=app.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/WavesJunk.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs__ = __webpack_require__("rgUS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hammerjs__);
/**
 * Created by lucast on 24/05/2017.
 */


// TODO this is named as such as a reminder that it needs to be re-factored
function attachTouchHandlerBodges(element, timeline) {
    let zoomGestureJustEnded = false;
    const pixelToExponent = __WEBPACK_IMPORTED_MODULE_0_waves_ui_piper___default.a.utils.scales.linear()
        .domain([0, 100]) // 100px => factor 2
        .range([0, 1]);
    const calculateDistance = (p1, p2) => {
        return Math.pow(Math.pow(p2.x - p1.x, 2) +
            Math.pow(p2.y - p1.y, 2), 0.5);
    };
    const calculateMidPoint = (p1, p2) => {
        return {
            x: 0.5 * (p1.x + p2.x),
            y: 0.5 * (p1.y + p2.y)
        };
    };
    const hammertime = new __WEBPACK_IMPORTED_MODULE_1_hammerjs__["Manager"](element, {
        recognizers: [
            [__WEBPACK_IMPORTED_MODULE_1_hammerjs__["Pan"], { direction: __WEBPACK_IMPORTED_MODULE_1_hammerjs__["DIRECTION_HORIZONTAL"] }]
        ]
    });
    // it seems HammerJs binds the event to the window?
    // causing these events to propagate to other components?
    let initialZoom;
    let initialDistance;
    let offsetAtPanStart;
    let startX;
    let isZooming;
    const scroll = (ev) => {
        if (ev.center.x - startX === 0) {
            return;
        }
        if (zoomGestureJustEnded) {
            zoomGestureJustEnded = false;
            console.log('Skip this event: likely a single touch dangling from pinch');
            return;
        }
        timeline.timeContext.offset = offsetAtPanStart +
            timeline.timeContext.timeToPixel.invert(ev.deltaX);
        timeline.tracks.update();
    };
    const zoom = (ev) => {
        if (ev.touches.length < 2) {
            return;
        }
        ev.preventDefault();
        const minZoom = timeline.state.minZoom;
        const maxZoom = timeline.state.maxZoom;
        const p1 = {
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY
        };
        const p2 = {
            x: ev.touches[1].clientX,
            y: ev.touches[1].clientY
        };
        const distance = calculateDistance(p1, p2);
        const midPoint = calculateMidPoint(p1, p2);
        const lastCenterTime = timeline.timeContext.timeToPixel.invert(midPoint.x);
        const exponent = pixelToExponent(distance - initialDistance);
        const targetZoom = initialZoom * Math.pow(2, exponent);
        timeline.timeContext.zoom =
            Math.min(Math.max(targetZoom, minZoom), maxZoom);
        const newCenterTime = timeline.timeContext.timeToPixel.invert(midPoint.x);
        timeline.timeContext.offset += newCenterTime - lastCenterTime;
        timeline.tracks.update();
    };
    hammertime.on('panstart', (ev) => {
        offsetAtPanStart = timeline.timeContext.offset;
        startX = ev.center.x;
    });
    hammertime.on('panleft', scroll);
    hammertime.on('panright', scroll);
    element.addEventListener('touchstart', (e) => {
        if (e.touches.length < 2) {
            return;
        }
        isZooming = true;
        initialZoom = timeline.timeContext.zoom;
        initialDistance = calculateDistance({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }, {
            x: e.touches[1].clientX,
            y: e.touches[1].clientY
        });
    });
    element.addEventListener('touchend', () => {
        if (isZooming) {
            isZooming = false;
            zoomGestureJustEnded = true;
        }
    });
    element.addEventListener('touchmove', zoom);
}
function naivePagingMapper(timeline) {
    return (currentTime) => {
        const currentOffset = timeline.timeContext.offset;
        const offsetTimestamp = currentOffset
            + currentTime;
        const visibleDuration = timeline.timeContext.visibleDuration;
        const mustPageForward = offsetTimestamp > visibleDuration;
        const mustPageBackward = currentTime < -currentOffset;
        if (mustPageForward) {
            const hasSkippedMultiplePages = offsetTimestamp - visibleDuration > visibleDuration;
            timeline.timeContext.offset = hasSkippedMultiplePages ?
                -currentTime + 0.5 * visibleDuration :
                currentOffset - visibleDuration;
        }
        if (mustPageBackward) {
            const hasSkippedMultiplePages = currentTime + visibleDuration < -currentOffset;
            timeline.timeContext.offset = hasSkippedMultiplePages ?
                -currentTime + 0.5 * visibleDuration :
                currentOffset + visibleDuration;
        }
        if (mustPageForward || mustPageBackward) {
            timeline.tracks.update();
        }
        //
        return timeline.timeContext.timeToPixel(timeline.offset + currentTime);
    };
}
//# sourceMappingURL=WavesJunk.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/waves-base.component.ts
/* harmony import */ var waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__ = __webpack_require__("NXUV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_js_web_worker__ = __webpack_require__("pDgZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_js_web_worker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_piper_js_web_worker__);
var waves_base_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var waves_base_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 26/05/2017.
 */





const trackIdGenerator = Object(__WEBPACK_IMPORTED_MODULE_4_piper_js_web_worker__["countingIdProvider"])(0);
// has to be an abstract class vs as interface for Angular's DI
class VerticallyLabelled {
}
class VerticalScaleRenderer extends VerticallyLabelled {
}
class VerticalValueInspectorRenderer extends VerticalScaleRenderer {
}
class PlayheadManager {
}
class PlayheadRenderer {
}
class waves_base_component_WavesComponent {
    constructor() {
        this.layers = [];
        this.id = trackIdGenerator.next().value;
    }
    set width(width) {
        if (this.timeline) {
            requestAnimationFrame(() => {
                this.timeline.timeContext.visibleWidth = width;
                this.timeline.tracks.update();
            });
        }
    }
    set feature(feature) {
        this.mFeature = feature;
        this.update();
    }
    get feature() {
        return this.mFeature;
    }
    ngAfterViewInit() {
        this.height =
            this.trackContainer.nativeElement.getBoundingClientRect().height;
        this.renderTimeline();
        this.update();
    }
    renderPlayhead(initialTime, colour) {
        const cursor = new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.CursorLayer({
            height: this.height,
            color: colour,
        });
        cursor.currentPosition = initialTime;
        return {
            update: currentTime => {
                cursor.currentPosition = currentTime;
                cursor.update();
            },
            remove: this.addLayer(cursor)
        };
    }
    update() {
        if (!this.waveTrack || !this.mFeature) {
            return;
        }
        this.clearTimeline();
        this.cachedFeatureLayers = this.featureLayers;
        for (const layer of this.cachedFeatureLayers) {
            this.addLayer(layer);
        }
        if (this.postAddMap) {
            this.cachedFeatureLayers.forEach(this.postAddMap);
        }
    }
    renderTimeline() {
        const track = this.trackContainer.nativeElement;
        track.innerHTML = '';
        if (this.duration >= 0) {
            const width = track.getBoundingClientRect().width;
            this.timeline.pixelsPerSecond = width / this.duration;
            this.timeline.visibleWidth = width;
        }
        this.waveTrack = this.timeline.createTrack(track, this.height, this.id);
        if ('ontouchstart' in window) {
            attachTouchHandlerBodges(track, this.timeline);
        }
        this.resetTimelineState();
    }
    // TODO can likely be removed, or use waves-ui methods
    clearTimeline() {
        // loop through layers and remove them, waves-ui provides methods for this but it seems to not work properly
        const track = this.waveTrack;
        if (track.layers.length === 0) {
            return;
        }
        const trackLayers = Array.from(track.layers);
        while (trackLayers.length) {
            this.removeLayer(trackLayers.pop());
        }
        this.resetTimelineState();
    }
    removeLayer(layer) {
        if (this.layers.includes(layer) && this.waveTrack) {
            const timeContextChildren = this.timeline.timeContext._children;
            this.waveTrack.remove(layer);
            this.layers.splice(this.layers.indexOf(layer), 1);
            const index = timeContextChildren.indexOf(layer.timeContext);
            if (index >= 0) {
                timeContextChildren.splice(index, 1);
            }
            layer.destroy();
        }
    }
    resetTimelineState() {
        // time axis
        const timeAxis = new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.TimeAxisLayer({
            height: this.height,
            color: '#b0b0b0'
        });
        this.addLayer(timeAxis, true);
        this.timeline.state = new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.states.CenteredZoomState(this.timeline);
        this.timeline.tracks.update(); // TODO this is problematic, shared state across components
    }
    // TODO can likely use methods in waves-ui directly
    addLayer(layer, isAxis = false) {
        const timeContext = this.timeline.timeContext;
        if (!layer.timeContext) {
            if (isAxis) {
                layer.setTimeContext(timeContext);
            }
            else {
                const layerTimeContext = new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.core.LayerTimeContext(timeContext);
                if (this.duration) {
                    layerTimeContext.duration = this.duration;
                }
                layer.setTimeContext(layerTimeContext);
            }
        }
        this.waveTrack.add(layer);
        this.layers.push(layer);
        layer.render();
        layer.update();
        return () => this.removeLayer(layer);
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
            if (this.onSeek) {
                this.onSeek(timeContext.timeToPixel.invert(x) - timeContext.offset);
            }
        }
    }
}
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('track'),
    waves_base_component___metadata("design:type", typeof (waves_base_component__a = typeof waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && waves_base_component__a || Object)
], waves_base_component_WavesComponent.prototype, "trackContainer", void 0);
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_base_component___metadata("design:type", Number),
    waves_base_component___metadata("design:paramtypes", [Number])
], waves_base_component_WavesComponent.prototype, "width", null);
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_base_component___metadata("design:type", Object)
], waves_base_component_WavesComponent.prototype, "timeline", void 0);
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_base_component___metadata("design:type", typeof (waves_base_component__b = typeof __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && waves_base_component__b || Object)
], waves_base_component_WavesComponent.prototype, "onSeek", void 0);
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_base_component___metadata("design:type", String)
], waves_base_component_WavesComponent.prototype, "colour", void 0);
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_base_component___metadata("design:type", Number)
], waves_base_component_WavesComponent.prototype, "duration", void 0);
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_base_component___metadata("design:type", Object),
    waves_base_component___metadata("design:paramtypes", [Object])
], waves_base_component_WavesComponent.prototype, "feature", null);
class VerticallyBoundedWavesComponent extends waves_base_component_WavesComponent {
    renderScale(labels) {
        this.addLayer(new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.ScaleLayer({
            tickColor: this.colour,
            textColor: this.colour,
            height: this.height,
            yDomain: labels
        }));
    }
}
class VerticallyBinnedWavesComponent extends waves_base_component_WavesComponent {
    renderScale(labels) {
        this.addLayer(new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.DiscreteScaleLayer({
            tickColor: this.colour,
            textColor: this.colour,
            height: this.height,
            binNames: labels
        }));
    }
}
class InspectableVerticallyBoundedComponent extends VerticallyBoundedWavesComponent {
    set onSeek(handler) {
        this.wrappedSeekHandler = (x) => {
            handler(x);
            this.updatePosition(x);
        };
    }
    get updatePosition() {
        return (currentTime) => {
            if (this.highlight) {
                this.highlight.currentPosition = currentTime;
                this.highlight.update();
            }
        };
    }
    get onSeek() {
        return this.wrappedSeekHandler;
    }
    renderInspector(range, unit) {
        if (range) {
            this.highlight = new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.HighlightLayer(this.cachedFeatureLayers, {
                opacity: 0.7,
                height: this.height,
                color: '#c33c54',
                labelOffset: 38,
                yDomain: range,
                unit: unit || ''
            });
            this.addLayer(this.highlight);
        }
    }
}
waves_base_component___decorate([
    Object(waves_base_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_base_component___metadata("design:type", typeof (waves_base_component__c = typeof __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && waves_base_component__c || Object),
    waves_base_component___metadata("design:paramtypes", [typeof (waves_base_component__d = typeof __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && waves_base_component__d || Object])
], InspectableVerticallyBoundedComponent.prototype, "onSeek", null);
var waves_base_component__a, waves_base_component__b, waves_base_component__c, waves_base_component__d;
//# sourceMappingURL=waves-base.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/waveform/waveform.component.ts
/* harmony import */ var waveform_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__);
var waveform_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var waveform_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let WaveformComponent = WaveformComponent_1 = class WaveformComponent extends waves_base_component_WavesComponent {
    set audioBuffer(buffer) {
        this.duration = buffer.duration;
        this.timeline.pixelsPerSecond = this.timeline.visibleWidth / buffer.duration;
        this.feature = buffer;
    }
    get featureLayers() {
        const nChannels = this.feature.numberOfChannels;
        const totalWaveHeight = this.height * 0.9;
        const waveHeight = totalWaveHeight / nChannels;
        const channelLayers = [];
        for (let ch = 0; ch < nChannels; ++ch) {
            channelLayers.push(new __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper___default.a.helpers.WaveformLayer(this.feature, {
                top: (this.height - totalWaveHeight) / 2 + waveHeight * ch,
                height: waveHeight,
                color: this.colour,
                channel: ch
            }));
        }
        return channelLayers;
    }
};
waveform_component___decorate([
    Object(waveform_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waveform_component___metadata("design:type", Object),
    waveform_component___metadata("design:paramtypes", [Object])
], WaveformComponent.prototype, "audioBuffer", null);
WaveformComponent = WaveformComponent_1 = waveform_component___decorate([
    Object(waveform_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-waveform',
        template: __webpack_require__("AcCh"),
        styles: [__webpack_require__("1B76")],
        changeDetection: waveform_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: PlayheadRenderer, useExisting: WaveformComponent_1 },
            { provide: waves_base_component_WavesComponent, useExisting: WaveformComponent_1 }
        ]
    })
], WaveformComponent);

var WaveformComponent_1;
//# sourceMappingURL=waveform.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/audio-file-open/audio-file-open.component.ts
/* harmony import */ var audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
var audio_file_open_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var audio_file_open_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AudioFileOpenComponent = class AudioFileOpenComponent {
    constructor() {
        this.fileOpened = new audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
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
audio_file_open_component___decorate([
    Object(audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('open'),
    audio_file_open_component___metadata("design:type", typeof (audio_file_open_component__a = typeof audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && audio_file_open_component__a || Object)
], AudioFileOpenComponent.prototype, "open", void 0);
audio_file_open_component___decorate([
    Object(audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    audio_file_open_component___metadata("design:type", typeof (audio_file_open_component__b = typeof audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && audio_file_open_component__b || Object)
], AudioFileOpenComponent.prototype, "fileOpened", void 0);
AudioFileOpenComponent = audio_file_open_component___decorate([
    Object(audio_file_open_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-audio-file-open',
        template: __webpack_require__("hsUb"),
        styles: [__webpack_require__("lmXt")]
    }),
    audio_file_open_component___metadata("design:paramtypes", [])
], AudioFileOpenComponent);

var audio_file_open_component__a, audio_file_open_component__b;
//# sourceMappingURL=audio-file-open.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/playback-control/playback-control.component.ts
/* harmony import */ var playback_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
var playback_control_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var playback_control_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let PlaybackControlComponent = class PlaybackControlComponent {
    constructor(audioService) {
        this.audioService = audioService;
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
PlaybackControlComponent = playback_control_component___decorate([
    Object(playback_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-playback-control',
        template: __webpack_require__("bese"),
        styles: [__webpack_require__("AERx")]
    }),
    playback_control_component___metadata("design:paramtypes", [typeof (playback_control_component__a = typeof AudioPlayerService !== "undefined" && AudioPlayerService) === "function" && playback_control_component__a || Object])
], PlaybackControlComponent);

var playback_control_component__a;
//# sourceMappingURL=playback-control.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/feature-extraction-menu/feature-extraction-menu.component.ts
/* harmony import */ var feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
var feature_extraction_menu_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var feature_extraction_menu_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


const crudeTypeUriMap = {
    'http://purl.org/ontology/af/Beat': 'instants',
    'http://purl.org/ontology/af/Chromagram': 'matrix',
    'http://purl.org/ontology/af/Spectrogram': 'matrix',
    'http://purl.org/ontology/af/KeyChange': 'instants',
    'http://purl.org/ontology/af/OnsetDetectionFunction': 'vector',
    'http://purl.org/ontology/af/Onset': 'instants',
    'http://purl.org/ontology/af/StructuralSegment': 'instants',
    'http://purl.org/ontology/af/TonalOnset': 'instants',
    'http://purl.org/ontology/af/Note': 'notes',
    'http://purl.org/ontology/af/ChordSegment': 'instants',
    'http://purl.org/ontology/af/MusicSegment': 'instants',
    'http://purl.org/ontology/af/Pitch': 'tracks'
};
let FeatureExtractionMenuComponent = class FeatureExtractionMenuComponent {
    constructor(piperService) {
        this.piperService = piperService;
        this.extractors = [];
        this.requestOutput = new feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.isDisabled = true;
        this.populateExtractors = available => {
            this.extractors = available.available.reduce((acc, staticData) => {
                const name = staticData.basic.name;
                const outputs = staticData.basicOutputInfo.map(output => {
                    const combinedKey = `${staticData.key}:${output.identifier}`;
                    const maybeTypeInfo = staticData.staticOutputInfo &&
                        staticData.staticOutputInfo.get(output.identifier) &&
                        staticData.staticOutputInfo.get(output.identifier).typeURI;
                    return Object.assign({
                        extractorKey: staticData.key,
                        combinedKey: combinedKey,
                        name: output.name,
                        outputId: output.identifier
                    }, maybeTypeInfo ? { typeUri: maybeTypeInfo } : {});
                });
                acc.push({ name, outputs });
                return acc;
            }, []);
            this.isLoading = false;
        };
    }
    set disabled(isDisabled) {
        this.isDisabled = isDisabled;
    }
    get disabled() {
        return this.isDisabled;
    }
    ngOnInit() {
        this.librariesUpdatedSubscription =
            this.piperService.librariesUpdated$.subscribe(this.populateExtractors);
        this.piperService.list().then(this.populateExtractors);
    }
    extract(info) {
        if (this.onRequestOutput) {
            this.onRequestOutput();
        }
        if (info && !this.disabled) {
            this.requestOutput.emit(info);
        }
    }
    load() {
        this.isLoading = true;
        this.piperService.updateAvailableLibraries();
    }
    getFeatureIconName(outputInfo) {
        return {
            vector: 'show_chart',
            matrix: 'grid_on',
            tracks: 'multiline_chart',
            instants: 'view_week',
            notes: 'audiotrack',
        }[crudeTypeUriMap[outputInfo.typeUri]] || 'extension';
    }
    ngOnDestroy() {
        this.librariesUpdatedSubscription.unsubscribe();
    }
};
feature_extraction_menu_component___decorate([
    Object(feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    feature_extraction_menu_component___metadata("design:type", Boolean),
    feature_extraction_menu_component___metadata("design:paramtypes", [Boolean])
], FeatureExtractionMenuComponent.prototype, "disabled", null);
feature_extraction_menu_component___decorate([
    Object(feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    feature_extraction_menu_component___metadata("design:type", Function)
], FeatureExtractionMenuComponent.prototype, "onRequestOutput", void 0);
feature_extraction_menu_component___decorate([
    Object(feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    feature_extraction_menu_component___metadata("design:type", typeof (feature_extraction_menu_component__a = typeof feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && feature_extraction_menu_component__a || Object)
], FeatureExtractionMenuComponent.prototype, "requestOutput", void 0);
FeatureExtractionMenuComponent = feature_extraction_menu_component___decorate([
    Object(feature_extraction_menu_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-feature-extraction-menu',
        template: __webpack_require__("J4P9"),
        styles: [__webpack_require__("x5+K")]
    }),
    feature_extraction_menu_component___metadata("design:paramtypes", [typeof (feature_extraction_menu_component__b = typeof feature_extraction_service_FeatureExtractionService !== "undefined" && feature_extraction_service_FeatureExtractionService) === "function" && feature_extraction_menu_component__b || Object])
], FeatureExtractionMenuComponent);

var feature_extraction_menu_component__a, feature_extraction_menu_component__b;
//# sourceMappingURL=feature-extraction-menu.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/progress-spinner/progress-spinner.component.ts
/* harmony import */ var progress_spinner_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/**
 * Created by lucast on 14/03/2017.
 */
var progress_spinner_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var progress_spinner_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let ProgressSpinnerComponent = class ProgressSpinnerComponent {
    constructor() {
        this.currentProcess = 0;
        this.isVisible = true;
        this.isDeterminate = false;
    }
    set progress(value) {
        if (value < 0) {
            this.currentProcess = 0;
        }
        else if (value > 100) {
            this.currentProcess = 100;
        }
        else {
            this.currentProcess = value;
        }
    }
};
progress_spinner_component___decorate([
    Object(progress_spinner_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    progress_spinner_component___metadata("design:type", Object)
], ProgressSpinnerComponent.prototype, "isVisible", void 0);
progress_spinner_component___decorate([
    Object(progress_spinner_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    progress_spinner_component___metadata("design:type", Object)
], ProgressSpinnerComponent.prototype, "isDeterminate", void 0);
progress_spinner_component___decorate([
    Object(progress_spinner_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    progress_spinner_component___metadata("design:type", Number),
    progress_spinner_component___metadata("design:paramtypes", [Number])
], ProgressSpinnerComponent.prototype, "progress", null);
ProgressSpinnerComponent = progress_spinner_component___decorate([
    Object(progress_spinner_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-progress-spinner',
        template: `
    <div class="container" [hidden]="!isVisible">
      <md-spinner
        class="spinner"
        [attr.color]="'primary'"
        [mode]="isDeterminate ? 'determinate' : 'indeterminate'"
        [value]="currentProcess"
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

//# sourceMappingURL=progress-spinner.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/services/audio-recorder/audio-recorder.service.ts
/* harmony import */ var audio_recorder_service___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var audio_recorder_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("rlar");
/* harmony import */ var audio_recorder_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(audio_recorder_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var audio_recorder_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var audio_recorder_service___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var audio_recorder_service___param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by lucas on 17/03/2017.
 */



class ThrowingMediaRecorder {
    static isTypeSupported(mimeType) {
        return false;
    }
    constructor(stream, options) {
        throw new Error('MediaRecorder not available in this browser.');
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
let AudioRecorderService = class AudioRecorderService {
    constructor(requestProvider, recorderImpl, ngZone, notifier) {
        this.ngZone = ngZone;
        this.notifier = notifier;
        this.knownTypes = [
            { mimeType: 'audio/ogg', extension: 'ogg' },
            { mimeType: 'audio/webm', extension: 'webm' },
            { mimeType: 'audio/wav', extension: 'wav' }
        ];
        this.requestProvider = requestProvider;
        this.recorderImpl = recorderImpl;
        this.recordingStateChange = new audio_recorder_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.recordingStateChange$ = this.recordingStateChange.asObservable();
        this.newRecording = new audio_recorder_service___WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.newRecording$ = this.newRecording.asObservable();
        this.isRecording = false;
        this.chunks = [];
    }
    getRecorderInstance() {
        return this.requestProvider().then(stream => {
            const supported = this.knownTypes.find(({ mimeType, extension }) => this.recorderImpl.isTypeSupported(mimeType));
            const recorder = new this.recorderImpl(stream, supported ? {
                mimeType: supported.mimeType
            } : {});
            recorder.ondataavailable = e => this.chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(this.chunks, {
                    'type': recorder.mimeType || supported.mimeType
                });
                this.chunks.length = 0;
                this.ngZone.run(() => {
                    this.newRecording.next(blob);
                });
            };
            return recorder;
        });
    }
    toggleRecording() {
        if (this.isRecording) {
            this.endRecording();
        }
        else {
            this.getRecorderInstance()
                .then(recorder => this.startRecording(recorder))
                .catch(e => {
                this.recordingStateChange.next('disabled'); // don't really need to do this
                this.notifier.displayError(e);
            });
        }
    }
    startRecording(recorder) {
        this.currentRecorder = recorder;
        this.isRecording = true;
        recorder.start();
        this.recordingStateChange.next('recording');
    }
    endRecording() {
        if (this.currentRecorder) {
            this.isRecording = false;
            this.currentRecorder.stop();
            for (const track of this.currentRecorder.stream.getAudioTracks()) {
                track.stop();
            }
            this.chunks.length = 0; // empty the array
            this.recordingStateChange.next('enabled');
            this.currentRecorder = null;
        }
    }
};
AudioRecorderService = audio_recorder_service___decorate([
    Object(audio_recorder_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    audio_recorder_service___param(0, Object(audio_recorder_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('AudioInputProvider')),
    audio_recorder_service___param(1, Object(audio_recorder_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('MediaRecorderFactory')),
    audio_recorder_service___metadata("design:paramtypes", [Function, Object, typeof (audio_recorder_service__a = typeof audio_recorder_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */] !== "undefined" && audio_recorder_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]) === "function" && audio_recorder_service__a || Object, typeof (audio_recorder_service__b = typeof NotificationService !== "undefined" && NotificationService) === "function" && audio_recorder_service__b || Object])
], AudioRecorderService);

var audio_recorder_service__a, audio_recorder_service__b;
//# sourceMappingURL=audio-recorder.service.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/recording-control/recording-control.component.ts
/* harmony import */ var recording_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/**
 * Created by lucas on 17/03/2017.
 */
var recording_control_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var recording_control_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let RecordingControlComponent = class RecordingControlComponent {
    constructor(recordingService) {
        this.recordingService = recordingService;
        this.recordingStatus = 'disabled';
        this.finishedRecording = new recording_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
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
recording_control_component___decorate([
    Object(recording_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    recording_control_component___metadata("design:type", typeof (recording_control_component__a = typeof recording_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && recording_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && recording_control_component__a || Object)
], RecordingControlComponent.prototype, "finishedRecording", void 0);
RecordingControlComponent = recording_control_component___decorate([
    Object(recording_control_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-recording-control',
        template: __webpack_require__("Eemu")
    }),
    recording_control_component___metadata("design:paramtypes", [typeof (recording_control_component__b = typeof AudioRecorderService !== "undefined" && AudioRecorderService) === "function" && recording_control_component__b || Object])
], RecordingControlComponent);

var recording_control_component__a, recording_control_component__b;
//# sourceMappingURL=recording-control.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/notebook-feed/notebook-feed.component.ts
/* harmony import */ var notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var notebook_feed_component___WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var notebook_feed_component___WEBPACK_IMPORTED_MODULE_1_waves_ui_piper___default = __webpack_require__.n(notebook_feed_component___WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("bKpL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__ = __webpack_require__("NXUV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__);
var notebook_feed_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var notebook_feed_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var notebook_feed_component___param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by lucast on 21/03/2017.
 */






let notebook_feed_component_NotebookFeedComponent = class NotebookFeedComponent {
    constructor(ref, onResize, audioService) {
        this.ref = ref;
        this.onResize = onResize;
        this.audioService = audioService;
        this.removeItem = new notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.timelines = new Map();
        this.onResize.subscribe(dim => {
            this.lastWidth = this.width;
            this.width = dim.width;
        });
        // the use of requestAnimationFrame here is to leave the dom updates
        // to a time convenient for the browser, and avoid a cascade / waterfall
        // of DOM changes for rapid resize events in the event handler above.
        // ..I'm not convinced this is particularly beneficial here // TODO
        const triggerChangeDetectionOnResize = () => {
            requestAnimationFrame(triggerChangeDetectionOnResize);
            if (this.width !== this.lastWidth) {
                ref.markForCheck(); // only trigger change detection if width changed
            }
        };
        requestAnimationFrame(triggerChangeDetectionOnResize);
    }
    set analyses(analyses) {
        const front = analyses[0];
        if (analyses !== this.mAnalyses) {
            if (front && getRootUri(front) !== this.currentAudioUri) {
                this.audioService.unload();
                this.audioService.loadAudioFromUri(getRootUri(front));
            }
            else if (!front) {
                this.audioService.unload();
            }
        }
        this.mAnalyses = analyses;
        if (front) {
            this.currentAudioUri = this.getCurrentAudioUri();
        }
        else {
            this.currentAudioUri = '';
        }
    }
    get analyses() {
        return this.mAnalyses;
    }
    getOrCreateTimeline(item) {
        if (!item.hasSharedTimeline) {
            return;
        }
        const uri = getRootUri(item);
        if (this.timelines.has(uri)) {
            return this.timelines.get(uri);
        }
        else {
            const timeline = new notebook_feed_component___WEBPACK_IMPORTED_MODULE_1_waves_ui_piper___default.a.core.Timeline();
            this.timelines.set(uri, timeline);
            return timeline;
        }
    }
    isAudioItem(item) {
        return isLoadedRootAudioItem(item);
    }
    isActiveItem(item) {
        return this.getCurrentAudioUri() === getRootUri(item);
    }
    getOnSeekForItem(item) {
        return this.isActiveItem(item) ? this.onSeek : () => { };
    }
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
    getCurrentAudioUri() {
        if (this.analyses.length === 0) {
            return '';
        }
        try {
            return getRootUri(this.analyses[0]);
        }
        catch (e) {
            return '';
        }
    }
};
notebook_feed_component___decorate([
    Object(notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    notebook_feed_component___metadata("design:type", Array),
    notebook_feed_component___metadata("design:paramtypes", [Array])
], notebook_feed_component_NotebookFeedComponent.prototype, "analyses", null);
notebook_feed_component___decorate([
    Object(notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    notebook_feed_component___metadata("design:type", typeof (notebook_feed_component__a = typeof __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && notebook_feed_component__a || Object)
], notebook_feed_component_NotebookFeedComponent.prototype, "onSeek", void 0);
notebook_feed_component___decorate([
    Object(notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    notebook_feed_component___metadata("design:type", typeof (notebook_feed_component__b = typeof notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && notebook_feed_component__b || Object)
], notebook_feed_component_NotebookFeedComponent.prototype, "removeItem", void 0);
notebook_feed_component_NotebookFeedComponent = notebook_feed_component___decorate([
    Object(notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-notebook-feed',
        template: __webpack_require__("IXBa"),
        styles: [__webpack_require__("D/YE")],
        changeDetection: notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    }),
    notebook_feed_component___param(1, Object(notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])('DimensionObservable')),
    notebook_feed_component___metadata("design:paramtypes", [typeof (notebook_feed_component__c = typeof notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */] !== "undefined" && notebook_feed_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]) === "function" && notebook_feed_component__c || Object, typeof (notebook_feed_component__d = typeof __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"]) === "function" && notebook_feed_component__d || Object, typeof (notebook_feed_component__e = typeof AudioPlayerService !== "undefined" && AudioPlayerService) === "function" && notebook_feed_component__e || Object])
], notebook_feed_component_NotebookFeedComponent);

var notebook_feed_component__a, notebook_feed_component__b, notebook_feed_component__c, notebook_feed_component__d, notebook_feed_component__e;
//# sourceMappingURL=notebook-feed.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/services/render-loop/render-loop.service.ts
/* harmony import */ var render_loop_service___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
var render_loop_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var render_loop_service___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 02/06/2017.
 */


let RenderLoopService = class RenderLoopService {
    constructor(player, zone) {
        this.player = player;
        this.zone = zone;
        this.countingId = 0;
        this.tasks = new Map();
        this.seekedSubscription = this.player.seeked$.subscribe(() => {
            if (!this.player.isPlaying()) {
                this.zone.runOutsideAngular(() => {
                    this.runTasks();
                });
            }
        });
        this.playingStateSubscription = this.player.playingStateChange$.subscribe(isPlaying => {
            if (isPlaying) {
                this.animate();
            }
        });
    }
    addPlayingTask(task) {
        const id = this.countingId++;
        this.tasks.set(id, task);
        return () => {
            this.tasks.delete(id);
        };
    }
    animate() {
        this.zone.runOutsideAngular(() => {
            const animateNextFrame = () => {
                if (this.player.isPlaying()) {
                    this.runTasks();
                    requestAnimationFrame(animateNextFrame);
                }
            };
            requestAnimationFrame(animateNextFrame);
        });
    }
    runTasks() {
        const currentTime = this.player.getCurrentTime();
        for (const task of this.tasks.values()) {
            task(currentTime);
        }
    }
};
RenderLoopService = render_loop_service___decorate([
    Object(render_loop_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    render_loop_service___metadata("design:paramtypes", [typeof (render_loop_service__a = typeof AudioPlayerService !== "undefined" && AudioPlayerService) === "function" && render_loop_service__a || Object, typeof (render_loop_service__b = typeof render_loop_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */] !== "undefined" && render_loop_service___WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]) === "function" && render_loop_service__b || Object])
], RenderLoopService);

var render_loop_service__a, render_loop_service__b;
//# sourceMappingURL=render-loop.service.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/analysis-item/analysis-item.component.ts
/* harmony import */ var analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__ = __webpack_require__("NXUV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("fc+i");
var analysis_item_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var analysis_item_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 21/03/2017.
 */







let analysis_item_component_AnalysisItemComponent = class AnalysisItemComponent {
    constructor(renderLoop, sanitizer) {
        this.renderLoop = renderLoop;
        this.sanitizer = sanitizer;
        this.hasProgressOnInit = false;
        this.remove = new analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    // TODO should be TimelineTimeContext?
    set timeline(timeline) {
        this.mTimeline = timeline;
        this.resetRemoveAnimation();
    }
    get timeline() {
        return this.mTimeline;
    }
    set isActive(isActive) {
        this.removeAnimation();
        this.mIsActive = isActive;
        if (isActive) {
            this.resetRemoveAnimation();
        }
    }
    get isActive() {
        return this.mIsActive;
    }
    ngOnInit() {
        this.resetRemoveAnimation();
        this.hasProgressOnInit = this.item.progress != null;
    }
    isLoading() {
        return this.hasProgressOnInit && this.item.progress < 100;
    }
    isAudioItem() {
        return this.item && isLoadedRootAudioItem(this.item);
    }
    isPending() {
        return this.item &&
            !isLoadedRootAudioItem(this.item) && !isExtractedAnalysisItem(this.item) &&
            (isPendingAnalysisItem(this.item) || isPendingRootAudioItem(this.item));
    }
    getFeatureShape() {
        return !isPendingRootAudioItem(this.item) &&
            isExtractedAnalysisItem(this.item) ? this.item.shape : null;
    }
    getDuration() {
        if (isLoadedRootAudioItem(this.item)) {
            return this.item.audioData.duration;
        }
        if (isExtractedAnalysisItem(this.item)) {
            return this.item.parent.audioData.duration;
        }
    }
    getNextColour() {
        return defaultColourGenerator.next().value;
    }
    ngOnDestroy() {
        this.removeAnimation();
    }
    sanitize(url) {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    generateFilename(item) {
        // TODO this is too brittle, and will often produce the wrong result
        // i.e. audio/mpeg results in .mpeg, when .mp3 is likely desired
        const mimeParts = item.mimeType ? item.mimeType.split('/') : [];
        const extension = mimeParts.length === 2 ? mimeParts[1] : '';
        return `${item.title}.${extension}`;
    }
    resetRemoveAnimation() {
        if (this.removeAnimation) {
            this.removeAnimation();
        }
        const createPagingTask = () => {
            const pagingMapper = naivePagingMapper(this.timeline);
            return this.renderLoop.addPlayingTask(currentTime => {
                pagingMapper(currentTime);
            });
        };
        // only add a pager to audio items, it can drive the feature items
        const remover = this.timeline && this.isAudioItem() ?
            createPagingTask() : () => { };
        this.removeAnimation = () => {
            remover();
            this.removeAnimation = () => { };
        };
    }
};
analysis_item_component___decorate([
    Object(analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    analysis_item_component___metadata("design:type", Object),
    analysis_item_component___metadata("design:paramtypes", [Object])
], analysis_item_component_AnalysisItemComponent.prototype, "timeline", null);
analysis_item_component___decorate([
    Object(analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    analysis_item_component___metadata("design:type", Boolean),
    analysis_item_component___metadata("design:paramtypes", [Boolean])
], analysis_item_component_AnalysisItemComponent.prototype, "isActive", null);
analysis_item_component___decorate([
    Object(analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    analysis_item_component___metadata("design:type", typeof (analysis_item_component__a = typeof Item !== "undefined" && Item) === "function" && analysis_item_component__a || Object)
], analysis_item_component_AnalysisItemComponent.prototype, "item", void 0);
analysis_item_component___decorate([
    Object(analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    analysis_item_component___metadata("design:type", Number)
], analysis_item_component_AnalysisItemComponent.prototype, "contentWidth", void 0);
analysis_item_component___decorate([
    Object(analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    analysis_item_component___metadata("design:type", typeof (analysis_item_component__b = typeof __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && analysis_item_component__b || Object)
], analysis_item_component_AnalysisItemComponent.prototype, "onSeek", void 0);
analysis_item_component___decorate([
    Object(analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */])(),
    analysis_item_component___metadata("design:type", typeof (analysis_item_component__c = typeof analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && analysis_item_component__c || Object)
], analysis_item_component_AnalysisItemComponent.prototype, "remove", void 0);
analysis_item_component_AnalysisItemComponent = analysis_item_component___decorate([
    Object(analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-analysis-item',
        template: __webpack_require__("9jta"),
        styles: [__webpack_require__("hth3")],
        changeDetection: analysis_item_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    }),
    analysis_item_component___metadata("design:paramtypes", [typeof (analysis_item_component__d = typeof RenderLoopService !== "undefined" && RenderLoopService) === "function" && analysis_item_component__d || Object, typeof (analysis_item_component__e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && analysis_item_component__e || Object])
], analysis_item_component_AnalysisItemComponent);

var analysis_item_component__a, analysis_item_component__b, analysis_item_component__c, analysis_item_component__d, analysis_item_component__e;
//# sourceMappingURL=analysis-item.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/progress-bar/progress-bar.ts
/* harmony import */ var progress_bar___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/**
 * Created by lucas on 24/04/2017.
 */
var progress_bar___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var progress_bar___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let ProgressBarComponent = class ProgressBarComponent {
    constructor() {
        this.isDeterminate = false;
    }
};
progress_bar___decorate([
    Object(progress_bar___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    progress_bar___metadata("design:type", Object)
], ProgressBarComponent.prototype, "isDeterminate", void 0);
progress_bar___decorate([
    Object(progress_bar___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    progress_bar___metadata("design:type", Number)
], ProgressBarComponent.prototype, "progress", void 0);
ProgressBarComponent = progress_bar___decorate([
    Object(progress_bar___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-progress-bar',
        template: `
    <md-progress-bar
      [attr.color]="'primary'"
      [mode]="isDeterminate ? 'determinate' : 'indeterminate'"
      [value]="progress"
    ></md-progress-bar>
  `,
        changeDetection: progress_bar___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    })
], ProgressBarComponent);

//# sourceMappingURL=progress-bar.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/ugly-material.module.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("Z04r");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("fL27");
var ugly_material_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by lucast on 25/04/2017.
 */



const importExports = [
    __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["c" /* MdIconModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["i" /* MdSidenavModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["l" /* MdToolbarModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["a" /* MdButtonModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["h" /* MdSelectModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["g" /* MdProgressSpinnerModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["f" /* MdProgressBarModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["b" /* MdCardModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["e" /* MdListModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["k" /* MdSnackBarModule */]
];
let UglyMaterialModule = class UglyMaterialModule {
};
UglyMaterialModule = ugly_material_module___decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        imports: importExports,
        exports: importExports,
    })
], UglyMaterialModule);

//# sourceMappingURL=ugly-material.module.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/playhead/playhead.component.ts
/* harmony import */ var playhead_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__ = __webpack_require__("NXUV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__);
var playhead_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var playhead_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 23/05/2017.
 */


const defaultColour = '#000';
let PlayHeadComponent = class PlayHeadComponent {
    constructor() {
        this.currentStyle = {
            background: defaultColour,
            height: '100%',
            width: '2px',
            transform: null
        };
    }
    set currentTime(x) {
        const position = this.timeToPixel(x);
        this.currentStyle.transform = `translateX(${position}px)`;
    }
    set colour(hex) {
        this.currentStyle.background = hex || defaultColour;
    }
};
playhead_component___decorate([
    Object(playhead_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    playhead_component___metadata("design:type", typeof (playhead_component__a = typeof __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"]) === "function" && playhead_component__a || Object)
], PlayHeadComponent.prototype, "timeToPixel", void 0);
playhead_component___decorate([
    Object(playhead_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    playhead_component___metadata("design:type", Number),
    playhead_component___metadata("design:paramtypes", [Number])
], PlayHeadComponent.prototype, "currentTime", null);
playhead_component___decorate([
    Object(playhead_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    playhead_component___metadata("design:type", String),
    playhead_component___metadata("design:paramtypes", [String])
], PlayHeadComponent.prototype, "colour", null);
PlayHeadComponent = playhead_component___decorate([
    Object(playhead_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-play-head',
        template: `<div [ngStyle]="currentStyle"></div>`,
        changeDetection: playhead_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    })
], PlayHeadComponent);

var playhead_component__a;
//# sourceMappingURL=playhead.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/playhead/live-play-head.component.ts
/* harmony import */ var live_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var live_play_head_component___WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__ = __webpack_require__("NXUV");
/* harmony import */ var live_play_head_component___WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers___default = __webpack_require__.n(live_play_head_component___WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__);
var live_play_head_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var live_play_head_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 23/05/2017.
 */



let LivePlayHeadComponent = class LivePlayHeadComponent {
    constructor(renderLoop, ref) {
        this.renderLoop = renderLoop;
        this.ref = ref;
        this.currentTime = 0;
    }
    ngAfterViewInit() {
        this.remover = this.renderLoop.addPlayingTask((currentTime) => {
            this.currentTime = currentTime;
            this.ref.markForCheck();
        });
    }
    ngOnDestroy() {
        this.remover();
    }
};
live_play_head_component___decorate([
    Object(live_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    live_play_head_component___metadata("design:type", typeof (live_play_head_component__a = typeof live_play_head_component___WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"] !== "undefined" && live_play_head_component___WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"]) === "function" && live_play_head_component__a || Object)
], LivePlayHeadComponent.prototype, "timeToPixel", void 0);
live_play_head_component___decorate([
    Object(live_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    live_play_head_component___metadata("design:type", String)
], LivePlayHeadComponent.prototype, "colour", void 0);
LivePlayHeadComponent = live_play_head_component___decorate([
    Object(live_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-live-play-head',
        template: `<ugly-play-head
    [currentTime]="currentTime"
    [timeToPixel]="timeToPixel"
    [colour]="colour"></ugly-play-head>`,
        changeDetection: live_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    }),
    live_play_head_component___metadata("design:paramtypes", [typeof (live_play_head_component__b = typeof RenderLoopService !== "undefined" && RenderLoopService) === "function" && live_play_head_component__b || Object, typeof (live_play_head_component__c = typeof live_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */] !== "undefined" && live_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]) === "function" && live_play_head_component__c || Object])
], LivePlayHeadComponent);

var live_play_head_component__a, live_play_head_component__b, live_play_head_component__c;
//# sourceMappingURL=live-play-head.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/tracks/tracks.components.ts
/* harmony import */ var tracks_components___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__ = __webpack_require__("ua5f");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__);
/* harmony import */ var tracks_components___WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var tracks_components___WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default = __webpack_require__.n(tracks_components___WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__);
var tracks_components___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var tracks_components___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucas on 30/05/2017.
 */





let tracks_components_TracksComponent = TracksComponent_1 = class TracksComponent extends InspectableVerticallyBoundedComponent {
    set tracks(input) {
        this.feature = input;
    }
    get labels() {
        return this.currentState && this.currentState.data.length > 0 ?
            this.currentState.yDomain : null;
    }
    get featureLayers() {
        this.currentState = generatePlotData(this.feature);
        return this.currentState.data.map(feature => new tracks_components___WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.LineLayer(feature.points, {
            color: this.colour,
            height: this.height,
            yDomain: this.currentState.yDomain
        }));
    }
    get postAddMap() {
        return (layer, index) => {
            layer.start = this.currentState.data[index].startTime;
            layer.duration = this.currentState.data[index].duration;
            layer.update();
        };
    }
};
tracks_components___decorate([
    Object(tracks_components___WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
    tracks_components___metadata("design:type", typeof (tracks_components__a = typeof __WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__["TracksFeature"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__["TracksFeature"]) === "function" && tracks_components__a || Object),
    tracks_components___metadata("design:paramtypes", [typeof (tracks_components__b = typeof __WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__["TracksFeature"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__["TracksFeature"]) === "function" && tracks_components__b || Object])
], tracks_components_TracksComponent.prototype, "tracks", null);
tracks_components_TracksComponent = TracksComponent_1 = tracks_components___decorate([
    Object(tracks_components___WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'ugly-tracks',
        template: __webpack_require__("AcCh"),
        styles: [__webpack_require__("1B76")],
        changeDetection: tracks_components___WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: VerticallyLabelled, useExisting: TracksComponent_1 },
            { provide: VerticalScaleRenderer, useExisting: TracksComponent_1 },
            { provide: VerticalValueInspectorRenderer, useExisting: TracksComponent_1 },
            { provide: PlayheadRenderer, useExisting: TracksComponent_1 },
            { provide: waves_base_component_WavesComponent, useExisting: TracksComponent_1 }
        ],
    })
], tracks_components_TracksComponent);

var TracksComponent_1, tracks_components__a, tracks_components__b;
//# sourceMappingURL=tracks.components.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/curve/curve.component.ts
/* harmony import */ var curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var curve_component___WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__ = __webpack_require__("NXUV");
/* harmony import */ var curve_component___WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers___default = __webpack_require__.n(curve_component___WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__);
/* harmony import */ var curve_component___WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__ = __webpack_require__("ua5f");
/* harmony import */ var curve_component___WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot___default = __webpack_require__.n(curve_component___WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__);
var curve_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var curve_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucas on 30/05/2017.
 */





let CurveComponent = CurveComponent_1 = class CurveComponent {
    renderPlayhead(initialTime, colour) {
        return this.tracksComponent.renderPlayhead(initialTime, colour);
    }
    renderInspector(range, unit) {
        this.tracksComponent.renderInspector(range, unit);
    }
    get updatePosition() {
        return this.tracksComponent.updatePosition;
    }
    renderScale(range) {
        this.tracksComponent.renderScale(range);
    }
    get labels() {
        return this.tracksComponent.labels;
    }
};
curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    curve_component___metadata("design:type", Object)
], CurveComponent.prototype, "timeline", void 0);
curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    curve_component___metadata("design:type", typeof (curve_component__a = typeof curve_component___WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && curve_component___WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && curve_component__a || Object)
], CurveComponent.prototype, "onSeek", void 0);
curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    curve_component___metadata("design:type", Number)
], CurveComponent.prototype, "width", void 0);
curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    curve_component___metadata("design:type", typeof (curve_component__b = typeof curve_component___WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__["VectorFeature"] !== "undefined" && curve_component___WEBPACK_IMPORTED_MODULE_2_piper_js_one_shot__["VectorFeature"]) === "function" && curve_component__b || Object)
], CurveComponent.prototype, "curve", void 0);
curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    curve_component___metadata("design:type", String)
], CurveComponent.prototype, "colour", void 0);
curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    curve_component___metadata("design:type", Number)
], CurveComponent.prototype, "duration", void 0);
curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(tracks_components_TracksComponent),
    curve_component___metadata("design:type", typeof (curve_component__c = typeof tracks_components_TracksComponent !== "undefined" && tracks_components_TracksComponent) === "function" && curve_component__c || Object)
], CurveComponent.prototype, "tracksComponent", void 0);
CurveComponent = CurveComponent_1 = curve_component___decorate([
    Object(curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-curve',
        template: `
    <ugly-tracks
      [timeline]="timeline"
      [width]="width"
      [onSeek]="onSeek"
      [colour]="colour"
      [tracks]="[curve]"
      [duration]="duration"
    ></ugly-tracks>`,
        changeDetection: curve_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: VerticallyLabelled, useExisting: CurveComponent_1 },
            { provide: VerticalScaleRenderer, useExisting: CurveComponent_1 },
            { provide: VerticalValueInspectorRenderer, useExisting: CurveComponent_1 },
            { provide: PlayheadRenderer, useExisting: CurveComponent_1 },
            { provide: waves_base_component_WavesComponent, useExisting: CurveComponent_1 }
        ]
    })
], CurveComponent);

var CurveComponent_1, curve_component__a, curve_component__b, curve_component__c;
//# sourceMappingURL=curve.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/notes/notes.component.ts
/* harmony import */ var notes_component___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
var notes_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var notes_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 31/05/2017.
 */



let NotesComponent = NotesComponent_1 = class NotesComponent extends InspectableVerticallyBoundedComponent {
    get labels() {
        return this.currentVerticalRange;
    }
    set notes(notes) {
        this.feature = notes;
    }
    get featureLayers() {
        this.currentVerticalRange = findVerticalRange(this.feature);
        return [
            new __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.helpers.PianoRollLayer(this.feature, {
                height: this.height,
                color: this.colour,
                yDomain: this.currentVerticalRange
            })
        ];
    }
};
notes_component___decorate([
    Object(notes_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
    notes_component___metadata("design:type", Array),
    notes_component___metadata("design:paramtypes", [Array])
], NotesComponent.prototype, "notes", null);
NotesComponent = NotesComponent_1 = notes_component___decorate([
    Object(notes_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'ugly-notes',
        template: __webpack_require__("AcCh"),
        styles: [__webpack_require__("1B76")],
        changeDetection: notes_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: VerticallyLabelled, useExisting: NotesComponent_1 },
            { provide: VerticalScaleRenderer, useExisting: NotesComponent_1 },
            { provide: VerticalValueInspectorRenderer, useExisting: NotesComponent_1 },
            { provide: PlayheadRenderer, useExisting: NotesComponent_1 },
            { provide: waves_base_component_WavesComponent, useExisting: NotesComponent_1 }
        ]
    })
], NotesComponent);

// TODO there might be scope to create a generic utility function like this
function findVerticalRange(notes) {
    let [min, max] = notes.reduce((acc, note) => {
        const [min, max] = acc;
        return [Math.min(min, note.pitch), Math.max(max, note.pitch)];
    }, [Infinity, -Infinity]);
    if (min === Infinity || min < 0 || max < 0) {
        min = 0;
        max = 127;
    }
    // round min and max to octave boundaries (starting at C as in MIDI)
    return [
        12 * Math.floor(min / 12),
        12 * Math.ceil(max / 12)
    ];
}
var NotesComponent_1;
//# sourceMappingURL=notes.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/regions/regions.component.ts
/* harmony import */ var regions_component___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var regions_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var regions_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(regions_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
var regions_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var regions_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 31/05/2017.
 */



let RegionsComponent = RegionsComponent_1 = class RegionsComponent extends InspectableVerticallyBoundedComponent {
    get labels() {
        return this.currentVerticalRange;
    }
    set regions(regions) {
        this.feature = regions;
    }
    get featureLayers() {
        this.currentVerticalRange = regions_component_findVerticalRange(this.feature);
        return [
            new regions_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.helpers.RegionLayer(this.feature, {
                height: this.height,
                color: this.colour,
                yDomain: this.currentVerticalRange
            })
        ];
    }
};
regions_component___decorate([
    Object(regions_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
    regions_component___metadata("design:type", Array),
    regions_component___metadata("design:paramtypes", [Array])
], RegionsComponent.prototype, "regions", null);
RegionsComponent = RegionsComponent_1 = regions_component___decorate([
    Object(regions_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'ugly-regions',
        template: __webpack_require__("AcCh"),
        styles: [__webpack_require__("1B76")],
        changeDetection: regions_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: VerticallyLabelled, useExisting: RegionsComponent_1 },
            { provide: VerticalScaleRenderer, useExisting: RegionsComponent_1 },
            { provide: VerticalValueInspectorRenderer, useExisting: RegionsComponent_1 },
            { provide: PlayheadRenderer, useExisting: RegionsComponent_1 },
            { provide: waves_base_component_WavesComponent, useExisting: RegionsComponent_1 }
        ]
    })
], RegionsComponent);

// TODO there might be scope to create a generic utility function like this
function regions_component_findVerticalRange(regions) {
    let [min, max] = regions.reduce((acc, region) => {
        const [min, max] = acc;
        return [Math.min(min, region.value), Math.max(max, region.value)];
    }, [Infinity, -Infinity]);
    if (min === Infinity) {
        min = 0;
        max = 1;
    }
    return [min, max];
}
var RegionsComponent_1;
//# sourceMappingURL=regions.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/instants/instants.component.ts
/* harmony import */ var instants_component___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var instants_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var instants_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(instants_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
var instants_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var instants_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 31/05/2017.
 */



let InstantsComponent = InstantsComponent_1 = class InstantsComponent extends waves_base_component_WavesComponent {
    set instants(instants) {
        this.feature = instants;
    }
    get featureLayers() {
        return [
            new instants_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.helpers.TickLayer(this.feature, {
                height: this.height,
                color: this.colour,
                labelPosition: 'bottom',
                shadeSegments: true
            })
        ];
    }
};
instants_component___decorate([
    Object(instants_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
    instants_component___metadata("design:type", Array),
    instants_component___metadata("design:paramtypes", [Array])
], InstantsComponent.prototype, "instants", null);
InstantsComponent = InstantsComponent_1 = instants_component___decorate([
    Object(instants_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'ugly-instants',
        template: __webpack_require__("AcCh"),
        styles: [__webpack_require__("1B76")],
        changeDetection: instants_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: PlayheadRenderer, useExisting: InstantsComponent_1 },
            { provide: waves_base_component_WavesComponent, useExisting: InstantsComponent_1 }
        ]
    })
], InstantsComponent);

var InstantsComponent_1;
//# sourceMappingURL=instants.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/spectrogram/ColourMap.ts
/**
 * Created by lucast on 23/05/2017.
 */
function interpolatingMapper(hexColours) {
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
function iceMapper() {
    const hexColours = [
        // Based on ColorBrewer ylGnBu
        'ffffff', 'ffff00', 'f7fcf0', 'e0f3db', 'ccebc5', 'a8ddb5',
        '7bccc4', '4eb3d3', '2b8cbe', '0868ac', '084081', '042040'
    ];
    hexColours.reverse();
    return interpolatingMapper(hexColours);
}
function greenMapper() {
    const blue = 0.6666;
    const pieslice = 0.3333;
    return (value => {
        const h = blue - value * 2.0 * pieslice;
        const s = 0.5 + value / 2.0;
        const v = value;
        return this.hsv2rgb(h, s, v);
    });
}
function sunsetMapper() {
    return (value => {
        const r = (value - 0.24) * 2.38;
        const g = (value - 0.64) * 2.777;
        let b = (3.6 * value);
        if (value > 0.277) {
            b = 2.0 - b;
        }
        return [r, g, b];
    });
}
function hsv2rgb(h, s, v) {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r, g, b];
}
//# sourceMappingURL=ColourMap.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/spectrogram/MatrixUtils.ts
/**
 * Created by lucast on 23/05/2017.
 */
function estimatePercentile(matrix, percentile) {
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
    if (m_per < 1) {
        m_per = 1;
    }
    const sample = [];
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
        return 0.0;
    }
    sample.sort((a, b) => { return a - b; });
    const ix = Math.floor((sample.length * percentile) / 100);
    const estimate = sample[ix];
    return estimate;
}
//# sourceMappingURL=MatrixUtils.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/grid/grid.component.ts
/* harmony import */ var grid_component___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var grid_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("9yQI");
/* harmony import */ var grid_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(grid_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
var grid_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var grid_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 31/05/2017.
 */






let grid_component_GridComponent = GridComponent_1 = class GridComponent extends VerticallyBinnedWavesComponent {
    set grid(grid) {
        this.feature = grid;
    }
    get featureLayers() {
        const startTime = this.feature.startTime;
        const stepDuration = this.feature.stepDuration;
        const matrixData = this.feature.data;
        if (matrixData.length === 0) {
            return [];
        }
        const targetValue = estimatePercentile(matrixData, 95);
        const gain = (targetValue > 0.0 ? (1.0 / targetValue) : 1.0);
        const matrixEntity = new grid_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.utils.PrefilledMatrixEntity(matrixData, startTime, stepDuration);
        return [
            new grid_component___WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.helpers.MatrixLayer(matrixEntity, {
                gain: gain,
                height: this.height,
                normalise: 'none',
                mapper: iceMapper()
            })
        ];
    }
    get labels() {
        if (!this.feature.binNames || this.feature.binNames.length === 0) {
            const binCount = (this.feature.data.length > 0 ?
                this.feature.data[0].length : 0);
            for (let i = 0; i < binCount; ++i) {
                this.feature.binNames.push(`${i + 1}`);
            }
        }
        return this.feature.binNames;
    }
};
grid_component___decorate([
    Object(grid_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* Input */])(),
    grid_component___metadata("design:type", typeof (grid_component__a = typeof Grid !== "undefined" && Grid) === "function" && grid_component__a || Object),
    grid_component___metadata("design:paramtypes", [typeof (grid_component__b = typeof Grid !== "undefined" && Grid) === "function" && grid_component__b || Object])
], grid_component_GridComponent.prototype, "grid", null);
grid_component_GridComponent = GridComponent_1 = grid_component___decorate([
    Object(grid_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'ugly-grid',
        template: __webpack_require__("AcCh"),
        styles: [__webpack_require__("1B76")],
        changeDetection: grid_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: VerticallyLabelled, useExisting: GridComponent_1 },
            { provide: VerticalScaleRenderer, useExisting: GridComponent_1 },
            { provide: PlayheadRenderer, useExisting: GridComponent_1 },
            { provide: waves_base_component_WavesComponent, useExisting: GridComponent_1 }
        ]
    })
], grid_component_GridComponent);

var GridComponent_1, grid_component__a, grid_component__b;
//# sourceMappingURL=grid.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/vertical-scale.component.ts
/* harmony import */ var vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
var vertical_scale_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var vertical_scale_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucas on 01/06/2017.
 */


let VerticalScaleComponent = VerticalScaleComponent_1 = class VerticalScaleComponent {
    ngAfterViewInit() {
        this.bounded.forEach(component => {
            this.cachedRange = component.labels;
            if (this.cachedRange) {
                component.renderScale(this.cachedRange);
            }
        });
    }
    renderPlayhead(initialTime, colour) {
        const rendered = this.seekable
            .filter(x => x !== this) // why does QueryList consider itself as a child?
            .map(component => component.renderPlayhead(initialTime, colour));
        return {
            update: (time) => {
                rendered.forEach(component => component.update(time));
            },
            remove: () => rendered.map(component => component.remove())
        };
    }
};
vertical_scale_component___decorate([
    Object(vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["s" /* ContentChildren */])(VerticalScaleRenderer),
    vertical_scale_component___metadata("design:type", typeof (vertical_scale_component__a = typeof vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["X" /* QueryList */] !== "undefined" && vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["X" /* QueryList */]) === "function" && vertical_scale_component__a || Object)
], VerticalScaleComponent.prototype, "bounded", void 0);
vertical_scale_component___decorate([
    Object(vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["s" /* ContentChildren */])(PlayheadRenderer),
    vertical_scale_component___metadata("design:type", typeof (vertical_scale_component__b = typeof vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["X" /* QueryList */] !== "undefined" && vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["X" /* QueryList */]) === "function" && vertical_scale_component__b || Object)
], VerticalScaleComponent.prototype, "seekable", void 0);
VerticalScaleComponent = VerticalScaleComponent_1 = vertical_scale_component___decorate([
    Object(vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'ugly-vertical-scale',
        template: '<ng-content></ng-content>',
        changeDetection: vertical_scale_component___WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: PlayheadRenderer, useExisting: VerticalScaleComponent_1 }
        ]
    })
], VerticalScaleComponent);

var VerticalScaleComponent_1, vertical_scale_component__a, vertical_scale_component__b;
//# sourceMappingURL=vertical-scale.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/visualisations/cross-hair-inspector.component.ts
/* harmony import */ var cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
var cross_hair_inspector_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var cross_hair_inspector_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 01/06/2017.
 */





let CrossHairInspectorComponent = CrossHairInspectorComponent_1 = class CrossHairInspectorComponent extends VerticalScaleComponent {
    constructor(renderLoop, player) {
        super();
        this.renderLoop = renderLoop;
        this.player = player;
        this.removers = [];
    }
    set isAnimated(isAnimated) {
        this.mIsAnimated = isAnimated;
        if (this.removers.length) {
            this.removers.forEach(remove => remove());
            this.removers = [];
        }
        if (isAnimated) {
            this.addTasks();
        }
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.inspectorRenderers.forEach(renderer => {
            renderer.renderInspector(this.cachedRange, this.unit);
            renderer.updatePosition(this.player.getCurrentTime());
        });
        this.addTasks();
    }
    ngOnDestroy() {
        this.removers.forEach(remove => remove());
    }
    addTasks() {
        if (this.inspectorRenderers && this.mIsAnimated) {
            this.inspectorRenderers.forEach(renderer => {
                this.removers.push(this.renderLoop.addPlayingTask(renderer.updatePosition));
            });
        }
    }
};
cross_hair_inspector_component___decorate([
    Object(cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ContentChildren */])(VerticalValueInspectorRenderer),
    cross_hair_inspector_component___metadata("design:type", typeof (cross_hair_inspector_component__a = typeof cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* QueryList */] !== "undefined" && cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* QueryList */]) === "function" && cross_hair_inspector_component__a || Object)
], CrossHairInspectorComponent.prototype, "inspectorRenderers", void 0);
cross_hair_inspector_component___decorate([
    Object(cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    cross_hair_inspector_component___metadata("design:type", String)
], CrossHairInspectorComponent.prototype, "unit", void 0);
cross_hair_inspector_component___decorate([
    Object(cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    cross_hair_inspector_component___metadata("design:type", Boolean),
    cross_hair_inspector_component___metadata("design:paramtypes", [Boolean])
], CrossHairInspectorComponent.prototype, "isAnimated", null);
CrossHairInspectorComponent = CrossHairInspectorComponent_1 = cross_hair_inspector_component___decorate([
    Object(cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-cross-hair-inspector',
        template: '<ng-content></ng-content>',
        changeDetection: cross_hair_inspector_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: PlayheadRenderer, useExisting: CrossHairInspectorComponent_1 }
        ]
    }),
    cross_hair_inspector_component___metadata("design:paramtypes", [typeof (cross_hair_inspector_component__b = typeof RenderLoopService !== "undefined" && RenderLoopService) === "function" && cross_hair_inspector_component__b || Object, typeof (cross_hair_inspector_component__c = typeof AudioPlayerService !== "undefined" && AudioPlayerService) === "function" && cross_hair_inspector_component__c || Object])
], CrossHairInspectorComponent);

var CrossHairInspectorComponent_1, cross_hair_inspector_component__a, cross_hair_inspector_component__b, cross_hair_inspector_component__c;
//# sourceMappingURL=cross-hair-inspector.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/playhead/waves-ui-play-head.component.ts
/* harmony import */ var waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
var waves_ui_play_head_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var waves_ui_play_head_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucas on 03/06/2017.
 */




let WavesPlayHeadComponent = class WavesPlayHeadComponent {
    constructor(renderLoop, player) {
        this.renderLoop = renderLoop;
        this.player = player;
        this.removers = [];
    }
    set isActive(isActive) {
        this.mIsActive = isActive;
        this.removeAllActivePlayheads();
        if (isActive) {
            this.setupAnimatedPlayheads();
        }
    }
    ngAfterViewInit() {
        this.removeAllActivePlayheads();
        this.setupAnimatedPlayheads();
    }
    ngOnDestroy() {
        this.removeAllActivePlayheads();
    }
    removeAllActivePlayheads() {
        this.removers.forEach(remove => remove());
        this.removers = [];
    }
    setupAnimatedPlayheads() {
        if (this.wavesChildren && this.mIsActive) {
            this.wavesChildren.forEach(component => {
                const cursor = component.renderPlayhead(this.player.getCurrentTime(), this.colour);
                this.removers.push(cursor.remove, this.renderLoop.addPlayingTask(cursor.update));
            });
        }
    }
};
waves_ui_play_head_component___decorate([
    Object(waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* ContentChildren */])(PlayheadRenderer),
    waves_ui_play_head_component___metadata("design:type", typeof (waves_ui_play_head_component__a = typeof waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* QueryList */] !== "undefined" && waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* QueryList */]) === "function" && waves_ui_play_head_component__a || Object)
], WavesPlayHeadComponent.prototype, "wavesChildren", void 0);
waves_ui_play_head_component___decorate([
    Object(waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_ui_play_head_component___metadata("design:type", String)
], WavesPlayHeadComponent.prototype, "colour", void 0);
waves_ui_play_head_component___decorate([
    Object(waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    waves_ui_play_head_component___metadata("design:type", Boolean),
    waves_ui_play_head_component___metadata("design:paramtypes", [Boolean])
], WavesPlayHeadComponent.prototype, "isActive", null);
WavesPlayHeadComponent = waves_ui_play_head_component___decorate([
    Object(waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-waves-play-head',
        template: '<ng-content></ng-content>',
        changeDetection: waves_ui_play_head_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
    }),
    waves_ui_play_head_component___metadata("design:paramtypes", [typeof (waves_ui_play_head_component__b = typeof RenderLoopService !== "undefined" && RenderLoopService) === "function" && waves_ui_play_head_component__b || Object, typeof (waves_ui_play_head_component__c = typeof AudioPlayerService !== "undefined" && AudioPlayerService) === "function" && waves_ui_play_head_component__c || Object])
], WavesPlayHeadComponent);

var waves_ui_play_head_component__a, waves_ui_play_head_component__b, waves_ui_play_head_component__c;
//# sourceMappingURL=waves-ui-play-head.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/actions/action-tray.component.ts
/* harmony import */ var action_tray_component___WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("EyWH");
var action_tray_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var action_tray_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by lucast on 06/06/2017.
 */


let ActionTrayComponent = class ActionTrayComponent {
    constructor() {
        this.visibility = 'hide';
    }
    toggle() {
        this.visibility = this.visibility === 'show' ? 'hide' : 'show';
    }
    close() {
        this.visibility = 'hide';
    }
};
action_tray_component___decorate([
    Object(action_tray_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    action_tray_component___metadata("design:type", String)
], ActionTrayComponent.prototype, "visibility", void 0);
ActionTrayComponent = action_tray_component___decorate([
    Object(action_tray_component___WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'ugly-action-tray',
        template: `<div
    class="tray"
    [@visibility]="visibility"
  ><ng-content></ng-content></div>`,
        styles: [
            `.tray {
      background: white;
      height: calc(100vh - 64px);
      width: 100%;
      position: absolute;
      z-index: 100;
      overflow: hidden;
      -webkit-overflow-scrolling: touch;
    }`
        ],
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["k" /* trigger */])('visibility', [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('show', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                    height: 'calc(100vh - 64px)',
                    overflow: 'scroll'
                })),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* state */])('hide', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({
                    height: 0,
                    overflow: 'hidden',
                })),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('hide => show', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(300, Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ height: 0, offset: 0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ height: 'calc(100vh - 64px)', offset: 1.0 }),
                    ]))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* transition */])('show => hide', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(300, Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* keyframes */])([
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ height: 'calc(100vh - 64px)', offset: 0.0 }),
                        Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["i" /* style */])({ height: 0, offset: 1.0 }),
                    ]))
                ]),
            ])
        ]
    })
], ActionTrayComponent);

//# sourceMappingURL=action-tray.component.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/services/audio-recorder/RecordRtcMediaRecorder.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_recordrtc__ = __webpack_require__("+SkV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_recordrtc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_recordrtc__);

// safari doesn't implement BlobEvent... this should do
class BlobEvent extends Event {
    constructor(data) {
        super('blob');
        this.data = data;
    }
}
class RecordRtcMediaRecorder {
    static isTypeSupported(mimeType) {
        return mimeType === 'audio/wav';
    }
    constructor(stream) {
        this.state = 'inactive';
        this.stream = stream;
        this.recorder = __WEBPACK_IMPORTED_MODULE_0_recordrtc__(stream, {
            type: 'audio',
            recorderType: __WEBPACK_IMPORTED_MODULE_0_recordrtc__["StereoAudioRecorder"]
        });
    }
    pause() {
        this.state = 'paused';
        this.recorder.pauseRecording();
    }
    requestData() {
        // could probably implement this, but it isn't actually used in the app
        throw new Error('Not implemented');
    }
    resume() {
        this.state = 'recording';
        this.recorder.resumeRecording();
    }
    start(timeslice) {
        this.state = 'recording';
        this.recorder.startRecording();
    }
    stop() {
        this.state = 'inactive';
        this.recorder.stopRecording(() => {
            if (this.ondataavailable) {
                const blob = this.recorder.getBlob();
                this.mimeType = blob.type;
                this.ondataavailable(new BlobEvent(blob));
            }
            if (this.onstop) {
                this.onstop(new Event('stop'));
            }
        });
    }
}
//# sourceMappingURL=RecordRtcMediaRecorder.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/app/app.module.ts
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("fc+i");
/* harmony import */ var app_module___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("bm2B");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("CPp0");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_Observable__ = __webpack_require__("bKpL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_rxjs_Observable__);
var app_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        return RecordRtcMediaRecorder;
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
}
function createWindowDimensionObservable() {
    return __WEBPACK_IMPORTED_MODULE_18_rxjs_Observable__["Observable"].fromEvent(window, 'resize', () => ({
        height: window.innerHeight,
        width: window.innerWidth
    })).share();
}
let AppModule = class AppModule {
};
AppModule = app_module___decorate([
    Object(app_module___WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            app_component_AppComponent,
            WaveformComponent,
            AudioFileOpenComponent,
            PlaybackControlComponent,
            RecordingControlComponent,
            FeatureExtractionMenuComponent,
            ProgressSpinnerComponent,
            analysis_item_component_AnalysisItemComponent,
            notebook_feed_component_NotebookFeedComponent,
            ProgressBarComponent,
            PlayHeadComponent,
            LivePlayHeadComponent,
            CurveComponent,
            tracks_components_TracksComponent,
            NotesComponent,
            RegionsComponent,
            InstantsComponent,
            grid_component_GridComponent,
            VerticalScaleComponent,
            CrossHairInspectorComponent,
            WavesPlayHeadComponent,
            ActionTrayComponent
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
            UglyMaterialModule
        ],
        providers: [
            { provide: HTMLAudioElement, useFactory: createAudioElement },
            { provide: 'AudioContext', useFactory: createAudioContext },
            AudioPlayerService,
            { provide: 'AudioInputProvider', useFactory: createAudioInputProvider },
            AudioRecorderService,
            feature_extraction_service_FeatureExtractionService,
            { provide: 'MediaRecorderFactory', useFactory: createMediaRecorderFactory },
            { provide: 'PiperRepoUri', useValue: 'assets/remote-extractors.json' },
            { provide: 'UrlResourceLifetimeManager', useFactory: createUrlResourceManager },
            { provide: 'ResourceReader', useFactory: createResourceReader },
            { provide: 'DimensionObservable', useFactory: createWindowDimensionObservable },
            RenderLoopService,
            NotificationService
        ],
        bootstrap: [app_component_AppComponent]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/environments/environment.ts
const environment = {
    production: true
};
//# sourceMappingURL=environment.js.map
// CONCATENATED MODULE: /Users/lucas/code/ugly-duckling/src/main.ts
/* harmony import */ var main___WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("/oeL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__("Qa4U");





if (environment.production) {
    Object(main___WEBPACK_IMPORTED_MODULE_1__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "efyd":
/***/ (function(module, exports) {

module.exports = "<div class=\"ugly-container\">\n  <div class=\"ugly-header\">\n    <md-toolbar color=\"primary\">\n      <md-icon svgIcon=\"duck\"></md-icon>\n\n      <span class=\"ugly-toolbar-filler\"></span>\n\n      <ugly-playback-control></ugly-playback-control>\n      <ugly-recording-control\n        (finishedRecording)=\"onFileOpened($event, true); tray.close()\"\n      ></ugly-recording-control>\n\n      <!-- This fills the remaining space of the current row -->\n      <span class=\"ugly-toolbar-filler\"></span>\n\n\n      <ugly-audio-file-open\n        (fileOpened)=\"onFileOpened($event); tray.close()\"\n      ></ugly-audio-file-open>\n      <button md-icon-button (click)=\"analyses.stepBack()\">\n        <md-icon>undo</md-icon>\n      </button>\n      <button md-icon-button (click)=\"analyses.stepForward()\">\n        <md-icon>redo</md-icon>\n      </button>\n      <button md-icon-button (click)=\"tray.toggle()\">\n        <md-icon>extension</md-icon>\n      </button>\n    </md-toolbar>\n  </div>\n\n  <ugly-action-tray #tray>\n    <ugly-feature-extraction-menu\n      (requestOutput)=\"tray.close(); extractFeatures($event)\"\n      [disabled]=\"!canExtract\"\n    >\n    </ugly-feature-extraction-menu>\n  </ugly-action-tray>\n  <div class=\"ugly-content\">\n    <ugly-notebook-feed\n      (removeItem)=\"removeItem($event)\"\n      [analyses]=\"analyses.toIterable()\"\n      [onSeek]=\"onSeek\"></ugly-notebook-feed>\n  </div>\n</div>\n"

/***/ }),

/***/ "hsUb":
/***/ (function(module, exports) {

module.exports = "<input #open type=\"file\" accept=\"audio/*\" (change)=\"decodeAudio($event.target.files)\"/>\n<button md-icon-button (click)=\"openAudioDialog()\">\n    <md-icon>folder_open</md-icon>\n</button>\n"

/***/ }),

/***/ "hth3":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rP7Y")(false);
// imports


// module
exports.push([module.i, "md-card{padding-left:0;padding-right:0;width:100%;padding-bottom:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md-card-actions{width:calc(100% - 16px);padding-left:16px}md-card-header{margin-bottom:8px}md-card-content{margin-bottom:0}md-card-actions{text-align:right}ugly-live-play-head{position:absolute;z-index:99;height:160px}.content{height:160px;width:100%;cursor:pointer}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "hxJY":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rP7Y")(false);
// imports


// module
exports.push([module.i, ".ugly-toolbar-filler{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}md-sidenav-container{height:100%;width:100%;position:absolute}md-sidenav{text-align:center}.ugly-container{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ugly-header{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.ugly-content{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:scroll;position:relative;-webkit-overflow-scrolling:touch}.ugly-footer{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "ixMg":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "ixMg";

/***/ }),

/***/ "lmXt":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rP7Y")(false);
// imports


// module
exports.push([module.i, "input{display:none}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "x5+K":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("rP7Y")(false);
// imports


// module
exports.push([module.i, "#extractor-outputs{max-width:80%;display:block;margin:0 auto}.container{margin-top:10pt;padding:10pt}.container button,.container md-spinner{margin:0 auto;display:block}.container md-spinner{height:20px;width:20px}md-list-item{cursor:pointer}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ })

},[0]);