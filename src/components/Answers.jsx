import { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { delay } from "../helpers/helpers";
import { GameContext } from "../store/GameContextProvider";
import { MusicContext } from "../store/MusicContextProvider";

const Answers = ({ answers, setStopCounter, setResetCounter, isLastQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [adjustedAnswerStyle, setAdjustedAnswerStyle] = useState("");

  const { toggleShowModal, setNextQuestionNumber } = useContext(GameContext);
  const {
    stopStartGameTrack,
    stopWaitingTrack,
    playWaitingTrack,
    playPickedAnswerTrack,
    stopPickedAnswerTrack,
    playCorrectAnswerTrack,
    playWrongAnswerTrack,
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

    delay(() => {
      stopPickedAnswerTrack();

      if (isLastQuestion && answer.correct) {
        playCorrectAnswerTrack();
        setShowEndGameModal(true);
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
      </div>
    );
  }

  return (
    <div className="answers flex flex-wrap gap-[2%] text-lg w-full justify-center relative">
      {answers?.map(answer => {
        const answerId = id.current;
        id.current += 1;

        // STYLES RELATED VARIABLES
        const fromLeftAnimation = answerId === 1 || answerId === 3 ? true : false;
        const correctAnswerStyle =
          selectedAnswer &&
          answer.text === selectedAnswer.text &&
          `pointer-events-none animate-bounce ${adjustedAnswerStyle}`;
        const wrongAnswerStyle =
          selectedAnswer && answer.text !== selectedAnswer.text ? "opacity-20 pointer-events-none" : "";

        // const answerStyle =
        //   selectedAnswer && answer.text === selectedAnswer.text
        //     ? `pointer-events-none animate-bounce ${adjustedAnswerStyle}`
        //     : selectedAnswer && answer.text !== selectedAnswer.text
        //     ? "opacity-20 pointer-events-none"
        //     : "";

        return (
          <motion.div
            key={answer.text}
            id={answerId}
            initial={{ x: fromLeftAnimation ? -40 : 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.1 }}
            className={`w-[49%] border-[1px] rounded-xl grid items-center p-4 mb-5 text-3xl bg-gradient-to-b from-[#0e0124] to-[#22074d] hover:from-[blue] hover:to-[blue] cursor-pointer
            ${correctAnswerStyle} ${wrongAnswerStyle}
            `}
            onClick={onClickHandler.bind(null, answer)}
          >
            {answer.text}
          </motion.div>
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
