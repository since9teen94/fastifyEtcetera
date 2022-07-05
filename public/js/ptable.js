const getElements = async () => {
  const req = await fetch(
    "https://periodic-table-elements-info.herokuapp.com/elements"
  );
  const res = await req.json();
  return res;
};

document.addEventListener("DOMContentLoaded", async () => {
  const table = qs("#table");
  const next = qs(".next");
  const prev = qs(".prev");
  const links = qsa(".pagination>li>a");
  //[(next, prev)];
  links.forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      let action = e.target.classList.contains("next")
        ? "next"
        : e.target.classList.contains("prev")
        ? "prev"
        : "other";
      if (action == "other") {
        const classListArray = [...e.target.classList];
        action = parseInt(
          classListArray.filter((listItem) => listItem.match(/[0-9]+/))
        );
      }
      console.log(action);
    })
  );
});
