use PAP;
CREATE TABLE Clones (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT,
    nationality VARCHAR(100),
    personality_traits TEXT,
    base_prompt TEXT,
    avatar_color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CONSTRAINT fk_clones_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE;
