
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
//include ur database file
const database = require("./database/index");
//initialisation
const booky = express();
//configuration
booky.use(express.json()); //while passing json data u should include this statement

//establish database connection
mongoose.connect(process.env.MONGO_URL, //to maintain sensitive data
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)
.then(() => console.log("connection established!!!"));

//to ensure security we use dotenv.mongoDB contain sensitive data.this is need to store in environment variable and injected during runtym
/*Route            /
  description      to get all books
  acess            public
  parameter        none
  methods          get
*/

booky.get("/", (req,res) =>{      //api to get all books
    return res.json({books: database.books});
});



/*Route            /is
  description      to get specific books based on ISBN
  acess            public
  parameter        isbn
  methods          get
*/


booky.get("/is/:isbn",(req,res) =>{
    const getSpecificBook = database.books.filter( //need to filter array books
        (book) => book.ISBN === req.params.isbn  
     );
     if(getSpecificBook.length ===0){
         return res.json({
             error: `no book found for ISBN of ${req.params.isbn}`,
         });
     }
        return res.json({data:getSpecificBook});
});

/*Route            /c
  description      to get category of books 
  acess            public
  parameter        category
  methods          get
*/

booky.get("/c/:category",(req,res) =>{
    const getSpecificBook = database.books.filter((book) =>
        books.category.includes(req.params.category) //compare each and every element if match found return true
    );
    if(getSpecificBook.length ===0){
        return res.json({
            error: `no book found for this category of ${req.params.category}`,
        });
    }
       return res.json({books:getSpecificBook});

});

/*Route            /l
  description      to get language of books 
  acess            public
  parameter        language
  methods          get
*/

booky.get("/l/:language",(req,res) =>{
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );
    if(getSpecificBook.length ===0){
        return res.json({
            error: `no book found for the language of ${req.params.language}`,
        });
    }
       return res.json({data:getSpecificBook});

});

/*Route            /author
  description      to get all authors
  acess            public
  parameter        none
  methods          get
*/

booky.get("/author", (req,res) =>{      //api to get all books
    return res.json({authors: database.authors});
});


/*Route            /author
  description      to get specific author based on id
  acess            public
  parameter        isbn
  methods          get
*/


booky.get("/author/id/:id",(req,res) =>{
    const getSpecificAuthor = database.authors.filter(
        (authors) => authors.id === parseInt(req.params.id));
    if(getSpecificAuthor.length===0) {
        return res.json(
            {error: `No author found for the id ${req.params.id}`,
        });
    }
    return res.json({authors: getSpecificAuthor});
});



/*Route            /author/book
  description      to get list of authors based on books
  acess            public
  parameter        isbn
  methods          get
*/


booky.get("/author/book/:isbn",(req,res) =>{
    const getSpecificAuthor = database.authors.filter( (authors) =>//need to filter array books
         authors.books.includes(req.params.isbn)
     );
     if(getSpecificAuthor.length ===0){
         return res.json({
             error: `no author found for book of isbn ${req.params.isbn}`,
         });
     }
        return res.json({authors:getSpecificAuthor});
});


/*Route            /publications
  description      to get all publications
  acess            public
  parameter        none
  methods          get
*/

booky.get("/publications", (req,res) => {      
    return res.json({publications: database.publications});
});


//nodemon restart ur nodejs server
//nodemon restart for every change
//to install nodemon-> npm i nodemon
//to execute securely-> npx nodemon filename


/*Route            /publications/id
  description      to get spec publications on id
  acess            public
  parameter        id
  methods          get
*/

booky.get("/publications/id/:id", (req,res) => {
    const getSpecificPublications = database.publications.filter(
        (publications) => publications.id === parseInt(req.params.id)
    );
     if(getSpecificPublications.length === 0) {
         return res.json({error: `no publications found for id ${req.params.id}`,
         });
     } 

     return res.json({publications:getSpecificPublications});
});

/*Route            /publications/book
  description      to get list of authors based on books
  acess            public
  parameter        isbn
  methods          get
*/


booky.get("/publications/book/:isbn",(req,res) =>{
    const getSpecificPublications = database.publications.filter( (publications) =>
         publications.books.includes(req.params.isbn)
     );
     if(getSpecificPublications.length ===0){
         return res.json({
             error: `no author found for book of isbn ${req.params.isbn}`,
         });
     }
        return res.json({publications:getSpecificPublications});
});


//browser can only perform GET method
//HTTP Request --> it is a helper to make http request
//POSTMAN it is a free source who guid to do API and it is a tool


/*Route            /book/add
  description      add new book
  acess            public
  parameter        none
  methods          POST
*/


booky.post("/book/add", (req,res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
});


