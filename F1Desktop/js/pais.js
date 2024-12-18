class Pais {

    constructor(nombre, capital) {
        this.nombre = nombre;
        this.capital = capital;

    }

    completaInformacion(poblacion, circuitoF1, tipoGobierno, coordenadasLineaMeta, religionMayoritaria) {
        this.poblacion = poblacion;
        this.circuitoF1 = circuitoF1;
        this.tipoGobierno = tipoGobierno;
        this.coordenadasLineaMeta = coordenadasLineaMeta;
        this.religionMayoritaria = religionMayoritaria;
    }

    getNombre() {
        return this.nombre;
    }
    getCapital() {
        return this.capital;
    }

    getInfoPais() {
        return `<li><strong>Población:</strong> ${this.poblacion}</li>
                <li><strong>Circuito de F1:</strong> ${this.circuitoF1}</li>
                <li><strong>Forma de Gobierno:</strong> ${this.tipoGobierno}</li>
                <li><strong>Coordenadas de la Línea de Meta:</strong> Latitud: ${this.coordenadasLineaMeta.latitud}, Longitud: ${this.coordenadasLineaMeta.longitud}</li>
                <li><strong>Religión Mayoritaria:</strong> ${this.religionMayoritaria}</li>
        `    }

    writeCoordenadas() {
        document.write("<p>Sus coordenadas son Latitud: " + this.coordenadasLineaMeta.latitud + " y  Longitud: " + this.coordenadasLineaMeta.longitud + "</p>");
    }

    getPrevision() {
        
        const apiKey = '707e7eb455460680867b5da16aebcc60';
        const latitud = this.coordenadasLineaMeta.latitud;
        const longitud = this.coordenadasLineaMeta.longitud;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${apiKey}&mode=xml&units=metric&lang=es`;
        
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'xml',
            success: (data) => {
                this.pintarPrevision(data);
            },
            error: (error) => {
                console.error('Error al obtener la previsión meteorológica:', error);
            }
        });
    }

    pintarPrevision(data) {
        const tiempo = document.createElement('section');
        tiempo.innerHTML = '<h3>Previsión Meteorológica</h3>';
    
        let articles = ''; 
    
        $(data).find('time').each((index, time) => {
            if (index >= 5) return false; 
    
            const fecha = $(time).attr('from').split('T')[0];
            const tempMax = $(time).find('temperature').attr('max');
            const tempMin = $(time).find('temperature').attr('min');
            const humedad = $(time).find('humidity').attr('value');
            const descripcion = $(time).find('symbol').attr('name');
            const icono = $(time).find('symbol').attr('var');
    
            
            articles += `
                <article>
                    <h4>${fecha}</h4>
                    <p><strong>Temperatura Máxima:</strong> ${tempMax} °C</p>
                    <p><strong>Temperatura Mínima:</strong> ${tempMin} °C</p>
                    <p><strong>Humedad:</strong> ${humedad}%</p>
                    <p><strong>Descripción:</strong> ${descripcion}</p>
                    <img src="https://openweathermap.org/img/wn/${icono}.png" alt="${descripcion}">
                </article>
            `;
        });
    
        
        tiempo.innerHTML += articles;
    
        
        document.querySelector('main article').appendChild(tiempo);
    }
    
}