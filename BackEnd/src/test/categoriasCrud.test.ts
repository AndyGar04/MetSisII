import { describe, it, expect, vi, beforeEach } from 'vitest';
import categoriaService from '../services/categoria.service';
import CategoriaModel from '../models/implementations/mockCategoria';
import { Categoria } from '../models/categoria';

vi.mock('../models/implementations/mockCategoria', () => ({
    default: {
        getCategoria: vi.fn(),
        getCategorias: vi.fn(),
        addCategoria: vi.fn(),
        deleteCategoria: vi.fn(),
        editCategoria: vi.fn(),
        size: vi.fn(),
    }
}));

describe('CategoriaService', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getCategorias: debe retornar la lista que devuelve el modelo', async () => {
        const listaMock = [new Categoria('1', 'A'), new Categoria('2', 'B')];
        
        (CategoriaModel.getCategorias as any).mockResolvedValue(listaMock);

        const resultado = await categoriaService.getCategorias();

        expect(CategoriaModel.getCategorias).toHaveBeenCalled();
        expect(resultado).toEqual(listaMock);
        expect(resultado).toHaveLength(2);
    });

    it('getCategoria: debe buscar por ID llamando al modelo', async () => {
        const catMock = new Categoria('1', 'Test');
        (CategoriaModel.getCategoria as any).mockResolvedValue(catMock);

        const resultado = await categoriaService.getCategoria('1');

        expect(CategoriaModel.getCategoria).toHaveBeenCalledWith('1');
        expect(resultado).toEqual(catMock);
    });

    it('addCategoria: debe pasar la categoría al modelo para guardarla', async () => {
        const nuevaCat = new Categoria('3', 'Nueva');
        (CategoriaModel.addCategoria as any).mockResolvedValue(nuevaCat);

        const resultado = await categoriaService.addCategoria(nuevaCat);

        expect(CategoriaModel.addCategoria).toHaveBeenCalledWith(nuevaCat);
        expect(resultado).toEqual(nuevaCat);
    });

    it('editCategoria: debe llamar al modelo con id y nuevo nombre', async () => {
        const catEditada = new Categoria('1', 'Editada');
        (CategoriaModel.editCategoria as any).mockResolvedValue(catEditada);

        const resultado = await categoriaService.editCategoria('1', 'Editada');

        expect(CategoriaModel.editCategoria).toHaveBeenCalledWith('1', 'Editada');
        expect(resultado.getNombre()).toBe('Editada');
    });

    it('deleteCategoria: debe llamar al delete del modelo', async () => {
        (CategoriaModel.deleteCategoria as any).mockResolvedValue(undefined);

        await categoriaService.deleteCategoria('1');

        expect(CategoriaModel.deleteCategoria).toHaveBeenCalledWith('1');
    });

    it('Size: debe retornar el numero que diga el modelo', () => {
        (CategoriaModel.size as any).mockReturnValue(10);

        const tamano = categoriaService.size();

        expect(CategoriaModel.size).toHaveBeenCalled();
        expect(tamano).toBe(10);
    });
});