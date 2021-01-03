"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const statuscode_1 = require("../helper/statuscode");
const database_1 = require("../database");
const response_1 = require("../helper/response");
class TaskController {
    static GetTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.Connect();
            const posts = yield db.query("SELECT * FROM tasks WHERE deleted_at IS null");
            const response = new response_1.ResponseJSON("MESSAGE", "OK", false, posts[0]);
            return res.status(statuscode_1.StatusCode.OK).json(response);
        });
    }
    static GetTaskByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = Number(req.params.ID);
            const db = yield database_1.Connect();
            // @ts-ignore
            const post = yield db.query("SELECT * FROM tasks WHERE deleted_at IS null AND id = ?", [ID]);
            if (TaskController._valid(post)) {
                const response = new response_1.ResponseJSON("ERROR", "task id does not exist", true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            }
            const response = new response_1.ResponseJSON("MESSAGE", "OK", false, post[0]);
            return res.status(statuscode_1.StatusCode.OK).json(response);
        });
    }
    static CreateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = req.body;
            task.id = undefined;
            task.created_at = new Date();
            task.updated_at = new Date();
            const db = yield database_1.Connect();
            yield db.query("INSERT INTO tasks SET ?", [task])
                .catch((err) => {
                const response = new response_1.ResponseJSON("ERROR", err, true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            });
            const response = new response_1.ResponseJSON("MESSAGE", "successfully created", false, null);
            return res.status(statuscode_1.StatusCode.Created).json(response);
        });
    }
    static DeleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = Number(req.params.ID);
            const db = yield database_1.Connect();
            // @ts-ignore
            const task = yield db.query("SELECT id FROM tasks WHERE id = ?", [ID]);
            if (TaskController._valid(task)) {
                const response = new response_1.ResponseJSON("ERROR", "task id does not exist", true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            }
            yield db.query("UPDATE tasks SET deleted_at = ? WHERE id = ?", [new Date(), ID]);
            const response = new response_1.ResponseJSON("MESSAGE", "successfully deleted", false, null);
            return res.status(statuscode_1.StatusCode.OK).json(response);
        });
    }
    static UpdateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            data.updated_at = new Date();
            const db = yield database_1.Connect();
            // @ts-ignore
            const task = yield db.query("SELECT id FROM tasks WHERE id = ?", [data.id]);
            if (TaskController._valid(task)) {
                const response = new response_1.ResponseJSON("ERROR", "task id does not exist", true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            }
            yield db.query("UPDATE tasks SET ? WHERE id = ?", [data, data.id])
                .catch((err) => {
                const response = new response_1.ResponseJSON("ERROR", err, true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            });
            const response = new response_1.ResponseJSON("MESSAGE", "successfully updated", false, null);
            return res.status(statuscode_1.StatusCode.OK).json(response);
        });
    }
    static _valid(user) {
        return JSON.stringify(user[0]) === "[]";
    }
}
exports.TaskController = TaskController;
