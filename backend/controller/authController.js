const userService = require("../services/userService");
const cartservice = require("../services/cartService");
const jwtProvider = require("../Jwt/jwtProvider");
const brcypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = await jwtProvider.generateToken(user._id);

    await cartservice.createCart(user);
    return res.status(200).send({ jwt, message: "register success" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.fetchUserByEmail({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found " });
    }

    const isPasswordValid = await brcypt.compare(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password " });
    }
    const jwt = await jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "Login Success" });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = { register, login };
