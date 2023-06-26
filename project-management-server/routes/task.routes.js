const router = require("express").Router();
const mongoose = require("mongoose");

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

//  GET /api/tasks/:taskId  -  Get details of a specific task by id
router.get("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findById(taskId)
    .then((task) => res.json(task))
    .catch((err) => {
      console.log("error getting details of a task", err);
      res.status(500).json({
        message: "error getting details of a task",
        error: err,
      });
    });
});

//  POST /api/tasks  -  Creates a new task
router.post("/tasks", (req, res, next) => {
  const { title, description, projectId } = req.body;

  const newTaskDetails = {
    title: title,
    description: description,
    project: projectId,
  };

  Task.create(newTaskDetails)
    .then((taskFromDB) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: taskFromDB._id },
      });
    })
    .then((response) => res.status(201).json(response))
    .catch((err) => {
      console.log("error creating a new task", err);
      res.status(500).json({
        message: "error creating a new task",
        error: err,
      });
    });
});

// PUT /api/tasks/:taskId  -  Updates a specific task by id
router.put("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const newDetails = {
    title: req.body.title,
    description: req.body.description,
  };

  Task.findByIdAndUpdate(taskId, newDetails, { new: true })
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => {
      console.log("error updating task", err);
      res.status(500).json({
        message: "error updating task",
        error: err,
      });
    });
});

// DELETE /api/tasks/:taskId  -  Delete a specific task by id
router.delete("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndRemove(taskId)
    .then((deletedTask) => {})
    .then(() =>
      res.json({
        message: `Task with id ${taskId} were removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("error deleting task", err);
      res.status(500).json({
        message: "error deleting task",
        error: err,
      });
    });
});

module.exports = router;
