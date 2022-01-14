import "./index.css";
const recognition = new window.webkitSpeechRecognition();
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
let isStart = false;

startButton.addEventListener("click", (event) => {
  if (startButton.classList.contains("show")) {
    isStart = true;
    startButton.classList.add("hide");
    startButton.classList.remove("show");

    stopButton.classList.remove("hide");
    stopButton.classList.add("show");
    startRecording();
  }
});

stopButton.addEventListener("click", (event) => {
  if (stopButton.classList.contains("show")) {
    isStart = false;
    stopButton.classList.remove("show");
    stopButton.classList.add("hide");

    startButton.classList.add("show");
    startButton.classList.remove("hide");
    stopRecording();
  }
});

function startRecording() {
	recognition.start();
}

function stopRecording() {
  recognition.stop();
}

recognition.onresult = function (event) {
  let saidText = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      saidText = event.results[i][0].transcript;
    } else {
      saidText += event.results[i][0].transcript;
    }
  }

  document.getElementById("speechText").value = saidText;
};

recognition.onend = function (event) {
  isStart = false;
  stopButton.classList.remove("show");
  stopButton.classList.add("hide");

  startButton.classList.add("show");
  startButton.classList.remove("hide");
};
