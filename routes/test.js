// routes/test.js
const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.get("/test-login", UserController.testLogin);

module.exports = router;
