//Get elements from the DOM.
const startButton = document.getElementById("start-button");
const header = document.getElementById("header");
const description = document.getElementById("description");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const timer = document.getElementById("timer");
const highscoreContainer = document.getElementById("highscore-container");
const highscoreList = document.getElementById("highscore-list");
const submitEl = document.getElementById("submit-button");
const initialsEl = document.getElementById("initials-input");

//Creates Unordered List element and makes its ID "answer-container"
let answerContainer = document.createElement("ul");
answerContainer.setAttribute("id", "answer-container");
//Places the answer container element in a variable.
const answerContainerEl = document.getElementById("answer-container");
//Create list element for answers.
let answerListEl = document.createElement("li");
//Create button element for each answer in the answer list. 
let answerButtonEl = document.createElement("button");
//Create list element for highscore.
let highscoreRecord = document.createElement("li");

//Hide Highscore Container until game over.
highscoreContainer.setAttribute("style","display:none");

//Sets the question number to the first question. 
let questionNum = 0;

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
    {question: "How do you save a variable that will NOT be overwritten?",
    answers: ["let","const","var","prompt"],
    correctAnswer:"const"},
    {question: "What event allows something to change on a click?",
    answers: ["click","event.target","onClick","submit"],
    correctAnswer:"click"},
];

//Hide question container until the game starts.
questionContainer.setAttribute("style","display:none");

//Create first question on start. 
//Show question container on start. 
//Remove start button on start. 
function handleStartGame() {
    startButton.remove();
    description.textContent = ("Game Start! First Question:");
    questionContainer.setAttribute("style","");
    handleNextQuestion()
}

//Sets timer time as global variable. (Needed to deduct time for wrong answers.)
let sec = 30;

//Allow timer to count down and changes text color to red when <5sec remain. Stops timer on game over conditions. 
function handleTimer(){
    sec = 30; //CHANGE BACK TO APPROPRIATE TIME WHEN DONE TESTING!
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
        if (questionNum>4) {
            clearInterval(time);
        }
    }, 1000);
}




//Handles the question creation. If questionNum is greater than questions, game over. 
function handleNextQuestion () {
    if (questionNum>4){
        handleGameOver();
        return;
    }

    //handles creation of initial answer container and answer buttons.
    else if (questionNum===0){
        questionText.textContent = (questionBank[questionNum].question);
        questionContainer.append(answerContainer);
        for (let i = 0; i < 4; i++) {
            answerListEl = document.createElement("li");
            answerButtonEl = document.createElement("button");
            answerButtonEl.textContent = (questionBank[questionNum].answers[i]);
            answerContainer.append(answerListEl);
            answerListEl.append(answerButtonEl);
            answerButtonEl.addEventListener("click", handleAnswerClick);
        }
    }
    //Replaces text for questions and answers. 
    else {
        questionText.textContent = (questionBank[questionNum].question);
        let listAr = answerContainer.childNodes;
        for (let i = 0; i < 4; i++) {
            answerButtonEl.addEventListener("click", handleAnswerClick);
            listAr[i].firstChild.textContent = (questionBank[questionNum].answers[i]);
        }
    }
} 


//Handles user's input for an answer. 
//If correct, removes old answers and goes to the next question
//If wrong, removes 5sec and keeps them on the question. 
function handleAnswerClick(event){
    if (event.target.textContent===questionBank[questionNum].correctAnswer){
        description.textContent = ("Next Question:");
        console.log("Correct");
        questionNum++
        handleNextQuestion();
    } else if ((event.target.textContent===questionBank[questionNum].correctAnswer)===false){
        description.textContent = ("Wrong! Try again!");
        description.setAttribute("style","color:red");
        console.log("Wrong");
        sec = sec-5;
    }
}

//Hides question container. Unhides highscore Container. Returns description and timer colors to normal if they were red before. 
function handleGameOver() {
    questionContainer.setAttribute("style","display:none")
    description.textContent = ("Game Over!");
    description.setAttribute("style","");
    highscoreContainer.setAttribute("style","");
    timer.setAttribute("style","");
}

//Puts high score in an ordered list. 
function handleSubmit (event){
    event.preventDefault();
    let highscoreAr = []
    let timeLeft = ""
    //Gets the numbers from the string in the timer. 
    //This prevents the timer from reading a different time than the score. This would not be the case if I used the "sec" variable.
    if (timer.textContent.length===22){
        timeLeft = timer.textContent.substr(7,1);
        highscoreAr.push(timeLeft);
    } else if (timer.textContent.length===23){
        timeLeft = timer.textContent.substr(7,2);
        highscoreAr.push(timeLeft);
    } else if (timer.textContent.length===24){
        timeLeft = timer.textContent.substr(7,3);
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
    localStorage.setItem(initialsEl.value, highscoreRecord)
}

//Have the start button start the timer and start the quiz on click. 
startButton.addEventListener("click", handleStartGame);
startButton.addEventListener("click", handleTimer);

answerButtonEl.addEventListener("click", handleNextQuestion);

submitEl.addEventListener("click", handleSubmit);
