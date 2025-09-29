use PAP;
CREATE TABLE Conversations (
    id VARCHAR(36) PRIMARY KEY,
    clone_id VARCHAR(36) NOT NULL,
    messages JSON NOT NULL,  -- guarda mensagens em formato JSON
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 CONSTRAINT fk_conversations_clone FOREIGN KEY (clone_id) REFERENCES Clones(id) ON DELETE CASCADE;