/*Route            /author/add
  description      add new author
  acess            public
  parameter        none
  methods          POST
*/


booky.post("/author/add", (req,res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors});
});

/*Route            /publications/add
  description      add new publications
  acess            public
  parameter        none
  methods          POST
*/


booky.post("/publications/add", (req,res) => {
    const {newPublication} = req.body;
    database.publications.push(newPublication);
    return res.json({publications: database.publications});
});

//foreach update required data
//map create new array and replace again and again
//filter replaces array of any  key value pair
//confirm your application listen to port 3000


/*Route            /book/update/title
  description      update book title
  acess            public
  parameter        isbn
  methods          PUT
*/
booky.put("/book/update/title/:isbn", (req,res) => {
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({books: database.books});
});


/*Route            /book/update/author
  description      update book author
  acess            public
  parameter        isbn authorid
  methods          PUT
*/

booky.put("/book/update/author/:isbn/:authorId" , (req,res) => {
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    //update author database
    database.authors.forEach((author) => {
        if(author.id === req.params.authorId) {
            return author.books.push(parseInt(req.params.authorId));
        }
    });
    return res.json({books: database.books, authors:database.authors});
});

/*Route            /book/update/authorname
  description      update author name
  acess            public
  parameter        authorId
  methods          PUT
*/

booky.put("/book/update/authorname/:authorId", (req,res) => {
    database.authors.forEach((author) => {                                                                  
        if(author.id === parseInt(req.params.authorId)){
            author.name = req.body.newAuthorName;
        }
    });
    return res.json({authors: database.authors});
});

/*Route            /book/update/publicationname
  description      update publications name
  acess            public
  parameter        publicationId
  methods          PUT
*/

booky.put("/book/update/publicationname/:publicationId", (req,res) => {
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.publicationId)){
            publication.name = req.body.newPublicationName;
        }   
    });
    return res.json({publications: database.publications});
});

/*Route            /publication/update/book
  description      update/add book to publication
  acess            public
  parameter        isbn
  methods          PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
    database.publications.forEach((publication) => {
        if(publication.id === req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
    });
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({books: database.books ,publications: database.publications,message:"successfully updated publication"})
});


//filter get new copy of database
//whichever the object that meet condition is followed will filter and stored in constant
//object doesnt match will be move to constant
//orelse thrown away

/*Route            /book/delete
  description      delete a book
  acess            public
  parameter        isbn
  methods          DELETE
*/

booky.delete("/book/delete/:isbn", (req,res) => {
    const updatedBookDatabase = database.books.filter( //filter return new aqrray
        (book) =>book.ISBN !== req.params.isbn
        );

    database.books = updatedBookDatabase;    //updatedBookDatabase is new database after deleting .for that we change variable of books database to let
    return res.json({books: database.books});
});

/*Route            /book/delete/author
  description      delete a author from book
  acess            public
  parameter        isbn authorId
  methods          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) =>{
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (author) =>  author !== parseInt(req.params.authorId)
    );
        
        book.author = newAuthorList;
        return;
     }
    });
    //update author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter((book) => 
            book !== req.params.isbn
            );
            
         author.book = newBooksList;    
         return;
        }
        
    });
    return res.json({books: database.books, authors: database.authors,message:"successfully deleted"});
});

/*Route            /author/delete
  description      delete an author
  acess            public
  parameter        authorId
  methods          DELETE
*/

booky.delete("/author/delete/:authorId", (req,res) => {
    const updatedAuthorDatabase = database.authors.filter( //filter return new aqrray
        (author) =>author.id !== parseInt(req.params.authorId)
        );

    database.authors = updatedAuthorDatabase;    //updatedBookDatabase is new database after deleting .for that we change variable of books database to let
    return res.json({authors: database.authors});
});

/*Route            /publication/delete/book
  description      delete a publication
  acess            public
  parameter        isbn pubId
  methods          DELETE
*/

booky.delete("/publication/delete/book/:isbn/:pubId", (req,res) => {
    //update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId))  {
            const newBooksList = publication.books.filter(
             (book) => book != req.params.isbn
            );
            const newBookList = newBooksList;
            return;
        }
    });
    //update books database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publication = 0;
            return;
        }
    });
    return res.json({books : database.books , publications : database.publications});

});


/*Route            /publication/delete
  description      delete a publication
  acess            public
  parameter        pblicationId
  methods          DELETE
*/

booky.listen(3000,() => console.log("hey,server is running")); //whenever the server start succesfuly function is called and log that statement


//someone to talk to mongoDB and someone to talk to us
// that is mongoose
//mongoDB all abt async
//support promises and callback
//install mongoose---> npm i mongoose