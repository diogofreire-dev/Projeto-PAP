<?php
header('Content-Type: application/json; charset=UTF-8');

//Conexão com o banco de dados
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "pap_cartao";
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erro na conexão: " . $conn->connect_error]));
}

//ID do usuário 
$user_id = 1;

//Consulta total gasto por categoria
$sql = "
    SELECT categoria, SUM(valor) AS total
    FROM transactions
    WHERE user_id = 
    GROUP BY categoria
";

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

echo json_encode([
    "labels" => $labels,
    "data" => $data
]);

$stmt->close();
$conn->close();
?>
