const file = {
    demand: true,
    alias: 'f',
    desc: 'Establecer el path del archivo CSV que contiene los datos a analizar'
}

const pais = {
    default: "ECU",
    alias: 'c',
    desc: 'Determinar el país a analizar a través de su código ISO 3166 ALPHA-3',
}

const year = {
    default: 1960,
    alias: 'y',
    desc: 'Especificar el año para el cual se requiere las estadísticas',
}


const argv = require('yargs')
    // Establece la descripcion del comando que se tendrá que ejecutar a nivel de linea de consola
    .command('mostrar', 'Imprimirá en pantalla el resultado de la búsqueda', { file, pais, year })
    .command('guardar', 'Almacenará los resultados de las estadísticas en un archivo de texto', { file, pais, year })
    .help()
    .argv;

module.exports = {
    argv
}