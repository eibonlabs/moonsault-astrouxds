import { localize } from './localize.js';

/**
 * @description Builds template nodes and appends them to the web component.
 * @function buildTemplateNodes
 * @param template {string} The HTML to inejct into the web component.
 * @param parentElement {HTMLElement} The component to attach the template to.
 */
const buildTemplateNodes = (template, parentElement) => {
    // build template and attach to web component
    const parsedDOM = new DOMParser().parseFromString(`${template}`, 'text/html').querySelectorAll('body > *');

    // parse DOM elements for route updates for electron and localization
    for (let element of parsedDOM) {
        if (moonsault.electron === true) {
            const anchors = element.querySelectorAll('a');
            for (let a of anchors) {
                const href = a.getAttribute('href');
                if (href.indexOf('#/') > -1) {
                    a.setAttribute('href', `index.html${href}`);
                }
            }
        }

        parentElement.appendChild(localize(element));
    }
};

/**
 * @description Builds style nodes and appends them to the <head> element in the document. This is used by the web components to attach styles to the document.
 * @function buildStyleNodes
 * @param style {string} The CSS to inejct into the style tag.
 * @param componentName {string} The component name to use as the id for the style tag.
 */
const buildStyleNodes = (style, componentName) => {
    // append stylesheet to head if it doesn't already exist
    if (!document.querySelector(`#${componentName}-style`)) {
        // create nodes
        let styleNodes = new DOMParser()
            .parseFromString(
                `<style id="${componentName}-style" type="text/css">${style}</style>`,
                'text/html'
            )
            .querySelector('style');
        // append nodes
        document.querySelector('head').prepend(styleNodes);
    }
};

/**
 * @function loadScript
 * @description Creates a script element with the path to the JS library and injects it.
 * @param scriptPath {string} The path of the script to load
 * @param type {string} The type of script to load. module, text/javascript, etc
 */
const loadScript = (scriptPath, type) => {
    if (document.querySelector(`head script[src="${scriptPath}"]`) === null) {
        const component = document.createElement('script');
        component.setAttribute('src', `${scriptPath}`);
        component.setAttribute('type', type);
        document.querySelector('head').appendChild(component);
    }
}

export { buildTemplateNodes, buildStyleNodes, loadScript };