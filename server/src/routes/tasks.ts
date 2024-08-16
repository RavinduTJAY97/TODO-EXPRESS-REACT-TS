import { Router } from "express";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

let tasks: Task[] = [{ id: 1, title: "Create todo list Test", done: true }];
let nextId = 2;

const router = Router();

// GET /tasks - Get all tasks
router.get("/", (req, res) => {
  const { search } = req.query;
  let filteredTasks = tasks;

  if (typeof search === "string") {
    filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  res.json(filteredTasks);
});

// POST /tasks - Add a new task
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task title is required" });
  }

  const newTask: Task = { id: nextId++, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task (mark done/not done);
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    task.done = !task.done;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// DELETE /tasks/:id - Delete a tasks
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

export default router;
