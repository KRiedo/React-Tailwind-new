import React from "react";
import IkonBenar from "../../assets/images/Ikon-BenarAbu.png";
import IkonSalah from "../../assets/images/Ikon-SalahAbu.png";

const ResultPopup = ({ currentQuestion, isCorrect, reward, onContinue }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md shadow-md text-gray-800 z-10"
      style={{
        width: "90%",
        height: "512px",
        maxWidth: "400px",
        padding: "50px 35px 35px",
        backgroundColor: "#fff4ea",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <div
        className="flex justify-center items-center mb-4"
        style={{
          position: "relative",
          top: "-30px",
        }}
      >
        <img
          src={isCorrect ? IkonBenar : IkonSalah}
          alt={isCorrect ? "Ikon Benar" : "Ikon Salah"}
          style={{
            width: "250px",
            height: "250px",
          }}
        />
      </div>
      <h3 className="text-xl font-bold text-left" style={{ fontSize: "2.2rem", color: "#495464", fontFamily: "sans-serif" }}>
        {isCorrect ? "Benar!" : "Salah!"}
      </h3>

      {isCorrect && (
        <p
          className="text-lg mb-4 font-semibold text-left"
          style={{
            fontSize: "1.1rem",
            color: "#495464",
            marginTop: "3%",
          }}
        >
          Jawaban kamu benar! Maju {reward.steps} langkah.
        </p>
      )}

      {!isCorrect && (
        <>
          {reward.stun > 0 ? (
            <div
              className="text-lg mb-4 font-semibold text-left"
              style={{
                fontSize: "1.1rem",
                color: "#495464",
                marginTop: "3%",
              }}
            >
              <p style={{ fontSize: "1.1rem" }}>Jawaban kamu salah! Kamu kehilangan giliran selama {reward.stun} putaran.</p>
            </div>
          ) : (
            <p
              className="text-lg mb-4 font-semibold text-left"
              style={{
                fontSize: "1.1rem",
                color: "#495464",
                marginTop: "3%",
              }}
            >
              Jawaban kamu salah! Mundur {Math.abs(reward.steps)} langkah.
            </p>
          )}
        </>
      )}

      <button
        className="bg-[D9D9D9] text-[#495464] px-5 py-2 border-2 border-[#495464] hover:bg-[#fff4ea] hover:border-[#495464] font-medium"
        style={{
          borderRadius: "10px",
          marginRight: "20px",
          fontWeight: "normal",
          marginTop: "8%",
        }}
        onClick={onContinue}
      >
        Lanjutkan
      </button>
    </div>
  );
};

export default ResultPopup;
