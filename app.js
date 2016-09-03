/**
 * Created by ahhsan on 9/3/16.
 */
/**
 * Adding Dependencies
 */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

/**
 * Initializing db "databaseName". If don't exist, will create a new one automatically
 */
var db = mongoose.connect('mongodb://localhost/databaseName');

var app = express();
var port = process.env.PORT || 3000;

/**
 * Initializing JSON body parsers which read json request data in the form of model fields
 */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Initializing all models here
 */
var Book = require('./src/models/bookModel');
var Person = require('./src/models/personModel');
/**
 * Initializing all routers here
 */
bookRouter = require('./src/Routes/bookRoutes')(Book);
personRouter = require('./src/Routes/personRoutes')(Person);

app.use('/api/books', bookRouter);
app.use('/api/persons', personRouter);

/**
 * Starting the server on specific port
 */
app.listen(port, function () {
    console.log("Running on Port: "+ port);
})