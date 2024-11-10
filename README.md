<img src="assets/Banco_Caja_Social_logo.svg.png"></img>

# BCSC-ASYNC-PROCESS-WORKERS

## Descripción del proyecto

<p>Proyecto diseñado para gestionar y ejecutar procesos asíncronos bancarios del <a href="https://www.bancocajasocial.com/">Banco Caja Social</a> mediante el uso de workers, optimizando la eficiencia en la ejecución de tareas como la liquidación de la Rentabilidad Efectiva Anual (REA) sobre las nuevas cuentas de ahorro.</p>

## Técnologias del proyecto

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Nest.js](https://img.shields.io/badge/Nest.js-e1234c?style=for-the-badge&logo=nestjs&logoColor=white)
![Axios](https://img.shields.io/static/v1?style=for-the-badge&message=Axios&color=5A29E4&logo=Axios&logoColor=FFFFFF&label=)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)

## Variables de entorno

```bash
# Configuración del Servidor
PORT=
TZ=

# Configuración del Cliente
URL_CLIENT_SERVICE=

# Configuración de RabbitMQ
RABBIT_MQ_SERVER=
EAR_LIQUIDATOR_WORKER_NAME=

# Configuración de Cola RabbitMQ
RABBIT_MQ_QUEUE_EAR_LIQUIDATION=
ERROR_RABBIT_MQ_QUEUE_EAR_LIQUIDATION=
RABBIT_MQ_MAX_RECONECTION_ATTEMPTS=
RABBIT_MQ__RECONECTION_RETRY_DELAY=

# Configuración de API
API_KEY=
EAR_VALUE=
```

## Instalación

```bash
$ npm install
```

## Iniciar la aplicación

```bash
# desarrollo
$ npm run start

# modo de observación
$ npm run start:dev

# modo de producción
$ npm run start:prod
```

## Pruebas

```bash
# pruebas unitarias
$ npm run test

# pruebas end-to-end (e2e)
$ npm run test:e2e

# cobertura de pruebas
$ npm run test:cov
```

## Autores

- **Jhonn Calderon** - _Desarrollador principal_ - [@jscalderon65](https://github.com/jscalderon65)

## Licencia

Nest is [MIT licensed](LICENSE).
