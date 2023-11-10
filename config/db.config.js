const mysql = require("mysql2");
const { connect } = require("../routes");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "seo75840311", // 본인에 해당하는 password로 수정
  database: "websys",
});

connection.connect((err) => {
  if (err) {
    console.error("Mysql 연결 오류" + err);
  } else {
    console.log("Mysql 연결 성공");
  }
});

module.exports = connection;
