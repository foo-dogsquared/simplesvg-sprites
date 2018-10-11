const simpleicons = require('simple-icons');

function isIconList(icon_query) {
    let icon_query_array = String(icon_query).split(',');

    const valid_values = icon_query_array.filter(icon => {
        return simpleicons.hasOwnProperty(icon);
    })

    return valid_values; 
}

function isQueryEqTrue(query) {
    return (query === "true") ? true : false;
}

module.exports = {
    isIconList,
    isQueryEqTrue
}