// import the needed modules
const express = require('express');
const api_operations = require('./api');

// initialize the variables
const port = process.env.PORT || 3000;
const app = express();

function init(public_dir) {
    app
        .use(express.static(public_dir))
        .get('/simple-icons', api_operations.icon_get)
        .listen(port, () => {console.log(`Server opened up at port ${port}.`)})
}

module.exports = {
    port,
    init
}