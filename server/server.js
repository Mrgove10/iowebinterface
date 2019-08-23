const wol = require('wake_on_lan');
const express = require('express'); //express APi
const config = require('../conf.js');

const app = express();


app.use(express.static('static'))

app.post('/start', function (req, res) {
    /*ping.sys.probe(host, function (isAlive) {
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    });*/
    console.log("Wake request requested");
    wol.wake(config.clientMacAdress, {
        address: config.broadcastAdress, //this is for windows to work correctly it is normaly not needed on linux. see https://www.npmjs.com/package/wake_on_lan
        num_packets: 5,
        interval: 100,
        port: 7
    }, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.info("Wake up successfully sent to " + config.clientMacAdress);
        }
    });
})

app.post('/stop', function (req, res) {
    console.log("stopping");
})

app.listen(config.serverPort, () => console.log(`Example app listening on port ${config.serverPort}!`))