-- ==================================
--         Inserir Users
-- ==================================
INSERT INTO Users (id, email, name, created_at)
VALUES
('u1-123e4567-e89b-12d3-a456-426614174000', 'alice@example.com', 'Alice Martins', NOW()),
('u2-123e4567-e89b-12d3-a456-426614174001', 'bruno@example.com', 'Bruno Silva', NOW()),
('u3-123e4567-e89b-12d3-a456-426614174002', 'carla@example.com', 'Carla Souza', NOW());

-- ==================================
--         Inserir Clones
-- ==================================
INSERT INTO Clones (id, user_id, name, age, nationality, personality_traits, base_prompt, avatar_color, created_at)
VALUES 
('c1-223e4567-e89b-12d3-a456-426614174100', 'u1-123e4567-e89b-12d3-a456-426614174000', 'Clone Alice', 25, 'Portuguese', 'Curiosa, extrovertida, energética', 'Fala de forma positiva e motivacional.', 'blue', NOW()),
('c2-223e4567-e89b-12d3-a456-426614174101', 'u1-123e4567-e89b-12d3-a456-426614174000', 'Clone Alice 2.0', 30, 'Brazilian', 'Calma, racional, focada', 'Responde com base em lógica e análise.', 'green', NOW()),
('c3-223e4567-e89b-12d3-a456-426614174102', 'u2-123e4567-e89b-12d3-a456-426614174001', 'Clone Bruno', 28, 'Spanish', 'Humorístico, criativo, extrovertido', 'Sempre adiciona humor às respostas.', 'red', NOW());

-- ==================================
--        Inserir Conversations
-- ==================================
INSERT INTO Conversations (id, clone_id, messages, last_message_at)
VALUES
('conv1-323e4567-e89b-12d3-a456-426614174200', 'c1-223e4567-e89b-12d3-a456-426614174100',
 '[
    {"role": "user", "content": "Olá!"},
    {"role": "clone", "content": "Olá! Como estás hoje?"}
  ]', NOW()),

('conv2-323e4567-e89b-12d3-a456-426614174201', 'c2-223e4567-e89b-12d3-a456-426614174101',
 '[
    {"role": "user", "content": "Preciso de motivação."},
    {"role": "clone", "content": "Claro! Lembra-te de que cada dia é uma nova oportunidade."}
  ]', NOW()),

('conv3-323e4567-e89b-12d3-a456-426614174202', 'c3-223e4567-e89b-12d3-a456-426614174102',
 '[
    {"role": "user", "content": "Conta-me uma piada."},
    {"role": "clone", "content": "Por que o programador faliu? Porque ele usava muito cache 😂"}
  ]', NOW());
