import PropTypes from "prop-types";

import { createContext, useState } from "react";
export const GameContext = createContext({
  isAdmin: false,
  username: "",
  gameIsStarted: false,
  showModal: false,
  setShowModal: () => {},
  changeUsername: () => {},
  toggleIsAdmin: () => {},
  toggleGameIsStarted: () => {},
});

const GameContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameIsStarted, setGameIsStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);

  const GameContextValue = {
    isAdmin: isAdmin,
    gameIsStarted: gameIsStarted,
    username: username,
    showModal: showModal,
    setShowModal: () => setShowModal(!showModal),
    changeUsername: name => setUsername(name),
    toggleIsAdmin: () => setIsAdmin(!isAdmin),
    toggleGameIsStarted: () => setGameIsStarted(!gameIsStarted),
  };

  return <GameContext.Provider value={GameContextValue}>{children}</GameContext.Provider>;
};

export default GameContextProvider;

GameContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
