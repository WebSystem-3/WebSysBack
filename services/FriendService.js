const conn = require("../config/db.config.js");
const FriendModel = require("../models/FriendModel.js");
const UserModel = require("../models/UserModel.js");
module.exports = {
  findFriendsByUserId1: async (user_id1) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id1];
      const friend = await db.query(FriendModel.findFriendsByUserId1, param);
      return friend;
    } catch (err) {
      throw err;
    }
  },
  findFriendsByAccount: async (account) => {
    try {
      const db = await conn.getConnection();
      const param = [account];
      const friend = await db.query(UserModel.findUserByAccount, param);
      if (friend) {
        return friend;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
  createFriend: async (user_id1, user_id2) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id1, user_id2];
      const friend = await db.query(FriendModel.createFriend, param);
      return true;
    } catch (err) {
      throw err;
    }
  },
  deleteFriend: async (user_id1, user_id2) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id1, user_id2];
      const friend = await db.query(FriendModel.deleteFriend, param);
      return true;
    } catch (err) {
      throw err;
    }
  },
};
