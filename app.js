const argv = require("./config/yargs").argv;
const colors = require("colors");
const http = require('http');
const fs = require('fs');
const { obtenerEstadisticas, crearArchivo } = require("./buscador/buscar");
//let comando = argv._[0]; // trae del objeto el comando alias
let file = argv.file;
let pais = argv.pais;
let year = argv.anio.toString();
let x = 0

let info;

const run = async() => {
    info = await obtenerEstadisticas(pais, year, file);
    opciones();
    return info;
};

const opciones = () => {
    let comando = argv._[0];
    switch (comando) {
        case "mostrar":
            console.log("======================================================================".red);
            console.log(`Datos: Personas que usan Internet (% de la población) `.yellow);
            console.log("======================================================================".red);
            console.log(`Pais: ${info.pais}`.cyan);
            console.log(`Año: ${year}`.green);
            console.log(`Valor: ${info.porcentaje}`.blue);
            break;
        case "guardar":
            crearArchivo(info, pais, year)
                .then((mensaje) => console.log(mensaje))
                .catch((err) => console.log(err));

            break;
        default:
            console.log("El comando no existe");
            break;
    }
};

run()
    .then()
    .catch((err) => {
        console.log(err);
    });