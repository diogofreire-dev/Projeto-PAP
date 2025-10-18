<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'pap_cartao');

function getConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Erro na conexão");
    }
    $conn->set_charset("utf8mb4");
    return $conn;
}

function checkAuth() {
    session_start();
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Não autenticado"]);
        exit;
    }
    return $_SESSION['user_id'];
}

function sendError($message, $code = 400) {
    http_response_code($code);
    echo json_encode(["success" => false, "error" => $message]);
    exit;
}

function sendSuccess($data) {
    echo json_encode(["success" => true, "data" => $data]);
    exit;
}
?>