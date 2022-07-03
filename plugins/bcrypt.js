const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  app.register(require("fastify-bcrypt"), {
    saltWorkFactor: 12,
  });
});
