# PAP: Bases de Dados e Modelagem

## Objetivo
Aprender os conceitos fundamentais de bases de dados e criar o modelo relacional (diagrama ER) para o projeto.

---

## Introdução às Bases de Dados

### Objetivo
Perceber o que é uma base de dados e para que serve.

### Tarefas
- Escrever no relatório:
  > Uma base de dados é um conjunto de informações organizadas. No projeto, será usada para guardar utilizadores, cartões de crédito e transações.  
  > Será uma base de dados **relacional**, composta por **tabelas** interligadas por **relacionamentos**.

- Ver vídeo: “O que é uma base de dados relacional - Curso em Vídeo”.

---

## Estrutura das Bases de Dados

### Conceitos Importantes
- **Tabela:** conjunto de dados sobre um tema.  
- **Campo (coluna):** tipo de dado (ex: valor, data).  
- **Registo (linha):** item de informação.  
- **Chave Primária:** identificador único.  
- **Chave Estrangeira:** ligação entre tabelas.

### Exemplo
```
TABELA: USERS
id | nome | email
1  | João | joao@email.com

TABELA: CARDS
id | nome_cartao | limite | user_id
1  | Visa João   | 1000   | 1
```

---

## Criar o Diagrama ER

### Ferramenta
  [https://dbdiagram.io](https://dbdiagram.io)

### Código do Modelo
```
Table users {
  id int [pk]
  nome varchar
  email varchar
  password_hash varchar
  created_at timestamp
}

Table cards {
  id int [pk]
  user_id int [ref: > users.id]
  nome_cartao varchar
  limite decimal
  created_at timestamp
}

Table transactions {
  id int [pk]
  card_id int [ref: > cards.id]
  user_id int [ref: > users.id]
  valor decimal
  categoria varchar
  descricao varchar
  data date
  created_at timestamp
}
```

### Resultado
- Exportar imagem `diagrama_er.png`
- Guardar em `/imagens`
- Inserir no relatório (secção “Modelagem da Base de Dados”).

---

## Primeiros Comandos SQL

### Ferramenta
  MySQL Workbench ou phpMyAdmin — [https://www.mysql.com/products/workbench/](https://www.mysql.com/products/workbench/)

### Tarefas
1. Criar base `pap_cartao`
2. Executar:
```sql
USE pap_cartao;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (nome, email, password_hash)
VALUES ('João Silva', 'joao@email.com', 'hash123');

SELECT * FROM users;
```

### Resultado
- Primeira tabela criada e consultada com sucesso.

---

## Criar as Tabelas do Projeto

### Código SQL
```sql
USE pap_cartao;

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
```

### Inserir Dados de Teste
```sql
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
```

### Consultar
```sql
SELECT * FROM transactions;
```

---

## Revisão

- Fazer backup da base de dados `pap_cartao`.
- Tirar prints das tabelas e do diagrama.
- Escrever no relatório:
  - “3. Modelagem da Base de Dados”
  - Explicar brevemente as tabelas e colar as imagens.

---

## Resultado Final
- Compreender os conceitos de base de dados.  
- Criar o modelo ER e a base de dados real.  
- Inserir e consultar dados.  
- Ter prints e material para o relatório.
