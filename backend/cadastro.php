<?php
session_start();
header('Content-Type: application/json');
require_once 'conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $idade = $_POST['idade'] ?? '';
    $email = $_POST['email'] ?? '';

    if (empty($nome) || empty($idade) || empty($email)) {
        echo json_encode(['success' => false, 'error' => 'Todos os campos são obrigatórios']);
        exit;
    }

    $stmt_check = $conn->prepare("SELECT id, nome, idade FROM usuarios WHERE email = ?");
    $stmt_check->bind_param("s", $email);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $_SESSION['usuario'] = $user;
        echo json_encode(['success' => true, 'user' => $user, 'message' => 'Login realizado com sucesso']);
        header("Location: " . ($_SERVER['HTTP_REFERER'] ?? '/'));
        exit;
    } else {
        $stmt_insert = $conn->prepare("INSERT INTO usuarios (nome, idade, email) VALUES (?, ?, ?)");
        $stmt_insert->bind_param("sis", $nome, $idade, $email);

        if ($stmt_insert->execute()) {
            $user_id = $conn->insert_id;
            $user = ['id' => $user_id, 'nome' => $nome, 'idade' => $idade, 'email' => $email];
            $_SESSION['usuario'] = $user;
            echo json_encode(['success' => true, 'user' => $user, 'message' => 'Cadastro realizado com sucesso']);
            header("Location: " . ($_SERVER['HTTP_REFERER'] ?? '/'));
            exit;
        } else {
            echo json_encode(['success' => false, 'error' => 'Erro ao cadastrar usuário']);
            http_response_code(500);
            header("Location: " . ($_SERVER['HTTP_REFERER'] ?? '/'));
            exit;
        }
        $stmt_insert->close();
    }

    $stmt_check->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Método inválido']);
    header("Location: " . ($_SERVER['HTTP_REFERER'] ?? '/'));
    exit;
}
?>