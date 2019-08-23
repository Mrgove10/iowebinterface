const wol = require('wake_on_lan');
const express = require('express'); //express APi
const port = 3000

const app = express();
app.use(express.static('static'))

app.post('/start', function (req, res) {
    wol.wake('00:1E:4F:36:B3:0B', {
        address: "192.168.1.255", //this is for windows to work correctly it is normaly not needed on linux. see https://www.npmjs.com/package/wake_on_lan
        num_packets: 5,
        interval: 100,
        port: 7
    }, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.info("Wake up successfully sent");
        }
    });
})
app.post('/stop', function (req, res) {
    console.log("stpping");
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))