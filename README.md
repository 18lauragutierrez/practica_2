#  CRUD Hospital - Gestión de Médicos y Pacientes

Este proyecto es una aplicación web robusta desarrollada con **Node.js**, **Express** y **Sequelize** para administrar la información de un hospital de manera eficiente.

##  Estructura del Proyecto (Arquitectura MVC)
El código está organizado siguiendo las mejores prácticas de desarrollo para asegurar escalabilidad y orden:

* **`app/config/`**: Archivos de configuración para la conexión a la base de datos MySQL.
* **`app/controllers/`**: Contiene la lógica de negocio (funciones para crear, listar, editar y eliminar).
* **`app/models/`**: Define los modelos de datos para `Doctores` y `Pacientes` junto con sus asociaciones.
* **`app/routes/`**: Define los endpoints de la API y las rutas de navegación del sistema.
* **`app/middlewares/`**: Configuración de **Multer** para la gestión y filtrado de subida de imágenes.
* **`public/uploads/`**: Directorio dedicado al almacenamiento físico de las fotos de los pacientes.

##  Funcionalidades Principales
1.  **Gestión de Doctores**: Módulo completo para el registro y administración de especialistas médicos.
2.  **Gestión de Pacientes**: Registro detallado con asignación dinámica de médico y carga de fotografía personal.
3.  **Interfaz Dinámica**: Sistema visual con alertas interactivas para confirmar acciones (éxito o eliminación).
4.  **Validaciones de Imagen**: Implementación de avatares por defecto mediante lógica de renderizado para pacientes sin foto.

##  Instalación y Uso

1.  **Clonar este repositorio** en tu máquina local.
2.  **Instalar las dependencias** necesarias ejecutando:
    ```bash
    npm install
    ```
3.  **Configurar las credenciales** de MySQL en el archivo `app/config/db.config.js`.
4.  **Iniciar el servidor** de aplicaciones:
    ```bash
    node server.js
    ```
5.  **Acceder a la plataforma** mediante el navegador en: `http://localhost:3000`

---
**Desarrollado con fines educativos y profesionales** 