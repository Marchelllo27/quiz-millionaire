import { useState } from "react";
import PropTypes from "prop-types";

import { delay } from "../helpers/helpers";

const Answers = ({ answers, setStopCounter, setQuestionNumber, setResetCounter }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [adjustedAnswerStyle, setAdjustedAnswerStyle] = useState("");

  const onClickHandler = answer => {
    setSelectedAnswer(answer);
    setStopCounter(true);
    delay(() => {
      if (answer.correct) {
        setAdjustedAnswerStyle("from-[green] to-[green]");
        delay(() => {
          setQuestionNumber(prev => prev + 1);
          setSelectedAnswer(null);
          setAdjustedAnswerStyle(null);
          setStopCounter(false);
          setResetCounter(true);
        }, 2000);
      } else {
        setAdjustedAnswerStyle("from-[red] to-[red]");
      }
    }, 5000);
  };

  return (
    <div className="answers flex flex-wrap gap-[2%] text-lg w-full justify-center">
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
  setQuestionNumber: PropTypes.func.isRequired,
  setResetCounter: PropTypes.func.isRequired,
};
