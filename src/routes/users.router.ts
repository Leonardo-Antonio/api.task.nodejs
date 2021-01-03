import { Router } from "express";
import { UserController } from "../controller/user.controller";


const router = Router();
router.route("/")
    .get(UserController.GetUsers)
    .post(UserController.CreateUsers)
    .put(UserController.UpdateUser);
router.route("/:ID")
    .get(UserController.GetUserByID)
    .delete(UserController.DeleteUser);


export default router;