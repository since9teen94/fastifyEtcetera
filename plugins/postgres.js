const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  //for deploy
  const connectionString = app.env("DATABASE_URL") || app.env("CONN_STRING");
  let opts = { connectionString };
  if (connectionString == app.env("DATABASE_URL"))
    opts.rejectUnauthorized = true;
  app.register(require("@fastify/postgres"), opts);
});
