import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const GameSection = ({ data, questionNumber }) => {
  const [question, setQuestion] = useState(null);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [adjustedAnswerStyle, setAdjustedAnswerStyle] = useState(null);

  const delay = (action, duration) => {
    setTimeout(action, duration);
  };

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const onClickHandler = answer => {
    setSelectedAnswer(answer);
    delay(() => {
      setAdjustedAnswerStyle(answer.correct ? "from-[green] to-[green]" : "from-[red] to-[red]");
    }, 5000);
  };

  return (
    <section className="w-3/4 bg-hero-pattern bg-center text-white">
      <div className="top h-2/4 relative">
        <div className="timer w-20 h-20 rounded-full absolute top-5 left-20 font-semibold text-4xl border-4 grid place-items-center">
          30
        </div>
      </div>
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
                  ? `pointer-events-none animate-bounce ${
                      adjustedAnswerStyle ? adjustedAnswerStyle : "from-[blue] to-[blue]"
                    }`
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
