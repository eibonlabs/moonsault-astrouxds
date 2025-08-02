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
                    message: `The ${name} page was successfully created!`,
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

const processPageFiles = (src, dest, name, response) => {
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
                data = data.replaceAll('p-_TEMPLATE_', `p-${name.toLowerCase()}`);
                data = data.replaceAll('_TEMPLATE_', capitalizeFirstLetter(name));
                writeFile(dest, asset, data, name, response);
            }
        });
    }
}

const addRoute = (src, dest, name, request, response) => {
    console.log('UPDATING ROUTE')
    fsExtra.readFile(`${src}`, function (err, data) {
        if (err) {
            console.log('ERROR WITH READING ROUTE FILE');
            throw err
        } else {
            data = data.toString();
            const importInjectionPoint = data.lastIndexOf('.js');
            const importString = `import './pages/${name}/index`;

            // add import
            data = data.slice(0, importInjectionPoint) + `.js';\n${importString}` + data.slice(importInjectionPoint);

            // add route
            const routeInjectionPoint = data.lastIndexOf("'");
            const routeString = `'#/${name.toLowerCase()}': 'p-${name.toLowerCase()}`;
            data = data.slice(0, routeInjectionPoint + 1) + `,\n    ${routeString}` + data.slice(routeInjectionPoint);

            writeFile(`${path.resolve()}${appsDirectory}${request.appName}/`, `routes.js`, data, name, response);
            console.log(data);
        }
    });
};

const start = (app) => {
    console.log('attempting to start pages service');

    app.param('appName', function (request, response, next, value) {
        request.appName = value;
        next();
    });

    // set up endpoints for each app to list out app pages

    app.get(`/create/api/:appName/pages/`, (request, response) => {
        const src = `${path.resolve()}${appsDirectory}/${request.appName}/pages/`;

        let pages = [];

        fsExtra.readdirSync(src).filter((file) => {
            if (fsExtra.statSync(path.join(src, file)).isDirectory()) {
                pages.push(file);
            }
        });

        response.send(pages);
    });

    app.post(`/create/api/:appName/pages`, (request, response) => {
        console.log(request.body.name);

        const name = request.body.name.toString().trim().replaceAll(' ', '');

        const src = `${path.resolve()}${templateDirectory}pages/_TEMPLATE_/`;
        const dest = `${path.resolve()}${appsDirectory}${request.appName}/pages/${capitalizeFirstLetter(name)}/`;

        if (name !== '') {
            if (!fs.existsSync(dest)) {
                processPageFiles(src, dest, name, response);
                addRoute(`${path.resolve()}${appsDirectory}${request.appName}/routes.js`, `${path.resolve()}${appsDirectory}${request.appName}/routes.js`, name, request, response);
            } else {
                const model = {
                    message: `The ${name} page already exists.`,
                    status: 400
                }
                response.send(model);
            }
        }
    });
};

module.exports = { start };