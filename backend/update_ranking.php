<?php
include 'conn.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['user_id'] ?? null;
    $score = $_POST['score'] ?? null;
    $mode = $_POST['mode'] ?? null;

    // Validação dos dados
    if (!is_numeric($id) || !is_numeric($score) || empty($mode)) {
        echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
        exit;
    }

    // Verifica se já existe ranking para esse usuário e modo
    $querySelect = "SELECT score FROM ranking WHERE user_id = ? AND mode = ?";
    $stmtSelect = $conn->prepare($querySelect);
    $stmtSelect->bind_param("is", $id, $mode);
    $stmtSelect->execute();
    $result = $stmtSelect->get_result();

    if ($result->num_rows > 0) {
        // Obtém o score atual do banco
        $row = $result->fetch_assoc();
        $currentScore = $row['score'];

        // Atualiza somente se o novo score for maior
        if ($score > $currentScore) {
            $queryUpdate = "UPDATE ranking SET score = ? WHERE user_id = ? AND mode = ?";
            $stmtUpdate = $conn->prepare($queryUpdate);
            $stmtUpdate->bind_param("iis", $score, $id, $mode);

            if ($stmtUpdate->execute()) {
                echo json_encode(['success' => true, 'message' => 'Ranking atualizado com sucesso']);
            } else {
                echo json_encode(['success' => false, 'error' => 'Falha ao atualizar ranking']);
            }
            $stmtUpdate->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Nenhuma atualização necessária (pontuação menor ou igual)']);
        }
    } else {
        // Não existe – insere novo registro
        $queryInsert = "INSERT INTO ranking (user_id, score, mode) VALUES (?, ?, ?)";
        $stmtInsert = $conn->prepare($queryInsert);
        $stmtInsert->bind_param("iis", $id, $score, $mode);

        if ($stmtInsert->execute()) {
            echo json_encode(['success' => true, 'message' => 'Ranking inserido com sucesso']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Falha ao inserir ranking']);
        }
        $stmtInsert->close();
    }

    $stmtSelect->close();
    $conn->close();
    exit;
} else {
    echo json_encode(['success' => false, 'error' => 'Método inválido']);
    exit;
}
?>