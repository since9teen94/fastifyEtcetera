document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("logRegForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = qsa(".form-floating > input");
    const form = document.getElementById("logRegForm");
    const type =
      form.dataset.type == "Log In"
        ? "login"
        : form.dataset.type == "Register"
        ? "register"
        : "";
    const formData = new FormData(form);
    const body = JSON.stringify(Object.fromEntries(formData));
    const req = await fetch(`/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const res = await req.json();
    if (res.status == 200 || res.status == 201)
      window.location.replace("/home");
    else {
      for (let [key, val] of Object.entries(res)) {
        let thisInput = qs(`#${key}-error`);
        thisInput.textContent = "";
      }
      for (let [key, val] of Object.entries(res)) {
        if (Object.values(val).length > 0) {
          let thisInput = qs(`#${key}-error`);
          for (let err of Object.values(val)) {
            thisInput.textContent += `${err}. `;
          }
        }
      }
    }
  });
});
