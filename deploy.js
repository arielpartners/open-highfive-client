const fs = require('fs');
const archiver = require('archiver');
const zipArchive = archiver('zip');
const srcPath = 'dist';
const zipFilePath = 'deployment/HighFive-Client.zip';
const output = fs.createWriteStream(zipFilePath);
const callback = function (err) {
    if (err) {
        console.log('Archive operation for ' + zipFilePath + ' failed!', err);
    } else {
        console.log('Archive  ' + zipFilePath + ' created.');
    }
};

output.on('close', function () {
    callback();
});

zipArchive.pipe(output);

zipArchive.bulk([
    {cwd: srcPath, src: ['**/*'], expand: true}
]);

zipArchive.finalize(function (err) {
    if (err) {
        callback(err);
    }
});
