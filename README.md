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