import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  toggleTodoAsync,
  deleteTodoAsync,
  addTodoAsync,
} from "../redux/tasksSlice";
import { RootState, AppDispatch } from "../redux/store";
import { IconButton } from "@mui/material";
import {
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
  Add,
} from "@mui/icons-material";
import "../todoStyles.css";

const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  const [newTask, setNewTask] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTodoAsync({ title: newTask }));
      setNewTask("");
    }
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTodoAsync(id));
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTodoAsync(id));
  };

  const filteredTasks = items.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          className="new-task-input"
          type="text"
          placeholder="New task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <IconButton onClick={handleAddTask} aria-label="add">
          <Add style={{ color: "#9055ee", marginBottom: "26px" }} />
        </IconButton>
      </div>
      <div className="task-input">
        <input
          className="search-input"
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.done ? "Done" : "Not Done"}</td>
              <td>
                <IconButton
                  onClick={() => handleToggleTask(todo.id)}
                  aria-label="toggle"
                >
                  {todo.done ? (
                    <CheckCircle style={{ color: "#9055ee" }} />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteTask(todo.id)}
                  aria-label="delete"
                >
                  <Delete style={{ color: "#9055ee" }} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
