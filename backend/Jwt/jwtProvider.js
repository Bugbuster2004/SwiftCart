const jwt = require("jsonwebtoken");

const SECRET_KEY = "sid";
//this method generated a token using user id and secret key
const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

//now we want the userid from the token so that we can verify the token

const getUserIdfromToken = async (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdfromToken };
