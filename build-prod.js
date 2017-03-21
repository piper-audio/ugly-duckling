/**
 * Created by lucas on 20/03/2017.
 */
'use strict';
const webpack = require('webpack');
const cli = require('@angular/cli');
const fs = require('fs');
webpack.optimize = Object.assign({}, webpack.optimize, {
  UglifyJsPlugin: function () { this.apply = () => {}; }
});

const bundlePrefixes = [
  'main',
  'polyfills',
  'scripts',
  'styles',
  'vendor',
  'inline'
];

const distDir = './dist';
const tmpDir = `${distDir}/gh-pages`;

const getGeneratedBundleNames = () => {
  return new Promise((res, rej) => {
    fs.readdir(distDir, (err, files) => {
      if (err) {
        rej(1);
      } else {
        res(files.filter(file => bundlePrefixes.find(
          prefix => file.startsWith(prefix)
        )));
      }
    })
  });
};

const throwIfBuildReportedError = (result) => {
  return new Promise((res, rej) => {
    if (typeof result === 'object' && result.exitCode != null) {
      if (result.exitCode === 0) {
        res();
      } else {
        rej(result.exitCode);
      }
    } else if(typeof result === 'number') {
      if (result === 0) {
        res();
      } else {
        rej(result);
      }
    } else {
      res();
    }
  });
};

const copyToTmpDir = (bundles) => {
  // TODO should really handle errors for all of this
  // and it could be async but i'm too lazy & it doesn't really matter for this
  if (!fs.existsSync(tmpDir)){
    fs.mkdirSync(tmpDir);
  }
  for (let bundle of bundles) {
    const parts = bundle.split('.');
    const bundlePrefix = parts[0];
    const bundleExtension = parts[parts.length - 1];
    const contents = fs.readFileSync(`${distDir}/${bundle}`);
    fs.writeFileSync(
      `${tmpDir}/${bundlePrefix}.bundle.${bundleExtension}`,
      contents
    );
  }
};

cli({
  cliArgs: ['build', '--prod', '--aot', 'false', '-bh', '/ugly-duckling/'],
  inputStream: process.stdin,
  outputStream: process.stdout
})
.then(throwIfBuildReportedError)
.then(getGeneratedBundleNames)
.then(copyToTmpDir)
.then(process.exit)
.catch(process.exit);
