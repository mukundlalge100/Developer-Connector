const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");
const db = require("./config/Keys").MONGODB_URI;

const passport = require("passport");

const userRoutes = require("./routes/api/Users");
const profileRoutes = require("./routes/api/Profiles");
const postRoutes = require("./routes/api/Posts");

// CORS SETTING ...
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,PUT,POST,GET,PATCH,DELETE"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization"
  );
  next();
});

// BODY PARSER MIDDLEWARE ...
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// DB CONNECTION ...
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected!"))
  .catch(error => console.error(error));

// JWT CONFIG ...
require("./config/passport")(passport);

// USER,PROFILE,POST ROUTES MIDDLEWARE...
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postRoutes);

// SERVER STATIC ASSETS IF IN PRODUCTION ...
if (process.env.NODE_ENV === "production") {
  // SET STATIC FOLDER ...
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
