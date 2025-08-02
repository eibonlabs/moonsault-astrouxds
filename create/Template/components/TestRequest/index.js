/* this is an example of requesting html and css for the component from an external, non-JS source */
const componentName = 'c-testrequest';

import { buildComponent } from '../../../../lib/moonsault.js';

const html = async () => {
    return await fetch(`${moonsault.currentAppPath}components/TestRequest/index.html`).then((response) => {
        return response.text()
    });
};

const css = async () => {
    return await fetch(`${moonsault.currentAppPath}components/TestRequest/index.css`).then((response) => {
        return response.text()
    });
};

// web component
customElements.define(componentName, class extends HTMLElement {

    // connect component
    async connectedCallback() {
        buildComponent(componentName, await html(), await css(), this);
        console.info('TestRequest Component Connected');
    }
});