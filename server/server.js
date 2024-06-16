/*global require __dirname */
const path = require('path');
const fsExtra = require('fs-extra');
const express = require('express');
const swagger = require('./swagger');
const websockets = require('./websockets');

const port = 8080;

const source = 'public';

const serveAppFrom = path.resolve() + '/' + source;
const serveDocsFrom = path.resolve() + '/docs/';

const app = express();

app.use(express.json())

// start up backend services and swagger
try {
  fsExtra.readdirSync(`${serveAppFrom}/apps`).filter((file) => {
    if (fsExtra.statSync(path.join(`${serveAppFrom}/apps`, file)).isDirectory()) {
      const services = require(`${serveAppFrom}/apps/${file}/api/services.js`);
      services.start(app, file);
    }
  });
} catch (err) {
  console.log(`\nYou haven't created an app yet!\n\nRun 'node create' from the command line to create an app.`);
}

websockets.start(app);
swagger.start(app, port);

app.listen(port, () => {
  console.log('');
  console.log('Serving files from:');
  console.log(serveAppFrom);
});

app.use('/', function (req, res, next) {
  console.log(req.url);
  next();
});


// don't return anything from the api directory
app.use(function (req, res, next) {
  if (req.url.indexOf('api') > -1) {
    res.sendStatus(403);
  } else {
    next();
  }
});

app.use(express.static(serveAppFrom, {

  fallthrough: true
}));

app.use(express.static(serveDocsFrom, { fallthrough: true }));

app.get('/', (req, res, next) => {
  next();
});