/**
 * @description Binds data to an element on screen
 * @function bind
 * @param context {object} The object to bind data to. This could be an existing model, or even the window object
 * @param propName {string} The name of the property on the object we are watching
 * @param initialValue {any} The initial value to set on the model
 * @param elementOrCallback {Object} If an HTML element is passed in, its textContent or value will be set to the current value. If a function is passed in, that function will be called with the current value as a parameter
 */
const bind = (context, propName, initialValue, elementOrCallback) => {
    // create the variable, getter and setter
    Object.defineProperty(context, propName, {
        set(value) {
            context[`_${propName}`] = value;
            if (typeof elementOrCallback === "object") {
                if (
                    // HTML element. set its textContent or value
                    elementOrCallback instanceof HTMLInputElement ||
                    elementOrCallback instanceof HTMLSelectElement ||
                    elementOrCallback instanceof HTMLTextAreaElement
                ) {
                    elementOrCallback.value = context[`_${propName}`];
                } else {
                    elementOrCallback.textContent = context[`_${propName}`];
                }
            } else {
                // callback method. pass in current value
                elementOrCallback(context[`_${propName}`]);
            }
        },
        get() {
            return context[`_${propName}`];
        }
    });

    // set initial value
    context[propName] = initialValue;
};

export { bind };