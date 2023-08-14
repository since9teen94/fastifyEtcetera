const fp = require("fastify-plugin")
module.exports = fp(async (app, _opts) => {
  app.register(require("@fastify/view"), {
    engine: { nunjucks: require("nunjucks") },
    templates: ["views", "components"],
  })
})
