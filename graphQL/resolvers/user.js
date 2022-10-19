const User = require("../../models/User");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async register(
      _,
      { registerInput: { userName, password, confirmPassword, email } },
      context,
      info
    ) {
      // Validate user data
      // Make sure user does not exist
      // hash password
      const hashedPassword = await hash(password, 12);

      const newUser = new User({
        userName,
        password: hashedPassword,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = sign(
        {
          id: res.id,
          email: res.email,
          userName: res.userName,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { ...res._doc, id: res._id, token };
    },
  },
};
