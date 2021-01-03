"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const statuscode_1 = require("../helper/statuscode");
class HomeController {
    static Index(req, res) {
        return res.status(statuscode_1.StatusCode.OK).json({
            "endpoints": [
                {
                    "/users": "https://api-tasks-nodejs.herokuapp.com/users",
                    "/tasks": "https://api-tasks-nodejs.herokuapp.com/tasks",
                },
            ],
        });
    }
}
exports.HomeController = HomeController;
