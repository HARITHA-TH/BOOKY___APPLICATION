//REQUIREMENTS OF OUR PROJECT

const { books } = require("./database")

//we are a book management company
//books
    //ISBN
    //book title
    //pub data
    //language
    //num page
    //author[]
    //category[]
//authors
     //id
     //name
     //books[]
//publications
    //id
    //name
    //books[]

// WHAT ALL API WE NEED    

//////////////////////////////////////////////Books///////////////////////////////////////////////////////////// 

  ////////GET//////////

  //we need an API 
  //to get all books
  //to get specific books
  //to get list of books based on category
  //to get list of books based on language
  
  ///////POST///////

  //add new book

  ////////PUT////////

  //update book title
  //update/add new author

  //////DELETE///////

  // delete a book
  //delete an author

////////////////////////////////////////////AUTHORS///////////////////////////////////////////////////////////////////

  ///////////GET/////////

   //we need an API
   //to get all authors
   //to get specific authors based on id
   //to get list of authors based on books xxxxxxxxxxxxxxxxx
   


   ///////POST////////////

   //add new author

   ///////PUT////////////

   //update author name using id

   ///////DELETE/////////

   //delete an author
   
////////////////////////////////////////////PUBLICATIONS/////////////////////////////////////////////////////////////
   
   ///////////GET//////////

   //we need an API
   //to get all publications
   //to get specific publications based on id
   //to get list of publications based on book xxxxxxxxxx

   /////////POST//////////

   //add new publications

   /////////PUT//////////

   //update the publication name using id
   //update/add book to publication

   ////////DELETE////////

   //delete the publications
   //delete a book from ublications