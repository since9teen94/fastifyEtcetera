function qs(selector) {
  return document.querySelector(selector)
}
async function getQuote() {
  let response = await fetch(
    "https://officeapi.akashrajpurohit.com/quote/random"
  )
  let data = await response.json()
  return {
    quote: `"${data.quote}"`,
    author: `- ${data.character}`,
  }
}
async function setNewQuote() {
  const res = await getQuote()
  qs("#text").innerText = res.quote
  qs("#author").innerText = res.author
}
document.addEventListener("DOMContentLoaded", async () => {
  await setNewQuote()
  qs("#new-quote").addEventListener("click", setNewQuote)
})
