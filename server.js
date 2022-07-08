"use strict";
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const server = require("./app")({
  //logger: { level: "info", transport: { target: "pino-pretty" } },
  logger: true,
});

server.ready(() => {
  server.listen({ port, host }, () =>
    console.log(`Listening on port: ${port}`)
  );
});
