const conn = require("../config/db.config.js");
const TaskModel = require("../models/TaskModel.js");

module.exports = {
  findTaskByUserIdAndTaskDate: async (user_id, task_date) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id, task_date];
      const task = await db.query(TaskModel.findTaskByUserIdAndTaskDate, param);
      return task;
    } catch (err) {
      throw err;
    }
  },
  createTask: async (user_id, task_name, task_date) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id, task_name, task_date];
      const task = await db.query(TaskModel.createTask, param);
    } catch (err) {
      throw err;
    }
  },
  updateTask: async (task_name, task_id) => {
    try {
      const db = await conn.getConnection();
      const param = [task_name, task_id];
      const task = await db.query(TaskModel.updateTask, param);

      if (task.length === 0) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      throw err;
    }
  },
  updateTaskTime: async (user_id, task_id, task_time) => {
    try {
      const db = await conn.getConnection();
      const param = [task_time, task_id];
      const task = await db.query(TaskModel.updateTaskTime, param);
    } catch (err) {
      throw err;
    }
  },
  deleteTask: async (task_id) => {
    try {
      const db = await conn.getConnection();
      const param = [task_id];
      const task = await db.query(TaskModel.deleteTask, param);
      return true;
    } catch (err) {
      throw err;
    }
  },
  findTaskBetweenDate: async (user_id, start_date, end_date) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id, start_date, end_date];
      const task = await db.query(TaskModel.findTaskBetweenDate, param);

      return task[0];
    } catch (err) {
      throw err;
    }
  },
};
