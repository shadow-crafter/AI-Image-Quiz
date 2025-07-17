const URLPARAMS = new URLSearchParams(window.location.search);
const SCORE = URLPARAMS.get('score');
const QUESTIONS = URLPARAMS.get('questions');
const SCORE_DISPLAY = document.getElementById("final-score");

SCORE_DISPLAY.textContent = SCORE_DISPLAY.textContent.replace("x1", QUESTIONS).replace("x2", SCORE);
if (QUESTIONS == 1) {
    SCORE_DISPLAY.textContent = SCORE_DISPLAY.textContent.replace("questions", "question");
}
