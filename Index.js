const express = require("express");
const app = express();
const path = require("path");

let task = [];
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/tasks", (req, res) => {
  res.status(200).sendFile(task);
});

app.post("/addTask", (req, res) => {
  const { taskName, date, status, desc } = req.body;

  if (taskName && date && status && desc) {
    task.push({
      taskName: taskName,
      date: date,
      status: status,
      desc: desc,
    });

    res.status(200).send({
      message: "Task added successfully",
      tasks: task,
    });
  } else {
    res.status(400).send({ message: "Required fields are missing" });
  }
});

app.delete("/deleteTask/:id", (req, res) => {
  const { id } = req.params;

  if (id !== undefined && id < task.length && id >= 0) {
    task.splice(id, 1);
    res.status(200).send({
      message: "Task deleted successfully",
      tasks: task,
    });
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.put("/update", (req, res) => {
  const { id, taskName, date, status, desc } = req.body;

  if (
    id !== undefined &&
    id < task.length &&
    id >= 0 &&
    taskName &&
    date &&
    status &&
    desc
  ) {
    newTask = {
      taskName: taskName,
      date: date,
      status: status,
      desc: desc,
    };
    task.splice(id, 1, newTask);
    res.status(200).send({
      message: "Task edited successfully",
      tasks: task,
    });
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
