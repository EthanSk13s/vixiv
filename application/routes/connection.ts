import * as mysql from "mysql2";
import {USER, PASS} from "../config";

function createConnection() {
    let conn = mysql.createConnection({
            host: "localhost",
            //TODO make sure to change to the user you want to use
            user: USER, //Your DB username
            //TODO make sure to change to the correct password for your user.
            password: PASS, //Your DB password
            database: "vixiv"
    })

    return conn;
}

export const db = createConnection();
