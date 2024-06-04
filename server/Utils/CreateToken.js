const jwt = require("jsonwebtoken");

const createToken = (res, id) => {
  const payload = { id };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict", // to prevent CSRF attacks
    maxAge: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
  });
};

module.exports = { createToken };
