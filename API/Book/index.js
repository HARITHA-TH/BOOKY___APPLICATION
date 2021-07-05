//initialising Express Router
const Router = require("express").Router();
//database models
const BookModel = require("../../database/book");



/*Route            /
  description      to get all books
  acess            public
  parameter        none
  methods          get
*/

/*Booky.get("/", (req,res) =>{      //api to get all books
    return res.json({books: database.books});
}); */

Router.get("/", async (req,res) =>{
    const getAllBooks = await BookModel.find();    //api to get all books
        return res.json(getAllBooks);
    });     


/*Route            /is
  description      to get specific books based on ISBN
  acess            public
  parameter        isbn
  methods          get
*/


/*Booky.get("/is/:isbn",(req,res) =>{
    const getSpecificBook = database.books.filter( //need to filter array books
        (book) => book.ISBN === req.params.isbn  
     );
     if(getSpecificBook.length ===0){
         return res.json({
             error: `no book found for ISBN of ${req.params.isbn}`,
         });
     }
        return res.json({data:getSpecificBook});
}); */

Router.get("/is/:isbn",async(req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN : req.params.isbn});
    //null return false and that is coverted to true
    if(!getSpecificBook){
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

/*Booky.get("/c/:category",(req,res) =>{
    const getSpecificBook = database.books.filter((book) =>
        books.category.includes(req.params.category) //compare each and every element if match found return true
    );
    if(getSpecificBook.length ===0){
        return res.json({
            error: `no book found for this category of ${req.params.category}`,
        });
    }
       return res.json({books:getSpecificBook});

});*/



Router.get("/c/:category",async(req,res) =>{
    const getSpecificBook = await BookModel.findOne({
        category : req.params.category,
    });
         //compare each and every element if match found return true
    if(!getSpecificBook){
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

/*Booky.get("/l/:language",(req,res) =>{
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );
    if(getSpecificBook.length ===0){
        return res.json({
            error: `no book found for the language of ${req.params.language}`,
        });
    }
       return res.json({data:getSpecificBook});

}); */

Router.get("/l/:language",async(req,res) =>{
    const getSpecificBook = await BookModel.findOne({
        language : req.params.language,
    });
         //compare each and every element if match found return true
    if(!getSpecificBook){
        return res.json({
            error: `no book found for this language of ${req.params.language}`,
        });
    }
       return res.json({books:getSpecificBook});

});

/*Route            /book/add
  description      add new book
  acess            public
  parameter        none
  methods          POST
*/


/*Booky.post("/book/add", (req,res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
}); */

Router.post("/add", async(req,res) => {
    const {newBook} = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({books: addNewBook });
});

/*Route            /book/update/author
  description      pdate/add new author
  acess            public
  parameter        isbn 
  methods          PUT


Router.put("/book/update/author/:isbn/:authorId" , (req,res) => {
    //update book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.author.push(req.params.newAuthor);
        }
    });
    //update author database
    database.authors.forEach((author) => {
        if(author.id === req.body.newAuthor) {
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({books: database.books, authors:database.authors});
});  */

Router.put("/update/author/:isbn" , async(req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
    },
    {
        $addToSet:{
            author: req.body.newAuthor,
        }
    },
    {
        new:true
    }
);

const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
        id: req.body.newAuthor,
},
{
    $addToSet:{
        books: req.params.isbn,
    }
},
{
    new:true
}
);
return res.json({books: updatedBook, authors:updatedAuthor});
});

/*Route            /book/update/authorname
  description      update author name
  acess            public
  parameter        authorId
  methods          PUT


Router.put("/book/update/authorname/:authorId", (req,res) => {
    database.authors.forEach((author) => {                                                                  
        if(author.id === parseInt(req.params.authorId)){
            author.name = req.body.newAuthorName;
        }
    });
    return res.json({authors: database.authors});
});    */

Router.put("/update/authorname/:authorId", async (req,res) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.params.authorId,     //find book using isbn
        },
        {
            name: req.body.authorName,   //then update name
        },
        {
            new: true,                   //specifically tell mongoDB to update data
        }
        );
        return res.json({books: updatedAuthor});
    });
    




/*Route            /book/update/title
  description      update book title
  acess            public
  parameter        isbn
  methods          PUT

Booky.put("/book/update/title/:isbn", (req,res) => {
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({books: database.books});
});    */


Router.put("/update/title/:isbn", async (req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,     //find book using isbn
        },
        {
            title: req.body.bookTitle,   //then update title
        },
        {
            new: true,                   //specifically tell mongoDB to update data
        }
        );
        return res.json({books: updatedBook});
    });
    

/*Route            /book/delete
  description      delete a book
  acess            public
  parameter        isbn
  methods          DELETE


Booky.delete("/book/delete/:isbn", (req,res) => {
    const updatedBookDatabase = database.books.filter( //filter return new aqrray
        (book) =>book.ISBN !== req.params.isbn
        );

    database.books = updatedBookDatabase;    //updatedBookDatabase is new database after deleting .for that we change variable of books database to let
    return res.json({books: database.books});
});    */

Router.delete("/delete/:isbn", async (req,res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn,
        });
        return res.json({books: updatedBookDatabase});
});


/*Route            /book/delete/author
  description      delete a author from book
  acess            public
  parameter        isbn authorId
  methods          DELETE


Booky.delete("/book/delete/author/:isbn/:authorId", (req,res) =>{
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
});   */


Router.delete("/delete/author/:isbn/:authorId", async (req,res) =>  {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            $pull: {
                author: parseInt(req.params.authorId),
            }
        },
        {
            new: true
        }
        );


        const updatedAuthor = await AuthorModel.findOneAndUpdate(
            {
                id: parseInt(req.params.authorId),
            },
            {
                $pull:{
                    books: req.params.isbn,
                },
            },
            {
                new: true
            }
            );
        return res.json({message: "added successfully", book: updatedBook, author: updatedAuthor});    
});

module.exports = Router;    