const TaskService = require("../services/TaskService");

module.exports = {
  findTaskByUserIdAndTaskDate: async (req, res) => {
    const { user_id, task_date } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    if (!task_date) {
      return res.status(400).json({
        message: "날짜가 선택되지 않았습니다.",
      });
    }
    try {
      const result = await TaskService.findTaskByUserIdAndTaskDate(
        user_id,
        task_date
      );
      res.status(200).json(result);
    } catch (err) {
      throw err;
    }
  },
  createTask: async (req, res) => {
    const { user_id } = req.params;
    const { task_name, task_date } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    if (!task_name) {
      return res.status(400).json({
        message: "task_name이 존재하지 않습니다.",
      });
    }
    if (!task_date) {
      return res.status(400).json({
        message: "task_date이 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.createTask(
        user_id,
        task_name,
        task_date
      );
      return res.status(200).json({
        message: "task 등록이 완료되었습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  updateTask: async (req, res) => {
    const { user_id, task_id } = req.params;
    const { task_name } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    if (!task_id) {
      return res.status(400).json({
        message: "task_id가 존재하지 않습니다.",
      });
    }
    if (!task_name) {
      return res.status(400).json({
        message: "task_name이 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.updateTask(task_name, task_id);
      if (result) {
        return res.status(200).json({
          message: "task가 성공적으로 수정되었습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  updateTaskTime: async (req, res) => {
    const { user_id, task_id } = req.params;
    const { task_time } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    if (!task_id) {
      return res.status(400).json({
        message: "task_id가 존재하지 않습니다.",
      });
    }
    if (!task_time) {
      return res.status(400).json({
        message: "task_time이 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.updateTaskTime(
        user_id,
        task_id,
        task_time
      );
      return res.status(200).json({
        message: "시간이 성공적으로 저장되었습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  deleteTask: async (req, res) => {
    const { user_id, task_id } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    if (!task_id) {
      return res.status(400).json({
        message: "task_id가 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.deleteTask(task_id);
      if (result) {
        return res.status(200).json({
          message: "task가 성공적으로 삭제되었습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  findTaskBetweenDate: async (req, res) => {
    const { user_id, start_date, end_date } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    if (!start_date || !end_date) {
      return res.status(400).json({
        message: "start_date와 end_date가 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.findTaskBetweenDate(
        user_id,
        start_date,
        end_date
      );
      if (result) {
        return res.status(200).json(result);
      }
    } catch (err) {
      throw err;
    }
  },
};
