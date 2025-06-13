const questions = [
  {
    question: "Who is considered the first Filipino hero?",
    options: ["Andres Bonifacio", "Lapu-Lapu", "Jose Rizal", "Emilio Aguinaldo"],
    answer: "Lapu-Lapu"
  },
  {
    question: "When did the Philippines gain independence from Spain?",
    options: ["1896", "1898", "1901", "1946"],
    answer: "1898"
  },
  {
    question: "What is the capital of the Philippines?",
    options: ["Quezon City", "Cebu", "Davao", "Manila"],
    answer: "Manila"
  },
  {
    question: "What group did Andres Bonifacio lead?",
    options: ["Katipunan", "La Liga Filipina", "Guardia Civil", "Malolos Congress"],
    answer: "Katipunan"
  },
  {
    question: "Who wrote 'Noli Me Tangere'?",
    options: ["Antonio Luna", "Jose Rizal", "Graciano Lopez Jaena", "Apolinario Mabini"],
    answer: "Jose Rizal"
  },
  {
    question: "Where was the first Philippine Republic declared?",
    options: ["Kawit", "Malolos", "Manila", "Tarlac"],
    answer: "Malolos"
  }
];

const flirtyCorrect = [
  "Smart and sexy? You're a walking history book with swag. 📚🔥",
  "You got it right. Brains like that? Dangerous. 😏",
  "Correct! You're the reason the revolution started — hearts be shaking. 💘",
  "Damn, you're smarter than Rizal and hotter than Lapu-Lapu in battle. 😮‍💨",
  "You're a national treasure, no cap. 🏆",
  "With that answer? I’d draft you for my own revolution. 💥"
];

const flirtyWrong = [
  "Wrong answer, but you're still the plot twist I didn't see coming. 📖",
  "That wasn’t it, but I’d still start a revolution for you. 🔥",
  "Nope — but it’s okay. You're still giving 'main character energy'. 😌",
  "Wrong. But if loving you is a mistake, I don’t wanna be right. 😈",
  "History's hard, but falling for you? Too easy. ❤️",
  "That flopped, but your charm didn’t. 💋"
];

let currentQuestion = 0;
let score = 0;

const intro = document.getElementById("intro");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const flirtyDiv = document.getElementById("flirty-line");
const nextBtn = document.getElementById("nextBtn");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const finalSound = document.getElementById("finalSound");

document.getElementById("startBtn").addEventListener("click", () => {
  intro.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

nextBtn.addEventListener("click", () => {
  stopAllAudio();
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showScore();
  }
});

function loadQuestion() {
  const q = questions[currentQuestion];
  questionDiv.textContent = q.question;
  optionsDiv.innerHTML = '';
  flirtyDiv.textContent = '';

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(option, btn));
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(selected, button) {
  const correct = questions[currentQuestion].answer;
  const buttons = optionsDiv.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
    else if (btn.textContent === selected) btn.classList.add("wrong");
  });

  stopAllAudio();

  if (selected === correct) {
    score++;
    flirtyDiv.textContent = randomLine(flirtyCorrect);
    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    flirtyDiv.textContent = randomLine(flirtyWrong);
    wrongSound.currentTime = 0;
    wrongSound.play();
  }

  nextBtn.classList.remove("hidden");
}

function stopAllAudio() {
  [correctSound, wrongSound, finalSound].forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function randomLine(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function showScore() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  document.getElementById("score-text").textContent = `${score} out of ${questions.length} correct`;

  const finalLine = document.getElementById("final-flirty-line");
  if (score >= 3) {
    finalLine.textContent = "You nailed the quiz... and maybe my heart too. 😉";
  } else {
    finalLine.textContent = "Okay, you didn’t pass... but you definitely passed as my type 😏❤️";
  }

  finalSound.currentTime = 0;
  finalSound.play();
}
