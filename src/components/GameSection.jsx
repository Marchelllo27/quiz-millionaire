import { useContext, useEffect, useState } from "react";

import data from "../data/data";
import TopSection from "./TopSection";
import Question from "./Question";
import Answers from "./Answers";
import UsernamePrompt from "./UsernamePrompt";
import Modal from "./Modal";
import { GameContext } from "../store/GameContextProvider";

const GameSection = () => {
  const { showModal, gameIsStarted, questionNumber, isAdmin } = useContext(GameContext);
  const [question, setQuestion] = useState([]);
  const [stopCounter, setStopCounter] = useState(null);
  const [resetCounter, setResetCounter] = useState(null);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [questionNumber]);

  return (
    <section className="hidden sm:block w-3/4 bg-hero-pattern bg-center bg-cover text-white relative">
      {!gameIsStarted && <UsernamePrompt />}
      {gameIsStarted && <TopSection stopCounter={stopCounter} resetCounter={resetCounter} />}
      {gameIsStarted && (
        <div
          className={`bottom h-2/4 ${
            isAdmin && "h-screen"
          } max-w-7xl m-auto px-20 flex flex-col items-center justify-center text-center`}
        >
          <Question question={question?.question} />

          <Answers
            answers={question?.answers}
            isLastQuestion={question?.isLastQuestion}
            setStopCounter={setStopCounter}
            setResetCounter={setResetCounter}
          />
        </div>
      )}
      {showModal && <Modal title="УУУУПС, трошки не те...">Але з ким не буває? Продовжуємо йти до перемоги!</Modal>}
    </section>
  );
};
export default GameSection;
