module.exports = {
  findUserByAccount: "SELECT * FROM users WHERE account=?",
  findUserByUserId: "SELECT * FROM users WHERE user_id=?",
  createUser: "INSERT INTO users (account, password, name) VALUES (?, ?, ?)",
  updateUser: "UPDATE users SET password=?, name=? WHERE user_id=?",
  deleteUserByUserId: "DELETE FROM users WHERE user_id=?",
};
