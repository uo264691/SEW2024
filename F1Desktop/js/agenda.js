class Agenda {
    constructor() {
        this.url = 'http://ergast.com/api/f1/current.json';
    }

    getCalendario() {
        $.ajax({
            url: this.url,
            method: 'GET',
            dataType: 'json',
            success: (data) => this.pintarCalendario(data),
            error: (err) => {
                console.error('Error al obtener los datos:', err);
                $('main').append('<p>Error al obtener la información de las carreras.</p>');
            }
        });
    }


    pintarCalendario(data) {
        $('main').append('<h2>Calendario de 2024</h2>');
        const calendario = data.MRData.RaceTable.Races;
        const tablero = $('<section></section>');

        calendario.forEach(carrera => {
            const nombreCarrera = carrera.raceName;
            const nombreCircuito = carrera.Circuit.circuitName;
            const fecha = carrera.date;
            const hora = carrera.time ? carrera.time : 'Sin hora';
            const coordenadas = `Latitud: ${carrera.Circuit.Location.lat}, Longitud: ${carrera.Circuit.Location.long}`;

            const article = $(`
                <article>
                    <h3>${nombreCarrera}</h3>
                    <ul>
                        <li><strong>Circuito:</strong> ${nombreCircuito}</li>
                        <li><strong>Fecha:</strong> ${fecha}</li>
                        <li><strong>Hora:</strong> ${hora}</li>
                        <li><strong>Coordenadas:</strong> ${coordenadas}</li>
                    </ul>
                </article>
            `);

            tablero.append(article);
        });

        $('main').append(tablero);
    }
}

$(document).ready(() => {
    const agenda = new Agenda();

    $('main button').on('click', () => {
        agenda.getCalendario();
    });
});
