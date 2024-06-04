const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(403).json({ message: "User access denied" });
    }

    req.user = user; // Attach the user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "User access denied" });
  }
};

module.exports = {
  protect,
};
