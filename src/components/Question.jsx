import PropTypes from "prop-types";

const Question = ({ question }) => {
  return (
    <h2 className="question mb-20 text-2xl 2xl:text-6xl border-2 rounded-md w-full py-4 bg-gradient-to-b from-[#100241] to-[black]">
      {question && question}
    </h2>
  );
};
export default Question;

Question.propTypes = {
  question: PropTypes.string,
};
