# Wake On lan interface

## Use case

This is particularly interesting if you own a physical server that you can not always acces (at a friend place, not home...) but you still want to be able to start and stop.
This is also usfull for shared servers used for development purposes.

>**Warning : this interface is NOT secured, anyone can start your client at anytime**

## How it works

The project has a client and a server side.

The server side is the side that should be accesed 24/7, it allows to make requestes to start the client.

The client side is installed only is you wish to shut down or restart the client. If you only wish to start the client, only the server side is needed.

## Installation

Notmal installation, here we use [pm2](http://pm2.keymetrics.io/) to start the node process on startup.

   1) Clone this repo on the server and the client ```$ git clone https://github.com/Mrgove10/iowebinterface/```
   2) Modify the ```conf.js``` file whit the nedded information.
      1) The server side should be set to ```role: "server"```
      2) The client side should be set to ```role: "client"```
   3) Start the process whit pm2 ```$ pm2 start main.js```
   4) Set pm2 to start whit the machine ```$ pm2 startup```
   5) Save the process list to autostart ```$ pm2 save```
   6) Navigate to you server adress **http://[adress]:1234/**
   7) You should now be able to start and stop the server.

You cna also manualy start both sides :

- ```$ node client/client.js```
- ```$ node server/server.js```

## Extra configuration

You can change the html page as you wish to change the server name or the Iframe for your management interface.
