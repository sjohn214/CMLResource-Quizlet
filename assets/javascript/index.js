// Logic//
// Variables that keep track of quiz status//

var index = 0
var time = questions.length * 10;
var timer;


// Variables referrencing the DOM//
var startBtn = document.getElementById("startTimer");
var questionElement = document.getElementById("cml-quiz-questions");
var optionsElement = document.getElementById("options");
var gameEndElement = document.getElementById("quiz-end");
var submitElement = document.getElementById("initials");
var timerElement = document.getElementById("time");

function start(){
  var welcomeElement = document.getElementById("welcome")
  welcomeElement.setAttribute("class", "hid")
  questionElement.removeAttribute("class")
  timer = setInterval(clock, 1000)
  timerElement.textContent = time
}

function clock(){
    time --
    timerElement.textContent = time
}