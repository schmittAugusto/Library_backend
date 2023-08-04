const db = require("../models");

const Genres = db.genre;

// Create and Save new Genres

exports.create = (req, res) => {
  // Validate request

  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });

    return;
  }

  // Create a genre

  const genre = new Genres({
    title: req.body.title,
  });

  // Save Genres in the database

  Genres.save(genre)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the book.",
      });
    });
};

// Retrieve all genres from the database.

exports.findAll = (req, res) => {
  const title = req.query.title;

  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Genres.find(condition)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    });
};

// Find a single Genre with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genres.findById(id)

    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Genres with id " + id });
      else res.send(data);
    })

    .catch((err) => {
      res

        .status(500)

        .send({ message: "Error retrieving Book with id=" + id });
    });
};

// Update a Genre by the id in the request

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Genres.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Book with id=${id}. Maybe Genres was not found!`,
        });
      } else res.send({ message: "Genres was updated successfully." });
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error updating Book with id=" + id,
      });
    });
};

// Delete a Genre with the specified id in the request

exports.delete = (req, res) => {
  const id = req.params.id;

  Genres.findByIdAndRemove(id)

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`,
        });
      } else {
        res.send({
          message: "Genre was deleted successfully!",
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Genre with id=" + id,
      });
    });
};

// Delete all Genres from the database.

exports.deleteAll = (req, res) => {
  Genres.deleteMany({})

    .then((data) => {
      res.send({
        message: `${data.deletedCount} Genres were deleted successfully!`,
      });
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all genres.",
      });
    });
};

// Find all published Genres

exports.findAllPublished = (req, res) => {
  Genres.find({ published: true })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving genres.",
      });
    });
};
