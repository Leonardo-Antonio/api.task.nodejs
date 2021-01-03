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
exports.UserController = void 0;
const database_1 = require("../database");
const response_1 = require("../helper/response");
const statuscode_1 = require("../helper/statuscode");
class UserController {
    static GetUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield database_1.Connect();
            const users = yield db.query("SELECT * FROM users WHERE deleted_at is null");
            const response = new response_1.ResponseJSON("MESSAGE", "OK", false, users[0]);
            return res.status(statuscode_1.StatusCode.OK).json(response);
        });
    }
    static CreateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            data.id = undefined;
            data.created_at = new Date();
            data.updated_at = new Date();
            const db = yield database_1.Connect();
            yield db.query("INSERT INTO users SET ?", [data])
                .catch((err) => {
                const response = new response_1.ResponseJSON("ERROR", err, true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            });
            const response = new response_1.ResponseJSON("MESSAGE", "successfully created", false, null);
            return res.status(statuscode_1.StatusCode.Created).json(response);
        });
    }
    static GetUserByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = Number(req.params.ID);
            const db = yield database_1.Connect();
            // @ts-ignore
            const user = yield db.query("SELECT * FROM users WHERE id = ? AND deleted_at IS null", [ID]);
            if (UserController._valid(user)) {
                const response = new response_1.ResponseJSON("ERROR", "user id does not exist", true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            }
            const response = new response_1.ResponseJSON("MESSAGE", "OK", false, user[0]);
            return res.status(statuscode_1.StatusCode.OK).json(response);
        });
    }
    static DeleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = Number(req.params.ID);
            const db = yield database_1.Connect();
            // @ts-ignore
            const user = yield db.query("SELECT id FROM users WHERE id = ?", [ID]);
            if (UserController._valid(user)) {
                const response = new response_1.ResponseJSON("ERROR", "user id does not exist", true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            }
            yield db.query("UPDATE users SET deleted_at = ? WHERE id = ? ", [new Date(), ID]);
            const response = new response_1.ResponseJSON("MESSAGE", "successfully deleted", false, null);
            return res.status(statuscode_1.StatusCode.OK).json(response);
        });
    }
    static UpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            data.updated_at = new Date();
            const db = yield database_1.Connect();
            // @ts-ignore
            const user = yield db.query("SELECT id FROM users WHERE id = ?", [ID]);
            if (UserController._valid(user)) {
                const response = new response_1.ResponseJSON("ERROR", "user id does not exist", true, null);
                return res.status(statuscode_1.StatusCode.BadRequest).json(response);
            }
            yield db.query("UPDATE users SET ? WHERE id = ?", [data, data.id])
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
exports.UserController = UserController;
