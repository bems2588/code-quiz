// CREATE A QUIZ CLASS
class Quiz {
  constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.questionIndex = 0;
  }

  getQuestionIndex() {
      return this.questions[this.questionIndex];
  }

  guess(answer) {
      if (this.getQuestionIndex().isCorrectAnswer(answer)) {
          this.score++;
      }
      else {
          quizTime = quizTime-60;
          console.log(quizTime);
      }
      this.questionIndex++;
  }

  gameOver() {
      return this.questionIndex === this.questions.length;
  };
}

// Create a question Class
class Question {
  constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
  }

  isCorrectAnswer(choice) {
      return this.answer === choice;
  }
}

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
  if (quiz.gameOver()) {
      showScores();
  } else {
      // show question
      let questionElement = document.getElementById("question");
      questionElement.innerHTML = quiz.getQuestionIndex().text;

      // show options
      let choices = quiz.getQuestionIndex().choices;
      for (let i = 0; i < choices.length; i++) {
          let choiceElement = document.getElementById("choice" + i);
          choiceElement.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }

      showProgress();
  }
};

// GUESS ANSWER
function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      displayQuestion();
  }
};

// SHOW QUIZ PROGRESS
function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let progressElement = document.getElementById("progress");
  progressElement.innerHTML =
      `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};


// create questions here
let questions = [
  new Question(
      "Hyper Text Markup Language Stands For?", ["JQuery", "XHTML", "CSS", "HTML"], "HTML"
  ),
  new Question(
      "Cascading Style sheet stands for?", ["HTML", "JQuery", "CSS", "XML"], "CSS"
  ),
  new Question(
      "Which is a JavaScript Framework?", ["React", "Laravel", "Django", "Sass"], "React"
  ),
  new Question(
      "Which is a backend language?", ["PHP", "HTML", "React", "All"], "PHP"
  ),
  new Question(
      "Which is best for Artificial intelligence?", ["React", "Laravel", "Python", "Sass"], "Python"
  )
];

// INITIALIZE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// Add A CountDown for the Quiz
let time = 5;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

counting.innerHTML = `Click to start`;
counting.addEventListener("click", startCountdown);


function startCountdown() {
    counting.removeEventListener("click", startCountdown);
  let quizTimer = setInterval(function() {
      if (quizTime <= 0) {
          clearInterval(quizTimer);
          showScores();
      } else {
          quizTime--;
          let sec = Math.floor(quizTime % 60);
          let min = Math.floor(quizTime / 60) % 60;
          counting.innerHTML = `TIME: ${min} : ${sec}`;
      }
  }, 1000);
}


//SHOW SCORE

function showScores() {
    let quizEndHTML =
      `<h1>Quiz Completed</h1>
          <h2 id="score"> Your scored: ${quiz.score} of ${quiz.questions.length}</h2>
          <div class="score-initials">
          <input id="initials" type="text">
          </input>
          <button id="submit-button">Submit your initials</button></div>
          <div class="quiz-repeat">
               <a href="index.html">Take Quiz Again</a>
          </div>`
    ;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
    document.getElementById("submit-button").addEventListener("click", function(){
      var initials = document.getElementById("initials").value;
  
      var scoreArr = [];
      //get old score arr out of local storage
      var playerScore = {
          initials: initials,
          score: quiz.score,
      };
      scoreArr.push(playerScore);
      console.log(scoreArr);
      localStorage.setItem("scoreArr", JSON.stringify(scoreArr));
  
      var finalScore = document.createElement("h1");
      finalScore.innerText = `Hey ${initials}, your score is, ${quiz.score}`;
      quizElement.append(finalScore);
    });
  };