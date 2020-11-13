//CML Resource Questions for Quizlet set with var for arrays
var questions = [
    {
    title: "What library tool must every user possess in order to access library materials?",
    options: ["ID card", "phone number", "library card", "credit card"],
    answer: "library card"
},
{
    title: "Can child(ren) who attend CMS schools that do not have library card still access library materials?",
    options: ["No, must have a library card, no exceptions", "Yes, their student ID number is a library card through CMS One Access partnership", "Children are not allowed to use the library", "Don't they have a library at school?"],
    answer: "Yes, their student ID number is a library card through CMS One Access partnership"
},
{
    title: "I want to learn a new language, what lanuage subscriptions does the library have?",
    options: ["Pimsleur", "Rosetta Stone", "Duolingo", "Babbel", "Mango Languages"],
    answer: "Mango Languages"
},
{
    title: "How can I request a book that I see in your catalog?",
    options: ["Place a hold or quick pick up", "submit a purchase request", "request an Inter-library loan", "shrug shoulders"],
    answer: "Place a hold or quick pick up"
},
{
    title: "How many books can I have checked out on my library card account?",
    options: ["101", "99", "100", "20", "2"],
    answer: "99"
},
];

//Add values to variables
var score = 0;
var questionIndex = 0;

//Designate code for declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTimer");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");


//Time remaining is 15 seconds per question:
var secondsLeft = 76;
//Maintains penalty and interval timing
var penalty = 10;
var holdInterval = 0;
// Will create new elements if required
var ulCreate = document.createElement("ul");

//Activates timer when button is pressed and displays user message
timer.addEventListener("click", function() {

    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            secondsLeft--;
            currentTime.textContent = "Time:" + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Timer Expired!";
            }
        }, 1000);
        
    }
    render(questionIndex);
});

//Create function that generates Q&A to page
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    //Will clear any existing data provided by browser^^
    //Create loops to display array information
    for (var i = 0; i < questions.length; i++) {
        var playerQuestion = questions[questionIndex].title;
        var playerOptions = questions[questionIndex].options;
        questionsDiv.textContent = playerQuestion;
    }
    // New functions for playerOptions
    playerOptions.forEach(function (newItem){
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//Answer/Option comparisions
function compare(event) {
    var element = event.target ;
    if(element.matches("li")){
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if(element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        }
        else{
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong Answer! The correct answer is: " + questions[questionIndex].answer;
        }
    }
    //Set parameters for questionElindex to determine the question the user is on/recently completed
    questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of CML Resource Quizlet!" +  ""  +  "You earned"  +  score  + "/" + questions.length + "Correct!";
    }
    else{
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);
}

//Last page for allDone render
function allDone() {
    questionsDiv.innerHTML = "";
   currentTime.innerHTML = "";

    //h1 setting
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    questionsDiv.appendChild(createH1);

    //p setting
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsDiv.appendChild(createP);

    //Produces remaining time and calculates score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p2");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP2);
    }

    //label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials:";
    questionsDiv.appendChild(createLabel);

    //input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);

    //submitt
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);

    //event listener for storage
    createSubmit.addEventListener("click", function() {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value entered!");
        }
    
        else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            }
            else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./HighScores.html");
        }
    });
}