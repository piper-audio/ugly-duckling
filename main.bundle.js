webpackJsonp([1],{

/***/ "+TQ2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs__ = __webpack_require__("rxKx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_hammerjs__);
/* harmony export (immutable) */ __webpack_exports__["a"] = attachTouchHandlerBodges;
/* harmony export (immutable) */ __webpack_exports__["b"] = naivePagingMapper;
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

/***/ }),

/***/ "+V6z":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"emitToggleRecording()\">\n  <md-icon>\n    <ng-template [ngIf]=\"recordingStatus == 'enabled'\">mic_none</ng-template>\n    <ng-template [ngIf]=\"recordingStatus == 'disabled'\">mic_off</ng-template>\n    <ng-template [ngIf]=\"recordingStatus == 'recording'\">mic_on</ng-template>\n  </md-icon>\n</button>\n\n"

/***/ }),

/***/ "+ndt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vertical_scale_component__ = __webpack_require__("0FaT");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_render_loop_render_loop_service__ = __webpack_require__("LoPv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrossHairInspectorComponent; });
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
 * Created by lucast on 01/06/2017.
 */





let CrossHairInspectorComponent = class CrossHairInspectorComponent extends __WEBPACK_IMPORTED_MODULE_2__vertical_scale_component__["a" /* VerticalScaleComponent */] {
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
    addTasks() {
        if (this.inspectorRenderers && this.mIsAnimated) {
            this.inspectorRenderers.forEach(renderer => {
                this.removers.push(this.renderLoop.addPlayingTask(renderer.updatePosition));
            });
        }
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ContentChildren */])(__WEBPACK_IMPORTED_MODULE_1__waves_base_component__["b" /* VerticalValueInspectorRenderer */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* QueryList */]) === "function" && _a || Object)
], CrossHairInspectorComponent.prototype, "inspectorRenderers", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], CrossHairInspectorComponent.prototype, "unit", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CrossHairInspectorComponent.prototype, "isAnimated", null);
CrossHairInspectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-cross-hair-inspector',
        template: '<ng-content></ng-content>',
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_render_loop_render_loop_service__["a" /* RenderLoopService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_render_loop_render_loop_service__["a" /* RenderLoopService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _c || Object])
], CrossHairInspectorComponent);

var _a, _b, _c;
//# sourceMappingURL=cross-hair-inspector.component.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("x35b");


/***/ }),

/***/ "0FaT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerticalScaleComponent; });
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
 * Created by lucas on 01/06/2017.
 */


let VerticalScaleComponent = class VerticalScaleComponent {
    ngAfterViewInit() {
        this.bounded.forEach(component => {
            this.cachedRange = component.range;
            if (this.cachedRange) {
                component.renderScale(this.cachedRange);
            }
        });
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_5" /* ContentChildren */])(__WEBPACK_IMPORTED_MODULE_0__waves_base_component__["c" /* VerticalScaleRenderer */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["_11" /* QueryList */]) === "function" && _a || Object)
], VerticalScaleComponent.prototype, "bounded", void 0);
VerticalScaleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_3" /* Component */])({
        selector: 'ugly-vertical-scale',
        template: '<ng-content></ng-content>',
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    })
], VerticalScaleComponent);

var _a;
//# sourceMappingURL=vertical-scale.component.js.map

/***/ }),

/***/ "1RzP":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "#extractor-outputs{max-width:80%;display:block;margin:0 auto}.container{margin-top:10pt;padding:10pt}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "3/Mv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__visualisations_waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_render_loop_render_loop_service__ = __webpack_require__("LoPv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WavesPlayHeadComponent; });
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
                const cursor = new __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.helpers.CursorLayer({
                    height: component.height,
                    color: this.colour,
                });
                cursor.currentPosition = this.player.getCurrentTime();
                this.removers.push(component.addLayer(cursor), this.renderLoop.addPlayingTask(currentTime => {
                    cursor.currentPosition = currentTime;
                    cursor.update();
                }));
            });
        }
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ContentChildren */])(__WEBPACK_IMPORTED_MODULE_1__visualisations_waves_base_component__["a" /* WavesComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* QueryList */]) === "function" && _a || Object)
], WavesPlayHeadComponent.prototype, "wavesChildren", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], WavesPlayHeadComponent.prototype, "colour", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], WavesPlayHeadComponent.prototype, "isActive", null);
WavesPlayHeadComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-waves-play-head',
        template: '<ng-content></ng-content>',
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_render_loop_render_loop_service__["a" /* RenderLoopService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_render_loop_render_loop_service__["a" /* RenderLoopService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _c || Object])
], WavesPlayHeadComponent);

var _a, _b, _c;
//# sourceMappingURL=waves-ui-play-head.component.js.map

/***/ }),

/***/ "3lao":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("EEr4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("Fzro");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piper_client_stubs_WebWorkerStreamingClient__ = __webpack_require__("4AhG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piper_client_stubs_WebWorkerStreamingClient___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_piper_client_stubs_WebWorkerStreamingClient__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_StreamingService__ = __webpack_require__("e4w8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_StreamingService___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_piper_StreamingService__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__visualisations_FeatureUtilities__ = __webpack_require__("7PMI");
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
        this.progressUpdated = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.progressUpdated$ = this.progressUpdated.asObservable();
        this.worker.addEventListener('message', (ev) => {
            const isValidResponse = ev.data.method === 'import'
                && ev.data.result && ev.data.result.available;
            if (isValidResponse) {
                ev.stopImmediatePropagation();
                this.librariesUpdated.next(ev.data.result);
            }
        }, true);
        this.client = new __WEBPACK_IMPORTED_MODULE_3_piper_client_stubs_WebWorkerStreamingClient__["WebWorkerStreamingClient"](this.worker, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_piper_client_stubs_WebWorkerStreamingClient__["countingIdProvider"])(0));
    }
    list() {
        return this.client.list({});
    }
    extract(analysisItemId, request) {
        let config;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper_StreamingService__["collect"])(this.client.process(request), val => {
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
            const shaped = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__visualisations_FeatureUtilities__["a" /* toKnownShape */])({
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
            .catch(console.error); // TODO Report error to user
    }
    load(libraryKey) {
        this.worker.postMessage({ method: 'import', params: libraryKey });
    }
};
FeatureExtractionService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])('PiperRepoUri')),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object, String])
], FeatureExtractionService);

var _a;
//# sourceMappingURL=feature-extraction.service.js.map

/***/ }),

/***/ "4Wxe":
/***/ (function(module, exports) {

module.exports = "<input #open type=\"file\" accept=\"audio/*\" (change)=\"decodeAudio($event.target.files)\"/>\n<button md-icon-button (click)=\"openAudioDialog()\">\n    <md-icon>folder_open</md-icon>\n</button>\n"

/***/ }),

