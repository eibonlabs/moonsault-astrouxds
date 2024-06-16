const fs = require('fs');
const path = require('path');

const esbuild = require('esbuild');

const buildTools = require('./build-tools.js');

// copy favicon to public
buildTools.copy('./src/favicon.png', './public/favicon.png');

// define apps array
let apps = [];

// build the moonsault library and copy to public
const buildAndWatchMoonsaultLibrary = async () => {
    const libContext = await esbuild.context({
        bundle: true,
        minify: true,
        sourcemap: true,
        entryPoints: [`./src/lib/moonsault.js`],
        outfile: `./public/lib/moonsault.js`
    });
    await libContext.watch();
};

const watchMoonsaultIndex = () => {
    buildTools.copy('./src/index.html', './public/index.html');
    fs.watch(`./src/index.html`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/index.html`, `./public/index.html`);
        }
    });
};

const watchMoonsaultAssets = () => {
    buildTools.copy('./src/assets', './public/assets');
    fs.watch(`./src/assets`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/assets/${fileName}`, `./public/assets/${fileName}`);
        }
    });
};

const buildAppsArray = () => {
    fs.readdirSync('./src/apps/').filter((file) => {
        if (fs.statSync(path.join('./src/apps/', file)).isDirectory()) {
            apps.push(file);
        }
        return true;
    });
}

const buildAndWatchMoonsaultApp = async (app) => {
    let context = await esbuild.context({
        bundle: true,
        minify: true,
        sourcemap: true,
        entryPoints: [`./src/apps/${app}/app.js`],
        outfile: `./public/apps/${app}/app.js`
    });

    await context.watch();
}

const watchMoonsaultAppIndex = (app) => {
    buildTools.copy(`./src/apps/${app}/index.html`, `./public/apps/${app}/index.html`);
    fs.watch(`./src/apps/${app}/index.html`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/apps/${app}/index.html`, `./public/apps/${app}/index.html`);
        }
    });
};

const watchMoonsaultAppsAssets = (app) => {
    buildTools.copy(`./src/apps/${app}/assets`, `./public/apps/${app}/assets`);
    fs.watch(`./src/apps/${app}/assets`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/apps/${app}/assets/${fileName}`, `./public/apps/${app}/assets/${fileName}`);
        }
    });
};

const buildAndWatch = () => {
    // build apps array
    buildAppsArray();

    // copy over index
    watchMoonsaultIndex();

    // moonsault assets at framework level
    watchMoonsaultAssets();

    // moonsault library
    buildAndWatchMoonsaultLibrary();

    for (let app of apps) {
        // copy app favicon to public
        buildTools.copy(`./src/apps/${app}/favicon.png`, `./public/apps/${app}/favicon.png`);

        // copy services
        buildTools.copy(`./src/apps/${app}/api`, `./public/apps/${app}/api`);

        // copy app index.html to public
        watchMoonsaultAppIndex(app);

        // watch moonsault app assets
        watchMoonsaultAppsAssets(app);

        // build moonsault app javascript
        buildAndWatchMoonsaultApp(app);
    }

    console.log('Build complete and watching for changes.');
}

buildAndWatch();
