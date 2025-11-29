# Plataforma de tienda online

## 🚀 Objetivo
El objetivo principal de esta WebPage es crear una solución simple y prolija para los pequeños emprendimientos, que no cuentan con una administración prolija/sencilla para vender sus productos. Esta plataforma sera adaptable a cada negocio (tanto estetica como funcionalmente), ademas de sencilla y amigable con el usuario. 


## 🔑 Funcionalidades
### Para usuarios/potenciales clientes:
Los usuarios comunes, van a poder registrarse, ver el precio de cada producto, con la posibilidad de añardirlo a un carrito. Y luego para concretar el pago, se podran comunicar mediante un boton con el dueño del emprendimiento.

#### Busqueda de productos
Los usuarios tendran la posibilidad de utilizar filtros, por:
- Precio
- Categoria

### Para emprendedores/dueños
- Añadir nuevos productos.
- Eliminar productos.
- Actualizar productos.
- Controlar stock de los productos.
- Dashboard con información de todos los usuarios y compras concretadas.
- Control de ventas, inverciones y gastos.

## ⚙️ Tecnologías a utilizar:
- Librerias a utilizar: A definir.
- Frontend (usuarios y dueños): React Web y Vite.
- Backend: Typescript, Node.js con Express.
- Base de datos: PostgreSQL (Ya utilizado en otros trabajos).
- Autenticación: via JWT.
- Hosting: A definir.

Cualquier cambio lo vamos a ir adhiriendo

## ☢ Patrones a utilizar
Por lo que hemos investigado hasta el momento podriamos usar un Adapter que nos podria servir más adelante en caso de querer conectar la tienda con servicios externos (tipo pagos o sistemas contables) que no utilicen los mismos lenguajes de programacion que nosotros. Por otro lado, con un Decorator podriamos ir sumando cosas extra sin romper nada, como agregar nuevos canales de notificación o distintos niveles de logging. Otro "adaptable" podria ser un Facade viene bien para simplificar lo complejo, por ejemplo que el frontend tenga un único punto de entrada para hacer compras sin preocuparse por lo que pasa atrás.

En cuanto a cómo se comporta el sistema, un Observer sería ideal para que cuando cambie algo (ejemplo: se agote el stock de un producto) los usuarios interesados se enteren solos sin tener que estar revisando. Tambien podriamos utilizar el Strategy para no llenar el código de condicionales, por ejemplo al manejar distintos métodos de pago o formas de filtrar productos. Y por ultimo el Command lo podriamos utilizar para el dueño del local, porque nos da la chance de manejar acciones del panel de admin (agregar, editar, borrar) de manera más ordenada.

Realmente no sabemos si vamos a utilizar todos los mencionados, sin embargo vimos que nuestro proyecto seria adaptable a ellos.

---

#  Frontend --- React + Vite

## 1. Ingresar a frontend

``` bash
cd frontend
```

## 2. Instalar dependencias

``` bash
npm install
```

## 3. Crear archivo .env

    VITE_API_URL=http://localhost:3000

## 4. Iniciar

``` bash
npm run dev
```

------------------------------------------------------------------------

#  Estructura del Proyecto

    Proyecto/
    ├── backend/
    │   ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   └── tests/
    └── frontend/
        ├── src/
        ├── components/
        ├── pages/
        ├── context/
        └── hooks/

------------------------------------------------------------------------

#  Testing Backend

``` bash
npm test
npm run coverage
```

------------------------------------------------------------------------

#  Futuras Mejoras

-   Integración con pasarelas de pago.
-   Notificaciones de stock.
-   Modo oscuro.
-   Multi idioma.
-   Dashboard avanzado.

---

#  API Backend - Gestión de Productos y Categorías

Este proyecto es una API RESTful desarrollada con **Node.js** y **TypeScript** para la administración de productos y sus categorías. Utiliza **Express 5** y cuenta con autenticación vía JWT y tests unitarios con **Vitest**.

##  Tech Stack

