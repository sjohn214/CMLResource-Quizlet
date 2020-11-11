//CML Resource Questions for Quizlet set with var for arrays
var questionsEl = [
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
var questionsElindex = 0;

//Designate code for declared variables
var preciseTime = document.querySelector("#Counter");
var timerEl = document.querySelector("#startCounter");
var quizQuestions = document.querySelector("#Information");
var wrapper = document.querySelector("#wrapper");


//Time remaining is 15 seconds per question:
var timeRemaining = 76;
//Maintains penalty and interval timing
var penaltyEl = 10;
var intervalEl = 0;
// Will create new elements if required
var ulNew = document.createElement("ul");

//Activates timer when button is pressed and displays user message
timerEl.addEventListener("click", function() {

    if (intervalEl === 0) {
        intervalEl = setInterval(function(){
            timeRemaining--;
            preciseTime.textContent = "Time:" +timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(intervalEl);
                allDone();
                preciseTime.textContent = "Time is up!";
            }
        }, 1000);
        
    }
    render(questionsElindex);
});

//Create function that generates Q&A to page
function render(questionsElindex) {
    quizQuestions.innerHTML = "";
    ulNew.innerHTML = "";
    //Will clear any existing data provided by browser^^
    //Create loops to display array information
    for (var i = 0; i < questionsEl.length; i++) {
        var playerQuestion = questionsEl[questionsElindex].title;
        var playerOptions = questionsEl[questionsElindex].options;
        quizQuestions.textContent = playerQuestion;
    }
    // New functions for playerOptions
    playerOptions.forEach(function (newItem){
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizQuestions.appendChild(ulNew);
        ulNew.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//Answer/Option comparisions
function compare(event) {
    var element = event.target ;
    if(element.matches("li")){
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if(element.textContent == questionsEl[questionsElindex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questionsEl[questionsElindex].answer;
        }
        else{
            timeRemaining = timeRemaining - penaltyEl;
            createDiv.textContent = "Wrong Answer! The correct answer is: " + questionsEl[questionsElindex].answer;
        }
    }
    //Set parameters for questionElindex to determine the question the user is on/recently completed
    questionsElindex++;
    if(questionsElindex >= questionsEl.length) {
        allDone();
        createDiv.textContent = "End of CML Resource Quizlet!" + "" + "You earned" + score + "/" + questionsEl.length + "Correct!";
    }
    else{
        render(questionsElindex);
    }
    quizQuestions.appendChild(createDiv);
}

//Last page for allDone render
function allDone() {
    quizQuestions.innerHTML = "";
    preciseTime.innerHTML = "";

    //h1 setting
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "All Done!"
    quizQuestions.appendChild(newH1);

    //p setting
    var newP = document.createElement("p");
    newP.setAttribute("id", "newP");
    quizQuestions.appendChild(newP);

    //Produces remaining time and calculates score
    if(timeRemaining >= 0) {
        var timeRemaining = secondsLeft;
        var newP2 = document.createElement("p2");
        clearInterval(intervalEl);
        newP.textContent = "Your Results are: " + timeRemaining;
        quizQuestions.appendChild(newP2);
    }

    //label
    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = "Enter your initials:";
    quizQuestions.appendChild(newLabel);

    //input
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "initials");
    newInput.textContent = "";
    quizQuestions.appendChild(newInput);

    //submitt
    var newSubmit = document.createElement("button");
    newSubmit.setAttribute("type", "submit");
    newSubmit.setAttribute("id", "Submit");
    newSubmit.textContent = "Submit";
    quizQuestions.appendChild(newSubmit);

    //event listener for storage
    newSubmit.addEventListener("click", function(){
        var initials = newInput.value;

        if (initials === null){
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
            window.location.replace("./scores.html");
        }
    });
}