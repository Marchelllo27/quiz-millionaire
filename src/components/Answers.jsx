import { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { delay } from "../helpers/helpers";
import { GameContext } from "../store/GameContextProvider";
import { MusicContext } from "../store/MusicContextProvider";
import ConfettiComponent from "./Confetti";

const Answers = ({ answers, setStopCounter, setResetCounter, isLastQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [adjustedAnswerStyle, setAdjustedAnswerStyle] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const { toggleShowModal, setNextQuestionNumber } = useContext(GameContext);
  const {
    stopStartGameTrack,
    stopWaitingTrack,
    playWaitingTrack,
    playPickedAnswerTrack,
    stopPickedAnswerTrack,
    playCorrectAnswerTrack,
    playWrongAnswerTrack,
    playWelcomeTrack,
  } = useContext(MusicContext);

  let myDelayRef = useRef(null);

  useEffect(() => {
    myDelayRef.current = delay(playWaitingTrack, 2800);

    return () => clearTimeout(myDelayRef.current);
  }, [playWaitingTrack]);

  function resetAnswerData() {
    setSelectedAnswer(null);
    setAdjustedAnswerStyle(null);
    setStopCounter(false);
    setResetCounter(true);
  }

  const onClickHandler = answer => {
    clearTimeout(myDelayRef.current);
    stopStartGameTrack();
    stopWaitingTrack();
    setSelectedAnswer(answer);
    setStopCounter(true);
    playPickedAnswerTrack();
    setAdjustedAnswerStyle("from-[#fed7aa] to-[#fed7aa]");

    delay(() => {
      stopPickedAnswerTrack();

      if (isLastQuestion && answer.correct) {
        playCorrectAnswerTrack();
        setShowEndGameModal(true);
        setShowConfetti(true);
        delay(playWelcomeTrack, 3000);
        return;
      }

      if (isLastQuestion && !answer.correct) {
        playWrongAnswerTrack();
        setShowEndGameModal(true);
        return;
      }

      if (answer.correct) {
        playCorrectAnswerTrack();
        setAdjustedAnswerStyle("from-[green] to-[green]");

        delay(() => {
          resetAnswerData();
          setNextQuestionNumber();
          playWaitingTrack();
        }, 5000);
      }

      if (!answer.correct) {
        playWrongAnswerTrack();
        setAdjustedAnswerStyle("from-[red] to-[red]");
        delay(() => {
          toggleShowModal();
          resetAnswerData();
        }, 3000);
      }
    }, 5000);
  };

  let id = useRef(null);
  id.current = 1;

  if (showEndGameModal) {
    return (
      <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center">
        <div className="bg-main-blue w-3/4 max-w-6xl h-2/4 flex flex-col items-center justify-center gap-10 text-slate-300">
          <h1 className="text-6xl">Yaaaaay</h1>
          <h2 className="text-5xl">Ви молодці, дякую за гру!</h2>
          <p className="text-5xl">А гроші то не головне! 😅 💰</p>
        </div>
        {showConfetti && <ConfettiComponent />}
      </div>
    );
  }

  return (
    <div className="answers flex flex-wrap gap-[2%] text-lg w-full justify-center relative">
      {answers?.map(answer => {
        const answerId = id.current;
        id.current += 1;

        const fromLeftAnimation = answerId === 1 || answerId === 3 ? true : false;
        const currentlySelectedAnswer = selectedAnswer && selectedAnswer.text === answer.text;
        const notSelectedAnswer = selectedAnswer && selectedAnswer.text !== answer.text;

        return (
          <motion.button
            key={answer.text}
            id={answerId}
            initial={{ x: fromLeftAnimation ? -40 : 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.1 }}
            className={`w-[49%] border-[1px] rounded-xl grid items-center p-4 mb-5 text-3xl bg-gradient-to-b from-[#0e0124] to-[#22074d] hover:from-secondary hover:to-secondary cursor-pointer
            
            ${
              currentlySelectedAnswer
                ? `animate-bounce ${adjustedAnswerStyle} pointer-events-none `
                : notSelectedAnswer
                ? "!opacity-30 disabled:pointer-events-none"
                : ""
            }
            `}
            onClick={onClickHandler.bind(null, answer)}
            disabled={notSelectedAnswer}
          >
            {answer.text}
          </motion.button>
        );
      })}
    </div>
  );
};
export default Answers;

Answers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired, correct: PropTypes.bool })),
  setStopCounter: PropTypes.func.isRequired,
  setResetCounter: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool,
};
