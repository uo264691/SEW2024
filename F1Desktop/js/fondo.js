class Fondo {
    constructor(pais, capital, circuito) {
        this.pais = pais;
        this.capital = capital;
        this.circuito = circuito;
    }

    getFotos() {
        const apiKey = '6af488e9bcde833a6f21075e6d44f459';
        const palabrasBusqueda = `${this.circuito} ${this.pais}`;
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(palabrasBusqueda)}&format=json&nojsoncallback=1&per_page=5`;

        $.ajax({
            url: url,
            method: 'GET',
            success: (data) => {
                if (data.photos.photo.length > 0) {
                    const foto = data.photos.photo[0];
                    const fotoUrl = `https://live.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_b.jpg`;
                    this.pintarFondo(fotoUrl);
                } else {
                    console.log('No hay imágenes.');
                }
            },
            error: (error) => {
                console.error('Error al usar la API:', error);
            }
        });
    }

    pintarFondo(foto) {
        $('body section').css({
            'background-image': `url(${foto})`
        });
        
    }
}
