import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Request, Response } from 'express';
import ProductoController from '../controllers/productos.controller';
import productoService from '../services/producto.service';

vi.mock('../services/producto.service', () => ({
    default: {
        getProducto: vi.fn(),
        getProductos: vi.fn(),
        addProducto: vi.fn(),
        editProduto: vi.fn(),
        deleteProducto: vi.fn(),
    },
}));

describe('ProductoController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    // Helpers para limpiar mocks
    beforeEach(() => {
        vi.clearAllMocks();
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
    });

    describe('getProducto', () => {
        it('Debe retornar 200 y el producto si existe', async () => {
            req = { params: { id: '1' } };
            const mockProducto = { id: '1', nombre: 'Coca Cola', precio: 100 };
            
            (productoService.getProducto as any).mockResolvedValue(mockProducto);

            await ProductoController.getProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProducto);
        });

        it('Debe retornar 404 si el servicio retorna null/undefined', async () => {
            req = { params: { id: '999' } };
            (productoService.getProducto as any).mockResolvedValue(null);

            await ProductoController.getProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('addProducto', () => {
        // Datos base válidos para no repetir código
        const validBody = {
            id: '10',
            nombre: 'Pepsi',
            categoria: { id: '1', nombre: 'Bebidas' },
            cantidad: 50,
            precio: 1500
        };

        it('Debe retornar 400 si faltan datos obligatorios', async () => {
            req = { body: { nombre: 'Incompleto' } }; // Falta id, precio, etc.

            await ProductoController.addProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
                message: expect.stringContaining('Faltan datos') 
            }));
        });

        it('Debe retornar 400 si el precio o cantidad son negativos', async () => {
            req = { body: { ...validBody, precio: -100 } };

            await ProductoController.addProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('Debe retornar 409 si el ID ya existe', async () => {
            req = { body: validBody };
            
            (productoService.getProducto as any).mockResolvedValue({ id: '10', nombre: 'Ya existo' });

            await ProductoController.addProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(productoService.addProducto).not.toHaveBeenCalled();
        });

        it('Debe retornar 201 y guardar si es válido y no existe duplicado', async () => {
            req = { body: validBody };

            (productoService.getProducto as any).mockRejectedValue(new Error("No encontrado"));
            
            (productoService.addProducto as any).mockResolvedValue(validBody);

            await ProductoController.addProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(productoService.addProducto).toHaveBeenCalled();
        });
    });

    describe('editProducto', () => {
        it('Debe actualizar correctamente (200)', async () => {
            req = { 
                params: { id: '1' },
                body: { 
                    nombre: 'Editado', 
                    categoria: { id: '1', nombre: 'Test' }, 
                    cantidad: 10, 
                    precio: 200 
                } 
            };

            (productoService.editProduto as any).mockResolvedValue(req.body);

            await ProductoController.editProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('Debe fallar (400) con datos inválidos', async () => {
            req = { 
                params: { id: '1' },
                body: { nombre: 'Mal', categoria: {}, cantidad: -5, precio: 100 } 
            };

            await ProductoController.editProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('deleteProducto', () => {
        it('Debe eliminar correctamente (200)', async () => {
            req = { params: { id: '1' } };
            (productoService.deleteProducto as any).mockResolvedValue(undefined);

            await ProductoController.deleteProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('Debe retornar 404 si el servicio falla', async () => {
            req = { params: { id: '999' } };
            (productoService.deleteProducto as any).mockRejectedValue(new Error("No existe"));

            await ProductoController.deleteProducto(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});