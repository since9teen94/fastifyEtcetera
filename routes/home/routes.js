module.exports = async (app, opts) => {
  app.get("/", async (req, res) => {
    const context = { title: "Home", year: app.utils.year() };
    return res.view("home.html", context);
  });
};
