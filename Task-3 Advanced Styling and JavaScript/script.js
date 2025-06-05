// Carousel Logic

const images = [
  'https://picsum.photos/seed/1/600/400',
  'https://picsum.photos/seed/2/600/400',
  'https://picsum.photos/seed/3/600/400',
  'https://picsum.photos/seed/4/600/400'
];
let index = 0;

const carouselImage = document.getElementById('carousel-image');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

leftBtn.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  carouselImage.src = images[index];
});

rightBtn.addEventListener('click', () => {
  index = (index + 1) % images.length;
  carouselImage.src = images[index];
});

// Joke API Logic
const jokeBtn = document.getElementById('get-joke');
const jokeOutput = document.getElementById('joke-output');

jokeBtn.addEventListener('click', async () => {
  jokeOutput.textContent = 'Loading...';
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();
    jokeOutput.textContent = data.joke || 'No joke found!';
  } catch (error) {
    jokeOutput.textContent = 'Failed to fetch joke. Try again!';
  }
});

// Quiz Logic
const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Wordsworth", "William Shakespeare", "Charles Dickens", "Jane Austen"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Bangkok", "Tokyo"],
    answer: "Tokyo"
  },
  {
    question: "Which is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    answer: "Blue Whale"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(option));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
    alert("Correct!");
  } else {
    alert(`Wrong! The correct answer is: ${correct}`);
  }
  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
  document.querySelectorAll('#options button').forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.disabled = true;
  } else {
    questionEl.textContent = "🎉 Quiz Completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `Final Score: ${score}/${quizData.length}`;
  }
});

// Initialize quiz on load
loadQuestion();
nextBtn.disabled = true;
