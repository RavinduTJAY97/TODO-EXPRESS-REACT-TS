import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "../types";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo } from "../types";

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    return response.data;
  }
);

// Add new todo
export const addTodoAsync = createAsyncThunk<Todo, { title: string }>(
  "todos/addTodo",
  async ({ title }) => {
    const response = await axios.post("http://localhost:5000/tasks", {
      title,
      completed: false,
    });
    return response.data;
  }
);

// Delete a todo
export const deleteTodoAsync = createAsyncThunk<number, number>(
  "todos/deleteTodo",
  async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    return id;
  }
);

const initialState: TodoState = {
  items: [{ id: 1, title: "Create todo list", done: true }],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default todoSlice.reducer;
