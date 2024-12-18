<?php
class Carrusel {
    private $capital;
    private $pais;
    private $fotos;

    public function __construct($capital, $pais) {
        $this->capital = $capital;
        $this->pais = $pais;
        $this->fotos = [];
    }

    public function obtenerFotos() {
        $apiKey = '6af488e9bcde833a6f21075e6d44f459'; 
        $query = urlencode($this->pais);
        $url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=$apiKey&tags=$query&format=json&nojsoncallback=1&per_page=10";

        $response = file_get_contents($url);
        $data = json_decode($response, true);

        if (isset($data['photos']['photo'])) {
            foreach ($data['photos']['photo'] as $photo) {
                $farmId = $photo['farm'];
                $serverId = $photo['server'];
                $photoId = $photo['id'];
                $secret = $photo['secret'];
                $photoUrl = "https://farm$farmId.staticflickr.com/$serverId/$photoId"."_"."$secret.jpg";

                $this->fotos[] = $photoUrl;
            }
        }
    }

    public function mostrarCarrusel() {
        echo '<section>';
        foreach ($this->fotos as $foto) {
            echo "<figure><img src='$foto' alt='Foto de $this->pais'></figure>";
        }
        echo '</section>';
    }
}

class Moneda {
    private $monedaLocal;
    private $monedaCambio;
    private $tipoCambio;

    public function __construct($monedaLocal, $monedaCambio) {
        $this->monedaLocal = $monedaLocal;
        $this->monedaCambio = $monedaCambio;
        $this->tipoCambio = null;
    }

    public function obtenerCambio() {

        $apiKey = '47fb0b4a05a43cfbe605b596';
        $url = "https://v6.exchangerate-api.com/v6/{$apiKey}/latest/EUR";

        $response = file_get_contents($url);
        $data = json_decode($response, true);

        if ($data && $data['result'] === 'success' && isset($data['conversion_rates'][$this->monedaLocal])) {
            $this->tipoCambio = $data['conversion_rates'][$this->monedaLocal];
        } else {
            $this->tipoCambio = "No se pudo obtener el tipo de cambio.";
    }
}

    public function mostrarCambio() {
        if ($this->tipoCambio) {
            echo "<p>1 {$this->monedaCambio} equivale a {$this->tipoCambio} {$this->monedaLocal}.</p>";
        } else {
            echo "<p>No se pudo obtener el tipo de cambio.</p>";
        }
    }
}

$carrusel = new Carrusel('Ciudad de México', 'México');
$carrusel->obtenerFotos();

$moneda = new Moneda('MXN', 'EUR');
$moneda->obtenerCambio();
?>




<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Luis Fuertes Camporro">
    <meta name="description" content="Página de viajes con geolocalización y carrusel de imágenes">
    <meta name="keywords" content="Viajes, F1, Geolocalización, Mapas, Carrusel">
    <link rel="stylesheet" href="estilo/estilo.css">
    <link rel="stylesheet" href="estilo/mapas.css">
    <link rel="stylesheet" href="estilo/layout.css">
    <title>F1 Desktop - Viajes</title>
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
                <li><a href="meteorologia.html">Meteorología</a></li>
                <li><a href="circuito.html">Circuito</a></li>
                <li><a href="viajes.php" class="active">Viajes</a></li>
                <li><a href="juegos.html">Juegos</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h2>Carrusel de Imágenes de México</h2>
        <?php $carrusel->mostrarCarrusel(); ?>

        <h2>Tipo de Cambio</h2>
        <?php $moneda->mostrarCambio(); ?>
    </main>

    <footer>
        <p>F1 Desktop | Creado por Luis Fuertes Camporro UO264691</p>
    </footer>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbhqDEkrpYBbkh8YtsmtKbro1TR2LCP4Q"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="js/viajes.js"></script>
</body>

</html>
