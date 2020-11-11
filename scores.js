//CML Resource Quizlet button declarations
var scoreResults = document.querySelector("#scoreResults");
var clearData = document.querySelector("#clearData");
var returnBtn = document.querySelector("returnBtn");

//event listener for clear scores
clearData.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Gets local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if(allScores !== null) {
    for (var i = 0; i < allScores.length; i++){
        var newLi = document.createElement("li");
        newLi.textContent = allScores[i].initials + "" + allScores[i].score;
        highScore.appendChild(newLi);
    }
}
//to go to index page must create another event listener
returnBtn.addEventListener("click", function(){
    window.location.replace("./index.html");
});