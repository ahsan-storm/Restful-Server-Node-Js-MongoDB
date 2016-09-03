/**
 * Created by ahhsan on 9/3/16.
 */
var express = require('express');

var personRoutes = function (Person) {

    var personRouter = express.Router();

    personRouter.route('/')
        /**
         * GET  /persons -> Get all the persons
         */
        .get(function (req, res) {
            Person.find(function (err, persons) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(persons);
                }
            })
        })
        /**
         * POST  /persons -> Adds a new person
         */
        .post(function (req, res) {
            var person = new Person(req.body);
            person.save();
            console.log(person);
            res.status(201).send(person);
        });

    // Adding middle-ware which handles get Request against a certain ID
    personRouter.use('/:personId', function (req, res, next) {
        Person.findById(req.params.personId, function (err, person) {
            if (err) {
                res.status(500).send(err);
            }
            else if (person) {
                req.person = person;
                next();
            }
            else {
                res.status(404).send('no Person found');
            }
        })
    });

    personRouter.route('/:personId')

    /**
     * Get  /persons/:personId -> Gets the person with personId
     */
        .get(function (req, res) {
            res.json(req.person);
        })

        /**
         * PUT  /persons/:personId -> Updates an existing person with personId
         */
        .put(function (req, res) {
            req.person.name = req.body.name;
            req.person.gender = req.body.gender;
            req.person.save(function (err) {
                if(err){
                    err.status(500).send(err);
                }
                else{
                    res.json(req.person);
                }
            });
        })

        /**
         * PATCH  /persons/:personId -> Partially updates the person with personId and provided update content
         */
        .patch(function (req, res) {
            if(req.body._id){
                delete req.body._id;
            }

            for(var p in req.body) {
                req.person[p] = req.body[p];
            }

            req.person.save(function (err) {
                if(err){
                    err.status(500).send(err);
                }
                else{
                    res.json(req.person);
                }
            });
        })

        /**
         * DELETE  /persons/:personId -> Deletes the person with personId
         */
        .delete(function (req,res) {
            req.person.remove(function (err) {
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(200).send('Removed');
                }
            })
        });

    return personRouter;
};

module.exports = personRoutes;