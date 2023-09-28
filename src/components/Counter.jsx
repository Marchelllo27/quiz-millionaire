import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const Counter = ({ stopCounter, resetCounter }) => {
  const [counterNumber, setCounterNumber] = useState(5);
  const [intervalRef, setIntervalRef] = useState(null);

  useEffect(() => {
    if (stopCounter) {
      return clearInterval(intervalRef);
    }

    if (resetCounter) {
      return setCounterNumber(30);
    }
  }, [stopCounter, resetCounter, intervalRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterNumber(prev => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalRef(interval);

    return () => clearInterval(interval);
  }, [resetCounter]);

  return (
    <div className="top h-2/4 relative">
      <div className="timer w-20 h-20 rounded-full absolute top-5 left-20 font-semibold text-4xl border-4 grid place-items-center">
        {counterNumber}
      </div>
    </div>
  );
};
export default Counter;

Counter.propTypes = {
  stopCounter: PropTypes.bool,
  resetCounter: PropTypes.bool,
};
