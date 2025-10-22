<?php
require_once 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    if (empty($email) || empty($password)) {
        sendError("Email e senha obrigatórios");
    }
    
    $conn = getConnection();
    $stmt = $conn->prepare("SELECT id, nome, password_hash FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['nome'];
            sendSuccess(["message" => "Login bem-sucedido"]);
        } else {
            sendError("Senha incorreta");
        }
    } else {
        sendError("Email não encontrado");
    }
    $stmt->close();
    $conn->close();
} else {
    sendError("Método inválido", 405);
}
?>