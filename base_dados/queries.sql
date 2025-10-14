SELECT * FROM users;

SELECT * FROM cards;

SELECT * FROM transactions;

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