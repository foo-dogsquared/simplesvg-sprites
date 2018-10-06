// import the needed modules
const express = require('express');
const SI_JSON = require('./database');
const simpleicons = require('simple-icons');

// initialize the variables
const port = process.env.PORT || 3000;
const app = express();

function init(public_dir) {
    app
        .use(express.static(public_dir))
        .get('/simple-icons', (req, res) => {
            if (!req.query.icons) {
                res
                    .status(200)
                    .json(SI_JSON);
            } else {
                (simpleicons[req.query.icons]) 
                    ? res.status(200).json(simpleicons[req.query.icons])
                    : res.status(404).send("No such icon exists on the database.\n");
            }
        })
        .listen(port, () => {console.log(`Server opened up at port ${port}.`)})
}

module.exports = {
    port,
    init
}