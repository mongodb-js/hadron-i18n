const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yaml = require('node-yaml');

/**
 * The default locale.
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
   */
  constructor() {
    this.translations = {};
  }

  /**
   * Get the current locale.
   *
   * @returns {String} The current locale.
   */
  currentLocale() {
    return this.locale || DEFAULT;
  }

  /**
   * Load all locales from a directory. Assumes all .yml files in the directory
   * are translations.
   *
   * @param {String} directory - The directory to load from.
   * @param {Function} done - The callback to execute when finished.
   */
  load(directory, done) {
    fs.readdir(directory, (rError, files) => {
      files.forEach((f) => {
        if (path.extname(f) === YML) {
          let file = path.join(directory, f);
          let data = yaml.readSync(file);
          let key = path.basename(file, YML).toLowerCase();
          if (this.translations.hasOwnProperty(key)) {
            _.merge(this.translations[key], data);
          } else {
            this.translations[key] = data;
          }
        }
      });
      done();
    });
  }

  /**
   * Set the current locale of the i18n module.
   *
   * @param {String} locale - The new locale.
   */
  setLocale(locale) {
    this.locale = locale.toLowerCase();
  }
}

module.exports = new I18n();
