const getElements = async () => {
  const req = await fetch(
    "https://periodic-table-elements-info.herokuapp.com/elements"
  );
  const res = await req.json();
  return res;
};

document.addEventListener("DOMContentLoaded", async () => {
  let page = 1;
  let lastPage = parseInt(qs("#lastPage").dataset.page);
  console.log(lastPage);
  const table = qs("#table");
  const next = qs(".next");
  const prev = qs(".prev");
  const links = qsa(".pagination>li>a");
  links.forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      let action = e.target.classList.contains("next")
        ? "next"
        : e.target.classList.contains("prev")
        ? "prev"
        : "other";
      if (action == "next" && page != lastPage) page++;
      else if (action == "prev" && page - 1 != 0) page--;
      else if (action == "other") {
        const classListArray = [...e.target.classList];
        page = parseInt(
          classListArray.filter((listItem) => listItem.match(/[0-9]+/))
        );
      }
      const req = await fetch(`/home/ptable/pagination/${page}`);
      const res = await req;
      console.log(res);
    })
  );
});
