const TaskService = require("../services/TaskService");

module.exports = {
  findTaskByUserIdAndTaskDate: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id, task_date } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
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
      return res.status(200).json(result);
    } catch (err) {
      throw err;
    }
  },
  createTask: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id } = req.params;
    const { task_name, task_date } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    if (!task_name) {
      return res.status(400).json({
        message: "수행할 태스크의 이름을 작성해주세요.",
      });
    }
    if (!task_date) {
      return res.status(400).json({
        message: "태스크를 수행할 날짜를 입력해주세요.",
      });
    }
    try {
      const date = await TaskService.isValidDate(task_date);
      if (date) {
        const result = await TaskService.createTask(
          user_id,
          task_name,
          task_date
        );
        return res.status(200).json({
          message: "태스크가 등록되었습니다.",
          result,
        });
      } else {
        return res.status(400).json({
          message: "올바르지 않은 날짜입니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  updateTask: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id, task_id } = req.params;
    const { task_name } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    if (!task_id) {
      return res.status(400).json({
        message: "태스크 아이디가 존재하지 않습니다.",
      });
    }
    if (!task_name) {
      return res.status(400).json({
        message: "태스크 이름이 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.updateTask(task_name, task_id);
      if (result) {
        return res.status(200).json({
          message: "태스크가 수정되었습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  updateTaskTime: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id, task_id } = req.params;
    const { task_time } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    if (!task_id) {
      return res.status(400).json({
        message: "태스크 아이디가 존재하지 않습니다.",
      });
    }
    if (!task_time) {
      return res.status(400).json({
        message: "태스크를 수행할 시간이 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.updateTaskTime(
        user_id,
        task_id,
        task_time
      );
      return res.status(200).json({
        message: "시간이 저장되었습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  deleteTask: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id, task_id } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    if (!task_id) {
      return res.status(400).json({
        message: "태스크 아이디가 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.deleteTask(task_id);
      if (result) {
        return res.status(200).json({
          message: "태스크가 삭제되었습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  findTaskBetweenDate: async (req, res, next) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id, start_date, end_date } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    if (!start_date || !end_date) {
      return res.status(400).json({
        message: "조회 할 날짜가 존재하지 않습니다.",
      });
    }
    try {
      const result = await TaskService.findTaskBetweenDate(
        user_id,
        start_date,
        end_date
      );
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  },
};
