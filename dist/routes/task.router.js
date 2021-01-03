"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controller/task.controller");
const router = express_1.Router();
router.route('/')
    .get(task_controller_1.TaskController.GetTasks)
    .post(task_controller_1.TaskController.CreateTask)
    .put(task_controller_1.TaskController.UpdateTask);
router.route('/:ID')
    .delete(task_controller_1.TaskController.DeleteTask)
    .get(task_controller_1.TaskController.GetTaskByID);
exports.default = router;
