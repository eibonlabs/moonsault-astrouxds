const componentName = 'c-animate-in-view';

import { buildComponent } from '../../../../lib/moonsault.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {
    /* example html
        transitions are defined in the css.js file for this component.
        <c-animate-in-view data-transition="slideInFromLeft" data-reset="true">
            <c-markdown data-src="HelloWorld.md"></c-markdown>
        </c-animate-in-view>
    */

    constructor() {
        super();
    }

    // connect component
    connectedCallback() {
        console.info('AnimateInView Component Connected');

        buildComponent(componentName, html, css, this);

        const thisComponent = this;

        const observerIn = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting === true) {
                thisComponent.classList.add('animate');
            }
        }, { threshold: [0.5] });
        observerIn.observe(thisComponent);

        if (thisComponent.getAttribute('data-reset') === 'true') {
            const observerOut = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting !== true) {
                    thisComponent.classList.remove('animate');
                }
            }, { threshold: [0] });
            observerOut.observe(thisComponent);
        }
    }
});