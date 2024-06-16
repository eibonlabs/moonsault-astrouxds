const componentName = 'c-binding-example';

import { buildComponent } from '../../../../lib/moonsault.js';
import { bind } from '../../../../lib/bind.js';

import html from './html.js';
import css from './css.js';

// web component
customElements.define(componentName, class extends HTMLElement {
    constructor() {
        super();
    }

    exampleCallback(value) {
        console.log(`Passed the value to a callback ${value}`);
    };

    #exampleVars = {};

    #model = {
        value: 20,
        value2: 30,
        nestedObject: {
            nestedValue: 40,
            nestedValue2: 50
        }
    };

    increment() {
        this.#model.value += 1;
    };

    decrement() {
        this.#model.value -= 1;
    };

    nestedIncrement() {
        this.#model.nestedObject.nestedValue += 1;
    };

    nestedDecrement() {
        this.#model.nestedObject.nestedValue -= 1;
    };

    // connect component
    connectedCallback() {
        console.info('Binding Example Component Connected');

        buildComponent(componentName, html, css, this);

        bind(this.#exampleVars, "test", 0, this.querySelector(".test"));
        bind(this.#exampleVars, "test2", 0, this.querySelector(".test2"));
        bind(this.#exampleVars, "test3", 0, this.exampleCallback);

        bind(this.#model, "value", this.#model.value, this.querySelector("#modelValue"));

        bind(
            this.#model.nestedObject,
            "nestedValue",
            this.#model.nestedObject.nestedValue,
            this.querySelector("#nestedValue")
        );

        // ste the variable we created in the bind method to some value over time
        // test 1
        setInterval(() => {
            this.#exampleVars.test += 1;
        }, 1000);

        // test 2
        setInterval(() => {
            this.#exampleVars.test2 += 2;
        }, 1500);

        // test 3
        setInterval(() => {
            this.#exampleVars.test3 += 1;
        }, 2500);

        this.querySelector("#increment").addEventListener("click", (e) => {
            this.increment();
        });

        this.querySelector("#decrement").addEventListener("click", (e) => {
            this.decrement();
        });

        this.querySelector("#nestedIncrement").addEventListener("click", (e) => {
            this.nestedIncrement();
        });

        this.querySelector("#nestedDecrement").addEventListener("click", (e) => {
            this.nestedDecrement();
        });
    }
});