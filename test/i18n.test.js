const path = require('path');
const expect = require('chai').expect;
const I18n = require('../index');

const LOCALES_1 = path.join(__dirname, 'locales_1');
const LOCALES_2 = path.join(__dirname, 'locales_2');

describe('I18n', () => {
  describe('#new', () => {
    context('when a fallback is provided', () => {
      const i18n = new I18n('en-us', 'de');

      it('sets the empty translations', () => {
        expect(i18n.t).to.deep.equal({});
      });

      it('sets the locale', () => {
        expect(i18n.locale).to.equal('en-us');
      });

      it('sets the fallback', () => {
        expect(i18n.fallback).to.equal('de');
      });
    });

    context('when no fallback is provided', () => {
      const i18n = new I18n('en-us');

      it('sets a default fallback', () => {
        expect(i18n.fallback).to.equal('en-gb');
      });
    });
  });

  describe('#load', () => {
    context('when passed a directory', () => {
      context('when the directory exists', () => {
        context('when the locale exists', () => {
          const i18n = new I18n('de');

          context('when loading new translations', () => {
            before((done) => {
              i18n.load(LOCALES_1, done);
            })

            it('loads only the set locale from the directory', () => {
              expect(i18n.t.test.section.hello).to.equal('Welt');
            });
          });

          context('when loading additional translations', () => {
            before((done) => {
              i18n.load(LOCALES_2, done);
            })

            it('does not overwrite the original translations', () => {
              expect(i18n.t.test.section.hello).to.equal('Welt');
            });

            it('merges the additional translations', () => {
              expect(i18n.t.test.section.thing).to.equal('Ding');
            });
          });
        });

        context('when the locale does not exist', () => {
          context('when a fallback locale was provided', () => {
            const i18n = new I18n('es', 'de');

            before((done) => {
              i18n.load(LOCALES_1, done);
            })

            it('loads the fallback translations', () => {
              expect(i18n.t.test.section.hello).to.equal('Welt');
            });
          });

          context('when no fallback locale was provided', () => {
            const i18n = new I18n('es');

            before((done) => {
              i18n.load(LOCALES_1, done);
            })

            it('falls back to the default', () => {
              expect(i18n.t.test.section.hello).to.equal('world');
            });
          });

          context('when no fallback translations exist', () => {
            const i18n = new I18n('es', 'fr');

            it('returns an error', (done) => {
              i18n.load(LOCALES_1, (error) => {
                expect(error.message).to.include('fr.yml');
                done();
              });
            });
          });
        });
      });

      context('when the directory does not exist', () => {
        const i18n = new I18n('es', 'fr');

        before((done) => {
          i18n.load('./does-not-exist', done);
        })

        it('skips the directory', () => {
          expect(i18n.t.test).to.equal(undefined);
        });
      });
    });
  });
});
