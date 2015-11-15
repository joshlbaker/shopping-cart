'use strict'

var express = require('express');
var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));







// Listen on port 3000
app.listen('3000',function(){
    console.log('Server is working!')
})