"use strict";
const dotenv = require("dotenv").config();
//const port = process.env.PORT || 3000;
const port = process.env.PORT;
const server = require("./app")({
  //logger: { level: "info", transport: { target: "pino-pretty" } },
  logger: true,
});

server.ready(() => {
  //server.listen({ port }, () => console.log());
  server.listen(process.env.PORT, "0.0.0.0");
});
