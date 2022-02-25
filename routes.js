/*
* Title : Routes  
* Description : Application Routes
*
*/
//Dependencies
const {sampleHandler} = require('./handlers/routeHandlers/sampleHandler')
const routes ={
    sample : sampleHandler,
};
module.exports = routes;