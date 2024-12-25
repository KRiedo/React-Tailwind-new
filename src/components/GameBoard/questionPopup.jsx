import React from "react";

const QuestionPopup = ({ currentQuestion, handleAnswer }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md shadow-md text-gray-800 z-10"
      style={{
        width: "90%",
        maxWidth: "400px",
        padding: "35px",
        backgroundColor: "#fff4ea",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transform: "translate(-50%, -50%) scale(1)",
        textAlign: "left",
        stroke: "12px",
      }}
    >
      <img src="src/assets/images/Yuppies - Coding.png" style={{ marginBottom: "5%" }} />
      <h1
        className="text-lg font-semibold mb-4"
        style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          color: "#495464",
          fontFamily: "sans-serif",
        }}
      >
        Question
      </h1>
      <h2
        className="text-lg font-semibold mb-4"
        style={{
          fontSize: "1.1rem",
          color: "#495464",
          marginBottom: "15%",
        }}
      >
        {currentQuestion.question}
      </h2>
      <div className="flex gap-4 justify-center items-center">
        <button
          className="bg-[D9D9D9] text-[#495464] px-5 py-2 border-2 border-[#495464] hover:bg-[#fff4ea] hover:border-[#495464] font-medium"
          style={{
            borderRadius: "10px",
            marginInlineStart: "10px",
            fontWeight: "normal",
          }}
          onClick={() => handleAnswer("credit")}
        >
          Credit
        </button>

        <button
          className="bg-[D9D9D9] text-[#495464] px-5 py-2 rounded-md border-2 border-[#495464] hover:bg-[#fff4ea] hover:border-[#495464] font-medium"
          style={{
            borderRadius: "10px",
            marginRight: "20px",
            fontWeight: "normal",
          }}
          onClick={() => handleAnswer("debit")}
        >
          Debit
        </button>
      </div>
    </div>
  );
};

export default QuestionPopup;
