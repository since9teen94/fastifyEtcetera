module.exports = async (app, opts) => {
  app.get("/", async (req, res) => {
    let features = app.info.cards[0].data;
    features.forEach((feature, index) => {
      feature.index = parseInt(index);
    });
    context = {
      title: "Home",
      features,
      year: app.utils.year(),
    };
    return res.view("home.html", context);
  });
  app.get("/game", async (req, res) => {
    const context = { title: "Tic-Tac-Toe", year: app.utils.year() };
    return res.view("game.html", context);
  });
  app.get("/skills", async (req, res) => {
    let skills = app.info.cards[1].info;
    let skillArrays = app.utils.chunkArray(skills, 2);
    const context = {
      title: "Skills",
      skillsOne: skillArrays[0],
      skillsTwo: skillArrays[1],
      year: app.utils.year(),
    };
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
    let curPage =
      req.query.curPage != undefined ? parseInt(req.query.curPage) : 1;
    const context = app.utils.ptable(curPage, res);
    return curPage < 1
      ? res.redirect("ptable?curPage=1")
      : curPage > context.lastPage
      ? res.redirect(`ptable?curPage=${context.lastPage}`)
      : res.view("ptable.html", context);
  });
};
