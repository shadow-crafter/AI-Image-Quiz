var questionNum = 0;
var score = 0;
var isAIGenerated;

function loadQuestion() {
    questionNum++;
    document.getElementById("question-num").textContent = "Question #" + questionNum;

    isAIGenerated = Boolean(Math.random()); //temporary
}

function answerQuestion() {
    var answer;
    if (document.getElementById("yes-button").checked) {
        answer = true;
    } else if (document.getElementById("no-button").checked) {
        answer = false;
    } else {
        console.error("No button checked!!");
        return;
    }

    if (answer == isAIGenerated) {
        score++;
    } else {
        score--;
    }
    loadQuestion();
}

loadQuestion();