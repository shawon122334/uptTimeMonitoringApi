/*
* Title : handle request response
*/

// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder')
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler'); 

// module scaffolding
const handler ={};

handler.handleReqRes=(req,res)=>{
    // request handling 
    // get the url and parse it
    // these are request property 
    const parsedUrl = url.parse(req.url,true);      //  console.log(parsedUrl ); req.url = takes the whole url , true = allow query string,(check on postman)
    const path = parsedUrl.pathname;                // about path found 
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); 
    const method = req.method.toLowerCase();        // get/post/put anything, i will get as small letter 
    const queryStringObject = parsedUrl.query;      
    //  console.log(queryStringObject);
     
    const headersObject = req.headers;
    //console.log(headersObject);

    // as handler is out of this file so we have to sent all the request property to there.so, making an object, when we call the choosenHandler we pass the requestProperty (line 50)
    const requestProperty = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }; 

    // what if request is POST method? we have to record the data, so , body of request comes as stream(buffer)
    // we have to receive data , listen data event
    // 1.core module import string decoder class
    // 2. make an object for this class
    // 3. fire data event and end event
    
    const decoder = new StringDecoder('utf-8');     // utf is encoding
    let realData = '';

    // route checking 
    // it defines which function will be fired for a route hit by user 
    // we call this choosenHandler and passing request property , a callback function 
    const choosenHandler = routes[trimmedPath] ?  routes[trimmedPath] : notFoundHandler;
    

    // when we receive body / payload(post data) from request, we read the data using stream and buffer 
    req.on('data',(buffer)=>{
        realData += decoder.write(buffer);
    });
    req.on('end',()=>{
        realData += decoder.end();
        // console.log(realData);

        // we are putting the choosenHandler here incase the realData is needed in choosenHandler
        choosenHandler(requestProperty,(statusCode,payload)=>{
            statusCode = typeof(statusCode) === 'number'? statusCode : 500;
            payload = typeof(payload) === 'object' ? payload : {};
    
            // when we response, we have to stringify payload 
             const payloadString = JSON.stringify(payload);
    
            // return the final response 
            res.setHeader('Content-Type', 'application/json'); // client knows that server says response will be in json 
            res.writeHead(statusCode);

            res.end(payloadString);
        });
        // response handle
        res.end('Hello Programmers');
    }); 

    
}
module.exports = handler;