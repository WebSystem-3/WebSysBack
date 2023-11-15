var express = require("express");
var router = express.Router();
const db = require("../config/db.config.js");

// 유저 정보 조회 (GET)
router.get("/info/:id", (req, res, next) => {
  const sql = "select * from users where user_id=" + req.params.id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//회원 가입
router.post("/signup", (req, res, next) => {
  const sql = "insert into users (account, password, name) values (?, ?, ?)";
  const params = [req.body.account, req.body.password, req.body.name];
  db.query(sql, params, (err, results) => {
    if (err) throw err;
    res.status(200).json({
      message: "회원가입을 성공하였습니다."
    })
  });
});

// account 동일한지 비교 후 password 비교
router.post("/login", (req, res, next) => {
  const sql = "select * from users where account= ?";
  const params = [req.body.account];
  db.query(sql, params, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      if (results[0].password === req.body.password) {
        return res.status(200).json({
          message: "로그인 성공했습니다.",
          user_id: results[0].user_id,
        });
      } else {
        return res.status(500).json({ message: "비밀번호가 다릅니다." });
      }
    } else {
      return res.status(500).json({ message: "존재하지 않은 계정입니다." });
    }
  });
});

// 존재하는 account인지 여부 확인
router.post("/validation", (req, res, next) => {
  const sql = "select account from users where account=?";
  const params = [req.body.account];
  db.query(sql, params, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(500).json({ message: "이미 사용중인 계정입니다." });
    } else {
      return res.status(200).json({ message: "사용 가능한 계정입니다." });
    }
  });
});

// 회원정보 수정 (patch)
router.patch("/edit/:id", (req, res, next) => {
  let sql = "select * from users where user_id=" + req.params.id;
  const body = [req.body.password, req.body.name];
  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(500).json({ message: "계정이 존재하지 않습니다." });
    } else {
      let sql =
        "update users set password = ?,name = ? where user_id=" + req.params.id;
      db.query(sql, body, (err, results) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ message: "사용자 정보가 변경되었습니다." });
      });
    }
  });
});

// 회원 탈퇴
router.delete("/delete/:id", (req, res, next) => {
  let sql = "select  * from users where user_id=" + req.params.id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(500).json({ message: "계정이 존재하지 않습니다." });
    } else {
      let sql = "delete from users where user_id=" + req.params.id;
      db.query(sql, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ message: "성공적으로 삭제되었습니다." });
      });
    }
  });
});
module.exports = router;
