<?php
include 'bd.php';
$db = new Database();


$filename = "resultados_f1.csv";


header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');


$output = fopen('php://output', 'w');


fputcsv($output, ['nombre', 'apellido', 'puntos']);


$result = $db->conn->query("
    SELECT p.nombre, p.apellido, r.puntos_totales
    FROM Resultados r
    JOIN Pilotos p ON r.id_piloto = p.id_piloto
    ORDER BY r.puntos_totales DESC
");


while ($row = $result->fetch_assoc()) {
    fputcsv($output, [$row['nombre'], $row['apellido'], $row['puntos_totales']]);
}


fclose($output);
exit;
?>
