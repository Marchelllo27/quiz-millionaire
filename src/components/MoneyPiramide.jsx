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

import { useContext } from "react";
import { GameContext } from "../store/GameContextProvider";

const MoneyPiramide = () => {
  const { isAdmin, username, questionNumber } = useContext(GameContext);

  const name = isAdmin ? "Admin" : username;

  return (
    <aside className="hidden sm:flex justify-center items-center w-1/4 bg-main-blue text-white ">
      {name && <p className="absolute top-4">{name}</p>}
      <ul className="w-full p-6 flex flex-col 2xl:gap-3">
        {moneyPyramid.map(item => (
          <li key={item.id} className={`flex p-0.5 rounded ${questionNumber === item.id && "bg-[#008080]"}`}>
            <span className="text-lg 2xl:text-2xl font-thin w-2/5">{item.id}</span>
            <span className="text-xl 2xl:text-2xl font-light">$ {item.amount}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default MoneyPiramide;
