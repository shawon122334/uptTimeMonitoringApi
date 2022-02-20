/*
* Title : Uptime Monitoring Application
* Description : A RESTFul API to monitor up or down of user defined links 
* Author : Sabbir Ahmed
* Date : 19/02/2022
*
*/
// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');

// app object - module scaffolding 
const app = {};

// configuration
app.config = {
    port : 3000,
};

// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port,()=>{
        console.log(`listening to port ${app.config.port}`);
    })
}

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();