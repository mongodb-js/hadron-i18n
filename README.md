# hadron-i18n [![][travis_img]][travis_url] [![][npm_img]][npm_url]

Extremely simple i18n support for hadron applications.

## Installation

```
npm install --save hadron-i18n
```

## Usage

Translations should be in `.yml` with the filenames *all lowercase*. Use
camelcasing of keys for the ability to use dot notation.

```yml
myapp:
  toolbar:
    text: "Testing"
```

```javascript
const I18n = require('hadron-i18n');
new I18n('de', 'en-GB').load('/path/to/my/locales', (error, i18n) => {
  global.t = i18n.t;
});

console.log(global.t.myapp.toolbar.text);
```


## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/hadron-i18n.svg?style=flat-square
[travis_url]: https://travis-ci.org/mongodb-js/hadron-i18n
[npm_img]: https://img.shields.io/npm/v/hadron-i18n.svg?style=flat-square
[npm_url]: https://www.npmjs.org/package/hadron-i18n
