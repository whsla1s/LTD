<?php
header('Content-Type: application/json');
$server = "localhost";
$user = "root";
$password = "";
$db = "ltd_db";

$conn = mysqli_connect($server, $user, $password, $db);

if (!$conn) {
    echo json_encode(['success' => false, 'error' => 'Connection failed: ' . mysqli_connect_error()]);
    exit;
}

mysqli_set_charset($conn, "utf8mb4");