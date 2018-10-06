// import the needed modules
const express = require('express');
const fs = require('fs');

// initialize the variables
const port = process.env.PORT || 3000;
const app = express();

function init() {
    app.use(express.static('public'));
    app.listen(port, () => {
        console.log(`Server opened up at port ${port}.`)
    })
}


module.exports = {
    port,
    init
}