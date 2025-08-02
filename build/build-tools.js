const fs = require('fs');
const path = require('path');

const copy = (src, dest) => {
    if (fs.existsSync(src)) {
        fs.cp(src, dest, {
            recursive: true
        }, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
};

module.exports = { copy };