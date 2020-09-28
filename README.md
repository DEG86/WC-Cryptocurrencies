## WChallenge-Cryptocurrencies

Esta API sea un wrapper de CoinGecko que permite a los usuarios consultar el mercado de crypromonedas, almacenar sus fovoritas
y listar hasta su TOP 25 según su cotización.

Esta creada en NodeJs y Express.

## Instalación

Se requiere [Node.js](https://nodejs.org/) v12.16 para correr. Use el manejador de paquetes [nmp](https://www.npmjs.com/get-npm).

Copie el directorio. env-example y guradelo como .env en la raíz de preyecto, en el configure las variables de entorno de la siguente manera

- El proyecto usa como base de datos a [MongoDB](https://www.mongodb.com/es). Por favor use el mismo servicio e ingrese la uri de la base de datos de producción en la varaiable

```bash
// Entorno de producción
URI_DATABASE =

// Entorno de pruebas
URI_TEST_DATABASE =
```

- Configure el puerto en la variable

```bash
PORT =
```

- Configure las variables para Json Web Toke en

```bash
// Secreto para jwt
JWT_SECRET =

// Tiempo de expiración del jwt
JWT_EXP_TIME =
```

## Uso

- Use el siguiente comando para poblar la base de datos

```bash
npm run seed
or
node ./DataBase/Seed/index.js
```

- Use este comando para iniciar la aplicación

```bash
node index
```

## Documentación

La documentación se realizó con swagger y puede ser consultada

```bash
locahost:PORT/api-docs/
```

## Test

El test se implemento con [Mocha](https://mochajs.org) intallado de forma global (npm i mocha --g). Para correr el test use el comando

```bash
npm run test
or
mocha --timeout 10000 --exit
```
