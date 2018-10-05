// import the needed modules
const express = require('express');
const fs = require('fs');

// initialize the variables
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

function init() {
    app.use(express.static('public'));
    app.listen(port, () => {
        console.log(`Server opened up at port ${port}.`)
    })
}


module.exports = {
    hostname,
    port,
    init
}