//Get elements from the DOM.
const startButton = document.getElementById("start-button");
const header = document.getElementById("header");
const description = document.getElementById("description");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const timer = document.getElementById("timer");
const highscoreContainer = document.getElementById("highscore-container");
const highscoreList = document.getElementById("highscore-list");
const submitEl = document.getElementById("submit-button");
const initialsEl = document.getElementById("initials-input");

//Create list element for answers.
let answerListEl = document.createElement("li");
//Create button element for each answer in the answer list. 
let answerButtonEl = document.createElement("button");
//Create list element for highscore.
let highscoreRecord = document.createElement("li");

//Hide Highscore Container until game over.
highscoreContainer.setAttribute("style","display:none");

//Allow timer to count down and changes text color to red when <5sec remain. 
function handleTimer(){
    let sec = 60; //CHANGE BACK TO APPROPRIATE TIME WHEN DONE TESTING!
    let time = setInterval(function(){
        timer.textContent="Timer: " + sec + " seconds left.";
        sec--;
        if (sec < 5) {
            timer.setAttribute("style","color:red;");
        }
        if (sec < 0) {
            clearInterval(time);
            handleGameOver();
        }
    }, 1000);
}

//Create a bank of questions and answers to pull from.
const questionBank = [
    {question: "Which of the following is NOT a data type?",
    answers: ["Boolean","Number","Date","String"],
    correctAnswer:"Date"},
    {question: "How do you write something to the console?",
    answers: ["console.write","console.log","print","prompt"],
    correctAnswer:"console.log"},
    {question: "How do you alert the user?",
    answers: ["prompt", "confirm", "print", "alert"],
    correctAnswer:"alert"},
    {question: "How do you save a variable that will not be overwritten?",
    answers: ["let","const","var","prompt"],
    correctAnswer:"const"},
    {question: "What event allows something to change on a click?",
    answers: ["click","event.target","onClick","submit"],
    correctAnswer:"click"}
];

//Hide question container until the game starts.
questionContainer.setAttribute("style","display:none");

//Create first question on start. 
//Show question container on start. 
function handleStartGame(event) {
    startButton.remove();
    description.textContent = ("Game Start! First Question:");
    questionContainer.setAttribute("style","");
    handleNextQuestion(0)
}

function handleNextQuestion (number) {
    questionText.textContent = (questionBank[number].question);
    for (let i = 0; i < 4; i++) {
        answerListEl = document.createElement("li");
        answerButtonEl = document.createElement("button")
        answerButtonEl.textContent = (questionBank[number].answers[i]);
        answerContainer.append(answerListEl);
        answerListEl.append(answerButtonEl)
    }
    let userAnswer = event.target.textContent
    if (userAnswer===questionBank[number].correctAnswer){
        description.textContent = ("Next Question:")
        console.log("Correct")
        number++
        questionText.textContent = (questionBank[number].question)
        for (let i = 0; i < 4; i++) {
            answerListEl = document.createElement("li");
            answerButtonEl = document.createElement("button")
            answerButtonEl.textContent = (questionBank[number].answers[i]);
            answerContainer.append(answerListEl);
            answerListEl.append(answerButtonEl)
        }
    } else {
        description.textContent = ("Next Question:")
        console.log("Wrong")
        number++
        questionText.textContent = (questionBank[number].question)
        for (let i = 0; i < 4; i++) {
            answerListEl = document.createElement("li");
            answerButtonEl = document.createElement("button")
            answerButtonEl.textContent = (questionBank[number].answers[i]);
            answerContainer.append(answerListEl);
            answerListEl.append(answerButtonEl)
        }
    }
    
    if (number>questionBank.length){
        handleGameOver()
    }

}

answerButtonEl.addEventListener("click", handleNextQuestion);

function handleGameOver() {
    questionContainer.setAttribute("style","display:none")
    description.textContent = ("Game Over!");
    highscoreContainer.setAttribute("style","");
}

function handleSubmit (event){
    event.preventDefault();
    let highscoreAr = []
    let timeLeft = ""
    if (timer.textContent.length===22){
        timeLeft = parseInt(timer.textContent.substr(7,1));
        highscoreAr.push(timeLeft);
    } else if (timer.textContent.length===23){
        timeLeft = parseInt(timer.textContent.substr(7,2));
        highscoreAr.push(timeLeft);
    } else if (timer.textContent.length===24){
        timeLeft = parseInt(timer.textContent.substr(7,3));
        highscoreAr.push(timeLeft);
    }
    highscoreAr.sort()
    console.log(highscoreAr)
    console.log(highscoreRecord)
    for (let i = 0; i < highscoreAr.length; i++) {
        highscoreRecord = document.createElement("li");
        highscoreRecord.textContent=(initialsEl.value + ": " + highscoreAr[i]);
        highscoreList.append(highscoreRecord);
    }
}

//Have the start button start the timer and start the quiz on click. 
startButton.addEventListener("click", handleStartGame);
startButton.addEventListener("click", handleTimer);


submitEl.addEventListener("click", handleSubmit);



