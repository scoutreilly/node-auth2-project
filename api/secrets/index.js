/**
  Fix this module so other modules can require JWT_SECRET into them.
  Use the || operator to fall back to the string "shh" to handle the situation
  where the process.env does not have JWT_SECRET.

  If no fallback is provided, TESTS WON'T WORK and other
  developers cloning this repo won't be able to run the project as is.
 */
const JWT = require("jsonwebtoken");
// process.env is only available on Heroku, devs use "keepitsafe"
const JWT_SECRET = process.env.JWT_SECRET || "keepitsafe";

const makeToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  // 20s - seconds you can do y - years d - days and so on
  const options = {
    expiresIn: "200s",
  };
  return JWT.sign(payload, JWT_SECRET, options);
};

module.exports = {
  makeToken,
  JWT_SECRET,
};
