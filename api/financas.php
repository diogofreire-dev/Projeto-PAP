<?php
header('Content-Type: application/json; charset=UTF-8');

try {
    // Conexão com o banco de dados
    $host = "localhost";
    $user = "root";
    $pass = "";
    $dbname = "pap_cartao";
    
    $conn = new mysqli($host, $user, $pass, $dbname);
    
    if ($conn->connect_error) {
        throw new Exception("Erro na conexão: " . $conn->connect_error);
    }
    
    // ID do usuário
    $user_id = 1;
    
    // Consulta total gasto por categoria
    $sql = "
        SELECT categoria, SUM(valor) AS total
        FROM transactions
        WHERE user_id = ?
        GROUP BY categoria
    ";
    
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Erro ao preparar a query: " . $conn->error);
    }
    
    $stmt->bind_param("i", $user_id);
    
    if (!$stmt->execute()) {
        throw new Exception("Erro ao executar a query: " . $stmt->error);
    }
    
    $result = $stmt->get_result();
    $labels = [];
    $data = [];
    
    while ($row = $result->fetch_assoc()) {
        $labels[] = $row['categoria'];
        $data[] = (float)$row['total'];
    }
    
    echo json_encode([
        "labels" => $labels,
        "data" => $data,
        "success" => true
    ]);
    
    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => $e->getMessage(),
        "success" => false
    ]);
}