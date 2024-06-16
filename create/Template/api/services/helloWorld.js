/**
 * @swagger
 * components:
 *   schemas:
 *     helloWorld:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: The hello world message.
 *       example:
 *         message: 'Hello World!'
 */

/**
 * @swagger
 * tags:
 *   name: helloWorld
 *   description: Returns a message in an object.
 * /api/helloWorld:
 *   get:
 *     summary: Gets a message
 *     tags: [helloWorld]
 *     responses:
 *       200:
 *         description: Server returned the messsage.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/helloWorld'
 *       500:
 *         description: An error occurred.
 */

const start = (app, appName) => {
    console.log('attempting to start hello world')
    // end point
    // this is a super basic end point. when the client makes a request to this
    // url, the server will response
    // this example just returns a model that the client will convert to JSON,
    // but you could put ANY server side code here!
    app.get(`/apps/${appName}/api/helloWorld`, (request, response) => {
        let model = {
            message: 'Hello World!'
        };
        response.send(model);
    });
};

module.exports = { start };