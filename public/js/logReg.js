const form = document.getElementById("logRegForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = document.getElementById("logRegForm");
  const formData = new FormData(form);
  const body = JSON.stringify(Object.fromEntries(formData));
  const req = await fetch("/{{type}}", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const res = await req.json();
  console.log(res);
  console.log("hahaha");
});
