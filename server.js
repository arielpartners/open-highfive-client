"use strict";

let express = require('express'),
    compression = require('compression'),
    proxy = require('express-http-proxy'),
    http = require('http'),
    url = require('url'),
    serveStatic = require('serve-static'),
    path = require('path');

let app = express();

process.argv.forEach(arg => {
    if (arg && arg.indexOf('port=') === 0) {
        port = parseInt(arg.split('=')[1]);
    }
});

app.use('/api', proxy(process.env.HIGHFIVE_API_SERVER || 'http://arielflash-server.azurewebsites.net/', {
    forwardPath: function(req) {
        return `/api${url.parse(req.url).path}`;
    }
}));

app.set('port', process.env.PORT || 8080);
app.use(compression());
app.use(serveStatic('dist'));

let server = http.createServer(app);
server.listen(app.get('port'), () => {
    let host = server.address().address,
        port = server.address().port;

    console.log('Server listening at http://' + host + ':' + port);
});