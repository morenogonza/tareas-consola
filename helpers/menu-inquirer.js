require("colors");

const inquirer = require("inquirer");

const questions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        name: `${"1".white}. Crear tarea`,
        value: "1",
      },
      {
        name: `${"2".white}. Listar tareas`,
        value: "2",
      },
      {
        name: `${"3".white}. Listar tareas completadas`,
        value: "3",
      },
      {
        name: `${"4".white}. Listar tareas pendientes`,
        value: "4",
      },
      {
        name: `${"5".white}. Completar tarea(s)`,
        value: "5",
      },
      {
        name: `${"6".white}. Borrar tarea`,
        value: "6",
      },
      {
        name: `${"0".white}. Salir`,
        value: "0",
      },
    ],
  },
];

const menuInquirer = async () => {
  console.clear();
  console.log("========================================".green);
  console.log("         Seleccione una opción          ".green);
  console.log("========================================\n".green);

  const { opcion } = await inquirer.prompt(questions);
  return opcion;
};

const pausa = async () => {
  const questionsPausa = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ];

  console.log("\n");

  const { opcion } = await inquirer.prompt(questionsPausa);
  return opcion;
};

const leerInput = async (message) => {
  const questions = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(questions);
  return desc;
};

const menuBorrarTarea = async (tareas) => {
  const choices = tareas.map((tarea, indice) => {
    const idx = `${indice + 1}`.green;
    return {
      name: `${idx} - ${tarea.desc}`,
      value: tarea.id,
    };
  });

  choices.unshift({
    value: "0",
    name: "0 -".green + " Cancelar",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar?",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const menuConfirmacion = async (message) => {
  const questions = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(questions);
  return ok;
};

const menuEstadoTarea = async (tareas) => {
  const choices = tareas.map((tarea, indice) => {
    const idx = `${indice + 1}`.green;
    return {
      name: `${idx} - ${tarea.desc}`,
      value: tarea.id,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};

module.exports = {
  menuInquirer,
  pausa,
  leerInput,
  menuBorrarTarea,
  menuConfirmacion,
  menuEstadoTarea,
};
