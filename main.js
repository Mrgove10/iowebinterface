const config = require('./conf.js');

if (config.role == "server") {
    console.info("Server Mode");
    require('./server/server.js');
}
else if (config.role == "client") {
    console.info("Client Mode");
    require('./client/client.js');
}