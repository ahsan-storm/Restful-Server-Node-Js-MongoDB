/**
 * Created by ahhsan on 9/3/16.
 */
var express = require('express');

var routes = function (Book) {

    var bookRouter = express.Router();

    bookRouter.route('/')
        /**
         * POST  /books -> Adds a new book
         */
        .post(function (req, res) {
            var book = new Book(req.body);
            book.save();
            console.log(book);
            res.status(201).send(book);
        })
        /**
         * GET  /books -> Get all the books
         */
        .get(function (req, res) {
            Book.find(function (err, books) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            })
        });

    // Adding middle-ware which handles get Request against a certain ID
    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('no Book found');
            }
        })
    });

    bookRouter.route('/:bookId')

        /**
         * Get  /books/:bookId -> Gets the book with bookId
         */
        .get(function (req, res) {
            res.json(req.book);
        })

        /**
         * PUT  /books/:bookId -> Updates an existing book with bookId
         */
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;
            req.book.save(function (err) {
                if(err){
                    err.status(500).send(err);
                }
                else{
                    res.json(req.book);
                }
            });
        })

        /**
         * PATCH  /books/:bookId -> Partially updates the book with bookId and provided update content
         */
        .patch(function (req, res) {
            if(req.body._id){
                delete req.body._id;
            }

            for(var p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save(function (err) {
                if(err){
                    err.status(500).send(err);
                }
                else{
                    res.json(req.book);
                }
            });
        })

        /**
         * DELETE  /books/:bookId -> Deletes the book with bookId
         */
        .delete(function (req,res) {
           req.book.remove(function (err) {
               if(err){
                   res.status(500).send(err);
               }
               else{
                   res.status(200).send('Removed');
               }
           })
        });

    return bookRouter;
};

module.exports = routes;