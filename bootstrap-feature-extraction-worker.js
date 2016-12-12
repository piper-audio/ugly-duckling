/**
 * Created by lucas on 01/12/2016.
 */
let window = {};
importScripts('inline.d41d8cd98f00b204e980.bundle.js'); // provides webpackJsonp
const webpackJsonp = window['webpackJsonp'];
importScripts('scripts.3c9bf1600b7e8510b6cf.bundle.js'); // needs webpackJsonp, hence above - provides require

new (require('feature-extraction-worker'))(self);
