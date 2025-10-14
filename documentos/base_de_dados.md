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
}

Table cards {
  id int [pk]
  user_id int [ref: > users.id]
  nome_cartao varchar
  limite decimal
}

Table transactions {
  id int [pk]
  card_id int [ref: > cards.id]
  valor decimal
  categoria varchar
  descricao varchar
  data date
}
```

### Resultado
- Exportar imagem `diagrama_er.png`
- Guardar em `/imagens`
- Inserir no relatório (secção “Modelagem da Base de Dados”).

---

## Primeiros Comandos SQL

### Ferramenta
  DB Browser for SQLite — [https://sqlitebrowser.org/](https://sqlitebrowser.org/)

### Tarefas
1. Criar base `pap_cartao.db`
2. Executar:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  email TEXT,
  password_hash TEXT
);

INSERT INTO users (nome, email, password_hash)
VALUES ('João', 'joao@email.com', '123');

SELECT * FROM users;
```

### Resultado
- Primeira tabela criada e consultada com sucesso.

---

## Criar as Tabelas do Projeto

### Código SQL
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  nome TEXT,
  email TEXT,
  password_hash TEXT
);

CREATE TABLE cards (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  nome_cartao TEXT,
  limite DECIMAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY,
  card_id INTEGER,
  valor DECIMAL,
  categoria TEXT,
  descricao TEXT,
  data DATE,
  FOREIGN KEY (card_id) REFERENCES cards(id)
);
```

### Inserir Dados de Teste
```sql
INSERT INTO users (nome, email, password_hash)
VALUES ('João', 'joao@email.com', '123');

INSERT INTO cards (user_id, nome_cartao, limite)
VALUES (1, 'Visa João', 1000);

INSERT INTO transactions (card_id, valor, categoria, descricao, data)
VALUES (1, 50, 'Alimentação', 'Supermercado', '2025-10-10');
```

### Consultar
```sql
SELECT * FROM transactions;
```

---

## Revisão

- Fazer backup do ficheiro `pap_cartao.db`.
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
