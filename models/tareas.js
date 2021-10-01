require("colors");
const { trap } = require("colors");
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(descripcion) {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, indice) => {
      const i = `${indice + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? `Completado`.green : `Pendiente`.red;

      console.log(`${i} - ${desc} :: ${estado}`);
    });
  }

  listarCompletadasPendientes(completada) {
    console.log();
    let i = 1;
    this.listadoArr.forEach((tarea, indice) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? `Completado`.green : `Pendiente`.red;
      if (completada && completadoEn !== null) {
        console.log(`${i++} - ${desc} :: ${completadoEn.green}`);
      }
      if (!completada && !completadoEn) {
        console.log(`${i++} - ${desc} :: ${estado}`);
      }
    });
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleEstadoTarea(ids) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
