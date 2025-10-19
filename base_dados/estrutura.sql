USE pap_cartao;

-- Criar tabelas
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


INSERT INTO cards (user_id, nome_cartao, limite) VALUES 
  (1, 'Visa João', 1000.00),
  (2, 'Mastercard Maria', 800.00);

INSERT INTO transactions (card_id, user_id, valor, categoria, descricao, data) VALUES 
  (1, 1, 50.00, 'Alimentação', 'Supermercado', '2025-10-10'),
  (1, 1, 25.00, 'Transporte', 'Uber', '2025-10-11'),
  (2, 2, 30.00, 'Alimentação', 'Restaurante', '2025-10-10');