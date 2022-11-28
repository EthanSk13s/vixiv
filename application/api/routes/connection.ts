import mysql2 from "mysql2";
import { CONFIG } from "../../config";

function createConnection() {

    let conn: mysql2.Pool = mysql2.createPool({
            host: "localhost",
            user: CONFIG.DB_USER,
            password: CONFIG.DB_PASS,
            database: CONFIG.DB_NAME,
            supportBigNumbers: true
    })

    return conn;
}

export const db = createConnection().promise();
export var sessions: any = {};
