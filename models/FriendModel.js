module.exports = {
  findFriendsByUserId1: "SELECT * FROM friends WHERE user_id1=?",
  findFriendsByUserId2: "SELECT * FROM friends WHERE user_id2=?",
  findFriendsByUserId1AndUserId2:
    "SELECT * FROM friends WHERE user_id1=? AND user_id2=?",
  createFriend: "INSERT INTO friends (user_id1, user_id2) VALUES (?, ?)",
  deleteFriend: "DELETE FROM friends WHERE user_id1=? AND user_id2=?",
};
