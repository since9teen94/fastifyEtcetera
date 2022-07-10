const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  //for deploy
  const connectionString = app.env("DATABASE_URL") || app.env("CONN_STRING");
  app.register(require("@fastify/postgres"), {
    connectionString,
  });
});
