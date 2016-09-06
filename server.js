"use strict";

let express = require('express'),
    compression = require('compression'),
    proxy = require('express-http-proxy'),
    http = require('http'),
    url = require('url'),
    serveStatic = require('serve-static'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    config = require('./config'),
    mock = require('./json-server/mock-redirect');

//use mocks where appropriate, then fall back to real thing if mocks aren't there
if (config.enableMocks) mock(app);

//proxy /api locally to the designated endpoint that should be passed in as an environment variable
if (config.enableProxy) {

    //app.enable('trust proxy');
    app.use('/api', proxy(config.proxyDomain, {
        //preserveHostHdr: true,
        //reqBodyEncoding: 'UTF-8',
        //timeout: 10000,
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
                res._headers['set-cookie'] = JSON.parse(JSON.stringify(res._headers['set-cookie']).replace(config.proxyDomain, localDomain));
            }
            try {
                callback(null, data);
            }
            catch(e) {
                console.log(e);
            }
        },
        forwardPath: (req) => {
            //forward to proxy with same url including the prefix
            return `/api${url.parse(req.url).path}`;
        }
    }));
}

app.set('port', config.hostPort);
app.use(compression());

//primary - resolve from statically compiled files
app.use(serveStatic('dist'));

//secondary - resolve from dynamically compiled files on-demand
try {
    let webpack = require('webpack'),
        webpackConfig = require('./webpack.config'),
        webpackHot = require('webpack-hot-middleware'),
        webpackMiddleware = require('webpack-dev-middleware'),
        compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));

    app.use(webpackHot(compiler));
}
catch(e) {
    console.log('webpack development tools for on-demand compilation disabled');
}

//fallback - resolve from raw source files
app.use(serveStatic('public'));

//404 resolution back to index.html for html5 push state
let request = require('request');
app.get('*', (req, res, next) => {
    if (req.method === 'GET' && req.headers.accept.includes('html')) {
        req.pipe(request(`${req.protocol}://${req.get('host')}/`)).pipe(res);
    }
    else {
        next();
    }
});

let server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});