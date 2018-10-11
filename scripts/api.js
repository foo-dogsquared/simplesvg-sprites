const query = require('./query/query');
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
            // if (query.isQueryEqTrue(req.query.all))
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
    }
}

module.exports = api_operations;