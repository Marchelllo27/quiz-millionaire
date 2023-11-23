import { useContext, useState } from "react";
import PropTypes from "prop-types";
import useSound from "use-sound";

import correctSound from "../sounds/correct.mp3";
import wrongSound from "../sounds/wrong.mp3";
import { delay } from "../helpers/helpers";
import { GameContext } from "../store/GameContextProvider";

const Answers = ({ answers, setStopCounter, setResetCounter, stop, playWaitingMusic, isLastQuestion }) => {
  const { setShowModal, setQuestionNumber } = useContext(GameContext);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [adjustedAnswerStyle, setAdjustedAnswerStyle] = useState("");
  const [correctAnswerSound] = useSound(correctSound);
  const [wrongAnswerSound] = useSound(wrongSound);

  function resetAnswerData() {
    setSelectedAnswer(null);
    setAdjustedAnswerStyle(null);
    setStopCounter(false);
    setResetCounter(true);
  }

  const onClickHandler = answer => {
    setSelectedAnswer(answer);
    setStopCounter(true);

    delay(() => {
      if (isLastQuestion) {
        stop();
        answer.correct ? correctAnswerSound() : wrongAnswerSound();
        setShowEndGameModal(true);
        return;
      }

      if (answer.correct) {
        stop();
        correctAnswerSound();
        setAdjustedAnswerStyle("from-[green] to-[green]");
        delay(() => {
          resetAnswerData();
          setQuestionNumber(prev => prev + 1);
          playWaitingMusic();
        }, 5000);
      }

      if (!answer.correct) {
        stop();
        wrongAnswerSound();
        setAdjustedAnswerStyle("from-[red] to-[red]");
        delay(() => {
          setShowModal();
          resetAnswerData();
        }, 3000);
      }
    }, 5000);
  };

  if (showEndGameModal) {
    return (
      <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center">
        <div className="bg-main-blue w-3/4 max-w-6xl h-2/4 flex flex-col items-center justify-center gap-10 text-slate-300">
          <h1 className="text-6xl">Yaaaaay</h1>
          <h2 className="text-5xl">Ви молодці, дякую за гру!</h2>
          <p className="text-5xl">А гроші то не головне! 😅 💰</p>
        </div>
      </div>
    );
  }

  return (
    <div className="answers flex flex-wrap gap-[2%] text-lg w-full justify-center relative">
      {answers?.map(answer => (
        <div
          key={answer.text}
          className={`w-[49%] border-[1px] rounded-xl grid items-center p-4 mb-5 text-xl bg-gradient-to-b from-[#0e0124] to-[#22074d] hover:from-[blue] hover:to-[blue] cursor-pointer ${
            selectedAnswer && answer.text === selectedAnswer.text
              ? `pointer-events-none animate-bounce ${adjustedAnswerStyle}`
              : selectedAnswer && answer.text !== selectedAnswer.text
              ? "opacity-20 pointer-events-none"
              : ""
          }`}
          onClick={onClickHandler.bind(null, answer)}
        >
          {answer.text}
        </div>
      ))}
    </div>
  );
};
export default Answers;

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired, correct: PropTypes.bool })),
  setStopCounter: PropTypes.func.isRequired,
  setResetCounter: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  playWaitingMusic: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool,
};
