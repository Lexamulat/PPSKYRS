'use strict';
global.logger = require('../helpers/logger');
const loopback = require('loopback');
const boot = require('loopback-boot');
const cookieParser = require('cookie-parser');
const app = module.exports = loopback();
module.exports = app;


app.use(loopback.token({
  model: app.models.accessToken,
  currentUserLiteral: 'me',
}));

app.middleware('session:before', cookieParser('yourSecretKeyForCookies'));

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

const bootOptions = {
  appRootDir: __dirname,
  bootScripts: [
    './boot/database-migration-mysql',
    './boot/responseFormatterHook',
    './boot/role-creator',
    './boot/create-test-users',
  ],
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, bootOptions, function (err) {
  if (err) {
    throw err;
  }

  // start the server if `$ node server.js`
  if (require.main === module) {
    const httpServer = app.start();
  }

});
