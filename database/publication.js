//inlude mongoose to this file
const mongoose = require("mongoose");

//create a publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//create a book model
const PublicationModel = mongoose.model("publications",PublicationSchema);

//export book model
module.exports = PublicationModel;
