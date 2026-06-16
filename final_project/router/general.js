const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "You did either not enter a username or did not enter a password." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  let bookPromise = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books, null, 4));
  })
  bookPromise.then((books) => { res.send(books); })
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  let reqISBN = req.params.isbn;
  let certainBookPromise = new Promise((resolve, reject) => {
    if(typeof(books[reqISBN])!=="undefined")
      {resolve();}
    else
      {reject()}
  })

  function onFulfilled(){
    res.send(JSON.stringify(books[reqISBN], null, 4));
  }
  function onRejected(){
    res.status(404).json({message: `It was not possible to identify a book with the ISBN you entered (${reqISBN}).`});
  }

  certainBookPromise.then(onFulfilled, onRejected);
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  try {
    const reqAuthor = req.params.author.replaceAll('_', ' ');
    const keys = Object.keys(books);
    const booksByAuthor = keys
      .filter(key => books[key].author === reqAuthor)
      .map(key => books[key]);

    if (booksByAuthor.length > 0) {
      return res.status(200).send(JSON.stringify(booksByAuthor, null, 4));
    } else {
      return res.status(404).json({ message: "There is no book stored by this author." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book details." });
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  try {
    const reqTitle = req.params.title.replaceAll('_', ' ');
    const keys = Object.keys(books);
    const booksByTitle = keys
      .filter(key => books[key].title === reqTitle)
      .map(key => books[key]);

    if (booksByTitle.length > 0) {
      return res.status(200).send(JSON.stringify(booksByTitle, null, 4));
    } else {
      return res.status(404).json({ message: "There is no book with this title stored." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book details." });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  let reqISBN = req.params.isbn;
  const book = books[reqISBN];
  
  if (book) {
    res.status(200).send(JSON.stringify(book.reviews, null, 4));
  } else {
    res.status(404).json({ message: "No reviews found. The book with the provided ISBN does not exist." });
  }
});

module.exports.general = public_users;
