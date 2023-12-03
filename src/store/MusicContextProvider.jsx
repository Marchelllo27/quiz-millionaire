import PropTypes from "prop-types";

import { createContext, useState } from "react";
import useSound from "use-sound";

import welcomeMusicTrack from "../sounds/welcomeTrack.mp3";
import startGameTrack from "../sounds/play.mp3";
import waitingTrack from "../sounds/wait.mp3";
import pickedAnswerTrack from "../sounds/answer-chosen.mp3";
import correctAnswerTrack from "../sounds/correct.mp3";
import wrongAnswerTrack from "../sounds/wrong.mp3";

export const MusicContext = createContext({
  playWelcomeTrack: null,
  stopWelcomeTrack: null,

  playStartGameTrack: null,
  stopStartGameTrack: null,

  playWaitingTrack: null,
  stopWaitingTrack: null,

  playPickedAnswerTrack: null,
  stopPickedAnswerTrack: null,

  playCorrectAnswerTrack: null,
  playWrongAnswerTrack: null,
});

const MusicContextProvider = ({ children }) => {
  const [playWelcomeTrack, { stop: stopWelcomeTrack }] = useSound(welcomeMusicTrack);
  const [playStartGameTrack, { stop: stopStartGameTrack }] = useSound(startGameTrack);
  const [playWaitingTrack, { stop: stopWaitingTrack }] = useSound(waitingTrack);
  const [playPickedAnswerTrack, { stop: stopPickedAnswerTrack }] = useSound(pickedAnswerTrack);
  const [playCorrectAnswerTrack] = useSound(correctAnswerTrack);
  const [playWrongAnswerTrack] = useSound(wrongAnswerTrack);

  const MusicContextValue = {
    playWelcomeTrack,
    stopWelcomeTrack,
    playStartGameTrack,
    stopStartGameTrack,
    playWaitingTrack,
    stopWaitingTrack,
    playPickedAnswerTrack,
    stopPickedAnswerTrack,
    playCorrectAnswerTrack,
    playWrongAnswerTrack,
  };

  return <MusicContext.Provider value={MusicContextValue}>{children}</MusicContext.Provider>;
};
export default MusicContextProvider;

MusicContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
