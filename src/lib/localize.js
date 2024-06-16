
/**
 * @description Localizes text by looking at the data-localize attribute of an element and then finding a corresponding key in moonsault.localize
 * @function localize
 * @param element {HTMLElement} The element to evaluate
 */
const localize = (element) => {
    const elements = element.querySelectorAll('[data-localize]');

    for (let singleElement of elements) {
        if (moonsault.localization[moonsault.language]) {
            singleElement.textContent = moonsault.localization[moonsault.language][singleElement.getAttribute('data-localize')];
        } else {
            console.error(`Error with localization. Language ${moonsault.language} does not exist.`);
        }
    }

    return element;
};

export { localize };