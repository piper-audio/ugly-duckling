/**
 * Created by lucas on 01/12/2016.
 */
let window = {};
importScripts('inline.7b30793d52c3d3154ed4.bundle.js'); // provides webpackJsonp
const webpackJsonp = window['webpackJsonp'];
importScripts('scripts.3e994b74cf613c3b43f0.bundle.js'); // needs webpackJsonp, hence above - provides RequireJS
importScripts('polyfills.ac1404ee29b9c8c3103f.bundle.js'); // provides the compiled FeatureExtractionWorker

new (require('feature-extraction-worker'))(self, requirejs);
