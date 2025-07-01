var questionNum = 0;
var score = 0;
var isAIGenerated;

function loadQuestion() {
    questionNum++;
    document.getElementById("question-num").textContent = "Question #" + questionNum;
    document.getElementById("score").textContent = "Score: " + score;

    isAIGenerated = (Math.random() < 0.5); //temporary
}

document.getElementById("confirm-button").onclick = function() {
    var answer;
    if (document.getElementById("yes-button").checked) {
        answer = true;
    } else if (document.getElementById("no-button").checked) {
        answer = false;
    } else {
        console.error("No button checked!!");
        return;
    }

    console.log("Answer: " + answer, "game answer: " + isAIGenerated);
    if (answer == isAIGenerated) {
        score++;
    } else {
        score--;
    }

    loadQuestion();
}

loadQuestion();