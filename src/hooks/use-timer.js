import { useState } from "react";

//
export const DEFAULT_TIMER_TIMEOUT = 1 * 1000; // msec
//
export default function useTimer(func) {
  const [running, setRunning] = useState(null);
  const [i, setI] = useState(null);

  return {
    start,
    stop: stop_,
    //
    running,
  };

  function start(timeout = DEFAULT_TIMER_TIMEOUT) {
    if (!running) {
      setI(setInterval(func, timeout));
      setRunning(true);
    }
    return stop_;
  }
  function stop_() {
    clearInterval(i);
    setRunning(false);
  }
}
