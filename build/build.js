const fs = require('fs');
const path = require('path');

const esbuild = require('esbuild');

const buildTools = require('./build-tools.js');
const { clearInterval } = require('timers');

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
    apps = [];
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

const watchMoonsaultAppIndexAndConfig = (app) => {
    
    console.log(`Copying and watching: ${app}/index.html`);
    buildTools.copy(`./src/apps/${app}/index.html`, `./public/apps/${app}/index.html`);
    fs.watch(`./src/apps/${app}/index.html`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/apps/${app}/index.html`, `./public/apps/${app}/index.html`);
        }
    });

    buildTools.copy(`./src/apps/${app}/routes.js`, `./public/apps/${app}/routes.js`);
    fs.watch(`./src/apps/${app}/routes.js`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/apps/${app}/routes.js`, `./public/apps/${app}/routes.js`);
        }
    });

    buildTools.copy(`./src/apps/${app}/localization.js`, `./public/apps/${app}/localization.js`);
    fs.watch(`./src/apps/${app}/localization.js`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/apps/${app}/localization.js`, `./public/apps/${app}/localization.js`);
        }
    });

    buildTools.copy(`./src/apps/${app}/config.js`, `./public/apps/${app}/config.js`);
    fs.watch(`./src/apps/${app}/config.js`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/apps/${app}/config.js`, `./public/apps/${app}/config.js`);
        }
    });
};

const watchMoonsaultAppsAssets = (app) => {
    console.log(`Copying and watching: ${app}/assets/`);
    buildTools.copy(`./src/apps/${app}/assets`, `./public/apps/${app}/assets`);
    fs.watch(`./src/apps/${app}/assets`, { recursive: true }, (eventType, fileName) => {
        if (eventType === 'change') {
            buildTools.copy(`./src/apps/${app}/assets/${fileName}`, `./public/apps/${app}/assets/${fileName}`);
        }
    });
};

const buildAndWatchMoonsaultComponents = (app) => {
    console.log(`Copying and watching: ${app}/components/`);
    fs.readdirSync(`./src/apps/${app}/components`).filter((directory) => {
        if (fs.existsSync(`./src/apps/${app}/components/${directory}/index.html`)) {
            fs.watch(`./src/apps/${app}/components/${directory}/index.html`, { recursive: true }, (eventType, fileName) => {
                if (eventType === 'change') {
                    buildTools.copy(`./src/apps/${app}/components/${directory}/index.html`, `./public/apps/${app}/components/${directory}/index.html`);
                }
            });
        }

        if (fs.existsSync(`./src/apps/${app}/components/${directory}/index.css`)) {
            fs.watch(`./src/apps/${app}/components/${directory}/index.css`, { recursive: true }, (eventType, fileName) => {
                if (eventType === 'change') {
                    buildTools.copy(`./src/apps/${app}/components/${directory}/index.css`, `./public/apps/${app}/components/${directory}/index.css`);
                }
            });
        }
    });
}

const buildAndWatchMoonsaultPages = (app) => {
    console.log(`Copying and watching: ${app}/pages/`);
    fs.readdirSync(`./src/apps/${app}/pages`).filter((directory) => {
        if (fs.existsSync(`./src/apps/${app}/pages/${directory}/index.html`)) {
            fs.watch(`./src/apps/${app}/pages/${directory}/index.html`, { recursive: true }, (eventType, fileName) => {
                if (eventType === 'change') {
                    buildTools.copy(`./src/apps/${app}/pages/${directory}/index.html`, `./public/apps/${app}/pages/${directory}/index.html`);
                }
            });
        }

        if (fs.existsSync(`./src/apps/${app}/pages/${directory}/index.css`)) {
            fs.watch(`./src/apps/${app}/pages/${directory}/index.css`, { recursive: true }, (eventType, fileName) => {
                if (eventType === 'change') {
                    buildTools.copy(`./src/apps/${app}/pages/${directory}/index.css`, `./public/apps/${app}/pages/${directory}/index.css`);
                }
            });
        }
    });
}


const handleApps = (app) => {
    if (app === undefined) {
        for (let app of apps) {
            // copy app favicon to public
            buildTools.copy(`./src/apps/${app}/favicon.png`, `./public/apps/${app}/favicon.png`);

            // copy services
            buildTools.copy(`./src/apps/${app}/api`, `./public/apps/${app}/api`);

            // copy app index.html to public
            watchMoonsaultAppIndexAndConfig(app);

            // watch moonsault app assets
            watchMoonsaultAppsAssets(app);

            // copy moonsault component and page assets (index.html and index.css)
            buildAndWatchMoonsaultComponents(app);
            buildAndWatchMoonsaultPages(app);

            // build moonsault app javascript
            buildAndWatchMoonsaultApp(app);
        }
    } else {
        // copy app favicon to public
        buildTools.copy(`./src/apps/${app}/favicon.png`, `./public/apps/${app}/favicon.png`);

        // copy services
        buildTools.copy(`./src/apps/${app}/api`, `./public/apps/${app}/api`);

        // copy app index.html to public
        watchMoonsaultAppIndexAndConfig(app);

        // watch moonsault app assets
        watchMoonsaultAppsAssets(app);

        // copy moonsault component and page assets (index.html and index.css)
        buildAndWatchMoonsaultComponents(app);
        buildAndWatchMoonsaultPages(app);

        // build moonsault app javascript
        buildAndWatchMoonsaultApp(app);
    }

}
let isChecking = false;
const checkForDone = () => {
    isChecking = true;
    const interval = setInterval(async () => {
        const request = await fetch('http://localhost:8080/create/api/apps/copying');
        const response = await request.json();
        console.log(`Currently copying: ${response}`);
        if (response === false) {
            clearInterval(interval);
            buildAppsArray();
            handleApps(apps[0]);
            console.log(apps);
            console.log('APPS DIRECTORY WRITTEN TO!');
            isChecking = false;
        }
    }, 1000);
}
const buildAndWatch = () => {
    fs.watch(`./src/apps/`, { recursive: true }, (eventType, fileName) => {
        if (isChecking === false) {
            checkForDone();
        }
    });

    // copy over index
    watchMoonsaultIndex();
    
    // build apps array
    buildAppsArray();
    
    // moonsault assets at framework level
    watchMoonsaultAssets();
    
    // moonsault library
    buildAndWatchMoonsaultLibrary();

    handleApps();

    console.log('Build complete and watching for changes.');
}

buildAndWatch();
