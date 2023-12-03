import { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { MusicContext } from "../store/MusicContextProvider";
import { GameContext } from "../store/GameContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const UsernamePrompt = () => {
  const { changeUsername, toggleIsAdmin, setGameIsStarted } = useContext(GameContext);

  const { playWelcomeTrack, stopWelcomeTrack, playStartGameTrack } = useContext(MusicContext);

  useEffect(() => {
    playWelcomeTrack();

    return () => {
      stopWelcomeTrack();
    };
  }, [playWelcomeTrack, stopWelcomeTrack]);

  const onSubmitHandler = async e => {
    e.preventDefault();

    const value = e.target.username.value;

    if (value.toLowerCase() === "admin") {
      toggleIsAdmin();
    }

    if (value && value !== "") {
      playStartGameTrack();
      changeUsername(value);
      setGameIsStarted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 2 }}
      className="wrapper w-full h-screen flex justify-center items-center"
    >
      <form onSubmit={onSubmitHandler} className="flex flex-col">
        <label htmlFor="username" className="text-6xl 2xl:text-8xl">
          What is your name ?
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="my-10"
          minLength={2}
          autoComplete="off"
          autoFocus
          required
        />
        <button className="bg-[#008080] border-none py-4 px-12 w-fit m-auto rounded-lg flex">
          <span className="mr-3 text-xl">Confirm</span>
          <FontAwesomeIcon icon={faCheck} size="xl" />
        </button>
      </form>
    </motion.div>
  );
};
export default UsernamePrompt;
