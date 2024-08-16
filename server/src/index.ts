import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
