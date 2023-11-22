import { useContext, useEffect, useState } from "react";
import useSound from "use-sound";

import data from "../data/data";
import TopSection from "./TopSection";
import Question from "./Question";
import Answers from "./Answers";
import UsernamePrompt from "./UsernamePrompt";
import Modal from "./Modal";
import waitMusic from "../sounds/wait.mp3";
import { GameContext } from "../store/GameContextProvider";

const GameSection = () => {
  const { showModal, gameIsStarted, questionNumber, setQuestionNumber } = useContext(GameContext);
  const [playWaitingMusic, { stop }] = useSound(waitMusic);

  const [question, setQuestion] = useState(null);
  const [stopCounter, setStopCounter] = useState(null);
  const [resetCounter, setResetCounter] = useState(null);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [questionNumber]);

  return (
    <section className="w-3/4 bg-hero-pattern bg-center bg-cover text-white relative">
      {!gameIsStarted && <UsernamePrompt playWaitingMusic={playWaitingMusic} />}
      {gameIsStarted && <TopSection stopCounter={stopCounter} resetCounter={resetCounter} />}
      {gameIsStarted && (
        <div className="bottom h-2/4 px-20 flex flex-col items-center justify-center text-center">
          <Question question={question?.question} />

          <Answers
            answers={question?.answers}
            setStopCounter={setStopCounter}
            setResetCounter={setResetCounter}
            stop={stop}
            playWaitingMusic={playWaitingMusic}
          />
        </div>
      )}
      {showModal && (
        <Modal setQuestionNumber={setQuestionNumber} title="УУУУПС, трошки не те...">
          Але з ким не буває? Продовжуємо йти до перемоги!
        </Modal>
      )}
    </section>
  );
};
export default GameSection;
