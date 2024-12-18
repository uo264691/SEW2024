<?php
include 'bd.php';
$db = new Database();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $primero = $_POST['primero'];
    $segundo = $_POST['segundo'];
    $tercero = $_POST['tercero'];

    
    function acumularPuntos($db, $id_piloto, $puntos) {
        
        $stmt = $db->conn->prepare("SELECT puntos_totales FROM Resultados WHERE id_piloto = ?");
        $stmt->bind_param("i", $id_piloto);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            
            $stmt = $db->conn->prepare("UPDATE Resultados SET puntos_totales = puntos_totales + ? WHERE id_piloto = ?");
            $stmt->bind_param("ii", $puntos, $id_piloto);
        } else {
            
            $stmt = $db->conn->prepare("INSERT INTO Resultados (id_piloto, puntos_totales) VALUES (?, ?)");
            $stmt->bind_param("ii", $id_piloto, $puntos);
        }

        $stmt->execute();
        $stmt->close();
    }

    
    acumularPuntos($db, $primero, 3);
    acumularPuntos($db, $segundo, 2);
    acumularPuntos($db, $tercero, 1);

}
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
                <li><a class="active" href="votar.php">Votar por el Podio</a></li>
                <li><a href="resultados.php">Ver Resultados</a></li>
            </ul>
        </nav>
    </header>

    <article>
        <p>Votos registrados correctamente.</p>
        <a href="resultados.php">Ver Resultados</a>
    </table>
</article>
</body>
</html>
