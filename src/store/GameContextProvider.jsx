import PropTypes from "prop-types";

import { createContext, useState } from "react";
export const GameContext = createContext({
  isAdmin: false,
  username: "",
  gameIsStarted: false,
  showModal: false,
  questionNumber: 1,
  waitingMusic: {},
  setWaitingMusic: () => {},
  setNextQuestionNumber: () => {},
  toggleShowModal: () => {},
  changeUsername: () => {},
  toggleIsAdmin: () => {},
  toggleGameIsStarted: () => {},
});

const GameContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [waitingMusic, setWaitingMusic] = useState({});

  const GameContextValue = {
    isAdmin,
    gameIsStarted,
    username,
    showModal,
    questionNumber,
    waitingMusic,
    setStartWaitingMusic: music => setWaitingMusic(music),
    setNextQuestionNumber: () => setQuestionNumber(prev => prev + 1),
    setGameIsStarted: () => setGameIsStarted(prev => !prev),
    toggleShowModal: () => setShowModal(prev => !prev),
    changeUsername: name => setUsername(name),
    toggleIsAdmin: () => setIsAdmin(prev => !prev),
    toggleGameIsStarted: () => setGameIsStarted(!gameIsStarted),
  };

  return <GameContext.Provider value={GameContextValue}>{children}</GameContext.Provider>;
};

export default GameContextProvider;

GameContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
