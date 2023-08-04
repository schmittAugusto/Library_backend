//CRUD operations

const db = require("../models");

const Books = db.books;

// Create and Save a new Book

exports.create = (req, res) => {
  // Validate request

  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });

    return;
  }

  // Create a Book

  const book = new Books({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genres: req.body.genres,
    ISBN: req.body.ISBN,
    availability: req.body.availability,
    publisher: req.body.publisher,
    //availability: req.body.availability ? req.body.availability : false,
    //if boolean
  });

  // Save a Book in the database
  Books.create(book)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the book.",
      });
    });
};

// Retrieve all books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Books.find(condition)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Books.findById(id)

    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found book with id " + id });
      else res.send(data);
    })

    .catch((err) => {
      res

        .status(500)

        .send({ message: "Error retrieving book with id=" + id });
    });
};

// Update a book by the id in the request

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Books.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update book with id=${id}. Maybe book was not found!`,
        });
      } else res.send({ message: "Book was updated successfully." });
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error updating book with id=" + id,
      });
    });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Books.findByIdAndRemove(id)

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete book with id=${id}. Maybe book was not found!`,
        });
      } else {
        res.send({
          message: "Book was deleted successfully!",
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id,
      });
    });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
  Books.deleteMany({})

    .then((data) => {
      res.send({
        message: `${data.deletedCount} Books were deleted successfully!`,
      });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Books.",
      });
    });
};

// Find all published Books
exports.findAllPublished = (req, res) => {
  Books.find({ published: true })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    });
};
