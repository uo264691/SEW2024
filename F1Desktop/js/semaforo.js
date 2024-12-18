class Semaforo {
    constructor() {
        this.levels = [0.2, 0.5, 0.8];
        this.lights = 4;
        this.unload_moment = null;
        this.clic_moment = null;
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];

        this.createStructure();
    }

    createStructure() {
        const tablero = document.querySelector('main section');

        const title = document.createElement('h3');
        title.textContent = 'Juego del Semáforo';
        tablero.appendChild(title);

        const semaforo = document.createElement('article');
        semaforo.style.gridTemplateColumns = `repeat(${this.lights}, 1fr)`;

        for (let i = 0; i < this.lights; i++) {
            const light = document.createElement('div');
            light.classList.add('light');
            semaforo.appendChild(light);
        }

        tablero.appendChild(semaforo);

        const botonInicio = document.createElement('button');
        botonInicio.textContent = 'Start';
        botonInicio.addEventListener('click', () => this.initSequence(botonInicio));
        tablero.appendChild(botonInicio);

        const botonReaccionar = document.createElement('button');
        botonReaccionar.textContent = 'Reacción';
        botonReaccionar.disabled = true;
        botonReaccionar.addEventListener('click', () => this.stopReaction(botonReaccionar, botonInicio));
        tablero.appendChild(botonReaccionar);

        const result = document.createElement('p');
        result.setAttribute('aria-live', 'polite');
        tablero.appendChild(result);
    }

    initSequence(bInicio) {
        bInicio.disabled = true;
        document.querySelector('main section article').classList.add('load');

        setTimeout(() => {
            this.unload_moment = new Date();
            document.querySelector('main section article').classList.add('unload');
            document.querySelector('button:nth-of-type(2)').disabled = false;
        }, 2000 + this.difficulty * 100);
    }

    stopReaction(bReaccion, bInicio) {
        this.clic_moment = new Date();
        const tiempoReaccion = ((this.clic_moment - this.unload_moment) / 1000).toFixed(3);
        document.querySelector('main section p').textContent = `Tu tiempo de reacción es: ${tiempoReaccion} segundos.`;

        bReaccion.disabled = true;
        bInicio.disabled = false;
        document.querySelector('main section article').classList.remove('load', 'unload');

        this.createRecordForm(tiempoReaccion, this.difficulty);
    }

    /* Este metodo es para la práctica PHP por si me olvido*/
    createRecordForm(tiempoReaccion, difficulty) {
        const tablero = document.querySelector('main');
    
        const form = $(`
            <form method="POST" action="semaforo.php">
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre" id="nombre" required>
    
                <label for="apellidos">Apellidos:</label>
                <input type="text" name="apellidos" id="apellidos" required>
    
                <label for="nivel">Nivel:</label>
                <input type="text" name="nivel" id="nivel" value="${difficulty}" readonly>
    
                <label for="tiempo">Tiempo de reacción:</label>
                <input type="text" name="tiempo" id="tiempo" value="${tiempoReaccion}" readonly>
    
                <button type="submit">Guardar Récord</button>
            </form>
        `);
    
        $(tablero).append(form);
    }
}

document.addEventListener('DOMContentLoaded', () => new Semaforo());
