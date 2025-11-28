import { describe, it, expect, vi, beforeEach } from 'vitest';
import productoService from '../services/producto.service'; // Tu servicio
import ProductoModel from '../models/implementations/mockProductos'; // Tu modelo a mockear
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';

vi.mock('../models/implementations/mockProductos', () => ({
    default: {
        getProducto: vi.fn(),
        getProductos: vi.fn(),
        getProductosCategoria: vi.fn(),
        addProducto: vi.fn(),
        editProduto: vi.fn(),
        deleteProducto: vi.fn(),
        size: vi.fn(),
    }
}));

describe('ProductoService', () => {
    
    const mockCategoria = new Categoria('1', 'Bebidas');
    const mockProducto = new Producto('10', 'Coca Cola', mockCategoria, 100, 1500);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getProductos: debe llamar al modelo y devolver la lista', async () => {
        const lista = [mockProducto];
        (ProductoModel.getProductos as any).mockResolvedValue(lista);

        const result = await productoService.getProductos();

        expect(ProductoModel.getProductos).toHaveBeenCalled();
        expect(result).toEqual(lista);
    });

    it('getProducto: debe buscar por ID delegando al modelo', async () => {
        (ProductoModel.getProducto as any).mockResolvedValue(mockProducto);

        const result = await productoService.getProducto('10');

        expect(ProductoModel.getProducto).toHaveBeenCalledWith('10');
        expect(result).toEqual(mockProducto);
    });

    it('getProductosCategoria: debe filtrar pasando la categoría al modelo', async () => {
        const listaFiltrada = [mockProducto];
        (ProductoModel.getProductosCategoria as any).mockResolvedValue(listaFiltrada);

        const result = await productoService.getProductosCategoria(mockCategoria);

        expect(ProductoModel.getProductosCategoria).toHaveBeenCalledWith(mockCategoria);
        expect(result).toEqual(listaFiltrada);
    });

    it('addProducto: debe pasar el producto al modelo para guardarlo', async () => {
        (ProductoModel.addProducto as any).mockResolvedValue(mockProducto);

        const result = await productoService.addProducto(mockProducto);

        expect(ProductoModel.addProducto).toHaveBeenCalledWith(mockProducto);
        expect(result).toEqual(mockProducto);
    });

    it('editProduto: debe delegar la edición completa', async () => {
        const prodEditado = new Producto('10', 'Pepsi', mockCategoria, 50, 1400);
        (ProductoModel.editProduto as any).mockResolvedValue(prodEditado);

        const result = await productoService.editProduto('10', 'Pepsi', mockCategoria, 50, 1400);

        expect(ProductoModel.editProduto).toHaveBeenCalledWith('10', 'Pepsi', mockCategoria, 50, 1400);
        expect(result.getNombre()).toBe('Pepsi');
    });

    it('deleteProducto: debe llamar al borrado del modelo', async () => {
        (ProductoModel.deleteProducto as any).mockResolvedValue(undefined);

        await productoService.deleteProducto('10');

        expect(ProductoModel.deleteProducto).toHaveBeenCalledWith('10');
    });

    it('size: debe obtener el tamaño desde el modelo', () => {
        (ProductoModel.size as any).mockReturnValue(50);

        const tamano = productoService.size();

        expect(ProductoModel.size).toHaveBeenCalled();
        expect(tamano).toBe(50);
    });
});