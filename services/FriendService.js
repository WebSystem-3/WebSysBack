const conn = require("../config/db.config.js");
const FriendModel = require("../models/FriendModel.js");
const UserModel = require("../models/UserModel.js");
const TaskModel = require("../models/TaskModel.js");
module.exports = {
  findFriendsByUserId1: async (user_id1) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id1];
      const friend = await db.query(FriendModel.findFriendsByUserId1, param);
      return friend[0];
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
        return friend[0];
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
      return friend[0].affectedRows;
    } catch (err) {
      throw err;
    }
  },
  getFriendTask: async (user_id2) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id2];
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDay();
      console.log(year + "-" + month + "-" + day);
      // const friend = await db.query(TaskModel.)
    } catch (err) {
      throw err;
    }
  },
  findFriendsByUserId1AndUserId2: async (user_id1, user_id2) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id1, user_id2];
      const friend = await db.query(
        FriendModel.findFriendsByUserId1AndUserId2,
        param
      );
      if (friend[0].length) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
  isValidUserId2: async (user_id2) => {
    try {
      if (user_id2 === "user") {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  },
};
