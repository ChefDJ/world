import React from "react";
import { createRoot } from "react-dom/client";

function evaluateGuess(guess, answer) {
  const result = Array(5).fill("absent");
  const answerArr = answer.split("");
  const guessArr = guess.split("");
  const used = Array(5).fill(false);

  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = "correct";
      used[i] = true;
      answerArr[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const index = answerArr.indexOf(guessArr[i]);
    if (index !== -1) {
      result[i] = "present";
      answerArr[index] = null;
    }
  }

  return result;
}

function Cell({ letter, status }) {
  return React.createElement(
    "div",
    {
      className: `cell ${status}`,
      style: {
        width: "40px",
        height: "40px",
        border: "1px solid #999",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        backgroundColor:
          status === "correct"
            ? "green"
            : status === "present"
            ? "gold"
            : status === "absent"
            ? "lightgray"
            : "white",
        color: status ? "white" : "black",
        margin: "2px",
      },
    },
    letter.toUpperCase()
  );
}

function Row({ guess, answer }) {
  let letters = Array(5).fill("");
  let results = Array(5).fill("");

  if (guess) {
    letters = guess.split("");
    results = evaluateGuess(guess, answer);
  }

  return React.createElement(
    "div",
    { style: { display: "flex" } },
    letters.map((l, i) =>
      React.createElement(Cell, {
        key: i,
        letter: l,
        status: results[i] || null,
      })
    )
  );
}

function Board({ guesses, answer }) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    rows.push(
      React.createElement(Row, {
        key: i,
        guess: guesses[i],
        answer: answer,
      })
    );
  }

  return React.createElement(
    "div",
    { style: { marginBottom: "40px" } },
    rows
  );
}

function Keyboard() {
  const rows = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["Enter", ..."zxcvbnm".split(""), "🔙"],
  ];

  return React.createElement(
    "div",
    {},
    rows.map((row, i) =>
      React.createElement(
        "div",
        { key: i, style: { display: "flex", justifyContent: "center", margin: "4px" } },
        row.map((key, j) =>
          React.createElement(
            "div",
            {
              key: j,
              style: {
                width: key.length > 1 ? "60px" : "40px",
                height: "50px",
                margin: "2px",
                border: "1px solid #aaa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ddd",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
              },
            },
            key.toUpperCase()
          )
        )
      )
    )
  );
}

export default function App() {
  const guesses = ["might", "flood", "stray"];
  const answer = "moody";

  return React.createElement(
    "div",
    {
      style: {
        fontFamily: "sans-serif",
        height: "100vh", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        backgroundColor: "#f0f0f0",
      },
    },
    React.createElement("h1", {}, "Wordle (Static)"),
    React.createElement(Board, { guesses, answer }),
    React.createElement(Keyboard, {})
  );
}


