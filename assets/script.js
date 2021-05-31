const startButton = document.getElementById("start-button");
const header = document.getElementById("header");
const description = document.getElementById("description");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const timer = document.getElementById("timer");
let answerListEl = document.createElement("li");
let answerButtonEl = document.createElement("button")
const highscoreContainer = document.getElementById("highscore-container");
const highscoreList = document.getElementById("highscore-list");

function handleTimer(){
    let sec = 30;
    let time = setInterval(function(){
        timer.textContent="Timer: " + sec + " seconds left.";
        sec--;
        if (sec < 5) {
            timer.setAttribute("style","color:red;");
        }
        if (sec < 0) {
            clearInterval(time);
            console.log("Out of Time!");
            handleGameOver(questionContainer)
        }
    }, 1000);
}

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

questionContainer.setAttribute("style","visibility:hidden")

function handleStartGame(event) {
    console.log(startButton.textContent);
    startButton.remove();
    description.textContent = ("Game Start! First Question:")
    questionContainer.setAttribute("style","")
    questionText.textContent = (questionBank[0].question)
    for (let i = 0; i < 4; i++) {
        answerListEl = document.createElement("li");
        answerButtonEl = document.createElement("button")
        answerButtonEl.textContent = (questionBank[0].answers[i]);
        answerContainer.append(answerListEl);
        answerListEl.append(answerButtonEl)
    }
}

function handleNextQuestion() {
    for (let int = 0; int < questionBank.length; int++) {
        questionText.textContent.remove()
        answerListEl.remove()
        questionText.textContent = (questionBank[int].question)
        for (let i = 0; i < 4; i++) {
            answerListEl = document.createElement("li");
            answerButtonEl = document.createElement("button")
            answerButtonEl.textContent = (questionBank[int].answers[i]);
            answerContainer.append(answerListEl);
            answerListEl.append(answerButtonEl)
        }
    }
    return
}


    

function handleWrongAnswer() {
    description.textContent = ("Wrong! Next Question:")
    console.log("Wrong")
}

function handleGameOver(element) {
    element.remove();
    description.textContent = ("Game Over!");
    let highscoreRecord = document.createElement("li");
    let highscoreNumber = sec
    highscoreContainer.setAttribute("style","");
    const initialsEl = document.createElement("input");
    initialsEl.setAttribute("type","text");
    initialsEl.setAttribute("name","Initials");
    initialsEl.setAttribute("placeholder","Type your initials here.");
    highscoreContainer.append(initialsEl);
    const submitEl = document.createElement("input");
    submitEl.setAttribute("type","submit");
    submitEl.setAttribute("value","Submit");
    submitEl.setAttribute("id","submit");
    highscoreContainer.append(submitEl);


}

function handleSubmit (){
    let highscoreRecord = document.createElement("li");
    highscoreRecord.textContent=(initialsEl.value + ": " + sec)
}

startButton.addEventListener("click", handleStartGame);
startButton.addEventListener("click", handleTimer);

submitEl.addEventListener("click", handleSubmit);

answerButtonEl.addEventListener("click", handleNextQuestion);





