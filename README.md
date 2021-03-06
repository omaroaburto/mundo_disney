# alkemy-project-backend-mundodisney
 
- __.env:__ Este archivo contiene la configuración del sistema (el puerto, la api key de sendgrid, secret key para encriptar claves, configuración de base de datos)
- __helpers__
    - __sendEmail:__ Este archivo contiene las funciones para enviar y configurar el envio de correos (getMessage). El correo necesita estar registrado al momento de crear la api key de sendgrid 
    - __db-validators:__ Contiene las validaciones del sistema (id, nombres, etc).
    - __create-jwt:__ Contiene las funciones que se encargan de generar los token.
- __controllers__
    - __authController:__ Contiene el controlador que se encarga de la autentificación de usuarios del sistema.
    - __userController:__ Contiene el controlador que se encarga de la creación de usuarios del sistema.
    - __characterController:__ Contine el controlador de los personajes de las películas: creación, actualización y desactiación de los personajes. Además, contiene funciones para listar los personajes activos y buscar un personaje por id.
    - __genreController:__ Contine el controlador de los géneros de películas: creación, actualización y desactiación de los géneros. Además, contiene funciones para listar los géneros activos y buscar un personaje por id.
    - __movieController:__ Contine el controlador de las películas: creación, actualización y desactiación de las películas. Además, contiene funciones para listar las películas activas y buscar una película por id.
    
- __models__
    - __server:__ Contiene la clase inicializar del sistema, se agregan los middleware, las rutas, configuración de manejo de archivos 
    - __index:__ Este archivo maneja los distintos modelos de la base de datos, se configura la base de datos y se crean las asociaciones del sistema
    - __archivos Model:__ son los modelos del sistema, por ejemplo: movieModel.js
 
 - __controllers__
    - __userController:__ Contiene los controladores de los usuarios del sistema
        - __addUser:__ Función para crear un usuario, envía un correo al usuario después de crear la cuenta
    - __authController:__ Contiene los controladores para la autentificación de los usuarios
        - __login:__ método para autentificar al usuario, si la autentificación es correcta retorna un token
    - __genreController:__ Contiene los controladores de los géneros de las películas
        - __addGenre:__ Función para crear un género
        - __updateGenre:__ Función para actualizar un género 
        - __disableGenre:__ Función para desactivar un género por su id
        - __findAllGenre:__ Función para listar los géneros 
        - __findGenre:__ Función para encontrar un género por su id
        - __enableGenre:__ Función para activar un género
    - __movieController:__ Contiene los controladores de las películas 
        - __addMovies:__ Función para crear una película
        - __updateMovies:__ Función para actualizar una película  
        - __disableMovies:__ Función para desactivar una película por su id
        - __findAllMovies:__ Función para listar las películas por su género, por fecha ascendente o descendente, por nombre 
        - __findIdMovies:__ Función para encontrar una película por su id
        - __enableMovies:__ Función para activar una película
    - __characterController:__ Contiene los controladores de los personajes
        - __addCharacter:__ Función para crear un personaje
        - __updateCharacter:__ Función para actualizar un personaje  
        - __disableCharacter:__ Función para desactivar un personaje por su id
        - __findCharacter:__ Función para listar los personajes por el id de una película, por edad o nombre
        - __findIdCharacter:__ Función para encontrar un personaje por su id
        - __enableCharacter:__ Función para activar un personaje

[Documentación-postman](https://documenter.getpostman.com/view/12626700/UVeGsSL1#f17831c2-046b-4918-84e0-645e01c367c4).

------------------------------------------------------------------------------------------ 
### Tareas pendientes
- Subida de imágenes con Api de de Cloudinary, por motivos de tiempo todavía no está implementada la subida de archivos
- pruebas
