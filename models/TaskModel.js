module.exports = {
  findTaskByUserIdAndTaskDate:
    "SELECT * FROM tasks WHERE user_id=? AND task_date=?",
  createTask:
    "INSERT INTO tasks (user_id, task_name, task_time, task_date, isChecked) VALUES (?, ?, 0, ?, false)",
  updateTask: "UPDATE tasks SET task_name=? WHERE task_id=?",
  updateTaskTime:
    "UPDATE tasks SET task_time=?, isChecked=true WHERE task_id=?",
  deleteTask: "DELETE FROM tasks WHERE task_id=?",
  findTaskBetweenDate:
    "SELECT task_date, SUM(task_time) AS total_task_time FROM tasks WHERE user_id = ? AND task_date BETWEEN ? AND ? GROUP BY task_date ORDER BY task_date DESC",
};
