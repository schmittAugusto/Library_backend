const dbConfig = require("../config/db.config.js"); //the first line imports the `dbConfig` module from the "../config/db.config.js" file. It likely contains the configuration details for the MongoDB database, such as the URL.
const mongoose = require("mongoose"); //the `mongoose` module is imported on the next line. It is the main library used for interacting with MongoDB in this code.

mongoose.Promise = global.Promise; //sets the Mongoose promise library to the global promise library. This ensures that Mongoose uses the same promises as the rest of your application.

const db = {}; //an empty object called `db` is created to store various properties related to the database configuration.

db.mongoose = mongoose; //assigns the imported `mongoose` object to `db.mongoose`. This allows other modules that import this `db` module to access the Mongoose library.

db.user = require("./user.model"); //scripts
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];

db.url = dbConfig.url; //assigns the database URL from the `dbConfig` module to `db.url`. This URL specifies the location of the MongoDB database.

db.books = require("./books.model.js")(mongoose); //imports the books model from the "./books.model.js" file and immediately calls it with the `mongoose` object as an argument. This is likely a function that defines the product schema and returns a Mongoose model for the "books" collection.
db.genre = require("./genres.model.js")(mongoose);
db.refreshToken = require("./refreshToken.model");

module.exports = db; //exports the `db` object so that other modules can import and use it.
