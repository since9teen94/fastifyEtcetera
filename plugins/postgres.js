const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  const connectionString = app.env("DATABASE_URL") || app.env("CONN_STRING");
  app.register(require("@fastify/postgres"), {
    connectionString,
    ssl: app.env("DATABASE_URL") ? { rejectUnauthorized: false } : false,
  });
});
