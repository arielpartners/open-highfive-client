let config = require('../config');

//write a function that takes a request input and returns true if it should be mocked to json server otherwise fall through
//if config.enableProxy is disabled and we hit local api, we will mock everything
const mockMatches = [
    req => req.url.includes('/api/recognitions'),
    req => req.url.includes('/api/metrics'),
    req => req.url.includes('/api/sampleUser'),
    req => req.url.includes('/api/auth')
];

module.exports = function (app) {
    let path = require('path'),
        jsonServer = require('json-server'),
        jsonRouter = jsonServer.router(path.join(__dirname, 'db.json'));

    app.use((req, res, next) => {
        if (req.url.match(/^\/api/) && (!config.enableProxy || mockMatches.find(match => match(req)))) {
            console.log(`redirecting request ${req.url} to /mock${req.url} on mock json server`);
            res.redirect(`/mock${req.url}`);
        }
        else {
            next();
        }
    });

    app.use('/mock/api', jsonServer.defaults());
    app.use('/mock/api', jsonRouter);
};