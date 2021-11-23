/**
 * GET
 * POST: Criar uma informação no backend
 * PUT: Alterar informação no backend
 * DELETE
 */

/**
 * PARÂMETROS
 * Query: Parâmentros nomeados enviados na rota
 * Route Params: Parâmetros usados para identificar um recurso
 * Request Body: Corpo da requisição
 */

/**
 * Driver: Select * from users;
 * Query Builders: table('users').select('*').where('')
 *
 */

const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(3001);
