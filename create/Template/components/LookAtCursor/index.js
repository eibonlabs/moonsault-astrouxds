const componentName = 'c-look-at-cursor';

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
        /* example
        <c-look-at-cursor data-parent=""> 
            <c-markdown data-src="HelloWorld.md"></c-markdown>
        </c-look-at-cursor>
        */
        console.info('LookAtCursor Component Connected');

        buildComponent(componentName, html, css, this);

        /* based on the examples shown here: https://www.armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html */

        const thisComponent = this;

        const constraint = 40;

        let parentContainer = thisComponent.parentElement;

        if (thisComponent.getAttribute('data-origin-element') !== null && thisComponent.getAttribute('data-origin-element') !== '') {
            parentContainer = document.querySelector(thisComponent.getAttribute('data-origin-element'));
        }


        const transforms = (x, y, el) => {
            const box = el.getBoundingClientRect();
            const calcX = -(y - box.y - (box.height / 2)) / constraint;
            const calcY = (x - box.x - (box.width / 2)) / constraint;

            return `perspective(200px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
        };

        const transformElement = (el, xyEl) => {
            el.style.transform = transforms(...xyEl);
        }

        // remove transition used when leaving the parent container
        parentContainer.addEventListener('mouseenter', (e) => {
            thisComponent.classList.remove('mouseleave');
        });

        // while movingh the mouse in the parent container, set the 
        parentContainer.addEventListener('mousemove', (e) => {
            const xy = [e.clientX, e.clientY];
            const position = xy.concat([thisComponent]);

            window.requestAnimationFrame(function () {
                transformElement(thisComponent, position);
            });
        });

        parentContainer.addEventListener('mouseleave', (e) => {
            // add a transition class to animate the positioning back to the default
            thisComponent.classList.add('mouseleave');

            // set the transform
            setTimeout(() => {
                thisComponent.style.transform = `perspective(200px) rotateX(0deg) rotateY(0deg)`;
            }, 0);

            // remove the transition class
            setTimeout(() => {
                thisComponent.classList.remove('mouseleave');
            }, 250)
        });
    }
});