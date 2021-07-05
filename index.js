
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//include ur database file
//const database = require("./database/index");
/*models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");*/

//microservices route
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");




//initialisation
const booky = express();
//configuration
booky.use(express.json()); //while passing json data u should include this statement

console.log(process.env.MONGO_URL);
//establish database connection
mongoose.connect(process.env.MONGO_URL,{ //to maintain sensitive data
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,                   ////mongoose is a library to connect to mongoDB
    useCreateIndex: true,
  })
.then(() => console.log("connection established!!!"));


//initialising bookservices
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);

//to ensure security we use dotenv.mongoDB contain sensitive data.this is need to store in environment variable and injected during runtym

    

booky.listen(3000,() => console.log("hey,server is running")); //whenever the server start succesfuly function is called and log that statement






























