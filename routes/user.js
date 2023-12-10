var express = require("express");
const UserController = require("../controller/UserController");
var router = express.Router();
// const db = require("../config/db.config.js");

router.get("/:user_id", UserController.getUserInfo);
router.post("/signup", UserController.createUser); // // 유저 정보 조회 (GET)
router.post("/login", UserController.loginRequest);
router.post("/validation", UserController.validationAccount);
router.patch("/:user_id", UserController.updateUser);
router.delete("/:user_id", UserController.deleteUser);
router.get("/:user_id/logout", UserController.logoutUser);

module.exports = router;
