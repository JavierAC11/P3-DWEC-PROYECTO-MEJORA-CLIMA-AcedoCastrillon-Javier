<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

# Mejoras

## 1. LocalStorage

Se ha implementado un local storage donde se guarda el ultimo sitio el cual se ha consultado el clima y los tipos de grados.

## 2. Consulta predeterminada

En caso de que solo se introduzca el pais no sara error si no que se consultara el clima de la capital.

## 3. Pasar a Fharenheit

Se ha añadido un boton por si los grados de quieren ver en Celsius o en Fharenheit.

## 4. Ubicación actual

Se ha añadido un boton el cual obtiene la ubicación del usuario y muestra el clima segun el lugar donde se encuantra.

## 5. Mostrar mas

Se ha añadido un boton para mostrar mas información en un modal. 

### Table of Contents

*   [obtenerClima][1]
    *   [Parameters][2]
*   [consultarAPI][3]
    *   [Parameters][4]
*   [mostrarError][5]
    *   [Parameters][6]
*   [obtenerClimaPorUbicacion][7]
*   [mostrarClima][8]
    *   [Parameters][9]
*   [mostrarSpinner][10]
*   [cargarModal][11]
*   [limpiarHTML][12]

## obtenerClima

Funcion para obtener el clima de una ciudad segun el formulario, si no se ingresa una ciudad, se setea una por defecto la capital del pais

### Parameters

*   `e` **any**&#x20;

Returns **any** Se sale cuando hay un error

## consultarAPI

Consulta la API de openweathermap para obtener el clima segun la ciudad y pais

### Parameters

*   `ciudad` **[String][13]**&#x20;
*   `pais` **[String][13]**&#x20;

## mostrarError

Muestra un mensaje de error en el html

### Parameters

*   `mensaje` **[String][13]**&#x20;

## obtenerClimaPorUbicacion

Obtiene la ubicacion del usuario y consulta el clima de esa ubicacion

## mostrarClima

Muestra el clima en el html segun el tipo de grados

### Parameters

*   `data` **[Object][14]** datos del clima
*   `tipo` **[String][13]** tipo de grados

## mostrarSpinner

Muestra un spinner en el html

## cargarModal

Carga el modal con mas informacion del clima

## limpiarHTML

Limpia el html

[1]: #obtenerclima

[2]: #parameters

[3]: #consultarapi

[4]: #parameters-1

[5]: #mostrarerror

[6]: #parameters-2

[7]: #obtenerclimaporubicacion

[8]: #mostrarclima

[9]: #parameters-3

[10]: #mostrarspinner

[11]: #cargarmodal

[12]: #limpiarhtml

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
