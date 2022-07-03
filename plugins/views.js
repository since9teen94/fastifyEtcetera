const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  app.register(require("@fastify/view"), {
    engine: { nunjucks: require("nunjucks") },
    templates: ["views", "components"],
  });
});
