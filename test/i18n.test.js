const path = require('path');
const expect = require('chai').expect;
const i18n = require('../index');

const LOCALE_DIR = path.join(__dirname, 'locales');

const ADDITIONAL_LOCALES = path.join(LOCALE_DIR, 'additional');

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
      context('when loading new translations', () => {
        before((done) => {
          i18n.load(LOCALE_DIR, done);
        })

        it('loads all the locales in the directory', () => {
          expect(i18n._translations['en-gb'].test.section.hello).to.equal('world');
        });

        it('only loads yml files', () => {
          expect(i18n._translations.hasOwnProperty('test.txt')).to.equal(false);
        });
      });

      context('when loading additional translations', () => {
        before((done) => {
          i18n.load(ADDITIONAL_LOCALES, done);
        })

        it('does not overwrite the original translations', () => {
          expect(i18n._translations['de'].test.section.hello).to.equal('Welt');
        });

        it('adds the additional locales to the translations', () => {
          expect(i18n._translations['de'].test.section.thing).to.equal('Ding');
        });
      });
    });
  });
});
