/*
* Title : Library for handling file system (to read /write data)
*/

// dependencies 
const fs = require('fs');
const path = require('path'); // in which path we will save file 

// module scaffolding 
const lib = {};

// base directory of the data folder 
lib.basedir = path.join(__dirname,'/../data/'); // path.join to create path

// write data to file 