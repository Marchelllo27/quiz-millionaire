import { useState } from "react";

import MoneyPiramide from "./components/MoneyPiramide";
import GameSection from "./components/GameSection";
import data from "./data/data";
import "./App.css";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);

  return (
    <main className="w-full h-screen flex">
      <GameSection data={data} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} />
      <MoneyPiramide questionNumber={questionNumber} />
    </main>
  );
}

export default App;
