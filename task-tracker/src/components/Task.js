import React from "react";
import axios from "axios";

const Task = ({ task, fetchTasks }) => {
  const handleComplete = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:3000/api/tasks/${task._id}`,
      {},
      { headers: { Authorization: token } }
    );
    fetchTasks();
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/tasks/${task._id}`, {
      headers: { Authorization: token },
    });
    fetchTasks();
  };

  return (
    <div>
      <p style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </p>
    </div>
  );
};

export default Task;
