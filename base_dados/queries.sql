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

#---Filtrar por datas e períodos---
# Gastos no mês atual
SELECT SUM(valor) AS total_mes
    FROM transactions
    WHERE card_id = 1
    AND MONTH(data) = MONTH(CURDATE())
    AND YEAR(data) = YEAR(CURDATE());

# Gastos por mês (histórico)
SELECT DATE_FORMAT(data, '%Y-%m') AS mes, SUM(valor) AS total, COUNT(*) AS transacoes
    FROM transactions
    WHERE card_id = 1
    GROUP BY mes
    ORDER BY mes DESC;

# Gastos nos ultimos 7 dias
SELECT data, SUM(valor) AS total
    FROM transactions
    WHERE card_id = 1
    AND data >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY data
    ORDER BY data DESC;

# Gastos entre duas datas
SELECT SUM(valor) AS total, COUNT(*) AS transacoes
    FROM transactions
    WHERE card_id = 1
    AND data BETWEEN '2025-10-01' AND '2025-10-31';

# Gastos por categoria no mês atual
SELECT categoria, SUM(valor) AS total
    FROM transactions
    WHERE card_id = 1
    AND MONTH(data) = MONTH(CURDATE())
    AND YEAR(data) = YEAR(CURDATE())
    GROUP BY categoria
    ORDER BY total DESC;

#---Juntar tudo (Relatório Completo)---
# Dashboard completo do cartão
SELECT u.nome AS utilizador, c.nome_cartao, c.limite,
COALESCE(SUM(t.valor), 0) AS total_gasto, (c.limite - COALESCE(SUM(t.valor), 0)) AS saldo_disponivel,
ROUND((COALESCE(SUM(t.valor), 0) / c.limite) * 100, 2) AS percentagem_usada,
COUNT(t.id) AS numero_transacoes
    FROM users u
    JOIN cards c ON u.id = c.user_id
    LEFT JOIN transactions t ON c.id = t.card_id
    WHERE c.id = 1
    GROUP BY c.id;

# Gastos por categoria (para gráficos)
SELECT categoria, SUM(valor) AS total, COUNT(*) AS quantidade, ROUND(AVG(valor), 2) AS media
    FROM transactions
    WHERE card_id = 1
    GROUP BY categoria
    ORDER BY total DESC;

# Últimas 5 transações
SELECT t.data, t.categoria, t.descricao, t.valor, c.nome_cartao
    FROM transactions t
    JOIN cards c ON t.card_id = c.id
    WHERE t.user_id = 1
    ORDER BY t.data DESC, t.created_at DESC
    LIMIT 5;

# Resumo mensal do utilizador
SELECT DATE_FORMAT(t.data, '%Y-%m') AS mes, COUNT(DISTINCT t.card_id) AS cartoes_usados,
COUNT(*) AS total_transacoes, SUM(t.valor) AS total_gasto
    FROM transactions t
    WHERE t.user_id = 1
    GROUP BY mes
    ORDER BY mes DESC;

# Alerta de limite
SELECT u.nome AS utilizador, c.nome_cartao, c.limite,
COALESCE(SUM(t.valor), 0) AS total_gasto,
ROUND((COALESCE(SUM(t.valor), 0) / c.limite) * 100, 2) AS percentagem_usada
    FROM users u
    JOIN cards c ON u.id = c.user_id
    LEFT JOIN transactions t ON c.id = t.card_id
    GROUP BY c.id
    HAVING percentagem_usada >= 80
    ORDER BY percentagem_usada DESC;