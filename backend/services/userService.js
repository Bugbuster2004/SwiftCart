const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const Jwtprovider = require("../Jwt/jwtProvider");

//this is basically like a signup to create a user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existinguser = await userModel.findOne({ email });
  try {
    if (existinguser) {
      return res.status(400).send({ message: "User already exist" });
    }
    password = await bcrypt.hash(password, 4);
    const newuser = await userModel.create({ name, email, password });
    if (newuser) {
      console.log(newuser);
      return res.status(200).send({ message: newuser });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

//fetching users by id
const fetchUserById = async (userId, res) => {
  try {
    const user = await userModel.findById(userId).populate("address");
    if (!user) {
      return res.status(400).send({ message: "User not found by id" });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

//fetching user by email
const fetchUserByEmail = async (email, res) => {
  try {
    const user = await userModel.findOne(email);
    if (!user) {
      return res.status(400).send({ message: "User not found by email" });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};
//getting user profile by token for this we need to first generate a token and then we need to verify that token that is created in the Jwt folder now we will just import and use thta in our fncn

const getUserProfileByToken = async (token, res) => {
  try {
    const userId = await Jwtprovider.getUserIdfromToken(token);
    const user = await fetchUserById(userId);
    if (!user) {
      return res.status(400).send({ message: "User not found by id" });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    return user;
  } catch (error) {
    return res.send({ message: error.message });
  }
};

module.exports = {
  createUser,
  fetchUserById,
  fetchUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
