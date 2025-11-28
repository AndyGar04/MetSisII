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
