"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = express_1.Router();
router.route("/")
    .get(user_controller_1.UserController.GetUsers)
    .post(user_controller_1.UserController.CreateUsers)
    .put(user_controller_1.UserController.UpdateUser);
router.route("/:ID")
    .get(user_controller_1.UserController.GetUserByID)
    .delete(user_controller_1.UserController.DeleteUser);
exports.default = router;
