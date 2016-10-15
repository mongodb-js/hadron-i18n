const path = require('path');
const expect = require('chai').expect;
const i18n = require('../index');

const LOCALE_DIR = path.join(__dirname, 'locales');

describe('I18n', () => {
  describe('#currentLocale', () => {
    context('when the locale is not set', () => {
      it('defaults to en-GB', () => {
        expect(i18n.currentLocale()).to.equal('en-gb');
      });
    });
  });

  describe('#setLocale', () => {
    before(() => {
      i18n.setLocale('en-US');
    });

    it('sets the locale', () => {
      expect(i18n.currentLocale()).to.equal('en-us');
    });
  });

  describe('#load', () => {
    context('when passed a directory', () => {
      before((done) => {
        i18n.load(LOCALE_DIR, done);
      })

      it('loads all the locales in the directory', () => {
        expect(i18n.translations['en-gb'].test.section.hello).to.equal('world');
      });
    });
  });

  describe('#currentTranslations', () => {

  });
});
