var express = require("express");
var router = express.Router();
const FriendController = require("../controller/FriendController.js");

router.get("/:user_id1/friend", FriendController.findFriendsByUserId1);
router.get("/:user_id1/search/:account", FriendController.findFriendsByAccount);
router.post("/:user_id1/friend", FriendController.createFriend);
router.delete("/:user_id1/friend/:user_id2", FriendController.deleteFriend);
// router.get("/:user_id1/friend/:user_id2/task", FriendController.getFriendTask);
// friend 조회
// router.get("/:user_id1/friend", (req, res, next) => {
//   let sql = "select * from friends where user_id1 =" + req.params.user_id1;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// // friend 추가
// router.post("/:user_id1/friend/:user_id2", (req, res, next) => {
//   let sql = "select * from users where user_id1 =" + req.params.user_id1;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res.status(400).json({
//         errorMessage: "해당 하는 사용자가 존재하지 않습니다.",
//       });
//     }
//   });
//   sql = "select * from users where user_id2=" + req.params.user_id2;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res.status(400).json({
//         errorMessage: "해당 하는 사용자가 존재하지 않습니다.",
//       });
//     }
//   });
//   sql = "insert into friends (user_id1, user_id2) values (?, ?)";
//   const params = [req.params.user_id1, req.params.user_id2];
//   db.query(sql, params, (err, result) => {
//     if (err) throw err;
//     return res.status(200).json({
//       message: "친구 추가를 성공하였습니다.",
//     });
//   });
// });

// //friend 삭제
// router.delete("/:user_id1/friend/:user_id2", (req, res, next) => {
//   let sql = "select * from users where user_id1=" + req.params.user_id1;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res.status(400).json({
//         errorMessage: "해당하는 사용자가 존재하지 않습니다.",
//       });
//     }
//   });
//   sql = "select * from users where user_id2=" + req.params.user_id2;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res.status(400).json({
//         errorMessage: "해당하는 사용자가 존재하지 않습니다.",
//       });
//     }
//   });
//   sql =
//     "delete from friends where user_id1= " +
//     req.params.user_id1 +
//     " and user_id2=" +
//     req.params.user_id2;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     return res.status(200).json({
//       message: "성공적으로 삭제되었습니다.",
//     });
//   });
// });

// // 친구 테스크 조회
// router.get("/:user_id1/friend/:user_id2/task", (req, res, next) => {
//   let sql = "select * from users where user_id=" + req.params.user_id1;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res.status(400).json({
//         errorMessage: "해당하는 사용자가 존재하지 않습니다.",
//       });
//     }
//   });
//   sql = "select * from users where user_id=" + req.params.user_id2;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res.status(400).json({
//         errorMessage: "해당하는 사용자가 존재하지 않습니다.",
//       });
//     }
//   });
//   sql = "select * form tasks where user_id=" + req.params.user_id2;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     return res.status(200).json(results);
//   });
// });

module.exports = router;
