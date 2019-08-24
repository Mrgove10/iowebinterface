/**
 * Client (reiciever) script
 */
const express = require('express'); // Express
const config = require('../conf.js'); // Configuration file
const exec = require('child_process').exec; // console execution

const app = express(); //create the express app

/**
 * A POST request to this adress will instantiace a shutdown
 */
app.get('/', function (req, res) {
    res.json(
        {
            IOWIInstalled: true
        }
    )
})


/**
 * A POST request to this adress will instantiace a shutdown
 */
app.post('/shutdown', function (req, res) {
    console.info("\n" + getTimeConsole() + "Shutdown requested");
    askShutdown();
})

/**
 * A POST request to this adress will instantiace a reboot
 */
app.post('/reboot', function (req, res) {
    console.info("\n" + getTimeConsole() + "Reboot requested");
    askReboot();
})
/**
 * This will listen to the configured port for any incomming requests
 */
app.listen(config.clientReceivePort, () => console.log(`Example app listening on port ${config.clientReceivePort}!`))

/**
 * Ask a shutdown from the client
 */
function askShutdown() {
    console.warn(getTimeConsole() + "Shutting down in 10 seconds")
    setTimeout(function () {
        exec('shutdown now');
    }, 10000);
}

/**
 * Ask a reboot from the client
 */
function askReboot() {
    console.warn(getTimeConsole() + "Rebooting in 10 seconds")
    setTimeout(function () {
        exec('reboot now');
    }, 10000);
}

/**
 * returns a formated time optimised for the console
 */
function getTimeConsole() {
    var time = new Date();
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " | ";
}