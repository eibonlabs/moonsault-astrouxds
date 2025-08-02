const fsExtra = require('fs-extra'),
    fs = require('fs'),
    path = require('path'),
    srcDirectory = '/src/',
    appsDirectory = `${srcDirectory}apps/`,
    templateDirectory = '/create/Template/';

let done = false;

const writeFile = (dest, asset, data, name, response) => {
    fsExtra.mkdir(dest, function (err) {
        fsExtra.writeFile(`${dest}${asset}`, data, function (err) {
            if (err) {
                const model = {
                    message: `An error occurred when writing the file.`,
                    status: 400
                }
                response.send(model);
            }
            
            if (!err && done === false) {
                done = true;
                const model = {
                    message: `The ${name} component was successfully created!`,
                    status: 200
                }
                response.send(model);
            }
        });
    });
}

const capitalizeFirstLetter = (string) => {
    if (string) {
        return string[0].toUpperCase() + string.slice(1);
    } else {
        return string;
    }
}

const processComponentFiles = (src, dest, name, response) => {
    const assets = [
        'index.js',
        'html.js',
        'css.js'
    ];

    for (let asset of assets) {
        fsExtra.readFile(`${src}${asset}`, function (err, data) {
            if (err) {
                throw err
            } else {
                data = data.toString();
                // replace component name
                data = data.replaceAll('c-_TEMPLATE_', `c-${name.toLowerCase()}`);
                data = data.replaceAll('_TEMPLATE_', capitalizeFirstLetter(name));
                writeFile(dest, asset, data, name, response);
            }
        });
    }
}

const start = (app) => {
    console.log('attempting to start components service');

    app.param('appName', function (request, response, next, value) {
        request.appName = value;
        next();
    });

    app.get(`/create/api/:appName/components/`, (request, response) => {
        const src = `${path.resolve()}${appsDirectory}/${request.appName}/components/`;

        let components = [];

        fsExtra.readdirSync(src).filter((file) => {
            if (fsExtra.statSync(path.join(src, file)).isDirectory()) {
                components.push(file);
            }
        });

        response.send(components);
    });

    app.post(`/create/api/:appName/components`, (request, response) => {
        console.log(request.body.name);

        const name = request.body.name.toString().trim().replaceAll(' ', '');

        const src = `${path.resolve()}${templateDirectory}components/_TEMPLATE_/`;
        const dest = `${path.resolve()}${appsDirectory}${request.appName}/components/${capitalizeFirstLetter(name)}/`;

        if (name !== '') {
            if (!fs.existsSync(dest)) {
                processComponentFiles(src, dest, name, response);
            } else {
                const model = {
                    message: `The ${name} component already exists.`,
                    status: 400
                }
                response.send(model);
            }
        }
    });
};

module.exports = { start };