/***/ "5xMp":
/***/ (function(module, exports) {

module.exports = "<div class=\"ugly-container\">\n  <div class=\"ugly-header\">\n    <md-toolbar color=\"primary\">\n      <md-icon svgIcon=\"duck\"></md-icon>\n\n      <span class=\"ugly-toolbar-filler\"></span>\n\n      <ugly-playback-control></ugly-playback-control>\n      <ugly-recording-control\n        (finishedRecording)=\"onFileOpened($event)\"\n      ></ugly-recording-control>\n\n      <!-- This fills the remaining space of the current row -->\n      <span class=\"ugly-toolbar-filler\"></span>\n\n\n      <ugly-audio-file-open\n        (fileOpened)=\"onFileOpened($event)\"\n      ></ugly-audio-file-open>\n      <!-- menu opens when trigger button is clicked -->\n      <button md-icon-button (click)=\"tray.toggle()\">\n        <md-icon>extension</md-icon>\n      </button>\n    </md-toolbar>\n  </div>\n\n  <ugly-action-tray #tray>\n    <ugly-feature-extraction-menu\n      (requestOutput)=\"extractFeatures($event)\"\n      [onRequestOutput]=\"closeTray\"\n      [disabled]=\"!canExtract\"\n    >\n    </ugly-feature-extraction-menu>\n  </ugly-action-tray>\n  <div class=\"ugly-content\">\n    <ugly-notebook-feed\n      [analyses]=\"analyses.toIterable()\"\n      [rootAudioUri]=\"rootAudioItem.uri\"\n      [onSeek]=\"onSeek\"></ugly-notebook-feed>\n  </div>\n</div>\n"

/***/ }),

/***/ "7PMI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_piper__ = __webpack_require__("eGCF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_piper__);
/* unused harmony export getCanonicalNoteLikeUnit */
/* unused harmony export mapFeaturesToNotes */
/* unused harmony export frequencyToMidiNote */
/* unused harmony export createColourGenerator */
/* harmony export (immutable) */ __webpack_exports__["a"] = toKnownShape;
/* harmony export (immutable) */ __webpack_exports__["b"] = generatePlotData;
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
        time: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_piper__["toSeconds"])(feature.timestamp),
        duration: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_piper__["toSeconds"])(feature.duration),
        pitch: isHz ?
            frequencyToMidiNote(feature.featureValues[0]) : feature.featureValues[0]
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
/* harmony export (immutable) */ __webpack_exports__["c"] = defaultColourGenerator;

// These needn't be classes (could just be interfaces), just experimenting
class ShapedFeature {
}
/* unused harmony export ShapedFeature */

class Vector extends ShapedFeature {
}
/* unused harmony export Vector */

class Matrix extends ShapedFeature {
}
/* unused harmony export Matrix */

class Tracks extends ShapedFeature {
}
/* unused harmony export Tracks */

class Notes extends ShapedFeature {
}
/* unused harmony export Notes */

class Instants extends ShapedFeature {
}
/* unused harmony export Instants */

function hasKnownShapeOtherThanList(shape) {
    return ['vector', 'matrix', 'tracks'].includes(shape);
}
const throwShapeError = () => { throw new Error('No shape could be deduced'); };
function deduceHigherLevelFeatureShape(response) {
    const collection = response.features;
    const descriptor = response.outputDescriptor;
    if (hasKnownShapeOtherThanList(collection.shape)) {
        return collection.shape;
    }
    // TODO it's a shame that the types in piper don't make this easy for the
    // compiler to deduce
    if (collection.shape !== 'list' && collection.collected instanceof Array) {
        throwShapeError();
    }
    const featureData = collection.collected;
    const hasDuration = descriptor.configured.hasDuration;
    const binCount = descriptor.configured.binCount;
    const isMarker = !hasDuration
        && binCount === 0
        && featureData[0].featureValues == null;
    const isMaybeNote = getCanonicalNoteLikeUnit(descriptor.configured.unit)
        && [1, 2].find(nBins => nBins === binCount);
    // TODO any need to be directly inspecting features?
    const isRegionLike = hasDuration && featureData[0].timestamp != null;
    const isNote = isMaybeNote && isRegionLike;
    if (isMarker) {
        return 'instants';
    }
    if (isNote) {
        return 'notes';
    }
    throwShapeError();
}
function toKnownShape(response) {
    const deducedShape = deduceHigherLevelFeatureShape(response);
    switch (deducedShape) {
        case 'vector':
            return response.features;
        case 'matrix':
            return response.features;
        case 'tracks':
            return response.features;
        case 'notes':
            return {
                shape: deducedShape,
                collected: mapFeaturesToNotes(response.features.collected, response.outputDescriptor)
            };
        case 'instants':
            const featureData = response.features.collected;
            return {
                shape: deducedShape,
                collected: featureData.map(feature => ({
                    time: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_piper__["toSeconds"])(feature.timestamp),
                    label: feature.label
                }))
            };
    }
    throwShapeError();
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

/***/ }),

/***/ "7itA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/**
 * Created by lucas on 24/04/2017.
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

let ProgressBarComponent = class ProgressBarComponent {
    constructor() {
        this.isDeterminate = false;
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], ProgressBarComponent.prototype, "isDeterminate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number)
], ProgressBarComponent.prototype, "progress", void 0);
ProgressBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-progress-bar',
        template: `
    <md-progress-bar
      [attr.color]="'primary'"
      [mode]="isDeterminate ? 'determinate' : 'indeterminate'"
      [value]="progress"
    ></md-progress-bar>
  `,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    })
], ProgressBarComponent);

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ "7vD/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
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
        this.recordingStatus = 'disabled';
        this.finishedRecording = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], RecordingControlComponent.prototype, "finishedRecording", void 0);
RecordingControlComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-recording-control',
        template: __webpack_require__("+V6z")
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_audio_recorder_audio_recorder_service__["b" /* AudioRecorderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_audio_recorder_audio_recorder_service__["b" /* AudioRecorderService */]) === "function" && _b || Object])
], RecordingControlComponent);

var _a, _b;
//# sourceMappingURL=recording-control.component.js.map

/***/ }),

/***/ "8ANq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__waves_base_component__ = __webpack_require__("ig0+");
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



let WaveformComponent = WaveformComponent_1 = class WaveformComponent extends __WEBPACK_IMPORTED_MODULE_2__waves_base_component__["a" /* WavesComponent */] {
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WaveformComponent.prototype, "audioBuffer", null);
WaveformComponent = WaveformComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-waveform',
        template: __webpack_require__("furQ"),
        styles: [__webpack_require__("xWq0")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_2__waves_base_component__["a" /* WavesComponent */], useExisting: WaveformComponent_1 }
        ]
    })
], WaveformComponent);

var WaveformComponent_1;
//# sourceMappingURL=waveform.component.js.map

/***/ }),

/***/ "A7Tv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
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
        this.fileOpened = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('open'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a || Object)
], AudioFileOpenComponent.prototype, "open", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _b || Object)
], AudioFileOpenComponent.prototype, "fileOpened", void 0);
AudioFileOpenComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-audio-file-open',
        template: __webpack_require__("4Wxe"),
        styles: [__webpack_require__("t89E")]
    }),
    __metadata("design:paramtypes", [])
], AudioFileOpenComponent);

var _a, _b;
//# sourceMappingURL=audio-file-open.component.js.map

/***/ }),

/***/ "AV7G":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstantsComponent; });
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
 * Created by lucast on 31/05/2017.
 */



