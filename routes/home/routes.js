module.exports = async (app, opts) => {
  //function ptable(curPage, res) {
  //let elements = require("../../public/js/elements.js");
  //const chunkArray = (arr, size) =>
  //arr.length > size
  //? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
  //: [arr];
  //const chunkedElements = chunkArray(elements, 5);
  //const lastPage = chunkedElements.length;
  //const context = {
  //title: "Periodic Table",
  //year: app.utils.year(),
  //elements: chunkedElements[curPage - 1],
  //lastPage,
  //curPage,
  //};
  //return res.view("ptable.html", context);
  //}
  app.get("/", async (req, res) => {
    const context = { title: "Home", year: app.utils.year() };
    return res.view("home.html", context);
  });
  app.get("/game", async (req, res) => {
    const context = { title: "Tic-Tac-Toe", year: app.utils.year() };
    return res.view("game.html", context);
  });
  app.get("/skills", async (req, res) => {
    const skills = require("../../public/js/skills.js").skills;
    const context = { title: "Skills", skills, year: app.utils.year() };
    return res.view("skills.html", context);
  });
  app.get("/links", async (req, res) => {
    const skills = require("../../public/js/skills.js").links;
    const context = { title: "Skills", links, year: app.utils.year() };
    return res.view("links.html", context);
  });
  app.get("/quotes", async (req, res) => {
    const context = { title: "Office Quotes", year: app.utils.year() };
    return res.view("officeQuotes.html", context);
  });
  app.get("/ptable", async (req, res) => {
    let curPage = 1;
    const context = app.utils.ptable(curPage, res);
    return res.view("ptable.html", context);
  });
  app.get("/ptable/pagination/:curPage", async (req, res) => {
    let { curPage } = req.params;
    curPage = parseInt(curPage);
    const context = app.utils.ptable(curPage, res);
    return res.view("ptable.html", context);
  });
};
