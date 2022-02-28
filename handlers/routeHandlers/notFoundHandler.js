/*
* Title : Not Found handler
* Description : 404 Not Found Handler
 */

// module scaffolding
const handler ={};
handler.notFoundHandler=(requestProperty,callback)=>{
    callback(404,{
        message : 'Your requested url is not found',
    })
};
module.exports = handler;