import { Request, Response } from "express";
import { Connect } from "../database";
import { UserModel } from "../models/user.model";
import { ResponseJSON } from "../helper/response";
import { StatusCode } from "../helper/statuscode";

export class UserController {
    static async GetUsers(req: Request, res: Response): Promise<Response> {
        const db = await Connect();
        const users = await db.query("SELECT * FROM users WHERE deleted_at is null");
        const response = new ResponseJSON(
            "MESSAGE",
            "OK",
            false,
            users[0],
        );
        return res.status(StatusCode.OK).json(response);
    }

    static async CreateUsers(req: Request, res: Response): Promise<Response> {
        const data: UserModel = req.body;
        data.id = undefined;
        data.created_at = new Date();
        data.updated_at = new Date();
        const db = await Connect();
        await db.query("INSERT INTO users SET ?", [data])
            .catch((err) => {
                const response = new ResponseJSON("ERROR", err, true, null);
                return res.status(StatusCode.BadRequest).json(response);
            });
        const response = new ResponseJSON("MESSAGE", "successfully created", false, null);
        return res.status(StatusCode.Created).json(response);
    }

    static async GetUserByID(req: Request, res: Response): Promise<Response> {
        const ID: number = Number(req.params.ID);
        const db = await Connect();
        // @ts-ignore
        const user: Array<UserModel> = await db.query("SELECT * FROM users WHERE id = ? AND deleted_at IS null", [ID]);

        if ( UserController._valid(user) ) {
            const response = new ResponseJSON("ERROR", "user id does not exist", true, null);
            return res.status(StatusCode.BadRequest).json(response);
        }

        const response = new ResponseJSON("MESSAGE", "OK", false, user[0]);
        return res.status(StatusCode.OK).json(response);
    }

    static async DeleteUser(req: Request, res: Response): Promise<Response> {
        const ID: number = Number(req.params.ID);
        const db = await Connect();

        // @ts-ignore
        const user: Array<UserModel> = await db.query("SELECT id FROM users WHERE id = ?", [ID]);
        if ( UserController._valid(user) ) {
            const response = new ResponseJSON("ERROR", "user id does not exist", true, null);
            return res.status(StatusCode.BadRequest).json(response);
        }

        await db.query("UPDATE users SET deleted_at = ? WHERE id = ? ", [new Date(), ID]);
        const response = new ResponseJSON("MESSAGE", "successfully deleted", false, null);
        return res.status(StatusCode.OK).json(response);
    }

    static async UpdateUser(req: Request, res: Response): Promise<Response> {
        const data: UserModel = req.body;
        data.updated_at = new Date();
        const db = await Connect();

        // @ts-ignore
        const user: Array<UserModel> = await db.query("SELECT id FROM users WHERE id = ?", [ID]);
        if ( UserController._valid(user) ) {
            const response = new ResponseJSON("ERROR", "user id does not exist", true, null);
            return res.status(StatusCode.BadRequest).json(response);
        }

        await db.query("UPDATE users SET ? WHERE id = ?", [data, data.id])
            .catch((err) => {
                const response = new ResponseJSON("ERROR", err, true, null);
                return res.status(StatusCode.BadRequest).json(response);
            });
        const response = new ResponseJSON("MESSAGE", "successfully updated", false, null);
        return res.status(StatusCode.OK).json(response);
    }

    private static _valid(user: Array<UserModel>): boolean {
        return JSON.stringify(user[0]) === "[]";
    }
}