
const express = require("express");
const axios = require("axios");
const books = require("./booksdb");

const public_users = express.Router();

// Get all books
public_users.get("/", async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Get book by ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ [isbn]: book });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book by ISBN" });
  }
});

// Get books by author
public_users.get("/author/:author", async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();

    const result = Object.entries(books).filter(
      ([isbn, book]) => book.author.toLowerCase() === author
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found for this author" });
    }

    return res.status(200).json(Object.fromEntries(result));
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// Get books by title
public_users.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();

    const result = Object.entries(books).filter(
      ([isbn, book]) => book.title.toLowerCase() === title
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found for this title" });
    }

    return res.status(200).json(Object.fromEntries(result));
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

module.exports = public_users;
