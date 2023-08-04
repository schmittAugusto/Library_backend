const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const db = require("./app/models");

const Role = db.role;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connected to the database!");
  })

  .catch((err) => {
    console.log("Cannot connect to the database!", err);

    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

var corsOptions = {
  origin: ["https://library-application-backend.onrender.com", "https://main--precious-donut-b7dbe4.netlify.app"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  Headers:['Content-Type', 'Authorization'],
  
};

app.use(cors(corsOptions));
app.get('/private', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'https://main--precious-donut-b7dbe4.netlify.app')
  res.set('Access-Control-Allow-Credentials', 'true')
  res.set('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
  res.setHeader('Permissions-Policy', 'browsing-topics=*')
  if(req.session.loggedIn === true) {
    res.send('THIS IS THE SECRET')
  } else {
    res.send('Please login first')
  }
});

app.get('/public', function(req, res) {
  res.set('Access-Control-Allow-Origin', 'https://main--precious-donut-b7dbe4.netlify.app')
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
  res.setHeader('Permissions-Policy', 'browsing-topics=*')
  res.send(JSON.stringify({
    message: 'This is public info'
  }))
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "Library-session",
    secret: "LIBRARY_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

/*
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3031"],
  })
);
*/

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Library application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/books.routes")(app);
require("./app/routes/genres.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
