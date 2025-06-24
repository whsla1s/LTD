<?php
header('Content-Type: application/json');
include 'conn.php';

$mode = $_GET['mode'] ?? 'normal';

$query = "SELECT r.score, u.nome AS name, u.email
        FROM ranking r
        JOIN usuarios u ON r.user_id = u.id
        WHERE r.mode = ?
        ORDER BY r.score DESC
        LIMIT 1000";

$stmt = $conn->prepare($query);
$stmt->bind_param("s", $mode);
$stmt->execute();
$result = $stmt->get_result();

$ranking = [];
while ($row = $result->fetch_assoc()) {
    $ranking[] = $row;
}

echo json_encode($ranking);

$stmt->close();
$conn->close();
?>