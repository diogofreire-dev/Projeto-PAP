<?php
require_once 'config.php';
header('Content-Type: application/json');
$user_id = checkAuth();
$conn = getConnection();

// GET - Listar todas as categorias usadas pelo utilizador
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Obter categorias únicas com estatísticas
    $sql = "SELECT 
        categoria,
        COUNT(*) AS total_transacoes,
        SUM(valor) AS total_gasto,
        ROUND(AVG(valor), 2) AS gasto_medio,
        MAX(valor) AS gasto_maximo,
        MIN(valor) AS gasto_minimo,
        MAX(data) AS ultima_transacao
        FROM transactions
        WHERE user_id = ?
        GROUP BY categoria
        ORDER BY total_gasto DESC";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $categorias = [];
    while ($row = $result->fetch_assoc()) {
        $categorias[] = $row;
    }
    
    sendSuccess($categorias);
    $stmt->close();
}

$conn->close();
?>