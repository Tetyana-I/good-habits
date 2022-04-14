CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER
    REFERENCES users ON DELETE CASCADE,
  title VARCHAR(50) NOT NULL,
  habit_description TEXT,
  streak_target INTEGER DEFAULT 66,
  max_streak INTEGER DEFAULT 0,
  attempt INTEGER DEFAULT 1,
  current_counter INTEGER DEFAULT 0, 
  last_checked DATE 
);



-- {
--   "id": 1,
--   "user_id": 1,
--   "title": "Clean diet", 
--   "description": "No junk food, limit coffee",
--   "streak_target": 66,
--   "max_streak": 0,
--   "attempt": 0,
--   "current_counter": 0,
--   "last_checked": "0001-01-01"
-- }