import React from "react";
import axios from "axios";

const Task = ({ task, fetchTasks }) => {

  return (
    <div>
      <p style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </p>
    </div>
  );
};

export default Task;
