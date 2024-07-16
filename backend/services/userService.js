const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const Jwtprovider = require("../Jwt/jwtProvider");

//this is basically like a signup to create a user
const createUser = async (userData) => {
  let { name, email, password } = userData;

  const existinguser = await userModel.findOne({ email });
  try {
    if (existinguser) {
      // return res.status(400).send({ message: "User already exist" });
      throw new Error("user already exist with this email");
    }
    password = await bcrypt.hash(password, 4);
    const newuser = await userModel.create({ name, email, password });
    // if (newuser) {
    //   console.log(newuser);
    //   return res.status(200).send({ message: newuser });
    // }
    return newuser;
  } catch (error) {
    // return res.send({ message: error.message });
    throw new Error(error.message);
  }
};

//fetching users by id
const fetchUserById = async (userId) => {
  try {
    console.log("Fetching user by ID:", userId); // Log the user ID

    const user = await userModel.findById(userId);
    console.log("this is from id ", user);

    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID");
  }
};

//fetching user by email
const fetchUserByEmail = async (email) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found by email");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
//getting user profile by token for this we need to first generate a token and then we need to verify that token that is created in the Jwt folder now we will just import and use thta in our fncn

const getUserProfileByToken = async (token) => {
  try {
    const userId = await Jwtprovider.getUserIdfromToken(token);
    const user = await fetchUserById(userId);
    console.log("User ID from token:", userId); // Log the extracted user ID

    if (!user) {
      throw new Error("User not found by ID");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
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
