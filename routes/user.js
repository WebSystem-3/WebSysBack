var express = require("express");
const UserController = require("../controller/UserController");
var router = express.Router();

router.get("/:user_id", UserController.getUserInfo);
router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginRequest);
router.post("/validation", UserController.validationAccount);
router.patch("/:user_id", UserController.updateUser);
router.delete("/:user_id", UserController.deleteUser);
router.get("/:user_id/logout", UserController.logoutUser);

module.exports = router;
