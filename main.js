const questions = [
    {
        question: "Which is largest animal in the world ?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephan", correct: false},
            {text: "Gorrafe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world ?",
        answers: [
            {text: "Vatican city", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Sri Lanka", correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world ?",
        answers: [
            {text: "Kalahary", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is smallest continent in the world ?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];


let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextBtn = document.getElementById("next-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz(){
    currentQuestionindex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function  showQuestion(){
    resetsate();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetsate(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    } Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "block";
    });
    nextBtn.style.display = "block";
}

function showScore(){
     resetsate();
     questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
     nextBtn.innerHTML = "Play Again";
     nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionindex++;
    if(currentQuestionindex < questions.length){
        showQuestion();
    }else{
        showScore();
    };
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionindex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();