let InstantsComponent = InstantsComponent_1 = class InstantsComponent extends __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["a" /* WavesComponent */] {
    set instants(instants) {
        this.feature = instants;
    }
    get featureLayers() {
        return [
            new __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.helpers.TickLayer(this.feature, {
                height: this.height,
                color: this.colour,
                labelPosition: 'bottom',
                shadeSegments: true
            })
        ];
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["O" /* Input */])(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], InstantsComponent.prototype, "instants", null);
InstantsComponent = InstantsComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_3" /* Component */])({
        selector: 'ugly-instants',
        template: __webpack_require__("furQ"),
        styles: [__webpack_require__("xWq0")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["a" /* WavesComponent */], useExisting: InstantsComponent_1 }
        ]
    })
], InstantsComponent);

var InstantsComponent_1;
//# sourceMappingURL=instants.component.js.map

/***/ }),

/***/ "DGsc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__ = __webpack_require__("ndKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayHeadComponent; });
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"]) === "function" && _a || Object)
], PlayHeadComponent.prototype, "timeToPixel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PlayHeadComponent.prototype, "currentTime", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PlayHeadComponent.prototype, "colour", null);
PlayHeadComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-play-head',
        template: `<div [ngStyle]="currentStyle"></div>`,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    })
], PlayHeadComponent);

var _a;
//# sourceMappingURL=playhead.component.js.map

/***/ }),

/***/ "Fj30":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = estimatePercentile;
/**
 * Created by lucast on 23/05/2017.
 */
/**
 * Created by lucast on 23/05/2017.
 */ function estimatePercentile(matrix, percentile) {
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

/***/ }),

/***/ "HlfC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__("Um43");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTrayComponent; });
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
 * Created by lucast on 06/06/2017.
 */


