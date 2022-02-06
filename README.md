# alkemy-project-backend-mundodisney
 
- __.env:__ Este archivo contiene la configuración del sistema (el puerto, la api key de sendgrid, secret key para encriptar claves, configuración de base de datos)
- __helpers__
    - __sendEmail:__ Este archivo contiene las funciones para enviar y configurar el envio de correos (getMessage)
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
    - __movieController:__ Contiene los controladores de las películas 
        - __addMovies:__ Función para crear una película
        - __updateMovies:__ Función para actualizar una película  
        - __disableMovies:__ Función para desactivar una película por su id
        - __findAllMovies:__ Función para listar las películas por su género, por fecha ascendente o descendente, por nombre 
        - __findIdMovies:__ Función para encontrar una película por su id
        - __enableMovies:__ Función para activar una película
