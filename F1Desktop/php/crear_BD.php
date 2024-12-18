<?php
class DatabaseCreator {
    private $host = 'localhost';
    private $user = 'root';
    private $pass = '';
    private $dbname = 'bd_f1';
    public $conn;

    public function __construct() {
        
        $this->conn = new mysqli($this->host, $this->user, $this->pass);

        if ($this->conn->connect_error) {
            die("Error de conexión: " . $this->conn->connect_error);
        }
    }

    
    public function verificarBaseDeDatos() {
        $result = $this->conn->query("SHOW DATABASES LIKE '{$this->dbname}'");
        return $result->num_rows > 0;
    }

    
    public function crearBaseDeDatos() {
        $sql = "CREATE DATABASE IF NOT EXISTS {$this->dbname}";
        if ($this->conn->query($sql) === TRUE) {
            echo "<p>Base de datos '{$this->dbname}' creada exitosamente.</p>";
        } else {
            echo "<p>Error al crear la base de datos: " . $this->conn->error . "</p>";
            return false;
        }
        return true;
    }

    
    public function inicializarTablas() {
        
        $this->conn->select_db($this->dbname);

        
        $sqlScript = file_get_contents('bd_f1.sql');
        if ($this->conn->multi_query($sqlScript)) {
            echo "<p>Tablas inicializadas exitosamente.</p>";
        } else {
            echo "<p>Error al inicializar las tablas: " . $this->conn->error . "</p>";
        }
    }

    public function ejecutar() {
        if ($this->verificarBaseDeDatos()) {
            echo "<p>La base de datos '{$this->dbname}' ya existe. Inicializando tablas...</p>";
        } else {
            if ($this->crearBaseDeDatos()) {
                echo "<p>Base de datos creada. Inicializando tablas...</p>";
            } else {
                return;
            }
        }

        $this->inicializarTablas();
        $this->conn->close();
    }
}

$databaseCreator = new DatabaseCreator();
$databaseCreator->ejecutar();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>F1 Votaciones - Resultados</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Luis Fuertes Camporro" />
    <meta name="description" content="Página inicial de votaciones" />
    <meta name="keywords" content="Resultados, Votar, Base de datos" />
    <link rel="stylesheet" href="../estilo/estilo.css">
    <link rel="stylesheet" href="../estilo/layout.css">
</head>
<body>
<header>
        <h1>F1 Votaciones</h1>
        <nav>
            <ul>
                <li><a href="../juegos.html">Volver a juegos</a></li>
                <li><a class="active" href="crear_bd.php">Crear/Inicializar Base de Datos</a></li>
                <li><a href="votar.php">Votar por el Podio</a></li>
                <li><a href="resultados.php">Ver Resultados</a></li>
            </ul>
        </nav>
    </header>
</body>
</html>