* **Lenguaje:** TypeScript
* **Runtime:** Node.js
* **Framework:** Express (v5)
* **Seguridad:** JSON Web Tokens (JWT) + Middleware de Auth
* **Testing:** Vitest + Supertest
* **Validaciones/Utils:** Zod, Dotenv, Cors

##  Pre-requisitos

Asegurate de tener instalado:
* [Node.js](https://nodejs.org/) (v20 o superior recomendado)
* npm

##  Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPO>
    cd backend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Variables de Entorno:**
    Creá un archivo `.env` en la raíz del proyecto basándote en el siguiente ejemplo:

    ```env
    PORT=3000
    # Clave secreta para firmar/verificar tokens JWT
    ACCESS_TOKEN_SECRET=mi_clave_secreta_super_segura
    ```

##  Scripts Disponibles

El proyecto cuenta con varios scripts definidos en el `package.json`:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev:ts` | **Recomendado:** Levanta el servidor en modo desarrollo con *watch* (reinicia al guardar cambios). |
| `npm run dev:js` | Levanta el servidor usando los archivos compilados en JS. |
| `npm run build` | Compila el código TypeScript a JavaScript (carpeta `dist`). |
| `npm test` | Ejecuta los tests unitarios con Vitest. |
| `npm run coverage` | Ejecuta los tests y muestra el reporte de cobertura de código. |

##  API Endpoints

La API cuenta con las siguientes rutas principales. 
>  **Nota:** Los endpoints marcados con candado requieren el header `Authorization: Bearer <token>`.

###  Categorías (`/categorias` - asumo prefijo en index)

| Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Obtener todas las categorías | - |
| `GET` | `/:id` | Obtener una categoría por ID | - |
| `POST` | `/` | Crear una nueva categoría | + |
| `PUT` | `/:id` | Editar una categoría existente | + |
| `DELETE`| `/:id` | Eliminar una categoría | + |

###  Productos (`/productos` - asumo prefijo en index)

| Método | Endpoint | Descripción | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Listar todos los productos | - |
| `GET` | `/:id` | Obtener detalle de un producto | - |
| `POST` | `/` | Agregar un producto (requiere ID, nombre, precio, cantidad, categoria) | + |
| `PUT` | `/:id` | Actualizar un producto | + |
| `DELETE`| `/:id` | Eliminar un producto | + |

###  Autenticación (`/auth`)

El sistema utiliza **JWT (JSON Web Tokens)**. Para acceder a las rutas protegidas, debés obtener primero un `accessToken` a través del login y enviarlo en los headers de tus peticiones (`Authorization: Bearer <token>`).

| Método | Endpoint | Descripción | Body Requerido |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Iniciar sesión y obtener tokens | `{ "email": "...", "password": "..." }` |
| `POST` | `/refresh` | Renovar el Access Token vencido | `{ "refreshToken": "..." }` |

####  Credenciales de Prueba (Mock)
Como el proyecto utiliza un mock de usuarios (`auth.mock.ts`), podés usar estas credenciales para probar los endpoints protegidos:

* **Email:** `admin@admin.com`
* **Password:** `admin123`

####  Variables de Entorno Adicionales
Para controlar la expiración de los tokens, podés agregar esta variable a tu `.env` (si no se define, por defecto son 15 min):

```env
# Tiempo de expiración del Access Token (en segundos)
JWT_ACCESS_EXPIRES=900
```

##  Testing

Para asegurar la calidad del código, el proyecto utiliza **Vitest**. Podés correr las pruebas con:

```bash
npm test
npm run coveraje
```

##  Documentación Interactiva

Para ver los ejemplos de requests, responses y probar la API directamente, podés acceder a nuestra colección documentada en Postman:

- **[Ver Documentación Completa en Postman](https://www.postman.com/andygar04/workspace/metsisii/collection/39693995-09e0fad4-2077-4bde-abfe-67ddc0cc70cb?action=share&creator=39693995&active-environment=39693995-4f549856-6166-4866-b99c-e1e3fcdf876d)**
