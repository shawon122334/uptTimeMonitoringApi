/*
* Title : Library for handling file system (to read /write data)
* Description : all data related works will be here (with fs)
*/

// dependencies 
const fs = require('fs');
const path = require('path'); // in which path we will save the file 

// module scaffolding 
const lib = {};

// base directory of the data folder 
lib.basedir = path.join(__dirname,'/../.data/'); // path.join to create path

// write data to file 
// we are going to make a function , if we say folder name, file name  and data , then this function write the data there 
// fileDescriptor : if the function works fine it give a reference number 

lib.create = (dir,file,data,callback)=>{
    // open file for writing 
    // lib.basedir is the .data location. wx mode means it does not replace the existing file , writes new file, wx is called flag
    fs.open(`${lib.basedir+dir}/${file}.json`,'wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            // if its true, successfully opened the file now we are ready to write
            // first we stringify the data because we make it json 
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            // we have to pass the fileDescriptor
            fs.writeFile(fileDescriptor,stringData,(err2)=>{
                if(!err2){
                    // if its true, successfully write data,now we can close it
                    // we get another fileDescriptor from writeFile, so we have to use it here
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

//update existing file
lib.update=(dir,file,data,callback)=>{
    // we have to read then write the file to update 
    // file open first for writing
    fs.open(`${lib.basedir+ dir}/${file}.json`,'r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            // convert data to string
             const stringData = JSON.stringify(data);

             // truncate the file (file khali korte hobe)
             fs.ftruncate(fileDescriptor,(err1)=>{
                 if(!err1){
                     // write to the file and close it 
                     fs.writeFile(fileDescriptor,stringData,(err2)=>{
                         if(!err2){
                             // if its true, successfully wrote data , now we close it 
                             // close the file
                             fs.close(fileDescriptor,(err3)=>{
                                 if(!err3){
                                     callback(false);
                                 } else {
                                     callback('error closing file');
                                 }
                             });
                         } else {
                             callback('Error writing to file!');
                         }
                     });
                 } else{
                        callback('Error truncating file');
                 }
             });
        } else{
            console.log('Error updating. File may not exists');
        }
    });
};

// delete existing file
lib.delete=(dir,file,callback) => {
    // unlink file
    fs.unlink(`${lib.basedir+ dir}/${file}.json`,(err)=>{
        if(!err){
            callback(false);
        } else{
            callback('Error deleting file');
        }
    });
};
module.exports = lib ;