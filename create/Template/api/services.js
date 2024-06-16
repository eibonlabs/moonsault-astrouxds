const helloWorld = require('./services/helloWorld');
const helloWorldWithParams = require('./services/helloWorldWithParams');
const getContent = require('./services/getContent');

const start = (app, appName) => {
    helloWorld.start(app, appName);
    helloWorldWithParams.start(app, appName);
    getContent.start(app, appName);
    console.log(`started services for ${appName}`);
};

module.exports = { start }