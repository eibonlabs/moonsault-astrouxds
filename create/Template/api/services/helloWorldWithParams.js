const start = (app, appName) => {
    console.log('attempting to start hello world with params')
    // for the post, we want to take the request, look for a property called
    // new message in the body of the request, and store that in our model, then
    // send the model back to the UI.
    // in reality, we would be probably be storing the data by writing the model
    // to a file, or a DB.
    app.post(`/apps/${appName}/api/helloWorldWithParams`, (request, response) => {
        console.log(request.body);

        let model = {
            message: request.body.newMessage
        };
        response.send(model);
    });
};

module.exports = { start };