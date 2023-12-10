var express = require("express");
var router = express.Router();
const FriendController = require("../controller/FriendController.js");

router.get("/:user_id1/friend", FriendController.findFriendsByUserId1);
router.get("/:user_id1/search/:account", FriendController.findFriendsByAccount);
router.post("/:user_id1/friend", FriendController.createFriend);
router.delete("/:user_id1/friend/:user_id2", FriendController.deleteFriend);

module.exports = router;
