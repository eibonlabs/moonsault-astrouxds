/**
 * @function generateRandomValue
 * @description Securely generates a random value.
 * @return {int} A securely generated random value.
 */
const generateRandomValue = () => {
    const array = new Uint32Array(1);

    window.crypto.getRandomValues(array);

    const min = 0;
    const max = 4294967294;
    const range = max - min + 1;
    const maxRange = 4294967295;

    if (array[0] >= Math.floor(maxRange / range) * range) {
        return this.generateRandomValue();
    }

    return min + (array[0] % range);
}

export { generateRandomValue };