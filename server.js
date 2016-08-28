"use strict";

let express = require('express'),
    compression = require('compression'),
    proxy = require('express-http-proxy'),
    http = require('http'),
    url = require('url'),
    serveStatic = require('serve-static'),
    path = require('path'),
    app = express(),
    mock = require('./json-server/mock-redirect'),
    packageJson = require('./package.json'),
    proxyDomain = process.env.HIGHFIVE_API_SERVER || packageJson.config.serverEndpoint;

//use mocks where appropriate, then fall back to real thing if mocks aren't there
mock(app);

//proxy /api locally to the designated endpoint that should be passed in as an environment variable
app.use('/api', proxy(proxyDomain, {
    decorateRequest: (proxyReq, originalReq) => {
        //FIXME: if we allow gzip compress, IIS in Azure sitting in front of Node is blowing up on a 502
        //I think this needs a fix to web.config to handle this, may need a web.config here to override
        delete proxyReq.headers['accept-encoding'];
        return proxyReq;
    },
    intercept: (rsp, data, req, res, callback) => {
        if (res._headers['set-cookie']) {
            //fix any set cookie headers specific to the proxied domain back to the local domain
            let localDomain = req.headers.host.substr(0, req.headers.host.indexOf(':') || req.headers.length);
            res._headers['set-cookie'] = JSON.parse(JSON.stringify(res._headers['set-cookie']).replace(proxyDomain, localDomain));
        }
        callback(null, data);
    },
    forwardPath: (req) => {
        //forward to proxy with same url including the prefix
        return `/api${url.parse(req.url).path}`;
    }
}));

app.set('port', process.env.PORT || packageJson.config.clientPort);
app.use(compression());
app.use(serveStatic('dist'));
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'dist/index.html'));
});


let server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});