let apiBaseUrl = "http://localhost:5000/"

let sessionApi = apiBaseUrl + "session/"

let sessionIdTitle = document.getElementById("session-id");
let errorBox = document.getElementById("error-box");
let sessionContentBox = document.getElementById("session-content");
let feedbackContainer = document.getElementById("feedback-container");
let receivedFeedbackTitle = document.getElementById("received-feedback-title");
let feedbackTextArea = document.getElementById("feedback");

let sessionId = new URL(window.location.href).searchParams.get("id");

fetchFeedback();

async function fetchFeedback() {
  if (sessionId != null && sessionId.length == 6) {
    let response = await fetch(sessionApi + sessionId + "/");
    let jsonResponse = await response.json();

    if (Array.isArray(jsonResponse)) {
      sessionIdTitle.innerText = "Session #" + sessionId;
      addReceivedFeedback(jsonResponse);
      showSessionContent();
    } else {
      showError();
    }
  } else {
    showError();
  }
}

function addReceivedFeedback(response) {
  if (response.length == 0) {
    receivedFeedbackTitle.className = "hide"
  } else {
    for (feedback of response) {
      feedbackElement = document.createElement("section");
      feedbackElement.innerText = feedback;
      feedbackContainer.appendChild(feedbackElement);
    }
  }
}

function showError() {
  errorBox.className = "show";
  sessionContentBox.className = "remove";
}

function showSessionContent() {
  errorBox.className = "remove";
  sessionContentBox.className = "show"
}

async function submitFeedback() {
  let feedbackMessage = encodeURIComponent(feedbackTextArea.value);
  let submitFeedbackApi = apiBaseUrl + "session/" + sessionId + "/feedback/add/?msg=" + feedbackMessage;
  await fetch(submitFeedbackApi);
  window.location.reload();
}
