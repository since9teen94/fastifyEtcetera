const path = require("path")
const fp = require("fastify-plugin")
module.exports = fp(async (app, opts) => {
  app.register(require("@fastify/static"), {
    root: path.join(__dirname, "../public"),
  })
})
