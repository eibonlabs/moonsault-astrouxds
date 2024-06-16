const componentName = 'c-header';

import { buildComponent } from '../../../../lib/moonsault.js';
import { getRouteFromURL } from '../../../../lib/router.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {
    constructor() {
        super();
    }

    setAriaCurrentAttribute(anchor) {
        anchor.addEventListener('click', (e) => {
            this.querySelector('nav a[aria-current="page"]')?.removeAttribute('aria-current');
            e.target.setAttribute('aria-current', 'page');
        });
    }

    // connect component
    connectedCallback() {
        console.info('Header Component Connected');

        buildComponent(componentName, html, css, this);
        const currentRoute = getRouteFromURL();
        const anchors = this.querySelectorAll('nav a');

        this.querySelector(`a[href="${currentRoute}"]`)?.setAttribute('aria-current', 'page');
        this.anchors = this.querySelectorAll('a');
        for (const anchor of this.anchors) {
            this.setAriaCurrentAttribute(anchor);
        }
    }
});