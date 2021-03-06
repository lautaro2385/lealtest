# Leal project
Proyecto que implementa micro servicios que permite el registro y login de usuario y la modificación y lectura de transacciones.

## Requerimientos
* Node (v10.6.0)
* npm (v6.1.0)

## Descripción

La solución se implementa en 2 proyectos. Aunque se sabe que los mricro servicios son más que proyectos aislados, para el fin de estas pruebas se implementan los servicios de usuario y de transacciones, cada proyecto es totalmente independiente entra si, tienen sus propios servicios, inclusive su propia base de datos.
Dadas la funcionalidades, se agrupan en dos micro servicios:
1. __Administración de usuarios:__ Este servicio tiene las siguientes funcionalidades:
   * Registro de usuario
   * Login de usuario
2. __Administración de transacciones:__ Este servicio tiene las siguientes funcionalidades:
   * Consultar el historial de transacciones de un usuario
   * Consolidado de puentos de un usuario
   * Exportar a excel las transacciones de un usuario
   * Crear una transacción
   * Inactivar una transacción

![Microservices](https://github.com/lautaro2385/lealtest/blob/master/Untitled%20Diagram.png)

## Ejecución
A continucación se describen los comandos para iniciar los proyectos en modo de pruebas, desarrollo y producción. para la ejecucion de estos comandos se debe estar en la raiz del proyecto a iniciar.

Para instalar los paquetes necesarios, se deb ejecutar:
~~~~
npm i
~~~~

Para iniciar el servicio en modo de desarrollo, se deb ejecutar:
~~~~
npm run start-dev
~~~~

Para iniciar el servicio en modo de producción, se deb ejecutar:
~~~~
npm start
~~~~

Para realizar las pruebas, se deb ejecutar:
~~~~
npm test
~~~~

### Base de datos
Se utiliza para desarrollo y producción un motor de base de datos MySql. Para cada se creó una base de datos, los script de creación de las base de datos, se puene encontrar en:
~~~~
./sql/create.sql
~~~~
las variables de conexión a la bases de datos se encuentran en:
~~~~
./config/config.js
~~~~
con las variables de entorno:

|   Descripción   | user variables | user default | transaction variables | transaction default |
| :-------------: | :------------: | :----------: | :-------------------: | :-----------------: |
|     Usuario     |    DB_USER     |     root     |      DB_USER_TR       |        root         |
|   Contraseña    |     DB_PSW     |     root     |       DB_PSW_TR       |        root         |
|     Puerto      |    DB_PORT     |     3307     |      DB_PORT_TR       |        3307         |
|      Host       |    DB_HOST     |  localhost   |      DB_HOST_TR       |      localhost      |
| Nombre de la DB |    DB_NAME     |  leal_user   |      DB_NAME_TR       |  leal_transaction   |

## API

La [documentación](https://documenter.getpostman.com/view/300406/S11PsGwq) de los servicios expuestos se pueden encontar en el [link](https://documenter.getpostman.com/view/300406/S11PsGwq).

Se van a encontrar todos los servicios REST expuestos pque las aplicaciones implemetan.

Los puertos habilitados para el desarrollo son:

* __usuarios:__ 3000
* __transacciones:__ 3001

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8f82301e78f91a9d37d9)

## Seguridad
Para la seguridad de los servicios se implementa JWT. todas la rutas estan aseguradas a excepción de la de regitro y login. es decir, todas las rutas de transacciones, estan aseguradas por el token.

## Arquitectura
La arquitectura u organización del código es la siguiente:
* __./test__: están los test reslizados
* __./routes__: se define las rutas del api
* __./controller__: archivos que tienen toda la lógica del negocio
* __./db__: contiene los archivos de configuracion de la base de datos
  * __dao__: se explonen las operaciones que se pueden hacer sobre la db.
  * __model__: define el modelo o la entidad de la base de datos
* __./config__: archivos de configuración de la aplicación
* __./util__: archivos de utilidades de la aplicación
  