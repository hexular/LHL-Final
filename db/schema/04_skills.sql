DROP TABLE IF EXISTS skills CASCADE;

CREATE TABLE skills (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
)