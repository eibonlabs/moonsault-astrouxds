const componentName = 'c-hello-world';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {
    constructor() {
        super();
    }

    helloWorld() {
        alert('Hello World!');
        console.log('You called the public API!');
    }

    // connect component
    connectedCallback() {
        console.info('HelloWorld Component Connected');

        buildComponent(componentName, html, css, this);
        this.querySelector('#helloWorldButton').addEventListener('click', (e) => {
            this.helloWorld();
        })
    }
});