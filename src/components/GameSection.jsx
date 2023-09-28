import { useEffect, useState } from "react";

import { delay } from "../helpers/helpers";
import Counter from "./Counter";
import PropTypes from "prop-types";

const GameSection = ({ data, questionNumber, setQuestionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [adjustedAnswerStyle, setAdjustedAnswerStyle] = useState("");
  const [stopCounter, setStopCounter] = useState(null);
  const [resetCounter, setResetCounter] = useState(null);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

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
    <section className="w-3/4 bg-hero-pattern bg-center text-white">
      <Counter stopCounter={stopCounter} resetCounter={resetCounter} />
      <div className="bottom h-2/4 px-20 flex flex-col items-center justify-center text-center">
        <h2 className="question mb-10 text-2xl border-2 rounded-md w-full py-4 bg-gradient-to-b from-[#100241] to-[black]">
          {question && question.question}
        </h2>

        <div className="answers flex flex-wrap gap-[2%] text-lg w-full justify-center">
          {question?.answers.map(answer => (
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
      </div>
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
