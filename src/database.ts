import {createPool, Pool} from "mysql2/promise";

export function Connect(): Pool {
    const db = createPool({
        host: "localhost",
        user: "?",
        password: "?",
        port: 3306,
        database: "db_node",
    });
    return db;
}