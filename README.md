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
> Librerias a utilizar: A definir.
> Frontend (usuarios y dueños): React Web y Vite.
> Backend: Typescript, Node.js con Express.
> Base de datos: PostgreSQL (Ya utilizado en otros trabahos).
> Autenticación: via JWT.
> Hosting: A definir.

Cualquier cambio lo vamos a ir adiriendo

## ☢ Patrones a utilizar
Por lo que hemos investigado hasta el momento podriamos usar un Adapter que nos podria servir más adelante en caso de querer conectar la tienda con servicios externos (tipo pagos o sistemas contables) que no utilicen los mismos lenguajes de programacion que nosotros. Por otro lado, con un Decorator podriamos ir sumando cosas extra sin romper nada, como agregar nuevos canales de notificación o distintos niveles de logging. Otro "adaptable" podria ser un Facade viene bien para simplificar lo complejo, por ejemplo que el frontend tenga un único punto de entrada para hacer compras sin preocuparse por lo que pasa atrás.

En cuanto a cómo se comporta el sistema, un Observer sería ideal para que cuando cambie algo (ejemplo: se agote el stock de un producto) los usuarios interesados se enteren solos sin tener que estar revisando. Tambien podriamos utilizar el Strategy para no llenar el código de condicionales, por ejemplo al manejar distintos métodos de pago o formas de filtrar productos. Y por ultimo el Command lo podriamos utilizar para el dueño del local, porque nos da la chance de manejar acciones del panel de admin (agregar, editar, borrar) de manera más ordenada.

Realmente no sabemos si vamos a utilizar todos los mencionados, sin embargo vimos que nuestro proyecto seria adaptable a ellos.