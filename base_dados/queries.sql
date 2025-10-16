SELECT * FROM users;

SELECT * FROM cards;

SELECT * FROM transactions;

'''
SELECT u.nome, c.nome_cartao, t.valor, t.categoria, t.data
FROM transactions t
JOIN cards c ON t.card_id = c.id
JOIN users u ON c.user_id = u.id;

SELECT categoria, SUM(valor) as total_gasto
FROM transactions
GROUP BY categoria
ORDER BY total_gasto DESC;

SELECT c.nome_cartao, c.limite, SUM(t.valor) as gasto_total,
       ROUND((SUM(t.valor) / c.limite) * 100, 2) as percentagem_usada
FROM cards c
LEFT JOIN transactions t ON c.id = t.card_id
GROUP BY c.id;
'''

# Calcular o total gasto num cartão
SELECT SUM(valor) AS total_gasto
    FROM transactions
    WHERE card_id = 1;

# Contar quantas transações existem
SELECT COUNT(*) AS total_transacoes
    FROM transactions
    WHERE card_id = 1;

# Ver gasto médio
SELECT AVG(valor) AS gasto_medio
    FROM transactions
    WHERE card_id = 1;

# Ver a transação mais cara
SELECT MAX(valor) AS gasto_maximo
    FROM transactions
    WHERE card_id = 1;

# Ver a transação mais barata
SELECT MIN(valor) AS gasto_minimo
    FROM transactions
    WHERE card_id = 1;

#---Agrupar dados por categoria---
# Toltal gasto por categoria
SELECT categoria, SUM(valor) AS total_gasto
    FROM transactions
    WHERE card_id = 1
    GROUP BY categoria;

# Quantidade de transações por categoria
SELECT categoria, COUNT(*) AS quantidade
    FROM transactions
    WHERE card_id = 1
    GROUP BY categoria
    ORDER BY quantidade DESC;

# Média de gato por categoria
SELECT categoria, AVG(valor) AS media, COUNT(*) AS quantidade
    FROM transactions
    WHERE card_id = 1
    GROUP BY categoria;

# Ver todas as categorias usadas
SELECT DISTINCT categoria
    FROM transactions
    WHERE card_id = 1;

#---Calcular Percentagens e Limites---
# Ver limite e o total gasto
SELECT c.nome_cartao, c.limite, COALESCE(SUM(t.valor), 0) AS total_gasto
    FROM cards c
    LEFT JOIN transactions t ON c.id = t.card_id
    WHERE c.id = 1
    GROUP BY c.id;

# Calcular saldo disponível
SELECT c.nome_cartao, c.limite, COALESCE(SUM(t.valor), 0) AS total_gasto, 
(c.limite - COALESCE(SUM(t.valor), 0)) AS saldo_disponivel
    FROM cards c
    LEFT JOIN transactions t ON c.id = t.card_id
    WHERE c.id = 1
    GROUP BY c.id;

# Calcular a percentagem usada
SELECT c.nome_cartao, c.limite, COALESCE(SUM(t.valor), 0) AS total_gasto, 
(c.limite - COALESCE(SUM(t.valor), 0)) AS saldo_disponivel,
ROUND((COALESCE(SUM(t.valor), 0) / c.limite) * 100, 2) AS percentagem_usada
    FROM cards c
    LEFT JOIN transactions t ON c.id = t.card_id
    WHERE c.id = 1
    GROUP BY c.id;

# Ver status de todos os cartões de um utilizador
SELECT u.nome AS utilizador, c.nome_cartao, c.limite,
  COALESCE(SUM(t.valor), 0) AS total_gasto,
  (c.limite - COALESCE(SUM(t.valor), 0)) AS saldo_disponivel,
  ROUND((COALESCE(SUM(t.valor), 0) / c.limite) * 100, 2) AS percentagem_usada
FROM users u
JOIN cards c ON u.id = c.user_id
LEFT JOIN transactions t ON c.id = t.card_id
WHERE u.id = 1
GROUP BY c.id;