/*
* Title : Library for handling file system (to read /write data)
*/

// dependencies 
const fs = require('fs');
const path = require('path'); // in which path we will save file 

// module scaffolding 
const lib = {};

// base directory of the data folder 
lib.basedir = path.join(__dirname,'/../.data/'); // path.join to create path

// write data to file 
// we are going to make a function , if we say folder name, file name  and data , then this function write the data there 

lib.create = (dir,file,data,callback)=>{
    // open file for writing 
    // lib.basedir is the .data location. wx mode means it does not replace the existing file , writes new file
    fs.open(`${lib.basedir+dir}/${file}.json`,'wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            // first we stringify the data because we make it json 
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor,stringData,(err2)=>{
                if(!err2){
                    fs.close(fileDescriptor,(err3)=>{
                        if(!err3){
                            callback(false);
                        } else {
                            callback('Error closing the file');
                        }
                    });
                } else{
                    callback('Error writing to new file');
                }
            });
        } else {
            // callback(err);
            callback('There was an error, file may already exists!');
        }
    }); 
};
// read data from file 
lib.read=(dir,file,callback)=>{
    fs.readFile(`${lib.basedir+ dir}/${file}.json`,'utf8',(error,data)=>{
        callback(error,data);
    });
};
module.exports = lib ;