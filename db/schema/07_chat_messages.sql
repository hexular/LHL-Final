DROP TABLE IF EXISTS chat_messages CASCADE;

CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  jobber_id INTEGER REFERENCES jobbers(id),
  -- merging users and jobbers into just users makes this easier.
  chat_id INTEGER REFERENCES chats(id),
  message_time TIMESTAMP DEFAULT NOW(),
  message TEXT NOT NULL,
)