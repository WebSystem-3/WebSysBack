const conn = require("../config/db.config.js");
const FriendModel = require("../models/FriendModel.js");
const UserModel = require("../models/UserModel.js");
const TaskModel = require("../models/TaskModel.js");
module.exports = {
  findFriendsByUserId1: async (user_id1) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id1];
      const friends = await db.query(FriendModel.findFriendsByUserId1, param);
      const freindsDetail = await Promise.all(
        friends[0].map(async (friend) => {
          const param = [friend.user_id2];
          const userDetails = await db.query(
            UserModel.findUserIdAndNameByUserId,
            param
          );
          return {
            user_id: userDetails[0][0].user_id,
            name: userDetails[0][0].name,
          };
        })
      );
      db.release();
      return freindsDetail;
    } catch (err) {
      throw err;
    }
  },
  findFriendsByAccount: async (account) => {
    try {
      const db = await conn.getConnection();
      const param = [account];
      const friend = await db.query(UserModel.findUserByAccount, param);
      if (friend[0].length === 0) {
        return false;
      }
      const res = {
        user_id: friend[0][0].user_id,
        account: friend[0][0].account,
        name: friend[0][0].name,
      };
      db.release();
      return res;
    } catch (err) {
      throw err;
    }
  },
  createFriend: async (user_id1, user_id2) => {
    try {
      const db = await conn.getConnection();
      let param = [user_id1, user_id2];
      let friend = await db.query(FriendModel.createFriend, param);
      param = [user_id2, user_id1];
      friend = await db.query(FriendModel.createFriend, param);
      db.release();
      return true;
    } catch (err) {
      throw err;
    }
  },
  deleteFriend: async (user_id1, user_id2) => {
    try {
      const db = await conn.getConnection();
      let param = [user_id1, user_id2];
      let friend = await db.query(FriendModel.deleteFriend, param);
      param = [user_id2, user_id1];
      friend = await db.query(FriendModel.deleteFriend, param);
      db.release();
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
      db.release();
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
