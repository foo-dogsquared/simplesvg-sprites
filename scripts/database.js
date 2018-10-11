const simple_icons = require('simple-icons');

// filling up the list dynamically(?_?)
const icons_list = Object.keys(simple_icons);

icons_list.sort(function (current, next) {
    if (current.toLowerCase() > next.toLowerCase()) return 1
    else if (current.toLowerCase() < next.toLowerCase()) return -1
    else return 0;
})

const db = Array.from(icons_list);
const db_reversed = icons_list.reverse();

module.exports = {
    db,
    db_reversed
};
