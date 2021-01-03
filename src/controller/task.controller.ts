import { Request, Response } from "express";
import { StatusCode } from "../helper/statuscode";
import { Connect } from "../database"
import { ResponseJSON } from "../helper/response"
import { TaskModel } from "../models/task.model"
import {UserModel} from "../models/user.model";

export class TaskController {
    static async GetTasks(req: Request, res: Response): Promise<Response> {
        const db = await Connect();
        const posts = await db.query("SELECT * FROM tasks WHERE deleted_at IS null");

        const response = new ResponseJSON("MESSAGE", "OK", false, posts[0]);
        return res.status(StatusCode.OK).json(response);
    }

    static async GetTaskByID(req: Request, res: Response): Promise<Response> {
        const ID: number = Number(req.params.ID);

        const db = await Connect();
        // @ts-ignore
        const post: Array<TaskModel> = await db.query("SELECT * FROM tasks WHERE deleted_at IS null AND id = ?", [ID]);
        if ( TaskController._valid(post) ) {
            const response = new ResponseJSON("ERROR", "task id does not exist", true, null);
            return res.status(StatusCode.BadRequest).json(response);
        }

        const response = new ResponseJSON("MESSAGE", "OK", false, post[0]);
        return res.status(StatusCode.OK).json(response);
    }

    static async CreateTask(req: Request, res: Response): Promise<Response> {
        const task: TaskModel = req.body
        task.id = undefined;
        task.created_at = new Date();
        task.updated_at = new Date();

        const db = await Connect();
        await db.query("INSERT INTO tasks SET ?", [task])
            .catch((err) => {
                const response = new ResponseJSON("ERROR", err, true, null);
                return res.status(StatusCode.BadRequest).json(response);
            });
        const response = new ResponseJSON("MESSAGE", "successfully created", false, null);
        return res.status(StatusCode.Created).json(response);
    }

    static async DeleteTask(req: Request, res: Response): Promise<Response> {
        const ID: number = Number(req.params.ID);
        const db = await Connect();

        // @ts-ignore
        const task: Array<TaskModel> = await db.query("SELECT id FROM tasks WHERE id = ?", [ID]);
        if ( TaskController._valid(task) ) {
            const response = new ResponseJSON("ERROR", "task id does not exist", true, null);
            return res.status(StatusCode.BadRequest).json(response);
        }

        await db.query("UPDATE tasks SET deleted_at = ? WHERE id = ?", [new Date(), ID]);
        const response = new ResponseJSON("MESSAGE", "successfully deleted", false, null);
        return res.status(StatusCode.OK).json(response);
    }

    static async UpdateTask(req: Request, res: Response): Promise<Response> {
        const data: TaskModel = req.body
        data.updated_at = new Date();
        const db = await Connect();

        // @ts-ignore
        const task: Array<TaskModel> = await db.query("SELECT id FROM tasks WHERE id = ?", [data.id]);
        if ( TaskController._valid(task) ) {
            const response = new ResponseJSON("ERROR", "task id does not exist", true, null);
            return res.status(StatusCode.BadRequest).json(response);
        }

        await db.query("UPDATE tasks SET ? WHERE id = ?", [data, data.id])
            .catch((err) => {
                const response = new ResponseJSON("ERROR", err, true, null);
                return res.status(StatusCode.BadRequest).json(response);
            });
        const response = new ResponseJSON("MESSAGE", "successfully updated", false, null);
        return res.status(StatusCode.OK).json(response);
    }

    private static _valid(user: Array<TaskModel>): boolean {
        return JSON.stringify(user[0]) === "[]";
    }
}