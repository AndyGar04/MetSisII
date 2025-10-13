import { Request, Response } from "express";
import TaskService from "../services/task.service.js";
import { Task } from "../models/task.js";
import taskService from "../services/task.service.js";

class TaskController {
    public async getTask (req: Request, res: Response){
        //ruta.get("/task/")
        const id = req.params.id;
        if(!id){
            res.status(402).json({message: "id no definido"})
        }else{
            try{
                const task = await TaskService.getTask(id);
                res.status(200).json(task);
            }catch(error){
                if(error instanceof Error){
                res.status(404).json({
                    message: error.message
                })}
            }
        }
    }
    public async getTasks(req: Request, res: Response){
        const tareas = await TaskService.getTasks();
        res.status(200).json(tareas);
    }
    public async addTask(req: Request, res: Response){
        const {tarea, cumplida} = req.body
        const nuevaTarea = await TaskService.addTask(new Task(tarea, cumplida));
        res.status(202).json(nuevaTarea);
    }
    public async deleteTask(req: Request, res:Response){
        const id = req.params.id;
        if(!id){
            res.status(402).json(
                {message: "id no definido"}
            )
        }else{
            try{
                TaskService.deleteTask(id);
                res.status(200).json({message: "Tarea eliminada"});
            }catch(error){
                if(error instanceof Error){
                    res.status(404).json({message:error})
                }
            }
        }
    }
    public async editTaskName(req: Request, res:Response){
        const id = req.params.id;
        const name = req.body.name;
        if(!id){
            res.status(402).json(
                {message: "id no definido"}
            );
            if(!name){
                res.status(402).json(
                {message: "Tarea incorrecta"}
            );
            }
        }else{
            try{
                const tareaModificada = await taskService.editTaskName(id, name);
                res.status(200).json(tareaModificada);
            }catch(error){
                if(error instanceof Error)
                    res.status(404).json({message:error.message})
            }
        }    
    }
    public async cumplirPostergar(req: Request, res:Response){
        const id = req.params.id;
        const cumplida = req.body.cumplida;
        if(!id){
            res.status(402).json(
                {message: "id no definido"}
            );
            if(!cumplida){
                res.status(402).json(
                {message: "Tarea incorrecta"}
            );
            }
        }else{
            try{
                const tareaModificada = await taskService.cumplirPostergar(id, cumplida);
                res.status(200).json(tareaModificada);
            }catch(error){
                if(error instanceof Error)
                    res.status(404).json({message:error.message})
            }
        }    
    }
    public async editTask(req: Request, res:Response){
        const id = req.params.id;
        const name = req.body.name;
        const cumplida = req.body.cumplida;
        if(!id || !name || !cumplida){
            res.status(402).json(
                {message: "error de ingreso de datos"}
            );
        }else{
            try{
                const tareaModificada = await taskService.editTask(id, name, cumplida);
                res.status(200).json(tareaModificada);
            }catch(error){
                if(error instanceof Error)
                    res.status(404).json({message:error.message})
            }
        }    
    }
    public size(req:Request, res:Response){
        res.status(200).json({size: taskService.size()})
    }
}

export default new TaskController();

//50:39mins