//Client is the Mode that stays constently in the background
const express = require('express'); //express APi
const config = require('../conf.js');
const exec = require('child_process').exec;

const app = express();

app.post('/shutdown', function (req, res) {
    console.info("\n" + getTimeConsole() + "Shutdown requested");
    askShutdown();
})

app.post('/reboot', function (req, res) {
    console.info("\n" + getTimeConsole() + "Reboot requested");
    askReboot();
})

app.listen(config.clientReceivePort, () => console.log(`Example app listening on port ${config.clientReceivePort}!`))

function askShutdown() {
    console.warn(getTimeConsole() + "Shutting down in 10 seconds")
    setTimeout(function () {
        exec('shutdown now');
    }, 10000);
}

function askReboot() {
    console.warn(getTimeConsole() + "Rebooting in 10 seconds")
    setTimeout(function () {
        exec('reboot now');
    }, 10000);
}

function getTimeConsole() {
    var time = new Date();
    return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " | ";
}