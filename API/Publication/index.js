//import
const Router = require("express").Router();
//import database model
const PublicationModel = require("../../database/publication");


/*Route            /publications
  description      to get all publications
  acess            public
  parameter        none
  methods          get
*/

/* Router.get("/publications", (req,res) => {      
    return res.json({publications: database.publications});
}); */

Router.get("/", async(req,res) =>{ 
    const getAllPublications = await PublicationModel.find();
    return res.json({authors: getAllPublications});
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

/*  Router.get("/publications/id/:id", (req,res) => {
    const getSpecificPublications = database.publications.filter(
        (publications) => publications.id === parseInt(req.params.id)
    );
     if(getSpecificPublications.length === 0) {
         return res.json({error: `no publications found for id ${req.params.id}`,
         });
     } 

     return res.json({publications:getSpecificPublications});
});  */


Router.get("/id/:id",async(req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({id : req.params.id});
    //null return false and that is coverted to true
    if(!getSpecificPublication){
        return res.json({
            error: `no author found for id of ${req.params.id}`,
        });
    }
       return res.json({data:getSpecificPublication});


});



/*Route            /publications/book
  description      to get list of publications based on books
  acess            public
  parameter        isbn
  methods          get
*/


/* Router.get("/publications/book/:isbn",(req,res) =>{
    const getSpecificPublications = database.publications.filter( (publications) =>
         publications.books.includes(req.params.isbn)
     );
     if(getSpecificPublications.length ===0){
         return res.json({
             error: `no author found for book of isbn ${req.params.isbn}`,
         });
     }
        return res.json({publications:getSpecificPublications});
}); */

Router.get("/book/:isbn", async (req,res) => {
    const getSpecificPlublication = await PublicationModel.find({books:{$in: req.params.isbn}});

    if(!getSpecificPlublication){
        return res.json(
        {error: `No publication found for the book of ${req.params.isbn}`});
    }
    return res.json(getSpecificPlublication);
});
//browser can only perform GET method
//HTTP Request --> it is a helper to make http request
//POSTMAN it is a free source who guid to do API and it is a tool





/*Route            /publications/add
  description      add new publications
  acess            public
  parameter        none
  methods          POST
*/


/*Router.post("/publications/add", (req,res) => {
    const {newPublication} = req.body;
    database.publications.push(newPublication);
    return res.json({publications: database.publications});
}); */


Router.post("/add", async(req,res) => {
    const {newPublication} = req.body;
    PublicationModel.create(newPublication);
    return res.json({message : "publication was added"});
});

//foreach update required data
//map create new array and replace again and again
//filter replaces array of any  key value pair
//confirm your application listen to port 3000

/*Route            /book/update/publicationname
  description      update publications name
  acess            public
  parameter        publicationId
  methods          PUT


Router.put("/book/update/publicationname/:publicationId", (req,res) => {
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.publicationId)){
            publication.name = req.body.newPublicationName;
        }   
    });
    return res.json({publications: database.publications});
}); */

Router.put("/book/update/publicationname/:publicationId", async (req,res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: req.params.publicationId,     //find book using isbn
        },
        {
            name: req.body.pubName,   //then update name
        },
        {
            new: true,                   //specifically tell mongoDB to update data
        }
        );
        return res.json({books: updatedPublication});
    });

/*Route            /publication/update/book
  description      update/add book to publication
  acess            public
  parameter        isbn
  methods          PUT


Router.put("/publication/update/book/:isbn", (req,res) => {
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
});     */

Router.put("/update/book/:isbn" , async(req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
    },
    {
        $addToSet:{
            publications : req.body.newPublication,
        }
    },
    {
        new:true
    }
);

const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
        id: req.body.newPublication,
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
return res.json({books: updatedBook, authors:updatedPublication});
});

//filter get new copy of database
//whichever the object that meet condition is followed will filter and stored in constant
//object doesnt match will be move to constant
//orelse thrown away






    



/*Route            /publication/delete/book
  description      delete a book from publication
  acess            public
  parameter        isbn pubId
  methods          DELETE


Router.delete("/publication/delete/book/:isbn/:pubId", (req,res) => {
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

});          */

Router.delete("/delete/book/:isbn/:pubId", async (req,res) =>  {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn,
        },
        {
            $pull: {
                publications: parseInt(req.params.pubId),
            }
        },
        {
            new: true
        }
        );


        const updatedPublication = await PublicationModel.findOneAndUpdate(
            {
                id: parseInt(req.params.pubId),
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
        return res.json({message: "added successfully", book: updatedBook, publication: updatedPublication});    
});



/*Route            /publication/delete
  description      delete a publication
  acess            public
  parameter        pblicationId
  methods          DELETE
*/

Router.delete("/delete/:publicationId", async (req,res) => {
    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete(
        {
            id: parseInt(req.params.publicationId),
        });
        return res.json({publications: updatedPublicationDatabase});
});




//someone to talk to mongoDB and someone to talk to us
// that is mongoose
//mongoDB all abt async
//support promises and callback
//install mongoose---> npm i mongoose


module.exports = Router;