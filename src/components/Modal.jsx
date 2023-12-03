import { useContext, useTransition } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Button from "./shared/Button";
import { GameContext } from "../store/GameContextProvider";
import { MusicContext } from "../store/MusicContextProvider";

const Modal = ({ title, children }) => {
  const { isAdmin, toggleShowModal, setNextQuestionNumber } = useContext(GameContext);
  const { playWaitingTrack } = useContext(MusicContext);
  const [isPending, startTransition] = useTransition();

  const nextQuestionHandler = () => {
    setNextQuestionNumber();
    startTransition(() => playWaitingTrack());
    startTransition(() => toggleShowModal());
  };

  return (
    <div className="backdrop absolute top-0 left-0 bg-black/70 w-full h-screen">
      <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-main-blue/90 w-4/5 max-w-2xl 2xl:max-w-6xl p-24 rounded-lg flex flex-col justify-center items-center text-3xl shadow-[0_35px_60px_-15px_rgba(255,255,255, 0.9)]">
        <h1 className="mb-8 text-5xl 2xl:text-8xl">{title}</h1>
        <p className="text-2xl 2xl:text-5xl">{children} 😅</p>
        {isAdmin && (
          <Button
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            className="absolute bottom-5 right-10 group"
            onClick={nextQuestionHandler}
          >
            Наступне питання
          </Button>
        )}
      </div>
    </div>
  );
};
export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
