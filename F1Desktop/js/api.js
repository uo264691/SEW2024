class PintaBigotes {
    constructor() {
        this.section = document.querySelector('main section');
        this.canvas = this.section.querySelector('canvas');
        this.contexto = this.canvas.getContext('2d');
        this.botonAñadirFoto = this.section.querySelectorAll('button')[0];
        this.botonGuardar = this.section.querySelectorAll('button')[1];
        this.botonLimpiar = this.section.querySelectorAll('button')[2];
        this.parrafo = this.section.querySelector('p');
        
        this.cargarImagenAlonso();
        this.agregarEventos();
    }

    cargarImagenAlonso() {
        const img = new Image();
        img.src = 'multimedia/imagenes/alonso.jpg';
        img.onload = () => {
            this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.contexto.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.cargarDibujoGuardado();
        };
    }

    agregarEventos() {
        let dibujando = false;

        this.canvas.addEventListener('mousedown', () => {
            dibujando = true;
            this.contexto.beginPath();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (dibujando) {
                this.contexto.lineTo(e.offsetX, e.offsetY);
                this.contexto.stroke();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            dibujando = false;
            this.contexto.closePath();
        });

        this.botonAñadirFoto.addEventListener('click', () => this.seleccionarOtraFoto());
        this.botonGuardar.addEventListener('click', () => this.guardarDibujo());
        this.botonLimpiar.addEventListener('click', () => this.limpiarDibujo());
    }

    seleccionarOtraFoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', (e) => {
            const archivo = e.target.files[0];
            if (archivo) {
                const img = new Image();
                img.src = URL.createObjectURL(archivo);
                img.onload = () => {
                    this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.contexto.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                };
            }
        });
        input.click();
    }

    guardarDibujo() {
        const dibujo = this.canvas.toDataURL();
        localStorage.setItem('dibujoGuardado', dibujo);
        alert('Dibujo guardado correctamente.');
    }

    cargarDibujoGuardado() {
        const dibujoGuardado = localStorage.getItem('dibujoGuardado');
        if (dibujoGuardado) {
            const img = new Image();
            img.src = dibujoGuardado;
            img.onload = () => {
                this.contexto.drawImage(img, 0, 0);
            };
        }
    }

    limpiarDibujo() {
        this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
        localStorage.removeItem('dibujoGuardado');
        this.cargarImagenAlonso();
    }
}


document.addEventListener('DOMContentLoaded', () => new PintaBigotes());
