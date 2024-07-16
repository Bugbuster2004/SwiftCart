const userService = require("../services/userService");

const getUserProfile = async (req, res) => {
  try {
    console.log(req.headers);
    const jwt = req.headers.authorization?.split(" ")[1];
    // if (typeof jwt === "string") console.log(jwt);

    if (!jwt) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const user = await userService.getUserProfileByToken(jwt); // Pass the token directly
    return res.status(200).send({ message: "User profile found", user });
  } catch (error) {
    console.error("Error in getUserProfile:", error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

//fetching all users controller

const getAllUsers = async (req, res) => {
  try {
    const user = await userService.getAllUsers();
    return res.status(200).send({ message: "All users found", user: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUserProfile, getAllUsers };
