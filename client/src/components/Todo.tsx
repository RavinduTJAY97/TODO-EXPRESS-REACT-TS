import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodoAsync,
  toggleTodoAsync,
  deleteTodoAsync,
} from "../redux/tasksSlice";
import { RootState, AppDispatch } from "../redux/store";
import { IconButton } from "@mui/material";
import "../todoStyles.css";
import { Add } from "@mui/icons-material";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="new-task">
        <input
          type="text"
          placeholder="New task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <IconButton onClick={handleAddTask} aria-label="add">
          <Add style={{ color: "#9055ee", marginBottom: "26px" }} />
        </IconButton>
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
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
          {items.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.title}</td>
              <td>{todo.done ? "Done" : "Not Done"}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
