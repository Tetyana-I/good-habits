"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

// Related functions for users.

class User {
    // Authenticate user with username, password.
    // Returns { username, first_name, last_name, email, is_admin }
    // Throws UnauthorizedError is user not found or wrong password.

  static async authenticate(username, password) {
    
    const result = await db.query(
          `SELECT username,
                  password,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

    // Register user with data.
    // Returns { username, firstName, lastName, email, isAdmin }
    // Throws BadRequestError on duplicates.

  static async register({ username, password, isAdmin }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (username,
            password,
            is_admin)
           VALUES ($1, $2, $3)
           RETURNING username, is_admin AS "isAdmin"`,
        [
          username,
          hashedPassword,
          isAdmin
        ],
    );

    const user = result.rows[0];

    return user;
  }

//   Find all users.
//   Returns [{ username, is_admin }, ...]

  static async findAll() {
    const result = await db.query(
          `SELECT username,
                  is_admin AS "isAdmin"
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

//   Given a username, return data about user.
//   Returns { username, is_admin, habits }
//   Throws NotFoundError if user not found.

  static async get(username) {
    const userRes = await db.query(
          `SELECT username,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    // const userApplicationsRes = await db.query(
    //       `SELECT a.job_id
    //        FROM applications AS a
    //        WHERE a.username = $1`, [username]);

    // user.applications = userApplicationsRes.rows.map(a => a.job_id);
    
    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { password, isAdmin }
   *
   * Returns { username, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

//   static async update(username, data) {
//     if (data.password) {
//       data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
//     }

//     const { setCols, values } = sqlForPartialUpdate(
//         data,
//         {
//           firstName: "first_name",
//           lastName: "last_name",
//           isAdmin: "is_admin",
//         });
//     const usernameVarIdx = "$" + (values.length + 1);

//     const querySql = `UPDATE users 
//                       SET ${setCols} 
//                       WHERE username = ${usernameVarIdx} 
//                       RETURNING username,
//                                 first_name AS "firstName",
//                                 last_name AS "lastName",
//                                 email,
//                                 is_admin AS "isAdmin"`;
//     const result = await db.query(querySql, [...values, username]);
//     const user = result.rows[0];

//     if (!user) throw new NotFoundError(`No user: ${username}`);

//     delete user.password;
//     return user;
//   }

//   Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
          `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

//   /** Apply for job: update db, returns undefined.
//    *
//    * - username: username applying for job
//    * - jobId: job id
//    **/

//   static async applyToJob(username, jobId) {
//     const preCheck = await db.query(
//           `SELECT id
//            FROM jobs
//            WHERE id = $1`, [jobId]);
//     const job = preCheck.rows[0];

//     if (!job) throw new NotFoundError(`No job: ${jobId}`);

//     const preCheck2 = await db.query(
//           `SELECT username
//            FROM users
//            WHERE username = $1`, [username]);
//     const user = preCheck2.rows[0];

//     if (!user) throw new NotFoundError(`No username: ${username}`);

//     await db.query(
//           `INSERT INTO applications (job_id, username)
//            VALUES ($1, $2)`,
//         [jobId, username]);
//   }
}


module.exports = User;