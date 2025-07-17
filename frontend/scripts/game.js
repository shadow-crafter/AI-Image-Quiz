const aiImagesLen = 2; 
const realImagesLen = 2;

const YES_BUTTON = document.getElementById("yes-button");
const No_BUTTON = document.getElementById("no-button");
const CONFIRM_BUTTON = document.getElementById("confirm-button");
const QUIZ_IMAGE = document.getElementById("quiz-img");
const TIMER_DISPLAY = document.getElementById("timer");
const CORRECT_AUDIO = new Audio("../assets/audio/correct.mp3");
const INCORRECT_AUDIO = new Audio("../assets/audio/incorrect.mp3");
const TIMER_LENGTH = 30;

let questionNum = 0;
let score = 0;
let isAIGenerated;

async function loadImage() {
    const RESPONSE = await fetch('http://localhost:5000/imgapi/random-image');
    console.log("Response: ", RESPONSE);
    const DATA = await RESPONSE.json();
    console.log("Data: ", DATA);
    QUIZ_IMAGE.src = `http://localhost:5000/imgapi/images/${DATA.image_path}`;
    isAIGenerated = DATA.label === "AI";
}

function loadQuestion() {
    questionNum++;
    document.getElementById("question-num").textContent = "Question #" + questionNum;
    document.getElementById("score").textContent = "Score: " + score;

    loadImage();

    /* old code

    isAIGenerated = (Math.random() < 0.5); //temporary
    let imageDir, imgDirLen, imageFile;
    if (isAIGenerated) {
        imageDir = "imgs/AI/";
        imgDirLen = aiImagesLen;
    } else {
        imageDir = "imgs/real/";
        imgDirLen = realImagesLen;
    }
    
    // Pick a random image from the list
    imageFile = "img" + Math.floor(Math.random() * imgDirLen);
    console.log("Image file: " + imageFile + ", len: " + imgDirLen);
    document.getElementById("quiz-img").src = imageDir + imageFile + ".png";
    */
}

CONFIRM_BUTTON.onclick = function() {
    let answer;
    if (YES_BUTTON.checked) {
        answer = true;
        YES_BUTTON.checked = false;
    } else if (No_BUTTON.checked) {
        answer = false;
        No_BUTTON.checked = false;
    } else {
        console.log("No button checked!!");
        return;
    }

    console.log("Answer: " + answer, "game answer: " + isAIGenerated);
    if (answer == isAIGenerated) {
        score += 10;
        CORRECT_AUDIO.currentTime = 0;
        CORRECT_AUDIO.play();
    } else {
        score -= 5;
        if (score < 0) score = 0;
        
        INCORRECT_AUDIO.currentTime = 0;
        INCORRECT_AUDIO.play();
    }

    loadQuestion();
}

function startTimer() {
    let remainingTime = TIMER_LENGTH;
    TIMER_DISPLAY.textContent = remainingTime;

    timer = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            TIMER_DISPLAY.textContent = "Time's up!";
            window.location.href = `./gameover.html?score=${score}&questions=${questionNum}`;
        } else {
            TIMER_DISPLAY.textContent = remainingTime;
            remainingTime--;
        }
    }, 1000);
}

YES_BUTTON.checked = false; // make sure its unchecked when page loads
No_BUTTON.checked = false;
startTimer();
loadQuestion();
