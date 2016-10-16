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
 * The system call to scan directories.
 */
const SCANDIR = 'scandir';

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
    this.localeFile = `${this.locale}${YML}`;
    this.fallbackFile = `${this.fallback}${YML}`;
    this.t = {};
  }

  /**
   * Load the locale from the directory.
   *
   * @param {String} directory - The directory to load from.
   * @param {Function} done - The callback to execute when finished.
   */
  load(directory, done) {
    this.loadYML(directory, this.localeFile, done);
  }

  /**
   * Loads a single yaml translation file.
   *
   * @param {String} directory - The locales directory.
   * @param {String} file - The file to load.
   * @param {Function} done - The callback to execute when finished.
   *
   * @returns {Object} The executed callback.
   */
  loadYML(directory, file, done) {
    const f = path.join(directory, file);
    yaml.read(f, (error, data) => {
      if (error) {
        if (error.syscall === SCANDIR) {
          return done();
        } else if (error.message.includes(this.fallbackFile)) {
          return done(error);
        } else {
          return this.loadYML(directory, this.fallbackFile, done);
        }
      }
      _.merge(this.t, data);
      return done();
    });
  }
}

module.exports = I18n;
