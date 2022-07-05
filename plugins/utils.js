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
    ptable: function (curPage, res) {
      let elements = require("../public/js/elements.js");
      const chunkArray = (arr, size) =>
        arr.length > size
          ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
          : [arr];
      const chunkedElements = chunkArray(elements, 10);
      const lastPage = chunkedElements.length;
      const context = {
        title: "Periodic Table",
        year: app.utils.year(),
        elements: chunkedElements[curPage - 1],
        lastPage,
        curPage,
      };
      return context;
    },
  });
});
