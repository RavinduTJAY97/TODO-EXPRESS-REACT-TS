import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo, TodoState } from "../types";

// Fetch todos
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
      userId: 1, // Static user ID
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

// Toggle todo completion status
export const toggleTodoAsync = createAsyncThunk<Todo, number>(
  "todos/toggleTodo",
  async (id) => {
    const response = await axios.put(`http://localhost:5000/tasks/${id}`);
    return response.data;
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
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      // Add Todo
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      })

      // Delete Todo
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (todo) => todo.id !== action.payload
          );
        }
      )

      // Toggle Todo
      .addCase(
        toggleTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const todo = state.items.find(
            (todo) => todo.id === action.payload.id
          );
          if (todo) {
            todo.done = action.payload.done;
          }
        }
      );
  },
});

export default todoSlice.reducer;
