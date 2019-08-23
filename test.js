//https://www.npmjs.com/package/wake_on_lan
const wol = require('wake_on_lan');
wol.wake('00:1E:4F:36:B3:0B', {
    address: "192.168.1.255",
    num_packets: 5,
    interval: 100,
    port: 7
}, function (error) {
    if (error) {
        console.error(error)
        // handle error
    } else {
        console.info("Wake up successfully sent");
        // done sending packets
    }
});