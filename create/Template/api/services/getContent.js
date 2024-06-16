const start = (app, appName) => {
    console.log('attempting to start get content')
    app.get(`/apps/${appName}/api/getContent`, (request, response) => {
        const path = require('path');
        const fs = require('fs');
        //joining path of directory 
        const directoryPath = path.join(__dirname, '../../assets/content/');


        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            let fileList = [];

            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file);
                fileList.push(file);
            });
            response.send(fileList);
        });
    });
};

module.exports = { start };