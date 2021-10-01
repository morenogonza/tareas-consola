const {
  menuInquirer,
  pausa,
  leerInput,
  menuBorrarTarea,
  menuConfirmacion,
  menuEstadoTarea,
} = require("./helpers/menu-inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const { guardarTarea, mostrarTareas } = require("./helpers/guardar-tarea");

const main = async () => {
  console.clear();
  let opt = "";

  const tareas = new Tareas();
  const tareasEnDB = mostrarTareas();

  // console.log('tareas en db-->', tareasEnDB.length);
  // await pausa();

  if (tareasEnDB.length > 0) {
    tareas.cargarTareasFromArray(tareasEnDB);
  }

  do {
    opt = await menuInquirer();
    switch (opt) {
      case "1":
        const desc = await leerInput("Tarea: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarCompletadasPendientes(true);
        break;
      case "4":
        tareas.listarCompletadasPendientes(false);
        break;
      case "5":
        const ids = await menuEstadoTarea(tareas.listadoArr);
        tareas.toggleEstadoTarea(ids);
        break;
      case "6":
        const id = await menuBorrarTarea(tareas.listadoArr);
        if (id !== "0") {
          const resp = await menuConfirmacion("¿Eliminar tarea?");
          if (resp) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }
    guardarTarea(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
