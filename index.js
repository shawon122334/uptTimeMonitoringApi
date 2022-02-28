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
const environment = require('./helpers/environment');

// app object - module scaffolding 
const app = {};



// create server
app.createServer = ()=>{
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port,()=>{
        // console.log(`environment variable is ${process.env.NODE_ENV}`);
        console.log(`listening to port ${environment.port}`);
    })
}

//handle Request Response
app.handleReqRes = handleReqRes;

//start the server
app.createServer();