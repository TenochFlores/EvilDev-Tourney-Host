## Instalación
* Descargar el repositorio en su computadora para tener acceso a los directorios Back-End y Front-end.
* En su MySQL local deberá cargar la base de datos definida en:

    `Back-End/database/DDL.sql`
* Este archivo creará la base y el registro del superadministrador automaticamente con las credenciales:
    * Correo: c.cabrera@ciencias.unam.mx
    * Password: Password1
    
## Instrucciones ejecución

### Backend
* Para correr el backend debera ingresar a la ruta:

    `Back-End/backend/`
* Estando en este directorio simplemente deberá ejecutar el comando:

    `python app.py -m flask run`

### Frontend
* Para correr el frontend deberá ingresar en una terminal aparte de la que está corriendo el back a la ruta:

    `Front-End/evildev-project-front/`
* Y estando en este directorio ejecutará `npm install` para que se instalen las dependencias usadas de react.
* Una vez completada la descarga de dependencias podrá iniciar el front con `npm start`

