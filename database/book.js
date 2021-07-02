//inlude mongoose to this file
const mongoose = require("mongoose");

//create a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numpage: Number,
    author: [Number],
    publications: Number,
    category: [String],
});

//create a book model
const BookModel = mongoose.model("books","BookSchema");

//export book model
module.exports = BookModel;