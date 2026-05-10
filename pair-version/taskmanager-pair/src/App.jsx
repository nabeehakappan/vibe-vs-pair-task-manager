import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}