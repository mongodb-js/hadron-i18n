/**
 * The default locale.
 */
const DEFAULT = 'en-GB';

/**
 * Encapsulates i18n behaviour.
 */
class I18n {

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

  }

  /**
   * Set the current locale of the i18n module.
   *
   * @param {String} locale - The new locale.
   */
  setLocale(locale) {
    this.locale = locale;
  }
}

module.exports = new I18n();
