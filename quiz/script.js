// 1. ADD YOUR QUESTIONS HERE
const myQuestions = [
    {
        type: "choice",
        question: "What is my favourite car brand?",
        options: ["BMW", "Acura", "Nissan", "Mercedes"],
        // You can now list multiple correct answers here!
        correct: ["Mercedes"] 
    },
    // {
    //     type: "scale",
    //     question: "How much do you love our inside jokes?",
    // },
    {
        type: "choice",
        question: "What is the first movie we watched together?",
        options: ["IT", "Scarface", "Pulp Fiction"],
        correct: ["IT"]
    },
    {
        type: "choice",
        question: "What is the first place we went to together?",
        options: ["Drmers Club in Gastown", "Ramen Danbo in North Vancouver", "Capitol Hill Viewpoint", "White Rock Beach"],
        correct: ["Drmers Club in Gastown"]
    },
    {
        type: "choice",
        question: "What did we talk about WHEN we first started getting to know each other? (properly)",
        options: ["Smashing Pumpkins", "Keyboards", "Music"],
        correct: ["Keyboards"]
    },
    {
        type: "choice",
        question: "Who is my favourite MUSIC artist?",
        options: ["Slowdive", "Fleeting Joys", "Arctic Monkeys", "Wallows", "The Cure", "Duran Duran"],
        correct: ["Slowdive", "Fleeting Joys", "Arctic Monkeys", "Wallows", "The Cure", "Duran Duran"]
    },
    {
        type: "choice",
        question: "What is the first thing I noticed about you?",
        options: ["Your eyes", "Your hair", "Your style", "Your voice"],
        correct: ["Your eyes", "Your hair", "Your style", "Your voice"]
    },
    {
        type: "choice",
        question: "Where did we go ice skating?",
        options: ["The Shipyards", "Robson Square", "Scott Road Rec Center", "Fleetwood Rec Center", "Trout Lake Skating Rink"],
        correct: ["Robson Square"]
    },
    {
        type: "choice",
        question: "What was the first song we enjoyed singing together in the car?",
        options: ["Uncomfortable by Wallows", 'back to friends by sombr', "Pictures Of You by The Cure", "I Have The Moon by Lush"],
        correct: ["Uncomfortable by Wallows"]
    },
    {
        type: "choice",
        question: "Are you ready for the final question?????",
        options: ["Yes", "Maybe", "No"],
        correct: ["Yes", "Maybe", "No"]
    },
    {
        type: "choice",
        question: "Are you sure??????????????????",
        options: ["Yes", "Maybe", "No"],
        correct: ["Yes", "Maybe", "No"]
    },
    {
        type: "scale",
        question: "How ready are you on a scale from 1-5?????????????????????",
    },
    {
        type: "choice",
        question: "May I be your boyfriend?? 🫣🫣🫣",
        options: ["Yes", "Yes"],
        correct: ["Yes", "Yes"]
    }
];

let currentQuestionIndex = 0;
let score = 0; 
let selectedAnswer = null; 

// Elements
const introScreen = document.getElementById('intro-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const choiceContainer = document.getElementById('choice-container');
const scaleContainer = document.getElementById('scale-container');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');

// Start Quiz
startBtn.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    showQuestion();
});

function showQuestion() {
    const q = myQuestions[currentQuestionIndex];
    questionText.innerText = q.question;
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1}`;
    
    selectedAnswer = null;
    scaleContainer.classList.add('hidden');
    choiceContainer.classList.add('hidden');
    nextBtn.classList.add('hidden');

    if (q.type === "choice") {
        choiceContainer.classList.remove('hidden');
        choiceContainer.innerHTML = ''; 
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.classList.add('choice-btn');
            btn.onclick = () => {
                document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedAnswer = opt; 
                nextBtn.classList.remove('hidden'); 
            };
            choiceContainer.appendChild(btn);
        });
    } else if (q.type === "scale") {
        scaleContainer.classList.remove('hidden'); 
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.onclick = () => {
                document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedAnswer = btn.getAttribute('data-value'); 
                nextBtn.classList.remove('hidden');
            };
        });
    }
}

// Next Button Click
nextBtn.addEventListener('click', () => {
    const q = myQuestions[currentQuestionIndex];

    // UPDATED SCORING LOGIC: Checks if the selected answer is in the correct array
    if (q.type === "choice" && q.correct.includes(selectedAnswer)) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < myQuestions.length) {
        showQuestion();
    } else {
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        const totalChoiceQuestions = myQuestions.filter(q => q.type === "choice").length;
        const scoreDisplay = document.getElementById('score-display');
        
        if (scoreDisplay) {
            scoreDisplay.innerText = `You got ${score} out of ${totalChoiceQuestions} right!`;
        }
    }
});