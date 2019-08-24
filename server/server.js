/**
 * Server (sender) script
 */
const wol = require('wake_on_lan'); // Wake On Lan library
const express = require('express'); // Express
const config = require('../conf.js'); // Configuration file
const request = require('request'); // Request library
const path = require('path'); // Path library
const pjson = require('../package.json'); // Package.json reference

const app = express(); //create the express app

/**
 * Main page of the server
 */
app.get('/', function (req, res) {
    if (config.activateWebPage) {
        console.info(getTimeConsole() + "Welcome to IO Web interface")
        res.sendFile(path.join(__dirname + "/index.html"));
    } else {
        res.send("");
    }
});

/**
 * A POST request to this adress will instantiace a wake up of the client
 */
app.post('/start', function (req, res) {
    console.info("\n" + getTimeConsole() + "Wake requested");
    wakeUp();
});

/**
 * A POST request to this adress will instantiace a shut down of the client
 */
app.post('/shutdown', function (req, res) {
    console.info("\n" + getTimeConsole() + "Shutdown requested");
    shutDown();
});

/**
 * A POST request to this adress will instantiace a restart of the client
 */
app.post('/reboot', function (req, res) {
    console.info("\n" + getTimeConsole() + "Reboot requested");
    reBoot();
});

/**
 * This will listen to the configured port for any incomming requests
 */
app.listen(config.serverPort, () => console.log(getTimeConsole() + `IO Web Interface is acceessible on localhost:${config.serverPort}!`))

/**
 * This will actuvate a Wake On Lan request to the client 
 */
function wakeUp() {
    wol.wake(config.clientMac, {
        address: config.broadcast, // This is for WOL emmited from Windows machines to work correctly it is normaly not needed on linux. see https://www.npmjs.com/package/wake_on_lan
        num_packets: config.numberPackets,// Number of packets to send
        interval: config.interval, // Interval between each packet
        port: config.port // WOL port 
    }, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.info(getTimeConsole() + "Wake up successfully sent to " + config.clientIP + " (" + config.clientMac + ")");
        }
    });
}

/**
 * This will call the "/shutdown" url on the client 
 */
function shutDown() {
    if (verrifyInstalled()) {
        request.post("http://" + config.clientIP + ":" + config.clientReceivePort + "/shutdown", (error) => {
            if (error) {
                console.error(error)
            }
        },
            console.info(getTimeConsole() + "Shutdown successfully sent to " + config.clientIP + " (" + config.clientMac + ")")
        );
    }
}

/**
 * This will call the "/reboot" url on the client 
 */
function reBoot() {
    if (verrifyInstalled()) {
        request.post("http://" + config.clientIP + ":" + config.clientReceivePort + "/reboot", (error) => {
            if (error) {
                console.error(error)
            }
        },
            console.info(getTimeConsole() + "Reboot successfully sent to " + config.clientIP + " (" + config.clientMac + ")")
        );
    }
}

/**
 * Verrifies if the software is correctly installed on the client and that the version is the same on the client and on the server
 */
function verrifyInstalled() {
    //TODO : ADD VERSISION COMPARAISON
    console.info(getTimeConsole() + "Checking for install on " + config.clientIP + " (" + config.clientMac + ")")
    request.get("http://" + config.clientIP + ":" + config.clientReceivePort + "/", (error, res, body) => {
        if (error) {
            console.error(getTimeConsole() + "Error communicating whit the server, stoping !");
            //console.error(error)
        }
        else {
            var parsedbody = JSON.parse(body);

            if (parsedbody.iowinstalled == true) { // Verifies that the client is installed correctly
                if (parsedbody.version == pjson.version) { // Verrifies that the client is up to date
                    console.info(getTimeConsole() + "Installation is detected and up to date, continuing !");
                    return true;
                }
                else {
                    console.info(getTimeConsole() + "Installation is detected but not up to date please update the client, stoping !");
                    return false;
                }
            }
            else {
                console.info(getTimeConsole() + "Installation not detected, stoping !");
                return false;
            }
        }
    });
}

/**
 * returns a formated time optimised for the console
 */
function getTimeConsole() {
    var time = new Date();
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " | ";
}