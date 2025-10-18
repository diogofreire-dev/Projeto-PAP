<?php
session_start();
session_destroy();
header('Content-Type: application/json; charset=UTF-8');
echo json_encode(['success' => true, 'message' => 'Logout realizado']);
?>