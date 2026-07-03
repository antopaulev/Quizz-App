const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const scoreSpan = document.getElementById("score");
const answerContainer = document.getElementById("answer-container");
const progressBar = document.getElementById("progress");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const restartButton = document.getElementById("restart-btn");
const totalQuestionSpan = document.getElementById("total-question");
const resultMessageSpan = document.getElementById("result-message");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//quiz state variables

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    answerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPrecent = (currentQuestionIndex / quizQuestions.length) *100;
    progressBar.style.width = progressPrecent + "%";

    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener("click",selectAnswer);
        answerContainer.appendChild(button);
    });

}

function selectAnswer(event ){
    if(answerDisabled) return;
     answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach((button) =>{
        if (button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        else if (button === selectedButton){
            button.classList.add("incorrect")
        }
    });
    if (isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }
        else{
            showResult();
        }
    },1000); 
}

function showResult(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;
    if (percentage === 100){
        resultMessageSpan.textContent = "Perfect! You are a quiz master!";
    }
    else if (percentage >= 80){
        resultMessageSpan.textContent = "Excellent work!";
    }
    else if (percentage >= 60){
        resultMessageSpan.textContent = "Good job!";
    }
    else if(percentage >= 40){
        resultMessageSpan.textContent = "Not bad, keep practicing!";
    }
    else{
        resultMessageSpan.textContent = "Better luck next time!";
    }
}
function restartQuiz(){
resultScreen.classList.remove("active");

startQuiz();
}