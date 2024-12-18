// Clase Noticias
class Noticias {
    constructor() {
        
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            $('main').prepend('<p>Este navegador soporta el API File.</p>');
        } else {
            $('main').prepend('<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>');
        }
    }

    
    readInputFile(files) {
        const archivo = files[0];
        if (!archivo) {
            alert("Por favor, selecciona un archivo.");
            return;
        }

        const tipoTexto = /text.*/;
        if (!archivo.type.match(tipoTexto)) {
            $('main').append('<p>Error: ¡¡¡ Archivo no válido !!!</p>');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.pintarNoticias(e.target.result);
        };
        reader.readAsText(archivo);
    }

    pintarNoticias(content) {
        const texto = content.split('\n');
        texto.forEach(linea => {
            if (linea.trim()) {
                const [titulo, entradilla, autor] = linea.split('_');
                const article = `
                    <article>
                        <h4>${titulo}</h4>
                        <p>${entradilla}</p>
                        <p><strong>Autor:</strong> ${autor}</p>
                    </article>
                `;
                $('main article section').append(article);
            }
        });
    }

    añadirNoticia() {
        const inputs = $('input[type="text"]');
        const titulo = inputs.eq(0).val();
        const entradilla = inputs.eq(1).val();
        const autor = inputs.eq(2).val();

        if (!titulo || !entradilla || !autor) {
            alert("Por favor, rellena todos los campos.");
            return;
        }

        const article = `
            <article>
                <h5>${titulo}</h5>
                <p>${entradilla}</p>
                <p><strong>Autor:</strong> ${autor}</p>
            </article>
        `;

        $('main article section').append(article);

        
        inputs.val('');
    }
}

// Instanciar la clase Noticias
const noticias = new Noticias();

// Evento para el input de archivo
$(document).on('change', 'input[type="file"]', function () {
    noticias.readInputFile(this.files);
});

// Evento para el botón de añadir noticia
$(document).on('click', 'button', function () {
    noticias.añadirNoticia();
});
