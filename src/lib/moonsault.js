
import { startRouter } from './router.js';
import { buildTemplateNodes, buildStyleNodes, loadScript } from './parser.js';
import { generateRandomValue } from './utils.js';

/**
 * @description moonsault object contains referencs to currently loaded components so they can be accessed throughout the system.
 * @param currentApp {string} The app that moonsault is set to load.
 * @param currentAppPath {string} The path of the app that moonsault is set to load.
 * @param language {string} The language key that should be used when localizing data.
 * @param localization {object} A set of key value pairs uses for localization. Split up by language key.
 * @param staticComponents {object} Components loaded by moonsault that are outside of the #page element.
 * @param pageComponents {object} Components that are available in the currently loaded page.
 */
window.moonsault = {
    electron: false,
    config: null,
    currentApp: null,
    currentAppPath: null,
    language: null,
    localization: null,
    staticComponents: {},
    pageComponents: {},
    routes: null
};

/**
 * @description Sets the current language for localization. If no language code is passed in, then use the lang attribute in the html tag.
 * @function setLanguage
 * @param lang {string} The language to use.
 */
const setLanguage = (languageCode) => {
    if (languageCode) {
        moonsault.language = languageCode;
    } else {
        moonsault.language = document.querySelector('html').getAttribute('lang');
    }
}

/**
 * @function setComponentNameSpace
 * @description Stores a web component in memory in a specific location. This method is called by web components from their connectedCallback() method. If an instance of the web component already exists, a unique ID will be defined.
 * @param componentName {string} The name of the web component to set in the namespace
 * @param component {object} The web component to store in memory.
 */
const setComponentNameSpace = (componentName, component) => {
    const uID = componentName + '_' + generateRandomValue();

    // check if component id is empty, and then set
    // the appropriate id
    if (component.id === '') {
        // component does not exist in namespace
        if (moonsault.staticComponents[componentName] === undefined && moonsault.pageComponents[componentName] === undefined) {
            component.id = componentName;
        } else {
            // component does exist. use unique id
            component.id = uID;
        }
    }

    if (component.parentElement.closest('#page') === null) {
        // components outside of the page
        moonsault.staticComponents[component.id] = component;
    } else {
        // components inside of the page
        moonsault.pageComponents[component.id] = component;
    }
}

const buildComponent = (componentName, template, style, component) => {
    buildStyleNodes(style, componentName)
    buildTemplateNodes(template, component);
    setComponentNameSpace(componentName, component);
};

/**
 * @function setLocalization
 * @description sets the localization data for the app to use
 * @param localization {object} object that contains key value pairs of localization data. setup by language.
 */
const setLocalization = (localization) => {
    moonsault.localization = localization;
}

/**
 * @function setCurrentApp
 * @description sets the current application that is being loaded by moonsault
 */
const setCurrentApp = () => {
    moonsault.currentApp = document.querySelector('body').getAttribute('data-app');
};

/**
 * @function setCurrentAppPath
 * @description sets the path of current application that is being loaded by moonsault
 */
const setCurrentAppPath = () => {
    if (window.location.href.indexOf('apps') === -1) {
        moonsault.currentAppPath = `${window.location.href.split('/#/')[0]}/apps/${moonsault.currentApp}/`;
    } else {
        moonsault.currentAppPath = `${window.location.href.split('/#/')[0]}/`;
    }

    if (moonsault.electron === true) {
        moonsault.currentAppPath = 'apps/' + moonsault.currentApp + '/';
    }
};

/**
 * @function setRoutes
 * @description sets the routes for the current application
 */
const setRoutes = (routes) => {
    moonsault.routes = routes;
    startRouter();
};

/**
 * @function setConfig
 * @description sets the config for the current application
 */
const setConfig = (config) => {
    moonsault.config = config;
};


const checkElectron = () => {
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        moonsault.electron = true;
    }
}
/**
 * @function setConfig
 * @description sets up the application
 * @param appSettings {object} - passed in from the application's index.js file. sets the initial configuraitgon file, localization, default template, and routes.
 */
const setupApp = (appSettings) => {

    setConfig(appSettings.config);
    setLocalization(appSettings.localization);
    buildTemplateNodes(appSettings.layout, document.querySelector('body'));
    setRoutes(appSettings.routes);

};

const setAppStyle = () => {
    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('id', moonsault.currentApp);
    style.setAttribute('href', `${moonsault.currentAppPath}assets/css/app.css`);
    document.querySelector('head').appendChild(style);
}

const start = (() => {
    checkElectron();
    if (document.querySelector('body').getAttribute('data-app') !== null) {
        setCurrentApp();
        setCurrentAppPath();
        setLanguage();
        setAppStyle();
        // dynamically load app based on the currentApp value
        loadScript(`${moonsault.currentAppPath}app.js`, 'module');
    } else {
        buildTemplateNodes(`
            <div class="noAppErrorMessage">
                <div class="noAppErrorMessagePanel">
                    <h1>Uh, oh!</h1>
                    <p>It looks like you haven't created an application yet!</p>
                    <ol>
                        <li>In your terminal, run <code>node create</code> to start the moonsault create app.</li>
                        <li>Select <code>1. Create an application</code>, and then press <code>Enter</code></li>
                        <li>Enter a name for your application and press <code>Enter</code>.</li>
                        <li>Select <code>5. Quit</code> and press <code>Enter</code>.</li>
                        <li>In your browser, navigate to <a href="http://localhost:8080">http://localhost:8080</a></li>
                    </ol>
                </div>
            </div>`, document.querySelector('body'));
    }
})();

export {
    setupApp,
    buildComponent,
    setComponentNameSpace,
    generateRandomValue
};