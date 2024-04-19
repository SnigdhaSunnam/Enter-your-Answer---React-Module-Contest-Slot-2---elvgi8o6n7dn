import React, { useState } from "react";

const questions = [
  {
    question: "What is the capital of France?",
    answer: "paris",
    score: 1
  },
  {
    question: "What is the largest country in the world?",
    answer: "russia",
    score: 1
  },
  {
    question: "What is the currency of Japan?",
    answer: "yen",
    score: 1
  },
  {
    question: "What is the tallest mammal?",
    answer: "giraffe",
    score: 1
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "au",
    score: 1
  }
];

function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const lowercaseAnswer = answer.toLowerCase();
    const lowercaseCorrectAnswer = questions[questionIndex].answer.toLowerCase();
    
    if (lowercaseAnswer === lowercaseCorrectAnswer) {
      setScore(score + questions[questionIndex].score);
      moveToNextQuestion();
    } else {
      setAttempts(attempts + 1);
      if (attempts === 0) {
        alert("Incorrect. Two attempts remaining.");
      } else if (attempts === 1) {
        alert("Incorrect. One attempt remaining.");
      } else {
        moveToNextQuestion();
      }
    }
  };

  const moveToNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
    setAttempts(0);
    setAnswer("");
    if (questionIndex + 1 === questions.length) {
      setGameOver(true);
    }
  };

  const handleRetry = () => {
    setQuestionIndex(0);
    setAttempts(0);
    setGameOver(false);
    setScore(0);
  };

  if (gameOver) {
    return (
      <div className="game-over-container">
        <h1 className="game-over-heading">Game Over</h1>
        <p className="score-para">Your score: {score}/{questions.length}</p>
        <button className="retry-btn" onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="question-text">{questions[questionIndex].question}</h1>
      <form onSubmit={handleFormSubmit}>
        <input className="answer-input" value={answer} onChange={handleInputChange} />
        <br />
        <button className="submit-btn">Submit</button>
      </form>
      {attempts > 0 && <p className="attempt-alert">Incorrect. {2 - attempts} attempts remaining.</p>}
    </div>
  );
}

export default Quiz;
