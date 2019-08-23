const wol = require('wake_on_lan');
const express = require('express'); //express APi
const config = require('../conf.js');
const request = require('request');
const path = require('path');

const app = express();

/**
 * Main page of the server
 */
app.get('/', function (req, res) {
    console.info(getTimeConsole() + "Welcome to IO Web interface")
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.post('/start', function (req, res) {
    console.info("\n" + getTimeConsole() + "Wake requested");
    wakeUp();
});

app.post('/shutdown', function (req, res) {
    console.info("\n" + getTimeConsole() + "Shutdown requested");
    shutDown();
});

app.post('/reboot', function (req, res) {
    console.info("\n" + getTimeConsole() + "Reboot requested");
    reBoot();
});


app.listen(config.serverPort, () => console.log(getTimeConsole() + `IO Web Interface is acceessible on host:${config.serverPort}!`))

function wakeUp() {
    wol.wake(config.clientMac, {
        address: config.broadcast, //this is for windows to work correctly it is normaly not needed on linux. see https://www.npmjs.com/package/wake_on_lan
        num_packets: 5,//TODO put params here
        interval: 100,
        port: 7
    }, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.info(getTimeConsole() + "Wake up successfully sent to " + config.clientMac);
        }
    });
}

function shutDown() {
    request.post("http://" + config.clientIP + ":" + config.clientReceivePort + "/shutdown", (error) => {
        if (error) {
            console.error(error)
        }
    },
        console.info(getTimeConsole() + "Shutdown successfully sent to " + config.clientMac)
    );
}

function reBoot() {
    request.post("http://" + config.clientIP + ":" + config.clientReceivePort + "/reboot", (error) => {
        if (error) {
            console.error(error)
        }
    },
        console.info(getTimeConsole() + "Reboot successfully sent to " + config.clientMac)
    );
}

function getTimeConsole() {
    var time = new Date();
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " | ";
}