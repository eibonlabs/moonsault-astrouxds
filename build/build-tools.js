const fs = require('fs');
const path = require('path');

const copy = (src, dest) => {
    console.log(`Copying from ${src} to ${dest}`);
    
    fs.cp(src, dest, {
        recursive: true
    }, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = { copy };