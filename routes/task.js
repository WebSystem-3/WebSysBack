var express = require("express");
var router = express.Router();
const db = require("../config/db.config.js");

//task 조회
router.get("/:user_id/task", (req, res, next) => {
  let sql =
    "select * from tasks where user_id=" +
    req.params.user_id +
    " and task_date= ?";
  const params = [req.body.task_date];
  db.query(sql, params, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//task 등록
router.post("/:user_id/task", (req, res, next) => {
  let sql = "select * from users where user_id=" + req.params.user_id;
  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ errorMessage: "존재하지 않는 id입니다." });
    } else {
      sql =
        "insert into tasks (user_id, task_name, task_time, task_date) values (?, ?, 0, ?)";

      const params = [
        req.params.user_id,
        req.body.task_name,
        req.body.task_date,
      ];

      db.query(sql, params, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          return res
            .status(400)
            .json({ errorMessage: "task 등록에 실패하였습니다.." });
        } else {
          return res.status(200).json({ message: "task가 등록되었습니다." });
        }
      });
    }
  });
});

//task 수정
router.patch("/:user_id/task/:task_id", (req, res, next) => {
  let sql = "select * from users where user_id=" + req.params.user_id;

  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ errorMessage: "존재하지 않는 id입니다." });
    } else {
      sql = "update tasks set task_name=? where task_id=" + req.params.task_id;

      const body = [req.body.task_name];

      db.query(sql, body, (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          return res
            .status(400)
            .json({ errorMessage: "등록된 task 수정을 실패하였습니다." });
        } else {
          return res
            .status(200)
            .json({ message: "task 정보가 변경되었습니다." });
        }
      });
    }
  });
});

//task 삭제
router.delete("/:user_id/task/:task_id", (req, res, next) => {
  let sql = "select * from users where user_id=" + req.params.user_id;

  db.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ errorMessage: "존재하지 않는 id입니다." });
    } else {
      sql = "delete from tasks where task_id=" + req.params.task_id;

      db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
          return res
            .status(400)
            .json({ errorMessage: "task가 존재하지 않습니다." });
        } else {
          return res
            .status(200)
            .json({ message: "task가 성공적으로 삭제되었습니다." });
        }
      });
    }
  });
});

//calendar 색상 조회
router.get("/:user_id/task/time", (req, res, next) => {
  let sql =
    "select task_date, sum(task_time) AS total_task_time from tasks where user_id=" +
    req.params.user_id +
    " and task_date between ? and ? group by task_date order by task_date desc";
  const params = [req.body.start_date, req.body.end_date];
  db.query(sql, params, (err, results) => {
    if (err) throw err;
    console.log(results);
    return res.status(200).json(results);
  });
});

module.exports = router;
