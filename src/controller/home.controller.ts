import { Request, Response } from "express";
import { StatusCode } from "../helper/statuscode";

export class HomeController {
    static Index(req: Request, res: Response): Response {
        return res.status(StatusCode.OK).json({
            "endpoints": [
                {
                    "/users": "https://api-tasks-nodejs.herokuapp.com/users",
                    "/tasks": "https://api-tasks-nodejs.herokuapp.com/tasks",
                },
            ],
        });
    }
}
