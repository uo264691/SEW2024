<?php
include 'bd.php';
$db = new Database();

// Procesar la carga del archivo CSV para importar puntuaciones
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['csv_file'])) {
    $file = $_FILES['csv_file']['tmp_name'];

    if (($handle = fopen($file, 'r')) !== FALSE) {
        // Leer cada línea del CSV
        while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
            $nombre = $data[0];
            $apellido = $data[1];
            $puntos = (int)$data[2];

            // Buscar el piloto por nombre y apellido
            $stmt = $db->conn->prepare("SELECT id_piloto FROM Pilotos WHERE nombre = ? AND apellido = ?");
            $stmt->bind_param('ss', $nombre, $apellido);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $stmt->bind_result($id_piloto);
                $stmt->fetch();

                // Insertar o actualizar los puntos en la tabla Resultados
                $insertStmt = $db->conn->prepare("
                    INSERT INTO Resultados (id_piloto, puntos_totales)
                    VALUES (?, ?)
                    ON DUPLICATE KEY UPDATE puntos_totales = puntos_totales + VALUES(puntos_totales)
                ");
                $insertStmt->bind_param('ii', $id_piloto, $puntos);
                $insertStmt->execute();
                $insertStmt->close();
            }
            $stmt->close();
        }
        fclose($handle);
        echo "<p>CSV procesado y puntuaciones actualizadas correctamente.</p>";
    } else {
        echo "<p>Error al abrir el archivo CSV.</p>";
    }
}

// Obtener los resultados actualizados
$result = $db->conn->query("
    SELECT p.nombre, p.apellido, r.puntos_totales
    FROM Resultados r
    JOIN Pilotos p ON r.id_piloto = p.id_piloto
    ORDER BY r.puntos_totales DESC
");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>F1 Votaciones - Resultados</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Luis Fuertes Camporro" />
    <meta name="description" content="Página de visualización de resultados" />
    <meta name="keywords" content="Resultados, Votación, Nombre" />
    <link rel="stylesheet" href="../estilo/estilo.css">
    <link rel="stylesheet" href="../estilo/layout.css">
</head>
<body>
    <header>
        <h1>F1 Votaciones</h1>
        <nav>
            <ul>
                <li><a href="../juegos.html">Volver a juegos</a></li>
                <li><a href="crear_bd.php">Crear/Inicializar Base de Datos</a></li>
                <li><a href="votar.php">Votar por el Podio</a></li>
                <li><a class="active" href="resultados.php">Ver Resultados</a></li>
            </ul>
        </nav>
    </header>

    <article>
        <h2>Resultados de Votación</h2>


        <form action="exportar_resultados.php" method="GET">
            <button type="submit">Exportar Resultados a CSV</button>
        </form>

        <br>

 
        <table>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Puntos Totales</th>
            </tr>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?= htmlspecialchars($row['nombre']) ?></td>
                    <td><?= htmlspecialchars($row['apellido']) ?></td>
                    <td><?= $row['puntos_totales'] ?></td>
                </tr>
            <?php endwhile; ?>
        </table>

        <br>

        <h3>Importar Puntuaciones desde CSV</h3>
        <form action="resultados.php" method="POST" enctype="multipart/form-data">
            <label for="csv_file">Subir archivo CSV:</label>
            <input type="file" name="csv_file" id="csv_file" accept=".csv" required>
            <button type="submit">Importar CSV</button>
        </form>
    </article>
</body>
</html>
