<?php
class Record {
    private $server;
    private $user;
    private $pass;
    private $dbname;
    public $conn;

    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";

        $this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($this->conn->connect_error) {
            die("Conexión fallida: " . $this->conn->connect_error);
        }
    }

    public function saveRecord($nombre, $apellidos, $nivel, $tiempo) {
        $stmt = $this->conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssd", $nombre, $apellidos, $nivel, $tiempo);

        if ($stmt->execute()) {
            echo "<p>Récord guardado con éxito.</p>";
            $this->getTopRecords($nivel);
        } else {
            echo "<p>Error al guardar el récord: " . $stmt->error . "</p>";
        }

        $stmt->close();
    }

    public function getTopRecords($nivel) {
        $stmt = $this->conn->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");
        $stmt->bind_param("s", $nivel);
        $stmt->execute();
        $result = $stmt->get_result();
    
        $html = "<h3>Top 10 Récords</h3>";
        $html .= "<ol>";
        while ($row = $result->fetch_assoc()) {
            $html .= "<li>" . htmlspecialchars($row["nombre"]) . " " . htmlspecialchars($row["apellidos"]) . " - " . $row["tiempo"] . " segundos</li>";
        }
        $html .= "</ol>";
    
        $stmt->close();
    
        return $html;
    }

    public function __destruct() {
        $this->conn->close();
    }
}

// Guardar el récord si se envía el formulario!!
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $nivel = $_POST["nivel"];
    $tiempo = $_POST["tiempo"];

    $record = new Record();
    $record->saveRecord($nombre, $apellidos, $nivel, $tiempo);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Luis Fuertes Camporro" />
    <meta name="description" content="Página sobre México" />
    <meta name="keywords" content="México, Ciudad de México" />
    <link rel="stylesheet" href="estilo/estilo.css">
    <link rel="stylesheet" href="estilo/semaforo_grid.css">
    <link rel="stylesheet" href="estilo/layout.css">
    
    <title>F1 Desktop</title>
</head>

<body>

    <header>
        <h1><a href="index.html">F1 Desktop</a></h1>
        <nav>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="piloto.html">Piloto</a></li>
                <li><a href="noticias.html">Noticias</a></li>
                <li><a href="calendario.html">Calendario</a></li>
                <li><a  href="meteorologia.html">Meteorología</a></li>
                <li><a href="circuito.html">Circuito</a></li>
                <li><a href="viajes.html">Viajes</a></li>
                <li><a class="active" href="juegos.html">Juegos</a></li>
            </ul>
        </nav>
        <p>Estás en: <a href="index.html">Inicio</a> >> Juegos</p>
    </header>

    <main>
        <article>
            <h2>Sección de juegos</h2>
            <article>
                <ul>
                    <li><a href="memoria.html">Memoria</a></li>
                    <li><a class="active" href="semaforo.php">Semáforo</a></li>
                    <li><a  href="api.html">Pinta Bigotes</a></li>
                </ul>
            </article>
        </article>
        <section>
            
        </section>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="js/semaforo.js"></script>
    </main>
    <aside>
        <?php
            if (isset($record)) {
                echo $record->getTopRecords($nivel);
            }
        ?>
    </aside>

    <footer>
        <p> F1 Desktop | Creado por Luis Fuertes Camporro UO264691</p>
    </footer>
</body>

</html>