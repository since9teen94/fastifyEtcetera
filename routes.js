module.exports = async (app, opts) => {
  app.get("/", async (req, res) => {
    const features = app.info.cards[0].data;
    features.forEach((feature) => {
      if (features.indexOf(feature) % 2 == 0) {
        feature.odd = true;
      } else feature.odd = false;
    });
    context = {
      title: "Home",
      features,
      year: new Date().getFullYear(),
    };
    return res.view("home.html", context);
  });
};
