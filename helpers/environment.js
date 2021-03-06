/*
* Title : Environments 
* Description : Handle all environments related things 
* Author : Sabbir Ahmed 
* Date : 28-02-2022
*/

// dependencies  


// module scaffolding 
const environments = {}; 

environments.staging ={
    port : 3000,
    envName : 'staging'
};
environments.production = {
    port : 5000,
    envName : 'production'
};

// determine which environment was passed from terminal 
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;