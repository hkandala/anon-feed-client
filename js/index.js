let apiBaseUrl = "https://anon-feed-api.herokuapp.com/"

let createApi = apiBaseUrl + "session/create/"

let sessionIdSpan = document.getElementById("session-id");
let joinSessionInput = document.getElementById("join-session-id");

async function createSession() {
  let response = await fetch(createApi);
  let jsonResponse = await response.json();
  let sessionId = jsonResponse["session_id"];

  window.location.href = "session.html?id=" + encodeURIComponent(sessionId);
}

function joinSession() {
  let sessionId = joinSessionInput.value;
  if (sessionId.length == 6) {
    window.location.href = "session.html?id=" + encodeURIComponent(sessionId);
  }
}
