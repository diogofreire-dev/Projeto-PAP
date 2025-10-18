<?php
require_once 'config.php';
header('Content-Type: application/json; charset=UTF-8');

try {
    $user_id = checkAuth();
    $conn = getConnection();
    
    $sql = "SELECT categoria, SUM(valor) AS total FROM transactions WHERE user_id = ? GROUP BY categoria";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $labels = [];
    $data = [];
    
    while ($row = $result->fetch_assoc()) {
        $labels[] = $row['categoria'];
        $data[] = (float)$row['total'];
    }
    
    sendSuccess(["labels" => $labels, "data" => $data]);
    
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}
?>