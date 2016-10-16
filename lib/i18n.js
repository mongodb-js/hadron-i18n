const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yaml = require('node-yaml');

/**
 * The default fallback locale if none is provided.
 */
const DEFAULT = 'en-gb';

/**
 * The yaml extension constant.
 */
const YML = '.yml';

/**
 * Encapsulates i18n behaviour.
 */
class I18n {

  /**
   * Instantiate the i18n object.
   *
   * @param {String} locale - The locale.
   * @param {String} fallback - The fallback locale.
   */
  constructor(locale, fallback) {
    this.locale = locale.toLowerCase();
    this.fallback = (fallback || DEFAULT).toLowerCase();
    this._translations = {};
  }

  /**
   * Load the locale from the directory.
   *
   * @param {String} directory - The directory to load from.
   * @param {Function} done - The callback to execute when finished.
   *
   * @returns {Object} The executed callback.
   */
  load(directory, done) {
    fs.readdir(directory, (error, files) => {
      return this.loadForLocale(this.locale, directory, files, done);
      // If we got here, then try the fallback.
    });
  }

  /**
   * Load the files for the provided locale.
   *
   * @param {String} locale - The locale to load.
   * @param {String} directory - The directory name.
   * @param {Array} files - The files in the directory.
   * @param {Function} done - The callback.
   *
   * @returns {Object} The executed callback.
   */
  loadForLocale(locale, directory, files, done) {
    _.each(files, (f) => {
      if (f.toLowerCase() === `${locale}${YML}`) {
        let file = path.join(directory, f);
        return this.loadYML(file, done);
      }
    });
  }

  /**
   * Loads a single yaml translation file.
   *
   * @param {String} file - The file to load.
   * @param {Function} done - The callback to execute when finished.
   */
  loadYML(file, done) {
    yaml.read(file, (err, data) => {
      _.merge(this._translations, data);
      done();
    });
  }
}

module.exports = I18n;
