var express = require("express");
var router = express.Router();
const db = require("../config/db.config.js");

//task 조회
router.get("/:user_id/task/info/:task_id", (req, res, next) => {
  let sql =
    "select * from tasks where user_id=" +
    req.params.user_id +
    "and task_date=" +
    req.params.task_date;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//task 등록
router.post("/:user_id/task/add", (req, res, next) => {
  const sql =
    "insert into tasks (user_id, task_name, task_time, task_date) values (?, ?, ?, ?)";

  const params = [
    req.body.user_id,
    req.body.task_name,
    (req.body.task_time = "0"),
    req.body.task_date,
  ];

  db.query(sql, params, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(500).json({ message: "task 등록에 실패하였습니다.." });
    } else {
      return res.status(200).json({ message: "task가 등록되었습니다." });
    }
  });
});

//task 수정
router.patch("/:user_id/task/edit/:task_id", (req, res, next) => {
  let sql =
    "update tasks set task_name=" +
    req.params.task_name +
    "where task_id=" +
    req.params.task_id;

  const body = [req.body.task_name, req.body.task_date, req.body.task_time];

  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res
        .status(500)
        .json({ message: "등록된 task 수정을 실패하였습니다." });
    } else {
      let sql =
        "update tasks set task_name = ?,task_date = ?, task_time = ?, where task_id=" +
        req.params.task_id;
      db.query(sql, body, (err, results) => {
        if (err) throw err;
        return res.status(200).json({ message: "task 정보가 변경되었습니다." });
      });
    }
  });
});

//task 삭제
router.delete("/:user_id/task/delete/:task_id", (req, res, next) => {
  let sql = "delete from tasks where task_id=" + req.params.task_id;

  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(500).json({ message: "task가 존재하지 않습니다." });
    } else {
      let sql = "delete from tasks where task_name=" + req.params.task_name;
      db.query(sql, (err, results) => {
        if (err) throw err;
        return res
          .status(200)
          .json({ message: "task가 성공적으로 삭제되었습니다." });
      });
    }
  });
});

//calendar 색상 조회
router.get("/:user_id/task/time", (req, res, next) => {
  let sql =
    "select sum(task_time) from tasks where user_id=" +
    req.params.user_id +
    "and task_date=" +
    req.params.task_date;

  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res
        .status(500)
        .json({ message: "색상 정보를 불러오는 데 실패하였습니다." });
    } else {
      return res
        .status(200)
        .json({ message: "색상 정보를 불러오는 데 성공하였습니다." });
    }
  });
});

module.exports = router;
