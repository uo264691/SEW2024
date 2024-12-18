class Viajes {
    constructor() {
        this.latitud = null;
        this.longitud = null;
        this.getPosicion();
    }

    getPosicion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (posicion) => this.guardarPosicion(posicion),
                (error) => this.manejarError(error)
            );
        } else {
            $('main').append('<p>La geolocalización no es soportada por este navegador.</p>');
        }
    }

    guardarPosicion(posicion) {
        this.latitud = posicion.coords.latitude;
        this.longitud = posicion.coords.longitude;
        this.pintarMapaEstatico();
        this.pintarMapaDinamico();
    }

    manejarError(error) {
        let mensaje;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                mensaje = 'El usuario denegó la solicitud de geolocalización.';
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = 'La información de ubicación no está disponible.';
                break;
            case error.TIMEOUT:
                mensaje = 'La petición para obtener la ubicación ha caducado.';
                break;
            default:
                mensaje = 'Se ha producido un error desconocido';
                break;
        }
        $('main').append(`<p>Error: ${mensaje}</p>`);
    }

    pintarMapaEstatico() {
        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${this.latitud},${this.longitud}&zoom=15&size=600x400&markers=${this.latitud},${this.longitud}&key=AIzaSyDbhqDEkrpYBbkh8YtsmtKbro1TR2LCP4Q`;
        $('main').append(`<img src="${url}" alt="Mapa Estático">`);
    }

    pintarMapaDinamico() {
        const mapaContenedor = $('<div>');
        $('main').append(mapaContenedor);

        const mapa = new google.maps.Map(mapaContenedor[0], {
            center: { lat: this.latitud, lng: this.longitud },
            zoom: 15
        });

        new google.maps.Marker({
            position: { lat: this.latitud, lng: this.longitud },
            map: mapa,
            title: 'Tu ubicación actual'
        });
    }
}

$(document).ready(function () {
    new Viajes();

    let currentIndex = 0;
    const slides = $('figure');
    const slideCount = slides.length;

    function showSlide(index) {
        slides.hide();
        slides.eq(index).show();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        showSlide(currentIndex);
    }

    showSlide(currentIndex);
    setInterval(nextSlide, 3000); 
});

