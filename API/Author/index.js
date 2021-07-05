//import
const Router = require ("express").Router();
//import authormodel
const AuthorModel = require("../../database/author"); //          ../../ is to go out of api folder


/*Route            /author
  description      to get all authors
  acess            public
  parameter        none
  methods          get
*/

/*Router.get("/author", (req,res) =>{      //api to get all books
    return res.json({authors: database.authors});
}); */

Router.get("/", async(req,res) =>{ 
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors: getAllAuthors});
});

/*Route            /author/id
  description      to get specific author based on id
  acess            public
  parameter        isbn
  methods          get
*/


/*Router.get("/author/id/:id",(req,res) =>{
    const getSpecificAuthor = database.authors.filter(
        (authors) => authors.id === parseInt(req.params.id));
    if(getSpecificAuthor.length===0) {
        return res.json(
            {error: `No author found for the id ${req.params.id}`,
        });
    }
    return res.json({authors: getSpecificAuthor});
});    */

Router.get("/id/:id",async(req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({id : req.params.id});
    //null return false and that is coverted to true
    if(!getSpecificAuthor){
        return res.json({
            error: `no author found for id of ${req.params.id}`,
        });
    }
       return res.json({data:getSpecificAuthor});


});


/*Route            /author/book
  description      to get list of authors based on books
  acess            public
  parameter        isbn
  methods          get
*/


/*Router.get("/author/book/:isbn",(req,res) =>{
    const getSpecificAuthor = database.authors.filter( (authors) =>//need to filter array books
         authors.books.includes(req.params.isbn)
     );
     if(getSpecificAuthor.length ===0){
         return res.json({
             error: `no author found for book of isbn ${req.params.isbn}`,
         });
     }
        return res.json({authors:getSpecificAuthor});
});   */


  Router.get("/book/:isbn", async (req,res) => {
    const getSpecificAuthor = await AuthorModel.find({books: {$in: req.params.isbn}});

    if(!getSpecificAuthor){
        return res.json(
        {error: `No author found for the book of ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});


/*Route            /author/add
  description      add new author
  acess            public
  parameter        none
  methods          POST
*/


/*Router.post("/author/add", (req,res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors});
});*/

Router.post("/add", async(req,res) => {
    const {newAuthor} = req.body;
    AuthorModel.create(newAuthor);
    return res.json({message : "author was added"});
});



/*Route            /author/delete
  description      delete an author
  acess            public
  parameter        authorId
  methods          DELETE


Router.delete("/author/delete/:authorId", (req,res) => {
    const updatedAuthorDatabase = database.authors.filter( //filter return new aqrray
        (author) =>author.id !== parseInt(req.params.authorId)
        );

    database.authors = updatedAuthorDatabase;    //updatedBookDatabase is new database after deleting .for that we change variable of books database to let
    return res.json({authors: database.authors});
});  */


Router.delete("/delete/:authorId", async (req,res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id: parseInt(req.params.authorId),
        });
        return res.json({authors: updatedAuthorDatabase});
});


module.exports = Router;