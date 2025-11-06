/*import tasksController from "../controllers/tasks.controller";
import mockTask from "../models/implementations/mockTask/mockTask";
import { Task } from "../models/task";
import TaskService from "../services/task.service";

let tarea0: Task;
beforeAll(() => {
    tarea0 = new Task("tarea de prueba");
});

let id: string; 
beforeEach( async () => {
    const tarea2 = new Task("Tarea dummy");
    const nuevaTarea = await TaskService.addTask(tarea2); 
    id = nuevaTarea.getId();
});


describe("servicios de las task",() =>{
    test("Ver tareas de la bd", async () => {
        const tareas = await TaskService.getTasks();
        expect(tareas.length).toBe(1);
    });

    test("Agregar una tarea", async ()=>{
        const tareaAgregada =  await TaskService.addTask(tarea0);
        const tareas = await TaskService.getTasks();
        expect(tareas.length).toBe(2);
    });

    test("getTask", async ()=>{
        const id = tarea0.getId();
        const tareaEncontrada = await TaskService.getTask(id);
        expect(tareaEncontrada).toEqual(tarea0);
    });

    test("cambiar nombre (editTaskName)" , async ()=>{
        const descTarea = "Cambiar el piso del patio";
        await TaskService.editTaskName(id, descTarea);
        const tareaEditada = await TaskService.getTask(id);
        expect(tareaEditada.getTarea()).toBe(descTarea);
    });

    test("cambiar tarea (editTask)" , async ()=>{
        const descTarea = "Cortar el pasto";
        await TaskService.editTask(id, descTarea, true);
        const tareaEditada = await TaskService.getTask(id);
        expect(tareaEditada.getTarea()).toBe(descTarea);
    });

    test("vemos si esta hecho o no (cumplirPostergar)" , async ()=>{
        await TaskService.cumplirPostergar(id, true);
        const tareaNoCumplida = await TaskService.getTask(id);
        expect(tareaNoCumplida.isCumplida()).toBe(true);
    });

    test("cuanto es de largo el arreglo(size)", () =>{
        const tareas = TaskService.getTasks();
        expect(TaskService.size()).toBe(2);
    })
});

afterEach( ()=>{
    TaskService.deleteTask(id);
});

describe("pruebas de la clase Task", () => {
    //Implementamos Arrange - Act - Assert (Patron triple A)
    //Preparamos lo que necesitamos
    const tarea1 = new Task("Ir a correr");
    //Actuar (Escribir el test)
    tarea1.setCumplida(true);
    //Probar la hipotesis
    test("Cuando realizo la tarea deberia dar true",() => {
        expect(tarea1.isCumplida()).toBe(true);
    });
});*/