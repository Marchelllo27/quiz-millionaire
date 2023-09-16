import PropTypes from "prop-types";

const moneyPyramid = [
  { id: 1, amount: "100" },
  { id: 2, amount: "200" },
  { id: 3, amount: "300" },
  { id: 4, amount: "500" },
  { id: 5, amount: "1000" },
  { id: 6, amount: "2000" },
  { id: 7, amount: "4000" },
  { id: 8, amount: "8000" },
  { id: 9, amount: "16000" },
  { id: 10, amount: "32000" },
  { id: 11, amount: "64000" },
  { id: 12, amount: "125000" },
  { id: 13, amount: "250000" },
  { id: 14, amount: "500000" },
  { id: 15, amount: "1000000" },
].reverse();

const MoneyPiramide = ({ questionNumber }) => {
  return (
    <aside className="w-1/4 bg-main-blue text-white flex justify-center items-center">
      <ul className="w-full p-6">
        {moneyPyramid.map(item => (
          <li key={item.id} className={`flex p-0.5 rounded ${questionNumber === item.id ? "bg-[#008080]" : ""}`}>
            <span className="text-lg font-thin w-2/5">{item.id}</span>
            <span className="text-xl font-light">$ {item.amount}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default MoneyPiramide;

MoneyPiramide.propTypes = {
  questionNumber: PropTypes.number.isRequired,
};
