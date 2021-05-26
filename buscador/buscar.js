const fs = require("fs");
const neatCsv = require("neat-csv");
const paises = require("../data/paises").paises;
const colors = require('colors');
let datosAnio = [];
let informacion = [];


const cargarDatos = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, async(err, data) => {
            if (err) {
                reject("Error no se pudo leer el archivo");
            } else {
                resolve((informacion = await neatCsv(data)));
            }
        });
    });
};

const validarNum = (numero) => {
    if ((!Number(numero))) {
        throw Error(`${numero}: El valor no es un valor nuimerico`);
    }
};

const vecAnio = async(anio) => {
    let anios = Object.values(informacion[3]);
    anio = anios.indexOf(anio);
    for (let index = 4; index < informacion.length; index++) {

        datosAnio.push([
            informacion[index][anio],
            informacion[index][0],
            informacion[index][1],
            informacion[index][2]
        ]);
    }
    //return datosAnio.length;
    return true;
};

const limpiar = () => {
    vec = [];
    datosAnio.forEach((element) => {
        if (paises.includes(element[2])) {
            vec.push(element);
        }
    });
    datosAnio = vec;
};

const comprobarCodPais = (codigoPais) => {
    return new Promise((resolve, reject) => {
        datosAnio.forEach((element) => {
            if (element[2] == codigoPais) {
                resolve(true);
                return;
            }
        });
        reject(`El codigo de país: "${codigoPais}" no fue encontrado`);
    });
};

const comprobarAnio = (anio) => {
    let anios = Object.values(informacion[3]);
    return new Promise((resolve, reject) => {
        anios.forEach((element) => {
            if (element == anio) {
                resolve(true);
                return;
            }
        });
        reject(`El año ${anio} no es valido`.bgRed);
    });
};

const vectorPais = (codPais) => {
    dato = [];
    datosAnio.forEach((element) => {
        if (element[2] == codPais) {
            dato = element;
            return;
        }
    });
    return dato;
};


const obtenerEstadisticas = async(codPais, anio, path) => {
    await cargarDatos(path);
    validarNum(anio);
    vecAnio(anio);
    limpiar();
    await comprobarAnio(anio);
    await comprobarCodPais(codPais);
    let mediaPais = vectorPais(codPais)
    return {
        porcentaje: mediaPais[0],
        codigo: mediaPais[2],
        pais: mediaPais[1]
    };
};

//=========  GUARDAR EN ARCHIVO JSON ================

let crearArchivo = (datos, pais, anio) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(
                "resultados")) {
            fs.mkdirSync(
                "resultados");
        }
        archivo = `Datos:	Personas que usan Internet (% de la población)\n`;
        archivo += `Pais: ${datos.pais}\n`;
        archivo += `Año: ${anio}\n`;
        archivo += `Valor: ${datos.porcentaje}`
        fs.writeFile(`resultados/${datos.codigo}-${anio}.txt`, archivo, (err) => {
            if (err)
                reject(colors.red(err));
            else
                resolve(`Archivo guardado exitosamente: resultados/${datos.codigo}-${anio}.txt`.green);
        });
    });
};



module.exports = { obtenerEstadisticas, crearArchivo };