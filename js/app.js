//104866c3036b37b54b3c9550e41b4280

const container = document.querySelector('.container');
const form = document.querySelector('#formulario');
const res = document.querySelector('#resultado');
const localStorage = window.localStorage;
//const btn = document.querySelector('input[type="submit"][value="Obtener Clima"]');

window.addEventListener('load', () => {
    const clima = localStorage.getItem("clima");
    if (clima) {
        console.log(JSON.parse(clima));
        mostrarClima(JSON.parse(clima));
    }
    console.log("Página cargada");
    form.addEventListener('submit', (e)=> 
        obtenerClima(e)
        
        );      
});

form.addEventListener('submit', (e) => {
    mostrarSpinner()
});

function obtenerClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    console.log(ciudad, pais);
    if (ciudad == "" || pais == "") {
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais) {
    const apiKey = '104866c3036b37b54b3c9550e41b4280';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            if (data.cod === "404") {
                mostrarError("Ciudad no encontrada");
                return;
            }
            localStorage.setItem("clima", JSON.stringify(data));
            mostrarClima(data);
        })
}

function mostrarError(mensaje) {
    let alerta = document.querySelector('.bg-red-100');
    if (!alerta){
        
        alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        if(res.firstChild){
            res.firstChild.remove();   
        }
        res.appendChild(alerta);
        setTimeout(() => {
            alerta.remove
        }, 3000)
    }
}

function mostrarClima(data) {
    limpiarHTML();

    if (data.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return
    }
    const {name, main: { temp, temp_max, temp_min } } = data;
    
    const temperatura = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    nombreCiudad.classList.add('font-bold', 'text-3xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${temperatura} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('font-bold', 'text-4xl')

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Max: ${min} &#8451;`;
    tempMin.classList.add('font-bold', 'text-4xl')


    const resultado = document.createElement('div');
    resultado.classList.add('text-center', 'text-white');

    resultado.appendChild(nombreCiudad);
    resultado.appendChild(actual);
    resultado.appendChild(tempMax);
    resultado.appendChild(tempMin);
    res.appendChild(resultado);
}

function mostrarSpinner() {
    res.innerHTML = `<div id="spinner">
            <div class="sk-fading-circle">
                <div class="sk-circle1 sk-circle"></div>
                <div class="sk-circle2 sk-circle"></div>
                <div class="sk-circle3 sk-circle"></div>
                <div class="sk-circle4 sk-circle"></div>
                <div class="sk-circle5 sk-circle"></div>
                <div class="sk-circle6 sk-circle"></div>
                <div class="sk-circle7 sk-circle"></div>
                <div class="sk-circle8 sk-circle"></div>
                <div class="sk-circle9 sk-circle"></div>
                <div class="sk-circle10 sk-circle"></div>
                <div class="sk-circle11 sk-circle"></div>
                <div class="sk-circle12 sk-circle"></div>
              </div>
            </div>`;

}


function limpiarHTML() {
    while (res.firstChild) {
        res.removeChild(res.firstChild);
    }
}

kelvinACentigrados = grados => parseInt(grados - 273.15);