const { model, Schema } = require("mongoose");

// We define out Schema with all the properties that this object will contain
const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
  createdAt: String,
});

// A model is a class with which we construct documents.
// In this case, each document will be a user
// with properties and behaviors as declared in our schema.

// we are exporting a document
module.exports = model("User", userSchema, "users");
