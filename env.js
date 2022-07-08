const dotenv = require("dotenv").config();
const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  app.decorate("env", function (variable) {
    return process.env[variable];
  });
});
