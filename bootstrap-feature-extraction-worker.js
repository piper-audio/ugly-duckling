/**
 * Created by lucas on 01/12/2016.
 */
let window = {};
importScripts('inline.928e2270e066a21e5ace.bundle.js'); // provides webpackJsonp
const webpackJsonp = window['webpackJsonp'];
importScripts('scripts.8848ad4ed57b82b36e10.bundle.js'); // needs webpackJsonp, hence above - provides RequireJS
importScripts('polyfills.af8c36cc057c791425e1.bundle.js'); // provides the compiled FeatureExtractionWorker

new (require('feature-extraction-worker'))(self, requirejs);
