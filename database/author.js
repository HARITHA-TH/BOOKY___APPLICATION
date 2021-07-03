//inlude mongoose to this file
const mongoose = require("mongoose");

//create a author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name : String,
    books : [String],

});

//create a book model
const AuthorModel = mongoose.model("authors",AuthorSchema);

//export book model
module.exports = AuthorModel;
