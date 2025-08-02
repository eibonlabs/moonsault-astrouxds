const componentName = 'c-prop-update-example';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {

    // the prop we want to watch
    static observedAttributes = [
        'data-current-time'
    ];

    // attributeChangedCallback is called whenever a property watched by observedAttributes
    // is changed.
    attributeChangedCallback(name, oldValue, newValue) {
        // find an element with a class name that matches the prop that has changed.
        // set the value.
        this.querySelector(`.${name}`).textContent = newValue;
    }

    // connect component
    connectedCallback() {
        buildComponent(componentName, html, css, this);
        console.info('Prop Update Example Component Connected');

        const thisComponent = this;

        this.querySelector('.set-data').addEventListener('click', (e) => {
            // set the 'data-current-time' prop to the current time.
            thisComponent.setAttribute('data-current-time', Date.now());
        })
    }
});