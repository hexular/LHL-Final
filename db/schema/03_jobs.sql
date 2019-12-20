DROP TABLE IF EXISTS jobs CASCADE;
DROP TYPE IF EXISTS job_progress CASCADE;

CREATE TYPE job_progress AS ENUM ('Pending', 'En Route', 'Working', 'Completed', 'Cancelled');

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  jobber_id INTEGER REFERENCES jobbers(id),
  skill_id INTEGER REFERENCES skills(id),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  payment_cents INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  fulfilled_at TIMESTAMP DEFAULT NULL,
  time_estimate SMALLINT DEFAULT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  post_code CHAR(6) NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
);