const UserModel = require("../models/UserModel.js");
const conn = require("../config/db.config.js");

module.exports = {
  getUserInfo: async (user_id) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id];
      const user = await db.query(UserModel.findUserByUserId, param);
      return user;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (account, password, name) => {
    try {
      console.log(account);
      const db = await conn.getConnection();
      const param = [account, password, name];
      const user = await db.query(UserModel.createUser, param);
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (user_id, password, name) => {
    try {
      const db = await conn.getConnection();
      const param = [password, name, user_id];
      const user = await db.query(UserModel.updateUser, param);
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (user_id) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id];
      const task = await db.query(UserModel.deleteAllTaskByUserId, param);
      const user = await db.query(UserModel.deleteUserByUserId, param);
    } catch (err) {
      throw err;
    }
  },
  loginUser: async (account, password) => {
    try {
      const db = await conn.getConnection();
      const param = [account];
      user = await db.query(UserModel.findUserByAccount, param);
      if (user[0].length === 0) {
        return false;
      }
      if (user[0][0].password !== password) {
        return false;
      } else {
        return user[0][0].user_id;
      }
    } catch (err) {
      throw err;
    }
  },
  validationAccount: async (account) => {
    try {
      const db = await conn.getConnection();
      const param = [account];
      const user = await db.query(UserModel.findUserByAccount, param);
      if (user.length > 0) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  },
};
