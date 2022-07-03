"use strict";
const fastify = require("fastify");
const path = require("path");
module.exports = function build(opts = {}) {
  const app = fastify(opts);
  const autoload = require("@fastify/autoload");
  app.register(require("./env"));
  app.register(autoload, { dir: path.join(__dirname, "plugins") });
  app.register(autoload, { dir: path.join(__dirname, "routes") });
  return app;
};
