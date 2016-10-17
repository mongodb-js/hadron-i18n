# hadron-i18n [![][travis_img]][travis_url] [![][npm_img]][npm_url]

Extremely simple i18n support for hadron applications.

## Installation

```
npm install --save hadron-i18n
```

## Usage in Electron

In the renderer process entry point, for example `src/renderer/index.js`:

```javascript
const path = require('path');
const electron = require('electron');
const I18n = require('hadron-i18n');

const LOCALES = path.join(__dirname, 'locales');

new I18n(electron.remove.app.getLocale()).load(LOCALES, (error, i18n) => {
  global.t = i18n.t
});
```

An example locale file, must be `.yml` and the filename must be lowercase.
Example `en-us.yml`:

```yml
toolbar:
  home: "Home"
  list: "List"
```

An example React component that uses the translations:

```jsx
const React = require('react');

class ToolbarComponent extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <ol>
          <li>{global.t.toolbar.home}</li>
          <li>{global.t.toolbar.list}</li>
        </ol>
      </div>
    )
  }
}
```


## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/hadron-i18n.svg?style=flat-square
[travis_url]: https://travis-ci.org/mongodb-js/hadron-i18n
[npm_img]: https://img.shields.io/npm/v/hadron-i18n.svg?style=flat-square
[npm_url]: https://www.npmjs.org/package/hadron-i18n
