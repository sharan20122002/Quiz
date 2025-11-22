
const questions = [
  { q: "Which is the largest planet?", opts: ["Earth", "Jupiter", "Mars", "Venus"], ans: 1 },
  { q: "What is 7 * 6?", opts: ["42", "44", "36", "48"], ans: 0 },
  { q: "JavaScript is ___ ?", opts: ["Language", "Library", "Framework", "OS"], ans: 0 }
];

let index = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = `Time: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
      nextBtn.disabled = false;
    }
  }, 1000);

  let q = questions[index];
  questionEl.textContent = q.q;
  progressEl.textContent = `Question ${index + 1} of ${questions.length}`;

  optionsEl.innerHTML = "";
  q.opts.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectOption(i);
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function selectOption(i) {
  disableOptions();
  if (i === questions[index].ans) {
    score++;
  }
  nextBtn.disabled = false;
}

function disableOptions() {
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

nextBtn.onclick = () => {
  index++;
  if (index < questions.length) loadQuestion();
  else showResult();
};

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

loadQuestion();
