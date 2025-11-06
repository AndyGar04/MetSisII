import { TaskCrud } from "../../interface/taskCrud.interface";
import { Task } from "../../task";

export class MockTask implements TaskCrud{
    protected tam: number;
    protected container: Array<Task>;
    protected id: number;
    constructor(){
        this.id=1;
        this.tam = 0;
        this.container = new Array<Task>;
    }
    editTaskName(id: string, tarea: string): Promise<Task> {
        return new Promise<Task>((resolve, rejects)=>{
        const tareaEncontrada = this.container.find(
            (tarea:Task)=> tarea.getId()==id
        );
        if (!tareaEncontrada){
            rejects(new Error("La tarea no fue encontrada"));
        }else{
            tareaEncontrada.setTarea(tarea);
            resolve(tareaEncontrada);
        }
        });
    }
    cumplirPostergar(id: string, cumplida: boolean): Promise<Task> {
        return new Promise<Task>((resolve, rejects)=>{
            const tareaEncontrada = this.container.find(
                (tarea:Task)=> tarea.getId()==id
            );

            if (!tareaEncontrada){
                rejects(new Error("La tarea no fue encontrada"));
            }else{
                if (tareaEncontrada.isCumplida()){
                    tareaEncontrada.setCumplida(false);
                }else{
                    tareaEncontrada.setCumplida(true);
            }
            resolve(tareaEncontrada);
            }
        });
    }
    editTask(id: string, tarea: string, cumplida: boolean): Promise<Task> {
        return new Promise<Task>((resolve, rejects)=>{
            const tareaEncontrada = this.container.find(
                (tarea:Task)=> tarea.getId()==id
            );
            if (!tareaEncontrada){
                rejects(new Error("La tarea no fue encontrada"));
            }else{
                tareaEncontrada.setTarea(tarea);
                tareaEncontrada.setCumplida(cumplida);
                resolve(tareaEncontrada);
            }
        });
    }
    size(): number {
        return this.tam;
    }
    getTask(id:string): Promise<Task> {
        return new Promise<Task>((resolve, rejects)=>{
            const resultado = this.container.find((task: Task)=>{
            return task.getId() == id;
            });
            if (!resultado){
                rejects(new Error("No esta el id"));
            }else{
                resolve(resultado);
            }
        });
    }
    getTasks(): Promise<Array<Task>> {
        return new Promise<Array<Task>>((resolve)=>{
            resolve(this.container);
        });
    }
    addTask(tarea: Task): Promise<Task> {
        return new Promise<Task>((resolve)=>{
            tarea.setId((this.id) + "");
            tarea.setCumplida(false);
            this.container.push(tarea);
            this.id++;
            this.tam++;
            resolve(tarea);
        });
    }
    deleteTask(id: string): Promise<void> {
        return new Promise<void>((resolve, rejects)=>{
            const index = this.container.findIndex((task: Task) => task.getId() === id);
            if (index === -1) {
                rejects(new Error("No existe la tarea con ese id"));
            }else{
                this.container.splice(index, 1);
                this.tam--;
            }
        });
    }
}

export default new MockTask();