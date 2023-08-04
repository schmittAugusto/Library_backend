module.exports = (app) => {
  const genre = require("../controllers/genres.controller.js");

  var router = require("express").Router();

  // Create a new Book
  router.post("/", genre.create);

  // Retrieve all Books
  router.get("/", genre.findAll);

  // Retrieve all published Books
  router.get("/published", genre.findAllPublished);

  // Retrieve a single Book with id
  router.get("/:id", genre.findOne);

  // Update a Book with id
  router.put("/:id", genre.update);

  // Delete a Book with id
  router.delete("/:id", genre.delete);

  // Delete all Book
  router.delete("/", genre.deleteAll);

  app.use("/api/genres", router);
};
