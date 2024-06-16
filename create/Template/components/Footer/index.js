const componentName = 'c-footer';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {
    constructor() {
        super();
    }


    // connect component
    connectedCallback() {
        console.info('Footer Component Connected');

        buildComponent(componentName, html, css, this);
    }
});