class Circuito {
    getXML(files) {
        const archivo = files[0];
        const lector = new FileReader();
        lector.onload = (e) => {
            const xml = $.parseXML(e.target.result);
            const contenido = $('<p>').text(new XMLSerializer().serializeToString(xml));
            $('main').append(contenido);
        };
        lector.readAsText(archivo);
    }


    getKML(files) {
        const archivo = files[0];
    
        if (!archivo) {
            alert('Por favor, selecciona un archivo KML.');
            return;
        }
    
        const lector = new FileReader();
    
        lector.onload = (e) => {
            const xml = $.parseXML(e.target.result);
            const coordenadas = [];
    
            
            $(xml).find('coordinates').each((index, elem) => {
                const coordsText = $(elem).text().trim();
                const puntos = coordsText.split(/\s+/);
    
                puntos.forEach(punto => {
                    const [lng, lat] = punto.split(',').map(Number);
                    coordenadas.push({ lat, lng });
                });
            });
    
            if (coordenadas.length === 0) {
                alert('No se encontraron coordenadas en el archivo KML.');
                return;
            }
    
            const contenedorMapa = $('<div>').css({
                width: '100%',
                maxWidth: '800px',
                height: '400px',
                border: '6px double black',
                margin: '10px'
            });
            $('main').append(contenedorMapa);
    
            const mapa = new google.maps.Map(contenedorMapa[0], {
                zoom: 14,
                center: coordenadas[0]
            });
    
            const ruta = new google.maps.Polyline({
                path: coordenadas,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 4
            });
    
            ruta.setMap(mapa);
        };
    
        lector.readAsText(archivo);
    }
    
    
    
    

    leerArchivoSVG(files) {
        const archivo = files[0];
        const lector = new FileReader();
        lector.onload = (e) => {
            $('main').append(e.target.result);
        };
        lector.readAsText(archivo);
    }
}

const circuito = new Circuito();

$(document).on('change', 'input[type="file"]', function () {
    const tipo = $(this).attr('data-tipo');
    if (tipo === 'xml') circuito.getXML(this.files);
    if (tipo === 'kml') circuito.getKML(this.files);
    if (tipo === 'svg') circuito.leerArchivoSVG(this.files);
});
