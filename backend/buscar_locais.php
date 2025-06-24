<?php
// Inclui o arquivo de conexão
include 'conn.php';

// Define o cabeçalho como JSON
header('Content-Type: application/json');

// Verifica se a conexão foi estabelecida
if (!$conn) {
    echo json_encode(['error' => 'Falha na conexão com o banco de dados']);
    exit;
}

try {
    // Consulta para buscar locais
    $query = "SELECT * FROM locais";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    $locais = [];
    while ($linha = $result->fetch_assoc()) {
        $locais[] = [
            'id' => $linha['id'],
            'nome' => $linha['nome'],
            'lat' => $linha['lat'],
            'lng' => $linha['lng'],
            'zoom' => $linha['zoom']
        ];
    }

    echo json_encode($locais);

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    // Retorna erro em caso de exceção
    echo json_encode(['error' => 'Erro ao executar a consulta: ' . $e->getMessage()]);
}
?>