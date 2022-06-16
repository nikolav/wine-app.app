import React, { useState, useEffect } from "react";
import Link from "next/link";
import useTimer from "../src/hooks/use-timer";
import { useRouter } from "next/router";
import useIsMounted from "../src/hooks/use-is-mounted";

const NotFound404 = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [counter, setCounter] = useState(12);
  const timerCounter = useTimer(() => setCounter((counter) => counter - 1));
  useEffect(() => {
    isMounted && timerCounter.start();
  }, [isMounted]);
  useEffect(() => {
    if (counter <= 0) {
      timerCounter.stop();
      router.push("/");
    }
  }, [counter]);
  //
  return (
    <div className="flex flex-col space-y-8 justify-center items-center text-xl text-slate-500 w-screen h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <strong>💣404 | 🤔😬</strong>
      <strong> Strana nije pronađena.</strong>
      <Link href="/" replace>
        <a>
          <strong className="text-6xl"> @🏠 </strong>
        </a>
      </Link>
      <strong className="text-5xl">{counter}</strong>
    </div>
  );
};

export default NotFound404;
