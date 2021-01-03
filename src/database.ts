import {createPool, Pool} from "mysql2/promise";

export function Connect(): Pool {
    const db = createPool({
        host: "localhost",
        user: "leo",
        password: "chester",
        port: 3306,
        database: "db_node",
    });
    return db;
}