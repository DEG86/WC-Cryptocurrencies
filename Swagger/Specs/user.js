/**
 * @swagger
 *
 * paths:
 *   /api/singup:
 *     post:
 *       tags:
 *         - "User"
 *       description: "Register a new user"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "body"
 *           name: "data"
 *           description: "json with user registration data"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/UserData"
 *       responses:
 *         '200':
 *           description: "Successful user registration"
 *         '400':
 *           description: "User registration data error"
 *         '500':
 *           description: "Error interno en el servidor"
 *   /api/login:
 *     post:
 *       tags:
 *         - "User"
 *       description: "User Login"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "body"
 *           name: "data"
 *           description: "Json with user login data"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Login"
 *       responses:
 *         200:
 *           description: "User Authenticated"
 *         401:
 *           description: "User Unathenticated"
 *   /api/usu/crypto:
 *     post:
 *       tags:
 *         - "User"
 *       description: "Add user cryptocurrencies, check api/market for list of accepted cryptocurrencies"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "header"
 *           name: "authorization"
 *           type: "string"
 *           required: true
 *           description: " Authorization token"
 *         - in: "body"
 *           name: data
 *           description: json with array of cryptocurrencies
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Cryptocurrencies"
 *       responses:
 *         200:
 *           description: "Cryptocurrencies add successful"
 *         400:
 *           description: "Cryptocurrencies registration error"
 *         401:
 *           description: "Unauthenticated"
 * definitions:
 *   UserData:
 *     required:
 *       - "username"
 *       - "password"
 *       - "preferred_currency"
 *     properties:
 *       name:
 *         type: "string"
 *         example: "name"
 *       lastname:
 *         type: "string"
 *         example: "lastnema"
 *       username:
 *         type: "string"
 *         example: "username"
 *       password:
 *         type: "string"
 *         example: "password"
 *       preferred_currency:
 *         type: "string"
 *         description: "can be ars, usd or eur"
 *         example: "ars"
 *   Login:
 *     properties:
 *       username:
 *         type: "string"
 *         example : "username"
 *       password:
 *         type: "string"
 *         example: "passwaord"
 *   Cryptocurrencies:
 *     properties:
 *       cryptocurrencies:
 *         type: string
 *         example: ["btc", "usdt", "eth"]
 */
