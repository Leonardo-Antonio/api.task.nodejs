"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseJSON = void 0;
class ResponseJSON {
    constructor(msgT, msg, error, data) {
        this.message = msg;
        this.message_type = msgT;
        this.error = error;
        this.data = data;
    }
}
exports.ResponseJSON = ResponseJSON;
