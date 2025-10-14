CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nome_cartao VARCHAR(100),
  limite DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  card_id INT NOT NULL,
  user_id INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(100),
  descricao VARCHAR(255),
  data DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (nome, email, password_hash)
VALUES 
  ('João Silva', 'joao@email.com', 'hash123'),
  ('Maria Santos', 'maria@email.com', 'hash456');

INSERT INTO cards (user_id, nome_cartao, limite)
VALUES 
  (1, 'Visa João', 1000),
  (2, 'Mastercard Maria', 800);

INSERT INTO transactions (card_id, user_id, valor, categoria, descricao, data)
VALUES 
  (1, 1, 50, 'Alimentação', 'Supermercado', '2025-10-10'),
  (1, 1, 25, 'Transporte', 'Uber', '2025-10-11'),
  (2, 2, 30, 'Alimentação', 'Restaurante', '2025-10-10');