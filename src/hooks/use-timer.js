import { useState } from "react";

//
export const DEFAULT_TIMER_TIMEOUT = 1 * 1000; // msec
//
export default function useTimer(func) {
  const [running, setRunning] = useState(null);
  const [i, setI] = useState(null);

  return {
    start,
    stop,
    // 
    running,
  };

  function start(timeout = DEFAULT_TIMER_TIMEOUT) {
    if (!running) {
      setI(setInterval(func, timeout));
      setRunning(true);
    }
  }
  function stop() {
    clearInterval(i);
    setRunning(false);
  }
}
