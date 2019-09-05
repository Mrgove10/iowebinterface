const config = require('./conf.js');

if (config.role == "server") {
    console.info("Starting IO Web Interface in *Server Mode*\n");
    require('./server/server.js');
}
else if (config.role == "client") {
    console.info("Starting IO Web Interface in *Client Mode*\n");
    require('./client/client.js');
}