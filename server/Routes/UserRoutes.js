const express = require("express");
const { login, register, getMe } = require("../Controllers/UserController");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me",protect,getMe);

module.exports = router;
