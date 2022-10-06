const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  userName: String,
  createdAt: String,
  comments: [
    {
      body: String,
      userName: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      userName: String,
      createdAt: String,
    },
  ],
  //   user: Schema.Types.ObjectId,
  //   ref: "user",
});

module.exports = model("Post", postSchema, "posts");
