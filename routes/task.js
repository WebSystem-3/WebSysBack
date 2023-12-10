var express = require("express");
var router = express.Router();
const TaskController = require("../controller/TaskController.js");

router.get(
  "/:user_id/task/:task_date",
  TaskController.findTaskByUserIdAndTaskDate
);
router.post("/:user_id/task", TaskController.createTask);
router.patch("/:user_id/task/:task_id", TaskController.updateTask);
router.patch("/:user_id/task/:task_id/timer", TaskController.updateTaskTime);
router.delete("/:user_id/task/:task_id", TaskController.deleteTask);
router.get(
  "/:user_id/task/:start_date/:end_date",
  TaskController.findTaskBetweenDate
);

module.exports = router;
