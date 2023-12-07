import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Question = ({ question }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1.1 }}
      className="question mb-20 text-4xl 2xl:text-6xl border-2 rounded-md w-full p-4 bg-gradient-to-b from-[#100241] to-[black]"
    >
      {question && question}
    </motion.h2>
  );
};
export default Question;

Question.propTypes = {
  question: PropTypes.string,
};
