const query = require('./query/query');
const body = require('./body/body');
const simpleicons = require('simple-icons');

const documentation_url = "https://github.com/foo-dogsquared/simplesvg-sprites";

const api_operations = {
    icon_get : (req, res) => {
        const obj = {};
        if (query.isQueryEqTrue(req.query.svg)) {
            if (query.isQueryEqTrue(req.query.all)) {
                for (const icon in simpleicons) obj[icon] = simpleicons[icon].svg;
                res.status(200).json(obj)
            } 
            else if (query.isIconList(req.query.icons)) {
                for (const icon of query.isIconList(req.query.icons)) obj[icon] = simpleicons[icon].svg;
                res.status(200).json(obj)
            } 
            else {
                res.status(400).json({message: `${res.statusCode}: No requested icon(s). Please include at least one.`, documentation: documentation_url});
            }
        }
        else {
            if (query.isQueryEqTrue(req.query.all)) {
                for (const icon in simpleicons) obj[icon] = simpleicons[icon];
                res.status(200).json(obj)
            } 
            else if (query.isIconList(req.query.icons).length > 0) {
                for (const icon of query.isIconList(req.query.icons)) obj[icon] = simpleicons[icon];
                res.status(200).json(obj)
            } 
            else {
                res.status(400).json({message: `${res.statusCode}: Cannot find the icon(s) you we're looking for. Perhaps a mispelling (or just not included in the database).`, documentation: documentation_url});
            }
        }
    },

    compile: function(req, res) {
        if (!req.body.icons) {
            res.status(400).json({message: `${res.statusCode}: No detected "icons" key in the body of the request.`, documentation: documentation_url});
            return 1;
        } else if (body.isIconBody(req.body.icons).length === 0) {
            res.status(404).json({message: `${res.statusCode}: Can't find the icons. Perhaps it's a misspelling or just not included.`, documentation: documentation_url})
            return 1;
        } else {
            const icon_lists = body.isIconBody(req.body.icons).sort();
            console.log(icon_lists.length);
            
            // TODO: send a .zip file with the SVGs when "compile" is false, probably
            // SimpleIcons SVG has a pattern (thankfully) which all SVG does have
            const simple_icons_svg_regex = /(<svg .+>)(<title .+>)(.*)(<\/title>)(<.+ .+\/>)(<\/svg>)/;
            const viewBox = /viewBox="(\d+ \d+ \d+ \d+)"/
            
            let buffer = `<svg xmlns="http://www.w3.org/2000/svg">`;

            // generating the <symbol>s and their appropriate data
            for (const icon of icon_lists) {
                const svg_parts = simple_icons_svg_regex.exec(simpleicons[icon].svg);
                const vBox = viewBox.exec(svg_parts[1]);
                const svg_name = svg_parts[3].replace(/[\s]/g, "_").replace(/_icon$|\W/g, "").toLowerCase();
                const svg_path = svg_parts[5];
                buffer += `\n\t<symbol id="${svg_name}" viewBox="${vBox[1]}">\n\t\t${svg_path}\n\t</symbol>\n`;
            }
            
            buffer += "\n</svg>";

            res.set({
                "Content-Disposition": 'attachment; filename=\"simplesvg-sprites.svg\"',
                "Content-Type": "image/svg+xml"
            })
            res.write(buffer)
            res.end()
            return 0;
        }
    }
}

module.exports = api_operations;