const questions = [
  {
    question: "Where did I work as an IT Infrastructure Engineer?",
    choices: ["INTRUM", "UNITED SOLUTIONS", "Amazon Web Services", "All of the above"],
    answer: "All of the above",
    cvContent: `
      <h4>Professional Experience</h4>
      <p><strong>ITM:</strong> IT Infrastructure Engineer, Network Engineer</p>
      <p><strong>INTRUM:</strong> Deputy CISO</p>
      <p><strong>UNITED SOLUTIONS:</strong> IT Infrastructure Engineer, IT Project Manager</p>
      <p><strong>Amazon Web Services:</strong> Data Center Operations Engineer</p>
    `
  },
  {
    question: "Which company did I consult for IT systems in 2018?",
    choices: ["France Televisions", "DEAF ENTERPRISES", "Vinci Energies", "INTRUM"],
    answer: "DEAF ENTERPRISES",
    cvContent: `
      <h4>Consulting Experience</h4>
      <p><strong>DEAF ENTERPRISES:</strong> IT Consultant</p>
    `
  },
  {
    question: "What language skills do I have?",
    choices: ["French, English, Italian", "Arabic", "Both A and B", "None"],
    answer: "Both A and B",
    cvContent: `
      <h4>Languages</h4>
      <p>French, English, Italian (Fluent); Arabic (Conversational)</p>
    `
  }
];

let currentQuestionIndex = 0;

function startGame() {
  document.getElementById("game").classList.remove("hidden");
  document.querySelector("header").classList.add("hidden");
  loadQuestion();
}

function loadQuestion() {
  const questionObj = questions[currentQuestionIndex];
  document.getElementById("question").innerText = questionObj.question;
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  
  questionObj.choices.forEach(choice => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.onclick = () => checkAnswer(choice);
    choicesContainer.appendChild(button);
  });
}

function checkAnswer(choice) {
  const questionObj = questions[currentQuestionIndex];
  if (choice === questionObj.answer) {
    document.getElementById("cv-content").innerHTML += questionObj.cvContent;
    document.getElementById("cv-sections").classList.remove("hidden");
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      alert("Congratulations! You’ve unlocked the entire CV.");
    }
  } else {
    alert("Incorrect answer. Try again!");
  }
}