import "./App.css";

import ComfirmBox from "./ComfirmBox";
import EditBox from "./EditBox";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const taskList = JSON.parse(localStorage.getItem("task")) || [];
    return taskList;
  });
  const [newTask, setNewTask] = useState("");
  const [currentTask, setCurrentTask] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [error, setError] = useState("");

  const handleEditClick = (task) => {
    setCurrentTodo(task);
    setShowEdit(true);
  };

  const saveEdit = (updatedTask) => {
    setTasks(tasks.map((task) => (task === currentTodo ? updatedTask : task)));
    setShowEdit(false);
    setCurrentTodo(null);
  };

  const cancelEdit = () => {
    setShowEdit(false);
    setCurrentTodo(null);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
    if (newTask.trim() === "") {
      setError("Tên công việc không được để trống.");
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
    setError("");
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleDeleteClick = (task) => {
    setCurrentTask(task);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setTasks(tasks.filter((task) => task !== currentTask));
    setShowConfirm(false);
    setCurrentTask(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setCurrentTask(null);
  };

  useEffect(() => localStorage.setItem("task", JSON.stringify(tasks)), [tasks]);

  const handleToggleError = (e) => {
    hideError(), addNewTask(e);
  };

  const hideError = () => {
    setError("");
  };

  const addNewTask = (e) => setNewTask(e.target.value);

  return (
    <div className="App">
      {!showEdit && !showConfirm && (
        <>
          <h1>Danh sách công việc</h1>
          <div>
            <input
              type="text"
              value={newTask}
              onChange={handleToggleError}
              placeholder="Nhập tên công việc"
            />
            <button onClick={handleAddTask}>Thêm</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {tasks.length === 0 ? (
            <div className="py-4 text-center items-center flex flex-col">
              <img
                className="h-48 w-52 shadow-lg "
                src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg"
                alt=""
              />
            </div>
          ) : (
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(index)}
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                  <button onClick={() => handleEditClick(task)}>✏️</button>
                  <button onClick={() => handleDeleteClick(task)}>🗑️</button>
                </li>
              ))}
            </ul>
          )}
          <p>
            Công việc đã hoàn thành:{" "}
            {tasks.filter((task) => task.completed).length} / {tasks.length}
          </p>
        </>
      )}
      {showEdit && (
        <EditBox
          error={error}
          task={currentTodo}
          onSave={saveEdit}
          onCancel={cancelEdit}
        />
      )}
      {showConfirm && (
        <ComfirmBox
          task={currentTask}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default App;
