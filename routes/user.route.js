const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validateToken = require("../middlewares/auth.middleware")

router.post("/registration", userController.register);
router.post("/login", userController.login);

module.exports = router;