// import the needed modules
const api_operations = require('./api');
const express = require('express');
const fs = require('fs');
const UglifyJS = require('uglify-js');
const SI_JSON = require('./database');

// initialize the variables
const port = process.env.PORT || 3000;
const app = express();

function init(public_dir) {
    // preparing the static files to be readily served
    console.log(process.cwd())

    // start the server to listen for requests now
    app
        .use(express.static(public_dir))
        .get('/simple-icons', api_operations.icon_get)
        .get('/database', function(req, res) {res.status(200).json(SI_JSON)})
        .post('/simple-icons', api_operations.icon_get)
        .listen(port, () => {console.log(`Server opened up at port ${port}.`)})
}

function stop(process_code) {
    process.exit(process_code, (code) => {
        console.log(`Server exiting with code ${code}.`);
    });
}

module.exports = {
    port,
    init,
    stop
}