//const skills = require("../../skills.js");
module.exports = async (app, opts) => {
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
    //const skills = require("../../public/js/skills.js").links;
    const context = { title: "Office Quotes", year: app.utils.year() };
    return res.view("officeQuotes.html", context);
  });
  app.get("/ptable", async (req, res) => {
    const getElements = async () => {
      const req = await fetch(
        "https://periodic-table-elements-info.herokuapp.com/elements"
      );
      const res = await req.json();
      return res;
    };
    let elements = await getElements();
    const chunkArray = (arr, size) =>
      arr.length > size
        ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
        : [arr];
    const chunkedElements = chunkArray(elements, 5);
    const lastPage = chunkedElements.length;
    const context = {
      title: "Periodic Table",
      year: app.utils.year(),
      elements: chunkedElements[0],
    };
    return res.view("ptable.html", context);
  });
  app.get("/ptable/pagination", async (req, res) => {
    const { action, curPage } = req.body;
    switch (action) {
      case "next":
        curPage++;
        break;
      case "prev":
        curPage--;
        break;
      case "custom":
        curPage = curPage;
        break;
      default:
        curPage = 1;
        break;
    }
    const getElements = async () => {
      const req = await fetch(
        "https://periodic-table-elements-info.herokuapp.com/elements"
      );
      const res = await req.json();
      return res;
    };
    let elements = await getElements();
    const chunkArray = (arr, size) =>
      arr.length > size
        ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
        : [arr];
    const chunkedElements = chunkArray(elements, 5);
    const lastPage = chunkedElements.length;
    const context = {
      title: "Periodic Table",
      year: app.utils.year(),
      elements: chunkedElements[curPage],
    };
    return res.view("ptable.html", context);
  });
};
