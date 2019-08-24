/**
 * MAIN CONFIGURATION FILE
 * The higher the option, the greater the chance you have to modify it
 */
module.exports = {
    /**
     * role can be :
     * server : the sender of the wake on lan resquests
     * client : the receiver of the resquests
     */
    role: "client",
    /**
     * Server (sender) configuration
     */
    activateWebPage: true, //if set to false not web page will show
    serverPort: 1234, //port from where to load the web page

    /**
     * Client (reiciver) configuration
     */
    clientReceivePort: 1235,
    clientIP: "192.168.1.13",
    clientMac: "00:1E:4F:36:B3:0B",

    /**
     * Options below should not be changed in normal use
     */
    broadcast: "192.168.1.255",
    numberPackets: 5,
    interval: 100,
    port: 7
}