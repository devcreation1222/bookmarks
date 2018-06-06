import * as opn from 'opn';
import * as detect from 'detect-port';
import * as axios from 'axios';

process.on('uncaughtException', function (err) {
    let stack = err.stack;
    console.log(`Uncaught exception. ${err}`);
});

import server from './server';
import config from './config';

async function start() {
    let isAppRunning = false;
    let appUrl = `http://localhost:${config.port}`;

    let freePort = await detect(config.port);

    //port is busy
    if (freePort !== config.port) {
        isAppRunning = await checkAppIsRunning(appUrl);

        if (!isAppRunning) {
            console.log(`Port ${config.port} is busy. Please, change port in config file.`);
            return;
        }
    }

    if (!isAppRunning) {
        await server.start(config.port);
    }

    console.log(`${config.appID} is running on port ${config.port}!`);

    try {
        opn('', {app: [getChromeAppName(), `--app=${appUrl}`]});
    } catch (err) {
        try {
            opn(appUrl);
        } catch(err) {
            console.log('Cannot open application.');
            console.log(err);
        }
    }
}

async function checkAppIsRunning(appUrl) {
    try {
        let response = await axios.get(`${appUrl}/info`);
        let appInfo = response.data;

        if (appInfo && appInfo.data) {
            return appInfo.data.app === config.appID;
        }
    } catch (err) {
        return false;
    }
}

function getChromeAppName() {
    switch (process.platform) {
        case 'darwin':
            return 'google chrome';
        case 'linux':
            return 'google-chrome';
        default:
            return 'chrome';
    }
}

start();