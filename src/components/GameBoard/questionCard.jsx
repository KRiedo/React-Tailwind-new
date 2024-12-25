import React, { useState, useEffect } from "react";
import QuestionPopup from "./questionPopup";
import ResultPopup from "./resultPopup";

const QuestionCard = ({ currentBoardNumber, onAnswer }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [result, setResult] = useState({});
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  useEffect(() => {
    if (currentBoardNumber) {
      loadQuestionsForLevel(currentBoardNumber);
    }
  }, [currentBoardNumber]);

  const loadQuestionsForLevel = async (boardNumber) => {
    const fileMapping = [
      { range: [1, 10], file: "src/assets/json/questionAdmin.json" },
      { range: [11, 20], file: "src/assets/json/questionStaff.json" },
      { range: [21, 30], file: "src/assets/json/questionOfficer.json" },
      { range: [31, 40], file: "src/assets/json/questionSupervisor.json" },
      { range: [41, 50], file: "src/assets/json/questionAssistantManager.json" },
      { range: [51, 60], file: "src/assets/json/questionManager.json" },
      { range: [61, 70], file: "src/assets/json/questionGeneralManager.json" },
      { range: [71, 80], file: "src/assets/json/questionSeniorManager.json" },
      { range: [81, 90], file: "src/assets/json/questionAssociateDirector.json" },
      { range: [91, 100], file: "src/assets/json/questionDirector.json" },
    ];

    const selectedFile = fileMapping.find((mapping) => boardNumber >= mapping.range[0] && boardNumber <= mapping.range[1]);

    if (!selectedFile) {
      console.error("Invalid board number");
      return;
    }

    const filePath = selectedFile.file;

    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setQuestions(data);
        pickRandomQuestion(data);
      } else {
        console.error("No questions available in the loaded data.");
        setQuestions([]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const pickRandomQuestion = (data) => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentQuestion(data[randomIndex]);
    } else {
      console.error("No questions available to pick.");
    }
  };

  const handleAnswer = (answer) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const reward = isCorrect ? currentQuestion.reward.correct : currentQuestion.reward.wrong;

    setResult({
      isCorrect,
      message: isCorrect ? `Jawaban kamu benar! Maju ${reward.steps} langkah.` : `Jawaban kamu salah! Mundur ${Math.abs(reward.steps)} langkah.`,
      reward: reward,
      stun: reward.stun,
    });

    setAnswerSubmitted(true);
  };

  const handleConfirmResult = () => {
    if (!result) return;

    onAnswer(result.isCorrect, result.reward.steps, result.stun);
  };

  return (
    <div>
      {currentQuestion && !answerSubmitted && <QuestionPopup currentQuestion={currentQuestion} handleAnswer={handleAnswer} />}

      {answerSubmitted && currentQuestion && <ResultPopup currentQuestion={currentQuestion} isCorrect={result.isCorrect} reward={result.reward} onContinue={handleConfirmResult} />}
    </div>
  );
};

export default QuestionCard;
