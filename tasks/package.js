/*
    Assume client is build
    Assume server TS is build
    Run webpack in server to produce server bundle
    Create/Clear package folder
    Copy server bundle
    Copy client build to client folder
    Optionally remove map files from client build
    Copy start scripts
    Copy default data
 */

const path = require('path');
const fs = require('fs-extra');

const removeMapFiles = true;

var appDirectory = fs.realpathSync(process.cwd());

const config = {
    paths: {
        package: rootRelative('./package'),
        serverBundle: rootRelative('./server/build/app.js'),
        clientBuild: rootRelative('./client/build')
    }
};

function rootRelative(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

function packageRelative(relativePath) {
    return path.resolve(config.paths.package, relativePath);
}

fs.emptyDirSync(config.paths.package);

fs.copySync(config.paths.serverBundle, packageRelative('app.js'));

fs.copySync(config.paths.clientBuild, packageRelative('./client'));

if (removeMapFiles) {
    let files = fs.walkSync(packageRelative('./client'));
    for (let file of files) {
        if (file.endsWith('.map')) {
            fs.removeSync(file);
        }
    }
}

fs.emptyDirSync(packageRelative('./data/config'));

fs.copySync(rootRelative('./server/data/db.json'), packageRelative('./data/db.json'));

fs.copySync(rootRelative('./server/data/config/settings.json'), packageRelative('./data/config/settings.json'));

fs.copySync(rootRelative('./start_scripts'), packageRelative('./start'));

console.log('Done');