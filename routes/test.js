// routes/test.js
const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.post("/test-login", UserController.testLogin);

module.exports = router;
