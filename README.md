# fractal-vue-adapter

DO NOT USE THIS.

[WIP] Proof of concept adapter to use Vue components in Fractal (http://fractal.build).

I've basically ported the React experimental adapter to Vue. This extension supports individual Vue instances with context passed as props.


### Install
Install the adapter from GitHub (not ready for publishing to NPM!):

```
npm i --save jameswragg/fractal-vue-adapter
```

Plug into your `fractal.js` config

```javascript
fractal.components.engine('fractal-vue-adapter');
fractal.components.set('ext', '.js');
```

### Example component

A simple button component

```javascript
const Vue = require('vue');

const Button = new Vue({
  props: ['label'],
  template: `<button>{{ label }}</button>`
});

module.exports = Button;
```

Context provided via `button.config.json`

```json
{
  "context": {
    "label": "Boo!"
  }
}
```
