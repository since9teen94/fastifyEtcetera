const form = document.getElementById("logRegForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
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
  if (res.status == 200 || res.status == 201) window.location.replace("/home");
  else console.log(res);
});
