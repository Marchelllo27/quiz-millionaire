import { useEffect, useState } from "react";

import Counter from "./Counter";
import PropTypes from "prop-types";
import Question from "./Question";
import Answers from "./Answers";
import UsernamePrompt from "./UsernamePrompt";

const GameSection = ({ data, questionNumber, setQuestionNumber }) => {
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [stopCounter, setStopCounter] = useState(null);
  const [resetCounter, setResetCounter] = useState(null);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  return (
    <section className="w-3/4 bg-hero-pattern bg-center bg-cover text-white relative">
      {!gameIsStarted && <UsernamePrompt setGameIsStarted={setGameIsStarted} />}
      {gameIsStarted && <Counter stopCounter={stopCounter} resetCounter={resetCounter} />}
      {gameIsStarted && (
        <div className="bottom h-2/4 px-20 flex flex-col items-center justify-center text-center">
          <Question question={question?.question} />

          <Answers
            answers={question?.answers}
            setStopCounter={setStopCounter}
            setResetCounter={setResetCounter}
            setQuestionNumber={setQuestionNumber}
          />
        </div>
      )}
    </section>
  );
};
export default GameSection;

GameSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired, correct: PropTypes.bool })),
    }).isRequired
  ).isRequired,
  questionNumber: PropTypes.number.isRequired,
  setQuestionNumber: PropTypes.func.isRequired,
};
