const { resolve } = require('path');

require('colors');

const mostarMenu = () =>{

    return new Promise( (resolve) => {
        console.clear();
        console.log('========================================'.green);
        console.log('         Seleccione una opción          '.green);
        console.log('========================================\n'.green);
    
        console.log(`${'1'.blue}. Crear tarea`);
        console.log(`${'2'.blue}. Listar tareas`);
        console.log(`${'3'.blue}. Listar tareas completadas`);
        console.log(`${'4'.blue}. Listar tareas pendientes`);
        console.log(`${'5'.blue}. Completar tarea(s)`);
        console.log(`${'6'.blue}. Borrar tarea`);
        console.log(`${'0'.blue}. Salir \n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question('Seleccione la opción: ', (opt)=>{
            readLine.close();
            resolve(opt);
        })

    })

}

const pausa = async () => {
    return new Promise( (resolve) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });    
        readLine.question(`Presione ${'Enter'.green} para salir: `, (opt)=>{
            readLine.close();
            resolve(opt)
        })
    })
}

module.exports = {
    mostarMenu,
    pausa
}