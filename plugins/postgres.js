const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  app.register(require("@fastify/postgres"), {
    connectionString: app.env("CONN_STRING"),
  });
});
