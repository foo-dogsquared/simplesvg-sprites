const simple_icons = require('simple-icons');

const icons_obj = Object.create(null);

// filling up the list dynamically(?_?)
for (icon in simple_icons) {
    icons_obj[icon] = icon;
}

module.exports = icons_obj;
