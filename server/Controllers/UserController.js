const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const { createToken } = require("../Utils/CreateToken");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all credentials needs to be filled");
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  try {
    if (user && (await user.checkPassword(password))) {
      createToken(res, user._id);
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        message: `user ${user.name} logged in succesfully`,
      });
    } else {
      res.status(400).json({
        message: "email  and password didnt match",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `login failed: ${error}`,
    });
  }
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("all credentials needs to be filled");
  }
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("user already registered");
  }
  const newUser = await new User({
    name,
    email,
    password,
  });
  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(200).json({
      id: _id,
      name,
      email,
      
    });
  } catch (error) {
    res.status(500).json({ messgae: "internal server error", error });
  }
});
const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  // Find the user in the database to ensure the user exists
  const newUser = await User.findById(user._id).select("-password");

  if (newUser) {
    res.status(200).json(newUser);
  } else {
    res.status(400).json({
      message: "Access denied",
    });
  }
});
module.exports = {
  login,
  register,
  getMe,
};
