const aiImagesLen = 2; 
const realImagesLen = 2;

let questionNum = 0;
let score = 0;
let isAIGenerated;

function loadQuestion() {
    questionNum++;
    document.getElementById("question-num").textContent = "Question #" + questionNum;
    document.getElementById("score").textContent = "Score: " + score;

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
}

document.getElementById("confirm-button").onclick = function() {
    let answer;
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