DROP TABLE IF EXISTS jobbers CASCADE;

CREATE TABLE jobbers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  radius SMALLINT NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE
)

-- TODO: Merge jobbers with users using jobber flag?