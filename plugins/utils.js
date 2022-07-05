const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  app.decorate("utils", {
    emailIsValid: function (email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    has: function (object) {
      return Object.values(object).some((err) => Object.values(err).length > 0);
    },
    year: function () {
      return new Date().getFullYear();
    },
    chunkArray: function (obj) {
      let { elements, size } = obj;
      let arr = elements;
      arr.length > size
        ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
        : [arr];
    },
  });
});
