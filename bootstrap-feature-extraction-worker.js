/**
 * Created by lucas on 01/12/2016.
 */
let window = {};
importScripts('inline.0c3c919f95c1030ed82f.bundle.js'); // provides webpackJsonp
const webpackJsonp = window['webpackJsonp'];
importScripts('scripts.3e994b74cf613c3b43f0.bundle.js'); // needs webpackJsonp, hence above - provides RequireJS
importScripts('polyfills.9ec9c9a773e6a7381b94.bundle.js'); // provides the compiled FeatureExtractionWorker

new (require('feature-extraction-worker'))(self, requirejs);
