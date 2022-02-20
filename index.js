/*
* Title : Uptime Monitoring Application
* Description : A RESTFul API to monitor up or down of user defined links 
* Author : Sabbir Ahmed
* Date : 19/02/2022
*
*/
// dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder')

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
app.handleReqRes=(req,res)=>{
    // request handling 
    // get the url and parse it
    const parsedUrl = url.parse(req.url,true);      //  console.log(parsedUrl ); req.url = takes the whole url , true = allow query string
    const path = parsedUrl.pathname;                // about path found 
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const method = req.method.toLowerCase();        // get/post/put anything, i will get as small letter 
    const queryStringObject = parsedUrl.query;      
    //  console.log(queryStringObject);
     
    const headersObject = req.headers;
    //console.log(headersObject);

    // what if request is POST method? we have to record the data, so , body of request comes as stream(buffer)
    // we have to receive data , listen data event
    // 1.core module import string decoder class
    // 2. make an object for this class
    // 3. fire data event and end event
    const decoder = new StringDecoder('utf-8');     // utf is encoding
    let realData = '';
    req.on('data',(buffer)=>{
        realData += decoder.write(buffer);
    });
    req.on('end',()=>{
        realData += decoder.end();
        console.log(realData);

        // response handle
        res.end('Hello Programmers');
    })

    
}

//start the server
app.createServer();