let ActionTrayComponent = class ActionTrayComponent {
    constructor() {
        this.visibility = 'hide';
    }
    toggle() {
        this.visibility = this.visibility === 'show' ? 'hide' : 'show';
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], ActionTrayComponent.prototype, "visibility", void 0);
ActionTrayComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
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
    }`
        ],
        animations: [
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["a" /* trigger */])('visibility', [
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('show', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    height: 'calc(100vh - 64px)',
                    overflow: 'scroll'
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["b" /* state */])('hide', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({
                    height: 0,
                    overflow: 'hidden',
                })),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('hide => show', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(300, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* keyframes */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ height: 0, offset: 0 }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ height: 'calc(100vh - 64px)', offset: 1.0 }),
                    ]))
                ]),
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["d" /* transition */])('show => hide', [
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["e" /* animate */])(300, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["j" /* keyframes */])([
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ height: 'calc(100vh - 64px)', offset: 0.0 }),
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["c" /* style */])({ height: 0, offset: 1.0 }),
                    ]))
                ]),
            ])
        ]
    })
], ActionTrayComponent);

//# sourceMappingURL=action-tray.component.js.map

/***/ }),

/***/ "IAkt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export interpolatingMapper */
/* harmony export (immutable) */ __webpack_exports__["a"] = iceMapper;
/* unused harmony export greenMapper */
/* unused harmony export sunsetMapper */
/* unused harmony export hsv2rgb */
/**
 * Created by lucast on 23/05/2017.
 */
/**
 * Created by lucast on 23/05/2017.
 */ function interpolatingMapper(hexColours) {
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

/***/ }),

/***/ "Iksp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("Qbdm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("NVOs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("Fzro");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("YWx4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__visualisations_waveform_waveform_component__ = __webpack_require__("8ANq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__audio_file_open_audio_file_open_component__ = __webpack_require__("A7Tv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__playback_control_playback_control_component__ = __webpack_require__("kETe");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_feature_extraction_feature_extraction_service__ = __webpack_require__("3lao");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__feature_extraction_menu_feature_extraction_menu_component__ = __webpack_require__("tfge");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__progress_spinner_progress_spinner_component__ = __webpack_require__("iHFK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_audio_recorder_audio_recorder_service__ = __webpack_require__("pcIR");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__recording_control_recording_control_component__ = __webpack_require__("7vD/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__notebook_feed_notebook_feed_component__ = __webpack_require__("Qvmv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__analysis_item_analysis_item_component__ = __webpack_require__("jat4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__progress_bar_progress_bar__ = __webpack_require__("7itA");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ugly_material_module__ = __webpack_require__("SYN/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_Observable__ = __webpack_require__("rCTf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__playhead_playhead_component__ = __webpack_require__("DGsc");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__playhead_live_play_head_component__ = __webpack_require__("LK4Y");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__visualisations_curve_curve_component__ = __webpack_require__("evdI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__visualisations_tracks_tracks_components__ = __webpack_require__("z27C");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__visualisations_notes_notes_component__ = __webpack_require__("PwWf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__visualisations_instants_instants_component__ = __webpack_require__("AV7G");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__visualisations_grid_grid_component__ = __webpack_require__("mq3k");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__visualisations_vertical_scale_component__ = __webpack_require__("0FaT");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__visualisations_cross_hair_inspector_component__ = __webpack_require__("+ndt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_render_loop_render_loop_service__ = __webpack_require__("LoPv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__playhead_waves_ui_play_head_component__ = __webpack_require__("3/Mv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__actions_action_tray_component__ = __webpack_require__("HlfC");
/* unused harmony export createAudioContext */
/* unused harmony export createAudioElement */
/* unused harmony export createAudioInputProvider */
/* unused harmony export createMediaRecorderFactory */
/* unused harmony export createUrlResourceManager */
/* unused harmony export createResourceReader */
/* unused harmony export createWindowDimensionObservable */
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
        return __WEBPACK_IMPORTED_MODULE_12__services_audio_recorder_audio_recorder_service__["a" /* ThrowingMediaRecorder */];
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
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__visualisations_waveform_waveform_component__["a" /* WaveformComponent */],
            __WEBPACK_IMPORTED_MODULE_6__audio_file_open_audio_file_open_component__["a" /* AudioFileOpenComponent */],
            __WEBPACK_IMPORTED_MODULE_7__playback_control_playback_control_component__["a" /* PlaybackControlComponent */],
            __WEBPACK_IMPORTED_MODULE_13__recording_control_recording_control_component__["a" /* RecordingControlComponent */],
            __WEBPACK_IMPORTED_MODULE_10__feature_extraction_menu_feature_extraction_menu_component__["a" /* FeatureExtractionMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_11__progress_spinner_progress_spinner_component__["a" /* ProgressSpinnerComponent */],
            __WEBPACK_IMPORTED_MODULE_15__analysis_item_analysis_item_component__["a" /* AnalysisItemComponent */],
            __WEBPACK_IMPORTED_MODULE_14__notebook_feed_notebook_feed_component__["a" /* NotebookFeedComponent */],
            __WEBPACK_IMPORTED_MODULE_16__progress_bar_progress_bar__["a" /* ProgressBarComponent */],
            __WEBPACK_IMPORTED_MODULE_19__playhead_playhead_component__["a" /* PlayHeadComponent */],
            __WEBPACK_IMPORTED_MODULE_20__playhead_live_play_head_component__["a" /* LivePlayHeadComponent */],
            __WEBPACK_IMPORTED_MODULE_21__visualisations_curve_curve_component__["a" /* CurveComponent */],
            __WEBPACK_IMPORTED_MODULE_22__visualisations_tracks_tracks_components__["a" /* TracksComponent */],
            __WEBPACK_IMPORTED_MODULE_23__visualisations_notes_notes_component__["a" /* NotesComponent */],
            __WEBPACK_IMPORTED_MODULE_24__visualisations_instants_instants_component__["a" /* InstantsComponent */],
            __WEBPACK_IMPORTED_MODULE_25__visualisations_grid_grid_component__["a" /* GridComponent */],
            __WEBPACK_IMPORTED_MODULE_26__visualisations_vertical_scale_component__["a" /* VerticalScaleComponent */],
            __WEBPACK_IMPORTED_MODULE_27__visualisations_cross_hair_inspector_component__["a" /* CrossHairInspectorComponent */],
            __WEBPACK_IMPORTED_MODULE_29__playhead_waves_ui_play_head_component__["a" /* WavesPlayHeadComponent */],
            __WEBPACK_IMPORTED_MODULE_30__actions_action_tray_component__["a" /* ActionTrayComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_17__ugly_material_module__["a" /* UglyMaterialModule */]
        ],
        providers: [
            { provide: HTMLAudioElement, useFactory: createAudioElement },
            { provide: 'AudioContext', useFactory: createAudioContext },
            __WEBPACK_IMPORTED_MODULE_8__services_audio_player_audio_player_service__["a" /* AudioPlayerService */],
            { provide: 'AudioInputProvider', useFactory: createAudioInputProvider },
            __WEBPACK_IMPORTED_MODULE_12__services_audio_recorder_audio_recorder_service__["b" /* AudioRecorderService */],
            __WEBPACK_IMPORTED_MODULE_9__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */],
            { provide: 'MediaRecorderFactory', useFactory: createMediaRecorderFactory },
            { provide: 'PiperRepoUri', useValue: 'assets/remote-extractors.json' },
            { provide: 'UrlResourceLifetimeManager', useFactory: createUrlResourceManager },
            { provide: 'ResourceReader', useFactory: createResourceReader },
            { provide: 'DimensionObservable', useFactory: createWindowDimensionObservable },
            __WEBPACK_IMPORTED_MODULE_28__services_render_loop_render_loop_service__["a" /* RenderLoopService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "LK4Y":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__ = __webpack_require__("ndKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_render_loop_render_loop_service__ = __webpack_require__("LoPv");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LivePlayHeadComponent; });
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__PlayHeadHelpers__["TimePixelMapper"]) === "function" && _a || Object)
], LivePlayHeadComponent.prototype, "timeToPixel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], LivePlayHeadComponent.prototype, "colour", void 0);
LivePlayHeadComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-live-play-head',
        template: `<ugly-play-head
    [currentTime]="currentTime"
    [timeToPixel]="timeToPixel"
    [colour]="colour"></ugly-play-head>`,
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_render_loop_render_loop_service__["a" /* RenderLoopService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_render_loop_render_loop_service__["a" /* RenderLoopService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */]) === "function" && _c || Object])
], LivePlayHeadComponent);

var _a, _b, _c;
//# sourceMappingURL=live-play-head.component.js.map

/***/ }),

/***/ "LoPv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderLoopService; });
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
RenderLoopService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */]) === "function" && _b || Object])
], RenderLoopService);

var _a, _b;
//# sourceMappingURL=render-loop.service.js.map

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

/***/ "PwWf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotesComponent; });
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
 * Created by lucast on 31/05/2017.
 */



let NotesComponent = NotesComponent_1 = class NotesComponent extends __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["d" /* InspectableVerticallyBoundedComponent */] {
    get range() {
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["O" /* Input */])(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], NotesComponent.prototype, "notes", null);
NotesComponent = NotesComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_3" /* Component */])({
        selector: 'ugly-notes',
        template: __webpack_require__("furQ"),
        styles: [__webpack_require__("xWq0")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["e" /* VerticallyBounded */], useExisting: NotesComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["c" /* VerticalScaleRenderer */], useExisting: NotesComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["b" /* VerticalValueInspectorRenderer */], useExisting: NotesComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["a" /* WavesComponent */], useExisting: NotesComponent_1 }
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

/***/ }),

/***/ "Qvmv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__analysis_item_analysis_item_component__ = __webpack_require__("jat4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("rCTf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__ = __webpack_require__("ndKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__);
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Created by lucast on 21/03/2017.
 */





let NotebookFeedComponent = class NotebookFeedComponent {
    constructor(ref, onResize) {
        this.ref = ref;
        this.onResize = onResize;
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
    set rootAudioUri(uri) {
        this._rootAudioUri = uri;
    }
    get rootAudioUri() {
        return this._rootAudioUri;
    }
    getOrCreateTimeline(item) {
        if (!item.hasSharedTimeline) {
            return;
        }
        const uri = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__analysis_item_analysis_item_component__["b" /* getRootUri */])(item);
        if (this.timelines.has(uri)) {
            return this.timelines.get(uri);
        }
        else {
            const timeline = new __WEBPACK_IMPORTED_MODULE_1_waves_ui_piper___default.a.core.Timeline();
            this.timelines.set(uri, timeline);
            return timeline;
        }
    }
    isAudioItem(item) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__analysis_item_analysis_item_component__["c" /* isRootAudioItem */])(item);
    }
    isActiveItem(item) {
        return this.rootAudioUri === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__analysis_item_analysis_item_component__["b" /* getRootUri */])(item);
    }
    getOnSeekForItem(item) {
        return this.isActiveItem(item) ? this.onSeek : () => { };
    }
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Array)
], NotebookFeedComponent.prototype, "analyses", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NotebookFeedComponent.prototype, "rootAudioUri", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && _a || Object)
], NotebookFeedComponent.prototype, "onSeek", void 0);
NotebookFeedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-notebook-feed',
        template: __webpack_require__("vB4/"),
        styles: [__webpack_require__("lZe/")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    }),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])('DimensionObservable')),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* ChangeDetectorRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"]) === "function" && _c || Object])
], NotebookFeedComponent);

var _a, _b, _c;
//# sourceMappingURL=notebook-feed.component.js.map

/***/ }),

/***/ "SYN/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_material__ = __webpack_require__("fYnu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("KN8t");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UglyMaterialModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["a" /* MdIconModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["b" /* MdSidenavModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["c" /* MdToolbarModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["d" /* MdButtonModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["e" /* MdSelectModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["f" /* MdProgressSpinnerModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["g" /* MdProgressBarModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["h" /* MdCardModule */],
    __WEBPACK_IMPORTED_MODULE_0__angular_material__["i" /* MdListModule */]
];
let UglyMaterialModule = class UglyMaterialModule {
};
UglyMaterialModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        imports: importExports,
        exports: importExports,
    })
], UglyMaterialModule);

//# sourceMappingURL=ugly-material.module.js.map

/***/ }),

/***/ "W1+o":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <md-list dense>\n    <ng-container\n      *ngFor=\"let extractor of extractors\"\n    >\n      <h3 md-subheader>{{extractor.name}}</h3>\n      <md-list-item *ngFor=\"let output of extractor.outputs\">\n        <md-icon md-list-icon>extension</md-icon>\n        <h4 md-line>{{output.name}}</h4>\n        <p md-line>{{output.combinedKey}}</p>\n        <button md-icon-button (click)=\"extract(output)\" [disabled]=\"disabled\">\n          <md-icon>add</md-icon>\n        </button>\n      </md-list-item>\n      <md-divider></md-divider>\n    </ng-container>\n  </md-list>\n</div>\n"

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_web_animations_js__ = __webpack_require__("5DV0");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_web_animations_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_web_animations_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__ = __webpack_require__("ZSR1");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_zone_js_dist_zone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_hammerjs__ = __webpack_require__("rxKx");
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

/***/ }),

/***/ "YWx4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__ = __webpack_require__("3lao");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("Qbdm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("fYnu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__analysis_item_analysis_item_component__ = __webpack_require__("jat4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_action_tray_component__ = __webpack_require__("HlfC");
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







class PersistentStack {
    constructor() {
        this.stack = [];
        this.history = [];
    }
    shift() {
        this.history.push([...this.stack]);
        const item = this.stack[0];
        this.stack = this.stack.slice(1);
        return item;
    }
    unshift(item) {
        this.history.push([...this.stack]);
        this.stack = [item, ...this.stack];
        return this.stack.length;
    }
    findIndex(predicate) {
        return this.stack.findIndex(predicate);
    }
    filter(predicate) {
        return this.stack.filter(predicate);
    }
    get(index) {
        return this.stack[index];
    }
    set(index, value) {
        this.history.push([...this.stack]);
        this.stack = [
            ...this.stack.slice(0, index),
            value,
            ...this.stack.slice(index + 1)
        ];
    }
    toIterable() {
        return this.stack;
    }
}
let AppComponent = class AppComponent {
    constructor(audioService, featureService, iconRegistry, sanitizer) {
        this.audioService = audioService;
        this.featureService = featureService;
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
        this.analyses = new PersistentStack();
        this.canExtract = false;
        this.nRecordings = 0;
        this.countingId = 0;
        this.onSeek = (time) => this.audioService.seekTo(time);
        this.rootAudioItem = {}; // TODO eugh
        iconRegistry.addSvgIcon('duck', sanitizer.bypassSecurityTrustResourceUrl('assets/duck.svg'));
        this.onAudioDataSubscription = this.audioService.audioLoaded$.subscribe(resource => {
            const wasError = resource.message != null;
            if (wasError) {
                this.analyses.shift();
                this.canExtract = false;
            }
            else {
                this.audioBuffer = resource.samples;
                this.rootAudioItem.audioData = this.audioBuffer;
                if (this.audioBuffer) {
                    this.canExtract = true;
                    const currentRootIndex = this.analyses.findIndex(val => {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__analysis_item_analysis_item_component__["c" /* isRootAudioItem */])(val) && val.uri === this.rootAudioItem.uri;
                    });
                    if (currentRootIndex !== -1) {
                        this.analyses.set(currentRootIndex, Object.assign({}, this.analyses.get(currentRootIndex), { audioData: this.audioBuffer }));
                    }
                }
            }
        });
        this.onProgressUpdated = this.featureService.progressUpdated$.subscribe(progress => {
            const index = this.analyses.findIndex(val => val.id === progress.id);
            if (index === -1) {
                return;
            }
            this.analyses.set(index, Object.assign({}, this.analyses.get(index), { progress: progress.value }));
        });
        this.closeTray = () => {
            this.tray.toggle();
        };
    }
    onFileOpened(file) {
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
            id: `${++this.countingId}`
        };
        this.rootAudioItem = pending; // TODO this is silly
        // TODO re-ordering of items for display
        // , one alternative is a Angular Pipe / Filter for use in the Template
        this.analyses.unshift(pending);
    }
    extractFeatures(outputInfo) {
        if (!this.canExtract || !outputInfo) {
            return;
        }
        this.canExtract = false;
        const placeholderCard = {
            parent: this.rootAudioItem,
            hasSharedTimeline: true,
            extractorKey: outputInfo.combinedKey,
            title: outputInfo.name,
            description: outputInfo.outputId,
            id: `${++this.countingId}`,
            progress: 0
        };
        this.analyses.unshift(placeholderCard);
        this.featureService.extract(`${this.countingId}`, {
            audioData: [...Array(this.audioBuffer.numberOfChannels).keys()]
                .map(i => this.audioBuffer.getChannelData(i)),
            audioFormat: {
                sampleRate: this.audioBuffer.sampleRate,
                channelCount: this.audioBuffer.numberOfChannels,
                length: this.audioBuffer.length
            },
            key: outputInfo.extractorKey,
            outputId: outputInfo.outputId
        }).then(result => {
            const i = this.analyses.findIndex(val => val.id === result.id);
            this.canExtract = true;
            if (i !== -1) {
                this.analyses.set(i, Object.assign({}, this.analyses.get(i), result.result, result.unit ? { unit: result.unit } : {}));
            } // TODO else remove the item?
        }).catch(err => {
            this.canExtract = true;
            this.analyses.shift();
            console.error(`Error whilst extracting: ${err}`);
        });
    }
    ngOnDestroy() {
        this.onAudioDataSubscription.unsubscribe();
        this.onProgressUpdated.unsubscribe();
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_6__actions_action_tray_component__["a" /* ActionTrayComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__actions_action_tray_component__["a" /* ActionTrayComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__actions_action_tray_component__["a" /* ActionTrayComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "tray", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-root',
        template: __webpack_require__("5xMp"),
        styles: [__webpack_require__("okgc")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["j" /* MdIconRegistry */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["j" /* MdIconRegistry */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["f" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["f" /* DomSanitizer */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "c1nP":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "md-card{padding-left:0;padding-right:0;width:100%;padding-bottom:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md-card-actions{width:calc(100% - 16px);padding-left:16px}md-card-header{margin-bottom:8px}ugly-live-play-head{position:absolute;z-index:99;height:160px}.content{height:160px;width:100%;cursor:pointer}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "cqUy":
/***/ (function(module, exports) {

module.exports = "<md-card>\n  <md-card-header>\n    <md-card-title>{{item.title}}</md-card-title>\n    <md-card-subtitle>{{item.description}}</md-card-subtitle>\n  </md-card-header>\n  <md-card-content>\n    <div class=\"content\">\n      <ng-template [ngIf]=\"isLoading()\">\n        <ugly-progress-bar\n          [isDeterminate]=\"true\"\n          [progress]=\"item.progress\"\n        ></ugly-progress-bar>\n      </ng-template>\n      <ng-template [ngIf]=\"!isLoading()\">\n        <ugly-progress-spinner *ngIf=\"isPending()\"></ugly-progress-spinner>\n        <ugly-waves-play-head\n          [colour]=\"'#c33c54'\"\n          [isActive]=\"isActive\"\n        >\n          <ugly-waveform\n            *ngIf=\"isAudioItem(); else notAudio\"\n            [timeline]=\"timeline\"\n            [width]=\"contentWidth\"\n            [audioBuffer]=\"item.audioData\"\n            [onSeek]=\"onSeek\"\n            [colour]=\"'#0868ac'\"\n            [duration]=\"getDuration()\"\n          ></ugly-waveform>\n        </ugly-waves-play-head>\n\n\n        <ugly-waves-play-head\n          #notAudio\n          *ngIf=\"getFeatureShape() as shape\"\n          [ngSwitch]=\"shape\"\n          [colour]=\"'#c33c54'\"\n          [isActive]=\"isActive\"\n        >\n          <ugly-cross-hair-inspector\n            *ngSwitchCase=\"'vector'\"\n            [unit]=\"item.unit\"\n            [isAnimated]=\"isActive\"\n          >\n            <ugly-curve\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [curve]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-curve>\n          </ugly-cross-hair-inspector>\n          <ugly-cross-hair-inspector\n            *ngSwitchCase=\"'tracks'\"\n            [unit]=\"item.unit\"\n            [isAnimated]=\"isActive\"\n          >\n            <ugly-tracks\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [tracks]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-tracks>\n          </ugly-cross-hair-inspector>\n          <ugly-cross-hair-inspector\n            *ngSwitchCase=\"'notes'\"\n            [unit]=\"item.unit\"\n            [isAnimated]=\"isActive\"\n          >\n            <ugly-notes\n              [colour]=\"getNextColour()\"\n              [timeline]=\"timeline\"\n              [width]=\"contentWidth\"\n              [onSeek]=\"onSeek\"\n              [notes]=\"item.collected\"\n              [duration]=\"getDuration()\"\n            ></ugly-notes>\n          </ugly-cross-hair-inspector>\n          <ugly-instants\n            *ngSwitchCase=\"'instants'\"\n            [colour]=\"getNextColour()\"\n            [timeline]=\"timeline\"\n            [width]=\"contentWidth\"\n            [onSeek]=\"onSeek\"\n            [instants]=\"item.collected\"\n            [duration]=\"getDuration()\"\n          ></ugly-instants>\n          <ugly-grid\n            *ngSwitchCase=\"'matrix'\"\n            [timeline]=\"timeline\"\n            [width]=\"contentWidth\"\n            [onSeek]=\"onSeek\"\n            [grid]=\"item.collected\"\n            [duration]=\"getDuration()\"\n          ></ugly-grid>\n\n          <div *ngSwitchDefault>Feature cannot be visualised.</div>\n        </ugly-waves-play-head>\n      </ng-template>\n    </div>\n  </md-card-content>\n</md-card>\n"

/***/ }),

/***/ "evdI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__ = __webpack_require__("ndKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__ = __webpack_require__("UNpC");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tracks_tracks_components__ = __webpack_require__("z27C");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurveComponent; });
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
 * Created by lucas on 30/05/2017.
 */





let CurveComponent = CurveComponent_1 = class CurveComponent {
    renderInspector(range, unit) {
        this.tracksComponent.renderInspector(range, unit);
    }
    get updatePosition() {
        return this.tracksComponent.updatePosition;
    }
    renderScale(range) {
        this.tracksComponent.renderScale(range);
    }
    get range() {
        return this.tracksComponent.range;
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], CurveComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && _a || Object)
], CurveComponent.prototype, "onSeek", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number)
], CurveComponent.prototype, "width", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__["VectorFeature"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__["VectorFeature"]) === "function" && _b || Object)
], CurveComponent.prototype, "curve", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], CurveComponent.prototype, "colour", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number)
], CurveComponent.prototype, "duration", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__tracks_tracks_components__["a" /* TracksComponent */]),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__tracks_tracks_components__["a" /* TracksComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__tracks_tracks_components__["a" /* TracksComponent */]) === "function" && _c || Object)
], CurveComponent.prototype, "tracksComponent", void 0);
CurveComponent = CurveComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
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
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_3__waves_base_component__["e" /* VerticallyBounded */], useExisting: CurveComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_3__waves_base_component__["c" /* VerticalScaleRenderer */], useExisting: CurveComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_3__waves_base_component__["b" /* VerticalValueInspectorRenderer */], useExisting: CurveComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_3__waves_base_component__["a" /* WavesComponent */], useExisting: CurveComponent_1 }
        ]
    })
], CurveComponent);

var CurveComponent_1, _a, _b, _c;
//# sourceMappingURL=curve.component.js.map

/***/ }),

/***/ "furQ":
/***/ (function(module, exports) {

module.exports = "<div\n  #track class=\"track\"\n  (mousedown)=\"seekStart()\"\n  (mouseup)=\"seekEnd($event.clientX)\"></div>\n"

/***/ }),

/***/ "iHFK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], ProgressSpinnerComponent.prototype, "isVisible", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], ProgressSpinnerComponent.prototype, "isDeterminate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ProgressSpinnerComponent.prototype, "progress", null);
ProgressSpinnerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
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

/***/ }),

/***/ "ig0+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__ = __webpack_require__("ndKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WavesJunk__ = __webpack_require__("+TQ2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_client_stubs_WebWorkerStreamingClient__ = __webpack_require__("4AhG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_piper_client_stubs_WebWorkerStreamingClient___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_piper_client_stubs_WebWorkerStreamingClient__);
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
 * Created by lucast on 26/05/2017.
 */





const trackIdGenerator = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_piper_client_stubs_WebWorkerStreamingClient__["countingIdProvider"])(0);
// has to be an abstract class vs as interface for Angular's DI
class VerticallyBounded {
}
/* harmony export (immutable) */ __webpack_exports__["e"] = VerticallyBounded;

class VerticalScaleRenderer extends VerticallyBounded {
}
/* harmony export (immutable) */ __webpack_exports__["c"] = VerticalScaleRenderer;

class VerticalValueInspectorRenderer extends VerticalScaleRenderer {
}
/* harmony export (immutable) */ __webpack_exports__["b"] = VerticalValueInspectorRenderer;

class WavesComponent {
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__WavesJunk__["a" /* attachTouchHandlerBodges */])(track, this.timeline);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = WavesComponent;

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* ViewChild */])('track'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a || Object)
], WavesComponent.prototype, "trackContainer", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], WavesComponent.prototype, "width", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], WavesComponent.prototype, "timeline", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && _b || Object)
], WavesComponent.prototype, "onSeek", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", String)
], WavesComponent.prototype, "colour", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number)
], WavesComponent.prototype, "duration", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], WavesComponent.prototype, "feature", null);
class VerticallyBoundedWavesComponent extends WavesComponent {
    renderScale(range) {
        this.addLayer(new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.ScaleLayer({
            tickColor: this.colour,
            textColor: this.colour,
            height: this.height,
            yDomain: range
        }));
    }
}
/* unused harmony export VerticallyBoundedWavesComponent */

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
/* harmony export (immutable) */ __webpack_exports__["d"] = InspectableVerticallyBoundedComponent;

__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && _c || Object),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && _d || Object])
], InspectableVerticallyBoundedComponent.prototype, "onSeek", null);
var _a, _b, _c, _d;
//# sourceMappingURL=waves-base.component.js.map

/***/ }),

/***/ "jJWp":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__visualisations_WavesJunk__ = __webpack_require__("+TQ2");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__ = __webpack_require__("ndKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__visualisations_FeatureUtilities__ = __webpack_require__("7PMI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_render_loop_render_loop_service__ = __webpack_require__("LoPv");
/* unused harmony export isItem */
/* unused harmony export isPendingRootAudioItem */
/* harmony export (immutable) */ __webpack_exports__["c"] = isRootAudioItem;
/* unused harmony export isPendingAnalysisItem */
/* unused harmony export isAnalysisItem */
/* harmony export (immutable) */ __webpack_exports__["b"] = getRootUri;
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





function isItem(item) {
    return item.id != null && item.hasSharedTimeline != null;
}
function isPendingRootAudioItem(item) {
    return isItem(item) && typeof item.uri === 'string';
}
function isRootAudioItem(item) {
    return item && isPendingRootAudioItem(item) &&
        item.audioData instanceof AudioBuffer;
}
function isPendingAnalysisItem(item) {
    const downcast = item;
    return isRootAudioItem(downcast.parent)
        && typeof downcast.extractorKey === 'string';
}
function isAnalysisItem(item) {
    const downcast = item;
    return isPendingAnalysisItem(item) &&
        downcast.shape != null &&
        downcast.collected != null;
}
// these should probably be actual concrete types with their own getUri methods
function getRootUri(item) {
    if (isPendingRootAudioItem(item)) {
        return item.uri;
    }
    if (isPendingAnalysisItem(item)) {
        return item.parent.uri;
    }
    throw new Error('Invalid item: No URI property set.');
}
let AnalysisItemComponent = class AnalysisItemComponent {
    constructor(renderLoop) {
        this.renderLoop = renderLoop;
        this.hasProgressOnInit = false;
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
        return this.item && isRootAudioItem(this.item);
    }
    isPending() {
        return this.item &&
            !isRootAudioItem(this.item) && !isAnalysisItem(this.item) &&
            (isPendingAnalysisItem(this.item) || isPendingRootAudioItem(this.item));
    }
    getFeatureShape() {
        return !isPendingRootAudioItem(this.item) &&
            isAnalysisItem(this.item) ? this.item.shape : null;
    }
    getDuration() {
        if (isRootAudioItem(this.item)) {
            return this.item.audioData.duration;
        }
        if (isAnalysisItem(this.item)) {
            return this.item.parent.audioData.duration;
        }
    }
    getNextColour() {
        return __WEBPACK_IMPORTED_MODULE_3__visualisations_FeatureUtilities__["c" /* defaultColourGenerator */].next().value;
    }
    ngOnDestroy() {
        this.removeAnimation();
    }
    resetRemoveAnimation() {
        if (this.removeAnimation) {
            this.removeAnimation();
        }
        const createPagingTask = () => {
            const pagingMapper = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__visualisations_WavesJunk__["b" /* naivePagingMapper */])(this.timeline);
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], AnalysisItemComponent.prototype, "timeline", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], AnalysisItemComponent.prototype, "isActive", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], AnalysisItemComponent.prototype, "item", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Number)
], AnalysisItemComponent.prototype, "contentWidth", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__["OnSeekHandler"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__playhead_PlayHeadHelpers__["OnSeekHandler"]) === "function" && _a || Object)
], AnalysisItemComponent.prototype, "onSeek", void 0);
AnalysisItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-analysis-item',
        template: __webpack_require__("cqUy"),
        styles: [__webpack_require__("c1nP")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_render_loop_render_loop_service__["a" /* RenderLoopService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_render_loop_render_loop_service__["a" /* RenderLoopService */]) === "function" && _b || Object])
], AnalysisItemComponent);

var _a, _b;
//# sourceMappingURL=analysis-item.component.js.map

/***/ }),

/***/ "kETe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__ = __webpack_require__("vATj");
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
PlaybackControlComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-playback-control',
        template: __webpack_require__("nKj7"),
        styles: [__webpack_require__("jJWp")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_audio_player_audio_player_service__["a" /* AudioPlayerService */]) === "function" && _a || Object])
], PlaybackControlComponent);

var _a;
//# sourceMappingURL=playback-control.component.js.map

/***/ }),

/***/ "kZql":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const environment = {
    production: true
};
/* harmony export (immutable) */ __webpack_exports__["a"] = environment;

//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "lZe/":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".break{margin-bottom:32px}.feed{width:100%;overflow-x:hidden}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "mq3k":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piper_HigherLevelUtilities__ = __webpack_require__("UNpC");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_piper_HigherLevelUtilities___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_piper_HigherLevelUtilities__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__spectrogram_ColourMap__ = __webpack_require__("IAkt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__spectrogram_MatrixUtils__ = __webpack_require__("Fj30");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridComponent; });
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
 * Created by lucast on 31/05/2017.
 */






let GridComponent = GridComponent_1 = class GridComponent extends __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["a" /* WavesComponent */] {
    set grid(grid) {
        this.feature = grid;
    }
    get featureLayers() {
        const startTime = this.feature.startTime; // !!! + make use of
        const stepDuration = this.feature.stepDuration;
        const matrixData = this.feature.data;
        if (matrixData.length === 0) {
            return [];
        }
        const targetValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__spectrogram_MatrixUtils__["a" /* estimatePercentile */])(matrixData, 95);
        const gain = (targetValue > 0.0 ? (1.0 / targetValue) : 1.0);
        const matrixEntity = new __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.utils.PrefilledMatrixEntity(matrixData, 0, // startTime
        stepDuration);
        return [
            new __WEBPACK_IMPORTED_MODULE_2_waves_ui_piper___default.a.helpers.MatrixLayer(matrixEntity, {
                gain: gain,
                height: this.height,
                normalise: 'none',
                mapper: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__spectrogram_ColourMap__["a" /* iceMapper */])()
            })
        ];
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_piper_HigherLevelUtilities__["MatrixFeature"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_piper_HigherLevelUtilities__["MatrixFeature"]) === "function" && _a || Object),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_piper_HigherLevelUtilities__["MatrixFeature"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_piper_HigherLevelUtilities__["MatrixFeature"]) === "function" && _b || Object])
], GridComponent.prototype, "grid", null);
GridComponent = GridComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_3" /* Component */])({
        selector: 'ugly-grid',
        template: __webpack_require__("furQ"),
        styles: [__webpack_require__("xWq0")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["a" /* WavesComponent */], useExisting: GridComponent_1 }
        ]
    })
], GridComponent);

var GridComponent_1, _a, _b;
//# sourceMappingURL=grid.component.js.map

/***/ }),

/***/ "nKj7":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"emitFastRewindStart()\">\n  <md-icon>skip_previous</md-icon>\n</button>\n<button md-icon-button (click)=\"emitPlayPause()\">\n  <md-icon>\n    <ng-template [ngIf]=\"isPlaying()\">pause</ng-template>\n    <ng-template [ngIf]=\"!isPlaying()\">play_arrow</ng-template>\n  </md-icon>\n</button>\n"

/***/ }),

/***/ "ndKj":
/***/ (function(module, exports) {

//# sourceMappingURL=PlayHeadHelpers.js.map

/***/ }),

/***/ "okgc":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".ugly-toolbar-filler{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}md-sidenav-container{height:100%;width:100%;position:absolute}md-sidenav{text-align:center}.ugly-container{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.ugly-header{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}.ugly-content{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto;position:relative}.ugly-footer{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "pcIR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("EEr4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ThrowingMediaRecorder;

let AudioRecorderService = class AudioRecorderService {
    constructor(requestProvider, recorderImpl, ngZone) {
        this.ngZone = ngZone;
        this.requestProvider = requestProvider;
        this.recorderImpl = recorderImpl;
        this.recordingStateChange = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.recordingStateChange$ = this.recordingStateChange.asObservable();
        this.newRecording = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.newRecording$ = this.newRecording.asObservable();
        this.isRecording = false;
        this.chunks = [];
    }
    getRecorderInstance() {
        return this.requestProvider().then(stream => {
            const recorder = new this.recorderImpl(stream);
            recorder.ondataavailable = e => this.chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(this.chunks, { 'type': recorder.mimeType });
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
                console.warn(e); // TODO emit an error message for display?
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
AudioRecorderService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])('AudioInputProvider')),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])('MediaRecorderFactory')),
    __metadata("design:paramtypes", [Function, Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */]) === "function" && _a || Object])
], AudioRecorderService);

var _a;
//# sourceMappingURL=audio-recorder.service.js.map

/***/ }),

/***/ "t89E":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "input{display:none}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "tfge":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
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
        this.extractors = [];
        this.requestOutput = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.isDisabled = true;
        this.populateExtractors = available => {
            this.extractors = available.available.reduce((acc, staticData) => {
                const name = staticData.basic.name;
                const outputs = staticData.basicOutputInfo.map(output => {
                    const combinedKey = `${staticData.key}:${output.identifier}`;
                    return {
                        extractorKey: staticData.key,
                        combinedKey: combinedKey,
                        name: output.name,
                        outputId: output.identifier
                    };
                });
                acc.push({ name, outputs });
                return acc;
            }, []);
        };
    }
    set disabled(isDisabled) {
        this.isDisabled = isDisabled;
    }
    get disabled() {
        return this.isDisabled;
    }
    getFirstSelectedItemOrEmpty(select) {
        const selected = select.selected;
        if (selected) {
            return selected instanceof Array ? selected[0].value : selected.value;
        }
        return '';
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
        if (info) {
            this.requestOutput.emit(info);
        }
    }
    load() {
        this.piperService.updateAvailableLibraries();
    }
    ngOnDestroy() {
        this.librariesUpdatedSubscription.unsubscribe();
    }
};
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], FeatureExtractionMenuComponent.prototype, "disabled", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Function)
], FeatureExtractionMenuComponent.prototype, "onRequestOutput", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], FeatureExtractionMenuComponent.prototype, "requestOutput", void 0);
FeatureExtractionMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* Component */])({
        selector: 'ugly-feature-extraction-menu',
        template: __webpack_require__("W1+o"),
        styles: [__webpack_require__("1RzP")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _b || Object])
], FeatureExtractionMenuComponent);

var _a, _b;
//# sourceMappingURL=feature-extraction-menu.component.js.map

/***/ }),

/***/ "vATj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("EEr4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("MQMf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__);
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
    loadAudio(resource) {
        if (this.currentObjectUrl) {
            this.resourceManager.revokeUrlToResource(this.currentObjectUrl);
        }
        const url = this.resourceManager.createUrlToResource(resource);
        this.currentObjectUrl = url;
        this.audioElement.pause();
        this.audioElement.src = url;
        this.audioElement.load();
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
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])(HTMLAudioElement)),
    __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])('AudioContext')),
    __param(2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])('ResourceReader')),
    __param(3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Inject */])('UrlResourceLifetimeManager')),
    __metadata("design:paramtypes", [Object, Object, Function, Object])
], AudioPlayerService);

//# sourceMappingURL=audio-player.service.js.map

/***/ }),

/***/ "vB4/":
/***/ (function(module, exports) {

module.exports = "<div class=\"feed\">\n  <ng-template ngFor let-item [ngForOf]=\"analyses\">\n    <div [class.break]=\"isAudioItem(item)\">\n      <ugly-analysis-item\n        [timeline]=\"getOrCreateTimeline(item)\"\n        [isActive]=\"isActiveItem(item)\"\n        [item]=\"item\"\n        [contentWidth]=\"width\"\n        [onSeek]=\"getOnSeekForItem(item)\"\n      ></ugly-analysis-item>\n    </div>\n  </ng-template>\n</div>\n"

/***/ }),

/***/ "x35b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_polyfills__ = __webpack_require__("XS25");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__ = __webpack_require__("O61y");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__("Iksp");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("kZql");





if (__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "xWq0":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".track{height:100%;width:100%}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "z27C":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__waves_base_component__ = __webpack_require__("ig0+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("3j3K");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__ = __webpack_require__("UNpC");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__ = __webpack_require__("vP4N");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_waves_ui_piper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FeatureUtilities__ = __webpack_require__("7PMI");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TracksComponent; });
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
 * Created by lucas on 30/05/2017.
 */





let TracksComponent = TracksComponent_1 = class TracksComponent extends __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["d" /* InspectableVerticallyBoundedComponent */] {
    set tracks(input) {
        this.feature = input;
    }
    get range() {
        return this.currentState && this.currentState.data.length > 0 ?
            this.currentState.yDomain : null;
    }
    get featureLayers() {
        this.currentState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__FeatureUtilities__["b" /* generatePlotData */])(this.feature);
        return this.currentState.data.map(feature => new __WEBPACK_IMPORTED_MODULE_3_waves_ui_piper___default.a.helpers.LineLayer(feature.points, {
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
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["O" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__["TracksFeature"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__["TracksFeature"]) === "function" && _a || Object),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__["TracksFeature"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_piper_HigherLevelUtilities__["TracksFeature"]) === "function" && _b || Object])
], TracksComponent.prototype, "tracks", null);
TracksComponent = TracksComponent_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_3" /* Component */])({
        selector: 'ugly-tracks',
        template: __webpack_require__("furQ"),
        styles: [__webpack_require__("xWq0")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_1__angular_core__["_7" /* ChangeDetectionStrategy */].OnPush,
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["e" /* VerticallyBounded */], useExisting: TracksComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["c" /* VerticalScaleRenderer */], useExisting: TracksComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["b" /* VerticalValueInspectorRenderer */], useExisting: TracksComponent_1 },
            { provide: __WEBPACK_IMPORTED_MODULE_0__waves_base_component__["a" /* WavesComponent */], useExisting: TracksComponent_1 }
        ],
    })
], TracksComponent);

var TracksComponent_1, _a, _b;
//# sourceMappingURL=tracks.components.js.map

/***/ })

},[0]);