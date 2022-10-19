const User = require("../../models/User");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
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
      { registerInput: { userName, password, confirmPassword, email } }
    ) {
      // Validate user data
      const { errors, valid } = validateRegisterInput(
        userName,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Make sure user does not exist
      const user = await User.findOne({ email });

      if (user)
        throw new UserInputError("User already registered", {
          errors: {
            email: "This email is taken",
          },
        });

      // hash password
      const hashedPassword = await hash(password, 12);

      const newUser = new User({
        userName,
        password: hashedPassword,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return { ...res._doc, id: res._id, token };
    },
    async login(_, { loginInput: { userName, password } }) {
      const { errors, valid } = validateLoginInput(userName, password);
  
      if (!valid) {
        throw new UserInputError("Login not valid", { errors });
      } else {
        const user = await User.findOne({ userName });
  
        if (!user) {
          errors.general = "User not found";
          throw new UserInputError("User not found", { errors });
        }
  
        const match = await compare(password, user.password);
  
        if (!match) {
          errors.general = "Wrong credentials";
          throw new UserInputError("Wrong credentials", { errors });
        }
  
        const token = generateToken(user);
  
        return { ...user._doc, id: user._id, token };
      }
    },
  },
};

function generateToken(user) {
  return sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
