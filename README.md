# 🏥 CRUD Hospital - Gestión de Médicos y Pacientes

Este proyecto es una aplicación web robusta desarrollada con Node.js, Express** y **Sequelize** para administrar la información de un hospital.

## 📂 Estructura del Proyecto (Arquitectura MVC)
El código está organizado siguiendo las mejores prácticas de desarrollo:

* **`app/config/`**: Archivos de configuración para la base de datos MySQL.
* **`app/controllers/`**: Contiene la lógica de negocio (funciones para crear, editar y eliminar).
* **`app/models/`**: Define las tablas `Doctores` y `Pacientes` y sus relaciones.
* **`app/routes/`**: Define las rutas de acceso para la API y las vistas.
* **`app/middlewares/`**: Gestión de subida de imágenes con Multer.
* **`public/uploads/`**: Almacenamiento de las fotos de los pacientes.

## 🚀 Funcionalidades Principales
1.  **Gestión de Doctores**: CRUD completo para registrar especialistas.
2.  **Gestión de Pacientes**: Registro de pacientes con asignación de médico y carga de fotografía.
3.  **Interfaz Dinámica**: Sistema de alertas (mensajes de éxito/eliminación) y navegación fluida.
4.  **Validaciones**: Manejo de avatares por defecto si el paciente no tiene foto.

## 🛠️ Instalación y Uso

1.  Clona este repositorio.
2.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```
3.  Configura tus credenciales de MySQL en `app/config/db.config.js`.
4.  Inicia el servidor:
    ```bash
    node server.js
    ```
5.  Accede a la plataforma en: `http://localhost:3000`

---
**Desarrollado para:** Práctica de Laboratorio - TECSUP 2026.