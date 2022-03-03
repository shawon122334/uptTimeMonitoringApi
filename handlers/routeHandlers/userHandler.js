/*
* Title : User Handler 
* Description : Handler for handling user related routes  
* Author : Sabbir Ahmed 
* Date : 4-03-2022 
*/
 
// module scaffolding
const handler ={};

handler.userHandler=(requestProperty,callback)=>{ 
    // if client hits different method for same url , we fire different function
    // which method 
    const acceptedMethods = ['get','post','put','delete'];
    if(acceptedMethods.indexOf(requestProperty.method) !== -1){
        // calls the users functions and pass requestProperty and callback
        handler._users[requestProperty.method](requestProperty,callback);
    }else {
        callback(405);
    }
    callback(200,{
        message : 'This is user url',
    });

};
// another scaffolding for user
handler._users={};  

handler._users.post = (requestProperty, callback)=>{

};
handler._users.get = (requestProperty, callback)=>{

};handler._users.put = (requestProperty, callback)=>{

};handler._users.delete = (requestProperty, callback)=>{

};
module.exports = handler ;