const apps = require('./services/apps');
const components = require('./services/components');
const pages = require('./services/pages');

const start = (app) => {
    apps.start(app);
    components.start(app);
    pages.start(app);

    console.log(`started services for moonsault create`);
};

module.exports = { start }