/*import {test, expect, describe} from 'vitest';
import { Task } from '../models/task';
import { TaskCrud } from '../models/interface/taskCrud.interface';
import { MockTask } from '../models/implementations/mockTask/mockTask';

describe("prueba de taskCrud", ()=> {
    const id = 1;
    const task:Task<number> = new Task<number>(id,"ir al super", false);
    const crud:TaskCrud<number> = new MockTask();
    crud.addTask(task)
    test("addTask", ()=>{
        expect(crud.size()).toBe(1);
    });

    test("getTask", () =>{
        const task = crud.getTask(id);
        expect(task.getId()).equals(1);
        expect(task.getTarea()).equals("ir al super")
    });

    test("getTasks", () =>{
        const tasks = crud.getTasks();
        expect(tasks).toHaveLength(1);
        expect(tasks[0]?.getTarea()).toBe("ir al super");
    });

    test("editTask", () => {
        const tareaEditada = crud.editTask(1, "comprar pan", true);
        expect(tareaEditada.getTarea()).toBe("comprar pan");
        expect(tareaEditada.isCumplida()).toBe(true);

        //Aseguramos que queda guardada en el crud
        const task = crud.getTask(1);
        expect(task.getTarea()).toBe("comprar pan");
    });

    test("deleteTask", () => {
        crud.deleteTask(1);
        expect(crud.size()).toBe(0);
        expect(() => crud.getTask(1)).toThrowError();
    });
});

*/