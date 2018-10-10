const simple_icons = require('simple-icons');

// filling up the list dynamically(?_?)
const icons_list = Array.from(Object.keys(simple_icons));

icons_list.sort(function (current, next) {
    let _current = current.toLowerCase();
    let _next = next.toLowerCase();

    if (_current > _next) return 1
    else if (_current < _next) return -1
    else return 0;
})

module.exports = icons_list;
