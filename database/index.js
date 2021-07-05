let books = [                    //array of objects
    {
        ISBN: "1234Book",
        title: "revolution2020",
        pubDate: "2021-07-07",
        language: "en",
        numpage: "250",
        author: [1, 2],
        publications: 1,
        category: ["tech","programming","education","thriller"],
    },
    {
        ISBN: "12345Book",
        title: "2020",
        pubDate: "2021-07-08",
        language: "en",
        numpage: "255",
        author: [1],
        publications: [1],
        category: ["education","thriller"],
    },
];
let authors = [
    {
        id: 1,
        name : "chetan bhagat",
        books : ["1234Book"],

    },
    {
        id: 2,
        name: "J.K Rowling",
        books: ["1234Book"],
    }
];
let publications = [
    {
        id: 1,
        name: "writex",
        books: ["1234Book"],
    },
    {
        id: 2,
        name: "vick",
        books: [],
    },
];
//export these file to acess them
module.exports = {books,authors,publications};
