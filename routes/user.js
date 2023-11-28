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

// router.post("/validation", UserController.)
// router.get("/:user_id", (req, res, next) => {
//   const sql = "select * from users where user_id=" + req.params.user_id;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// //회원 가입
// router.post("/signup", (req, res, next) => {
//   let sql = "select account from users where account=?";
//   let params = [req.body.account];
//   db.query(sql, params, (err, results) => {
//     if (err) throw err;
//     if (results.length > 0) {
//       return res.status(400).json({
//         message: "이미 사용중인 계정입니다.",
//       });
//     } else {
//       sql = "insert into users (account, password, name) values (?, ?, ?)";
//       params = [req.body.account, req.body.password, req.body.name];
//       db.query(sql, params, (err, results) => {
//         if (err) throw err;
//         return res.status(200).json({
//           message: "회원 가입을 성공하였습니다.",
//         });
//       });
//     }
//   });
// });

// // account 동일한지 비교 후 password 비교
// router.post("/login", (req, res, next) => {
//   const sql = "select * from users where account= ?";
//   const params = [req.body.account];
//   console.log(req.body.account, req.body.password);
//   db.query(sql, params, (err, results) => {
//     if (err) throw err;

//     if (results.length > 0) {
//       if (results[0].password === req.body.password) {
//         return res.status(200).json({
//           message: "로그인 성공했습니다.",
//           user_id: results[0].user_id,
//         });
//       } else {
//         return res.status(400).json({ errorMessage: "비밀번호가 다릅니다." });
//       }
//     } else {
//       return res.status(400).json({ message: "존재하지 않은 계정입니다." });
//     }
//   });
// });

// // 존재하는 account인지 여부 확인
// router.post("/validation", (req, res, next) => {
//   const sql = "select account from users where account=?";
//   const params = [req.body.account];
//   console.log(params);
//   db.query(sql, params, (err, results) => {
//     if (err) throw err;
//     if (results.length > 0) {
//       return res
//         .status(400)
//         .json({ errorMessage: "이미 사용중인 계정입니다." });
//     } else {
//       return res.status(200).json({ message: "사용 가능한 계정입니다." });
//     }
//   });
// });

// // 회원정보 수정 (patch)
// router.patch("/:user_id", (req, res, next) => {
//   let sql = "select * from users where user_id=" + req.params.user_id;
//   const body = [req.body.password, req.body.name];
//   console.log(body);
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res
//         .status(400)
//         .json({ errorMessage: "계정이 존재하지 않습니다." });
//     } else {
//       let sql =
//         "update users set password = ?,name = ? where user_id=" +
//         req.params.user_id;
//       db.query(sql, body, (err, results) => {
//         if (err) throw err;
//         return res
//           .status(200)
//           .json({ message: "사용자 정보가 변경되었습니다." });
//       });
//     }
//   });
// });

// // 회원 탈퇴
// router.delete("/:user_id", (req, res, next) => {
//   let sql = "select  * from users where user_id=" + req.params.user_id;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       return res
//         .status(400)
//         .json({ errorMessage: "계정이 존재하지 않습니다." });
//     } else {
//       let sql = "delete from users where user_id=" + req.params.user_id;
//       db.query(sql, (err, results) => {
//         if (err) throw err;
//         return res.status(200).json({ message: "성공적으로 삭제되었습니다." });
//       });
//     }
//   });
// });

module.exports = router;
