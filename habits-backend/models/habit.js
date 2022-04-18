"use strict";

const db = require("../db");
const { NotFoundError} = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

//////////////////////////////////////////////////
// Related functions for habits.
//////////////////////////////////////////////////

class Habit {
// Create a habit (from data), update db, return new habit data.
//  data should be { title, description, streak_target }
// Returns { id, user_id, title, habit_description, streak_target, max_streak, attempt, current_counter, last_checked }


  static async create(data) {

    const result = await db.query(
          `INSERT INTO habits (title,
                             habit_description,
                             streak_target, 
                             username,
                             max_streak,
                             attempt,
                             current_counter,
                             last_checked)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id,
                    username,
                    title, 
                    habit_description,
                    streak_target,
                    max_streak,
                    attempt,
                    current_counter,
                    last_checked`,
        [
          data.title,
          data.habit_description,
          data.streak_target,
          data.username,
          data.max_streak,
          data.attempt,
          data.current_counter,
          data.last_checked,
        ]);
    let habit = result.rows[0];

    return habit;
  }

  
//   Given a habit id, return data about habit.
//     Returns { id,  user_id, title, habit_description,
//              streak_target, max_streak, attempt, current_counter, last_checked }
//     Throws NotFoundError if not found.

static async get(id) {
    const habitRes = await db.query(
          `SELECT id,
                  username,
                  title,
                  habit_description,
                  streak_target,
                  max_streak,
                  attempt,
                  current_counter,
                  last_checked
           FROM habits
           WHERE id = $1`, [id]);

    const habit = habitRes.rows[0];
    if (!habit) throw new NotFoundError(`No habit: ${id}`);

    return habit;
  }


//  Delete given habit from database; returns undefined.
//  Throws NotFoundError if a habit not found.

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM habits
           WHERE id = $1
           RETURNING id`, [id]);
    const habit = result.rows[0];

    if (!habit) throw new NotFoundError(`No habit: ${id}`);
  }


//  Find all habits by username
//  Returns [{ id, username, title, habit_description, streak_target,
//             max_streak, attempt, current_counter, last_checked }, ...]


  static async findAllByUsername(username) {
    let habitsRes = await db.query(
        `SELECT id,
                username,
                title,
                habit_description,
                streak_target,
                max_streak,
                attempt,
                current_counter,
                last_checked
         FROM habits
        WHERE username = $1`, [username]);
    return habitsRes.rows;
  }


//  Update habit data with `data`.
//  Data can include include: 
//  { title, habit_description, streak_target, max_streak, attempt,  current_counter, last_checked } 
//  Returns habit Object
//  Throws NotFoundError if not found.

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data);
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE habits 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                username,
                                title, 
                                habit_description, 
                                streak_target,
                                max_streak,
                                attempt,
                                current_counter,
                                last_checked`;
    const result = await db.query(querySql, [...values, id]);
    const habit = result.rows[0];

    if (!habit) throw new NotFoundError(`No habit: ${id}`);

    return habit;
  }

}

module.exports = Habit;