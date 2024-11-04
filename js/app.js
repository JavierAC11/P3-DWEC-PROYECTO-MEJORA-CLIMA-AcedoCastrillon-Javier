//104866c3036b37b54b3c9550e41b4280

const container = document.querySelector('.container');
const form = document.querySelector('#formulario');
const res = document.querySelector('#resultado');
const localStorage = window.localStorage;

const btnUbicacion = document.createElement('button');
btnUbicacion.innerHTML = "Mostrar clima de mi ubicación";
btnUbicacion.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mt-6', 'w-full', 'md:w-1/2', 'lg:w-1/3', 'xl:w-1/4', 'mx-auto', 'block');
container.appendChild(btnUbicacion);

const btnFarenheit = document.createElement('button');
btnFarenheit.innerHTML = "Farenheit";
btnFarenheit.classList.add('bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mt-6', 'w-full', 'md:w-1/2', 'lg:w-1/3', 'xl:w-1/4', 'mx-auto', 'block');
container.appendChild(btnFarenheit);

const modal = document.querySelector('#modal');

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        modal.classList.add('hidden');
    }
})

window.addEventListener('load', () => {    
    const clima = localStorage.getItem("clima");
    if (!localStorage.getItem("grados")){
        localStorage.setItem("grados", "c");
    }

    
    //btnFarenheit.style.display = "none";
    if (clima) {
        mostrarClima(JSON.parse(clima), localStorage.getItem("grados"));
    }
   // form.appendChild(btnFarenheit);

    if (localStorage.getItem("grados") === "f"){
        btnFarenheit.innerHTML = "Celcius";
    }else{
        btnFarenheit.innerHTML = "Farenheit";
    }

    btnFarenheit.addEventListener('click', () => {
        if(btnFarenheit.innerHTML === "Farenheit"){
            btnFarenheit.innerHTML = "Celcius";
            localStorage.setItem("grados", "f");
            mostrarClima(JSON.parse(localStorage.getItem("clima")), localStorage.getItem("grados"));
        }
        else{
            btnFarenheit.innerHTML = "Farenheit";
            localStorage.setItem("grados", "c");
            mostrarClima(JSON.parse(localStorage.getItem("clima")), localStorage.getItem("grados"));
        }
    });

    btnUbicacion.addEventListener('click', () => {
        obtenerClimaPorUbicacion();
        
    });

    form.addEventListener('submit', (e)=>{
        if (e.target != btnFarenheit && e.target != btnUbicacion){ 
        obtenerClima(e)
        }
});      

    res.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-mm')) {
            cargarModal();
            modal.classList.remove('hidden');
        }
    })

});

form.addEventListener('submit', (e) => {
    mostrarSpinner()
});

function obtenerClima(e) {
    e.preventDefault();
    let ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if ( pais == "") {
        mostrarError("El pais es obligatorio");
        return;
    }else if(ciudad == ""){
        switch (pais) {
            case "AR": ciudad = "Buenos Aires";
                break;
            case "FR": ciudad = "Paris";
                break;
            case "MA": ciudad = "Marrakech";
                break;
            case "ES": ciudad = "Madrid";
                break;
            case "IE": ciudad = "Dublin";
                break;
            case "PY": ciudad = "Asuncion";
                break;
        }
    
        
    }
    btnFarenheit.style.display = "block";
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
            mostrarClima(JSON.parse(localStorage.getItem("clima")), localStorage.getItem("grados"));
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


// TODO: Obtener la ubicación del usuario y mostrar el clima de su ciudad
function obtenerClimaPorUbicacion() {
    return navigator.geolocation.getCurrentPosition(posicion => {
        btnFarenheit.style.display = "block";
        const {latitude, longitude} = posicion.coords;
        const apiKey = '104866c3036b37b54b3c9550e41b4280';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(data => {
                console.log(data)
                localStorage.setItem("clima", JSON.stringify(data));
                mostrarClima(JSON.parse(localStorage.getItem("clima")), localStorage.getItem("grados"));
            })
    });
    
}

function mostrarClima(data, tipo) {
    limpiarHTML();

    let temperatura = 0
    let max = 0;
    let min = 0;

    if (data.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return
    }
    const {name, sys: {country}, main: { temp, temp_max, temp_min } } = data;
    if (tipo === "c"){
        temperatura = kelvinACentigrados(temp) + "&#8451;";
        max = kelvinACentigrados(temp_max) + "&#8451;";
        min = kelvinACentigrados(temp_min) + "&#8451;";
        
    } else {
        temperatura = kelvinAFahrenheit(temp) + " &#8457;";
        max = kelvinAFahrenheit(temp_max) + " &#8457;";
        min = kelvinAFahrenheit(temp_min) + " &#8457;";
    }
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en ${name.charAt(0).toUpperCase() + name.slice(1)}, ${country}`;
    nombreCiudad.classList.add('font-bold', 'text-3xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${temperatura}`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max}`;
    tempMax.classList.add('font-bold', 'text-4xl')

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Max: ${min}`;
    tempMin.classList.add('font-bold', 'text-4xl')

    const btnMostrarMas = document.createElement('button');
    btnMostrarMas.innerHTML = "Mostrar más";
    btnMostrarMas.classList.add(`btn-mm`,'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mt-6', 'w-full', 'md:w-1/2', 'lg:w-1/3', 'xl:w-1/4', 'mx-auto', 'block');


    const resultado = document.createElement('div');
    resultado.classList.add('text-center', 'text-white');

    resultado.appendChild(nombreCiudad);
    resultado.appendChild(actual);
    resultado.appendChild(tempMax);
    resultado.appendChild(tempMin);
    resultado.appendChild(btnMostrarMas);
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

function cargarModal(){
    modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 class="text-xl font-bold mb-4">Mas Información</h2>
            <p class="mb-4">Presión: ${JSON.parse(localStorage.getItem("clima")).main.pressure}</p>
            <p class="mb-4">Humedad: ${JSON.parse(localStorage.getItem("clima")).main.humidity}%</p>
            <p class="mb-4">Velocidad del viento: ${JSON.parse(localStorage.getItem("clima")).wind.speed} m/s</p>
            <div class="flex justify-end">
              <button class="bg-red-500 text-white px-4 py-2 rounded close">Cerrar</button>
            </div>
          </div>
    `;
}


function limpiarHTML() {
    while (res.firstChild) {
        res.removeChild(res.firstChild);
        
    }
}

kelvinAFahrenheit = grados => parseInt((grados - 273.15) * 9/5 + 32);


kelvinACentigrados = grados => parseInt(grados - 273.15);