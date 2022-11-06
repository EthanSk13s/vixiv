import * as mysql from "mysql2/promise";
import {USER, PASS} from "../config";

export class UserSession {
    userId: number;
    expiration: Date;

    constructor(userId: number, expiration: Date) {
        this.userId = userId;
        this.expiration = expiration;
    }

    isExpired() {
        return this.expiration < (new Date());
    }
}

async function createConnection() {
    let conn = await mysql.createConnection({
            host: "localhost",
            //TODO make sure to change to the user you want to use
            user: USER, //Your DB username
            //TODO make sure to change to the correct password for your user.
            password: PASS, //Your DB password
            database: "vixiv",
            supportBigNumbers: true
    })

    return conn;
}

export const db = createConnection();
export var sessions: any = {};
