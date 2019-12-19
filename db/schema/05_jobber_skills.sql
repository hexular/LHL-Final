DROP TABLE IF EXISTS jobber_skills CASCADE;

CREATE TABLE jobber_skills CASCADE (
  id SERIAL PRIMARY KEY NOT NULL,
  jobber_id INTEGER REFERENCES jobbers(id),
  skill_id INTEGER REFERENCES skills(id),
);