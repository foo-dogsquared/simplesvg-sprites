"use strict";
const simpleicons = require('simple-icons');

function isIconBody(icon_body) {
    let icon_body_array = String(icon_body).split(',');

    const valid_values = icon_body_array.filter(icon => {
        return simpleicons.hasOwnProperty(icon);
    })

    return valid_values; 
}

function isKeyEqTrue(body_key) {
    return (body_key === "true") ? true : false;
}

module.exports = {
    isIconBody,
    isKeyEqTrue
}