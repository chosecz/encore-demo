ALTER TABLE sessions
ADD CONSTRAINT fk_sessions_user
FOREIGN KEY (user_id)
REFERENCES users(id);
