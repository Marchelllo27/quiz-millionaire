import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const UsernamePrompt = ({ setGameIsStarted }) => {
  const onSubmitHandler = e => {
    e.preventDefault();
    setGameIsStarted(true);
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
