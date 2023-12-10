const UserModel = require("../models/UserModel.js");
const conn = require("../config/db.config.js");
const bcrypt = require("bcrypt"); //모듈 불러오기

module.exports = {
  getUserInfo: async (user_id) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id];
      const user = await db.query(UserModel.findUserByUserId, param);
      db.release();
      return user;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (account, password, name) => {
    try {
      const db = await conn.getConnection();
      const hashedPassword = await bcrypt.hash(password, 10);
      const param = [account, hashedPassword, name];

      let user = await db.query(UserModel.findUserByAccount, param);
      db.release();
      if (user[0].length) {
        return false;
      } else {
        user = await db.query(UserModel.createUser, param);
        db.release();
        return true;
      }
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (user_id, password, name) => {
    try {
      const db = await conn.getConnection();
      const hashedPassword = await bcrypt.hash(password, 10);
      const param = [hashedPassword, name, user_id];
      const user = await db.query(UserModel.updateUser, param);
      db.release();
      return user[0].affectedRows;
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (user_id) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id];
      const task = await db.query(UserModel.deleteAllTaskByUserId, param);
      db.release();
      const user = await db.query(UserModel.deleteUserByUserId, param);
      db.release();
    } catch (err) {
      throw err;
    }
  },
  loginUser: async (account, password) => {
    try {
      const db = await conn.getConnection();
      const param = [account];
      user = await db.query(UserModel.findUserByAccount, param);
      db.release();
      if (user[0].length === 0) {
        return false;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user[0][0].password
      );

      if (!isPasswordValid) {
        return false;
      } else {
        return user[0];
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
      db.release();
      if (user[0].length > 0) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  },
};
