const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const start = (app, port) => {
    const specs = swaggerJsdoc({
        definition: {
            openapi: "3.1.0",
            info: {
                title: "moonsault swagger",
                version: "1.0.0",
                description: "moonsault boilerplate application api",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "Eibon Labs",
                    url: "https://github.com/eibonlabs"
                },
            },
            servers: [
                {
                    url: `http://localhost:${port}`
                },
            ],
        },
        apis: ["./server/services/*.js"]
    });

    app.use(
        "/api/docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );
};

module.exports = { start }