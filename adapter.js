'use strict';

const Handlebars = require('handlebars');
const Promise = require('bluebird');
const Adapter = require('@frctl/fractal').Adapter;
const Vue = require('vue');
const VueRenderer = require('vue-server-renderer').createRenderer();

class VueAdapter extends Adapter {
  constructor(source, loadPaths) {
    super(null, source);
  }

  render(path, str, context) {
    delete require.cache[path];
    let component = require(path);

    return new Promise(function(resolve, reject) {
      component = Object.assign(component, {}, context);
      VueRenderer.renderToString(component, (err, html) => {
        if (err) throw err;
        resolve(html);
      });
    });
  }

  renderLayout(path, str, context) {
    const template = Handlebars.compile(str);
    return Promise.resolve(template(context));
  }
}

module.exports = function(config) {
  config = config || {}; // not doing anything with config right now!

  return {
    register(source, app) {
      return new VueAdapter(source);
    }
  };
};
