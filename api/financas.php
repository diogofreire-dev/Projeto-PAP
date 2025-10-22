<?php
require_once 'config.php';
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
$stmt->close();
$conn->close();
?>