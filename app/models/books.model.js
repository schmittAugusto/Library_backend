module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    genres: String,
    ISBN: Number,
    publisher: String,
    availability: String, //check if its boolean after
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });

  const Books = mongoose.model("books", schema);

  return Books;
};
