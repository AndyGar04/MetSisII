import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import CategoriaController from '../controllers/categoria.controller';
import categoriaService from '../services/categoria.service';

vi.mock('../services/categoria.service', () => ({
    default: {
        getCategoria: vi.fn(),
        getCategorias: vi.fn(),
        addCategoria: vi.fn(),
        deleteCategoria: vi.fn(),
        editCategoria: vi.fn(),
        size: vi.fn(),
    },
}));

describe('CategoriaController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    // Helper para resetear mocks antes de cada test
    beforeEach(() => {
        vi.clearAllMocks();

        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    describe('getCategoria', () => {
        it('Debe retornar 200 y la categoria si existe', async () => {
            req = { params: { id: '1' } };
            const mockCategoria = { id: '1', nombre: 'Electronica' };
            
            (categoriaService.getCategoria as any).mockResolvedValue(mockCategoria);

            await CategoriaController.getCategoria(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCategoria);
        });

        it('Debe retornar 404 si la categoria no existe', async () => {
            req = { params: { id: '999' } };

            (categoriaService.getCategoria as any).mockResolvedValue(null);

            await CategoriaController.getCategoria(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "categoria no encontrada" });
        });
    });

    describe('addCategoria', () => {
        it('Debe retornar 201 al crear una categoria válida', async () => {
            req = { body: { id: '10', nombre: 'Gaming' } };
            const mockResponse = { id: '10', nombre: 'Gaming' };

            (categoriaService.addCategoria as any).mockResolvedValue(mockResponse);

            await CategoriaController.addCategoria(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        it('Debe retornar 400 si falta el nombre', async () => {
            req = { body: { id: '10' } }; // Falta nombre

            await CategoriaController.addCategoria(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
                message: expect.stringContaining("Faltan datos") 
            }));

            expect(categoriaService.addCategoria).not.toHaveBeenCalled();
        });

        it('Debe retornar 400 si el nombre está vacío', async () => {
            req = { body: { id: '10', nombre: '   ' } }; 

            await CategoriaController.addCategoria(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
                message: expect.stringContaining("texto válido") 
            }));
        });
    });

    describe('deleteCategoria', () => {
        it('Debe retornar 200 al eliminar correctamente', async () => {
            req = { params: { id: '1' } };
            (categoriaService.deleteCategoria as any).mockResolvedValue(true);

            await CategoriaController.deleteCategoria(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('Debe retornar 404 si el servicio lanza error (no encontrado)', async () => {
            req = { params: { id: '999' } };
            
            (categoriaService.deleteCategoria as any).mockRejectedValue(new Error("No existe"));

            await CategoriaController.deleteCategoria(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('size', () => {
        it('Debe retornar el tamaño de la colección', () => {
            (categoriaService.size as any).mockReturnValue(5);
            
            CategoriaController.size(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ size: 5 });
        });
    });
});