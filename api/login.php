<?php
require_once 'config.php';
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método não permitido', 405);
}

try {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        sendError('Email e senha são obrigatórios');
    }
    
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT id, nome, email, password_hash FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        sendError('Email ou senha incorretos');
    }
    
    $user = $result->fetch_assoc();
    
    if (!password_verify($password, $user['password_hash'])) {
        sendError('Email ou senha incorretos');
    }
    
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_nome'] = $user['nome'];
    $_SESSION['user_email'] = $user['email'];
    
    sendSuccess([
        'message' => 'Login realizado!',
        'user' => ['id' => $user['id'], 'nome' => $user['nome'], 'email' => $user['email']]
    ]);
    
} catch (Exception $e) {
    sendError($e->getMessage(), 500);
}
?>