#!/usr/bin/env node

/**
 * 	env-vars.js: node executable script to run tasks inside Docker container that updates builds based on environment variables
 */

var fs = require('fs');

//imports that needs to be installed in Dockerfile
var async = require('async');
var _=require("lodash");

/**
 * Simple asynchronous task runner
 */

var isDocker;

async.series({
        one: _checkForDocker,
        two: _updateNginxConf,
        //three: _taskTemplate
    },
    function(err) {
        if (err) {
            console.log (err);
        }
    });


/**
 * Task methods
 */

//do a check to see if process is running inside the container
function _checkForDocker (done) {
    fs.readFile('/.dockerinit', function (err) {
        isDocker = err ? false : true;
        done();
    });
}

//update nginx.conf to add proxypass for server path pulled from env vars
function _updateNginxConf (done) {
    var filePath = '/etc/nginx/nginx.conf',
        serverPath = _.get(process.env, 'HIGHFIVE_SERVER_HOST', 'http://beta.highfive-server.azure.com');

    async.waterfall([
        function (_done) {
            fs.readFile(filePath, 'utf8', function (err, data) {
                _done(err, data);
            });
        },
        function (data, _done) {
            var result = data.replace(/\$HIGHFIVE_SERVER_HOST/g, serverPath);
            fs.writeFile(filePath, result, 'utf8', function (err) {
                _done(err);
            });
        }
        ],
        function(err, content) {
            if (err) {
                console.log('env-vars :: task[_updateNginxconf] :: Error - %', err);
            } else {
                console.log('env-vars :: task[_updateNginxconf] :: nginx.conf updated!');
            }
            done(err);
        });
}

//template for adding other tasks
function _taskTemplate (done) {
    //run your task here
    done();
}

