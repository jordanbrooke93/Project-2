
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
var hbs = exphbs.create({
  helpers: {
    firstTwenty: function (arr) {

      return arr.slice(0, 19);
    },
    jsonStringify: function (ob) {
      return JSON.stringify(ob)
    }
  }
})




// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };


// if (process.env.JAWSDB_URL) {
//   db.sequelize.sync(syncOptions).then(function () {
//     app.listen(process.env.JAWSDB_URL)
//   })
// } else {

  db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
      );
    });
  });
// }



module.exports = app;