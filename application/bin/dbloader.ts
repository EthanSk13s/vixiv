"use strict";
//TODO: Probably should not hardcode the db name
import { USER, PASS } from "../config";

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
    //TODO make sure to change to the user you want to use
    user: USER, //Your DB username
    //TODO make sure to change to the correct password for your user.
    password: PASS, //Your DB password
  });
}

async function makeDatabase(connection: any) {
  //TODO make sure to change yourdbnamehere
  const [result, _] = await connection.query(
    "CREATE DATABASE IF NOT EXISTS vixiv;"
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
    CREATE TABLE IF NOT EXISTS vixiv.users (
      id BIGINT NOT NULL,
      username VARCHAR(45) NULL,
      password CHAR(64) NULL,
      email VARCHAR(255) NULL,
      PRIMARY KEY (id))
    ENGINE = InnoDB
    `
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
    `CREATE TABLE IF NOT EXISTS vixiv.posts (
      post_id BIGINT NOT NULL,
      image VARCHAR(255) NULL,
      author_id BIGINT NULL,
      PRIMARY KEY (post_id),
      INDEX user_id_idx (author_id ASC) VISIBLE,
      CONSTRAINT author_id
        FOREIGN KEY (author_id)
        REFERENCES vixiv.users (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
      ENGINE = InnoDB
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
    CREATE TABLE IF NOT EXISTS vixiv.comments (
      post_id BIGINT NOT NULL,
      user_id BIGINT NULL,
      content LONGTEXT NULL,
      INDEX user_id_idx (user_id ASC) VISIBLE,
      CONSTRAINT post_id
        FOREIGN KEY (post_id)
        REFERENCES vixiv.posts (post_id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
      CONSTRAINT user_id
        FOREIGN KEY (user_id)
        REFERENCES vixiv.users (id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
    ENGINE = InnoDB
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
    await connection.query("USE vixiv"); // set new DB to the current DB
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
