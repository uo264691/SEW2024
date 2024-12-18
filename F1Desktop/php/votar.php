<?php
include 'bd.php';
$db = new Database();


$result = $db->conn->query("SELECT id_piloto, nombre, apellido FROM Pilotos");


$carreraResult = $db->conn->query("SELECT id_carrera, nombre_circuito, fecha FROM Carreras c JOIN Circuitos ci ON c.id_circuito = ci.id_circuito ORDER BY RAND() LIMIT 1");
$carrera = $carreraResult->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Votar por el Podio - <?= htmlspecialchars($carrera['nombre_circuito']) ?> (<?= $carrera['fecha'] ?>)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Luis Fuertes Camporro" />
    <meta name="description" content="Página para votar por el podio de F1" />
    <meta name="keywords" content="F1, Votación, Podio, Pilotos" />
    <link rel="stylesheet" href="../estilo/estilo.css">
    <link rel="stylesheet" href="../estilo/layout.css">
    <script>
        function verificarVotacion() {
            const primero = document.querySelector('select[name="primero"]').value;
            const segundo = document.querySelector('select[name="segundo"]').value;
            const tercero = document.querySelector('select[name="tercero"]').value;
            const botonEnviar = document.querySelector('button[type="submit"]');

            if (primero === segundo || primero === tercero || segundo === tercero) {
                botonEnviar.disabled = true;
            } else {
                botonEnviar.disabled = false;
            }
        }

        
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('select').forEach(select => {
                select.addEventListener('change', verificarVotacion);
            });
            verificarVotacion();
        });
    </script>
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
        <h2>Votar por el Podio - <?= htmlspecialchars($carrera['nombre_circuito']) ?> (<?= $carrera['fecha'] ?>)</h2>
        <form action="procesar_votos.php" method="POST">
            <input type="hidden" name="id_carrera" value="<?= $carrera['id_carrera'] ?>">

            <label for="primero">1º Puesto (3 puntos):</label>
            <select name="primero" required>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <option value="<?= $row['id_piloto'] ?>"><?= htmlspecialchars($row['nombre']) . " " . htmlspecialchars($row['apellido']) ?></option>
                <?php endwhile; ?>
            </select><br><br>

            <label for="segundo">2º Puesto (2 puntos):</label>
            <select name="segundo" required>
                <?php mysqli_data_seek($result, 0); ?>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <option value="<?= $row['id_piloto'] ?>"><?= htmlspecialchars($row['nombre']) . " " . htmlspecialchars($row['apellido']) ?></option>
                <?php endwhile; ?>
            </select><br><br>

            <label for="tercero">3º Puesto (1 punto):</label>
            <select name="tercero" required>
                <?php mysqli_data_seek($result, 0); ?>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <option value="<?= $row['id_piloto'] ?>"><?= htmlspecialchars($row['nombre']) . " " . htmlspecialchars($row['apellido']) ?></option>
                <?php endwhile; ?>
            </select><br><br>

            <button type="submit" disabled>Enviar Votos</button>
        </form>
    </article>
</body>
</html>
