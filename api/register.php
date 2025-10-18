<?php
require_once 'config.php';
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método não permitido', 405);
}

try {
    $nome = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $password_confirm = $_POST['password_confirm'] ?? '';
    
    if (empty($nome) || empty($email) || empty($password)) {
        sendError('Todos os campos são obrigatórios');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError('Email inválido');
    }
    
    if (strlen($password) < 6) {
        sendError('A senha deve ter pelo menos 6 caracteres');
    }
    
    if ($password !== $password_confirm) {
        sendError('As senhas não coincidem');
    }
    
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) {
        sendError('Este email já está registado');
    }
    
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (nome, email, password_hash) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $password_hash);
    
    if ($stmt->execute()) {
        sendSuccess(['message' => 'Conta criada!', 'user_id' => $conn->insert_id]);
    } else {
        sendError('Erro ao criar conta');
    }
    
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}
?>