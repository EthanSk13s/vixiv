"use strict";
//TODO: Probably should not hardcode the db name
import { CONFIG } from "../../config";

const mysql = require("mysql2/promise");

function displayWarningMessage(warning: any) {
  switch (warning.Code) {
    case 1007:
      console.log(`Skipping Database Creation --> ${warning.Message}`);
      break;
    case 1050:
      console.log(`Skipping Table Creation --> ${warning.Message}`);
      break;
  }
}

async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: CONFIG.DB_USER, //Your DB username
    password: CONFIG.DB_PASS, //Your DB password
  });
}

async function makeDatabase(connection: any) {
  const [result, _] = await connection.query(
    "CREATE DATABASE IF NOT EXISTS ??;", [CONFIG.DB_NAME]
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Database!");
  }
}

async function makeUsersTable(connection: any) {
  const [result, _] = await connection.query(
    // Users Table SQL Goes here
    `
    CREATE TABLE IF NOT EXISTS ??.users (
      id BIGINT NOT NULL,
      username VARCHAR(45) NULL,
      password CHAR(64) NULL,
      email VARCHAR(255) NULL,
      has_profile TINYINT(1) NULL,
      PRIMARY KEY (id))
    ENGINE = InnoDB
    `, [CONFIG.DB_NAME]
  );

  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Users Table!");
  }
}

async function makePostsTable(connection: any) {
  const [result, _] = await connection.query(
    // Posts Table SQL Goes here
    `CREATE TABLE posts (
      post_id bigint NOT NULL,
      image varchar(255) DEFAULT NULL,
      author_id bigint DEFAULT NULL,
      post_upload datetime DEFAULT NULL,
      description longtext,
      title longtext,
      PRIMARY KEY (post_id),
      KEY user_id_idx (author_id),
      CONSTRAINT author_id FOREIGN KEY (author_id) REFERENCES users (id)
    ) ENGINE=InnoDB;
    `
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Posts Table!");
  }
}

async function makeCommentsTable(connection: any) {
  const [result, _] = await connection.query(
    // Comments Table SQL Goes here
    ` 
    CREATE TABLE comments (
      post_id bigint NOT NULL,
      user_id bigint DEFAULT NULL,
      content longtext,
      comment_date datetime DEFAULT NULL,
      comment_id bigint NOT NULL AUTO_INCREMENT,
      PRIMARY KEY (comment_id),
      KEY user_id_idx (user_id),
      KEY post_id (post_id),
      CONSTRAINT post_id FOREIGN KEY (post_id) REFERENCES posts (post_id),
      CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=0;
    
    `
  );
  if (result && result.warningStatus > 0) {
    const [warningResult, _] = await connection.query("SHOW WARNINGS");
    displayWarningMessage(warningResult[0]);
  } else {
    console.log("Created Comments Table!");
  }
}

(async function main() {
  let connection = null;
  try {
    connection = await getConnection();
    await makeDatabase(connection); // make DB
    //TODO make sure to change yourdbnamehere
    await connection.query("USE ??", CONFIG.DB_NAME); // set new DB to the current DB
    await makeUsersTable(connection); // try to make user table
    await makePostsTable(connection); // try to make posts table
    await makeCommentsTable(connection); // try to make comments table
    connection.close();
    return;
  } catch (error) {
    console.error(error);
    if (connection != null) {
      connection.close();
    }
  }
})();
