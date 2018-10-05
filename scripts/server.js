const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

function init(html) {
    http
    .createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(fs.readFileSync('./index.html').toString());        
        res.end();
    })
    .listen(port, hostname, () => {
        console.log(`Server opened to http://${hostname}:${port}`)
    })
}


module.exports = {
    hostname,
    port,
    init
}