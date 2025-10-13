import { Task } from "../task";

export interface TaskCrud {
    getTasks():Promise<Array<Task>>;
    getTask(id:string):Promise<Task>;
    addTask(tarea:Task):Promise<Task>;
    deleteTask(id:string):void;
    editTaskName(id:string,tarea:string):Promise<Task>;
    cumplirPostergar(id:string, cumplida:boolean):Promise<Task>;
    editTask(id:string,tarea:string, cumplida:boolean):Promise<Task>;
    size():number;
}