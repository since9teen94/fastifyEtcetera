const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  app.register(require("@fastify/cookie"));
  app.register(require("@fastify/session"), {
    secret: app.env("SESSION_SECRET"),
    cookie: { secure: false },
  });
});
