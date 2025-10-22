<?php
require_once 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    if (empty($nome) || empty($email) || empty($password)) {
        sendError("Todos os campos são obrigatórios");
    }
    
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        sendError("Email já registado");
    }
    
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (nome, email, password_hash) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $hash);
    if ($stmt->execute()) {
        $_SESSION['user_id'] = $conn->insert_id;
        $_SESSION['user_name'] = $nome;
        sendSuccess(["message" => "Registo bem-sucedido"]);
    } else {
        sendError("Erro no registo");
    }
    $stmt->close();
    $conn->close();
} else {
    sendError("Método inválido", 405);
}
?>