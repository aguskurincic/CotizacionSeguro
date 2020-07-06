//Constructor cotizar seguro
class Seguro {
    constructor(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    cotizarSeguro() {
        /*
            Ford: 1.15
            AR: 1.20
            Honda: 1.10
            Jeep: 1.05
            Ferrari: 1.25
            ML: 1.30
        */
    
        //Precio base a multiplicar
        const base = 4000;
        let cantidad;
    
        switch(this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.20;
                break;
            case '3':
                cantidad = base * 1.10;
                break;
            case '4':
                cantidad = base * 1.05;
                break;
            case '5':
                cantidad = base * 1.25;
                break;
            case '6':
                cantidad = base * 1.30;
                break;
        }
    
        //Dependencia del año
        const diferencia = new Date().getFullYear() - this.anio;
    
        //Disminuir un 3% por c/año
        cantidad -= ((diferencia * 3) * cantidad) / 100;
    
        /* 
            Seguro básico = + 30%
            Seguro completo = + 50%
        */
    
        //Tipo de seguro
        if(this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        
        return cantidad;
        
    }
}

//Interfaz
class Interfaz {
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
    
        if(tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        form.insertBefore(div, document.querySelector('.form-group'));
    
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
    //Imprime resultado de cotización
    mostrarResultado(seguro, total) {
        const resultado = document.getElementById('resultado');
        let marca;

        switch(seguro.marca){
            case '1':
                marca = 'Ford';
                break;
            case '2':
                marca = 'Alfa Romeo';
                break;
            case '3':
                marca = 'Honda';
                break;
            case '4':
                marca = 'Jeep';
                break;
            case '5':
                marca = 'Ferrari';
                break;
            case '6':
                marca = 'McLaren';
                break;
        }
        
        //Crear div
        const div = document.createElement('div');
        //Insertar información
        div.innerHTML = `
            <p class='header'>Summary:</p>
            <p>Brand: ${marca}</p>
            <p>Year: ${seguro.anio}</p>
            <p>Type: ${seguro.tipo}</p>
            <p>Total: $${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);
}    
}



//Event listener
const form = document.getElementById('cotizar-seguro');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    //Leer la marca seleccionada del select (valor númerico)
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //Leer el año
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //Leer valor radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Crear instancia de interfaz
    const interfaz = new Interfaz();

    //Revisar campos no estén vacíos
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {
        //Interfaz imprime error
        interfaz.mostrarMensaje('Faltan campos, revise el formulario', 'error');
    } else {
        //Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove();
        }

        //Instanciar seguro
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);     

        //Cotizar seguro
        const cantidad = seguro.cotizarSeguro(seguro);
        
        //Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando, espere un momento...', 'exito');
    }
    
})

//Fecha max y min
const max = new Date().getFullYear();  //Fecha actual
      min = max - 20;

const selectYear = document.getElementById('anio');
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYear.appendChild(option);  //Agrega la info de option al id del html
}