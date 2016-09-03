/**
 * Created by ahhsan on 9/3/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var personModel = new Schema({
    name: {type: String},
    gender: {type: String}
});

module.exports = mongoose.model('Person', personModel);