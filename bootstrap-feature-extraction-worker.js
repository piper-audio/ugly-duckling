/**
 * Created by lucas on 01/12/2016.
 */
let window = {};
importScripts('inline.bundle.js'); // provides webpackJsonp
const webpackJsonp = window['webpackJsonp'];
importScripts('scripts.bundle.js'); // needs webpackJsonp, hence above - provides RequireJS
importScripts('polyfills.bundle.js'); // provides the compiled FeatureExtractionWorker

new (require('feature-extraction-worker'))(self, requirejs);
