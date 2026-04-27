const questions = [
    {
        question: "What is the capital of Assam?",
        answers: ["Dibrugarh", "Guwahati", "Dispur", "Silchar"],
        correct: 2
    },
    {
        question: "Which river flows through Assam?",
        answers: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"],
        correct: 2
    },
    {
        question: "Kaziranga National Park is famous for which animal?",
        answers: ["Tiger", "Elephant", "One-horned Rhinoceros", "Leopard"],
        correct: 2
    },
    {
        question: "Which festival is most famous in Assam?",
        answers: ["Diwali", "Bihu", "Holi", "Durga Puja"],
        correct: 1
    },
    {
        question: "Assam is the largest producer of which item?",
        answers: ["Coffee", "Tea", "Rice", "Spices"],
        correct: 1
    },
    {
        question: "Which city is known as the gateway to Northeast India?",
        answers: ["Shillong", "Imphal", "Guwahati", "Agartala"],
        correct: 2
    },
    {
        question: "Which dance form is traditional to Assam?",
        answers: ["Kathak", "Bharatanatyam", "Bihu Dance", "Odissi"],
        correct: 2
    },
    {
        question: "Which national park in Assam is a UNESCO World Heritage Site?",
        answers: ["Manas National Park", "Nameri National Park", "Dibru-Saikhowa", "Orang National Park"],
        correct: 0
    },
    {
        question: "What is the official language of Assam?",
        answers: ["Hindi", "Assamese", "Bengali", "English"],
        correct: 1
    },
    {
        question: "Which famous temple is located in Guwahati?",
        answers: ["Somnath Temple", "Kamakhya Temple", "Kashi Vishwanath", "Jagannath Temple"],
        correct: 1
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    resetState();

    // fade out
    questionEl.style.opacity = 0;

    setTimeout(() => {
        let q = questions[currentIndex];

        // set new question
        questionEl.innerText = q.question;

        // create answer buttons
        q.answers.forEach((ans, i) => {
            let btn = document.createElement("button");
            btn.innerText = ans;

            btn.onclick = () => selectAnswer(i, q.correct, btn);

            answersEl.appendChild(btn);
        });

        // fade in
        questionEl.style.opacity = 1;

    }, 150);
}

function resetState() {
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
}

function selectAnswer(selected, correct, btn) {
    let buttons = answersEl.querySelectorAll("button");

    buttons.forEach((b, i) => {
        b.disabled = true;

        if (i === correct) {
            b.classList.add("correct");
        } else if (i === selected) {
            b.classList.add("wrong");
        }
    });

    if (selected === correct) {
        score++;
    }

    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    currentIndex++;

    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
};

function showScore() {
    questionEl.innerText = "Quiz Finished!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";

    scoreEl.classList.remove("hidden");
    scoreEl.innerText = `Your Score: ${score}/${questions.length}`;

    let restartBtn = document.createElement("button");
    restartBtn.innerText = "Restart";
    restartBtn.onclick = restartQuiz;

    answersEl.appendChild(restartBtn);
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    scoreEl.classList.add("hidden");
    loadQuestion();
}

// INIT
loadQuestion();