import { Router } from "express";
import { TaskController } from "../controller/task.controller";

const router = Router();
router.route('/')
    .get(TaskController.GetTasks)
    .post(TaskController.CreateTask)
    .put(TaskController.UpdateTask);

router.route('/:ID')
    .delete(TaskController.DeleteTask)
    .get(TaskController.GetTaskByID)


export default router;