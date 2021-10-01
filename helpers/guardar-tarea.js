const fs = require('fs');

const archivo = './db/datos.json';

const guardarTarea = (dato) =>{
    fs.writeFileSync(archivo, JSON.stringify(dato));
}

const mostrarTareas = () =>{
    const datos = fs.readFileSync(archivo, {encoding: 'utf-8'});
    if(!datos) return null;
    return JSON.parse(datos);;
}

module.exports = {
    guardarTarea,
    mostrarTareas
};