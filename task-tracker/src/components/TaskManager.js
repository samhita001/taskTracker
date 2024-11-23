import React, { useEffect, useState } from "react";
import "../styles/style.css";
import axios from "axios";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/tasks/", {
            headers: { Authorization: token },
        });
        setTasks(res.data);
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        await axios.post(
            "http://localhost:3000/api/tasks/",
            { title },
            { headers: { Authorization: token } }
        );
        setTitle("");
        fetchTasks();
    };

    const handleClearTasks = async () => {
        const token = localStorage.getItem("token");
        await axios.delete("http://localhost:3000/api/tasks", {
            headers: { Authorization: token },
        });
        fetchTasks();
    };

    const handleCompleteTask = async (id) => {
        const token = localStorage.getItem("token");
        await axios.put(
            `http://localhost:3000/api/tasks/${id}`,
            {},
            { headers: { Authorization: token } }
        );
        fetchTasks();
    };

    const handleDeleteTask = async (id) => {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
            headers: { Authorization: token },
        });
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="task-manager">
            <h2>Task Manager</h2>
            <button onClick={handleLogout}>Logout</button>

            <div className="task-form">
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Add a task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <button onClick={handleClearTasks}>Clear All</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</td>
                            <td>
                                {task.completed ? (
                                    <span style={{ color: "green" }}>Completed</span>
                                ) : (
                                    <span style={{ color: "red" }}>Pending</span>
                                )}
                            </td>
                            <td>
                                {!task.completed && (
                                    <button onClick={() => handleCompleteTask(task._id)}>
                                        Mark as Complete
                                    </button>
                                )}

                                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskManager;
