import { test, expect, describe } from 'vitest';
import { Categoria } from './../models/categoria';
import { CategoriaCrud } from '../models/interface/categoriaCrud.interface';
import { MockCategoria } from '../models/implementations/mockCategoria';

describe("Prueba para categoriaCrud", ()=>{
    const id="1";
    const categoria: Categoria = new Categoria(id, "Electrodomestico");
    const crud: CategoriaCrud = new MockCategoria();
    crud.addCategoria(categoria);

    test("addCategoria", ()=>{
        expect(crud.size()).toBe(1);
    });

    test("getCategorias", async ()=>{
        const categoria = await crud.getCategoria(id);
        expect(categoria.getId()).equals(1);
        expect(categoria.getNombre()).equals("Electrodomestico");
    });

    test("getTasks", async () =>{
        const id2="2";
        const categoria2: Categoria = new Categoria(id2, "Cocina");
        crud.addCategoria(categoria2);
        const categorias = crud.getCategorias();
        expect(categorias).toHaveLength(2);
    });
});