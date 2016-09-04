# Restfull Server Using Node JS and MongoDB

This is a sample restfull server which supports the following operations:
* GET
* POST
* PUT 
* PATCH
* DELETE

## Prerequisites

* Node JS (Install the latest stable version for windows/linux/OSX)
* MongoDb (Install the latest stable version for windows/linux/OSX)

Make sure that mongod is running before you start the server

## Dependencies

Once you have cloned the repo, you'll need to install the dependencies using.

    $ npm install

## Starting Server
Once you have installed the dependencies, you can run your server using the following command

    $ gulp

The server will start running on localhost port 8000. (You can change the port in gulpfile.js)

## Rest Operations
These operations are for the models which I've already created in my server. You can change the code in model according to your database table, and your json data for post/put/patch will change accordingly. 

**GET**
* localhost:8000/api/books (For getting all books) 
* localhost:8000/api/persons (For getting all persons)

**POST**
* localhost:8000/api/books (Json Data ) 
* localhost:8000/api/persons (Json Data)

**PUT**
* localhost:8000/api/books/bookId (Json Data) 
* localhost:8000/api/persons/bookId (Json Data)

**PATCH**
* localhost:8000/api/books/bookId (Json Data) 
* localhost:8000/api/persons/bookId (Json Data)

**DELETE**
* localhost:8000/api/books/bookId
* localhost:8000/api/persons/bookId
