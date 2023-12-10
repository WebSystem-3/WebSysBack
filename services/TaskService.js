const conn = require("../config/db.config.js");
const TaskModel = require("../models/TaskModel.js");

module.exports = {
  findTaskByUserIdAndTaskDate: async (user_id, task_date) => {
    try {
      const db = await conn.getConnection();
      const param = [user_id, task_date];
      const task = await db.query(TaskModel.findTaskByUserIdAndTaskDate, param);
      return task[0];
    } catch (err) {
      throw err;
    }
  },
  createTask: async (user_id, task_name, task_date) => {
    try {
      const db = await conn.getConnection();
      let param = [user_id, task_name, task_date];
      const task = await db.query(TaskModel.createTask, param);
      if (task[0].affectedRows) {
        param = [user_id, task_date];
        const res = await db.query(
          TaskModel.findTaskByUserIdAndTaskDate,
          param
        );
        return res[0];
      }
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
      return true;
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
      const tasks = await db.query(TaskModel.findTaskBetweenDate, param);

      const taskDetail = tasks[0].map((task) => {
        let total_time;
        if (task.total_task_time.length === 5) {
          total_time = "0" + task.total_task_time;
        } else {
          total_time = task.total_task_time;
        }
        console.log(total_time);
        const [hours, minutes, seconds] = total_time.match(/.{1,2}/g);
        console.log(hours, minutes);
        const result = parseInt(hours * 60) + parseInt(minutes);
        return {
          task_date: task.task_date,
          total_task_time: result,
        };
      });
      return taskDetail;
    } catch (err) {
      throw err;
    }
  },
  isValidDate: async (task_date) => {
    try {
      const date = new Date(task_date);
      return date.toString() !== "Invalid Date";
    } catch (err) {
      throw err;
    }
  },
  isValidMonth: async (start_date, end_date) => {
    try {
      const date1 = new Date(start_date);
      const date2 = new Date(end_date);
      const start_month = date1.getMonth();
      const end_month = date2.getMonth();
      if (start_month !== end_month) {
        return false;
      }
      let differenceBetweenStartAndEnd = date2 - date1;

      if (differenceBetweenStartAndEnd < 0) {
        return false;
      }
      differenceBetweenStartAndEnd = Math.abs(differenceBetweenStartAndEnd);
      differenceBetweenStartAndEnd =
        differenceBetweenStartAndEnd / (1000 * 60 * 60 * 24);

      console.log("diff: ", differenceBetweenStartAndEnd);
      if (
        start_month === 1 ||
        start_month === 3 ||
        start_month === 5 ||
        start_month === 7 ||
        start_month === 8 ||
        start_month === 10 ||
        start_month === 12
      ) {
        if (differenceBetweenStartAndEnd > 31) {
          return false;
        }
      } else if (
        start_month === 4 ||
        start_month === 6 ||
        start_month === 9 ||
        start_month === 11
      ) {
        if (differenceBetweenStartAndEnd > 30) {
          return false;
        }
      } else {
        if (differenceBetweenStartAndEnd > 28) {
          return false;
        }
      }
      return true;
    } catch (err) {
      throw err;
    }
  },
};
