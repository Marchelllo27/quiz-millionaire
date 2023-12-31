import { useContext } from "react";
import PropTypes from "prop-types";

import { GameContext } from "../store/GameContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const UsernamePrompt = ({ setGameIsStarted }) => {
  const { changeUsername } = useContext(GameContext);

  const onSubmitHandler = e => {
    e.preventDefault();

    const value = e.target.username.value;

    if (value && value !== "") {
      changeUsername(value);
      setGameIsStarted(true);
    }
  };

  return (
    <div className="wrapper w-full h-screen flex justify-center items-center">
      <form onSubmit={onSubmitHandler} className="flex flex-col">
        <label htmlFor="username" className="text-6xl">
          What is your name ?
        </label>
        <input type="text" name="username" id="username" className="my-10" minLength={2} autoComplete="off" required />
        <button className="bg-[#008080] border-none py-4 px-12 w-fit m-auto rounded-lg flex">
          <span className="mr-3 text-xl">Confirm</span>
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </button>
      </form>
    </div>
  );
};
export default UsernamePrompt;

UsernamePrompt.propTypes = {
  setGameIsStarted: PropTypes.func.isRequired,
};
