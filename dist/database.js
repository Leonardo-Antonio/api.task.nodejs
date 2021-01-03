"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
const promise_1 = require("mysql2/promise");
function Connect() {
    const db = promise_1.createPool({
        host: "localhost",
        user: "leo",
        password: "chester",
        port: 3306,
        database: "db_node",
    });
    return db;
}
exports.Connect = Connect;
