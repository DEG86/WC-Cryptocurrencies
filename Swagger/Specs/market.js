/**
 *
 * @swagger
 *
 * paths:
 *   /api/market:
 *     get:
 *       tags:
 *         - "Marke"
 *       description: "List all cryptocurrencies"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "header"
 *           name: "authorization"
 *           type: "string"
 *           required: true
 *           description: " Authorization token"
 *         - in: "query"
 *           name: "page"
 *           type: "number"
 *           description: "actul page"
 *         - in: "query"
 *           name: "per_page"
 *           type: "number"
 *           description: "registers per page"
 *       responses:
 *         200:
 *           description: "Cryptocurrencies availables"
 *         400:
 *           description: "Cryptocurrencies query error"
 *         401:
 *           description: "Unauthenticated"
 *   /api/markettop:
 *     get:
 *       tags:
 *         - "Marke"
 *       description: "List top N of user cryptopcurrencies"
 *       produces:
 *         - "application/json"
 *       parameters:
 *         - in: "header"
 *           name: "authorization"
 *           type: "string"
 *           required: true
 *           description: " Authorization token"
 *         - in: "query"
 *           name: "top"
 *           type: "number"
 *           description: "amount of cryptocurrencies for the top"
 *         - in: "query"
 *           name: "order"
 *           type: "string"
 *           description: "organization for the top: asc=ascending, desc=descending"
 *       responses:
 *         200:
 *           description: "Cryptocurrencies list availables"
 *         400:
 *           description: "Cryptocurrencies query error"
 *         401:
 *           description: "Unauthenticated"
 *
 *
 */
