const componentName = 'c-markdown';

import { buildComponent } from '../../../../lib/moonsault.js';
import { marked } from './marked.esm.js';
import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {
    constructor() {
        super();
    }

    async getMarkdownFile(src) {
        await fetch(src).then(response => {
            if (!response.ok) {
                throw new Error("Network response was not OK");
            } else {
                response.text().then(markdown => {
                    this.innerHTML = marked(markdown);
                });
            }
        });
    }

    // connect component
    connectedCallback() {
        console.info('MarkDown Component Connected');

        buildComponent(componentName, html, css, this);

        if (this.getAttribute('data-src').indexOf('http') === -1) {
            const src = `${moonsault.currentAppPath}assets/content/${this.getAttribute('data-src')}`;
            this.getMarkdownFile(src);
        } else {
            const src = this.getAttribute('data-src');
            this.getMarkdownFile(src);
        }
    }
});