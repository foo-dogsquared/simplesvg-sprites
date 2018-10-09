const simple_icons = require('simple-icons');

// filling up the list dynamically(?_?)
const icons_list = Array.from(Object.keys(simple_icons));

icons_list.sort(function (current, next) {
    let _current = current.slice(0, 1).toLowerCase();
    let _next = next.slice(0, 1).toLowerCase();

    if (_current === _next) return 0
    else if (_current > _next) return 1
    else return -1;
})

module.exports = icons_list;
