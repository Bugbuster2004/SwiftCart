const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltrounds = 10;
    const hashedPass = await bcrypt.hash(password, saltrounds);
    return hashedPass;
  } catch (error) {
    console.log(error);
  }
};
const comparePassword = async (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};

module.exports = { hashPassword, comparePassword };

// import bcrypt from "bcrypt";

// export const hashPassword = async (password) => {
//   try {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const comparePassword = async (password, hashedPassword) => {
//   return bcrypt.compare(password, hashedPassword);
// };
