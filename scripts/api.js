const SI_JSON = require('./database');
const simpleicons = require('simple-icons');

const api_operations = {
    icon_get : (req, res) => {
       if (!req.query.icons) {
           res
               .status(200)
               .json(simpleicons);
       } else {
           let icon_query_array = String(req.query.icons).split(',');
   
           if (icon_query_array.length === 1 && simpleicons[icon_query_array[0]]) {
                res.status(200).json(simpleicons[req.query.icons]);
           }
           else if (icon_query_array.length === 1 && !simpleicons[icon_query_array[0]]) {
                res.status(400).send("Given value cannot be found on the database.\n");
           }
           else {
               const list_of_svgs = {};
   
               for (let item of icon_query_array) {
                    const icon_data = simpleicons[item];
                    if (icon_data) list_of_svgs[item] = icon_data; 
               }

                (Object.keys(list_of_svgs).length > 0) 
                    ? res.status(200).send(list_of_svgs)
                    : res.status(400).send("There is no valid values from the given data.\n");
            }
        }
    }
}

module.exports = api_operations;